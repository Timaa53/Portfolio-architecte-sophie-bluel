/////////// Connexion Administrateur OK ///////////

// Fonctions
function adminElements(text) { // Création div pour gestion des travaux
    // div
    const divModalLinks = document.createElement("div");
    divModalLinks.classList.add("modal-links");

    
    // Balise a
    const baliseA = document.createElement("a");
    baliseA.href = "#modal-main";
    baliseA.classList.add ("modal");
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
//////////////////////////////////////////////////////////////////////////////
// Modale
    // Fonctions modale
function creerModalContent (modalClass) {
    let modalContent = document.createElement("div");
    modalContent.classList.add(modalClass);

        const topBtnModal = document.createElement("div");
        topBtnModal.classList.add("btn-top-modal");
        modalContent.appendChild(topBtnModal);

            const returnBtn = document.createElement("button");
            returnBtn.classList.add("return-modal");
            topBtnModal.appendChild(returnBtn);
            const returnBtnIcon = document.createElement("i");
            returnBtnIcon.classList.add("fa-solid", "fa-arrow-left");
            returnBtn.appendChild(returnBtnIcon);

            const closeModal = document.createElement("button");
            closeModal.classList.add("close-modal");
            topBtnModal.appendChild(closeModal);
            const closeModalIcon = document.createElement("i");
            closeModalIcon.classList.add("fa-solid", "fa-x");
            closeModal.appendChild(closeModalIcon);
            closeModal.addEventListener ("click", () => {modal.close();});


        return modalContent
    }

function Titleh3Modal (text) {
    const TitleH3Modal = document.createElement("h3");
        TitleH3Modal.innerText = text;

    return TitleH3Modal
}

let figureDivModal = document.createElement("div");
function creerFigureDiv() {
    figureDivModal.classList.add("figures-modal");
    modal1.appendChild(figureDivModal)
}

function creerFigureModal(work) {
fetch('http://localhost:5678/api/works',)
.then(response => response.json())
.then((data) => {

    for (const work of data){
        let figure = document.createElement("figure");
        figure.id = (`${work.category.id}`);
        figureDivModal.appendChild(figure);

        let img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        figure.appendChild(img);

        // Création bouton delete photos
        let removeWorksBtn = document.createElement("button");
        removeWorksBtn.classList.add("photo-add-btn");
        removeWorksBtn.id = work.id;
        figure.appendChild(removeWorksBtn);

        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash-can");
        removeWorksBtn.appendChild(trashIcon);

        return figure
    }
})
.catch(error => console.error(error));
}

function buttonBottom (text) {
    const buttonBottom = document.createElement("button");
    buttonBottom.classList.add("btn-bottom-modal");
    buttonBottom.innerText = text;
    modal1.appendChild(buttonBottom);

    return buttonBottom
}

// Implémentation des éléments de la modale
const modal1 = creerModalContent ("modal-1");
function contentModal1() {
    const modal = document.querySelector(".modalDialog");
    modal.appendChild(modal1);

    const titleModal1 = Titleh3Modal ("Galerie photo", "modal-1");
    modal1.appendChild(titleModal1);

    creerFigureDiv();
    creerFigureModal();

    const buttonBottom1 = buttonBottom ("Ajouter une photo");
    modal1.appendChild(buttonBottom1);

}
contentModal1()
















// Modale

    // Ouverture/Fermeture modale
const modal = document.querySelector(".modalDialog");
const modalLinks = document.querySelectorAll(".modal");
const closeModal = document.querySelector(".close-modal");


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

