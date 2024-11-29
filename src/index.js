import $ from 'jquery';

let correctAnswer = 0;
let totalQuestions = 0;
let correctAnswers = 0;
let maxQuestions = 5;
let answerCount = 0;
let isAnswering = false;
let minNumber;
let maxNumber;
// ユーザーが入力した最小値と最大値を取得
minNumber = parseInt($('#min-number').val(), 10);
maxNumber = parseInt($('#max-number').val(), 10);
const minInput = $('#min-number');
const maxInput = $('#max-number');
const languageSelect = $("#language-select");
let quizTimer;

function hideLanguageInfo() {
  $("#setting-container").css("display", "block");
  $("#start-page-container, #setting-icon").css("display", "none");
}

$("#setting-icon").on("click", function () {
  hideLanguageInfo();
});

const languageData = {
  en: {
    name: "英語",
    messages: { correct: "Correct! 🎉", incorrect: "Incorrect. 😢" }
  },
  es: {
    name: "スペイン語",
    messages: { correct: "¡Correcto! 🎉", incorrect: "Incorrecto. 😢" }
  },
  zh: {
    name: "中国語",
    messages: { correct: "正确! 🎉", incorrect: "错误. 😢" }
  },
  vi: {
    name: "ベトナム語",
    messages: { correct: "Chính xác! 🎉", incorrect: "Không chính xác. 😢" }
  },
  fr: {
    name: "フランス語",
    messages: { correct: "Correct! 🎉", incorrect: "Incorrect. 😢" }
  },
  de: {
    name: "ドイツ語",
    messages: { correct: "Richtig! 🎉", incorrect: "Falsch. 😢" }
  },
  ja: {
    name: "日本語",
    messages: { correct: "正解！🎉", incorrect: "不正解. 😢" }
  },
  ru: {
    name: "ロシア語",
    messages: { correct: "Правильно! 🎉", incorrect: "Неправильно. 😢" }
  },
  ko: {
    name: "韓国語",
    messages: { correct: "정답! 🎉", incorrect: "오답. 😢" }
  },
  pt: {
    name: "ポルトガル語",
    messages: { correct: "Correto! 🎉", incorrect: "Incorreto. 😢" }
  },
  hi: {
    name: "ヒンディー語",
    messages: { correct: "सही! 🎉", incorrect: "गलत. 😢" }
  },
  ar: {
    name: "アラビア語",
    messages: { correct: "صحيح! 🎉", incorrect: "خطأ. 😢" }
  },
  it: {
    name: "イタリア語",
    messages: { correct: "Corretto! 🎉", incorrect: "Sbagliato. 😢" }
  },
  nl: {
    name: "オランダ語",
    messages: { correct: "Juist! 🎉", incorrect: "Onjuist. 😢" }
  },
  tr: {
    name: "トルコ語",
    messages: { correct: "Doğru! 🎉", incorrect: "Yanlış. 😢" }
  },
  pl: {
    name: "ポーランド語",
    messages: { correct: "Poprawnie! 🎉", incorrect: "Niepoprawnie. 😢" }
  },
  th: {
    name: "タイ語",
    messages: { correct: "ถูกต้อง! 🎉", incorrect: "ผิด. 😢" }
  },
  sv: {
    name: "スウェーデン語",
    messages: { correct: "Rätt! 🎉", incorrect: "Fel. 😢" }
  },
  da: {
    name: "デンマーク語",
    messages: { correct: "Korrekt! 🎉", incorrect: "Forkert. 😢" }
  },
  fi: {
    name: "フィンランド語",
    messages: { correct: "Oikein! 🎉", incorrect: "Väärin. 😢" }
  },
  no: {
    name: "ノルウェー語",
    messages: { correct: "Riktig! 🎉", incorrect: "Feil. 😢" }
  },
  el: {
    name: "ギリシャ語",
    messages: { correct: "Σωστό! 🎉", incorrect: "Λάθος. 😢" }
  },
  he: {
    name: "ヘブライ語",
    messages: { correct: "נכון! 🎉", incorrect: "שגוי. 😢" }
  },
  cs: {
    name: "チェコ語",
    messages: { correct: "Správně! 🎉", incorrect: "Špatně. 😢" }
  },
  ro: {
    name: "ルーマニア語",
    messages: { correct: "Corect! 🎉", incorrect: "Incorect. 😢" }
  },
  hu: {
    name: "ハンガリー語",
    messages: { correct: "Helyes! 🎉", incorrect: "Helytelen. 😢" }
  },
  id: {
    name: "インドネシア語",
    messages: { correct: "Benar! 🎉", incorrect: "Salah. 😢" }
  },
  ms: {
    name: "マレー語",
    messages: { correct: "Betul! 🎉", incorrect: "Salah. 😢" }
  },
  uk: {
    name: "ウクライナ語",
    messages: { correct: "Правильно! 🎉", incorrect: "Неправильно. 😢" }
  }
};

