$(document).ready(function () {

    document.getElementById("email").addEventListener("click", function() {
        document.querySelector(".bg-modal").style.display = "flex";
    });

    document.querySelector(".close").addEventListener("click", function() {
        document.querySelector(".bg-modal").style.display = "none";
    });

    // function formSubmission() {
    //     var name = document.getElementById("name").value;
    //     var email = document.getElementById("email").value;
    //     var message = document.getElementById("message").value; 
    // }
    // document.getElementById("form-id").submit();
    
})