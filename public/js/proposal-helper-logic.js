const button = document.getElementById('submit');
const currentDealCommission = document.getElementById('current-deal-commission');
const expectedPayout = document.getElementById('expected-payout');
const percentageToQuotaHeader = document.getElementById('percentage-to-quota-output-header');
const expectedPayoutHeader = document.getElementById('expected-payout-header');
const currentICROutput = document.getElementById('current-icr-output');
const percentageToQuotaOutput = document.getElementById('percentage-to-quota-output');
const recommendedOneYearDeal = document.getElementById('recommended-one-year-deal');
const recommendedThreeYearDeal = document.getElementById('recommended-three-year-deal');
const recommendedDealDiv = document.getElementById('recommended-deals-container')


// Declaring variable outside of the functions below so that they're in the global scope
let quarterlyQuotaValue
let variableCompValue
let currentAttainment

let percentageToQuota
let percentageToQuotaWithDeal

let currentTermLength
let currentACV
let currentMultiYearRevenue
let currentServicesHours
let currentPaymentTerms

let multiYearCommission
let servicesCommission
let acvCommission
let subTotalCommission
let totalCommission

let basePayout
let acceleratorPayoutOne
let acceleratorPayoutTwo

let multiYearICRPercentage = .04
let servicesICRPercentage = .01
let acceleratorMultiplierOne = 2
let acceleratorMultiplierTwo = 2.5
let acceleratorMultiplierThree = 1.5

let currentICR
let currentPayout

let proposedOneYearDealACV
let proposedOneYearDealCommission
let oneYearCommission
let threeYearCommission

function getValues () {
    quarterlyQuota = document.getElementById('quarterly-quota').value
    variableComp = document.getElementById('variable-comp').value
    currentAttainment = document.getElementById('current-attainment').value
    currentTermLength = document.getElementById('current-term-length').value
    currentACV = parseInt(document.getElementById('current-acv').value, 10)
    currentMultiYearRevenue = document.getElementById('current-multi-year-revenue').value
    currentServicesHours = document.getElementById('current-services-hours').value
    currentPaymentTerms = document.getElementById('current-payment-terms').value
    currentICR = (((variableComp / 4) / quarterlyQuota)).toFixed(3)
    displayedICR = (((variableComp / 4) / quarterlyQuota)*100).toFixed(2)
    percentageToQuota = ((+currentAttainment / quarterlyQuota)*100).toFixed(2)
    percentageToQuotaWithDeal = (((+currentAttainment + +currentACV) / quarterlyQuota)*100).toFixed(2)
    // Variables for deal recommendations
    proposedOneYearDealACV = currentACV
    proposedThreeYearDealACV = currentACV
}

function getBasePayout() {
    if (percentageToQuota <= 100) {
    basePayout = (+quarterlyQuota - +currentAttainment) * currentICR
    } else {
    basePayout = 0;
    }
};

function getAcceleratorPayoutOne () {
    if ((percentageToQuota <= 125) && (percentageToQuotaWithDeal >= 100)) {
    acceleratorPayoutOne = (+quarterlyQuota * .25) * (currentICR * acceleratorMultiplierOne)
    } else if (((percentageToQuota <= 125) && (percentageToQuota > 100)) && (percentageToQuotaWithDeal >= 100)) {
    acceleratorPayoutOne = ((+quarterlyQuota * 1.25) - +currentAttainment) * (currentICR * acceleratorMultiplierOne)
    } else {
    acceleratorPayoutOne = 0
    }
};

function getAcceleratorPayoutTwo () {
    if (((percentageToQuota <= 200) && (percentageToQuota >= 125)) && (percentageToQuotaWithDeal >= 125)) {
    acceleratorPayoutTwo = ((+quarterlyQuota * .75) - +currentAttainment) * (currentICR * acceleratorMultiplierOne)
    } else {
    acceleratorPayoutTwo = 0
    }
};

function getACVCommission (num) {
    getBasePayout();
    getAcceleratorPayoutOne();
    getAcceleratorPayoutTwo();
    if (percentageToQuotaWithDeal <= 100) {
        acvCommission = (currentICR * num)
    } else if (percentageToQuotaWithDeal <= 125) {
        acvCommission = ((+currentAttainment + num) - +quarterlyQuota) * (currentICR * acceleratorMultiplierOne) + basePayout
    } else if (percentageToQuotaWithDeal <= 200) {
        acvCommission = ((+currentAttainment + num) - (+quarterlyQuota * 1.25)) * (currentICR * acceleratorMultiplierTwo) + basePayout + acceleratorPayoutOne
    } else if (percentageToQuotaWithDeal > 200) {
        acvCommission = (num * (currentICR * acceleratorMultiplierThree))
    }
};

