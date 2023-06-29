const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/');
};
exports.getEditProduct=(req,res,next)=>{
  const editmode=req.query.edit;
  if(!editmode)
  {
    return res.redirect('/');
  }
  const prodId=req.params.productId;
  Product.findByid(prodId,product=>{
    if(!product)
    {
      return res.redirect('/');
    }
    res.render('admin/edit-product',{
      pageTitle:'Edit Product',
      path:'/admin/edit-product',
      editing:editmode,
      product:product
    })
  

  })
  
}

exports.postEditProduct=(req,res,next)=>
{
  const prodId=req.body.productId;
  const updatedTitle=req.body.title;
  const updatedimageUrl=req.body.imageUrl;
  const updatedprice=req.body.price;
  const updateddescription=req.body.description;
  const updatedproduct=new Product(prodId,updatedTitle,updatedimageUrl,updateddescription,updatedprice);
  updatedproduct.save();
  //res.redirect('/');
}

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};

exports.postDeleteProduct=(req,res,next)=>{
const prodId=req.body.productId;
Product.deleteById(prodId);
res.redirect('/admin/products');
};
