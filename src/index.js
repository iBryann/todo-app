import './index.scss';

"strict mode"

const Index = (function () {
  const form = document.forms.tasks;
  const list = document.querySelector('#task-list');
  let tasks = [];

  function createTaskNode({ id, checked, description }) {
    const listItem = document.createElement('li');
    const isChecked = checked ? 'checked' : '';

    listItem.dataset.taskId = id;
    listItem.innerHTML = /*html*/`
      <label class="${isChecked}">
        <input type="checkbox" ${isChecked}>
        ${description}
      </label>

      <button>
        <img src="/src/assets/delete.svg" alt="Deletar" />
      </button>
    `;

    return listItem;
  }

  function createTask(description = '') {
    tasks.push({
      id: crypto.randomUUID(),
      checked: false,
      description
    });
  }

  function listTasks() {
    list.innerHTML = '';

    if (tasks.length) {
      const taskNodes = tasks.map(createTaskNode);

      list.append(...taskNodes);
    }
    else {
      list.innerHTML = '<div class="empty-list">Não há tarefas <span>✔</span></div>';
    }
  }

  function updateTask(id = '') {
    const task = tasks.find(task => task.id === id);

    if (task) {
      task.checked = !task.checked;
    }
  }

  function deleteTask(id = '') {
    tasks = tasks.filter(task => task.id !== id);
  }

  function handleSubmitForm(event) {
    event.preventDefault();
    const { task } = form;
    const description = task.value.trim()

    if (description) {
      createTask(description);
      renderTaskList();
      task.value = '';
      task.focus();
    }
  }

  function renderTaskList() {
    listTasks();
    events();
  }

  function handleUpdateTask({ target }) {
    const { taskId } = target.closest('li').dataset;

    updateTask(taskId);
    renderTaskList();
  }

  function handleDeleteTask({ target }) {
    const { taskId } = target.closest('li').dataset;

    deleteTask(taskId);
    renderTaskList();
  }

  function events() {
    form.addEventListener('submit', handleSubmitForm);

    list.querySelectorAll('input[type="checkbox"]')
      .forEach(checkbox => {
        checkbox.addEventListener('click', handleUpdateTask);
      });

      list.querySelectorAll('button')
      .forEach(checkbox => {
        checkbox.addEventListener('click', handleDeleteTask);
      });
  }

  function init() {
    renderTaskList();
  }

  return {
    init
  };
})();

document.addEventListener('DOMContentLoaded', Index.init);