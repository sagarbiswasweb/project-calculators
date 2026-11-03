// Conversion factors between units in terms of meters
const conversionFactors = {
    "cubic millimeter": 1e-9,             // (0.001³)
    "cubic centimeter": 1e-6,            // (0.01³)
    "cubic decimeter": 0.001,            // (0.1³)
    "cubic meter": 1,                    // Base unit
    "cubic kilometer": 1e9,              // (1000³)
    "cubic inch": 0.000016387064,        // (0.0254³)
    "cubic foot": 0.028316846592,        // (0.3048³)
    "cubic yard": 0.764554857984,        // (0.9144³)
    "cubic mile": 4.16818183e+9,         // (1609.34³)
    "milliliter": 1e-6,                  // Equivalent to cubic centimeter
    "liter": 0.001,                      // Equivalent to cubic decimeter
    "gallon (US)": 0.003785411784,       // 1 gallon = 3.785411784 liters
    "gallon (UK)": 0.00454609,           // 1 gallon = 4.54609 liters
    "quart (US)": 0.000946352946,        // 1/4 gallon (US)
    "quart (UK)": 0.0011365225,          // 1/4 gallon (UK)
    "pint (US)": 0.000473176473,         // 1/8 gallon (US)
    "pint (UK)": 0.00056826125,          // 1/8 gallon (UK)
    "exaliter": 1e15,                    // 10¹⁵ liters
    "petaliter": 1e12,                   // 10¹² liters
    "teraliter": 1e9,                    // 10⁹ liters
    "gigaliter": 1e6,                    // 10⁶ liters
    "megaliter": 1000,                   // 10³ liters
    "kiloliter": 1,                      // Equivalent to cubic meter
    "hectoliter": 0.1,                   // 10² liters
    "dekaliter": 0.01,                   // 10¹ liters
    "deciliter": 0.0001,                 // 10⁻¹ liters
    "centiliter": 0.00001,               // 10⁻² liters
    "microliter": 1e-9,                  // 10⁻⁶ liters
    "nanoliter": 1e-12,                  // 10⁻⁹ liters
    "picoliter": 1e-15,                  // 10⁻¹² liters
    "cup (metric)": 0.00025,             // 250 milliliters
    "cup (UK)": 0.000284131,             // Approx. 284.131 milliliters
    "tablespoon (metric)": 0.000015,     // 15 milliliters
    "tablespoon (UK)": 0.0000177582,     // 17.7582 milliliters
    "teaspoon (metric)": 0.000005,       // 5 milliliters
    "teaspoon (UK)": 0.00000591939,      // 5.91939 milliliters
    "fluid ounce (US)": 0.0000295735,    // 29.5735 milliliters
    "fluid ounce (UK)": 0.0000284131,    // 28.4131 milliliters
    "cc": 1e-6,                          // Equivalent to cubic centimeter
    "cubic micrometer": 1e-18,           // (1e-6³)
    "cubic nanometer": 1e-27,            // (1e-9³)
    "cubic angstrom": 1e-30              // (1e-10³)
};

// Function to perform conversion
function convertVolume() {
    const fromValue = parseFloat(document.getElementById('from').value);
    const fromUnit = document.getElementById('from-volume-unit').value;
    const toUnit = document.getElementById('to-volume-unit').value;

    // if (isNaN(fromValue) || fromValue <= 0) {
    //     alert("Please enter a valid number greater than 0.");
    //     return;
    // }

    // Get the result-area element
    const resultArea = document.querySelector('.result-area');

    // Check if the input is empty or invalid
    if (isNaN(fromValue) || fromValue === "") {
        resultArea.innerHTML = ""; // Clear the result-area
        document.getElementById('to').value = ""; // Clear the output field
        return;
    }

    // Convert the input value to meters
    const valueInMeters = fromValue * conversionFactors[fromUnit];

    // Convert meters to the target unit
    const convertedValue = valueInMeters / conversionFactors[toUnit];

    // Format the result
    const displayValue = formatResult(convertedValue);

    // Display the result
    document.getElementById('to').value = displayValue;

    // Also display the result in the result-area div
    document.getElementById('to').value = displayValue;
    resultArea.innerHTML = `<h4 class=text-center style="color:red;">${fromValue} ${fromUnit} = <strong>${displayValue}</strong> ${toUnit}</h4>`;
}

// Function to format the result
function formatResult(value) {
    if (value % 1 === 0) {
        return value; // If the fractional part is 0, show as an integer
    } else {
        return parseFloat(value.toFixed(10)); // Remove trailing zeroes
    }
}

// Event listeners
document.getElementById('from').addEventListener('input', convertVolume);
document.getElementById('from-volume-unit').addEventListener('change', convertVolume);
document.getElementById('to-volume-unit').addEventListener('change', convertVolume);
