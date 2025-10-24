const formListener = document.querySelector(".formulaire");

formListener.addEventListener("submit", async (event) => {
    event.preventDefault();

    const emailMdp = {
        email: event.target.querySelector("[name=email]").value,
        password: event.target.querySelector("[name=password]").value,
    }


    fetch("https://sophie-bluel-tdrq.onrender.com/api/users/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(emailMdp)
    })

    .then(response => {
        if (!response.ok) {throw new Error("Erreur dans l'identifiant ou le mot de passe");}
        return response.json();
    })
      .then(data => {
        // Stockage token et redirection homepage
        localStorage.setItem('token', data.token);
        window.location.href = "/FrontEnd/index.html";
      })
      .catch(error => {alert(error.message);});
});
