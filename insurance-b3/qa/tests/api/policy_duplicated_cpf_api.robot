*** Settings ***
Resource    ../../resources/api/PolicyApi.resource

*** Test Cases ***
Validar CPF Duplicado Policy API

    Criar Sessao Policy API

    ${cpf}=    Evaluate
    ...    str(random.randint(10000000000, 99999999999))
    ...    random

    ${body}=    Create Dictionary
    ...    name=Pedro QA Duplicado
    ...    cpf=${cpf}

    ${response_1}=    POST On Session
    ...    backend
    ...    /policy
    ...    json=${body}
    ...    expected_status=201

    Should Be Equal
    ...    ${response_1.json()["status"]}
    ...    APOLICE_CRIADA

    ${response_2}=    POST On Session
    ...    backend
    ...    /policy
    ...    json=${body}
    ...    expected_status=409

    Should Be Equal
    ...    ${response_2.json()["error"]}
    ...    DUPLICATED_CPF

    Should Be Equal
    ...    ${response_2.json()["message"]}
    ...    CPF já cadastrado