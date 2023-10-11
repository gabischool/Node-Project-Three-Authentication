# API DOCUMENTATION

This document provides detailed information about the API endpoints and their usage for bookDb.
`BASE_URL : https://mahad-axmed-guuleed.onrender.com`

## ##[Authentication](*)

Most endpoints in the API require authentication using JSON Web Tokens (JWT). To authenticate, include the Authorization header in the request with the JWT. The header should be in the format: Bearer <token>, where <token> is the JWT obtained during the login process.

## ##[EndPoints]()

##### Owner Registration

**Endpint:** `POST api/owner/signup`
Register a new owner inthe system

##### Requst Body

| parameter | Type   | Required | Description                 |
| --------- | ------ | -------- | --------------------------- |
| Name      | String | Yes      | The First Name of The owner |
| Email     | String | Yes      | The Email of The owner      |
| password  | String | Yes      | The Password of The owner   |

### Response

```json
{
  "message": "Owner Cretated Success",
  "owner_id": 1
}
```

#### Owner Login

**Endpoint:** `POST /api/owner/login`

| parameter | Type   | Required | Description            |
| --------- | ------ | -------- | ---------------------- |
| email     | String | Yes      | The Email of The owner |
| password  | String | Yes      | The Password The owner |

### Response

```json
{
  "owner": {
    "id": 1,
    "name": "john Doe",
    "Email": "JohnDoe@gmail.com",
    "password": "<hashed_password>"
  },
  "token": "<JWT>"
}
```

### Get Owners

**Endpin:** `GET /api/owner`
Recive all owners

```json
[
  {
    "id": 1,
    "name": "john Doe",
    "Email": "johndoe@gmail.com",
    "password": "<hashed_password>",
    "created": "Date created",
    "updated": "Date updated"
  },
  {
    "id": 2,
    "name": "Mohamed",
    "Email": "Mohamed@gmail.com",
    "password": "<hashed_password>",
    "created": "Date created",
    "updated": "Date updated"
  }
]
```

### Get owner by Id

Recive the details of a specific Onwe by its ID
**Endpoint:** `GET /api/owner/:id`

#### Response

```json
{
        "id": 1,
        "name":"john Doe",
        "Email": "johndoe@gmail.com",
        "password": "<hashed_password>",
        "created": "Date created",
        "updated": "Date updated"
    },
```

### update owner

**Endpoint:**`PUT /api/owner/:id`
update the owner information

##### Request body

| parameter | Type   | Required | Description                        |
| --------- | ------ | -------- | ---------------------------------- |
| Name      | String | Yes      | update The First Name of The owner |
| Email     | String | Yes      | update The Email of The owner      |
| password  | String | Yes      | update The Password of The owner   |

#### Response

```json
{
    "message": "updated success",
    "owner": owner
}
```

### Delete Owner

**Endpoint:** `DELETE /api/owner/:id`

delete the owner information

#### Response

```json
{
  "message": "owner deleted success"
}
```

#### Create Book

**Endpont:** `POST /api/books`

create new book by authenticate owner

##### Request body

| parameter   | Type   | Required | Description           |
| ----------- | ------ | -------- | --------------------- |
| authorId    | String | Yes      | The Id of the author  |
| title       | String | Yes      | The Title Of The Book |
| bookStoreId | String | Yes      | the store id          |
| price       | String | Yes      | price of the book     |
| image       | String | Yes      | URL of the image      |

#### Response

```json
[
{
    "authorId": 1,
    "title" : "Book Name",
    "bookStoreId": 1,
    "price": 29,
    "image": "img_url"
},
"message": "book created success"
]
```

### Get All Books

**Endpont:** `GET /api/books`
Recieve All books

##### Response

```json
[
  {
    "authorId": 1,
    "title": "Book Name",
    "bookStoreId": 1,
    "price": 29,
    "image": "img_url"
  },
  {
    "authorId": 2,
    "title": "Book Name",
    "bookStoreId": 1,
    "price": 39,
    "image": "img_url"
  }
]
```

