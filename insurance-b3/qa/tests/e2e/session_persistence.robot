*** Settings ***
Resource    ../../resources/keywords.resource

*** Test Cases ***
Persistir Sessao Apos Refresh

    Abrir Navegador

    Realizar Login Frontend

    Reload Page

    Validar Dashboard

    Fechar Navegador