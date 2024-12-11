# api-vacina
Em algum momento do meu aprendizado criei essa pequena API que estava perdida nos meus arquivos, abrir esses arquivos é como uma viagem no tempo, pois vi que evolui bastante na criação das documentações

## Para executar

### Instale as dependencias

```
npm i
```

### Executando

```
npm start
```

## TECNOLOGIAS
- express
- javascript

# ROTAS

MÉTODOS PADRÕES: são métodos que vão se repetir em outros modelos, como é o caso de listar todos, listarApneasUm e remover, esses métodos serão praticamente os mesmo para paciente, 
unidade e vacina, a mudança será no endereço, se for paciente será /paciente, se for unidade /unidade ou se for vacina será /vacina, o retorno mudara de acordo com que você acessar. 
portanto especificarei as funções de um que valerá para os 3 citados.

OBS: como entrada entenda que é um Json

ENDPOIT: GET /paciente
ENTRADA: NENHUMA
SAIDA: lista de Paciente {dados dos pacientes}.
DESCRIÇÃO: lista todos os pacientes cadastrados (método padrão, pode ser usado como na descrição de métodos padrões, nesse caso o também serve para vacinação, usando o /vacinacao, e 
para agente, usando o /agente).

ENDPOIT: GET /paciente/:id
ENTRADA: NENHUMA
SAIDA: Paciente {dados do paciente}.
DESCRIÇÃO: seleciona o paciente cadastrados de acordo com o id fornecido (método padrão, 
pode ser usado como na descrição de métodos padrões).

ENDPOIT: DELETE /paciente/:id
ENTRADA: NENHUMA
SAIDA: {paciente eliminado com sucesso}.
DESCRIÇÃO:  Deleta o paciente de acordo com o id fornecido (método padrão, pode ser usado como na descrição de métodos padrões).

==============================================================================================================
PACIENTE:

ENDPOIT: POST /paciente
ENTRADA: 
```
{
    "nome": paciente_nome,
    "mae": paciente_mae,
    "dataNascimento": paciente_dataNascimento,
    "contato": paciente_contato
}
```
SAIDA: Paciente {dados do paciente}.
DESCRIÇÃO: Cria um paciente.

ENDPOIT: PUT /paciente
ENTRADA: 
```
{
    "nome": paciente_nome,
    "mae": paciente_mae,
    "dataNascimento": paciente_dataNascimento,
    "contato": paciente_contato 
}
```

SAIDA: Paciente {dados do paciente}.
DESCRIÇÃO: altera um existente paciente.

============================================================================================================
UNIDADE:

ENDPOIT: POST /unidade
ENTRADA: 
```
{
    "nome": unidade_nome,
    "cnes": unidade_cnes,
    "vinculo": unidade_vinculo,
    "contato": unidade_contato,
    "logradouro": unidade_logradouro,
    "numero": unidade_numero,
    "bairro": unidade_bairro,
    "municipio": unidade_municipio
}
```

SAIDA: Unidade {dados da unidade}.
DESCRIÇÃO: Cria uma unidade.

ENDPOIT: PUT /unidade
ENTRADA: 
```
{
    "cnes": unidade_cnes,
    "vinculo": unidade_vinculo,
    "contato": unidade_contato,
    "logradouro": unidade_logradouro,
    "numero": unidade_numero,
    "bairro": unidade_bairro,
    "municipio": unidade_municipio
}
```

SAIDA: Unidade {dados da unidade}.
DESCRIÇÃO: Altera uma unidade existente.

===========================================================================================================
VACINA:

ENDPOIT: POST /vacina
ENTRADA: 
```
{
    "nome": vacina_nome,
    "obrigatoria": vacina_obrigatoria
}
```
SAIDA: Vacina {dados da vacina}.
DESCRIÇÃO: Cria uma nova vacina.

ENDPOIT: PUT /vacina
ENTRADA: 
```
{
    "nome": vacina_nome,
    "obrigatoria": vacina_obrigatoria
}
```
SAIDA: Vacina {dados da vacina}.
DESCRIÇÃO: Altera uma vacina existente.

