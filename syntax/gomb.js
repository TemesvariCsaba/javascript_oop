import { muvelet, muveletLetrehoz } from "./functions.js"
class Button{
    constructor(input1, input2, muveletString, eredmenyDiv, buttonName){
        const button = document.createElement("button")
        button.innerText = buttonName
        button.addEventListener("click", function(){
        this.input1 = Number(input1.value)
        this.input2 = Number(input2.value)
        this.eredmenyDiv = eredmenyDiv
        this.eredmenyDiv.innerText = muvelet(this.input1 ,this.input2 ,muveletLetrehoz(muveletString)).eredmeny
          
        })
        eredmenyDiv.appendChild(button)
    }
}
export {Button}