$(document).ready(function() {
    const todo_form = document.querySelector('#todo-form');
    todo_form.addEventListener('submit', handleSubmit);


function handleSubmit(e) {
    // prevent form from submitting and refreshing the page
    e.preventDefault();
    
    // get the form data
    const data = $('#todo-form').serializeArray();
    console.log(data);

    // send ajax request to the todos api
    $.ajax({
        url: 'todos',
        method: 'POST',
        data: data,
        success: function(data, status, xhr) {
            console.log(data, status, xhr);
            // clear the input field
            todo_form.reset();

            // add the todo element to the list
            
        },
        error: function(xhr, status, message) {
            console.log(xhr, status, message);
        },
    });
}
});