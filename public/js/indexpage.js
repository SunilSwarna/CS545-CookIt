
$('#hideOils').hide()
$('#hideButton').hide()
$('#hideDairy').hide()
$('#hideMeat').hide()
$('#hideFruits').hide()
$('#hideVegetables').hide()
$('#hideGrains').hide()

$('#showB').hide()
$('#showFilter').hide()
$('#showFilterDup').hide()
$('#hideFilter').hide()
$('#mySelect').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {
    if (clickedIndex == 1) {
        $('#hideDairy').show()
        $('#hideOils').hide()
        $('#hideMeat').hide()
        $('#hideFruits').hide()
        $('#hideVegetables').hide()
        $('#hideGrains').hide()
    
    }
    if (clickedIndex == 2) {
        $('#hideDairy').hide()
        $('#hideOils').show()
        $('#hideMeat').hide()
        $('#hideFruits').hide()
        $('#hideVegetables').hide()
        $('#hideGrains').hide()
        $('#displayOils').selectpicker('deselectAll');

    }
    if (clickedIndex == 3) {
        $('#hideOils').hide()
        $('#hideDairy').hide()
        $('#hideMeat').show()
        $('#hideFruits').hide()
        $('#hideVegetables').hide()
        $('#hideGrains').hide()
    
    }
    if (clickedIndex == 4) {
        $('#hideOils').hide()
        $('#hideDairy').hide()
        $('#hideMeat').hide()
        $('#hideFruits').show()
        $('#hideVegetables').hide()
        $('#hideGrains').hide()
    
    }
    if (clickedIndex == 5) {
        $('#hideOils').hide()
        $('#hideDairy').hide()
        $('#hideMeat').hide()
        $('#hideFruits').hide()
        $('#hideVegetables').show()
        $('#hideGrains').hide()
    
    }
    if (clickedIndex == 6) {
        $('#hideOils').hide()
        $('#hideDairy').hide()
        $('#hideMeat').hide()
        $('#hideFruits').hide()
        $('#hideVegetables').hide()
        $('#hideGrains').show()
    
    }
    $('#hideButton').show()
});

$('#displayOils').on('changed.bs.select', function (e, clickedIndex, isSelected, previousValue) {

    // console.log($('#displayOils').val())
    // $('#hideOils').show()
    // var requestConfig = {
    //     method: "POST",
    //     url: "/ajax",
    //     contentType: "application/json",
    //     data: JSON.stringify({
    //       name: "Sunil",
    //       description: "Hi I am Sunil!"
    //     })
    //   };

    //   $.ajax(requestConfig).then(function(responseMessage) {
    //     console.log(responseMessage.message);
    //     window.location.href = "/"
    //     //                alert("Data Saved: " + msg);
    //   });

})


var submit = document.getElementById("addRecipie");


submit.addEventListener("click", (event) => {
    if (!$("#hideDairy").is(":hidden")) {
        var x = '#displayDairy'
    }
    else if (!$("#displayOils").is(":hidden")) {
        var x = '#displayOils'

    }
    else if (!$("#displayMeat").is(":hidden")) {
        var x = '#displayMeat'

    }
    else if (!$("#displayFruits").is(":hidden")) {
        var x = '#displayFruits'

    }
    else if (!$("#displayVegetables").is(":hidden")) {
        var x = '#displayVegetables'

    }
    else if (!$("#displayGrains").is(":hidden")) {
        var x = '#displayGrains'

    }
    event.preventDefault();
    let ingredtobeAdded = $(x).val()
    var list_ul = document.getElementById("ingredients");
    var items = list_ul.getElementsByTagName("li");
    var recipies = []
    for (var i = 0; i < items.length; ++i) {
        recipies.push(items[i].textContent)
    }

    if (ingredtobeAdded.length > 0) {
        $('#showP').hide()
        $('#showB').show()
        $('#showFilter').show()
        for (let i = 0; i < ingredtobeAdded.length; i++) {
            if (!recipies.includes(ingredtobeAdded[i])) {
                list_ul.innerHTML += '<li class="list-group-item d-flex justify-content-between">' +
                `<span class="mt-2">${ingredtobeAdded[i]}</span>`+
                    '<button class="icon-button" onClick="delete_ingredient(this)">' +
                    '<span style="color:red" class="glyphicon glyphicon-trash"></span></button>' +
                    '</li>';
            }

        }
    }

    $(x).selectpicker('deselectAll');
});

$('#showB').on('click', (event) => {
    var list_ul = document.getElementById("ingredients");
    var items = list_ul.getElementsByTagName("li");
    var recipies = []
    for (var i = 0; i < items.length; ++i) {
        recipies.push(items[i].textContent)
    }
    var requestConfig = {
        method: "POST",
        url: "/ajax",
        contentType: "application/json",
        data: JSON.stringify({
            recipies

        })
    };

    $.ajax(requestConfig).then(function (responseMessage) {
        window.location.href = "/getrecipies"

    });
});

$('#showFilter').on('click', (event) => {
    $('#hideFilter').show()
    $('#showFilterDup').show()
    $('#showFilter').hide()
});

$('#showFilterDup').on('click', (event) => {
    $('#hideFilter').hide()
    $('#showFilterDup').hide()
    $('#showFilter').show()
});

function delete_ingredient(e) {
    $(e).parent().remove();
    var list_ul = document.getElementById("ingredients");
    var items = list_ul.getElementsByTagName("li");
    if (items.length == 0) {
        $('#showP').show()
        $('#showB').hide()
        $('#showFilter').hide()
        $('#hideFilter').hide()

    }
}