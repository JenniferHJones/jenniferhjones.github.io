var CustomerId = localStorage.getItem("currentUser");


$.get("/api/tfyaccounts/" + CustomerId, function (data) {
  if(data !== null){
  $(".user-block-name").text(data.fName);
  }
});

//Set up account
$("#setUpAcctBtn").on("click", function (event) {

  var setUpAcct = {
    bankName: $("#bank-name")
      .val()
      .trim(),
    bankAcctNo: $("#bank-acctnum")
      .val()
      .trim(),
    billingAddress: $("#billing-address")
      .val()
      .trim(),
    zip: $("#zip")
      .val()
      .trim(),
    CustomerId: CustomerId
  };

  if (setUpAcct.bankName === "" || setUpAcct.bankAcctNo === "" || setUpAcct.billingAddress === "" || setUpAcct.zip === "") {

    $(".lead").text("Please provide the account details.");
    $("#alertModal").modal("show");
  } else {

    $.post("/api/setupacct", setUpAcct)
      // On success, run the following code
      .then(function (data) {
        $(".lead").text("Your account set up successfully!");
        $("#alertModal").modal("show");
        $("#bank-name").val("");
        $("#bank-acctnum").val("");
        $("#billing-address").val("");
        $("#zip").val();
        $("#setupAcctModal").modal("hide");
      });
  }
});


$("#transfer-tab").on("click", function (event) {


  $.get("/api/bankaccount/" + CustomerId, function (data) {
    if (data !== null) {

      $("#id-fromacct").val(data.bankAcctNo);
      $.get("/api/tfyaccounts/" + CustomerId, function (data) {
        $("#id-toacct").val(data.tradeAcct);
      });
    }
  });
  $("#walletModal").modal("show");
});

// buy modal
$("#buyModal").on("show.bs.modal", function (event) {
  $(".qnt-err-text").text("");
  $.get("/api/tfyaccounts/" + CustomerId, function (data) {
    if (data != "") {
    
      $("#id-acct").val(data.tradeAcct);
      $.get("/api/vw_CustomerBalance/" + CustomerId, function (data) {
      if(data === null)
      {
        data = 0;
      }
          $("#cash").val(data);
      });

    }
  });
});

//transfer money
$("#transferBtn").on("click", function (event) {
  event.preventDefault();
  var fromAcct = $("#id-fromacct").val().trim();
  var newTransfer = {
    creditAmount: $("#trans-amount")
      .val()
      .trim(),
    debitAmount: 0,
    transfer_date: $("#trans-date")
      .val()
      .trim(),
    CustomerId: CustomerId
  };

  if (fromAcct === "" || newTransfer.creditAmount === "" || newTransfer.transfer_date === "") {

    $(".lead").text("Please provide the date and amount.");
    $("#alertModal").modal("show");
  } else {
    $.post("/api/transfer", newTransfer)
      // On success, run the following code
      .then(function (data) {
       
        $(".lead").text("Transfer successfull!");
        $("#alertModal").modal("show");
        $("#trans-date").val("");
        $("#trans-amount").val("");
        $("#walletModal").modal("hide");
      });
  }
});

//Seach Stock Symbol
$("#searchSymbol").on("click", function (event) {
 
  $(".qnt-err-text").text("");
  var symbol = $("#symbol-text")
    .val()
    .trim();
 
     var symbolArr = ["MSFT","AMZN","GOOGL","AMD","T"]

   if(symbolArr.indexOf(symbol.toUpperCase()) !== -1){

  $.get("/api/seachBySymbol/" + symbol, function (data) {

    if(data !==null){
      var marker = $("<span />").insertBefore("#currentPrice");
      $("#currentPrice")
        .detach()
        .attr("type", "text")
        .insertAfter(marker);
      marker.remove();

    var priceDelta = (Math.random() * parseFloat(data.close)) / 100;
    newClosePrice = (parseFloat(data.close) + parseFloat(priceDelta)).toFixed(2);
    var priceSpread = (
      (parseFloat(newClosePrice) * Math.random()) /
      500
    ).toFixed(2);
    
    $("#currentPrice").val(newClosePrice); //Current Price
    }

  });
}else{
  $(".qnt-err-text").text("Available stock symbols : MSFT, AMZN, GOOGL, AMD, T");
}
});

