const productModel = require("./models/product.model.js");

exports.createProduct = async (req, res, next) => {
  try {
    const createdProduct = await productModel.create(req.body);
    console.log(createdProduct);
    res.status(201).json(createdProduct);
  } catch (error) {
    next(error);
  }
};
