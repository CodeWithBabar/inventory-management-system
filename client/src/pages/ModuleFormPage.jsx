import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import EmptyState from '../components/ui/EmptyState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { findModule } from '../config/modules';
import useCrud from '../hooks/useCrud';

export default function ModuleFormPage() {
  const navigate = useNavigate();
  const { moduleKey, id } = useParams();
  const module = useMemo(() => findModule(moduleKey), [moduleKey]);
  const { createItem, updateItem, fetchOne } = useCrud(module?.endpoint || '');
  const [loading, setLoading] = useState(Boolean(id));
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    async function loadRecord() {
      if (!id || !module) return;
      setLoading(true);
      try {
        const data = await fetchOne(id);
        setForm(data || {});
      } finally {
        setLoading(false);
      }
    }

    loadRecord();
  }, [id, module, fetchOne]);

  if (!module) return <EmptyState title="Module not found" />;
  if (loading) return <LoadingSpinner label="Loading form..." />;

  const validate = () => {
    const nextErrors = {};
    module.requiredFields.forEach((field) => {
      if (!form[field]) nextErrors[field] = `${field} is required`;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    if (id) {
      await updateItem(id, form);
    } else {
      await createItem(form);
    }
    navigate(`/${module.key}`);
  };

  const editableFields = module.columns.filter((column) => column !== 'id');

  return (
    <section>
      <h2>{id ? `Edit ${module.label}` : `Create ${module.label}`}</h2>
      <form className="form-grid" onSubmit={handleSubmit}>
        {editableFields.map((field) => (
          <div key={field}>
            <label htmlFor={field}>{field}</label>
            <input
              id={field}
              value={form[field] ?? ''}
              onChange={(event) => setForm((prev) => ({ ...prev, [field]: event.target.value }))}
              placeholder={`Enter ${field}`}
            />
            {errors[field] && <small className="error-text">{errors[field]}</small>}
          </div>
        ))}
        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={() => navigate(`/${module.key}`)}>Cancel</button>
          <button type="submit" className="btn btn-primary">{id ? 'Update' : 'Create'}</button>
        </div>
      </form>
    </section>
  );
}
