//jsonp跨域请求封装
 import originJSONP from 'jsonp'
 export default function jsonp(url,data,opt){
    console.log(url)
   url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
   console.log(url)
    return new Promise((success,failed)=>{
        originJSONP(url,opt,(err,data)=>{
             if(err){
                failed(err)
             }else{
                success(data)
             }
        })
    }) 
 }
 function param(data) {
   let url = ''
   for (var k in data) {
     let value = data[k] !== undefined ? data[k] : ''
     url += `&${k}=${encodeURIComponent(value)}`
   }
   // 删除第一个&
   return url ? url.substring(1) : ''
 }