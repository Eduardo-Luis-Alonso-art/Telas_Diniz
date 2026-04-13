import { useState } from "react";
import "../styles/Alertas.css";

const Alertas = () => {
  // =========================
  // 📦 DADOS DE ALERTAS (SIMULA BACKEND)
  // =========================
  const [alertas, setAlertas] = useState([
    {
      id: 1,
      tipo: "prazo",
      titulo: "Prazo próximo de vencer",
      descricao: "Processo nº 12345 - Dr. Ricardo tem até amanhã para entregar a petição inicial",
      data: "2024-01-15",
      lido: false,
      prioridade: "alta",
      processo: "12345",
      advogado: "Dr. Ricardo",
    },
    {
      id: 2,
      tipo: "andamento",
      titulo: "Processo parado há 15 dias",
      descricao: "Processo nº 12346 - Sem movimentação desde 01/01/2024",
      data: "2024-01-16",
      lido: false,
      prioridade: "media",
      processo: "12346",
      advogado: "Dra. Patrícia",
    },
    {
      id: 3,
      tipo: "novo",
      titulo: "Novo processo vinculado",
      descricao: "Processo nº 12347 foi adicionado ao seu nome",
      data: "2024-01-16",
      lido: true,
      prioridade: "baixa",
      processo: "12347",
      advogado: "Dr. André",
    },
    {
      id: 4,
      tipo: "prazo",
      titulo: "Audiência marcada",
      descricao: "Audiência do processo nº 12348 será amanhã às 14h",
      data: "2024-01-14",
      lido: false,
      prioridade: "alta",
      processo: "12348",
      advogado: "Dra. Camila",
    },
    {
      id: 5,
      tipo: "sistema",
      titulo: "Sistema atualizado",
      descricao: "Novas funcionalidades disponíveis no dashboard",
      data: "2024-01-13",
      lido: true,
      prioridade: "baixa",
      processo: null,
      advogado: null,
    },
    {
      id: 6,
      tipo: "andamento",
      titulo: "Documento pendente",
      descricao: "Falta assinatura digital no processo nº 12349",
      data: "2024-01-16",
      lido: false,
      prioridade: "media",
      processo: "12349",
      advogado: "Dr. Ricardo",
    },
    {
      id: 7,
      tipo: "prazo",
      titulo: "Reunião com cliente",
      descricao: "Reunião agendada para amanhã às 10h - Cliente: Empresa XYZ",
      data: "2024-01-15",
      lido: false,
      prioridade: "alta",
      processo: null,
      advogado: "Dra. Patrícia",
    },
    {
      id: 8,
      tipo: "novo",
      titulo: "Documento disponível",
      descricao: "Sentença do processo nº 12350 está disponível para download",
      data: "2024-01-12",
      lido: true,
      prioridade: "baixa",
      processo: "12350",
      advogado: "Dr. André",
    },
  ]);

  const [filtro, setFiltro] = useState("todos");
  const [prioridadeFiltro, setPrioridadeFiltro] = useState("todas");

  // =========================
  // 📊 ESTATÍSTICAS
  // =========================
  const naoLidos = alertas.filter(a => !a.lido).length;
  const alertasAlta = alertas.filter(a => a.prioridade === "alta" && !a.lido).length;
  const alertasHoje = alertas.filter(a => a.data === new Date().toISOString().split('T')[0]).length;

  // =========================
  // 🔧 FUNÇÕES
  // =========================
  const marcarComoLido = (id) => {
    setAlertas(alertas.map(alerta =>
      alerta.id === id ? { ...alerta, lido: true } : alerta
    ));
  };

  const marcarTodosComoLidos = () => {
    setAlertas(alertas.map(alerta => ({ ...alerta, lido: true })));
  };

  const excluirAlerta = (id) => {
    setAlertas(alertas.filter(alerta => alerta.id !== id));
  };

  const excluirTodosLidos = () => {
    setAlertas(alertas.filter(alerta => !alerta.lido));
  };

  // =========================
  // 🎨 FILTRAGEM
  // =========================
  const alertasFiltrados = alertas.filter(alerta => {
    if (filtro === "naoLidos") return !alerta.lido;
    if (filtro === "lidos") return alerta.lido;
    return true;
  }).filter(alerta => {
    if (prioridadeFiltro === "todas") return true;
    return alerta.prioridade === prioridadeFiltro;
  });

  // =========================
  // 🎨 CORES E ESTILOS
  // =========================
  const getPrioridadeClass = (prioridade) => {
    switch(prioridade) {
      case "alta": return "priority-high";
      case "media": return "priority-medium";
      case "baixa": return "priority-low";
      default: return "";
    }
  };

  const getPrioridadeTexto = (prioridade) => {
    switch(prioridade) {
      case "alta": return "Alta";
      case "media": return "Média";
      case "baixa": return "Baixa";
      default: return "";
    }
  };

  return (
    <div className="alertas-container">
      {/* TOPO */}
      <div className="alertas-header">
        <div>
          <h1>Central de Alertas</h1>
          <p>Gerencie notificações e prazos importantes</p>
        </div>
        
        <div className="alertas-actions">
          <button onClick={marcarTodosComoLidos} className="btn-secondary">
            Marcar todos como lido
          </button>
          <button onClick={excluirTodosLidos} className="btn-danger">
            Excluir lidos
          </button>
        </div>
      </div>

      {/* STATS CARDS - SEM ÍCONES, COM BARRINHA COLORIDA */}
      <div className="alertas-stats">
        <div className="stat-card">
          <div className="stat-bar stat-bar-blue"></div>
          <div className="stat-info">
            <span className="stat-value">{naoLidos}</span>
            <span className="stat-label">Não lidos</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-bar stat-bar-red"></div>
          <div className="stat-info">
            <span className="stat-value">{alertasAlta}</span>
            <span className="stat-label">Prioridade alta</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-bar stat-bar-green"></div>
          <div className="stat-info">
            <span className="stat-value">{alertasHoje}</span>
            <span className="stat-label">Hoje</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-bar stat-bar-gray"></div>
          <div className="stat-info">
            <span className="stat-value">{alertas.length}</span>
            <span className="stat-label">Total</span>
          </div>
        </div>
      </div>

      {/* FILTROS */}
      <div className="alertas-filtros">
        <div className="filtros-group">
          <button 
            className={`filtro-btn ${filtro === "todos" ? "active" : ""}`}
            onClick={() => setFiltro("todos")}
          >
            Todos
          </button>
          <button 
            className={`filtro-btn ${filtro === "naoLidos" ? "active" : ""}`}
            onClick={() => setFiltro("naoLidos")}
          >
            Não lidos
          </button>
          <button 
            className={`filtro-btn ${filtro === "lidos" ? "active" : ""}`}
            onClick={() => setFiltro("lidos")}
          >
            Lidos
          </button>
        </div>

        <div className="filtros-prioridade">
          <span className="filtro-label">Prioridade:</span>
          <select 
            className="priority-select"
            value={prioridadeFiltro}
            onChange={(e) => setPrioridadeFiltro(e.target.value)}
          >
            <option value="todas">Todas</option>
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>
        </div>
      </div>

      {/* LISTA DE ALERTAS */}
      <div className="alertas-lista">
        {alertasFiltrados.length === 0 ? (
          <div className="empty-state">
            <h3>Nenhum alerta encontrado</h3>
            <p>Todos os alertas estão em dia!</p>
          </div>
        ) : (
          alertasFiltrados.map(alerta => (
            <div 
              key={alerta.id} 
              className={`alerta-card ${!alerta.lido ? "unread" : ""} ${getPrioridadeClass(alerta.prioridade)}`}
            >
              <div className="alerta-status">
                {!alerta.lido && <div className="unread-dot"></div>}
              </div>

              <div className="alerta-content">
                <div className="alerta-header">
                  <h3>{alerta.titulo}</h3>
                  <span className={`priority-badge ${getPrioridadeClass(alerta.prioridade)}`}>
                    {getPrioridadeTexto(alerta.prioridade)}
                  </span>
                </div>
                
                <p className="alerta-descricao">{alerta.descricao}</p>
                
                <div className="alerta-metadata">
                  <span className="metadata-item">
                    {new Date(alerta.data).toLocaleDateString('pt-BR')}
                  </span>
                  {alerta.processo && (
                    <span className="metadata-item">
                      Processo: {alerta.processo}
                    </span>
                  )}
                  {alerta.advogado && (
                    <span className="metadata-item">
                      {alerta.advogado}
                    </span>
                  )}
                </div>
              </div>

              <div className="alerta-actions">
                {!alerta.lido && (
                  <button 
                    onClick={() => marcarComoLido(alerta.id)}
                    className="action-btn mark-read"
                    title="Marcar como lido"
                  >
                    ✓
                  </button>
                )}
                <button 
                  onClick={() => excluirAlerta(alerta.id)}
                  className="action-btn delete"
                  title="Excluir"
                >
                  ×
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Alertas;