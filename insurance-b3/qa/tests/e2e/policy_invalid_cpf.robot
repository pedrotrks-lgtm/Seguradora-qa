*** Settings ***
Resource    ../../resources/keywords.resource

*** Test Cases ***
Validar CPF Invalido

    Abrir Navegador

    Realizar Login Frontend

    Acessar Tela Policy

    Preencher Documento Invalido

    Emitir Policy

    Validar Documento Invalido

    Fechar Navegador