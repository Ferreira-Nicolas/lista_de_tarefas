const input = document.querySelector('.input');
const btnAddTarefa = document.querySelector('.btn-add-tarefa');
const tarefas = document.querySelector('.tarefas');

function criaLi() {
    const li = document.createElement('li');
    return li;
}


function criaBotaoApagar(li) {
    li.innerHTML += ' ';
    const botaoApagar = document.createElement('button');
    botaoApagar.innerHTML = 'Apagar'
    botaoApagar.setAttribute('class', 'botao-apagar')
    li.appendChild(botaoApagar);

}


function criaTarefa(textoInput) {
    const li = criaLi();
    li.innerHTML = textoInput;
    tarefas.appendChild(li);
    criaBotaoApagar(li)
}

function salvarTarefas() {
    const liTarefas = tarefas.querySelectorAll('li');
    const listaDeTarefas = [];

    for (let tarefa of liTarefas) {
        let tarefaTexto = tarefa.innerText;
        tarefaTexto = tarefaTexto.replace('Apagar', '').trim()
        listaDeTarefas.push(tarefaTexto);
        console.log(listaDeTarefas)
    }
    const tarefasJSON = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJSON)

}

function adicionaTarefasSalvas() {
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(tarefas);
    for (let tarefa of listaDeTarefas) {
        criaTarefa(tarefa)
    }
}




input.addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        if (!input.value) return;
        criaTarefa(input.value);
        input.value = '';
        salvarTarefas()
    };
})


btnAddTarefa.addEventListener('click', function (e) {
    if (!input.value) return;
    criaTarefa(input.value)
    salvarTarefas()
    input.value = '';
    input.focus();
})




addEventListener('click', function (e) {
    const el = e.target;
    if (el.classList.contains('botao-apagar')) {
        el.parentElement.remove();
    }
    salvarTarefas()
    
})
adicionaTarefasSalvas()