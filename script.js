document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('validationForm');
    
    // Real-time validation
    const fields = ['fullName', 'email', 'phone', 'password'];
    fields.forEach(field => {
        document.getElementById(field).addEventListener('input', function() {
            validateField(this.id);
        });
    });

    // Form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            alert('Form submitted successfully!');
            form.reset();
            fields.forEach(field => {
                document.getElementById(field).classList.remove('invalid');
            });
        }
    });
});

function validateForm() {
    return [
        validateField('fullName'),
        validateField('email'),
        validateField('phone'),
        validateField('password')
    ].every(result => result);
}

function validateField(fieldId) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(`${fieldId}Error`);
    let isValid = false;
    let errorMessage = '';

    switch(fieldId) {
        case 'fullName':
            isValid = /^[A-Za-z\s]{2,}$/.test(field.value.trim());
            errorMessage = 'Only letters and spaces allowed';
            break;
            
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value);
            errorMessage = 'Invalid email format';
            break;
            
        case 'phone':
            isValid = /^\d{10,15}$/.test(field.value);
            errorMessage = '10-15 digits required';
            break;
            
        case 'password':
            isValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(field.value);
            errorMessage = '8+ chars with uppercase, lowercase, and number';
            break;
    }

    field.classList.toggle('invalid', !isValid);
    errorElement.textContent = isValid ? '' : errorMessage;
    return isValid;
}
