// 列印
document.querySelector('.copy_a').onclick = function(e) {
    e.preventDefault();
    window.print();
};
//顯示時間
let today = new Date();
let yy = today.getFullYear();
let mm = today.getMonth() + 1;
let dd = today.getDate();
let hh = today.getHours();
let mi = today.getMinutes();
let List_day = yy + '年' + mm + '月' + dd + '日';
let List_Time = hh + '點' + mi + '分';
document.querySelector('.y_m_d').textContent = List_day;
document.querySelector('.time').textContent = List_Time;


let List = document.querySelector('.List');
let but = document.querySelector('.But');
let enter = document.querySelector('.Text')
let data = JSON.parse(localStorage.getItem('ListData')) || [];
uplist(data);



but.addEventListener('click', AddBut);
enter.addEventListener('keydown', Enter, false);
List.addEventListener('click', Delete_List); //刪除用

function AddBut(e) {
    console.log(e.type);
    let get_text = document.querySelector('.Text').value;
    let set_data = { content: get_text };
    data.push(set_data); //將set_data push到data
    document.querySelector('.Text').value = "";
    localStorage.setItem('ListData', JSON.stringify(data)) //set的值轉字串
    uplist(data);
}

function Enter(e) {
    if (e.keyCode == 13) {
        let get_text = document.querySelector('.Text').value;
        let set_data = { content: get_text };
        data.push(set_data); //將set_data push到data
        document.querySelector('.Text').value = "";
    }
    localStorage.setItem('ListData', JSON.stringify(data)) //set的值轉字串
    uplist(data);

}

function uplist(data) {
    let str = "";
    let len = data.length
    for (let i = 0; len > i; i++) {
        str += `<li class='fas fa-feather-alt'>${data[i].content}<a href="#" class='fas fa-trash-alt' data-index='${i}'></a></li>`
    }
    List.innerHTML = str;
}

function Delete_List(e) {
    e.preventDefault();
    if (e.target.nodeName !== 'A') { return };
    let index = e.target.dataset.index;
    data.splice(index, 1);
    localStorage.setItem('ListData', JSON.stringify(data));
    uplist(data);
}