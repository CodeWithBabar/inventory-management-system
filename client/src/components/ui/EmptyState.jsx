export default function EmptyState({ title = 'No records found', description = 'Try adjusting your search or creating a new record.' }) {
  return (
    <div className="state-card">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
