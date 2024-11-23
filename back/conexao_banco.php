<?php

// try catch
try {
    //conectando no banco de dados
    //criando variável para conectar ao banco de dados 
    //nova PDO o PHP já entende que é uma nova conexão, em seguida vem a localização e usuário e senha pra acessar o banco
    $conn = new PDO('mysql:host=localhost;dbname=gatitos;charset=utf8', 'arthur','senhabanco');
} catch (Exception $e) {
    //Caso não consiga conectar exibe mensagem de erro
    //o die serve pra matar o processo de tentar conectar pra que o PHP não fique tentando infinitamente, e o textinho dentro, serve como mensagem de erro para o usuário
    die('
        <div style="
            font-family: Arial, sans-serif; 
            text-align: center; 
            background-color: #f8d7da; 
            color: #721c24; 
            padding: 20px; 
            border: 1px solid #f5c6cb; 
            border-radius: 5px; 
            margin: 20px; 
        ">
            <h1 style="color: #dc3545;">Erro de Conexão</h1>
            <p>Não foi possível conectar ao banco de dados. Verifique os detalhes abaixo:</p>
            <p style="font-size: 0.9em; background: #f1f1f1; padding: 10px; border-radius: 5px;">' . $e->getMessage() . '</p>
            <button style="
                margin-top: 15px; 
                padding: 10px 20px; 
                font-size: 1rem; 
                color: #fff; 
                background-color: #007bff; 
                border: none; 
                border-radius: 5px; 
                cursor: pointer;
            " onclick="window.location.href=\'http://localhost/gatitos\'">
                Voltar
            </button>
        </div>
    ');
}


$resposta = array(
    'status' => 200,
    'message' => '',
    'ok' => true
);


//Checar se o array associativo passado tem todos seus valores preenchidos
function checar_dados(array $array_associativo, array $dados_obrigatorios)
{
    $dados_faltantes = [];
    foreach ($dados_obrigatorios as $dado) {
        if (empty($array_associativo[$dado])) {
            $dados_faltantes[] = $dado;
        }
    }
    return $dados_faltantes;
}

?>