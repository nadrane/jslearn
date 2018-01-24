const button = document.getElementById('access-btn');
const warn = document.getElementById('access-warn');
const userInput = document.getElementById('user');

// validate username submitted
button.addEventListener('click', (event) => {
  const currentInput = userInput.value;
  const usermatch = users.find(user => user.handle === currentInput);
  if (!usermatch) {
    warn.innerText = "User doesn't exist";
    event.preventDefault();
  } else {
    // pass matched user id to server
    document.getElementById('user_id').value = usermatch.id;
  }
});

userInput.addEventListener('input', () => {
  // remove warning when text changes
  if (warn.innerText.length !== 0) {
    warn.innerText = '';
  }
});
