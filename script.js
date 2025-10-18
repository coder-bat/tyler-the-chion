// script.js

// Sidebar toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle
    const sidebarToggle = document.getElementById('sidebarCollapse');
    const sidebarClose = document.getElementById('sidebarClose');
    const sidebar = document.getElementById('sidebar');
    const content = document.getElementById('content');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            content.classList.toggle('active');
        });
    }
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', function() {
            sidebar.classList.remove('active');
            content.classList.remove('active');
        });
    }
    
    // Close sidebar when clicking on backdrop on mobile
    if (content) {
        content.addEventListener('click', function(e) {
            if (window.innerWidth <= 768 && !sidebar.classList.contains('active')) {
                // Check if click is not on a button or input or navbar elements
                if (!e.target.closest('.navbar') && e.target !== sidebarToggle) {
                    sidebar.classList.add('active');
                    content.classList.add('active');
                }
            }
        });
    }
    
    // Navigation link functionality
    const navLinks = document.querySelectorAll('.list-unstyled.components li a');
    const contentSections = document.querySelectorAll('.content-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(nav => nav.parentElement.classList.remove('active'));
            contentSections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.parentElement.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
            
            // Close sidebar on mobile after selection
            if (window.innerWidth <= 768) {
                sidebar.classList.add('active');
                content.classList.add('active');
            }
        });
    });
    
    // Initialize dashboard as active
    const dashboardSection = document.getElementById('dashboard');
    if (dashboardSection) {
        dashboardSection.classList.add('active');
    }
    
    // Emergency button functionality
    const emergencyBtn = document.querySelector('.emergency-btn');
    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const confirmed = confirm('This will initiate emergency contact with your veterinarian. Are you sure you want to proceed?');
            if (confirmed) {
                alert('Emergency contact initiated. Please call your veterinarian immediately if this is a life-threatening situation.');
                // In a real application, this would connect to an emergency service
            }
        });
    }
    
    // Initialize any charts if Chart.js is available
    initializeCharts();
});

// Initialize charts for data visualization
function initializeCharts() {
    // Weight tracking chart
    const weightCtx = document.getElementById('weightChart');
    if (weightCtx) {
        new Chart(weightCtx, {
            type: 'line',
            data: {
                labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                datasets: [{
                    label: 'Weight (lbs)',
                    data: [18.2, 18.1, 18.3, 18.0, 18.2, 18.1],
                    borderColor: '#4e73df',
                    backgroundColor: 'rgba(78, 115, 223, 0.1)',
                    tension: 0.3,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function(value) {
                                return value + ' lbs';
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Medication compliance chart
    const complianceCtx = document.getElementById('complianceChart');
    if (complianceCtx) {
        new Chart(complianceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Taken', 'Missed'],
                datasets: [{
                    data: [95, 5],
                    backgroundColor: ['#1cc88a', '#e74a3b'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                cutout: '70%'
            }
        });
    }
}

// Function to update task status
function updateTaskStatus(taskId, status) {
    const taskElement = document.getElementById(taskId);
    if (taskElement) {
        taskElement.className = `fas fa-${status === 'completed' ? 'check-circle text-success' : status === 'pending' ? 'circle text-secondary' : 'exclamation-circle text-warning'}`;
    }
}

// Function to show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} position-fixed`;
    notification.style = 'top: 20px; right: 20px; z-index: 10000; min-width: 300px;';
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'danger' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" style="float: right;"></button>
    `;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Function to simulate data loading
function simulateDataLoading() {
    // Show loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.id = 'loadingIndicator';
    loadingIndicator.className = 'position-fixed top-50 start-50 translate-middle';
    loadingIndicator.style = 'z-index: 10000;';
    loadingIndicator.innerHTML = `
        <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
    `;
    document.body.appendChild(loadingIndicator);
    
    // Remove after 1 second
    setTimeout(() => {
        loadingIndicator.remove();
    }, 1000);
}

// Form validation for any forms we might add later
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (form) {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.classList.add('is-invalid');
                isValid = false;
            } else {
                field.classList.remove('is-invalid');
            }
        });
        
        return isValid;
    }
    return false;
}

// Initialize tooltips if Bootstrap is available
function initializeTooltips() {
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
}

// Export data functionality
function exportData(format) {
    showNotification(`Exporting data in ${format} format...`, 'info');
    // In a real application, this would generate and download a file
    setTimeout(() => {
        showNotification(`Data successfully exported as ${format.toUpperCase()}`, 'success');
    }, 1500);
}

// Print functionality
function printPage() {
    window.print();
}

// Theme toggle functionality
function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    
    // Save preference to localStorage
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

// Check for saved theme preference
function checkThemePreference() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

// Initialize theme preference on load
document.addEventListener('DOMContentLoaded', function() {
    checkThemePreference();
});