{
    const welcome = () => {
        console.log("Witam wszystkich odwiedzających DEV", "- strona dodana do GIT.");
    };

    let tasks = [];

    let hideDoneTasks = false

    const setFocus = () => {
        document.querySelector(".js-newTask").focus();
    }

    const addNewTask = (newTaskContent) => {
        tasks = [...tasks, { content: newTaskContent, done: false }];

        render();

        formReset();
    };

    const removeTask = (taskIndex) => {
        tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks = [...tasks.slice(0, taskIndex),
        { ...tasks[taskIndex], done: !tasks[taskIndex].done },
        ...tasks.slice(taskIndex + 1),
        ];

        render();
    };

    const formReset = () => {
        document.querySelector(".js-form").reset();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");

        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButtons, index) => {
            toggleDoneButtons.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const toggleAllDoneTask = (task) => {
        tasks = tasks.map((task) => ({ ...tasks, done: true }));
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {
            htmlString += `
            <li class="list__tasks${task.done && hideDoneTasks ? " list__item--hide" : ""
                }">
            
              <button class="list__doneButton button__task--done js-done"> 
              ${task.done ? "✓" : ""} 
              </button>
            <div class="form__task${task.done ? " list__tasks--lineThrough" : ""}">  
             ${task.content} 
             </div>
              <button class="list__removeButton js-remove">
                🗑
                </button>
              </li>
              `;
        }
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        let htmlButtonsString = "";

        if (!tasks.length) {
            return;
        }
        htmlButtonsString += `
        <button class=" list__hiddenButton js-hideDoneTask"> ${hideDoneTasks ? "Pokaż " : "Ukryj "
            }ukończone</button>
        <button class=" list__hiddenButtonMarkDone js-markAllDone"${tasks.every((task) => task.done) ? "disabled" : ""
            }> Ukończ wszystkie</button>`;

        document.querySelector(".js-listHiddenButtons").innerHTML = htmlButtonsString;
    };

    const toggleAllDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));

        render();
    };

    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");

        if (markAllDoneButton) {
            markAllDoneButton.addEventListener("click", toggleAllDone);
        }

        const toggleHideDoneButton = document.querySelector(".js-hideDoneTask");

        if (toggleHideDoneButton) {
            toggleHideDoneButton.addEventListener("click", toggleHideDoneTasks);
        }
    };


    const render = () => {
        renderTasks();
        renderButtons();

        bindEvents();
        bindButtonsEvents();

    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        setFocus();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

        welcome();
    };

    init();
};
