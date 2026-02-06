

const API_URL = "http://localhost:3000/api";

// Vérifier si l'utilisateur est connecté
window.addEventListener('DOMContentLoaded', function () {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user) {
        window.location.href = 'login.html';
        return;
    }

    // Afficher les infos utilisateur
    document.getElementById('user-info').textContent = `Bonjour ${user.firstname} ${user.lastname}`;

    // Afficher le formulaire de création si admin
    if (user.role === 'admin') {
        document.getElementById('create-section').style.display = 'block';

    }

    // Charger les salles
    loadSalles();

});

// Déconnexion
document.getElementById('btn-logout').addEventListener('click', function () {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
});

//message sur la view
const messageDiv = document.getElementById("messageCreate");
const messageModif = document.getElementById("messageModif");

// Créer une salle
document.getElementById('form-create-salle').addEventListener('submit', async function (e) {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const capacity = document.getElementById('capacity').value;
    const description = document.getElementById('description').value;
    const pricePerDay = document.getElementById('pricePerDay').value;

    const token = localStorage.getItem('token');

    try {
        const response = await fetch(`${API_URL}/salles`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                name,
                capacity: parseInt(capacity),
                description,
                pricePerDay: parseFloat(pricePerDay)
            })
        });

        const data = await response.json();

        if (response.ok) {
            messageDiv.textContent = data.message;
            messageDiv.style.color = "green";
            document.getElementById('form-create-salle').reset();
            loadSalles();
        } else {
            messageDiv.textContent = data.message || "Erreur"
            messageDiv.style.color = "red";
        }

    } catch (error) {
        messageDiv.textContent = "Erreur serveur";
        messageDiv.style.color = "red";
    }
});

// Charger la liste des salles
async function loadSalles() {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    try {
        const response = await fetch(`${API_URL}/salles`);
        const data = await response.json();

        const sallesList = document.getElementById('salles-list');
        sallesList.innerHTML = '';

        if (data.data && data.data.length > 0) {
            console.log("test")
            data.data.forEach(salle => {
                const salleDiv = document.createElement('div');
                if (user.role === 'admin') {
                    salleDiv.innerHTML = `
                    <h3>${salle.name}</h3>
                    <p>Capacité: ${salle.capacity} personnes</p>
                    <p>Prix: ${salle.pricePerDay}€/jour</p>
                    <p>${salle.description || ''}</p>
                    <hr>
                    <button class="btn-edit" data-id="${salle._id}">Modifier</button>
                    <button class="btn-del" data-id="${salle._id}">Supprimer</button>`;
                    sallesList.appendChild(salleDiv);
                    // la seule maniere de recup salle._id pour des button differents
                    document.querySelector("button.btn-edit[data-id='" + salle._id + "']").addEventListener("click", showModal);
                    document.querySelector("button.btn-del[data-id='" + salle._id + "']").addEventListener("click", deleteRoom);


                } else {
                    salleDiv.innerHTML = `
                    <h3>${salle.name}</h3>
                    <p>Capacité: ${salle.capacity} personnes</p>
                    <p>Prix: ${salle.pricePerDay}€/jour</p> 
                    <p>${salle.description || ''}</p>
                    <form action="reserv.html" method="GET">
                    <input type="hidden" id="idRoom" name="idRoom" value="${salle._id}">
                    <button type="submit">Réserver</button>
                    </form>
                    <hr>`
                    console.log(salle)
                    sallesList.appendChild(salleDiv);
                }
            });
        } else {
            sallesList.innerHTML = '<p>Aucune salle disponible</p>';
        }

    } catch (error) {
        console.error("Erreur:", error);
    }
}

//MODIFIER UNE SALLE 

const favDialog = document.querySelector("#favDialog");
const newName = document.getElementById("newName");
const newCapacity = document.getElementById("newCapacity");
const newDescription = document.getElementById("newDescription");
const newPrice = document.getElementById("newPrice");


async function modifyRoom() {
    const token = localStorage.getItem("token"); //OBLIGATOIRE POUR UTILISATION TOKEN
    const id = favDialog.dataset.id; // RECUP L'ID STOCKER LORS DU CLIC
    try {
        const response = await fetch(`${API_URL}/salles/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                name: newName.value,
                capacity: parseInt(newCapacity.value),
                description: newDescription.value,
                pricePerDay: parseFloat(newPrice.value)
            })
        });
        const data = await response.json();
        if (response.ok) {
            favDialog.close();
            favDialog.classList.add("none");
            loadSalles();
            messageModif.textContent = data.message;
            messageModif.style.color = "green";
        }



    } catch (error) {
        messageModif.textContent = data.message;
        messageModif.style.color = "red";
    }
}

favDialog.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    modifyRoom()
});


//SUPPRIMER UNE SALLE
async function deleteRoom(e) {
    const token = localStorage.getItem("token");
    const btn = e.target;
    const id = btn.dataset.id;

    try {
        const reponse = await fetch(`${API_URL}/salles/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        })
        if (reponse.ok) {
            alert("Salle supprimée avec succès");
            loadSalles();
        }



    } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur lors de la suppression");
    }


}

// AFFICHAGE ET MODIF de la MODALE

function showModal(e) {
    const btn = e.target;

    //on recup l'id de la salle a modif
    const salleId = btn.dataset.id;

    //on recup directement le div parent
    const salleDiv = btn.parentElement;

    //recupere les infos deja enregistrer et a modif
    const name = salleDiv.querySelector("h3").textContent;
    const capacity = salleDiv.querySelectorAll("p")[0].textContent.match(/\d+/)[0];
    const price = salleDiv.querySelectorAll("p")[1].textContent.match(/\d+/)[0];
    const description = salleDiv.querySelectorAll("p")[2].textContent;

    //remplace les ancienne valeur par les nouvelle de la modale
    newName.value = name;
    newCapacity.value = capacity;
    newDescription.value = description;
    newPrice.value = price;

    //recup l'ID sur la modale
    favDialog.dataset.id = salleId;

    // afficher la modale
    favDialog.classList.remove("none"); // SUPPRIME LA CLASS NONE A LA MODALE
    favDialog.showModal();

    //fermeture de la modale et RE-passe la classe de la modale en NONE 
    favDialog.addEventListener("close", () => {
        favDialog.classList.add("none");
    });
}

