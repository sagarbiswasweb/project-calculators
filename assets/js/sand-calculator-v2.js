document.addEventListener("DOMContentLoaded", function () {
    const shape = document.getElementById("shape");
    const dimensions = document.getElementById("dimensions");
    const depth = document.getElementById("depth");
    const depthUnit = document.getElementById("depth-unit");
    const density = document.getElementById("density");
    const customDensity = document.getElementById("custom-density");
    const form = document.getElementById("sand-calculator");

    // By Volume tab selectors
    const inputVolume = document.getElementById("input-volume");
    const inputVolumeUnit = document.getElementById("input-volume-unit");
    const inputDensity = document.getElementById("input-density");
    const inputCustomDensity = document.getElementById("input-custom-density");

    // Price fields for both tabs
    const sandPriceInputArea = document.getElementById("sand-price-area");
    const sandPriceUnitArea = document.getElementById("sand-price-unit-area");
    const sandPriceInputVolume = document.getElementById("sand-price-volume");
    const sandPriceUnitVolume = document.getElementById("sand-price-unit-volume");

    // Area tab result container
    const areaResult = document.getElementById("area-result");
    // Volume tab result container
    const volumeResult = document.getElementById("volume-result");

    // Helper: unit conversion to meters
    const unitToMeter = {
        mm: 0.001,
        cm: 0.01,
        m: 1,
        in: 0.0254,
        ft: 0.3048,
        yd: 0.9144
    };

    // Dynamic dimension fields
    function updateDimensionFields() {
        let html = '';
        if (shape.value === "rectangle") {
            html = `
                <div class="row">
                    <div class="col-md-6">
                        <label for="length" class="form-label">Length
                            <span>
                                <button type="button" class="tooltip-btn" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Enter the length of the area.">?</button>
                            </span>
                        </label>
                        <div class="input-group mb-3">
                            <div class="col-8">
                                <input type="number" class="form-control my-input-area" id="length" min="1" step="any" required>
                            </div>
                            <div class="col-4 ps-1">
                                <select class="my-input-area form-select unit-dropdown" id="length-unit">
                                    <option value="mm" data-full="millimeters (mm)">mm</option>
                                    <option value="cm" data-full="centimeters (cm)">cm</option>
                                    <option value="m" data-full="meters (m)" selected>m</option>
                                    <option value="in" data-full="inches (in)">in</option>
                                    <option value="ft" data-full="feet (ft)">ft</option>
                                    <option value="yd" data-full="yard (yd)">yd</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="width" class="form-label">Width
                            <span>
                                <button type="button" class="tooltip-btn" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Enter the width of the area.">?</button>
                            </span>
                        </label>
                        <div class="input-group mb-3">
                            <div class="col-8">
                                <input type="number" class="form-control my-input-area" id="width" min="1" step="any" required>
                            </div>
                            <div class="col-4 ps-1">
                                <select class="my-input-area form-select unit-dropdown" id="width-unit">
                                    <option value="mm" data-full="millimeters (mm)">mm</option>
                                    <option value="cm" data-full="centimeters (cm)">cm</option>
                                    <option value="m" data-full="meters (m)" selected>m</option>
                                    <option value="in" data-full="inches (in)">in</option>
                                    <option value="ft" data-full="feet (ft)">ft</option>
                                    <option value="yd" data-full="yard (yd)">yd</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (shape.value === "circle") {
            html = `
                <div class="row">
                    <div class="col-md-6">
                        <label for="diameter" class="form-label">Diameter
                            <span>
                                <button type="button" class="tooltip-btn" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Enter the diameter of the area.">?</button>
                            </span>
                        </label>
                        <div class="input-group mb-3">
                            <div class="col-8">
                                <input type="number" class="form-control my-input-area" id="diameter" min="1" step="any" required>
                            </div>
                            <div class="col-4 ps-1">
                                <select class="my-input-area form-select unit-dropdown" id="diameter-unit">
                                    <option value="mm" data-full="millimeters (mm)">mm</option>
                                    <option value="cm" data-full="centimeters (cm)">cm</option>
                                    <option value="m" data-full="meters (m)" selected>m</option>
                                    <option value="in" data-full="inches (in)">in</option>
                                    <option value="ft" data-full="feet (ft)">ft</option>
                                    <option value="yd" data-full="yard (yd)">yd</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (shape.value === "triangle") {
            html = `
                <div class="row">
                    <div class="col-md-6">
                        <label for="base" class="form-label">Base
                            <span>
                                <button type="button" class="tooltip-btn" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Enter the base of the triangle.">?</button>
                            </span>
                        </label>
                        <div class="input-group mb-3">
                            <div class="col-8">
                                <input type="number" class="form-control my-input-area" id="base" min="1" step="any" required>
                            </div>
                            <div class="col-4 ps-1">
                                <select class="my-input-area form-select unit-dropdown" id="base-unit">
                                    <option value="mm" data-full="millimeters (mm)">mm</option>
                                    <option value="cm" data-full="centimeters (cm)">cm</option>
                                    <option value="m" data-full="meters (m)" selected>m</option>
                                    <option value="in" data-full="inches (in)">in</option>
                                    <option value="ft" data-full="feet (ft)">ft</option>
                                    <option value="yd" data-full="yard (yd)">yd</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <label for="height" class="form-label">Height
                            <span>
                                <button type="button" class="tooltip-btn" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Enter the height of the triangle.">?</button>
                            </span>
                        </label>
                        <div class="input-group mb-3">
                            <div class="col-8">
                                <input type="number" class="form-control my-input-area" id="height" min="1" step="any" required>
                            </div>
                            <div class="col-4 ps-1">
                                <select class="my-input-area form-select unit-dropdown" id="height-unit">
                                    <option value="mm" data-full="millimeters (mm)">mm</option>
                                    <option value="cm" data-full="centimeters (cm)">cm</option>
                                    <option value="m" data-full="meters (m)" selected>m</option>
                                    <option value="in" data-full="inches (in)">in</option>
                                    <option value="ft" data-full="feet (ft)">ft</option>
                                    <option value="yd" data-full="yard (yd)">yd</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else if (shape.value === "custom") {
            html = `
                <div class="row">
                    <div class="col-md-6">
                        <label for="custom-area" class="form-label">Area
                            <span>
                                <button type="button" class="tooltip-btn" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Enter the area value.">?</button>
                            </span>
                        </label>
                        <div class="input-group mb-3">
                            <div class="col-8">
                                <input type="number" class="form-control my-input-area" id="custom-area" min="1" step="any" required>
                            </div>
                            <div class="col-4 ps-1">
                                <select class="my-input-area form-select unit-dropdown" id="custom-area-unit">
                                    <option value="m2" data-full="square meter (m2)">m2</option>
                                    <option value="ft2" data-full="square feet (ft2)">ft2</option>
                                    <option value="cm2" data-full="square centimeter (cm2)">cm2</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
        dimensions.innerHTML = html;

        // Immediately trigger calculation after updating fields
        updateAreaResult();

        // Bootstrap tooltips
        if (window.bootstrap) {
            var tooltipTriggerList = [].slice.call(dimensions.querySelectorAll('[data-bs-toggle="tooltip"]'));
            tooltipTriggerList.forEach(function (tooltipTriggerEl) {
                new bootstrap.Tooltip(tooltipTriggerEl);
            });
        }

        // Apply unit dropdown logic to new selects
        applyUnitDropdowns();
    }

    shape.addEventListener("change", updateDimensionFields);
    updateDimensionFields();

    // Density custom field
    density.addEventListener("change", function () {
        if (density.value === "custom") {
            customDensity.style.display = "";
        } else {
            customDensity.style.display = "none";
        }
    });

    // Show/hide custom density field for volume tab
    if (inputDensity) {
        inputDensity.addEventListener("change", function () {
            if (inputDensity.value === "custom") {
                inputCustomDensity.style.display = "";
            } else {
                inputCustomDensity.style.display = "none";
            }
        });
    }

    // Helper: convert volume to m³
    function convertVolumeToM3(val, unit) {
        if (unit === "cu m") return val;
        if (unit === "CFT or cu ft") return val * 0.0283168;
        if (unit === "cu yd") return val * 0.764555;
        if (unit === "cu cm" || unit === "cubic centimeter") return val / 1_000_000;
        if (unit === "cu in" || unit === "cubic inch") return val * 0.000016387064;
        return val;
    }

    // Calculation logic for Area tab
    function calculateSand() {
        let area = 0;
        if (shape.value === "rectangle") {
            const length = parseFloat(document.getElementById("length")?.value);
            const width = parseFloat(document.getElementById("width")?.value);
            const lengthUnit = document.getElementById("length-unit")?.value;
            const widthUnit = document.getElementById("width-unit")?.value;
            if (isNaN(length) || isNaN(width) || length <= 0 || width <= 0) return "";
            area = (length * unitToMeter[lengthUnit]) * (width * unitToMeter[widthUnit]);
        } else if (shape.value === "circle") {
            const diameter = parseFloat(document.getElementById("diameter")?.value);
            const diameterUnit = document.getElementById("diameter-unit")?.value;
            if (isNaN(diameter) || diameter <= 0) return "";
            const radius = (diameter * unitToMeter[diameterUnit]) / 2;
            area = Math.PI * radius * radius;
        } else if (shape.value === "triangle") {
            const base = parseFloat(document.getElementById("base")?.value);
            const height = parseFloat(document.getElementById("height")?.value);
            const baseUnit = document.getElementById("base-unit")?.value;
            const heightUnit = document.getElementById("height-unit")?.value;
            if (isNaN(base) || isNaN(height) || base <= 0 || height <= 0) return "";
            area = 0.5 * (base * unitToMeter[baseUnit]) * (height * unitToMeter[heightUnit]);
        } else if (shape.value === "custom") {
            const areaInput = document.getElementById("custom-area");
            const areaUnitInput = document.getElementById("custom-area-unit");
            if (!areaInput || !areaUnitInput) return "";
            const areaVal = parseFloat(areaInput.value);
            const areaUnit = areaUnitInput.value;
            if (isNaN(areaVal) || areaVal <= 0) return "";
            if (areaUnit === "m2") area = areaVal;
            else if (areaUnit === "ft2") area = areaVal * 0.092903;
            else if (areaUnit === "cm2") area = areaVal * 0.0001;
        }

        // Depth
        const depthVal = parseFloat(depth?.value);
        if (isNaN(depthVal) || depthVal <= 0) return "";
        const depthMeters = depthVal * unitToMeter[depthUnit?.value];

        // Volume
        const volume = area * depthMeters; // m³

        // Density
        let densityVal = 0;
        if (density.value === "custom") {
            densityVal = parseFloat(customDensity.value);
            if (isNaN(densityVal) || densityVal <= 0) return "";
        } else {
            densityVal = parseFloat(density.value);
        }

        // Weight
        const weight = volume * densityVal; // kg

        // Results in other units
        const volumeFt3 = volume * 35.3147;        // Cubic feet
        const volumeYd3 = volume * 1.30795;        // Cubic yards
        const volumeCm3 = volume * 1_000_000;      // Cubic centimeters (cm³)
        const volumeIn3 = volume * 61_023.7441;    // Cubic inches (in³)
        const weightTons = weight / 1000;          // Metric tons
        const weightLb = weight * 2.20462;         // Pounds
        const weightG = weight * 1000;             // Grams
        const weightUSTon = weight / 907.18474;    // US short tons
        const weightImpTon = weight / 1016.0469;   // Imperial tons (UK)

        // Price calculation (by area tab)
        let totalPrice = "";
        if (sandPriceInputArea && sandPriceInputArea.value && sandPriceUnitArea) {
            const price = parseFloat(sandPriceInputArea.value);
            const unit = sandPriceUnitArea.value;
            let quantity = 0;

            if (!isNaN(price) && price > 0) {
                if (unit === "/ kg") quantity = weight;
                else if (unit === "/ lb" || unit === "/ pound") quantity = weightLb;
                else if (unit === "/ g" || unit === "/ gram") quantity = weightG;
                else if (unit === "/ t" || unit === "/ metric ton") quantity = weightTons;
                else if (unit === "/ US ton" || unit === "/ US short ton") quantity = weightUSTon;
                else if (unit === "/ imperial ton" || unit === "/ UK ton") quantity = weightImpTon;
                
                else if (unit === "/ cu cm" || unit === "/ cubic centimeter") quantity = volumeCm3;
                else if (unit === "/ cu in" || unit === "/ cubic inch") quantity = volumeIn3;
                else if (unit === "/ cu m" || unit === "/ cubic meter") quantity = volume;
                else if (unit === "/ cu ft" || unit === "/ CFT or cu ft" || unit === "/ cubic foot") quantity = volumeFt3;
                else if (unit === "/ cu yd" || unit === "/ cubic yard") quantity = volumeYd3;
                

                const total = price * quantity;
                totalPrice = `<li> $${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</li>`;
            }
        }

        // Output
        return `
        <div class="alert alert-success">
            <h3 class="text-center">Results</h3>
            <small class="text-muted text-center d-block">
                You can update the input values or change the units; the result will update automatically.
            </small>
            <ul style="margin-top: 1em; font-size:1.1em; font-weight:500; text-align: left;">
                <li class="mb-4">
                    <b>Volume Needed:</b>
                    <ul>
                        <li>${volumeFt3.toLocaleString(undefined, {maximumFractionDigits: 3})} cubic feet (CFT or cu ft)</li>
                        <li>${volume.toLocaleString(undefined, {maximumFractionDigits: 3})} cubic meters (cu m)</li>
                        <li>${volumeYd3.toLocaleString(undefined, {maximumFractionDigits: 3})} cubic yards (cu yd)</li>
                        <li>${volumeCm3.toLocaleString(undefined, {maximumFractionDigits: 3})} cubic centimeters (cu cm)</li>
                        <li>${volumeIn3.toLocaleString(undefined, {maximumFractionDigits: 3})} cubic inches (cu in)</li>
                    </ul>
                </li>
                <li class="mb-4">
                    <b>Weight Needed:</b>
                    <ul>
                        <li>${weightG.toLocaleString(undefined, {maximumFractionDigits: 3})} grams (g)</li>
                        <li>${weight.toLocaleString(undefined, {maximumFractionDigits: 3})} kilograms (kg)</li>
                        <li>${weightTons.toLocaleString(undefined, {maximumFractionDigits: 3})} metric tons (t)</li>
                        <li>${weightLb.toLocaleString(undefined, {maximumFractionDigits: 3})} pounds (lb)</li>
                    </ul>
                </li>
                ${totalPrice ? `<li><b>Estimated Total Price:</b>${totalPrice.replace('<li>','').replace('</li>','')}</li>` : ''}
            </ul>
            <div style="font-size:0.95em;margin-top:0.5em;">
                <p class="text-center">Use the <a style="color:#cc6666" target="_blank" href="https://propercalculators.com/converters/volume-converter">volume converter</a> to convert the result unit as you want.</p>
            </div>
            <div style="font-size:0.95em;color:#666;margin-top:0.5em;">
                <em>Note: All results are approximate. Please double-check your measurements and input local sand density & cost for best accuracy.</em>
            </div>
        </div>
        `;
    }

    // By Volume calculation logic
    function calculateSandByVolume() {
        if (!inputVolume || !inputVolumeUnit || !inputDensity) return "";

        const volumeVal = parseFloat(inputVolume.value);
        const volumeUnit = inputVolumeUnit.value;
        let densityVal = 0;

        if (inputDensity.value === "custom") {
            densityVal = parseFloat(inputCustomDensity.value);
            if (isNaN(densityVal) || densityVal <= 0) return "";
        } else {
            densityVal = parseFloat(inputDensity.value);
        }

        if (isNaN(volumeVal) || volumeVal <= 0) return "";
        const volumeM3 = convertVolumeToM3(volumeVal, volumeUnit);

        // Weight = Volume * Density
        const weight = volumeM3 * densityVal; // kg

        // Results in other units
        const weightTons = weight / 1000;           // Metric tons (t)
        const weightLb = weight * 2.20462;          // Pounds (lb)
        const volumeFt3 = volumeM3 * 35.3147;       // Cubic feet (ft³)
        const volumeYd3 = volumeM3 * 1.30795;       // Cubic yards (yd³)
        const volumeCm3 = volumeM3 * 1_000_000;     // Cubic centimeters (cm³)
        const volumeIn3 = volumeM3 * 61_023.7441;   // Cubic inches (in³)
        const weightG = weight * 1000;              // Grams (g)
        const weightUSTon = weight / 907.18474;     // US short tons
        const weightImpTon = weight / 1016.0469;    // Imperial tons (UK)

        // Price calculation (by volume tab)
        let totalPrice = "";
        if (sandPriceInputVolume && sandPriceInputVolume.value && sandPriceUnitVolume) {
            const price = parseFloat(sandPriceInputVolume.value);
            const unit = sandPriceUnitVolume.value;
            let quantity = 0;

            if (!isNaN(price) && price > 0) {
                if (unit === "/ kg") quantity = weight;
                else if (unit === "/ lb" || unit === "/ pound") quantity = weightLb;
                else if (unit === "/ g" || unit === "/ gram") quantity = weightG;
                else if (unit === "/ t" || unit === "/ metric ton") quantity = weightTons;
                else if (unit === "/ US ton" || unit === "/ US short ton") quantity = weightUSTon;
                else if (unit === "/ imperial ton" || unit === "/ UK ton") quantity = weightImpTon;
                
                else if (unit === "/ cu cm" || unit === "/ cubic centimeter") quantity = volumeCm3;
                else if (unit === "/ cu in" || unit === "/ cubic inch") quantity = volumeIn3;
                else if (unit === "/ cu m" || unit === "/ cubic meter") quantity = volumeM3;
                else if (unit === "/ cu ft" || unit === "/ CFT or cu ft" || unit === "/ cubic foot") quantity = volumeFt3;
                else if (unit === "/ cu yd" || unit === "/ cubic yard") quantity = volumeYd3;

                const total = price * quantity;
                totalPrice = `<li> $${total.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</li>`;
            }
        }

        // Output
        return `
            <div class="alert alert-success">
                <h3 class="text-center">Results</h3>
                <small class="text-muted text-center d-block">
                    You can update the input values or change the units; the result will update automatically.
                </small>

                <ul style="margin-top: 1em; font-size:1.1em; font-weight:500; text-align: left;">
                    <li class="mb-4">
                        <b>Volume Needed:</b>
                        <ul>
                            <li>${volumeFt3.toLocaleString(undefined, {maximumFractionDigits: 3})} cubic feet (CFT or cu ft)</li>
                            <li>${volumeM3.toLocaleString(undefined, {maximumFractionDigits: 3})} cubic meters (cu m)</li>
                            <li>${volumeYd3.toLocaleString(undefined, {maximumFractionDigits: 3})} cubic yards (cu yd)</li>
                            <li>${volumeCm3.toLocaleString(undefined, {maximumFractionDigits: 3})} cubic centimeters (cu cm)</li>
                            <li>${volumeIn3.toLocaleString(undefined, {maximumFractionDigits: 3})} cubic inches (cu in)</li> 
                        </ul>
                    </li>
                    <li class="mb-4">
                        <b>Weight Needed:</b>
                        <ul>
                            <li>${weightG.toLocaleString(undefined, {maximumFractionDigits: 3})} grams (g)</li>
                            <li>${weight.toLocaleString(undefined, {maximumFractionDigits: 3})} kilograms (kg)</li>
                            <li>${weightTons.toLocaleString(undefined, {maximumFractionDigits: 3})} metric tons (t)</li>
                            <li>${weightLb.toLocaleString(undefined, {maximumFractionDigits: 3})} pounds (lb)</li>
                            <li>${weightUSTon.toLocaleString(undefined, {maximumFractionDigits: 3})} US short tons</li>
                            <li>${weightImpTon.toLocaleString(undefined, {maximumFractionDigits: 3})} imperial tons (UK)</li>
                        </ul>
                    </li>
                    ${totalPrice ? `<li><b>Estimated Total Price:</b>${totalPrice.replace('<li>','').replace('</li>','')}</li>` : ''}
                </ul>
                <div style="font-size:0.95em;margin-top:0.5em;">
                    <p class="text-center">Use the <a style="color:#cc6666" target="_blank" href="https://propercalculators.com/converters/volume-converter">volume converter</a> to convert the result unit as you want.</p>
                </div>
                <div style="font-size:0.95em;color:#666;margin-top:0.5em;">
                    <em>Note: All results are approximate. Please double-check your measurements and input local sand density & cost for best accuracy.</em>
                </div>
            </div>
        `;
    }

    // Live update for Area tab
    function updateAreaResult() {
        if (areaResult) areaResult.innerHTML = calculateSand();
    }

    // Live update for Volume tab
    function updateVolumeResult() {
        if (volumeResult) volumeResult.innerHTML = calculateSandByVolume();
    }

    // Attach events for Area tab
    document.getElementById("area-fields").addEventListener("input", updateAreaResult);
    document.getElementById("area-fields").addEventListener("change", updateAreaResult);

    // Attach events for Volume tab
    document.getElementById("volume-fields").addEventListener("input", updateVolumeResult);
    document.getElementById("volume-fields").addEventListener("change", updateVolumeResult);

    // Live update for sand price fields (both tabs)
    if (sandPriceInputArea) sandPriceInputArea.addEventListener("input", updateAreaResult);
    if (sandPriceUnitArea) sandPriceUnitArea.addEventListener("change", updateAreaResult);
    if (sandPriceInputVolume) sandPriceInputVolume.addEventListener("input", updateVolumeResult);
    if (sandPriceUnitVolume) sandPriceUnitVolume.addEventListener("change", updateVolumeResult);

    // Clear button
    form.addEventListener("reset", function () {
        setTimeout(() => {
            updateDimensionFields();
            if (areaResult) areaResult.innerHTML = "";
            if (volumeResult) volumeResult.innerHTML = "";
            customDensity.style.display = "none";
            if (inputCustomDensity) inputCustomDensity.style.display = "none";
            // Re-apply unit dropdown logic for all dynamic selects
            applyUnitDropdowns();
        }, 50);
    });

    function setupUnitDropdown(select) {
        // Show full form in dropdown on open
        select.addEventListener("mousedown", function () {
            // When the select is opened, set each option's text to its data-full attribute (e.g., "meter (m)")
            for (let option of select.options) {
                option.textContent = option.getAttribute("data-full") || option.value;
            }
        });
        // Show short form in select box after selection/close
        function showShort() {
            // When the select is closed or a value is selected, set each option's text to its short form (e.g., "m")
            for (let option of select.options) {
                option.textContent = option.value;
            }
        }
        // Listen for change and blur events to revert to short form
        select.addEventListener("change", showShort);
        select.addEventListener("blur", showShort);
        // Initialize to short form on page load
        showShort();
    }

    // Call this after DOM is ready and after any dynamic field injection
    function applyUnitDropdowns() {
        document.querySelectorAll('.unit-dropdown').forEach(setupUnitDropdown);
    }
});