document.getElementById("logoutButton").addEventListener("click", confirmLogout);
        
        function confirmLogout() {
            var userDecision = confirm("Deseja limpar o localStorage ao sair?");

            if (userDecision) {
                // Limpar o localStorage
                localStorage.clear();
                alert("localStorage limpo. Você será redirecionado para a página de login.");
                window.location.href = "../../../../index.html";
            } else {
                alert("Você escolheu não limpar o localStorage. Você será redirecionado para a página de login.");
                window.location.href = "../../../../index.html";
            }
        }