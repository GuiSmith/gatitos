<?php

//Pegando arquivo que contém conexão com banco de dados
require "conexao_banco.php";

//Pegando dados enviados via POST
$dados = json_decode(file_get_contents('php://input'), true);

if (empty($dados) || !is_array($dados) || $dados == NULL) {
    $resposta['status'] = 400;
    $resposta['ok'] = false;
    $resposta['message'] = 'Nenhum dado foi enviado';
} else {
    //Identificando dados faltantes
    $dados_faltantes = checar_dados($dados, ['id','url', 'width', 'height']);
    if (!empty($dados_faltantes)) {
        $resposta['status'] = 400;
        $resposta['ok'] = false;
        $resposta['message'] = 'Há dados faltantes';
        //Configurando resposta detalhada
        $dados_faltantes_detalhado = [];
        foreach ($dados_faltantes as $dado_faltante) {
            $dados_faltantes_detalhado[$dado_faltante] = "Dado não informado";
        }
        $resposta['detalhes'] = $dados_faltantes_detalhado;
    }
}

//Se há dados faltantes, retornar erro e mensagem
if ($resposta['ok']) {
    //Se não há dados faltantes, continuar
    try {
        //Definindo SQL para inserir dados
        $sql = 'INSERT INTO gato (nome,url,width,height,id) VALUES (:nome,:url,:width,:height,:id)';

        //Preparando consulta
        $query = $conn->prepare($sql);

        //Se nome não for informado, inserir informação como nulo
        if (!array_key_exists('nome', $dados)) {
            $dados['nome'] = '';
        }

        //Definindo parametro de nome
        $query->bindParam(':nome', $dados['nome'], PDO::PARAM_STR);

        //Definindo parametro de url
        $query->bindParam(':url', $dados['url'], PDO::PARAM_STR);

        //Definindo parametro de width
        $query->bindParam(':width', $dados['width'], PDO::PARAM_STR);

        //Definindo parametro de height
        $query->bindParam(':height', $dados['height'], PDO::PARAM_STR);

        //Definindo parametro de id
        $query->bindParam(':id', $dados['id'], PDO::PARAM_STR);

        //Executando query
        if ($query->execute()) {
            $resposta['status'] = 201;
            $resposta['ok'] = true;
            $resposta['message'] = 'Gato cadastrado com sucesso';
        } else {
            $resposta['status'] = 500;
            $resposta['ok'] = false;
            $resposta['message'] = 'Erro ao inserir';
            $resposta['erro'] = $conn->errorInfo();
        }
    } catch (PDOException $error) {
        $resposta['status'] = 500;
        $resposta['ok'] = false;
        $resposta['message'] = 'Houve um erro ao inserir';
        $resposta['erro'] = $error;
    }
}

header('Content-Type: application/json');
echo json_encode($resposta);

?>