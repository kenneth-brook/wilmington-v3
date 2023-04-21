; (function ($) {
    "use strict";

    var queries = urlQueries();

    if ($('.page-listings').length) {
        var type = queries.type.toLowerCase();
        var $landing = $('.listing-list');
        var city = $landing.data('city');
        var type_cats = { 'stay': '13', 'play': '14', 'dine': '15', 'shop': '18' };

        if ('events' === type) {
            _eventsData($landing);
        } else {
            _listingsData($landing, { city: city, cat: type_cats[type] });
        }
    }

    if ($('.page-listing-detail').length) {
        var itemId = queries['id'];
        var type = queries['type'].toLowerCase();
        var $landing = $('main.content');
        var _data = _getData(type, itemId);

        $landing.empty();
        if (_data) {
            detailTemplate(_data).appendTo($landing);
        } else {
            $('<div >').addClass('listing-null').text('No data found.').appendTo($landing);
        }
    }

    if ($('.page-listing-share').length) {
        var itemId = queries['id'];
        var type = queries['type'].toLowerCase();
        var $landing = $('main.content');
        var $caption = $('.caption-block').clone();
        var _data = _getData(type, itemId);

        $landing.empty();
        if (_data) {
            $caption.appendTo($landing);
            shareTemplate(_data).appendTo($landing);
        } else {
            $('<div >').addClass('listing-null').text('No data found.').appendTo($landing);
        }
    }

    if ($('.page-listing-map').length) {
        var itemId = queries['id'];
        var type = queries['type'].toLowerCase();
        var $landing = $('main.content');
        var _data = _getData(type, itemId);

        $landing.empty();
        if (_data) {
            mapTemplate(_data).appendTo($landing);
        } else {
            $('<div >').addClass('listing-null').text('No data found.').appendTo($landing);
        }
    }

    if ($('.page-itinerary').length) {
        // localStorage.removeItem('itenerary');
        var datas = iteneraryData('itenerary');
        var $landing = $('.itinerary-list');

        $landing.empty();
        if (datas.length) {
            $.each(datas, function (idx, id) {
                var $item = $('<li >').addClass('itinerary-item').html('<p class="fetching">Fetching data...</p>').appendTo($landing)
                var ids = id.split('-');
                var _data = _getData(ids[0], ids[1]);
                if (_data) {
                    $item.empty();
                    iteneraryTemplate(_data, ids[0]).appendTo($item);
                } else {
                    $item.remove();
                }
            });
        } else {
            $('<li >').addClass('itinerary-null').html('<h4>No itinerary data yet.</h4><p>Click on the <strong>"Add to Itinerary"</strong> button to add it <br>to your itenerary list.</p>').appendTo($landing);
        }
    }

})(jQuery);

function _listingsGet(page = 1) {
    var _key = 'listings';
    var _items = [];
    if (sessionStorage.getItem(_key)) {
        _items = JSON.parse(sessionStorage.getItem(_key));
    }

    return $.ajax({
        url: '_listings.php',
        dataType: 'json',
        data: { items: 9, page: page },
        // async: false,
        success: function (response) {
            if (response.items) {
                $(response.items).each(function (idx, item) {
                    _items.push(item);
                });
                sessionStorage.setItem(_key, JSON.stringify(_items));
            }
        },
    });
}

