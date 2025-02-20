function addEntry() {
  const date = document.getElementById('date').value;
  const entryText = document.getElementById('entry').value;

  if (date && entryText) {
    const diaryEntries = document.getElementById('diary-entries');
    const entry = document.createElement('div');
    entry.classList.add('entry');

    const entryDate = document.createElement('h3');
    entryDate.textContent = `日期: ${date}`;

    const entryContent = document.createElement('p');
    entryContent.textContent = entryText;

    entry.appendChild(entryDate);
    entry.appendChild(entryContent);

    diaryEntries.appendChild(entry);

    // Clear input fields after submitting
    document.getElementById('date').value = '';
    document.getElementById('entry').value = '';
  } else {
    alert('请填写日期和日记内容');
  }
}
