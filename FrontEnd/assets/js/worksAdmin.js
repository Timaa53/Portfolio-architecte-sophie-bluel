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
// Modal




// Fonctions
function mainContentDivModal(divclass, classListMainModal, hiddenmodal2) {
    const modal = document.querySelector(".modalDialog");
    const modalMain = document.createElement("div");
    modalMain.classList.add(divclass);
    modalMain.style.display = hiddenmodal2;
    modal.appendChild(modalMain);

    const headerModal = document.createElement("header");
    headerModal.classList.add("header-modal");
    modalMain.appendChild(headerModal);

    const mainModal = document.createElement("main");
    mainModal.classList.add(classListMainModal);
    modalMain.appendChild(mainModal);

    const footerModal = document.createElement("footer");
    footerModal.classList.add("footer-modal");
    modalMain.appendChild(footerModal);


    return modalMain
}


function buttonsTopModalDiv(display, modalClass) {
const headerModal = document.querySelector(modalClass);

    const btnTopModal = document.createElement("div");
    btnTopModal.classList.add("btn-top-modal");
    headerModal.appendChild(btnTopModal)

        // Création div + button + flèche retour modal-1
    const returnBtn = document.createElement("button");
        returnBtn.classList.add("return-modal-1");
        returnBtn.style.display = display;
        btnTopModal.appendChild(returnBtn);
        returnBtn.addEventListener("click",() => {
            const modal1 = document.querySelector(".modal-1");
            modal1.style.display = "flex";
            const modal2 = document.querySelector(".modal-2");
            modal2.style.display = "none";
            const form = document.querySelector(".main-modal-2 form");
            form.reset();
        })
        const returnBtnIcon = document.createElement("i");
        returnBtnIcon.classList.add("fa-solid", "fa-arrow-left");
        returnBtn.appendChild(returnBtnIcon);

        // Création div + button + croix fermeture modal
    const closeModal = document.createElement("button");
        closeModal.classList.add("close-modal");
        btnTopModal.appendChild(closeModal);

        closeModal.addEventListener("click",() => {
            const modal1 = document.querySelector(".modal-1");
            modal1.style.display = "flex";
            const modal2 = document.querySelector(".modal-2");
            modal2.style.display = "none";
            const form = document.querySelector(".main-modal-2 form");
            form.reset();
        })

        const closeModalIcon = document.createElement("i");
        closeModalIcon.classList.add("fa-solid", "fa-x");
        closeModal.appendChild(closeModalIcon);
        closeModal.addEventListener ("click", () => {modal.close();});

    return btnTopModal
}


function titleh3Modal(modalClass, text) {
    const headerModal = document.querySelector(modalClass);
    const titleModal = document.createElement("h3");
    titleModal.innerText = text;
    headerModal.appendChild(titleModal)

    return titleModal
}

