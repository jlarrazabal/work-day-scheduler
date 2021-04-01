// Global Variables
var now;
var nowHour;
var nowMinute;
var nowTime;
var tasks = ["", "", "", "", "", "", "", "", ""];
var savedTasks;

//This function verifies if there is information saved in local storage. If there is information, the function will add the saved values to the text inputs so they can be rendered on the page.
var init = function() {
  if (localStorage.getItem("recordedTasks") !== null) {
    tasks = JSON.parse(localStorage.getItem("recordedTasks"));
    for (var i = 0; i < tasks.length; i++) {
      let targetTask = $("#task" + i).val(tasks[i]);
    }
    console.log(tasks);
  } else {
    for (var i = 0; i < tasks.length; i++) {
      let targetTask = $("#task" + i).val(tasks[i]);
    }
    console.log(tasks);
  }
}
//This function updates the Global variables every 200 milliseconds and runs the setTaskColor function to update the color of the inputs on the page. Moment.js is being used to obtain the time data.
var newTime = function() {
  setInterval(function() {
    now = moment().format("LLLL");
    nowHour = moment().hours();
    nowMinute = moment().minutes();
    nowTime = nowHour + (nowMinute / 60);
    $("#currentDay").text(now);
    setTaskColor();
  }, 200);
}

//This function sets the color of the inputs by comparing the current time with the data-time attribute of the time-slots and adding or removing CSS classes as needed.
var setTaskColor = function() {
  for (var i = 0; i < 9; i++) {
    let time = parseInt($("#time-slot-" + i).attr("data-time"));
    if (time + 1 <= nowTime) {
      if ($("#task" + i).hasClass("present")) {
        $("#task" + i).removeClass("present");
      }
      if ($("#task" + i).hasClass("future")) {
        $("#task" + i).removeClass("future");
      }
      if (!$("#task" + i).hasClass("past")) {
        $("#task" + i).addClass("past");
      }
    } else if (nowTime >= time && nowTime < time + 1) {
      if ($("#task" + i).hasClass("past")) {
        $("#task" + i).removeClass("past");
      }
      if ($("#task" + i).hasClass("future")) {
        $("#task" + i).removeClass("future");
      }
      if (!$("#task" + i).hasClass("present")) {
        $("#task" + i).addClass("present");
      }
    } else {
      if ($("#task" + i).hasClass("past")) {
        $("#task" + i).removeClass("past");
      }
      if ($("#task" + i).hasClass("present")) {
        $("#task" + i).removeClass("present");
      }
      if (!$("#task" + i).hasClass("future")) {
        $("#task" + i).addClass("future");
      }
    }
  }
}

//This function saves the tasks' value after clicking on the save button and records the data in localStorage. To clear an input, the user can delete the text in the input and click the save button.
var saveTask = function(newTask) {
  let task = $(event.target).parent().prev().children();
  let taskValue = task.val();
  let taskId = task.attr("id");
  if (task === "") {
    alert("Please add the task or meeting name.")
  } else {
    for (var i = 0; i < tasks.length; i++) {
      if (taskId === ("task" + i)) {
        tasks[i] = taskValue;
        savedTasks = tasks;
        localStorage.setItem("recordedTasks", JSON.stringify(savedTasks));
      }
    }
  }
}

//This line of code adds an event listener to all the save buttons on the page.
$(".saveBtn").on("click", function(event) {
  event.preventDefault();
  saveTask(event);
})

//This line of code runs the init and newTime functions on page load.
init();
newTime();
