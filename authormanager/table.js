import { createTableCell, createTableHeader } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./ViewElement.js";

class TableView extends ViewElement{ //tablazatot tartalmazo viewelement definialasa viewelementbol leszarmazva
    /** @type {AuthorManager} */
    #manager // privat tulajdonsag a managernek
    /** @type {HTMLTableSectionElement} */
    #tbody // privat tulajdonsag a tablazat torzsenek
    
    /**
     * @param {AuthorManager} manager 
     * @param {string} id
     * @param {string[]} headerArr  
     */
    constructor(id, headerArr, manager){
        super(id) //szuloosztaly konstruktoranak meghivasa 
        this.#manager = manager //a manager erteke a bemeneti manager peldany
        const table = document.createElement("table") //letrehozunk egy tablazatot
        this.div.appendChild(table) //hozzacsatoljuk a divhez
        const thead = createTableHeader(headerArr) //letrehozzuk a tablazat fejlecet a string tomb alapjan
        table.appendChild(thead) // hozzafuzzuk a tablazathoz a theadet
        this.#tbody = document.createElement("tbody") //letrehozzuk a tbodyt
        table.appendChild(this.#tbody) //hozzacsatoljuk a tablehez
        this.#manager.tableCallback = (authorList) =>{ //definialjuk a manager tablecallbackjet  a setter megadasaval
            if(authorList.length == 0){ // ha a lista ures letrehozunk egy sor elemet
                const tr = document.createElement("tr") 
                this.#tbody.appendChild(tr) //hozzacsatoljuk a tbodyhoz
                const td = createTableCell(tr, "nincs megjelenitendo sor") //letrhozunk egy cellat tartalommal es hozzafuzzuk a sorhoz
                td.colSpan = 3 //kiterjesztjuk a cellat 3 oszlop szelessegure
            } //bele lehetne tenni else agba
            for(const author of authorList){ //vegigiteralunk az author listan
                const tr = document.createElement("tr") //letrehozunk egy sort
                this.#tbody.appendChild(tr) //hozzafuzzuk a tbodyhoz

                createTableCell(tr, author.name) //letrehozunk egy cellat a sorhoz author nevvel
                createTableCell(tr, author.work)  //letrehozunk egy cellat a sorhoz work nevvel
                createTableCell(tr, author.concept)  //letrehozunk egy cellat a sorhoz concept nevvel
            }
        }
        this.activateCallback = () =>{ // definialjuk az activatecallbacket
            this.#tbody.innerHTML = "" //toroljuk a tbody tartalmat
            this.#manager.getAllElement() //meghivjuk a manager getAllelementjet (ami meghivja a tablecallbacket amit felette definialtunk lasd: authormanager.getAllElement)
        }
    }
}
export {TableView}