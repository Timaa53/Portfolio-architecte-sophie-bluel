// Fichier temporaire, brouillon




// Fonctions
    //Création de figures
    export function creerFigure(work) {
        let figure = document.createElement("figure");
        figure.classList.add(`category${work.category.id}`)
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
        button.dataset.id = work.id;

        const buttons = document.querySelector(".btn-filters");
        buttons.appendChild(button);
        return button
    };

// variables globales
let works = [];
let categoriesNames = []; // Tableau des catégories par noms
let categoriesId = []; // Tableau des catégories par ID
const containerGallery = document.querySelector(".gallery");


// Récupération et affichage dynamique des travaux
fetch('http://localhost:5678/api/works',)
.then(response => response.json())
.then((data) => {
    works = data;
    
    for (const work of data){
        containerGallery.appendChild(creerFigure(work));
    }
})
.catch(error => console.error(error)); 

// Récupération des catégories et création des boutons
fetch('http://localhost:5678/api/categories',)
.then(response => response.json())
.then((data) => {
    categoriesNames = ["Tous", ...data.map(elementName => elementName.name)];
    categoriesId = (data.map(elementId => elementId.id));

    for (const button of categoriesNames) {
        const allButtons = creerFiltreBouton(button)

        allButtons.addEventListener("click", () => {
            const ButtonSelector = document.querySelectorAll(".btn-filters button");

            // Modification dynamique des styles des boutons au clic
            for (const btn of ButtonSelector) {
                btn.classList.remove("active");
            }
            allButtons.classList.add("active");
//------------------------------------------------------------------------------------
            const figures = document.querySelectorAll("figure"); 

        // Filtrer des figures en fonction de l'ID du bouton
            for (const figure of figures) {
                if (button.dataset.id !== figure.dataset.id) {
                    figure.style.display = "none";
                }
            };
        });
    };
})
.catch(error => console.error(error));