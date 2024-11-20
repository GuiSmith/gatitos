
//Buscando botão de chamar gatos
var botao_chamar_gatos = document.querySelector("#botao-chamar-gatos");

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
        console.log("A requisição deu certo");
        //Mostrando na tela que deu certo
        elemento_retorno_API.textContent = "Aqui estão seus gatos";
        //Deixando o texto verde
        elemento_retorno_API.classList.add('text-success');

        //Mostrando gatos no console
        let lista_de_gatos = await resposta_API.json();
        console.log(lista_de_gatos);
        console.log("Tipo da lista de gatos: " + typeof(lista_de_gatos));

        //Pegando bloco dos gatos
        let bloco_dos_gatos = document.querySelector('#bloco-dos-gatos');

        //Criando imagem dos gatos
        lista_de_gatos.forEach((objeto_gato) => {

            //Guardar no banco de dados
            

            //Criando cartão do gato
            let card = document.createElement('div');
            card.classList.add('card-style');
            card.classList.add('card');

            //Criando imagem do gato
            let card_img = document.createElement('img');
            card_img.src = objeto_gato.url;
            card_img.classList.add('card-img-top');
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
            //Link da imagem do gato
            let card_link = document.createElement('a');
            card_link.href = objeto_gato.url;
            card_link.textContent = "Clique aqui";
            card_link.target = "_blank"; //Abrirá em nova aba
            card_text.appendChild(card_link);
            //Texto do gato
            card_text.innerHTML += ' para ver a imagem deste gato em outra página. Veja a seguir alguns dados sobre este gato';
            console.log(card_text);
            //Dados do gato
            let card_data = document.createElement('ul');
            card_data.innerHTML = `
                <li>Largura: ${objeto_gato.width}</li>
                <li>Altura: ${objeto_gato.height}</li>
            `;
            card_text.appendChild(card_data);

            //Colocando texto no cartão
            card.appendChild(card_text);

            bloco_dos_gatos.appendChild(card);
        });
    } else {
        //Não deu certo buscar os gatos
        console.log(elemento_retorno_API);
        //Mostrando na tela que não deu certo
        elemento_retorno_API.textContent = "Não deu certo buscar os gatos";
        //Deixando o texto vermelho
        elemento_retorno_API.classList.add('text-danger');
    }
});