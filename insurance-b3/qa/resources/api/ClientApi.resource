*** Settings ***
Library    RequestsLibrary
Library    Collections
Library    FakerLibrary    locale=pt_BR

*** Variables ***
${BASE_URL}    http://localhost:3000

*** Keywords ***

Criar Sessao Client API
    Create Session    backend    ${BASE_URL}

Cadastrar Cliente Randomico

    ${nome}=    FakerLibrary.Name
    ${cpf_fake}=    FakerLibrary.Cpf

    ${cpf}=    Evaluate
    ...    re.sub(r'\D', '', '''${cpf_fake}''')
    ...    re

    ${body}=    Create Dictionary
    ...    name=${nome}
    ...    cpf=${cpf}
    ...    policy=Seguro Auto

    ${response}=    POST On Session
    ...    backend
    ...    /client
    ...    json=${body}

    ${json}=    Set Variable    ${response.json()}

    Should Be Equal As Numbers
    ...    ${response.status_code}
    ...    201

    Should Be Equal
    ...    ${json}[status]
    ...    CLIENTE_CRIADO

    Should Not Be Empty
    ...    ${json}[clientId]

    RETURN    ${response}