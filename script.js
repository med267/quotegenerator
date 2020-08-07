// const fetch = require("node-fetch"); // Needed this when testing without html documentd

console.log('testing quote generator...');

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// Show loading
function showLoadingIconHideQuote (){
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function quoteLoadedNowhideLoader (){
  if(!loader.hidden){
    quoteContainer.hidden = false; // show quote
    loader.hidden = true; // hide loader
  }

}

const getQuote = async () => {
  showLoadingIconHideQuote();
  const proxyUrl = 'https://ancient-caverns-95938.herokuapp.com/'
  const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
  try {
    const response = await fetch(proxyUrl + apiUrl, { headers: {'Origin': 'X-Requested-With'}});
    const data = await response.json();

// If author is empty we sub in text 'Unknown'
    if(data.quoteAuthor === ''){
      quoteAuthor.innerText = 'Unknown';
    } else {
      quoteAuthor.innerText = data.quoteAuthor;
    }
// If quote text is more than 50 chars we add different styling (smaller font)
// before displaying text....otherwise we remove that class b4 displaying

    if(data.quoteText.length > 120){
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }
    quoteText.innerText = data.quoteText;
    // console.log(data);

    // Stop loader & show quote
    quoteLoadedNowhideLoader();
    // Lets throw fake error to build a check to see if it gets an error it will try 5 times and exit
    // throw new Error('oops');
    } catch(error) {
      console.log('whoops, no quote', error);
      getQuote();
      }
    }

function tweetQuote(){
  const quote = quoteText.innerText;
  const author = quoteAuthor.innerText;
  const twitterUrl = `https://www.twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
// onload comes last so function is declared first above before function is called

getQuote();
