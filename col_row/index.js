/** @import {'functions.js'} 
    @callback AddCallback  
 *  @param {ColspanType | RowspanType} param
 *  @returns {void}
*/
import { Manager } from './manager.js'
import data from './data.json' with {type: 'json'}
import { Table } from './table.js'

const manager = new Manager()
for(const x of data.colspanDataArr){
    manager.addElement(x)
}
const table = new Table()
table.setAppendRow((tbody, elem)=>{
    const tr = document.createElement("tr")
    tbody.appendChild(tr)
    const tdNev = document.createElement("td")
    tdNev.innerText = elem.neve
    tr.appendChild(tdNev)
    const tdKor = document.createElement("td")
    tdKor.innerText = elem.kor
    tr.appendChild(tdKor)
    const tdSzer = document.createElement("td")
    tdSzer.innerText = elem.szerelme1
    tr.appendChild(tdSzer)
    
})