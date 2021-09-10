const express = require('express');
const config = require('config');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./config/db');
const userRouter = require('./routes/users');
const searchRouter = require('./routes/search');
const errorHandler = require('./middleware/error');

const app = express();
//connect db
connectDB();

//cors
app.use(cors())

//init middleware
//allows to get data from req.body
app.use(express.json({extended:false}));

//logging middleware
if (config.get('nodeENV') == "development") {
  app.use(morgan("dev"));
}
//routes
app.use('/api/users', userRouter);
app.use('/api/search', searchRouter);


app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT} ...`)
});