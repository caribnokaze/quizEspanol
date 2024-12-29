export function toggleTimerOptions() {
    const timerChoice = $('input[name="timerChoice"]:checked').val();
    const timerSecondsContainer = $('#timer-seconds-container');

    if (timerChoice === "yes-timer") {
        $(timerSecondsContainer).show(); // タイマーオプションを表示
    } else {
        $(timerSecondsContainer).hide(); // タイマーオプションを非表示
    }
}