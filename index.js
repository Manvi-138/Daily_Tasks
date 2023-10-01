const title=document.getElementById("title")
const description=document.getElementById("description")
const form=document.querySelector("form")
const container=document.querySelector(".container")

//const tasks=[] here we used empty aarray so after reloading the previously stored tasks were not visible but they are stored in local storage
const tasks=localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : []; //convert string to object
//this means if there is anything in tasks array in local storage then give that otherwise give empty page on reloading
//we will be able to see all the items stored in local storage even after reloading

ShowAllTasks() //calling this function to make all previouslyu stored tasks visible even after reloading


function ShowAllTasks(){
    tasks.forEach((value,index)=>{
        const div=document.createElement("div")
        div.setAttribute("class","task");   //we are creating the div to show all the tasks given by user
//now we will create inner div as we did in html then we will create a <p> and then <span> to show title n description.
        const innerdiv=document.createElement("div");
        div.append(innerdiv) //created div inside a div.

//now create <p>
       const p=document.createElement("p")
       p.innerText= value.title; //giving title value to <p>
       innerdiv.append(p) //adding <p> to innerdiv

       //create <span>
       const span=document.createElement("span")
       span.innerText= value.description;
       innerdiv.append(span)  //adding span to innerdiv that has the value of description.

       //create button
       const btn=document.createElement("button")
        btn.setAttribute("class","deletebtn")
        btn.innerText="-"

        //adding eventlistener to button
        btn.addEventListener("click",()=>{
            RemoveTasks();
            tasks.splice(index,1); //deleting task from array "tasks"

            //now when tasks are added in local storage we want that on removing a task it gets removed from local storage too.
            localStorage.setItem("tasks",JSON.stringify(tasks)) //deleting task from local storage also on removing a task

            ShowAllTasks();
        })

        div.append(btn)
        container.append(div)
       })

    }
//we can see that when we add new task then it also shows previously added tasks again and again whenever we click "Add"
//so we will make a function to remove previous tasks

function RemoveTasks(){  //to remove the repeating occurence of previously added tasks.
    tasks.forEach((value)=>{
        const div= document.querySelector(".task");
        div.remove() 
        
    })
}



form.addEventListener("submit",(e)=>{
    e.preventDefault();
    RemoveTasks(); //firstly the repeat occurence of previous task will  be removed then new task will be pushed.
    tasks.push({
        title: title.value,
        description: description.value
    });
    localStorage.setItem("tasks",JSON.stringify(tasks))  //convert object to string becoz local storage stores strings
    //now whenever tasks are added they r stored in local storage and on reloading the tasks are not visible but,
    //they are stored in local storage(see in applications)
    console.log(tasks)
    ShowAllTasks()
})

//now the problem is when we refresh the page then all added tasks vanishes
//so we use local storage to store all tasks
