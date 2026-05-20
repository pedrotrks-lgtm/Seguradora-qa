*** Settings ***
Resource    ../../resources/keywords.resource

*** Test Cases ***
Bloquear Acesso Apos Logout

    Abrir Navegador

    Carregar Usuario Admin
    Realizar Login Frontend
    Validar Dashboard
    Realizar Logout
    Go To    http://localhost:5173/dashboard
    Validar Retorno Login
    Fechar Navegad