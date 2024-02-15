// Função para verificar se o login é permitido com base no status do usuário
function isLoginAllowed(user) {
    return user && user.status === "permitido";
}

// Função para buscar o array de solicitações do localStorage
function getStoredSolicitations() {
    return JSON.parse(localStorage.getItem('solicitacoes')) || [];
}

// Função para realizar o login do usuário
function loginUser(email, senha) {
    var arrayDeSolicitacoes = getStoredSolicitations();
    // Procura pelo usuário com o email fornecido
    var user = arrayDeSolicitacoes.find(function(user) {
        return user.email === email;
    });
    // Verifica se o login é permitido
    if (isLoginAllowed(user)) {
        console.log('logado!');
        // Login permitido, redireciona o usuário para a página principal, por exemplo
        window.location.href = '../../user/userHome.html';
    } else {
        // Login não permitido, exibe uma mensagem de erro
        alert("Login não permitido.");
    }
}

// Evento de envio do formulário de login
document.getElementById('userLoginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    // Captura os valores dos campos do formulário
    var email = document.getElementById('userLoginEmail').value;
    var senha = document.getElementById('userLoginSenha').value;

    // Realiza o login do usuário
    loginUser(email, senha);
});
