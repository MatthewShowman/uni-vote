$(document).ready(function () {

  //Submit Function
  $("#submitBtn").click(function () {

    //Put form responses in JSON 
    request = {
      "contestName": $("#contestName").val(),
      "contestDescription": $("#contestDescription").val(),
      "jurisdiction": $("#jurisdiction").val(),
      "election": $("#election").val()
    };

    //POST request to REST API
    $.ajax({
      url: "http://localhost:3000/api/org.univote.addContest",
      type: "POST",
      dataType: "json",
      data: request,
      success: function (contest) {
        var param = $.param(contest);
        console.log(param);
        if (confirm("Contest Event was successfully created!"))
          document.location = 'Contests.html';
      },
      error: function (xhr, status) {
        console.log(status);
        console.log(xhr);
        alert("There was a problem.");
      }
    })

  });//End Submit Function


  $.getJSON('http://localhost:3000/api/org.univote.Election', function (electionData) {
    for (var i = 0; i < electionData.length; i++) {
      $('#election').append('<option value ="' + electionData[i].electionId + '">' + electionData[i].electionName +'</option>')
    };
  });
});



