$(document).ready( function() {

    // Don't send these requests is some admin is previewing the test
    if(!event_admin_preview) {

        $(window).focus(function() {
            logActivity("focused");
        });

        $(window).blur(function() {
            logActivity("blurred");
        });

        function logActivity(activity) {
            var url = $("#activity-log-url").text()
            var xhr = $.ajax({
                url: url,
                type: 'POST',
                data: {action: activity},
                success: function(response) {
                    //Do nothing
                },
            });
        }
    }
});
