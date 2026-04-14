import { useState } from "react";
import "../styles/KanbanTarefas.css";

const KanbanTarefas = () => {
  // =========================
  // DADOS DAS TAREFAS
  // =========================
  const [tarefas, setTarefas] = useState([
    {
      id: 1,
      titulo: "Analisar petição inicial",
      descricao: "Revisar documentação do processo nº 12345 e elaborar parecer",
      advogado: "Dr. Ricardo",
      status: "pendente",
      criadoEm: "2024-01-14T09:00:00",
      prazo: "2024-01-20T18:00:00",
      concluidoEm: null,
      prioridade: "alta",
    },
    {
      id: 2,
      titulo: "Protocolar recurso",
      descricao: "Protocolar recurso de apelação no processo nº 54321",
      advogado: "Dra. Patrícia",
      status: "andamento",
      criadoEm: "2024-01-13T14:30:00",
      prazo: "2024-01-18T17:00:00",
      concluidoEm: null,
      prioridade: "alta",
    },
    {
      id: 3,
      titulo: "Reunião com cliente",
      descricao: "Apresentar estratégia do caso para o cliente Empresa ABC",
      advogado: "Dr. André",
      status: "pendente",
      criadoEm: "2024-01-15T08:00:00",
      prazo: "2024-01-22T10:00:00",
      concluidoEm: null,
      prioridade: "media",
    },
    {
      id: 4,
      titulo: "Elaborar contrato",
      descricao: "Criar minuta do contrato de prestação de serviços",
      advogado: "Dra. Camila",
      status: "concluido",
      criadoEm: "2024-01-10T11:00:00",
      prazo: "2024-01-15T17:00:00",
      concluidoEm: "2024-01-14T16:30:00",
      prioridade: "baixa",
    },
    {
      id: 5,
      titulo: "Atualizar sistema CPJ",
      descricao: "Sincronizar dados do sistema CPJ com o dashboard",
      advogado: "Dr. Ricardo",
      status: "andamento",
      criadoEm: "2024-01-15T10:00:00",
      prazo: "2024-01-19T12:00:00",
      concluidoEm: null,
      prioridade: "media",
    },
    {
      id: 6,
      titulo: "Entregar documentação",
      descricao: "Entregar documentos solicitados pelo juiz",
      advogado: "Dra. Patrícia",
      status: "pendente",
      criadoEm: "2024-01-12T15:00:00",
      prazo: "2024-01-17T18:00:00",
      concluidoEm: null,
      prioridade: "alta",
    },
  ]);

  const [modalAberto, setModalAberto] = useState(false);
  const [modalEmail, setModalEmail] = useState(false);
  const [tarefaSelecionada, setTarefaSelecionada] = useState(null);
  const [emailMsg, setEmailMsg] = useState("");
  const [novaTarefa, setNovaTarefa] = useState({
    titulo: "",
    descricao: "",
    advogado: "",
    prazo: "",
    prioridade: "media",
  });

  const advogados = ["Dr. Ricardo", "Dra. Patrícia", "Dr. André", "Dra. Camila"];

  // =========================
  // 📊 FUNÇÕES DAS TAREFAS
  // =========================
  const moverTarefa = (id, novoStatus) => {
    setTarefas(tarefas.map(tarefa =>
      tarefa.id === id 
        ? { 
            ...tarefa, 
            status: novoStatus,
            concluidoEm: novoStatus === "concluido" ? new Date().toISOString() : tarefa.concluidoEm
          } 
        : tarefa
    ));
  };

  const excluirTarefa = (id) => {
    if (window.confirm("Tem certeza que deseja excluir esta tarefa?")) {
      setTarefas(tarefas.filter(tarefa => tarefa.id !== id));
    }
  };

  const adicionarTarefa = () => {
    if (!novaTarefa.titulo || !novaTarefa.descricao || !novaTarefa.advogado || !novaTarefa.prazo) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    const nova = {
      id: tarefas.length + 1,
      ...novaTarefa,
      status: "pendente",
      criadoEm: new Date().toISOString(),
      concluidoEm: null,
    };

    setTarefas([...tarefas, nova]);
    setNovaTarefa({
      titulo: "",
      descricao: "",
      advogado: "",
      prazo: "",
      prioridade: "media",
    });
    setModalAberto(false);
  };

  const abrirModalEmail = (tarefa) => {
    setTarefaSelecionada(tarefa);
    setEmailMsg(`Olá ${tarefa.advogado},\n\nSegue a tarefa: ${tarefa.titulo}\n\nDescrição: ${tarefa.descricao}\n\nPrazo: ${new Date(tarefa.prazo).toLocaleString('pt-BR')}\n\nAtenciosamente,\nGestão Jurídica`);
    setModalEmail(true);
  };

  const enviarEmail = () => {
    alert(`Email enviado para ${tarefaSelecionada.advogado}:\n\n${emailMsg}`);
    setModalEmail(false);
  };

  // =========================
  // 🎨 FORMATAÇÃO
  // =========================
  const formatarData = (dataStr) => {
    const data = new Date(dataStr);
    return data.toLocaleDateString('pt-BR') + " " + data.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const calcularDiasRestantes = (prazo) => {
    const hoje = new Date();
    const dataPrazo = new Date(prazo);
    const diffTime = dataPrazo - hoje;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return "Atrasado";
    if (diffDays === 0) return "Hoje";
    return `${diffDays} dia${diffDays !== 1 ? 's' : ''}`;
  };

  const getPrioridadeClass = (prioridade) => {
    switch(prioridade) {
      case "alta": return "priority-alta";
      case "media": return "priority-media";
      case "baixa": return "priority-baixa";
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

  // =========================
  // 🎨 RENDERIZAÇÃO DAS COLUNAS
  // =========================
  const colunas = [
    { id: "pendente", titulo: "Pendente", cor: "#ed8936" },
    { id: "andamento", titulo: "Em Andamento", cor: "#218DE1" },
    { id: "concluido", titulo: "Concluído", cor: "#48bb78" },
  ];

  const tarefasPorStatus = (status) => tarefas.filter(t => t.status === status);

  return (
    <div className="kanban-container">
      {/* TOPO */}
      <div className="kanban-header">
        <div>
          <h1>Kanban de Tarefas</h1>
          <p>Gerencie as tarefas dos advogados e acompanhe o progresso</p>
        </div>
        
        <button className="btn-novo" onClick={() => setModalAberto(true)}>
          + Nova Tarefa
        </button>
      </div>

      {/* ESTATÍSTICAS */}
      <div className="kanban-stats">
        <div className="stat-card">
          <div className="stat-bar stat-bar-blue"></div>
          <div className="stat-info">
            <span className="stat-value">{tarefas.length}</span>
            <span className="stat-label">Total de tarefas</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-bar stat-bar-orange"></div>
          <div className="stat-info">
            <span className="stat-value">{tarefas.filter(t => t.status === "pendente").length}</span>
            <span className="stat-label">Pendentes</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-bar stat-bar-blue"></div>
          <div className="stat-info">
            <span className="stat-value">{tarefas.filter(t => t.status === "andamento").length}</span>
            <span className="stat-label">Em andamento</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-bar stat-bar-green"></div>
          <div className="stat-info">
            <span className="stat-value">{tarefas.filter(t => t.status === "concluido").length}</span>
            <span className="stat-label">Concluídas</span>
          </div>
        </div>
      </div>

      {/* KANBAN BOARD */}
      <div className="kanban-board">
        {colunas.map(coluna => (
          <div key={coluna.id} className="kanban-coluna">
            <div className="coluna-header" style={{ borderTopColor: coluna.cor }}>
              <h3>{coluna.titulo}</h3>
              <span className="coluna-count">{tarefasPorStatus(coluna.id).length}</span>
            </div>

            <div className="coluna-tarefas">
              {tarefasPorStatus(coluna.id).map(tarefa => (
                <div key={tarefa.id} className={`tarefa-card ${getPrioridadeClass(tarefa.prioridade)}`}>
                  <div className="tarefa-header">
                    <h4>{tarefa.titulo}</h4>
                    <span className={`prioridade-badge ${getPrioridadeClass(tarefa.prioridade)}`}>
                      {getPrioridadeTexto(tarefa.prioridade)}
                    </span>
                  </div>

                  <p className="tarefa-descricao">{tarefa.descricao}</p>

                  <div className="tarefa-info">
                    <div className="info-item">
                      <span className="info-label">Advogado:</span>
                      <span className="info-value">{tarefa.advogado}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Criado em:</span>
                      <span className="info-value">{formatarData(tarefa.criadoEm)}</span>
                    </div>
                    <div className="info-item">
                      <span className="info-label">Prazo:</span>
                      <span className={`info-value ${calcularDiasRestantes(tarefa.prazo) === "Atrasado" ? "atrasado" : ""}`}>
                        {formatarData(tarefa.prazo)} ({calcularDiasRestantes(tarefa.prazo)})
                      </span>
                    </div>
                    {tarefa.concluidoEm && (
                      <div className="info-item">
                        <span className="info-label">Concluído em:</span>
                        <span className="info-value">{formatarData(tarefa.concluidoEm)}</span>
                      </div>
                    )}
                  </div>

                  <div className="tarefa-acoes">
                    {tarefa.status !== "concluido" && (
                      <>
                        <button 
                          className="btn-acao btn-andamento"
                          onClick={() => moverTarefa(tarefa.id, "andamento")}
                          disabled={tarefa.status === "andamento"}
                        >
                          Iniciar
                        </button>
                        <button 
                          className="btn-acao btn-concluir"
                          onClick={() => moverTarefa(tarefa.id, "concluido")}
                        >
                          Concluir
                        </button>
                      </>
                    )}
                    {tarefa.status === "pendente" && (
                      <button 
                        className="btn-acao btn-email"
                        onClick={() => abrirModalEmail(tarefa)}
                      >
                        Enviar Alerta
                      </button>
                    )}
                    <button 
                      className="btn-acao btn-excluir"
                      onClick={() => excluirTarefa(tarefa.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}

              {tarefasPorStatus(coluna.id).length === 0 && (
                <div className="coluna-vazia">
                  <p>Nenhuma tarefa</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* MODAL NOVA TAREFA */}
      {modalAberto && (
        <div className="modal-overlay" onClick={() => setModalAberto(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Nova Tarefa</h2>
              <button className="modal-fechar" onClick={() => setModalAberto(false)}>×</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Título *</label>
                <input
                  type="text"
                  value={novaTarefa.titulo}
                  onChange={(e) => setNovaTarefa({...novaTarefa, titulo: e.target.value})}
                  placeholder="Ex: Analisar documento"
                />
              </div>

              <div className="form-group">
                <label>Descrição *</label>
                <textarea
                  value={novaTarefa.descricao}
                  onChange={(e) => setNovaTarefa({...novaTarefa, descricao: e.target.value})}
                  placeholder="Descreva a tarefa em detalhes..."
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Advogado Responsável *</label>
                <select
                  value={novaTarefa.advogado}
                  onChange={(e) => setNovaTarefa({...novaTarefa, advogado: e.target.value})}
                >
                  <option value="">Selecione...</option>
                  {advogados.map(adv => (
                    <option key={adv} value={adv}>{adv}</option>
                  ))}
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Prazo *</label>
                  <input
                    type="datetime-local"
                    value={novaTarefa.prazo}
                    onChange={(e) => setNovaTarefa({...novaTarefa, prazo: e.target.value})}
                  />
                </div>

                <div className="form-group">
                  <label>Prioridade</label>
                  <select
                    value={novaTarefa.prioridade}
                    onChange={(e) => setNovaTarefa({...novaTarefa, prioridade: e.target.value})}
                  >
                    <option value="alta">Alta</option>
                    <option value="media">Média</option>
                    <option value="baixa">Baixa</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancelar" onClick={() => setModalAberto(false)}>Cancelar</button>
              <button className="btn-salvar" onClick={adicionarTarefa}>Salvar Tarefa</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ENVIO DE EMAIL */}
      {modalEmail && (
        <div className="modal-overlay" onClick={() => setModalEmail(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Enviar Alerta para {tarefaSelecionada?.advogado}</h2>
              <button className="modal-fechar" onClick={() => setModalEmail(false)}>×</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Mensagem do Email</label>
                <textarea
                  value={emailMsg}
                  onChange={(e) => setEmailMsg(e.target.value)}
                  rows="10"
                  style={{ fontFamily: 'monospace' }}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-cancelar" onClick={() => setModalEmail(false)}>Cancelar</button>
              <button className="btn-salvar" onClick={enviarEmail}>Enviar Email</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanTarefas;