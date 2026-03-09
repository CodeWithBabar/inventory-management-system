import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DataTable from '../components/ui/DataTable';
import EmptyState from '../components/ui/EmptyState';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import Pagination from '../components/ui/Pagination';
import { findModule } from '../config/modules';
import useCrud from '../hooks/useCrud';

export default function ModuleListPage() {
  const navigate = useNavigate();
  const { moduleKey } = useParams();
  const module = useMemo(() => findModule(moduleKey), [moduleKey]);
  const [search, setSearch] = useState('');

  if (!module) return <EmptyState title="Module not found" description="Please choose a valid module from the sidebar." />;

  const { items, pagination, loading, fetchItems, deleteItem } = useCrud(module.endpoint);

  const handleSearch = (event) => {
    event.preventDefault();
    fetchItems({ page: 1, pageSize: pagination.pageSize, search });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this record?')) return;
    await deleteItem(id);
    fetchItems({ page: pagination.page, pageSize: pagination.pageSize, search });
  };

  return (
    <section>
      <div className="page-header">
        <h2>{module.label}</h2>
        <button type="button" className="btn btn-primary" onClick={() => navigate(`/${module.key}/new`)}>Create</button>
      </div>

      <form className="search-bar" onSubmit={handleSearch}>
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={`Search ${module.label.toLowerCase()}...`} />
        <button type="submit" className="btn btn-secondary">Search</button>
      </form>

      {loading ? (
        <LoadingSpinner />
      ) : items.length ? (
        <>
          <DataTable
            columns={module.columns}
            rows={items}
            statusField={module.statusField}
            onView={(id) => navigate(`/${module.key}/${id}`)}
            onEdit={(id) => navigate(`/${module.key}/${id}/edit`)}
            onDelete={handleDelete}
          />
          <Pagination
            page={pagination.page}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onPageChange={(nextPage) => fetchItems({ page: nextPage, pageSize: pagination.pageSize, search })}
          />
        </>
      ) : (
        <EmptyState />
      )}
    </section>
  );
}
