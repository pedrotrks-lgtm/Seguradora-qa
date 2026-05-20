*** Settings ***
Resource    ../../resources/keywords.resource

*** Test Cases ***
Validar CPF Duplicado No Front

    ${cpf}=    Evaluate
    ...    str(random.randint(10000000000, 99999999999))
    ...    random

    Criar Policy Pela API    ${cpf}

    Abrir Navegador

    Realizar Login Frontend

    Acessar Tela Policy

    Preencher Dados Policy Com CPF Informado    ${cpf}

    Emitir Policy

    Wait Until Page Contains
    ...    CPF já cadastrado
    ...    20s

    Fechar Navegador