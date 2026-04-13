import "../styles/Header.css";
import logo from "../assets/logo/logo.svg";

const Header = ({ onLogout }) => {
  return (
    <header className="header">
      <div className="header-left">
        <div className="logo">
          <img src={logo} alt="Logo Escritório" />
        </div>

        <div className="header-title">
          <h1>LexMetrics</h1>
          <span className="office-name">
            Marcelo Diniz - Sociedade de Advogados
          </span>
        </div>
      </div>

      <div className="header-right">
        <div className="user-info">
          <div className="user-avatar">L</div>
          <div className="user-text">
            <p className="user-name">Gestor</p>
            <p className="user-role">Sócio / Controladoria</p>
          </div>
        </div>

        <button className="logout-btn" onClick={onLogout}>
          Sair
        </button>
      </div>
    </header>
  );
};

export default Header;
