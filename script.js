const getListaTarefas = document.getElementById('lista-tarefas');
const getInput = document.getElementById('texto-tarefa');
const getButton = document.getElementById('criar-tarefa');
const getButtonEraseAll = document.getElementById('apaga-tudo');
const getButtonErase = document.getElementById('remover-finalizados');

let listArray;
if (localStorage.getItem('lista') === null) {
  listArray = [];
} else {
  listArray = localStorage.getItem('lista').split(',');
}

function avoidDoubleItems(compara) {
  const ulList = document.getElementsByTagName('li');
  for (let check = 0; check < ulList.length; check += 1) {
    if (ulList[check].innerText === compara) {
      return true;
    }
  }
}

function addOrRemoveClass(event) {
  if (event.target.classList.contains('completed')) {
    event.target.classList.remove('completed');
  } else {
    event.target.classList.add('completed');
  }
}

function removeCompleted() {
  const completedArray = [];
  const markedList = document.querySelectorAll('.completed');
  markedList.forEach((element) => {
    completedArray.push(element.innerText);
    element.remove();
  });
  const storageList = localStorage.getItem('lista').split(',');
  listArray = storageList.filter((value) => !completedArray.includes(value));
  localStorage.setItem('lista', listArray);
}

function eraseList() {
  const getTarefas = getListaTarefas.childNodes;
  while (getTarefas.length > 0) {
    getTarefas.forEach((element) => element.remove());
  }
  localStorage.removeItem('lista');
}

function createItem(value) {
  const li = document.createElement('li');
  li.innerText = value;
  li.addEventListener('click', addOrRemoveClass, false);
  li.addEventListener('dblclick', addOrRemoveClass, false);
  document.querySelector('ol').appendChild(li);
}

function addList() {
  const getTarefasValue = getInput.value;
  if (avoidDoubleItems(getTarefasValue) === true) {
    alert('List cannot have double items');
  } else {
    createItem(getTarefasValue);
    listArray.push(getTarefasValue); 
    localStorage.setItem('lista', listArray);  
  }
  getInput.value = '';
}

function addOnLoad() {
  const getStorage = localStorage.getItem('lista').split(',');
  getStorage.forEach((element) => {
    createItem(element);
  });
}

getButton.addEventListener('click', addList);
getButtonEraseAll.addEventListener('click', eraseList);
getButtonErase.addEventListener('click', removeCompleted);

window.onload = () => {
  if (localStorage.getItem('lista') !== null) {
    addOnLoad();
  }
};
