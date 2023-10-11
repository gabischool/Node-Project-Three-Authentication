# Introduction

## BOOKSTORE API Documentation

## Base URL 
The base URL for this API is: `https://node-four-deploying.onrender.com`


### Owner Sign-up and log in.

## Sign-up Owner
Endpoint: `/api/owner/signup`
Method: POST

Request
`{
  "name": "ali Doli",
  "email": "Doli@example.com",
  "password": "securepassword"
}`

`name` (string, required): The name of the owner.
`email` (string, required): The email address of the owner.
`password` (string, required): The owner's password.


### Response (Success - 201 Created)

`{
  "message": "Owner creation successful",
  "owner": {
    "id": 1,
     "name": "ali Doli",
  "email": "Doli@example.com",
  }
}
`
  
Response (Error - 409 Conflict)
`{
  "message": "Owner already exists"
}
`

Response (Error - 500 Internal Server Error)
`{
  "message": "Something went wrong",
  "error": "Internal server error message"
}`


## Login Owner
Endpoint: `/api/owner/login`
Method: POST

### Request

``{
  "email": "john.doe@example.com",
  "password": "securepassword"
}``

`email` (string, required): The email address of the owner.
`password` (string, required): The owner's password.


``{
  "message": "Owner logged in successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}``

`token` (string): JSON Web Token (JWT) for authentication.

Response (Error - 401 Unauthorized)
`{
  "message": "Invalid credentials"
}`

Response (Error - 500 Internal Server Error)
`{
  "message": "Something went wrong",
  "error": "Internal server error message"
}`
# Bookstore Endpoints 
This API provides endpoints to manage bookstores. Authentication is required to access these endpoints using a JSON Web Token (JWT).

## Authentication
To access these endpoints, you need to include a valid JWT token in the request headers.

Header: `Authorization`
Value: `Bearer YOUR_TOKEN`

## Get All Bookstores
Endpoint: `/api/bookstore`
Method: GET
Request
No request body is required.
Response (Success - 200 OK)

`[
  {
    "id": 1,
    "ownerId": 1,
    "name": "Bookstore 1",
    "location": "Location 1"
  },
  {
    "id": 2,
    "ownerId": 2,
    "name": "Bookstore 2",
    "location": "Location 2"
  }
]
`


Response (Error - 404 Not Found)
`{
  "message": "BookStores not found"
}`


Response (Error - 500 Internal Server Error)

{
  "error": "Internal server error message"
}


## Get Bookstore by ID
Endpoint: /api/bookstores/:id
Method: GET

Request
No request body is required.

Response (Success: 200 OK)
`{
  "id": 1,
  "ownerId": 1,
  "name": "Bookstore 1",
  "location": "Location 1"
}`

Response (Error - 404 Not Found)

`{
  "message": "BookStore not found"
}`

Response (Error: 500 Internal Server Error)

`{
  "message": "Something went wrong",
  "error": "Internal server error message"
}`


## Create Bookstore
Endpoint: /api/bookstore
Method: POST

Request
`{
  "ownerId": 1,
  "name": "New Bookstore",
  "location": "New Location"
}`

ownerId (number, required): The ID of the owner.
name (string, required): The name of the bookstore.
location (string, required): The location of the bookstore.

Response (Success: 200 OK)

`{
  "status": 200,
"Message": "BookStore successfully created!",
  "data": {
    "id": 3,
    "ownerId": 1,
    "name": "New Bookstore",
    "location": "New Location"
  }
}`

Response (Error: 400 Bad Request)

`{
"Message": "BookStore was not created!"
}`

Response (Error: 500 Internal Server Error)

`{
  "status": 500,
  "error": "Internal server error message"
}`


## Update Bookstore by ID
Endpoint: /api/bookstore/:id
Method: PUT

`{
  "ownerId": 1,
  "name": "Updated Bookstore",
  "location": "Updated Location"
}`

ownerId (number, required): The ID of the owner.
name (string, required): The updated name of the bookstore.
location (string, required): The updated location of the bookstore.
Response (Success: 200 OK)

`{
  "status": 200,
"Message": "BookStore successfully updated!",
  "data": {
    "id": 1,
    "ownerId": 1,
    "name": "Updated Bookstore",
    "location": "Updated Location"
  }
}`

Response (Error: 404 Not Found)

`{
"Message": "BookStore was not updated!"
}`

Response (Error: 500 Internal Server Error)

`{
  "message": "Something went wrong",
  "error": "Internal server error message"
}`

## Delete Bookstore by ID
Endpoint: `/api/bookstore/:id`
Method: DELETE

Request
No request body is required.

Response (Success: 200 OK)

`{
"message": "BookStore successfully deleted!"
}`

Response (Error: 404 Not Found)

`{
"Message": "BookStore was not deleted!"
}`

Response (Error: 500 Internal Server Error)

`{
  "message": "Something went wrong",
  "error": "Internal server error message"
}`



# Book Endpoints Documentation
# Introduction
This API provides endpoints to manage books. Authentication is required to access these endpoints using a JSON Web Token (JWT).

# Authentication
To access these endpoints, you need to include a valid JWT token in the request headers.

# Authentication
To access these endpoints, you need to include a valid JWT token in the request headers.
Header: `Authorization`
Value:  `Bearer YOUR_TOKEN`

## Get All Books
Endpoint: `/api/book`
Method: GET

Request
No request body is required.
Response (Success: 200 OK)

`[
  {
    "id": 1,
    "bookstoreId": 1,
    "authorId": 1,
    "title": "Book 1",
    "price": 19.99,
    "image": "book1.jpg"
  },
  {
    "id": 2,
    "bookstoreId": 2,
    "authorId": 2,
    "title": "Book 2",
    "price": 24.99,
    "image": "book2.jpg"
  }
]
`

Response (Error: 404 Not Found)

`{
  "status": 404,
"Message": "Books not found!"
}`

Response (Error: 500 Internal Server Error)

`{
  "status": 500,
  "error": "Internal server error message"
}`

## Get Book by ID
Endpoint: `/api/book/:id`
Method: GET

Request
No request body is required.

Response (Success: 200 OK)

`{
  "id": 1,
  "bookstoreId": 1,
  "authorId": 1,
  "title": "Book 1",
  "price": 19.99,
  "image": "book1.jpg"
}`

Response (Error: 404 Not Found)

`{
  "status": 404,
  "message": "Book not found"
}`

Response (Error: 500 Internal Server Error)

`{
  "status": 500,
  "message": "Internal server error message"
}`




## Create Book
Endpoint: /api/books
Method: POST

Request
`{
  "bookstoreId": 1,
  "authorId": 1,
  "title": "New Book",
  "price": 29.99,
  "image": "newbook.jpg"
}`

bookstoreId (number, required): The ID of the bookstore.
authorId (number, required): The ID of the author.
title (string, required): The title of the book.
price (number, required): The price of the book.
image (string): The image URL of the book.
Response (Success - 200 OK)

`{
  "message": "Book successfully created!",
  "newBook": {
    "id": 3,
    "bookstoreId": 1,
    "authorId": 1,
    "title": "New Book",
    "price": 29.99,
    "image": "newbook.jpg"
  }
}`

Response (Error: 400 Bad Request)

`{
  "message": "Book was not created!"
}`

Response (Error - 500 Internal Server Error)

`{
  "status": 500,
  "message": "Internal server error message"
}`

## Update Book
Endpoint: `/api/books/:id`
Method: PUT

Request
`{
  "bookstoreId": 1,
  "authorId": 2,
  "title": "Updated Book",
  "price": 39.99,
  "image": "updatedbook.jpg"
}`

bookstoreId (number, required): The updated ID of the bookstore.
authorId (number, required): The updated ID of the author.
title (string, required): The updated title of the book.
price (number, required): The updated price of the book.
image (string): The updated image URL of the book.

Response (Success: 200 OK)

`{
  "status": 200,
  "message": "Book successfully updated",
  "updateBook": {
    "id": 1,
    "bookstoreId": 1,
    "authorId": 2,
    "title": "Updated Book",
    "price": 39.99,
    "image": "updatedbook.jpg"
  }
}`

Response (Error: 404 Not Found)

`{
  "status": 404,
"Message": "Book was not updated!"
}`
Response (Error: 500 Internal Server Error)

`{
  "status": 500,
  "message": "Internal server error message"
}`

## Delete Book 
Endpoint: `/api/books/:id`
Method: DELETE

Request
No request body is required.

Response (Success: 200 OK)
`{
  "message": "Book successfully deleted"
}`

Response (Error: 404 Not Found)

`{
"Message": "Book was not deleted!"
}`

Response (Error: 500 Internal Server Error)

`{
  "message": "Internal server error message"
}`



# Author Endpoints Documentation

## Get All Authors
Endpoint: `/api/author`
Method: GET

Request
No request body is required.

Response (Success - 200 OK)

`[
  {
    "id": 1,
    "name": "Author 1"
  },
  {
    "id": 2,
    "name": "Author 2"
  }
]`

Response (Error - 404 Not Found)

`{
  "status": 404,
  "message": "Authors not found"
}`

Response (Error: 500 Internal Server Error)

`{
  "status": 500,
  "error": "Internal server error message"
}`


## Get Author by ID
Endpoint: /api/author/:id
Method: GET

Request
No request body is required.

Response (Success - 200 OK)

`{
  "id": 1,
  "name": "Author 1"
}`

Response (Error: 404 Not Found)

`{
  "status": 404,
  "message": "Author not found"
}`

Response (Error: 500 Internal Server Error)


`{
  "status": 500,
  "message": "Internal server error message"
}`

## Create Author
Endpoint: /api/author
Method: POST

Request

`{
  "name": "New Author"
}`

name (string, required): The name of the author.
Response (Success: 201 Created)

`{
  "status": 201,
  "message": "Author successfully created!",
  "data": {
    "id": 3,
    "name": "New Author"
  }
}`

Response (Error - 500 Internal Server Error)

`{
  "status": 500,
  "message": "Internal server error message"
}`

## Update Author by ID
Endpoint: /api/author/:id
Method: PUT

Request

`{
  "name": "Updated Author"
}`

name (string, required): The updated name of the author.
Response (Success - 200 OK)

`{
  "status": 200,
  "message": "Author successfully updated!",
  "data": {
    "id": 1,
    "name": "Updated Author"
  }
}`
Response (Error - 404 Not Found)

`{
  "status": 404,
  "message": "Author was not updated!"
}`

Response (Error - 500 Internal Server Error)

`{
  "status": 500,
  "message": "Internal server error message"
}
`

## Delete Author by ID
Endpoint: /api/author/:id
Method: DELETE

Request
No request body is required.

Response (Success - 200 OK)

`{
  "message": "Author successfully deleted"
}`

Response (Error - 404 Not Found)

`{
  "status": 404,
  "message": "Author was not deleted!"
}`

Response (Error: 500 Internal Server Error)

`{
  "status": 500,
  "message": "Internal server error message"
}`




