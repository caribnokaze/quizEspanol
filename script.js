let correctAnswer = 0;
let totalQuestions = 0;
let correctAnswers = 0;
let maxQuestions = 5;
let answerCount = 0;
let isAnswering = false;
let minNumber;
let maxNumber;
let timeLeft = 0;
let timerInterval;
// ユーザーが入力した最小値と最大値を取得
minNumber = parseInt($('#min-number').val(), 10);
maxNumber = parseInt($('#max-number').val(), 10);
const minInput = $('#min-number');
const maxInput = $('#max-number');

// 言語ごとのメッセージを定義
const messages = {
  en: { correct: "Correct! 🎉", incorrect: "Incorrect. 😢" },
  es: { correct: "¡Correcto! 🎉", incorrect: "Incorrecto. 😢" },
  zh: { correct: "正确! 🎉", incorrect: "错误. 😢" },
  vi: { correct: "Chính xác! 🎉", incorrect: "Không chính xác. 😢" },
  fr: { correct: "Correct! 🎉", incorrect: "Incorrect. 😢" }, // フランス語
  de: { correct: "Richtig! 🎉", incorrect: "Falsch. 😢" }, // ドイツ語
  ja: { correct: "正解！🎉", incorrect: "不正解. 😢" }, // 日本語
  ru: { correct: "Правильно! 🎉", incorrect: "Неправильно. 😢" }, // ロシア語
  ko: { correct: "정답! 🎉", incorrect: "오답. 😢" }, // 韓国語
  pt: { correct: "Correto! 🎉", incorrect: "Incorreto. 😢" }, // ポルトガル語
  hi: { correct: "सही! 🎉", incorrect: "गलत. 😢" }, // ヒンディー語
  ar: { correct: "صحيح! 🎉", incorrect: "خطأ. 😢" }, // アラビア語
  it: { correct: "Corretto! 🎉", incorrect: "Sbagliato. 😢" }, // イタリア語
  nl: { correct: "Juist! 🎉", incorrect: "Onjuist. 😢" }, // オランダ語
  tr: { correct: "Doğru! 🎉", incorrect: "Yanlış. 😢" }, // トルコ語
  pl: { correct: "Poprawnie! 🎉", incorrect: "Niepoprawnie. 😢" }, // ポーランド語
  th: { correct: "ถูกต้อง! 🎉", incorrect: "ผิด. 😢" }, // タイ語
  sv: { correct: "Rätt! 🎉", incorrect: "Fel. 😢" }, // スウェーデン語
  da: { correct: "Korrekt! 🎉", incorrect: "Forkert. 😢" }, // デンマーク語
  fi: { correct: "Oikein! 🎉", incorrect: "Väärin. 😢" }, // フィンランド語
  no: { correct: "Riktig! 🎉", incorrect: "Feil. 😢" }, // ノルウェー語
  el: { correct: "Σωστό! 🎉", incorrect: "Λάθος. 😢" }, // ギリシャ語
  he: { correct: "נכון! 🎉", incorrect: "שגוי. 😢" }, // ヘブライ語
  cs: { correct: "Správně! 🎉", incorrect: "Špatně. 😢" }, // チェコ語
  ro: { correct: "Corect! 🎉", incorrect: "Incorect. 😢" }, // ルーマニア語
  hu: { correct: "Helyes! 🎉", incorrect: "Helytelen. 😢" }, // ハンガリー語
  id: { correct: "Benar! 🎉", incorrect: "Salah. 😢" }, // インドネシア語
  ms: { correct: "Betul! 🎉", incorrect: "Salah. 😢" }, // マレー語
  uk: { correct: "Правильно! 🎉", incorrect: "Неправильно. 😢" }, // ウクライナ語
};

function hideLanguageInfo() {
  $("#setting-container").css("display", "block");
  $("#start-page-container, #setting-icon").css("display", "none");
}

$("#setting-icon").on("click", function () {
  hideLanguageInfo();
});

// 言語コードと表示する言語名をマッピング
const languageMap = {
  english: "en", spanish: "es", chinese: "zh", vietnamese: "vi",
  french: "fr", german: "de", japanese: "ja", russian: "ru",
  korean: "ko", portuguese: "pt", hindi: "hi", arabic: "ar",
  italian: "it", dutch: "nl", turkish: "tr", polish: "pl",
  thai: "th", swedish: "sv", danish: "da", finnish: "fi",
  norwegian: "no", greek: "el", hebrew: "he", czech: "cs",
  romanian: "ro", hungarian: "hu", indonesian: "id", malay: "ms",
  ukrainian: "uk"
};

const languageNames = {
  en: "英語", es: "スペイン語", zh: "中国語", vi: "ベトナム語",
  fr: "フランス語", de: "ドイツ語", ja: "日本語", ru: "ロシア語",
  ko: "韓国語", pt: "ポルトガル語", hi: "ヒンディー語", ar: "アラビア語",
  it: "イタリア語", nl: "オランダ語", tr: "トルコ語", pl: "ポーランド語",
  th: "タイ語", sv: "スウェーデン語", da: "デンマーク語", fi: "フィンランド語",
  no: "ノルウェー語", el: "ギリシャ語", he: "ヘブライ語", cs: "チェコ語",
  ro: "ルーマニア語", hu: "ハンガリー語", id: "インドネシア語", ms: "マレー語",
  uk: "ウクライナ語"
};

function updateLanguage() {
  const selectedOption = $("#language-select").val();

  selectedLanguage = languageMap[selectedOption] || "en";

  // 選択された言語名の表示を更新
  $("#selected-language").text(languageNames[selectedLanguage]);
}

const languageSelect = $("#language-select");
$.each(languageMap, function(value, code) {
  const option = $("<option>").val(value).text(languageNames[code]);
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
  // ページ読み込み時に初期表示を設定
  quizStartScreenVisible();
  // タイマーの選択肢に変更イベントを設定
  const timerChoices = $('input[name="timerChoice"]');
  timerChoices.forEach((choice) => {
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

function playQuiz() {
  $("#setting-icon").css("display", "none");
  const quizType = $('input[name="quizType"]:checked').val(); // quizTypeを正しく取得

  let timerDuration = 0; //タイマーのリセット
  if (getTimerType() === "yes-timer") {
    // タイマーが「あり」の場合のみ、選択された時間を取得
    const timerSecondsElement = $('input[name="timerSeconds"]:checked');
    if (timerSecondsElement.length) {
      timerDuration = parseInt(timerSecondsElement.val())
      timeLeft = timerDuration; //タイマーの初期化
      startTimer();
    } else {
      console.error("タイマー秒数が選択されていません。")
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

  // タイマーを停止
  clearInterval(timerInterval);

  totalQuestions++;
  answerCount++;
  $('#answer-count').text(answerCount);

  if (isCorrect) {
    correctAnswers++;
    result.text(messages[selectedLanguage].correct);  // .text() に変更
    result.removeClass().addClass("correct");  // クラスをリセットしてから追加
  } else {
    result.text(messages[selectedLanguage].incorrect);  // .text() に変更
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
      startTimer();  // 次の問題でタイマーを再スタート
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
    utterance.lang = selectedLanguage; // 選択された言語を設定
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

function startTimer() {
  const timerDisplay = $('#timer');  // IDを正確に指定

  // タイマーをクリアしてから開始
  clearInterval(timerInterval);
  timerDisplay.show();
  timerDisplay.text(timeLeft + " 秒");

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.text(timeLeft + " 秒");

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerDisplay.text("時間切れ！");
      // 時間切れのため自動で不正解として次の問題に進む
      checkAnswer(false);
    }
  }, 1000);
}


