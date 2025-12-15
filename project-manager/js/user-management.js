// User Management JavaScript Functions

// Modal Functions
function openUserModal(userId = null) {
    const modal = document.getElementById('userModal');
    const modalTitle = document.getElementById('userModalTitle');
    const submitBtn = document.getElementById('userSubmitBtn');

    if (userId) {
        // Edit mode
        modalTitle.textContent = 'Edit User';
        submitBtn.textContent = 'Update User';
        // Load user data here
        loadUserData(userId);
    } else {
        // Create mode
        modalTitle.textContent = 'Add New User';
        submitBtn.textContent = 'Create User';
        // Clear form
        clearUserForm();
    }

    modal.classList.add('show');
    modal.style.display = 'flex';
}

function closeUserModal() {
    const modal = document.getElementById('userModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

function clearUserForm() {
    const form = document.getElementById('userForm');
    form.reset();

    // Clear all checkboxes
    const checkboxes = form.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}

function loadUserData(userId) {
    // This would typically load data from an API
    // For now, we'll use sample data
    const sampleUsers = {
        'user1': {
            firstName: 'Bekele',
            lastName: 'Mekonen',
            email: 'bekele.m@cpms.com',
            phone: '+251911234567',
            employeeId: 'ENG001',
            role: 'site-engineer',
            department: 'engineering',
            status: 'active',
            permissions: ['dashboard', 'tasks', 'requests']
        }
    };

    const userData = sampleUsers[userId];
    if (userData) {
        document.getElementById('firstName').value = userData.firstName;
        document.getElementById('lastName').value = userData.lastName;
        document.getElementById('email').value = userData.email;
        document.getElementById('phone').value = userData.phone;
        document.getElementById('employeeId').value = userData.employeeId;
        document.getElementById('userRole').value = userData.role;
        document.getElementById('userDepartment').value = userData.department;
        document.getElementById('userStatus').value = userData.status;

        // Set permissions
        userData.permissions.forEach(permission => {
            const checkbox = document.getElementById(`perm${permission.charAt(0).toUpperCase() + permission.slice(1)}`);
            if (checkbox) {
                checkbox.checked = true;
            }
        });
    }
}

// Form Submission
document.addEventListener('DOMContentLoaded', function () {
    const userForm = document.getElementById('userForm');

    if (userForm) {
        userForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect form data
            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                employeeId: document.getElementById('employeeId').value,
                role: document.getElementById('userRole').value,
                department: document.getElementById('userDepartment').value,
                status: document.getElementById('userStatus').value,
                permissions: []
            };

            // Collect permissions
            const permissionCheckboxes = document.querySelectorAll('.permission-item input[type="checkbox"]:checked');
            permissionCheckboxes.forEach(checkbox => {
                formData.permissions.push(checkbox.value);
            });

            // Validate required fields
            if (!formData.firstName || !formData.lastName || !formData.email || !formData.role || !formData.department) {
                alert('Please fill in all required fields.');
                return;
            }

            // Here you would typically send the data to your backend
            console.log('User data:', formData);

            // Show success message
            alert('User saved successfully!');

            // Close modal and refresh user list
            closeUserModal();
            // refreshUserList(); // This would refresh the user table
        });
    }

    // Close modal when clicking outside
    const modal = document.getElementById('userModal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === modal) {
                closeUserModal();
            }
        });
    }

    // Handle escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('userModal');
            if (modal && modal.classList.contains('show')) {
                closeUserModal();
            }
        }
    });
});

// Sample function to populate user table (you would replace this with real data)
function populateUserTable() {
    const tableBody = document.getElementById('userTableBody');
    if (!tableBody) return;

    const sampleUsers = [
        {
            id: 'user1',
            name: 'Bekele Mekonen',
            email: 'bekele.m@cpms.com',
            role: 'site-engineer',
            department: 'engineering',
            lastLogin: '2 hours ago',
            status: 'active'
        },
        {
            id: 'user2',
            name: 'Samuel Girma',
            email: 'samuel.g@cpms.com',
            role: 'project-manager',
            department: 'engineering',
            lastLogin: '1 day ago',
            status: 'active'
        },
        {
            id: 'user3',
            name: 'Lemlem Tadesse',
            email: 'lemlem.t@cpms.com',
            role: 'supervisor',
            department: 'construction',
            lastLogin: '3 days ago',
            status: 'inactive'
        }
    ];

    tableBody.innerHTML = sampleUsers.map(user => `
        <tr>
            <td><input type="checkbox" value="${user.id}"></td>
            <td>
                <div class="user-info">
                    <div class="user-avatar">${user.name.split(' ').map(n => n[0]).join('')}</div>
                    <div class="user-details">
                        <div class="user-name">${user.name}</div>
                        <div class="user-id">${user.id.toUpperCase()}</div>
                    </div>
                </div>
            </td>
            <td><span class="role-badge ${user.role}">${user.role.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}</span></td>
            <td>${user.department.charAt(0).toUpperCase() + user.department.slice(1)}</td>
            <td>${user.email}</td>
            <td>${user.lastLogin}</td>
            <td><span class="status-badge ${user.status}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn edit" onclick="openUserModal('${user.id}')" title="Edit User">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn ${user.status === 'active' ? 'deactivate' : 'activate'}" 
                            onclick="toggleUserStatus('${user.id}')" 
                            title="${user.status === 'active' ? 'Deactivate' : 'Activate'} User">
                        <i class="fas fa-${user.status === 'active' ? 'user-times' : 'user-check'}"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

function toggleUserStatus(userId) {
    // This would typically make an API call to toggle user status
    console.log('Toggling status for user:', userId);
    alert('User status updated successfully!');
    // populateUserTable(); // Refresh the table
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
    populateUserTable();
});