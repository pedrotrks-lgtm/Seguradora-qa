*** Settings ***
Resource    ../../resources/api/ClientApi.resource

*** Test Cases ***
Cadastrar 5 Clientes Randomicos

    Criar Sessao Client API

    FOR    ${index}    IN RANGE    5

        ${response}=    Cadastrar Cliente Randomico

    END