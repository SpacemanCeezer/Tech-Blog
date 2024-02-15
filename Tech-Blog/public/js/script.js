const validateSignupForm = () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username.trim() === '' || password.trim() === '') {
    alert('Username and password are required.');
    return false;
  }

  return true;
};

const validateLoginForm = () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username.trim() === '' || password.trim() === '') {
    alert('Username and password are required.');
    return false;
  }

  return true;
};

const signupForm = document.getElementById('signup-form');
if (signupForm) {
  signupForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validateSignupForm()) {
      return;
    }

    const formData = new FormData(signupForm);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await fetch('/signup', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      window.location.href = '/dashboard';
    } catch (err) {
      console.error(err);
      alert('Failed to sign up. Please try again.');
    }
  });
}

const loginForm = document.getElementById('login-form');
if (loginForm) {
  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!validateLoginForm()) {
      return;
    }

    const formData = new FormData(loginForm);
    const username = formData.get('username');
    const password = formData.get('password');

    try {
      const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }

      window.location.href = '/dashboard';
    } catch (err) {
      console.error(err);
      alert('Failed to log in. Please try again.');
    }
  });
}
