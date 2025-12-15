// Dashboard Main JavaScript
class Dashboard {
    constructor() {
        this.init();
        this.loadData();
        this.setupEventListeners();
        this.updateDateTime();
        this.animateMetrics();
    }

    init() {
        // Initialize sidebar toggle
        this.sidebar = document.getElementById('sidebar');
        this.sidebarToggle = document.getElementById('sidebarToggle');
        this.taskModal = document.getElementById('taskModal');

        // Set current date
        this.updateDateTime();
        setInterval(() => this.updateDateTime(), 60000); // Update every minute
    }

    setupEventListeners() {
        // Sidebar toggle
        if (this.sidebarToggle) {
            this.sidebarToggle.addEventListener('click', () => {
                this.toggleSidebar();
            });
        }

        // Task form submission
        const taskForm = document.getElementById('taskForm');
        if (taskForm) {
            taskForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleTaskSubmission();
            });
        }

        // Weight input monitoring
        const weightInput = document.getElementById('taskWeight');
        if (weightInput) {
            weightInput.addEventListener('input', () => {
                this.updateWeightIndicator();
            });
        }

        // Close modal on outside click
        if (this.taskModal) {
            this.taskModal.addEventListener('click', (e) => {
                if (e.target === this.taskModal) {
                    this.closeTaskModal();
                }
            });
        }

        // Responsive sidebar handling
        this.handleResponsiveSidebar();
        window.addEventListener('resize', () => {
            this.handleResponsiveSidebar();
        });
    }

    toggleSidebar() {
        this.sidebar.classList.toggle('collapsed');
        localStorage.setItem('sidebarCollapsed', this.sidebar.classList.contains('collapsed'));
    }

    handleResponsiveSidebar() {
        if (window.innerWidth <= 768) {
            this.sidebar.classList.remove('collapsed');
            this.sidebar.classList.toggle('open');
        } else {
            this.sidebar.classList.remove('open');
            // Restore collapsed state from localStorage
            const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
            if (isCollapsed) {
                this.sidebar.classList.add('collapsed');
            }
        }
    }

    updateDateTime() {
        const now = new Date();
        const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        const dateString = now.toLocaleDateString('en-US', options);

        const currentDateElement = document.getElementById('currentDate');
        if (currentDateElement) {
            currentDateElement.textContent = dateString;
        }
    }

    loadData() {
        // Load dashboard data
        this.loadMetrics();
        this.loadActivities();
        this.loadApprovals();
    }

    loadMetrics() {
        // Simulate loading metrics with animation
        const metrics = {
            projectProgress: 73,
            activeEngineers: 8,
            pendingTasks: 12,
            dailyReports: 8
        };

        // Animate metric values
        Object.keys(metrics).forEach(key => {
            const element = document.getElementById(key);
            if (element) {
                this.animateValue(element, 0, metrics[key], 1500, key);
            }
        });
    }

    animateValue(element, start, end, duration, type) {
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOutCubic);

            if (type === 'projectProgress') {
                element.textContent = current + '%';
            } else {
                element.textContent = current;
            }

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    animateMetrics() {
        // Add entrance animations to metric cards
        const metricCards = document.querySelectorAll('.metric-card');
        metricCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
                card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }

    loadActivities() {
        const activities = [
            {
                icon: '✅',
                title: 'Task completed by Eng. Bekele M.',
                time: '2 hours ago',
                type: 'success'
            },
            {
                icon: '📋',
                title: 'Daily report submitted - Foundation work',
                time: '4 hours ago',
                type: 'info'
            },
            {
                icon: '⚠️',
                title: 'Material request pending approval',
                time: '6 hours ago',
                type: 'warning'
            },
            {
                icon: '👥',
                title: 'Attendance verified for Site A',
                time: '8 hours ago',
                type: 'info'
            },
            {
                icon: '💰',
                title: 'Financial statement approved',
                time: '1 day ago',
                type: 'success'
            }
        ];

        const activityList = document.getElementById('activityList');
        if (activityList) {
            activityList.innerHTML = activities.map(activity => `
                <div class="activity-item">
                    <div class="activity-icon ${activity.type}">
                        ${activity.icon}
                    </div>
                    <div class="activity-content">
                        <div class="activity-title">${activity.title}</div>
                        <div class="activity-time">${activity.time}</div>
                    </div>
                </div>
            `).join('');
        }
    }

    loadApprovals() {
        const approvals = [
            {
                icon: '📦',
                title: 'Cement delivery request - 50 bags',
                time: 'Submitted 2 hours ago',
                type: 'material'
            },
            {
                icon: '💰',
                title: 'Weekly payroll statement',
                time: 'Submitted 4 hours ago',
                type: 'financial'
            },
            {
                icon: '🔧',
                title: 'Equipment rental - Excavator',
                time: 'Submitted 6 hours ago',
                type: 'equipment'
            },
            {
                icon: '📊',
                title: 'Monthly expense report',
                time: 'Submitted 1 day ago',
                type: 'financial'
            },
            {
                icon: '📦',
                title: 'Steel bars procurement',
                time: 'Submitted 1 day ago',
                type: 'material'
            }
        ];

        const approvalList = document.getElementById('approvalList');
        if (approvalList) {
            approvalList.innerHTML = approvals.map(approval => `
                <div class="approval-item">
                    <div class="approval-icon ${approval.type}">
                        ${approval.icon}
                    </div>
                    <div class="approval-content">
                        <div class="approval-title">${approval.title}</div>
                        <div class="approval-time">${approval.time}</div>
                    </div>
                    <div class="approval-actions">
                        <button class="action-btn approve" onclick="approveItem('${approval.title}')">✓</button>
                        <button class="action-btn delete" onclick="rejectItem('${approval.title}')">✗</button>
                    </div>
                </div>
            `).join('');
        }
    }

    updateWeightIndicator() {
        const weightInput = document.getElementById('taskWeight');
        const weightFill = document.getElementById('weightFill');
        const totalWeightSpan = document.getElementById('totalWeight');

        if (weightInput && weightFill && totalWeightSpan) {
            const currentWeight = parseInt(weightInput.value) || 0;
            const existingWeight = 45; // Simulated existing task weights
            const totalWeight = existingWeight + currentWeight;

            weightFill.style.width = `${Math.min(totalWeight, 100)}%`;
            totalWeightSpan.textContent = totalWeight;

            // Change color based on total weight
            if (totalWeight > 100) {
                weightFill.style.background = 'var(--danger)';
                totalWeightSpan.style.color = 'var(--danger)';
            } else if (totalWeight > 90) {
                weightFill.style.background = 'var(--warning)';
                totalWeightSpan.style.color = 'var(--warning)';
            } else {
                weightFill.style.background = 'linear-gradient(90deg, var(--success) 0%, var(--warning) 70%, var(--danger) 100%)';
                totalWeightSpan.style.color = 'var(--text-light)';
            }
        }
    }

    handleTaskSubmission() {
        const formData = new FormData(document.getElementById('taskForm'));
        const taskData = Object.fromEntries(formData.entries());

        // Simulate task creation
        console.log('Creating task:', taskData);

        // Show success message
        this.showNotification('Task created successfully!', 'success');

        // Close modal and reset form
        this.closeTaskModal();
        document.getElementById('taskForm').reset();
        this.updateWeightIndicator();

        // Refresh data
        setTimeout(() => {
            this.loadData();
        }, 500);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.remove()">×</button>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--white);
            border: 1px solid var(--${type === 'success' ? 'success' : type === 'error' ? 'danger' : 'info'});
            border-radius: 8px;
            padding: 1rem 1.5rem;
            box-shadow: 0 4px 20px rgba(119, 124, 109, 0.15);
            z-index: 3000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }, 5000);
    }

    closeTaskModal() {
        if (this.taskModal) {
            this.taskModal.classList.remove('show');
            setTimeout(() => {
                this.taskModal.style.display = 'none';
            }, 300);
        }
    }
}

// Global functions for modal and actions
function openTaskModal() {
    const modal = document.getElementById('taskModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }
}

function closeTaskModal() {
    const modal = document.getElementById('taskModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

function viewReports() {
    window.location.href = 'tasks.html';
}

function approveRequests() {
    window.location.href = 'requests.html';
}

function checkAttendance() {
    window.location.href = 'attendance.html';
}

function approveItem(title) {
    console.log('Approving:', title);
    dashboard.showNotification(`Approved: ${title}`, 'success');
}

function rejectItem(title) {
    console.log('Rejecting:', title);
    dashboard.showNotification(`Rejected: ${title}`, 'error');
}

// Initialize dashboard when DOM is loaded
let dashboard;
document.addEventListener('DOMContentLoaded', () => {
    dashboard = new Dashboard();
});