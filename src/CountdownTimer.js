export default class CountdownTimer {
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

    dispatchCountdownFinishedEvent() {
        const event = new CustomEvent('countdownFinished');
        window.dispatchEvent(event); // グローバルでイベントを発行
    }
}
