document.getElementById("tile-calculator").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get the area dimensions
    let areaLength = parseFloat(document.getElementById("area-length").value);
    let areaWidth = parseFloat(document.getElementById("area-width").value);
    let areaLengthUnit = document.getElementById("area-length-unit").value;
    let areaWidthUnit = document.getElementById("area-width-unit").value;

    // Get the tile dimensions
    let tileLength = parseFloat(document.getElementById("tile-length").value);
    let tileWidth = parseFloat(document.getElementById("tile-width").value);
    let tileLengthUnit = document.getElementById("tile-length-unit").value;
    let tileWidthUnit = document.getElementById("tile-width-unit").value;

    // Get the gap and wastage
    let gap = parseFloat(document.getElementById("gap").value);
    let gapUnit = document.getElementById("tile-gap-unit").value;
    let wastage = parseFloat(document.getElementById("tile-wastage").value) / 100;

    // Optional: Get the price per tile
    let tilePrice = parseFloat(document.getElementById("tile-price").value) || 0;

    // Convert all units to meters
    areaLength = convertToMeters(areaLength, areaLengthUnit);
    areaWidth = convertToMeters(areaWidth, areaWidthUnit);
    tileLength = convertToMeters(tileLength, tileLengthUnit);
    tileWidth = convertToMeters(tileWidth, tileWidthUnit);
    gap = convertToMeters(gap, gapUnit);

    // Add the gap between tiles
    tileLength += gap;
    tileWidth += gap;

    // Calculate the total area and the tile area
    let totalArea = areaLength * areaWidth;
    let tileArea = tileLength * tileWidth;

    // Calculate the number of tiles needed, including wastage
    let numTiles = totalArea / tileArea;
    numTiles = Math.ceil(numTiles * (1 + wastage)); // Add wastage and round up

    // Calculate total cost if price per tile is given
    let totalCost = numTiles * tilePrice;

    // Output results
    let resultHTML = `
        <tr>
            <td>Total area:</td>
            <td>${totalArea.toLocaleString()} m<sup>2</sup></td>
        </tr>
        <tr>
            <td>Total tiles needed:</td>
            <td>${numTiles.toLocaleString()} tiles</td>
        </tr>
    `;

    if (tilePrice > 0) {
        resultHTML += `<tr><td>Total cost:</td><td>$${totalCost.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</td></tr>`;
    }

    document.getElementById("result").innerHTML = resultHTML;
    // Show the result area
    document.querySelector(".my-result-area").style.display = 'block';
    smoothScrollToSubmit();
});

function convertToMeters(value, unit) {
    switch (unit) {
        case 'millimeter':
            return value / 1000;
        case 'centimeter':
            return value / 100;
        case 'inch':
            return value * 0.0254;
        case 'feet':
            return value * 0.3048;
        case 'yard':
            return value * 0.9144;
        default: // meters
            return value;
    }
}


function clearInputs() {
    document.getElementById("tile-calculator").reset();
    document.getElementById("result").innerHTML = "";
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