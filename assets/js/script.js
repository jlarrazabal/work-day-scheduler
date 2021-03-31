const now = moment().format("LT");
const nowHour = moment().hours();
const nowMinute = moment().minutes();
const nowTime = nowHour + (nowMinute/60);

console.log(now);
console.log(nowTime);


var setTaskColor = function() {
  for (var i = 0; i < 9; i++) {
    let time = parseInt($("#time-slot-"+i).attr("data-time"));
    if(time + 1 < nowTime) {
      if($("#task"+i).hasClass("present")){
        $("#task"+i).removeClass("present");
      }
      if($("#task"+i).hasClass("future")){
        $("#task"+i).removeClass("future");
      }
      $("#task"+i).addClass("past");
    } else if (nowTime >= time && nowTime < time + 1) {
      if($("#task"+i).hasClass("past")){
        $("#task"+i).removeClass("past");
      }
      if($("#task"+i).hasClass("future")){
        $("#task"+i).removeClass("future");
      }
      $("#task"+i).addClass("present");
    } else {
      if($("#task"+i).hasClass("past")){
        $("#task"+i).removeClass("past");
      }
      if($("#task"+i).hasClass("present")){
        $("#task"+i).removeClass("present");
      }
      $("#task"+i).addClass("future");
    }
  }
}
setTaskColor();
