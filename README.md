# Simple-JS-timer
A simple timer class written in Javascript.

I based this timer off of some tutorial I found on google (I'll link to it if I find it again), stuck it in a class, and added a few mildly helpful functions to get a bit of encapsulation in here.

## Basic Usage
To use this timer, you need to create an instance of the DynamicTimer class.
Next, create a callback function you would like to have executed when the timer goes off.
You must create a callback for the timer to start.
Finally, run the startTimer method.
```js
function myTimerCallback()) {
  console.log("Time is up!");
}

let timer = new DynamicTimer(1000, myTimerCallback, null);
timer.startTimer();
```

## Adjusting Interval Time
Use the setInterval method to change the timer interval any time after the DynamicTimer instance has been created.
This include 
For example, here is how you change the interval to 5 seconds.
```JS
timer.stopTimer();
timer.setInterval(5000);
timer.startTimer();
```
With this, you could adjust the timer using an HTML element such as the range type input.
Add an "input" event listener to your range input and use the value of the range input to set the interval.
```HTML
<input id="slider" type="range" min="1" max="100" value="1">
```
```JS
let slider = document.getElementById("#slider")

// Restarts the timer with a new interval each time the range slider is adjusted.
slider.addEventListener("input", () => {
  timer.stopTimer();
  timer.setInterval(Number(slider.value));
  timer.startTimer();
  }
);
```

You may wish to write a function to convert some time unit to milliseconds such as this:
```JS
function minuteToMillisec(minutes) {
  return minutes * 60000;
}
```
Consider forking this repo to create your own personalized timer kit.

## Timer Drift
Timers may not go off exactly when intended. For that reason, this timer provides the option to run your own code to perform whatever you may need to do to make up for the drift.

Like with the timer callback, you can create a drift callback that is set in a similar way.
```JS
function myTimerCallback() {
  console.log("Time is up!");
}

function myDriftCallback() {
  console.log("Drift detected!");
}

let timer = new DynamicTimer(1000, myTimerCallback, myDriftCallback);
timer.startTimer();
```