import { muvelet, muveletLetrehoz } from "./functions.js"

const div = document.createElement("div")
document.body.appendChild(div)
const inp1 = document.createElement("input")
const inp2 = document.createElement("input")
const gombSzab = document.createElement("button")
gombSzab.innerText = "Merge!!!!"

gombSzab.addEventListener("click", function(){
    const inp1Num = Number(inp1.value)
    const inp2Num = Number(inp2.value)
    const {eredmeny} = muvelet(inp1Num, inp2Num ,muveletLetrehoz("+"))
    div.innerText = eredmeny
})
div.appendChild(gombSzab)
div.appendChild(inp1)
div.appendChild(inp2)
 
/*function Muvelet(a,b){
        return a+b
    }
*/        

const fv = muveletLetrehoz("+")
console.log(fv(1,2))

