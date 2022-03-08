## Documentação Swagger

```

http://localhost:3000/api-docs

```
## Variáveis de ambiente
> .env

Crie o arquivo .env com a configuração que contém as variáveis de ambiente necessárias para o funcionamento do projeto.

Configuração padrão:

```
PORT=3000

MONGO_URL="mongodb://mongodb:27017/desafio"

```

## Rodando o projeto
Dentro da pasta da aplicação, execute o comando para instalar as dependências:
```
npm install
```
Rode a compilação:
```
npm build
```
Iniciem o servidor:
```
npm start
```
Subindo servidor:
```
nodemon start
```
Acesse o endereço http://localhost:3000/api-docs
## Ambiente Docker
> Dockerfile

> docker-compose.yml

images:
> node:alpine

> mongo:5

### Subindo os containers
Usaremos os comandos do docker-compose para compilar a imagem do aplicativo, 
compile a imagem do app com o seguinte comando:
```
docker-compose build app
```
Quando a compilação terminar, execute o ambiente em modo de segundo plano com:
```
docker-compose up -d
```
Para fechar seu ambiente do Docker Compose e remover todos os seus contêineres, redes e volumes, execute:
```
docker-compose down -v
```


# Funções desta API

| Método | Url | Parâmetros | Descrição 
|---|---|---|---|
| `GET` | localhost:3000/api/v1/reserva/ | | Retorna todas as reservas
| `GET` | localhost:3000/api/v1/reserva/ | id | Retorna a reserva com o id passado por parâmetro
| `POST` | localhost:3000/api/v1/reserva/ |  | Cria uma nova reserva
| `POST` | localhost:3000/api/v1/reserva/getByDate/ |  | Filtrar reservas por data
| `PUT` | localhost:3000/api/v1/reserva/| id | Atualiza a reserva com o id passado por parâmetro
| `DELETE` | localhost:3000/api/v1/reserva/ | id | Deleta a reserva com o id passado por parâmetro



## Listar todas as reservas

> localhost:3000/api/v1/reserva/

Resposta do tipo json:

```
{
    "count": 1,
    "reservations": [
        {
            "_id": "618964495954cf986a18e500",
            "apartment_name": "quarto1",
            "checkin_date": "2021-04-01T00:00:00.000Z",
            "checkout_date": "2021-04-02T00:00:00.000Z",
            "number_guests": 2,
            "guest_data": [
                {
                    "guest_name": "saulo santos",
                    "guest_email": "saulo@gmail.com",
                    "_id": "618964495954cf986a18e501"
                },
                {
                    "guest_name": "amanda santos",
                    "guest_email": "amanda@gmail.com",
                    "_id": "618964495954cf986a18e502"
                }
            ],
            "timestamp": "2021-11-08T17:54:17.199Z",
            "__v": 0
        }
	]	
}
```

## Buscar reserva pelo id

> localhost:3000/api/v1/reserva/id

Deverá informar o id como parâmetro na url.
Resposta do tipo json se o id for encontrado, ou então retornará um erro 404


## Criar uma nova reserva

> localhost:3000/api/v1/reserva/

| Obrigatório | Tipo | Tamanho Máx. | Parâmetro  
|---|---|---|---|
| `True` | string | 20 | apartment_name
| `True` | date | | checkin_date
| `True` | date | | checkout_date
| `True` | int |  | number_guests
| `True` | string | 50 | guest_name
| `True` | string | 30 | guest_email

Deverá informar os dados em json:

```
{
	"apartment_name": "quarto1",            
    "checkin_date": "2021-11-07",
    "checkout_date": "2021-11-12",
    "number_guests": 2,
    "guest_data": [
        {
            "guest_name": "saulo santos",
            "guest_email": "saulo@gmail.com",
        },
        {
        	"guest_name": "amanda santos",
        	"guest_email": "amanda@gmail.com",
        }
	]        	       	
}
```
Resposta do tipo json se os dados forem validados, ou então retornará uma menssagem de erro 400

## Buscar reservas por data

> localhost:3000/api/v1/reserva/getByDate

Deverá informar os parâmetros 'checkin_date' e 'checkout_date':
```
	{
        "checkin_date": "2021-05-10",
        "checkout_date": "2021-05-15"
	}
```
Resposta do tipo json se for encontrado dentro do período de datas informadas, ou então retornará status 200 com um array vazio.

## Atualizar uma reserva

> localhost:3000/api/v1/reserva/id

Deverá informar o id da reserva a ser atualizada na url.
Assim como no méthodo de criação, deverá informar os dados em json com os parâmetros a serem atualizados:
```
	{
    "apartment_name": "quarto1",            
    "checkin_date": "2021-11-15",
    "checkout_date": "2021-11-22",
    "number_guests": 1,
    "guest_data": [
        {
            "guest_name": "saulo santos",
            "guest_email": "saulo@gmail.com",
        }
	] 
	}
```
## Deletar uma reserva

> localhost:3000/api/v1/reserva/id

Deverá informar o id da reserva a ser deleta na url.
Retorna status 200 se o id for válido e a reserva for deletada ou status 404 se o id não for encontrado.