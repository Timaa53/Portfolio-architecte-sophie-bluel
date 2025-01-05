// Fonctions
//Création de figures
export function creerFigure(work) {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    img.src = work.imageUrl;
    img.alt = work.title;
    figure.appendChild(img);

    let title = document.createElement("figcaption");
    title.innerText = work.title;
    figure.appendChild(title);

    containerGallery.appendChild(figure);
    return figure
}

// Récupération dynamique des travaux et affichage auto dans <div class="gallery">
let works = [];
const containerGallery = document.querySelector(".gallery");

fetch('http://localhost:5678/api/works', {
    method: "GET",
    headers: {"Content-Type": "application/json"},
})
    .then(response => response.json())
    .then((data) => {
        works = data;

    for (let work of data){
        containerGallery.appendChild(creerFigure(work));
    }
    })
    .catch(error => console.error(error));


// Ecouteurs d'évènements au clic des boutons de la nav btn-filters
const buttons = document.querySelectorAll(".btn-filters button");

for (const button of buttons) {
    button.addEventListener("click", () => {
// Modification dynamique des styles des boutons
        for (const btn of buttons) {
            btn.classList.remove("active");
        }
        button.classList.add("active");

        containerGallery.innerHTML = "";

// Tri des travaux au clic
        if (button.classList.contains("all-works")) {
            for (let work of works){
                containerGallery.appendChild(creerFigure(work));
            }
        };
        if (button.classList.contains("objets-btn")) {
            const objetsFilter = works.filter(work => work.category.name === "Objets");
            for (const work of objetsFilter) {
                containerGallery.appendChild(creerFigure(work));
            }
        };
        if (button.classList.contains("appartements-btn")) {
            const appartementsFilter = works.filter(work => work.category.name === "Appartements");
            for (const work of appartementsFilter) {
                containerGallery.appendChild(creerFigure(work));
            }
        }; 
        if (button.classList.contains("hotels-restaurants-btn")) {
            const hotelsRestaurantsFilter = works.filter(work => work.category.name === "Hotels & restaurants");
            for (const work of hotelsRestaurantsFilter) {
                containerGallery.appendChild(creerFigure(work));
            }
        };
    });
};