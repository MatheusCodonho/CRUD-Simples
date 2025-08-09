function getClientes() {
        return JSON.parse(localStorage.getItem("clientes")) || [];
    }

    function salvarClientes(clientes) {
        localStorage.setItem("clientes", JSON.stringify(clientes));
    }

    function listarClientes() {
        let lista = document.getElementById("listaClientes");
        lista.innerHTML = "";
        let clientes = getClientes();

        clientes.forEach((cliente, index) => {
            lista.innerHTML += `
                <tr>
                    <td>${cliente.nome}</td>
                    <td>${cliente.email}</td>
                    <td>${cliente.telefone}</td>
                    <td>
                        <button class="update" onclick="editarCliente(${index})">Editar</button>
                        <button class="delete" onclick="excluirCliente(${index})">Excluir</button>
                    </td>
                </tr>
            `;
        });
    }

    document.getElementById("formCliente").addEventListener("submit", function(event) {
        event.preventDefault();

        let indexEdicao = document.getElementById("indexEdicao").value;
        let nome = document.getElementById("nome").value.trim();
        let email = document.getElementById("email").value.trim();
        let telefone = document.getElementById("telefone").value.trim();

        let clientes = getClientes();

        if (indexEdicao === "") {
            // Cadastrar
            clientes.push({ nome, email, telefone });
        } else {
            // Atualizar
            clientes[indexEdicao] = { nome, email, telefone };
            document.getElementById("indexEdicao").value = "";
        }

        salvarClientes(clientes);
        listarClientes();
        document.getElementById("formCliente").reset();
    });

    function editarCliente(index) {
        let cliente = getClientes()[index];
        document.getElementById("nome").value = cliente.nome;
        document.getElementById("email").value = cliente.email;
        document.getElementById("telefone").value = cliente.telefone;
        document.getElementById("indexEdicao").value = index;
    }

    function excluirCliente(index) {
        if (confirm("Deseja realmente excluir este cliente?")) {
            let clientes = getClientes();
            clientes.splice(index, 1);
            salvarClientes(clientes);
            listarClientes();
        }
    }

    listarClientes();