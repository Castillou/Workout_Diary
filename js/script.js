const iconBox = document.querySelector('.icon_box');
const introBtn = document.querySelector('.intro_button');

const login = document.querySelector('.login');
const loginForm = document.querySelector('.login_form');
const loginInput = document.querySelector('.login_input');
const loginClose = document.querySelector('.login-close-button');

const wrap = document.querySelector('#wrap');
const logo = document.querySelector('.logo');
const mainBox = document.querySelector('.main_box');
const welcome = document.querySelector('.welcome');
const workouts = document.querySelector('.workouts');
const workoutAdd = document.querySelector('.workout_add');
const workoutForm = document.querySelector('.workout_form');

const imgBox = document.querySelector('.img_box');
const bottomImg = document.querySelector('.bottom_img');
const workoutImg = document.querySelector('.workout_img');
const btnBox = document.querySelector('.btn_box');
const btnBox2 = document.querySelector('.btn_box2');
const logoutBtn = document.querySelector('.logout_btn');
const clock = document.querySelector('.clock');

const workoutTypeInput = document.querySelector('.workout_form_input-type');
const machineInput = document.querySelector('.workout_form_input-machine');
const weightInput = document.querySelector('.workout_form_input-weight');
const repsInput = document.querySelector('.workout_form_input-reps');
const setsInput = document.querySelector('.workout_form_input-sets');

class Workout {
    constructor(workoutType, machine, weight, reps, sets) {
        this.workoutType = workoutType;
        this.machine = machine;
        this.weight = weight;
        this.reps = reps;
        this.sets = sets;
    }
}

class App {
    // 프라이빗 필드
    #username;
    #workouts = [];

    // constructor => 초기화 작업 수행
    constructor() {
        this._randomImageLoad();
        this._getUsernameLocalStorage();
        setInterval(this._getClock, 1000);

        loginForm.addEventListener('submit', this._loginSubmit.bind(this));
        workoutForm.addEventListener('submit', this._newWorkout.bind(this));
        workoutAdd.addEventListener('click', this._showWorkoutForm.bind(this));
        logoutBtn.addEventListener('click', this._init.bind(this));

        [introBtn, loginClose].forEach((el) => {
            el.addEventListener('click', this._loginShowClose);
        });
    }

    // 초기화작업
    _init() {
        // 모든 요소를 숨김
        [logo, mainBox, workouts, btnBox, btnBox2, imgBox, bottomImg, clock, wrap].forEach((el) => {
            el.classList.add('hidden');
        });

        // 로컬스토리지에서 사용자 이름만 삭제
        if (this.#username) {
            localStorage.removeItem('username');
        }

        // 운동 리스트 초기화
        this.#workouts = []; // #workouts 배열 초기화
        const [form, ...workoutsEl] = Array.from(workouts.children);
        workoutsEl.forEach((el) => el.remove());

        // 로그인 폼을 보이게 함
        login.classList.remove('hidden');
    }

    _loginShowClose() {
        login.classList.toggle('hidden');
        iconBox.classList.toggle('hidden');
        if (login.classList.contains('hidden')) iconBox.classList.remove('hidden');
    }

