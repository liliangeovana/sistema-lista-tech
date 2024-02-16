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

    // Verifica se o tipo selecionado está entre os tipos desejados
    if (tipoSelecionado === 'estivas' || tipoSelecionado === 'proteina' || tipoSelecionado === 'hortifruti') {
        // Obtém os produtos do tipo selecionado
        produtosDoTipo = JSON.parse(localStorage.getItem(tipoSelecionado)) || [];
    } else if (tipoSelecionado === 'geral') {
        // Obtém todos os produtos de todos os tipos
        for (let tipo in localStorage) {
            if (localStorage.hasOwnProperty(tipo) && tipo !== 'produtosPorTipo' && (tipo === 'estivas' || tipo === 'proteina' || tipo === 'hortifruti')) {
                const produtosDoTipoAtual = JSON.parse(localStorage.getItem(tipo));
                if (produtosDoTipoAtual && produtosDoTipoAtual.length > 0) {
                    produtosDoTipo = produtosDoTipo.concat(produtosDoTipoAtual);
                }
            }
        }
    }

    // Exibe os produtos na tabela
    produtosDoTipo.forEach((produto, index) => {
        adicionarLinhaProduto(produto, index);
    });
}

// Função para adicionar uma linha na tabela para um produto
function adicionarLinhaProduto(produto, index) {
    const tbody = document.querySelector('#listaProdutos tbody');

    // Verificar se a propriedade validade está definida
    const dataFormatada = produto.validade ? formatarData(produto.validade) : '-';

    // Função para formatar a data de aaaa-mm-dd para dd-mm-aaaa
    function formatarData(data) {
        const partesData = data.split('-');
        return `${partesData[2]}-${partesData[1]}-${partesData[0]}`;
    }

    // Linha para os dados do produto
    const dataRow = document.createElement('tr');
    dataRow.innerHTML = `
        <th scope="row" class="px-6 py-3 w-10 font-medium text-gray-900 whitespace-nowrap border border-gray-400">${index+1}</th>
        <td class="px-6 border border-gray-400">${produto.genero}</td>
        <td class="px-6 border border-gray-400">${produto.marca || '-'}</td>
        <td class="px-6 border border-gray-400">${produto.unidade}</td>
        <td class="px-6 border border-gray-400">${dataFormatada}</td>
        <td class="px-6 py-2 justify-center  border-gray-400 action-cell">
            <div class="flex flex-row gap-x-2">
                <button type="button" class="subtract-button bg-red-700 text-gray-300 font-extrabold m-auto p-1 w-8 rounded-lg hover:bg-red-600">-</button>
                    <span class="quantidade">${produto.quantidade || 0}</span>
                <button type="button" class="add-button bg-green-700 text-gray-300 font-extrabold m-auto p-1 w-8 rounded-lg hover:bg-green-600">+</button>
            </div>
        </td>
    `;

    // Adicionando evento de clique nos botões de adição e remoção
    const subtractButton = dataRow.querySelector('.subtract-button');
    const addButton = dataRow.querySelector('.add-button');

    subtractButton.addEventListener('click', function() {
        let quantidade = parseInt(dataRow.querySelector('.quantidade').textContent);
        quantidade = quantidade > 0 ? quantidade - 1 : 0;
        dataRow.querySelector('.quantidade').textContent = quantidade;
        // Aqui você pode adicionar lógica para atualizar a quantidade na lista do usuário
    });

    addButton.addEventListener('click', function() {
        let quantidade = parseInt(dataRow.querySelector('.quantidade').textContent);
        quantidade = quantidade + 1;
        dataRow.querySelector('.quantidade').textContent = quantidade;
        // Aqui você pode adicionar lógica para atualizar a quantidade na lista do usuário
    });

    // Adicionando a linha de dados e os botões de ação à tabela
    tbody.appendChild(dataRow);
}



// Chama a função para exibir os produtos quando a página carrega e quando o filtro é alterado
window.addEventListener('load', exibirProdutos);
document.getElementById('selectFiltroClassificao').addEventListener('change', exibirProdutos);