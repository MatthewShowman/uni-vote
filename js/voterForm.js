$(document).ready(function () {

    //Submit Function
    $("#submitBtn").click(function () {
      //Put form responses in JSON 
      request = {
        "firstName": $("#firstName").val(),
        "lastName": $("#lastName").val(),
        "address": $("#address").val(),
        "city": $("#city").val(),
        "state": $("#state").val(),
        "zip": $("#zip").val(),
        "jurisdiction": $("#jurisdiction").val()
      };
  
      //POST request to REST API
      $.ajax({
        url: "http://localhost:3000/api/org.univote.addVoter",
        type: "POST",
        dataType: "json",
        data: request,
        success: function (voter) {
          var param = $.param(voter);
          console.log(param);
          if (confirm("Voter was successfully created!"))
            document.location = 'voters.html';
        },
        error: function (xhr, status) {
          console.log(status);
          console.log(xhr);
          alert("There was a problem.");
        }
      })
  
    });//End Submit Function

});