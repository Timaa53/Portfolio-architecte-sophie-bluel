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
    
        //Création de boutons
    export function creerFiltreBouton (work) {
        let button = document.createElement("button");
        button.textContent = work;
        button.className = work;
    
        return button
    };
    
    // Récupération dynamique des travaux et affichage auto dans <div class="gallery">
    let works = [];
    let worksCategories = [];
    const containerGallery = document.querySelector(".gallery");
    const buttons = document.querySelector(".btn-filters");
    
    fetch('http://localhost:5678/api/works', {
        method: "GET",
        headers: {"Content-Type": "application/json"},
    })
        .then(response => response.json())
        .then((data) => {
            works = data;
            worksCategories = ["Tous", ...new Set(data.map(work => work.category.name))];
    
        for (const work of data){
            containerGallery.appendChild(creerFigure(work));
        }
        
        for (const worksButtons of worksCategories) {
        buttons.appendChild(creerFiltreBouton(worksButtons));
        }
        
        // Ecouteurs d'évènements au clic des boutons de la nav btn-filters
        const buttonsWorksFilter = document.querySelectorAll(".btn-filters button");
    
        for (const button of buttonsWorksFilter) {
            button.addEventListener("click", () => {
        // Modification dynamique des styles des boutons
                for (const btn of buttonsWorksFilter) {
                    btn.classList.remove("active");
                }
                button.classList.add("active");
    
                containerGallery.innerHTML = "";
    
        // Tri des travaux au clic
                if (button.classList.contains("Tous")) {
                    for (let work of works){
                        containerGallery.appendChild(creerFigure(work));
                    }
                }
                else if (button.classList.contains("Objets")) {
                    const objetsFilter = works.filter(work => work.category.name === "Objets");
                    for (const work of objetsFilter) {
                        containerGallery.appendChild(creerFigure(work));
                    }
                }
                else if (button.classList.contains("Appartements")) {
                    const appartementsFilter = works.filter(work => work.category.name === "Appartements");
                    for (const work of appartementsFilter) {
                        containerGallery.appendChild(creerFigure(work));
                    }
                }
                else if (button.classList.contains("Hotels & restaurants")) {
                    const hotelsRestaurantsFilter = works.filter(work => work.category.name === "Hotels & restaurants");
                    for (const work of hotelsRestaurantsFilter) {
                        containerGallery.appendChild(creerFigure(work));
                    }
                };
            });
        };
        })
        .catch(error => console.error(error));
