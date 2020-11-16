const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes')


const db = require('./database/connect');
const port = process.env.PORT || 5000;

const app = express();

// Middleware
app.use(morgan('combine'))
app.use(bodyParser.json());
app.use(cors());
//connect to db
db.connect();


routes(app);

app.get('/', (req, res) => {
    res.send('hello');
})



app.listen(port, () => console.log(`Server started on port ${port}`));