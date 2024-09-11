import express from 'express';
import dotenv from 'dotenv/config';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import bodyParser from 'body-parser';
import multer from 'multer';
import sql from 'mssql'
import User from '../src/models/user.js'
import System from '../src/models/System.js'

import authRoutes from './routes/authRoutes.js';
import systemRoutes from './routes/systemRoutes.js';

const { diskStorage } = multer;
const app = express(); 
dotenv;

app.use(cors({
  origin: '*',  // o especifica el dominio permitido
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
  credentials: true ,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-client-channel'],
  
}));

app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const port = process.env.PORT || 3000; 

const DOCUMENTS_PATH = './public/documents';

// console.log(clientRoutes);

app.use("/auth", authRoutes);
app.use("/system", systemRoutes);

app.listen(port, () => {
  // System.syncSystem()
  // System.newSystem({xnombre: 'Sis200', cusuarioencargado: 3, cusuario: 1})
  // System.newSystem({xnombre: 'Arys Auto', cusuarioencargado: 2, cusuario: 1})
  // System.newSystem({xnombre: 'ManMar', cusuarioencargado: 2, cusuario: 1})
  // User.syncUser()
  // User.newUser({xemail: 'admin@mail.com', xcontrasena: '1234', xnombre: 'Admin', xapellido: '', cusuario: 1})
  // User.newUser({xemail: 'gidler@lamundialdeseguros.com', xcontrasena: 'Gi4321!', xnombre: 'Graciela', xapellido: 'Idler', cusuario: 1})
  console.log(`Example app listening on port ${port}`)
})



// app.get('/', (req, res) => {
//   res.send('hello')
// })


