import "../styles/Sidebar.css";
import chartIcon from "../assets/icons/SideBar/chart.svg";
import bellIcon from "../assets/icons/SideBar/bell.svg";
import clockIcon from "../assets/icons/SideBar/clock.svg";
import fileIcon from "../assets/icons/SideBar/file.svg";
import refreshIcon from "../assets/icons/SideBar/refresh.svg";

const Sidebar = ({ setPage, page }) => {
  return (
    <aside className="sidebar">
      <nav className="nav-menu">

        <div
          className={`nav-item ${page === "dashboard" ? "active" : ""}`}
          onClick={() => setPage("dashboard")}
        >
          <img src={chartIcon} alt="Dashboard" />
          <span>Dashboard</span>
        </div>

        <div
          className={`nav-item ${page === "alertas" ? "active" : ""}`}
          onClick={() => setPage("alertas")}
        >
          <img src={bellIcon} alt="Alertas" />
          <span>Alertas</span>
        </div>

        <div
          className={`nav-item ${page === "processos" ? "active" : ""}`}
          onClick={() => setPage("processos")}
        >
          <img src={clockIcon} alt="Processos" />
          <span>Processos Parados</span>
        </div>

        <div
          className={`nav-item ${page === "relatorios" ? "active" : ""}`}
          onClick={() => setPage("relatorios")}
        >
          <img src={fileIcon} alt="Relatórios" />
          <span>Relatórios</span>
        </div>

        <div
          className={`nav-item ${page === "cpj" ? "active" : ""}`}
          onClick={() => setPage("cpj")}
        >
          <img src={refreshIcon} alt="CPJ" />
          <span>Sincronização CPJ</span>
        </div>

      </nav>
    </aside>
  );
};

export default Sidebar;