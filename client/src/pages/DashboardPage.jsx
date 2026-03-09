import { useEffect, useState } from 'react';
import axiosClient from '../api/axiosClient';
import { MODULES } from '../config/modules';
import LoadingSpinner from '../components/ui/LoadingSpinner';

export default function DashboardPage() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const { data } = await axiosClient.get('/dashboard/summary');
        setStats(data.cards || []);
      } catch {
        setStats(MODULES.slice(0, 6).map((module) => ({ title: module.label, value: '-' })));
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) return <LoadingSpinner label="Loading dashboard insights..." />;

  return (
    <section>
      <h2>Dashboard</h2>
      <div className="cards-grid">
        {stats.map((card) => (
          <article className="summary-card" key={card.title}>
            <p>{card.title}</p>
            <h3>{card.value}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}
