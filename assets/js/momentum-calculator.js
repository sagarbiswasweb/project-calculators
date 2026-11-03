document.addEventListener("DOMContentLoaded", function () {
    // Elements
    const massInput = document.getElementById("mass");
    const velocityInput = document.getElementById("velocity");
    const momentumInput = document.getElementById("momentum");
    const massUnit = document.getElementById("mass-unit");
    const velocityUnit = document.getElementById("velocity-unit");
    const momentumUnit = document.getElementById("momentum-unit");

    // Unit conversion factors (to SI)
    const massUnits = {
        "mg": 0.000001,
        "g": 0.001,
        "kg": 1,
        "t": 1000,
        "oz": 0.0283495,
        "lb": 0.453592,
        "Us ton": 907.185,
        "long ton": 1016.05
    };
    const velocityUnits = {
        "m/s": 1,
        "km/h": 1000 / 3600,
        "ft/s": 0.3048,
        "mph": 1609.344 / 3600,
        "ft/min": 0.3048 / 60
    };
    const momentumUnits = {
        "mN·s": 0.001,
        "N·s": 1,
        "kN·s": 1000,
        "MN·s": 1000000,
        "kg·m/s": 1,
        "t·km/h": 1000 * (1000 / 3600),
        "lb·ft/s": 0.453592 * 0.3048,
        "t·mph": 1000 * (1609.344 / 3600),
        "US t·mph": 907.185 * (1609.344 / 3600),
        "long t·mph": 1016.05 * (1609.344 / 3600)
    };

    // Track last two changed fields
    let lastChanged = null, prevChanged = null;

    // Always store user input in SI base units
    let baseMass = null, baseVelocity = null, baseMomentum = null;

    // Format number: 10 digits after point, remove trailing zeros, round up if last digit is 5
    function formatNumber(num) {
        let str = Number(num).toFixed(10);
        if (str.includes(".")) {
            let [intPart, decPart] = str.split(".");
            if (decPart.length === 10 && decPart[9] === "5") {
                let digits = decPart.slice(0, 9).split("").map(Number);
                digits[8] += 1;
                for (let i = 8; i > 0; i--) {
                    if (digits[i] === 10) {
                        digits[i] = 0;
                        digits[i - 1] += 1;
                    }
                }
                if (digits[0] === 10) {
                    intPart = (parseInt(intPart) + 1).toString();
                    digits[0] = 0;
                }
                decPart = digits.join("");
            } else {
                decPart = decPart.slice(0, 10);
            }
            decPart = decPart.replace(/0+$/, "");
            return decPart.length > 0 ? `${intPart}.${decPart}` : intPart;
        }
        return str;
    }

    // Unit dropdown: show data-full on open, short on close
    function setupUnitDropdown(select) {
        select.addEventListener("mousedown", function () {
            for (let option of select.options) {
                option.textContent = option.getAttribute("data-full");
            }
        });
        select.addEventListener("change", function () {
            for (let option of select.options) {
                option.textContent = option.value;
            }
        });
        select.addEventListener("blur", function () {
            for (let option of select.options) {
                option.textContent = option.value;
            }
        });
        for (let option of select.options) {
            option.textContent = option.value;
        }
    }
    setupUnitDropdown(massUnit);
    setupUnitDropdown(velocityUnit);
    setupUnitDropdown(momentumUnit);

    // Remove green from all
    function removeAllGreen() {
        massInput.classList.remove("result-green");
        velocityInput.classList.remove("result-green");
        momentumInput.classList.remove("result-green");
    }

    // Main calculation logic
    function updateResult(changed) {
        if (changed) {
            if (lastChanged !== changed) {
                prevChanged = lastChanged;
                lastChanged = changed;
            }
        }

        // Use base values for calculation
        const mFilled = baseMass !== null && !isNaN(baseMass);
        const vFilled = baseVelocity !== null && !isNaN(baseVelocity);
        const pFilled = baseMomentum !== null && !isNaN(baseMomentum);

        // Only recalculate if two are filled
        const filled = [mFilled, vFilled, pFilled].filter(Boolean).length;
        if (filled < 2) {
            updateDisplay();
            return;
        }

        // Determine which field is the answer (not among last two changed)
        const fields = ["mass", "velocity", "momentum"];
        const lastTwo = [lastChanged, prevChanged];
        const answerField = fields.find(f => !lastTwo.includes(f));

        if ((!mFilled || answerField === "mass") && vFilled && pFilled) {
            baseMass = baseMomentum / baseVelocity;
        } else if ((!vFilled || answerField === "velocity") && mFilled && pFilled) {
            baseVelocity = baseMomentum / baseMass;
        } else if ((!pFilled || answerField === "momentum") && mFilled && vFilled) {
            baseMomentum = baseMass * baseVelocity;
        }

        updateDisplay(answerField);
    }

    // Display logic: always convert from base value
    function updateDisplay(answerField) {
        // Mass
        if (baseMass !== null && !isNaN(baseMass)) {
            const mUnit = massUnit.value;
            const formatted = formatNumber(baseMass / massUnits[mUnit]);
            if (
                document.activeElement !== massInput &&
                massInput.value !== formatted
            ) {
                massInput.value = formatted;
            }
            if (answerField === "mass") {
                massInput.classList.add("result-green");
            } else {
                massInput.classList.remove("result-green");
            }
        } else {
            massInput.classList.remove("result-green");
        }
        // Velocity
        if (baseVelocity !== null && !isNaN(baseVelocity)) {
            const vUnit = velocityUnit.value;
            const formatted = formatNumber(baseVelocity / velocityUnits[vUnit]);
            if (
                document.activeElement !== velocityInput &&
                velocityInput.value !== formatted
            ) {
                velocityInput.value = formatted;
            }
            if (answerField === "velocity") {
                velocityInput.classList.add("result-green");
            } else {
                velocityInput.classList.remove("result-green");
            }
        } else {
            velocityInput.classList.remove("result-green");
        }
        // Momentum
        if (baseMomentum !== null && !isNaN(baseMomentum)) {
            const pUnit = momentumUnit.value;
            const formatted = formatNumber(baseMomentum / momentumUnits[pUnit]);
            if (
                document.activeElement !== momentumInput &&
                momentumInput.value !== formatted
            ) {
                momentumInput.value = formatted;
            }
            if (answerField === "momentum") {
                momentumInput.classList.add("result-green");
            } else {
                momentumInput.classList.remove("result-green");
            }
        } else {
            momentumInput.classList.remove("result-green");
        }
    }

    // When user types, update the base value in SI units
    massInput.addEventListener("input", () => {
        removeAllGreen();
        if (massInput.value !== "") {
            baseMass = parseFloat(massInput.value) * massUnits[massUnit.value];
        } else {
            baseMass = null;
        }
        updateResult("mass");
    });
    velocityInput.addEventListener("input", () => {
        removeAllGreen();
        if (velocityInput.value !== "") {
            baseVelocity = parseFloat(velocityInput.value) * velocityUnits[velocityUnit.value];
        } else {
            baseVelocity = null;
        }
        updateResult("velocity");
    });
    momentumInput.addEventListener("input", () => {
        removeAllGreen();
        if (momentumInput.value !== "") {
            baseMomentum = parseFloat(momentumInput.value) * momentumUnits[momentumUnit.value];
        } else {
            baseMomentum = null;
        }
        updateResult("momentum");
    });

    // On unit change, update the input field using the base value
    massUnit.addEventListener("change", function () {
        if (baseMass !== null && !isNaN(baseMass)) {
            massInput.value = formatNumber(baseMass / massUnits[massUnit.value]);
        }
        updateResult();
    });
    velocityUnit.addEventListener("change", function () {
        if (baseVelocity !== null && !isNaN(baseVelocity)) {
            velocityInput.value = formatNumber(baseVelocity / velocityUnits[velocityUnit.value]);
        }
        updateResult();
    });
    momentumUnit.addEventListener("change", function () {
        if (baseMomentum !== null && !isNaN(baseMomentum)) {
            momentumInput.value = formatNumber(baseMomentum / momentumUnits[momentumUnit.value]);
        }
        updateResult();
    });

    // Clear button
    document.getElementById("clear").addEventListener("click", function () {
        massInput.value = "";
        velocityInput.value = "";
        momentumInput.value = "";
        removeAllGreen();
        lastChanged = null;
        prevChanged = null;
        baseMass = null;
        baseVelocity = null;
        baseMomentum = null;
    });
});