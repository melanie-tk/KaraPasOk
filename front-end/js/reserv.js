const API_URL = "http://localhost:3000/api";

const params = new URLSearchParams(window.location.search);
const idRoom = params.get("idRoom");

if (idRoom) {
  document.querySelector("#idRoom").value = idRoom;
}


const btn = document.getElementById("verif");
btn.addEventListener("click", function (event) {
    checkReserv()
})


    const id = document.querySelector("#idRoom").value;
    const dateStart = document.querySelector("#dateStart").value;
    const dateEnd = document.querySelector("#dateFin").value;

async function checkReserv() {
    console.log(id)
    console.log(dateStart)
    console.log(dateEnd)
    try {
        console.log("testfetch")
        const response = await fetch(`${API_URL}/salles/?idRoom=${id}&dateStart=${dateStart}&dateEnd=${dateEnd}`, {
            method: "GET",
        });
        console.log(id)
        console.log(dateStart)
        console.log(dateEnd)
        if (response.ok) {
            console.log("reponse ok")
            alert("Salle modifiée avec succès");
        }



    } catch (error) {
        console.error("Erreur:", error);
        alert("Erreur lors de la modification");
    }
}