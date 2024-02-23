if (localStorage.getItem("level") == null) {
    CurrentLevel = 0;
    CurrentXp = 0;
    XpToNextLevel = 100;
} else {
    CurrentLevel = new Number(localStorage.getItem("level"));
    CurrentXp = new Number(localStorage.getItem("xp"));
    Arrayrepeat = new Number(localStorage.getItem("arrayrep"));
    document.querySelector(".xplevel").textContent = CurrentLevel;
    document.querySelector(".xpwidth").style.width = (CurrentXp*100)/(5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90) + "%";
}
checkRewards();
if (localStorage.getItem("tasks") == null) {
    Names = [];
    Values = [];
    Numbers = [];
} else {
    Names = JSON.parse(localStorage.getItem("tasks")).names;
    Values = JSON.parse(localStorage.getItem("tasks")).values;
    Numbers = JSON.parse(localStorage.getItem("tasks")).numbers;
}
function btnClick() {
    event.target.disabled = true;
    Parenttarget = event.target.parentElement.parentElement;
    var audio = document.querySelector("audio");
    audio.src = "/assets/sounds/complete.ogg";
    audio.currentTime = 0;
    audio.play();
    addXp(Parenttarget.firstChild.nextSibling.innerHTML);
    Parenttarget.style.opacity = "0%";
    setTimeout(function () {
        Parenttarget.remove();
    },1500);
    activateRewardTwo(event.target.parentElement.textContent);
    var indexnum = Numbers.indexOf(Parenttarget.firstChild.nextSibling.nextSibling.innerHTML);
    Numbers.splice(indexnum, 1);
    Names.splice(indexnum, 1);
    Values.splice(indexnum, 1);
    localStorage.setItem("tasks", JSON.stringify({
        "names": Names,
        "values": Values,
        "numbers": Numbers
    }));
}
for (let index = 0; index < Names.length; index++) {
    var taskelem = document.createElement("div");
    taskelem.classList.add("task");
    var pelem = document.createElement("p");
    var checkbox = document.createElement("button");
    checkbox.classList.add("checkbox");
    checkbox.onclick = function () { btnClick() };
    var ptext = document.createTextNode(" " + Names[index]);
    pelem.appendChild(checkbox);
    pelem.appendChild(ptext);
    var xpvalue = document.createElement("xpvalue");
    xpvalue.innerHTML = Values[index];
    var randnum = document.createElement("randnum");
    randnum.innerHTML = Numbers[index];
    taskelem.appendChild(pelem);
    taskelem.appendChild(xpvalue);
    taskelem.appendChild(randnum);
    document.querySelector(".tasks").appendChild(taskelem);
}
document.getElementById("newtaskform").onsubmit = function () {
    event.preventDefault();
    document.querySelector(".taskcreate").disabled = true;
    var taskelem = document.createElement("div");
    taskelem.classList.add("task");
    var pelem = document.createElement("p");
    var checkbox = document.createElement("button");
    checkbox.classList.add("checkbox");
    checkbox.onclick = function () { btnClick() };
    var ptext = document.createTextNode(" " + document.querySelector(".taskname").value);
    pelem.appendChild(checkbox);
    pelem.appendChild(ptext);
    var xpvalue = document.createElement("xpvalue");
    xpvalue.innerHTML = document.querySelector(".taskpriority").value;
    var randnum = document.createElement("randnum");
    randnum.innerHTML = Math.random()*10;
    taskelem.appendChild(pelem);
    taskelem.appendChild(xpvalue);
    taskelem.appendChild(randnum);
    document.querySelector(".tasks").appendChild(taskelem);
    Names.push(document.querySelector(".taskname").value);
    Values.push(document.querySelector(".taskpriority").value);
    Numbers.push(randnum.innerHTML);
    document.querySelector(".taskmodal").style.opacity = "0%";
    document.querySelector(".taskname").value = "";
    localStorage.setItem("tasks", JSON.stringify({
        "names": Names,
        "values": Values,
        "numbers": Numbers
    }));
    setTimeout(function () {document.querySelector(".taskmodal").style.display = "none";document.querySelector(".taskcreate").disabled = false;}, 1000);
}
document.querySelector(".addnewtask").onclick = function () {
    document.querySelector(".taskmodal").style.display = "block";
    setTimeout(function () {document.querySelector(".taskmodal").style.opacity = "100%";})
}
document.querySelector(".taskcancel").onclick = function () {
    event.preventDefault();
    EvTarget = event.target;
    EvTarget.disabled = true;
    document.querySelector(".taskmodal").style.opacity = "0%";
    document.querySelector(".taskname").value = "";
    setTimeout(function () {document.querySelector(".taskmodal").style.display = "none";EvTarget.disabled = false;}, 1000);
}
function addXp(amount) {
    CurrentXp = CurrentXp + new Number(amount);
    XpToNextLevel = 5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90 - CurrentXp;
    if (XpToNextLevel <= 0) {
        CurrentLevel = CurrentLevel + 1;
        CurrentXp = Math.abs(XpToNextLevel);
        XpToNextLevel = 5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90 - CurrentXp;
        document.querySelector(".xplevel").textContent = CurrentLevel;
        var audio = document.querySelector("audio");
        audio.src = "/assets/sounds/levelup.ogg";
        audio.currentTime = 0;
        audio.play();
        document.querySelector(".confetti").style.display = "block";
        setTimeout(function () {document.querySelector(".confetti").style.display = "none"},2000);
        activateRewardTwo(CurrentLevel)
    }
    document.querySelector(".xpwidth").style.width = (CurrentXp*100)/(5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90) + "%";
    checkRewards();
    localStorage.setItem("level", CurrentLevel);
    localStorage.setItem("xp", CurrentXp);
}
function dataClear() {
    if(confirm("You are about to clear all the website data.\n\nThis includes XP, levels, and tasks. Are you sure you want to do this?")) {
        localStorage.clear();
        alert("All cleared!");
        location.reload();

    } else {
        alert("Alright then, we won't.");
    }
}
// Rewards
if (JSON.parse(localStorage.getItem("rewards")) == undefined) {
    localStorage.setItem("rewards", JSON.stringify({}));
}
function checkRewards() {
    if (CurrentLevel >= 2) {
        document.querySelector("#rewardsbox1").style.display = "block";
    }
    if (CurrentLevel >= 4) {
        document.querySelector("#rewardsbox2").style.display = "block";
    }
}
function rewardsTab() {
    EvTarget = event.target
    EvTarget.disabled = true;
    document.querySelector(".rewards").style.position = "fixed";
    document.querySelector(".rewards").style.right = "-40%";
    document.querySelector(".rewards").style.display = "block";
    setTimeout(function(){document.querySelector(".rewards").style.right = "0"});
    setTimeout(function(){document.querySelector(".rewards").style.position = "absolute";EvTarget.disabled = false;},1000);
}
function closeRewardsTab() {
    EvTarget = event.target
    EvTarget.disabled = true;
    document.querySelector(".rewards").style.position = "fixed";
    setTimeout(function(){document.querySelector(".rewards").style.right = "-40%"});
    setTimeout(function(){document.querySelector(".rewards").style.position = "absolute";document.querySelector(".rewards").style.display = "none";EvTarget.disabled = false;},1000);
}
// Reward 1
if (JSON.parse(localStorage.getItem("rewards")).reward1 == undefined) {
    LevelupCongratulator = "Congrats, you leveled up!";
    localStorage.setItem("rewards", JSON.stringify({
        reward1: "Congrats, you leveled up!",
        reward1enabled: false,
        reward2: undefined,
        reward2enabled: JSON.parse(localStorage.getItem("rewards")).reward2enabled
    }));
} else {
    LevelupCongratulator = JSON.parse(localStorage.getItem("rewards")).reward1;
}
function changeRewardOne() {
    var prompttext = prompt('What would you like your levelup message to be? If you want to be fancy, it will replace "%s" with the acquired level.', LevelupCongratulator);
    if (prompttext != null) {
        LevelupCongratulator = prompttext;
        localStorage.setItem("rewards", JSON.stringify({
            reward1: LevelupCongratulator,
            reward1enabled: JSON.parse(localStorage.getItem("rewards")).reward1enabled,
            reward2: JSON.parse(localStorage.getItem("rewards")).reward2,
            reward2enabled: JSON.parse(localStorage.getItem("rewards")).reward2enabled
        }));
        document.querySelector("#rewards1message").textContent = LevelupCongratulator;
    }
}
function activateRewardOne(levelnum) {
    if (document.querySelector("#reward1").checked == true) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = LevelupCongratulator.replace(/%s/gi, levelnum);
        window.speechSynthesis.speak(msg);
    }
}
document.querySelector("#reward1").onchange = function () {
    localStorage.setItem("rewards", JSON.stringify({
        reward1: JSON.parse(localStorage.getItem("rewards")).reward1,
        reward1enabled: event.target.checked,
        reward2: JSON.parse(localStorage.getItem("rewards")).reward2,
        reward2enabled: JSON.parse(localStorage.getItem("rewards")).reward2enabled
    }));
}
document.querySelector("#rewards1message").textContent = LevelupCongratulator;
document.querySelector("#reward1").checked = JSON.parse(localStorage.getItem("rewards")).reward1enabled;
// Reward 2
if (JSON.parse(localStorage.getItem("rewards")).reward2 == undefined) {
    TaskCongratulator = "Congrats, you completed a task!";
    localStorage.setItem("rewards", JSON.stringify({
        reward1: JSON.parse(localStorage.getItem("rewards")).reward1,
        reward1enabled: JSON.parse(localStorage.getItem("rewards")).reward1enabled,
        reward2: TaskCongratulator,
        reward2enabled: JSON.parse(localStorage.getItem("rewards")).reward2enabled
    }));
} else {
    TaskCongratulator = JSON.parse(localStorage.getItem("rewards")).reward2;
}
function changeRewardTwo() {
    var prompttext = prompt('What would you like your task completion message to be? If you want to be fancy, it will replace "%t" with the acquired level.', TaskCongratulator);
    if (prompttext != null) {
        TaskCongratulator = prompttext;
        localStorage.setItem("rewards", JSON.stringify({
            reward1: JSON.parse(localStorage.getItem("rewards")).reward1,
            reward1enabled: JSON.parse(localStorage.getItem("rewards")).reward1enabled,
            reward2: TaskCongratulator,
            reward2enabled: false
        }));
        document.querySelector("#rewards2message").textContent = TaskCongratulator;
    }
}
function activateRewardTwo(levelnum) {
    if (document.querySelector("#reward2").checked == true) {
        var msg = new SpeechSynthesisUtterance();
        msg.text = TaskCongratulator.replace(/%t/gi, levelnum);
        window.speechSynthesis.speak(msg);
    }
}
document.querySelector("#reward2").onchange = function () {
    localStorage.setItem("rewards", JSON.stringify({
        reward1: JSON.parse(localStorage.getItem("rewards")).reward1,
        reward1enabled: JSON.parse(localStorage.getItem("rewards")).reward1enabled,
        reward2: JSON.parse(localStorage.getItem("rewards")).reward2,
        reward2enabled: event.target.checked
    }));
}
document.querySelector("#rewards2message").textContent = TaskCongratulator;
document.querySelector("#reward2").checked = JSON.parse(localStorage.getItem("rewards")).reward2enabled;