function updateLanguage() {
  const selectedOption = $("#language-select").val();

  selectedLanguage = languageData[selectedOption] ? selectedOption : "en";

  $("#selected-language").text(languageData[selectedLanguage].name);
  // 設定を保存
  localStorage.setItem("selectedLanguage", selectedLanguage);
}

$.each(languageData, function (code, data) {
  const option = $("<option>").val(code).text(data.name);
  languageSelect.append(option);
});

$("#save-button").on("click", saveSettings);

function saveSettings() {
  const quizType = $('input[name="quizType"]:checked').val();
  const timerType = getTimerType();
  const timerSeconds = $('input[name="timerSeconds"]:checked').val();

  // タイマーが「あり」を選択しているが秒数が選択されていない場合
  if (timerType === "yes-timer" && !timerSeconds) {
    alert("秒数を選択してください");
    return; // 保存処理を中断
  }

  if (isNaN(minNumber) || isNaN(maxNumber) || minNumber >= maxNumber) {
    alert("有効な最小値と最大値を入力してください。");
    return;
  }

  // タイマー設定を localStorage に保存
  localStorage.setItem("selectedQuizType", quizType);
  localStorage.setItem("timerType", timerType);
  localStorage.setItem("timerSeconds", timerSeconds);

  quizStartScreenVisible()
}

$(function () {
  $("#start-button").on('click', function () {
    startQuiz();
  });
  $("#replay-button").on('click', function () {
    replayQuiz();
  });
  $("#slow-read-button").on('click', function () {
    slowReplayQuiz();
  });

  // ページ読み込み時に初期表示を設定
  quizStartScreenVisible();
  $("#language-select").on('change', function () {
    updateLanguage();
  });
  // タイマーの選択肢に変更イベントを設定
  $('input[name="timerChoice"]').each(function () {
    $(this).on("change", toggleTimerOptions);
  });

  // 保存されたクイズタイプを取得
  const savedQuizType = localStorage.getItem("selectedQuizType");
  const savedTimerType = localStorage.getItem("timerType");
  const savedTimerSeconds = localStorage.getItem("timerSeconds");

  if (savedQuizType) {
    $('input[name="quizType"][value="' + savedQuizType + '"]').prop('checked', true);
  }

  if (savedTimerType) {
    $('input[name="timerChoice"][value="' + savedTimerType + '"]').prop('checked', true);
  }

  // 秒数が保存されていればその秒数を、なければデフォルトで5秒を選択
  if (savedTimerSeconds) {
    $('input[name="timerSeconds"][value="' + savedTimerSeconds + '"]').prop('checked', true);
  } else {
    $('input[name="timerSeconds"][value="5"]').prop('checked', true);
  }

  toggleTimerOptions(); // タイマーオプションの初期表示を設定
});

function toggleTimerOptions() {
  const timerChoice = $('input[name="timerChoice"]:checked').val();
  const timerSecondsContainer = $('#timer-seconds-container');

  if (timerChoice === "yes-timer") {
    $(timerSecondsContainer).show(); // タイマーオプションを表示
  } else {
    $(timerSecondsContainer).hide(); // タイマーオプションを非表示
  }
}

function enforceRange(input) {
  $(input).on('input', function () {
    // 入力された値が範囲外の場合に制限
    if ($(input).val() < 1) {
      (input).val(1);
    } else if ($(input).val() > 10000) {
      $(input).val(10000);
    }
  });
}

