import express from "express";
import connectDB from "./config/db.js";
import productRoutes from './routes/productRoutes.js'

const app = express();

app.use(express.json());
app.use('/api/products', productRoutes)
const port = process.env.PORT || 3333;
app.get("/", (req, res) => {
  res.json({ message: "hello home page" });
});
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log("Server is running on PORT " + port);
    });
  })
  .catch((err) => {
    console.error("Failed to start the server due to mongoDB error ", err);
  });
