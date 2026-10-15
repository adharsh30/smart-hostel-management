import "./DashboardCard.css";

function DashboardCard({ title, value, color }) {
  return (
    <div className="dashboard-card">
      <div
        className="circle"
        style={{ background: color }}
      ></div>

      <h4>{title}</h4>

      <h2>{value}</h2>
    </div>
  );
}

export default DashboardCard;