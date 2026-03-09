export default function LoadingSpinner({ label = 'Loading...' }) {
  return (
    <div className="state-card">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  );
}
