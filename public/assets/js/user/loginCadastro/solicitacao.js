// Função para buscar o array de solicitações do localStorage
function getStoredSolicitations() {
    return JSON.parse(localStorage.getItem('solicitacoes')) || [];
}

document.getElementById('userRegisterForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    // Captura os valores dos campos do formulário
    var nome = document.getElementById('userRegisterNome').value;
    var cpf = document.getElementById('userRegisterCpf').value;
    var email = document.getElementById('userRegisterEmail').value;
    var senha = document.getElementById('userRegisterSenha').value;
    var confirmarSenha = document.getElementById('userRegisterConfirmarSenha').value;

    // Cria um objeto com os valores capturados, incluindo o campo "status"
    var solicitacao = {
        nome: nome,
        cpf: cpf,
        email: email,
        senha: senha,
        confirmarSenha: confirmarSenha,
        status: "pendente" // Adiciona o campo "status" com o valor padrão "pendente"
    };

    // Obtém o array de solicitações do localStorage
    var arrayDeSolicitacoes = getStoredSolicitations();

    // Adiciona a nova solicitação ao array
    arrayDeSolicitacoes.push(solicitacao);

    // Atualiza o localStorage com o novo array de solicitações
    localStorage.setItem('solicitacoes', JSON.stringify(arrayDeSolicitacoes));

    // Exibe o alerta de solicitação realizada com sucesso
    alert("Solicitação realizada com sucesso.");

    // Redireciona para a página de login
    window.location.href = "../../../../index.html";
});