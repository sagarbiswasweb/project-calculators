document.addEventListener('DOMContentLoaded', function () {
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

    // Function to convert price unit to cost per kg
    function convertToCostPerKg(price, unit) {
        switch (unit) {
            case 'kg':
                return price; // Price per kg
            case 'metric-ton':
                return price / 1000; // Price per kg (metric ton = 1000 kg)
            case 'pound':
                return price * 0.453592; // Price per kg (pound to kg)
            case 'cubic-meter':
                return price / 1000; // Convert price per cubic meter to per kg (assuming 1000 kg per cubic meter)
            case 'cubic-foot':
                return (price / 1000) * 35.3147; // Convert price per cubic foot to per kg (1 cubic meter = 35.3147 cubic feet)
            case 'cubic-yard':
                return (price / 1000) * 1.30795; // Convert price per cubic yard to per kg (1 cubic meter = 1.30795 cubic yards)
            default:
                return price; // Default case
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

    // Function to calculate sand
    function calculateSand() {
        // Get input values
        const length = parseFloat(document.getElementById('length').value);
        const width = parseFloat(document.getElementById('width').value);
        const depth = parseFloat(document.getElementById('depth').value);
        const sandPrice = parseFloat(document.getElementById('sand-price').value);
        const sandPriceUnit = document.getElementById('sand-price-unit').value;

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

        // Convert volume to cubic yards and cubic feet
        const volumeInCubicYards = volumeInCubicMeters * 1.30795; // m³ to yd³
        const volumeInCubicFeet = volumeInCubicMeters * 35.3147; // m³ to ft³

        // Calculate the weight of sand needed
        const sandDensity = 1601.95; // Density of sand in kg/m³ (for dry sand)
        const weightInKg = volumeInCubicMeters * sandDensity;
        const weightInTons = weightInKg / 1000; // Convert kg to tons
        const weightInLbs = weightInKg * 2.20462; // kg to lbs

        // If sand price is provided, calculate cost
        let totalCost = "N/A";
        if (!isNaN(sandPrice) && sandPrice > 0) {
            const costPerKg = convertToCostPerKg(sandPrice, sandPriceUnit);
            totalCost = `$ ${(weightInKg * costPerKg).toFixed(2)}`;
        }

        // Display the results
        document.getElementById('result').innerHTML = `
            <tr>
                <td><strong>Sand volume:</strong></td>
                <td>${volumeInCubicMeters.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} m<sup>3</sup> (${volumeInCubicYards.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} yd<sup>3</sup> / ${volumeInCubicFeet.toFixed(3).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} ft³)</td>
            </tr>
            <tr>
                <td><strong>Sand Needed:</strong></td>
                <td>${weightInTons.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} tons (${weightInKg.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',') } kg / ${weightInLbs.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')} lbs)</td>
            </tr>
            <tr>
                <td><strong>Total cost:</strong></td>
                <td>${totalCost.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td>
            </tr>
        `;

        // Show the result area
        document.querySelector(".my-result-area").style.display = 'block';
        smoothScrollToSubmit();
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

    // Function to clear inputs
    function clearInputs() {
        document.getElementById('sand-calculator').reset();
        document.getElementById('result').innerHTML = '';
        document.querySelector(".my-result-area").style.display = '';
    }

    // Attach event listeners to buttons
    document.getElementById('submit').addEventListener('click', function (event) {
        event.preventDefault();
        calculateSand();
    });

    document.getElementById('clear').addEventListener('click', function () {
        clearInputs();
    });

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
});
