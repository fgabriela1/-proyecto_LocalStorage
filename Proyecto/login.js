// Cambiar entre formularios de inicio de sesión y registro
document.getElementById("registerLink").addEventListener("click", function(event) {
    event.preventDefault();
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
    document.getElementById("formTitle").textContent = "Registrarse";
    document.getElementById("switchForm").innerHTML = '¿Ya tienes una cuenta? <a href="#" id="loginLink">Inicia sesión aquí</a>';

    // Cambiar de nuevo al formulario de inicio de sesión
    document.getElementById("loginLink").addEventListener("click", function(event) {
        event.preventDefault();
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("formTitle").textContent = "Iniciar Sesión";
        document.getElementById("switchForm").innerHTML = '¿No tienes una cuenta? <a href="#" id="registerLink">Regístrate aquí</a>';
    });
});

// Manejar el inicio de sesión
document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem("users")) || {};

    // Verificar si el usuario y la contraseña son correctos
    if (users[username] && users[username] === password) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("username", username);
        window.location.href = "SistemaContable.html"; // Redirigir al sistema contable
    } else {
        errorMessage.textContent = "Usuario o contraseña incorrectos.";
    }
});

// Manejar el registro de usuarios
document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const newUsername = document.getElementById("newUsername").value;
    const newPassword = document.getElementById("newPassword").value;
    const registerErrorMessage = document.getElementById("register-error-message");

    // Obtener los usuarios existentes
    let users = JSON.parse(localStorage.getItem("users")) || {};

    // Verificar si el usuario ya existe
    if (users[newUsername]) {
        registerErrorMessage.textContent = "El nombre de usuario ya existe.";
    } else {
        // Registrar nuevo usuario
        users[newUsername] = newPassword;
        localStorage.setItem("users", JSON.stringify(users));

        // Redirigir al inicio de sesión
        alert("Usuario registrado con éxito. Ahora puedes iniciar sesión.");
        document.getElementById("registerForm").reset();
        document.getElementById("registerForm").style.display = "none";
        document.getElementById("loginForm").style.display = "block";
        document.getElementById("formTitle").textContent = "Iniciar Sesión";
        document.getElementById("switchForm").innerHTML = '¿No tienes una cuenta? <a href="#" id="registerLink">Regístrate aquí</a>';
    }
});
