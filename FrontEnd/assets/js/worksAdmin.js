// Fonctions
    //Création de figures
    function creerFigure(work) {
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

// Récupération et affichage dynamique des travaux
fetch('http://localhost:5678/api/works',)
.then(response => response.json())
.then((data) => {

    for (const work of data){
        creerFigure(work);
    }
})
.catch(error => console.error(error)); 

// Modale

    // Ouverture/Fermeture modale
const modal = document.getElementById("modal-main");
const modalLinks = document.querySelectorAll(".modalOpen");
for (const link of modalLinks) {
    link.addEventListener ("click", (event) => {
        event.preventDefault();
        modal.showModal();
    });
};
document.getElementById("closemodal").addEventListener ("click", () => {
    modal.close();
});
