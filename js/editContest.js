$(document).ready(function () {


    //Get Contest var
    $.urlParam = function (name) {
        var results = new RegExp('[\?&]' + name + '=([^&#]*)')
            .exec(window.location.search);

        return (results !== null) ? results[1] || 0 : false;
    }
    var contestId = $.urlParam('contestId');
    var currentElectionId;
    var contestData;

    //Instantiate multiselect for candidates
    $('.candidatesDropDown').select2();

    //Populate Election dropdown
    $.getJSON('http://localhost:3000/api/org.univote.Election', function (electionData) {
        for (var i = 0; i < electionData.length; i++) {
            $('#election').append('<option value ="' + electionData[i].electionId + '">' + electionData[i].electionName + '</option>')
        };
    });

    //Populate Candidate dropdown
    $.getJSON('http://localhost:3000/api/org.univote.Voter', function (voterData) {
        for (var i = 0; i < voterData.length; i++) {
            $('#candidates').append('<option value ="' + voterData[i].voterId + '">' + voterData[i].firstName + " " + voterData[i].lastName + '</option>')
        };
    });

    //Populate boxes with current info and get current election id
    $.getJSON('http://localhost:3000/api/org.univote.Contest/' + contestId, function (data) {
        console.log(data);
        contestData = data;
        $("#contestName").val(data.contestName);
        $("#contestDescription").val(data.contestDescription);
        $("#jurisdiction").val(data.jurisdiction);
        $("#election").val(data.election.split('#').pop());
        currentElectionId = data.election.split('#').pop();
        console.log(data.election);
    });





    //Submit Function
    $("#submitBtn").click(function () {

        //Put form responses in JSON 
/*         contestRequest = {
            "contestName": $("#contestName").val(),
            "contestDescription": $("#contestDescription").val(),
            "jurisdiction": $("#jurisdiction").val(),
            "election": $("#election").val()
        }; */
        contestData.contestName = $("#contestName").val();
        contestData.contestDescription = $("#contestDescription").val();
        contestData.jurisdiction = $("#jurisdiction").val();
        contestData.election = $("#election").val();
        var request = {
            "oldElection" : currentElectionId,
            "newElection" : $("#election").val(),
            "contest"     : contestId,
            "contestName": $("#contestName").val(),
            "contestDescription" :  $("#contestDescription").val(),
            "jurisdiction" : $("#jurisdiction").val(),
            "candidates" : contestData.candidates
        }

        console.log(request);

        //PUT request to REST API - Contest
        $.ajax({
            url: "http://localhost:3000/api/org.univote.updateContest",
            type: "POST",
            dataType: "json",
            data: request,
            success: function (contest) {
                var param = $.param(contest);
                console.log(param);
                if (confirm("Contest was successfully updated!"))
                    document.location = 'contests.html';
            },
            error: function (xhr, status) {
                console.log(status);
                console.log(xhr);
                alert("There was a problem.");
            }
        });

    });//End Submit Function

    function removeContestFromElection(electionData) {
        var index = electionData.contests.indexOf("resource:org.univote.Contest#" + contestId);
        if (index > -1) {
            electionData.contests.splice(index, 1);
        }
    };

});



