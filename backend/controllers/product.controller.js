const Product = require('../models/product');
const fs = require('fs');

exports.createProduct = (req, res, next) => {
    const productToCreate = JSON.parse(req.body.thing);
    const url = req.protocol + '://' + req.get('host');
    const product = new Product({
        title: productToCreate.title,
        description: productToCreate.description,
        price: productToCreate.price,
        imageUrl: url + '/images/' + req.file.filename,
        userId: productToCreate.userId,
    });
    product.save().then(
        () => {
            res.status(201).json({
                message: 'Product created!'
            });
        }
    ).catch(err => {
        res.status(400).json({
            error: err
        });
    })
 };

 exports.getProduct = (req,res,next) => {
    Product.findOne({
        _id: req.params.id
    }).then(
        product => {
            res.status(200).json(product);
        }
    ).catch(
        err => {
            res.status(400).json({
                error: err
            });
        }
    );
};

exports.getProducts = (req, res, next) => {
    Product.find().then(
        products => {
          res.status(200).json(products);
        }
      ).catch(
          err => {
              res.status(400).json({
                  error: err
              });
          }
      );
  };

  exports.updateProduct = (req, res, next) => {
      let productToUpdate = new Product({ _id: req.params.id });
      if(req.file) {
        const product = JSON.parse(req.body.thing);
        const url = req.protocol + '://' + req.get('host');
        productToUpdate = {
            _id: req.params.id,
            title: product.title,
            description: product.description,
            price: product.price,
            imageUrl: url + '/images/' + req.file.filename,
            userId: product.userId,
        };
      } else {
          productToUpdate = {
              _id: req.params.id,
              title: req.body.title,
              description: req.body.description,
              price: req.body.price,
              imageUrl: req.body.imageUrl,
              userId: req.body.userId,
          };
      }
    Product.updateOne({ _id: req.params.id }, productToUpdate).then(
        () => {
            res.status(201).json({
                message: 'Product updated!'
            });
        }
    ).catch(err => {
        res.status(400).json({
            error: err
        });
    })
 };

 exports.deleteProduct = (req, res, next) => {
    Product.findOne({ _id: req.params.id }).then(
        product => {
            const filename = product.imageUrl.split('/images/')[1];
            fs.unlink(`images/${filename}`, () => {
                Product.deleteOne({ _id: req.params.id })
                .then(
                    () => res.status(200).json({
                        message: 'Product deleted'
                    })
                ).catch(
                    err => res.status(400).json(
                        { error: err }
                    )
                );
            });
        }
    );
};