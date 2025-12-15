// Charts and Data Visualization
class ChartManager {
    constructor() {
        this.charts = {};
        this.initCharts();
    }

    initCharts() {
        // Wait for Chart.js to load
        if (typeof Chart !== 'undefined') {
            this.createProgressChart();
            this.createTaskDistributionChart();
        } else {
            // Retry after a short delay if Chart.js isn't loaded yet
            setTimeout(() => this.initCharts(), 100);
        }
    }

    createProgressChart() {
        const ctx = document.getElementById('progressChart');
        if (!ctx) return;

        // Sample data for project progress over time
        const progressData = {
            labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8'],
            datasets: [
                {
                    label: 'Planned Progress',
                    data: [10, 20, 30, 40, 50, 60, 70, 80],
                    borderColor: '#B7B89F',
                    backgroundColor: 'rgba(183, 184, 159, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.4,
                    borderDash: [5, 5]
                },
                {
                    label: 'Actual Progress',
                    data: [8, 18, 32, 45, 52, 58, 68, 73],
                    borderColor: '#777C6D',
                    backgroundColor: 'rgba(119, 124, 109, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4
                }
            ]
        };

        const config = {
            type: 'line',
            data: progressData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                family: 'Poppins',
                                size: 12
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#2c2c2c',
                        bodyColor: '#555',
                        borderColor: '#777C6D',
                        borderWidth: 1,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                            label: function (context) {
                                return context.dataset.label + ': ' + context.parsed.y + '%';
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Poppins',
                                size: 11
                            },
                            color: '#777'
                        }
                    },
                    y: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            color: 'rgba(119, 124, 109, 0.1)',
                            drawBorder: false
                        },
                        ticks: {
                            font: {
                                family: 'Poppins',
                                size: 11
                            },
                            color: '#777',
                            callback: function (value) {
                                return value + '%';
                            }
                        }
                    }
                },
                elements: {
                    point: {
                        radius: 4,
                        hoverRadius: 6,
                        backgroundColor: '#fff',
                        borderWidth: 2
                    }
                },
                interaction: {
                    intersect: false,
                    mode: 'index'
                }
            }
        };

        this.charts.progressChart = new Chart(ctx, config);
    }

    createTaskDistributionChart() {
        const ctx = document.getElementById('taskDistributionChart');
        if (!ctx) return;

        // Sample data for task distribution by engineer
        const taskData = {
            labels: ['Eng. Bekele M.', 'Eng. Samuel G.', 'Eng. Yonas L.', 'Eng. Lemlem M.', 'Eng. Hana T.', 'Eng. Dawit K.'],
            datasets: [{
                label: 'Task Weight Distribution',
                data: [18, 15, 22, 12, 20, 13],
                backgroundColor: [
                    'rgba(119, 124, 109, 0.8)',
                    'rgba(183, 184, 159, 0.8)',
                    'rgba(203, 203, 203, 0.8)',
                    'rgba(119, 124, 109, 0.6)',
                    'rgba(183, 184, 159, 0.6)',
                    'rgba(203, 203, 203, 0.6)'
                ],
                borderColor: [
                    '#777C6D',
                    '#B7B89F',
                    '#CBCBCB',
                    '#777C6D',
                    '#B7B89F',
                    '#CBCBCB'
                ],
                borderWidth: 2,
                hoverOffset: 4
            }]
        };

        const config = {
            type: 'doughnut',
            data: taskData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                family: 'Poppins',
                                size: 11
                            },
                            generateLabels: function (chart) {
                                const data = chart.data;
                                if (data.labels.length && data.datasets.length) {
                                    return data.labels.map((label, i) => {
                                        const dataset = data.datasets[0];
                                        const value = dataset.data[i];
                                        return {
                                            text: `${label}: ${value}%`,
                                            fillStyle: dataset.backgroundColor[i],
                                            strokeStyle: dataset.borderColor[i],
                                            lineWidth: dataset.borderWidth,
                                            pointStyle: 'circle',
                                            hidden: false,
                                            index: i
                                        };
                                    });
                                }
                                return [];
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(255, 255, 255, 0.95)',
                        titleColor: '#2c2c2c',
                        bodyColor: '#555',
                        borderColor: '#777C6D',
                        borderWidth: 1,
                        cornerRadius: 8,
                        callbacks: {
                            label: function (context) {
                                const label = context.label || '';
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${label}: ${value}% (${percentage}% of total)`;
                            }
                        }
                    }
                },
                cutout: '60%',
                elements: {
                    arc: {
                        borderWidth: 2
                    }
                }
            }
        };

        this.charts.taskDistributionChart = new Chart(ctx, config);
    }

    updateProgressChart(timeframe) {
        if (!this.charts.progressChart) return;

        let newData;
        switch (timeframe) {
            case 'week':
                newData = {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    planned: [70, 71, 72, 73, 74, 75, 76],
                    actual: [68, 70, 71, 73, 73, 73, 73]
                };
                break;
            case 'month':
                newData = {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                    planned: [60, 65, 70, 75],
                    actual: [58, 65, 68, 73]
                };
                break;
            case 'quarter':
                newData = {
                    labels: ['Month 1', 'Month 2', 'Month 3'],
                    planned: [30, 60, 90],
                    actual: [28, 58, 73]
                };
                break;
            default:
                return;
        }

        this.charts.progressChart.data.labels = newData.labels;
        this.charts.progressChart.data.datasets[0].data = newData.planned;
        this.charts.progressChart.data.datasets[1].data = newData.actual;
        this.charts.progressChart.update('active');
    }

    // Method to create additional charts for other pages
    createAttendanceChart(canvasId) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const attendanceData = {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            datasets: [{
                label: 'Present',
                data: [45, 42, 48, 46, 44, 38],
                backgroundColor: 'rgba(45, 164, 78, 0.8)',
                borderColor: '#2da44e',
                borderWidth: 2
            }, {
                label: 'Absent',
                data: [5, 8, 2, 4, 6, 12],
                backgroundColor: 'rgba(220, 53, 69, 0.8)',
                borderColor: '#dc3545',
                borderWidth: 2
            }]
        };

        const config = {
            type: 'bar',
            data: attendanceData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            usePointStyle: true,
                            padding: 20,
                            font: {
                                family: 'Poppins',
                                size: 12
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                family: 'Poppins',
                                size: 11
                            }
                        }
                    },
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(119, 124, 109, 0.1)'
                        },
                        ticks: {
                            font: {
                                family: 'Poppins',
                                size: 11
                            }
                        }
                    }
                }
            }
        };

        return new Chart(ctx, config);
    }

    createFinancialChart(canvasId) {
        const ctx = document.getElementById(canvasId);
        if (!ctx) return;

        const financialData = {
            labels: ['Materials', 'Labor', 'Equipment', 'Overhead', 'Other'],
            datasets: [{
                label: 'Budget Allocation',
                data: [40, 30, 15, 10, 5],
                backgroundColor: [
                    'rgba(119, 124, 109, 0.8)',
                    'rgba(183, 184, 159, 0.8)',
                    'rgba(203, 203, 203, 0.8)',
                    'rgba(45, 164, 78, 0.8)',
                    'rgba(251, 133, 0, 0.8)'
                ],
                borderColor: [
                    '#777C6D',
                    '#B7B89F',
                    '#CBCBCB',
                    '#2da44e',
                    '#fb8500'
                ],
                borderWidth: 2
            }]
        };

        const config = {
            type: 'pie',
            data: financialData,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            usePointStyle: true,
                            padding: 15,
                            font: {
                                family: 'Poppins',
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                const value = context.parsed;
                                return `${context.label}: ${value}%`;
                            }
                        }
                    }
                }
            }
        };

        return new Chart(ctx, config);
    }

    destroyChart(chartName) {
        if (this.charts[chartName]) {
            this.charts[chartName].destroy();
            delete this.charts[chartName];
        }
    }

    destroyAllCharts() {
        Object.keys(this.charts).forEach(chartName => {
            this.destroyChart(chartName);
        });
    }
}

// Initialize charts when DOM is loaded
let chartManager;
document.addEventListener('DOMContentLoaded', () => {
    chartManager = new ChartManager();

    // Setup timeframe selector
    const progressTimeframe = document.getElementById('progressTimeframe');
    if (progressTimeframe) {
        progressTimeframe.addEventListener('change', (e) => {
            chartManager.updateProgressChart(e.target.value);
        });
    }
});