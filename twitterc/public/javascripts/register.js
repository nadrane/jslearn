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

const button = document.getElementById('user-btn');
const warn = document.getElementById('access-warn');

button.addEventListener('click', (event) => {
  const currentInput = document.getElementById('user');
  const usermatch = users.find(user => user.handle === currentInput);
  if (usermatch) {
    alert('already taken');
    event.preventDefault();
  } else if (isAlphaNumeric()) {
    //
  }
});

