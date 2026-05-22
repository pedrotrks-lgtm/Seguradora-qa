*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    MongoDBLibrary.py

*** Variables ***
${BASE_URL}    http://localhost:3000

*** Keywords ***

Criar Sessao API
    Create Session    backend    ${BASE_URL}

Login API Com Sucesso

    ${body}=    Create Dictionary
    ...    email=qa@b3.com
    ...    password=123456

    ${response}=    POST On Session
    ...    backend
    ...    /login
    ...    json=${body}

    ${json}=    Set Variable    ${response.json()}

    Should Be Equal As Numbers
    ...    ${response.status_code}
    ...    200

    Should Be Equal
    ...    ${json}[token]
    ...    abc123

    Should Be Equal
    ...    ${json}[user][name]
    ...    QA B3

    Should Be Equal
    ...    ${json}[user][email]
    ...    qa@b3.com

    Usuario Deve Existir No Mongo
    ...    qa@b3.com

    RETURN    ${response}

Login API Invalido

    ${body}=    Create Dictionary
    ...    email=erro
    ...    password=erro

    ${response}=    POST On Session
    ...    backend
    ...    /login
    ...    json=${body}
    ...    expected_status=any

    ${json}=    Set Variable    ${response.json()}

    Should Be Equal As Numbers
    ...    ${response.status_code}
    ...    401

    Should Be Equal
    ...    ${json}[error]
    ...    INVALID_CREDENTIALS

    Should Be Equal
    ...    ${json}[message]
    ...    Usuário ou senha inválidos

Login API Com Usuario
    [Arguments]    ${email}    ${password}

    ${body}=    Create Dictionary
    ...    email=${email}
    ...    password=${password}

    ${response}=    POST On Session
    ...    backend
    ...    /login
    ...    json=${body}

    Should Be Equal As Numbers
    ...    ${response.status_code}
    ...    200

    Should Not Be Empty
    ...    ${response.json()["token"]}

    RETURN    ${response}

