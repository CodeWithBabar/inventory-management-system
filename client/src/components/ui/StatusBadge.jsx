function normalize(value) {
  if (typeof value === 'boolean') return value ? 'active' : 'inactive';
  return String(value || '').toLowerCase();
}

export default function StatusBadge({ value }) {
  const status = normalize(value);
  const statusClass = status.includes('pending')
    ? 'pending'
    : status.includes('paid') || status.includes('active') || status.includes('complete') || status === 'true'
      ? 'success'
      : status.includes('cancel') || status.includes('inactive') || status.includes('low')
        ? 'danger'
        : 'neutral';

  return <span className={`badge ${statusClass}`}>{String(value ?? 'N/A')}</span>;
}
