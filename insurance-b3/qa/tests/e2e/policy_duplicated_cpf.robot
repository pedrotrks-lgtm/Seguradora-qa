*** Settings ***
Resource    ../../resources/keywords.resource

*** Test Cases ***
Validar Policy Number Duplicado No Front

    ${policyNumber}=    Evaluate
    ...    "APO-" + str(random.randint(100000, 999999))
    ...    random

    Criar Policy Pela API    ${policyNumber}

    Abrir Navegador

    Realizar Login Frontend

    Acessar Tela Policy

    Preencher Dados Policy Com Numero Informado    ${policyNumber}

    Emitir Policy

    Wait Until Page Contains
    ...    Número da apólice já registrado
    ...    20s

    Fechar Navegador