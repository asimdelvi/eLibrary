# eLibrary

## A book-sharing responsive web application
https://eliberary.netlify.app/

https://github.com/asimdelvi/eLibrary/assets/53201783/3ed4937a-0280-4f90-9a0b-25fb12f9e4a8

<img src="https://github.com/asimdelvi/eLibrary/assets/53201783/0da67e0d-1390-4bcf-aeea-fb66d29e14d9" width=500 height=320 />

## Tools and technologies used:
- Frontend: React, Redux, TailwindCSS, Toastify, ReactPDF, Axios
- Backend: Express, JOI, JWTWebTokens, Cloudinary, mongoose
- Database and others: MongoDB, Docker

## Installation and Setup
### Docker (super easy)
- Download or clone the repository
```
docker compose watch
```
or
### Manual
- Download or clone the project
- Copy .env files
  
  ```
  cp backend/.env.example backend/.env && cp frontend/.env.example frontend/.env.local
  ```
- Setup Mongodb
  - create Atlas Database, refer [this](https://dev.to/dalalrohit/how-to-connect-to-mongodb-atlas-using-node-js-k9i) to know more and add the connection string to backend/.env file
  - install mongodb locally, refer [this](https://www.mongodb.com/docs/manual/installation/) to know more and add the connection string to backend/.env file
- Install required npm packages
  - Backend
    
    ```
    npm run install-backend
    ```
  - Frontend
    
    ```
    npm run install-frontend
    ```
- Run
  - Backend
    
    ```
    npm run start-backend
    ```
  - Frontend
    
    ```
    npm run start-frontend
    ```
