*** Settings ***
Resource    ../../resources/keywords.resource
Resource    ../../resources/users.resource

*** Test Cases ***
Validar Login Com Dois Usuarios
    Criar Sessao API

    ${token_user_1}=    Realizar Login    ${USER_1_EMAIL}    ${USER_1_PASSWORD}
    Should Not Be Empty    ${token_user_1}

    ${token_user_2}=    Realizar Login    ${USER_2_EMAIL}    ${USER_2_PASSWORD}
    Should Not Be Empty    ${token_user_2}