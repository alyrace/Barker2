const express = require('express');
const config = require('config');
const cors = require('cors');
const morgan = require('morgan');
//const passport = require('passport');
//const passportlocal = require('passport-local').Strategy;
//const cookieParser = require('cookie-parser');
//const expresssSession = require('express-session');
const connectDB = require('./config/db');
const userRouter = require('./routes/users');
const searchRouter = require('./routes/search');
const projectRouter = require('./routes/projects');
const boardRouter = require('./routes/boards');
const cardRouter = require('./routes/cards');
const commentRouter = require('./routes/comments');
const fileRouter = require('./routes/files');
const errorHandler = require('./middleware/error');


const app = express();
//connect db
connectDB();

//cors
app.use(cors())
/*============================================
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(session({
  secret: congfig.get('sessSecret'),
  resave: true,
  saveUnitialized: true  
}))

app.use(cookieParser(config.get('cookieSecret')))

 
*/
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
app.use('/api/project', projectRouter);
app.use('/api/board', boardRouter);
app.use('/api/card', cardRouter);
app.use('/api/comment', commentRouter);
app.use('/api/files', fileRouter);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>{
    console.log(`Listening on port ${PORT} ...`)
});