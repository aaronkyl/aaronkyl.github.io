$(document).ready(function() {
    setAfterImage();
    $('#fullstack-header').click(function() {
        $('#fullstack').slideToggle('fast')
    });
    $('#frontend-header').click(function() {
        $('#frontend').slideToggle('fast')
    });
    $('#misc-header').click(function() {
        $('#misc').slideToggle('fast')
    });
});

function setAfterImage() {
      $('#imageSwap').fadeIn(500).html('<img class="app-screenshot" src="img/edonor-after.png" alt="eDonor After"/>').delay(2000).fadeOut(500, function () { setBeforeImage(); });
}

function setBeforeImage() {
      $('#imageSwap').fadeIn(500).html('<img class="app-screenshot" src="img/edonor-before.png" alt="eDonor Before"/>').delay(2000).fadeOut(500, function () { setAfterImage(); });
}