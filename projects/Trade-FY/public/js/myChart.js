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
        name: "Dow Jones Industrial Average",
        color: "#DD7E86",
        showInLegend: true,
        yValueFormatString: "$##0.00",
        xValueType: "dateTime",
        dataPoints: dps
      }]
    });
   
    $.get("/api/stockDailyJSON/" + "DJI", parseData);
    
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

  