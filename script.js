// ======= TEMA CLARO/ESCURO =======
const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Carregar tema salvo
if (localStorage.getItem("theme") === "dark") {
  body.classList.add("dark-mode");
  toggleBtn.checked = true;
}

// Alternar tema
toggleBtn.addEventListener("change", () => {
  body.classList.toggle("dark-mode");
  localStorage.setItem(
    "theme",
    body.classList.contains("dark-mode") ? "dark" : "light"
  );
});

// ======= MODAL DE PROJETOS =======
const projetos = [
  {
    titulo: "Dashboard de Vendas",
    descricao: "Análise de vendas com gráficos interativos e indicadores-chave.",
    competencias: [
      "Power BI e visualização de dados",
      "SQL e modelagem de banco de dados",
      "Apresentação de indicadores de performance (KPIs)"
    ],
    link: "#",
    imagem: "assets/dashboard/dashboard.png"
  },
  {
    titulo: "Automação de Relatórios",
    descricao: "Script em Python para gerar relatórios automáticos de performance.",
    competencias: [
      "Python e bibliotecas pandas/openpyxl",
      "Automação de processos",
      "Manipulação de arquivos Excel"
    ],
    link: "#",
    imagem: "assets/forgotten/relatorios.jpg"
  },
  {
    titulo: "Somniphobia",
    descricao: "Somniphobia é um jogo de simulação e terror em estilo low-poly, inspirado nos gráficos do PS1, onde você controla um garoto preso em um pesadelo surreal dentro de sua escola distorcida. O objetivo é escapar desse mundo corrompido para finalmente acordar.",
    competencias: [
      "Trabalho em equipe",
      "Godot",
      "GDScript",
      "Github",
      "Gestão de projetos",
      "Capacidade de organização"
    ],
    link: "https://github.com/Andersonndiass/Somniphobia?tab=readme-ov-file",
    imagens: [
      "assets/somniphobia/titulo.png",
      "assets/somniphobia/gameplay2.png",
      "assets/somniphobia/gameplay.png",
      "assets/somniphobia/init.png"
    ]
  }
];

const modal = document.getElementById("modal");
const modalTitulo = document.getElementById("modal-titulo");
const modalDescricao = document.getElementById("modal-descricao");
const modalCompetencias = document.getElementById("modal-competencias");
const modalLink = document.getElementById("modal-link");
const modalImagem = document.getElementById("modal-imagem");
const closeBtn = document.querySelector(".close");
const modalGaleria = document.getElementById("modal-galeria");

// Abrir modal
document.querySelectorAll(".projeto-card .btn").forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const p = projetos[index];

    modalTitulo.textContent = p.titulo;
    modalDescricao.textContent = p.descricao;
    modalCompetencias.innerHTML = p.competencias.map(c => `<li>${c}</li>`).join("");
    modalLink.href = p.link;

    // === GALERIA ===
    if (p.imagens && p.imagens.length > 0) {
      modalGaleria.innerHTML = p.imagens
        .map(img => `<img src="${img}" class="modal-imagem" alt="${p.titulo}">`)
        .join("");
    } else if (p.imagem) {
      modalGaleria.innerHTML = `<img src="${p.imagem}" class="modal-imagem" alt="${p.titulo}">`;
    } else {
      modalGaleria.innerHTML = "";
    }

    modal.style.display = "block";
  });
});

// Fechar modal
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = (event) => {
  if (event.target === modal) modal.style.display = "none";
};

// ======= SCROLL REVEAL =======
ScrollReveal().reveal(".section", {
  duration: 1000,
  distance: "40px",
  origin: "bottom",
  easing: "ease-in-out",
  reset: false
});
