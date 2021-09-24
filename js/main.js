const btnAdd = document.getElementById('btn-add');
let tarefaInput = document.getElementById('tarefa');
let dataCriacaoInput = document.getElementById('data-criacao');
let dataFinalInput = document.getElementById('data-final');
let tempoInput;

let dados = (localStorage.getItem('todoList')) ?
    JSON.parse(localStorage.getItem('todoList')) : {
        todo: [],
        completed: []
    };

window.onload = () => {
    tempoInput = setInterval(() => {
        let now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
        dataCriacaoInput.value = now.toISOString().slice(0, -5);
    }, 200);
}, carregarToDoNoDOM();

btnAdd.addEventListener('click', () => {
    if (tarefaInput.value !== '' && dataCriacaoInput.value !== '' && dataFinalInput.value !== '') {
        addTarefa(tarefaInput.value, dataCriacaoInput.value, dataFinalInput.value)
    }
})

function addTarefa(tarefaValue, dataCriacaoValue, dataFinalValue) {

    addTarefaNoDOM(tarefaValue, dataCriacaoValue, dataFinalValue);

    dados.todo.push({
        tarefa: tarefaValue,
        dataCriacao: dataCriacaoValue,
        dataFinal: dataFinalValue
    })

    localStorage.setItem('todoList', JSON.stringify(dados));

    tarefaInput.value = '';
    // dataCriacaoInput.value = '';
    // dataFinalInput.value = '';

    tarefaInput.focus();
}



function removerTarefa() {
    if (confirm("Quer mesmo apagar? (Clique em 'OK' ou pressione 'ENTER')")) {
        let item = this.parentNode.parentNode;
        let parent = item.parentNode;
        let id = parent.id;

        let tarefaTxt = item.firstChild.textContent;
        let dataCriacaoTxt = item.children[1].children[0].textContent;
        let dataFinalTxt = item.children[1].children[1].textContent;

        let value = {
            tarefa: tarefaTxt,
            dataCriacao: dataCriacaoTxt,
            dataFinal: dataFinalTxt
        }

        let todo = dados.todo;
        let completed = dados.completed;

        if (id === 'todo') {
            dados.todo.splice(todo.findIndex((a) => {
                return a.tarefa === value.tarefa;
            }), 1);
        } else {
            dados.completed.splice(completed.findIndex((a) => {
                return a.tarefa === value.tarefa;
            }), 1);
        }

        localStorage.setItem('todoList', JSON.stringify(dados));

        parent.removeChild(item);
    }
}

function completarTarefa() {
    let item = this.parentNode.parentNode;
    let parent = item.parentNode;
    let id = parent.id;

    let tarefaTxt = item.firstChild.textContent;
    let dataCriacaoTxt = item.children[1].children[0].textContent;
    let dataFinalTxt = item.children[1].children[1].textContent;

    let value = {
        tarefa: tarefaTxt,
        dataCriacao: dataCriacaoTxt,
        dataFinal: dataFinalTxt
    }

    if (id === 'todo') {
        dados.todo.splice(dados.todo.findIndex((a) => {
            return a.tarefa === value.tarefa;
        }), 1);
        dados.completed.push(value);
    } else {
        dados.completed.splice(dados.completed.findIndex((a) => {
            return a.tarefa === value.tarefa;
        }), 1);
        dados.todo.push(value);
    }

    localStorage.setItem('todoList', JSON.stringify(dados));

    let itemAlvo = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

    parent.removeChild(item);
    itemAlvo.insertBefore(item, itemAlvo.childNodes[0]);
}

function addTarefaNoDOM(tarefaValue, dataCriacaoValue, dataFinalValue, isCompleted) {
    let list = (isCompleted) ? document.getElementById('completed') : document.getElementById('todo');

    let item = document.createElement('div');
    item.classList.add('to-do-div');
    item.innerHTML =
        `<h3>${tarefaValue}</h3>
        <div>
        <span>${dataCriacaoValue}</span>
        <span>${dataFinalValue}</span>
        </div>
        `;

    let buttons = document.createElement('div');
    buttons.classList.add('buttons');

    let remover = document.createElement('button');
    remover.classList.add('remover');
    remover.innerHTML =
        `<span class="fa-stack fa-1x">
        <i class="fas fa-circle fa-stack-2x"></i>
        <i class="fas fa-trash fa-stack-1x fa-inverse"></i>
        </span>`;

    remover.addEventListener('click', removerTarefa)

    let completar = document.createElement('button');
    completar.classList.add('completar');
    completar.innerHTML =
        `<span class="fa-stack fa-1x">
        <i class="fas fa-circle fa-stack-2x"></i>
        <i class="fas fa-check fa-stack-1x fa-inverse"></i>
        </span>`;

    completar.addEventListener('click', completarTarefa)

    buttons.appendChild(remover);
    buttons.appendChild(completar);
    item.appendChild(buttons);

    list.insertBefore(item, list.childNodes[0]);
}

function carregarToDoNoDOM() {
    if (!dados.todo.length && !dados.completed.length) return;

    for (let i = 0; i < dados.todo.length; i++) {
        let valueToDo = dados.todo[i];
        addTarefaNoDOM(valueToDo.tarefa, valueToDo.dataCriacao, valueToDo.dataFinal);
    }

    for (let j = 0; j < dados.completed.length; j++) {
        let valueCompleted = dados.completed[j];
        addTarefaNoDOM(valueCompleted.tarefa, valueCompleted.dataCriacao, valueCompleted.dataFinal, true);
    }
}