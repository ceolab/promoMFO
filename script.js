/**
 * Created with JetBrains PhpStorm.
 * User: evgenius
 * Date: 8/23/13
 * Time: 12:02 PM
 * To change this template use File | Settings | File Templates.
 */

var validators = {
    "notEmpty" : {
        "validator" : /^.+?$/,
        "textError" : "Это поле обязательно"
    },
    "phoneNumber" : {
        "validator" : /^\+{0,1}[0-9]+$/,
        "textError" : "Тоько цифры",
        "keyPress" : function(e)
        {
            if(!((e.which >= 48 && e.which <= 57) || e.which == 0 || e.which == 8 || e.which == 43))
                return false;
        }
    },
    "email" : {
        "validator" : /^.+@.+\..+/
    }
}

function init()
{
    $("#sendmail input").each(
        function()
        {
            var validator = validators[$(this).attr("validator")];
            if(validator && validator['keyPress'])
            {
                $(this).keypress(
                    function(e)
                    {
                        return validator.keyPress(e);
                    }
                )
            }
        }
    )
}

function submitForm()
{
    var status = true;
    $("#sendmail input,textarea").removeClass("errorField");
    $("#sendmail input,textarea").each(
        function()
        {
            var validator = validators[$(this).attr("validator")];

            if(validator && validator['validator'])
            {
                var val = $(this).val();
                if(!val)
                    val = $(this).text();


                if(!val.match(validator['validator']))
                {
                    $(this).addClass("errorField");
                    status = false;
                }

            }
        }
    );

    if(status)
    {
        $("#sendmail").submit();
    }
}

function getCookie(name) {
    var matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
    options = options || {};

    var expires = options.expires;

    if (typeof expires == "number" && expires) {
        var d = new Date();
        d.setTime(d.getTime() + expires*1000);
        expires = options.expires = d;
    }
    if (expires && expires.toUTCString) {
        options.expires = expires.toUTCString();
    }

    value = encodeURIComponent(value);

    var updatedCookie = name + "=" + value;

    for(var propName in options) {
        updatedCookie += "; " + propName;
        var propValue = options[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }

    document.cookie = updatedCookie;
}

function systemMessage(text, type)
{
    var selector = "#systemMessage";
    $(selector).text(text);

    if(!type || type == "success")
    {
        $(selector).toggleClass("successMessage", true);
        $(selector).toggleClass("errorMessage", false);
    }
    else
    {
        $(selector).toggleClass("successMessage", false);
        $(selector).toggleClass("errorMessage", true);
    }

    $(selector).slideDown(100);
    setTimeout("$('"+selector+"').slideUp(100);", 3000);
}

$("document").ready(
    function()
    {
        var smCookie = getCookie("sendmail");
        if(smCookie == "ok")
            systemMessage("Ваша заявка отправлена");
        else if(smCookie == "fail")
            systemMessage("Произошла ошибка при отправке", "error");

        setCookie("sendmail");
        init();
    }
)