============================================================================================================
AGENTE:

ENDPOIT: POST /agente/:unidade_id
ENTRADA: 
```
{
    nome: agente_nome,
    cpf: agente_cpf,
    contato: agente_contato,
    email: agente_email,
    senha: agente_senha,
    unidadeId: agente_unidade_id
}
```
SAIDA: Agente {dados do agente}.
DESCRIÇÃO: Cria um agente vinculado a unidade_id fornecido.

ENDPOIT: GET /agente/:unidade_id
ENTRADA: NENHUMA
SAIDA: Agentes {dados dos agentes}.
DESCRIÇÃO: seleciona os agentes cadastrados na unidade de acordo com o unidade_id fornecido.

ENDPOIT: GET /agente/acao/:id
ENTRADA: NENHUMA
SAIDA: Agente {dados do agente}.
DESCRIÇÃO: seleciona o agente de acordo com o id fornecido.

ENDPOIT: DELETE /agente/acao/:id
ENTRADA: NENHUMA
SAIDA: {agente foi eliminado}.
DESCRIÇÃO: deleta os agentes de acordo com o id fornecido.

ENDPOIT: PUT /agente/:unidade_id/:id
ENTRADA: 
```
{
    "nome": agente_nome,
    "cpf": agente_cpf,
    "contato": agente_contato,
    "email": agente_email,
    "senha": agente_senha,
    "unidadeId": agente_unidade_id 
}
```
SAIDA: Agente {dados do agente}.
DESCRIÇÃO: Altera um agente de id e vinculado a unidade_id fornecido.

==========================================================================================================

VACINACAO:

ENDPOIT: GET /vacinacao/paciente/:pacienteid
ENTRADA: NENHUMA
SAIDA: Vacinacoes {dados das vacincações}.
DESCRIÇÃO: seleciona as vacinações cadastradas para o paciente de acordo com o pacienteid fornecido.

ENDPOIT: GET /vacinacao/agente/:agenteid
ENTRADA: NENHUMA
SAIDA: Vacinacoes {dados das vacincações}.
DESCRIÇÃO: seleciona as vacinações cadastradas para o agente de acordo com o agenteid fornecido.

ENDPOIT: GET /vacinacao/vacina/:vacinaid
ENTRADA: NENHUMA
SAIDA: Vacinacoes {dados das vacincações}.
DESCRIÇÃO: seleciona as vacinações cadastradas para a vacina de acordo com o vacinaid fornecido.

ENDPOIT: GET /vacinacao/:id
ENTRADA: NENHUMA
SAIDA: Vacinacao {dados da vacinacao}.
DESCRIÇÃO: seleciona a vacinação de acordo com o id fornecido.

ENDPOIT: DELETE /vacinacao/:id
ENTRADA: NENHUMA
SAIDA: {vacinacao foi eliminado}.
DESCRIÇÃO: deleta a vacinação de acordo com o id fornecido.

ENDPOIT: PUT /vacinacao/:id
ENTRADA:
```
{
    "reforco": vacinacao_reforco,
    "dataAplicacao": vacinacao_dataAplicacao,
    "remarcada": vacinacao_remarcada,
    "pacieteId": vacinacao_pacieteId,
    "vacinaId": vacinacao_vacinaId,
    "agenteId": vacinacao_agenteId 
}
```
SAIDA: Vacinacao {dados da vacinacao}.
DESCRIÇÃO: Altera uma vacinação de id fornecido.

ENDPOIT: POST /vacinacao/
ENTRADA: 
```
{
    "reforco": vacinacao_reforco,
    "dataAplicacao": vacinacao_dataAplicacao,
    "remarcada": vacinacao_remarcada,
    "pacieteId": vacinacao_pacieteId,
    "vacinaId": vacinacao_vacinaId,
    "agenteId": vacinacao_agenteId
}
```
SAIDA: Vacinacao {dados da vacinacao}.
DESCRIÇÃO: Cadastra uma vacinação.

AVISO PARA OS METODOS DE DELETAR, NÃO APAGARÁ SE HOUVER ALGUM VINCULO A OUTRA TABELA


