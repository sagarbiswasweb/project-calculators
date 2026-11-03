document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('barndominium').addEventListener('submit', function (event) {
        event.preventDefault();
        calculateCost();
    });
});

function calculateCost() {
    // Get input values and validate
    const livingArea = parseFloat(document.getElementById('livingArea').value);
    const barnArea = parseFloat(document.getElementById('barnArea').value);
    const openArea = parseFloat(document.getElementById('openArea').value);
    const constructionCost = parseFloat(document.getElementById('constructionCost').value);
    const finishingCost = parseFloat(document.getElementById('finishingCost').value);

    // Validation
    if (isNaN(livingArea) || livingArea <= 0) {
        alert('Please enter a valid number greater than 0 for Living Area.');
        return false;
    }

    if (isNaN(barnArea) || barnArea <= 0) {
        alert('Please enter a valid number greater than 0 for Barn Area.');
        return false;
    }

    if (isNaN(openArea) || openArea <= 0) {
        alert('Please enter a valid number greater than 0 for Open Area.');
        return false;
    }

    if (isNaN(constructionCost) || constructionCost <= 0) {
        alert('Please enter a valid number greater than 0 for Construction Cost.');
        return false;
    }

    if (isNaN(finishingCost) || finishingCost <= 0) {
        alert('Please enter a valid number greater than 0 for Finishing Cost.');
        return false;
    }

    const totalArea = livingArea + barnArea + openArea;
    const totalAreaCost = totalArea * constructionCost;
    const totalFinishingCost = totalArea * finishingCost;

    // Calculate total cost
    const totalCost = totalAreaCost + totalFinishingCost;

    // Display the result
    document.getElementById('result').innerHTML = `
        <h4>Estimated Total Cost: $${totalCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h4>
    `;

    // Update table info
    document.getElementById('totalConstructionCost').innerHTML = `
        <td style="background-color: rgb(181, 243, 174);">Total construction cost:</td>
        <td style="background-color: rgb(181, 243, 174);">$${totalAreaCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
    `;
    document.getElementById('totalFinishingCost').innerHTML = `
        <td style="background-color: rgb(181, 243, 174);">Total finishing cost:</td>
        <td style="background-color: rgb(181, 243, 174);">$${totalFinishingCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
    `;
    document.getElementById('livingAreaInfo').innerHTML = `
        <td>Living area size:</td>
        <td>${livingArea.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} square foot</td>
    `;
    document.getElementById('barnAreaInfo').innerHTML = `
        <td>Barn area size:</td>
        <td>${barnArea.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} square foot</td>
    `;
    document.getElementById('openAreaInfo').innerHTML = `
        <td>Open area size:</td>
        <td>${openArea.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} square foot</td>
    `;
    document.getElementById('constructionCostInfo').innerHTML = `
        <td>Construction cost per square foot:</td>
        <td>$${constructionCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
    `;
    document.getElementById('finishingCostInfo').innerHTML = `
        <td>Finishing cost per square foot:</td>
        <td>$${finishingCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
    `;
    
    // Show the result area
    document.querySelector(".my-result-area").style.display = 'block';
    smoothScrollToSubmit();
}

function clearInputs() {
    document.getElementById('barndominium').reset();
    document.getElementById('result').innerHTML = '';
    document.querySelector(".my-result-area").style.display = 'none';
}

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
