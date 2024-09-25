const { log } = require('console');
const fs = require('fs');


//Blocking or Synchronous
// const data = fs.readFileSync('./myfile/input.text', 'utf-8');
// console.log(data); 
// const outputText = `Hello node\n${data}\nไฟล์ถูกเขียนเมื่อ ${new Date()}`
// fs.writeFileSync("./myfile/output.text", outputText);
// console.log("เขียนไฟล์")

//Non-Blocking or Asynchronous

fs.readFile('./myfile/input.text', 'utf-8', (err, data)=>{
    if(err) return console.log("Error: ", err);
    const outputText = `Hello node\n${data}\nเขียนเมื่อ: ${new Date}`
    fs.writeFile("./myfile/output.text", outputText, err=>{
        if(err) return console.log("Error: ", err)
        console.log("เขียนไฟล์เรียบร้อย");
    })
})

