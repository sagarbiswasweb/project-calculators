document.addEventListener('DOMContentLoaded', function () {
    // Periodic table mapping (symbol and name)
    const periodicTable = {
        1: { symbol: "H", name: "Hydrogen" },
        2: { symbol: "He", name: "Helium" },
        3: { symbol: "Li", name: "Lithium" },
        4: { symbol: "Be", name: "Beryllium" },
        5: { symbol: "B", name: "Boron" },
        6: { symbol: "C", name: "Carbon" },
        7: { symbol: "N", name: "Nitrogen" },
        8: { symbol: "O", name: "Oxygen" },
        9: { symbol: "F", name: "Fluorine" },
        10: { symbol: "Ne", name: "Neon" },
        11: { symbol: "Na", name: "Sodium" },
        12: { symbol: "Mg", name: "Magnesium" },
        13: { symbol: "Al", name: "Aluminum" },
        14: { symbol: "Si", name: "Silicon" },
        15: { symbol: "P", name: "Phosphorus" },
        16: { symbol: "S", name: "Sulfur" },
        17: { symbol: "Cl", name: "Chlorine" },
        18: { symbol: "Ar", name: "Argon" },
        19: { symbol: "K", name: "Potassium" },
        20: { symbol: "Ca", name: "Calcium" },
        21: { symbol: "Sc", name: "Scandium" },
        22: { symbol: "Ti", name: "Titanium" },
        23: { symbol: "V", name: "Vanadium" },
        24: { symbol: "Cr", name: "Chromium" },
        25: { symbol: "Mn", name: "Manganese" },
        26: { symbol: "Fe", name: "Iron" },
        27: { symbol: "Co", name: "Cobalt" },
        28: { symbol: "Ni", name: "Nickel" },
        29: { symbol: "Cu", name: "Copper" },
        30: { symbol: "Zn", name: "Zinc" },
        31: { symbol: "Ga", name: "Gallium" },
        32: { symbol: "Ge", name: "Germanium" },
        33: { symbol: "As", name: "Arsenic" },
        34: { symbol: "Se", name: "Selenium" },
        35: { symbol: "Br", name: "Bromine" },
        36: { symbol: "Kr", name: "Krypton" },
        37: { symbol: "Rb", name: "Rubidium" },
        38: { symbol: "Sr", name: "Strontium" },
        39: { symbol: "Y", name: "Yttrium" },
        40: { symbol: "Zr", name: "Zirconium" },
        41: { symbol: "Nb", name: "Niobium" },
        42: { symbol: "Mo", name: "Molybdenum" },
        43: { symbol: "Tc", name: "Technetium" },
        44: { symbol: "Ru", name: "Ruthenium" },
        45: { symbol: "Rh", name: "Rhodium" },
        46: { symbol: "Pd", name: "Palladium" },
        47: { symbol: "Ag", name: "Silver" },
        48: { symbol: "Cd", name: "Cadmium" },
        49: { symbol: "In", name: "Indium" },
        50: { symbol: "Sn", name: "Tin" },
        51: { symbol: "Sb", name: "Antimony" },
        52: { symbol: "Te", name: "Tellurium" },
        53: { symbol: "I", name: "Iodine" },
        54: { symbol: "Xe", name: "Xenon" },
        55: { symbol: "Cs", name: "Cesium" },
        56: { symbol: "Ba", name: "Barium" },
        57: { symbol: "La", name: "Lanthanum" },
        58: { symbol: "Ce", name: "Cerium" },
        59: { symbol: "Pr", name: "Praseodymium" },
        60: { symbol: "Nd", name: "Neodymium" },
        61: { symbol: "Pm", name: "Promethium" },
        62: { symbol: "Sm", name: "Samarium" },
        63: { symbol: "Eu", name: "Europium" },
        64: { symbol: "Gd", name: "Gadolinium" },
        65: { symbol: "Tb", name: "Terbium" },
        66: { symbol: "Dy", name: "Dysprosium" },
        67: { symbol: "Ho", name: "Holmium" },
        68: { symbol: "Er", name: "Erbium" },
        69: { symbol: "Tm", name: "Thulium" },
        70: { symbol: "Yb", name: "Ytterbium" },
        71: { symbol: "Lu", name: "Lutetium" },
        72: { symbol: "Hf", name: "Hafnium" },
        73: { symbol: "Ta", name: "Tantalum" },
        74: { symbol: "W", name: "Tungsten" },
        75: { symbol: "Re", name: "Rhenium" },
        76: { symbol: "Os", name: "Osmium" },
        77: { symbol: "Ir", name: "Iridium" },
        78: { symbol: "Pt", name: "Platinum" },
        79: { symbol: "Au", name: "Gold" },
        80: { symbol: "Hg", name: "Mercury" },
        81: { symbol: "Tl", name: "Thallium" },
        82: { symbol: "Pb", name: "Lead" },
        83: { symbol: "Bi", name: "Bismuth" },
        84: { symbol: "Po", name: "Polonium" },
        85: { symbol: "At", name: "Astatine" },
        86: { symbol: "Rn", name: "Radon" },
        87: { symbol: "Fr", name: "Francium" },
        88: { symbol: "Ra", name: "Radium" },
        89: { symbol: "Ac", name: "Actinium" },
        90: { symbol: "Th", name: "Thorium" },
        91: { symbol: "Pa", name: "Protactinium" },
        92: { symbol: "U", name: "Uranium" },
        93: { symbol: "Np", name: "Neptunium" },
        94: { symbol: "Pu", name: "Plutonium" },
        95: { symbol: "Am", name: "Americium" },
        96: { symbol: "Cm", name: "Curium" },
        97: { symbol: "Bk", name: "Berkelium" },
        98: { symbol: "Cf", name: "Californium" },
        99: { symbol: "Es", name: "Einsteinium" },
        100: { symbol: "Fm", name: "Fermium" },
        101: { symbol: "Md", name: "Mendelevium" },
        102: { symbol: "No", name: "Nobelium" },
        103: { symbol: "Lr", name: "Lawrencium" },
        104: { symbol: "Rf", name: "Rutherfordium" },
        105: { symbol: "Db", name: "Dubnium" },
        106: { symbol: "Sg", name: "Seaborgium" },
        107: { symbol: "Bh", name: "Bohrium" },
        108: { symbol: "Hs", name: "Hassium" },
        109: { symbol: "Mt", name: "Meitnerium" },
        110: { symbol: "Ds", name: "Darmstadtium" },
        111: { symbol: "Rg", name: "Roentgenium" },
        112: { symbol: "Cn", name: "Copernicium" },
        113: { symbol: "Nh", name: "Nihonium" },
        114: { symbol: "Fl", name: "Flerovium" },
        115: { symbol: "Mc", name: "Moscovium" },
        116: { symbol: "Lv", name: "Livermorium" },
        117: { symbol: "Ts", name: "Tennessine" },
        118: { symbol: "Og", name: "Oganesson" }
      };
      

    // Submit button functionality
    document.getElementById("atom-calculator").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the form from submitting

        // Get the input values
        const Z = parseFloat(document.getElementById("atomicNumber").value) || 0;
        const A = parseFloat(document.getElementById("massNumber").value) || 0;
        const charge = parseFloat(document.getElementById("charge").value) || 0;

        if (!Number.isInteger(Z)) {
            alert("Atomic number cannot be a floating value.");
            return;
        }
        if (A < Z) {
            alert("Mass number should be greater than or equal to atomic number.");
            return;
        }
        if (charge > Z) {
            alert("Charge cannot be greater than the atomic number.");
            return;
        }

        const protons = Z;
        const neutrons = A - Z;
        const electrons = Z - charge;

        // Get element details
        const element = periodicTable[Z];
        const symbol = element ? element.symbol : 'Unknown';
        const name = element ? element.name : 'Unknown Element';

        // Accurate masses
        const protonMass = 1.007276;
        const neutronMass = 1.008665;

        // Calculate atomic mass using number of protons and neutrons
        const atomicMass = (protons * protonMass) + (neutrons * neutronMass);


        // Build result HTML
        let resultHTML = `
        <tr><td>Element: <strong>${name}</strong></td></tr>
        <tr><td>Number of protons: ${protons.toLocaleString()}</td></tr>
        <tr><td>Number of neutrons: ${neutrons.toLocaleString()}</td></tr>
        `;

        if (document.getElementById("charge").value.trim() !== '') {
            resultHTML += `<tr><td>Number of electrons: ${electrons.toLocaleString()}</td></tr>`;
        }

        resultHTML += `
        <tr><td>AZE Notation:</td></tr>
        <tr>
            <td>
                <sup>${A}</sup>${symbol}<br>
                <sub>${Z}</sub>
            </td>
        </tr>
        <tr><td>Total mass of your atom: <strong>${atomicMass.toFixed(5)} u</strong></td></tr>
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
        document.getElementById("atom-calculator").reset();
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
