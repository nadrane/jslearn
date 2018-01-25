const button = document.getElementById('access-btn');
const warn = document.getElementById('access-warn');
const userInput = document.getElementById('user');

// validate user exists
button.addEventListener('click', (event) => {
  const usermatch = users.find(user => user.handle === userInput.value);
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
