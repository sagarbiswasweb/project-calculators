document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('brick-calculator').addEventListener('submit', function(event) {
        event.preventDefault();
        calculateBricks();
    });

    document.getElementById('clear').addEventListener('click', function() {
        clearInputs();
    });
});

function calculateBricks() {
    // Get input values
    const wallLength = parseFloat(document.getElementById('wallLength').value);
    const wallHeight = parseFloat(document.getElementById('wallHeight').value);
    const brickLength = parseFloat(document.getElementById('brickLength').value);
    const brickHeight = parseFloat(document.getElementById('brickHeight').value);
    const brickWidth = parseFloat(document.getElementById('brickWidth').value);
    const jointThickness = parseFloat(document.getElementById('jointThickness').value);
    const brickWastage = parseFloat(document.getElementById('brickWastage').value);

    // validation 
    if (isNaN(wallLength) || isNaN(wallHeight) || isNaN(brickLength) || isNaN(brickHeight) || isNaN(brickWidth) || isNaN(jointThickness) || isNaN(brickWastage)) {
        alert("Please enter valid numbers for all fields.")
        return;
    }
    else if(brickWastage > 20){
        alert("Brick wastage cannot be greater than 20%.")
        return;
    }

    // Convert all units to meters
    const brickLengthInMeters = brickLength * 0.0254; // Inches to meters
    const brickHeightInMeters = brickHeight * 0.0254; // Inches to meters
    const jointThicknessInMeters = jointThickness / 1000; // mm to meters

    // Calculate wall area and brick area (including mortar joint)
    const wallArea = wallLength * wallHeight;
    const brickArea = (brickLengthInMeters + jointThicknessInMeters) * (brickHeightInMeters + jointThicknessInMeters);

    // Calculate total bricks needed
    const bricksNeeded = Math.ceil(wallArea / brickArea);

    // Add wastage
    const totalBricks = Math.ceil(bricksNeeded * (1 + (brickWastage / 100)));

    // Display the result in a table
    document.getElementById('result').innerHTML = `
        <table>
            <tr>
                <td>Total Bricks Needed Included ${brickWastage}% Brick Wastage:</td>
                <td>${totalBricks}</td>
            </tr>
        </table>
    `;

    // Show the result area
    document.querySelector(".my-result-area").style.display = 'block';
    smoothScrollToSubmit();
}

function clearInputs() {
    document.getElementById('brick-calculator').reset();
    document.getElementById('result').innerHTML = '';
    document.querySelector(".my-result-area").style.display = 'none';
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
