import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { http } from '../api/http';

const colors = ['#1d4ed8', '#0ea5e9', '#14b8a6'];

const DashboardPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    http.get('/dashboard/summary').then((res) => setData(res.data));
  }, []);

  if (!data) return <div className="card">Loading dashboard...</div>;

  return (
    <div>
      <div className="cards-grid">
        {Object.entries(data.cards).map(([key, value]) => (
          <div key={key} className="card stat">
            <h4>{key}</h4>
            <p>{value}</p>
          </div>
        ))}
      </div>
      <div className="chart-grid">
        <div className="card" style={{ height: 320 }}>
          <h3>Sales vs Purchases</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.monthlySales}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#1d4ed8" />
              <Bar dataKey="purchases" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ height: 320 }}>
          <h3>Category Mix</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data.topCategories} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                {data.topCategories.map((entry, index) => <Cell key={entry.name} fill={colors[index % colors.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
