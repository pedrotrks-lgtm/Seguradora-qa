*** Settings ***
Resource    ../../resources/keywords.resource

*** Test Cases ***
Validar Campos Obrigatorios Policy

    Abrir Navegador

    Realizar Login Frontend

    Acessar Tela Policy

    Emitir Policy Sem Preencher

    Validar Erro Campos Policy

    Fechar Navegador