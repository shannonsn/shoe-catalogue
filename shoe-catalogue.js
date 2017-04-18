var shoes = []
localStorage.getItem('shoes', JSON.stringify(shoes));

if (localStorage.getItem('shoes')) {
    shoes = JSON.parse(localStorage.getItem('shoes'));
}

var output = document.querySelector('.output').innerHTML
var outputs = Handlebars.compile(output);

function searchFunction() {

    var colors = document.querySelector('#shoeColor').value;
    var sizes = document.querySelector('#shoeSize').value;

    var sStock = [];

    var stockWasFound = false;

    if (colors !== "" && sizes !== "") {
        for (var i = 0; i < shoes.length; i++) {

            var object = shoes[i];
            if (colors === object.color && sizes === object.size) {
                sStock.push(object)
                stockWasFound = true;
            }

            if (stockWasFound === false) {
                document.querySelector("#display").innerHTML = "<h2>Sorry, We are currently out of stock.</h2>";
            } else {
                var data = {
                    shoes: sStock
                };
                document.querySelector('#display').innerHTML = outputs(data);
            }
            document.getElementById('shoeColor').value = "";
            document.getElementById('shoeSize').value = "";
        }
    } else {
        for (var i = 0; i < shoes.length; i++) {

            var object = shoes[i];
            if (colors === object.color || sizes === object.size) {
                sStock.push(object)
                stockWasFound = true;
            }
            if (stockWasFound === false) {
                document.querySelector("#display").innerHTML = "<h2>Sorry, We are currently out of stock.</h2>";
            } else {
                var data = {
                    shoes: sStock
                };
                document.querySelector('#display').innerHTML = outputs(data);
            }
            document.getElementById('shoeColor').value = "";
            document.getElementById('shoeSize').value = "";
        }
    }

}

var stockTemplateText = document.querySelector('.show').innerHTML
var stockTemplate = Handlebars.compile(stockTemplateText);

function showStock() {
    document.querySelector('#displays').innerHTML = stockTemplate({
        shoes: shoes
    });
}

function hideStock() {
    document.querySelector('#displays').innerHTML = '';
}

function adding() {
    var color = document.querySelector('#inColor').value
    var size = document.querySelector('#inSize').value
    var stock = document.querySelector('#inStock').value
    var price = document.querySelector('#inPrice').value

    var newStock = {
        color: color,
        price: price,
        in_stock: stock,
        size: size,
    }

    shoes.push(newStock)

    localStorage.setItem('shoes', JSON.stringify(shoes));
    storedShoes = JSON.parse(localStorage.getItem('shoes'));

    if (color.length > 0 || size.length > 0 || stock.length > 0 || price.length > 0) {
        document.querySelector('#displays').innerHTML = stockTemplate({
            shoes: shoes
        });

        document.querySelector('#inColor').value = '';
        document.querySelector('#inSize').value = '';
        document.querySelector('#inStock').value = '';
        document.querySelector('#inPrice').value = '';

    }
}
