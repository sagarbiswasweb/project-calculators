document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('mortgage').addEventListener('submit', function (event) {
        event.preventDefault();
        
        const remainingBalance = parseFloat(document.getElementById('remainingBalance').value);
        const interestRate = parseFloat(document.getElementById('interestRate').value) / 100;
        const currentMonthlyPayment = parseFloat(document.getElementById('currentMonthlyPayment').value);
        const recastingPayment = parseFloat(document.getElementById('recastingPayment').value);
        const recastingCost = parseFloat(document.getElementById('recastingCost').value);

        // Clear previous error messages
        clearErrorMessages();

        // Validate inputs
        if (!validateInputs(remainingBalance, interestRate, currentMonthlyPayment, recastingPayment, recastingCost)) {
            return;
        }

        const monthlyInterestRate = interestRate / 12;

        // Calculate the remaining term, limit to 360 months (30 years)
        let balance = remainingBalance;
        let remainingTerm = 0;
        const maxTerm = 1200;

        while (balance > 0 && remainingTerm < maxTerm) {
            const interestPayment = balance * monthlyInterestRate;
            const principalPayment = currentMonthlyPayment - interestPayment;
            balance -= principalPayment;
            remainingTerm++;
        }

        if (remainingTerm >= maxTerm) {
            alert("Remaining term calculation exceeded 100 years. Please check your inputs.");
            return;
        }

        // Calculate the total interest for the original mortgage
        let totalInterestOriginal = 0;
        balance = remainingBalance;

        for (let i = 0; i < remainingTerm; i++) {
            const interestPayment = balance * monthlyInterestRate;
            totalInterestOriginal += interestPayment;
            const principalPayment = currentMonthlyPayment - interestPayment;
            balance -= principalPayment;
        }

        // Calculate the new remaining balance after recasting payment
        const newRemainingBalance = remainingBalance - recastingPayment;

        // Calculate the new monthly payment
        const newMonthlyPayment = (newRemainingBalance * monthlyInterestRate) / (1 - Math.pow(1 + monthlyInterestRate, -remainingTerm));

        // Calculate total interest for recast mortgage
        let totalInterestRecast = 0;
        balance = newRemainingBalance;

        for (let i = 0; i < remainingTerm; i++) {
            const interestPayment = balance * monthlyInterestRate;
            totalInterestRecast += interestPayment;
            const principalPayment = newMonthlyPayment - interestPayment;
            balance -= principalPayment;
        }

        // Calculate savings
        const savings = totalInterestOriginal - totalInterestRecast - recastingCost;

        // Display the results
        document.getElementById('monthlyPayment').innerHTML = `<h4>New Monthly Payment: $ ${(newMonthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ','))}</h4>`;
        document.getElementById('recastBalance').innerHTML = `<th>New Remaining Balance</th><td>$ ${newRemainingBalance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>`;
        document.getElementById('totalPayments').innerHTML = `<th>Remaining Term</th><td>${remainingTerm} months</td>`;
        document.getElementById('totalInterestPaid').innerHTML = `<th>Recasting Cost</th><td>$ ${recastingCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>`;
        document.getElementById('totalPayment').innerHTML = `<th>Total Cost Including Recasting</th><td>$ ${(newRemainingBalance + recastingCost).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>`;

        document.getElementById('comparisn').innerHTML = 'Comparisn';
        document.getElementById('field').innerHTML = "";
        document.getElementById('original').innerHTML = "Original";
        document.getElementById('recast').innerHTML = "Recast";

        // Show the result area
        document.querySelector(".my-result-area").style.display = 'block';
        document.querySelector(".my-comparisn-area").style.display = 'block';
        document.querySelector(".my-amortization-area").style.display = 'block';

        // Display the comparison results
        document.getElementById('comparisonTableBody').innerHTML = `
            <tr>
                <th>Monthly Payment</th>
                <td>$ ${currentMonthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td>$ ${newMonthlyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
            </tr>
            <tr>
                <th>Total Interest</th>
                <td>$ ${totalInterestOriginal.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
                <td>$ ${totalInterestRecast.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
            </tr>
            <tr>
                <th>Fees</th>
                <td>$ 0.00</td>
                <td>$ ${recastingCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
            </tr>
            <tr>
                <th>Savings</th>
                <td></td>
                <td>$ ${savings.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
            </tr>
        `;

        // Generate the amortization table
        generateAmortizationTable(newRemainingBalance, newMonthlyPayment, monthlyInterestRate, remainingTerm);

        smoothScrollToSubmit();
    });
});

