

const secondsElements = document.getElementById('second')
const minutesElements = document.getElementById('minutes')
const hoursElement = document.getElementById('hours')
const daysElement = document.getElementById('days')

function countDown ()

{

const due = "31 October 2024";
const dueDate = new Date(due);
console.log (dueDate)

const currentDate = new Date ();
console.log(currentDate)

let diffTime = dueDate - (currentDate)/1000;
console.log (diffTime)


let days = Math.floor(diffTime / (24 * 3600));

// console.log(days)

let hours = Math.floor(diffTime % (24 * 3600) /3600 );

// console.log(hours)

let minutes = Math.floor(diffTime % (24 * 3600) % 3600)/60;

// console.log (minutes)

let seconds = Math.floor(diffTime % (24 * 3600) % 3600)%60;
console.log (seconds)

// console.log ("hours " , hours)


secondsElements.innerHTML = seconds;
minutesElements.innerHTML = minutes;
hoursElements.innerHTML = hours;
daysElements.innerHTML = days;

}

countDown ()
setInterval(countDown(),1000)
