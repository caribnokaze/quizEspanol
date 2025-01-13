import $ from 'jquery';
import { quizScreenVisible } from './changeScreen';
import CountdownTimer from './CountdownTimer.js';
import { setupTimerListeners } from './timer.js'
import { quizResultScreenVisible, quizStartScreenVisible } from './changeScreen.js'
import { getTimerType } from './timer.js'
import { languageData } from './languages.js';

let answerCount;
let maxQuestions = 5;
let quizTimer;
let correctAnswer;
let totalQuestions;
let correctAnswers;
let isAnswering = false;


export function startQuiz() {
    setAnswerCount(0); //初期化
    answerCount = getAnswerCount();
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

export function playQuiz() {
    $("#setting-icon").css("display", "none");


    // 必ず前回のタイマーを停止し、初期化
    if (quizTimer) {
        quizTimer.stop();
        quizTimer = null;
    }
    const quizType = $('input[name="quizType"]:checked').val(); // quizTypeを正しく取得

    // クイズ開始時に呼び出す
    setupTimerListeners();

    // 既存のタイマーを停止（あれば）
    if (quizTimer) {
        quizTimer.stop(); // 事前にタイマー停止メソッドを実装している場合
        quizTimer = null; // quizTimerをリセット
    }

    if (getTimerType() === "yes-timer") {
        $('#timer').show();
        // タイマーが「あり」の場合のみ、選択された時間を取得
        const timerSecondsElement = $('input[name="timerSeconds"]:checked');
        if (timerSecondsElement.length) {
            const timerDuration = parseInt(timerSecondsElement.val());
            quizTimer = new CountdownTimer(timerDuration); // タイマーを初期化
            quizTimer.start();
        } else {
            // タイマーなしの場合、タイマーを隠す
            $('#timer').hide();
        }
    };
    isAnswering = true; //回答可能にする

    if (quizType === "multiple-choice") {
        generateRandomOptions()
    } else {
        generateAudioInput()
    }
    speakAnswer()
    // 結果表示をリセット
    setQuizResult("");
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

function getAnswerCount() {
    return parseInt(localStorage.getItem('answerCount')) || 0;  // localStorageから値を取得、なければ0
}

function setAnswerCount(val) {
    localStorage.setItem("answerCount", val);
}

function getCorrectAnswers() {
    return localStorage.getItem("correctAnswers") || 0;
}

function setCorrectAnswers(val) {
    localStorage.setItem("correctAnswers", val);
}

function getTotalQuestions() {
    return localStorage.getItem('totalQuestions') || 0;
}

function getTimerSeconds() {
    return localStorage.getItem("timerSeconds") || 0;
}

// 最後のクイズが終了している
function isQuizFinished() {
    return getAnswerCount() === maxQuestions;
}

function generateRandomOptions() {
    const minNumber = parseInt($('#min-number').val(), 10);
    const maxNumber = parseInt($('#max-number').val(), 10);
    // 指定範囲でのランダムな数字を3つ生成
    const numbers = [];
    correctAnswer =
        Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    numbers.push(correctAnswer);

    while (numbers.length < 3) {
        const number =
            Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        if (!numbers.includes(number)) {
            numbers.push(number);
        }
    }

    // 数字をシャッフル
    numbers.sort(() => Math.random() - 0.5);

    // クイズを表示
    const quizContent = $('#quiz-content');
    quizContent.html(""); // クイズ内容をリセット

    numbers.forEach((number) => {
        const option = $('<div>');
        option.text(number);
        option.addClass("option");
        option.on("click", () => {
            if (isAnswering) {
                isAnswering = false;
                checkAnswer(number === correctAnswer);
            }
        });
        quizContent.append(option);
    });
}

function generateAudioInput() {
    // 音声を聞いて数字を直接入力するクイズの場合
    correctAnswer = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;

    // クイズのUIをリセットし、入力フィールドを表示
    const quizContent = $('#quiz-content');
    quizContent.html(""); // クイズ内容をリセット

    // 入力フィールドを作成
    const inputField = $('<input>');
    inputField.attr('type', 'number'); // typeを設定
    inputField.attr('id', 'user-answer'); // IDを設定
    inputField.attr('placeholder', '数字を入力'); // プレースホルダを設定
    inputField.css({
        fontSize: '25px',
        width: '100px',
        height: '40px', // 高さを固定
        boxSizing: 'border-box' // paddingやborderがサイズに影響しないように
    });

    // 入力フィールドをquizContentに追加
    quizContent.append(inputField);

    // 送信ボタンを作成
    const submitButton = $('<button id="submit-button">');
    submitButton.text('回答を送信');

    submitButton.on('click', () => {
        if (isAnswering) {
            isAnswering = false;
            if (getTimerType() === "with-timer") {
                clearTimeout(timer); // タイマーをクリア
            }
            const userAnswer = parseInt($('#user-answer').val());
            checkAnswer(userAnswer === correctAnswer);
        }
    });

    // ボタンをquizContentに追加
    quizContent.append(submitButton);
}

function speakAnswer(speakSlowly = false) {
    // 正しい答えを音声で読み上げる
    if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(
            correctAnswer.toString()
        );
        utterance.lang = $("#language-select").val(); // 選択された言語を設定
        if (speakSlowly) {
            utterance.rate = 0.5; // 読み上げ速度を遅くする
        }
        window.speechSynthesis.speak(utterance);
    } else {
        alert("このブラウザは音声合成APIをサポートしていません。");
    }
}

export function checkAnswer(isCorrect) {
    const result = $('#result');
    // タイマーが存在していれば停止する
    if (quizTimer) {
        quizTimer.stop(); // タイマーを停止
    }

    totalQuestions = parseInt(getTotalQuestions(), 10) || 0; // NaN の場合に 0 を代入
    totalQuestions++;
    answerCount++;

    // UI に反映
    $('#answer-count').text(answerCount); // 回答数を更新
    correctAnswers = parseInt(getCorrectAnswers(), 10) || 0; // NaN の場合に 0 を代入

    // 正解か不正解かでメッセージを更新
    if (isCorrect) {
        correctAnswers++;
        setCorrectAnswers(correctAnswers);
        result.text(languageData[$("#language-select").val()].messages.correct);  // 正解メッセージを表示
        result.removeClass().addClass("correct");  // クラスをリセットしてから追加
    } else {
        result.text(languageData[$("#language-select").val()].messages.incorrect);  // 不正解メッセージを表示
        result.removeClass().addClass("incorrect");  // クラスをリセットしてから追加
    }

    // 結果を表示
    result.show();  // jQuery の .show() を使用

    // クッキーに現在の状態を保存
    saveQuizState();

    // 次の問題を表示する
    if (totalQuestions < maxQuestions) {
        setTimeout(() => {
            playQuiz(); // 次の問題に進む
            if (quizTimer) {
                quizTimer.reset(); // タイマーリセット
                quizTimer.start(); // タイマー再スタート
            }
        }, 2000); // 2秒後に次の問題
    } else {
        // 正答率を表示
        setTimeout(displayScore, 2000);
    }
}


function initializeQuiz() {
    totalQuestions = 0;
    correctAnswers = 0;
    answerCount = 0;

    // localStorageをクリアする（必要に応じて）
    localStorage.setItem("totalQuestions", "0");
    localStorage.setItem("correctAnswers", "0");
    localStorage.setItem("answerCount", "0");
}

// localStorageにデータを保存する関数を作成
function saveQuizState() {
    localStorage.setItem("answerCount", answerCount);
    localStorage.setItem("correctAnswers", correctAnswers);
    localStorage.setItem("totalQuestions", totalQuestions);
}

$('#restart-button').on('click', function () {
    initializeQuiz(); // 状態を初期化
    quizStartScreenVisible(); // クイズ開始画面を表示
});

function displayScore() {
    //正答率を計算して表示
    const score = (correctAnswers / maxQuestions) * 100;
    setQuizResult(`クイズ終了！正答率は ${score}% です。`);
    quizResultScreenVisible()
}

function setQuizResult(result) {
    $('#result').text(result);
}

// 現在の回答数を画面表示させる
function updateAnswerCount() {
    $('#answer-count').text(getAnswerCount());
}