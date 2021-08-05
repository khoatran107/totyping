const para = document.querySelector('p');

const newParaText = para.textContent
  .split(' ')
  .map((word) => {
    const span = document.createElement('span');
    span.textContent = word;
    return span;
  });

para.innerHTML = '';

for (word of newParaText) {
  para.appendChild(word);
  para.innerHTML += ' ';
}

const wordNum = para.children.length;
const input = document.querySelector('input[type="text"]');
const layover = document.querySelector('div.layover');
let current = '';
let curIdx = 0;
para.children[curIdx].style.background = '#aaa';
const wrongWords = [];

let startTime = 0;
let endTime = 0;

function printResult() {
  endTime = Date.now();
  const wpm = parseInt(wordNum * 60000 / (endTime - startTime));
  document.getElementById('result').textContent += ` ${wpm} WPM`;
  const table = document.querySelector('table');
  if (wrongWords.length === 0) return;
  for (wrongWord of wrongWords) {
    const row = document.createElement('tr');
    const col = document.createElement('td');
    col.textContent = wrongWord.false;
    const col2 = document.createElement('td');
    col2.textContent = wrongWord.true;
    row.appendChild(col);
    row.appendChild(col2);
    table.appendChild(row);
    table.classList.remove(['hidden']);
  }
}

input.addEventListener('keydown', (e) => {

  if (startTime === 0) {
    startTime = Date.now();
    input.setAttribute('placeholder', '');
  }

  if (curIdx >= wordNum) {
    return;
  }
  if (!(e.keyCode >= 112 && e.keyCode <= 123))
    e.preventDefault();

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
    } else para.children[curIdx].style.background = '#fff';
    current = '';
    curIdx++;
    if (curIdx >= wordNum) {
      printResult();
      current = '';
      input.setAttribute('readonly', true);
    } else 
      para.children[curIdx].style.background = '#aaa';
  } else if (e.key.length === 1) {
    current += e.key;
    if (current !== para.children[curIdx].textContent.substr(0, current.length)) {
      para.children[curIdx].style.background = '#f00';
    } else {
      para.children[curIdx].style.background = '#aaa';
      if (current === para.children[curIdx].textContent && curIdx === wordNum - 1) {
        printResult();
        current = '';
        input.setAttribute('readonly', true);
      }
    }

  } else if (e.keyCode === 8) {
    current = current.slice(0, -1);
  }

  input.value = current;
});
