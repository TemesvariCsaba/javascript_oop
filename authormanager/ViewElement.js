/**
 * @callback ActivateCallback
 * @returns {void}
 */
import { hide, show } from "./gomszab.min.js"

class ViewElement{ //ososztaly a megjelenitendo view osztalyoknak
    /** @type {HTMLDivElement} */ 
    #div //peldanyositaskor letrehozunk egy divet az elemnek azt taroljuk el benne
    /**@type {string} */
    #id //érkvat tulajdonsag az osztaly peldanyanak
    /** @type {ActivateCallback} */
    #activateCallback // akkor fut le amikor aktivva valik az adott elem (opcionalis) lasd activate fuggveny

    get div(){ //getter a divnek visszater a privat div tulajdonsaggal
        return this.#div
    }

    get id(){ //getter az azonsositonak (navigaciokor hasznalatos)
        return this.#id
    }

    /**
     * @param {ActivateCallback} value 
     * setter az activatecallbacknek beallitja a bemeneti parametert
     */
    set activateCallback(value){
        this.#activateCallback = value
    }
    /**
     * 
     * @param {string} id 
     * konstrutkor bemeneti azonositoval
     */
    constructor(id){
        this.#id = id //azonosito beallitasa
        this.#div = document.createElement("div") //div letrehozasa
        this.#div.id = id; //div azonositojanak beallitasa
    }

    /**
     * 
     * @param {HTMLElement} parent 
     * @returns {void}
     */
    appendTo(parent){ //definialunk egy fuggvenyt a peldanynak a bemeneti parameter egy hmtl elem
        parent.appendChild(this.#div) //a html elemhez hozzacsatoljuk a div tulajdonsagot (lasd konstruktor)
    }
    /**
     * 
     * @param {string} id 
     * @returns {void}
     */
    activate(id){   // fuggvenyt definialunk a peldanyoknak
        if(this.#id === id){ //osszehasonlitjuk a bemeneti id parametert az id tulajdonsaggal
            show(this.#div) //divtol leveszi a hidden osztalyt
            if(this.#activateCallback){ //ha van activatecallback akkor 
                this.#activateCallback() //meghivjuk az activatecallbacket
            }
        }else{
            hide(this.#div) //egyebkent hozzafuzzuk a divhez a hide osztaly
        }
    }
}
export {ViewElement} //exportaljuk a viewelementet