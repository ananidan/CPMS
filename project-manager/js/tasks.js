// Task Management JavaScript
class TaskManager {
    constructor() {
        this.tasks = [...CPMS_DATA.tasks]; // Copy of tasks data
        this.filteredTasks = [...this.tasks];
        this.currentView = 'list';
        this.sortOrder = 'desc';
        this.sortBy = 'startDate';

        this.init();
        this.loadTasks();
        this.setupEventListeners();
        this.updateTaskStats();
    }

    init() {
        // Set current date
        this.updateDateTime();

        // Initialize view
        this.switchView('list');
    }

    setupEventListeners() {
        // Filter controls
        document.getElementById('engineerFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('statusFilter').addEventListener('change', () => this.applyFilters());
        document.getElementById('priorityFilter').addEventListener('change', () => this.applyFilters());

        // Search
        document.getElementById('taskSearch').addEventListener('input', () => this.applyFilters());

        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.dataset.view;
                this.switchView(view);
            });
        });

        // Sort button
        document.getElementById('sortBtn').addEventListener('click', () => this.toggleSort());

        // Timeline zoom controls
        document.querySelectorAll('.timeline-zoom').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.timeline-zoom').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.updateTimeline(e.target.dataset.zoom);
            });
        });

        // Task form submission
        document.getElementById('taskForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleTaskSubmission();
        });

        // Weight input monitoring
        document.getElementById('taskWeight').addEventListener('input', () => {
            this.updateWeightIndicator();
        });
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

    loadTasks() {
        this.renderTaskList();
        if (this.currentView === 'timeline') {
            this.renderTimeline();
        }
    }

    applyFilters() {
        const engineerFilter = document.getElementById('engineerFilter').value;
        const statusFilter = document.getElementById('statusFilter').value;
        const priorityFilter = document.getElementById('priorityFilter').value;
        const searchTerm = document.getElementById('taskSearch').value.toLowerCase();

        this.filteredTasks = this.tasks.filter(task => {
            const matchesEngineer = !engineerFilter || task.assignedEngineer === engineerFilter;
            const matchesStatus = !statusFilter || task.status === statusFilter;
            const matchesPriority = !priorityFilter || task.priority === priorityFilter;
            const matchesSearch = !searchTerm ||
                task.name.toLowerCase().includes(searchTerm) ||
                task.description.toLowerCase().includes(searchTerm);

            return matchesEngineer && matchesStatus && matchesPriority && matchesSearch;
        });

        this.sortTasks();
        this.loadTasks();
        this.updateTaskStats();
    }

    sortTasks() {
        this.filteredTasks.sort((a, b) => {
            let aValue, bValue;

            switch (this.sortBy) {
                case 'startDate':
                    aValue = new Date(a.startDate);
                    bValue = new Date(b.startDate);
                    break;
                case 'endDate':
                    aValue = new Date(a.endDate);
                    bValue = new Date(b.endDate);
                    break;
                case 'priority':
                    const priorityOrder = { 'critical': 4, 'high': 3, 'medium': 2, 'low': 1 };
                    aValue = priorityOrder[a.priority];
                    bValue = priorityOrder[b.priority];
                    break;
                case 'progress':
                    aValue = a.progress;
                    bValue = b.progress;
                    break;
                default:
                    aValue = a[this.sortBy];
                    bValue = b[this.sortBy];
            }

            if (this.sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });
    }

    toggleSort() {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
        const sortBtn = document.getElementById('sortBtn');
        const arrow = this.sortOrder === 'asc' ? '↑' : '↓';
        sortBtn.textContent = `Sort by Date ${arrow}`;

        this.sortTasks();
        this.loadTasks();
    }

    switchView(view) {
        this.currentView = view;

        // Update view buttons
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
        });

        // Show/hide views
        document.getElementById('taskListView').style.display = view === 'list' ? 'block' : 'none';
        document.getElementById('taskTimelineView').style.display = view === 'timeline' ? 'block' : 'none';

        if (view === 'timeline') {
            this.renderTimeline();
        }
    }

    renderTaskList() {
        const taskList = document.getElementById('taskList');

        if (this.filteredTasks.length === 0) {
            taskList.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📋</div>
                    <div class="empty-state-text">No tasks found</div>
                    <div class="empty-state-subtext">Try adjusting your filters or create a new task</div>
                </div>
            `;
            return;
        }

        taskList.innerHTML = this.filteredTasks.map(task => {
            const engineer = DataUtils.getEngineerById(task.assignedEngineer);
            const startDate = DataUtils.formatDate(task.startDate);
            const endDate = DataUtils.formatDate(task.endDate);

            return `
                <div class="task-item" onclick="showTaskDetails('${task.id}')">
                    <div class="task-priority ${task.priority}"></div>
                    <div class="task-main">
                        <div class="task-header">
                            <div>
                                <div class="task-title">${task.name}</div>
                                <div class="task-meta">
                                    <span class="task-engineer">👤 ${engineer?.name || 'Unassigned'}</span>
                                    <span class="task-dates">📅 ${startDate} - ${endDate}</span>
                                    <span class="task-weight">${task.weight}%</span>
                                </div>
                            </div>
                            <div class="task-actions">
                                <span class="task-status ${task.status}">${task.status.replace('-', ' ')}</span>
                                <button class="action-btn edit" onclick="event.stopPropagation(); editTask('${task.id}')" title="Edit Task">✏️</button>
                                <button class="action-btn delete" onclick="event.stopPropagation(); deleteTask('${task.id}')" title="Delete Task">🗑️</button>
                            </div>
                        </div>
                        <div class="task-progress-section">
                            <div class="task-progress-header">
                                <span class="progress-label">Progress</span>
                                <span class="progress-percentage">${task.progress}%</span>
                            </div>
                            <div class="task-progress-bar">
                                <div class="task-progress-fill" style="width: ${task.progress}%"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    }

    renderTimeline() {
        const timelineContainer = document.getElementById('timelineContainer');

        if (this.filteredTasks.length === 0) {
            timelineContainer.innerHTML = `
                <div class="empty-state">
                    <div class="empty-state-icon">📅</div>
                    <div class="empty-state-text">No tasks to display in timeline</div>
                </div>
            `;
            return;
        }

        // Calculate timeline dimensions
        const startDates = this.filteredTasks.map(task => new Date(task.startDate));
        const endDates = this.filteredTasks.map(task => new Date(task.endDate));
        const minDate = new Date(Math.min(...startDates));
        const maxDate = new Date(Math.max(...endDates));
        const totalDays = Math.ceil((maxDate - minDate) / (1000 * 60 * 60 * 24));

        const timelineHTML = `
            <div class="timeline">
                <div class="timeline-grid">
                    <div class="timeline-labels">
                        ${this.filteredTasks.map(task => `
                            <div class="timeline-label">${task.name}</div>
                        `).join('')}
                    </div>
                    <div class="timeline-tracks">
                        ${this.filteredTasks.map(task => {
            const taskStart = new Date(task.startDate);
            const taskEnd = new Date(task.endDate);
            const taskDuration = Math.ceil((taskEnd - taskStart) / (1000 * 60 * 60 * 24));
            const startOffset = Math.ceil((taskStart - minDate) / (1000 * 60 * 60 * 24));

            const leftPercent = (startOffset / totalDays) * 100;
            const widthPercent = (taskDuration / totalDays) * 100;

            return `
                                <div class="timeline-track">
                                    <div class="timeline-bar ${task.status}" 
                                         style="left: ${leftPercent}%; width: ${widthPercent}%;"
                                         onclick="showTaskDetails('${task.id}')"
                                         title="${task.name} (${task.progress}%)">
                                        ${task.name} - ${task.progress}%
                                    </div>
                                </div>
                            `;
        }).join('')}
                    </div>
                </div>
            </div>
        `;

        timelineContainer.innerHTML = timelineHTML;
    }

    updateTaskStats() {
        const stats = {
            total: this.filteredTasks.length,
            pending: this.filteredTasks.filter(task => task.status === 'pending').length,
            inProgress: this.filteredTasks.filter(task => task.status === 'in-progress').length,
            completed: this.filteredTasks.filter(task => task.status === 'completed').length
        };

        // Animate the numbers
        this.animateValue(document.getElementById('totalTasks'), 0, stats.total, 1000);
        this.animateValue(document.getElementById('pendingTasks'), 0, stats.pending, 1000);
        this.animateValue(document.getElementById('inProgressTasks'), 0, stats.inProgress, 1000);
        this.animateValue(document.getElementById('completedTasks'), 0, stats.completed, 1000);
    }

    animateValue(element, start, end, duration) {
        if (!element) return;

        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            const easeOutCubic = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (end - start) * easeOutCubic);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    updateWeightIndicator() {
        const weightInput = document.getElementById('taskWeight');
        const weightFill = document.getElementById('weightFill');
        const totalWeightSpan = document.getElementById('totalWeight');

        if (weightInput && weightFill && totalWeightSpan) {
            const currentWeight = parseInt(weightInput.value) || 0;
            const existingWeight = this.calculateExistingWeight();
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

    calculateExistingWeight() {
        return this.tasks.reduce((total, task) => total + task.weight, 0);
    }

    handleTaskSubmission() {
        const formData = new FormData(document.getElementById('taskForm'));
        const taskData = Object.fromEntries(formData.entries());
        const taskId = document.getElementById('taskId').value;

        if (taskId) {
            // Update existing task
            const taskIndex = this.tasks.findIndex(task => task.id === taskId);
            if (taskIndex !== -1) {
                this.tasks[taskIndex] = {
                    ...this.tasks[taskIndex],
                    ...taskData,
                    weight: parseInt(taskData.taskWeight),
                    progress: parseInt(taskData.progress) || this.tasks[taskIndex].progress
                };
                this.showNotification('Task updated successfully!', 'success');
            }
        } else {
            // Create new task
            const newTask = {
                id: 'task' + String(Date.now()).slice(-6),
                name: taskData.taskName,
                description: taskData.taskDescription,
                assignedEngineer: taskData.assignedEngineer,
                weight: parseInt(taskData.taskWeight),
                startDate: taskData.startDate,
                endDate: taskData.endDate,
                priority: taskData.priority,
                status: taskData.taskStatus || 'pending',
                progress: 0,
                createdDate: new Date().toISOString().split('T')[0]
            };

            this.tasks.push(newTask);
            this.showNotification('Task created successfully!', 'success');
        }

        // Update filtered tasks and refresh display
        this.applyFilters();
        this.closeTaskModal();
        document.getElementById('taskForm').reset();
        this.updateWeightIndicator();
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
        const modal = document.getElementById('taskModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    }
}

// Global functions
function openTaskModal() {
    const modal = document.getElementById('taskModal');
    const modalTitle = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');

    if (modal) {
        modalTitle.textContent = 'Create New Task';
        submitBtn.textContent = 'Create Task';
        document.getElementById('taskId').value = '';
        document.getElementById('taskForm').reset();

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

function editTask(taskId) {
    const task = taskManager.tasks.find(t => t.id === taskId);
    if (!task) return;

    const modal = document.getElementById('taskModal');
    const modalTitle = document.getElementById('modalTitle');
    const submitBtn = document.getElementById('submitBtn');

    // Populate form with task data
    document.getElementById('taskId').value = task.id;
    document.getElementById('taskName').value = task.name;
    document.getElementById('taskDescription').value = task.description;
    document.getElementById('assignedEngineer').value = task.assignedEngineer;
    document.getElementById('taskWeight').value = task.weight;
    document.getElementById('startDate').value = task.startDate;
    document.getElementById('endDate').value = task.endDate;
    document.getElementById('priority').value = task.priority;
    document.getElementById('taskStatus').value = task.status;

    modalTitle.textContent = 'Edit Task';
    submitBtn.textContent = 'Update Task';

    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function deleteTask(taskId) {
    if (confirm('Are you sure you want to delete this task?')) {
        const taskIndex = taskManager.tasks.findIndex(task => task.id === taskId);
        if (taskIndex !== -1) {
            taskManager.tasks.splice(taskIndex, 1);
            taskManager.applyFilters();
            taskManager.showNotification('Task deleted successfully!', 'success');
        }
    }
}

function showTaskDetails(taskId) {
    const task = taskManager.tasks.find(t => t.id === taskId);
    if (!task) return;

    const engineer = DataUtils.getEngineerById(task.assignedEngineer);
    const modal = document.getElementById('taskDetailsModal');
    const content = document.getElementById('taskDetailsContent');

    content.innerHTML = `
        <div class="task-detail-section">
            <h4>Task Information</h4>
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-label">Task Name</div>
                    <div class="detail-value">${task.name}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Status</div>
                    <div class="detail-value">
                        <span class="task-status ${task.status}">${task.status.replace('-', ' ')}</span>
                    </div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Priority</div>
                    <div class="detail-value">
                        <span class="priority-badge ${task.priority}">${task.priority}</span>
                    </div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Weight</div>
                    <div class="detail-value">${task.weight}%</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Progress</div>
                    <div class="detail-value">${task.progress}%</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Assigned Engineer</div>
                    <div class="detail-value">${engineer?.name || 'Unassigned'}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">Start Date</div>
                    <div class="detail-value">${DataUtils.formatDate(task.startDate)}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">End Date</div>
                    <div class="detail-value">${DataUtils.formatDate(task.endDate)}</div>
                </div>
            </div>
        </div>
        
        ${task.description ? `
        <div class="task-detail-section">
            <h4>Description</h4>
            <div class="task-description">${task.description}</div>
        </div>
        ` : ''}
        
        <div class="task-detail-section">
            <h4>Progress</h4>
            <div class="progress-container">
                <div class="progress-bar" style="width: ${task.progress}%"></div>
            </div>
            <div class="progress-text">${task.progress}% completed</div>
        </div>
    `;

    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function closeTaskDetailsModal() {
    const modal = document.getElementById('taskDetailsModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
    }
}

// Initialize task manager when DOM is loaded
let taskManager;
document.addEventListener('DOMContentLoaded', () => {
    taskManager = new TaskManager();
});