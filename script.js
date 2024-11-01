let correctAnswer = 0;
let totalQuestions = 0;
let correctAnswers = 0;
let maxQuestions = 5;
let answerCount = 0;
let isAnswering = false;
let minNumber;
let maxNumber;
let selectedLanguage = "en"; // デフォルトは英語
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
  en: "英語", es: "スペイン語", zh: "中国語", vi: "ベトナム語",
  fr: "フランス語", de: "ドイツ語", ja: "日本語", ru: "ロシア語",
  ko: "韓国語", pt: "ポルトガル語", hi: "ヒンディー語", ar: "アラビア語",
  it: "イタリア語", nl: "オランダ語", tr: "トルコ語", pl: "ポーランド語",
  th: "タイ語", sv: "スウェーデン語", da: "デンマーク語", fi: "フィンランド語",
  no: "ノルウェー語", el: "ギリシャ語", he: "ヘブライ語", cs: "チェコ語",
  ro: "ルーマニア語", hu: "ハンガリー語", id: "インドネシア語", ms: "マレー語",
  uk: "ウクライナ語",
};

function updateLanguage() {
  const languageSelect = document.getElementById("language-select");
  switch (languageSelect.value) {
    case "english":
      selectedLanguage = "en"; // 英語
      break;
    case "spanish":
      selectedLanguage = "es"; // スペイン語
      break;
    case "chinese":
      selectedLanguage = "zh"; // 中国語
      break;
    case "vietnamese":
      selectedLanguage = "vi"; // ベトナム語
      break;
    case "french":
      selectedLanguage = "fr"; // フランス語
      break;
    case "german":
      selectedLanguage = "de"; // ドイツ語
      break;
    case "japanese":
      selectedLanguage = "ja"; // 日本語
      break;
    case "russian":
      selectedLanguage = "ru"; // ロシア語
      break;
    case "korean":
      selectedLanguage = "ko"; // 韓国語
      break;
    case "portuguese":
      selectedLanguage = "pt"; // ポルトガル語
      break;
    case "hindi":
      selectedLanguage = "hi"; // ヒンディー語
      break;
    case "arabic":
      selectedLanguage = "ar"; // アラビア語
      break;
    case "italian":
      selectedLanguage = "it"; // イタリア語
      break;
    case "dutch":
      selectedLanguage = "nl"; // オランダ語
      break;
    case "turkish":
      selectedLanguage = "tr"; // トルコ語
      break;
    case "polish":
      selectedLanguage = "pl"; // ポーランド語
      break;
    case "thai":
      selectedLanguage = "th"; // タイ語
      break;
    case "swedish":
      selectedLanguage = "sv"; // スウェーデン語
      break;
    case "danish":
      selectedLanguage = "da"; // デンマーク語
      break;
    case "finnish":
      selectedLanguage = "fi"; // フィンランド語
      break;
    case "norwegian":
      selectedLanguage = "no"; // ノルウェー語
      break;
    case "greek":
      selectedLanguage = "el"; // ギリシャ語
      break;
    case "hebrew":
      selectedLanguage = "he"; // ヘブライ語
      break;
    case "czech":
      selectedLanguage = "cs"; // チェコ語
      break;
    case "romanian":
      selectedLanguage = "ro"; // ルーマニア語
      break;
    case "hungarian":
      selectedLanguage = "hu"; // ハンガリー語
      break;
    case "indonesian":
      selectedLanguage = "id"; // インドネシア語
      break;
    case "malay":
      selectedLanguage = "ms"; // マレー語
      break;
    case "ukrainian":
      selectedLanguage = "uk"; // ウクライナ語
      break;
    default:
      selectedLanguage = "en"; // デフォルトは英語
  }
  // 選択された言語の表示を更新
  document.getElementById("selected-language").textContent = languageMap[selectedLanguage];
}

// 言語を選択する関数
function setLanguage(language) {
  selectedLanguage = language;
}

document.getElementById("save-button").addEventListener("click", saveSettings);

function saveSettings() {
  const quizType = document.querySelector('input[name="quizType"]:checked').value;
  const timerType = document.querySelector('input[name="timerChoice"]:checked').value;
  const timerSeconds = document.querySelector('input[name="timerSeconds"]:checked').value;

  // タイマーが「あり」を選択しているが秒数が選択されていない場合
  if (timerType === "yes-timer" && !timerSeconds) {
    alert("秒数を選択してください");
    return; // 保存処理を中断
  }

  // タイマー設定を localStorage に保存
  localStorage.setItem("selectedQuizType", quizType);
  localStorage.setItem("timerType", timerType);
  localStorage.setItem("timerSeconds", timerSeconds);

  quizStartScreenVisible()
}

