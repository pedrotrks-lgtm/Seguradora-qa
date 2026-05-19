*** Settings ***
Library     SeleniumLibrary
Library     JSONLibrary
Library     RequestsLibrary
Resource    ../pages/LoginPage.resource
Resource    ../pages/PolicyPage.resource

*** Keywords ***

Abrir Navegador

    ${options}=    Evaluate    sys.modules['selenium.webdriver'].ChromeOptions()    sys, selenium.webdriver

    ${prefs}=    Create Dictionary
    ...    credentials_enable_service=${False}
    ...    profile.password_manager_enabled=${False}

    Call Method
    ...    ${options}
    ...    add_experimental_option
    ...    prefs
    ...    ${prefs}

    Call Method    ${options}    add_argument    --disable-notifications
    Call Method    ${options}    add_argument    --disable-infobars
    Call Method    ${options}    add_argument    --guest

    Open Browser
    ...    http://localhost:5173
    ...    chrome
    ...    options=${options}

    Maximize Browser Window

Abrir Policy Diretamente

    Open Browser    http://localhost:5173/policy    chrome

Abrir Dashboard Diretamente

    Open Browser    http://localhost:5173/dashboard    chrome

Criar Sessao API

    Create Session    api    http://localhost:3000

Carregar Usuario Admin

    ${json}=    Load Json From File    qa/fixtures/users.json

    ${email}=    Get Value From Json    ${json}    $.admin.email
    ${password}=    Get Value From Json    ${json}    $.admin.password

    Set Suite Variable    ${EMAIL}       ${email}[0]
    Set Suite Variable    ${PASSWORD}    ${password}[0]

Carregar Usuario Invalido

    ${json}=    Load Json From File    qa/fixtures/users.json

    ${email}=    Get Value From Json    ${json}    $.invalid.email
    ${password}=    Get Value From Json    ${json}    $.invalid.password

    Set Suite Variable    ${EMAIL}       ${email}[0]
    Set Suite Variable    ${PASSWORD}    ${password}[0]

Realizar Login
    [Arguments]    ${email}    ${password}

    ${body}=    Create Dictionary
    ...    email=${email}
    ...    password=${password}

    ${response}=    POST On Session
    ...    api
    ...    /login
    ...    json=${body}
    ...    expected_status=200

    ${token}=    Set Variable    ${response.json()["token"]}

    RETURN    ${token}

Realizar Login Frontend

    Carregar Usuario Admin

    Input Text    ${INPUT_EMAIL}       ${EMAIL}
    Input Text    ${INPUT_PASSWORD}    ${PASSWORD}

    Click Button    ${BTN_LOGIN}

Realizar Logout

    Click Button    xpath=//button[contains(.,'Sair')]

Clicar Login Sem Preencher

    Click Button    ${BTN_LOGIN}

Validar Campos Obrigatorios

    Location Should Be    http://localhost:5173/

Validar Dashboard

    Wait Until Page Contains    Dashboard Seguradora

Validar Retorno Login

    Wait Until Page Contains    Seguradora B3

Validar Erro Login

    Wait Until Page Contains    Usuário ou senha inválidos

Fechar Navegador

    Close Browser

Acessar Tela Policy

    Wait Until Element Is Visible
    ...    xpath=//*[@data-testid='emitir-apolice']
    ...    10s

    Click Element
    ...    xpath=//*[@data-testid='emitir-apolice']

Preencher Dados Policy

    Input Text    ${INPUT_CLIENTE}    Pedro QA
    Input Text    ${INPUT_CPF}        12345678900

Emitir Policy

    Click Button    ${BTN_EMITIR}

Validar Policy Emitida

    Wait Until Page Contains    Apólice emitida com sucesso

Emitir Policy Sem Preencher

    Click Button    ${BTN_EMITIR}

Validar Erro Campos Policy

    Wait Until Page Contains    Preencha os campos obrigatórios

Preencher CPF Invalido

    Input Text    ${INPUT_CLIENTE}    Pedro QA
    Input Text    ${INPUT_CPF}        123

Validar CPF Invalido

    Wait Until Page Contains    CPF inválido

Validar Redirecionamento Login

    Location Should Be    http://localhost:5173/

Clicar Emitir Duas Vezes

    Double Click Element    ${BTN_EMITIR}