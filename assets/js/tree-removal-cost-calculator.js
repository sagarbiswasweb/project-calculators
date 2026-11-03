document.getElementById('tree-removal').addEventListener('submit', function(e) {
    e.preventDefault();
    if (validate()) {
        calculateCost();
        smoothScrollToSubmit();
    }
});

function validate() {
    const tree = document.getElementById('tree').value;
    const height = document.getElementById('height').value;
    const diameter = document.getElementById('diameter').value;
    const location = document.getElementById('location').value;
    const stump = document.getElementById('stump').value;
    const debris = document.getElementById('debris').value;

    if (tree === 'select') {
        alert("Please select a tree type.");
        return false;
    }

    if (height === '' || isNaN(height) || parseFloat(height) <= 0) {
        alert("Please enter a valid tree height.");
        return false;
    }

    if (diameter === '' || isNaN(diameter) || parseFloat(diameter) <= 0) {
        alert("Please enter a valid tree diameter.");
        return false;
    }

    if (location === 'select') {
        alert("Please select a location.");
        return false;
    }

    if (stump === 'select') {
        alert("Please select an option for stump removal.");
        return false;
    }

    if (debris === 'select') {
        alert("Please select an option for debris removal.");
        return false;
    }

    return true;
}

function calculateCost() {

    const treeSelect = document.getElementById('tree');
    const treeType = treeSelect.options[treeSelect.selectedIndex].text;

    const height = parseFloat(document.getElementById('height').value);
    const diameter = parseFloat(document.getElementById('diameter').value);
    const location = document.getElementById('location').value;
    const stumpRemoval = document.getElementById('stump').value === 'yes';
    const debrisRemoval = document.getElementById('debris').value === 'yes';

    let baseCost = 300;
    if (height > 30) {
        baseCost += (Math.ceil((height - 30) / 10)) * 100;
    }

    let diameterCost = 0;
    if (diameter > 15) {
        diameterCost = (Math.ceil((diameter - 15) / 5)) * 50;
    }

    let locationCost = 0;
    if (location === 'difficult') {
        locationCost = 150;
    }

    let stumpCost = stumpRemoval ? 150 : 0;
    let debrisCost = debrisRemoval ? 100 : 0;

    const totalCost = baseCost + diameterCost + locationCost + stumpCost + debrisCost;

    displayResult(totalCost, treeType, height, diameter, stumpRemoval, debrisRemoval, location);
}

function displayResult(totalCost, treeType, height, diameter, stumpRemoval, debrisRemoval, location) {
    document.getElementById('result').innerHTML = `<h4>Estimated Cost: $${totalCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</h4>`;

    document.getElementById('tree-type').innerHTML = `<td>Tree Type:</td><td>${treeType}</td>`;
    document.getElementById('tree-info').innerHTML = `<td>Tree Height:</td><td>${height} feet</td>`;
    document.getElementById('diameter-info').innerHTML = `<td>Tree Diameter:</td><td>${diameter} inches</td>`;
    document.getElementById('location-info').innerHTML = `<td>Location:</td><td>${location === 'easy' ? 'Easy Access, Flat Terrain' : 'Difficult Access, Sloped Terrain'}</td>`;
    document.getElementById('stump-info').innerHTML = `<td>Stump Removal:</td><td>${stumpRemoval ? 'Yes' : 'No'}</td>`;
    document.getElementById('debris-info').innerHTML = `<td>Debris Removal:</td><td>${debrisRemoval ? 'Yes' : 'No'}</td>`;

    // Show the result area
    document.querySelector(".my-result-area").style.display = 'block';
}

function clearInputs() {
    document.getElementById('tree-removal').reset();
    document.getElementById('result').innerHTML = '';
    document.getElementById('tree-type').innerHTML = '';
    document.getElementById('tree-info').innerHTML = '';
    document.getElementById('diameter-info').innerHTML = '';
    document.getElementById('height-info').innerHTML = '';
    document.getElementById('location-info').innerHTML = '';
    document.getElementById('stump-info').innerHTML = '';
    document.getElementById('debris-info').innerHTML = '';
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