function _listingsData($_landing, _filter = {}, _page = 1, _loop = false) {
    var _key = 'listings';
    var _items;
    var _paging;
    if (sessionStorage.getItem(_key)) {
        _items = JSON.parse(sessionStorage.getItem(_key));
        _paging = JSON.parse(sessionStorage.getItem(_key + '_paging'));
    }

    var firstpage;
    if (undefined === _items) {
        firstpage = _page;
    }
    if (_items && _paging && Math.round(_paging.total) > _items.length) {
        firstpage = _paging.end / (_paging.end - _paging.start + 1) + 1;
    }

    var $loading_next = $('<li />').addClass('listing-item').html('<div class="listing-loadmore" />');
    if (undefined !== firstpage) {
        if (undefined !== _items) {
            if (!_loop) {
                $_landing.empty();
                _items = listingFilterCategory(_items, _filter.cat);
                _items = listingFilterCity(_items, _filter.city);
                if (_items.length) {
                    displayItems(_items, $_landing);
                }
                $loading_next.appendTo($_landing);
            }
        }

        var _stop = false;
        var _new_items = [];
        var get = _listingsGet(firstpage);
        get.success(function (response) {
            if (!response.items || !response.items.length) {
                $_landing.empty();
                $('<li >').addClass('listing-null').text('No data found.').appendTo($_landing);
                return;
            }

            sessionStorage.setItem(_key + '_paging', JSON.stringify(response.paging));

            if (Math.round(response.paging.end) < Math.round(response.paging.total)) {
                var pg = response.paging.end / (response.paging.end - response.paging.start + 1);
                _listingsData($_landing, _filter, (pg + 1), true);
            } else {
                _stop = true;
            }

            if (firstpage == 1) {
                $_landing.empty();
            }
            $_landing.children().last().remove();

            if (!_loop) {
                var _new_items_filter = response.items;
                _new_items_filter = listingFilterCategory(_new_items_filter, _filter.cat);
                _new_items_filter = listingFilterCity(_new_items_filter, _filter.city);
                if (_new_items_filter.length) {
                    $(_new_items_filter).each(function (idx, item) {
                        _new_items.push(item);
                    });
                    displayItems(_new_items, $_landing);
                }
                $loading_next.appendTo($_landing)
            }
        });
        get.done(function (response) {
            if (_loop) {
                var _new_items_filter = response.items;
                _new_items_filter = listingFilterCategory(_new_items_filter, _filter.cat);
                _new_items_filter = listingFilterCity(_new_items_filter, _filter.city);
                if (_new_items_filter.length) {
                    $(_new_items_filter).each(function (idx, item) {
                        _new_items.push(item);
                    });
                    displayItems(_new_items, $_landing);
                }
                $loading_next.appendTo($_landing)
            }
        });
        get.complete(function (response) {
            if (_stop) {
                $_landing.children().last().remove();
                if (!$_landing.children().length) {
                    $('<li >').addClass('listing-null').text('No data found.').appendTo($_landing);
                }
                sessionStorage.removeItem(_key + '_paging');
            }
        });
        get.error(function (request, status, error) {
            $_landing.empty();
            $('<li >').addClass('listing-null').html('Error getting data.<br>Please try again.').appendTo($_landing);
            console.log(error.message);
        });
    } else {
        $_landing.empty();
        _items = listingFilterCategory(_items, _filter.cat);
        _items = listingFilterCity(_items, _filter.city);
        if (_items.length) {
            displayItems(_items, $_landing);
        } else {
            $('<li >').addClass('listing-null').text('No data found.').appendTo($_landing);
        }
    }
}

function _eventsGet(page = 1) {
    var _key = 'events';
    var _items = [];
    if (sessionStorage.getItem(_key)) {
        _items = JSON.parse(sessionStorage.getItem(_key));
    }

    return $.ajax({
        url: '_events.php',
        dataType: 'json',
        data: { items: 3, page: page },
        // async: false,
        success: function (response) {
            if (response.items) {
                $(response.items).each(function (idx, item) {
                    _items.push(item);
                });
                sessionStorage.setItem(_key, JSON.stringify(_items));
            }
        },
    });
}

function _eventsData($_landing, _page = 1, _loop = false) {
    var _key = 'events';
    var _items;
    var _paging;
    if (sessionStorage.getItem(_key)) {
        _items = JSON.parse(sessionStorage.getItem(_key));
        _paging = JSON.parse(sessionStorage.getItem(_key + '_paging'));
    }

    var firstpage;
    if (undefined === _items) {
        firstpage = _page;
    }
    if (_items && _paging && Math.round(_paging.total) > _items.length) {
        firstpage = _paging.end / (_paging.end - _paging.start + 1) + 1;
    }

    var $loading_next = $('<li />').addClass('listing-item').html('<div class="listing-loadmore" />');
    if (undefined !== firstpage) {
        if (undefined !== _items) {
            if (!_loop) {
                $_landing.empty();
                displayItems(_items, $_landing);
                $loading_next.appendTo($_landing);
            }
        }

        var _stop = false;
        var _new_items = [];
        var get = _eventsGet(firstpage);
        get.success(function (response) {
            if (!response.items || !response.items.length) {
                $_landing.empty();
                $('<li >').addClass('listing-null').text('No data found.').appendTo($_landing);
                return;
            }

            sessionStorage.setItem(_key + '_paging', JSON.stringify(response.paging));

            if (Math.round(response.paging.end) < Math.round(response.paging.total)) {
                var pg = response.paging.end / (response.paging.end - response.paging.start + 1);
                _eventsData($_landing, (pg + 1), true);
            } else {
                _stop = true;
            }

            if (firstpage == 1) {
                $_landing.empty();
            }
            $_landing.children().last().remove();

            if (!_loop) {
                $(response.items).each(function (idx, item) {
                    _new_items.push(item);
                });
                displayItems(_new_items, $_landing);
                $loading_next.appendTo($_landing)
            }
        });
        get.done(function (response) {
            if (_loop) {
                $(response.items).each(function (idx, item) {
                    _new_items.push(item);
                });
                displayItems(_new_items, $_landing);
                $loading_next.appendTo($_landing)
            }
        });
        get.complete(function (response) {
            if (_stop) {
                $_landing.children().last().remove();
                sessionStorage.removeItem(_key + '_paging');
            }
        });
        get.error(function (request, status, error) {
            $_landing.empty();
            $('<li >').addClass('listing-null').html('Error getting data.<br>Please try again.').appendTo($_landing);
            console.log(error.message);
        });
    } else {
        $_landing.empty();
        if (_items.length) {
            displayItems(_items, $_landing);
        } else {
            $('<li >').addClass('listing-null').text('No data found.').appendTo($_landing);
        }
    }
}

