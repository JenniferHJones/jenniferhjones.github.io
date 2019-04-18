$(document).ready(function () {

    $(".dashboard-click").on("click", function (event) {
        // script to append data to dashboard 
        var createRow = function (data) {

            $("#dashboard-body").empty();
            $(".todayGain").removeClass("red");
            $(".todayGain").removeClass("green");
            $(".totalGain").removeClass("red");
            $(".totalGain").removeClass("green");
            for (var i = 0; i < data.length; i++) {
                if (data[i].action === "Buy") {
                    //Mallika--added logic for dashboard
                    //Last Price : last market price
                    console.log("data here");
                    var closePrice = parseFloat(data[i].price);
                    var priceDelta = (Math.random() * parseFloat(data[i].price)) / 100;
                    console.log(priceDelta);
                    var lastPrice = (parseFloat(data[i].price) + parseFloat(priceDelta)).toFixed(2);
                    console.log(lastPrice);
                    //Ends Here
                    // calculate gains
                    // var dailyGain = Number(data[i].price - data[i].symbol.close);
                    var quantity = parseInt(data[i].SumQty);
                    console.log(quantity);
                    var avgPrice = parseFloat(data[i].SumResult)/quantity
                    console.log(avgPrice);
                    var dailyGain = ((Number(lastPrice - closePrice))*quantity).toFixed(2);
                    console.log(dailyGain);
                    var totalGain = ((Number(lastPrice - avgPrice)) * quantity).toFixed(2);
                    console.log(totalGain);
                    // var DeltaGainToday = Number(lastPrice - data[i].price)
                    // var DeltaGainToday = Number(lastPrice - data[i].price)


                    var currentValue = (lastPrice * quantity).toFixed(2);
                    var costBasis = parseFloat(data[i].SumResult);

                    var tableRow = $("<tr>");
                    tableRow.append($("<td>" + data[i].symbol + "</td>"));
                    tableRow.append($("<td>" + "$" + lastPrice + "</td>"));
                    // tableRow.append($("<td>" + "$" + data[i].price + "</td>"));
                    var className1 = "todayGain" + i;
                    var className2 = "totalGain" + i;

                    tableRow.append($("<td class='className1'>" + "$" + dailyGain + "</td>"));
                    tableRow.append($("<td class='className2'>" + "$" + totalGain + "</td>"));
                    tableRow.append($("<td>" + "$" + currentValue + "</td>"));
                    tableRow.append($("<td>" + data[i].SumQty + "</td>"));
                    tableRow.append($("<td>" + costBasis + "</td>"));

                    // change color of gain if - or +
                    if (dailyGain >= 0) {
                        $(".className1").css("color", "green");
                    } else if (dailyGain < 0) {
                        $(".className2").css("color", "green");

                    }

                    // if (totalGain >= 0) {
                    //     // $(".i").addClass("green");
                    //     $(".className2").css("color" , "green");
                    // } else if (totalGain < 0) {
                    //     // $(".totalGain").addClass("red");
                    //     $(".className2").css("color" , "red");

                    // }

                    $("#dashboard-body").append(tableRow);
                }

            }
        };

        var customerID = localStorage.getItem("currentUser");
        $.ajax({
            url: "/api/market/" + customerID,
            method: "GET"
        }).then(function (response) {
            createRow(response);
        });

    })
});