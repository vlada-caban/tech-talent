const changePwdFormHandler = async (event) => {
  event.preventDefault();

  const email = document.querySelector("#email-pwd").value.trim();
  const password = document.querySelector("#password-pwd").value.trim();
  const newPassword = document.querySelector("#new-password").value.trim();

  if (email && password && newPassword) {
    console.log("Inputs recieved");
    const response = await fetch("/api/users/password", {
      method: "PUT",
      body: JSON.stringify({ email, password, newPassword }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("Failed to change password.");
    }
  }
};

document
  .querySelector(".password-change-form")
  .addEventListener("submit", changePwdFormHandler);