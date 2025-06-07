const patterns = [];

function setPattern(name, characters) {
  const container = document.getElementById('pattern-container');

  const id = "pattern_" + patterns.length;
  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  checkbox.type = "checkbox";
  checkbox.id = id;
  checkbox.checked = true;

  label.appendChild(checkbox);
  label.append(` ${name}`);
  container.appendChild(label);

  patterns.push({ id, characters });
}

function generateRandomString(length, charset) {
  let result = '';
  const n = charset.length;
  for (let i = 0; i < length; i++) {
    result += charset.charAt(Math.floor(Math.random() * n));
  }
  return result;
}

document.getElementById('generate').addEventListener('click', () => {
  const count = parseInt(document.getElementById('count').value, 10);
  const length = parseInt(document.getElementById('length').value, 10);

  let charset = '';
  for (const pattern of patterns) {
    const checkbox = document.getElementById(pattern.id);
    if (checkbox.checked) {
      charset += pattern.characters;
    }
  }

  const resultArea = document.getElementById('result');
  if (charset === '') {
    resultArea.textContent = 'エラー: 文字種を少なくとも1つ選択してください。';
    return;
  }

  if (isNaN(count) || count < 1 || count > 1000) {
    resultArea.textContent = 'エラー: 個数は1〜1000の整数で指定してください。';
    return;
  }
  if (isNaN(length) || length < 1 || length > 100) {
    resultArea.textContent = 'エラー: 文字数は1〜100の整数で指定してください。';
    return;
  }

  let output = '';
  for (let i = 0; i < count; i++) {
    output += generateRandomString(length, charset) + '\n';
  }
  resultArea.textContent = output.trim();
});

// === 使用する文字種の定義 ===
setPattern("大文字（A-Z）", "ABCDEFGHIJKLMNOPQRSTUVWXYZ");
setPattern("小文字（a-z）", "abcdefghijklmnopqrstuvwxyz");
setPattern("数字（0-9）", "0123456789");
// 例：setPattern("記号", "!@#$%^&*()");
