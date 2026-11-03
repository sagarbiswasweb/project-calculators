document.getElementById('submit').addEventListener('click', function(event) {
    event.preventDefault();
    calculateCost();
    
});

function calculateCost() {
    // Retrieve form values
    const junkType = document.getElementById('junkType').value;
    const quantity = parseFloat(document.getElementById('quantity').value);
    const laborHours = parseFloat(document.getElementById('laborHours').value);
    const location = document.getElementById('location').value;

    // Validation
    if (junkType === 'select') {
        alert('Please select a type of junk');
        return false;
    }
    if (isNaN(quantity) || quantity <= 0) {
        alert("Please enter a valid quantity (greater than 0)");
        return false;
    }
    if (isNaN(laborHours) || laborHours <= 0) {
        alert("Please enter valid labor hours (greater than 0)");
        return false;
    }
    if (location === 'select') {
        alert("Please select a location");
        return false;
    }

    // Base fees and rates
    const baseFee = 50;
    const volumeRate = 30; // $ per cubic yard
    const laborRate = 25;  // $ per hour
    const transportationFee = 10;

    // Junk type multipliers
    const junkTypeMultipliers = {
        furniture: 1.0,
        appliances: 1.2,
        electronics: 1.3,
        construction: 1.5
    };

    const junkMultiplier = junkTypeMultipliers[junkType];

    // Adjusted rates based on location
    let locationMultiplier = 1;
    if (location === 'suburban') {
        locationMultiplier = 1.1;
    } else if (location === 'rural') {
        locationMultiplier = 1.2;
    }

    // Calculate individual costs
    const volumeCost = quantity * volumeRate * junkMultiplier;
    const laborCost = laborHours * laborRate;
    const totalCost = (baseFee + volumeCost + laborCost + transportationFee) * locationMultiplier;

    // Display the result
    document.getElementById('result').innerHTML = `<h4>Estimated Cost: $${totalCost.toFixed(2)}</h4>`;

    // Display detailed info
    document.getElementById('junkTypeInfo').innerHTML = `<th>Type of Junk</th><td>${junkType}</td>`;
    document.getElementById('quantityInfo').innerHTML = `<th>Quantity (cubic yards)</th><td>${quantity} yd³</td>`;
    document.getElementById('laborHoursInfo').innerHTML = `<th>Labor Hours</th><td>${laborHours} hr</td>`;
    document.getElementById('locationInfo').innerHTML = `<th>Location</th><td>${location}</td>`;
    // Show the result area
    document.querySelector(".my-result-area").style.display = 'block';

    smoothScrollToSubmit();
}

function clearInputs() {
    document.getElementById('junkType').value = 'select';
    document.getElementById('quantity').value = '';
    document.getElementById('laborHours').value = '';
    document.getElementById('location').value = 'select';
    document.getElementById('result').innerHTML = '';
    document.getElementById('junkTypeInfo').innerHTML = '';
    document.getElementById('quantityInfo').innerHTML = '';
    document.getElementById('laborHoursInfo').innerHTML = '';
    document.getElementById('locationInfo').innerHTML = '';
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
