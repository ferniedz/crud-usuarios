const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const usuarios = [];
let idUsuario = 1;

function perguntar(texto, callback) {
    rl.question(texto, (resposta) => {
        callback(resposta)
    });
}

function acharUsuarioPorId(id) {
    for (let i = 0; i < usuarios.length; i++) {
        if (usuarios[i].id === id) {
            return i;
        }
    }
    return -1;
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
                id: idUsuario
            }
            usuarios.push(usuario);
            console.log("Usuário cadastrado com sucesso. ID do usuário: ", idUsuario);
            idUsuario++;
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
                "Nome: ", usuarios[i].nome,
                "| CPF: ", usuarios[i].cpf,
                "| ID do usuário: ", usuarios[i].id,
                "\n"
            )
        }
        return menu();
    }
}

function visualizarUsuario() {
    perguntar("\nInsira o ID do usuário a ser visualizado: ", (idUsuarioStr) => {
        const idUsuario = Number(idUsuarioStr);
        const posicao = acharUsuarioPorId(idUsuario);
        if (Number.isNaN(idUsuario) || idUsuario < 0) {
            console.log("\nERRO: Insira um ID válido.");
            return menu();
        }
        if (posicao === -1) {
            console.log("\nERRO: Nenhum usuário com esse ID encontrado.\n");
            return menu();
        }
        console.log(
            "\n",
            "Nome: ", usuarios[posicao].nome,
            "| CPF: ", usuarios[posicao].cpf,
            "\n"
        );
        return menu();
    });
}

function editarUsuario() {
    perguntar("\nInsira o ID do usuário a ser editado: ", (idUsuarioStr) => {
        const idUsuario = Number(idUsuarioStr);
        const posicao = acharUsuarioPorId(idUsuario);
        if (Number.isNaN(idUsuario)) {
            console.log("\nERRO: Insira um ID válido.");
            return menu();
        }
        if (usuarios.length === 0) {
            console.log("\nERRO: Nenhum usuário encontrado.\n");
            return menu();
        }
        if (posicao === -1) {
            console.log("\nERRO: Nenhum usuário com esse ID encontrado.\n");
            return menu();
        }
        perguntar("\nInsira o novo nome completo:\n", (novoNomeStr) => {
            perguntar("Insira o novo CPF: ", (novoCpfStr) => {
                const novoNome = novoNomeStr.trim();
                const novoCpf = Number(novoCpfStr);
                if (!novoNome) {
                    console.log("\nERRO: Insira um nome válido.\n");
                    return menu();
                }
                if (Number.isNaN(novoCpf) || novoCpf < 0) {
                    console.log("\nERRO: Insira um CPF válido.\n");
                    return menu();
                }
                usuarios[posicao].nome = novoNome;
                usuarios[posicao].cpf = novoCpf;
                console.log("\nUsuário editado com sucesso.\n");
                return menu();
            });
        });
    });
}

function deletarUsuario() {
    perguntar("\nInsira o ID do usuário a ser deletado:\n", (idUsuarioStr) => {
        const idUsuario = Number(idUsuarioStr);
        const posicao = acharUsuarioPorId(idUsuario);
        if (Number.isNaN(idUsuario) || idUsuario < 0) {
            console.log("\nERRO: Insira um ID válido.");
            return menu();
        }
        if (usuarios.length === 0) {
            console.log("\nERRO: Nenhum usuário encontrado.\n");
            return menu();
        }
        if (posicao === -1) {
            console.log("\nERRO: Nenhum usuário com esse ID encontrado.\n");
            return menu();
        }
        usuarios.splice(posicao, 1);
        console.log("\nUsuário deletado com sucesso.\n");
        return menu();
    });
}

function mostrarMenu() {
    console.log("=================================");
    console.log("CRUD USUÁRIOS");
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