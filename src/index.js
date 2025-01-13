import $ from 'jquery';
import { quizStartScreenVisible, } from './changeScreen.js';
import { initializeApp } from './init.js';
import { getTimerType } from './timer.js';

let minNumber;
let maxNumber;
// ユーザーが入力した最小値と最大値を取得
minNumber = parseInt($('#min-number').val(), 10);
maxNumber = parseInt($('#max-number').val(), 10);
const minInput = $('#min-number');
const maxInput = $('#max-number');

initializeApp();

function hideLanguageInfo() {
  $("#setting-container").css("display", "block");
  $("#start-page-container, #setting-icon").css("display", "none");
}

$("#setting-icon").on("click", function () {
  hideLanguageInfo();
});

$("#save-button").on("click", saveSettings);

function saveSettings() {
  const quizType = $('input[name="quizType"]:checked').val();
  const timerType = getTimerType();
  const timerSeconds = $('input[name="timerSeconds"]:checked').val();
  const selectedLanguage = $("#language-select").val();
  const minNumber = $("#min-number").val();
  const maxNumber = $("#max-number").val();

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
  localStorage.setItem("selectedLanguage", selectedLanguage);
  localStorage.setItem("minNumber", minNumber);
  localStorage.setItem("maxNumber", maxNumber);

  quizStartScreenVisible()
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

