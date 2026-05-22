// ==========================================================================
// SELEÇÃO DOS ELEMENTOS DO DOM
// ==========================================================================
const botoesPedir = document.querySelectorAll('.botao-pedir');
const listaCarrinho = document.getElementById('lista-carrinho');
const totalCarrinho = document.getElementById('total');

// Elementos do Modal (Escopo da Atividade 2)
const botaoFinalizar = document.getElementById('botao-finalizar');
const modalPedido = document.getElementById('modal-pedido');
const overlayModal = document.getElementById('overlay-modal');
const botaoFecharModal = document.getElementById('botao-fechar-modal');
const botaoConfirmar = document.getElementById('botao-confirmar');
const modalListaPizzas = document.getElementById('modal-lista-pizzas');
const modalQuantidade = document.getElementById('modal-quantidade');
const modalValorTotal = document.getElementById('modal-valor-total');

// ==========================================================================
// [ATIVIDADE 3] INICIALIZAÇÃO DO ESTADO COM PERSISTÊNCIA
// ==========================================================================
// [O Pulo do Gato]: Declaramos a variável uma única vez no topo. Se houver dados
// no localStorage, ela carrega; caso contrário, inicia como um array vazio [].
let carrinho = JSON.parse(localStorage.getItem('carrinhoFatec')) || [];


// ==========================================================================
// [ATIVIDADE 1 & 3] MANIPULAÇÃO E ATUALIZAÇÃO DO CARRINHO
// ==========================================================================

/**
 * Renderiza os itens na barra lateral do carrinho e atualiza o preço total.
 * Mescla a Atividade 1 (DOM dinâmico) com a Atividade 3 (Salvamento automático).
 */
function atualizarCarrinho() {
    // 1. Limpa a lista atual para evitar duplicatas visuais
    listaCarrinho.innerHTML = '';
    let valorTotal = 0;

    // 2. Percorre o array do carrinho construindo o HTML de cada item
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

    // 3. Atualiza o valor total na interface lateral
    totalCarrinho.textContent = `Total: R$ ${valorTotal.toFixed(2)}`;

    // 4. Vincula os eventos de clique nos botões de remoção criados
    atribuirEventosRemover();

    // 5. [ATIVIDADE 3]: Salva o estado atual do array convertido em string
    localStorage.setItem('carrinhoFatec', JSON.stringify(carrinho));
}

/**
 * Captura o clique no botão remover específico usando o índice do array.
 */
function atribuirEventosRemover() {
    const botoesRemover = document.querySelectorAll('.botao-remover');
    botoesRemover.forEach(botao => {
        botao.addEventListener('click', (event) => {
            const indexParaRemover = event.target.getAttribute('data-index');
            
            // Remove o item do array e atualiza a tela/localStorage
            carrinho.splice(indexParaRemover, 1);
            atualizarCarrinho(); 
        });
    });
}

/**
 * Adiciona uma pizza selecionada ao array do carrinho
 */
function adicionarAoCarrinho(event) {
    event.preventDefault(); // Evita o comportamento padrão do link '#'
    
    const elemento = event.target;
    const sabor = elemento.getAttribute('data-sabor');
    const preco = parseFloat(elemento.getAttribute('data-preco'));

    carrinho.push({ sabor, preco });
    atualizarCarrinho();
}


// ==========================================================================
// [ATIVIDADE 2] LÓGICA DO MODAL COM RESUMO DO PEDIDO
// ==========================================================================

/**
 * Altera a visibilidade do modal injetando/removendo a classe CSS 'ativo'
 */
function alternarModal() {
    modalPedido.classList.toggle('ativo');
    overlayModal.classList.toggle('ativo');

    // Preenche os dados dinamicamente apenas se o modal estiver abrindo
    if (modalPedido.classList.contains('ativo')) {
        renderizarResumoModal();
    }
}

/**
 * Agrupa itens repetidos e popula as informações de resumo do modal
 */
function renderizarResumoModal() {
    modalListaPizzas.innerHTML = '';
    let totalAcumulado = 0;
    const contagemPizzas = {};

    // Mapeia quantidades por sabor e soma o total
    carrinho.forEach(item => {
        contagemPizzas[item.sabor] = (contagemPizzas[item.sabor] || 0) + 1;
        totalAcumulado += item.preco;
    });

    // Insere os elementos de lista estruturados
    for (const sabor in contagemPizzas) {
        const li = document.createElement('li');
        li.innerHTML = `${sabor} <span>(x${contagemPizzas[sabor]})</span>`;
        modalListaPizzas.appendChild(li);
    }

    // Alimenta os contadores globais do modal
    modalQuantidade.textContent = carrinho.length;
    modalValorTotal.textContent = totalAcumulado.toFixed(2);
}


// ==========================================================================
// ASSINATURA DOS EVENTOS (LISTENERS)
// ==========================================================================

// Cliques nos botões "Pedir Agora" do cardápio
botoesPedir.forEach(botao => {
    botao.addEventListener('click', adicionarAoCarrinho);
});

// Abertura do Modal ao clicar em "Finalizar Pedido"
botaoFinalizar.addEventListener('click', () => {
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio! Adicione uma pizza antes de finalizar.');
        return;
    }
    alternarModal();
});

// Fechamento do Modal
botaoFecharModal.addEventListener('click', alternarModal);
overlayModal.addEventListener('click', alternarModal);

// Confirmação final da compra
botaoConfirmar.addEventListener('click', () => {
    alert('Pedido confirmado com sucesso! 🍕');
    carrinho = []; // Limpa o estado local
    alternarModal(); // Fecha a janela do resumo
    atualizarCarrinho(); // Zera o carrinho lateral e limpa o localStorage
});

// ==========================================================================
// [ATIVIDADE 3] MONITORAMENTO DE INICIALIZAÇÃO DA PÁGINA (F5)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    // Ao carregar a página, se o localStorage contiver algo, reconstrói o DOM
    atualizarCarrinho();
});