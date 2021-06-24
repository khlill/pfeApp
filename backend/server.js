const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const cartRoutes = require("./routes/cart");

app.use(express.json());

require('dotenv').config({
  path: './config/index.env',
});
// MongoDB 
const connectDB = require('./config/db');
connectDB()

app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))
app.use(cors())


// routes
app.use('/api/user/', require('./routes/auth.route'));
app.use("/api/user/", require('./routes/admin/auth'));
app.use('/api/category/', require('./routes/category.route'));
app.use('/api/product/', require('./routes/product.route'));
app.use('/api/slider/', require('./routes/slider.route'));
app.use('/api/nouveaute/', require('./routes/nouveaute.route'));
app.use('/api/cadeau/', require('./routes/cadeau.route'));
app.use('/api/id/', require('./routes/id.route'));
app.use("/cart", cartRoutes);


app.get('/', (req, res) => {
  res.send('test route => home page');
});
// Page Not founded
app.use((req, res) => {
    res.status(404).json({
        msg: 'Page not founded'
    })
})

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`)
})