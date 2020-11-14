const form = document.querySelector(".js-form"),//html 에서 불러오는 구문
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

function handleSubmit(event) {// 서브밋이라는 이벤트를 받아서 기본 이벤트 값을 없애줌(기본 submit 이벤트를 실행시키게 되면
// 페이지의 루트 권한으로 가서 외부에 데이터를 전송하려고 하기때문에 페이지가 리로드 됨. 이러한 이벤트를 막기위해 프리이벤트 디폴트를 해줌.)
  event.preventDefault();
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}

function askForName() {// 폼을 보이게 하고 값을 전달받기 위한 이벤트를 생성함
  form.classList.add(SHOWING_CN);
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  form.classList.remove(SHOWING_CN);//클래스를 추가해주고 제거해주는 부분;
  greeting.classList.add(SHOWING_CN);
  let hello = "";
  const date = new Date();
  const hours = date.getHours();
  if(hours >=6 && 11 > hours){
    hello = "Good morning"
  }
  else if(hours <= 11 && hours < 17){
    hello = "Good afternoon"
  }
  else{
    hello = "Good evening"
  }// 시간대 별로 다른 인사말을 하도록 조건문을 통해 생성
  greeting.innerText = `${hello}, ${text}.`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);// currentUser 를 조회하고 값이 null 즉, 비어있다면 아래 함수를 작동시킴 else paintgreeting함수를 실행시키고 인자를 전달함
  if (currentUser === null) {
    askForName();
  } else {
    paintGreeting(currentUser);
  }
}

function init() {//loadname이라는 함수를 호출
  loadName();
}

init();
