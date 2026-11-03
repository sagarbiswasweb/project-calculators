// Event listener for US units
document.getElementById('submit-us').addEventListener('click', function (e) {
    e.preventDefault();

    const weightLbs = parseFloat(document.getElementById('weight-us').value);
    const heightFeet = parseFloat(document.getElementById('us-height-feet').value);
    const heightInches = parseFloat(document.getElementById('us-height-inches').value);
    const totalHeightInches = (heightFeet * 12) + heightInches;

    if (!isNaN(weightLbs) && !isNaN(totalHeightInches) && totalHeightInches > 0) {
        const bmi = (703 * weightLbs) / (totalHeightInches * totalHeightInches);
        displayResult(bmi);
    } else {
        alert("Please fill out all fields.");
    }
});

// Event listener for Metric units
document.getElementById('submit-metric').addEventListener('click', function (e) {
    e.preventDefault();

    const weightKg = parseFloat(document.getElementById('weight-metric').value);
    const heightCm = parseFloat(document.getElementById('metric-height-feet').value);
    const heightM = heightCm / 100;

    if (!isNaN(weightKg) && !isNaN(heightM) && heightM > 0) {
        const bmi = weightKg / (heightM * heightM);
        displayResult(bmi);
    } else {
        alert("Please fill out all fields.");
    }
});

// Function to display the result and update the gauge chart
function displayResult(bmi) {
    const classification = getClassification(bmi);
    document.getElementById('result').innerHTML = `
        <tr>
            <td><strong>Your Body Mass Index (BMI) is:</strong></td>
            <td>${bmi.toFixed(1)} kg/m<sup>2</sup></td>
        </tr>
        <tr>
            <td><strong>Category:</strong></td>
            <td>${classification}</td>
        </tr>
    `;
    document.querySelector(".my-result-area").style.display = 'block';
    smoothScrollToSubmit();
    createBMIGaugeChart(bmi);
    document.getElementById('gauge-chart-area').style.display = 'block';
    document.getElementById('classification-table').style.display = 'block';
}

// Function to clear input fields and reset the result display
function clearInputs() {
    document.querySelectorAll('.my-input-area').forEach(input => input.value = '');
    document.getElementById('result').innerHTML = '';
    document.querySelector(".my-result-area").style.display = 'none';
}

// Function to handle smooth scrolling to the result
function smoothScrollToSubmit() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    setTimeout(() => {
        const submitBtn = document.querySelector(".tab-pane.active button[type='submit']");
        if (submitBtn) {
            submitBtn.scrollIntoView({ behavior: 'smooth' });
        }
    }, isMobile ? 300 : 0);
}

// Function to determine BMI classification
function getClassification(bmi) {
    if (bmi < 16) return 'Severe Thinness';
    if (bmi >= 16 && bmi < 17) return 'Moderate Thinness';
    if (bmi >= 17 && bmi < 18.5) return 'Mild Thinness';
    if (bmi >= 18.5 && bmi < 25) return 'Normal';
    if (bmi >= 25 && bmi < 30) return 'Overweight';
    if (bmi >= 30 && bmi < 35) return 'Obese Class I';
    if (bmi >= 35 && bmi < 40) return 'Obese Class II';
    if (bmi >= 40) return 'Obese Class III';
    return 'Unknown';
}

// Initialize a global variable for the chart to allow updating
let bmiGaugeChart;

