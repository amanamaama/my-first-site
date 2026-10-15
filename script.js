let clicks = 0;

document.getElementById("myButton").onclick = function () {
  clicks = clicks + 1;
  document.getElementById("count").textContent = "Clicks: " + clicks;

  if (clicks >= 10) {
    document.getElementById("message").textContent = "Wow, 10 clicks! 🎉";
  }
};

document.getElementById("resetButton").onclick = function () {
  clicks = 0;
  document.getElementById("message").textContent = "";
  document.getElementById("count").textContent = "Clicks: " + clicks;
};

document.getElementById("greetButton").onclick = function () {
  let name = document.getElementById("nameInput").value;
  document.getElementById("greeting").textContent = "Hello, " + name + "! Welcome!";
};

document.getElementById("addButton").onclick = function () {
  let task = document.getElementById("taskInput").value;

  if (task === "") {
    return;
  }

  let item = document.createElement("li");
  item.textContent = task + " ";

  let deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    item.remove();
  };

  item.appendChild(deleteButton);
  document.getElementById("taskList").appendChild(item);
  document.getElementById("taskInput").value = "";
};

document.getElementById("taskInput").onkeydown = function (event) {
  if (event.key === "Enter") {
    document.getElementById("addButton").click();
  }
};

function showSkills(skills) {
  let list = document.getElementById("skillList");
  list.innerHTML = "";

  for (let i = 0; i < skills.length; i++) {
    let li = document.createElement("li");
    li.textContent = skills[i].name;
    list.appendChild(li);
  }
}

fetch("https://my-first-api-s0ly.onrender.com/skills")
  .then(function (response) {
    return response.json();
  })
  .then(function (skills) {
    showSkills(skills);
  })
  .catch(function () {
    document.getElementById("skillList").textContent = "The server is not running.";
  });

document.getElementById("addSkillButton").onclick = function () {
  let newSkill = document.getElementById("skillInput").value;

  if (newSkill === "") {
    return;
  }

  fetch("https://my-first-api-s0ly.onrender.com/skills", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: newSkill })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (skills) {
      showSkills(skills);
      document.getElementById("skillInput").value = "";
    });
};

let person = {
  name: "Aman",
  age: 20,
  country: "Ethiopia",
  learning: "Full Stack Web Development"
};

let card = document.getElementById("profileCard");
card.innerHTML =
  "<p>Name: " + person.name + "</p>" +
  "<p>Age: " + person.age + "</p>" +
  "<p>Country: " + person.country + "</p>" +
  "<p>Learning: " + person.learning + "</p>";

document.getElementById("jokeButton").onclick = function () {
  fetch("https://official-joke-api.appspot.com/random_joke")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      document.getElementById("joke").textContent = data.setup + " " + data.punchline;
    });
};

document.getElementById("weatherButton").onclick = function () {
  let city = document.getElementById("cityInput").value;
  let result = document.getElementById("weatherResult");

  if (city === "") {
    return;
  }

  result.textContent = "Loading...";

  fetch("https://wttr.in/" + encodeURIComponent(city) + "?format=j1")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      let now = data.current_condition[0];
      result.innerHTML =
        "<p>City: " + city + "</p>" +
        "<p>Temperature: " + now.temp_C + " °C</p>" +
        "<p>Feels like: " + now.FeelsLikeC + " °C</p>" +
        "<p>Weather: " + now.weatherDesc[0].value + "</p>" +
        "<p>Humidity: " + now.humidity + "%</p>";
    })
    .catch(function () {
      result.textContent = "Could not get the weather. Check the city name.";
    });
};