document.getElementById("dog-age-calculator").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get the input values
    let age = parseInt(document.getElementById("age").value);
    let size = document.getElementById("size").value;
    let humanAge;

    // Check if size is "small" and calculate the human age accordingly
    if (size === "small") {
        if (age === 1) {
            humanAge = 15;
        } else if (age === 2) {
            humanAge = 24;
        } else if (age >= 3) {
            humanAge = 24 + (age - 2) * 4;
        }
    } else if (size === "medium") {
        if (age === 1) {
            humanAge = 15;
        } else if (age === 2) {
            humanAge = 24;
        } else if (age === 3) {
            humanAge = 28;
        } else if (age === 4) {
            humanAge = 32;
        } else if (age === 5) {
            humanAge = 36;
        } else if (age === 6) {
            humanAge = 42;
        } else if (age > 6) {
            humanAge = 42;
            let toggle = true; // Start with adding 5
            for (let i = 7; i <= age; i++) {
                if (toggle) {
                    humanAge += 5;
                } else {
                    humanAge += 4;
                }
                toggle = !toggle; // Alternate between 5 and 4
            }
        }
    } else if (size === "large") {
        if (age === 1) {
            humanAge = 15;
        } else if (age === 2) {
            humanAge = 24;
        } else if (age === 3) {
            humanAge = 28;
        } else if (age === 4) {
            humanAge = 32;
        } else if (age === 5) {
            humanAge = 36;
        } else if (age === 6) {
            humanAge = 45;
        } else if (age === 7) {
            humanAge = 50;
        } else if (age > 7) {
            humanAge = 50;
            let toggle = true; // Start with adding 5
            for (let i = 8; i <= age; i++) {
                if (toggle) {
                    humanAge += 5;
                } else {
                    humanAge += 6;
                }
                toggle = !toggle; // Alternate between 5 and 4
            }
        }
    } else if (size === "giant") {
        if (age === 1) {
            humanAge = 12;
        } else if (age === 2) {
            humanAge = 22;
        } else if (age === 3) {
            humanAge = 31;
        } else if (age === 4) {
            humanAge = 38;
        } else if (age === 5) {
            humanAge = 45;
        } else if (age === 6) {
            humanAge = 49;
        } else if (age === 7) {
            humanAge = 56;
        } else if (age === 8) {
            humanAge = 64;
        } else if (age === 9) {
            humanAge = 71;
        } else if (age === 10) {
            humanAge = 79;
        } else if (age > 10) {
            humanAge = 79 + (age - 10) * 7;
        }
    }else {
        alert("Please select a dog size.");
        return;
    }

    // Display the result
    document.getElementById("result").innerHTML = `<td>Dog Age in Human Years: ${humanAge}</td>`;
    document.querySelector(".my-result-area").style.display = 'block';
    smoothScrollToSubmit();
});

// Function to clear the input fields
function clearInputs() {
    document.getElementById("age").value = '';
    document.getElementById("size").value = 'select';
    document.getElementById("result").innerHTML = '';
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
