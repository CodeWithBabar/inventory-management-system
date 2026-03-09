const cards = [
  { title: 'Total Products', value: '1,240' },
  { title: 'Low Stock Items', value: '38' },
  { title: 'Open Purchase Orders', value: '14' },
  { title: 'Pending Deliveries', value: '11' }
];

const DashboardPage = () => {
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Overview of inventory, purchases, and sales operations.</p>
      <div className="cards-grid">
        {cards.map((card) => (
          <article className="card" key={card.title}>
            <h3>{card.title}</h3>
            <p>{card.value}</p>
          </article>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
