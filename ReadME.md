Group 3 

Reg Numbers:  22247/2023
              22773/2023



API Versioning: All routes are prefixed with /api/v1.

Technologies Used

Node.js & Express

MongoDB & Mongoose

JSON Web Token (JWT) for authentication

Bcryptjs for password encryption

Dotenv for environment variables




----------------------


Install dependencies

npm install





Run the Server

node server.js


API Endpoints

Auth

Method

Endpoint

Description

POST

/api/v1/auth/signup

Create a new user account

POST

/api/v1/auth/signin

Login and receive a JWT token

Entries (Requires Token)

All entry endpoints require Authorization: Bearer <token> header.

Method

Endpoint

Description

POST

/api/v1/entries

Create a new diary entry

GET

/api/v1/entries

Get all entries (Desc order)

GET

/api/v1/entries/:id

Get a specific entry

PATCH

/api/v1/entries/:id

Update an entry

DELETE

/api/v1/entries/:id

Delete an entry

