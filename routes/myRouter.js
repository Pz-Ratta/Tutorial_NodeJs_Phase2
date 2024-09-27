const express = require('express');
const router = express.Router();
// เรียกใช้งาน Model
const Product = require('../model/products.js');

// เรียกใช้งาน Multer เพิ่ม Uploadfile
const multer = require('multer');
const { render } = require('ejs');
const storage = multer.diskStorage({
    destination:(req, file, callback)=>{
        callback(null, './public/images/products');
    },
    filename:(req, file, callback)=>{
        callback(null, Date.now()+".jpg")
    }
})

const upload = multer({
    storage:storage
})


router.get('/', async (req, res)=>{

    try {
        const products = await Product.find(); 

        res.render('index', { products: products }); 
    } catch (err) {
        console.error('Error fetching products:', err);
    }

});

router.get('/add-product', (req, res)=>{
    if(req.session.login){
        res.render('form');
    } else {
        res.render('admin');
    }

    res.render('admin')
})

router.get('/manage', async (req, res)=>{

    if(req.session.login){

        try{
            const products = await Product.find();
            res.render('manage', { products:products });

        } catch (err) {
            console.error('Error fetching products:', err);
        }

    } else {
        res.render('admin');
    }
    
})

router.get('/logout', (req, res)=>{
    req.session.destroy((err)=>{
        res.redirect('/manage');
    });
})

router.post('/insert', upload.single("image"), async (req, res)=>{   

    let newProduct = {
        name: req.body.name,
        price: req.body.price,
        image: req.file.filename,
        description: req.body.description
    };  

    await Product.saveProduct(newProduct,(err)=>{ 
        if(err) console.log(err); 
        res.redirect('/');
    })
})

router.get('/delete/:id', async (req,res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id,{useFindAndModify:false});
        console.log( "ProductID: ", req.params.id ," is Deleted");
        res.redirect('/manage');
    } catch (err) {
        console.log( "ProductID: ", req.params.id ," is error to delete");
    }
})

router.get('/:id', async (req, res)=>{
    try {
        const product = await Product.findOne({_id:req.params.id});

        res.render('product', {product:product})

    } catch(err) {
        res.status(500);
    }
})

router.post('/edit', async (req, res)=>{

    try {
        const product = await Product.findOne({_id:req.body.edit_id});
        console.log(product);
        res.render('edit', {product:product})
    } catch {
        res.status(500);
    }
})

router.post('/update', async (req, res)=>{

    const update_id = req.body.update_id;
    try {
        let data = {
            name: req.body.name,
            price: req.body.price,
            description: req.body.description
        };  

        await Product.findByIdAndUpdate(update_id, data)
        res.redirect('/manage');

        // res.render('edit', {product:product})
    } catch {
        res.status(500);
    }
})

router.post('/login', async (req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const timeExpire = 30000;
    if(username === "admin" && password === "123") {
        //สร้าง Session
        req.session.username = username;
        req.session.password = password;
        req.session.login = true;
        req.session.cookie.maxAge = timeExpire
        res.redirect('/manage');




        // //สร้างคุกกี้
        // res.cookie('username', username, {maxAge:timeExpire});
        // res.cookie('password', password, {maxAge:timeExpire});
        // res.cookie('login', true, {maxAge:timeExpire});
        // res.redirect('/manage');
    } else {
        res.render('404');
    }
})




module.exports = router;