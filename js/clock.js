/*
code를 보다 읽기 쉽게 함수별로 하는 일을 나누어 둠.
위에 변수를 선언하고 html class 와 h1 을 가져옴
함수에서 date 라이브러리를 통해 시간과 날짜를 가져옴 
setInterval 함수는 특정 시간마다 함수를 리로드 해주는 역할을 함.
*/
const clockContainer = document.querySelector(".js-clock"),//html 에 접근 -> js-clock 클래스에 접근 아래도 같음. 
  clockTitle = clockContainer.querySelector("h1");

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}`;// 시간을 04:21:05초 이런식으로 보여주기 위해 삼항연산자를 사용함
  //삼항 연산자란 앞에 두값을 비교한후 맞으면 : 앞에 값을 틀리면 뒤의 값을 넣어주는 식임;
}

function init() {
  setInterval(getTime, 100);//뒤에 인자는 리로드 시간 1은 1ms를 뜻함 fuction init는 기본 함수로 정의함;
}

init();
