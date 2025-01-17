/////////// Connexion Administrateur OK ///////////

// Fonctions
function adminElements(text) { // Création div pour gestion des travaux
    // div
    const divModalLinks = document.createElement("div");
    divModalLinks.classList.add("modal-links");

    
    // Balise a
    const baliseA = document.createElement("a");
    baliseA.href = "#modal-main";
    baliseA.classList.add ("modalOpen");
    divModalLinks.appendChild(baliseA);

    // Balise i
    const iconI = document.createElement("i");
    iconI.classList.add ("fa-regular", "fa-pen-to-square");
    baliseA.appendChild(iconI);

    // Balise p
    const textP = document.createElement("p");
    textP.innerText = text;
    baliseA.appendChild(textP);

    return divModalLinks;
}

function adminElementsTopBar() { // Ajout div haut de page
    const divModalLinks = adminElements("Mode édition");
    divModalLinks.id = "editionmode-topbar"; // Ajout ID pour gestion CSS

    document.body.prepend(divModalLinks);
}

function loginLogout() { // Login devient Logout
    const logOut = document.getElementById("login-logout");
    logOut.textContent = "logout"
}


function portfolioDivAdd() { // Ajout div dans section PORTFOLIO + chgt emplacement titre H2
    const portfolio = document.getElementById("portfolio");

    // Modif emplacement titre H2
        // Suppression
        const portfolioTitle = portfolio.querySelector("h2");
        portfolioTitle.remove();
        // Ajout
        const h2MesProjets = document.createElement("h2");
    h2MesProjets.innerText = "Mes projets"
    
    const portfolioLink = adminElements("modifier");
    portfolio.prepend(portfolioLink)
    portfolioLink.prepend(h2MesProjets)
}

function hiddenButtonsFilters() { // Boutons filtres masqués
    const btnFilters = document.querySelector(".btn-filters");
    btnFilters.style.display = "none";
}

// Page modifiée si token = OK
const tokenOk = localStorage.getItem("token");
if (tokenOk) {
    adminElementsTopBar()
    loginLogout()
    portfolioDivAdd()
    hiddenButtonsFilters()
}







/*


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

    // Test pour modale
    function creerFigureModal(work) {
        let figure = document.createElement("figure");
        figure.id = (`${work.category.id}`)
        let img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        figure.appendChild(img);
    
        let title = document.createElement("figcaption");
        title.innerText = work.title;
        figure.appendChild(title);

        let trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash-can");
        figure.appendChild(trashIcon);
    
        const containerModal = document.getElementById("1");
        containerModal.appendChild(figure);
        return figure
    }

// Récupération et affichage dynamique des travaux
fetch('http://localhost:5678/api/works',)
.then(response => response.json())
.then((data) => {

    for (const work of data){
        creerFigure(work);
        creerFigureModal(work);
    }
})
.catch(error => console.error(error)); 

// Modale

    // Ouverture/Fermeture modale
const modal = document.getElementById("modal-main");
const modalLinks = document.querySelectorAll(".modalOpen");
const closeModal = document.getElementById("closemodal");
// const modalDiv = document.getElementById("1");


for (const link of modalLinks) {
    link.addEventListener ("click", (event) => {
        event.preventDefault();
        modal.showModal();
    });
};
closeModal.addEventListener ("click", () => {
    modal.close();
});
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.close();
    };
});
*/