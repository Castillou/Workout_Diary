// Swan
/* login display 구현 */
// STEP 1 : login_form에 "submit" event 발생 => login_input 값 => welcome 텍스트로 저장
// STEP 2 : welcome, workout_add => hidden class 제거
// STEP 3 : login_form => hidden class 제거, workouts => height: 50vh

const loginForm = document.querySelector('.login_form');
const loginInput = document.querySelector('.login_form input');
const welcome = document.querySelector('.welcome');
const workouts = document.querySelector('.workouts');
const workoutAdd = document.querySelector('.workout_add');
const workoutForm = document.querySelector('.workout_form');

// .......................... step1
// loginForm에 submit이벤트 발생
function loginSubmit(e) {
    // 새로고침 이벤트 막기
    e.preventDefault();
    // loginForm에 hidden클래스 추가
    loginForm.classList.add('hidden');

    // 입력값 변수설정
    const username = loginInput.value;
    // 입력한 값을 localStorage에 저장
    localStorage.setItem('username', username);
    // 사용자정보에 맞게 welcome텍스트 보여주기
    loginWelcome(username);
}
// .welcome + 운동추가 버튼도 보여주기
function loginWelcome(username) {
    // welcome에 input.value값으로 텍스트변경
    welcome.innerText = `${username}님의 운동 일기`;
    // welcome에 .hidden제거
    welcome.classList.remove('hidden');
    // .workout_add 에 .hidden 제거
    workoutAdd.classList.remove('hidden');
}

// localStorage에 username이 있는지 확인 후 welcome 표시하기
const savedUsername = localStorage.getItem('username');

if (savedUsername === null) {
    loginForm.classList.remove('hidden');
    loginForm.addEventListener('submit', loginSubmit);
} else {
    loginWelcome(savedUsername);
}

// ................... step2
// 운동추가 버튼을 누르면
// .workout 에 높이값 주기css hieght 50vh)
// .workout_form .hidden클래스 제거하기
function clickedAddBtn() {
    workouts.style.height = '50vh';
    workoutForm.classList.remove('hidden');
}
workoutAdd.addEventListener('click', clickedAddBtn);
