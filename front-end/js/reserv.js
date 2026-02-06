const API_URL = "http://localhost:3000/api";

const params = new URLSearchParams(window.location.search);
const idRoom = params.get("idRoom");

if (idRoom) {
    document.querySelector("#idRoom").value = idRoom;
}


const btn = document.getElementById("verif");
btn.addEventListener("click", checkReserv);

function creaBtnReserv() {

    const form = document.querySelector("#registerForm");
    const ifexist = document.querySelector("#reserver");

    if (!ifexist) {

        const btn = document.createElement("button");
        btn.type = "button";
        btn.id = "reserver"
        btn.textContent = "Réserver";

        btn.addEventListener("click", () => {

            creaReserv()

        });
        form.appendChild(btn);
    }
}
async function creaReserv() {

    const dateStart = Date.parse(document.querySelector("#dateStart").value);
    const dateEnd = Date.parse(document.querySelector("#dateFin").value);
    const idUser = JSON.parse(localStorage.getItem('user')).id;
    const id = document.querySelector("#idRoom").value;
console.log(idUser)
    try {
        const responseFetch = await fetch(`${API_URL}/reserv/?idRoom=${id}&idUser=${idUser}&dateStart=${dateStart}&dateEnd=${dateEnd}`, {
            method: "POST",
        });
    } catch {

    }
}
async function checkReserv(e) {
    e.preventDefault();
    const dateStart = Date.parse(document.querySelector("#dateStart").value);
    const dateEnd = Date.parse(document.querySelector("#dateFin").value);
    const id = document.querySelector("#idRoom").value;
    try {
        const responseFetch = await fetch(`${API_URL}/sendCheckReserv/?idRoom=${id}&dateStart=${dateStart}&dateEnd=${dateEnd}`, {
            method: "GET",
        });
        const response = await responseFetch.json();

        if (response.message) {

            creaBtnReserv()
        }
        else if (response.error) {
            alert("Erreur");
        }

    } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur lors de la modification");
    }
}