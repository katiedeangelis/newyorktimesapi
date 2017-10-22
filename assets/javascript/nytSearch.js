
$(document).ready(function () {

    //When the search button is clicked...
    $("#search").on('click', function () {

        var apiKey = 'b3bdc548c116497d8a4b344abf2d8721';

        //Set variables based on what user inputs into text fields
        var searchTerm = $("#searchTerm").val();
        var numberOfResults = $("#numberOfResults").val();
        var startYear = $("#startYear").val();
        var endYear = $("#endYear").val();

        //Convert numberOfResults to pagesRequested (API accepts # of pages and returns pages in sets of nine)
        pagesRequested = Math.floor(numberOfResults / 9);

        //Add logic to avoid pagesRequested from being 0
        if (pagesRequested > 1) {
            pagesRequested = Math.floor(numberOfResults / 9);
        } else {
            pagesRequested = 1;
        }

        //NY Time article search API URL
        var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

        //Inject parameters into URL
        queryURL += '?' + $.param({
            'api-key': apiKey,
            'q': searchTerm,
            'page': pagesRequested
        });

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function (response) {
            //Set results to the response object of the response to the API call
            var results = response.response;
            console.log(response);

            //For each article, create a well with the article title and prepend it to topArticles
            for (var i = 0; i < results.docs.length; i++) {
                console.log("working");

                var title = results.docs[i].headline.main;
                
                //Create a Bootstrap well and store it as variable
                var articleContainer = $("<div class='well well-lg'>");

                var currentArticleTitle = articleContainer.html(title);
                $("#topArticles").prepend(currentArticleTitle);
            }

        });

    });

});