$("#symbol").on("click", function (event) {
  //get request
});

$("#order").on("click", function (event) {
  // var orderDetails;

  var account = $("#id-acct").val().trim();
  var availableCash = $("#cash").val().trim();
  var transactionType = $("#opt-trans").text().trim();
  var symbol = $("#symbol-text").val().trim().toUpperCase();
  console.log("symbol" + symbol);

  var action = $("#opt").text().trim();
  var quantity = $("#quantity").val().trim();
  var price = $("#currentPrice").val().trim();

  var isPass = orderFormValidation(account , transactionType, availableCash, symbol, action, quantity, price)
  
  if(isPass){
  if (action === "Buy") {
    placeOrderUpdateDb(transactionType, symbol, action, quantity, price);
  } else if (action === "Sell") {
    //Check customer input quantity is valid for sell
    try {
      $.get("/api/stockquantity/" + CustomerId + "/" + symbol, function (data) {
        console.log("quantity from database**" + data);
        if (quantity > data) {
          if (data === null || data === "") {
            data = 0;
          }
          $(".qnt-err-text").text("Available stock quantity for sell : " + data);
          throw "Please enter a valid quantity!";
      
        } else {
          placeOrderUpdateDb(transactionType, symbol, action, quantity, price);
        }

      });
    } catch (error) {
      console.error(error);
    }
  }
}

});

function placeOrderUpdateDb(transactionType, symbol, action, quantity, price) {

  var orderDetails ;
  var newTransferAmount = 0;
  
  if (action === "Buy") {
    orderDetails = {
      transactionType: transactionType,
      symbol: symbol,
      action: action,
      quantity: quantity,
      price: price,
      // ordertype :"Market Order",
      CustomerId: CustomerId
    };
    newTransferAmount = -1 * parseFloat(price) * parseFloat(quantity);;
  } else if (action === "Sell") {
    orderDetails = {
      transactionType: transactionType,
      symbol: symbol,
      action: action,
      quantity: -1 * quantity,
      price: price,
      // ordertype :"Market Order",
      CustomerId: CustomerId
    };
    newTransferAmount = parseFloat(price) * parseFloat(quantity);
  }

  var newTransferonOrder = {
    creditAmount: newTransferAmount,
    debitAmount: 0,
    transfer_date: new Date(),
    CustomerId: CustomerId
  };

  $.post("/api/order", orderDetails)
    // On success, run the following code
    .then(function (data) {
      console.log(data);
      //once order process successfully then update the transfer table with the amount
      $.post("/api/transfer", newTransferonOrder)
        // On success, run the following code
        .then(function (data) {
          console.log(data);
          $(".lead").text("Your order has been processed!");
          $("#alertModal").modal("show");
          $("#opt-trans").text("Select");
          $("action").text("Select");
          $("orderType").text("Select");
          $("#symbol-text").val("");
          $("#currentPrice").val("");
          $("#quantity").val("");
          $(".qnt-err-text").val("");
          $("#buyModal").modal("hide");
        });
    });
};

$("#update-profile").on("click", function (event) {
  //save the new email address
  var newEMail  = $("#mp-change-email").val().trim();
  if(newEMail ==="" || newEMail=== null){
    $(".email-err-text").text("Provide a new email address");
  }
  else{
      var customerData ={
        CustomerId: CustomerId,
        email: newEMail
      };
      $.ajax({
        method: "PUT",
        url: "/api/updateProfile",
        data: customerData
      }) .then(function (data) {
        $(".lead").text("Profile updated successfully");
        $("#alertModal").modal("show");
      });
  }
});

$("#symbol").on("click", function (e) {
  $("#symbol-text").removeClass();
});


$("#show-wallet").on("click", function (event) {
  //post request :save data in database
  $.get("/api/vw_CustomerBalance/" + CustomerId, function (data) {
    console.log("balance" + data);
    if(data === null)
    {
      data =0;
    }
    $("#wallet-amount").text("$" + data)
  });
});


