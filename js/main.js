'use strict';
////////// define variables

const searchName = document.querySelector ('.js-series-input');
const btnSeries = document.querySelector ('.js-btn-search');
const seriesContainer = document.querySelector ('.js-series-list');
const urlShow = '//api.tvmaze.com/search/shows?q=girls'; 

let series = [];

/////////  data request

fetch (urlShow)
.then ((response) => response.json ())
.then ((dataShow) => {
    renderSeriesList (dataShow);
});


///////paint HTML structure 

function renderSeries (series) {
    let htmlStructure = "";
   
    htmlStructure += `<li class="show">
    <div>
    <h2>${series.show.name}</h2>`;

    if (series.show.image!==null){
        htmlStructure +=`<img title="${series.show.name}" src="${series.show.image.medium}" alt="${series.show.name}"/>`
      }else{
        htmlStructure += `<img title="${series.show.name}" src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV" alt="${series.show.name}"/>`;
      }
    htmlStructure += `</div>
    </li>`;

    return htmlStructure

}

///////paint list 

function renderSeriesList (showList) {
    for (const series of showList) {
        seriesContainer.innerHTML += renderSeries (series); 
    }
}

///// collect input value

