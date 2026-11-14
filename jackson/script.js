const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");
const themeToggle = document.getElementById("theme-toggle");
const yearElement = document.getElementById("year");
const greeting = document.getElementById("greeting");

menuToggle.addEventListener("click", function () {
  navMenu.classList.toggle("open");
});

function applyTheme(theme) {
  document.body.classList.toggle("dark", theme === "dark");
  themeToggle.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
}

function loadTheme() {
  try {
    return localStorage.getItem("theme") || "light";
  } catch (error) {
    return "light";
  }
}

function saveTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch (error) {
    return;
  }
}

applyTheme(loadTheme());

themeToggle.addEventListener("click", function () {
  const nextTheme = document.body.classList.contains("dark") ? "light" : "dark";
  saveTheme(nextTheme);
  applyTheme(nextTheme);
});

yearElement.textContent = new Date().getFullYear();

if (greeting) {
  const hour = new Date().getHours();
  let part = "Good evening";
  if (hour < 12) {
    part = "Good morning";
  } else if (hour < 18) {
    part = "Good afternoon";
  }
  greeting.textContent = part + "! Welcome to My Website";
}

const form = document.getElementById("contact-form");

if (form) {
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const status = document.getElementById("form-status");

  function setError(input, message) {
    document.getElementById(input.id + "-error").textContent = message;
    input.classList.toggle("invalid", message !== "");
  }

  function validate() {
    let valid = true;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nameInput.value.trim().length < 2) {
      setError(nameInput, "Please enter your name.");
      valid = false;
    } else {
      setError(nameInput, "");
    }

    if (!emailPattern.test(emailInput.value.trim())) {
      setError(emailInput, "Please enter a valid email address.");
      valid = false;
    } else {
      setError(emailInput, "");
    }

    if (messageInput.value.trim().length < 10) {
      setError(messageInput, "Your message must be at least 10 characters.");
      valid = false;
    } else {
      setError(messageInput, "");
    }

    return valid;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    status.textContent = "";
    if (validate()) {
      status.textContent = "Thank you, " + nameInput.value.trim() + "! Your message was sent.";
      form.reset();
    }
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const skills = document.querySelectorAll(".skill");

filterButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const filter = button.dataset.filter;
    filterButtons.forEach(function (item) {
      item.classList.toggle("active", item === button);
    });
    skills.forEach(function (skill) {
      const show = filter === "all" || skill.dataset.category === filter;
      skill.classList.toggle("hidden", !show);
    });
  });
});