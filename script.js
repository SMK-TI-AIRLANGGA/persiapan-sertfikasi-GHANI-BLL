const form = document.querySelector(".login-form");
const errorMsg = document.getElementById("error-msg");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        if (username === "" || password === "") {
            errorMsg.style.display = "block";
            errorMsg.textContent = "Username dan password wajib diisi!";
            return;
        }

        if (username === "gani" && password === "admin123") {
            window.location.href = "index.html";
        } else {
            errorMsg.style.display = "block";
            errorMsg.textContent = "Username atau password salah!";
        }
    });