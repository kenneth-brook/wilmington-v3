; (function ($) {
    "use strict";

    $('.town-menu .menu-button').click(function () {
        $('.town-menu .popup').fadeIn();
    });
    $('.town-menu .popup-close').click(function () {
        $('.town-menu .popup').fadeOut(200);
    });
    $(document).click(function (e) {
        var $target = $(e.target);
        if (!$target.closest('.town-menu .menu-button').length && !$target.closest('.town-menu .popup').length) {
            $('.town-menu .popup').fadeOut(200);
        }
    });

    $('.town-menu .menu a').click(function (e) {
        e.preventDefault();
        var town = $(this).text();
        $('.home-menu a, .header-menu a').each(function (idx, itm) {
            if (undefined !== $(itm).data('url')) {
                var base_url = location.href.substring(0, location.href.lastIndexOf('/'));
                var url = new URL(base_url + '/' + $(itm).data('url'));
                var search_params = url.searchParams;
                search_params.set('town', town);
                url.search = search_params.toString();
                $(itm).attr({ 'href': url.toString() });
            }
        });
        $('.town-menu .popup').fadeOut(200);
    });

    $('.header-top .navigation-button').click(function () {
        $('.header-top .popup').fadeIn();
    });
    $('.header-top .popup-close').click(function () {
        $('.header-top .popup').fadeOut(200);
    });
    $(document).click(function (e) {
        var $target = $(e.target);
        if (!$target.closest('.header-top .navigation-button').length && !$target.closest('.header-top .popup').length) {
            $('.header-top .popup').fadeOut(200);
        }
    });

    $('.header-bottom .sort-button').click(function () {
        $('.header-bottom .popup').fadeIn();
    });
    $('.header-bottom .popup-close').click(function () {
        $('.header-bottom .popup').fadeOut(200);
    });
    $(document).click(function (e) {
        var $target = $(e.target);
        if (!$target.closest('.header-bottom .sort-button').length && !$target.closest('.header-bottom .popup').length) {
            $('.header-bottom .popup').fadeOut(200);
        }
    });

})(jQuery);