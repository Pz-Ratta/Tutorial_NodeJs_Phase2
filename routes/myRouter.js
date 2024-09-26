const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    const products = [
        {name:"โน๊ตบุ๊ค", price: 22000, image:"images/products/product1.png"},
        {name:"เสื้อ", price: 2000, image:"images/products/product2.png"},
        {name:"หูฟัง", price: 200, image:"images/products/product3.png"}

    ]
    res.render('index', {products:products});
});

router.get('/addForm', (req, res)=>{
    res.render('form');
})

router.get('/manage', (req, res)=>{
    res.render('manage');
})

router.post('/insert', (req, res)=>{
    console.log(req.body);
    res.render('form');

})

module.exports = router;