### Title: Blog-project

### Overview
The goal of this assignment is to develop a backend for a blogging platform where users can write, update, and delete their blogs. The system will have two roles: Admin and User. The Admin has special permissions to manage users and their blogs, while users can perform CRUD operations on their own blogs. The backend will include secure authentication, role-based access control, and a public API for viewing blogs with search, sort, and filter functionalities.


### Deployment link :

- https://blog-project-cli-server.vercel.app/

### The working flow of my API end point is described below :

- https://blog-project-cli-server.vercel.app/api/auth/register  —> to create an user
- https://blog-project-cli-server.vercel.app/api/auth/login —> login user with the credentials

- https://blog-project-cli-server.vercel.app/api/blogs —> to create a Blog (POST) / to get all Blogs (GET)
- https://blog-project-cli-server.vercel.app/api/blogs/67416f3ef20e7e9d8b3510b3 —> to find specific blog for updating, deleting etc.
- https://blog-project-cli-server.vercel.app/api/admin/users/6765da0016b129ae7b83df59/block --> Block an user by admin
- https://blog-project-cli-server.vercel.app/api/admin/blogs/6765db6016b129ae7b83df69 --> delete

In this project I have used node package manager(npm) to install all kinds of required dependency. I have followed the modular pattern in my project building.

### To run this project locally, what you need to install?

- NODE.JS
- TYPESCRIPT
- EXPRESS.JS
- MONGOOSE
- MONGODB ATLAS / COMPASS

For the better code writing and avoiding unnecessary error I have installed —

- TYPESCRIPT ESLINT AND PRETTIER

## The way I have started my project is described bellow—

# init package.json file

- npm init -y

### Install express, mongoose, typescript [as dev dependency], cors, dotenv

- `npm install express`
- `npm install mongoose --save`
- **npm install typescript --save-dev**
- npm i cors
- npm i dotenv
- npm i bcrypt
- npm i -D @types/bcrypt
- npm i jsonwebtoken
- npm i -D @types/jsonwebtoken

# For typescript init a ts json file

- tsc -init [then in tsconfig.json file update the below lines]
- "rootDir": "./src",
- "outDir": "./dist",

# To run the ts file in js make a script in package.json file in script section

- "build": "tsc",

then run —→  

- npm run build [dist folder will be created and the js files will be available there]

## separate the listening port of mongoose connection in the server.ts file and setup config file for handling the .env file globally in an efficient way.

### Integrating eslint and prettier in the project

- https://blog.logrocket.com/linting-typescript-eslint-prettier/

### To run the ts file directly install the command but it is only for faster developing purpose.

- npm i ts-node-dev
- ts-node-dev --respawn --transpile-only src/server.ts  — to run the server file

### In the package.json file I have written some scripts to enhance the developing. Scripts are following

```
    "start:prod": "node ./dist/server.js",
    "start:dev": "ts-node-dev --respawn --transpile-only src/server.ts",
    "build": "tsc",
    "lint": "npx eslint src --ignore-pattern '.js,.ts'",
    "lint:fix": "npx eslint src --fix",
    "prettier": "prettier --ignore-path .gitignore --write \"./src/**/*.+(js|ts|json)\"",
    "prettier:fix": "npx prettier --write src",
```

Here, use the command **npm run start:dev**  and others necessary command when it is needed.  

- use start:dev to run the project in the production
- start:dev use for faster project run in the development
- build use for converting ts file into js
- lint, use to check the warnings / error
- lint:fix , use for auto fixing
- prettier, use for check and fix the extra gap.


### For the deployement I have created the vercel.json file. In this file, I have added the public credentials. I have deployed my server in vercel with vercel cli

### Types of Errors Handled

The following common errors will be managed with appropriate responses:

Zod Validation Error (ZOD_ERROR): Errors arising from invalid data inputs based on Zod schema validation.
Not Found Error (NOT_FOUND_ERROR): When requested resources (e.g., a user, item, or page) are not found.
Validation Error (VALIDATION_ERROR): General validation errors (e.g., incorrect data format, missing required fields).
Authentication Error (AUTH_ERROR): Issues related to failed authentication (e.g., invalid token or expired session).
Authorization Error (AUTHORIZATION_ERROR): When the user lacks the necessary permissions to access a resource.
Internal Server Error (INTERNAL_SERVER_ERROR): Unhandled errors or unexpected server issues.
