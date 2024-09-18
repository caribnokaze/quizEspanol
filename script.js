let correctAnswer = 0;
let totalQuestions = 0;
let correctAnswers = 0;
let maxQuestions = 5;
let answerCount = 0;

function startQuiz() {
  answerCount = 0;
  totalQuestions = 0; // 初期化
  correctAnswers = 0; // 初期化
  document.getElementById("start-button").style.display = "none";
  document.getElementById("quiz-container").style.display = "block";
  document.getElementById("answer-count").textContent = answerCount; // カウンターをリセット
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
  //解答数をカウント
  answerCount++;
  //解答数を画面に表示
  document.getElementById("answer-count").textContent = answerCount;

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
    console.log(`現在の回答数は ${answerCount} です`);
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

  //「次の質問」ボタンを「最初から」に変更
  const nextButton = document.getElementById("next-button");
  nextButton.textContent = "最初から";
  nextButton.onclick = restartQuiz;
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

function restartQuiz() {
  document.getElementById("start-button").style.display = "block";
  document.getElementById("quiz-container").style.display = "none";
  document.getElementById("result").textContent = "";
  document.getElementById("answer-count").textContent = "0"; // カウンターをリセ
}
// ページ読み込み時にクイズコンテナを非表示にする
document.getElementById("quiz-container").style.display = "none";
