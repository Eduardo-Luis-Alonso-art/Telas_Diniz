import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Alertas from "./pages/Alertas";
import ProcessosParados from "./pages/ProcessosParados";
import Relatorios from "./pages/Relatorios";
import SincronizacaoCPJ from "./pages/SincronizacaoCPJ";
import "./styles/global.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [page, setPage] = useState("dashboard");

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (page) {
      case "dashboard":
        return <Dashboard />;
      case "alertas":
        return <Alertas />;
      case "processos":
        return <ProcessosParados />;
      case "relatorios":
        return <Relatorios />;
      case "cpj":
        return <SincronizacaoCPJ />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Header onLogout={handleLogout} />
      <div className="main-container">
        <Sidebar setPage={setPage} page={page} />
        <main className="content">{renderPage()}</main>
      </div>
    </div>
  );
}

export default App;