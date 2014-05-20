    var vLog = { days: "", updated: "", active: true };

    var msg = { title: "Rate us!", message: "Please rate us in the App store." };

    var vItem = {};

    var androidUrl = 'http://play.google.com/store/apps/details?id=uk.co.info_max.healthvisitor';

    var iosUrl = 'itms-apps://itunes.apple.com/gb/app/proparent/id704541448';

    var threshold = 3;

    var logName = "feedBack";

    function checkFeedBackDue() {
     
        var temp = localStorage.getItem(logName);

        var vItem = JSON.parse(temp);

        if (vItem === null || vItem === 'undefined') {

            updateLog({ days: "1", updated: CurrentDate() });
        }
        else {

            var ls = vItem.active;

            if (ls === true) {
                var days = parseInt(vItem.days);

                var lv = vItem.updated;

                if (days <= threshold - 1 && !IsUpdated(lv)) {

                    days = days + 1;

                    updateLog({ days: days, updated: CurrentDate() });
                }

                if (navigator.onLine && (days >= threshold)) {
                    showMessage({ callBack: userResponse });
                }

            }
        }

    };

    function showMessage(opt) {

        $.extend(msg, opt);

        navigator.notification.confirm(
        msg.message,
        msg.callBack,
        msg.title,
        [' Rate Now ', ' Later ', ' No Thanks ']);

    }

    function userResponse(e) {

        console.log(e);

        switch (e) {
            case 1:
                rateApp();
                break;
            case 2:
                resetCounter();
                break;
            case 3:
                clearCounter();
                break;
        }
    }

    function updateLog(opt) {

        $.extend(vLog, opt)

        localStorage.setItem(logName, JSON.stringify(vLog));

    }

    function rateApp() {

        var pf = device.platform;

        if (pf === 'iOS') {
            
            window.open(iosUrl);
        }
        else if (pf == 'Android') {

            window.open(androidUrl);
        }

        updateLog({ active: false });
        
        console.log("redirected to app store.");
    }


    function resetCounter() {

        updateLog({ days: "1", updated: CurrentDate() });

    }

    function clearCounter() {

        updateLog({ active: false });

    }

    function CurrentDate() {

        var currentDate = new Date();

        var day = currentDate.getDate();

        var month = currentDate.getMonth();

        var year = currentDate.getFullYear();

        return day + "/" + month + "/" + year;

    }

    function IsUpdated(l) {

        var retVal = false;

        var cstr = CurrentDate();

        var cp = cstr.split('/');

        var lp = l.split('/');

        var c = new Date(cp[2], cp[1], cp[0]);

        var l = new Date(lp[2], lp[1], lp[0]);

        if (l >= c) {

            retVal = true;
        }


        return retVal;

    }

    function init() {
        $(document).on('pagebeforeshow', '#page-home', checkFeedBackDue)
    }

    $(document).on("deviceready", init);
