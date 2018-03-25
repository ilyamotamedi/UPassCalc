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

var currentCost = {
    singleFare: '',
    metropass: ''
};

var calculate = () => {
    $.validate({lang: 'en'});
    input.daysPerWeek = Number($('#daysPerWeek').val());
    input.faresPerDay = Number($('#faresPerDay').val());
    input.goTransit = Number($('#goTransit').val());
    input.prestoCard = Number($('#prestoCard').val());
    input.ageRange = Number($('#ageRange').val());
    input.weeksPerSemester = Number($('#weeksPerSemester').val());
    
    // console.log(input);
    // console.log(((input.ageRange == 0 ? (input.prestoCard == 1 ? 2.05 : 2.1) : (input.prestoCard == 1 ? 3 : 3.25)) - input.goTransit));
    
    currentCost.singleFare = Math.round((input.daysPerWeek * input.faresPerDay * ((input.ageRange == 0 ? (input.prestoCard == 1 ? 2.05 : 2.1) : (input.prestoCard == 1 ? 3 : 3.25)) - input.goTransit)) * input.weeksPerSemester, 2);
    currentCost.metropass = input.weeksPerSemester > 12 ? metropass * 4 : (input.weeksPerSemester > 8 ? metropass * 3 : (input.weeksPerSemester > 4 ? metropass * 2 : metropass));
    // console.log(currentCost.singleFare, currentCost.metropass);

    $('#currentSingleFare').html(currentCost.singleFare);
    $('#resultSingleFare').html(currentCost.singleFare > uPass ? 'save' : 'lose');
    
    $('#currentMetropass').html(currentCost.metropass);
    $('#resultMetropass').html(currentCost.metropass > uPass ? 'save' : 'lose');

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