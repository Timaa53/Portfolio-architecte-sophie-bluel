const formListener = document.querySelector(".formulaire");

formListener.addEventListener("submit", async (event) => {
    const email = document.getElementById("email").value;
    const motDePasse = document.getElementById("password").value;

    const emailMdp = {"email": email, "motDePasse": motDePasse};

    const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(emailMdp)
    });

    if (response.ok) {
        const infosResponse = await response.json();
        console.log("ok", infosResponse)
    }else{
        console.log("erreur")
    }
});

// revoir le code depuis ligne 9 + cours "Sauvegardez les données grâce à une API HTTP"