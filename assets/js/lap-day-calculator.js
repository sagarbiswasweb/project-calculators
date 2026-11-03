document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('dog-age-calculator').addEventListener('submit', function(event) {
        event.preventDefault();
        calculateLapDay();
        smoothScrollToSubmit();
    });
    
    document.querySelector(".my-result-area").style.display = 'none';
});

function calculateLapDay() {
    const humanBirthday = new Date(document.getElementById('your-birthday').value);
    const dogBirthday = new Date(document.getElementById('dog-birthday').value);
    const dogToHumanRatio = 6.999999;

    // validation
    if (isNaN(humanBirthday.getTime()) || isNaN(dogBirthday.getTime())) {
        console.log('Invalid dates entered.');
        document.getElementById('result').innerHTML = "<td>Please enter valid dates.</td>";
        document.querySelector(".my-result-area").style.display = 'block';
        return;
    }

    const currentDate = new Date();
    let humanAge = calculateAgeInYearsMonthsAndDays(humanBirthday, currentDate);
    let dogAge = calculateAgeInYearsMonthsAndDays(dogBirthday, currentDate);
    let dogAgeInDogYears = (dogAge.years * dogToHumanRatio) + (dogAge.months / 12 * dogToHumanRatio) + (dogAge.days / 365 * dogToHumanRatio);

    console.log(`Current Human Age: ${humanAge.years} years, ${humanAge.months} months, and ${humanAge.days} days`);
    console.log(`Current Dog Age in Dog Years: ${dogAgeInDogYears} years`);

    while (dogAgeInDogYears < humanAge.years || (dogAgeInDogYears === humanAge.years && dogAge.months < humanAge.months)) {
        incrementAgeByOneDay(humanAge);
        incrementAgeByOneDay(dogAge);
        dogAgeInDogYears = (dogAge.years * dogToHumanRatio) + (dogAge.months / 12 * dogToHumanRatio) + (dogAge.days / 365 * dogToHumanRatio);
    }
    
    const lapDayDate = new Date(dogBirthday);
    lapDayDate.setFullYear(lapDayDate.getFullYear() + dogAge.years);
    lapDayDate.setMonth(lapDayDate.getMonth() + dogAge.months);
    lapDayDate.setDate(lapDayDate.getDate() + dogAge.days);

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    document.getElementById('result').innerHTML = `<td>Your lap day will be on ${lapDayDate.toLocaleDateString(undefined, options)}. You will both be ${humanAge.years} years, ${humanAge.months} months, and ${humanAge.days} days old.</td>`;
    document.querySelector(".my-result-area").style.display = 'block';
}

function calculateAgeInYearsMonthsAndDays(birthDate, currentDate) {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        const daysInPrevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
        days += daysInPrevMonth;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    return { years, months, days };
}

function incrementAgeByOneDay(age) {
    age.days++;
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

    if (age.days >= daysInMonth) {
        age.days = 0;
        age.months++;
        if (age.months >= 12) {
            age.years++;
            age.months = 0;
        }
    }
}

function clearInputs() {
    document.getElementById('your-birthday').value = '';
    document.getElementById('dog-birthday').value = '';
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
