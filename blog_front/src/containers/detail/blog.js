let parallaxWrap=root.querySelector('.card-wrap');
let parallaxPosition=root.querySelectorAll('.card');
let dic=root.querySelectorAll('.dic');
let blog={
    parallax:(value)=>{
        
        if(parallaxPosition){
            if(dic){
                dic[0].style.height=`${parallaxPosition[0].clientHeight+50}px`
            }
            [].forEach.call(parallaxPosition, function(item,i) {
                if(value.scrollTop===0){
                    item.style.transform=`translateY(0px)`;
                    parallaxPosition[0].classList.remove('video');
                }else if(value.scrollTop < parallaxPosition[0].clientHeight+50){
                    parallaxPosition[0].classList.remove('video');
                   if(i===0){
                        item.style.transform=`translateY(${value.scrollTop}px)`
                   }else if(i===1){
                        item.style.transform=`translateY(0px)`
                   }else{
                        item.style.transform=`translateY(-${value.scrollTop*(i-1)}px)`
                   }
                    
               }else if(value.scrollTop > parallaxPosition[0].clientHeight+50){
                    parallaxPosition[0].classList.add('video');
                    parallaxPosition[0].style.transform=`translateY(${parallaxPosition[0].clientHeight+50}px)`;
               }
              });
        }
    }
}

module.exports = blog;