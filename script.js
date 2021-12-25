// let apiKey = "c26ebf136313df0d1c172ae9ccbc44a4";
// const inp = document.querySelector("input");
// const submit = document.querySelector("button")
// async function req(city){
//     let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`,{
//         method:"GET",
//     })
//     let g = await response.json();
//     console.log(g);
//     return g;
// }


// req("london")

class FetchContent{
    constructor(city){
        this.apiKey = "c26ebf136313df0d1c172ae9ccbc44a4";
        this.city = city;
        this.request();
    }
    async request(){
        try{
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=metric`,
                {
                    method:"GET"
                });
            let obj = await response.json()
            if(obj.message){
                alert(obj.message)
                return;
            }
            let {name,main:{temp},sys:{country},weather} = obj;
            let {description , icon} = weather[0];
            // console.log(name , temp , country , description , icon);
            new ShowContent(name,country,temp,icon,description)
        }catch(err){
            console.log(err);
        }
        
    }
}

class ShowContent{
    constructor(name, country, temp, icon, description){
        this.name = name;
        this.country  = country;
        this.temp = Math.round(+temp);
        this.icon = icon;
        this.desc = description;
        this.show();
    }
    show(){
        let div = document.createElement("div");
        div.classList.add("card")
        let template = document.importNode(document.querySelector("template").content, true);
        
        template.querySelector(".city").insertAdjacentText("afterbegin", this.name);
        template.querySelector(".city span").textContent = this.country;
        template.querySelector(".temp h1").textContent = this.temp;
        template.querySelector(".status img").src = `https://openweathermap.org/img/w/${this.icon}.png`;
        template.querySelector(".status p").textContent = this.desc;
        // console.log(template.querySelector("."));
        div.appendChild(template)
        document.querySelector(".cards-cont").appendChild(div);
        // console.log(template, div);
    }
}

class Start{
    constructor(){
        this.formDisable()
        this.declare();
    }
    formDisable(){
        document.querySelector("form").addEventListener("submit", event=>{
            event.preventDefault();
            
        })
    }
    declare(){
        let btn = document.querySelector("button");
        // console.log(btn , inpVal);
        btn.addEventListener("click", this.getValue)
    }
    getValue(){
        let inpVal = document.querySelector("input");
        let fetch = new FetchContent(inpVal.value);
        inpVal.value = "";
    }
}

new Start()