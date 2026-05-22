*** Settings ***
Resource    ../../resources/api/AuthApi.resource
Resource    ../../resources/users.resource

*** Test Cases ***
Validar Login API Com Multiplos Usuarios

    Criar Sessao API

    ${response_user_1}=    Login API Com Usuario
    ...    ${USER_1_EMAIL}
    ...    ${USER_1_PASSWORD}

    Should Be Equal
    ...    ${response_user_1.json()["user"]["email"]}
    ...    ${USER_1_EMAIL}

    ${response_user_2}=    Login API Com Usuario
    ...    ${USER_2_EMAIL}
    ...    ${USER_2_PASSWORD}

    Should Be Equal
    ...    ${response_user_2.json()["user"]["email"]}
    ...    ${USER_2_EMAIL}

    ${response_user_3}=    Login API Com Usuario
    ...    ${USER_3_EMAIL}
    ...    ${USER_3_PASSWORD}

    Should Be Equal
    ...    ${response_user_3.json()["user"]["email"]}
    ...    ${USER_3_EMAIL}