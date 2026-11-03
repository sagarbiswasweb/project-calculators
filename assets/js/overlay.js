document.addEventListener('DOMContentLoaded', function() {
    var navbar = document.getElementById('navbar');
    var overlay = document.getElementById('overlay');
    var navbarCollapse = document.getElementById('navbarSupportedContent');

    document.addEventListener('click', function(event) {
        var isClickInside = navbar.contains(event.target);

        if (!isClickInside && navbarCollapse.classList.contains('show')) {
            var bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                toggle: false
            });
            bsCollapse.hide();
            overlay.style.display = 'none';
            document.body.classList.remove('overlay-active'); // Remove class to allow scrolling
        }
    });

    navbar.addEventListener('shown.bs.collapse', function() {
        overlay.style.display = 'block';
        document.body.classList.add('overlay-active'); // Add class to prevent scrolling
    });

    navbar.addEventListener('hidden.bs.collapse', function() {
        overlay.style.display = 'none';
        document.body.classList.remove('overlay-active'); // Remove class to allow scrolling
    });

    // mobile view te navbar toggle korle navbar er dropdown ment autometacally collapse hobe 
    $(document).ready(function () {
        $('.navbar-toggler').click(function () {
            if ($(window).width() < 992) { // Only in mobile view
                var dropdown = new bootstrap.Dropdown($('#dropdownMenuButton')[0]);
                dropdown.show();
            }
        });
    });
});