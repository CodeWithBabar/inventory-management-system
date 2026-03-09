import StatusBadge from './StatusBadge';

export default function DataTable({ columns, rows, statusField, onView, onEdit, onDelete }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {columns.map((column) => <th key={column}>{column}</th>)}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              {columns.map((column) => (
                <td key={`${row.id}-${column}`}>
                  {column === statusField ? <StatusBadge value={row[column]} /> : String(row[column] ?? '-')}
                </td>
              ))}
              <td>
                <div className="action-buttons">
                  <button type="button" className="btn btn-secondary" onClick={() => onView(row.id)}>View</button>
                  <button type="button" className="btn btn-secondary" onClick={() => onEdit(row.id)}>Edit</button>
                  <button type="button" className="btn btn-danger" onClick={() => onDelete(row.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
