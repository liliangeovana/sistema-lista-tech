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
        tipo: tipoProduto,
        genero: generoProduto,
        marca: marcaProduto,
        unidade: unidadeProduto,
        validade: validadeProduto
    }

    // Verificando se já existe um array de produtos para esse tipo no localStorage
    let produtos = JSON.parse(localStorage.getItem(tipoProduto)) || [];

    // Adicionando o novo produto ao array
    produtos.push(produto);

    // Salvando o array de produtos atualizado no localStorage
    localStorage.setItem(tipoProduto, JSON.stringify(produtos));

    // Limpa o formulário após o cadastro
    document.getElementById('produtoForm').reset();

    // Confirmação de cadastro (opcional)
    alert('Produto cadastrado com sucesso!');
});