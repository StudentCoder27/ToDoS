document.addEventListener("DOMContentLoaded",()=>{

    var data = [{
        content : "TEsT COMPONEnT",
        complited : true,
        id : 0
    },
    {
        content : "TEsT FALSE",
        complited : false,
        id: 1
    }
    ];

    var deleteById = (id) => {
        for(let element of data)
        {
            if(element.id == id)
            {
                delete element;
                console.log(`${id} deleted`);
            }
        } 
    };

    var toggleComplitedById = (id) => {
        for(let element of data)
        {
            if(element.id == id)
            {
                if(element.complited){
                    element.complited = false;
                    console.log(`${id} toggled`);
                    return false;
                }else
                {
                    console.log(`${id} toggled`);
                    element.complited = true;
                    return true;
                }
                
            }
        } 
    };

    var listOfButton = document.querySelectorAll(".list>ul>li>button");
    var listOfLi = document.querySelectorAll(".list>ul>li");

    var deleteListener = (element) => {
        element.addEventListener("click",(e)=>{
            
            thisLi = e.target.parentNode;
            deleteById(thisLi.id);
            thisUl = thisLi.parentNode;
            thisUl.removeChild(thisLi); 
        })
    };
    
    var clickLi = (element) => {
        element.addEventListener("click",(e) => {
            if(toggleComplitedById(e.target.id))
            {
                element.className = "complited";
            }else
            {
                element.className = "";
            }
        },false);
    };
    listOfLi.forEach(clickLi);
    listOfButton.forEach(deleteListener);

    var ul = document.querySelector(".list>ul");

    data.forEach((element)=>{
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
    });

    

    document.getElementById("add-new-to-do").addEventListener('keyup',(e)=>{
        if(e.keyCode === 13 && e.target.value !== "")
        {
            data.push({
                content : e.target.value,
                complited : false,
                id: (()=>{
                    lastElement = data[data.length-1];
                    return (lastElement.id + 1)

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
        }
    });            
    
    
});

