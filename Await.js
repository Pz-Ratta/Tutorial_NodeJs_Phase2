//Async $ await
const connect = true;
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
async function start() {
    await downloading(url1).then(result=>console.log(result)).catch(err=>console.log(err));
    await downloading(url2).then(result=>console.log(result)).catch(err=>console.log(err));
    await downloading(url3).then(result=>console.log(result)).catch(err=>console.log(err));
    await downloading(url4).then(result=>console.log(result)).catch(err=>console.log(err));
    await downloading(url5).then(result=>console.log(result)).catch(err=>console.log(err));
}

start();