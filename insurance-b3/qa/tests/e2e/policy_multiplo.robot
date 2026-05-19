*** Settings ***
Library     RequestsLibrary
Library     Collections
Library     FakerLibrary    locale=pt_BR
Resource    ../../resources/keywords.resource
Resource    ../../resources/users.resource

*** Test Cases ***
Cadastrar 5 Apolices Randomicas
    Criar Sessao API

    ${token}=    Realizar Login    ${USER_1_EMAIL}    ${USER_1_PASSWORD}

    FOR    ${index}    IN RANGE    5
        ${nome}=    FakerLibrary.Name
        ${cpf}=     FakerLibrary.Cpf

        ${body}=    Create Dictionary
        ...    name=${nome}
        ...    cpf=${cpf}

        ${headers}=    Create Dictionary
        ...    Authorization=Bearer ${token}

        ${response}=    POST On Session
        ...    api
        ...    /policy
        ...    json=${body}
        ...    headers=${headers}
        ...    expected_status=201

        Should Be Equal As Strings    ${response.json()["status"]}    APOLICE_CRIADA
        Should Not Be Empty           ${response.json()["policyId"]}
    END