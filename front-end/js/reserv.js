const API_URL = "http://localhost:3000/api";

const params = new URLSearchParams(window.location.search);
const idRoom = params.get("idRoom");

if (idRoom) {
    document.querySelector("#idRoom").value = idRoom;
}


const btn = document.getElementById("verif");
btn.addEventListener("click", checkReserv)


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
            alert("SUCCES");
        }
        else if(response.error){
            alert("Erreur");
        }

    } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur lors de la modification");
    }
}