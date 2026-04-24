import { createRadioButton } from "./gomszab.min.js";
import { ViewElement } from "./ViewElement.js";

class Navigationbar extends ViewElement{ //navigaitonbar osztaly definicioja
    /** @type {ViewElement[]} */
    #viewElementList // privat tulajdonsag ami tartalmazza a megjelenitendo viewelement leszarmazottakat

    constructor(){
        super("navbar")
        this.#viewElementList = []
        this.div.addEventListener('change', (e)=>{
            const radoiButtonValue = e.target.value
            this.activate(radoiButtonValue)
        })
    }
    /**
     * 
     * @param {string} label 
     * @param {ViewElement} viewElement 
     */
    addviewElement(label, viewElement){
        this.#viewElementList.push(viewElement)
        const div = createRadioButton({id: viewElement.id, name: this.id, label})
        this.div.appendChild(div)
    }
    /**
     * @override
     * @param {string} value 
     */
    activate(value){
        for(const viewElement of this.#viewElementList){
            viewElement.activate(value)
        }
        this.div.querySelector(`#${value}`).checked = true
    }
}
export {Navigationbar}