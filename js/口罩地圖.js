//伸縮欄
$(document).ready(function() {
    $('.collapse').click(function() {
        $('.wrap').toggleClass('open');
    })
});

//載入時間

function DateTime() {
    let deta = new Date();
    let day = deta.getDay();
    let y = deta.getFullYear();
    let m = deta.getMonth() + 1;
    let d = deta.getDate();
    let YeMoDay = y + '-' + m + '-' + d;
    let ChangeWeek = DateWeek(day)
    let ChangeID = IdNum(day)
    document.querySelector('.Dayweek').textContent = ChangeWeek;
    document.querySelector('.YeMoDay').textContent = YeMoDay;
    document.querySelector('.id em').textContent = ChangeID;
}

function DateWeek(day) {
    switch (day) {
        case day = 1:
            return '星期一';
            break;
        case day = 2:
            return '星期二';
            break;
        case day = 3:
            return '星期三';
            break;
        case day = 4:
            return '星期四';
            break;
        case day = 5:
            return '星期五';
            break;
        case day = 6:
            return '星期六';
        default:
            return '星期日';
    };
};

function IdNum(day) {
    if (day == 1 || day == 3 || day == 5) {
        return "身分證末碼為1,3,5,7,9可購買";
    } else if (day == 2 || day == 4) {
        return "身分證末碼為2,4,6,8,0可購買"
    } else {
        return "假日無限制皆可購買";
    }
}
DateTime();

//API
let data; //讀存用
let SearchTown;
let SearchName;
let SearchAddress;

let xhr = new XMLHttpRequest();
xhr.open('get',
    'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json');
xhr.send();

xhr.onload = function() {
    data = JSON.parse(xhr.responseText).features;
    console.log(data)
    initMap();
}

let searchMap = document.querySelector('.List_Show');
let but = document.querySelector('.img_search');
let searc = document.querySelector('.search');

but.addEventListener('click', SearchClick, false);
searc.addEventListener('keydown', SearchClick, false);



function SearchClick(e) {
    let searchText = searc.value.trim();
    searchText = searchText.replace('台', '臺');
    let str = "";
    let List = document.querySelector('.List_Show'); //顯示列表
    if (e.keyCode == 13 || e.type == 'click') {
        document.querySelector('.search').value = "";
    }
    if (e.type === 'keydown' && e.keyCode !== 13) {
        return;
    }
    if (searchText == "") {
        return;
    }
    for (let i = 0; i < data.length; i++) {
        console.log(data.length)
        SearchTown = data[i].properties.town;
        SearchName = data[i].properties.name;
        SearchAddress = data[i].properties.address;
        up_item = data[i].properties.updated;
        document.querySelector('.Up_time').textContent = up_item;

        if (SearchAddress.includes(searchText) || SearchName.includes(searchText) || SearchTown.includes(searchText)) {
            str += `
            <li>
            <img src="https://i.imgur.com/b3FUzeD.png" title='前往地圖' class="LandmarkLink"data-locate='${[data[i].geometry.coordinates[0],data[i].geometry.coordinates[1]]}'data-mapname='${data[i].properties.name}'alt="icon">
                       <h1 class="pharmacy">${data[i].properties.name}</h1> 
                       <p class="address">${data[i].properties.address}</p>
                       <p class="phone">${data[i].properties.phone}</p>
                       <div class="Business_Time">
                       <br>${data[i].properties.note}</div>
                       <span class="adult">成人口罩:<em class="Big_Mack">${data[i].properties.mask_adult}</em></span>
                       <span class="chid">兒童口罩:<em class="Small_Mack">${data[i].properties.mask_child}</em></span>                            
                </li>`
        }
    };
    List.innerHTML = str;

    //點擊飛過去
    searchMap.addEventListener('click', GoMap);

    function GoMap(e) {
        e.preventDefault();
        console.log(e.target.dataset.locate)
        let tempdata = e.target.dataset.locate;
        let MapName = e.target.dataset.mapname;
        console.log(tempdata)
            //切字串座標
        let tem = tempdata.split(',');
        let latdata = parseFloat(tem[0]);
        let logdata = parseFloat(tem[1]);
        let location = [logdata, latdata]
        map.setView(location, 18);
        let clinicIcon = new L.Icon({
            iconUrl: 'https://i.imgur.com/atBDAwN.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [50, 60],
            iconAnchor: [12, 41],
            popupAnchor: [13, -40],
            shadowSize: [80, 60]

        });
        L.marker(location, { icon: clinicIcon });
    }
};
//載入OSM
const map = L.map('map').setView([23.8440223, 120.7654909], 8);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map).openPopup();

function initMap() {

    // markers樣式
    let clinicIcon = new L.Icon({
        iconUrl: 'https://i.imgur.com/Dg9c9oU.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [50, 60],
        iconAnchor: [12, 41],
        popupAnchor: [13, -40],
        shadowSize: [80, 60],
    });
    let soldout = new L.Icon({
        iconUrl: 'https://i.imgur.com/PDP9Zxg.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [50, 60],
        iconAnchor: [12, 41],
        popupAnchor: [13, -40],
        shadowSize: [80, 60],
    });

    //新增圖層,解決效能問題
    let markers = new L.MarkerClusterGroup().addTo(map);;
    console.log(data.length)
        //找JSON裡的座標
    for (let i = 0; data.length > i; i++) {
        let MaskChildNum = data[i].properties.mask_child;
        let MaskAdultNum = data[i].properties.mask_adult;

        if (MaskChildNum == 0 && MaskAdultNum == 0) {
            markers.addLayer(L.marker([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]], { icon: soldout })
                .bindPopup(
                    `<h1>${data[i].properties.name}</h1>
             <h2>電話:${data[i].properties.phone}</h2>
             <em>地址:<a href="https://www.google.com.tw/maps/place/${data[i].properties.address}" title='連結到Google地圖' target="_blank">${data[i].properties.address}</a></em>
             <div class="out_of_stock"><img src="https://i.imgur.com/Xs1JOjs.png"alt=""><p>此間藥局已無口罩!!!!</p></div>
            `)
                //.openPopup(`<h1>${data[i].properties.name}</h1>`)
            );
        } else if (MaskChildNum == MaskChildNum || MaskAdultNum == MaskAdultNum)
            markers.addLayer(L.marker([data[i].geometry.coordinates[1], data[i].geometry.coordinates[0]], { icon: clinicIcon })
                .bindPopup(
                    `<h1>${data[i].properties.name}</h1>
             <h2>電話:${data[i].properties.phone}</h2>
             <em>地址:<a href="https://www.google.com.tw/maps/place/${data[i].properties.address}" title='連結到Google地圖' target="_blank">${data[i].properties.address}</a></em>
             <h4>營業時間:${data[i].properties.note}</h4>
             <div>大人口罩數量:</div><h3>${data[i].properties.mask_adult}</h3>
             <div>小孩口罩數量:</div><h3>${data[i].properties.mask_child}</h3>
            `)
                //.openPopup(`<h1>${data[i].properties.name}</h1>`)
            );
    }
    map.addLayer(markers);

}