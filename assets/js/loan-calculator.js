// Get the input values from the form and store them in variables
const loanAmount = document.getElementById("loanAmount");
const interestRate = document.getElementById("interestRate");
const loanDuration = document.getElementById("loanDuration");
const form = document.getElementById("loan-calculator");

// Declare global variables to store the chart instances
let loanChartInstance;
let multiLineChartInstance;

// Function to calculate loan payment
function calculateLoan(loanAmount, interestRate, numberOfMonthlyPayments) {
    // Convert interest rate to decimal
    function percentageToDecimal(percent) {
        return percent / 12 / 100;
    }
    interestRate = percentageToDecimal(interestRate);

    // Convert years to months
    function yearToMonth(year) {
        return year * 12;
    }
    numberOfMonthlyPayments = yearToMonth(numberOfMonthlyPayments);

    // Calculate the loan payment
    return (interestRate * loanAmount) / (1 - Math.pow(1 + interestRate, -numberOfMonthlyPayments));
}

// Function to handle form submission and chart creation
form.onsubmit = (e) => {
    e.preventDefault();

    if (validate()) {
        const loanAmountValue = parseFloat(loanAmount.value)
        const interestRateValue = parseFloat(interestRate.value);

        if (!isNaN(interestRateValue)) {
            let monthlyPayment = calculateLoan(loanAmountValue, interestRateValue, loanDuration.value);
            let totalCostOfLoan = ((loanDuration.value * 12) * monthlyPayment).toFixed(2);
            let totalInterest = totalCostOfLoan - loanAmountValue;
            let totalInterestToFixed = parseFloat(totalInterest).toFixed(2);
            let totalPayments = loanDuration.value * 12;
            let monthlyPaymentToFixed = monthlyPayment.toFixed(2);

            // Display results
            document.getElementById("monthlyPayment").innerHTML = `<h4>Monthly Payment: $ ${parseFloat(monthlyPaymentToFixed).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h4>`;
            document.getElementById("result").innerHTML = `
                <tr>
                    <td>Loan Amount:</td>
                    <td> $ ${parseFloat(loanAmountValue).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
                <tr>
                    <td>Interest Rate:</td>
                    <td> ${interestRateValue} %</td>
                </tr>
                <tr>
                    <td>Loan Duration:</td>
                    <td> ${loanDuration.value} years</td>
                </tr>
                <tr>
                    <td><strong>Monthly Payment</strong>:</td>
                    <td><b> $ ${parseFloat(monthlyPaymentToFixed).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                </tr>
                <tr>
                    <td><strong>Total Payments</strong>:</td>
                    <td><b> ${totalPayments} payments</b></td>
                </tr>
                <tr>
                    <td><strong>Total Cost of Loan</strong>:</td>
                    <td><b> $ ${parseFloat(totalCostOfLoan).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                </tr>
                <tr>
                    <td><strong>Total Interest</strong>:</td>
                    <td><b> $ ${parseFloat(totalInterestToFixed).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</b></td>
                </tr>
            `;

            // Destroy existing charts if they exist
            if (loanChartInstance) loanChartInstance.destroy();
            if (multiLineChartInstance) multiLineChartInstance.destroy();

            // Data for the donut chart
            const chartData = {
                labels: ['Loan Amount', 'Total Interest'],
                datasets: [{
                    data: [loanAmountValue, totalInterestToFixed],
                    backgroundColor: ['#36A2EB', '#FF6384'],
                }]
            };

            // Create the donut chart
            const ctx = document.getElementById('loanChart').getContext('2d');
            loanChartInstance = new Chart(ctx, {
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

            // Adjust chart height for mobile devices
            const setChartHeight = () => {
                const chartCanvas = document.getElementById('multiLineChart');

                if (window.innerWidth <= 768) {
                    chartCanvas.height = 300; // Adjust the height for tablets
                }

                if (window.innerWidth <= 480) {
                    chartCanvas.height = 300; // Adjust the height for mobile devices
                }
            };

            // Call the function before creating the chart instance
            setChartHeight();

            

            // Show the result area
            document.querySelector(".my-result-area").style.display = 'block';

            // Generate the amortization table
            generateAmortizationTable(loanAmountValue, interestRateValue, totalPayments, monthlyPayment);

            // Scroll to the monthlyPayment section
            smoothScrollToSubmit();
        } else {
            alert("Please enter a valid interest rate.");
            interestRate.value = "";
        }
    }
};

// Function to validate form inputs
function validate() {
    if (loanAmount.value === "" || interestRate.value === "" || loanDuration === "") {
        alert("Please complete all fields");
        return false; // Validation failed
    }

    if (parseFloat(loanAmount.value) <= 0) {
        alert("Loan amount must be greater than zero.");
        loanAmount.value = "";
        return false;
    }

    if (parseFloat(interestRate.value) <= 0) {
        alert("Interest rate must be greater than zero.");
        interestRate.value = "";
        return false;
    }

    if (parseFloat(interestRate.value) > 100) {
        alert("Interest rate must be less than 100%.");
        interestRate.value = "";
        return false;
    }

    if (parseFloat(loanDuration.value) <= 0) {
        alert("Loan duration must be greater than zero.");
        loanDuration.value = "";
        return false;
    }

    if (parseFloat(loanDuration.value) > 100) {
        alert("Loan duration must be less than 100 years.");
        loanDuration.value = "";
        return false;
    }
    return true; // Validation passed
}

// Function to generate amortization table
function generateAmortizationTable(loanAmount, interestRate, numberOfPayments, monthlyPayment) {
    let tableBody = document.getElementById("amortizationTableBody");
    tableBody.innerHTML = ""; // Clear existing table rows

    let currentBalance = loanAmount;
    let totalInterestPaid = 0;
    let currentYear = 1;

    // Data for the multi-line chart
    const balanceData = [];
    const interestData = [];
    const paymentData = [];

    // loop through the table until it reached to number of payments 
    for (let i = 1; i <= numberOfPayments; i++) {
        const interest = currentBalance * (interestRate / 12 / 100);
        totalInterestPaid += interest;
        const principal = monthlyPayment - interest;
        currentBalance -= principal;

        // Insert a "Year" row at the start of each new year (every 12 months)
        if (i % 12 === 1) {
            const yearRow = document.createElement("tr");
            yearRow.innerHTML = `
                <td colspan="5" style="text-align: center; font-weight: bold; padding-top: 30px;">
                    Year ${currentYear} starts
                </td>`;
            tableBody.appendChild(yearRow);
            currentYear++;
        }

        // showing table head dynamically 
        document.getElementById("schedule").innerHTML = "Monthly Amortization Schedule";

        document.getElementById("payment-no").innerHTML = "Month";
        document.getElementById("princpal").innerHTML = "Principal";
        document.getElementById("interest").innerHTML = "Interest";
        document.getElementById("interest-paid").innerHTML = "Interest Paid";
        document.getElementById("ending-balance").innerHTML = "Ending Balance";

        document.querySelector(".my-amortization-area").style.display = 'block';

        // creating tr & td until it reached to number of payments 
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${i}</td>
            <td>$&nbsp;${parseFloat(principal.toFixed(0)).toLocaleString()}</td>
            <td>$&nbsp;${parseFloat(interest.toFixed(0)).toLocaleString()}</td>
            <td>$&nbsp;${parseFloat(totalInterestPaid.toFixed(0)).toLocaleString()}</td>
            <td>$&nbsp;${parseFloat(currentBalance.toFixed(0)).toLocaleString()}</td>
        `;
        tableBody.appendChild(row);

        // Collect data for multi-line chart
        balanceData.push(currentBalance.toFixed(2));
        interestData.push(totalInterestPaid.toFixed(2));
        paymentData.push((monthlyPayment * i).toFixed(2));
    }


    // Create the multi-line chart
    const ctxMultiLine = document.getElementById('multiLineChart').getContext('2d');
    multiLineChartInstance = new Chart(ctxMultiLine, {
        type: 'line',
        data: {
            labels: Array.from({ length: numberOfPayments }, (_, i) => i + 1),
            datasets: [
                { label: 'Balance', data: balanceData, borderColor: '#36A2EB', fill: false },
                { label: 'Interest', data: interestData, borderColor: '#4CAF50', fill: false },
                { label: 'Payment', data: paymentData, borderColor: '#FF6384', fill: false }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: 'Year' } },
                y: {
                    title: { display: true, text: 'Dollar ($)' },
                    ticks: {
                        callback: (value) => `$${value.toLocaleString()}`
                    }
                }
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => `${tooltipItem.dataset.label}: $${tooltipItem.raw.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    }
                }
            }
        }
    });
}

// Function to clear inputs and reset the form
function clearInputs() {
    // Reset input fields
    document.getElementById("loanAmount").value = "";
    document.getElementById("interestRate").value = "";
    document.getElementById("loanDuration").value = "";

    document.querySelector(".my-result-area").style.display = '';

    document.getElementById("schedule").innerHTML = "";
    document.getElementById("payment-no").innerHTML = "";
    document.getElementById("princpal").innerHTML = "";
    document.getElementById("interest").innerHTML = "";
    document.getElementById("interest-paid").innerHTML = "";
    document.getElementById("ending-balance").innerHTML = "";

    document.querySelector(".my-amortization-area").style.display = '';

    document.getElementById("amortizationTableBody").innerHTML = "";

    // Destroy the chart instance when clearing inputs
    if (loanChartInstance) {
        loanChartInstance.destroy();
    }
    if (multiLineChartInstance) {
        multiLineChartInstance.destroy();
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
