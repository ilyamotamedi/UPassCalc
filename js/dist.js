const uPass = 282.5,
      metropass = 116.75;

var input = {
    daysPerWeek : '',
    faresPerDay : '',
    goTransit : '',
    prestoCard : '',
    ageRange : '',
    weeksPerSemester : ''
};

var  currentCost = {
    singleFare: '',
    metropass: ''
};

var calculate = () => {
    input.daysPerWeek = Number($('#daysPerWeek').val());
    input.faresPerDay = Number($('#faresPerDay').val());
    input.goTransit = Number($('#goTransit').val());
    input.prestoCard = Number($('#prestoCard').val());
    input.ageRange = Number($('#ageRange').val());
    input.weeksPerSemester = Number($('#weeksPerSemester').val());

    currentCost.singleFare = Math.round((input.daysPerWeek * input.faresPerDay * ((input.ageRange == 0 ? (input.prestoCard == 1 ? 2.05 : 2.1) : (input.prestoCard == 1 ? 3 : 3.25)) - input.goTransit)) * input.weeksPerSemester, 2);
    currentCost.metropass = input.weeksPerSemester > 12 ? metropass * 4 : (input.weeksPerSemester > 8 ? metropass * 3 : (input.weeksPerSemester > 4 ? metropass * 2 : metropass));

    $('#currentSingleFare').html(currentCost.singleFare);
    $('#resultSingleFare').html((currentCost.singleFare > uPass ? 'U-Pass would save you $' : 'U-Pass would lose you $') + Math.abs(currentCost.singleFare - uPass));
    
    $('#currentMetropass').html(currentCost.metropass);
    $('#resultMetropass').html((currentCost.metropass > uPass ? 'U-Pass would save you $' : 'U-Pass would lose you $') + Math.abs(currentCost.metropass - uPass));

    if (currentCost.singleFare > uPass) {
        $('#resultSingleFare').removeClass('text-danger').addClass('text-success');
    }else {
        $('#resultSingleFare').removeClass('text-success').addClass('text-danger');        
    }

    if (currentCost.metropass > uPass) {
        $('#resultMetropass').removeClass('text-danger').addClass('text-success');
    }else {
        $('#resultMetropass').removeClass('text-success').addClass('text-danger');        
    }
};

$(document).ready(() => {
    setInterval(() => { calculate(); }, 500); 
});
