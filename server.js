var express = require('express');
var app = express();
var router = express.Router();
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var collections = ["contacts", "messages"];
var uri = 'mongodb://kaustin:203980kj@ds155292.mlab.com:55292/heroku_1qqgzp9h'

var PORT = process.env.PORT || 3000;

var sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

app.use(express.static(__dirname + '/app/public'));
app.use('/', require('./app/routing/html-routes.js'));

app.use('/api', require('./app/routing/api-routes.js'));

app.use('/submit', function(req, res) {
    console.log(req.body);
    MongoClient.connect(uri, function(err, client) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', uri);
        }

        var db = client.db('heroku_1qqgzp9h');

        db.collection("contacts").insertOne(req.body, function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    });

    var msg = {
        to: req.body.email,
        from: "support@limitlessdiscoveries.com",
        subject: 'Engage Program',
        text: "Engage",
        html: "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Strict//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd'><html data-editor-version='2' class='sg-campaigns' xmlns='http://www.w3.org/1999/xhtml'> <head> <link href='https://fonts.googleapis.com/css?family=Dancing+Script|Lato' rel='stylesheet'> <meta http-equiv='Content-Type' content='text/html; charset=utf-8' /> <meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1' /><!--[if !mso]><!--> <meta http-equiv='X-UA-Compatible' content='IE=Edge' /><!--<![endif]--> <!--[if (gte mso 9)|(IE)]> <xml> <o:OfficeDocumentSettings> <o:AllowPNG/> <o:PixelsPerInch>96</o:PixelsPerInch> </o:OfficeDocumentSettings> </xml> <![endif]--> <!--[if (gte mso 9)|(IE)]> <style type='text/css'> body {width: 600px;margin: 0 auto;} table {border-collapse: collapse;} table, td {mso-table-lspace: 0pt;mso-table-rspace: 0pt;} img {-ms-interpolation-mode: bicubic;} </style> <![endif]--> <style type='text/css'> body, p, div { font-family: Lato; font-size: 14px; } body { color: #9B9B9B; } body a { color: #0070CD; text-decoration: none; } p { margin: 0; padding: 0; } table.wrapper { width:100% !important; table-layout: fixed; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: 100%; -moz-text-size-adjust: 100%; -ms-text-size-adjust: 100%; } img.max-width { max-width: 100% !important; } .column.of-2 { width: 50%; } .column.of-3 { width: 33.333%; } .column.of-4 { width: 25%; } @media screen and (max-width:480px) { .preheader .rightColumnContent, .footer .rightColumnContent { text-align: left !important; } .preheader .rightColumnContent div, .preheader .rightColumnContent span, .footer .rightColumnContent div, .footer .rightColumnContent span { text-align: left !important; } .preheader .rightColumnContent, .preheader .leftColumnContent { font-size: 80% !important; padding: 5px 0; } table.wrapper-mobile { width: 100% !important; table-layout: fixed; } img.max-width { height: auto !important; max-width: 480px !important; } a.bulletproof-button { display: block !important; width: auto !important; font-size: 80%; padding-left: 0 !important; padding-right: 0 !important; } .columns { width: 100% !important; } .column { display: block !important; width: 100% !important; padding-left: 0 !important; padding-right: 0 !important; margin-left: 0 !important; margin-right: 0 !important; } } </style> <body> <center class='wrapper' data-link-color='#0070CD' data-body-style='font-size: 14px; font-family: arial; color: #9B9B9B; background-color: #FFFFFF;'> <div class='webkit'> <table cellpadding='0' cellspacing='0' border='0' width='100%' class='wrapper' bgcolor='#FFFFFF'> <tr> <td valign='top' bgcolor='#FFFFFF' width='100%'> <table width='100%' role='content-container' class='outer' align='center' cellpadding='0' cellspacing='0' border='0'> <tr> <td width='100%'> <table width='100%' cellpadding='0' cellspacing='0' border='0'> <tr> <td> <!--[if mso]> <center> <table><tr><td width='600'> <![endif]--> <table width='100%' cellpadding='0' cellspacing='0' border='0' style='width: 100%; max-width:600px;' align='center'> <tr> <td role='modules-container' style='padding: 0px 0px 0px 0px; color: #9B9B9B; text-align: left;' bgcolor='#FFFFFF' width='100%' align='left'> <table class='module preheader preheader-hide' role='module' data-type='preheader' border='0' cellpadding='0' cellspacing='0' width='100%' style='display: none !important; mso-hide: all; visibility: hidden; opacity: 0; color: transparent; height: 0; width: 0;'> <tr> <td role='module-content'> <p>Engage in Their World: Join our Growing Community of Mindful Educators</p> </td> </tr> </table> <table class='module' role='module' data-type='text' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td style='padding:0px 0px 0px 0px;background-color:#ffffff;' height='100%' valign='top' bgcolor='#ffffff'> <div style='text-align: right;'><span style='font-family:verdana,geneva,sans-serif;'><span style='font-size:10px;'><span style='color:#595459;'>Email not displaying correctly?</span> <a href='[weblink]'><span style='color:#0070CD;'>View it</span></a> <span style='color:#595459;'>in your browser.</span></span> </span> </div> </td> </tr> </table> <div>&nbsp;</div> <div>&nbsp;</div> <table class='module' role='module' data-type='code' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td height='100%' valign='top'> <div style='text-align: center; font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-size: 24px; line-height: 22px; font-family: 'Lato', sans-serif;'>LIMITLESS</div> <div style='text-align: center; font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-size: 30px; line-height: 22px; font-family: 'Dancing Script', sans-serif; color: #FA8072;'>Discoveries</div> </td> </tr> </table> <div>&nbsp;</div> <table class='module' role='module' data-type='text' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td style='padding:18px 0px 18px 0px;line-height:22px;text-align:inherit;' height='100%' valign='top' bgcolor=''> <div>Welcome&nbsp;<span style='font-weight: 600; background: rgb(251, 251, 252); font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 13px;'>!</span></div><div>&nbsp;</div><div><span style='font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px;'>I first of all would like to thank you for letting me share my work with you. I am so glad you have requested more details on my fantastic program! I have worked incredibly hard to provide you with the content necessary and the community you seek in order to get your life organized and your child filled with creative adventures. Continue reading to discover more.</span></div> </td> </tr> </table> <table class='wrapper' role='module' data-type='image' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td style='font-size:6px;line-height:10px;background-color:#FFFFFF;padding:0px 0px 0px 0px;' valign='top' align='left'> <img class='max-width' width='600' src='https://marketing-image-production.s3.amazonaws.com/uploads/4a05608abc4499f31e07a282ac7cf521dbdbb224c57ba67250cbcbdf1502f8dc5ecd65104b1b7315631a0ce3868e7cd201fc4dbbe184720f59f1dfdb569798c5.jpg' alt='' border='0' style='display:block;color:#000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:100% !important;width:100%;height:auto !important;'> </td> </tr> </table> <table class='module' role='module' data-type='code' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td height='100%' valign='top'> <div>&nbsp;</div> <div>&nbsp;</div> <div style='text-align: center; font-family: 'Dancing Script'; color:#FF6666; font-size: 32px;'>Engage in Their World</div> <div>&nbsp;</div> <div style='font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px;'>Do you want your child to be a curious, creative, and confident learner? So often school systems knock&nbsp;these three defining characteristics out of our children. It's time to revive them. Join me on this adventure.</div> <div>&nbsp;</div> <div style='font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 18px; line-height: 22px;'>No time to read? No problem.</div> <div>&nbsp;</div> <a style='background-color:#FA8072;height:px;width:250px;font-size:16px;line-height:px;font-family:Helvetica, Arial, sans-serif;color:#ffffff;padding:12px 12px 12px 12px;text-decoration:none;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;border:1px solid #FA8072;;display:inline-block; margin: 0 auto; text-align: center;' href='' target='_blank'>JOIN NOW</a> <div>&nbsp;</div> </td> </tr> </table> <table class='module' role='module' data-type='spacer' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td style='padding:0px 0px 2px 0px;' role='module-content' bgcolor='#FA8072'> </td> </tr> </table> <table class='module' role='module' data-type='code' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td height='100%' valign='top'> <div>&nbsp;</div> <div style='font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px;'>Whether you are supplementing your child's education, supporting them through their education journey, or full on home educating, I am here for you every step of the way.</div> <div>&nbsp;</div> <div style='font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px;'>Engage was created when I realized that I did not have a community of people that supported on a daily basis. I needed someone to hold my hand in the beginning and give me the guidance to the materials, curriculum, approaches, and coaching that I needed. Through extensive research and experience over the years, I decided to create this program to help individuals just like me who need guidance, advice, and resources.</div> <div>&nbsp;</div> <div style='font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px;'>Engage supports many different approaches including Waldorf, Living Education, Unschooling, Traditional, and much more. And not only will you find content on education, I will also guide you to a more organized life (both mentally and physically), get your children engaged in play, and create a lifetime parent and child bond. The program includes live coaching sessions from me (for free!), all of my courses at no additional cost, organized researched content in video format and article format, first access to all content (You guys are my priority!), and access to a rich group community where I will always be present to chat and ENGAGE.</div> <div>&nbsp;</div> <div><span style='font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px;'>Revive creativity, confidence, and curiosity within you and your child.</span></div> <div>&nbsp;</div> <div>&nbsp;</div> </td> </tr> </table> <table class='module' role='module' data-type='spacer' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td style='padding:0px 0px 2px 0px;' role='module-content' bgcolor='#FA8072'> </td> </tr> </table> <table class='module' role='module' data-type='code' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td height='100%' valign='top'> <div>&nbsp;</div> <div>&nbsp;</div> <div style='font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 20px; line-height: 22px;'>So here is what is included:</div> <div>&nbsp;</div> </td> </tr> </table> <table border='0' cellpadding='0' cellspacing='0' align='center' width='100%' role='module' data-type='columns' data-version='2' style='padding:0px 0px 0px 0px;' bgcolor=''> <tr role='module-content'> <td height='100%' valign='top'> <!--[if (gte mso 9)|(IE)]> <center> <table cellpadding='0' cellspacing='0' border='0' width='100%' style='border-spacing:0;border-collapse:collapse;table-layout: fixed;' > <tr> <![endif]--> <!--[if (gte mso 9)|(IE)]> <td width='200.000px' valign='top' style='padding: 0px 0px 0px 0px;border-collapse: collapse;' > <![endif]--> <table width='200.000' style='width:200.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;' cellpadding='0' cellspacing='0' align='left' border='0' bgcolor='' class='column column-0 of-3 empty' > <tr> <td style='padding:0px;margin:0px;border-spacing:0;'> <table class='module' role='module' data-type='code' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td height='100%' valign='top'> <div style='text-align: center; color: #FA8072;'>Course Content</div><div>&nbsp;</div><div style='text-align: center; font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px;'>Engage Members receive organized content in many different formats as well as weekly new videos sent that can be watched at your own pace.</div> </td> </tr> </table> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> <![endif]--> <!--[if (gte mso 9)|(IE)]> <td width='200.000px' valign='top' style='padding: 0px 0px 0px 0px;border-collapse: collapse;' > <![endif]--> <table width='200.000' style='width:200.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;' cellpadding='0' cellspacing='0' align='left' border='0' bgcolor='' class='column column-1 of-3 empty' > <tr> <td style='padding:0px;margin:0px;border-spacing:0;'> <table class='module' role='module' data-type='code' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td height='100%' valign='top'> <div style='text-align: center; color: #FA8072;'>Bonus Material</div><div>&nbsp;</div><div style='text-align: center; font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px;'>There are so many extras monthly that are only available to Engage members, including live professional guest interviews, and behind-the-scenes content.</div> </td> </tr> </table> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> <![endif]--> <!--[if (gte mso 9)|(IE)]> <td width='200.000px' valign='top' style='padding: 0px 0px 0px 0px;border-collapse: collapse;' > <![endif]--> <table width='200.000' style='width:200.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;' cellpadding='0' cellspacing='0' align='left' border='0' bgcolor='' class='column column-2 of-3 empty' > <tr> <td style='padding:0px;margin:0px;border-spacing:0;'> <table class='module' role='module' data-type='code' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td height='100%' valign='top'> <div style='text-align: center; color: #FA8072;'>Live Sessions</div><div>&nbsp;</div><div style='text-align: center; font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px;'>Engage Members receive a free personalized coaching session monthly as well as live coaching sessions dedicated to community topics/discussions.</div> </td> </tr> </table> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> <![endif]--> <!--[if (gte mso 9)|(IE)]> <tr> </table> </center> <![endif]--> </td> </tr> </table> <table border='0' cellpadding='0' cellspacing='0' align='center' width='100%' role='module' data-type='columns' data-version='2' style='padding:0px 0px 0px 0px;' bgcolor=''> <tr role='module-content'> <td height='100%' valign='top'> <!--[if (gte mso 9)|(IE)]> <center> <table cellpadding='0' cellspacing='0' border='0' width='100%' style='border-spacing:0;border-collapse:collapse;table-layout: fixed;' > <tr> <![endif]--> <!--[if (gte mso 9)|(IE)]> <td width='200.000px' valign='top' style='padding: 0px 0px 0px 0px;border-collapse: collapse;' > <![endif]--> <div>&nbsp;</div> <div>&nbsp;</div> <table width='200.000' style='width:200.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;' cellpadding='0' cellspacing='0' align='left' border='0' bgcolor='' class='column column-0 of-3 empty' > <tr> <td style='padding:0px;margin:0px;border-spacing:0;'> <table class='module' role='module' data-type='code' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td height='100%' valign='top'> <div style='text-align: center; color: #FA8072;'>First Access</div><div>&nbsp;</div><div style='text-align: center; font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px;'>Engage is where I pour my heart and soul so you will have first access to all my content no matter what platform.</div> </td> </tr> </table> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> <![endif]--> <!--[if (gte mso 9)|(IE)]> <td width='200.000px' valign='top' style='padding: 0px 0px 0px 0px;border-collapse: collapse;' > <![endif]--> <table width='200.000' style='width:200.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;' cellpadding='0' cellspacing='0' align='left' border='0' bgcolor='' class='column column-1 of-3 empty' > <tr> <td style='padding:0px;margin:0px;border-spacing:0;'> <table class='module' role='module' data-type='code' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td height='100%' valign='top'> <div style='text-align: center; color: #FA8072;'>Dedicated Support</div><div>&nbsp;</div><div style='text-align: center; font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px;'>Within Engage's rich community and our weekly live sessions, I will be there for you every step of the way.</div> </td> </tr> </table> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> <![endif]--> <!--[if (gte mso 9)|(IE)]> <td width='200.000px' valign='top' style='padding: 0px 0px 0px 0px;border-collapse: collapse;' > <![endif]--> <table width='200.000' style='width:200.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;' cellpadding='0' cellspacing='0' align='left' border='0' bgcolor='' class='column column-2 of-3 empty' > <tr> <td style='padding:0px;margin:0px;border-spacing:0;'> <table class='module' role='module' data-type='code' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td height='100%' valign='top'> <div style='text-align: center; color: #FA8072;'>Community</div><div>&nbsp;</div><div style='text-align: center; font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px;'>In an engaging community, you will receive support not only from me but also from fellow mindful educators such as yourself.</div> </td> </tr> </table> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> <![endif]--> <!--[if (gte mso 9)|(IE)]> <tr> </table> </center> <![endif]--> </td> </tr> </table> <table class='module' role='module' data-type='code' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td height='100%' valign='top'> <div>&nbsp;</div><div>&nbsp;</div><div style='font-weight: 600; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px;'>The pricing is at an incredibly low price considering the amount of content you will receive. Just one live coaching session will already be worth it.</div><div>&nbsp;</div><div style='font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px;'>Month to month pricing (cancel at any time):</div><div style='font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px; color: #FA8072;'>$8.99 per month</div><div>&nbsp;</div><div style='font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px;'>Yearly Subscription (one time payment):</div><div style='font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 14px; line-height: 22px; color: #FA8072'>$89.99 annually (~$7.50 per month)</div><div>&nbsp;</div><div>&nbsp;</div><div style='font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 30px; line-height: 22px; font-family: 'Dancing Script''>School isn't supposed to be a polite form of incarceration, but a portal to the wider world.</div><div style='font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 12px; line-height: 22px;'>- Richard Louve in Last Child in the Woods</div> <div>&nbsp;</div> <div>&nbsp;</div> </td> </tr> </table><table border='0' cellPadding='0' cellSpacing='0' class='module' data-role='module-button' data-type='button' role='module' style='table-layout:fixed' width='100%'><tbody><tr><td align='left' bgcolor='#ffffff' class='outer-td' style='padding:0px 0px 51px 0px;background-color:#ffffff'><table border='0' cellPadding='0' cellSpacing='0' class='button-css__deep-table___2OZyb wrapper-mobile' style='text-align:center'><tbody><tr><td align='center' bgcolor='#FA8072' class='inner-td' style='-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;font-size:16px;text-align:left;background-color:inherit'><a style='background-color:#FA8072;height:px;width:250px;font-size:16px;line-height:px;font-family:Helvetica, Arial, sans-serif;color:#ffffff;padding:12px 12px 12px 12px;text-decoration:none;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;border:1px solid #FA8072;display:inline-block;text-align:center' href='' target='_blank'>JOIN NOW</a></td></tr></tbody></table></td></tr></tbody></table> <table class='module' role='module' data-type='spacer' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td style='padding:0px 0px 2px 0px;' role='module-content' bgcolor='#FA8072'> </td> </tr> </table> <table border='0' cellpadding='0' cellspacing='0' align='center' width='100%' role='module' data-type='columns' data-version='2' style='padding:34px 0px 45px 0px;box-sizing:border-box;' bgcolor=''> <tr role='module-content'> <td height='100%' valign='top'> <!--[if (gte mso 9)|(IE)]> <center> <table cellpadding='0' cellspacing='0' border='0' width='100%' style='border-spacing:0;border-collapse:collapse;table-layout: fixed;' > <tr> <![endif]--> <!--[if (gte mso 9)|(IE)]> <td width='300.000px' valign='top' style='padding: 0px 0px 0px 0px;border-collapse: collapse;' > <![endif]--> <table width='300.000' style='width:300.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;' cellpadding='0' cellspacing='0' align='left' border='0' bgcolor='' class='column column-0 of-2 empty' > <tr> <td style='padding:0px;margin:0px;border-spacing:0;'> <table class='wrapper' role='module' data-type='image' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td style='font-size:6px;line-height:10px;background-color:#FFFFFF;padding:0px 0px 0px 0px;' valign='top' align='center'> <img class='max-width' width='300' src='https://marketing-image-production.s3.amazonaws.com/uploads/a500d918c300c95cb4be1f20d8d3840318491e5f5d0cadc2a0bdda294307018eeb58021da947177c6dd0e631c26c720a84e8f3f98fadbe9f99d0a4ac10e76b95.jpg' alt='' border='0' style='display:block;color:#000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:100% !important;width:100%;height:auto !important;'> </td> </tr> </table> <table class='module' role='module' data-type='text' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td style='padding:23px 0px 23px 0px;background-color:#ffffff;' height='100%' valign='top' bgcolor='#ffffff'> <div style='text-align: center;'><span style='color:#FF6666;'><span style='font-size:18px;'>Foster Natural Learning</span></span> </div> <div>&nbsp;</div> <div style='font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 22px; text-align: center;'>Preserve your child’s natural curiosity. They were born eager to learn.</div> </td> </tr> </table> <table border='0' cellPadding='0' cellSpacing='0' class='module' data-role='module-button' data-type='button' role='module' style='table-layout:fixed' width='100%'><tbody><tr><td align='center' bgcolor='#ffffff' class='outer-td' style='padding:0px 0px 51px 0px;background-color:#ffffff'><table border='0' cellPadding='0' cellSpacing='0' class='button-css__deep-table___2OZyb wrapper-mobile' style='text-align:center'><tbody><tr><td align='center' bgcolor='#FA8072' class='inner-td' style='-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;font-size:16px;text-align:center;background-color:inherit'><a style='background-color:#FA8072;height:px;width:250px;font-size:16px;line-height:px;font-family:Helvetica, Arial, sans-serif;color:#ffffff;padding:12px 12px 12px 12px;text-decoration:none;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;border:1px solid #FA8072;display:inline-block' href='' target='_blank'>LEARN</a></td></tr></tbody></table></td></tr></tbody></table> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> <![endif]--> <!--[if (gte mso 9)|(IE)]> <td width='300.000px' valign='top' style='padding: 0px 0px 0px 0px;border-collapse: collapse;' > <![endif]--> <table width='300.000' style='width:300.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;' cellpadding='0' cellspacing='0' align='left' border='0' bgcolor='' class='column column-1 of-2 empty' > <tr> <td style='padding:0px;margin:0px;border-spacing:0;'> <table class='wrapper' role='module' data-type='image' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td style='font-size:6px;line-height:10px;background-color:#FFFFFF;padding:0px 0px 0px 0px;' valign='top' align='center'> <img class='max-width' width='300' src='https://marketing-image-production.s3.amazonaws.com/uploads/7852e844c4f4feb3a2799900888b03a4ffb6a685b997af4d6fdd0323854bfbada13ecdf7e6a75a835cd26cabfeb4f2908e4189378694b4859ff04c45b87b2f7c.jpg' alt='' border='0' style='display:block;color:#000;text-decoration:none;font-family:Helvetica, arial, sans-serif;font-size:16px;max-width:100% !important;width:100%;height:auto !important;'> </td> </tr> </table> <table class='module' role='module' data-type='text' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td style='padding:23px 0px 23px 0px;background-color:#ffffff;' height='100%' valign='top' bgcolor='#ffffff'> <div style='text-align: center;'><span style='color:#FF6666;'><span style='font-size:18px;'>Motivate Limitless Play</span></span> </div> <div>&nbsp;</div> <div style='font-weight: 500; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-family: Colfax, Helvetica, Arial, sans-serif; font-size: 13px; line-height: 22px; text-align: center'>Fuel creativity, imagination, and energy through play.</div> </td> </tr> </table> <table border='0' cellPadding='0' cellSpacing='0' class='module' data-role='module-button' data-type='button' role='module' style='table-layout:fixed' width='100%'><tbody><tr><td align='center' bgcolor='#ffffff' class='outer-td' style='padding:0px 0px 51px 0px;background-color:#ffffff'><table border='0' cellPadding='0' cellSpacing='0' class='button-css__deep-table___2OZyb wrapper-mobile' style='text-align:center'><tbody><tr><td align='center' bgcolor='#FA8072' class='inner-td' style='-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;font-size:16px;text-align:center;background-color:inherit'><a style='background-color:#FA8072;height:px;width:250px;font-size:16px;line-height:px;font-family:Helvetica, Arial, sans-serif;color:#ffffff;padding:12px 12px 12px 12px;text-decoration:none;-webkit-border-radius:8px;-moz-border-radius:8px;border-radius:8px;border:1px solid #FA8072;display:inline-block' href='' target='_blank'>PLAY</a></td></tr></tbody></table></td></tr></tbody></table> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> <![endif]--> <!--[if (gte mso 9)|(IE)]> <tr> </table> </center> <![endif]--> </td> </tr> </table> <table class='module' role='module' data-type='spacer' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td style='padding:0px 0px 2px 0px;' role='module-content' bgcolor='#FA8072'> </td> </tr> </table> <table border='0' cellpadding='0' cellspacing='0' align='center' width='100%' role='module' data-type='columns' data-version='2' style='padding:10px 5px 90px 5px;background-color:#ffffff;box-sizing:border-box;' bgcolor='#ffffff'> <tr role='module-content'> <td height='100%' valign='top'> <!--[if (gte mso 9)|(IE)]> <center> <table cellpadding='0' cellspacing='0' border='0' width='100%' style='border-spacing:0;border-collapse:collapse;table-layout: fixed;' > <tr> <![endif]--> <!--[if (gte mso 9)|(IE)]> <td width='590.000px' valign='top' style='padding: 0px 0px 0px 0px;border-collapse: collapse;' > <![endif]--> <table width='590.000' style='width:590.000px;border-spacing:0;border-collapse:collapse;margin:0px 0px 0px 0px;' cellpadding='0' cellspacing='0' align='left' border='0' bgcolor='#ffffff' class='column column-0 of-1 empty' > <tr> <td style='padding:0px;margin:0px;border-spacing:0;'> <table class='module' role='module' data-type='text' border='0' cellpadding='0' cellspacing='0' width='100%' style='table-layout: fixed;'> <tr> <td style='padding:0px 0px 0px 0px;background-color:#ffffff;' height='100%' valign='top' bgcolor='#ffffff'> <div style='font-size:10px;line-height:150%;margin:0;text-align:center;'>Katharina Austin</div><div style='font-size:10px;line-height:150%;margin:0;text-align:center;'>Limitless Discoveries</div><div style='font-size:10px;line-height:150%;margin:0;text-align:center;'>limitlessdiscoveries.com</div><div style='font-size:10px;line-height:150%;margin:0;text-align:center;'>Savannah,&nbsp;GA 31322</div><div style='font-size:10px;line-height:150%;margin:0;text-align:center;'>&nbsp;</div><div style='font-size:10px;line-height:150%;margin:0;text-align:center;'><a href='[Unsubscribe]'><span style='color:#FF6666;'>Unsubscribe</span></a> | <a href='[Unsubscribe_Preferences]'><span style='color:#FF6666;'>Update Preferences</span></a></div> </td> </tr> </table> </td> </tr> </table> <!--[if (gte mso 9)|(IE)]> </td> <![endif]--> <!--[if (gte mso 9)|(IE)]> <tr> </table> </center> <![endif]--> </td> </tr> </table> </td> </tr> </table> <!--[if mso]> </td></tr></table> </center> <![endif]--> </td> </tr> </table> </td> </tr> </table> </td> </tr> </table> </div> </center> </body></html>"
        ,
    };
    sgMail.send(msg);
    console.log(msg);
    return res.json(req.body);
});

app.use('/send', function(req, res) {
    console.log(req.body);
    MongoClient.connect(uri, function(err, client) {
        if (err) {
            console.log('Unable to connect to the mongoDB server. Error:', err);
        } else {
            console.log('Connection established to', uri);
        }

        var db = client.db('heroku_1qqgzp9h');

        db.collection("messages").insertOne(req.body, function (err, result) {
            if (err) throw err;
            console.log(result);
        });
    });

    var msg = {
        to: 'kjuliaaustin@gmail.com',
        from: req.body.email,
        subject: 'Website Inquiry',
        text: req.body.message,
        html: '<p>' + req.body.message + '</p><br>' + '<p>' + req.body.firstName,
    };
    sgMail.send(msg);
    console.log(msg);
    return res.json(msg);
});

app.listen(PORT, function() {
    console.log("App listening on port " + PORT);
});