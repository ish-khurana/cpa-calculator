function checkFields() {
    const fromUnit = document.getElementById("convertFrom").value;
    const toUnit = document.getElementById("convertTo").value;

    // Show/hide fields based on "M"
    const showMolarMass = fromUnit === "m" || toUnit === "m";
    document.getElementById("molarMassField").style.display = showMolarMass ? "block" : "none";

    // Show/hide fields based on "w/w%"
    const showDensitySolvent = fromUnit === "w_w" || toUnit === "w_w";
    document.getElementById("densitySolventField").style.display = showDensitySolvent ? "block" : "none";

    // Show/hide fields based on "w/v%"
    const showDensitySolute = fromUnit === "w_v" || toUnit === "w_v";
    document.getElementById("densitySoluteField").style.display = showDensitySolute ? "block" : "none";
}

function convert() {
    const value = parseFloat(document.getElementById("input1").value);
    const fromUnit = document.getElementById("convertFrom").value;
    const toUnit = document.getElementById("convertTo").value;

    let molarMass = parseFloat(document.getElementById("molarMass").value) || 0;
    let densitySolvent = parseFloat(document.getElementById("densitySolvent").value) || 0;
    let densitySolute = parseFloat(document.getElementById("densitySolute").value) || 0;

    let result;

    if (isNaN(value)) {
        result = "Please enter a valid number for the value.";
    } else if (fromUnit === toUnit) {
        result = "Conversion units are the same. Please select different units.";
    } else {
        // Example logic (replace with actual formulas)
        if (fromUnit === "m" && toUnit === "w_w") {
            result = molarMass && densitySolvent
                ? `Converted to w/w%: ${convertMtoWW(value, molarMass, densitySolvent).toFixed(2)}%`
                : "Please provide the molar mass of solute and density of solvent.";
        } else if (fromUnit === "w_w" && toUnit === "m") {
            result = molarMass && densitySolvent && densitySolute
                ? `Converted to M: ${convertWWtoM(value, molarMass,densitySolvent, densitySolute).toFixed(2)} M`
                : "Please provide the molar mass of solute, density of solvent, and density of solute.";
        } else if (fromUnit === "m" && toUnit === "w_v") {
            result = molarMass && densitySolute
                ? `Converted to w/v%: ${convertMtoWV(value, molarMass, densitySolute).toFixed(2)}%`
                : "Please provide the molar mass of solute and density of solute.";
        } else if (fromUnit === "w_v" && toUnit === "m") {
            result = molarMass && densitySolute
                ? `Converted to M: ${convertWVtoM(value, molarMass, densitySolute).toFixed(2)} M`
                : "Please provide the molar mass of solute and density of solute.";
        } else if (fromUnit === "w_w" && toUnit === "w_v") {
            result = densitySolute && densitySolvent
                ? `Converted to w/v%: ${convertWWtoWV(value, densitySolute, densitySolvent).toFixed(2)}%`
                : "Please provide the density of solute and density of solvent.";
        } else if (fromUnit === "w_v" && toUnit === "w_w") {
            result = densitySolute && densitySolvent
                ? `Converted to w/w%: ${convertWVtoWW(value, densitySolute, densitySolvent).toFixed(2)}%`
                : "Please provide the density of solute and density of solvent.";
        } else {
            result = "Conversion not supported.";
        }
    }

    document.getElementById("result").innerText = result;
}

function convertMtoWW(concentration, molarMass, densitySolvent) {
    let moles = concentration;
    let massSolute = moles * molarMass;
    let massSolvent = 1 * (densitySolvent*1000);

    return (massSolute / (massSolute + massSolvent)) * 100;
}

function convertWWtoM(weightByWeight, molarMass, densitySolvent, densitySolute){
    let massSolute = weightByWeight;
    let massSolvent = 100 - massSolute;
    let volSolvent = massSolvent * 1/(densitySolvent*1000);
    let volSolute = massSolute * 1/(densitySolute*1000)
    let molSolute = massSolute * (1/molarMass);

    return molSolute / (volSolvent + volSolute);
}

function convertMtoWV(concentration, molarMass, densitySolute){
    let molesSolute = concentration;
    let massSolute = molesSolute * molarMass;
    let volSolute = massSolute * (1/densitySolute);

    return (massSolute / (1000 + volSolute)) * 100;
}

function convertWVtoM(weightByVolume, molarMass, densitySolute){
    let massSolute = weightByVolume;
    let molSolute = massSolute * (1/molarMass);
    let volSolute = massSolute * (1/densitySolute);
    let volSolvent = 100 - volSolute;
    
    return molSolute / (volSolvent/1000);
}

function convertWWtoWV(weightByWeight, densitySolute, densitySolvent){
    let massSolute = weightByWeight;
    let volSolute = massSolute * (1/densitySolute);
    let volSolvent = (100 - massSolute) * (1/densitySolvent);

    return (massSolute / (volSolute + volSolvent))*100;
}

function convertWVtoWW(weightByVolume, densitySolute, densitySolvent){
    let massSolute = weightByVolume;
    let volSolute = massSolute * (1/densitySolute);
    let massSolvent = (100 - volSolute) * densitySolvent

    return (massSolute / (massSolute + massSolvent))*100;
}