function _getDatas(_key) {
    _key = 'events' === _key ? 'events' : 'listings';
    return JSON.parse(sessionStorage.getItem(_key));
}

function _getData(_key, _id) {
    var items = _getDatas(_key);
    var _data;
    $(items).each(function (idx, item) {
        if (_id === ('events' === _key ? item.eventid : item.listingid)) {
            _data = item;
        }
    });
    return _data;
}

function listingFilterCategory(datas, categoryid) {
    var _items = [];
    if (categoryid) {
        $(datas).each(function (idx, data) {
            if (data.categoryid === categoryid) {
                _items.push(data);
            }
        });
    } else {
        _items = datas;
    }
    return _items;
}

function listingFilterCity(datas, city) {
    var _items = [];
    if (city) {
        $(datas).each(function (idx, data) {
            if (data.city === city) {
                _items.push(data);
            }
        });
    } else {
        _items = datas;
    }
    return _items;
}

function displayItems(datas, $landing) {
    $(datas).each(function (idx, data) {
        var $item = itemTemplate(data).appendTo($landing).wrap('<li class="listing-item" />');
        if ($item.find('.google-review').length) {
            _gplaceReview($item.find('.google-review'), { lat: data.latitude, lon: data.longitude, place: data.company, id: data.listingid });
        }
    });
}


// ITENERARY
function iteneraryData(_key) {
    var items = [];
    if (localStorage.getItem(_key)) {
        items = JSON.parse(localStorage.getItem(_key));
    }

    return items;
}

function iteneraryAdd(id, type) {
    var _key = 'itenerary';

    var items = iteneraryData(_key);
    var key = type + '-' + id;
    if (items.indexOf(key) === - 1) {
        items.push(key);
        localStorage.setItem(_key, JSON.stringify(items));
    }

    return items;
}


// TEMPLATES
function itemTemplate(data) {
    var queries = urlQueries();
    var type = queries.type.toLowerCase();
    var $item = $('<div />').addClass('listing');

    var $title = $('<h3 />').addClass('listing-title').text('events' === type ? data.title : data.company);
    $title.appendTo($item);

    $desc = $('<div />').addClass('events' === type ? 'listing-body pt-0 pb-0 border-top' : 'listing-body border-top');
    $desc.appendTo($item);

    if ('events' === type) {
        var $event = $('<ul />').addClass('event-datas border-bottom');
        $event.appendTo($desc);

        var date = data.recurrence ? data.recurrence : (data.enddate === data.startdate ? data.startdate : data.startdate + ' - ' + data.enddate);
        $('<li />').text(date).addClass('event-date').appendTo($event);
        $('<li />').text(data.location).addClass('event-location').appendTo($event);
    }

    if ('stay' !== type) {
        var maxDesc = 'events' === type ? 25 : 12;
        var description = pureText(data.description);
        var descriptions = description.split(' ');
        if (descriptions.length > maxDesc) {
            description = descriptions.slice(0, maxDesc - 1).join(' ') + ' ...';
        }
        $('<p />').text(description).appendTo($desc);
    } else {
        var address = data.address1 + '<br>' + data.city + ', ' + data.state + ' ' + data.zip;
        $('<p />').html(address).appendTo($desc);
    }

    var $foot = $('<div />').addClass('events' === type ? 'listing-footer' : 'listing-footer border-top');
    $foot.appendTo($item);

    if ('events' !== type) {
        var $review = $('<div />').addClass('google-review');
        $review.appendTo($foot);
        $('<div />').addClass('stars').attr({ 'data-val': 0 }).appendTo($review);
        $('<div />').addClass('text').html('<strong>0</strong> Google review').appendTo($review);
    }

    var $more = $('<a />').addClass('button').text('more');
    $more.appendTo($foot);
    var link = 'listing-detail.php?id=' + ('events' === type ? data.eventid : data.listingid);
    link += '&type=' + type;
    link += '&town=' + encodeURIComponent(data.city);
    $more.attr({ 'href': link });

    return $item;
}

