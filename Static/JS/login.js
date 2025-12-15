// Simplified Login Page JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Get form elements
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('passwordToggle');
    const loginBtn = document.getElementById('loginBtn');
    const formError = document.getElementById('formError');
    const formSuccess = document.getElementById('formSuccess');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    const resetModal = document.getElementById('resetModal');
    const closeResetModal = document.getElementById('closeResetModal');
    const cancelReset = document.getElementById('cancelReset');
    const resetForm = document.getElementById('resetForm');

    // Sample user credentials
    const sampleUsers = {
        'admin@cpms.com': {
            password: 'admin123',
            role: 'admin',
            redirect: 'project-manager/index.html'
        },
        'manager@cpms.com': {
            password: 'manager123',
            role: 'project-manager',
            redirect: 'project-manager/index.html'
        },
        'engineer@cpms.com': {
            password: 'engineer123',
            role: 'site-engineer',
            redirect: 'site-engineer/index.html'
        }
    };

    // Validation functions
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 6;
    }

    // Show/hide form messages
    function showFormMessage(type, message) {
        hideFormMessages();

        if (type === 'error') {
            document.getElementById('errorText').textContent = message;
            formError.style.display = 'flex';
        } else if (type === 'success') {
            formSuccess.style.display = 'flex';
        }
    }

    function hideFormMessages() {
        formError.style.display = 'none';
        formSuccess.style.display = 'none';
    }

    // Input validation with visual feedback
    emailInput.addEventListener('input', function () {
        const email = this.value.trim();
        if (email && validateEmail(email)) {
            this.style.borderColor = '#B7B89F';
        } else if (email) {
            this.style.borderColor = '#dc2626';
        } else {
            this.style.borderColor = '#CBCBCB';
        }
    });

    passwordInput.addEventListener('input', function () {
        const password = this.value;
        if (password && validatePassword(password)) {
            this.style.borderColor = '#B7B89F';
        } else if (password) {
            this.style.borderColor = '#dc2626';
        } else {
            this.style.borderColor = '#CBCBCB';
        }
    });

    // Password toggle functionality
    passwordToggle.addEventListener('click', function () {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        const icon = this.querySelector('i');
        if (type === 'text') {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });

    // Form submission
    loginForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const email = emailInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = document.getElementById('rememberMe').checked;

        // Hide previous messages
        hideFormMessages();

        // Basic validation
        if (!email) {
            showFormMessage('error', 'Please enter your email address');
            emailInput.focus();
            return;
        }

        if (!validateEmail(email)) {
            showFormMessage('error', 'Please enter a valid email address');
            emailInput.focus();
            return;
        }

        if (!password) {
            showFormMessage('error', 'Please enter your password');
            passwordInput.focus();
            return;
        }

        if (!validatePassword(password)) {
            showFormMessage('error', 'Password must be at least 6 characters long');
            passwordInput.focus();
            return;
        }

        // Show loading state
        loginBtn.classList.add('loading');

        // Simulate API call
        setTimeout(() => {
            const user = sampleUsers[email.toLowerCase()];

            if (user && user.password === password) {
                // Success
                showFormMessage('success');

                // Store login state if remember me is checked
                if (rememberMe) {
                    localStorage.setItem('cpms_remember', 'true');
                    localStorage.setItem('cpms_email', email);
                }

                // Redirect after delay
                setTimeout(() => {
                    window.location.href = user.redirect;
                }, 1500);

            } else {
                // Error
                loginBtn.classList.remove('loading');
                showFormMessage('error', 'Invalid email or password. Please try again.');
            }
        }, 1500);
    });

    // Forgot password functionality
    forgotPasswordLink.addEventListener('click', function (e) {
        e.preventDefault();
        openResetModal();
    });

    // Modal functions
    function openResetModal() {
        resetModal.classList.add('show');
        resetModal.style.display = 'flex';
    }

    function closeResetModalFunc() {
        resetModal.classList.remove('show');
        setTimeout(() => {
            resetModal.style.display = 'none';
        }, 300);
    }

    // Modal event listeners
    closeResetModal.addEventListener('click', closeResetModalFunc);
    cancelReset.addEventListener('click', closeResetModalFunc);

    // Close modal when clicking outside
    resetModal.addEventListener('click', function (e) {
        if (e.target === resetModal) {
            closeResetModalFunc();
        }
    });

    // Reset form submission
    resetForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const resetEmail = document.getElementById('resetEmail').value.trim();
        const sendResetBtn = document.getElementById('sendResetBtn');

        if (!resetEmail || !validateEmail(resetEmail)) {
            alert('Please enter a valid email address');
            return;
        }

        // Show loading
        sendResetBtn.textContent = 'Sending...';
        sendResetBtn.disabled = true;

        // Simulate sending reset email
        setTimeout(() => {
            sendResetBtn.textContent = 'Send Reset Link';
            sendResetBtn.disabled = false;
            alert('Password reset link has been sent to your email address.');
            closeResetModalFunc();
            resetForm.reset();
        }, 2000);
    });

    // Check for remembered login
    if (localStorage.getItem('cpms_remember') === 'true') {
        const rememberedEmail = localStorage.getItem('cpms_email');
        if (rememberedEmail) {
            emailInput.value = rememberedEmail;
            document.getElementById('rememberMe').checked = true;
        }
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && resetModal.classList.contains('show')) {
            closeResetModalFunc();
        }
    });

    // Auto-focus email input
    emailInput.focus();

    // Console log for demo purposes
    console.log('Demo Login Credentials:');
    console.log('Admin: admin@cpms.com / admin123');
    console.log('Manager: manager@cpms.com / manager123');
    console.log('Engineer: engineer@cpms.com / engineer123');
});