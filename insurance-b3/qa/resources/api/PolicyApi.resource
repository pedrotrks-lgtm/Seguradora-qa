*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    MongoDBLibrary.py

*** Variables ***
${BASE_URL}    http://localhost:3000

*** Keywords ***

Criar Sessao Policy API
    Create Session    backend    ${BASE_URL}

Emitir Policy Com Sucesso

    ${cpf}=    Evaluate
    ...    str(random.randint(10000000000, 99999999999))
    ...    random

    ${body}=    Create Dictionary
    ...    name=Pedro QA
    ...    cpf=${cpf}

    ${response}=    POST On Session
    ...    backend
    ...    /policy
    ...    json=${body}

    ${json}=    Set Variable    ${response.json()}

    Should Be Equal As Numbers
    ...    ${response.status_code}
    ...    201

    Should Be Equal
    ...    ${json}[status]
    ...    APOLICE_CRIADA

    Should Be Equal
    ...    ${json}[message]
    ...    Apólice emitida com sucesso

    Should Not Be Empty
    ...    ${json}[policyId]

    Policy Deve Existir No Mongo
    ...    ${cpf}
    ...    CREATED

    RETURN    ${response}

Emitir Policy CPF Invalido

    ${body}=    Create Dictionary
    ...    name=Pedro QA
    ...    cpf=123

    ${response}=    POST On Session
    ...    backend
    ...    /policy
    ...    json=${body}
    ...    expected_status=any

    ${json}=    Set Variable    ${response.json()}

    Should Be Equal As Numbers
    ...    ${response.status_code}
    ...    400

    Should Be Equal
    ...    ${json}[error]
    ...    INVALID_CPF

    Should Be Equal
    ...    ${json}[message]
    ...    CPF inválido

Emitir Policy Sem Campos

    ${body}=    Create Dictionary

    ${response}=    POST On Session
    ...    backend
    ...    /policy
    ...    json=${body}
    ...    expected_status=any

    ${json}=    Set Variable    ${response.json()}

    Should Be Equal As Numbers
    ...    ${response.status_code}
    ...    400

    Should Be Equal
    ...    ${json}[error]
    ...    REQUIRED_FIELDS

    Should Be Equal
    ...    ${json}[message]
    ...    Preencha os campos obrigatórios