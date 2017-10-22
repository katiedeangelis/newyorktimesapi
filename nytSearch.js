

$("#search").on('click', function () {
    var apiKey = 'b3bdc548c116497d8a4b344abf2d8721';
    //Set this search term to the value of the form box 
    var searchTerm = $("searchTerm").text();
    console.log(searchTerm);

    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + apiKey + '?q=' + searchTerm;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (response) {
        var results = response.docs;
        var articleContainer = $("<div class='well well-lg'>");
        
        for (var i = 0; i > results.docs.length; i++) {
            var title = response.docs[i].headline.main;

            var currentArticle = articleContainer.html(title);
            $("#top-articles").prepend(currentArticle);
        }


    });


});