function getThreeYearACVCommission (num) {
    getBasePayout();
    getAcceleratorPayoutOne();
    getAcceleratorPayoutTwo();
    if (percentageToQuotaWithDeal <= 100) {
        threeYearCommission = (currentICR * num) + (multiYearCommission * 2)
    } else if (percentageToQuotaWithDeal <= 125) {
        threeYearCommission = ((+currentAttainment + num) - +quarterlyQuota) * (currentICR * acceleratorMultiplierOne) + basePayout + (multiYearCommission * 2)
    } else if (percentageToQuotaWithDeal <= 200) {
        threeYearCommission = ((+currentAttainment + num) - (+quarterlyQuota * 1.25)) * (currentICR * acceleratorMultiplierTwo) + basePayout + acceleratorPayoutOne + (multiYearCommission * 2)
    } else if (percentageToQuotaWithDeal > 200) {
        threeYearCommission = (num * (currentICR * acceleratorMultiplierThree)) +  (multiYearCommission * 2)
    }
};

function calculateCommission () {
    multiYearCommission = (multiYearICRPercentage * currentMultiYearRevenue)
    servicesCommission = (servicesICRPercentage * currentServicesHours)
    getACVCommission(currentACV)
    oneYearCommission = acvCommission
    threeYearCommission = oneYearCommission + (multiYearCommission * 2)
    console.log(oneYearCommission)
    console.log(threeYearCommission)
    totalCommission = acvCommission + multiYearCommission + servicesCommission
};

// "Recommendation" Algos

function getRecommendedDeals () {
    while (acvCommission < totalCommission) {
        proposedOneYearDealACV ++
        getACVCommission(proposedOneYearDealACV)
    }
    while (threeYearCommission > totalCommission) {
        proposedThreeYearDealACV --
        getThreeYearACVCommission(proposedThreeYearDealACV)
    }
};

function numberWithCommas(x) {
    return (x.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

function changeText () {
    currentDealCommission.innerHTML = `$${numberWithCommas(totalCommission)}`

    recommendedDealDiv.style = 'display: inherit;'
    recommendedOneYearDeal.innerHTML = `The one year deal that will retain this compensation has an ACV of $${numberWithCommas(proposedOneYearDealACV)}. <br><br>
    <b><i>Deal Structure:</i></b> <br>
    <b>ACV: </b> ${numberWithCommas(proposedOneYearDealACV)}<br>
    <b>Term Length: </b> 1 Year<br>
    <b>Services Hours: </b> ${currentServicesHours}<br>
    <b>Discount Percentage: </b>${numberWithCommas((currentACV - proposedOneYearDealACV)/currentACV)*100}%<br><br>
    You'll get paid $${numberWithCommas(totalCommission)} on the one-year ACV.`
    
    recommendedThreeYearDeal.innerHTML = `The three year deal that will retain this compensation has an ACV of $${numberWithCommas(proposedThreeYearDealACV)}. <br><br>
    <b><i>Deal Structure:</i></b> <br>
    <b>ACV:</b> ${numberWithCommas(proposedThreeYearDealACV)}<br>
    <b>Term Length:</b> 3 Year<br>
    <b>Services Hours:</b> ${currentServicesHours}<br>
    <b>Discount Percentage: </b>${numberWithCommas((currentACV - proposedThreeYearDealACV)/currentACV)*100}%<br><br>

    You'll get $${numberWithCommas(totalCommission - (multiYearCommission * 2))} on the ACV <br>
    and ${numberWithCommas(multiYearCommission * 2)} on the multi-year revenue.`

    expectedPayout.style = 'display: inline-block'
    percentageToQuotaHeader.style = 'display: inline-block'
    expectedPayoutHeader.style = 'display: inline-block'
    percentageToQuotaOutput.innerHTML = percentageToQuotaWithDeal + `%`
    percentageToQuotaHeader.scrollIntoView()
};

button.addEventListener('click', getValues);
button.addEventListener('click', calculateCommission);
button.addEventListener('click', getRecommendedDeals);
button.addEventListener('click', changeText);

