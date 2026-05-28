*** Settings ***
Resource    ../../resources/api/policyapi.resource

*** Test Cases ***
Validar Campos Obrigatorios API

    Criar Sessao Policy API

    Emitir Policy Sem Campos