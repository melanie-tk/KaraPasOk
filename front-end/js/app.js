const API_URL = "http://localhost:3000/api";

// Vérifier si l'utilisateur est connecté
window.addEventListener('DOMContentLoaded', function() {
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
document.getElementById('btn-logout').addEventListener('click', function() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = 'login.html';
});

// Créer une salle
document.getElementById('form-create-salle').addEventListener('submit', async function(e) {
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
                `;
                sallesList.appendChild(salleDiv);
            });
        } else {
            sallesList.innerHTML = '<p>Aucune salle disponible</p>';
        }

    } catch (error) {
        console.error("Erreur:", error);
    }
}