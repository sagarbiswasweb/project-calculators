document.addEventListener('DOMContentLoaded', function () {
  
    // Submit button functionality
    document.getElementById("bond-order-calculator").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get the input values
        const bondingInput = document.getElementById("bonding-electrons");
        const antibondingInput = document.getElementById("anti-bonding-electrons");


        const bonding = parseFloat(bondingInput.value) || 0;
        const antibonding = parseFloat(antibondingInput.value) || 0;

        // Validation
        if (bonding <= antibonding) {
            alert("Bonding electrons should be greater than antibonding electrons.");
            return;
        }
        
        const bondOrder = (bonding - antibonding) / 2;

        // Build result HTML
        let resultHTML = `
        <tr><td>Bond Order: ${bondOrder.toLocaleString()}</td></tr>
        `;

        document.getElementById("result").innerHTML = resultHTML;
        document.querySelector(".my-result-area").style.display = 'block';
        smoothScrollToSubmit();

    });

    // Clear button functionality
    document.getElementById("clear").addEventListener("click", function () {
        clearInputs();
    });

    function clearInputs() {
        document.getElementById("bond-order-calculator").reset();
        document.getElementById("result").innerHTML = '';
        document.querySelector(".my-result-area").style.display = 'none';
    }

    // Function to scroll to result
    function smoothScrollToSubmit() {
        const navbar = document.querySelector('.navbar');
        const resultElement = document.getElementById('nav-to-result');

        if (!navbar || !resultElement) return;

        const navbarHeight = navbar.offsetHeight;
        const resultPosition = resultElement.getBoundingClientRect().top + window.pageYOffset;

        window.scrollTo({
            top: resultPosition - navbarHeight,
            behavior: 'smooth'
        });
    }

    // Smooth scroll for TOC links
    function smoothScrollToSection() {
        document.querySelectorAll('.list-group-item').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const navbar = document.querySelector('.single-page-navbar');
                const breadcrumb = document.querySelector('.breadcrumb-menu');

                const navbarHeight = navbar ? navbar.offsetHeight : 0;
                const breadcrumbHeight = (breadcrumb && breadcrumb.clientHeight > 0) ? breadcrumb.clientHeight : 0;
                const totalHeaderHeight = navbarHeight + breadcrumbHeight;

                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;

                    window.scrollTo({
                        top: targetPosition - totalHeaderHeight - 10,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Call smooth scroll function on page load
    smoothScrollToSection();
});
