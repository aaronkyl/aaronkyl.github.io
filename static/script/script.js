$(document).ready(function() {
    setAfterImage();
    $('#fullstack-header').click(function() {
        $('#fullstack').slideToggle('fast')
    });
    
    $('#fullstack-header').hover(
        function() {
            if ($('#fullstack').css('display') == 'none') {
                $('#fullstack-header .down-arrows').show()
            } else {
                $('#fullstack-header .up-arrows').show()
            }
        }, function() {
            $('#fullstack-header .up-arrows, #fullstack-header .down-arrows').hide()
        }
    );
    
    $('#frontend-header').hover(
        function() {
            if ($('#frontend').css('display') == 'none') {
                $('#frontend-header .down-arrows').show()
            } else {
                $('#frontend-header .up-arrows').show()
            }
        }, function() {
            $('#frontend-header .up-arrows, #frontend-header .down-arrows').hide()
        }
    );
    
    $('#misc-header').hover(
        function() {
            if ($('#misc').css('display') == 'none') {
                $('#misc-header .down-arrows').show()
            } else {
                $('#misc-header .up-arrows').show()
            }
        }, function() {
            $('#misc-header .up-arrows, #misc-header .down-arrows').hide()
        }
    );
    
    $('#frontend-header').click(function() {
        $('#frontend').slideToggle('fast')
    });
    
    $('#misc-header').click(function() {
        $('#misc').slideToggle('fast')
    });
    
    $('#cs50 img, #cs50 h4').hover(
    function() {
        $('#cs50 h4').css('color', '#FFCF0B')
    }, function() {
        $('#cs50 h4').css('color', '#EAEAEA')
    });
    
    $('#blackjack img, #blackjack h4').hover(
    function() {
        $('#blackjack h4').css('color', '#FFCF0B')
    }, function() {
        $('#blackjack h4').css('color', '#EAEAEA')
    });
    
    $('#weather img, #weather h4').hover(
    function() {
        $('#weather h4').css('color', '#FFCF0B')
    }, function() {
        $('#weather h4').css('color', '#EAEAEA')
    });
    
    $('#edonor #imageSwap, #edonor h4').hover(
    function() {
        $('#edonor h4').css('color', '#FFCF0B')
    }, function() {
        $('#edonor h4').css('color', '#EAEAEA')
    });
    
    $('#fullstack-header .down-arrows').hide()
    
    $('#profile-pic, #back p').click(function() {
        $('#card').toggleClass('is-flipped')
    });
    
});

function setAfterImage() {
      $('#imageSwap').fadeIn(500).html('<img class="app-screenshot" src="static/img/edonor-after.png" alt="eDonor After"/>').delay(2000).fadeOut(500, function () { setBeforeImage(); });
}

function setBeforeImage() {
      $('#imageSwap').fadeIn(500).html('<img class="app-screenshot" src="static/img/edonor-before.png" alt="eDonor Before"/>').delay(2000).fadeOut(500, function () { setAfterImage(); });
}