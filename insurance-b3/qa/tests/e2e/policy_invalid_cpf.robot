*** Settings ***
Resource    ../../resources/keywords.resource

*** Test Cases ***
Validar CPF Invalido

    Abrir Navegador

    Realizar Login Frontend

    Acessar Tela Policy

    Preencher CPF Invalido

    Emitir Policy

    Validar CPF Invalido

    Fechar Navegador