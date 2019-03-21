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
            choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "EXIT"]
        })
        .then(function (answer) {
            // call specific function based on user response
            if (answer.action === "View Products for Sale") {
                viewProducts();
            } else if (answer.action === "View Low Inventory") {
                viewLowInventory();
            } else if (answer.action === "Add to Inventory") {
                addInventory();
            } else if (answer.action === "Add New Product") {
                addProduct();
            } else if (answer.action === "EXIT") {
                connection.end();
            } else {
                connection.end();
            }
        });
};

// function to display all products for sale
function viewProducts() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        console.log('\n');
        console.table(results);
        console.log('\n');
        start();
    });
};

// function to view inventory with less than 5 units
function viewLowInventory() {
    connection.query("SELECT * FROM products WHERE stock_quantity < 5", function (err, results) {
        if (err) throw err;
        console.log('\n');
        console.table(results);
        console.log('\n');
        start();
    });
};

// function to allow user to add units to current product list
function addInventory() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // ask user for which product they want to add units
        console.log('\n');
        console.table(results);
        console.log('\n');
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "input",
                    message: "Which product ID do you want to add inventory to?"
                },
                {
                    name: "units",
                    type: "input",
                    message: "How many units would you like to add?"
                }
            ])
            .then(function (answer) {
                var item;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].item_id === parseInt(answer.choice)) {
                        item = results[i];
                    }
                }
                console.log('\n');
                console.log(`The ${item.product_name} inventory was updated.`);
                console.log('\n');

                connection.query("UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: item.stock_quantity + parseInt(answer.units)
                        },
                        {
                            item_id: answer.choice
                        }
                    ],
                    function (err) {
                        if (err) throw err;
                        start();
                    })
            })
    })
};

// function to allow user to add new product to inventory
function addProduct() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        // ask user to add product details
        inquirer
            .prompt([
                {
                    name: "newProduct",
                    type: "input",
                    message: "What product would you like to add?"
                },
                {
                    name: "department",
                    type: "list",
                    message: "What department does this product belong to?",
                    choices: ["Books", "Electronics", "Gardening", "Housewares", "Kitchen"]
                },
                {
                    name: "price",
                    type: "input",
                    message: "What price do you want to assign this product?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many units do you want to add?"
                }
            ])
            .then(function (answer) {
                console.log('\n');
                console.log(`The inventory was updated.`);
                console.log('\n');
                connection.query("INSERT INTO products SET ?",
                    {
                        product_name: answer.newProduct,
                        department_name: answer.department,
                        price: answer.price,
                        stock_quantity: answer.quantity
                    },
                    function (err) {
                        if (err) throw err;
                        start();
                    })
            })
    })
};
