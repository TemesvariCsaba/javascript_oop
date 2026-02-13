/** @import {'functions.js'} 
    @callback AddCallback  
 *  @param {ColspanType | RowspanType} param
 *  @returns {void}
 *  
 *  @callback TableCallBack
 *  @param {HTMLTableSectionElement} tbody
 *  @param {ColspanType | RowspanType}
 *  @returns {void}
*/
import { Manager } from './manager.js'
import data from './data.json' with {type: 'json'}

class Table{
    /** @type {HTMLTableSectionElement} */
    #tbody
    /**@type {Manager} */
    #manager
    /**
     * 
     * @param {HeaderArrayType} headerArr 
     * @param {Manager} manager 
     */
    constructor(headerArr, manager ){
        this.#manager = manager
        const table = document.createElement("table")
        document.body.appendChild(table)
        const thead = document.createElement("thead")
        table.appendChild(thead)
        const tbody = document.createElement("tbody")
        table.appendChild(tbody)
        const trHead = document.createElement("tr")
        thead.appendChild(trHead)
        for(const h in headerArr){
            const th = document.createElement("th")
            th.innerText = h.name
            trHead.appendChild(th)
        }
        this.#tbody = tbody
    }
    /**
     * 
     * @param {TableCallBack} callback 
     */
    setAppendRow(callback){
        this.#manager.callback = (element) =>{
            callback(this.#tbody, element)
        }
    }
}
export {Table}