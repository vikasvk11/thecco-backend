const express = require('express');
const bodyParser = require('body-parser');
const products = require('./productRouter.js');
const cart = require('./cartRouter.js');
const wishlist = require('./wishlistRouter.js');
const {error404} = require('./error-handler');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect(`mongodb+srv://vkecomm:${process.env.MONGO_DB}@thecameracompanyvk.qkv6e.mongodb.net/inventory?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("mongoose success"))
.catch(err => console.error("mongoose failed", err))


myLogger = (req, res, next) => {
  console.log(req.method);
  console.log(req.params);
  next();
}

app.use(myLogger);

app.use('/products', products);

app.use('/cart', cart);

app.use('/wishlist', wishlist);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

/*
DO NOT MOVE, 
ERROR HANDLER SHOULD BE THE LAST ROUTE
*/

app.use(error404)

app.listen(PORT, () => {
  console.log('server started');
});

