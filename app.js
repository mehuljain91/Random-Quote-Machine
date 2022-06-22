let quotesData;

var currentQuote = ''
var currentAuthor = '';

function getQuotes() {
    return $.ajax({
        headers: {
            Accept: 'application/json'
        },
        url: 'https://gist.githubusercontent.com/mehuljain91/540dc9faf6c0d62dabe4980ae15b0a7d/raw/d9202fe11b92ca9b50798857bdbd5ed8b6263f36/quotes.json',
        success: function (jsonQuotes) {
            if (typeof jsonQuotes === 'string') {
                quotesData = JSON.parse(jsonQuotes);
                console.log('quotesData');
                console.log(quotesData);
            }
        }
    });
}

function getRandomQuote() {
    return quotesData.quotes[
        Math.floor(Math.random() * quotesData.quotes.length)
    ];
}

function getQuote() {
    let randomQuote = getRandomQuote();

    currentQuote = randomQuote.quote;
    currentAuthor = randomQuote.author;

    $('#quote-box').animate({ border: 'none' }, 500, function () {
        $(this).animate({ border: '2px solid white' })
    })

    $('.quote-text').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $('#text').text(randomQuote.quote);
    });

    $('.quote-author').animate({ opacity: 0 }, 500, function () {
        $(this).animate({ opacity: 1 }, 500);
        $('#author').html(randomQuote.author);
    });
}

$(document).ready(function () {
    getQuotes().then(() => {
        getQuote();
    });

    $('button').on('click', getQuote);
});