document.addEventListener("DOMContentLoaded", function () {
  // 初期表示の設定
  // toggleTimerOptions(); // 初期状態を設定

  // タイマーの選択肢に変更イベントを設定
  const timerChoices = document.querySelectorAll('input[name="timerChoice"]');
  timerChoices.forEach((choice) => {
    choice.addEventListener("change", toggleTimerOptions);
  });

  // 保存されたクイズタイプを取得
  const savedQuizType = localStorage.getItem("selectedQuizType");
  const savedTimerType = localStorage.getItem("timerType");
  const savedTimerSeconds = localStorage.getItem("timerSeconds");


  if (savedQuizType) {
    document.querySelector(
      `input[name="quizType"][value="${savedQuizType}"]`
    ).checked = true;
  }

  if (savedTimerType) {
    document.querySelector(`input[name="timerChoice"][value="${savedTimerType}"]`).checked = true;
  }

  // 秒数が保存されていればその秒数を、なければデフォルトで5秒を選択
  if (savedTimerSeconds) {
    document.querySelector(`input[name="timerSeconds"][value="${savedTimerSeconds}"]`).checked = true;
  } else {
    document.querySelector('input[name="timerSeconds"][value="5"]').checked = true;
  }

  toggleTimerOptions(); // タイマーオプションの初期表示を設定
});

function toggleTimerOptions() {
  const timerChoice = document.querySelector('input[name="timerChoice"]:checked').value;
  const timerSecondsContainer = document.getElementById("timer-seconds-container");

  if (timerChoice === "yes-timer") {
    timerSecondsContainer.style.display = "block"; // タイマーオプションを表示
  } else {
    timerSecondsContainer.style.display = "none"; // タイマーオプションを非表示
  }
}

const minInput = document.getElementById("min-number");
const maxInput = document.getElementById("max-number");

function enforceRange(input) {
  input.addEventListener("input", function () {
    // 入力された値が範囲外の場合に制限
    if (input.value < 1) {
      input.value = 1;
    } else if (input.value > 10000) {
      input.value = 10000;
    }
  });
}

// 各入力フィールドに範囲チェックを適用
enforceRange(minInput);
enforceRange(maxInput);