// buy modal
$("#profileModal").on("show.bs.modal", function (event) {
  
  $.get("/api/tfyaccounts/" + CustomerId, function (data) {
    if(data!== null){
      var formattedDate = new Date(data.createdAt);
      formattedDate = moment(formattedDate).format("MM/DD/YYYY");
    $("#p-tradeAcct").val(data.tradeAcct);
    $("#p-name").val(data.fName);
    $("#p-email").val(data.email);
    $("#p-customerSince").val(formattedDate);
    }
  });

});

$("#manageProfileModal").on("show.bs.modal", function (event) {
  
  $("#mp-change-email").text("");
  $.get("/api/tfyaccounts/" + CustomerId, function (data) {
    if(data!== null){
    $("#mp-name").val(data.fName);
    $("#mp-email").val(data.email);
    }
  });

});

$("#manageAccountModal").on("show.bs.modal", function (event) {

  $.get("/api/bankaccount/" + CustomerId, function (data) {
  if(data!== null){
    $("#mc-bank-name").text("Bank Name : " + data.bankName);
    $("#mc-bank-acctnum").text("Bank Account : " + data.bankAcctNo);
    $("#mc-bank-address").text("Bank Address : " + data.billingAddress);
    $("#mc-bank-zip").text("Zip : " + data.zip);
  }   
  });
});


$("#mc-delete").on("click", function (e) {
  $("#mc-bank-name").text("");
  $("#mc-bank-acctnum").text("");
  $("#mc-bank-address").text("");
  $("#mc-bank-zip").text("");

});

$("#mc-update").on("click", function (e) {
  $("#manageAccountModal").modal("hide");
  $("#setupAcctModal").modal("show");


});

$("#chartSearch").on("click", function (event) {

  var symbol = $("#text-chart").val().trim();

  var dps = [];
  var chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    theme: "light3", // "light1", "light2", "dark1", "dark2"
    exportEnabled: true,
    title: {
      // text: "Stock Price "
    },
    axisX: {
      valueFormatString: "DD MMM"
    },
    axisY: {
      title: "Price",
      includeZero: false,
      prefix: "$"
    },
    data: [{
      type: "candlestick",
      //type: "ohlc",
      name: "Stock Price",
      color: "#DD7E86",
      showInLegend: true,
      yValueFormatString: "$##0.00",
      xValueType: "dateTime",
      dataPoints: dps
    }]
  });
  if (symbol !=="" || symbol !==null) {
    $.get("/api/stockDailyJSON/" + symbol, parseData);
  } else {
    $.get("/api/stockDailyJSON/" + DJI, parseData);
  }

  function parseData(result) {
    for (var i = 0; i < 100; i++) {
      dps.push({
        x: result[i].x,
        y: result[i].y
      });
    }
    chart.render();
    console.log(dps);
  }
});

function orderFormValidation(account , transactionType, availableCash, symbol, action, quantity, price){

  console.log("transactionType" + transactionType);
  console.log("availableCash" + availableCash);
  console.log("symbol" + symbol);
  console.log("action" + action);
  console.log("quantity" + quantity);
  console.log("price" + price);

  var isValidate = true;

  if (account === "" || account === null) {

    $(".qnt-err-text").text("Your tradefy account is null");
    isValidate =false;
   
  }else if(availableCash === "" || availableCash <= 0){

    $(".qnt-err-text").text("Please transfer money to tradefy account.");
    isValidate =false;
  }else if(transactionType === "Select"){

    $(".qnt-err-text").text("Please select Transaction Type.");
    isValidate =false;
  }else if(symbol === "" || symbol === null){

    $(".qnt-err-text").text("Please search a symbol.");
    isValidate =false;
  }else if(action === "Select"){

    $(".qnt-err-text").text("Please select action.");
    isValidate =false;
  }else if(quantity === "" || quantity === 0 ){

    $(".qnt-err-text").text("Please select quantity.");
    isValidate =false;
  }else if(price === "" || price === 0 ){

    $(".qnt-err-text").text("Please select quantity.");
    isValidate =false;
  }
  return  isValidate ;
}