function detailTemplate(data) {
    var queries = urlQueries();
    var type = queries.type.toLowerCase();
    var dataid = 'events' === type ? data.eventid : data.listingid;
    var $wrapper = $('<div />').addClass('listing-detail');

    var $image = $('<div />').addClass('listing-image');
    $image.appendTo($wrapper);

    var images = 'events' === type ? data.images.image : data.listingmedia.media;
    if (images.length) {
        var $slider = $('<div />').addClass('slider owl-carousel').appendTo($image);
        $(images).each(function (idx, img) {
            $('<img />').attr({ 'src': img.mediafile }).appendTo($slider);
        });
        $slider.owlCarousel({
            items: 1,
            loop: true,
        });
    } else {
        if ('string' === typeof images.mediafile) {
            $('<img />').attr({ 'src': images.mediafile }).appendTo($image);
        }
    }

    var $main = $('<div />').addClass('listing');
    $main.appendTo($wrapper);

    var $title = $('<h3 />').addClass('listing-title').text('events' === type ? data.title : data.company);
    $title.appendTo($main);

    var $content = $('<div />').addClass('events' === type ? 'listing-body pt-0 pb-0 border-top' : 'listing-content border-top');
    $content.appendTo($main);

    if ('events' === type) {
        var $event = $('<ul />').addClass('event-datas border-bottom');
        $event.appendTo($content);

        var date = data.recurrence ? data.recurrence : (data.enddate === data.startdate ? data.startdate : data.startdate + ' - ' + data.enddate);
        $('<li />').text(date).addClass('event-date').appendTo($event);
        $('<li />').text(data.location).addClass('event-location').appendTo($event);
    }

    var $lead = $('<ul />').addClass('listing-highlight mb-0');
    $lead.appendTo($main);
    var address = ('events' === type ? data.address : data.address1) + ', ' + data.city + ', ' + data.state + ' ' + data.zip;
    $('<li />').text(address).appendTo($lead);
    var hours = 'events' === type ? data.times : '8:30 am to 10:00 pm';
    $('<li />').html('<strong>HOURS:</strong> ' + hours).appendTo($lead);
    $('<div />').addClass('listing-body').html(data.description).appendTo($main);

    var $link = $('<div />').addClass('listing-buttons');
    $link.appendTo($main);

    if (data.website) {
        var $linkLeft = $('<ul />').appendTo($link);
        $('<a />').attr({ 'href': data.website, 'target': '_blank' }).text('Website').appendTo($linkLeft).wrap('<li />');
    }

    var share_url = 'listing-share.php?id=' + dataid;
    share_url += '&type=' + type;
    share_url += '&town=' + encodeURIComponent(data.city);
    var map_url = 'listing-map.php?id=' + dataid;
    map_url += '&type=' + type;
    map_url += '&town=' + encodeURIComponent(data.city);

    var $linkRight = $('<ul />').appendTo($link);
    if (data.phone) {
        $('<a />').attr({ 'href': 'tel:+1' + data.phone.replace(/[^0-9]/gi, '') }).text(data.phone).wrapInner('<span class="phone" />').appendTo($linkRight).wrap('<li />');
    }
    var $direction_btn = $('<a />').attr({ 'href': '#' }).text('Get Directions').wrapInner('<span class="map" />').appendTo($linkRight).wrap('<li />');
    var $direction_popup = $('<div />').addClass('popup').appendTo($('body'));
    var $direction_popup_close = $('<button />').addClass('popup-close').text('Close').appendTo($direction_popup);
    $('<h4 />').addClass('popup-title').html('<span class="icon map"></span>Directions').appendTo($direction_popup);
    $('<div />').addClass('popup-body').css({ textAlign: 'center' }).html('<p>Bernatia sintioremod quodi blaborias secepe re si omniet venem re volorit velendis molupic to blab ium rero iducium ne litibus volume nis. Anem quaeperume sitatur sit, sersped earciat iscidicae. Aium rero iducium ne litibus volume nis. Anem quaeperume sitatur sit, sersped earciat.</p>').appendTo($direction_popup);
    var $direction_popup_footer = $('<div />').addClass('popup-footer').appendTo($direction_popup);
    $('<a />').attr({ 'href': map_url }).addClass('popup-button').text('View Map').appendTo($direction_popup_footer);
    $direction_btn.click(function (e) {
        e.preventDefault();
        $direction_popup.fadeIn();
    });
    $direction_popup_close.click(function () {
        $direction_popup.fadeOut(200);
    });
    $(document).click(function (e) {
        var $target = $(e.target);
        if (!$target.closest($direction_popup).length && !$target.closest($direction_btn).length) {
            $direction_popup.fadeOut(200);
        }
    });

    if ('events' !== type) {
        var $foot = $('<div />').addClass('listing-footer border-top');
        $foot.appendTo($main);

        var $review = $('<div />').addClass('google-review');
        $review.appendTo($foot);
        $('<div />').addClass('stars').attr({ 'data-val': 0 }).appendTo($review);
        $('<div />').addClass('text').html('<strong>0</strong> Google review').appendTo($review);

        _gplaceReview($review, { lat: data.latitude, lon: data.longitude, place: data.company, id: data.listingid });

        if ('shop' !== type && 'play' !== type) {
            var $reserve = $('<a />').addClass('button reserve-button').text('Reserve Now');
            $reserve.appendTo($foot);
            $reserve.attr({ 'href': '#' });
        }
    }

    var $buttons = $('<ul />').addClass('buttons');
    $buttons.appendTo($wrapper).wrap('<div class="listing-bottom" />');

    $('<a />').attr({ 'href': share_url }).text('Share').wrapInner('<span class="share" />').appendTo($buttons).wrap('<li />');
    $('<a />').attr({ 'href': map_url }).text('Map').wrapInner('<span class="map" />').appendTo($buttons).wrap('<li />');

    var $itenerary = $('<a />').attr({ 'href': '#' }).text('Add to Itinerary').wrapInner('<span class="addto" />').appendTo($buttons).wrap('<li />');
    $itenerary.click(function (e) {
        e.preventDefault();
        console.log(`Added ${type} ${dataid}`);
        iteneraryAdd(dataid, type);
    });

    return $wrapper;
}

