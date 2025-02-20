async function analyzeConflict() {
  const button = document.querySelector("button"); // 获取按钮
  const resultDiv = document.getElementById("result"); // 获取结果展示区域

  // 🔹 1. 禁用按钮 & 改变颜色
  button.disabled = true;
  button.style.backgroundColor = "#ccc"; // 变浅色
  button.style.cursor = "not-allowed"; // 禁止点击
  button.innerText = "处理中..."; // 按钮文字变成“处理中”

  // 🔹 2. 显示“正在连接”状态
  resultDiv.innerText = "🔄 正在与您的专属情感分析家进行连接，请耐心等待...";
  resultDiv.style.color = "blue"; // 变成蓝色
  resultDiv.style.fontWeight = "bold";

  try {
    const inputA = document.getElementById("inputA").value.trim();
    const inputB = document.getElementById("inputB").value.trim();

    if (!inputA || !inputB) {
      throw new Error("请输入情侣双方的观点！");
    }

    const response = await fetch("https://ai-couple-mediator-production.up.railway.app/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inputA, inputB }),
    });

    if (!response.ok) {
      throw new Error("服务器返回错误，请稍后重试！");
    }

    const data = await response.json();

    // 🔹 3. 显示 AI 结果
    resultDiv.innerText = "💬 AI 调解结果：" + data.message;
    resultDiv.style.color = "black"; // 变回黑色
    resultDiv.style.fontWeight = "normal";
  } catch (error) {
    console.error("请求失败:", error);
    resultDiv.innerText = "❌ " + error.message;
    resultDiv.style.color = "red"; // 变成红色
  }

  // 🔹 4. 恢复按钮状态
  button.disabled = false;
  button.style.backgroundColor = "blue"; // 变回原色
  button.style.cursor = "pointer"; // 允许点击
  button.innerText = "生成调解方案"; // 变回原来的文字
}
