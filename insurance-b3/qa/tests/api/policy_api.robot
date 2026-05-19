*** Settings ***
Resource    ../../resources/api/PolicyApi.resource

*** Test Cases ***
Validar Emissao Policy API

    Criar Sessao Policy API

    ${response}=    Emitir Policy Com Sucesso

    Should Be Equal
    ...    ${response.json()["status"]}
    ...    APOLICE_CRIADA

    Should Not Be Empty
    ...    ${response.json()["policyId"]}

    Should Be Equal
    ...    ${response.status_code}
    ...    ${201}