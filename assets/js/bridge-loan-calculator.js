document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("bridge-loan-A").addEventListener("submit", function(event) {
        event.preventDefault();
        calculateLoanA();
    });

    document.getElementById("bridge-loan-B").addEventListener("submit", function(event) {
        event.preventDefault();
        calculateLoanB();
    });

    document.getElementById("clearA").addEventListener("click", clearInputsA);
    document.getElementById("clearB").addEventListener("click", clearInputsB);

    function calculateLoanA() {
        // Get input values
        const currentMarketValue = parseFloat(document.getElementById('currentMarketValue').value);
        const loanToValue = parseFloat(document.getElementById('loanToValue').value) / 100;
        const outstandingMortgage = parseFloat(document.getElementById('outstandingMortgage').value);
        const closingCosts = parseFloat(document.getElementById('closingCosts').value);

        // Validate input values
        if (currentMarketValue <= 0 || loanToValue <= 0 || outstandingMortgage <= 0 || closingCosts <= 0) {
            alert("All input values must be greater than 0.");
            return;
        }

        if (document.getElementById('loanToValue').value > 100) {
            alert("Loan to Value cannot be greater than 100.");
            document.getElementById('loanToValue').value = "";
            return false;
        }

        // Calculate bridge loan amount
        const bridgeLoanAmount = currentMarketValue * loanToValue;
        const availableCashOut = bridgeLoanAmount - outstandingMortgage - closingCosts;

        // Display results
        document.getElementById('result-A').innerHTML = `
            <strong>Available Cash Out for Down Payment:</strong> $${availableCashOut.toFixed(2)}<br>
            <strong>Bridge Loan Amount:</strong> $${bridgeLoanAmount.toFixed(2)}
        `;
        // Show the result area
        document.querySelector(".my-result-area").style.display = 'block';

        smoothScrollToSubmitA();
    }

    function calculateLoanB() {
        // Check if Loan A has been calculated
        const resultAElement = document.getElementById('result-A');
        if (!resultAElement.innerHTML.trim()) {
            alert("Please calculate Loan A before calculating Loan B.");
            return;
        }

        // Get input values
        const purchasePrice = parseFloat(document.getElementById('purchasePrice').value);
        const cashForDownPayment = parseFloat(document.getElementById('cashForDownPayment').value);
        const closingCosts = parseFloat(document.getElementById('closingCosts').value);

        // Validate input values
        if (purchasePrice <= 0 || cashForDownPayment <= 0 || closingCosts <= 0) {
            alert("All input values must be greater than 0.");
            return;
        }

        // Get available cash from Loan A calculation
        const availableCashBridgeLoan = parseFloat(document.getElementById('result-A').innerHTML.split('$')[1]);

        // Calculate new property loan amount and LTV
        const newPropertyLoanAmount = purchasePrice - cashForDownPayment - availableCashBridgeLoan - closingCosts;
        const newPropertyLTV = (newPropertyLoanAmount / purchasePrice) * 100;

        // Display results
        document.getElementById('result-B').innerHTML = `
            <strong>Available Cash from Bridge Loan:</strong> $${availableCashBridgeLoan.toFixed(2)}<br>
            <strong>New Property Loan Amount:</strong> $${newPropertyLoanAmount.toFixed(2)}<br>
            <strong>New Property Loan-to-Value:</strong> ${newPropertyLTV.toFixed(2)}%
        `;
        // Show the result area
        document.querySelector(".my-result-area-b").style.display = 'block';

        smoothScrollToSubmitB();
    }

    function clearInputsA() {
        document.getElementById('currentMarketValue').value = '';
        document.getElementById('loanToValue').value = '';
        document.getElementById('outstandingMortgage').value = '';
        document.getElementById('closingCosts').value = '';
        document.getElementById('result-A').innerText = '';
        document.querySelector(".my-result-area").style.display = '';
    }

    function clearInputsB() {
        document.getElementById('purchasePrice').value = '';
        document.getElementById('cashForDownPayment').value = '';
        document.getElementById('result-B').innerText = '';
        document.querySelector(".my-result-area-b").style.display = '';
    }
});

function smoothScrollToSubmitA() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        setTimeout(() => {
            document.getElementById("submitA").scrollIntoView({ behavior: 'smooth' });
        }, 300);
    } else {
        document.getElementById("submitA").scrollIntoView({ behavior: 'smooth' });
    }
}
function smoothScrollToSubmitB() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        setTimeout(() => {
            document.getElementById("submitB").scrollIntoView({ behavior: 'smooth' });
        }, 300);
    } else {
        document.getElementById("submitB").scrollIntoView({ behavior: 'smooth' });
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
