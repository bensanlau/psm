const password = document.getElementById("password");
const conditions = [...document.getElementById("conditions").children];
const conditionSpecialChar = document.getElementById("condition-special-char");
const conditionUppercase = document.getElementById("condition-upper-char");
const conditionLowercase = document.getElementById("condition-lower-char");

function updateConditions() {
  conditions.forEach((condition) => {
    const status = condition.dataset.valid === "true";
    condition.querySelector("span").innerHTML = status ? "✅ " : "❌ ";
    condition.classList.toggle("text-green-500", status);
  });
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
});

updateConditions();
