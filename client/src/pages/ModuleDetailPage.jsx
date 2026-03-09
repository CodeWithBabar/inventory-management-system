import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import StatusBadge from '../components/ui/StatusBadge';
import { findModule } from '../config/modules';
import useCrud from '../hooks/useCrud';

export default function ModuleDetailPage() {
  const navigate = useNavigate();
  const { moduleKey, id } = useParams();
  const module = useMemo(() => findModule(moduleKey), [moduleKey]);
  const { fetchOne } = useCrud(module?.endpoint || '');
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!module || !id) return;
      setLoading(true);
      try {
        const data = await fetchOne(id);
        setRecord(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [module, id, fetchOne]);

  if (!module) return <EmptyState title="Module not found" />;
  if (loading) return <LoadingSpinner label="Loading details..." />;
  if (!record) return <EmptyState title="Record not found" />;

  return (
    <section>
      <div className="page-header">
        <h2>{module.label} Details</h2>
        <button type="button" className="btn btn-secondary" onClick={() => navigate(`/${module.key}`)}>Back</button>
      </div>
      <div className="details-card">
        {Object.entries(record).map(([key, value]) => (
          <div className="detail-row" key={key}>
            <strong>{key}</strong>
            {key === module.statusField ? <StatusBadge value={value} /> : <span>{String(value ?? '-')}</span>}
          </div>
        ))}
      </div>
    </section>
  );
}
