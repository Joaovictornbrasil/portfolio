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
    // --- CÓDIGO NOVO ADICIONADO AQUI ---
  // Atualiza as imagens dentro do modal, caso ele esteja aberto
  const isNowDarkMode = body.classList.contains('dark-mode');
  const imagesInModal = modal.querySelectorAll('.modal-imagem[data-light-src]');

  imagesInModal.forEach(img => {
    // Usa os data-attributes que adicionamos para trocar a imagem
    img.src = isNowDarkMode ? img.dataset.darkSrc : img.dataset.lightSrc;
  });
});


// ======= MODAL DE PROJETOS =======
const projetos = [
  {
    titulo: "Dashboard de Vendas",
    descricao: "Análise de vendas com gráficos interativos e indicadores-chave.",
    competencias: [
      "Power BI",
      "Visualização de dados",
      "Manipulação de dados",
      "Análise de dados",
      "Tratamento de dados",
      "Limpeza de dados",
      "Pensamento crítico"
    ],
    // SOLUÇÃO: Usando "imagens" (plural) com uma lista de URLs simples.
    // Nenhuma dessas vai mudar com o tema.
    imagens: [
      "assets/dashboard/dashboard.png",
      "assets/dashboard/tabela.png"
    ]
  },
  {
    titulo: "Forgotten",
    descricao: "Nesta realidade, a humanidade avançada enfrenta uma epidemia que degenera lentamente o corpo e força crianças a nascerem prematuras. Para salvar a população, os doentes são isolados em cápsulas de contenção enquanto os Kammerjäger, operadores de elite, enviam seus avatares por nanobots para combater a infecção de dentro do sistema imune. O objetivo é purificar o organismo para a extração segura do CPH4 dos recém-nascidos, um composto essencial usado para curar os adultos. Contudo, a tecnologia das cápsulas foi adaptada para um uso secundário e perigoso: reviver as memórias mais felizes de uma pessoa. Esta experiência, embora reconfortante, tem um custo terrível, drenando a vitalidade do usuário a cada sessão. A máquina, altamente viciante, transforma o alívio em uma lenta sentença de morte. Nosso protagonista, um morador do grande centro comercial de Treggërba, vive o luto pela perda trágica de sua família. Desolado e em busca de qualquer alívio, ele se vê perigosamente atraído pela promessa da cápsula de memórias, um refúgio que pode custar sua própria vida.",
    competencias: [
      "Trabalho em equipe",
      "Roteirização",
    ],
    link: "#",
    // SOLUÇÃO: Usando "imagem" (singular) com uma única URL.
    // Também não vai mudar com o tema.
    imagem: "assets/forgotten/relatorios.jpg"
  },
  {
    titulo: "Somniphobia",
    descricao: "Somniphobia é um jogo de simulação e terror em estilo low-poly, inspirado nos gráficos do PS1, onde você controla um garoto preso em um pesadelo surreal dentro de sua escola distorcida. O objetivo é escapar desse mundo corrompido para finalmente acordar.",
    competencias: [
      "Trabalho em equipe", "Godot", "GDScript", "Github", "Gestão de projetos", "Capacidade de organização"
    ],
    link: "https://github.com/Andersonndiass/Somniphobia?tab=readme-ov-file",
    // SOLUÇÃO: Este é o ÚNICO que tem objetos {light, dark}.
    // Apenas estas imagens vão trocar com o tema.
    imagens: [
      { light: "assets/somniphobia/titulo2.png", dark: "assets/somniphobia/titulo.png" },
      { light: "assets/somniphobia/gameplay2.png", dark: "assets/somniphobia/gameplay2.png" },
      { light: "assets/somniphobia/gameplay.png", dark: "assets/somniphobia/gameplay.png" },
      { light: "assets/somniphobia/init.png", dark: "assets/somniphobia/init.png" }
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

// Função que abre o modal com os dados de um projeto específico
function abrirModal(projeto) {
  modalTitulo.textContent = projeto.titulo;
  modalDescricao.textContent = projeto.descricao;
  modalCompetencias.innerHTML = projeto.competencias.map(c => `<li>${c}</li>`).join("");
  
  // Se o projeto não tiver um link, esconde o botão do modal
  if (projeto.link && projeto.link !== "#") {
      modalLink.href = projeto.link;
      modalLink.style.display = "inline-block";
  } else {
      modalLink.style.display = "none";
  }

  // Lógica da galeria (continua a mesma que fizemos antes)
  modalGaleria.innerHTML = ""; 
  const isDarkMode = document.body.classList.contains('dark-mode');

  if (projeto.imagens && projeto.imagens.length > 0) {
    modalGaleria.innerHTML = projeto.imagens
      .map(imgData => {
        if (typeof imgData === 'object' && imgData.light && imgData.dark) {
          const initialSrc = isDarkMode ? imgData.dark : imgData.light;
          return `<img src="${initialSrc}" class="modal-imagem" alt="${projeto.titulo}" data-light-src="${imgData.light}" data-dark-src="${imgData.dark}">`;
        }
        if (typeof imgData === 'string') {
          return `<img src="${imgData}" class="modal-imagem" alt="${projeto.titulo}">`;
        }
        return '';
      })
      .join("");
  } else if (projeto.imagem) {
    modalGaleria.innerHTML = `<img src="${projeto.imagem}" class="modal-imagem" alt="${projeto.titulo}">`;
  }

  modal.style.display = "block";
}

// Adiciona os eventos de clique
document.querySelectorAll(".projeto-card").forEach((card, index) => {
  const p = projetos[index];
  
  // Tenta encontrar um botão dentro do card
  const btn = card.querySelector(".btn");

  if (btn) {
    // Se encontrou um botão, o evento de clique vai para o botão
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      abrirModal(p);
    });
  } else if (card.classList.contains("modal-trigger")) {
    // Se não tem botão, mas tem a classe 'modal-trigger', o card inteiro fica clicável
    card.addEventListener("click", () => {
      abrirModal(p);
    });
  }
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


// ======= LIGHTBOX DA IMAGEM (VISUALIZADOR) =======
const lightboxModal = document.getElementById('lightbox-modal');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');

// A "mágica" está aqui. Usamos "delegação de evento".
// Como as imagens são criadas dinamicamente, colocamos o "escutador"
// no pai (a galeria) e verificamos se o clique foi em uma imagem.
modalGaleria.addEventListener('click', (e) => {
  // Verifica se o elemento clicado tem a classe 'modal-imagem'
  if (e.target.classList.contains('modal-imagem')) {
    lightboxModal.style.display = 'block'; // Mostra o lightbox
    lightboxImage.src = e.target.src;      // Coloca a imagem clicada dentro dele
  }
});

// Função para fechar o lightbox
function closeLightbox() {
  lightboxModal.style.display = 'none';
}

// Eventos para fechar o lightbox:
// 1. Clicando no botão 'X'
lightboxClose.onclick = closeLightbox;

// 2. Clicando no fundo escuro (fora da imagem)
lightboxModal.addEventListener('click', (e) => {
  // Se o clique foi no fundo (o próprio modal) e não na imagem
  if (e.target === lightboxModal) {
    closeLightbox();
  }
});

// ======= FUNCIONALIDADE VER MAIS / VER MENOS =======
document.querySelectorAll('.see-more-btn').forEach(button => {
  button.addEventListener('click', event => {
    // Encontra o card pai mais próximo do botão clicado
    const card = event.target.closest('.projeto-card');
    
    // Adiciona ou remove a classe 'expanded' no card
    card.classList.toggle('expanded');
    
    // Muda o texto do botão com base na presença da classe 'expanded'
    if (card.classList.contains('expanded')) {
      event.target.textContent = 'Ver menos';
    } else {
      event.target.textContent = 'Ver mais';
    }
  });
});