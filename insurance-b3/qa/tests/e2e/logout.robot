*** Settings ***
Resource    ../../resources/keywords.resource

*** Test Cases ***
Logout Com Sucesso

    Abrir Navegador

    Realizar Login Frontend

    Validar Dashboard

    Realizar Logout

    Validar Redirecionamento Login

    Fechar Navegador