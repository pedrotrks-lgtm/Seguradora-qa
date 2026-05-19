*** Settings ***
Resource    ../../resources/keywords.resource

*** Test Cases ***
Acessar Dashboard Sem Login

    Abrir Dashboard Diretamente
    Validar Retorno Login
    Fechar Navegador