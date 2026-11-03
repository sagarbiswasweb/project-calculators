// Conversion factors between units in terms of meters
const conversionFactors = {
    "square millimeter": 0.000001,  // (0.001 * 0.001)
    "square centimeter": 0.0001,    // (0.01 * 0.01)
    "square decimeter": 0.01,       // (0.1 * 0.1)
    "square meter": 1,               // (1 * 1)
    "square kilometer": 1000000,     // (1000 * 1000)
    "square inch": 0.00064516,       // (0.0254 * 0.0254)
    "square foot": 0.092903,         // (0.3048 * 0.3048)
    "square yard": 0.836127,         // (0.9144 * 0.9144)
    "square mile": 2589988.11,       // (1609.34 * 1609.34)
    "acre": 4046.86,                 // Standard conversion
    "hectare": 10000,                // Standard conversion
    "square rod": 0.404686,          // (5.0292 * 5.0292)
    "square hectometer": 100,        // (10 * 10)
    "square decameter": 100,         // (10 * 10)
    "square are": 100,               // Standard conversion
    "sqchain": 4046.86,              // Same as acre
    "sqlink": 0.0404686,             // Same as square rod
    "circular inch": 0.0005067,      // Approximate (π * (0.0254/2)²)
    "barn": 1e-28,                   // Standard conversion for area
    "square nautical mile": 3.427e+9, // (1852 * 1852)
    "square mil": 2.589988e-10,      // (1.60934e-3 * 1.60934e-3)
    "square micrometer": 1e-12,      // (1e-6 * 1e-6)
    "square nanometer": 1e-18,       // (1e-9 * 1e-9)
    "square angstrom": 1e-20         // (1e-10 * 1e-10)
};


// Function to perform conversion
function convertLength() {
    const fromValue = parseFloat(document.getElementById('from').value);
    const fromUnit = document.getElementById('from-area-unit').value;
    const toUnit = document.getElementById('to-area-unit').value;

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
document.getElementById('from').addEventListener('input', convertLength);
document.getElementById('from-area-unit').addEventListener('change', convertLength);
document.getElementById('to-area-unit').addEventListener('change', convertLength);
