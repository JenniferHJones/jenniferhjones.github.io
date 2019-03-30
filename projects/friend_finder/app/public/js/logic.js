// front end javascript logic
$(document).ready(function () {

    // event listener for clicking close button on modal
    document.querySelector(".close").addEventListener("click", function () {
        document.querySelector(".bg-modal").style.display = "none";
    });

    // event listener for submit button on survey page
    $("#surveyBtn").on("click", function (event) {
        // console.log("button clicked");
        event.preventDefault();

        // validate if all questions have been answered
        var valid = true;

        if ($("#name").val() === "" || $("#photo").val === "") {
            valid = false;
        } else if ($("#quest1").val() === "" || $("quest2").val() === "" ||
            $("quest3").val() === "" || $("quest4").val() === "" ||
            $("quest5").val() === "" || $("quest6").val() === "" ||
            $("quest7").val() === "" || $("quest8").val() === "" ||
            $("quest9").val() === "" || $("quest10").val() === "") {
            valid = false;
        };

        if (valid === true) {
            var newUser = {
                name: $("#name").val().trim(),
                photo: $("#photo").val().trim(),
                scores: [
                    $("#quest1").val(),
                    $("#quest2").val(),
                    $("#quest3").val(),
                    $("#quest4").val(),
                    $("#quest5").val(),
                    $("#quest6").val(),
                    $("#quest7").val(),
                    $("#quest8").val(),
                    $("#quest9").val(),
                    $("#quest10").val()
                ]
            };
            console.log(newUser.name);

            // Use AJAX to post data to friends API
            $.post("/api/friends", newUser, function (data) {
                // take name and photo from post to display in modal
                $("#matchName").text(data.name);
                $("#matchPhoto").attr("src", data.photo);
                // Show modal with match information
                $("#modalMatch").modal("toggle");
            });
        } else {
            alert("Please enter missing information. All fields must be complete.")
        }
        return false;
    });

})