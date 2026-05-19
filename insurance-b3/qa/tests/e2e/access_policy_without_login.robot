*** Settings ***
Resource    ../../resources/keywords.resource

*** Test Cases ***
Acessar Policy Sem Login

    Abrir Policy Diretamente
    Validar Retorno Login
    Fechar Navegador