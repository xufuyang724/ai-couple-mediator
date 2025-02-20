async function analyzeConflict() {
  const inputA = document.getElementById("inputA").value;
  const inputB = document.getElementById("inputB").value;

  const response = await fetch("https://ai-couple-mediator-production.up.railway.app", {  // 修改为你的 Railway API URL
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ inputA, inputB }),
  });

  const data = await response.json();
  document.getElementById("result").innerText = data.message;
}
