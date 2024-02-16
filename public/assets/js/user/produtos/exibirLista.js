document.addEventListener('DOMContentLoaded', function() {
    if (document.body.classList.contains('lista-adm')) {
        // Se o body tiver a classe lista-adm, execute carregarListasUsuarioLogado
        carregarListasUsuarioLogado();
    } else {
        // Se o body não tiver a classe lista-adm, execute outraFuncao
        outraFuncao();
    }
});

// Função para carregar e exibir as listas do usuário logado
function carregarListasUsuarioLogado() {
    // Recupera o usuário logado do localStorage
    const usuarioLogadoCPF = localStorage.getItem('cpfUsuarioLogado');
    const usuarios = JSON.parse(localStorage.getItem('solicitacoes'));

    // Verifica se o usuário está logado
    if (usuarioLogadoCPF) {
        // Atualiza o título com o nome do usuário
        const usuario = usuarios.find(u => u.cpf === usuarioLogadoCPF);
        const nomeUsuario = usuario ? usuario.nome : '';
        document.getElementById('tituloLista').querySelector('span').textContent = nomeUsuario;

        // Itera sobre as chaves do localStorage
        for (let chave in localStorage) {
            // Verifica se a chave corresponde às listas do usuário logado
            if (chave.startsWith(`${usuarioLogadoCPF}_lista`)) {
                // Recupera o ID da lista da chave
                const listaId = chave.split('_')[2];
                // Recupera a lista do localStorage
                const lista = JSON.parse(localStorage.getItem(chave));
                // Exibe a lista na página
                exibirLista(lista, listaId);
            }
        }
    } else {
        console.log('Nenhum usuário logado encontrado no localStorage.');
    }
}

// Função para exibir uma lista na página
function exibirLista(lista, listaId) {
    // Cria um elemento div para a lista
    const listaDiv = document.createElement('div');
    listaDiv.classList.add('lista', 'flex', 'justify-between', 'items-center', 'mb-6');

    // Cria um elemento div para os detalhes da lista
    const detalhesListaDiv = document.createElement('div');

    const tituloLista = document.createElement('h2');
    tituloLista.textContent = `Lista de Compras`; 
    tituloLista.classList.add('font-bold', 'mb-2');

    //elemento ul para os itens da lista
    const itensListaUl = document.createElement('ul');
    lista.forEach(item => {
        const itemLi = document.createElement('li');
        itemLi.textContent = `${item.quantidade}${item.unidade} de ${item.genero} (${item.marca}) validade ${item.validade}`;
        itensListaUl.appendChild(itemLi);
    });

    //título e os itens da lista ao detalhes da lista
    detalhesListaDiv.appendChild(tituloLista);
    detalhesListaDiv.appendChild(itensListaUl);

    // Verifica se a página não possui a classe lista-adm antes de adicionar o botão "X"
    if (!document.body.classList.contains('lista-adm')) {
        //botão de deletar lista
        const botaoDeletar = document.createElement('button');
        botaoDeletar.textContent = 'X';
        botaoDeletar.classList.add('my-4', 'h-8', 'w-8', 'flex', 'justify-center', 'items-center', 'bg-red-800', 'hover:bg-red-700', 'text-white', 'p-2', 'rounded-full');
        botaoDeletar.onclick = function() {
            // Remove a lista do localStorage
            const usuarioLogado = localStorage.getItem('cpfUsuarioLogado');
            if (usuarioLogado) {
                localStorage.removeItem(`${usuarioLogado}_lista${listaId}`);
                console.log('Lista removida do localStorage:', `${usuarioLogado}_lista${listaId}`);
                // Remove a lista do DOM
                listaDiv.remove();
            } else {
                console.log('Nenhum usuário logado encontrado no localStorage.');
            }
        };

        // Adiciona o botão de deletar à listaDiv
        listaDiv.appendChild(botaoDeletar);
    }

    // Adiciona os detalhes da lista à listaDiv
    listaDiv.appendChild(detalhesListaDiv);

    // Adiciona a lista ao contêiner de listas
    document.getElementById('listasContainer').appendChild(listaDiv);
}

// Função a ser executada em páginas sem a classe lista-adm
function outraFuncao() {
    // Recupera o usuário logado do localStorage
    const usuarioLogadoCPF = localStorage.getItem('cpfUsuarioLogado');

    // Verifica se o usuário está logado
    if (usuarioLogadoCPF) {
        // Itera sobre as chaves do localStorage
        for (let chave in localStorage) {
            // Verifica se a chave corresponde às listas do usuário logado
            if (chave.startsWith(`${usuarioLogadoCPF}_lista`)) {
                // Recupera o ID da lista da chave
                const listaId = chave.split('_')[2];
                // Recupera a lista do localStorage
                const lista = JSON.parse(localStorage.getItem(chave));
                // Exibe a lista na página
                exibirLista(lista, listaId);
            }
        }
    } else {
        console.log('Nenhum usuário logado encontrado no localStorage.');
    }
}