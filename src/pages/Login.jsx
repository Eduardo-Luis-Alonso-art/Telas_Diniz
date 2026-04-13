import "../styles/Login.css";
import chartIcon from "../assets/icons/Login/chart.svg";
import justiceIcon from "../assets/icons/Login/justice.svg";
import alertIcon from "../assets/icons/Login/alert.svg";

const Login = ({ onLogin }) => {
  return (
    <div className="login-container">
      {/* LADO ESQUERDO */}
      <div className="login-left">
        <div className="branding">
          <h1>LexMetrics</h1>

          <p className="subtitle">
            Sistema interno de inteligência jurídica do escritório Marcelo Diniz
            – Sociedade de Advogados
          </p>

          <div className="features">
            <div className="feature-item">
              <img src={chartIcon} alt="Produtividade" />
              <span>Monitoramento de produtividade</span>
            </div>

            <div className="feature-item">
              <img src={justiceIcon} alt="Processos" />
              <span>Gestão de processos</span>
            </div>

            <div className="feature-item">
              <img src={alertIcon} alt="Alertas" />
              <span>Alertas inteligentes</span>
            </div>
          </div>
        </div>
      </div>

      {/* LADO DIREITO */}
      <div className="login-right">
        <div className="login-card">
          <h2>Bem-vindo</h2>
          <p className="login-description">Acesse com sua conta Google</p>

          <button className="google-btn" onClick={onLogin}>
            <span className="google-icon">G</span>
            Entrar com Google
          </button>

          <p className="login-footer">
            Acesso restrito aos sócios e controladoria
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
