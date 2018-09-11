$(window).scroll(function () {
        $('.image-moving-element').each(function () {
            var imagePos = $(this).offset().top;
            var imageHeight = $(this).height();
            var topOfWindow = $(window).scrollTop();

            if (imagePos < topOfWindow + imageHeight && imagePos + imageHeight > topOfWindow) {
                $(this).addClass("img-move");
            }
        });
    });

$( document ).ready(function() {


    $("#submit-waitList").on("click", function() {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/submit",
            data: {
                email: $("#InputEmail1").val(),
                firstName: $("#InputFirstName1").val(),
                type: "engage"
            }
        })
        .done(function(data) {
            console.log("Email added to database");
            $("#engage-form").css("display", "none");
            $("#submit-waitList").css("display", "none");
            $("#engage-form-submitted").html("An email has been sent with more information to the following email address: " + data.email);
        });
    });

    $("#message-submit").on("click", function() {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/send",
            data: {
                email: $("#InputEmail2").val(),
                firstName: $("#InputFirstName2").val(),
                message: $("#FormControlTextarea2").val()
            }
        })
        .done(function(data) {
            console.log("Message added to database");
            $("#message-form").css("display", "none");
            $("#message-submit").css("display", "none");
            $("#message-submitted").html("Your email has been sent. Please allow up to 24 hours for a response. Thank you.");
        });
    });


    $(".navbar-toggler-icon").on("click", function() {
        document.getElementById("mySidenav").style.width = "250px";
    });

    $(".closebtn").on("click", function() {
        document.getElementById("mySidenav").style.width = "0";
    });

    $(".book-api").on("click", function() {
        $(".loader").css("display", "block");
        $(".book-api").removeClass("active");
        $(this).addClass("active");
        console.log(this.id);
        $.getJSON("/api/scrape/" + this.id, function(data) {
            $("#category-box" + i).empty();
            var i;
            console.log(data);
            for (i = 0; i < 24; i++) {
                $("#category-box" + i).attr("href", data[i].link);
                $("#category-overlay" + i).html(data[i].author);
                $("#category-name" + i).html(data[i].title);
                $("#category-image" + i).attr("src", data[i].image);
                $("#category-box" + i).css("display", "block");
            }
            $(".loader").css("display", "none");
        });
    });

    $('.scroll-down').click (function() {
      $('html, body').animate({scrollTop: $('section.ok').offset().top }, 'slow');
      return false;
    });

    $('.scroll-down-transparent-1').click (function() {
      $('html, body').animate({scrollTop: $('section.ok-1').offset().top }, 'slow');
      return false;
    });

    $('.scroll-down-transparent-2').click (function() {
      $('html, body').animate({scrollTop: $('section.ok-2').offset().top }, 'slow');
      return false;
    });

    $('.scroll-down-transparent-3').click (function() {
      $('html, body').animate({scrollTop: $('section.ok-3').offset().top }, 'slow');
      return false;
    });

    $('.scroll-down-white').click (function() {
      $('html, body').animate({scrollTop: $('section.ok').offset().top }, 'slow');
      return false;
    });

    $('.scroll-down-plan').click (function() {
      $('html, body').animate({scrollTop: $('section.ok-plan').offset().top }, 'slow');
      return false;
    });

    $('.scroll-down-schedule').click (function() {
      $('html, body').animate({scrollTop: $('section.ok-schedule').offset().top }, 'slow');
      return false;
    });

    $('.scroll-down-resources').click (function() {
      $('html, body').animate({scrollTop: $('section.ok-resources').offset().top }, 'slow');
      return false;
    });

    $(".category-box").click(function() {
        window.location = $(this).attr(`href`);
        return false;
    });

    $(document).on('mouseenter', '.category-box-play', function () {
        $(this).find(".icon-activity").show();
    }).on('mouseleave', '.category-box-play', function () {
        $(this).find(".icon-activity").hide();
    });

    $('.age2-button').click(function () {
        $('.modal-body').find(".age2").show();
        $('.modal-body').find(".age5").hide();
        $('.modal-body').find(".age9").hide();
        $('.modal-body').find(".age13").hide();
        $(this).css('color', '#FA8072');
        $('.age5-button').css('color', 'black');
        $('.age9-button').css('color', 'black');
        $('.age13-button').css('color', 'black');
    });

    $('.age5-button').click(function () {
        $('.modal-body').find(".age5").show();
        $('.modal-body').find(".age2").hide();
        $('.modal-body').find(".age9").hide();
        $('.modal-body').find(".age13").hide();
        $(this).css('color', '#FA8072');
        $('.age2-button').css('color', 'black');
        $('.age9-button').css('color', 'black');
        $('.age13-button').css('color', 'black');
    });

    $('.age9-button').click(function () {
        $('.modal-body').find(".age9").show();
        $('.modal-body').find(".age2").hide();
        $('.modal-body').find(".age5").hide();
        $('.modal-body').find(".age13").hide();
        $(this).css('color', '#FA8072');
        $('.age5-button').css('color', 'black');
        $('.age2-button').css('color', 'black');
        $('.age13-button').css('color', 'black');
    });

    $('.age13-button').click(function () {
        $('.modal-body').find(".age13").show();
        $('.modal-body').find(".age2").hide();
        $('.modal-body').find(".age5").hide();
        $('.modal-body').find(".age9").hide();
        $(this).css('color', '#FA8072');
        $('.age5-button').css('color', 'black');
        $('.age9-button').css('color', 'black');
        $('.age2-button').css('color', 'black');
    });

    $('#exampleModal').modal({ show: false});

    var s = skrollr.init({
        forceHeight: false
    });

    s.refresh($('.homeSlide'));
});