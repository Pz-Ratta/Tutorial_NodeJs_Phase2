const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    const name = "PPPPP";
    res.render('index.ejs',{data:name})
});

module.exports = router;