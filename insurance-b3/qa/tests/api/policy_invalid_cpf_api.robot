*** Settings ***
Resource    ../../resources/api/PolicyApi.resource

*** Test Cases ***
Validar Documento Invalido Policy API

    Criar Sessao Policy API

    Emitir Policy Documento Invalido