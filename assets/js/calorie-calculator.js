document.getElementById('submit-us').addEventListener('click', function (event) {
    event.preventDefault();

    let age = parseFloat(document.getElementById('age-us').value);
    let gender = document.querySelector('input[name="gender"]:checked');
    let heightFeet = parseFloat(document.getElementById('us-height-feet').value);
    let heightInches = parseFloat(document.getElementById('us-height-inches').value);
    let weight = parseFloat(document.getElementById('weight-us').value);
    let activity = document.getElementById('activity-us').value;

    if (!age || !gender || !heightFeet || !heightInches || !weight || activity === "select") {
        alert("Please fill out all fields.");
        return;
    }

    let bmr;
    let heightInInches = (heightFeet * 12) + heightInches;

    if (gender.value === 'male-us') {
        bmr = 66 + (6.23 * weight) + (12.7 * heightInInches) - (6.8 * age);
    } else if (gender.value === 'female-us') {
        bmr = 655 + (4.35 * weight) + (4.7 * heightInInches) - (4.7 * age);
    }

    let calorieIntake = calculateCalorieIntake(bmr, activity);
    showResult(calorieIntake, "US");
});

document.getElementById('submit-metric').addEventListener('click', function (event) {
    event.preventDefault();

    let age = parseFloat(document.getElementById('age-metric').value);
    let gender = document.querySelector('input[name="gender"]:checked');
    let height = parseFloat(document.getElementById('metric-height-feet').value);
    let weight = parseFloat(document.getElementById('weight-metric').value);
    let activity = document.getElementById('activity-metric').value;

    if (!age || !gender || !height || !weight || activity === "select") {
        alert("Please fill out all fields.");
        return;
    }

    let bmr;

    if (gender.value === 'male-metric') {
        bmr = 66.5 + (13.75 * weight) + (5.003 * height) - (6.75 * age);
    } else if (gender.value === 'female-metric') {
        bmr = 655.1 + (9.563 * weight) + (1.850 * height) - (4.676 * age);
    }

    let calorieIntake = calculateCalorieIntake(bmr, activity);
    showResult(calorieIntake, "Metric");
});

function calculateCalorieIntake(bmr, activity) {
    let multiplier;

    switch (activity) {
        case "no-exercise":
            multiplier = 1.2;
            break;
        case "light-exercise":
            multiplier = 1.375;
            break;
        case "moderate-exercise":
            multiplier = 1.55;
            break;
        case "active":
            multiplier = 1.725;
            break;
        case "very-active":
            multiplier = 1.9;
            break;
        case "extra-active":
            multiplier = 2.2;
            break;
        default:
            multiplier = 1.2;
    }

    return bmr * multiplier;
}

function showResult(calorieIntake, unit) {
    let resultDiv = document.getElementById("result");
    resultDiv.innerHTML = `
        <tr>
            <td><strong>Your estimated daily calorie intake:</strong></td>
            <td>${calorieIntake.toFixed(2)} calories (${unit} Units)</td>
        </tr>`;
        document.querySelector(".my-result-area").style.display = 'block';
        smoothScrollToSubmit();
}

function clearInputs() {
    document.getElementById("calorie-calculator").reset();
    document.querySelector(".my-result-area").style.display = '';
}

document.getElementById("calorie-calculator").addEventListener("submit", function (event) {
    event.preventDefault();
});

function smoothScrollToSubmit() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
        setTimeout(() => {
            document.getElementById("submit-us").scrollIntoView({ behavior: 'smooth' });
            document.getElementById("submit-metric").scrollIntoView({ behavior: 'smooth' });
        }, 300);
    } else {
        document.getElementById("submit-us").scrollIntoView({ behavior: 'smooth' });
        document.getElementById("submit-metric").scrollIntoView({ behavior: 'smooth' });
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
