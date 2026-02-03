const API_URL = "http://localhost:3000/api";

// Fonction pour se connecter
async function loginUser(email, password) {
    try {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login_mail: email,
                login_pass: password
            })
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur:", error);
        return { message: "Erreur de connexion" };
    }
}

// Fonction pour récupérer toutes les salles
async function getAllSalles() {
    try {
        const response = await fetch(`${API_URL}/salles`);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur:", error);
        return { message: "Erreur lors de la récupération des salles" };
    }
}

// Fonction pour créer une salle
async function createSalle(name, capacity, description, pricePerDay) {
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
                capacity,
                description,
                pricePerDay
            })
        });

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur:", error);
        return { message: "Erreur lors de la création de la salle" };
    }
}

// Fonction pour récupérer une salle par ID
async function getSalleById(id) {
    try {
        const response = await fetch(`${API_URL}/salles/${id}`);
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Erreur:", error);
        return { message: "Erreur lors de la récupération de la salle" };
    }
}