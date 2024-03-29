function filtrarPorGenero() {
    // Obter o termo de pesquisa digitado pelo usuário
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    console.log('Termo de pesquisa:', searchTerm);
    
    // Obter todas as linhas da tabela de produtos
    const rows = document.querySelectorAll('#listaProdutos tbody tr');
    console.log('Total de linhas:', rows.length);

    // Percorrer todas as linhas da tabela
    rows.forEach(row => {
        // Obter o elemento td:nth-child(2) na linha atual
        const generoCell = row.querySelector('td:nth-child(2)');
        if (generoCell) {
            // Se o elemento existir, obter o texto do gênero
            const genero = generoCell.textContent.trim().toLowerCase();
            console.log('Gênero:', genero);

            // Verificar se o texto do gênero começa com o termo de pesquisa
            if (genero.startsWith(searchTerm)) {
                // Se o gênero começar com o termo de pesquisa, exibir a linha
                row.style.display = '';
            } else {
                // Caso contrário, ocultar a linha
                row.style.display = 'none';
            }
        } else {
            console.error('Elemento não encontrado:', row);
        }
    });
}




// Adiciona eventos de digitação e mudança para a barra de pesquisa e o menu suspenso
document.getElementById('searchInput').addEventListener('input', filtrarPorGenero);