function shareTemplate(data) {
    var queries = urlQueries();
    var type = queries.type.toLowerCase();
    var dataid = 'events' === type ? data.eventid : data.listingid;
    var $wrapper = $('<div />').addClass('listing-detail');

    var $image = $('<div />').addClass('listing-image');
    $image.appendTo($wrapper);

    var img;
    var images = 'events' === type ? data.images.image : data.listingmedia.media;
    if (images.length) {
        img = images[0];
    } else {
        img = images;
    }
    if ('string' === typeof img.mediafile) {
        $('<img />').attr({ 'src': img.mediafile, 'title': img.title }).appendTo($image);
    }

    var $main = $('<div />').addClass('listing');
    $main.appendTo($wrapper);

    var $title = $('<h3 />').addClass('listing-title').text('events' === type ? data.title : data.company);
    $title.appendTo($main);

    var $content = $('<div />').addClass('listing-content border-top');
    $content.appendTo($main);

    var $lead = $('<ul />').addClass('listing-highlight');
    $lead.appendTo($main);
    var address = ('events' === type ? data.address : data.address1) + ', ' + data.city + ', ' + data.state + ' ' + data.zip;
    $('<li />').text(address).appendTo($lead);

    var $shares = $('<ul />').addClass('listing-share');
    $shares.appendTo($main);
    var $popup_message = $('<div />').addClass('share-message').html('<p>Enjoy your visit in <br>Wilmington & Beaches.</p>');

    var $facebook_popup = $('<div />').addClass('popup').appendTo($('body'));
    var $facebook_popup_close = $('<button />').addClass('popup-close').text('Close').appendTo($facebook_popup);
    $('<h4 />').addClass('popup-title').html('<span class="icon facebook"></span>Facebook').appendTo($facebook_popup);
    var $facebook_popup_body = $('<div />').addClass('popup-body').appendTo($facebook_popup);
    var $facebook_popup_footer = $('<div />').addClass('popup-footer').appendTo($facebook_popup);
    var $facebook_popup_btn = $('<button />').attr({ 'type': 'button' }).addClass('popup-button').text('Share to Facebook').appendTo($facebook_popup_footer);

    var $facebook_btn = $('<a href="#" />').text('Facebook').wrapInner('<span class="facebook" />');
    $facebook_btn.appendTo($shares).wrap('<li />');
    $facebook_btn.click(function (e) {
        e.preventDefault();
        $facebook_popup.fadeIn();
    });
    $facebook_popup_close.click(function () {
        $facebook_popup.fadeOut(200);
    });
    $(document).click(function (e) {
        var $target = $(e.target);
        if (!$target.closest($facebook_popup).length && !$target.closest($facebook_btn).length && !$target.closest($facebook_popup_btn).length) {
            $facebook_popup.fadeOut(200);
        }
    });
    $facebook_popup_btn.click(function () {
        $facebook_popup_body.empty();
        var $facebook_popup_message = $popup_message.clone();
        $('<h4>Your Facebook link <br>has been sent.</h4>').prependTo($facebook_popup_message);
        $facebook_popup_message.appendTo($facebook_popup_body);
        $facebook_popup_footer.empty();
    });

    var $instagram_popup = $('<div />').addClass('popup').appendTo($('body'));
    var $instagram_popup_close = $('<button />').addClass('popup-close').text('Close').appendTo($instagram_popup);
    $('<h4 />').addClass('popup-title').html('<span class="icon instagram"></span>Instagram').appendTo($instagram_popup);
    var $instagram_popup_body = $('<div />').addClass('popup-body').html('<input type="text" placeholder="Select Photo" />').appendTo($instagram_popup);
    var $instagram_popup_footer = $('<div />').addClass('popup-footer').appendTo($instagram_popup);
    var $instagram_popup_btn = $('<button />').attr({ 'type': 'button' }).addClass('popup-button').text('Enter').appendTo($instagram_popup_footer);

    var $instagram_btn = $('<a href="#" />').text('Instagram').wrapInner('<span class="instagram" />');
    $instagram_btn.appendTo($shares).wrap('<li />');
    $instagram_btn.click(function (e) {
        e.preventDefault();
        $instagram_popup.fadeIn();
    });
    $instagram_popup_close.click(function () {
        $instagram_popup.fadeOut(200);
    });
    $(document).click(function (e) {
        var $target = $(e.target);
        if (!$target.closest($instagram_popup).length && !$target.closest($instagram_btn).length && !$target.closest($instagram_popup_btn).length) {
            $instagram_popup.fadeOut(200);
        }
    });
    $instagram_popup_btn.click(function () {
        $instagram_popup_body.empty();
        var $instagram_popup_message = $popup_message.clone();
        $('<h4>Your Instagram pic <br>has been sent.</h4>').prependTo($instagram_popup_message);
        $instagram_popup_message.appendTo($instagram_popup_body);
        $instagram_popup_footer.empty();
    });

    var $email_popup = $('<div />').addClass('popup').appendTo($('body'));
    var $email_popup_close = $('<button />').addClass('popup-close').text('Close').appendTo($email_popup);
    $('<h4 />').addClass('popup-title').html('<span class="icon email"></span>Email').appendTo($email_popup);
    var $email_popup_body = $('<div />').addClass('popup-body').html('<input type="text" placeholder="Enter Email Address" />').appendTo($email_popup);
    var $email_popup_footer = $('<div />').addClass('popup-footer').appendTo($email_popup);
    var $email_popup_btn = $('<button />').attr({ 'type': 'button' }).addClass('popup-button').text('Enter').appendTo($email_popup_footer);

    var $email_btn = $('<a href="#" />').text('Email').wrapInner('<span class="email" />');
    $email_btn.appendTo($shares).wrap('<li />');
    $email_btn.click(function (e) {
        e.preventDefault();
        $email_popup.fadeIn();
    });
    $email_popup_close.click(function () {
        $email_popup.fadeOut(200);
    });
    $(document).click(function (e) {
        var $target = $(e.target);
        if (!$target.closest($email_popup).length && !$target.closest($email_btn).length && !$target.closest($email_popup_btn).length) {
            $email_popup.fadeOut(200);
        }
    });
    $email_popup_btn.click(function () {
        $email_popup_body.empty();
        var $email_popup_message = $popup_message.clone();
        $('<h4>Your email <br>has been sent.</h4>').prependTo($email_popup_message);
        $email_popup_message.appendTo($email_popup_body);
        $email_popup_footer.empty();
    });

    var $text_popup = $('<div />').addClass('popup').appendTo($('body'));
    var $text_popup_close = $('<button />').addClass('popup-close').text('Close').appendTo($text_popup);
    $('<h4 />').addClass('popup-title').html('<span class="icon text"></span>Text').appendTo($text_popup);
    var $text_popup_body = $('<div />').addClass('popup-body').html('<input type="text" placeholder="Enter Phone#" />').appendTo($text_popup);
    var $text_popup_footer = $('<div />').addClass('popup-footer').appendTo($text_popup);
    var $text_popup_btn = $('<button />').attr({ 'type': 'button' }).addClass('popup-button').text('Enter').appendTo($text_popup_footer);

    var $text_btn = $('<a href="#" />').text('Text').wrapInner('<span class="text" />');
    $text_btn.appendTo($shares).wrap('<li />');
    $text_btn.click(function (e) {
        e.preventDefault();
        $text_popup.fadeIn();
    })
    $text_popup_close.click(function () {
        $text_popup.fadeOut(200);
    });
    $(document).click(function (e) {
        var $target = $(e.target);
        if (!$target.closest($text_popup).length && !$target.closest($text_btn).length && !$target.closest($text_popup_btn).length) {
            $text_popup.fadeOut(200);
        }
    });
    $text_popup_btn.click(function () {
        $text_popup_body.empty();
        var $text_popup_message = $popup_message.clone();
        $('<h4>Your text <br>has been sent.</h4>').prependTo($text_popup_message);
        $text_popup_message.appendTo($text_popup_body);
        $text_popup_footer.empty();
    });

    var $buttons = $('<ul />').addClass('buttons');
    $buttons.appendTo($wrapper).wrap('<div class="listing-bottom" />');

    var $share = $('<a />').attr({ 'href': '#' }).text('Share').wrapInner('<span class="share" />').appendTo($buttons).wrap('<li />');
    $share.click(function (e) {
        e.preventDefault();
    })
    $share.parent().addClass('current');

    var map_url = 'listing-map.php?id=' + dataid;
    map_url += '&type=' + type;
    map_url += '&town=' + encodeURIComponent(data.city);
    $('<a />').attr({ 'href': map_url }).text('Map').wrapInner('<span class="map" />').appendTo($buttons).wrap('<li />');

    var $itenerary = $('<a />').attr({ 'href': '#' }).text('Add to Itinerary').wrapInner('<span class="addto" />').appendTo($buttons).wrap('<li />');
    $itenerary.click(function (e) {
        e.preventDefault();
        console.log(`Added ${type} ${dataid}`);
        iteneraryAdd(dataid, type);
    });

    return $wrapper;
}

