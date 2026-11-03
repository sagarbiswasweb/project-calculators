document.addEventListener('DOMContentLoaded', function () {
    // --- Towing Estimate Calculator Logic ---

  const vehiclePricing = {
    compact: { base: 50, perMile: 3 },
    suv: { base: 65, perMile: 3.5 },
    pickup: { base: 70, perMile: 4 },
    luxury: { base: 90, perMile: 4.5 },
    motorcycle: { base: 60, perMile: 3 },
    van: { base: 70, perMile: 3.75 },
    heavy: { base: 150, perMile: 8 },
  };

  const towMethodPricing = {
    flatbed: { base: 120, perMile: 4.5 },
    wheelLift: { base: 75, perMile: 3 },
    hookChain: { base: 75, perMile: 2.5 },
    heavyDuty: { base: 200, perMile: 8 },
    motorcycle: { base: 90, perMile: 3.5 },
  };

  // Define compatibility
  const vehicleToTow = {
    compact:      ["flatbed", "wheelLift", "hookChain"],
    suv:          ["flatbed", "wheelLift", "hookChain"],
    pickup:       ["flatbed", "wheelLift", "hookChain", "heavyDuty"],
    luxury:       ["flatbed", "wheelLift", "hookChain"],
    motorcycle:   ["motorcycle", "flatbed"],
    van:          ["flatbed", "wheelLift", "hookChain", "heavyDuty"],
    heavy:        ["heavyDuty", "flatbed"],
  };

  const towToVehicle = {
    flatbed:     ["compact", "suv", "pickup", "luxury", "motorcycle", "van", "heavy"],
    wheelLift:   ["compact", "suv", "pickup", "van", "luxury"],
    hookChain:   ["compact", "suv", "pickup", "van", "luxury"],
    heavyDuty:   ["pickup", "van", "heavy"],
    motorcycle:  ["motorcycle"],
  };

  const locationPricing = {
    urban: { base: 80, perMile: 3.5 },
    suburban: { base: 90, perMile: 4 },
    rural: { base: 100, perMile: 5 },
    interstate: { base: 120, perMile: 5.5 },
    mountain: { base: 150, perMile: 7 },
  };

  const afterHoursFee = 50;
  const winchingRange = [75, 200];
  const roadsideRange = [40, 80];
  const storageRange = [25, 80];
  const tollEstimate = 10;

  function getAvg(arr) {
    return (arr[0] + arr[1]) / 2;
  }

  function formatUSD(num) {
    return "$" + num.toFixed(2);
  }

  function estimateTowingCost(inputs) {
    const vehicle = vehiclePricing[inputs.vehicleType];
    const tow = towMethodPricing[inputs.towType];
    const loc = locationPricing[inputs.location];

    const baseFee = Math.max(vehicle.base, tow.base, loc.base);
    const perMile = Math.max(vehicle.perMile, tow.perMile, loc.perMile);
    const distanceFee = perMile * inputs.distance;
    const afterHours = inputs.timeOfDay !== "day" ? afterHoursFee : 0;
    const winching = inputs.winching ? getAvg(winchingRange) : 0;
    const roadside = inputs.roadside ? getAvg(roadsideRange) : 0;
    const storage = inputs.storage ? getAvg(storageRange) : 0;
    const toll = inputs.toll ? tollEstimate : 0;

    const subtotal = baseFee + distanceFee + afterHours + winching + roadside + storage + toll;
    const envSurcharge = inputs.env ? subtotal * 0.07 : 0;
    const total = subtotal + envSurcharge;

    return { baseFee, perMile, distanceFee, afterHours, winching, roadside, storage, toll, envSurcharge, total };
  }

  // --- Dynamic Filtering Logic ---

  const vehicleTypeSelect = document.getElementById('vehicleType');
  const towTypeSelect = document.getElementById('towType');

  function filterTowOptions() {
    const vehicle = vehicleTypeSelect.value;
    Array.from(towTypeSelect.options).forEach(opt => {
      if (!opt.value) return; // skip placeholder
      opt.disabled = vehicle && vehicleToTow[vehicle] && !vehicleToTow[vehicle].includes(opt.value);
    });
  }

  function filterVehicleOptions() {
    const tow = towTypeSelect.value;
    Array.from(vehicleTypeSelect.options).forEach(opt => {
      if (!opt.value) return; // skip placeholder
      opt.disabled = tow && towToVehicle[tow] && !towToVehicle[tow].includes(opt.value);
    });
  }

  // Reset disables when both are reset
  function resetFilters() {
    Array.from(vehicleTypeSelect.options).forEach(opt => opt.disabled = false);
    Array.from(towTypeSelect.options).forEach(opt => opt.disabled = false);
  }

  // Attach listeners
  vehicleTypeSelect.addEventListener('change', function() {
    filterTowOptions();
    // If current towType is now disabled, reset it
    if (towTypeSelect.value && towTypeSelect.options[towTypeSelect.selectedIndex].disabled) {
      towTypeSelect.value = "";
    }
  });
  towTypeSelect.addEventListener('change', function() {
    filterVehicleOptions();
    // If current vehicleType is now disabled, reset it
    if (vehicleTypeSelect.value && vehicleTypeSelect.options[vehicleTypeSelect.selectedIndex].disabled) {
      vehicleTypeSelect.value = "";
    }
  });
  document.getElementById('clear').addEventListener('click', function () {
    resetFilters();
  });

  // --- Calculator Submit Logic ---

  document.getElementById('towing-estimate-calculator').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get distance and convert if needed
    let distance = parseFloat(document.getElementById('distance').value);
    const distanceUnit = document.getElementById('distance-unit') ? document.getElementById('distance-unit').value : "mi";
    if (distanceUnit === "km") {
      distance = distance * 0.621371; // convert km to miles
    }

    const inputs = {
      vehicleType: vehicleTypeSelect.value,
      towType: towTypeSelect.value,
      distance: distance,
      location: document.getElementById('location').value,
      timeOfDay: document.getElementById('timeOfDay').value,
      winching: document.getElementById('winching').checked,
      roadside: document.getElementById('roadside').checked,
      storage: document.getElementById('storage').checked,
      toll: document.getElementById('toll').checked,
      env: document.getElementById('env').checked,
    };

    if (!inputs.vehicleType || !inputs.towType || !inputs.distance || !inputs.location || !inputs.timeOfDay || inputs.distance <= 0) {
      alert("Please fill in all required fields correctly.");
      return;
    }

    const result = estimateTowingCost(inputs);

      // Build a user-friendly result card with thousand separators
      let html = `
        <div class="rounded alert alert-success">
          <h4 class="mb-3 text-center"><i class="fa-solid fa-car-side"></i> Towing Estimate Summary</h4>
          <ul class="list-unstyled mb-3 text-start">
            <li class="mb-1"><strong>Vehicle Type:</strong> ${vehicleTypeSelect.options[vehicleTypeSelect.selectedIndex].text}</li>
            <li class="mb-1"><strong>Towing Method:</strong> ${towTypeSelect.options[towTypeSelect.selectedIndex].text}</li>
            <li class="mb-1"><strong>Distance:</strong> ${inputs.distance.toLocaleString(undefined, {maximumFractionDigits:2})} mi</li>
            <li class="mb-1"><strong>Location:</strong> ${document.getElementById('location').options[document.getElementById('location').selectedIndex].text}</li>
            <li class="mb-1"><strong>Time of Service:</strong> ${document.getElementById('timeOfDay').options[document.getElementById('timeOfDay').selectedIndex].text}</li>
          </ul>
          <hr>
          <div class="mb-1 text-start"><strong>Base Hook-up Fee:</strong> ${formatUSD(result.baseFee)}</div>
          <div class="mb-1 text-start"><strong>Per Mile Rate:</strong> ${formatUSD(result.perMile)} × ${inputs.distance.toLocaleString(undefined, {maximumFractionDigits:2})} mi = ${formatUSD(result.distanceFee)}</div>
          ${result.afterHours ? `<div class="mb-1 text-start"><strong>After-hours Fee:</strong> ${formatUSD(result.afterHours)}</div>` : ""}
          ${result.winching ? `<div class="mb-1 text-start"><strong>Winching/Recovery:</strong> ${formatUSD(result.winching)}</div>` : ""}
          ${result.roadside ? `<div class="mb-1 text-start"><strong>Roadside Assistance:</strong> ${formatUSD(result.roadside)}</div>` : ""}
          ${result.storage ? `<div class="mb-1 text-start"><strong>Storage (1 day):</strong> ${formatUSD(result.storage)}</div>` : ""}
          ${result.toll ? `<div class="mb-1 text-start"><strong>Toll Charges:</strong> ${formatUSD(result.toll)}</div>` : ""}
          ${result.envSurcharge ? `<div class="mb-1 text-start"><strong>Environmental Surcharge (7%):</strong> ${formatUSD(result.envSurcharge)}</div>` : ""}
          <hr>
          <div class="fs-4 fw-bold text-center"><i class="fa-solid fa-sack-dollar"></i> Total Estimate: <span>${formatUSD(result.total)}</span></div>
          <div class="text-start" style="font-size:0.95em;color:#666;margin-top:0.5em;">
              <em>Note: This towing estimate is approximate. Actual costs may vary based on your location, service provider, and specific circumstances. Please verify all details with your towing company.</em>
          </div>
        </div>
      `;

      // Helper to format with thousand separator and 2 decimals
      function formatUSD(num) {
        return "$" + num.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2});
      }

      document.getElementById('resultArea').innerHTML = html;
      // document.getElementById('resultArea').style.display = 'block';
       document.getElementById('resultArea').classList.remove('d-none'); // Show result area
  });

  document.getElementById('clear').addEventListener('click', function () {
    document.getElementById('towing-estimate-calculator').reset();
    document.getElementById('resultArea').innerHTML = '';
    // document.getElementById('resultArea').style.display = 'none';
    document.getElementById('resultArea').classList.add('d-none'); // Hide result area
    resetFilters();
  });

  // Distance unit select: show full text on open, short on close/selection
  const distanceUnitSelect = document.getElementById('distance-unit');

  // Helper to set option text to full or short
  function setDistanceUnitText(full) {
    Array.from(distanceUnitSelect.options).forEach(opt => {
      opt.text = full ? opt.getAttribute('data-full') : opt.value;
    });
  }

  // Show full text when select is focused (opened)
  distanceUnitSelect.addEventListener('focus', function() {
    setDistanceUnitText(true);
  });

  // Show short text after selection or blur
  distanceUnitSelect.addEventListener('change', function() {
    setDistanceUnitText(false);
  });
  distanceUnitSelect.addEventListener('blur', function() {
    setDistanceUnitText(false);
  });

  // Initialize to short form on page load
  setDistanceUnitText(false);
});
