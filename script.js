// Initializing all the Id's and Selectors 
const theTask = document.getElementById('task');
const theList = document.querySelector('.lists');
const theCounter = document.getElementById('counter');

// Counts the no. of tasks in the list
function countTasks(){
    const count = theList.querySelectorAll('li').length;
    theCounter.innerHTML = `${count} task${count === 1 ? '' : 's'}`;
}

// Add button creates a task in the list or displays an error
function clicked(){
    if(theTask.value === ''){
        alert('Task box cannot be empty')
    } else {
        let li = document.createElement('li');
        li.innerHTML = theTask.value;
        theList.appendChild(li);
        theTask.value = '';
        let span = document.createElement('span');
        span.innerHTML = '\u00d7'
        li.appendChild(span);
        countTasks();
    }
    saveData();
    countTasks();
}

// Enter key can also perform the same tasks as the Add button
theTask.addEventListener('keydown', (e) =>{
    if(e.key === 'Enter'){
        clicked();
    }
});

// Even-listener for Checkbox and Delete functionalities of the list items
theList.addEventListener('click', (e) => {
    if(e.target.tagName === 'LI'){
        e.target.classList.toggle('checked');
        countTasks();
    } else if(e.target.tagName === 'SPAN'){
        e.target.parentElement.remove();
        countTasks();
    }
});

// Saves the data in the browser's storage
function saveData(){
    localStorage.setItem('data', theList.innerHTML)
}

// Retrieves the stores data
function getData(){
    theList.innerHTML = localStorage.getItem('data');
    countTasks();
}

// Clears all the list items available
function clearData(){
    if(confirm('Are you sure you want to clear all tasks?')){
        theList.innerHTML = '';
        localStorage.clear();
        getData();
    }    
}

// Displays the stored data even after refreshing or restarting the web app
getData();
