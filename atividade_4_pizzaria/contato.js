// ==========================================================================
// SELEÇÃO DOS ELEMENTOS DO DOM (Baseado nas classes do seu CSS)
// ==========================================================================
const formulario = document.querySelector('.formulario-contato');
const campoNome = document.getElementById('nome'); // Assumindo esses IDs no seu HTML de contato
const campoEmail = document.getElementById('email');
const campoMensagem = document.getElementById('mensagem');

// Elementos onde as mensagens de erro serão exibidas
const erroNome = document.getElementById('erro-nome');
const erroEmail = document.getElementById('erro-email');
const erroMensagem = document.getElementById('erro-mensagem');

// ==========================================================================
// FUNÇÕES DE VALIDAÇÃO (Regras de Negócio)
// ==========================================================================

/**
 * Valida o formato do e-mail usando uma Expressão Regular (Regex) simples.
 */
function validarFormatoEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

/**
 * Limpa os estados de erro visuais antes de uma nova validação.
 */
function limparErros() {
    // Remove os textos de erro
    erroNome.textContent = '';
    erroEmail.textContent = '';
    erroMensagem.textContent = '';

    // Remove a classe de borda vermelha (.campo-erro) do seu CSS
    campoNome.classList.remove('campo-erro');
    campoEmail.classList.remove('campo-erro');
    campoMensagem.classList.remove('campo-erro');
}

/**
 * [O Pulo do Gato - Validação e UX]
 * Analisa campo por campo, aplica as regras e injeta o feedback visual imediato.
 */
function validarFormulario(event) {
    // Bloqueia o envio e o recarregamento automático da página
    event.preventDefault();

    // Limpa validações anteriores
    limparErros();

    let formularioValido = true;

    // 1. Validação do Campo: Nome (Obrigatório)
    if (campoNome.value.trim() === '') {
        erroNome.textContent = 'O campo Nome é obrigatório.';
        campoNome.classList.add('campo-erro'); // Aciona o estilo CSS .campo-erro
        formularioValido = false;
    }

    // 2. Validação do Campo: E-mail (Obrigatório e formato válido)
    const emailValor = campoEmail.value.trim();
    if (emailValor === '') {
        erroEmail.textContent = 'O campo E-mail é obrigatório.';
        campoEmail.classList.add('campo-erro');
        formularioValido = false;
    } else if (!validarFormatoEmail(emailValor)) {
        erroEmail.textContent = 'Por favor, insira um e-mail válido (ex: nome@fatec.sp.gov.br).';
        campoEmail.classList.add('campo-erro');
        formularioValido = false;
    }

    // 3. Validação do Campo: Mensagem (Obrigatório e mínimo de 10 caracteres)
    const mensagemValor = campoMensagem.value.trim();
    if (mensagemValor === '') {
        erroMensagem.textContent = 'O campo Mensagem é obrigatório.';
        campoMensagem.classList.add('campo-erro');
        formularioValido = false;
    } else if (mensagemValor.length < 10) {
        erroMensagem.textContent = `A mensagem está muito curta. Escreva pelo menos 10 caracteres (atualmente: ${mensagemValor.length}).`;
        campoMensagem.classList.add('campo-erro');
        formularioValido = false;
    }

    // Se passar por todas as checagens, o formulário é enviado com sucesso
    if (formularioValido) {
        exibirMensagemSucesso();
    }
}

/**
 * Disparado apenas quando todos os critérios de aceitação forem atingidos.
 */
function exibirMensagemSucesso() {
    // Exibe o feedback visual de sucesso usando a classe .mensagem-sucesso do seu CSS
    const containerForm = document.querySelector('.container-formulario');
    
    containerForm.innerHTML = `
        <div class="mensagem-sucesso">
            <h3>Obrigado pelo contato, ${campoNome.value.trim()}!</h3>
            <p>Sua mensagem foi validada e enviada com sucesso no front-end.</p>
            <br>
            <a href="index.html" style="color: #2e7d32; font-weight: bold; text-decoration: none;">🍕 Voltar para o Cardápio</a>
        </div>
    `;

    // Limpa o localStorage se necessário, ou apenas avisa o console do sucesso do envio
    console.log('Formulário de contato enviado com sucesso!');
}

// ==========================================================================
// REGISTRO DE EVENTOS (LISTENERS)
// ==========================================================================

// Intercepta a tentativa de envio (submit) do formulário
formulario.addEventListener('submit', validarFormulario);