// 各入力フィールドに範囲チェックを適用
enforceRange(minInput);
enforceRange(maxInput);

function startQuiz() {

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
// イベントリスナー用の関数を定義
function handleCountdownFinished() {
  $('#timer').text("時間切れ！"); // 時間切れの表示
  checkAnswer(false); // 不正解として次の問題に進む
}

function handleCountdown(event) {
  $('#timer').text(event.detail + " 秒"); // 残り時間の表示
}

function setupTimerListeners() {
  // 既存のリスナーを削除
  window.removeEventListener('countdownFinished', handleCountdownFinished);
  window.removeEventListener('countdown', handleCountdown);

  // 新しいリスナーを登録
  window.addEventListener('countdownFinished', handleCountdownFinished);
  window.addEventListener('countdown', handleCountdown);
}

function playQuiz() {
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

// 最初からボタンのクリックイベント処理
$('#restart-button').on('click', function () {
  initializeQuiz(); // 状態を初期化
  quizStartScreenVisible(); // クイズ開始画面を表示
});

// クイズ結果を設定する
function setQuizResult(result) {
  $('#result').text(result);
}

// 現在の回答数を画面表示させる
function updateAnswerCount() {
  $('#answer-count').text(answerCount);
}

// 最後のクイズが終了している
function isQuizFinished() {
  return answerCount === maxQuestions;
}

// クイズを初期化する関数
function initializeQuiz() {
  answerCount = 0;
  totalQuestions = 0; // 初期化
  correctAnswers = 0; // 初期化

  // localStorageをクリアする（必要に応じて）
  localStorage.removeItem("answerCount");
  localStorage.removeItem("correctAnswers");
  localStorage.removeItem("totalQuestions");
}

// クイズ設定画面に切り替える関数
function quizSettingScreenVisible() {
  $("#setting-container").show();
  $("#quiz-container").hide();
  $("#start-page-container").hide();
  $("#result-container").hide();
}

// クイズ開始画面に切り替える関数
function quizStartScreenVisible() {
  $("#setting-container").hide();
  $("#quiz-container").hide();
  $("#start-page-container").show();
  $("#result-container").hide();
  $("#setting-icon").show();
  // span要素に最小値と最大値を表示
  const minNumber = parseInt($("#min-number").val(), 10);
  const maxNumber = parseInt($("#max-number").val(), 10);
  $("#min-input-number").text(isNaN(minNumber) ? "未設定" : minNumber);
  $("#max-input-number").text(isNaN(maxNumber) ? "未設定" : maxNumber);
}

// クイズ画面に切り替える関数
function quizScreenVisible() {
  $("#setting-container").hide();
  $("#quiz-container").show();
  $("#start-page-container").hide();
  $("#result-container").hide();

  $("#answer-count").parent().show(); // 現在の回答数を表示
  $("#quiz-content").show();          // クイズ内容を表示
  $("#replay-button").show();         // もう一度聞くボタンを表示
  $("#slow-read-button").show();      // ゆっくりもう一度聞くボタンを表示
}

// クイズ結果画面に切り替える関数
function quizResultScreenVisible() {
  $("#setting-container").hide();
  $("#start-page-container").hide();
  $("#result-container").show();

  $("#quiz-container").show();
  $("#answer-count").parent().hide(); // 現在の回答数を非表示
  $("#timer").hide();                 // タイマーを非表示
  $("#quiz-content").hide();          // クイズ内容を非表示
  $("#replay-button").hide();         // もう一度聞くボタンを非表示
  $("#slow-read-button").hide();      // ゆっくりもう一度聞くボタンを非表示
}

function getTimerType() {
  return document.querySelector(
    'input[name="timerChoice"]:checked'
  ).value; //タイマーの選択を取得
}

function generateRandomOptions() {
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

function checkAnswer(isCorrect) {
  const result = $('#result');
  // タイマーが存在していれば停止する
  if (quizTimer) {
    quizTimer.stop(); // タイマーを停止
  }
  totalQuestions++;
  answerCount++;
  $('#answer-count').text(answerCount);

  if (isCorrect) {
    correctAnswers++;
    result.text(languageData[$("#language-select").val()].messages.correct);  // .text() に変更
    result.removeClass().addClass("correct");  // クラスをリセットしてから追加
  } else {
    result.text(languageData[$("#language-select").val()].messages.incorrect);  // .text() に変更
    result.removeClass().addClass("incorrect");  // クラスをリセットしてから追加
  }

  // このタイミングで結果を表示する
  result.show();  // jQuery の .show() を使用

  // クッキーに現在の状態を保存
  saveQuizState();

  // 次の問題を表示
  if (totalQuestions < maxQuestions) {
    setTimeout(() => {
      playQuiz();
      quizTimer.reset();
      quizTimer.start(); // 再スタート
    }, 2000);
  } else {
    // 正答率を表示
    setTimeout(displayScore, 2000);
  }
}

function displayScore() {
  //正答率を計算して表示
  const score = (correctAnswers / maxQuestions) * 100;
  setQuizResult(`クイズ終了！正答率は ${score}% です。`);
  quizResultScreenVisible()
}

function replayQuiz() {
  const button = $('replay-button'); // ボタンのIDを指定
  button.disabled = true; // ボタンを無効にする
  speakAnswer()
  button.disabled = false; // 音声合成がサポートされていない場合もボタンを再有効化
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

function slowReplayQuiz() {
  const button = $('slow-read-button'); // ボタンのIDを指定
  button.disabled = true; // ボタンを無効にする
  // 現在の答えの音声を再生成してゆっくり再生
  speakAnswer(true)
  button.disabled = false; // 音声合成がサポートされていない場合もボタンを再有効化
}

// localStorageにデータを保存する関数を作成
function saveQuizState() {
  localStorage.setItem("answerCount", answerCount);
  localStorage.setItem("correctAnswers", correctAnswers);
  localStorage.setItem("totalQuestions", totalQuestions);
}

// クイズ開始時にlocalStorageからデータを読み込む
function loadQuizState() {
  const savedAnswerCount = localStorage.getItem("answerCount");
  const savedCorrectAnswers = localStorage.getItem("correctAnswers");
  const savedTotalQuestions = localStorage.getItem("totalQuestions");

  if (
    savedAnswerCount !== null &&
    savedCorrectAnswers !== null &&
    savedTotalQuestions !== null
  ) {
    answerCount = parseInt(savedAnswerCount);
    correctAnswers = parseInt(savedCorrectAnswers);
    totalQuestions = parseInt(savedTotalQuestions);
  }
}

function getAnswerCount() {
  return localStorage.getItem("answerCount") ?? 0;
}

function getCorrectAnswers() {
  return localStorage.getItem("correctAnswers") ?? 0;
}

function getTotalQuestions() {
  return localStorage.getItem("totalQuestions") ?? 0;
}

function getTimerSeconds() {
  return localStorage.getItem("timerSeconds") ?? 0;
}
class CountdownTimer {
  // コンストラクタで初期秒数を指定
  constructor(seconds) {
    this.initialSeconds = seconds; // 初期値の保存
    this.timeLeft = seconds; // 現在の残り時間
    this.timerInterval = null; // タイマーの管理用
  }

  start() {
    this.stop();
    this.dispatchCountdownEvent();
    this.timerInterval = setInterval(() => this.countdown(), 1000);
  }

  stop() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
      this.timerInterval = null;
    }
  }

  reset() {
    this.timeLeft = this.initialSeconds;
  }

  countdown() {
    if (this.timeLeft > 0) {
      this.timeLeft--;
      this.dispatchCountdownEvent();
    } else {
      this.stop();
      this.dispatchCountdownFinishedEvent();
    }
  }

  dispatchCountdownEvent() {
    const event = new CustomEvent('countdown', { detail: this.timeLeft });
    window.dispatchEvent(event); // グローバルでイベントを発行
  }

  // カウントダウン終了時のイベント発行処理
  dispatchCountdownFinishedEvent() {
    const event = new CustomEvent('countdownFinished');
    window.dispatchEvent(event); // グローバルでイベントを発行
  }
}
