let correctAnswer = 0;
let totalQuestions = 0;
let correctAnswers = 0;
let maxQuestions = 5;

function startQuiz() {
  document.getElementById("start-button").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  playQuiz(); // 初回のクイズを生成
}

function playQuiz() {
  if (totalQuestions < maxQuestions) {
    // 1000から10000までのランダムな数字を3つ生成
    const numbers = [];
    correctAnswer = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
    numbers.push(correctAnswer);

    while (numbers.length < 3) {
      const number = Math.floor(Math.random() * (10000 - 1000 + 1)) + 1000;
      if (!numbers.includes(number)) {
        numbers.push(number);
      }
    }

    // 数字をシャッフル
    numbers.sort(() => Math.random() - 0.5);

    // クイズを表示
    const quizContent = document.getElementById("quiz-content");
    quizContent.innerHTML = "";
    numbers.forEach((number) => {
      const option = document.createElement("div");
      option.className = "option";
      option.textContent = number;
      option.onclick = () => checkAnswer(number === correctAnswer);
      quizContent.appendChild(option);
    });

    // 正しい答えを音声で読み上げる
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(correctAnswer.toString());
      utterance.lang = "es-ES";
      window.speechSynthesis.speak(utterance);
    } else {
      alert("このブラウザは音声合成APIをサポートしていません。");
    }

    // 結果表示をリセット
    document.getElementById("result").textContent = "";
  } else {
    //クイズが５回終了したら正答率を表示
    displayScore();
  }
}

function checkAnswer(isCorrect) {
  const result = document.getElementById("result");
  //回答した質問数をカウント
  totalQuestions++;

  if (isCorrect) {
    correctAnswers++;
    result.textContent = "¡Correcto! 🎉";
    result.className = "correct";
  } else {
    result.textContent = "Incorrecto. 😢";
    result.className = "incorrect";
  }

  //5回目の回答が終わったかの確認
  if (totalQuestions < maxQuestions) {
    //次の問題を表示
    setTimeout(playQuiz, 2000);
  } else {
    //正答率を表示
    setTimeout(displayScore, 2000);
  }
}

function displayScore() {
  //正答率を計算して表示
  const score = (correctAnswers / maxQuestions) * 100;
  const result = document.getElementById("result");
  result.textContent = `クイズ終了！正答率は ${score}% です。`;
  result.className = "score";
}

function nextQuestion() {
  playQuiz(); // 次のクイズを生成
}

function replayQuiz() {
  if ("speechSynthesis" in window && correctAnswer !== 0) {
    // 現在の答えの音声を再生成して再生
    const newUtterance = new SpeechSynthesisUtterance(correctAnswer.toString());
    newUtterance.lang = "es-ES";
    window.speechSynthesis.speak(newUtterance);
  }
}

// ページ読み込み時にクイズコンテナを非表示にする
document.getElementById("quiz-container").style.display = "none";
