import { useState } from "react";
import "../styles/Relatorios.css";

const Relatorios = () => {
  // =========================
  // 📦 DADOS SIMULADOS (SIMULA BACKEND)
  // =========================
  const [dadosRelatorios] = useState({
    processos: [
      { mes: "Jan", concluidos: 12, andamento: 8, parados: 3, total: 23 },
      { mes: "Fev", concluidos: 15, andamento: 10, parados: 2, total: 27 },
      { mes: "Mar", concluidos: 18, andamento: 7, parados: 4, total: 29 },
      { mes: "Abr", concluidos: 14, andamento: 12, parados: 2, total: 28 },
      { mes: "Mai", concluidos: 20, andamento: 9, parados: 3, total: 32 },
      { mes: "Jun", concluidos: 22, andamento: 11, parados: 1, total: 34 },
    ],
    advogados: [
      { nome: "Dr. Ricardo", concluidos: 45, andamento: 12, produtividade: 79 },
      { nome: "Dra. Patrícia", concluidos: 38, andamento: 15, produtividade: 72 },
      { nome: "Dr. André", concluidos: 42, andamento: 10, produtividade: 81 },
      { nome: "Dra. Camila", concluidos: 35, andamento: 14, produtividade: 71 },
    ],
    origens: [
      { origem: "WhatsApp", quantidade: 45, percentual: 38 },
      { origem: "Google", quantidade: 32, percentual: 27 },
      { origem: "Email", quantidade: 28, percentual: 23 },
      { origem: "CPJ", quantidade: 15, percentual: 12 },
    ],
  });

  const [periodo, setPeriodo] = useState("6meses");
  const [tipoRelatorio, setTipoRelatorio] = useState("geral");
  const [formatoExportacao, setFormatoExportacao] = useState("csv");

  // =========================
  // 📊 ESTATÍSTICAS GERAIS
  // =========================
  const totalConcluidos = dadosRelatorios.processos.reduce((acc, p) => acc + p.concluidos, 0);
  const totalAndamento = dadosRelatorios.processos.reduce((acc, p) => acc + p.andamento, 0);
  const totalParados = dadosRelatorios.processos.reduce((acc, p) => acc + p.parados, 0);
  const totalGeral = dadosRelatorios.processos.reduce((acc, p) => acc + p.total, 0);
  const produtividadeGeral = ((totalConcluidos / totalGeral) * 100).toFixed(1);

  // =========================
  // 📈 DADOS PARA GRÁFICOS (Barras)
  // =========================
  const meses = dadosRelatorios.processos.map(p => p.mes);
  const dadosConcluidos = dadosRelatorios.processos.map(p => p.concluidos);
  const dadosAndamento = dadosRelatorios.processos.map(p => p.andamento);
  const dadosParados = dadosRelatorios.processos.map(p => p.parados);

  const maxValor = Math.max(...dadosConcluidos, ...dadosAndamento, ...dadosParados);
  const alturaMaxima = 200;

  // =========================
  // 📄 FUNÇÃO DE EXPORTAÇÃO
  // =========================
  const handleExportar = () => {
    let dadosExportacao = [];
    let nomeArquivo = "";
    let cabecalhos = [];

    if (tipoRelatorio === "geral") {
      cabecalhos = ["Mês", "Concluídos", "Em Andamento", "Parados", "Total"];
      dadosExportacao = dadosRelatorios.processos.map(p => [
        p.mes, p.concluidos, p.andamento, p.parados, p.total
      ]);
      nomeArquivo = `relatorio_geral_${new Date().toISOString().split("T")[0]}`;
    } else if (tipoRelatorio === "advogados") {
      cabecalhos = ["Advogado", "Concluídos", "Em Andamento", "Produtividade (%)"];
      dadosExportacao = dadosRelatorios.advogados.map(a => [
        a.nome, a.concluidos, a.andamento, a.produtividade
      ]);
      nomeArquivo = `relatorio_advogados_${new Date().toISOString().split("T")[0]}`;
    } else if (tipoRelatorio === "origens") {
      cabecalhos = ["Origem", "Quantidade", "Percentual (%)"];
      dadosExportacao = dadosRelatorios.origens.map(o => [
        o.origem, o.quantidade, o.percentual
      ]);
      nomeArquivo = `relatorio_origens_${new Date().toISOString().split("T")[0]}`;
    }

    if (formatoExportacao === "csv") {
      const linhas = [cabecalhos, ...dadosExportacao];
      const csvContent = linhas
        .map(linha =>
          linha
            .map(celula => {
              const celulaStr = String(celula);
              if (celulaStr.includes(",") || celulaStr.includes('"') || celulaStr.includes("\n")) {
                return `"${celulaStr.replace(/"/g, '""')}"`;
              }
              return celulaStr;
            })
            .join(",")
        )
        .join("\n");

      const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${nomeArquivo}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert(`Relatório exportado com sucesso! Formato: CSV`);
    } else if (formatoExportacao === "json") {
      const jsonData = {
        tipo: tipoRelatorio,
        data: new Date().toISOString(),
        dados: dadosExportacao.map(linha => {
          const obj = {};
          cabecalhos.forEach((cab, index) => {
            obj[cab.toLowerCase().replace(/ /g, "_")] = linha[index];
          });
          return obj;
        })
      };
      
      const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
      const link = document.createElement("a");
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", `${nomeArquivo}.json`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert(`Relatório exportado com sucesso! Formato: JSON`);
    }
  };

  // =========================
  // 🎨 RENDERIZAÇÃO DO GRÁFICO
  // =========================
  const renderGraficoBarras = () => {
    return (
      <div className="grafico-barras">
        <div className="grafico-legend">
          <div className="legend-item">
            <span className="legend-color concluidos"></span>
            <span>Concluídos</span>
          </div>
          <div className="legend-item">
            <span className="legend-color andamento"></span>
            <span>Em Andamento</span>
          </div>
          <div className="legend-item">
            <span className="legend-color parados"></span>
            <span>Parados</span>
          </div>
        </div>

        <div className="barras-container">
          {meses.map((mes, index) => (
            <div key={mes} className="barra-grupo">
              <div className="barras">
                <div
                  className="barra concluidos"
                  style={{
                    height: `${(dadosConcluidos[index] / maxValor) * alturaMaxima}px`,
                  }}
                >
                  <span className="barra-valor">{dadosConcluidos[index]}</span>
                </div>
                <div
                  className="barra andamento"
                  style={{
                    height: `${(dadosAndamento[index] / maxValor) * alturaMaxima}px`,
                  }}
                >
                  <span className="barra-valor">{dadosAndamento[index]}</span>
                </div>
                <div
                  className="barra parados"
                  style={{
                    height: `${(dadosParados[index] / maxValor) * alturaMaxima}px`,
                  }}
                >
                  <span className="barra-valor">{dadosParados[index]}</span>
                </div>
              </div>
              <div className="barra-label">{mes}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderTabela = () => {
    if (tipoRelatorio === "geral") {
      return (
        <table className="relatorio-tabela">
          <thead>
            <tr>
              <th>Mês</th>
              <th>Concluídos</th>
              <th>Em Andamento</th>
              <th>Parados</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {dadosRelatorios.processos.map((p) => (
              <tr key={p.mes}>
                <td>{p.mes}</td>
                <td className="valor-concluido">{p.concluidos}</td>
                <td className="valor-andamento">{p.andamento}</td>
                <td className="valor-parado">{p.parados}</td>
                <td className="valor-total">{p.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (tipoRelatorio === "advogados") {
      return (
        <table className="relatorio-tabela">
          <thead>
            <tr>
              <th>Advogado</th>
              <th>Concluídos</th>
              <th>Em Andamento</th>
              <th>Produtividade</th>
            </tr>
          </thead>
          <tbody>
            {dadosRelatorios.advogados.map((a) => (
              <tr key={a.nome}>
                <td>{a.nome}</td>
                <td className="valor-concluido">{a.concluidos}</td>
                <td className="valor-andamento">{a.andamento}</td>
                <td>
                  <div className="produtividade-cell">
                    <div className="produtividade-bar">
                      <div
                        className="produtividade-fill"
                        style={{ width: `${a.produtividade}%` }}
                      ></div>
                    </div>
                    <span>{a.produtividade}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }

    if (tipoRelatorio === "origens") {
      return (
        <table className="relatorio-tabela">
          <thead>
            <tr>
              <th>Origem</th>
              <th>Quantidade</th>
              <th>Percentual</th>
            </tr>
          </thead>
          <tbody>
            {dadosRelatorios.origens.map((o) => (
              <tr key={o.origem}>
                <td>{o.origem}</td>
                <td className="valor-concluido">{o.quantidade}</td>
                <td>
                  <div className="percentual-cell">
                    <div className="percentual-bar">
                      <div
                        className="percentual-fill"
                        style={{ width: `${o.percentual}%` }}
                      ></div>
                    </div>
                    <span>{o.percentual}%</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="relatorios-container">
      {/* TOPO */}
      <div className="relatorios-header">
        <div>
          <h1>Relatórios</h1>
          <p>Análise completa de desempenho e métricas do escritório</p>
        </div>
      </div>

      {/* CARDS DE ESTATÍSTICAS */}
      <div className="relatorios-stats">
        <div className="stat-card">
          <div className="stat-bar stat-bar-blue"></div>
          <div className="stat-info">
            <span className="stat-value">{totalConcluidos}</span>
            <span className="stat-label">Total concluídos</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-bar stat-bar-green"></div>
          <div className="stat-info">
            <span className="stat-value">{totalAndamento}</span>
            <span className="stat-label">Em andamento</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-bar stat-bar-red"></div>
          <div className="stat-info">
            <span className="stat-value">{totalParados}</span>
            <span className="stat-label">Processos parados</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-bar stat-bar-purple"></div>
          <div className="stat-info">
            <span className="stat-value">{produtividadeGeral}%</span>
            <span className="stat-label">Produtividade geral</span>
          </div>
        </div>
      </div>

      {/* FILTROS E CONFIGURAÇÕES */}
      <div className="relatorios-filtros">
        <div className="filtros-group">
          <div className="filtro-item">
            <label>Período</label>
            <select value={periodo} onChange={(e) => setPeriodo(e.target.value)}>
              <option value="6meses">Últimos 6 meses</option>
              <option value="12meses">Últimos 12 meses</option>
              <option value="2024">Ano de 2024</option>
            </select>
          </div>

          <div className="filtro-item">
            <label>Tipo de Relatório</label>
            <select value={tipoRelatorio} onChange={(e) => setTipoRelatorio(e.target.value)}>
              <option value="geral">Relatório Geral</option>
              <option value="advogados">Desempenho por Advogado</option>
              <option value="origens">Processos por Origem</option>
            </select>
          </div>

          <div className="filtro-item">
            <label>Formato de Exportação</label>
            <select value={formatoExportacao} onChange={(e) => setFormatoExportacao(e.target.value)}>
              <option value="csv">CSV (Excel)</option>
              <option value="json">JSON</option>
            </select>
          </div>

          <div className="filtro-item acoes">
            <button className="btn-exportar" onClick={handleExportar}>
              Exportar Relatório
            </button>
          </div>
        </div>
      </div>

      {/* GRÁFICO DE BARRAS */}
      <div className="relatorios-grafico">
        <div className="grafico-header">
          <h3>Evolução Mensal de Processos</h3>
          <span className="grafico-badge">{periodo === "6meses" ? "Últimos 6 meses" : periodo === "12meses" ? "Últimos 12 meses" : "Ano de 2024"}</span>
        </div>
        {renderGraficoBarras()}
      </div>

      {/* TABELA DE DADOS */}
      <div className="relatorios-tabela-container">
        <div className="tabela-header">
          <h3>
            {tipoRelatorio === "geral" && "Detalhamento Mensal"}
            {tipoRelatorio === "advogados" && "Desempenho por Advogado"}
            {tipoRelatorio === "origens" && "Distribuição por Origem"}
          </h3>
        </div>
        {renderTabela()}
      </div>

      {/* RODAPÉ */}
      <div className="relatorios-footer">
        <p className="footer-info">
          Relatório gerado em {new Date().toLocaleDateString('pt-BR')} às {new Date().toLocaleTimeString('pt-BR')}
        </p>
      </div>
    </div>
  );
};

export default Relatorios;