document.getElementById('invisalign').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const treatmentCost = parseFloat(document.getElementById('treatmentCost').value);
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const insuranceCoverage = parseFloat(document.getElementById('insuranceCoverage').value);
    const treatmentLength = parseFloat(document.getElementById('treatmentLength').value);
    
    if(validate(treatmentCost, downPayment, insuranceCoverage, treatmentLength)){
        const totalCost = treatmentCost - downPayment - insuranceCoverage;
        const monthlyPayment = totalCost / treatmentLength;
        const weeklyPayment = monthlyPayment / 4; // Approximate number of weeks in a month

        document.getElementById('result').innerHTML = `<h4>Approx Total Cost: $${totalCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h4>`;
        document.getElementById('result-1').innerHTML = `<h4>Approx Weekly Payment: $${weeklyPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h4>`;

        document.getElementById('treatmentCostInfo').innerHTML = `<th>Treatment Cost</th><td>$${treatmentCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>`;
        document.getElementById('downPaymentInfo').innerHTML = `<th>Down Payment</th><td>$${downPayment.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>`;
        document.getElementById('insuranceCoverageInfo').innerHTML = `<th>Insurance Coverage</th><td>$${insuranceCoverage.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>`;
        document.getElementById('treatmentLengthInfo').innerHTML = `<th>Treatment Length</th><td>${treatmentLength} months</td>`;
        // Show the result area
        document.querySelector(".my-result-area").style.display = 'block';
        
        smoothScrollToSubmit();
    }
});

function validate(treatmentCost, downPayment, insuranceCoverage, treatmentLength){
    if (treatmentCost < 0) {
        alert('Treatment cost cannot be less than 0');
        return false;
    }

    if(downPayment < 0){
        alert('Down payment cannot be less than 0');
        return false;
    }

    if(insuranceCoverage < 0){
        alert('Insurance coverage cannot be less than 0');
        return false;
    }

    if(treatmentLength < 1){
        alert('Treatment length cannot be less than 1 month');
        return false;
    }

    if (treatmentLength > 36){
        alert('Treatment length cannot be greater than 36 month');
        return false;
    }

    if (downPayment >= treatmentCost) {
        alert('Down payment cannot be greater than or equal to the treatment cost.');
        return false;
    }

    if (insuranceCoverage >= treatmentCost){
        alert('Insurance coverage cannot be greater than or equal to the treatment cost');
        return false;
    }

    return true;
}

function clearInputs() {
    document.getElementById('invisalign').reset();
    document.getElementById('result').innerHTML = '';
    document.getElementById('result-1').innerHTML = '';
    document.getElementById('treatmentCostInfo').innerHTML = '';
    document.getElementById('downPaymentInfo').innerHTML = '';
    document.getElementById('insuranceCoverageInfo').innerHTML = '';
    document.getElementById('treatmentLengthInfo').innerHTML = '';
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
