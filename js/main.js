'use strict';
////////// define variables

const searchName = document.querySelector ('.js-series-input');
const btnSeries = document.querySelector ('.js-btn-search');
const seriesContainer = document.querySelector ('.js-series-list');
const favoritesContainer = document.querySelector ('.js-list-favorites');

////arrays
let showList= [];
let showFavorites = []; 


///////paint HTML structure 

function renderSeries (series) {
    let htmlStructure = "";
   
    htmlStructure += `<li class="show js-li" id="${series.show.id}">
    <div>
    <h2 class="showTitle">${series.show.name}</h2>`;
    if (series.show.image!==null){
        htmlStructure +=`<img title="${series.show.name}" src="${series.show.image.medium}" alt="${series.show.name}"/>`
      }else{
        htmlStructure += `<img title="${series.show.name}" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${series.show.name}"/>`;
      }

    htmlStructure += `</div>
    </li>`;

    return htmlStructure
}

///////paint series list and favorites list

function renderSeriesList (showList) {
    seriesContainer.innerHTML = "";
    for (const series of showList) {
        seriesContainer.innerHTML += renderSeries (series); 
    }
    addEventsToSeries ();
}

function renderFavoritesList (showFavorites) {
    favoritesContainer.innerHTML = "";
    for (const favorites of showFavorites) {
        favoritesContainer.innerHTML += renderSeries (favorites);
    }
    addEventsToSeries ();
}

function handleClickSelect(event){
    console.log (event.currentTarget.id);
    /////id the series selected as favorite
    const idSeries = event.currentTarget.id; 
    if (event.currentTarget.classList.contains('show')){
        event.currentTarget.classList.add('favorite');
        event.currentTarget.classList.remove('show');
    } else {
        event.currentTarget.classList.add('show');
        event.currentTarget.classList.remove('favorite');
    } 
    
    ///// find the id of the series the user has selected
    const showId = showList.find((series) => series.show.id == idSeries);
    console.log (showId); 

    ////find out if series are in the favorite list or not
    const indexSeries = showFavorites.findIndex ((series) => series.show.id == idSeries); 

    /////add or delete show in favorites list
    if (indexSeries === -1){
        showFavorites.push(showId);
    } else {
        showFavorites.splice(indexSeries, 1);
    }
    renderFavoritesList (showFavorites);
    localStorage.setItem('favorites', JSON.stringify(showFavorites));
}

////get favorites fromLS when the web starts
const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
console.log(savedFavorites);
if (savedFavorites !== null){
    showFavorites = savedFavorites; 
    renderFavoritesList (showFavorites); 
}


///////// handle function & data request searching
function handleSearch (event){
    event.preventDefault (); 
   ////API request 
    const valueInput = searchName.value; 
    fetch (`//api.tvmaze.com/search/shows?q=${valueInput}`)
    .then ((response) => response.json ())
    .then ((dataShow) => {
        showList = dataShow;
        console.log (dataShow);
        renderSeriesList (dataShow);
    });
   ////////filter when searching
    const searchedSeries = showList.filter (series =>series.name.toLowerCase.includes (valueInput.toLowerCase));
    renderSeriesList (searchedSeries); 
}


//////events (Search button and favorites click)
btnSeries.addEventListener("click", handleSearch);
////////place an event on every show to hear the click
function addEventsToSeries () {
    const listSeries = document.querySelectorAll('.js-li');
    console.log (listSeries);
    for (const series of listSeries) {
        series.addEventListener ('click', handleClickSelect)
    }

}

