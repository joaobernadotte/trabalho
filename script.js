// ======== VARIÁVEIS PRINCIPAIS =========
let listaCards = [];

const textoCabecalho = document.getElementById("textoCabecalho");
const imagemCabecalho = document.getElementById("imagemCabecalho");
const corFundoCabecalho = document.getElementById("corFundoCabecalho");
const corTextoCabecalho = document.getElementById("corTextoCabecalho");

const corFundoCards = document.getElementById("corFundoCards");
const corTextoCards = document.getElementById("corTextoCards");

const textoRodape = document.getElementById("textoRodape");
const corFundoRodape = document.getElementById("corFundoRodape");
const corTextoRodape = document.getElementById("corTextoRodape");

const paginaGerada = document.getElementById("paginaGerada");
const areaCards = document.getElementById("areaCards");
const codigoGerado = document.getElementById("codigoGerado");

// ======== FUNÇÕES DE EDIÇÃO =========
function atualizarPagina() {
  let cabecalho = `
    <header style="background:${corFundoCabecalho.value}; color:${corTextoCabecalho.value}; padding:10px;">
      ${imagemCabecalho.value ? `<img src='${imagemCabecalho.value}' style='height:80px;'>` : ""}
      <h1>${textoCabecalho.value}</h1>
    </header>
  `;

  let cardsHTML = "<section style='padding:10px;'>";
  listaCards.forEach(c => {
    cardsHTML += `
      <div class='card-noticia' style='background:${corFundoCards.value}; color:${corTextoCards.value};'>
        ${c.imagem ? `<img src='${c.imagem}'>` : ""}
        <h3>${c.titulo}</h3>
        <p>${c.texto}</p>
      </div>
    `;
  });
  cardsHTML += "</section>";

  let rodape = `
    <footer style="background:${corFundoRodape.value}; color:${corTextoRodape.value}; text-align:center; padding:10px;">
      ${textoRodape.value}
    </footer>
  `;

  let pagina = cabecalho + cardsHTML + rodape;
  paginaGerada.innerHTML = pagina;
  codigoGerado.value = pagina;
}

// ======== FUNÇÕES DE CARDS =========
function adicionarCard() {
  if (listaCards.length >= 30) return alert("Máximo de 30 cards!");
  let novoCard = { imagem: "", titulo: "Título da Notícia", texto: "Texto da notícia..." };
  listaCards.push(novoCard);
  mostrarCards();
  atualizarPagina();
}

function removerCard() {
  listaCards.pop();
  mostrarCards();
  atualizarPagina();
}

function mostrarCards() {
  areaCards.innerHTML = "";
  listaCards.forEach((c, i) => {
    let div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <label>Imagem (URL):</label>
      <input type='text' value='${c.imagem}' onchange='editarCard(${i}, "imagem", this.value)'>
      <label>Título:</label>
      <input type='text' value='${c.titulo}' onchange='editarCard(${i}, "titulo", this.value)'>
      <label>Texto:</label>
      <textarea onchange='editarCard(${i}, "texto", this.value)'>${c.texto}</textarea>
    `;
    areaCards.appendChild(div);
  });
}

function editarCard(indice, campo, valor) {
  listaCards[indice][campo] = valor;
  atualizarPagina();
}

// ======== FUNÇÕES DE LOCALSTORAGE =========
function salvarPagina() {
  let codigoCompleto =
    `<!DOCTYPE html><html lang='pt-br'><head><meta charset='UTF-8'><title>Página Gerada</title></head><body>` +
    codigoGerado.value +
    `</body></html>`;
  localStorage.setItem("paginaGerada", codigoCompleto);
  alert("Página salva no localStorage!");
}

function mostrarPaginaSalva() {
  let codigo = localStorage.getItem("paginaGerada");
  if (!codigo) return alert("Nenhuma página salva!");
  codigoGerado.value = codigo;
}

function limparLocal() {
  localStorage.removeItem("paginaGerada");
  alert("LocalStorage limpo!");
}

// ======== EVENTOS =========
document.getElementById("adicionarCard").onclick = adicionarCard;
document.getElementById("removerCard").onclick = removerCard;
document.getElementById("salvarPagina").onclick = salvarPagina;
document.getElementById("mostrarPaginaSalva").onclick = mostrarPaginaSalva;
document.getElementById("limparLocal").onclick = limparLocal;

document.querySelectorAll("input, textarea").forEach(el => {
  el.addEventListener("input", atualizarPagina);
});

// Inicia com a página vazia
atualizarPagina();
