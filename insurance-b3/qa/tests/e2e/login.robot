*** Settings ***
Resource         ../../resources/keywords.resource

*** Test Cases ***
Login Com Sucesso

    Abrir Navegador
    Carregar Usuario Admin
    Realizar Login Frontend
    Validar Dashboard
    Fechar Navegador