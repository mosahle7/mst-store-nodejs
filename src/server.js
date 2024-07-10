const http = require('http');
const app = require('./app');

const {mongoConnect} = require('./services/mongo');
const { loadProductsData } = require('./models/products.model');
const { loadCategoriesData } = require('./models/categories.model');

const PORT = process.env.PORT || 8000

const server = http.createServer(app);

async function startServer(){
    await mongoConnect();
    await loadProductsData();
    await loadCategoriesData();

}
server.listen(PORT, () => {
    console.log('Listening on: ',PORT)
})

startServer(); 