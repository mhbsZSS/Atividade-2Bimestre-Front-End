// ==========================================================================
// SELEÇÃO DE ELEMENTOS COMUNS / CARDÁPIO
// ==========================================================================
const botoesPedir = document.querySelectorAll('.botao-pedir');
let carrinho = []; // Estado global usado por ambas as atividades

// ==========================================================================
// ---------------------- ESCOPO DA ATIVIDADE 1 ----------------------
// ==========================================================================
const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.getElementById('total');

function atualizarCarrinho() {
    listaCarrinho.innerHTML = '';
    let valorTotal = 0;

    carrinho.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'item-carrinho';
        li.innerHTML = `
            <div class="item-info">
                <span class="item-texto"><strong>${item.sabor}</strong></span>
                <span class="item-texto" style="color: #2e7d32;">R$ ${item.preco.toFixed(2)}</span>
            </div>
            <button class="botao-remover" data-index="${index}">&times;</button>
        `;
        listaCarrinho.appendChild(li);
        valorTotal += item.preco;
    });

    totalCarrinho.textContent = `Total: R$ ${valorTotal.toFixed(2)}`;
    atribuirEventosRemover();
}

function atribuirEventosRemover() {
    const botoesRemover = document.querySelectorAll('.botao-remover');
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', (event) => {
            const indexParaRemover = event.target.getAttribute('data-index');
            carrinho.splice(indexParaRemover, 1);
            atualizarCarrinho(); // Atividade 1 atualiza apenas a si mesma aqui
        });
    });
}

function adicionarAoCarrinho(event) {
    event.preventDefault();
    const elemento = event.target;
    const sabor = elemento.getAttribute('data-sabor');
    const preco = parseFloat(elemento.getAttribute('data-preco'));

    carrinho.push({ sabor, preco });
    atualizarCarrinho();
}

// Vinculação dos botões do cardápio (Atividade 1)
botoesPedir.forEach(botao => {
    botao.addEventListener('click', adicionarAoCarrinho);
});




botaoFecharModal.addEventListener('click', alternarModal);
overlayModal.addEventListener('click', alternarModal);

botaoConfirmar.addEventListener('click', () => {
    alert('Pedido confirmado com sucesso! 🍕');
    carrinho = []; 
    alternarModal();
    atualizarCarrinho(); // Reaproveita a renderização da Atividade 1 para zerar o carrinho lateral
});