function mapTemplate(data) {
    var queries = urlQueries();
    var type = queries.type.toLowerCase();
    var $wrapper = $('<div />').addClass('listing-map');

    var $info = $('<div />').addClass('listing map-info');
    $info.appendTo($wrapper);

    var dataid = 'events' === type ? data.eventid : data.listingid;
    var datatitle = 'events' === type ? data.title : data.company;
    var dataaddress1 = 'events' === type ? data.address : data.address1;
    var dataaddress2 = data.city + ', ' + data.state + ' ' + data.zip;
    var $title = $('<h3 />').addClass('listing-title').text(datatitle);
    $title.appendTo($info);

    var $content = $('<div />').addClass('listing-content border-top');
    $content.appendTo($info);

    var $lead = $('<ul />').addClass('listing-highlight');
    $lead.appendTo($content);
    var address = dataaddress1 + ', ' + dataaddress2;
    $('<li />').text(address).appendTo($lead);

    var $mapArea = $('<div />').addClass('map-wrapper');
    $mapArea.appendTo($wrapper);

    var $mapLanding = $('<div />').css('opacity', 0).appendTo($mapArea);

    mapboxgl.accessToken = 'pk.eyJ1Ijoid29tYmF0MTk3MiIsImEiOiJjbDdycmxjNXIwaTJ1M3BudXB2ZTZoZm1tIn0.v-NAvl8Ba0yPtAtxOt9iTg';
    const _map = new mapboxgl.Map({
        container: $mapLanding.get(0),
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [data.longitude, data.latitude],
        zoom: 15,
        maxZoom: 18,
        minZoom: 12,
    });
    _map.addControl(new mapboxgl.FullscreenControl());
    const _popup = new mapboxgl.Popup({ closeOnClick: false })
        .setLngLat([data.longitude, data.latitude])
        .addTo(_map);

    var $popup = $('<div />').addClass('popup-card');
    var $popupTop = $('<div />').addClass('popup-card-head').appendTo($popup);
    var $popupImg = $('<div />').addClass('popup-card-image').appendTo($popupTop);
    $('<h3 />').text(datatitle).appendTo($popupTop);

    var img;
    var images = 'events' === type ? data.images.image : data.listingmedia.media;
    if (images.length) {
        img = images[0];
    } else {
        img = images;
    }
    if ('string' === typeof img.mediafile) {
        $('<img />').attr({ 'src': img.mediafile, 'title': img.title }).appendTo($popupImg);
    }

    $('<div />').addClass('popup-card-body').html(dataaddress1 + '<br>' + dataaddress2).appendTo($popup);

    var $popupBottom = $('<ul />').addClass('popup-card-buttons').appendTo($popup);

    var $call = $('<a />').text('CALL').prepend('<span class="phone" />').appendTo($popupBottom).wrap('<li />');
    if (data.phone) {
        $call.attr({ href: 'tel:+1' + data.phone.replace(/[^0-9]/gi, '') });
    } else {
        $call.attr({ href: '#' }).click(function (e) {
            e.preventDefault();
        });
    }

    var share_url = 'listing-share.php?id=' + dataid;
    share_url += '&type=' + type;
    share_url += '&town=' + encodeURIComponent(data.city);
    $('<a />').attr({ 'href': share_url }).text('SHARE').prepend('<span class="share" />').appendTo($popupBottom).wrap('<li />');

    var $itinerary = $('<a />').attr({ 'href': '#' }).text('ITINERARY').prepend('<span class="addto" />').appendTo($popupBottom).wrap('<li />');
    $itinerary.click(function (e) {
        e.preventDefault();
        console.log(`Added ${type} ${dataid}`);
        iteneraryAdd(dataid, type);
    });

    _popup.setDOMContent($popup.get(0));
    _map.on('load', function () {
        _map.resize();
        $mapLanding.css({ opacity: 1, transition: 'opacity 250ms ease-in-out' });
        var dists = (_map.getBounds().getNorth() - _map.getBounds().getSouth()) / 5;
        _map.setCenter([data.longitude, parseFloat(data.latitude) + dists]);
    });

    return $wrapper;
}

