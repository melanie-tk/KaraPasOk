document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const message = document.getElementById("message");

  // Si on n'est pas sur la page register, on sort
  if (!form) {
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = {
      lastName: document.getElementById("lastName").value,
      firstName: document.getElementById("firstName").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
    };

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      message.textContent = result.message || "Compte créé";
    } catch (error) {
      message.textContent = "Erreur lors de l'inscription";
      console.error(error);
    }
  });
});