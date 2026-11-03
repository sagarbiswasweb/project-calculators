document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('construction-cost').addEventListener('submit', function (event) {
        event.preventDefault();
        calculateCost();
    });
});

// Declare global variables to store the chart instances
let chartInstance;


function calculateCost() {
    // Get input values and validate
    const buildupArea = parseFloat(document.getElementById('buildupArea').value);
    const approxCost = parseFloat(document.getElementById('approxCost').value);

    if (isNaN(buildupArea) || buildupArea <= 0) {
        alert('Please enter a valid number greater than 0 for Buildup Area.');
        return;
    }

    if (isNaN(approxCost) || approxCost <= 0) {
        alert('Please enter a valid number greater than 0 for Approximate cost.');
        return;
    }

    // Calculate total cost
    const totalBuildupAreaCost = buildupArea * approxCost;

    // calculate total buildup cost in various fields 
    const cement = totalBuildupAreaCost * 0.164; // 16.4% of total cost
    const sand = totalBuildupAreaCost * 0.123;   // 12.3% of total cost
    const aggregate = totalBuildupAreaCost * 0.074; // 7.4% of total cost
    const steel = totalBuildupAreaCost * 0.246;  // 24.6% of total cost
    const finishers = totalBuildupAreaCost * 0.165; // 16.5% of total cost
    const fittings = totalBuildupAreaCost * 0.228; // 22.8% of total cost

    // Display the result
    document.getElementById('result').innerHTML = `<h4>Estimated Total Cost: $${totalBuildupAreaCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h4>`;

    // Update table info
    document.getElementById('result-table').innerHTML = `
    <tr>
        <td>Buildup area size:</td>
        <td>${buildupArea.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} square foot</td>
    </tr>
    <tr>
        <td>Approximate cost:</td>
        <td>$${approxCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} per square foot</td>
    </tr>
    <tr>
        <td><strong>Estimated Total Cost:</strong></td>
        <td><strong>$${totalBuildupAreaCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</strong></td>
    </tr>
    `;
    
    // table of total buildup cost in various fields 
    document.getElementById('estimated-cost-table').innerHTML = `
        <tr>
            <td>Cement (16.4 %) :</td>
            <td>$ ${cement.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
        </tr>
        <tr>
            <td>Sand (12.3 %) :</td>
            <td>$ ${sand.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
        </tr>
        <tr>
            <td>Aggregate (7.4 %) :</td>
            <td>$ ${aggregate.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
        </tr>
        <tr>
            <td>Steel (24.6 %) :</td>
            <td>$ ${steel.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
        </tr>
        <tr>
            <td>Finishers (16.5 %) :</td>
            <td>$ ${finishers.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
        </tr>
        <tr>
            <td>Fittings (22.8 %) :</td>
            <td>$ ${fittings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
        </tr>
    `;

    // Destroy existing charts if they exist
    if (chartInstance) chartInstance.destroy();

    // Data for the donut chart
    const chartData = {
        labels: ['Cement', 'Sand', 'Aggregate', 'Steel', 'Finishers', 'Fittings'],
        datasets: [{
            data: [cement.toFixed(2), sand.toFixed(2), aggregate.toFixed(2), steel.toFixed(2), finishers.toFixed(2), fittings.toFixed(2)],
            backgroundColor: ['#636e72', '#dfe6e9', '#74b9ff', '#2d3436', '#00cec9', '#e17055'],
        }]
    };

    // Create the donut chart
    const ctx = document.getElementById('chart-area').getContext('2d');
    chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: chartData,
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => `${tooltipItem.label}: $${tooltipItem.raw.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    }
                }
            }
        }
    });

    // Show the result area
    document.querySelector(".my-result-area").style.display = 'block';
    document.querySelector(".estimated-cost-of-various-construction-area").style.display = 'block';
    smoothScrollToSubmit();
}

function clearInputs() {
    document.getElementById('buildupArea').value = '';
    document.getElementById('approxCost').value = '';
    document.querySelector(".my-result-area").style.display = '';
    document.querySelector(".estimated-cost-of-various-construction-area").style.display = '';

    // Destroy the chart instance when clearing inputs
    if (chartInstance) {
        chartInstance.destroy();
    }
}

// Function to handle smooth scrolling to the submit button
function smoothScrollToSubmit() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        setTimeout(() => {
            document.getElementById("submit").scrollIntoView({ behavior: 'smooth' });
        }, 300);
    } else {
        document.getElementById("submit").scrollIntoView({ behavior: 'smooth' });
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
