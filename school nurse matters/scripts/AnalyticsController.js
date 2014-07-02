(function () {


    var gaplugin,
        isAllowed;


    function init() {

        gaplugin = window.plugins.gaPlugin;


     //   isAllowed = localStorage.getItem("AllowAnalytics");

      //  if (isAllowed !== null && isAllowed === "true")
            InitializeAnalytics();
       // else
       //     navigator.notification.confirm('ProParent would like your permission to collect usage data.\nNo personal or user identifiable data will be collected.', permissionAllowed, 'Attention', 'Allow,Deny');


        if (gaplugin !== null && gaplugin !== undefined) {

            $(document).on("pagechange", onPageChange);
        }


    }


    function InitializeAnalytics() {
        gaplugin.init(
                function (result) {
                    console.log("PlugResultHandler: " + result);
                },
                function (result) {
                    console.log("PlugErrorHandler: " + result);
                },
                "UA-50812266-1", 10);

    }

    function permissionAllowed(result) {

        if (result === 1) {
            InitializeAnalytics();
            $.localStorage.setItem("AllowAnalytics", "true");
        }

    }

    function onPageChange() {

        var pageName = $.mobile.activePage.attr('id');

        //var pageName = "testing";

        gaplugin.trackPage(function (result) { console.log("PlugResultHandler: " + result); }, function (result) { console.log("PlugErrorHandler: " + result); }, pageName);

    }

    $(window).on("load", (function() { 
        $(document).on("deviceready", init);
    }))


})();