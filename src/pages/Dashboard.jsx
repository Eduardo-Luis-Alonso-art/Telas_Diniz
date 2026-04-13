import "../styles/Dashboard.css";

import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

import { Bar, Pie, Line } from "react-chartjs-2";

ChartJS.register(
  BarElement,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {

  // =========================
  // 📦 DADOS BASE (SIMULA BACKEND)
  // =========================
  const processes = [
    // SEGUNDA
    { dia: "Seg", origem: "WhatsApp", status: "concluido", advogado: "Dr. Ricardo" },
    { dia: "Seg", origem: "Google", status: "andamento", advogado: "Dra. Patrícia" },
    { dia: "Seg", origem: "CPJ", status: "concluido", advogado: "Dr. Ricardo" },
    { dia: "Seg", origem: "WhatsApp", status: "concluido", advogado: "Dr. André" },
    { dia: "Seg", origem: "Email", status: "andamento", advogado: "Dra. Camila" },

    // TERÇA
    { dia: "Ter", origem: "Email", status: "concluido", advogado: "Dra. Patrícia" },
    { dia: "Ter", origem: "WhatsApp", status: "andamento", advogado: "Dr. Ricardo" },
    { dia: "Ter", origem: "Google", status: "concluido", advogado: "Dr. André" },
    { dia: "Ter", origem: "CPJ", status: "parado", advogado: "Dra. Camila" },

    // QUARTA
    { dia: "Qua", origem: "Google", status: "concluido", advogado: "Dr. Ricardo" },
    { dia: "Qua", origem: "CPJ", status: "parado", advogado: "Dra. Patrícia" },
    { dia: "Qua", origem: "WhatsApp", status: "concluido", advogado: "Dr. André" },
    { dia: "Qua", origem: "Email", status: "andamento", advogado: "Dr. Ricardo" },

    // QUINTA
    { dia: "Qui", origem: "WhatsApp", status: "concluido", advogado: "Dra. Camila" },
    { dia: "Qui", origem: "Email", status: "andamento", advogado: "Dr. Ricardo" },
    { dia: "Qui", origem: "Google", status: "concluido", advogado: "Dra. Patrícia" },
    { dia: "Qui", origem: "CPJ", status: "concluido", advogado: "Dr. André" },

    // SEXTA
    { dia: "Sex", origem: "Google", status: "concluido", advogado: "Dra. Camila" },
    { dia: "Sex", origem: "CPJ", status: "concluido", advogado: "Dr. Ricardo" },
    { dia: "Sex", origem: "WhatsApp", status: "andamento", advogado: "Dra. Patrícia" },
    { dia: "Sex", origem: "Email", status: "concluido", advogado: "Dr. André" },
    { dia: "Sex", origem: "Google", status: "concluido", advogado: "Dr. Ricardo" },
  ];

  // =========================
  // 📊 KPIs
  // =========================
  const total = processes.length;

  const concluidos = processes.filter(p => p.status === "concluido").length;
  const andamento = processes.filter(p => p.status === "andamento").length;
  const parados = processes.filter(p => p.status === "parado").length;

  const produtividade = ((concluidos / total) * 100).toFixed(0);

  // =========================
  // RANKING DE ADVOGADOS
  // =========================
  const advogados = ["Dr. Ricardo", "Dra. Patrícia", "Dr. André", "Dra. Camila"];
  
  const rankingAdvogados = advogados
    .map(advogado => ({
      nome: advogado,
      concluidos: processes.filter(p => p.advogado === advogado && p.status === "concluido").length,
      total: processes.filter(p => p.advogado === advogado).length,
      produtividade: processes.filter(p => p.advogado === advogado).length > 0
        ? ((processes.filter(p => p.advogado === advogado && p.status === "concluido").length / 
           processes.filter(p => p.advogado === advogado).length) * 100).toFixed(0)
        : 0
    }))
    .sort((a, b) => b.concluidos - a.concluidos);

  // =========================
  // 📊 GRÁFICO DE BARRAS
  // =========================
  const dias = ["Seg", "Ter", "Qua", "Qui", "Sex"];

  const barData = {
    labels: dias,
    datasets: [
      {
        label: "Processos Movimentados",
        data: dias.map(dia =>
          processes.filter(p => p.dia === dia).length
        ),
        backgroundColor: "#218DE1",
        borderRadius: 6,
      },
    ],
  };

  // =========================
  // 🥧 GRÁFICO DE PIZZA
  // =========================
  const origens = ["WhatsApp", "Google", "Email", "CPJ"];

  const pieData = {
    labels: origens,
    datasets: [
      {
        data: origens.map(origem =>
          processes.filter(p => p.origem === origem).length
        ),
        backgroundColor: [
          "#25D366",
          "#4285F4",
          "#AA00FF",
          "#114166",
        ],
        borderWidth: 0,
      },
    ],
  };

  // =========================
  // 📈 GRÁFICO DE LINHA (CORRIGIDO)
  // =========================
  const lineData = {
    labels: dias,
    datasets: [
      {
        label: "Produtividade (%)",
        data: dias.map(dia => {
          const diaProcessos = processes.filter(p => p.dia === dia);
          const concluidosDia = diaProcessos.filter(p => p.status === "concluido").length;
          
          if (diaProcessos.length === 0) return 0;
          
          // Retorna número (não string) com 1 casa decimal
          return Number(((concluidosDia / diaProcessos.length) * 100).toFixed(1));
        }),
        borderColor: "#218DE1",
        backgroundColor: "rgba(33, 141, 225, 0.05)",
        borderWidth: 3,
        pointBackgroundColor: "#218DE1",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
        tension: 0.3,
        fill: true,
      },
    ],
  };

  // =========================
  // ⚙️ OPTIONS
  // =========================
  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw;
            return `${label}: ${value} processos`;
          },
        },
      },
    },
  };

  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || "";
            const value = context.raw;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: ${value} processos (${percentage}%)`;
          },
        },
      },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        grid: {
          color: "#e2e8f0",
        },
        title: {
          display: true,
          text: "Produtividade (%)",
          color: "#718096",
        },
      },
      x: {
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: "Dias da Semana",
          color: "#718096",
        },
      },
    },
    plugins: {
      legend: {
        position: "top",
        labels: {
          boxWidth: 12,
          padding: 15,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Produtividade: ${context.raw}%`;
          },
        },
      },
    },
  };

  return (
    <div className="dashboard">

      {/* TOPO */}
      <div className="dashboard-top">
        <div className="dashboard-title">
          <h1>Dashboard</h1>
          <p>Resumo geral do desempenho do escritório</p>
        </div>

        <div className="filters">
          <select className="filter-select">
            <option>Todos os Advogados</option>
            <option>Dr. Ricardo</option>
            <option>Dra. Patrícia</option>
            <option>Dr. André</option>
            <option>Dra. Camila</option>
          </select>

          <select className="filter-select">
            <option>Últimos 7 dias</option>
            <option>Últimos 15 dias</option>
            <option>Últimos 30 dias</option>
            <option>Últimos 60 dias</option>
          </select>
        </div>
      </div>

      {/* KPIs */}
      <div className="kpis">

        <div className="kpi-card">
          <div className="kpi-content">
            <span>Casos Concluídos</span>
            <h2>{concluidos}</h2>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-content">
            <span>Em Andamento</span>
            <h2>{andamento}</h2>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-content">
            <span>Processos Parados</span>
            <h2>{parados}</h2>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-content">
            <span>Produtividade</span>
            <h2>{produtividade}%</h2>
            <p className="kpi-sub">baseado em prazos cumpridos</p>
          </div>
        </div>

      </div>

      {/* GRÁFICOS */}
      <div className="charts">

        <div className="chart-card">
          <div className="chart-header">
            <h3>Processos por Dia</h3>
            <span className="chart-badge">Última semana</span>
          </div>

          <div className="chart-wrapper">
            <Bar data={barData} options={barOptions} />
          </div>
        </div>

        <div className="chart-card">
          <div className="chart-header">
            <h3>Distribuição de Origem dos Processos</h3>
            <span className="chart-badge">Por canal</span>
          </div>

          <div className="chart-wrapper small">
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

      </div>

      {/* LINHA */}
      <div className="chart-card full">
        <div className="chart-header">
          <h3>Evolução da Produtividade</h3>
          <span className="chart-badge">Taxa de sucesso</span>
        </div>

        <div className="chart-wrapper">
          <Line data={lineData} options={lineOptions} />
        </div>
      </div>

      {/* RANKING DE ADVOGADOS */}
      <div className="ranking-card">
        <div className="ranking-header">
          <h3>🏆 Ranking de Advogados</h3>
          <span className="chart-badge">Casos concluídos</span>
        </div>

        <div className="ranking-table">
          <div className="ranking-table-header">
            <div className="ranking-position">Posição</div>
            <div className="ranking-name">Advogado</div>
            <div className="ranking-concluidos">Concluídos</div>
            <div className="ranking-total">Total</div>
            <div className="ranking-produtividade">Produtividade</div>
          </div>

          {rankingAdvogados.map((adv, index) => (
            <div key={adv.nome} className="ranking-table-row">
              <div className="ranking-position">
                <span className={`ranking-medal ${index === 0 ? 'gold' : index === 1 ? 'silver' : index === 2 ? 'bronze' : ''}`}>
                  {index + 1}º
                </span>
              </div>
              <div className="ranking-name">{adv.nome}</div>
              <div className="ranking-concluidos">{adv.concluidos}</div>
              <div className="ranking-total">{adv.total}</div>
              <div className="ranking-produtividade">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${adv.produtividade}%` }}
                  ></div>
                  <span className="progress-text">{adv.produtividade}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Dashboard;