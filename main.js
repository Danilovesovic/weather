
let btn = document.querySelector('button');
let input = document.querySelector('input');
let display = document.querySelector('#display');
let homeBtn = document.querySelector('#home');

btn.addEventListener('click',search);
homeBtn.addEventListener('click',setHome);

window.addEventListener('load',displayHome);

function displayHome() {
  if (localStorage.home) {
    input.value = localStorage.home;
    let xml = new XMLHttpRequest();
    xml.open('get','http://api.openweathermap.org/data/2.5/weather?q='+localStorage.home+'&APPID=9c8045c83ec8c5a9f5e87b09be0b33bf')
    xml.onreadystatechange = function () {
      if (xml.readyState == 4 && xml.status == 200) {
      displayData(JSON.parse(xml.responseText))
      }
    }
    xml.send();
  }
}

function search() {
  let val = input.value;

  let xml = new XMLHttpRequest();

  xml.open('get','http://api.openweathermap.org/data/2.5/weather?q='+val+'&APPID=9c8045c83ec8c5a9f5e87b09be0b33bf')
  xml.onreadystatechange = function () {
    if (xml.readyState == 4 && xml.status == 200) {
    displayData(JSON.parse(xml.responseText))
    }
  }
  xml.send();
}

function displayData(data) {
  console.log(data);
  let text = '';
  text += "<h3> Temp : "+data.main.temp+"</h3>";
  text += "<h3> Country : "+data.sys.country+"</h3>";
  text += "<h3> Description : "+data.weather[0].description+"</h3>";

  display.innerHTML = text;
}

function setHome() {
  let val = input.value;
  localStorage.home = val;
}