function iteneraryTemplate(data, type) {
    var dataid = 'events' === type ? data.eventid : data.listingid;
    var $item = $('<div />').addClass('itinerary border-bottom');

    var $rowTop = $('<div />').addClass('row').appendTo($item);
    var $topLeft = $('<div />').addClass('col-left').appendTo($rowTop);
    var $topRight = $('<div />').addClass('col-right').appendTo($rowTop);

    $('<div />').addClass('day').html('<span>Day</span><strong>01</strong>').appendTo($topLeft);
    $('<div />').addClass('date').html('03/16/22 <br>9:00 am').appendTo($topLeft);

    $('<div />').addClass('icon ' + type).appendTo($topRight);
    $('<h3 />').addClass('name').text('events' === type ? data.title : data.company).appendTo($topRight);

    var address = 'events' === type ? data.address : data.address1;
    $('<p />').addClass('address').html(address + '<br>' + data.city + ', ' + data.state + ' ' + data.zip).appendTo($topRight);

    var $edit_btn = $('<a />').addClass('edit-button').text('Edit').appendTo($topRight);
    $edit_btn.attr({ href: '#' });

    var $rowBottom = $('<div />').addClass('row').appendTo($item);
    var $bottomLeft = $('<div />').addClass('col-left').appendTo($rowBottom);
    var $bottomRight = $('<div />').addClass('col-right').appendTo($rowBottom);

    var add_queries = '&type=' + type + '&town=' + encodeURIComponent(data.city);
    var $buttons = $('<ul />').addClass('itinerary-buttons').appendTo($bottomRight);

    $('<a />').attr({ href: 'listing-detail.php?id=' + dataid + add_queries }).addClass('detail-button').text('Detail').appendTo($bottomLeft);
    $('<a />').attr({ href: 'listing-share.php?id=' + dataid + add_queries }).addClass('share').text('Share').appendTo($buttons).wrap('<li />');

    var $call_btn = $('<a />').addClass('call').text('Call').appendTo($buttons).wrap('<li />');
    if (data.phone && 'string' === typeof data.phone) {
        $call_btn.attr({ href: 'tel:+1' + data.phone.replace(/[^0-9]/gi, '') });
    } else {
        $call_btn.attr({ href: '#' }).click(function (e) {
            e.preventDefault();
        });
    }

    var $web_btn = $('<a />').addClass('web').text('Web').appendTo($buttons).wrap('<li />');
    if (data.website && 'string' === typeof data.website) {
        $web_btn.attr({ href: data.website, target: '_blank' });
    } else {
        $web_btn.attr({ href: '#' }).click(function (e) {
            e.preventDefault();
        });
    }

    $('<a />').attr({ href: 'listing-map.php?id=' + dataid + add_queries }).addClass('map').text('Map').appendTo($buttons).wrap('<li />');

    return $item;
}

