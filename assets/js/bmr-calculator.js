document.getElementById('submit-us').addEventListener('click', function (event) {
    event.preventDefault();

    let age = parseFloat(document.getElementById('age-us').value);
    let gender = document.querySelector('input[name="gender"]:checked');
    let heightFeet = parseFloat(document.getElementById('us-height-feet').value);
    let heightInches = parseFloat(document.getElementById('us-height-inches').value);
    let weight = parseFloat(document.getElementById('weight-us').value);

    // Convert weight to kg, height to cm
    let weightKg = weight * 0.453592;
    let heightCm = (heightFeet * 30.48) + (heightInches * 2.54);

    if (!isNaN(age) && gender && heightCm > 0 && !isNaN(weight)) {
        let bmr;
        if (gender.value === 'male-us') {
            bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
        } else {
            bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
        }
        displayResult(bmr);
    } else {
        displayError();
    }
});

document.getElementById('submit-metric').addEventListener('click', function (event) {
    event.preventDefault();

    let age = parseFloat(document.getElementById('age-metric').value);
    let gender = document.querySelector('input[name="gender"]:checked');
    let heightCm = parseFloat(document.getElementById('metric-height-feet').value);
    let weightKg = parseFloat(document.getElementById('weight-metric').value);

    if (!isNaN(age) && gender && heightCm > 0 && !isNaN(weightKg)) {
        let bmr;
        if (gender.value === 'male-metric') {
            bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
        } else {
            bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
        }
        displayResult(bmr);
    } else {
        displayError();
    }
});

function displayResult(bmr) {
    document.getElementById('result').innerHTML = `
        <tr><td>BMR (Mifflin-St Jeor formula):</td><td>${bmr.toFixed(2)} calories/day</td></tr>
    `;
    document.querySelector(".my-result-area").style.display = 'block';
    smoothScrollToSubmit();
}

function displayError() {
    document.getElementById('result').innerHTML = `
        <td colspan="2" style="color: red;">Please fill in all required fields correctly.</td>
    `;
    document.querySelector(".my-result-area").style.display = 'block';
    smoothScrollToSubmit();
}

function clearInputs() {
    document.getElementById('bmr-calculator').reset();
    document.getElementById('result').innerHTML = '';
    document.querySelector(".my-result-area").style.display = 'none';
}

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
