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

    ${HEADLESS}=    Set Variable    --headless=new
    ${NO_SANDBOX}=    Set Variable    --no-sandbox
    ${DEV_SHM}=    Set Variable    --disable-dev-shm-usage
    ${WINDOW_SIZE}=    Set Variable    --window-size=1920,1080

    Call Method    ${options}    add_argument    ${HEADLESS}
    Call Method    ${options}    add_argument    ${NO_SANDBOX}
    Call Method    ${options}    add_argument    ${DEV_SHM}
    Call Method    ${options}    add_argument    ${WINDOW_SIZE}

    Open Browser
    ...    http://localhost:5173
    ...    chrome
    ...    options=${options}

    Maximize Browser Window

Abrir Policy Diretamente

    Abrir Navegador
    Go To    http://localhost:5173/policy

Abrir Dashboard Diretamente

    Abrir Navegador
    Go To    http://localhost:5173/dashboard

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

    Wait Until Page Contains
    ...    Seguradora B3
    ...    10s

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

    ${policyNumber}=    Evaluate
    ...    "APO-" + str(random.randint(100000, 999999))
    ...    random

    Input Text    ${INPUT_INSURER_CODE}          SEG002
    Input Text    ${INPUT_POLICY_NUMBER}         ${policyNumber}
    Input Text    ${INPUT_PRODUCT_CODE}          AUTO
    Input Text    ${INPUT_INSURED_DOCUMENT}      12345678901
    Input Text    ${INPUT_PREMIUM_AMOUNT}        850.9
    Input Text    ${INPUT_COVERAGE_AMOUNT}       50000
    Input Text    ${INPUT_EFFECTIVE_START_DATE}  2026-06-01
    Input Text    ${INPUT_EFFECTIVE_END_DATE}    2027-06-01

Emitir Policy

    Click Button    ${BTN_EMITIR}

Validar Policy Emitida

    Wait Until Page Contains
    ...    Apólice registrada com sucesso no ambiente SRO/B3
    ...    10s

Emitir Policy Sem Preencher

    Click Button    ${BTN_EMITIR}

Validar Erro Campos Policy

    Wait Until Page Contains
    ...    Preencha todos os campos obrigatórios do registro SRO
    ...    10s

Preencher Documento Invalido

    ${policyNumber}=    Evaluate
    ...    "APO-" + str(random.randint(100000, 999999))
    ...    random

    Input Text    ${INPUT_INSURER_CODE}            SEG002
    Input Text    ${INPUT_POLICY_NUMBER}           ${policyNumber}
    Input Text    ${INPUT_PRODUCT_CODE}            AUTO
    Input Text    ${INPUT_INSURED_DOCUMENT}        123
    Input Text    ${INPUT_PREMIUM_AMOUNT}          850.9
    Input Text    ${INPUT_COVERAGE_AMOUNT}         50000
    Input Text    ${INPUT_EFFECTIVE_START_DATE}    2026-06-01
    Input Text    ${INPUT_EFFECTIVE_END_DATE}      2027-06-01

Validar Documento Invalido

    Wait Until Page Contains
    ...    CPF ou CNPJ inválido
    ...    10s

Validar Redirecionamento Login

    Location Should Be    http://localhost:5173/

Clicar Emitir Duas Vezes

    Double Click Element    ${BTN_EMITIR}

Preencher Dados Policy Com CPF Unico

    ${cpf}=    Evaluate
    ...    str(random.randint(10000000000, 99999999999))
    ...    random

    Set Test Variable    ${CPF_POLICY_DUPLICADO}    ${cpf}

    Input Text    ${INPUT_CLIENTE}    Pedro QA
    Input Text    ${INPUT_CPF}        ${cpf}

Preencher Dados Policy Com Mesmo CPF

    Input Text    ${INPUT_CLIENTE}    Pedro QA
    Input Text    ${INPUT_CPF}        ${CPF_POLICY_DUPLICADO}

Limpar Dados Policy

    Clear Element Text    ${INPUT_CLIENTE}
    Clear Element Text    ${INPUT_CPF}

Preencher Dados Policy Com CPF Informado
    [Arguments]    ${cpf}

    Clear Element Text    ${INPUT_CLIENTE}
    Clear Element Text    ${INPUT_CPF}

    Input Text    ${INPUT_CLIENTE}    Pedro QA
    Input Text    ${INPUT_CPF}        ${cpf}

Criar Policy Pela API
    [Arguments]    ${policyNumber}

    Log To Console    Criando policy pela API com número: ${policyNumber}

    Create Session    backend_duplicated    http://localhost:3000

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
    ...    backend_duplicated
    ...    /policy
    ...    json=${body}
    ...    expected_status=201

    RETURN    ${response}

Validar Policy Duplicada Pela API
    [Arguments]    ${cpf}

    ${body}=    Create Dictionary
    ...    name=Pedro QA
    ...    cpf=${cpf}

    ${response}=    POST On Session
    ...    backend
    ...    /policy
    ...    json=${body}
    ...    expected_status=409

    Should Be Equal
    ...    ${response.json()["error"]}
    ...    DUPLICATED_CPF

    Should Be Equal
    ...    ${response.json()["message"]}
    ...    CPF já cadastrado

Preencher Dados Policy Com Numero Informado
    [Arguments]    ${policyNumber}

    Clear Element Text    ${INPUT_INSURER_CODE}
    Clear Element Text    ${INPUT_POLICY_NUMBER}
    Clear Element Text    ${INPUT_PRODUCT_CODE}
    Clear Element Text    ${INPUT_INSURED_DOCUMENT}
    Clear Element Text    ${INPUT_PREMIUM_AMOUNT}
    Clear Element Text    ${INPUT_COVERAGE_AMOUNT}
    Clear Element Text    ${INPUT_EFFECTIVE_START_DATE}
    Clear Element Text    ${INPUT_EFFECTIVE_END_DATE}

    Input Text    ${INPUT_INSURER_CODE}            SEG002
    Input Text    ${INPUT_POLICY_NUMBER}           ${policyNumber}
    Input Text    ${INPUT_PRODUCT_CODE}            AUTO
    Input Text    ${INPUT_INSURED_DOCUMENT}        12345678901
    Input Text    ${INPUT_PREMIUM_AMOUNT}          850.9
    Input Text    ${INPUT_COVERAGE_AMOUNT}         50000
    Input Text    ${INPUT_EFFECTIVE_START_DATE}    2026-06-01
    Input Text    ${INPUT_EFFECTIVE_END_DATE}      2027-06-01

Cadastrar 5 Apolices Randomicas

    FOR    ${index}    IN RANGE    5

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

        Create Session    backend_multiplo_${index}    http://localhost:3000

        ${response}=    POST On Session
        ...    backend_multiplo_${index}
        ...    /policy
        ...    json=${body}
        ...    expected_status=201

        Should Be Equal
        ...    ${response.json()["status"]}
        ...    REGISTERED

    END