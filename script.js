//Pegando bloco dos gatos
var bloco_dos_gatos = document.querySelector('#bloco-dos-gatos');

//Buscando botão de chamar gatos
var botao_chamar_gatos = document.querySelector("#botao-chamar-gatos");

//Buscando o botao de cadastrar gatos
var botao_cadastrar_gatos = document.querySelector("#botao-cadastrar-gatos");

//Buscando botão de carregar gatos
var botao_carregar_gatos = document.querySelector('#botao-carregar-gatos');

//Buscando botão de deletar gatos
var botao_deletar_gatos = document.querySelector('#botao-deletar-gatos');

//Buscando botão de listar logs
var botao_mostrar_logs_api = document.querySelector('#botao-mostrar-logs-api');

var lista_de_gatos = [];

//Listar logs api ao clicar no botão
botao_mostrar_logs_api.addEventListener('click', async () => {
    let resposta_logs = await fetch('back/listar_logs_api.php');
    resposta_logs = await resposta_logs.json();
    if(resposta_logs.ok){
        //Guardando logs em uma variável
        let lista_de_logs = resposta_logs.dados;
        if (lista_de_logs.length < 1) {
            alert('Nenhum log cadastrado!');
        }
        //Limpando tela
        bloco_dos_gatos.innerHTML = '';
        //Iterando pelos logs
        lista_de_logs.forEach((log) => {
            //Criando cartão de log
            let card_log = document.createElement('div');
            card_log.classList.add('card');
            card_log.classList.add('card-style');
            //Criando texto do log
            let card_log_text = document.createElement('p');
            card_log_text.classList.add('card-text');
            //Criando elemento de lista não ordenada
            let card_log_text_list = document.createElement('ul');
            //Iterando pelos dados dos logs
            for (const key in log) {
                //Execute a seguir se o objeto tem o atributo
                if (Object.prototype.hasOwnProperty.call(log, key)) {
                    let item = document.createElement('li');
                    item.innerHTML = `${key}: ${log[key]}`;
                    card_log_text_list.appendChild(item);
                }
            }
            card_log_text.appendChild(card_log_text_list);
            card_log.appendChild(card_log_text);
            bloco_dos_gatos.appendChild(card_log);
        });
    }else{
        alert('Erro ao listar logs do banco de dados');
    }
});

//Chamar gatos ao clicar no botão
botao_chamar_gatos.addEventListener('click', async () => {
    //Fazer uma chamada API
    let resposta_API = await fetch('https://api.thecatapi.com/v1/images/search?limit=10');

    //Pegando elemento dos gatos, para falar se deu certo ou não
    let elemento_retorno_API = document.querySelector('#retorno-gatos');
    //console.log(elemento_retorno_API);

    //Validando se deu certo buscar os gatos
    if (resposta_API.ok == true) {
        //De certo buscar os gatos
        //console.log("Requisição API dos gatos realizada com sucesso");
        //Mostrando na tela que deu certo
        elemento_retorno_API.textContent = "Aqui estão seus gatos";
        //Deixando o texto verde
        elemento_retorno_API.classList.add('text-success');

        //Mostrando gatos no console
        lista_de_gatos = await resposta_API.json();

        //Cadastrando no banco o log de chamada API

        let resposta_criar_log = await fetch('back/cadastrar_log_api.php', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                numeroregistros: lista_de_gatos.length
            })
        });

        resposta_criar_log = await resposta_criar_log.json()

        if (resposta_criar_log.ok) {
            alert('Log de chamada API registrado!');
        } else {
            alert('Log de chamada API não foi registrado...');
        }
        //console.log(resposta_criar_log);

        //console.log(lista_de_gatos);
        //console.log("Tipo da lista de gatos: " + typeof(lista_de_gatos));

        //Criando imagem dos gatos
        await mostrar_gatos(lista_de_gatos);
    } else {
        //Não deu certo buscar os gatos
        console.log(elemento_retorno_API);
        //Mostrando na tela que não deu certo
        elemento_retorno_API.textContent = "Não deu certo buscar os gatos";
        //Deixando o texto vermelho
        elemento_retorno_API.classList.add('text-danger');
    }
});

botao_cadastrar_gatos.addEventListener('click', () => {
    lista_de_gatos.forEach(async (gato) => {
        let retorno_cadastro_gato = document.querySelector('#cadastro_de_gatos');
        if (await cadastrar_no_banco(gato)) {
            retorno_cadastro_gato.textContent = "Gatos cadastrados";
            retorno_cadastro_gato.classList.add('text-success');
        } else {
            retorno_cadastro_gato.textContent = "Gatos não puderam ser cadastrados";
            retorno_cadastro_gato.classList.add('text-danger');
        }
    })
});

botao_carregar_gatos.addEventListener('click', async () => {
    let gatos = await buscar_no_banco();
    mostrar_gatos(gatos);
});

botao_deletar_gatos.addEventListener('click', async () => {
    if (await deletar_todos_no_banco()) {
        console.log('Gatos deletados com sucesso');
    }else{
        console.error('Não foi possível deletar os gatos');
    }
});

async function cadastrar_no_banco(objeto_gato) {
    let resposta_banco = await fetch('back/cadastrar_gato.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto_gato)
    });
    //console.log(resposta_banco);
    resposta_banco = await resposta_banco.json();
    //console.log(resposta_banco);
    return resposta_banco.ok;
}

async function buscar_no_banco(gato_id = 0) {
    let resposta_banco = await fetch(`back/listar_gatos.php?id=${gato_id}`);
    //console.log(resposta_banco);
    resposta_banco = await resposta_banco.json();
    //console.log(resposta_banco);
    if (resposta_banco.ok) {
        return resposta_banco.dados;
    } else {
        console.error(resposta_banco);
        return [];
    }

}

