document.addEventListener("DOMContentLoaded", function () {
  const distanceInput = document.getElementById("distance");
  const speedInput = document.getElementById("speed");
  const distanceUnit = document.getElementById("distance-unit");
  const speedUnit = document.getElementById("speed-unit");
  const timeUnit = document.getElementById("time-unit");

  const hms = document.getElementById("hms");
  const timeInputSections = {
    hms,
    hour: document.getElementById("hour"),
    minute: document.getElementById("minute"),
    second: document.getElementById("second"),
    day: document.getElementById("day"),
    week: document.getElementById("week"),
    month: document.getElementById("month"),
    year: document.getElementById("year")
  };

  const unitToID = {
    "h:m:s": "hms",
    hrs: "hour",
    min: "minute",
    sec: "second",
    days: "day",
    wks: "week",
    mos: "month",
    yrs: "year"
  };

  const distanceUnits = {
    mm: 0.001,
    cm: 0.01,
    dm: 0.1,
    m: 1,
    km: 1000,
    in: 0.0254,
    ft: 0.3048,
    yd: 0.9144,
    mi: 1609.344,
    nmi: 1852
  };

  const speedUnits = {
    "mm/s": 0.001,
    "cm/s": 0.01,
    "m/s": 1,
    "m/h": 1 / 3600,
    "km/h": 1000 / 3600,
    "km/min": 1000 / 60,
    "ft/s": 0.3048,
    "ft/min": 0.3048 / 60,
    "mph": 1609.344 / 3600,
    "mi/min": 1609.344 / 60,
    "knot": 1852 / 3600
  };

  const timeUnits = {
    hrs: 3600,
    min: 60,
    sec: 1,
    days: 86400,
    wks: 7 * 86400,
    mos: 30.44 * 86400,
    yrs: 365.25 * 86400
  };

  let baseDistance = null;
  let baseSpeed = null;
  let baseTime = null;
  let lastChanged = null;
  let prevChanged = null;

  function formatNumber(num) {
    // Use scientific notation if more than 10 decimal digits
    let absNum = Math.abs(num);
    if (absNum !== 0 && (absNum < 1e-9 || absNum >= 1e10)) {
      return num.toExponential(10).replace(/(?:\.0+|(\.\d+?)0+)e/, '$1e').replace(/(\d)5e/, function (m, p1) {
        // Carry for 5 at the end before e
        return (parseInt(p1) + 1) + 'e';
      });
    }

    let str = Number(num).toFixed(10);

    // Custom rounding: if last digit is 5, add 1 to previous digit (handle carry)
    if (str.includes(".")) {
      let [intPart, decPart] = str.split(".");
      if (decPart.length === 10 && decPart[9] === "5") {
        let digits = decPart.slice(0, 9).split("").map(Number);
        digits[8] += 1;
        // Carry handling
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
      // Remove trailing zeros
      decPart = decPart.replace(/0+$/, "");
      return decPart.length > 0 ? `${intPart}.${decPart}` : intPart;
    }
    return str;
  }

  function showTimeInput() {
    const selected = timeUnit.value;
    Object.values(timeInputSections).forEach(section => {
      if (section) section.style.display = "none";
    });
    const sectionId = unitToID[selected];
    const section = timeInputSections[sectionId];
    if (section) {
      section.style.display = selected === "h:m:s" ? "flex" : "block";
    }
  }

  function getTimeInSecondsFromInputs(unitOverride) {
    const selected = unitOverride || timeUnit.value;
    if (selected === "h:m:s") {
      const h = parseFloat(hms.querySelector('[data-time="h"]').value) || 0;
      const m = parseFloat(hms.querySelector('[data-time="m"]').value) || 0;
      const s = parseFloat(hms.querySelector('[data-time="s"]').value) || 0;
      return h * 3600 + m * 60 + s;
    } else {
      const sectionId = unitToID[selected];
      const section = timeInputSections[sectionId];
      if (!section) return 0;
      const input = section.querySelector("input");
      const val = parseFloat(input.value);
      return isNaN(val) ? 0 : val * (timeUnits[selected] || 1);
    }
  }

  function updateResult(changed) {
    if (changed) {
      if (lastChanged !== changed) {
        prevChanged = lastChanged;
        lastChanged = changed;
      }
    }

    const dVal = parseFloat(distanceInput.value);
    const sVal = parseFloat(speedInput.value);
    const tVal = getTimeInSecondsFromInputs();

    const dFilled = !isNaN(dVal);
    const sFilled = !isNaN(sVal);
    const tFilled = tVal > 0;

    const dUnit = distanceUnit.value;
    const sUnit = speedUnit.value;

    baseDistance = dFilled ? dVal * distanceUnits[dUnit] : null;
    baseSpeed = sFilled ? sVal * speedUnits[sUnit] : null;
    baseTime = tFilled ? tVal : null;

    // Only recalculate if two are filled
    const filled = [dFilled, sFilled, tFilled].filter(Boolean).length;
    if (filled < 2) {
      updateDisplay();
      return;
    }

    // Decide which field to update (the one not changed last)
    if ((!dFilled || (lastChanged !== "distance" && prevChanged !== "distance"))) {
      // Calculate distance
      if (baseSpeed !== null && baseTime !== null) {
        baseDistance = baseSpeed * baseTime;
      }
    } else if ((!sFilled || (lastChanged !== "speed" && prevChanged !== "speed"))) {
      // Calculate speed
      if (baseDistance !== null && baseTime !== null) {
        baseSpeed = baseDistance / baseTime;
      }
    } else if ((!tFilled || (lastChanged !== "time" && prevChanged !== "time"))) {
      // Calculate time
      if (baseDistance !== null && baseSpeed !== null) {
        baseTime = baseDistance / baseSpeed;
      }
    }

    updateDisplay();
  }

  function updateDisplay() {
    // Determine which field is the answer (not among lastChanged and prevChanged)
    const fields = ["distance", "speed", "time"];
    const lastTwo = [lastChanged, prevChanged];
    const answerField = fields.find(f => !lastTwo.includes(f));

    // Distance
    if (baseDistance !== null) {
      const dUnit = distanceUnit.value;
      const formatted = formatNumber(baseDistance / distanceUnits[dUnit]);
      if (
        document.activeElement !== distanceInput &&
        distanceInput.value !== formatted
      ) {
        distanceInput.value = formatted;
      }
      if (answerField === "distance") {
        distanceInput.classList.add("result-green");
      } else {
        distanceInput.classList.remove("result-green");
      }
    } else {
      distanceInput.classList.remove("result-green");
    }

    // Speed
    if (baseSpeed !== null) {
      const sUnit = speedUnit.value;
      const formatted = formatNumber(baseSpeed / speedUnits[sUnit]);
      if (
        document.activeElement !== speedInput &&
        speedInput.value !== formatted
      ) {
        speedInput.value = formatted;
      }
      if (answerField === "speed") {
        speedInput.classList.add("result-green");
      } else {
        speedInput.classList.remove("result-green");
      }
    } else {
      speedInput.classList.remove("result-green");
    }

    // Time
    let timeActive = false;
    let timeInputs = [];
    Object.values(timeInputSections).forEach(section => {
      if (!section) return;
      section.querySelectorAll("input").forEach(input => {
        timeInputs.push(input);
        if (document.activeElement === input) timeActive = true;
      });
    });
    if (!timeActive && baseTime !== null) {
      setTimeInputsFromSeconds(baseTime, answerField === "time");
    } else {
      // Remove green from all time inputs if user is typing
      timeInputs.forEach(input => input.classList.remove("result-green"));
    }
  }

  function setTimeInputsFromSeconds(seconds, makeGreen) {
    const selected = timeUnit.value;
    if (selected === "h:m:s") {
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      const hInput = hms.querySelector('[data-time="h"]');
      const mInput = hms.querySelector('[data-time="m"]');
      const sInput = hms.querySelector('[data-time="s"]');
      hInput.value = h;
      mInput.value = m;
      sInput.value = formatNumber(s);
      if (makeGreen) {
        hInput.classList.add("result-green");
        mInput.classList.add("result-green");
        sInput.classList.add("result-green");
      } else {
        hInput.classList.remove("result-green");
        mInput.classList.remove("result-green");
        sInput.classList.remove("result-green");
      }
    } else {
      const sectionId = unitToID[selected];
      const section = timeInputSections[sectionId];
      if (!section) return;
      const input = section.querySelector("input");
      const val = seconds / (timeUnits[selected] || 1);
      input.value = formatNumber(val);
      if (makeGreen) input.classList.add("result-green");
      else input.classList.remove("result-green");
    }
  }

  function clearInputs() {
    document.querySelectorAll("input").forEach(el => {
      el.value = "";
      el.classList.remove("result-green");
    });
    baseDistance = null;
    baseSpeed = null;
    baseTime = null;
    lastChanged = null;
    showTimeInput();
  }

  function convertDistanceUnit() {
    const oldUnit = distanceUnit.getAttribute("data-prev");
    const newUnit = distanceUnit.value;
    if (baseDistance !== null && oldUnit !== newUnit) {
      distanceInput.value = formatNumber(baseDistance / distanceUnits[newUnit]);
    }
    distanceUnit.setAttribute("data-prev", newUnit);
  }

  function convertSpeedUnit() {
    const oldUnit = speedUnit.getAttribute("data-prev");
    const newUnit = speedUnit.value;
    if (baseSpeed !== null && oldUnit !== newUnit) {
      speedInput.value = formatNumber(baseSpeed / speedUnits[newUnit]);
    }
    speedUnit.setAttribute("data-prev", newUnit);
  }

  function convertTimeUnit() {
    const oldUnit = timeUnit.getAttribute("data-prev");
    const newUnit = timeUnit.value;

    if (baseTime === null) {
      const tempTime = getTimeInSecondsFromInputs(oldUnit);
      if (tempTime > 0) {
        baseTime = tempTime;
      } else {
        showTimeInput();
        return;
      }
    }

    timeUnit.setAttribute("data-prev", newUnit);
    showTimeInput();
    setTimeInputsFromSeconds(baseTime);
  }

  // Remove green from all fields when user types in any input
  function removeAllResultGreen() {
    distanceInput.classList.remove("result-green");
    speedInput.classList.remove("result-green");
    Object.values(timeInputSections).forEach(section => {
      if (!section) return;
      section.querySelectorAll("input").forEach(input => {
        input.classList.remove("result-green");
      });
    });
  }

  // Event Listeners
  distanceInput.addEventListener("input", () => {
    removeAllResultGreen();
    updateResult("distance");
  });
  speedInput.addEventListener("input", () => {
    removeAllResultGreen();
    updateResult("speed");
  });
  Object.values(timeInputSections).forEach(section => {
    if (!section) return;
    section.querySelectorAll("input").forEach(input => {
      input.addEventListener("input", () => {
        removeAllResultGreen();
        updateResult("time");
      });
    });
  });

  document.getElementById("clear").addEventListener("click", clearInputs);

  distanceUnit.addEventListener("change", () => {
    convertDistanceUnit();
    updateDisplay();
  });

  speedUnit.addEventListener("change", () => {
    convertSpeedUnit();
    updateDisplay();
  });

  timeUnit.addEventListener("change", () => {
    convertTimeUnit();
    updateDisplay();
  });

  // Initialize
  distanceUnit.setAttribute("data-prev", distanceUnit.value);
  speedUnit.setAttribute("data-prev", speedUnit.value);
  timeUnit.setAttribute("data-prev", timeUnit.value);
  showTimeInput();

  // Distance unit dropdown full/short form
  distanceUnit.addEventListener("mousedown", function () {
    for (let option of distanceUnit.options) {
      option.textContent = option.getAttribute("data-full");
    }
  });
  distanceUnit.addEventListener("change", function () {
    for (let option of distanceUnit.options) {
      option.textContent = option.value;
    }
  });
  distanceUnit.addEventListener("blur", function () {
    for (let option of distanceUnit.options) {
      option.textContent = option.value;
    }
  });
  for (let option of distanceUnit.options) {
    option.textContent = option.value;
  }

  // Speed unit dropdown full/short form
  speedUnit.addEventListener("mousedown", function () {
    for (let option of speedUnit.options) {
      option.textContent = option.getAttribute("data-full");
    }
  });
  speedUnit.addEventListener("change", function () {
    for (let option of speedUnit.options) {
      option.textContent = option.value;
    }
  });
  speedUnit.addEventListener("blur", function () {
    for (let option of speedUnit.options) {
      option.textContent = option.value;
    }
  });
  for (let option of speedUnit.options) {
    option.textContent = option.value;
  }
});