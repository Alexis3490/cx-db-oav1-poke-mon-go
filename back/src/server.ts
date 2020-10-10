import express from 'express';
import cors from 'cors';
import { error, info, success } from './helpers/display'
import checkEnv from './helpers/checkEnv'
import { connect } from './database';
import Pokemon from "./database/schemas/pokemon";
import fs from "fs";
import route from './routes/api'

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.use(express.urlencoded());

app.use('/', route)

app.listen(PORT, async function() {
  console.log(`Listening on ${PORT}`);
  checkEnv(['PORT', 'HOST', 'DATABASE_URI'])
  info('Server initialization...')
  await connect(process.env.DATABASE_URI as string).then(async () => {
    console.log('MongoDb connected');
  });
});
