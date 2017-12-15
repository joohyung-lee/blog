var proxied_url;
if(process.env.NODE_ENV === "development"){
    var proxied_url='http://localhost:3000/';
}else{
    var proxied_url='http://108.61.180.96/';
}
module.exports={
    proxied_url:proxied_url
}