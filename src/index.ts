import express from 'express'
import fileupload from 'express-fileupload'
import authRouter from './routes/auth'
import dishRouter from './routes/dish'
import categoryRouter from './routes/category'
import portionRouter from './routes/portion'

const app = express();

app.use(fileupload());
app.use(express.urlencoded({extended: true}))
app.use(authRouter);
app.use(dishRouter);
app.use(categoryRouter);
app.use(portionRouter);

app.listen(3030, () => {
    console.log('server started at http://localhost:3030')
});