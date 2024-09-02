const loginForm = document.querySelector('.login_form');
const loginInput = document.querySelector('.login_input');
const welcome = document.querySelector('.welcome');
const workouts = document.querySelector('.workouts');
const workoutAdd = document.querySelector('.workout_add');
const workoutForm = document.querySelector('.workout_form');
const imgBox = document.querySelector('.img_box');
const workoutImg = document.querySelector('.workout_img');
const dotBox = document.querySelector('.dot_box');
const logoutBtn = document.querySelector('.logout_btn');

const workoutTypeInput = document.querySelector('.workout_form_input-type');
const machineInput = document.querySelector('.workout_form_input-machine');
const weightInput = document.querySelector('.workout_form_input-weight');
const repsInput = document.querySelector('.workout_form_input-reps');
const setsInput = document.querySelector('.workout_form_input-sets');

////////////////////////////////////////////////////////////
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
    #username;
    #workouts = [];

    constructor() {
        this._randomImageLoad();

        this._getUsernameLocalStorage();

        this._getWorkoutLocalStorage();

        loginForm.addEventListener('submit', this._loginSubmit.bind(this));

        workoutForm.addEventListener('submit', this._newWorkout.bind(this));
        workoutAdd.addEventListener('click', this._showWorkoutForm);
        logoutBtn.addEventListener('click', this._init);
    }

    _init() {
        // prettier-ignore
        [welcome, workouts, workoutAdd, workoutForm, logoutBtn, imgBox, dotBox].forEach((el) => {el.classList.add('hidden');});

        ['username', 'workouts'].forEach((key) => window.localStorage.removeItem(key));

        const [form, ...workoutsEl] = Array.from(workouts.children);
        workoutsEl.forEach((el) => el.remove());

        // 로그인 화면 초기화
        loginForm.classList.remove('hidden');
    }

    _loginSubmit(e) {
        e.preventDefault();

        // 로그인 정보 저장
        this.#username = loginInput.value;

        // 유저 존재 여부 확인
        if (this.#username === null) return;

        this._setLocalStorage('username');
        loginForm.reset();

        this._loginEvent(this.#username);
    }

    _loginEvent(username) {
        welcome.innerText = `${username}님의 운동 일기🔥`;

        loginForm.classList.add('hidden');

        [welcome, workouts, workoutAdd, logoutBtn, imgBox, dotBox].forEach((el) => {
            el.classList.remove('hidden');
        });
    }

    _randomImageLoad() {
        const num = Math.floor(Math.random() * 3) + 1;
        workoutImg.src = `img/workout_img_0${num}.jpg`;
    }

    _showWorkoutForm() {
        workoutForm.classList.remove('hidden');
    }

    _hideWorkoutForm() {
        workoutForm.reset();
        workoutForm.classList.add('hidden');
    }

    _newWorkout(e) {
        const validInputs = (...inputs) => inputs.every((inp) => Number.isFinite(inp));
        const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

        e.preventDefault();

        const type = workoutTypeInput.value;
        const machine = machineInput.value;
        const weight = +weightInput.value;
        const reps = +repsInput.value;
        const sets = +setsInput.value;

        if (!validInputs(weight, reps, sets) || !allPositive(weight, reps, sets))
            return alert('Inputs have to be positive numbers');

        let workout = new Workout(type, machine, weight, reps, sets);

        this.#workouts.push(workout);
        console.log(this.#workouts); //

        this._renderWorkout(workout);

        this._hideWorkoutForm();

        this._setLocalStorage('workouts');
    }

    _renderWorkout(workout) {
        let workoutHTML = `
            <li class="workout">
                <h2 class="workout_title">Today Workout : ${workout.workoutType}</h2>
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

        workoutForm.insertAdjacentHTML('afterend', workoutHTML);
    }

    _setLocalStorage(key) {
        if (key === 'workouts') localStorage.setItem(key, JSON.stringify(this.#workouts));
        if (key === 'username') localStorage.setItem(key, this.#username);
    }

    _getUsernameLocalStorage() {
        const user = localStorage.getItem('username');

        if (!user) return;

        this.#username = user;

        this._loginEvent(this.#username);
    }

    _getWorkoutLocalStorage() {
        const data = JSON.parse(localStorage.getItem('workouts'));

        if (!data) return;

        this.#workouts = data;

        this.#workouts.forEach((workout) => {
            this._renderWorkout(workout);
        });
    }
}

const app = new App();

/////////////////////////////////////////////////////////////////////////

/*
// const savedUsername = localStorage.getItem('username');

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


const workoutFormInput = function (e) {
    e.preventDefault();

    const workoutType = document.querySelector('.workout_form_input-type').value;
    const machine = document.querySelector('.workout_form_input-machine').value;
    const weight = document.querySelector('.workout_form_input-weight').value;
    const reps = document.querySelector('.workout_form_input-reps').value;
    const sets = document.querySelector('.workout_form_input-sets').value;

    // workout HTML
    const workoutHTML = `
        <li class="workout">
            <h2 class="workout_title">Today Workout : ${workoutType}</h2>
            <div class="workout_details">
                <span class="workout_icon">🏋️</span>
                <span class="workout_value">${machine}</span>
            </div>
            <div class="workout__details">
                <span class="workout_icon">🔥</span>
                <span class="workout_value">${weight}</span>
                <span class="workout_unit">kg</span>
            </div>
            <div class="workout__details">
                <span class="workout_icon">🎯</span>
                <span class="workout_value">${reps}</span>
                <span class="workout_unit">회</span>
            </div>
            <div class="workout__details">
                <span class="workout_icon">⚡️</span>
                <span class="workout_value">${sets}</span>
                <span class="workout_unit">set</span>
            </div>
        </li>
    `;

    // STEP 5: workout_form 아래에 운동 내용을 추가
    workoutForm.insertAdjacentHTML('afterend', workoutHTML);

    // STEP 6: workout_form에 hidden 클래스 추가하여 폼 숨기기
    workoutForm.classList.add('hidden');

    // 입력된 값 초기화
    workoutForm.reset();
};

workoutAdd.addEventListener('click', showWorkoutForm);
workoutForm.addEventListener('submit', workoutFormInput);
*/
// init();
