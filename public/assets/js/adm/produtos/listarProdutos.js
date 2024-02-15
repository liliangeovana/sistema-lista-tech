// Função para exibir os produtos na tabela HTML
function exibirProdutos() {
    const tbody = document.querySelector('#listaProdutos tbody');
    const selectFiltroClassificao = document.getElementById('selectFiltroClassificao');
    const tipoSelecionado = selectFiltroClassificao.value;
    const tipoProdutoHeader = document.getElementById('tipoProduto');

    // Limpa a tabela antes de adicionar os produtos novamente
    tbody.innerHTML = '';

    // Define o cabeçalho de acordo com o tipo selecionado
    tipoProdutoHeader.textContent = tipoSelecionado === 'geral' ? 'Lista Geral' : tipoSelecionado.charAt(0).toUpperCase() + tipoSelecionado.slice(1);

    // Obtém os produtos dos tipos selecionados
    let produtosDoTipo = [];
    if (tipoSelecionado === 'geral') {
        // Obtém todos os produtos de todos os tipos
        for (let tipo in localStorage) {
            if (localStorage.hasOwnProperty(tipo) && tipo !== 'produtosPorTipo') {
                const produtosDoTipoAtual = JSON.parse(localStorage.getItem(tipo));
                if (produtosDoTipoAtual && produtosDoTipoAtual.length > 0) {
                    produtosDoTipo = produtosDoTipo.concat(produtosDoTipoAtual);
                }
            }
        }
    } else {
        // Obtém os produtos do tipo selecionado
        produtosDoTipo = JSON.parse(localStorage.getItem(tipoSelecionado)) || [];
    }

    // Exibe os produtos na tabela
    produtosDoTipo.forEach((produto, index) => {
        adicionarLinhaProduto(produto, index);
    });
}

// Função para adicionar uma linha na tabela para um produto
function adicionarLinhaProduto(produto, index) {
    const tbody = document.querySelector('#listaProdutos tbody');

    // Converter a data de aaaa-mm-dd para dd-mm-aaaa
    const partesData = produto.validade.split('-');
    const dataFormatada = partesData[2] + '-' + partesData[1] + '-' + partesData[0];

    // Linha para os dados do produto
    const dataRow = document.createElement('tr');
    dataRow.innerHTML = `
        <th scope="row" class="px-6 py-3 w-10 font-medium text-gray-900 whitespace-nowrap border border-gray-400">${index + 1}</th>
        <td class="px-6 border border-gray-400">${produto.genero}</td>
        <td class="px-6 border border-gray-400">${produto.marca || '-'}</td>
        <td class="px-6 border border-gray-400">${produto.unidade}</td>
        <td class="px-6 border border-gray-400">${dataFormatada}</td>
        <td class="px-6 border border-gray-400 w-12 action-cell">
            <button class="bg-green-700 text-gray-300 font-extrabold m-auto p-1 w-8 rounded-lg hover:bg-green-600">&darr;</button>
        </td>
    `;

    // Incluir botões de ação
    const actionButtons = document.createElement('div');
    actionButtons.classList.add('flex', 'flex-row', 'gap-x-4', 'justify-center', 'p-2');
    actionButtons.innerHTML = `
        <button class="bg-green-700 p-1 rounded-md text-gray-200 hover:bg-green-600 hover:shadow-lg">Editar</button>
        <button class="bg-green-700 p-1 rounded-md text-gray-200 hover:bg-green-600 hover:shadow-lg">Ocultar</button>
        <button class="delete-button bg-red-800 p-1 rounded-md text-gray-200 hover:bg-red-700 hover:shadow-lg">Deletar</button>
    `;

    const actionCell = document.createElement('td');
    actionCell.setAttribute('colspan', '6');
    actionCell.classList.add('hidden', 'action-buttons'); // Inicialmente oculto
    actionCell.appendChild(actionButtons);

    // Adicionando a linha de dados e os botões de ação à tabela
    tbody.appendChild(dataRow);
    tbody.appendChild(actionCell);

    // Adicionando evento de clique na célula da última coluna
    const lastCell = dataRow.querySelector('.action-cell button');
    lastCell.addEventListener('click', function() {
        const buttonsRow = dataRow.nextElementSibling;
        buttonsRow.classList.toggle('hidden'); // Alternando visibilidade
    }); 
    
}

// Chama a função para exibir os produtos quando a página carrega e quando o filtro é alterado
window.addEventListener('load', exibirProdutos);
document.getElementById('selectFiltroClassificao').addEventListener('change', exibirProdutos);


