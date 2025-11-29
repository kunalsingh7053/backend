const productModel = require('../models/product.model');



async function createProduct(req,res){
    const {image,title,description,price:{amount,currency},category} = req.body;

    try {
        const product = await productModel.create({
            image,
            title,
            description,
            price:{amount,currency},
            category

        })
        return res.status(201).json({message:"Product created successfully", product})
    } catch (error) {
        return res.status(500).json({message:"Internal server error", error:error.message})
    }
}

async function getAllProducts(req,res){

try {
    const products = await productModel.find({});
    console.log("Products fetched:", products);
    return res.status(200).json({products});
} catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({message:"Internal server error", error:error.message})
}

}

module.exports = {createProduct,
    getAllProducts
};