import { useState } from "react";
import "../styles/ProcessosParados.css";

const ProcessosParados = () => {
  // =========================
  // 📦 DADOS DE PROCESSOS PARADOS (SIMULA BACKEND)
  // =========================
  const [processos] = useState([
    {
      id: 1,
      numero: "12345-67.2024.8.01.0001",
      titulo: "Ação Trabalhista - Reclamação Trabalhista",
      cliente: "Empresa ABC Ltda",
      advogado: "Dr. Ricardo",
      dataParada: "2024-01-10",
      diasParado: 35,
      ultimaMovimentacao: "2024-01-10 - Petição protocolada",
      motivo: "Aguardando citação",
      prioridade: "alta",
      vara: "2ª Vara do Trabalho",
    },
    {
      id: 2,
      numero: "54321-89.2024.8.01.0002",
      titulo: "Ação Cível - Cobrança",
      cliente: "Maria Silva",
      advogado: "Dra. Patrícia",
      dataParada: "2024-01-15",
      diasParado: 30,
      ultimaMovimentacao: "2024-01-15 - Contestação apresentada",
      motivo: "Aguardando sentença",
      prioridade: "media",
      vara: "3ª Vara Cível",
    },
    {
      id: 3,
      numero: "98765-43.2024.8.01.0003",
      titulo: "Execução Fiscal",
      cliente: "Fazenda Pública",
      advogado: "Dr. André",
      dataParada: "2024-01-05",
      diasParado: 40,
      ultimaMovimentacao: "2024-01-05 - Penhora deferida",
      motivo: "Aguardando leilão",
      prioridade: "alta",
      vara: "1ª Vara de Execução Fiscal",
    },
    {
      id: 4,
      numero: "11122-33.2024.8.01.0004",
      titulo: "Ação de Família - Divórcio",
      cliente: "Carlos e Ana",
      advogado: "Dra. Camila",
      dataParada: "2024-01-20",
      diasParado: 25,
      ultimaMovimentacao: "2024-01-20 - Homologação pendente",
      motivo: "Aguardando assinatura das partes",
      prioridade: "baixa",
      vara: "4ª Vara de Família",
    },
    {
      id: 5,
      numero: "44455-66.2024.8.01.0005",
      titulo: "Ação Previdenciária",
      cliente: "João Santos",
      advogado: "Dr. Ricardo",
      dataParada: "2024-01-08",
      diasParado: 37,
      ultimaMovimentacao: "2024-01-08 - Laudo pericial solicitado",
      motivo: "Aguardando perícia",
      prioridade: "alta",
      vara: "2ª Vara Previdenciária",
    },
    {
      id: 6,
      numero: "77788-99.2024.8.01.0006",
      titulo: "Ação Consumerista",
      cliente: "Associação de Consumidores",
      advogado: "Dra. Patrícia",
      dataParada: "2024-01-18",
      diasParado: 27,
      ultimaMovimentacao: "2024-01-18 - Recurso interposto",
      motivo: "Aguardando julgamento",
      prioridade: "media",
      vara: "Turma Recursal",
    },
  ]);

  const [filtro, setFiltro] = useState("todos");
  const [busca, setBusca] = useState("");

  // =========================
  // 📊 ESTATÍSTICAS
  // =========================
  const totalParados = processos.length;
  const altaPrioridade = processos.filter((p) => p.prioridade === "alta").length;
  const mediaPrioridade = processos.filter((p) => p.prioridade === "media").length;
  const mediaDiasParado = Math.floor(
    processos.reduce((acc, p) => acc + p.diasParado, 0) / totalParados,
  );

  // =========================
  // 🔧 FUNÇÕES
  // =========================
  const handleReativar = (id) => {
    alert(`Processo ${id} será reativado. (Função em desenvolvimento)`);
  };

  const handleNotificar = (id) => {
    alert(`Notificação enviada para o advogado do processo ${id}. (Função em desenvolvimento)`);
  };

  // =========================
  // 🎨 FILTRAGEM
  // =========================
  const processosFiltrados = processos
    .filter((processo) => {
      if (filtro === "alta") return processo.prioridade === "alta";
      if (filtro === "media") return processo.prioridade === "media";
      if (filtro === "baixa") return processo.prioridade === "baixa";
      return true;
    })
    .filter((processo) => {
      if (!busca) return true;
      return (
        processo.numero.toLowerCase().includes(busca.toLowerCase()) ||
        processo.cliente.toLowerCase().includes(busca.toLowerCase()) ||
        processo.titulo.toLowerCase().includes(busca.toLowerCase())
      );
    });

  // =========================
  // 🎨 CORES
  // =========================
  const getPrioridadeClass = (prioridade) => {
    switch (prioridade) {
      case "alta":
        return "priority-high";
      case "media":
        return "priority-medium";
      case "baixa":
        return "priority-low";
      default:
        return "";
    }
  };

  const getPrioridadeTexto = (prioridade) => {
    switch (prioridade) {
      case "alta":
        return "Alta";
      case "media":
        return "Média";
      case "baixa":
        return "Baixa";
      default:
        return "";
    }
  };

  const getDiasClass = (dias) => {
    if (dias >= 35) return "days-critical";
    if (dias >= 25) return "days-warning";
    return "days-normal";
  };

  return (
    <div className="processos-container">
      {/* TOPO */}
      <div className="processos-header">
        <div>
          <h1>Processos Parados</h1>
          <p>Gerencie processos sem movimentação recente</p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="processos-stats">
        <div className="stat-card">
          <div className="stat-bar stat-bar-red"></div>
          <div className="stat-info">
            <span className="stat-value">{totalParados}</span>
            <span className="stat-label">Total parados</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-bar stat-bar-red"></div>
          <div className="stat-info">
            <span className="stat-value">{altaPrioridade}</span>
            <span className="stat-label">Prioridade alta</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-bar stat-bar-yellow"></div>
          <div className="stat-info">
            <span className="stat-value">{mediaPrioridade}</span>
            <span className="stat-label">Prioridade média</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-bar stat-bar-gray"></div>
          <div className="stat-info">
            <span className="stat-value">{mediaDiasParado}</span>
            <span className="stat-label">Média de dias</span>
          </div>
        </div>
      </div>

      {/* FILTROS */}
      <div className="processos-filtros">
        <div className="filtros-group">
          <button
            className={`filtro-btn ${filtro === "todos" ? "active" : ""}`}
            onClick={() => setFiltro("todos")}
            type="button"
          >
            Todos
          </button>
          <button
            className={`filtro-btn ${filtro === "alta" ? "active" : ""}`}
            onClick={() => setFiltro("alta")}
            type="button"
          >
            Alta prioridade
          </button>
          <button
            className={`filtro-btn ${filtro === "media" ? "active" : ""}`}
            onClick={() => setFiltro("media")}
            type="button"
          >
            Média prioridade
          </button>
          <button
            className={`filtro-btn ${filtro === "baixa" ? "active" : ""}`}
            onClick={() => setFiltro("baixa")}
            type="button"
          >
            Baixa prioridade
          </button>
        </div>

        <div className="filtros-busca">
          <input
            type="text"
            placeholder="Buscar por número, cliente ou título..."
            className="busca-input"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>
      </div>

      {/* TABELA DE PROCESSOS */}
      <div className="processos-tabela">
        <div className="tabela-header">
          <div className="col-numero">Número do Processo</div>
          <div className="col-cliente">Cliente</div>
          <div className="col-advogado">Advogado</div>
          <div className="col-dias">Dias parado</div>
          <div className="col-prioridade">Prioridade</div>
          <div className="col-acoes">Ações</div>
        </div>

        <div className="tabela-corpo">
          {processosFiltrados.length === 0 ? (
            <div className="empty-state">
              <h3>Nenhum processo encontrado</h3>
              <p>Tente ajustar os filtros de busca</p>
            </div>
          ) : (
            processosFiltrados.map((processo) => (
              <div
                key={processo.id}
                className={`tabela-linha ${getPrioridadeClass(processo.prioridade)}`}
              >
                <div className="col-numero" data-label="Número do Processo">
                  <span className="numero-destaque">{processo.numero}</span>
                  <span className="processo-titulo">{processo.titulo}</span>
                </div>

                <div className="col-cliente" data-label="Cliente">
                  <span>{processo.cliente}</span>
                </div>

                <div className="col-advogado" data-label="Advogado">
                  <span>{processo.advogado}</span>
                </div>

                <div className="col-dias" data-label="Dias parado">
                  <span
                    className={`dias-badge ${getDiasClass(processo.diasParado)}`}
                  >
                    {processo.diasParado} dias
                  </span>
                </div>

                <div className="col-prioridade" data-label="Prioridade">
                  <span
                    className={`priority-badge ${getPrioridadeClass(processo.prioridade)}`}
                  >
                    {getPrioridadeTexto(processo.prioridade)}
                  </span>
                </div>

                <div className="col-acoes" data-label="Ações">
                  <button
                    onClick={() => handleReativar(processo.id)}
                    className="action-btn reativar"
                    title="Reativar processo"
                    type="button"
                  >
                    Reativar
                  </button>
                  <button
                    onClick={() => handleNotificar(processo.id)}
                    className="action-btn notificar"
                    title="Notificar advogado"
                    type="button"
                  >
                    Notificar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="processos-footer">
        <p className="footer-info">
          Processos parados há mais de 15 dias sem movimentação
        </p>
      </div>
    </div>
  );
};

export default ProcessosParados;