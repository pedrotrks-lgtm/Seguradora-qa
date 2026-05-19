*** Settings ***
Resource    ../../resources/keywords.resource

*** Test Cases ***
Login Com Senha Invalida

    Abrir Navegador

    Carregar Usuario Invalido

    Input Text    ${INPUT_EMAIL}       ${EMAIL}
    Input Text    ${INPUT_PASSWORD}    ${PASSWORD}

    Click Button    ${BTN_LOGIN}

    Validar Erro Login

    Fechar Navegador