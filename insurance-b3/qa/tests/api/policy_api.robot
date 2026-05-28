*** Settings ***
Resource    ../../resources/api/policyapi.resource

*** Test Cases ***
Validar Emissao Policy API

    Criar Sessao Policy API

    ${response}=    Emitir Policy Com Sucesso

    Validar Contrato Policy Response
    ...    ${response}