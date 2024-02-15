// Array para armazenar todos os produtos
let produtosData = {};

// Verifica se há dados salvos no localStorage
const produtosDataFromStorage = localStorage.getItem('produtosData');
if (produtosDataFromStorage) {
    // Se houver dados salvos, carrega-os para o objeto produtosData
    produtosData = JSON.parse(produtosDataFromStorage);
}


document.getElementById('produtoForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que o formulário seja enviado

    // Capturando os valores do formulário
    const tipoProduto = document.getElementById('cadastroTipoProduto').value;
    const generoProduto = document.getElementById('cadastroGeneroProduto').value;
    const marcaProduto = document.getElementById('cadastroMarcaProduto').value;
    const unidadeProduto = document.getElementById('opcoesUnidade').value;
    const validadeProduto = document.getElementById('cadastroValidade').value;

    if (!generoProduto || !validadeProduto) {
        alert('Por favor, preencha o campo de gênero e data.');
        return; // Retorna para evitar o cadastro
    }

    // Estruturando os dados em um objeto
    const produto = {
        tipo:tipoProduto,
        genero: generoProduto,
        marca: marcaProduto,
        unidade: unidadeProduto,
        validade: validadeProduto,
        status: 'visivel'
    };

    // Verifica se já existe um array para o tipo de produto, se não existir, cria um novo array
    if (!produtosData[tipoProduto]) {
        produtosData[tipoProduto] = [];
    }

    // Adicionando o novo produto ao array de produtos do tipo correspondente
    produtosData[tipoProduto].push(produto);

    // Salvando os produtos atualizados no localStorage
    localStorage.setItem('produtosData', JSON.stringify(produtosData));

    // Limpa o formulário após o cadastro
    document.getElementById('produtoForm').reset();

    // Confirmação de cadastro (opcional)
    alert('Produto cadastrado com sucesso!');
});
