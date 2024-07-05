import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { ProductRoutes } from './app/modules/product/product.routes';
const app: Application = express();

//parsers
app.use(express.json());
app.use(cors());


//application routes
app.use('/api/products', ProductRoutes)


app.get('/', (req: Request, res: Response) => {
  const a = 10;
  
  res.send(a);
});

export default app;
