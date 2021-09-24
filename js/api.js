const pronto = document.querySelector('#pronto');
const naumPronto = document.querySelector('#naumPronto');
console.log(pronto);
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

        /* function printarCard (){
            const userId = 
            const id =
            const title =
            const completed =
        
            
        }
 */
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


{/* <div class="card">
                <h3></h3>
                <h3></h3>
                <p></p>
            </div>     */}