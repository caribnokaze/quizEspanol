let correctAnswer = 0;
let totalQuestions = 0;
let correctAnswers = 0;
let maxQuestions = 5;
let answerCount = 0;
let isAnswering = false;
let minNumber;
let maxNumber;
let selectedLanguage = "en-US"; // デフォルトは英語

function updateLanguage() {
  const languageSelect = document.getElementById("language-select");
  switch (languageSelect.value) {
    case "english":
      selectedLanguage = "en-US"; // 英語
      break;
    case "spanish":
      selectedLanguage = "es-ES"; // スペイン語
      break;
    case "chinese":
      selectedLanguage = "zh-CN"; // 中国語
      break;
    case "vietnamese":
      selectedLanguage = "vi-VN"; // ベトナム語
      break;
    default:
      selectedLanguage = "en-US"; // デフォルトは英語
  }
}

function startQuiz() {
  loadQuizState(); // クッキーから状態を読み込む

  // ユーザーが入力した最小値と最大値を取得
  minNumber = parseInt(document.getElementById("min-number").value, 10);
  maxNumber = parseInt(document.getElementById("max-number").value, 10);

  if (isNaN(minNumber) || isNaN(maxNumber) || minNumber >= maxNumber) {
    alert("有効な最小値と最大値を入力してください。");
    return;
  }

  // 初めて開始する場合のみリセット
  if (answerCount === 0) {
    answerCount = 0;
    totalQuestions = 0; // 初期化
    correctAnswers = 0; // 初期化
  }

  $("#start-button, #continue-message, #language-label, #language-select").css(
    "display",
    "none"
  );
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("answer-count").textContent = answerCount; // カウンターをリセット
  document.getElementById("result").textContent = ""; // 結果エリアをクリア
  playQuiz(); // 引数を渡さずに初回のクイズを生成
}

function playQuiz() {
  // 引数は必要ない
  if (totalQuestions < maxQuestions) {
    isAnswering = true;

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
      const utterance = new SpeechSynthesisUtterance(correctAnswer.toString());
      utterance.lang = selectedLanguage; // 選択された言語を設定
      window.speechSynthesis.speak(utterance);
    } else {
      alert("このブラウザは音声合成APIをサポートしていません。");
    }

    // 結果表示をリセット
    document.getElementById("result").textContent = "";
  } else {
    // クイズが5回終了したら正答率を表示
    displayScore();
  }
}

function checkAnswer(isCorrect) {
  const result = document.getElementById("result");
  totalQuestions++;
  answerCount++;
  document.getElementById("answer-count").textContent = answerCount;

  if (isCorrect) {
    correctAnswers++;
    result.textContent = "¡Correcto! 🎉";
    result.className = "correct";
  } else {
    result.textContent = "Incorrecto. 😢";
    result.className = "incorrect";
  }

  // クッキーに現在の状態を保存
  saveQuizState();

  // 次の問題を表示
  if (totalQuestions < maxQuestions) {
    setTimeout(() => {
      playQuiz();
    }, 2000);
  } else {
    // 正答率を表示
    setTimeout(displayScore, 2000);
  }
}

function displayScore() {
  //正答率を計算して表示
  const score = (correctAnswers / maxQuestions) * 100;
  const result = document.getElementById("result");
  result.textContent = `クイズ終了！正答率は ${score}% です。`;
  result.className = "score";

  //「次の質問」ボタンを「最初から」に変更
  const nextButton = document.getElementById("next-button");
  nextButton.textContent = "最初から";
  nextButton.onclick = restartQuiz;
}

function nextQuestion() {
  const button = document.getElementById("next-button"); // ボタンのIDを指定
  button.disabled = true; // ボタンを無効化

  // 次の質問の処理をここで行う
  console.log("次の質問に進みます...");

  // クイズの生成処理
  playQuiz();

  // 3秒後にボタンを再び有効化
  setTimeout(() => {
    button.disabled = false; // 3秒後に再度ボタンを有効化
  }, 3000); // 3000ミリ秒（3秒）
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

function restartQuiz() {
  localStorage.removeItem("answerCount");
  localStorage.removeItem("correctAnswers");
  localStorage.removeItem("totalQuestions");
  // 初期状態に戻す
  answerCount = 0;
  correctAnswers = 0;
  totalQuestions = 0;
  correctAnswer = 0; // 追加: correctAnswerをリセット

  document.getElementById("start-button").style.display = "block";
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result").textContent = "";
  document.getElementById("answer-count").textContent = "0"; // カウンターをリセット

  // 言語選択を表示
  document.getElementById("language-label").style.display = "block"; // 言語ラベルを表示
  document.getElementById("language-select").style.display = "block"; // 言語セレクトを表示
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
    document.getElementById("answer-count").textContent = answerCount;
  }
}
