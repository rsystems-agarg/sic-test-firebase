$(document).ready(function(){
    /* Add close button to dropdowns */
    $(".dropDownBody").append("<a href='javascript:void(0);' class='dropDownClose'>Close</a>");
    $(".dropDownClose").click(function() {
        $(this).parent().prev(".dropDownHead").children(".dropDownHotspot").click();
    });
         
    /* Add close button to togglers */
    $("[data-mc-target-name]").each(function() {
        /* for each toggler target, find the target name (togglerTarget) */
        var togglerTarget = $(this).attr("data-mc-target-name");
        /* for each toggler target, add a close link (a.togglerClose) */
        var closeTarget = $("<a href='javascript:void(0);' class='togglerClose'>Close</a>");
        $(this).append(closeTarget);
        /* Create a selector for the toggler link (closeToggler), which is linked to this target. Look for open togglers, which include the togglerTarget name */
        var closeToggler = 'a.toggler[data-mc-state="open"][data-mc-targets*="' + togglerTarget + '"]';
        /* When the closeTarget link is clicked, clik the toggler link (closeToggler) */
        $(closeTarget).click(function(){
            $(closeToggler).click();
        });
    });
});