function clearInputs() {
    document.getElementById('remainingBalance').value = '';
    document.getElementById('interestRate').value = '';
    document.getElementById('currentMonthlyPayment').value = '';
    document.getElementById('recastingPayment').value = '';
    document.getElementById('recastingCost').value = '';
    document.getElementById('recastBalance').innerHTML = '';
    document.getElementById('monthlyPayment').innerHTML = '';
    document.getElementById('totalPayments').innerHTML = '';
    document.getElementById('totalInterestPaid').innerHTML = '';
    document.getElementById('totalPayment').innerHTML = '';

    document.getElementById('comparisn').innerHTML = '';
    document.getElementById('field').innerHTML = '';
    document.getElementById('original').innerHTML = '';
    document.getElementById('recast').innerHTML = '';
    document.getElementById('comparisonTableBody').innerHTML = '';

    document.querySelector(".my-result-area").style.display = '';
    document.querySelector(".my-comparisn-area").style.display = '';
    document.querySelector(".my-amortization-area").style.display = '';

    document.getElementById("schedule").innerHTML = "";
    document.getElementById("head-payment-no").innerHTML = "";
    document.getElementById("head-principal").innerHTML = "";
    document.getElementById("head-interest").innerHTML = "";
    document.getElementById("head-interest-paid").innerHTML = "";
    document.getElementById("head-ending-balance").innerHTML = "";
    document.getElementById('amortizationTableBody').innerHTML = '';

    clearErrorMessages();
}

function generateAmortizationTable(balance, monthlyPayment, monthlyInterestRate, remainingTerm) {
    const tableBody = document.getElementById('amortizationTableBody');
    tableBody.innerHTML = ''; // Clear any existing rows

    let totalInterestPaid = 0;

    for (let i = 1; i <= remainingTerm; i++) {
        const interestPayment = balance * monthlyInterestRate;
        const principalPayment = monthlyPayment - interestPayment;
        totalInterestPaid += interestPayment;
        balance -= principalPayment;

        if (balance < 0) balance = 0; // Avoid negative balance

        // showing table head dynamically 
        document.getElementById("schedule").innerHTML = "New Monthly Amortization Schedule";
        document.getElementById("head-payment-no").innerHTML = "Month";
        document.getElementById("head-principal").innerHTML = "Principal";
        document.getElementById("head-interest").innerHTML = "Interest";
        document.getElementById("head-interest-paid").innerHTML = "Interest Paid";
        document.getElementById("head-ending-balance").innerHTML = "Ending Balance";

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${i}</td>
            <td>$&nbsp;${principalPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
            <td>$&nbsp;${interestPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
            <td>$&nbsp;${totalInterestPaid.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
            <td>$&nbsp;${balance.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
        `;
        tableBody.appendChild(row);
    }
}

function validateInputs(remainingBalance, interestRate, currentMonthlyPayment, recastingPayment, recastingCost) {
    let valid = true;

    if (isNaN(remainingBalance) || remainingBalance <= 0) {
        showError('remainingBalance', 'Please enter a valid positive remaining balance.');
        valid = false;
    }
    if (isNaN(interestRate) || interestRate <= 0) {
        showError('interestRate', 'Please enter a valid positive interest rate.');
        valid = false;
    }
    if (isNaN(currentMonthlyPayment) || currentMonthlyPayment <= 0) {
        showError('currentMonthlyPayment', 'Please enter a valid positive current monthly payment.');
        valid = false;
    }
    if (isNaN(recastingPayment) || recastingPayment <= 0) {
        showError('recastingPayment', 'Please enter a valid positive recasting payment.');
        valid = false;
    }
    if (isNaN(recastingCost) || recastingCost < 0) {
        showError('recastingCost', 'Please enter a valid non-negative recasting cost.');
        valid = false;
    }

    return valid;
}

function showError(inputId, message) {
    const inputElement = document.getElementById(inputId);
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.innerText = message;
    inputElement.parentNode.appendChild(errorElement);
}

function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(error => error.remove());
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
