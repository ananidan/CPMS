// Sample Data for CPMS Dashboard
const CPMS_DATA = {
    // Project Information
    project: {
        name: "Abaymado Apartments Construction",
        location: "Ayertena, BahirDar",
        startDate: "2025-01-01",
        endDate: "2025-12-31",
        totalBudget: 2500000,
        currentProgress: 73
    },

    // Engineers Data
    engineers: [
        {
            id: "eng1",
            name: "Eng. Bekele Mekonen",
            specialization: "Structural Engineering",
            email: "bekele.m@bahiruconstruction.com",
            phone: "+251-911-123456",
            assignedTasks: 5,
            completedTasks: 3,
            activeProjects: ["Foundation", "Structural Framework"]
        },
        {
            id: "eng2",
            name: "Eng. Samuel Girma",
            specialization: "Civil Engineering",
            email: "samuel.g@bahiruconstruction.com",
            phone: "+251-911-234567",
            assignedTasks: 4,
            completedTasks: 2,
            activeProjects: ["Site Preparation", "Drainage System"]
        },
        {
            id: "eng3",
            name: "Eng. Yonas Lemma",
            specialization: "Electrical Engineering",
            email: "yonas.l@bahiruconstruction.com",
            phone: "+251-911-345678",
            assignedTasks: 6,
            completedTasks: 4,
            activeProjects: ["Electrical Installation", "Power Systems"]
        },
        {
            id: "eng4",
            name: "Eng. Lemlem Mulugeta",
            specialization: "Mechanical Engineering",
            email: "lemlem.m@bahiruconstruction.com",
            phone: "+251-911-456789",
            assignedTasks: 3,
            completedTasks: 2,
            activeProjects: ["HVAC Systems", "Plumbing"]
        },
        {
            id: "eng5",
            name: "Eng. Hana Tadesse",
            specialization: "Architecture",
            email: "hana.t@bahiruconstruction.com",
            phone: "+251-911-567890",
            assignedTasks: 4,
            completedTasks: 3,
            activeProjects: ["Design Review", "Quality Control"]
        },
        {
            id: "eng6",
            name: "Eng. Dawit Kebede",
            specialization: "Environmental Engineering",
            email: "dawit.k@bahiruconstruction.com",
            phone: "+251-911-678901",
            assignedTasks: 2,
            completedTasks: 1,
            activeProjects: ["Environmental Compliance", "Waste Management"]
        }
    ],

    // Tasks Data
    tasks: [
        {
            id: "task001",
            name: "Foundation Excavation",
            description: "Complete excavation for building foundation according to architectural plans",
            assignedEngineer: "eng1",
            weight: 15,
            startDate: "2025-01-15",
            endDate: "2025-02-15",
            priority: "high",
            status: "completed",
            progress: 100,
            createdDate: "2025-01-10"
        },
        {
            id: "task002",
            name: "Concrete Foundation Pouring",
            description: "Pour concrete foundation with proper reinforcement",
            assignedEngineer: "eng1",
            weight: 12,
            startDate: "2025-02-16",
            endDate: "2025-03-10",
            priority: "high",
            status: "in-progress",
            progress: 85,
            createdDate: "2025-01-10"
        },
        {
            id: "task003",
            name: "Electrical Wiring - Ground Floor",
            description: "Install electrical wiring system for ground floor units",
            assignedEngineer: "eng3",
            weight: 8,
            startDate: "2025-03-01",
            endDate: "2025-03-25",
            priority: "medium",
            status: "in-progress",
            progress: 60,
            createdDate: "2025-02-20"
        },
        {
            id: "task004",
            name: "Plumbing Installation",
            description: "Install water supply and drainage systems",
            assignedEngineer: "eng4",
            weight: 10,
            startDate: "2025-03-15",
            endDate: "2025-04-10",
            priority: "medium",
            status: "pending",
            progress: 0,
            createdDate: "2025-03-01"
        },
        {
            id: "task005",
            name: "Structural Framework - First Floor",
            description: "Construct structural framework for first floor",
            assignedEngineer: "eng1",
            weight: 18,
            startDate: "2025-03-20",
            endDate: "2025-04-30",
            priority: "high",
            status: "pending",
            progress: 0,
            createdDate: "2025-03-10"
        }
    ],

    // Daily Reports Data
    dailyReports: [
        {
            id: "report001",
            taskId: "task002",
            engineerId: "eng1",
            date: "2025-03-12",
            progress: 5,
            workDescription: "Continued concrete pouring for foundation. Completed section A-C.",
            issues: "Minor delay due to weather conditions",
            materialsUsed: ["Concrete - 15 cubic meters", "Steel reinforcement - 500kg"],
            workersPresent: 12,
            status: "submitted"
        },
        {
            id: "report002",
            taskId: "task003",
            engineerId: "eng3",
            date: "2025-03-12",
            progress: 8,
            workDescription: "Installed electrical conduits and wiring for units 1-4",
            issues: "None",
            materialsUsed: ["Electrical cables - 200m", "Conduits - 50m"],
            workersPresent: 6,
            status: "submitted"
        }
    ],

    // Material Requests Data
    materialRequests: [
        {
            id: "req001",
            requestedBy: "eng1",
            requestDate: "2025-03-10",
            itemName: "Portland Cement",
            quantity: 50,
            unit: "bags",
            urgency: "high",
            justification: "Required for foundation concrete work",
            estimatedCost: 25000,
            supplier: "Addis Cement Factory",
            status: "pending",
            requestType: "material"
        },
        {
            id: "req002",
            requestedBy: "eng3",
            requestDate: "2025-03-11",
            itemName: "Electrical Cables (12AWG)",
            quantity: 500,
            unit: "meters",
            urgency: "medium",
            justification: "For ground floor electrical installation",
            estimatedCost: 15000,
            supplier: "Ethiopian Electric Supply",
            status: "pending",
            requestType: "material"
        },
        {
            id: "req003",
            requestedBy: "eng2",
            requestDate: "2025-03-09",
            itemName: "Excavator Rental",
            quantity: 1,
            unit: "week",
            urgency: "high",
            justification: "Additional excavation work required",
            estimatedCost: 35000,
            supplier: "Heavy Equipment Rental Co.",
            status: "approved",
            requestType: "equipment"
        }
    ],

    // Financial Statements Data
    financialStatements: [
        {
            id: "fin001",
            type: "invoice",
            title: "Material Purchase Invoice - March 2025",
            submittedBy: "Accountant",
            submissionDate: "2025-03-10",
            amount: 125000,
            description: "Cement, steel bars, and aggregates purchase",
            documentUrl: "/documents/invoice_march_2025.pdf",
            status: "pending",
            category: "materials"
        },
        {
            id: "fin002",
            type: "payroll",
            title: "Weekly Payroll - Week 10",
            submittedBy: "HR Department",
            submissionDate: "2025-03-08",
            amount: 85000,
            description: "Weekly wages for construction workers",
            documentUrl: "/documents/payroll_week10.pdf",
            status: "approved",
            category: "labor"
        },
        {
            id: "fin003",
            type: "expense",
            title: "Equipment Rental Expenses",
            submittedBy: "Site Manager",
            submissionDate: "2025-03-12",
            amount: 45000,
            description: "Crane and excavator rental costs",
            documentUrl: "/documents/equipment_rental_march.pdf",
            status: "pending",
            category: "equipment"
        }
    ],

    // Attendance Data
    attendance: [
        {
            date: "2025-03-12",
            totalWorkers: 50,
            present: 48,
            absent: 2,
            late: 3,
            verifiedBy: "eng1",
            verificationTime: "08:30",
            notes: "Two workers absent due to illness"
        },
        {
            date: "2025-03-11",
            totalWorkers: 50,
            present: 46,
            absent: 4,
            late: 1,
            verifiedBy: "eng2",
            verificationTime: "08:15",
            notes: "Four workers absent - personal reasons"
        },
        {
            date: "2025-03-10",
            totalWorkers: 50,
            present: 50,
            absent: 0,
            late: 2,
            verifiedBy: "eng1",
            verificationTime: "08:20",
            notes: "Full attendance achieved"
        }
    ],

    // Notifications Data
    notifications: [
        {
            id: "notif001",
            type: "urgent",
            title: "Material Request Approval Needed",
            message: "Cement request requires immediate approval for tomorrow's work",
            timestamp: "2025-03-12T14:30:00",
            read: false,
            actionRequired: true,
            relatedId: "req001"
        },
        {
            id: "notif002",
            type: "info",
            title: "Daily Report Submitted",
            message: "Eng. Bekele M. submitted daily progress report",
            timestamp: "2025-03-12T17:45:00",
            read: false,
            actionRequired: false,
            relatedId: "report001"
        },
        {
            id: "notif003",
            type: "warning",
            title: "Task Deadline Approaching",
            message: "Electrical wiring task deadline is in 3 days",
            timestamp: "2025-03-12T09:00:00",
            read: true,
            actionRequired: false,
            relatedId: "task003"
        }
    ]
};

