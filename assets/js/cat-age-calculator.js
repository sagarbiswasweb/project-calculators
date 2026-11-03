document.getElementById("cat-age-calculator").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the input values
    let age = parseInt(document.getElementById("age").value);
    let humanAge;

    // Check if size is "small" and calculate the human age accordingly
    if (age === 1) {
        humanAge = 15;
    } else if (age === 2) {
        humanAge = 24;
    } else if (age >= 3) {
        humanAge = 24 + (age - 2) * 4;
    }else{
        alert("Please give a valid cat age");
    }

    // Display the result
    document.getElementById("result").innerHTML = `<td>Cat Age in Human Years: ${humanAge}</td>`;
    document.querySelector(".my-result-area").style.display = 'block';
    smoothScrollToSubmit();
});

// Function to clear the input fields
function clearInputs() {
    document.getElementById("age").value = '';
    document.getElementById("result").value = '';
    document.querySelector(".my-result-area").style.display = '';
}
// Function to handle smooth scrolling to the result element, taking the navbar into account
function smoothScrollToSubmit() {
    // v.v.i -> in server change the '.navbar' to 'single-page-navbar' to scroll the result area 
    
    const navbar = document.querySelector('.navbar');  // Get the navbar element (for theme you should use your navbar class)
    const resultElement = document.getElementById('nav-to-result');  // Get the result element

    if (!navbar || !resultElement) {
        return;  // Exit if the navbar or result element isn't found
    }

    // Get the height of the navbar
    const navbarHeight = navbar.offsetHeight;

    // Calculate the distance from the top of the page to the result element
    const resultPosition = resultElement.getBoundingClientRect().top + window.pageYOffset;

    // Scroll to the result element, adjusted by the navbar's height
    window.scrollTo({
        top: resultPosition - navbarHeight,  // Scroll to the result position minus the navbar height
        behavior: 'smooth'
    });
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
