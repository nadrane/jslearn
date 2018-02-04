// helper - stackoverflow.com/a/25352300/6372580
function isAlphaNumeric(str) {
  const len = str.length;
  let code;

  for (let i = 0; i < len; i += 1) {
    code = str.charCodeAt(i);
    if (!(code > 47 && code < 58) && // numeric (0-9)
        !(code > 64 && code < 91) && // upper alpha (A-Z)
        !(code > 96 && code < 123)) { // lower alpha (a-z)
      return false;
    }
  }
  return true;
}

const button = document.getElementById('access-btn');
const warn = document.getElementById('access-warn');
const userInput = document.getElementById('user');

button.addEventListener('click', (event) => {
  const currentInput = userInput.value;
  if (!isAlphaNumeric(currentInput)) {
    warn.innerText = 'Invalid username';
    event.preventDefault();
  }
});

userInput.addEventListener('input', () => {
  // remove warning when text changes
  if (warn.innerText.length !== 0) {
    warn.innerText = '';
  }
});
