



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
            alert(data.message);
            document.getElementById('form-create-salle').reset();
            loadSalles();
        } else {
            alert(data.message);
        }

    } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur lors de la création de la salle");
    }
});

// Charger la liste des salles
async function loadSalles() {
    try {
        const response = await fetch(`${API_URL}/salles`);
        const data = await response.json();

        const sallesList = document.getElementById('salles-list');
        sallesList.innerHTML = '';

        if (data.data && data.data.length > 0) {
            data.data.forEach(salle => {
                const salleDiv = document.createElement('div');
                salleDiv.innerHTML = `
                    <h3>${salle.name}</h3>
                    <p>Capacité: ${salle.capacity} personnes</p>
                    <p>Prix: ${salle.pricePerDay}€/jour</p>
                    <p>${salle.description || ''}</p>
                    <hr>
                    <button class="btn-edit" data-id="${salle._id}">Modifier</button>
                    <button class="btn-del" data-id="${salle._id}">Supprimer</button>
                    
                `;
                // la seule maniere de recup salle._id pour des button differents
                sallesList.appendChild(salleDiv);
                document.querySelector("button.btn-edit[data-id='" + salle._id + "']").addEventListener("click", showModal);
                
            });
        } else {
            sallesList.innerHTML = '<p>Aucune salle disponible</p>';
        }

    } catch (error) {
        console.error("Erreur:", error);
    }
}

//MODIFIER UNE SALLE 

const modifRoom = document.querySelector(".btn-edit");
const favDialog = document.querySelector("#favDialog");

const newName = document.getElementById("newName");
const newCapacity = document.getElementById("newCapacity");
const newDescription = document.getElementById("newDescription");
const newPrice = document.getElementById("newPrice");


async function modifyRoom() {
    const token = localStorage.getItem("token");
    try {
      
    } catch (error) {
        console.error("Erreur:", error);
    }
}


// SUPPRIMER UNE SALLE (MARCHE PO)
async function deleteRoom() {
    const token = localStorage.getItem("token");
    try {
  

        const reponse = await fetch(`${API_URL}/salles/` + btnDel.dataset.id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },

        })
        const btnDel = document.querySelector(".btn-del").addEventListener("click", async () => {
            console.log("clicker sur del")
            deleteRoom()
        });
    

        
    } catch (error) {
        console.error("Erreur:", error);
    }

}

function showModal(e) {
    // Query selector pour récupérer le parent contenant toute la modale
    // Enlève une classe "none" qui fait un display:none
    // Changer la value de tous les inputs par ceux de l'élément cliqué :
        // - Soit nouveau fetch avec l'id
        // - Soit récupération depuis le dom directement
    // Création du bouton de validation, ajout de l'event listener qui contiendra le fetch final de modif
    console.log(e.target.dataset.id);
}