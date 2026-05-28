*** Settings ***
Resource    ../../resources/api/AuthApi.resource

*** Test Cases ***
Validar Login API

    Criar Sessao API

    ${response}=    Login API Com Sucesso

    Should Be Equal As Numbers
    ...    ${response.status_code}
    ...    200

    Should Be Equal
    ...    ${response.json()["user"]["name"]}
    ...    QA B3

    Should Be Equal
    ...    ${response.json()["user"]["email"]}
    ...    qa@b3.com

    Should Not Be Empty
    ...    ${response.json()["token"]}

    Should Contain
    ...    ${response.json()["token"]}
    ...    eyJ