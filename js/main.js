'use strict';
////////// define variables

const searchName = document.querySelector ('.js-series-input');
const btnSeries = document.querySelector ('.js-btn-search');
const seriesContainer = document.querySelector ('.js-series-list');
const urlShow = '//api.tvmaze.com/search/shows?q=girls'; 


/////////  data request

fetch (urlShow)
.then ((response) => response.json ())
.then ((dataShow) => {
    renderSeriesList (dataShow);
});


///////paint HTML structure 

function renderSeries (series) {
    let htmlStructure = "";

    htmlStructure = `<li class="show">
        <div>
         <h2>${series.show.name}</h2>
         <img title="" src="${series.show.image.medium}" alt="Es la imagen de la serie"/>
        </div> 
      </li>`;

    return htmlStructure
    
}

///////paint list 

function renderSeriesList (showList) {
    for (const series of showList) {
        seriesContainer.innerHTML += renderSeries (series); 
    }
}


