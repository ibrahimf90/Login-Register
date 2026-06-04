/*
  ============================================================
  script.js — Login & Register Page
  ============================================================
  Sections:
    1. Get elements from the DOM
    2. Set wrapper height on load
    3. Open / close animation
    4. Password match validation
    5. Phone number validation
    6. Login form submit
    7. Register form submit
  ============================================================
*/
const wrapper = document.getElementById("wrapper");
const loginPanel = document.getElementById("loginPanel");
const registerPanel = document.getElementById("registerPanel");
const openRegister = document.getElementById("openRegister");
const goToLogin = document.getElementById("goToLogin");
const regPassword = document.getElementById("reg-password");
const regConfirm = document.getElementById("reg-confirm");
const confirmError = document.getElementById("confirm-error");
const regPhone = document.getElementById("reg-phone");

function setWrapperHeight(panel) {
  wrapper.style.height = panel.offsetHeight + "px";
}
setWrapperHeight(loginPanel);

openRegister.addEventListener("click", function () {
  wrapper.classList.add("register-open");
  setTimeout(function () {
    setWrapperHeight(registerPanel);
  }, 0);
});

goToLogin.addEventListener("click", function () {
  wrapper.classList.remove("register-open");
  setTimeout(function () {
    setWrapperHeight(loginPanel);
  }, 0);
});

function passwordsMatch() {
  return regPassword.value === regConfirm.value;
}

function showPasswordError(show) {
  confirmError.style.display = show ? "block" : "none";
}

regConfirm.addEventListener("input", function () {
  if (regConfirm.value.length > 0) {
    showPasswordError(!passwordsMatch());
  } else {
    showPasswordError(false); /* field is empty — hide error */
  }
});
regPassword.addEventListener("input", function () {
  if (regConfirm.value.length > 0) {
    showPasswordError(!passwordsMatch());
  }
});

function isValidPhone(phone) {
  const cleaned = phone.replace(/\s/g, "");
  return /^\+?[0-9]{7,15}$/.test(cleaned);
}

regPhone.addEventListener("input", function () {
  let phoneError = document.getElementById("phone-error");

  if (!phoneError) {
    phoneError = document.createElement("span");
    phoneError.id = "phone-error";
    phoneError.className = "error-msg";
    phoneError.textContent = "Enter a valid phone number";
    regPhone.parentNode.appendChild(phoneError);
  }

  if (regPhone.value.length > 0 && !isValidPhone(regPhone.value)) {
    phoneError.style.display = "block"; /* show error */
  } else {
    phoneError.style.display = "none"; /* hide error */
  }
});

loginPanel.addEventListener("submit", function (event) {
  event.preventDefault();
  const emailValue = document.getElementById("email").value;
  const passwordValue = document.getElementById("password").value;
  const rememberMe = document.querySelector(
    '.remember input[type="checkbox"]',
  ).checked;
  console.log("Login attempt:", {
    email: emailValue,
    password: passwordValue,
    rememberMe: rememberMe,
  });
  alert("Login submitted! Check the browser console (F12).");
});
registerPanel.addEventListener("submit", function (event) {
  event.preventDefault();
  let hasErrors = false;
  if (!passwordsMatch()) {
    showPasswordError(true);
    hasErrors = true;
  }
  const phoneValue = regPhone.value;
  if (!isValidPhone(phoneValue)) {
    let phoneError = document.getElementById("phone-error");
    if (!phoneError) {
      phoneError = document.createElement("span");
      phoneError.id = "phone-error";
      phoneError.className = "error-msg";
      phoneError.textContent = "Enter a valid phone number";
      regPhone.parentNode.appendChild(phoneError);
    }
    phoneError.style.display = "block";
    hasErrors = true;
  }

  if (hasErrors) return;
  const formData = {
    firstName: document.getElementById("reg-firstname").value,
    lastName: document.getElementById("reg-lastname").value,
    email: document.getElementById("reg-email").value,
    phone: document.getElementById("reg-phone").value,
    dob: document.getElementById("reg-dob").value,
    gender: document.querySelector('input[name="gender"]:checked')?.value,
    password: document.getElementById("reg-password").value,
  };
  console.log("Register attempt:", formData);
  alert("Account created! Check the browser console (F12).");
});
