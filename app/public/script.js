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

    var delay = 5000; // milliseconds
    var cookie_expire = 0; // days

    var cookie = localStorage.getItem("list-builder");
    if(cookie == undefined || cookie == null) {
        cookie = 0;
    }

    if(((new Date()).getTime() - cookie) / (1000 * 60 * 60 * 24) > cookie_expire) {
        $("#list-builder").delay(delay).fadeIn("fast", () => {
            $("#popup-box").fadeIn("fast", () => {});
        });

        $("button[name=subscribe]").click(() => {
            $.ajax({
                type: "POST",
                url: "/submit",
                data: {
                    email: $("#NewsletterEmailAddress").val(),
                    firstName: $("#NewsletterFirstName").val(),
                    type: "newsletter"
                }
            })
            .done(function(data) {
                console.log("Email added to database. Newsletter sent out.");
                $("#popup-box-content").html("<p style='text-align: center'>Thank you for subscribing to The Limitless Discoveries newsletter!</p>");
            });
        });

        $("#popup-close").click(() => {
            $("#list-builder, #popup-box").hide();
            localStorage.setItem("list-builder", (new Date()).getTime());
        });
    };

    var boxHeight = $(".category-box").height();
    $(".category-box").hover(function() {
        $(this).height(boxHeight);
    });

    $("#view-newsletter").on("click", function() {
        var title = $("#TitleFormControlInput1").val();
        var content = $("#NewsletterFormControlTextarea1").val();

        $("#newsletter-form-title").html(title);
        $("#newsletter-form-paragraph").html(content);

        $('#newsletter-form-title').each(function(){
            var text = $(this).text().split(' ');
            if(text.length < 2)
                return;
            text[1] = '<span class="orange-cursive" style="font-size: 40px;">'+text[1]+'</span>';
            $(this).html( text.join(' ') );
        });
    });

    $("#submit-waitList").on("click", function() {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/api/submit",
            data: {
                email: $("#InputEmail1").val(),
                firstName: $("#InputFirstName1").val(),
                type: "engage"
            }
        })
        .done(function(data) {
            console.log("Email added to database. Program description sent out.");
            $("#engage-form").css("display", "none");
            $("#submit-waitList").css("display", "none");
            $("#engage-form-submitted").html("An email has been sent with more information to the following email address: " + data.email);
        });
    });

    $("#new-newsletter").on("click", function() {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/api/save-newsletter",
            data: {
                title: $("#TitleFormControlInput1").val(),
                newsletterType: $("#NewsletterTypeFormControlSelect1").val(),
                sendDate: $("#SendDateFormControlInput1").val(),
                sendTime: $("#SendTimeFormControlInput1").val(),
                content:  "<div id='logo-small-news'><h1 id='logo-font-small-h1'>LIMITLESS</h1><h2 id='logo-font-small-h2'>Discoveries</h2></div><br><h2 id='newsletter-form-title' class='text-center lato'>TITLE</h2><svg height='20' width='500'><line x1='150' y1='0' x2='400' y2='0' style='stroke:#FA8072;stroke-width:4' /></svg>" + $("#NewsletterFormControlTextarea1").val() + "<br><p class='roboto' style='line-height: 0px;'>Love,</p><h1 class='orange-cursive' style='font-size: 50px; line-height: 5px;'>Kat</h1><p class='lato'>Inspire Limitless Discoveries</p><p id='newsletter-form-outro' class='roboto'></p>"
            }
        })
        .done(function(data) {
            console.log("Newsletter added to database.");
        });
    });

    $("#adminLoginButton").on("click", function() {
        $.ajax({
            type: "POST",
            url: "/api/signin",
            data: {
                username: $("#AdminUsernameFormControlInput1").val(),
                password: $("#AdminPasswordFormControlInput1").val(),
                type: "admin"
            }
        }).done(function(data) {
            console.log("You are signed in. Server available.");
            window.location.href = "/admin-home";
        }).fail(function()  {
            console.log("Sorry. Server unavailable.");
        }); 
    });

    $("#getUpcomingNewsletters").on("click", function() {
        $.getJSON("/api/return-newsletter", function(data) {
            for(var i = 0; i < data.length; i++) {
                $("#upcomingNewsletterButton").append("<div class='row'><div class='col-md-12'><h2>" + data[i].title + "</h2><p>" + data[i].sendDate + "</p><button type=button class='btn btn-primary'>View</button><button type=button class='btn btn-secondary'>Send</button></div></div>");
            }
        }); 
    });

    $("#message-submit").on("click", function() {
        $.ajax({
            type: "POST",
            dataType: "json",
            url: "/api/send",
            data: {
                email: $("#InputEmail2").val(),
                firstName: $("#InputFirstName2").val(),
                message: $("#FormControlTextarea2").val()
            }
        })
        .done(function(data) {
            console.log("Message added to database and sent.");
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

    $('#exampleModal').modal({ show: false});

    var s = skrollr.init({
        forceHeight: false
    });

    s.refresh($('.homeSlide'));
});