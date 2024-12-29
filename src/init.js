import { startQuiz, replayQuiz, slowReplayQuiz } from './quiz.js';
import { toggleTimerOptions } from './timer.js';
import { updateLanguage } from './languages.js';

export function initializeApp() {
    $(function () {
        // 言語オプションの設定
        $.each(languageData, function (code, data) {
            const option = $("<option>").val(code).text(data.name);
            $("#language-select").append(option);
        });

        // 保存された設定を取得
        const savedQuizType = localStorage.getItem("selectedQuizType");
        const savedTimerType = localStorage.getItem("timerType");
        const savedTimerSeconds = localStorage.getItem("timerSeconds");
        const savedLanguage = localStorage.getItem("selectedLanguage") || "en";
        const savedMinNumber = localStorage.getItem("minNumber");
        const savedMaxNumber = localStorage.getItem("maxNumber");

        // 言語セレクトボックスに保存された言語を設定
        $("#language-select").val(savedLanguage);

        // 言語を更新
        updateLanguage(savedLanguage);
        if (savedMinNumber) {
            $("#min-number").val(savedMinNumber);
        }
        if (savedMaxNumber) {
            $("#max-number").val(savedMaxNumber);
        }

        $("#start-button").on('click', function () {
            startQuiz();
        });
        $("#replay-button").on('click', function () {
            replayQuiz();
        });
        $("#slow-read-button").on('click', function () {
            slowReplayQuiz();
        });

        // タイマーの選択肢に変更イベントを設定
        $('input[name="timerChoice"]').each(function () {
            $(this).on("change", toggleTimerOptions);
        });

        if (savedQuizType) {
            $('input[name="quizType"][value="' + savedQuizType + '"]').prop('checked', true);
        }

        if (savedTimerType) {
            $('input[name="timerChoice"][value="' + savedTimerType + '"]').prop('checked', true);
        }

        if (savedTimerSeconds) {
            $('input[name="timerSeconds"][value="' + savedTimerSeconds + '"]').prop('checked', true);
        } else {
            $('input[name="timerSeconds"][value="5"]').prop('checked', true);
        }

        toggleTimerOptions(); // タイマーオプションの初期表示を設定
        quizStartScreenVisible();

        // 言語変更時の処理
        $("#language-select").on('change', function () {
            const selectedLanguage = $(this).val();
            updateLanguage(selectedLanguage);
        });
    });
}