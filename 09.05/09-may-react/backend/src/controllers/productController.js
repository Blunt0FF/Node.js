import Product from "../models/Product.js";

export const addProductItem = async (req,res) => {
    try{
const {name,quantity,price} = req.body
if(!name || !price){
    res.status(400).json({error: 'error required data'})
}
const newProduct = new Product({name,quantity,price})
await newProduct.save()
res.status(201).json({message: 'product was created'})
    }catch(error){
        console.error(error);
        res.status(500).json({error : error.message})
    }
}
export const getAllProduct = async (req, res) => {
    try {
      const products = await Product.find({});
      if (!products)
        return res.status(404).json({ message: "Products is not found" });
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const updateProductById = async (req,res) => {
    try{
      const {id} =req.params
      const {name, quantity, price} = req.body
      const updateProduct = await Product.findByIdAndUpdate( id,{name,quantity,price}, {new:true})
      if(!updateProduct){
        res.status(404).json({message: 'product not found'})
      }
      res.status(200).json({message:'product updeted', updateProduct})

    }catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }

  export const deleteProduct = async (req,res)=>{
    try{
      const {id} = req.params
      const productDeleted = await Product.findByIdAndDelete(id)
      if(!productDeleted){
        res.status(404).json({message: 'product not found'})
      }
      res.status.json({message:'prouct deleted successfully'})
    }catch (error) {
      res.status(500).json({ message: error.message });
    }
  }