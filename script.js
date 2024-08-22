// script.js

// Sign Up Form Submission
document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const photo = document.getElementById('photo').files[0];

    if (!name || !email || !number || !photo) {
        alert('Please fill in all fields.');
        return;
    }

    if (isPhoneNumberTaken(number)) {
        alert('This phone number is already registered.');
        return;
    }

    // Save user data
    saveUser({ name, email, number, photo });

    // Clear form fields
    document.getElementById('signup-form').reset();
    
    // Hide signup form and show chat
    document.getElementById('auth').style.display = 'none';
    document.getElementById('chat').style.display = 'block';
    
    // Populate user select dropdown
    populateUserSelect();
});

// Sign In Form Submission
document.getElementById('signin-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevents the default form submission

    const email = document.getElementById('signin-email').value;
    const number = document.getElementById('signin-number').value;

    if (authenticateUser(email, number)) {
        // Hide sign-in form and show chat
        document.getElementById('auth').style.display = 'none';
        document.getElementById('chat').style.display = 'block';
        
        // Populate user select dropdown
        populateUserSelect();
    } else {
        alert('Invalid email or phone number.');
    }
});

function saveUser(user) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    alert('User signed up successfully!');
}

function isPhoneNumberTaken(number) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.number === number);
}

function authenticateUser(email, number) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email && user.number === number);
}

function populateUserSelect() {
    const userSelect = document.getElementById('user-select');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    userSelect.innerHTML = ''; // Clear existing options
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.email;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });
}

// Function to handle sending messages
document.getElementById('send').addEventListener('click', function() {
    const message = document.getElementById('message').value;
    const userEmail = document.getElementById('user-select').value;
    
    if (message && userEmail) {
        const messageItem = document.createElement('div');
        messageItem.classList.add('message', 'sent');
        messageItem.textContent = message;
        document.getElementById('message-list').appendChild(messageItem);
        document.getElementById('message').value = ''; // Clear the input field
    } else {
        alert('Please enter a message and select a user.');
    }
});

// Function to handle user search
document.getElementById('search').addEventListener('input', function() {
    const searchValue = document.getElementById('search').value.toLowerCase();
    const userSelect = document.getElementById('user-select');
    const users = JSON.parse(localStorage.getItem('users')) || [];

    userSelect.innerHTML = ''; // Clear existing options
    users.forEach(user => {
        if (user.name.toLowerCase().includes(searchValue)) {
            const option = document.createElement('option');
            option.value = user.email;
            option.textContent = user.name;
            userSelect.appendChild(option);
        }
    });
});

// Show Sign-In Form
document.getElementById('show-signin').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('signup-section').style.display = 'none';
    document.getElementById('signin-section').style.display = 'block';
});

// Show Sign-Up Form
document.getElementById('show-signup').addEventListener('click', function(event) {
    event.preventDefault();
    document.getElementById('signin-section').style.display = 'none';
    document.getElementById('signup-section').style.display = 'block';
});
