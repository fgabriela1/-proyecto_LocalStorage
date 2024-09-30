// Lista de usuarios registrados (inicialmente vacía)
let usuariosRegistrados = [];

// Función para verificar si el usuario ya existe
function verificarUsuario(nombre) {
  return usuariosRegistrados.find(usuario => usuario.nombre === nombre);
}

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

// Función para registrar un nuevo usuario
document.getElementById('registerForm').addEventListener('submit', function(event) {
  event.preventDefault();

  // Capturar datos del formulario de registro
  const nombre = document.getElementById('registerName').value;
  const password = document.getElementById('registerPassword').value;

  // Verificar si el usuario ya está registrado
  if (verificarUsuario(nombre)) {
    alert("El nombre de usuario ya está registrado. Elige otro.");
  } else {
    // Agregar el nuevo usuario a la lista de usuarios registrados
    usuariosRegistrados.push({ nombre: nombre, password: password });
    alert(`Usuario ${nombre} registrado exitosamente`);
  }
});

  