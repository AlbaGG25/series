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
    
    if (showFavorites.includes (series)){
        htmlStructure += `<li class="favorite js-li" id="${series.show.id}">`
    }else{
        htmlStructure += `<li class="show js-li" id="${series.show.id}">`
    }
    htmlStructure += `<div class="card"><h2 class="showTitle">${series.show.name}</h2>`; 
    if (series.show.image!==null){
        htmlStructure +=`<img title="${series.show.name}" class="showImage" src="${series.show.image.medium}" alt="${series.show.name}"/>`
      }else{
        htmlStructure += `<img title="${series.show.name}" class="showImage" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${series.show.name}"/>`;
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

////get favorites from LS when the web starts
const savedFavorites = JSON.parse(localStorage.getItem('favorites'));
console.log(savedFavorites);
if (savedFavorites !== null){
    showFavorites = savedFavorites; 
    renderFavoritesList (showFavorites); 
}


function handleClickSelect(event){
    console.log (event.currentTarget.id);
    ///// the series selected as favorite
    const idSeries = event.currentTarget.id; 
    
    ///// find the id of the series the user has selected
    const showId = showList.find((series) => series.show.id == idSeries);
    console.log (showId); 

    ////find out if series are in the favorite list or not
    const indexSeries = showFavorites.findIndex ((series) => series.show.id == idSeries); 

    /////add or delete show in favorites list
    if (indexSeries === -1){
        showFavorites.push(showId)
    } else {
        showFavorites.splice(indexSeries, 1)
    }

    renderFavoritesList (showFavorites);
    renderSeriesList (showList);
    localStorage.setItem('favorites', JSON.stringify(showFavorites));
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
     if (valueInput === ''){
        seriesContainer.innerHTML = '¡Ups, algo está fallando! Prueba a buscar de nuevo';
     }else{
        renderSeriesList (dataShow);
     }
    });

   ////////filter when searching
    const searchedSeries = showList.filter (series =>series.name.toLowerCase.includes (valueInput.toLowerCase));
    renderSeriesList (searchedSeries); 
}


//////events (Search button and favorites click)

//////search button
btnSeries.addEventListener('click', handleSearch);

////////place an event on series list to hear the click
function addEventsToSeries () {
    const listSeries = document.querySelectorAll('.js-li');
    console.log (listSeries);
    for (const series of listSeries) {
        series.addEventListener ('click', handleClickSelect)
    }

}

