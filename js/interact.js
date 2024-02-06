// general - general functions are prefixed with _
function _findIndex(object, array) {
    for (let i = 0; i < array.length; i++) {
        if (array[i] === object) return i;
    }
    return -1;
}

function _calculateLinearInterpolation(start, end, startPointer, endPointer, currentPosition) {
    return startPointer + ((currentPosition - start) * (endPointer - startPointer) / (end - start));
}

// classes
// _tab management
let tabs = document.querySelectorAll(".classes-tab-button");
let activeTab = document.querySelector(".classes-tab-button-activated");

// _tab content management
let tabContents = document.querySelectorAll(".classes-tab-content");
let activeTabContent = document.querySelector(".classes-tab-content-activated");

tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
        let target = e.target;
        let targetIndex = _findIndex(target, tabs);

        // tab toggles
        activeTab.classList.toggle("classes-tab-button-activated");
        target.classList.toggle("classes-tab-button-activated");
        activeTab = target;

        // tab content toggles
        activeTabContent.classList.toggle("classes-tab-content-activated");
        tabContents[targetIndex].classList.toggle("classes-tab-content-activated");
        activeTabContent = tabContents[targetIndex];
    });
});

// bmi calculator
let bmiLevels = [18.5, 25, 30, 35]; // compare by "less than OR greater than or equal to"

// _inputs
let heightInput = document.getElementById("bmi-calculator-interact-text-field-height");
let weightInput = document.getElementById("bmi-calculator-interact-text-field-weight");

let height = 0;
let weight = 0;
let bmi = 0;

// _result
let gapStep = 1; // in percentage
let bmiLevelStep = 15; // in percentage
let step = gapStep + bmiLevelStep;

let bmiLevelIndicator = document.querySelector("#bmi-calculator .bmi-calculator-result .indicator");
let bmiLevelText = document.querySelector("#bmi-calculator .bmi-calculator-result h3");
let bmiLevelStart = 6;

// _ready input listeners
heightInput.addEventListener("input", (e) => {
    height = parseInt(e.target.value);
    _calculateBMI();
});
weightInput.addEventListener("input", (e) => {
    weight = parseInt(e.target.value);
    _calculateBMI();
});

// _calculation functions
function _calculateBMI() {
    if (heightInput.value === "" || weightInput.value === "") {
        return;
    }
    bmi = weight / (height * height) * 10000;
    bmiLevelText.innerText = "Your BMI\n" + bmi;
    _setBmiLevelIndicator(bmi);
}

function _setBmiLevelIndicator(bmi) {
    let level = 0;
    bmiLevels.forEach((bmiLevel) => {
        if (bmiLevel < bmi) level++
    });

    let startPointer = (step * level) + bmiLevelStart;
    let endPointer = startPointer + bmiLevelStep;

    let start;
    let end;
    let indicatorPosition;

    if (level === 0) indicatorPosition = 13;
    else if (level === bmiLevels.length) indicatorPosition = 78;
    else {
        start = bmiLevels[level - 1];
        end = bmiLevels[level];
        indicatorPosition = _calculateLinearInterpolation(start, end, startPointer, endPointer, bmi);
    }

    bmiLevelIndicator.style.left = indicatorPosition + "%";
    console.log(`level => ${level}\n${bmi} => ${indicatorPosition}\n${start} => ${startPointer}\n${end} => ${endPointer}`);
    /*
    6 => ? (0)
    21 => 18,5
    _0 <=
    22 => 18,5
    37 => 25
    _1 <=
    38 => 25
    53 => 30
    _2 <=
    54 => 30
    69 => 35
    _3 <=
    70 => 35
    86 => ?
     */
}
