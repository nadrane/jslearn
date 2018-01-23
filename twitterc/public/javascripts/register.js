const button = document.getElementById('user-btn');
button.addEventListener('click', (event) => {
  const usermatch = users.find(user => user.handle === document.getElementById('user').value);
  if (usermatch) {
    alert('already taken');
    event.preventDefault();
  }
});
