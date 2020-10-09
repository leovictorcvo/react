require('dotenv').config();

const db = require('./db');
const app = require('./app')(db);
const auth = require('./auth');
const port = process.env.PORT || 3000;

auth(db);

app.listen(port, err => {
    if (err) {
        console.error(err);
    }
    console.log(`DevShop is running on port ${port}` );
});
