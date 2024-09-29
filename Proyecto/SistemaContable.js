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



// Inicializar la aplicación mostrando las transacciones guardadas
renderTransactions();
updateBalanceChart();