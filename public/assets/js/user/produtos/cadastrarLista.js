// Função para criar a lista do usuário com os produtos e suas quantidades
function criarListaUsuario(event) {
    event.preventDefault(); // Evita o comportamento padrão de envio do formulário

    // Recupera o usuário logado do localStorage
    const usuarioLogado = localStorage.getItem('cpfUsuarioLogado');

    // Verifica se o usuário está logado
    if (usuarioLogado) {
        // Recupera o contador de listas do usuário do localStorage
        let contadorListas = parseInt(localStorage.getItem(`${usuarioLogado}_contadorListas`)) || 0;
        contadorListas++; // Incrementa o contador de listas

        // Suponha que você tenha uma tabela com id "listaProdutos"
        const tbody = document.querySelector('#listaProdutos tbody');
        const linhas = tbody.querySelectorAll('tr');

        const listaUsuario = []; // Lista do usuário
        const listaId = contadorListas; // Identificador único para a lista

        // Construir uma string com os produtos cadastrados
        let produtosCadastrados = 'Produtos Cadastrados:\n';

        // Itera sobre cada linha da tabela
        linhas.forEach((linha, index) => {
            const genero = linha.cells[1].textContent;
            const marca = linha.cells[2].textContent;
            const unidade = linha.cells[3].textContent;
            const dataValidade = linha.cells[4].textContent;
            const quantidade = parseInt(linha.querySelector('.quantidade').textContent);

            // Adiciona apenas os produtos com quantidade maior que zero à lista do usuário
            if (quantidade > 0) {
                listaUsuario.push({
                    genero: genero,
                    marca: marca,
                    unidade: unidade,
                    validade: dataValidade,
                    quantidade: quantidade
                });

                // Adiciona o produto à string de produtos cadastrados
                produtosCadastrados += `- ${quantidade} ${unidade} de ${marca} (${genero}), com validade em ${dataValidade}\n`;
            }
        });

        // Exibe a mensagem de sucesso com os produtos cadastrados
        window.alert(`Nova lista cadastrada com sucesso.\n\n${produtosCadastrados}`);

        // Salva a lista do usuário no localStorage com um identificador único
        localStorage.setItem(`${usuarioLogado}_lista${listaId}`, JSON.stringify(listaUsuario));
        // Salva o contador de listas atualizado no localStorage
        localStorage.setItem(`${usuarioLogado}_contadorListas`, contadorListas);

        console.log(`Lista do usuário (ID ${listaId}) salva:`, listaUsuario);
    } else {
        console.log('Nenhum usuário logado encontrado no localStorage.');
    }
}

// Evento de envio do formulário de cadastro da lista
document.getElementById('formCadastroLista').addEventListener('submit', criarListaUsuario);







