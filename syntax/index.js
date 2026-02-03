import { muveletLetrehoz } from "./functions.js"
import { Button } from "./gomb.js"

const div = document.createElement("div")
document.body.appendChild(div)
const inp1 = document.createElement("input")
const inp2 = document.createElement("input")
const gombSzabPlusz = new Button(inp1, inp2, '+', div, "osszeadas")
const gombSzabMinusz = new Button(inp1, inp2, '-', div, "kivonas")
const gombSzabSzoroz = new Button(inp1, inp2, '*', div, "szorzas")



div.appendChild(inp1)
div.appendChild(inp2)
 
/*function Muvelet(a,b){
        return a+b
    }
*/        

const fv = muveletLetrehoz("+")
console.log(fv(1,2))

