# Recupercao de senha

**RF** (requisitos funcionais)

- O usuario deve poder recuperar sua senha informando o e-mail
- O usuario deve receber um e-mail com instrucoes de recuperacao de senha
- O usuario deve poder resetar sua senha

**RNF** (requisitos nao funcionais)

- Utilizar o Mailtrap para testar envios em ambiente dev
- Utilizar Amazon SES para envios em producao
- O envio de e-mail deve aconter em segundo plano

**RN** (regras de negocio)

- O link enviado por e-mail para resetar, deve expirar em 2h
- O usuario deve confirmar a nova senha ao resetar

# Atualizacao do perfil

**RF** (requisitos funcionais)

- O usuario deve poder atualizar o seu nome, email  e senha

**RN** (regras de negocio)

- Usuario nao pode alterar seu email prar um email ja utilizado
- Para atualizar sua senha, o usuario deve informar a senha antiga
- Para atualizar sua senha, o usuario precisar confirmar a nova senha

# Painel do prestador

**RF** (requisitos funcionais)

- O usuario deve poder listar os seus agendamentos de um dia especifico
- O prestador deve receber uma notificacao sempre que houver um novo agendamento
- O prestador deve poder visualizar as notificacoes nao lidas

**RNF** (requisitos nao funcionais)

- Os agendamentos do prestador devem ser armazenados em cache
- As notificacoes do prestador devem ser armazenadas no mongoDB
- As notificacoes do prestador devem ser enviadas em tempo real utilizando Socket.io

**RN** (regras de negocio)

- A notificacao deve ter um status de lida ou nao lida para que o prestador possa controlar

# Agendamento de servicos

**RF** (requisitos funcionais)

- O usuario deve poder listar todos os pretadores de servicos cadastrados
- O usuario deve poder listar os dias de um mes com pelo menos um horario disponivel de um prestador
- O usuario deve poder listar horarios disponiveis de um dia especifico de um prestador
- O usuario deve poder realizar um novo agendamento com um prestador

**RNF** (requisitos nao funcionais)

- Listagem de prestadores deve ser armazenada em cache

**RN** (regras de negocio)

- Cada agendamento deve durar 1h exatamento
- Os agendamentos devem estar disponiveis entre 8h as 18h (Primeir as 8h, Ultimo as 17h)
- O usuario nao pode agendar em um horario ja ocupado
- O usuario nao pode agendar em um horario que ja passou
- O usuario nao pode agendar servico consigo mesmo

