<?php

    require "conexao_banco.php";

    $id = isset($_GET['id']) ? $_GET['id'] : 0;

    $limit = isset($_GET['limit']) ? $_GET['limit'] : 'max';

    try {
        //Declarando consulta SQL
        $sql = "SELECT * FROM gato";
        if ($id != 0){
            $sql .= " WHERE id = :id";
        }
        if ($limit != 'max') {
            $sql .= " LIMIT :limit";
        }

        //Preparando consulta
        $query = $conn->prepare($sql);

        //Preparando limit ID se tiver
        if ($id != 0) {
            $query->bindParam(':id',$id,PDO::PARAM_STR);
        }
        //Preparando parametro limit
        if ($limit != 'max') {
            $query->bindParam(':limit',$limit,PDO::PARAM_INT);
        }

        if ($query->execute()) {
            
            $resposta['status'] = 200;
            $resposta['ok'] = true;
            $resposta['message'] = "Gatos carregados com sucesso";
            $resposta['dados'] = $query->fetchAll(PDO::FETCH_ASSOC);
        }else{
            $resposta['status'] = 500;
            $resposta['ok'] = false;
            $resposta['message'] = "Houve um erro ao carregar gatos";
            $resposta['erro'] = $query->errorInfo();
            $resposta['sql'] = $sql;
        }
        
    } catch (PDOException $error) {
        $resposta['status'] = 500;
        $resposta['ok'] = false;
        $resposta['message'] = "Houve um erro ao carregar gatos";
        $resposta['erro'] = $error;
        $resposta['sql'] = $sql;
    }

    header('Content-Type: application/json');

    echo json_encode($resposta);

?>