*** Settings ***
Resource    ../../resources/api/PolicyApi.resource

*** Test Cases ***
Validar CPF Invalido API

    Criar Sessao Policy API

    Emitir Policy CPF Invalido