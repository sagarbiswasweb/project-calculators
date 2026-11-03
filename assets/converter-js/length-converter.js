// Conversion factors between units in terms of meters
const conversionFactors = {
    millimeter: 0.001,
    centimeter: 0.01,
    decimeter: 0.1,
    meter: 1,
    kilometer: 1000,
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.34,
    "nautical-mile": 1852,
    fathom: 1.8288,
    "astronomical-unit": 1.496e+11,
    "light-year": 9.461e+15,
    parsec: 3.086e+16,
    rod: 5.0292,
    chain: 20.1168,
    link: 0.201168,
    micrometer: 1e-6,
    nanometer: 1e-9,
    angstrom: 1e-10,
    furlong: 201.168,
    league: 4828.032,
};

// Function to perform conversion
function convertLength() {
    const fromValue = parseFloat(document.getElementById('from').value);
    const fromUnit = document.getElementById('from-length-unit').value;
    const toUnit = document.getElementById('to-length-unit').value;

    // if (isNaN(fromValue) || fromValue <= 0) {
    //     alert("Please enter a valid number greater than 0.");
    //     return;
    // }

    // Get the result-area element
    const resultArea = document.querySelector('.result-area');

    // Check if the input is empty or invalid
    if (isNaN(fromValue) || fromValue === "") {
        resultArea.innerHTML = ""; // Clear the result-area
        document.getElementById('area-length').value = ""; // Clear the output field
        return;
    }

    // Convert the input value to meters
    const valueInMeters = fromValue * conversionFactors[fromUnit];

    // Convert meters to the target unit
    const convertedValue = valueInMeters / conversionFactors[toUnit];

    // Format the result
    const displayValue = formatResult(convertedValue);

    // Display the result
    document.getElementById('area-length').value = displayValue;

    // Also display the result in the result-area div
    document.getElementById('area-length').value = displayValue;
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
document.getElementById('from-length-unit').addEventListener('change', convertLength);
document.getElementById('to-length-unit').addEventListener('change', convertLength);
