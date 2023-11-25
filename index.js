import express, { response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';
import { Book } from './models/bookModel.js';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow All Origins with Default of cors(*)
//app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To my MERN stack project');
});

app.post('/books',async(request,response) => {
  try{
    if(
      !request.body.title ||
    !request.body.author ||
    !request.body.publishYear
    ){
      return response.status(400).send({
        message: 'send all the requires fields:title,author,publisher',

      });
    }
    constnewBook={
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book= await Book.create(newBook);
    return response.status(201).send(book)
  } catch(error){
    console.log(error.message);
    response.status(500).send({message:eroor.message});

  }
});

app.get('/books',async(request,response) => {
  try{
    const books= await Book.find({});
    return response.status(200).json(books);

  } catch(error){
    console.log(error.message);
    response.status(500).send({message: error.message});

  }
});

//app.use('/books', booksRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