// Function to create or update the BMI Gauge Chart
function createBMIGaugeChart(bmi) {
    const ctx = document.getElementById('bmiGaugeChart').getContext('2d');

    // If the chart already exists, destroy it before creating a new one
    if (bmiGaugeChart) {
        bmiGaugeChart.destroy();
    }

    bmiGaugeChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: [
                'Severe Thinness',
                'Moderate Thinness',
                'Mild Thinness',
                'Normal',
                'Overweight',
                'Obese Class I',
                'Obese Class II',
                'Obese Class III'
            ],
            datasets: [{
                data: [
                    16,  // Severe Thinness: 0 to 16
                    1,   // Moderate Thinness: 16 to 17
                    1.5, // Mild Thinness: 17 to 18.5
                    6.5, // Normal: 18.5 to 25
                    5,   // Overweight: 25 to 30
                    5,   // Obese Class I: 30 to 35
                    5,   // Obese Class II: 35 to 40
                    10   // Obese Class III: 40 to 50
                ], 
                backgroundColor: [
                    '#FF0000', // Severe Thinness
                    '#FF4500', // Moderate Thinness
                    '#FFA500', // Mild Thinness
                    '#32CD32', // Normal
                    '#FFFF00', // Overweight
                    '#FFD700', // Obese Class I
                    '#FF8C00', // Obese Class II
                    '#FF6347'  // Obese Class III
                ],
                borderWidth: 0,
                hoverOffset: 4
            }]
        },
        options: {
            rotation: 270, // Start from the left
            circumference: 180, // Half-circle
            cutout: '70%', // Thickness of the doughnut
            plugins: {
                tooltip: {
                    enabled: true,
                    callbacks: {
                        label: function(tooltipItem) {
                            // Show custom tooltip based on the needle position
                            const label = tooltipItem.label;
                            const index = tooltipItem.dataIndex;
                            const bmiRanges = [
                                { min: 0, max: 16 },
                                { min: 16, max: 17 },
                                { min: 17, max: 18.5 },
                                { min: 18.5, max: 25 },
                                { min: 25, max: 30 },
                                { min: 30, max: 35 },
                                { min: 35, max: 40 },
                                { min: 40, max: 50 }
                            ];
                            const range = bmiRanges[index];
                            return `BMI Range: ${range.min} - ${range.max}`;
                        }
                    }
                },
                legend: { display: false }
            }
        }
    });

    // Position the needle (or indicator) based on the BMI
    positionNeedle(bmi);
}

// Function to position the needle based on BMI
function positionNeedle(bmi) {
    const needle = document.getElementById('gauge-needle');

    // Define BMI ranges corresponding to the chart segments
    const ranges = [
        { min: 0, max: 16 },     // Severe Thinness
        { min: 16, max: 17 },    // Moderate Thinness
        { min: 17, max: 18.5 },  // Mild Thinness
        { min: 18.5, max: 25 },  // Normal
        { min: 25, max: 30 },    // Overweight
        { min: 30, max: 35 },    // Obese Class I
        { min: 35, max: 40 },    // Obese Class II
        { min: 40, max: 50 }     // Obese Class III
    ];

    // Total range size
    const totalRange = 50; // From 0 to 50 BMI

    // Clamp BMI within the gauge range
    const clampedBMI = Math.min(Math.max(bmi, 0), totalRange);

    // Calculate the angle for the needle
    const angle = 270 + (clampedBMI / totalRange) * 180;

    // Update the needle's rotation
    needle.style.transform = `translateX(-50%) translateY(-100%) rotate(${angle}deg)`;

    // Update the tooltip to reflect the needle's position
    updateTooltip(clampedBMI);
}

// Function to update tooltip based on the needle's position
function updateTooltip(bmi) {
    const tooltip = document.querySelector('.chartjs-tooltip');
    if (tooltip) {
        const tooltipModel = bmiGaugeChart.tooltip._model;
        tooltip.innerHTML = `BMI: ${bmi.toFixed(1)}`;
        tooltip.style.opacity = 1;
        tooltip.style.left = `${tooltipModel.caretX}px`;
        tooltip.style.top = `${tooltipModel.caretY}px`;
    }
}

// Function to handle smooth scrolling to TOC sections with dynamic header offset
function smoothScrollToSection() {
    // Attach click event listeners to all TOC links
    document.querySelectorAll('.list-group-item').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const navbar = document.querySelector('.single-page-navbar');  // Get the navbar element
            const breadcrumb = document.querySelector('.breadcrumb-menu');  // Get the breadcrumb menu element if it exists

            // Dynamically calculate the height of navbar + breadcrumb (if open)
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const breadcrumbHeight = (breadcrumb && breadcrumb.clientHeight > 0) ? breadcrumb.clientHeight : 0;
            const totalHeaderHeight = navbarHeight + breadcrumbHeight;  // Total dynamic header height

            const target = document.querySelector(this.getAttribute('href'));  // Get the target section
            if (target) {
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;  // Get section's position

                // Scroll to the section adjusted by the total header height
                window.scrollTo({
                    top: targetPosition - totalHeaderHeight - 10,  // Adjust for header height + extra spacing
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Run the smooth scroll function after the page loads
document.addEventListener('DOMContentLoaded', smoothScrollToSection);