function figuresContentModal1() { // Création des figures de la modal-1 dans main
    const mainModal1 = document.querySelector(".main-modal-1");

    // Création figure
    fetch('http://localhost:5678/api/works',)
    .then(response => response.json())
    .then((data) => {
    
        for (const work of data){
            let figure = document.createElement("figure");
            figure.id = (`${work.id}`);
            mainModal1.appendChild(figure);
    
            let img = document.createElement("img");
            img.src = work.imageUrl;
            img.alt = work.title;
            figure.appendChild(img);
    
    // Création bouton delete photos
            let removeWorksBtn = document.createElement("button");
            removeWorksBtn.classList.add("delete-work-btn");
            removeWorksBtn.id = (`${work.id}`);
            figure.appendChild(removeWorksBtn);
            
            removeWorksBtn.addEventListener ("click", () => {
                    fetch(`http://localhost:5678/api/works/${figure.id}`, {
                        method: "DELETE",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${localStorage.getItem("token")}`
                        },
                    })
                    .then((response) => {
                        if (response.ok) {
                        console.log (`Elément ${figure.id} supprimé!`)
                        figure.remove();
                        }else {
                        console.error(`Erreur de suppression: ${response.status}`)};
                        })
            .catch(error => console.error(error));
            });
        // Création icone poubelle
            const trashIcon = document.createElement("i");
            trashIcon.classList.add("fa-solid", "fa-trash-can");
            removeWorksBtn.appendChild(trashIcon);
        }
    })
    .catch(error => console.error(error));
}

function formModal2() {
    const mainModal2 = document.querySelector(".main-modal-2");
    
    const form = document.createElement("form");
    mainModal2.appendChild(form)

    const divsForm = ["work-photo-add", "work-title", "work-categories"]
    for (const div of divsForm) {
        const formDiv = document.createElement("div");
        formDiv.classList.add(div)
        form.appendChild(formDiv);
    }
    // Ajout éléments à la div work-photo-add
    const workPhotoAdd = document.querySelector(".work-photo-add");

    const workPhotoAddIcon = document.createElement("i");
    workPhotoAddIcon.classList.add("fa-regular", "fa-image");
    workPhotoAdd.appendChild(workPhotoAddIcon);

    const labelPhoto = document.createElement("label");
    labelPhoto.htmlFor = "photoInput";
    labelPhoto.textContent = "+ Ajouter photo";
    labelPhoto.style.cursor = "pointer";
    workPhotoAdd.appendChild(labelPhoto);

    const inputPhoto = document.createElement("input");
    inputPhoto.type = "file";
    inputPhoto.id = labelPhoto.htmlFor;
    inputPhoto.name = "photo";
    inputPhoto.accept = "image/jpeg, image/png";
    inputPhoto.required = true;
    inputPhoto.style.display = "none";
    workPhotoAdd.appendChild(inputPhoto);
    inputPhoto.addEventListener ("change", function () {
        if (this.files.length > 0) {
            console.log("Fichier sélectionné : " + this.files[0].name);
        }
    })

    const pPhoto = document.createElement("p");
    pPhoto.classList.add("filesRestrictions");
    pPhoto.textContent = "jpg, png: 4mo max";
    workPhotoAdd.appendChild(pPhoto);

    // Ajout éléments à la div work-title
    const workTitle = document.querySelector(".work-title");

    const labelTitle = document.createElement("label");
    labelTitle.htmlFor = "titleInput";
    labelTitle.textContent = "Titre";
    workTitle.appendChild(labelTitle);

    const inputTitle = document.createElement("input");
    inputTitle.type = "text";
    inputTitle.id = labelTitle.htmlFor;
    inputTitle.name = "title";
    inputTitle.required = true;
    workTitle.appendChild(inputTitle);

    // Ajout éléments à la div work-categories
    const workCategories = document.querySelector(".work-categories");

    const labelCategories = document.createElement("label");
    labelCategories.htmlFor = "categories";
    labelCategories.textContent = "Catégories";
    workCategories.appendChild(labelCategories);

    const selectCategories = document.createElement("select");
    selectCategories.id = labelCategories.htmlFor;
    selectCategories.name = "categories";
    selectCategories.required = true;
    workCategories.appendChild(selectCategories);

    fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then((data) => {
        const categories = [{ id: "", name: ""}, ...data];
        for (const category of categories)  {
            const selectOption = document.createElement("option");
            selectOption.value = (`${category.name}`);
            selectOption.textContent = (`${category.name}`);
            selectCategories.appendChild(selectOption);
        }
    }).catch(error => console.error(error));
}

function footerButtonModal1() {
    const footerModal = document.querySelector(".modal-1 .footer-modal")

    const buttonBottom = document.createElement("button");
        buttonBottom.classList.add("btn-bottom-modal");
        buttonBottom.innerText = "Ajouter une photo";
        footerModal.appendChild(buttonBottom);

    buttonBottom.addEventListener("click", () => {
        const modal1 = document.querySelector(".modal-1");
        const modal2 = document.querySelector(".modal-2");
        modal1.style.display = "none";
        modal2.style.display = "flex";
    })
}

function footerButtonModal2() {
    const footerModal = document.querySelector(".modal-2 .footer-modal")

    const buttonBottom = document.createElement("button");
        buttonBottom.classList.add("btn-bottom-modal");
        buttonBottom.innerText = "Valider";
        buttonBottom.disabled = true;
        buttonBottom.style.backgroundColor = "#A7A7A7";
        footerModal.appendChild(buttonBottom);
///////////////////////////////////////////////////////////////////////////////////////////////

    function buttonBottomColor() { //Modification dynamique du bouton VALIDER de la modal-2

        const inputPhoto = document.getElementById("photoInput");
        inputPhoto.addEventListener("change", buttonBottomColor);
        const inputTitle = document.getElementById("titleInput")
        inputTitle.addEventListener("input", buttonBottomColor);
        const selectCategories = document.getElementById("categories")
        selectCategories.addEventListener("change", buttonBottomColor);


        if (inputPhoto.files.length > 0 && inputTitle.value.trim() !== "" && selectCategories.value !== "") {
            buttonBottom.disabled = false;
            buttonBottom.style.backgroundColor = "#1D6154"; // Bouton vert & activé
        } else {
            buttonBottom.disabled = true;
            buttonBottom.style.backgroundColor = "#A7A7A7"; // Bouton gris & désactivé
        }
    };
    buttonBottomColor();

    ////////////////////////////////////////// A revoir, ne fonctionne pas//////////////////////////////////////////
    const returnBtn = document.querySelector(".return-modal-1");
        returnBtn.addEventListener("click", () => {
            buttonBottom.disabled = true;
            buttonBottom.style.backgroundColor = "#A7A7A7";
        });
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    buttonBottom.addEventListener("click", async (event) => {
        event.preventDefault();

        const newWork = {
            image: event.target.querySelector("[name=photo]").value,
            titre: event.target.querySelector("[name=title]").value,
            categorie: event.target.querySelector("[name=categories]").value,
        }
    
        fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newWork)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Envoi réalisé: ", data); //////////a modifier

            const form = document.querySelector(".main-modal-2 form");
            form.reset();
        }).catch(error => console.error(error));
    })
}


// Modal 1
function modal1Content() {
    mainContentDivModal("modal-1", "main-modal-1");
    buttonsTopModalDiv("none", ".modal-1 .header-modal");
    titleh3Modal(".modal-1 .header-modal", "Galerie photo");
    figuresContentModal1();
    footerButtonModal1();

}
modal1Content();

// Modal 2
function modal2Content() {
    mainContentDivModal("modal-2", "main-modal-2", "none");
    buttonsTopModalDiv("block", ".modal-2 .header-modal");
    titleh3Modal(".modal-2 .header-modal", "Ajout photo");
    formModal2();
    footerButtonModal2();
}
modal2Content();


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

        const buttonBottom = document.querySelector(".modal-2 .btn-bottom-modal");
        buttonBottom.disabled = true;
        buttonBottom.style.backgroundColor = "#A7A7A7";
    });
    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            const modal1 = document.querySelector(".modal-1");
            modal1.style.display = "flex";
            const modal2 = document.querySelector(".modal-2");
            modal2.style.display = "none";
            const form = document.querySelector(".main-modal-2 form");
            form.reset();

            const buttonBottom = document.querySelector(".modal-2 .btn-bottom-modal");
            buttonBottom.disabled = true;
            buttonBottom.style.backgroundColor = "#A7A7A7";

            modal.close();
        };
    });