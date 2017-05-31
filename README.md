# XY-Inc Backend as a Service

A simple and useful backend application maded by nodejs, restify and mongodb to provide ready to use endpoints with CRUD operations.

## Prerequisities

1 - NodeJS: sudo apt-get install nodejs
2 - npm: sudo apt-get install npm
3 - MongoDB (you can choose to run it localy on your host or use our docker-compose yaml file)
3.1 - Docker
3.2 - Docker Compose

## Running the Backend app

### `Running the MongoDB with Docker Compose`

```
docker-compose up -d
```

### `npm install`

Will install all dependencies needed by this application.<br>

### `npm start`

Runs the backend app in the development mode.<br>
Check if everything is ok with this url: [http://localhost:3000/endpoints](http://localhost:3000/endpoints).

## Running the tests

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run coverage`

Launches Instambul to check test coverage of the app.

## Authors

* **Vinicius Piedade de Souza**

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
