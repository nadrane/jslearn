const button = document.getElementById('access-btn');
const warn = document.getElementById('access-warn');
const userInput = document.getElementById('user');

// validate username submitted
button.addEventListener('click', (event) => {
  const usermatch = users.find(user => user.handle === document.getElementById('user').value);
  if (!usermatch) {
    warn.innerText = "User doesn't exist";
    event.preventDefault();
  } else {
    document.getElementById('user_id').value = usermatch.id;
  }
});

userInput.addEventListener('input', () => {
  // remove warning when text is 
  if (warn.innerText.length !== 0) {
    warn.innerText = '';
  }
});
