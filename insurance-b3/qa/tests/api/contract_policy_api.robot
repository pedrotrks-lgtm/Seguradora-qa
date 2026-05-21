*** Settings ***
Resource    ../../resources/api/PolicyApi.resource

*** Test Cases ***
Validar Contrato Policy API

    Criar Sessao Policy API

    ${response}=    Emitir Policy Com Sucesso

    Validar Contrato Policy Response
    ...    ${response}