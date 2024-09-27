const mongoose = require('mongoose');

// เชื่อม MongoDB
const dbUrl = 'mongodb://localhost:27017/productDB';
async function connectDB() {
    try {
        await mongoose.connect(dbUrl); // ไม่ต้องใช้ useNewUrlParser และ useUnifiedTopology อีกต่อไป
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
    }
}
connectDB();

// ออกแบบ Schema
let productSchema = mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    description: String
});

// สร้าง Model
let Product = mongoose.model('Product', productSchema); // ชื่อ Model ควรเป็น singular และขึ้นต้นด้วยตัวใหญ่

// ส่งออก Model
module.exports = Product;

// ฟังก์ชันบันทึกข้อมูล
module.exports.saveProduct = async (data, callback) => {
    try {
        let product = new Product(data); // สร้างอินสแตนซ์ใหม่ของ Product model
        await product.save(); // รอให้บันทึกข้อมูลเสร็จ
        console.log('Product saved successfully');
    } catch (err) {
        console.error('Error saving product', err);
    } finally {
        callback();
    }
};






// // ใช้งาน Mongoose
// const mongoose = require('mongoose');

// // เชื่อม MongoDB'
// const dbUrl = 'mongodb://localhost:27017/productDB';
// mongoose.connect(dbUrl, {
//     useNewUrlParser:true,
//     useUnifiedTopology:true
// }).catch(err=>console.log(err))

// //ออกแบบ Schema
// let productSchema = mongoose.Schema({
//     name:String,
//     price:Number,
//     image:String,
//     description:String
// });

// // สร้าง Model
// let Product = mongoose.model("products", productSchema);

// // ส่งออก Model
// module.exports = Product;

// //fucntion

// module.exports.saveProduct=(model, data)=>{
//     model.save(data);
// }