// GOOGLE REVIEW
function _gplaceReviewUpdate($el, stars) {
    $('.stars', $el).attr({ 'data-val': stars });
    $('.text strong', $el).text(stars);
    $el.addClass('loaded');
}

function _gplaceReview($el, _datas = {}) {
    var _key = 'gplace_' + _datas.id;
    var stars;
    if (sessionStorage.getItem(_key)) {
        stars = sessionStorage.getItem(_key);
    }

    if (undefined === stars) {
        $.ajax({
            url: '_gplace.php',
            dataType: 'json',
            data: _datas,
            success: function (response) {
                if (response.stars) {
                    sessionStorage.setItem(_key, response.stars);
                    sessionStorage.removeItem(_key + '_req');
                } else {
                    var try_req = sessionStorage.getItem(_key + '_req');
                    sessionStorage.setItem(_key + '_req', (try_req ? Math.round(try_req) + 1 : 1));
                    if (try_req && Math.round(try_req) > 3) {
                        sessionStorage.removeItem(_key + '_req');
                        sessionStorage.setItem(_key, response.stars);
                    }
                }
                _gplaceReviewUpdate($el, response.stars);
            }
        });
    } else {
        _gplaceReviewUpdate($el, stars);
    }
}

// SUPPORTS
function pureText(str) {
    var a = document.createElement('div');
    a.innerHTML = str;

    for (var c = a.childNodes, i = c.length; i--;) {
        if (c[i].nodeType == 1) {
            return a.textContent;
        }
    }

    return str;
}

function urlQueries() {
    var queries = {};
    $.each(document.location.search.substr(1).split('&'), function (c, q) {
        if (q) {
            var i = q.split('=');
            queries[i[0].toString()] = i[1] ? i[1].toString() : '';
        }
    });
    return queries;
}