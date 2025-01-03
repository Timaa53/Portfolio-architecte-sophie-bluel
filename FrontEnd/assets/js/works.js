// Récupération dynamique des travaux et affichage auto dans <div class="gallery">
fetch('http://localhost:5678/api/works', {
    method: 'GET',
    headers: {"Content-Type": "application/json"},
})
    .then(response => response.json())
    .then((data) => {
        let containerGallery = document.querySelector(".gallery")
    for (work of data){
        let figure = document.createElement("figure")

        let img = document.createElement("img")
        img.src = work.imageUrl
        img.alt = work.title
        figure.appendChild(img)

        let title = document.createElement("figcaption")
        title.innerText = work.title
        figure.appendChild(title)

        console.log(figure)
        containerGallery.appendChild(figure);
    }
    })
    .catch(error => console.error(error));


// Ecouteurs d'évènements des boutons pour styles CSS au click
const buttons = document.querySelectorAll(".btn-filters button");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active"));
        
        button.classList.add("active");
    });
});

// Ecouteurs d'évènements des boutons pour tri catégories au click
