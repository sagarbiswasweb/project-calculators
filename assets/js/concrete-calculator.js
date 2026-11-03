document.addEventListener('DOMContentLoaded', function () {
    // Concrete density (kg per cubic meter and lbs per cubic foot)
    const concreteDensityKgPerM3 = 2130; // in kg/m³
    const concreteDensityLbsPerFt3 = 133; // in lbs/ft³

    // Function to convert units to meters
    function convertToMeters(value, unit) {
        switch (unit) {
            case 'centimeter':
                return value / 100;
            case 'inch':
                return value * 0.0254;
            case 'feet':
                return value * 0.3048;
            case 'yard':
                return value * 0.9144;
            case 'meter':
            default:
                return value; // Already in meters
        }
    }

    // Function to validate inputs
    function validateInputs(length, width, depth) {
        if (isNaN(length) || length <= 0) {
            alert("Please enter a valid length greater than 0.");
            return false;
        }
        if (isNaN(width) || width <= 0) {
            alert("Please enter a valid width greater than 0.");
            return false;
        }
        if (isNaN(depth) || depth <= 0) {
            alert("Please enter a valid depth greater than 0.");
            return false;
        }
        return true;
    }

    // Function to calculate concrete and cement bags
    function calculateConcrete() {
        // Get input values
        const length = parseFloat(document.getElementById('length').value);
        const width = parseFloat(document.getElementById('width').value);
        const depth = parseFloat(document.getElementById('depth').value);

        const lengthUnit = document.getElementById('length-unit').value;
        const widthUnit = document.getElementById('width-unit').value;
        const depthUnit = document.getElementById('depth-unit').value;

        // Validate inputs
        if (!validateInputs(length, width, depth)) {
            return;
        }

        // Convert units to meters
        const lengthInMeters = convertToMeters(length, lengthUnit);
        const widthInMeters = convertToMeters(width, widthUnit);
        const depthInMeters = convertToMeters(depth, depthUnit);

        // Calculate volume in cubic meters
        const volumeInCubicMeters = lengthInMeters * widthInMeters * depthInMeters;

        // Convert volume to other units
        const volumeInCubicFeet = volumeInCubicMeters * 35.3147; // m³ to ft³
        const volumeInCubicYards = volumeInCubicMeters * 1.30795; // m³ to yd³

        // Calculate the weight of concrete needed
        const weightInKg = volumeInCubicMeters * concreteDensityKgPerM3; // kg
        const weightInLbs = volumeInCubicFeet * concreteDensityLbsPerFt3; // lbs

        // Convert the weight of cement to bags in lb
        const bags60lb = weightInLbs / 60; // 60 lb bags
        const bags80lb = weightInLbs / 80; // 80 lb bags

        // how many cement bags are needed
        const bags50kg = weightInKg / 50;

        // Display the results
        document.getElementById('result').innerHTML = `
            <tr>
                <td><strong>Concrete volume:</strong></td>
                <td>${volumeInCubicFeet.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ft<sup>3</sup> or 
                    ${volumeInCubicYards.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} yd<sup>3</sup> or 
                    ${volumeInCubicMeters.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} m<sup>3</sup>
                </td>
            </tr>
            <tr>
                <td><strong>Total concrete weight needed:</strong></td>
                <td>${weightInLbs.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} lbs or ${weightInKg.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} kg</td>
            </tr>
            <br>
            <tr>
                <td><strong>Use of 60 lb bags:</strong></td>
                <td>${Math.ceil(bags60lb).toLocaleString()} bags</td>
            </tr>
            <tr>
                <td><strong>Use of 80 lb bags:</strong></td>
                <td>${Math.ceil(bags80lb).toLocaleString()} bags</td>
            </tr>
            <tr>
                <td><strong>Use of 50 kg bags:</strong></td>
                <td>${Math.ceil(bags50kg).toLocaleString()} bags</td>
            </tr>
        `;

        // Show the result area
        document.querySelector(".my-result-area").style.display = 'block';
        smoothScrollToSubmit();
    }

    // Function to clear inputs
    function clearInputs() {
        document.getElementById('concrete-calculator').reset();
        document.getElementById('result').innerHTML = '';
        document.querySelector(".my-result-area").style.display = 'none';
    }

    // Attach event listeners to buttons
    document.getElementById('submit').addEventListener('click', function (event) {
        event.preventDefault();
        calculateConcrete();
    });

    document.getElementById('clear').addEventListener('click', function () {
        clearInputs();
    });
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
