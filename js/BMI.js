//dom
var but = document.getElementById('clickbox');
var list = document.querySelector('.count');
var button = document.querySelector('.box');
var listcolor = document.querySelector('.listcolor');
var data = JSON.parse(localStorage.getItem('BMIdata')) || [];

//監聽
but.addEventListener('click',butBMI)
list.addEventListener('click',BMIdelete)

//定義計算BMI函式
function butBMI(){
   var height = document.querySelector('.height').value;
   var weight = document.querySelector('.weight').value;
   var H = height/100*height/100
   var BMITotal = (weight/H).toFixed(2); // bim 計算總total
   var status = '';
   var leftcolor = '';
   if(height,weight === ''){
    alert('未填寫欄位')
    return;
   }else if(height === ''){
       alert('請填寫身高')
       return;
   }else if(weight === ''){
        alert('請填寫體重')
        return;
   }else if(BMITotal < 18.5){
    status = '過輕'
      leftcolor = 'Level1'
     button.setAttribute("class","blue")
  
   }else if(BMITotal >= 18.5 && BMITotal< 24){
    status = '理想'
   leftcolor = 'Level2'
    button.setAttribute('class',"green")
    
    }else if(BMITotal >= 24 && BMITotal < 27){
        status = '過重'
    leftcolor = 'Level3'
    button.setAttribute('class',"orange")

    }else if(BMITotal >= 27 && BMITotal < 30){
        status = '輕度肥胖'
   leftcolor = 'Level4'
    button.setAttribute('class',"orange2")

    }else if(BMITotal >= 30 && BMITotal < 35){
        status = '中度肥胖'
    leftcolor = 'Level5'
    button.setAttribute('class',"orange3")

    }else if(BMITotal >= 35){
        status = '重度肥胖'
    leftcolor = 'Level6'
    button.setAttribute('class',"red")
}
//按鈕改狀態
document.querySelector('.value').textContent = BMITotal;
document.querySelector('.bmi').textContent = 'BMI'; 

//日期
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1; //January is 0
var yyyy = today.getFullYear();
var time = yyyy + '-' + mm + '-' + dd;



//localstorage 處理
var datalist = {
    stat : status,
    BMI: BMITotal,
    weight : weight,
    height : height,
    leftcolor:leftcolor,
    time : time,
}

//物件存入array並存到localstorage
data.push(datalist);
localStorage.setItem('BMIdata',JSON.stringify(data));
uplist(data)
}

function uplist(items){
   var str = '';
 for (var i = 0; i < items.length ; i++){
str += '<li class="listcolor '+items[i].leftcolor+'"><em>'+items[i].stat+'</em><span>BMI:</span><em>'+items[i].BMI+'</em><span>wright:</span><em>'+items[i].weight+'kg'+'</em><span>height:</span><em>'+items[i].height+'cm'+'</em><span>'+items[i].time+'</span><a href="#" data-indnx = '+[i]+'>Delete</a></li>'
 }
 list.innerHTML = str;
}
//刪除功能
function BMIdelete(e){
    e.preventDefault();
   console.log(e.target.nodeName)
   if(e.target.nodeName !== "A"){return}
   var indnx = e.target.dataset.indnx;
    data.splice(indnx,1)
    localStorage.setItem('BMIdata',JSON.stringify(data));
    uplist(data)
}






