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

    Limpar Dados Policy

    Wait Until Page Does Not Contain
    ...    Apólice emitida com sucesso
    ...    10s

    Preencher Dados Policy Com Mesmo CPF

    Emitir Policy

    Wait Until Page Contains
    ...    CPF já cadastrado
    ...    20s

    Fechar Navegador