const password = document.getElementById("password");
const conditions = [...document.getElementById("conditions").children];
let lastStrengthColor;

function updateConditions() {
  conditions.forEach((condition) => {
    const status = condition.dataset.valid === "true";
    condition.querySelector("span").innerHTML = status ? "✅ " : "❌ ";
    condition.classList.toggle("text-green-600", status);
  });

  document.getElementById("submitButton").disabled = !conditions.every(
    (condition) => condition.dataset.valid === "true"
  );
}

function checkMinLength(pw) {
  document.getElementById("condition-min-num").dataset.valid =
    pw.length >= 8 ? true : false;
}

function checkHasNum(pw) {
  document.getElementById("condition-has-num").dataset.valid = pw.match(/\d+/g)
    ? true
    : false;
}

function checkSpecialChar(pw) {
  document.getElementById("condition-special-char").dataset.valid = pw.match(
    /[^A-Za-z0-9]/g
  )
    ? true
    : false;
}

function checkUppercase(pw) {
  document.getElementById("condition-upper-char").dataset.valid = pw.match(
    /[A-Z]/g
  )
    ? true
    : false;
}

function checkLowercase(pw) {
  document.getElementById("condition-lower-char").dataset.valid = pw.match(
    /[a-z]/g
  )
    ? true
    : false;
}

function updateStrength() {
  // 1. Collect number of passed conditions
  const passedConditionsLength = conditions.filter(
    (condition) => condition.dataset.valid === "true"
  ).length;

  // 2. For every passed condition, increase progress
  document.documentElement.style.setProperty(
    "--strength-bar-width",
    `${passedConditionsLength * 20}%`
  );

  let strengthLevel;
  switch (true) {
    case passedConditionsLength >= 5:
      strengthLevel = "Strong";
      color = "bg-green-600";
      break;
    case passedConditionsLength >= 2:
      strengthLevel = "Medium";
      color = "bg-yellow-500";
      break;
    default:
      strengthLevel = "Weak";
      color = "bg-red-600";
  }

  document.getElementById("strength-text").innerText = strengthLevel;
  if (lastStrengthColor !== color) {
    document.getElementById("strength-bar").classList.remove(lastStrengthColor);
  }
  document.getElementById("strength-bar").classList.add(color);
  lastStrengthColor = color;
}

// TODO: add debounce
password.addEventListener("input", () => {
  // 1. Get value of password
  const pw = password.value;

  // 2. For every keystroke, check against list of conditions
  checkMinLength(pw);
  checkHasNum(pw);
  checkSpecialChar(pw);
  checkUppercase(pw);
  checkLowercase(pw);

  updateConditions();
  updateStrength();
});

updateConditions();
