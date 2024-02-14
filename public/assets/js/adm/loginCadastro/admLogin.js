document.addEventListener("DOMContentLoaded", function () {
    var admLoginForm = document.getElementById('admLoginForm');
    var admLoginCpf = document.getElementById('admLoginCpf');
    var admLoginEmail = document.getElementById('admLoginEmail');
    var admLoginSenha = document.getElementById('admLoginSenha');

    admLoginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita o envio do formulário padrão

        var cpf = admLoginCpf.value;
        var email = admLoginEmail.value;
        var senha = admLoginSenha.value;

        // Obtém os dados do administrador armazenados no localStorage
        var adminDataString = localStorage.getItem('adminData');
        if (!adminDataString) {
            alert('Nenhum administrador cadastrado.');
            return;
        }

        var adminData = JSON.parse(adminDataString);

        // Verifica se os dados de login correspondem aos dados armazenados no localStorage
        if ((cpf === adminData.cpf || email === adminData.email) && senha === adminData.senha) {
            // Redireciona para a página admHome.html
            window.location.href = '../../../view/adm/admHome.html';
        } else {
            alert('CPF, Email ou Senha incorretos.');
        }
    });
});