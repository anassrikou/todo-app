$(document).ready(function () {
    const todo_form = $('#todo-form');
    const todo_list = $('.todos__list');
    
    todo_form.on('submit', handleSubmit);
    todo_list.on('click', handleBtnClick);

    // get all todos from server
    getAllTodos();

});

function getAllTodos() {
    $.ajax({
        url: 'api/todos',
        success: function (response, status) {
            console.log(response, status);
            // do nothing is list is empty or there's an error
            if (response.length === 0 || response.error) return;

            response.forEach(element => renderTodo(element));

        },
        error: function (xhr, status, message) {
            console.log(status, message);
        }
    });
}

function renderTodo(item) {
    console.log("rendering todo", item);
    const todo_list = document.querySelector('.todo--list-group');
    const markup = `
    <div class="list-group-item ${item.done ? 'completed' : ''}" data-id=${item.id}>
        <span class="todo__text">${item.todo}</span>
        <div class="btn-group float-right" role="group" aria-label="Basic example">
        <button class="btn btn-success todo-done">${item.done ? 'undo' : 'done'}</button>
        <button class="btn btn-danger todo-delete">delete</button>
        </div>
    </div>
    `;
    todo_list.insertAdjacentHTML('beforeend', markup);
}

function handleSubmit(e) {
    // prevent form from submitting and refreshing the page
    e.preventDefault();

    // get the form data
    const data = $('#todo-form').serializeArray();
    console.log(data);
    data.push({ name: 'done', value: false });

    // send ajax request to the todos api
    $.ajax({
        url: 'api/todos',
        method: 'POST',
        data: data,
        success: function (response, status, xhr) {
            console.log(response, status, xhr);
            // clear the input field
            document.querySelector('#todo-form').reset();

            renderTodo(response.new_todo);
        },
        error: function (xhr, status, message) {
            console.log(xhr, status, message);
        },
    });
}


function handleBtnClick(e) {
    console.log(e.target);
    if (e.target.tagName !== "BUTTON") return;

    // get the whole selected element
    const todo = $(e.target).parentsUntil($('.todo--list-group'));

    // get the actual button not whats inside it
    const clickedbtn = e.target ;
    console.log("clicked btn", clickedbtn);
    if (clickedbtn.classList.toString().includes('done')) return toggleDone(todo);
    else if (clickedbtn.classList.toString().includes('delete')) return todoDelete(todo);
    else alert('error');
}

function toggleDone(todo) {
    console.log("done" , todo);
    $.ajax({
        url: `api/todos/${todo[1].dataset.id}`,
        method: 'PUT',
        success: function (response, status, xhr) {
            console.log(response, status, xhr);
            // update the element classes
            console.log("done todo", todo);
            todo[1].classList.toggle('completed');
        },
        error: function (xhr, status, message) {
            console.log(xhr, status, message);
        },
    });
}

function todoDelete(todo) {
    console.log("delete", todo);
    $.ajax({
        url: `api/todos/${todo[1].dataset.id}`,
        method: 'DELETE',
        success: function (response, status, xhr) {
            console.log(response, status, xhr);
            // remove the element from the dom
            todo.remove();
        },
        error: function (xhr, status, message) {
            console.log(xhr, status, message);
        },
    });
}