const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Bakery API',
        description: 'Auto generated documentation for the Bakery API'
    },
    host: 'bakery-api-za4w.onrender.com',
    basePath: '/api-docs',
    schemes: ['https'],
};

const outputFile = './swagger.json';
const routes = ['./server.js'];

swaggerAutogen(outputFile, routes, doc);
