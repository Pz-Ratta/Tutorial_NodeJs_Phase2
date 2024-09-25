const connect = false;
const url1 = "www.1.com";
const url2 = "www.2.com";
const url3 = "www.3.com";
const url4 = "www.4.com"
const url5 = "www.5.com";



function downloading(url){
    console.log("กำลังโหลด");
    return new Promise(function(resolve, reject){
        setTimeout(()=>{
            if(connect) {
                resolve(`โหลด ${url} เรียบร้อย`)
            } else {
                reject('เกิดข้อผิดพลาด');
    
            }
        },3000)
    })
}

downloading(url1)
.then(result=>{
    console.log(result);
    return downloading(url2);
})
.then(result=>{
    console.log(result);
    return downloading(url3);
})
.catch(err=>console.log(err))
.finally(()=>console.log("จบการทำงาน"));