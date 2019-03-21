var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table");

// create connection information to sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bamazon_db"
});

// connect to mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: ["View products for sale", "EXIT"]
        })
        .then(function (answer) {
            // call specific function based on user response
            if (answer.action === "View products for sale") {
                displayInventory();
            } else if (answer.action === "EXIT") {
                connection.end();
            } else {
                connection.end();
            }
        });
};

// function to display inventory for user
function displayInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // ask user which product they want to buy
        console.log('\n');
        console.table(results);
        console.log('\n');
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "input",
                    message: "Enter the product ID for the item you wish to buy."
                },
                {
                    name: "units",
                    type: "input",
                    message: "How many would you like to buy?"
                }
            ])
            .then(function (answer) {
                // get the information for the chosen item
                var item;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === parseInt(answer.choice)) {
                        item = results[i];
                    }
                }
                // determine if there is sufficient stock to fill order
                if (item.stock_quantity >= parseInt(answer.units)) {
                    var cost = answer.units * item.price;
                    console.log('\n');
                    console.log(`Congratulations! You bought ${answer.units} ${item.product_name} for $${cost}`);
                    console.log('\n');

                    connection.query("UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: item.stock_quantity - answer.units
                            },
                            {
                                item_id: answer.choice
                            }
                        ],
                        function (err) {
                            if (err) throw err;
                            start();
                        })
                } else {
                    console.log('Sorry, inventory is not sufficient to meet your order.');
                    displayInventory();
                }
            });
    });
}