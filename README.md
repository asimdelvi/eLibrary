# eLibrary

## A book sharing responsive web application
https://eliberary.netlify.app/

https://github.com/asimdelvi/eLibrary/assets/53201783/05a9abca-273f-4707-b4b3-f0e9ea6dbbf9

## Tools and technologies used:
- Frontend: React, Redux, TailwindCSS, Toastify, ReactPDF, Axios
- Backend: Express, JOI, JWTWebTokens, Cloudinary, mongoose
- Database and others: MongoDB, Docker

## Installation and Setup
### Docker (super easy)

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
