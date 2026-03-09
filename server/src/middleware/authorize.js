const { getPool } = require('../config/db');

module.exports = (...requiredPermissions) => async (req, res, next) => {
  if (!requiredPermissions.length) {
    return next();
  }

  const pool = await getPool();
  const result = await pool
    .request()
    .input('userId', req.user.id)
    .query(`
      SELECT DISTINCT p.Name
      FROM UserRoles ur
      INNER JOIN RolePermissions rp ON ur.RoleId = rp.RoleId
      INNER JOIN Permissions p ON rp.PermissionId = p.Id
      WHERE ur.UserId = @userId
    `);

  const userPermissions = new Set(result.recordset.map((row) => row.Name));
  const hasPermission = requiredPermissions.every((permission) => userPermissions.has(permission));

  if (!hasPermission) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  return next();
};