function startQuiz() {

  loadQuizState(); // クッキーから状態を読み込む

  // ユーザーが入力した最小値と最大値を取得
  minNumber = parseInt(document.getElementById("min-number").value, 10);
  maxNumber = parseInt(document.getElementById("max-number").value, 10);

  if (isNaN(minNumber) || isNaN(maxNumber) || minNumber >= maxNumber) {
    alert("有効な最小値と最大値を入力してください。");
    return;
  }
  console.log("answerCount:", answerCount);
  console.log("maxQuestions:", maxQuestions);
  console.log("isQuizFinished:", isQuizFinished());

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
document.getElementById("restart-button").addEventListener("click", function () {
  initializeQuiz(); // 状態を初期化
  quizStartScreenVisible(); // クイズ開始画面を表示
});

// クイズ結果を設定する
function setQuizResult(result) {
  document.getElementById("result").textContent = result;
}

// 現在の回答数を画面表示させる
function updateAnswerCount() {
  document.getElementById("answer-count").textContent = answerCount;
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

// ページ読み込み時に初期値を表示
window.onload = function () {
  quizStartScreenVisible();
};

function playQuiz() {
  $("#setting-icon").css("display", "none");
  const quizType = document.querySelector(
    'input[name="quizType"]:checked'
  ).value; // quizTypeを正しく取得
  const timerType = document.querySelector(
    'input[name="timerChoice"]:checked'
  ).value; //タイマーの選択を取得
  let timerDuration = 0; //タイマーのリセット

  if (timerType === "yes-timer") {
    // タイマーが「あり」の場合のみ、選択された時間を取得
    const timerSecondsElement = document.querySelector('input[name="timerSeconds"]:checked');
    if (timerSecondsElement) {
      timerDuration = parseInt(timerSecondsElement.value)
      timeLeft = timerDuration; //タイマーの初期化
      startTimer();
    } else {
      console.error("タイマー秒数が選択されていません。")
    }
  };


  if (totalQuestions < maxQuestions) {
    isAnswering = true; //回答可能にする

    if (quizType === "multiple-choice") {
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
      const quizContent = document.getElementById("quiz-content");
      quizContent.innerHTML = ""; // クイズ内容をリセット
      numbers.forEach((number) => {
        const option = document.createElement("div");
        option.className = "option";
        option.textContent = number;
        option.addEventListener("click", () => {
          if (isAnswering) {
            isAnswering = false;
            checkAnswer(number === correctAnswer);
          }
        });
        quizContent.appendChild(option);
      });

      // 正しい答えを音声で読み上げる
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(
          correctAnswer.toString()
        );
        utterance.lang = selectedLanguage; // 選択された言語を設定
        window.speechSynthesis.speak(utterance);
      } else {
        alert("このブラウザは音声合成APIをサポートしていません。");
      }

      // 結果表示をリセット
      setQuizResult("");
    } else if (quizType === "audio-input") {
      // 音声を聞いて数字を直接入力するクイズの場合
      correctAnswer =
        Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
      // 音声で正しい答えを読み上げる
      if ("speechSynthesis" in window) {
        const utterance = new SpeechSynthesisUtterance(
          correctAnswer.toString()
        );
        utterance.lang = selectedLanguage;
        window.speechSynthesis.speak(utterance);
      } else {
        alert("このブラウザは音声合成APIをサポートしていません。");
      }
      // クイズのUIをリセットし、入力フィールドを表示
      const quizContent = document.getElementById("quiz-content");
      quizContent.innerHTML = ""; // クイズ内容をリセット

      const inputField = document.createElement("input");
      inputField.type = "number";
      inputField.id = "user-answer";
      inputField.placeholder = "数字を入力";
      inputField.style.fontSize = "25px";
      inputField.style.width = "100px";
      quizContent.appendChild(inputField);

      // 送信ボタンを追加
      const submitButton = document.createElement("button");
      submitButton.textContent = "回答を送信";
      submitButton.style.transition = "none";      // 動きをなくす
      submitButton.addEventListener("click", () => {
        if (isAnswering) {
          isAnswering = false;
          if (timerType === "with-timer") {
            clearTimeout(timer); // タイマーをクリア
          }
          const userAnswer = parseInt(
            document.getElementById("user-answer").value
          );
          checkAnswer(userAnswer === correctAnswer);
        }
      });
      quizContent.appendChild(submitButton);

      // 結果表示をリセット
      setQuizResult("");
    } else {
      // クイズが終了したら正答率を表示
      displayScore();
    }
  }
}

function checkAnswer(isCorrect) {
  const result = document.getElementById("result");

  // タイマーを停止
  clearInterval(timerInterval);

  totalQuestions++;
  answerCount++;
  document.getElementById("answer-count").textContent = answerCount;

  if (isCorrect) {
    correctAnswers++;
    result.textContent = messages[selectedLanguage].correct;
    result.className = "correct";
  } else {
    result.textContent = messages[selectedLanguage].incorrect;
    result.className = "incorrect";
  }
  // このタイミングで結果を表示する
  document.getElementById("result").style.display = "block";

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
  const button = document.getElementById("replay-button"); // ボタンのIDを指定
  button.disabled = true; // ボタンを無効にする
  if ("speechSynthesis" in window && correctAnswer !== 0) {
    // 現在の答えの音声を再生成して再生
    const newUtterance = new SpeechSynthesisUtterance(correctAnswer.toString());
    newUtterance.lang = selectedLanguage;
    // 音声の再生が終わった時にボタンを有効化
    newUtterance.onend = function () {
      button.disabled = false; // 音声再生が完了したらボタンを再有効化
    };
    window.speechSynthesis.speak(newUtterance);
  } else {
    console.log(
      "音声合成はサポートされていないか、正しい値が設定されていません。"
    );
    button.disabled = false; // 音声合成がサポートされていない場合もボタンを再有効化
  }
}

function slowReplayQuiz() {
  const button = document.getElementById("slow-read-button"); // ボタンのIDを指定
  button.disabled = true; // ボタンを無効にする
  if ("speechSynthesis" in window && correctAnswer !== 0) {
    // 現在の答えの音声を再生成してゆっくり再生
    const newUtterance = new SpeechSynthesisUtterance(correctAnswer.toString());
    newUtterance.lang = selectedLanguage;
    // 音声の再生が終わった時にボタンを有効化
    newUtterance.onend = function () {
      button.disabled = false; // 音声再生が完了したらボタンを再有効化
    };
    newUtterance.rate = 0.5; // 読み上げ速度を遅くする
    window.speechSynthesis.speak(newUtterance);
  } else {
    console.log(
      "音声合成はサポートされていないか、正しい値が設定されていません。"
    );
    button.disabled = false; // 音声合成がサポートされていない場合もボタンを再有効化
  }
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

let timeLeft = 0;
let timerInterval;

function startTimer() {
  const timerDisplay = document.getElementById("timer");

  // タイマーをクリアしてから開始
  clearInterval(timerInterval);
  timerDisplay.style.display = "block"; // タイマーを表示
  timerDisplay.textContent = timeLeft + " 秒";

  timerInterval = setInterval(() => {
    timeLeft--;
    timerDisplay.textContent = timeLeft + " 秒";

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      timerDisplay.textContent = "時間切れ！";
      // 時間切れのため自動で不正解として次の問題に進む
      checkAnswer(false);
    }
  }, 1000);
}


