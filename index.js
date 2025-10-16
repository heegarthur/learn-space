
function counting() {
  let score = parseInt(localStorage.getItem('totaltime') || '0', 10);
  const score_element = document.getElementById('scoreshow');
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');

  function updateTimeDisplays(score) {
    const days = Math.floor(score / 86400);
    const hours = Math.floor((score % 86400) / 3600);
    const minutes = Math.floor((score % 3600) / 60);
    const seconds = score % 60;

    daysEl.textContent = days;
    hoursEl.textContent = hours;
    minutesEl.textContent = minutes;
    secondsEl.textContent = seconds;
  }

  score_element.textContent = score;
  updateTimeDisplays(score);

  setInterval(() => {
    score += 1;
    localStorage.setItem('totaltime', score.toString());
    score_element.textContent = score;
    updateTimeDisplays(score);
    levelUp(1, secondsEl)
    beweeg(score);
  }, 1000);
}


function openurl(url) {
  window.open(url)
}
function search() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const buttons = document.querySelectorAll('button');

  buttons.forEach(btn => {
    const text = btn.textContent.toLowerCase();
    const classes = btn.className.toLowerCase();
    if (text.includes(input) || classes.includes(input)) {
      btn.style.display = '';
    } else {
      btn.style.display = 'none';
    }
  });
}


function levelUp(xp, total_seconds) {
  let totalXP = parseInt(localStorage.getItem("xp")) || 0;
  let level = parseInt(localStorage.getItem("level")) || 1;

  totalXP += xp;

  let xpNeeded = 1800;

  while (totalXP >= xpNeeded) {
    totalXP -= xpNeeded;
    level++;
    showFireworks()
    setTimeout(hideFireworks, 6000);

  }

  localStorage.setItem("xp", totalXP);
  localStorage.setItem("level", level);

  document.getElementById("level").innerText = "Study years: " + level;
  updateProgressBar(totalXP, xpNeeded);
}



function updateProgressBar(currentXP, xpNeeded) {
  let percentage = (currentXP / xpNeeded) * 100;
  document.getElementById("progress").style.width = percentage + "%";

  document.getElementById("xp-text").innerText = currentXP + " / " + xpNeeded + " XP";
}

function beweeg(seconds) {
  const img = document.getElementById("runner");
  const screenWidth = window.innerWidth - img.width;
  const beweegXp = seconds % 1800;

  if (seconds % 3600 < 1800) {

    let progress = beweegXp / 1800;
    img.style.left = (progress * screenWidth) + "px";
  } else {
    let progress = beweegXp / 1800;
    img.style.left = ((1 - progress) * screenWidth) + "px";
  }
}

function showFireworks() {
  const fireworks = document.querySelectorAll('.firework');
  const earth = document.getElementById("runner");
  fireworks.forEach(el => {
    el.style.display = 'block';
  });
  document.body.style.backgroundColor = "black";
  earth.style.display = "none";
}


function hideFireworks() {
  const fireworks = document.querySelectorAll('.firework');
  const earth = document.getElementById("runner");
  fireworks.forEach(el => {
    el.style.display = 'none';
  });
  document.body.style.backgroundColor = "white";
  earth.style.display = "block";

}

function addTime() {
  let timeToAdd = parseInt(document.getElementById("input-number").value);


  if (timeToAdd > 9 && timeToAdd < 121) {
    console.log(timeToAdd)
    timeToAdd = timeToAdd * 60
    levelUp(timeToAdd);
    document.getElementById("input-number").style.backgroundColor = "#9dff89";
    document.getElementById("input-number").value = "";
    document.getElementById("input-number-button").style.backgroundColor = "#9dff89";
    document.getElementById("timeAlert").style.display = "none";
  } else {
    document.getElementById("input-number").style.backgroundColor = "#ff0000b9";
    document.getElementById("input-number-button").style.backgroundColor = "#ff0000b9";
    document.getElementById("timeAlert").style.display = "block";
  }

}




counting();
hideFireworks()
