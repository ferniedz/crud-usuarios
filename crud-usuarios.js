const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const usuarios = [];

function perguntar(texto, callback) {
    rl.question(texto, (resposta) => {
        callback(resposta)
    });
}

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

function cadastrarUsuario() {
    perguntar("Insira o nome completo: ", (nomeCompletoStr) => {
        perguntar("Insira o CPF: ", (cpfStr) => {
            const nome = nomeCompletoStr.trim();
            const cpf = Number(cpfStr);
            if (!nome) {
                console.log("\nERRO: Insira um nome válido.\n");
                return menu();
            }
            if (Number.isNaN(cpf)) {
                console.log("\nERRO: Insira um CPF válido.\n");
                return menu();
            }
            const usuario = {
                nome: nome,
                cpf: cpf,
            }
            usuarios.push(usuario);
            console.log("Usuário cadastrado com sucesso.");
            return menu();
        });
    });
}

function listarUsuarios() {
    if (usuarios.length === 0) {
        console.log("\nERRO: Nenhum usuário encontrado.\n");
        return menu();
    } else {
        for (let i = 0; i < usuarios.length; i++) {
            console.log(
                "USUÁRIO", i, ":",
                "Nome: ", usuarios[i].nome,
                "| CPF: ", usuarios[i].cpf,
                "\n"
            )
        }
        return menu();
    }
}

menu();