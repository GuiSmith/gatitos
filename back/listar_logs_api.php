<?php

    require "conexao_banco.php";

    try {
        //Declarando consulta SQL
        $sql = "SELECT * FROM log";

        //Preparando consulta
        $query = $conn->prepare($sql);
        if ($query->execute()) {
            $resposta['status'] = 200;
            $resposta['ok'] = true;
            $resposta['message'] = "Logs listados com sucesso";
            $resposta['dados'] = $query->fetchAll(PDO::FETCH_ASSOC);
        }else{
            $resposta['status'] = 500;
            $resposta['ok'] = false;
            $resposta['message'] = "Logs não listados";
            $resposta['erro'] = $query->errorInfo();
            $resposta['sql'] = $sql;
        }
        
    } catch (PDOException $error) {
        $resposta['status'] = 500;
        $resposta['ok'] = false;
        $resposta['message'] = "Houve um erro ao listar logs";
        $resposta['erro'] = $error;
        $resposta['sql'] = $sql;
    }

    header('Content-Type: application/json');

    echo json_encode($resposta);

?>