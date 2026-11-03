document.addEventListener('DOMContentLoaded', function() {
    // Function to calculate total income and gross monthly income
    function calculateIncome(event) {
        event.preventDefault();

        const baseSalary = parseFloat(document.getElementById('baseSalary').value) || 0;
        const bonuses = parseFloat(document.getElementById('bonuses').value) || 0;
        const benefits = parseFloat(document.getElementById('benefits').value) || 0;
        const overtime = parseFloat(document.getElementById('overtime').value) || 0;
        const incentives = parseFloat(document.getElementById('incentives').value) || 0;

        const totalIncome = baseSalary + bonuses + benefits + overtime + incentives;
        const grossMonthlyIncome = totalIncome / 12;

        document.getElementById('total-annual-income').innerHTML = `
            <td>Total Annual Income: $${totalIncome.toFixed(2)}</td>
        `;
        document.getElementById('gross-monthly-income').innerHTML = `
            <td>Gross Monthly Income: $${grossMonthlyIncome.toFixed(2)}</td>
        `;

        // Show the result area
        document.querySelector(".my-result-area").style.display = 'block';
        smoothScrollToSubmit();
    }

    // Function to clear input fields
    function clearInputs() {
        document.getElementById('baseSalary').value = '';
        document.getElementById('bonuses').value = '';
        document.getElementById('benefits').value = '';
        document.getElementById('overtime').value = '';
        document.getElementById('incentives').value = '';
        document.getElementById('total-annual-income').innerHTML = '';
        document.getElementById('gross-monthly-income').innerHTML = '';
        document.querySelector(".my-result-area").style.display = '';
    }

    // Event listeners
    document.getElementById('gm-income-calculator').addEventListener('submit', calculateIncome);
    document.getElementById('clear').addEventListener('click', clearInputs);
});

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