### Get Book By Id

**Endpoint:** `GET /api/books/:id`
Receive Specific Detail by book ID

#### Response

```json
{
  "authorId": 1,
  "title": "Book Name",
  "bookStoreId": 1,
  "price": 29,
  "image": "img_url"
}
```

### update book

**Endpoint:** `PUT /api/owner/:id`

update specific book by it's id

##### Request Parameters

| parameter | Type   | Required | Description          |
| --------- | ------ | -------- | -------------------- |
| id        | String | integer  | Id of book to update |

##### [Requst body]()

| parameter   | Type    | Required | Description                  |
| ----------- | ------- | -------- | ---------------------------- |
| authorId    | integer | Yes      | update The Id of the author  |
| title       | String  | Yes      | update The Title Of The Book |
| bookStoreId | integer | Yes      | update the store id          |
| price       | String  | Yes      | update price of the book     |
| image       | String  | Yes      | update URL of the image      |

#### Response

```json
{
  "message": "book updated success"
}
```

### [Delete Book]()

**Endpoint:** `DELETE /api/owner/:id`
delete by it's id

##### Response

```json
{
  "message": "book delted success"
}
```

### [Create Bookstore]()

**Endpoint:** `POST /api/store`

create new book store by authenticated owner

#### Request body

| parameter | Type   | Required | Description               |
| --------- | ------ | -------- | ------------------------- |
| name      | String | Yes      | The name of the store     |
| location  | String | Yes      | The location Of The store |

#### Response

```json
{
  "message": "store created success"
}
```

### [Get all bookstore]()

**Endpoint:** `GET /api/store`

Receive all bookstores

#### Response

```json
[
  {
    "id": 1,
    "name": "mogadisho",
    "location": "mogadisho"
  },
  {
    "id": 2,
    "name": "store 2",
    "location": "USA"
  }
]
```

### [Get store by id]()

**Endpoint:** `GET /api/store/:id`

#### Response

```json
{
  "id": 2,
  "name": "store 2",
  "location": "USA"
}
```

### update store

**Endpoint:** `PUT /api/store/:id`

update store by ity's id

#### Request body

| parameter | Type   | Required | Description                      |
| --------- | ------ | -------- | -------------------------------- |
| name      | String | Yes      | update The name of the store     |
| location  | String | Yes      | update The location Of The store |

#### Response

```json
{
  "message": "store updated success"
}
```

### Delete bookstore

**Endpoint:** `DELETE /api/store/:id`

#### Response

```json
{
  "message": "store deleted success"
}
```

### Create Author

**Endpoint:** `POST /api/author`

create new Author by authenticated owner

#### Request body

| parameter | Type   | Required | Description            |
| --------- | ------ | -------- | ---------------------- |
| name      | String | Yes      | The name of the Author |

#### Respons

```json
{
    "message": "author create success",
    "author": author
}
```

### update Author

**Endpoint:** `PUT /api/author/:id`

#### Request body

| parameter | Type   | Required | Description            |
| --------- | ------ | -------- | ---------------------- |
| name      | String | Yes      | The name of the Author |

#### Respons

```json
{
  "message": "author upated success"
}
```

### Get all authors

**Endpoint:** `GEt /api/author`
Receive all authors

#### Response

```json
[
  {
    "id": 1,
    "name": "Bakar",
    "created": "date created",
    "upated": "date updated"
  },
  {
    "id": 2,
    "name": "Mohamed",
    "created": "date created",
    "upated": "date updated"
  }
]
```

### Get Author by it's Id

**Endpoint:** `GET /api/author/:id`
Receive Author by it's id

#### Response

```json
{
  "id": 1,
  "name": "Bakar",
  "created": "date created",
  "upated": "date updated"
}
```

#### [Delete Author]()

**Endpoint:** `DELETE /api/author/:id`

Delete Author by it's id

#### Response

```json
{
  "message": "Author deleted success"
}
```
