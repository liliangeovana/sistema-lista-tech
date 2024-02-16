// Função para buscar o array de solicitações do localStorage
function getStoredSolicitations() {
    return JSON.parse(localStorage.getItem('solicitacoes')) || [];
}

// Função para redirecionar para a página de listas do usuário com base no CPF
function redirectToUserListPage(cpf) {
    window.location.href = `./listasUsuarios.html?cpf=${cpf}`;
}

// Função para renderizar as solicitações na página em uma tabela Tailwind CSS
function renderSolicitations() {
    var arrayDeSolicitacoes = getStoredSolicitations();
    var tbody = document.querySelector('#listaProdutos tbody');

    // Limpa o conteúdo anterior
    tbody.innerHTML = '';

    // Verifica se há solicitações para exibir
    if (arrayDeSolicitacoes.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7">Não há solicitações registradas.</td></tr>';
        return;
    }

    // Adiciona cada solicitação à tabela
    arrayDeSolicitacoes.forEach(function(solicitacao, index) {
        var row = document.createElement('tr');
        row.innerHTML = `
            <td class="py-2 px-3 border border-gray-400">${index + 1}</td>
            <td class="px-3 border border-gray-400">${solicitacao.nome}</td>
            <td class="px-3 border border-gray-400">${solicitacao.cpf}</td>
            <td class="px-3 border border-gray-400">${solicitacao.email}</td>
            <td class="px-3 border border-gray-400">${solicitacao.status}</td>
            <td class="border border-gray-400 p-2">
                <button class="px-2 py-1 bg-green-800 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500" onclick="permitirSolicitacao(${index})">Permitir</button>
                <button class="px-2 py-1 bg-red-800 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500" onclick="bloquearSolicitacao(${index})">Bloquear</button>
                <button class="px-2 py-1 bg-gray-800 text-white rounded hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-500" onclick="deletarSolicitacao(${index})">Deletar</button>
            </td>
            <td class="px-6 border border-gray-400 w-fit action-cell">
                <button class="button-details bg-green-700 text-gray-300 font-extrabold m-auto p-1 w-8 rounded-lg hover:bg-green-600" onclick="redirectToUserListPage('${solicitacao.cpf}')">...</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Função para permitir uma solicitação
function permitirSolicitacao(index) {
    var arrayDeSolicitacoes = getStoredSolicitations();
    arrayDeSolicitacoes[index].status = 'permitido';
    localStorage.setItem('solicitacoes', JSON.stringify(arrayDeSolicitacoes));
    renderSolicitations();
}

// Função para bloquear uma solicitação
function bloquearSolicitacao(index) {
    var arrayDeSolicitacoes = getStoredSolicitations();
    arrayDeSolicitacoes[index].status = 'bloqueado';
    localStorage.setItem('solicitacoes', JSON.stringify(arrayDeSolicitacoes));
    renderSolicitations();
}

// Função para deletar uma solicitação
function deletarSolicitacao(index) {
    var arrayDeSolicitacoes = getStoredSolicitations();
    arrayDeSolicitacoes.splice(index, 1);
    localStorage.setItem('solicitacoes', JSON.stringify(arrayDeSolicitacoes));
    renderSolicitations();
}

// Chama a função para renderizar as solicitações quando a página carrega
document.addEventListener('DOMContentLoaded', renderSolicitations);


