var form = document.getElementById('admRegisterForm');
var nomeInput = document.getElementById('admRegisterNome');
var cpfInput = document.getElementById('admRegisterCpf');
var emailInput = document.getElementById('admRegisterEmail');
var senhaInput = document.getElementById('admRegisterSenha');
var confirmarSenhaInput = document.getElementById('admRegisterConfirmarSenha');

// Evento de envio de formulário
form.addEventListener('submit', function(event) {
    // Previna o envio do formulário padrão
    event.preventDefault();

    // Verificando se a senha e a confirmação de senha correspondem
    if (senhaInput.value !== confirmarSenhaInput.value) {
        alert('A senha e a confirmação de senha não correspondem.');
        return;
    }

    // Criando um objeto com os dados do formulário
    var adminData = {
        nome: nomeInput.value,
        cpf: cpfInput.value,
        email: emailInput.value,
        senha: senhaInput.value
    };

    // Convertendo o objeto em uma string JSON
    var adminDataString = JSON.stringify(adminData);

    // Armazenando a string JSON no localStorage
    localStorage.setItem('adminData', adminDataString);

    // Redirecionando para a página de login do administrador
    alert('Administrador cadastrado com sucesso!');
    window.location.href = 'admLogin.html';
});