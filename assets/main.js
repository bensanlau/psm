const password = document.getElementById("password");
const conditions = [...document.getElementById("conditions").children];

conditions.forEach((condition) => {
  if (condition.dataset.condition === "❌") {
    condition.innerHTML = `❌ ${condition.innerHTML}`;
  }
});

function validateConditions(pw) {
  console.log(pw);
}

password.addEventListener("input", () => {
  // 1. Get value of password
  const pw = password.value;

  // 2. For every keystroke, check against list of conditions
  validateConditions(pw);
});
