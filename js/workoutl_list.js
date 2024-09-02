// Yuran
/* 운동 추가 버튼 구현 */
// STEP 1 : workout_add => "click" event 발생
// STEP 2 : workout_form => hidden class 제거
// STEP 3 : workout_form => "submit" event 발생
// STEP 4 : workout_form input 값 배열로 저장 => workout 내용으로 추가
// STEP 4 : workout_form => insertAdjacentHTML('afterend', 추가할 내용)
// STEP 5 : workout_form => hidden class add

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
