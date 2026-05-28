*** Settings ***
Resource    ../../resources/api/policyapi.resource

*** Test Cases ***
Validar Documento Invalido Policy API

    Criar Sessao Policy API

    Emitir Policy Documento Invalido