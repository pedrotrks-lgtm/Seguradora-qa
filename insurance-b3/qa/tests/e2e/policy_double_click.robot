*** Settings ***
Resource    ../../resources/keywords.resource

*** Test Cases ***
Bloquear Duplo Clique Emissao

    Abrir Navegador

    Realizar Login Frontend

    Acessar Tela Policy

    Preencher Dados Policy

    Clicar Emitir Duas Vezes

    Validar Policy Emitida

    Fechar Navegador