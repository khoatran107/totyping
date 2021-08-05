const para = document.querySelector('p');

const newParaText = para.textContent
  .split(' ')
  .map((word) => `<span>${word}</span> `);

para.innerHTML = '';

for (word of newParaText) para.innerHTML += word;

const wordNum = para.children.length;
const input = document.querySelector('input[type="text"]');
const layover = document.querySelector('div.layover');
let current = '';
let curIdx = 0;
para.children[curIdx].style.background = '#aaa';
const wrongWords = [];

let startTime = 0;
let endTime = 0;
input.addEventListener('keydown', (e) => {
  if (startTime === 0)
    startTime = Date.now() / 1000;
  if (curIdx >= wordNum)
    return;
  if (e.keyCode === 32) {
    if (current.split('').join() === '') {
      current = '';
      return;
    }
    if (current !== para.children[curIdx].textContent) {
      para.children[curIdx].style.background = '#f00';
      wrongWords.push({
        'true': para.children[curIdx].textContent,
        'false': current
      });
    }
    else para.children[curIdx].style.background = '#fff';
    input.value = '';
    current = '';
    curIdx++;
    if (curIdx >= wordNum) {
      console.log('Done');
      input.setAttribute('readonly', true);
      return;
    }
    para.children[curIdx].style.background = '#aaa';
    return;
  }
  if (input.value === ' ') input.value = '';
});

input.addEventListener('keyup', () => {
  if (curIdx >= wordNum) {
    if (endTime == 0) {
      endTime = Date.now() / 1000;
      const wpm = parseInt(wordNum * 60 / (endTime - startTime));
      document.getElementById('result').textContent += ` ${wpm} WPM`;
      const table = document.querySelector('table');
      for (wrongWord of wrongWords) {
        const row = document.createElement('tr');
        const col = document.createElement('td');
        col.textContent = wrongWord.false;
        const col2 = document.createElement('td');
        col2.textContent = wrongWord.true;
        row.appendChild(col);
        row.appendChild(col2);
        table.appendChild(row);
      }
    }
    return;
  }
  if (input.value === ' ') input.value = '';
  current = input.value;
  if (
    current !== para.children[curIdx].textContent.substr(0, current.length)
  ) {
    para.children[curIdx].style.background = '#f00';
  } else {
    para.children[curIdx].style.background = '#aaa';
  }
});
