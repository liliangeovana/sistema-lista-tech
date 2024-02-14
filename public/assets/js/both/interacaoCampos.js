var CpfBlock = document.getElementById ('CpfBlock');
var EmailBlock = document.getElementById ('EmailBlock');

//ADM
var admLoginCpf = document.getElementById ('admLoginCpf');
var admLoginEmail = document.getElementById ('admLoginEmail');

//USER
var userLoginCpf = document.getElementById ('userLoginCpf');
var userLoginEmail = document.getElementById ('userLoginEmail');

var optionMessage = document.getElementById('loginOptionMessage');
var option = document.getElementById('option');

document.addEventListener("DOMContentLoaded", function () {

    option.addEventListener('click', function(){
        CpfBlock.style.display = 'flex';
        EmailBlock.style.display = 'flex';
        optionMessage.style.display = 'none';
    });

    // Verifica se estamos na página de login do administrador
    var isAdmLoginPage = window.location.pathname.includes('admLogin.html');

    //SE ESTIVER NA PÁGINA DE ADM
    if (isAdmLoginPage) {
        admLoginCpf.addEventListener('focus', function () {
            EmailBlock.style.display = 'none';
            optionMessage.style.display = 'block';
            option.innerHTML = 'Email';
        });

        admLoginEmail.addEventListener('focus', function () {
            CpfBlock.style.display = 'none';
            optionMessage.style.display = 'block';
            option.innerHTML = 'CPF';
        });
    //SE ESTIVER NA PÁGINA USER
    } else {
        userLoginCpf.addEventListener('focus', function () {
            EmailBlock.style.display = 'none';
            optionMessage.style.display = 'block';
            option.innerHTML = 'Email';
        });

        userLoginEmail.addEventListener('focus', function () {
            CpfBlock.style.display = 'none';
            optionMessage.style.display = 'block';
            option.innerHTML = 'CPF';
        });
    }
});

//Existencia de um ADM 
document.addEventListener("DOMContentLoaded", function () {
    // Verifica se há um objeto no localStorage chamado admData
    var admData = localStorage.getItem('adminData');

    // Se admData existir, oculta o link "Cadastrar administrador"
    if (admData) {
        var cadastrarLink = document.getElementById('admSolicitarCadastro');
        cadastrarLink.style.display = 'none';
    }
});