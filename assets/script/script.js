CurrentLevel = 0;
CurrentXp = 0;
XpToNextLevel = 100;
document.getElementById("newtaskform").onsubmit = function () {
    event.preventDefault();
    var taskelem = document.createElement("div");
    taskelem.classList.add("task");
    var pelem = document.createElement("p");
    var checkbox = document.createElement("button");
    checkbox.classList.add("checkbox");
    checkbox.onclick = function () {
        Parenttarget = event.target.parentElement.parentElement;
        var audio = new Audio('/assets/sounds/complete.ogg');
        audio.play();
        addXp(Parenttarget.firstChild.nextSibling.innerHTML);
        Parenttarget.style.opacity = "0%";
        setTimeout(function () {
            Parenttarget.remove();
        },1500);
    };
    var ptext = document.createTextNode(" " + document.querySelector(".taskname").value);
    pelem.appendChild(checkbox);
    pelem.appendChild(ptext);
    var xpvalue = document.createElement("xpvalue");
    xpvalue.innerHTML = document.querySelector(".taskpriority").value;
    taskelem.appendChild(pelem);
    taskelem.appendChild(xpvalue);
    document.querySelector(".tasks").appendChild(taskelem);   
    document.querySelector(".taskmodal").style.opacity = "0%";
    document.querySelector(".taskname").value = "";
    setTimeout(function () {document.querySelector(".taskmodal").style.display = "none";}, 1000); 
}
document.querySelector(".addnewtask").onclick = function () {
    document.querySelector(".taskmodal").style.display = "block";
    setTimeout(function () {document.querySelector(".taskmodal").style.opacity = "100%";})
}
document.querySelector(".taskcancel").onclick = function () {
    document.querySelector(".taskmodal").style.opacity = "0%";
    document.querySelector(".taskname").value = "";
    setTimeout(function () {document.querySelector(".taskmodal").style.display = "none";}, 1000);
}
function addXp(amount) {
    CurrentXp = CurrentXp + new Number(amount);
    XpToNextLevel = 5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90 - CurrentXp;
    if (XpToNextLevel <= 0) {
        CurrentLevel = CurrentLevel + 1;
        CurrentXp = Math.abs(XpToNextLevel);
        XpToNextLevel = 5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90 - CurrentXp;
        document.querySelector(".xplevel").textContent = CurrentLevel;
        var audio = new Audio('/assets/sounds/levelup.ogg');
        audio.play();
    }
    document.querySelector(".xpwidth").style.width = (CurrentXp*100)/(5 * (CurrentLevel ^ 2) + (50 * CurrentLevel) + 90) + "%";
}
