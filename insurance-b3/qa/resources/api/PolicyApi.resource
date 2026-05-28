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

    ${policyNumber}=    Evaluate
    ...    "APO-" + str(random.randint(100000, 999999))
    ...    random

    ${body}=    Create Dictionary
    ...    insurerCode=SEG002
    ...    policyNumber=${policyNumber}
    ...    productCode=AUTO
    ...    insuredDocument=12345678901
    ...    premiumAmount=${850.9}
    ...    coverageAmount=${50000}
    ...    effectiveStartDate=2026-06-01
    ...    effectiveEndDate=2027-06-01

    ${response}=    POST On Session
    ...    backend
    ...    /policy
    ...    json=${body}
    ...    expected_status=201

    ${json}=    Set Variable    ${response.json()}

    Should Be Equal As Numbers
    ...    ${response.status_code}
    ...    201

    Should Be Equal
    ...    ${json}[status]
    ...    REGISTERED

    Should Be Equal
    ...    ${json}[message]
    ...    Apólice registrada com sucesso no ambiente SRO/B3

    Should Not Be Empty
    ...    ${json}[policyId]

    Should Not Be Empty
    ...    ${json}[registrationId]

    Policy Deve Existir No Mongo
    ...    ${policyNumber}
    ...    REGISTERED

    RETURN    ${response}

Emitir Policy Documento Invalido

    ${policyNumber}=    Evaluate
    ...    "APO-" + str(random.randint(100000, 999999))
    ...    random

    ${body}=    Create Dictionary
    ...    insurerCode=SEG002
    ...    policyNumber=${policyNumber}
    ...    productCode=AUTO
    ...    insuredDocument=123
    ...    premiumAmount=${850.9}
    ...    coverageAmount=${50000}
    ...    effectiveStartDate=2026-06-01
    ...    effectiveEndDate=2027-06-01

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
    ...    INVALID_DOCUMENT

    Should Be Equal
    ...    ${json}[message]
    ...    CPF ou CNPJ inválido

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
    ...    Preencha todos os campos obrigatórios do registro SRO

Validar Contrato Policy Response
    [Arguments]    ${response}

    ${json}=    Set Variable    ${response.json()}

    Dictionary Should Contain Key
    ...    ${json}
    ...    policyId

    Dictionary Should Contain Key
    ...    ${json}
    ...    registrationId

    Dictionary Should Contain Key
    ...    ${json}
    ...    status

    Dictionary Should Contain Key
    ...    ${json}
    ...    message

    Should Be Equal
    ...    ${json}[status]
    ...    REGISTERED

    Should Be Equal
    ...    ${json}[message]
    ...    Apólice registrada com sucesso no ambiente SRO/B3