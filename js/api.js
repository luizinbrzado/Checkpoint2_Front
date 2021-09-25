const pronto = document.querySelector('#pronto');
const naumPronto = document.querySelector('#naumPronto');
const voltar = document.querySelector('#voltar');


const mostrarDados = (result) => {
    for (const campo in result) {
        console.log(result[campo]);
        const card = `  <div class="card">
                        <h4>User ID: ${result[campo].userId}</h4>
                        <h4>ID Tarefa: ${result[campo].id}</h4>
                        <h5>Tarefa: ${result[campo].title}</h5>
                        </div>`
        
        if (result[campo].completed) {
            pronto.innerHTML += card;            
        } else {
            naumPronto.innerHTML += card;
        }

       
    }
} 



function carregarApi(){
    const options = {
        method: 'GET',
        mode: 'cors',
        cache: 'default'
    }
    fetch(`https://jsonplaceholder.typicode.com/todos/`, options)
        .then(response => {response.json()
            .then(dado => mostrarDados(dado))
        })
        .catch(e => console.error('Deu erro mano! ' + e, message))
}


voltar.addEventListener('click', (e) => {
    window.location.href = 'index.html';
})