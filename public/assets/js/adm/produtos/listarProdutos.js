// Função para exibir os produtos na tabela HTML
function exibirProdutos() {
    const tbody = document.querySelector('#listaProdutos tbody');

    // Limpa a tabela antes de adicionar os produtos novamente
    tbody.innerHTML = '';

    // Percorre todas as chaves do localStorage
    for (let chave in localStorage) {
        // Obtém os produtos para a chave atual
        let produtos = JSON.parse(localStorage.getItem(chave));

        // Se houver produtos para esta chave
        if (produtos && produtos.length > 0) {
            // Cabeçalho com a classificação do produto
            const tipoProdutoHeader = document.getElementById('tipoProduto');
            tipoProdutoHeader.textContent = 'Lista Geral';

            // Itera sobre os produtos e adiciona uma linha para cada um
            produtos.forEach((produto, index) => {
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
                        <button id="buttonDetails${index}" class="bg-green-700 text-gray-300 font-extrabold m-auto p-1 w-8 rounded-lg hover:bg-green-600">&darr;</button>
                    </td>
                `;
                tbody.appendChild(dataRow);

                // Linha para os botões
                const buttonRow = document.createElement('tr');
                buttonRow.classList.add('hidden'); // Inicialmente oculto
                buttonRow.innerHTML = `
                    <td colspan="6" class="border border-gray-400">
                        <div class="flex flex-row gap-x-4 justify-center p-2">
                            <button class="bg-green-700 p-1 rounded-md text-gray-200 hover:bg-green-600 hover:shadow-lg btn-edit">Editar</button>
                            <button class="bg-green-700 p-1 rounded-md text-gray-200 hover:bg-green-600 hover:shadow-lg btn-hide">Ocultar</button>
                            <button class="bg-red-800 p-1 rounded-md text-gray-200 hover:bg-red-700 hover:shadow-lg btn-delete">Deletar</button>
                        </div>
                    </td>
                `;
                tbody.appendChild(buttonRow);

                // Adiciona o evento de clique ao botão "buttonDetails"
                const buttonDetails = document.getElementById(`buttonDetails${index}`);
                buttonDetails.addEventListener('click', () => {
                    // Altera a visibilidade do buttonRow ao clicar no botão "buttonDetails"
                    if (buttonRow.classList.contains('hidden')) {
                        buttonRow.classList.remove('hidden');
                    } else {
                        buttonRow.classList.add('hidden');
                    }
                });
            });
        }
    }
}

// Chama a função para exibir os produtos quando a página carrega
window.addEventListener('load', exibirProdutos);

