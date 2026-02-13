/** @import {'functions.js'} 
    @callback AddCallback  
 *  @param {ColspanType | RowspanType} param
 *  @returns {void}
*/
import { Manager } from './manager.js'
import data from './data.json' with {type: 'json'}
import { Table } from './table.js'
import { FormController } from './form.js'

const manager = new Manager()

const table = new Table(data.colspanHeaderArray, manager)

const renderTbodyColspan = (tbody, elem) =>{
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
    if(elem.szerelme2){
        const tdSzer2 = document.createElement("td")
        tdSzer2.innerText = elem.szerelme2
        tr.appendChild(tdSzer2)
    }
    else{
        tdSzer.colSpan = 2
    } 
} 
table.setAppendRow(renderTbodyColspan)
for(const x of data.colspanDataArr){
    manager.addElement(x)
}

const form = new FormController(data.colspanFormFieldList, manager)
    
