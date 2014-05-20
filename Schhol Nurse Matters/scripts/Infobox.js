
(function ($) {
    $(document).ready(function () {

        $('div[data-role="infobox-header"]').click(function () {

            var that = this;

            var tag = $(this).attr("data-tag");


            $("div[data-role='infobox-header']").children("div.icon").children("span").removeClass("icon-img-down");


            $("div[data-role='infobox-flyout']:not(div[data-tag='" + tag + "'])").slideUp('fast');


            $("div[data-tag='" + tag + "'][data-role='infobox-flyout']").slideToggle('fast', function () {

                if ($(this).css('display') === 'block') {
                    $(that).children("div.icon").children("span").addClass("icon-img-down");
                }

                console.log($(this).css('display'));
            });


        });
    });

})(jQuery);
