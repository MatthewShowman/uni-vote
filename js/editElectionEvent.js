$(document).ready(function () {


    //Get Election Event var
    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)')
            .exec(window.location.search);

        return (results !== null) ? results[1] || 0 : false;
    }
    var electionEvent = $.urlParam('event');
    //console.log(electionEvent);
    //$("#electionName").val(electionEvent);

    var contests;
    var measures;
    //Populate boxes with current info
    $.getJSON('http://localhost:3000/api/org.univote.Election/' + electionEvent, function (data) {
        console.log(data);
        $("#electionName").val(data.electionName);
        $("#electionDescription").val(data.electionDescription);
        $("#startDatePicker").val(data.startDate.substr(0, data.startDate.indexOf('T')));
        $("#endDatePicker").val(data.endDate.substr(0, data.endDate.indexOf('T')));

        var startTime = data.startDate.split("T").pop();
        startTime = startTime.replace('.000Z', '');
        startTime = convert24to12(startTime);
        var endTime = data.endDate.split("T").pop();
        endTime = endTime.replace('.000Z', '');
        endTime = convert24to12(endTime);
        console.log(startTime);
        console.log(endTime);
        $("#startTimePicker").val(startTime);
        $("#endTimePicker").val(endTime);
        
        contests = data.contests;
        measures = data.measures;
        //console.log(contests);
    });


    //Submit Function
    $("#submitBtn").click(function () {
        var startTime = $("#startTimePicker").val();
        var endTime = $('#endTimePicker').val();
        var startHour = convert12to24($("#startTimePicker").val());
        var endHour = convert12to24($("#endTimePicker").val());
        var startMinutes = Number(startTime.match(/:(\d+)/)[1]);
        var endMinutes = Number(endTime.match(/:(\d+)/)[1]);

        //Have to append 0 to single digit hours and minutes
        if (startHour < 10) {
            startHour = "0" + startHour;
        }
        if (endHour < 10) {
            endHour = "0" + endHour;
        }
        if (startMinutes < 10) {
            startMinutes = "0" + startMinutes;
        }
        if (endMinutes < 10) {
            endMinutes = "0" + endMinutes;
        }

        //Put form responses in JSON 
        request = {
            "electionName": $("#electionName").val(),
            "electionDescription": $("#electionDescription").val(),
            "startDate": $("#startDatePicker").val() + "T" + startHour + ":" + startMinutes + ":00.000Z",
            "endDate": $("#endDatePicker").val() + "T" + endHour + ":" + endMinutes + ":00.000Z",
            "contests": contests,
            "measures": measures
        };
        console.log(request);
        //PUT request to REST API
        $.ajax({
            url: "http://localhost:3000/api/org.univote.Election/" + electionEvent,
            type: "PUT",
            dataType: "json",
            data: request,
            success: function (election) {
                var param = $.param(election);
                console.log(param);
                if (confirm("Election Event was successfully edited!"))
                    document.location = 'events.html';
            },
            error: function (xhr, status) {
                console.log(status);
                console.log(xhr);
                alert("There was a problem.");
            }
        })

    });//End Submit Function

    //define startTimePicker, if start date and end date are the same, then end time must be after start time
    $('#startTimePicker').timepicker({
        dynamic: false,
        change: function (time) {
            checkAndsetEndTimeStart();
        }
    });

    $('#endTimePicker').timepicker({
        dynamic: false
    });
});

//Convert 12 hour format into 24 hour for comparison
function convert12to24(timeToConvert) {
    var time = timeToConvert;
    var endTime = $('#endTimePicker').val();

    var hours = Number(time.match(/^(\d+)/)[1]);
    var minutes = Number(time.match(/:(\d+)/)[1]);
    var AMPM = time.match(/\s(.*)$/)[1];

    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = 0;
    return hours;
}
function convert24to12(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
        time = time.slice(1); // Remove full string match value
        time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
        time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
}
//Check time in case of same date
function checkAndsetEndTimeStart() {
    var startTime = $("#startTimePicker").val();
    var endTime = $('#endTimePicker').val();

    var startHour = convert12to24($("#startTimePicker").val());
    var endHour = convert12to24($("#endTimePicker").val());

    var startMinutes = Number(startTime.match(/:(\d+)/)[1]);
    var endMinutes = Number(endTime.match(/:(\d+)/)[1]);

    //Check if start date and end date are the same
    //Set end time minimum to start time if true
    //Set end time to start time if less than start time on change
    if ($("#startDatePicker").val().localeCompare($("#endDatePicker").val()) == 0) {
        $('#endTimePicker').timepicker('option', 'minTime', $("#startTimePicker").val());
        if (endHour < startHour) {
            $('#endTimePicker').timepicker('setTime', $("#startTimePicker").val());
        }
        if (endHour == startHour && endMinutes < startMinutes) {
            $('#endTimePicker').timepicker('setTime', $("#startTimePicker").val());
        }
    }
    else {
        $('#endTimePicker').timepicker('option', 'minTime', "12:00 AM");
    }
}

//Restrict date range based on start date and change end time if neccessary
$(function () {
    var dateFormat = "yy-mm-dd",
        from = $("#startDatePicker")
            .datepicker({
                defaultDate: "+1w",
                changeMonth: true,
                numberOfMonths: 1,
                dateFormat: "yy-mm-dd"
            })
            .on("change", function () {
                to.datepicker("option", "minDate", getDate(this));
                checkAndsetEndTimeStart();
            }),
        to = $("#endDatePicker").datepicker({
            defaultDate: "+1w",
            changeMonth: true,
            numberOfMonths: 1,
            dateFormat: "yy-mm-dd"
        })
            .on("change", function () {
                from.datepicker("option", "maxDate", getDate(this));
                checkAndsetEndTimeStart();
            });
    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }
        return date;
    }
});


