import { createTableCell, createTableHeader } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewElement.js";

class TableView extends ViewElement{
    /** @type {AuthorManager} */
    #manager
    /** @type {HTMLTableSectionElement} */
    #tbody
    
    /**
     * @param {AuthorManager} manager 
     * @param {string} id
     * @param {string[]} headerArr  
     */
    constructor(id, headerArr, manager){
        super(id)
        this.#manager = manager
        const table = document.createElement("table")
        this.div.appendChild(table)
        const thead = createTableHeader(headerArr)
        table.appendChild(thead)
        this.#tbody = document.createElement("tbody")
        table.appendChild(this.#tbody)
        this.#manager.tableCallback = (authorList) =>{
            for(const author of authorList){
                const tr = document.createElement("tr")
                this.#tbody.appendChild(tr)

                createTableCell(tr, author.name)
                createTableCell(tr, author.work)
                createTableCell(tr, author.concept)
            }
        }
    }
}
export {TableView}