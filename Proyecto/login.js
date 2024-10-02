// Lista de usuarios registrados (inicialmente vacía)
let usuariosRegistrados = [];

// Función para verificar si el usuario ya existe
function verificarUsuario(nombre) {
  return usuariosRegistrados.find(usuario => usuario.nombre === nombre);
}

// Generar un token aleatorio
function generateToken() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Genera un token de 6 dígitos
}

// Enviar el token por correo usando EmailJS
function sendTokenByEmail(email, token) {
    const templateParams = {
        to_email: email,
        token: token
    };

    emailjs.send('default_service', 'template_98ggbwm', templateParams)
        .then((response) => {
            console.log('Correo enviado con éxito!', response.status, response.text);
            alert('Se ha enviado un token a su correo electrónico.');
        }, (error) => {
            console.error('Error al enviar el correo...', error);
            alert('Error al enviar el correo. Por favor, inténtelo de nuevo.');
        });
}

// Función para registrar un nuevo usuario
document.getElementById('registerForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Capturar datos del formulario de registro
    const nombre = document.getElementById('registerName').value;
    const password = document.getElementById('registerPassword').value;
    const email = document.getElementById('registerEmail').value;

    // Verificar si el usuario ya está registrado
    if (verificarUsuario(nombre)) {
        alert("El nombre de usuario ya está registrado. Elige otro.");
    } else {
        // Generar y enviar el token
        const generatedToken = generateToken();
        sendTokenByEmail(email, generatedToken);

        // Mostrar el modal para ingresar el token
        document.getElementById('tokenModal').style.display = 'block';

        // Verificar el token ingresado
        const verifyButton = document.getElementById('verifyTokenButton');

        // Evitar múltiples listeners asignando el evento una sola vez
        verifyButton.onclick = function() {
            const enteredToken = document.getElementById('tokenInput').value;
            if (enteredToken === generatedToken) {
                // Agregar el nuevo usuario a la lista de usuarios registrados
                usuariosRegistrados.push({ nombre: nombre, password: password });
                alert(`Usuario ${nombre} registrado exitosamente`);
                document.getElementById('tokenModal').style.display = 'none';
                document.getElementById('registerForm').reset();
            } else {
                alert('Token incorrecto. Inténtelo de nuevo.');
            }
        };

        // Lógica para cerrar el modal al hacer clic en la 'x'
        document.querySelector('.close').onclick = function() {
            document.getElementById('tokenModal').style.display = 'none';
        };
    }
});

// Función para iniciar sesión
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Capturar datos del formulario de login
  const nombre = document.getElementById('loginName').value;
  const password = document.getElementById('loginPassword').value;

  // Buscar si el usuario está registrado
  const usuario = verificarUsuario(nombre);

  if (usuario && usuario.password === password) {
    // Si el usuario y la contraseña son correctos, redirigir al sistema contable
    window.location.href = "SistemaContable.html";
  } else {
    alert("Nombre de usuario o contraseña incorrectos");
  }
});
