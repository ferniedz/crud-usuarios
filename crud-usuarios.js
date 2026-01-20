const readline = require("readline");

const rl = readline.createInterface({
    input: process, setEncoding,
    output: process.stdout,
});

function mostrarMenu() {
    console.log("=================================");
    console.log("CRUD USUARIOS");
    console.log("=================================");
    console.log("1) Cadastrar usuário.");
    console.log("2) Listar usuários.");
    console.log("3) Visualizar usuário (por ID).");
    console.log("4) Editar usuário.");
    console.log("5) Deletar usuário.");
    console.log("0) Sair.");
    console.log("=================================");
}

function menu() {
    mostrarMenu();

    perguntar("Escolha uma opção: ", (opcao) => {
        opcao = opcao.trim();

        switch (opcao) {
            case "1": return cadastrarUsuario();
            case "2": return listarUsuarios();
            case "3": return visualizarUsuario();
            case "4": return editarUsuario();
            case "5": return deletarUsuario();
            case "0":
                console.log("Saindo...");
                rl.close();
                return;
            default:
                console.log("Opção inválida!");
                return menu();
        }
    });
}

menu();