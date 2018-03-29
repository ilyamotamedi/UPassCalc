const uPass = 282.5,
      metropass = 116.75;
var input = {},
    currentCost = {};

var inRange = (val, min, max) => {
    return (min <= val && val <= max) ? true : false;
};

var calculate = () => {
    let metropasses = 0;

    input.daysPerWeek = Number($('#daysPerWeek').val());
    input.faresPerDay = input.daysPerWeek == 0 ? input.daysPerWeek : Number($('#faresPerDay').val());
    input.goTransit = Number($('#goTransit').val());
    input.prestoCard = Number($('#prestoCard').val());
    input.ageRange = Number($('#ageRange').val());
    input.weeksPerSemester = $('#weeksPerSemester').val();

    if (input.weeksPerSemester.some((element) => { return inRange(element, 1, 4) })) metropasses += 1;
    if (input.weeksPerSemester.some((element) => { return inRange(element, 5, 8) })) metropasses += 1;
    if (input.weeksPerSemester.some((element) => { return inRange(element, 9, 12) })) metropasses += 1;
    if (input.weeksPerSemester.some((element) => { return inRange(element, 13, 16) })) metropasses += 1;

    currentCost.singleFare = Math.round((input.daysPerWeek * input.faresPerDay * ((input.ageRange == 0 ? (input.prestoCard == 1 ? 2.05 : 2.1) : (input.prestoCard == 1 ? 3 : 3.25)) - input.goTransit)) * input.weeksPerSemester.length, 2);
    currentCost.metropass = metropasses * metropass;

    $('#currentSingleFare').html(currentCost.singleFare);
    if (currentCost.singleFare > uPass) {
        $('#resultSingleFare').html('U-Pass would save you $' + Math.abs(currentCost.singleFare - uPass) + ' per semester');
        $('#resultSingleFare').removeClass().addClass('font-weight-bold text-success');
    } else if (currentCost.singleFare == uPass) {
        $('#resultSingleFare').html('U-Pass woul`d not affect your transportation costs');
        $('#resultSingleFare').removeClass().addClass('font-weight-bold text-info');
    } else {
        $('#resultSingleFare').html('U-Pass would lose you $' + Math.abs(currentCost.singleFare - uPass) + ' per semester');
        $('#resultSingleFare').removeClass().addClass('font-weight-bold text-danger');
    }

    $('#currentMetropass').html(currentCost.metropass);
    if (currentCost.metropass > uPass) {
        $('#resultMetropass').html('U-Pass would save you $' + Math.abs(currentCost.metropass - uPass) + ' per semester');
        $('#resultMetropass').removeClass().addClass('font-weight-bold text-success');
    } else if (currentCost.singleFare == uPass) {
        $('#resultMetropass').html('U-Pass would not affect your transportation costs');
        $('#resultMetropass').removeClass().addClass('font-weight-bold text-info');
    } else {
        $('#resultMetropass').html('U-Pass would lose you $' + Math.abs(currentCost.metropass - uPass) + ' per semester');
        $('#resultMetropass').removeClass().addClass('font-weight-bold text-danger');
    }
};

$(document).ready(() => {
    setInterval(() => { calculate(); }, 500); 
});
