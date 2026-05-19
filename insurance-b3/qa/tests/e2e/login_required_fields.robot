*** Settings ***
Resource    ../../resources/keywords.resource

*** Test Cases ***
Login Sem Preencher Campos

    Abrir Navegador
    Clicar Login Sem Preencher
    Validar Campos Obrigatorios
    Fechar Navegador