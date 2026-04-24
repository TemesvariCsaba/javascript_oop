import { createRadioButton } from "./gomszab.min.js";
import { ViewElement } from "./ViewElement.js";

class Navigationbar extends ViewElement{ //navigaitonbar osztaly definicioja
    /** @type {ViewElement[]} */
    #viewElementList // privat tulajdonsag ami tartalmazza a megjelenitendo viewelement leszarmazottakat (tablazat form inport export)

    constructor(){ //konstruktor def
        super("navbar") //meghivjuk a szuloosztaly konstruktorat 
        this.#viewElementList = [] 
        this.div.addEventListener('change', (e)=>{ //feliratkozunk a div change esemenyere (mivel a div radiogombokat fog tartalmazni ezert tudjuk figyelni a divnel hogy melyik radiogomb lesz kijelolve)
            const radoiButtonValue = e.target.value // elkerjuk a target value erteket
            this.activate(radoiButtonValue) // meghivjuk az activate fuggvenyt a kivalasztott radiogomb ertekevel (viewelement azonositoi lehetnek) lasd : addivewelement
        })
    }
    /**
     * 
     * @param {string} label 
     * @param {ViewElement} viewElement 
     */
    addviewElement(label, viewElement){ //navbar peldanyanak definial egy fuggvenyt 
        this.#viewElementList.push(viewElement) //bemeneti viewelementet hozzaadjuk a viewelementlistahoz
        const div = createRadioButton({id: viewElement.id, name: this.id, label}) //csinalunk egy radiogombot amelynek az
        //es a name az a navigationbar azonositoja azert mert a radiogomboknal ha azonos a name tulajdonsag csak egy 
        this.div.appendChild(div) //hozzafuzzuk a divhez a radiogomb krealas visszateresi erteket (this.div lasd a viewwlelement osztaly definiconal)

    }
    /**
     * @override
     * @param {string} value
     *  
     */
    activate(value){ // a szulo osztaly definial egy activate fuggvenyt de a navigacios bar mas logikat kell tartalmazzon
        for(const viewElement of this.#viewElementList){ //vegigiteralunk a viewelementlisten (table, form, import, exportot taralmazza)
            viewElement.activate(value) //meghivjuk az activate fuggvenyet minden viewelementnek (lasd viewElement.activate)
        }
        this.div.querySelector(`#${value}`).checked = true // a diven belul lekerjuk a bemeneti parameterrel megegyezo id ju elemet es kijeleoltre allitjuk
    }
}
export {Navigationbar} //