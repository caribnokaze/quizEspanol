import $ from 'jquery';
import { checkAnswer } from './quiz.js';

export function handleCountdownFinished() {
    $('#timer').text("時間切れ！");
    checkAnswer(false); // 不正解として次の問題に進む
}

export function handleCountdown(event) {
    $('#timer').text(event.detail + " 秒");
}

export function setupTimerListeners() {
    window.removeEventListener('countdownFinished', handleCountdownFinished);
    window.removeEventListener('countdown', handleCountdown);

    window.addEventListener('countdownFinished', handleCountdownFinished);
    window.addEventListener('countdown', handleCountdown);
}

export function toggleTimerOptions() {
    const timerChoice = $('input[name="timerChoice"]:checked').val();
    const timerSecondsContainer = $('#timer-seconds-container');

    if (timerChoice === "yes-timer") {
        $(timerSecondsContainer).show(); // タイマーオプションを表示
    } else {
        $(timerSecondsContainer).hide(); // タイマーオプションを非表示
    }
}

export function getTimerType() {
    return document.querySelector(
        'input[name="timerChoice"]:checked'
    ).value; //タイマーの選択を取得
}