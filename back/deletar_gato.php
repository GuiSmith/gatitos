<?php

    require "conexao_banco.php";

    try {
        if (isset($_GET['id'])) {
            $id = $_GET['id'];
            //Declarando consulta SQL
            $sql = "DELETE FROM gato WHERE id = :id";

            //Preparando consulta
            $query = $conn->prepare($sql);

            $query->bindParam(':id',$id,PDO::PARAM_STR);

            if ($query->execute()) {
                $resposta['status'] = 200;
                $resposta['ok'] = true;
                $resposta['message'] = "Gato deletado com sucesso";
            }else{
                $resposta['status'] = 500;
                $resposta['ok'] = false;
                $resposta['message'] = "Houve um erro ao deletar gato";
                $resposta['erro'] = $query->errorInfo();
                $resposta['sql'] = $sql;
            }
        }else{
            $resposta['status'] = 400;
            $resposta['ok'] = false;
            $resposta['message'] = "id não informado";
        }
    } catch (PDOException $error) {
        $resposta['status'] = 500;
        $resposta['ok'] = false;
        $resposta['message'] = "Houve um erro ao deletar gato";
        $resposta['erro'] = $error;
        $resposta['sql'] = $sql;
    }

    header('Content-Type: application/json');

    echo json_encode($resposta);

?>