async function atualizar_no_banco(objeto_gato) {
    let resposta_banco = await fetch('back/atualizar_gato.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(objeto_gato)
    });
    //console.log(resposta_banco);
    resposta_banco = await resposta_banco.json();
    //console.log(resposta_banco);
    return resposta_banco.ok;
}

async function deletar_no_banco(id) {
    let resposta_banco = await fetch(`back/deletar_gato.php?id=${id}`, {
        method: 'DELETE'
    });
    resposta_banco = await resposta_banco.json();
    return resposta_banco.ok;
}

async function deletar_todos_no_banco(){
    let resposta_banco = await fetch('back/deletar_todos_gatos.php',{
        method: 'DELETE'
    });
    resposta_banco = await resposta_banco.json();
    if (!resposta_banco.ok) {
        console.error(resposta_banco.error);
    }
    return resposta_banco.ok;
}

function mostrar_gatos(lista_de_gatos) {
    bloco_dos_gatos.innerHTML = '';
    lista_de_gatos.forEach(async (objeto_gato) => {
        //Criando cartão do gato
        let card = document.createElement('div');
        card.classList.add('card-style');
        card.classList.add('card');

        //Criando imagem do gato
        let card_img = document.createElement('img');
        card_img.src = objeto_gato.url;
        card_img.classList.add('card-img-top');
        card_img.alt = objeto_gato.nome ? objeto_gato.nome : objeto_gato.id;
        card_img.download = objeto_gato.id;
        card.appendChild(card_img);

        //Criando título do cartão do gato
        let card_title = document.createElement('h5');
        card_title.classList.add('card-title');
        card_title.textContent = "ID do gato: " + objeto_gato.id;

        //Colocando título no cartão
        card.appendChild(card_title);

        //Criando texto do cartão do gato
        let card_text = document.createElement('p');
        card_text.classList.add('card-text');

        //Dados do gato
        let card_data = document.createElement('ul');
        card_data.innerHTML = `
            <li>Largura: ${objeto_gato.width}</li>
            <li>Altura: ${objeto_gato.height}</li>
        `;
        card_text.appendChild(card_data);

        //Nome do gato
        let card_name_container = document.createElement('div');
        card_name_container.classList.add('mb-3');

        let card_name_label = document.createElement('label');
        card_name_label.classList.add('form-label');
        card_name_label.for = objeto_gato.id + '-nome';
        card_name_label.textContent = "Nome";
        card_name_container.appendChild(card_name_label);

        let card_name_input = document.createElement('input');
        card_name_input.classList.add('form-control');
        card_name_input.id = objeto_gato.id+'-nome';
        card_name_input.type = "text";
        card_name_input.value = objeto_gato.nome != undefined ? objeto_gato.nome : '';
        //console.log(objeto_gato);
        card_name_container.appendChild(card_name_input);

        card_text.appendChild(card_name_container);

        //Link da imagem do gato
        let card_link = document.createElement('a');
        card_link.href = objeto_gato.url;
        card_link.textContent = "Ver";
        card_link.target = "_blank"; //Abrirá em nova aba
        card_link.classList.add('btn');
        card_link.classList.add('btn-dark');
        card_text.appendChild(card_link);

        //Botão de Cadastrar gato
        let card_cadastrar = document.createElement('button');
        card_cadastrar.classList.add('btn');
        card_cadastrar.classList.add('btn-success');
        //Verificando se gato já está cadastrado
        let gato_buscado = await buscar_no_banco(objeto_gato.id);
        if (gato_buscado.length > 0) {
            //Se sim, adicionando botão de deletar

            //Botão de deletar gato
            let card_delete = document.createElement('button');
            card_delete.classList.add('btn');
            card_delete.classList.add('btn-danger');
            card_delete.textContent = "Deletar";
            card_delete.addEventListener('click', async () => {
                if (confirm('Tem certeza que deseja deletar este gato?')) {
                    if (await deletar_no_banco(objeto_gato.id)) {
                        bloco_dos_gatos.removeChild(card);
                    }else{
                        console.log('Não foi possível deletar');
                    }
                }
            });
            card_text.appendChild(card_delete);


            //Se sim, habilitar edição
            card_cadastrar.textContent = "Salvar";
            //Definir evento de click para editar gato
            card_cadastrar.addEventListener('click', async () => {
                let nome_gato = document.getElementById(`${objeto_gato.id}-nome`).value;
                if (nome_gato == undefined) {
                    objeto_gato.nome = '';
                }else{
                    objeto_gato.nome = nome_gato;
                }
                if (await atualizar_no_banco(objeto_gato)) {
                    card_cadastrar.textContent = "Salvo";
                    card_cadastrar.disabled = true;
                } else {
                    console.alert('Não foi possível salvar o gato');
                }
            });
        } else {
            //Se não, habilitar botão de cadastrar gato
            card_cadastrar.textContent = "Cadastrar";
            //Definir evento de click para cadastrar gato
            card_cadastrar.addEventListener('click', async () => {
                let nome_gato = document.getElementById(`${objeto_gato.id}-nome`).value;
                if (nome_gato == undefined) {
                    objeto_gato.nome = '';
                }else{
                    objeto_gato.nome = nome_gato;
                }
                if (await cadastrar_no_banco(objeto_gato)) {
                    card_cadastrar.textContent = "Salvo";
                    card_cadastrar.disabled = true;
                } else {
                    console.alert('Não foi possível cadastrar o gato');
                }
            });
        }
        card_text.appendChild(card_cadastrar);

        //Colocando texto no cartão
        card.appendChild(card_text);

        bloco_dos_gatos.appendChild(card);
    });

}