document.getElementById('myForm').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        alert('Form submitted successfully!');
    }
});

function validateForm() {
    let isValid = true;
    
    isValid = validateField('fullName', /^[A-Za-z\s]{2,}$/, 'nameError', 'Invalid name') && isValid;
    isValid = validateField('email', /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'emailError', 'Invalid email') && isValid;
    isValid = validateField('phone', /^\d{10,15}$/, 'phoneError', 'Invalid phone number') && isValid;
    isValid = validateField('password', /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/, 'passwordError', 'Password must be at least 8 characters with uppercase, lowercase, and number') && isValid;
    
    return isValid;
}

function validateField(fieldId, regex, errorId, errorMsg) {
    const field = document.getElementById(fieldId);
    const error = document.getElementById(errorId);
    const isValid = regex.test(field.value);
    
    field.classList.toggle('invalid', !isValid);
    error.textContent = isValid ? '' : errorMsg;
    return isValid;
}

// Real-time validation
['fullName', 'email', 'phone', 'password'].forEach(field => {
    document.getElementById(field).addEventListener('input', function() {
        validateField(field, getRegex(field), `${field}Error`, getErrorMessage(field));
    });
});

function getRegex(fieldId) {
    switch(fieldId) {
        case 'fullName': return /^[A-Za-z\s]{2,}$/;
        case 'email': return /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        case 'phone': return /^\d{10,15}$/;
        case 'password': return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    }
}

function getErrorMessage(fieldId) {
    switch(fieldId) {
        case 'fullName': return 'Only letters and spaces allowed';
        case 'email': return 'Invalid email format';
        case 'phone': return '10-15 digits required';
        case 'password': return 'Need 8+ chars with uppercase, lowercase, number';
    }
}
