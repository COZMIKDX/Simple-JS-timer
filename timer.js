class DynamicTimer {
  // interval is in milliseconds.
  constructor(interval) {
      this.interval = interval;
      this.timerId = null;
      this.expectedTime = 0;
      this.callback = null;
      this.driftCallback = null;

      this.timerTick = this.timerTick.bind(this);
  }

  timerTick() {
      var drift = Date.now() - this.expectedTime;
      if (drift > this.interval) {
          // Took too long. Do anything needed to make up for being late.
          console.log("Drift detected");
          if (this.driftCallback != null)
          {
            this.driftCallback();
          }
      } else { 
        // Normal on-time behaviour
        this.callback();
      }

      this.expectedTime += this.interval; // The next time it should trigger ideally.
      // setTimout again but adjust the interval to make up for drift.
      // If the drift was too big, set the next interval to 0.
      this.timerId = setTimeout(this.timerTick, Math.max(0, this.interval - drift));
  }

  startTimer() {
      if (this.callback === null) { 
        console.log("Timer callback is not set. Timer not started.");
        return; 
      }
      this.expectedTime = Date.now() + this.interval;
      this.timerId = setTimeout(this.timerTick, this.interval);
  }

  stopTimer() {
      clearTimeout(this.timerId);
  }
  
  setCallback(callback) {
    this.callback = callback;
  }

  setDriftCallback(callback) {
    this.driftCallback = callback;
  }
  
  setInterval(interval) {
    this.interval = interval;
  }
}
