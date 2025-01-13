import $ from 'jquery';

// クイズ開始画面に切り替える関数
export function quizStartScreenVisible() {
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
export function quizScreenVisible() {
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
export function quizResultScreenVisible() {
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
