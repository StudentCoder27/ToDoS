document.addEventListener("DOMContentLoaded",()=>{

    var data = [];

    var saveToLocalStorage = () => {
        localStorage.removeItem("data");
        var newData = data.filter((element)=>{
            return element != null && typeof element !== "undefined";
        });
        localStorage.setItem("data",JSON.stringify(newData));
    }

    var getDataFromLocalStorage = () => {
        var localData = JSON.parse(localStorage.getItem("data"));
            if(localData[0] == null || typeof localData[0] == "undefined"){

                localStorage.setItem("data",JSON.stringify(
                    {
                        content: "WELCOME IN MY APP",
                        complited: false,
                        id: 0    
                    }
                    
                ));
                data.push(
                    {
                        content: "WELCOME IN MY APP",
                        complited: false,
                        id: 0
                    });
            }else{
                localData.forEach((element)=>{
                    if(element != null){
                        if(typeof(element) !== 'undefined')
                        {
                            data.push(
                                {
                                    content: element.content,
                                    complited: element.complited,
                                    id: element.id
                                }
                            );
                        }
                    }
                });
            }
    }
    getDataFromLocalStorage();//new

    var deleteById = (id) => {
        data.forEach((value,index,array) =>{
            if(typeof(value) === 'undefined')
            {}
            else if(value.id == id)
            {
                delete array[index];
                console.log(`${id} deleted ${array}` );
            }
        });
        saveToLocalStorage();//new
    };

    var toggleComplitedById = (id) => {
        data.forEach((element,index,array)=>{
                if(typeof(element) === 'undefined')
                {
                    array.splice(index,index);
                }else if(element.id == id)
                {
                    if(element.complited === true){
                        element.complited = false;
                        saveToLocalStorage();//new
                        return element.complited;
                    }else
                    {
                        
                        element.complited = true;
                        saveToLocalStorage();//new
                        return element.complited;
                    }
                    
                }
        } );
    };

    var span = document.getElementById("left-to-do"); 
    var tasksLeft = () => {
        var num = 0; 
        if(data.length !== 0){
            for(let element of data)
            {
                if(typeof(element) === 'undefined')
                {
                    continue;
                }else if(element.complited === false)
                {
                    num++;
                }
            } 
        }
        span.innerHTML = `${num} left`;
    }

    var listOfButton = document.querySelectorAll(".list>ul>li>button");
    var listOfLi = document.querySelectorAll(".list>ul>li");

    var deleteListener = (element) => {
        element.addEventListener("click",(e)=>{
            
            thisLi = e.target.parentNode;
            deleteById(thisLi.id);
            thisUl = thisLi.parentNode;
            thisUl.removeChild(thisLi); 
            tasksLeft();
        })
    };
    
    var clickLi = (element) => {
        element.addEventListener("click",(e) => {
            if(!toggleComplitedById(e.target.id))
            {
                console.log("why its not here?");
                element.className = "complited";
            }else
            {
                console.log("but here?");
                element.className = "";
            }
            tasksLeft();
        },false);
    };
    listOfLi.forEach(clickLi);
    listOfButton.forEach(deleteListener);

    var ul = document.querySelector(".list>ul");

    data.forEach((element)=>{
        if(data.length !== 0){
        var button = document.createElement("button");
            button.className = "delete-item";
            button.innerHTML = "&#x2716;";
            deleteListener(button);

            var li = document.createElement("li");
            clickLi(li);
            li.textContent = element.content;
            li.id = element.id;
            if(element.complited === true)
            {
                li.className = "complited";
            }
            li.appendChild(button);
            ul.appendChild(li);
            tasksLeft();
        }
    });

    

    document.getElementById("add-new-to-do").addEventListener('keyup',(e)=>{
        if(e.keyCode === 13 && e.target.value !== "")
        {
            data.push({
                content : e.target.value,
                complited : false,
                id: (()=>{
                    if(typeof(data[data.length-1]) === 'undefined')
                    {
                        return 0;
                    }
                    if(data.length === 0){
                        
                        return 0;
                    }else{
                    lastElement = data[data.length-1];
                    return (lastElement.id + 1)
                    }
                })()
            });
            var button = document.createElement("button");
            button.className = "delete-item";
            button.innerHTML = "&#x2716;";
            deleteListener(button);

            var li = document.createElement("li");
            clickLi(li);
            li.id = data[data.length-1].id;
            li.textContent = e.target.value;
            li.appendChild(button);
            ul.appendChild(li);
            tasksLeft();

            saveToLocalStorage();//new
            e.target.value = "";
        }
    });            
    
    document.getElementById("smth-clear-complited").addEventListener("click",()=>{
        document.querySelectorAll(".complited").forEach((value)=>{
            deleteById(value.id);
            ul.removeChild(value)
        });
    });

    document.getElementById("smth-complited").addEventListener('click',()=>{
        ul.innerHTML = "";
        data.forEach((value)=>{
            if(value.complited){
                var button = document.createElement("button");
                button.className = "delete-item";
                button.innerHTML = "&#x2716;";
                deleteListener(button);

                var li = document.createElement("li");
                clickLi(li);
                li.textContent = value.content;
                li.id = value.id;
                li.className = "complited";
                
                li.appendChild(button);
                ul.appendChild(li);
            }
        });
    });

    document.getElementById("smth-active").addEventListener('click',()=>{
        ul.innerHTML = "";
        data.forEach((value)=>{
            if(!value.complited){
                var button = document.createElement("button");
                button.className = "delete-item";
                button.innerHTML = "&#x2716;";
                deleteListener(button);

                var li = document.createElement("li");
                clickLi(li);
                li.textContent = value.content;
                li.id = value.id;
                li.className = "";
                
                li.appendChild(button);
                ul.appendChild(li);
            }
        });
    });
    
    document.getElementById("smth-all").addEventListener('click',()=>{
        ul.innerHTML = "";
        data.forEach((value)=>{
            
                var button = document.createElement("button");
                button.className = "delete-item";
                button.innerHTML = "&#x2716;";
                deleteListener(button);

                var li = document.createElement("li");
                clickLi(li);
                li.textContent = value.content;
                li.id = value.id;
                if(value.complited === true)
                {
                    li.className = "complited";
                }
                
                li.appendChild(button);
                ul.appendChild(li);
            }
        );
    });

});

