$(document).ready(function () {

  console.log("Ready");
  console.log($(".create"));

    $(".create").on("click", function(event) {
      event.preventDefault();
  
      var newBurger = {
        burger_name: $("#newB").val().trim(),
      };
  
      // Send the POST request.
      $.ajax("/api/burgers", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("Created new burger");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });
    
    $(".eat").on("click", function(event) {
      var id = $(this).data("id");
      var nowDevoured = {devoured: true};
  
      // Send the PUT request
      $.ajax("/api/burgers/" + id, {
        type: "PUT",
        data: nowDevoured
      }).then(
        function() {
          console.log("You ate the burger!");
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

    $(".trash").on("click", function(event) {
      var id = $(this).data("id");
  
      // Send the DELETE request.
      $.ajax("/api/burgers/" + id, {
        type: "DELETE"
      }).then(
        function() {
          console.log("Trashed burger", id);
          // Reload the page to get the updated list
          location.reload();
        }
      );
    });

})