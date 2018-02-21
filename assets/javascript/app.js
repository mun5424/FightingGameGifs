//"use strict";

var APIKey = "1eCtIz0EKImVAwVYkG8vKrsw8Dpx34JI";
var games = ["Street Fighter V", "Tekken 7", "Marvel VS Capcom Infinite", "Dragonball Fighterz", "Guilty Gear", "King of Fighters"];

function renderGames() {
    $("#buttons").empty();
    for (i = 0; i < games.length; i++) {
        var b = $("<button>");
        b.addClass("btn btn-primary");
        b.attr("data-name", games[i]);
        b.text(games[i]);
        $("#buttons").append(b);
    }
}

$("#add-game").on("click", function (event) {
    event.preventDefault();
    var game = $("#game-form").val().trim();
    games.push(game);
    renderGames();
});

$(document).on("click", ".btn, .btn-primary", function () {
    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + $(this).text() + "&limit=10"
        + "&api_key=" + APIKey;

    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function (response) {
        var gifs = response.data;
        for (i = 0; i < gifs.length; i++) {
            var gif = gifs[i];
            var div = $("<div>");
            div.addClass("image-div");
            var p = $("<p>");
            p.addClass("image-rating");
            p.text("Rating: " + gif.rating);
            var image = $('<img src="' + gif.images.fixed_height_still.url + '" />');
            image.addClass("gif");
            image.attr("data-state", "still");
            image.attr("data-still", gif.images.fixed_height_still.url);
            image.attr("data-animate", gif.images.fixed_height.url);
            div.append(p);
            div.append(image);
            $('#images').prepend(div);
        }
    });
});

$(document).on("click", ".gif", function () {
    var gif = $(this);
    var state = gif.attr("data-state");
    if (state === "still") {
        var animateUrl = gif.attr("data-animate");
        gif.attr("src", animateUrl);
        gif.attr("data-state", "animate");
    } else {
        var stillUrl = gif.attr("data-still");
        gif.attr("src", stillUrl);
        gif.attr("data-state", "still");
    }
});

renderGames();