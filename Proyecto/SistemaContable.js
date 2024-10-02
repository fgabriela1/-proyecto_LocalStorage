// Inicializar el array de transacciones
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// Índice de la transacción que se está editando
let editIndex = -1;

// Elementos del DOM
const transactionForm = document.getElementById('transactionForm');
const transactionsTable = document.getElementById('transactionsTable').getElementsByTagName('tbody')[0];
const balanceChartCtx = document.getElementById('balanceChart').getContext('2d');

// Crear el gráfico de balance
let balanceChart = new Chart(balanceChartCtx, {
    type: 'bar',
    data: {
        labels: ['Ingresos', 'Gastos'],
        datasets: [{
            label: 'Balance Financiero',
            data: [0, 0],
            backgroundColor: ['green', 'red']
        }]
    },
    options: {
        responsive: true
    }
});

// Función para agregar o actualizar una transacción
transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (editIndex >= 0) {
        // Actualizar la transacción existente
        transactions[editIndex] = { type, description, amount };
        editIndex = -1; // Reiniciar el índice de edición
        document.querySelector('.button').textContent = 'Agregar Transacción'; // Cambiar el texto del botón
    } else {
        // Agregar una nueva transacción
        const transaction = { type, description, amount };
        transactions.push(transaction);
    }

    // Guardar en LocalStorage
    localStorage.setItem('transactions', JSON.stringify(transactions));

    // Actualizar la tabla y el gráfico
    renderTransactions();
    updateBalanceChart();

    // Limpiar formulario
    transactionForm.reset();
});

// Función para mostrar las transacciones en la tabla
function renderTransactions() {
    transactionsTable.innerHTML = ''; // Limpiar tabla

    transactions.forEach((transaction, index) => {
        const row = transactionsTable.insertRow();
        row.innerHTML = `
            <td>${transaction.type}</td>
            <td>${transaction.description}</td>
            <td>${transaction.amount}</td>
            <td>
                <button class="button button-edit" onclick="editTransaction(${index})">Editar</button>
                <button class="button button-danger" onclick="deleteTransaction(${index})">Eliminar</button>
            </td>
        `;
    });
}

// Función para editar una transacción
function editTransaction(index) {
    const transaction = transactions[index];

    // Cargar los valores en el formulario
    document.getElementById('type').value = transaction.type;
    document.getElementById('description').value = transaction.description;
    document.getElementById('amount').value = transaction.amount;

    // Guardar el índice de la transacción que se está editando
    editIndex = index;

    // Cambiar el texto del botón de agregar a "Guardar cambios"
    document.querySelector('.button').textContent = 'Guardar cambios';
}

// Función para eliminar una transacción
function deleteTransaction(index) {
    transactions.splice(index, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
    updateBalanceChart();
}

// Función para actualizar el gráfico de balance
function updateBalanceChart() {
    let ingresos = 0;
    let gastos = 0;

    transactions.forEach(transaction => {
        if (transaction.type === 'Ingreso') {
            ingresos += transaction.amount;
        } else {
            gastos += transaction.amount;
        }
    });

    balanceChart.data.datasets[0].data = [ingresos, gastos];
    balanceChart.update();
}

// Función para exportar las transacciones a PDF
document.getElementById("pdfExport").addEventListener("click", function() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Título del documento
    doc.text("Historial de Transacciones", 20, 10);

    let transactions = [];
    const tableRows = document.getElementById("transactionsTable").querySelectorAll("tbody tr");

    // Recorrer cada fila de la tabla y obtener los datos
    tableRows.forEach((row, index) => {
        const type = row.cells[0].innerText;
        const description = row.cells[1].innerText;
        const amount = row.cells[2].innerText;
        transactions.push([type, description, amount]);
    });

    // Agregar los datos al PDF en forma de tabla
    transactions.forEach((transaction, index) => {
        const yPosition = 20 + (index * 10);
        doc.text(`${transaction[0]} - ${transaction[1]} - ${transaction[2]}`, 20, yPosition);
    });

    // Descargar el PDF
    doc.save("transacciones.pdf");
});

// Inicializar la aplicación mostrando las transacciones guardadas
renderTransactions();
updateBalanceChart();


// Función para cerrar sesión
document.getElementById("logoutBtn").addEventListener("click", function() {
    // Aquí puedes añadir la lógica para cerrar sesión
    alert("Cerrando sesión...");
    // Redirigir a la página de inicio de sesión o limpiar datos de sesión
    window.location.href = 'login.html'; // Asegúrate de tener la página de login
});

// Funcionalidad de modo oscuro
const darkModeBtn = document.getElementById('darkModeBtn');
darkModeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    // Cambiar el texto del botón dependiendo del modo actual
    if (document.body.classList.contains('dark-mode')) {
        darkModeBtn.textContent = 'Modo Claro';
    } else {
        darkModeBtn.textContent = 'Modo Oscuro';
    }
});

