document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('age-calculator');
    const resultTable = document.getElementById('table-info');

    // Set current date for "Age on" fields
    const currentDate = new Date();
    document.getElementById('age-on-day').value = currentDate.getDate();
    document.getElementById('age-on-month').value = currentDate.getMonth() + 1; // Months are 0-based in JS
    document.getElementById('age-on-year').value = currentDate.getFullYear();

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get the input values
        const birthDay = parseInt(document.getElementById('birth-day').value, 10);
        const birthMonth = parseInt(document.getElementById('birth-month').value, 10);
        const birthYear = parseInt(document.getElementById('birth-year').value, 10);

        const ageOnDay = parseInt(document.getElementById('age-on-day').value, 10);
        const ageOnMonth = parseInt(document.getElementById('age-on-month').value, 10);
        const ageOnYear = parseInt(document.getElementById('age-on-year').value, 10);

        if (isNaN(birthDay) || isNaN(birthMonth) || isNaN(birthYear) ||
            isNaN(ageOnDay) || isNaN(ageOnMonth) || isNaN(ageOnYear)) {
            alert('Please enter valid dates.');
            return;
        }

        // Calculate the exact age
        let years = ageOnYear - birthYear;
        let months = ageOnMonth - birthMonth;
        let days = ageOnDay - birthDay;

        // Adjust for negative days
        if (days < 0) {
            months--;
            const prevMonthDays = new Date(ageOnYear, ageOnMonth - 1, 0).getDate();
            days += prevMonthDays;
        }

        // Adjust for negative months
        if (months < 0) {
            years--;
            months += 12;
        }

        const exactAge = `${years} Years, ${months} Months, and ${days} Days`;

        // Calculate total days, hours, minutes, and seconds
        const birthDate = new Date(birthYear, birthMonth - 1, birthDay);
        const ageOnDate = new Date(ageOnYear, ageOnMonth - 1, ageOnDay);
        const diffTime = Math.abs(ageOnDate - birthDate);
        const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        const ageInYears = years;
        const ageInMonths = (ageInYears * 12) + months;
        const ageInWeeks = Math.floor(totalDays / 7);
        const ageInHours = Math.floor(diffTime / (1000 * 60 * 60));
        const ageInMinutes = Math.floor(diffTime / (1000 * 60));
        const ageInSeconds = Math.floor(diffTime / 1000);

        // Display the results in the table with commas in every three digits
        resultTable.innerHTML = `
            <tr><td><strong>Exact Age:</strong></td><td>${exactAge}</td></tr>
            <tr><td><strong>Age in Months:</strong></td><td>${ageInMonths.toLocaleString()} Months, ${days} Days</td></tr>
            <tr><td><strong>Age in Weeks:</strong></td><td>${ageInWeeks.toLocaleString()} Weeks, ${days % 7} Days</td></tr>
            <tr><td><strong>Age in Days:</strong></td><td>${totalDays.toLocaleString()} Days</td></tr>
            <tr><td><strong>Age in Hours:</strong></td><td>${ageInHours.toLocaleString()} Hours</td></tr>
            <tr><td><strong>Age in Minutes:</strong></td><td>${ageInMinutes.toLocaleString()} Minutes</td></tr>
            <tr><td><strong>Age in Seconds:</strong></td><td>${ageInSeconds.toLocaleString()} Seconds</td></tr>
        `;
        document.querySelector(".my-result-area").style.display = 'block';
        smoothScrollToSubmit();
    });

    // Clear the inputs
    document.getElementById('clear').addEventListener('click', function () {
        form.reset();
        resultTable.innerHTML = '';
        document.querySelector(".my-result-area").style.display = 'none';

        // Reset the "Age on" fields to the current date
        document.getElementById('age-on-day').value = currentDate.getDate();
        document.getElementById('age-on-month').value = currentDate.getMonth() + 1;
        document.getElementById('age-on-year').value = currentDate.getFullYear();
    });

    document.querySelector(".my-result-area").style.display = 'none';
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
