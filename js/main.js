let dados = (localStorage.getItem('todoList')) ? JSON.parse(localStorage.getItem('todoList')) : {
    todo: [],
    completed: []
};

const btnEnviar = document.getElementById("btn-enviar");
btnEnviar.addEventListener('click', (e) => {
    e.preventDefault();
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    document.getElementById('data-criacao').value = now.toISOString().slice(0, -8);
    if (document.getElementById('data-final').value < now.toISOString()) {
        return console.log("tristeza");
    }
});