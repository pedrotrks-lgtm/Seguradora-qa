*** Settings ***
Resource    ../../resources/api/policyapi.resource

*** Test Cases ***
Validar Policy Duplicada API

    Criar Sessao Policy API

    ${policyNumber}=    Set Variable    APO-DUPLICADA-001

    ${body}=    Create Dictionary
    ...    insurerCode=SEG002
    ...    policyNumber=${policyNumber}
    ...    productCode=AUTO
    ...    insuredDocument=12345678901
    ...    premiumAmount=${850.9}
    ...    coverageAmount=${50000}
    ...    effectiveStartDate=2026-06-01
    ...    effectiveEndDate=2027-06-01

    POST On Session
    ...    backend
    ...    /policy
    ...    json=${body}
    ...    expected_status=any

    ${response}=    POST On Session
    ...    backend
    ...    /policy
    ...    json=${body}
    ...    expected_status=any

    Should Be Equal As Numbers
    ...    ${response.status_code}
    ...    409

    Should Be Equal
    ...    ${response.json()["error"]}
    ...    DUPLICATED_POLICY

    Should Be Equal
    ...    ${response.json()["message"]}
    ...    Número da apólice já registrado