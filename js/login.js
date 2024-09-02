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
const imgBox = document.querySelector('.img_box');
const dotBox = document.querySelector('.dot_box');

const logoutBtn = document.querySelector('.logout_btn');

////////////////////////////////////////////////////////////
const savedUsername = localStorage.getItem('username');

// loginForm에 submit이벤트 발생
const loginSubmit = function (e) {
    e.preventDefault();

    // 로그인 정보 저장
    const username = loginInput.value;

    // 유저 존재 여부 확인
    if (username === null) return;
    else localStorage.setItem('username', username);

    loginWelcome(username);
};

// 초기화
const init = function () {
    // prettier-ignore
    [welcome, workouts, workoutAdd, workoutForm, logoutBtn, imgBox, dotBox].forEach((el) => {el.classList.add('hidden');});

    // 로컬 저장소 비우기
    window.localStorage.removeItem('username');

    // 로그인 화면 초기화
    loginForm.classList.remove('hidden');
    loginForm.reset();

    // 로그인 대기
    loginForm.addEventListener('submit', loginSubmit);
    if (savedUsername !== null) loginWelcome(savedUsername);
};

const showWorkoutForm = function () {
    workoutForm.classList.remove('hidden');
};

// 로그인 성공 시
function loginWelcome(username) {
    welcome.innerText = `${username}님의 운동 일기`;

    loginForm.classList.add('hidden');
    workoutForm.classList.add('hidden');
    [welcome, workouts, workoutAdd, logoutBtn, imgBox, dotBox].forEach((el) => {
        el.classList.remove('hidden');
    });

    // 운동 추가 버튼 구현
    workoutAdd.addEventListener('click', showWorkoutForm);
    logoutBtn.addEventListener('click', init);
}

init();
