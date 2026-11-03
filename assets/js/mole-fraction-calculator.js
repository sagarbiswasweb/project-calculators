document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('moleFraction').addEventListener('submit', function(event) {
        event.preventDefault();
        calculateMoleFraction();
        smoothScrollToSubmit();
    });

    document.getElementById('clear').addEventListener('click', function() {
        clearInputs();
    });
});

function calculateMoleFraction() {
    let molesSolute = parseFloat(document.getElementById('moles-solute').value);
    let molesSolvent = parseFloat(document.getElementById('moles-solvent').value);

    if (isNaN(molesSolute) || isNaN(molesSolvent) || molesSolute < 0 || molesSolvent < 0) {
        document.getElementById('result').innerHTML = 'Please enter valid positive numbers for moles.';
        return;
    }

    let totalMoles = molesSolute + molesSolvent;
    let moleFractionSolute = molesSolute / totalMoles;

    document.getElementById('mole-fraction').innerHTML = `
        <td>Mole Fraction</td> 
        <td>${moleFractionSolute.toFixed(5)}</td>
    `;

    document.getElementById('mole-percent').innerHTML = `
        <td>Mole Percent</td>
        <td>${(moleFractionSolute * 100).toFixed(5)}%</td>
    `;

    document.getElementById('mole-solution').innerHTML = `
        <td>Mole Solution</td>
        <td>${(totalMoles)}</td>
    `;


    // Show the result area
    document.querySelector(".my-result-area").style.display = 'block';
}

function clearInputs() {
    document.getElementById('moles-solute').value = '';
    document.getElementById('moles-solvent').value = '';
    document.querySelector(".my-result-area").style.display = '';
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