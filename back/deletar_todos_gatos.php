<?php

    require "conexao_banco.php";

    try {
        $sql = "DELETE FROM gato";

        //Preparando consulta
        $query = $conn->prepare($sql);

        if ($query->execute()) {
            $resposta['status'] = 200;
            $resposta['ok'] = true;
            $resposta['message'] = "Gatos deletados com sucesso";
        }else{
            $resposta['status'] = 500;
            $resposta['ok'] = false;
            $resposta['message'] = "Houve um erro ao deletar gatos";
            $resposta['erro'] = $query->errorInfo();
            $resposta['sql'] = $sql;
        }
    } catch (PDOException $error) {
        $resposta['status'] = 500;
        $resposta['ok'] = false;
        $resposta['message'] = "Houve um erro ao deletar gatos";
        $resposta['erro'] = $error;
        $resposta['sql'] = $sql;
    }

    header('Content-Type: application/json');

    echo json_encode($resposta);

?>