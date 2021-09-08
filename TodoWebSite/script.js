const baseAddress = 'http://localhost:7071';
var app = new Vue({
    el: '#app',
    data: {
        todos: [
        ],
        newTask: "",
        error: undefined
    },
    methods: {
        createTodo: function() {
            fetch(`${baseAddress}/api/todo`, { method: "POST",
                body: JSON.stringify({ taskDescription: this.newTask} )})
                .then(response => response.json())
                .then(json => {
                    this.todos.push(json);
                    this.newTask = '';
                })
                .catch(reason => this.error = `Failed to create item: ${reason}`);
        },
        deleteTodo: function(todo) {
            var todos = this.todos;
            fetch(`${baseAddress}/api/todo/${todo.id}`, { method: "DELETE"})
                .then(function() {
                    var index = todos.indexOf(todo);
                    if (index > -1) {
                        todos.splice(index, 1);
                    }
                })
                .catch(reason => this.error = `Failed to delete item: ${reason}`);
        },
        updateTodo: function(todo) {
            const body = JSON.stringify({ isCompleted: todo.isCompleted });
            fetch(`${baseAddress}/api/todo/${todo.id}`, 
                { method: "PUT", body: body})
                .catch(reason => this.error = `Failed to update item: ${reason}`);
        },     
    },
    mounted: function () {
        fetch(`${baseAddress}/api/todo`)
            .then(response => response.json())
            .then(json => this.todos = json)
            .catch(reason => this.error = `Failed to fetch todos: ${reason}`);
    },
});