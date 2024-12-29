export function startQuiz() {

    loadQuizState(); // クッキーから状態を読み込む
    quizTimer = new CountdownTimer(getTimerSeconds())
    if (isQuizFinished()) {
        quizResultScreenVisible(); // クイズ結果画面を表示
        displayScore(); // 正答率を表示
        initializeQuiz(); // 状態を初期化
        return;
    }

    quizScreenVisible();
    updateAnswerCount();
    setQuizResult("");
    playQuiz();
}

export function replayQuiz() {
    const button = $('replay-button'); // ボタンのIDを指定
    button.disabled = true; // ボタンを無効にする
    speakAnswer()
    button.disabled = false; // 音声合成がサポートされていない場合もボタンを再有効化
}

export function slowReplayQuiz() {
    const button = $('slow-read-button'); // ボタンのIDを指定
    button.disabled = true; // ボタンを無効にする
    // 現在の答えの音声を再生成してゆっくり再生
    speakAnswer(true)
    button.disabled = false; // 音声合成がサポートされていない場合もボタンを再有効化
}

