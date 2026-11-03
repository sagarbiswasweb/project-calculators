// JavaScript code for the Towing Estimate Calculator

// Base rates for the towing service
const baseRates = {
    distance: { min: 2.5, max: 7 }, // $2.50 to $7 per mile
    vehicleType: {
        smallCar: 50,
        largeCar: 70,
        truck: 90,
        suv: 80
    },
    location: {
        urban: { min: 35, max: 125 }, // $35 to $125 for the first 5 miles, then per mile rates
        suburban: { min: 35, max: 125 },
        rural: { min: 125, max: 275 } // $125 to $275 for 5 to 40 miles, then per mile rates
    },
    timeOfDay: {
        daytime: 0,
        nighttime: { min: 20, max: 50 },
        weekend: { min: 20, max: 50 },
        holiday: { min: 30, max: 100 }
    },
    towType: {
        flatbed: { min: 95, max: 125 },
        wheelLift: { min: 75, max: 100 },
        dolly: { min: 60, max: 80 },
        heavyDuty: { min: 1600, max: 1700 } // Up to $1,700 for large vehicles
    },
    additionalServices: {
        roadsideAssistance: { min: 30, max: 100 },
        vehicleRecovery: { min: 70, max: 200 }
    }
};

// Function to calculate towing cost
function calculateTowingCost(distance, vehicleType, location, timeOfDay, towType, additionalServices = []) {
    const distanceCost = distance * (baseRates.distance.min + baseRates.distance.max) / 2;
    const vehicleTypeCost = baseRates.vehicleType[vehicleType];
    const locationCost = (baseRates.location[location].min + baseRates.location[location].max) / 2;
    const timeOfDayCost = (timeOfDay === 'daytime') ? 0 : (baseRates.timeOfDay[timeOfDay].min + baseRates.timeOfDay[timeOfDay].max) / 2;
    const towTypeCost = (baseRates.towType[towType].min + baseRates.towType[towType].max) / 2;

    let additionalServicesCost = 0;
    additionalServices.forEach(service => {
        additionalServicesCost += (baseRates.additionalServices[service].min + baseRates.additionalServices[service].max) / 2;
    });

    const totalCost = distanceCost + vehicleTypeCost + locationCost + timeOfDayCost + towTypeCost + additionalServicesCost;
    return totalCost;
}

// Event listener for the form submission
document.getElementById('towing-estimate-calculator').addEventListener('submit', function (event) {
    event.preventDefault();
    
    // Getting values from the form
    const distance = parseFloat(document.getElementById('distance').value);
    const vehicleType = document.getElementById('vehicleType').value;
    const location = document.getElementById('location').value;
    const timeOfDay = document.getElementById('timeOfDay').value;
    const towType = document.getElementById('towType').value;

    // Getting additional services
    const additionalServices = Array.from(document.querySelectorAll('input[name="additionalServices"]:checked')).map(el => el.value);

    // Validate input values
    if (isNaN(distance)) {
        alert("Please give a valid info in the distance input field.");
        return;
    }
    if(vehicleType === 'select'){
        alert("Please select a vehicle type.");
        return;
    }
    if(location === 'select'){
        alert("Please select a location.");
        return;
    }
    if(timeOfDay === 'select'){
        alert("Please select time of day.");
        return;
    }
    if(towType === 'select'){
        alert("Please select two type.");
        return;
    }

    // Calculate the cost
    const cost = calculateTowingCost(distance, vehicleType, location, timeOfDay, towType, additionalServices);

    // Display the result
    document.getElementById('result').innerHTML = `<td>Estimated towing cost: $${cost.toFixed(2)}</td>`;
    document.querySelector(".my-result-area").style.display = 'block';
    smoothScrollToSubmit();
});

// Function to clear the form inputs
function clearInputs() {
    document.getElementById('towing-estimate-calculator').reset();
    document.getElementById('result').innerHTML = '';
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
