*** Settings ***
Resource    ../../resources/keywords.resource

*** Test Cases ***
Emitir Policy Com Sucesso

    Abrir Navegador

    Realizar Login Frontend

    Acessar Tela Policy

    Preencher Dados Policy

    Emitir Policy

    Validar Policy Emitida

    Fechar Navegador