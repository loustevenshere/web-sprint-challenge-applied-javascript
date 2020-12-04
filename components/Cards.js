// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.

const cardsContainer = document.querySelector('.cards-container');
axios
.get('https://lambda-times-api.herokuapp.com/articles')
.then(res => {
    console.log(res.data.articles);
    const cardData = res.data.articles;
    for(let data in cardData){
        cardData[data].forEach(item => {
            let myData = cardMaker(item)
            cardsContainer.appendChild(myData)
        });
    }
})
    // for (let item in res.data.articles) {
    //     console.log(item);
    //     }

    //**Ask why code below creates an extra unwanted card

    // const values = Object.values(res.data.articles);
    // console.log(values);
    // for(var i = 0; i < values.length; i++) {
    //     for(var j=0; j < values[i].length; j++) {
    //         cardsContainer.appendChild(cardMaker(values[i][j]));
    //     }
    // }
    // cardsContainer.appendChild(cardMaker(values));
    // })
     
.catch(err => {
    console.log(err);
    //debugger;
})



function cardMaker({headline, authorPhoto, authorName}) {
    //HTML elements
    const card = document.createElement('div');
    const headLine = document.createElement('div');
    const authorContainer = document.createElement('div');
    const imgContainer = document.createElement('div');
    const img = document.createElement('img');
    const theAuthorName = document.createElement('span');

    //Hierarchy
    card.appendChild(headLine);
    card.appendChild(authorContainer);
    authorContainer.appendChild(imgContainer);
    imgContainer.appendChild(img);
    authorContainer.appendChild(theAuthorName);

    //Class names
    card.classList.add('card');
    headLine.classList.add('headline');
    authorContainer.classList.add('author');
    imgContainer.classList.add('img-container')

    //Content 
    headLine.innerHTML = headline;
    img.src = authorPhoto;
    theAuthorName.textContent = `By: ${authorName}`;

    //Event handler
    card.addEventListener('click', () => {
        console.log(headLine.textContent);
    })

    return card;

}