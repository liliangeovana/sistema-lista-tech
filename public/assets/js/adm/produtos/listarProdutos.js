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

    // Obtém os produtos do localStorage
    const produtosData = JSON.parse(localStorage.getItem('produtosData'));

    // Se houver produtos
    if (produtosData) {
        // Se o tipo selecionado for "geral" ou se não houver um tipo selecionado específico
        if (tipoSelecionado === 'geral') {
            for (let tipo in produtosData) {
                const produtosDoTipo = produtosData[tipo];
                if (produtosDoTipo && produtosDoTipo.length > 0) {
                    produtosDoTipo.forEach((produto, index) => {
                        adicionarLinhaProduto(produto, index);
                    });
                }
            }
        } else {
            // Se houver produtos para o tipo selecionado
            const produtosDoTipo = produtosData[tipoSelecionado];
            if (produtosDoTipo && produtosDoTipo.length > 0) {
                produtosDoTipo.forEach((produto, index) => {
                    adicionarLinhaProduto(produto, index);
                });
            }
        }
    }
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
        <td class="px-6  border border-gray-400 w-12">
            <button id="buttonDetails" class="bg-green-700 text-gray-300 font-extrabold m-auto p-1 w-8 rounded-lg hover:bg-green-600">&darr;</button>
        </td>
    `;
    tbody.appendChild(dataRow);
}

// Chama a função para exibir os produtos quando a página carrega e quando o filtro é alterado
window.addEventListener('load', exibirProdutos);
document.getElementById('selectFiltroClassificao').addEventListener('change', exibirProdutos);



