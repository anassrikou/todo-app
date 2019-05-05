$(document).ready(function() {
    const todo_form = document.querySelector('#todo-form');
    todo_form.addEventListener('submit', handleSubmit);

    // get all todos from server
    $.ajax({
        url: 'api/todos',
        success: function(response, status) {
            console.log(response, status);
            // do nothing is list is empty
            if (response.length === 0 || response.error) return;

            response.forEach(element => {
               renderTodo(element)
            });

        },
        error: function(xhr, status, message) {
            console.log(message);
        }
    });

});

function renderTodo(item) {
    console.log("rendering todo", item);
    const todo_list = document.querySelector('.todo--list-group');
    const markup = `
    <div class="list-group-item" data-id=${item.id}>
        ${item.todo}
        <div class="btn-group float-right" role="group" aria-label="Basic example">
        <button class="btn btn-light"><i class="fas fa-check"></i></button>
        <button class="btn btn-light"><i class="far fa-trash-alt"></i></button>
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

    // send ajax request to the todos api
    $.ajax({
        url: 'api/todos',
        method: 'POST',
        data: data,
        success: function(response, status, xhr) {
            console.log(response, status, xhr);
            // clear the input field
            document.querySelector('#todo-form').reset();

            // get the data from form
            const todo_item = { todo: data[0].value, done: false };

            renderTodo(todo_item);
        },
        error: function(xhr, status, message) {
            console.log(xhr, status, message);
        },
    });
}