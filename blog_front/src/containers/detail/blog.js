let parallaxWrap=root.querySelector('.card-wrap');
let parallaxPosition=root.querySelectorAll('.card');
let dic=root.querySelectorAll('.dic');
let blog={
    parallax:(value)=>{
        // if(parallaxPosition){
        //     [].forEach.call(parallaxPosition, function(item,i) {
        //        if(value.scrollTop < dic[0].offsetTop){
        //            if(i===0){
        //                 item.style.transform=`translateY(${value.scrollTop}px)`
        //            }else{
        //             item.style.transform=`translateY(-${value.scrollTop*i-1}px)`
        //            }
                    
        //        }else{
        //             parallaxPosition[0].classList.add('video');
        //        }
        //       });
        // }
    }
}

module.exports = blog;