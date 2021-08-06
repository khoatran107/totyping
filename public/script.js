const paragraphs = [
  'You are the true master of death, because the true master does not seek to run away from Death. He accepts that he must die, and understands that there are far, far worse things in the living world than dying.',
  'There are two places on Earth that serve as canaries in the coal mine - regions that are especially sensitive to the effects of global warming. The first is the Arctic. The second is the Antarctic. In both of these frozen realms, scientists are seeing faster changes and earlier more dramatic effects of climate change than anywhere else on Earth.',
  'Let me put it this way, Mr. Amor. The 9000 series is the most reliable computer ever made. No 9000 computer has ever made a mistake or distorted information. We are all, by any practical definition of the words, foolproof and incapable of error.',
];

let paraContent = paragraphs[Math.floor(Math.random() * paragraphs.length)];

const para = document.querySelector('p');

const newParaText = paraContent.split(' ').map((word) => {
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
let current = '';
let curIdx = 0;
para.children[curIdx].className = 'typing';
const wrongWords = [];

let startTime = 0;
let endTime = 0;

function printResult() {
  endTime = Date.now();
  let wpm = 0;
  const accuracy = (100 - (wrongWords.length * 100.0) / wordNum).toFixed(2);
  if (accuracy > 20)
    wpm = parseInt(
      ((wordNum - wrongWords.length) * 60000) / (endTime - startTime)
    );
  document.getElementById('wpm-result').textContent += ` ${wpm} WPM`;
  document.getElementById('accuracy-result').textContent += ` ${accuracy}%`;
  const table = document.querySelector('table');
  if (wrongWords.length === 0) return;
  for (wrongWord of wrongWords) {
    const row = document.createElement('tr');
    const col = document.createElement('td');
    col.textContent = wrongWord.wrong;
    const col2 = document.createElement('td');
    col2.textContent = wrongWord.right;
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

  if (curIdx >= wordNum && !(e.keyCode >= 112 && e.keyCode <= 123)) {
    e.preventDefault();
    return;
  }

  if (!(e.keyCode >= 112 && e.keyCode <= 123)) e.preventDefault();

  if (e.keyCode === 32) {
    if (current.split('').join() === '') {
      current = '';
      return;
    }
    if (current !== para.children[curIdx].textContent) {
      para.children[curIdx].className = 'wrong';
      wrongWords.push({
        right: para.children[curIdx].textContent,
        wrong: current,
      });
    } else {
      para.children[curIdx].className = '';
    }
    current = '';
    curIdx++;
    if (curIdx >= wordNum) {
      printResult();
      current = '';
    } else para.children[curIdx].className = 'typing';
  } else if (e.key.length === 1) {
    current += e.key;
    if (
      current !== para.children[curIdx].textContent.substr(0, current.length)
    ) {
      para.children[curIdx].className = 'wrong';
    } else {
      para.children[curIdx].className = 'typing';
      if (
        current === para.children[curIdx].textContent &&
        curIdx === wordNum - 1
      ) {
        printResult();
        current = '';
        para.children[curIdx].className = '';
        curIdx++;
      }
    }
  } else if (e.keyCode === 8) {
    current = current.slice(0, -1);
    if (
      current !== para.children[curIdx].textContent.substr(0, current.length)
    ) {
      para.children[curIdx].className = 'wrong';
    } else {
      para.children[curIdx].className = 'typing';
    }
  }

  input.value = current;
});