// Utility functions for data manipulation
const DataUtils = {
    // Get engineer by ID
    getEngineerById(id) {
        return CPMS_DATA.engineers.find(eng => eng.id === id);
    },

    // Get tasks by engineer
    getTasksByEngineer(engineerId) {
        return CPMS_DATA.tasks.filter(task => task.assignedEngineer === engineerId);
    },

    // Get pending approvals count
    getPendingApprovalsCount() {
        const materialRequests = CPMS_DATA.materialRequests.filter(req => req.status === 'pending').length;
        const financialStatements = CPMS_DATA.financialStatements.filter(fin => fin.status === 'pending').length;
        return materialRequests + financialStatements;
    },

    // Calculate project progress
    calculateProjectProgress() {
        const totalWeight = CPMS_DATA.tasks.reduce((sum, task) => sum + task.weight, 0);
        const completedWeight = CPMS_DATA.tasks.reduce((sum, task) => {
            return sum + (task.weight * (task.progress / 100));
        }, 0);
        return Math.round((completedWeight / totalWeight) * 100);
    },

    // Get recent activities
    getRecentActivities(limit = 5) {
        const activities = [];

        // Add task completions
        CPMS_DATA.tasks.forEach(task => {
            if (task.status === 'completed') {
                activities.push({
                    type: 'task_completed',
                    title: `Task "${task.name}" completed by ${this.getEngineerById(task.assignedEngineer)?.name}`,
                    timestamp: new Date(task.endDate),
                    icon: '✅'
                });
            }
        });

        // Add daily reports
        CPMS_DATA.dailyReports.forEach(report => {
            activities.push({
                type: 'report_submitted',
                title: `Daily report submitted by ${this.getEngineerById(report.engineerId)?.name}`,
                timestamp: new Date(report.date),
                icon: '📋'
            });
        });

        // Sort by timestamp and return limited results
        return activities
            .sort((a, b) => b.timestamp - a.timestamp)
            .slice(0, limit);
    },

    // Get unread notifications count
    getUnreadNotificationsCount() {
        return CPMS_DATA.notifications.filter(notif => !notif.read).length;
    },

    // Format currency
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-ET', {
            style: 'currency',
            currency: 'ETB',
            minimumFractionDigits: 0
        }).format(amount);
    },

    // Format date
    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    },

    // Get task status color
    getTaskStatusColor(status) {
        const colors = {
            'pending': '#fb8500',
            'in-progress': '#0969da',
            'completed': '#2da44e',
            'delayed': '#dc3545'
        };
        return colors[status] || '#777C6D';
    },

    // Get priority color
    getPriorityColor(priority) {
        const colors = {
            'low': '#2da44e',
            'medium': '#fb8500',
            'high': '#dc3545',
            'critical': '#8b0000'
        };
        return colors[priority] || '#777C6D';
    }
};

// Export data for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CPMS_DATA, DataUtils };
}