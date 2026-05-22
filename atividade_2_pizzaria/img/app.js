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


// ==========================================================================
// ---------------------- ESCOPO DA ATIVIDADE 2 ----------------------
// ==========================================================================
// Todo o código abaixo pertence à Atividade 2 e não interfere na Atividade 1
const botaoFinalizar = document.getElementById('botao-finalizar');
const modalPedido = document.getElementById('modal-pedido');
const overlayModal = document.getElementById('overlay-modal');
const botaoFecharModal = document.getElementById('botao-fechar-modal');
const botaoConfirmar = document.getElementById('botao-confirmar');
const modalListaPizzas = document.getElementById('modal-lista-pizzas');
const modalQuantidade = document.getElementById('modal-quantidade');
const modalValorTotal = document.getElementById('modal-valor-total');

function alternarModal() {
    modalPedido.classList.toggle('ativo');
    overlayModal.classList.toggle('ativo');

    if (modalPedido.classList.contains('ativo')) {
        renderizarResumoModal();
    }
}

function renderizarResumoModal() {
    modalListaPizzas.innerHTML = '';
    let totalAcumulado = 0;
    const contagemPizzas = {};

    carrinho.forEach(item => {
        contagemPizzas[item.sabor] = (contagemPizzas[item.sabor] || 0) + 1;
        totalAcumulado += item.preco;
    });

    for (const sabor in contagemPizzas) {
        const li = document.createElement('li');
        li.innerHTML = `${sabor} <span>(x${contagemPizzas[sabor]})</span>`;
        modalListaPizzas.appendChild(li);
    }

    modalQuantidade.textContent = carrinho.length;
    modalValorTotal.textContent = totalAcumulado.toFixed(2);
}

// Eventos exclusivos do Modal (Atividade 2)
botaoFinalizar.addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio!');
        return;
    }
    alternarModal();
});

botaoFecharModal.addEventListener('click', alternarModal);
overlayModal.addEventListener('click', alternarModal);

botaoConfirmar.addEventListener('click', () => {
    alert('Pedido confirmado com sucesso! 🍕');
    carrinho = []; 
    alternarModal();
    atualizarCarrinho(); // Reaproveita a renderização da Atividade 1 para zerar o carrinho lateral
});