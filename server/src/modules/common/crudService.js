const ApiError = require('../../utils/ApiError');
const { getPool } = require('../../config/db');
const { getPagination } = require('../../utils/pagination');

const buildWhere = (filters, req, allowedFilters) => {
  const clauses = [];
  allowedFilters.forEach((field) => {
    if (filters[field] !== undefined) {
      clauses.push(`${field} LIKE @${field}`);
      req.input(field, `%${filters[field]}%`);
    }
  });
  return clauses.length ? `WHERE ${clauses.join(' AND ')}` : '';
};

const createCrudService = ({ table, idColumn = 'Id', allowedFilters = [] }) => ({
  async list(queryParams) {
    const pool = await getPool();
    const { page, limit, offset } = getPagination(queryParams);
    const req = pool.request();
    const whereClause = buildWhere(queryParams, req, allowedFilters);
    req.input('offset', offset).input('limit', limit);

    const query = `
      SELECT * FROM ${table}
      ${whereClause}
      ORDER BY ${idColumn} DESC
      OFFSET @offset ROWS FETCH NEXT @limit ROWS ONLY;
      SELECT COUNT(*) AS total FROM ${table} ${whereClause};
    `;

    const result = await req.query(query);
    return {
      data: result.recordsets[0],
      pagination: {
        page,
        limit,
        total: result.recordsets[1][0].total
      }
    };
  },

  async getById(id) {
    const pool = await getPool();
    const result = await pool.request().input('id', id).query(`SELECT * FROM ${table} WHERE ${idColumn} = @id`);
    if (!result.recordset[0]) {
      throw new ApiError(404, `${table} record not found`);
    }
    return result.recordset[0];
  },

  async create(data) {
    const keys = Object.keys(data);
    const pool = await getPool();
    const req = pool.request();
    keys.forEach((key) => req.input(key, data[key]));
    const columns = keys.join(', ');
    const values = keys.map((k) => `@${k}`).join(', ');

    const result = await req.query(`
      INSERT INTO ${table} (${columns})
      OUTPUT INSERTED.*
      VALUES (${values})
    `);
    return result.recordset[0];
  },

  async update(id, data) {
    const keys = Object.keys(data);
    if (!keys.length) {
      throw new ApiError(400, 'No fields supplied for update');
    }
    const pool = await getPool();
    const req = pool.request().input('id', id);
    keys.forEach((key) => req.input(key, data[key]));
    const setClause = keys.map((key) => `${key} = @${key}`).join(', ');

    const result = await req.query(`
      UPDATE ${table}
      SET ${setClause}
      OUTPUT INSERTED.*
      WHERE ${idColumn} = @id
    `);

    if (!result.recordset[0]) {
      throw new ApiError(404, `${table} record not found`);
    }
    return result.recordset[0];
  },

  async remove(id) {
    const pool = await getPool();
    const result = await pool.request().input('id', id).query(`DELETE FROM ${table} OUTPUT DELETED.* WHERE ${idColumn} = @id`);
    if (!result.recordset[0]) {
      throw new ApiError(404, `${table} record not found`);
    }
    return result.recordset[0];
  }
});

module.exports = createCrudService;