    // 로그인폼 제출 처리
    _loginSubmit(e) {
        e.preventDefault();

        this.#username = loginInput.value.trim(); // trim(): 공백제거

        if (!this.#username) return;

        this._setLocalStorage('username');
        loginForm.reset();
        this._loginEvent(this.#username);
    }

    // 로그인 후 화면 업데이트
    _loginEvent(username) {
        welcome.innerText = `${username}님의 운동 일기🔥`;

        login.classList.add('hidden');

        [wrap, logo, mainBox, workouts, btnBox, btnBox2, imgBox, bottomImg, clock].forEach((el) => {
            el.classList.remove('hidden');
        });

        // 로그인 시 화면의 운동 데이터를 삭제, 새 사용자 데이터 불러오기
        this.#workouts = []; // 이전 사용자 데이터 초기화
        const [form, ...workoutsEl] = Array.from(workouts.children);
        workoutsEl.forEach((el) => el.remove());

        this._getWorkoutLocalStorage(); // 로그인 시 운동 데이터를 불러오는 부분 추가
    }

    // 랜덤 이미지 로드 -> 로그인 한 사람의 이미지 표시
    _randomImageLoad() {
        const num = Math.floor(Math.random() * 3) + 1;
        workoutImg.src = `img/workout_img_0${num}.jpg`;
    }

    // 운동 추가 폼을 표시
    _showWorkoutForm() {
        workoutForm.classList.remove('hidden');
    }

    // 운동 추가 폼을 숨김
    _hideWorkoutForm() {
        workoutForm.reset();
        workoutForm.classList.add('hidden');
    }

    // 새 운동데이터를 추가하고 화면에 랜더링
    _newWorkout(e) {
        // 입력값 가져오기(유한한 숫자,양수)
        const validInputs = (...inputs) => inputs.every((inp) => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

        e.preventDefault();

        const type = workoutTypeInput.value;
        const machine = machineInput.value;
        // +연산자 = 숫자로 변환
        const weight = +weightInput.value;
        const reps = +repsInput.value;
        const sets = +setsInput.value;

        // 입력값의 유효성 검사 -> 아닐경우 alert반환
        if (!validInputs(weight, reps, sets) || !allPositive(weight, reps, sets))
            return alert('Inputs have to be positive numbers');

        // 새로운 운동객체 생성, #workouts배열에 추가
        let workout = new Workout(type, machine, weight, reps, sets);

        this.#workouts.push(workout);

        // 화면에 운동데이터 랜더링
        this._renderWorkout(workout);
        //폼 숨기기
        this._hideWorkoutForm();
        // 로컬에 저장하기
        this._setLocalStorage('workouts');
    }

    _getClock() {
        const date = new Date();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        clock.innerText = `${hours}:${minutes}`;
    }

    // 운동 데이터를 HTML로 랜더링
    _renderWorkout(workout) {
        // 현재 날짜를 가져오기
        const today = new Date();
        const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('ko-KR', dateOptions); // 한국어(ko-KR)로 날짜 포맷팅

        let workoutHTML = `
            <li class="workout">
                <h2 class="workout_title">${formattedDate} Workout : ${workout.workoutType}</h2>
                <div class="workout_details">
                    <span class="workout_icon">🏋️</span>
                    <span class="workout_value">${workout.machine}</span>
                </div>
                <div class="workout__details">
                    <span class="workout_icon">🔥</span>
                    <span class="workout_value">${workout.weight}</span>
                    <span class="workout_unit">kg</span>
                </div>
                <div class="workout__details">
                    <span class="workout_icon">🎯</span>
                    <span class="workout_value">${workout.reps}</span>
                    <span class="workout_unit">회</span>
                </div>
                <div class="workout__details">
                    <span class="workout_icon">⚡️</span>
                    <span class="workout_value">${workout.sets}</span>
                    <span class="workout_unit">set</span>
                </div>
            </li>
        `;

        workouts.insertAdjacentHTML('beforeend', workoutHTML); // workouts에 추가
    }
    // 로컬스토리지에 데이터 저장
    _setLocalStorage(key) {
        if (key === 'workouts' && this.#username) {
            localStorage.setItem(`workouts_${this.#username}`, JSON.stringify(this.#workouts));
        }
        if (key === 'username') localStorage.setItem('username', this.#username);
    }

    // 로컬스토리지에서 사용자 이름을 가져오고, 상태와 UI 반영
    _getUsernameLocalStorage() {
        const user = localStorage.getItem('username');
        console.log(user);

        if (!user) return; // 존재하지 않으면 종료됨

        this.#username = user;
        this._loginEvent(this.#username);
    }

    // 로컬 스토리지에서 운동데이터를 가져옴
    _getWorkoutLocalStorage() {
        if (!this.#username) return;

        const data = JSON.parse(localStorage.getItem(`workouts_${this.#username}`));

        if (!data) return;

        this.#workouts = data;

        this.#workouts.forEach((workout) => {
            this._renderWorkout(workout);
        });
    }
}

const app = new App();
