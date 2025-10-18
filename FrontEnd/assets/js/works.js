// Fonctions
    //Création de figures
    export function creerFigure(work) {
        let figure = document.createElement("figure");
        figure.id = (`${work.category.id}`)
        let img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        figure.appendChild(img);
    
        let title = document.createElement("figcaption");
        title.innerText = work.title;
        figure.appendChild(title);
    
        const containerGallery = document.querySelector(".gallery");
        containerGallery.appendChild(figure);
        return figure
    }
   
        //Création de boutons
    export function creerFiltreBouton (category) {
        let button = document.createElement("button");
        button.textContent = category.name;
        button.className = category.name;
        button.dataset.id = category.id;

        const buttons = document.querySelector(".btn-filters");
        buttons.appendChild(button);
        return button
    };

    


// Récupération et affichage dynamique des travaux

export function galleryWorks () {
    const containerGallery = document.querySelector(".gallery");
    containerGallery.innerHTML = "";

    fetch("https://sophie-bluel-architecte-5xpa.onrender.com/api/works",)
    .then(response => response.json())
    .then((data) => {

        for (const work of data){
            creerFigure(work);
        }
    })
    .catch(error => console.error(error)); 
};
galleryWorks ();




// Récupération des catégories, création des boutons et tri des travaux
fetch("https://sophie-bluel-architecte-5xpa.onrender.com/api/categories",)
.then(response => response.json())
.then((data) => {
    const categories = [{ id: null, name: "Tous" }, ...data];
    

    for (const category of categories) {
        const buttonsFilter = creerFiltreBouton(category)

        buttonsFilter.addEventListener("click", () => {
            const ButtonSelector = document.querySelectorAll(".btn-filters button");

            // Modification dynamique des styles des boutons au clic
            for (const btn of ButtonSelector) {
                btn.classList.remove("active");
            }
            buttonsFilter.classList.add("active");
            const figures = document.querySelectorAll(".gallery figure");
            
            // Tri dynamique des travaux
            for (const figure of figures) {
                if (category.id === null || figure.id === String(category.id)) {
                    figure.style.display = "block";
                } else {
                    figure.style.display = "none";
                };
            };
        });
    };
})
.catch(error => console.error(error));
