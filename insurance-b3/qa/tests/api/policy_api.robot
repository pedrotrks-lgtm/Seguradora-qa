*** Settings ***
Resource    ../../resources/api/PolicyApi.resource

*** Test Cases ***
Validar Emissao Policy API

    Criar Sessao Policy API

    ${response}=    Emitir Policy Com Sucesso

    Validar Contrato Policy Response
    ...    ${response}