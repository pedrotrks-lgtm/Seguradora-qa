*** Settings ***
Resource    ../../resources/keywords.resource

*** Test Cases ***
Validar CPF Duplicado No Front

    Abrir Navegador

    Realizar Login Frontend

    Acessar Tela Policy

    Preencher Dados Policy Com CPF Unico

    Emitir Policy

    Validar Policy Emitida

    Preencher Dados Policy Com Mesmo CPF

    Emitir Policy

    Wait Until Page Contains
    ...    CPF já cadastrado
    ...    10s

    Fechar Navegador