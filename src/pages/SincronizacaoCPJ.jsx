import { useState } from "react";
import "../styles/SincronizacaoCPJ.css";

const SincronizacaoCPJ = () => {
  // =========================
  // 📦 ESTADO DA SINCRONIZAÇÃO
  // =========================
  const [sincronizacao, setSincronizacao] = useState({
    ultimaSincronizacao: "2024-01-15 08:30:00",
    ultimaSincronizacaoCompleta: "2024-01-14 18:00:00",
    status: "concluido",
    proximaSincronizacao: "2024-01-15 18:30:00",
  });

  const [historico, setHistorico] = useState([
    {
      id: 1,
      data: "2024-01-15 08:30:00",
      tipo: "automatica",
      status: "sucesso",
      registros: 45,
      duracao: "2.3s",
      detalhes: "Sincronização automática de processos",
    },
    {
      id: 2,
      data: "2024-01-14 18:00:00",
      tipo: "manual",
      status: "sucesso",
      registros: 128,
      duracao: "5.1s",
      detalhes: "Sincronização completa manual",
    },
    {
      id: 3,
      data: "2024-01-14 08:30:00",
      tipo: "automatica",
      status: "sucesso",
      registros: 42,
      duracao: "2.1s",
      detalhes: "Sincronização automática de processos",
    },
    {
      id: 4,
      data: "2024-01-13 18:00:00",
      tipo: "automatica",
      status: "erro",
      registros: 0,
      duracao: "0.5s",
      detalhes: "Erro de conexão com o servidor CPJ",
    },
    {
      id: 5,
      data: "2024-01-13 08:30:00",
      tipo: "automatica",
      status: "sucesso",
      registros: 38,
      duracao: "1.9s",
      detalhes: "Sincronização automática de processos",
    },
  ]);

  const [sincronizando, setSincronizando] = useState(false);
  const [progresso, setProgresso] = useState(0);
  const [filtro, setFiltro] = useState("todos");

  // =========================
  // 📊 ESTATÍSTICAS
  // =========================
  const totalSincronizacoes = historico.length;
  const sincronizacoesSucesso = historico.filter(h => h.status === "sucesso").length;
  const sincronizacoesErro = historico.filter(h => h.status === "erro").length;
  const totalRegistros = historico.reduce((acc, h) => acc + h.registros, 0);

  // =========================
  // 🔧 FUNÇÃO DE SINCRONIZAÇÃO
  // =========================
  const handleSincronizar = () => {
    if (sincronizando) return;
    
    setSincronizando(true);
    setProgresso(0);
    
    const interval = setInterval(() => {
      setProgresso(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          
          const agora = new Date();
          const dataFormatada = `${agora.getFullYear()}-${String(agora.getMonth() + 1).padStart(2, '0')}-${String(agora.getDate()).padStart(2, '0')} ${String(agora.getHours()).padStart(2, '0')}:${String(agora.getMinutes()).padStart(2, '0')}:${String(agora.getSeconds()).padStart(2, '0')}`;
          
          const novaSincronizacao = {
            id: historico.length + 1,
            data: dataFormatada,
            tipo: "manual",
            status: "sucesso",
            registros: Math.floor(Math.random() * 80) + 30,
            duracao: `${(Math.random() * 5 + 1).toFixed(1)}s`,
            detalhes: "Sincronização manual iniciada pelo usuário",
          };
          
          setHistorico([novaSincronizacao, ...historico]);
          setSincronizacao({
            ...sincronizacao,
            ultimaSincronizacao: dataFormatada,
            status: "concluido",
          });
          setSincronizando(false);
          
          return 100;
        }
        return prev + 2;
      });
    }, 50);
  };

  // =========================
  // 🎨 FORMATAÇÃO DE DATA
  // =========================
  const formatarData = (dataStr) => {
    const data = new Date(dataStr);
    const agora = new Date();
    const diffHoras = Math.floor((agora - data) / (1000 * 60 * 60));
    
    if (diffHoras < 1) {
      return "agora mesmo";
    } else if (diffHoras < 24) {
      return `${diffHoras} hora${diffHoras !== 1 ? 's' : ''} atrás`;
    } else {
      return data.toLocaleDateString('pt-BR') + " às " + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
  };

  const getStatusClass = (status) => {
    switch(status) {
      case "sucesso": return "status-success";
      case "erro": return "status-error";
      case "andamento": return "status-progress";
      default: return "";
    }
  };

  const getStatusTexto = (status) => {
    switch(status) {
      case "sucesso": return "Concluído";
      case "erro": return "Erro";
      case "andamento": return "Em andamento";
      default: return "Desconhecido";
    }
  };

  // =========================
  // 🎨 FILTRAGEM
  // =========================
  const historicoFiltrado = historico.filter(item => {
    if (filtro === "todos") return true;
    if (filtro === "sucesso") return item.status === "sucesso";
    if (filtro === "erro") return item.status === "erro";
    if (filtro === "manual") return item.tipo === "manual";
    if (filtro === "automatica") return item.tipo === "automatica";
    return true;
  });

  return (
    <div className="cpj-container">
      {/* TOPO */}
      <div className="cpj-header">
        <div>
          <h1>Sincronização CPJ</h1>
          <p>Gerencie a integração com o sistema CPJ</p>
        </div>
      </div>

      {/* STATUS ATUAL */}
      <div className="cpj-status-atual">
        <div className="status-card principal">
          <div className="status-info">
            <span className="status-label">Status da sincronização</span>
            <span className={`status-value ${getStatusClass(sincronizacao.status)}`}>
              {getStatusTexto(sincronizacao.status)}
            </span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-label">Última sincronização</span>
            <span className="status-value">{formatarData(sincronizacao.ultimaSincronizacao)}</span>
          </div>
        </div>

        <div className="status-card">
          <div className="status-info">
            <span className="status-label">Próxima sincronização</span>
            <span className="status-value">{formatarData(sincronizacao.proximaSincronizacao)}</span>
          </div>
        </div>

        <div className="status-card acao">
          <button 
            className="btn-sincronizar" 
            onClick={handleSincronizar}
            disabled={sincronizando}
          >
            {sincronizando ? "Sincronizando..." : "Sincronizar agora"}
          </button>
        </div>
      </div>

      {/* PROGRESSO DA SINCRONIZAÇÃO */}
      {sincronizando && (
        <div className="cpj-progresso">
          <div className="progresso-header">
            <span>Sincronizando dados com o CPJ...</span>
            <span>{progresso}%</span>
          </div>
          <div className="progresso-bar">
            <div className="progresso-fill" style={{ width: `${progresso}%` }}></div>
          </div>
          <p className="progresso-detalhes">
            Conectando ao servidor CPJ... Baixando dados...
          </p>
        </div>
      )}

      {/* STATS CARDS */}
      <div className="cpj-stats">
        <div className="stat-card">
          <div className="stat-bar stat-bar-blue"></div>
          <div className="stat-info">
            <span className="stat-value">{totalSincronizacoes}</span>
            <span className="stat-label">Total de sincronizações</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-bar stat-bar-green"></div>
          <div className="stat-info">
            <span className="stat-value">{sincronizacoesSucesso}</span>
            <span className="stat-label">Sincronizações com sucesso</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-bar stat-bar-red"></div>
          <div className="stat-info">
            <span className="stat-value">{sincronizacoesErro}</span>
            <span className="stat-label">Sincronizações com erro</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-bar stat-bar-purple"></div>
          <div className="stat-info">
            <span className="stat-value">{totalRegistros}</span>
            <span className="stat-label">Total de registros sincronizados</span>
          </div>
        </div>
      </div>

      {/* FILTROS */}
      <div className="cpj-filtros">
        <div className="filtros-group">
          <button
            className={`filtro-btn ${filtro === "todos" ? "active" : ""}`}
            onClick={() => setFiltro("todos")}
            type="button"
          >
            Todos
          </button>
          <button
            className={`filtro-btn ${filtro === "sucesso" ? "active" : ""}`}
            onClick={() => setFiltro("sucesso")}
            type="button"
          >
            Sucesso
          </button>
          <button
            className={`filtro-btn ${filtro === "erro" ? "active" : ""}`}
            onClick={() => setFiltro("erro")}
            type="button"
          >
            Erro
          </button>
          <button
            className={`filtro-btn ${filtro === "manual" ? "active" : ""}`}
            onClick={() => setFiltro("manual")}
            type="button"
          >
            Manuais
          </button>
          <button
            className={`filtro-btn ${filtro === "automatica" ? "active" : ""}`}
            onClick={() => setFiltro("automatica")}
            type="button"
          >
            Automáticas
          </button>
        </div>
      </div>

      {/* HISTÓRICO DE SINCRONIZAÇÕES */}
      <div className="cpj-historico">
        <div className="historico-header">
          <h3>Histórico de Sincronizações</h3>
        </div>

        <div className="historico-lista">
          {historicoFiltrado.length === 0 ? (
            <div className="empty-state">
              <h3>Nenhuma sincronização encontrada</h3>
              <p>Tente ajustar os filtros</p>
            </div>
          ) : (
            historicoFiltrado.map((item) => (
              <div key={item.id} className={`historico-item ${getStatusClass(item.status)}`}>
                <div className="historico-content">
                  <div className="historico-header-item">
                    <span className="historico-data">{new Date(item.data).toLocaleString('pt-BR')}</span>
                    <span className={`historico-tipo ${item.tipo === "manual" ? "tipo-manual" : "tipo-automatica"}`}>
                      {item.tipo === "manual" ? "Manual" : "Automática"}
                    </span>
                  </div>
                  
                  <div className="historico-detalhes">
                    <span className="detalhe-item">
                      <span className="detalhe-label">Registros:</span>
                      <span className="detalhe-valor">{item.registros}</span>
                    </span>
                    <span className="detalhe-item">
                      <span className="detalhe-label">Duração:</span>
                      <span className="detalhe-valor">{item.duracao}</span>
                    </span>
                    <span className="detalhe-item">
                      <span className="detalhe-label">Status:</span>
                      <span className={`detalhe-valor ${getStatusClass(item.status)}`}>
                        {item.status === "sucesso" ? "Sucesso" : "Erro"}
                      </span>
                    </span>
                  </div>
                  
                  <p className="historico-descricao">{item.detalhes}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* INFORMAÇÕES ADICIONAIS */}
      <div className="cpj-footer">
        <div className="footer-info">
          <p>
            A sincronização automática ocorre a cada 12 horas. 
            Você pode forçar uma sincronização manual a qualquer momento clicando no botão "Sincronizar agora".
          </p>
        </div>
      </div>
    </div>
  );
};

export default SincronizacaoCPJ;