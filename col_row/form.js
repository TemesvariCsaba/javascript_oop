import { Manager } from "./manager.js";

class FormController{
    /** @type {Manager} */
    #manager
    /** @type {FormField[]} */
    #formFieldElemList
    /**
     * 
     * @param {FormFieldType[]} formFieldList 
     * @param {Manager} manager 
     */
    constructor(formFieldList, manager){
        this.#manager = manager
        const form = document.createElement("form")
        document.body.appendChild(form)
        this.#formFieldElemList = []

        for(const formField of formFieldList){
            const formFieldElem = new FormField(formField.id, formField.name, formField.label,formField.required, form )
            this.#formFieldElemList.push(formFieldElem)
        }

        
        const button = document.createElement("button")
        button.innerText = "Küldés"
        form.appendChild(button)

        form.addEventListener("submit", (e) => {
            //elkerjuk a beviteli meo erteket majd hozzaadjuk a managerhez
            e.preventDefault()
            const elem = this.#createElement()
            if(elem){
                this.#manager.addElement(elem)
                e.target.reset()
            }
            
        })
    }

    /**
     * 
     * @returns {ColspanType | RowspanType | null}
     */
    #createElement(){
        let valid = true
        const result = {}
        for(const inputFields of this.#formFieldElemList){
            
            if(inputFields.validate()){
                result[inputFields.name] = inputFields.value
            }else{
                valid = false
            }

        }
        if(valid){
            return result
        }else{
            return null
        }
        
    }
}
class FormField{
    /** @type {HTMLInputElement} */
    #input
    /** @type {string} */
    #name

    /** @type {boolean} */
    #required 
    /** @type {HTMLDivElement} */
    #errorDiv
    get value(){
        return this.#input.value ? this.#input.value: undefined 
    }
    get name(){
        return this.#name
    }
    /**
     * 
     * @param {string} id 
     * @param {string} name 
     * @param {string} labelContent
     *  @param {boolean} required 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, name, labelContent, required, parent){
        

        const div = document.createElement("div")
        parent.appendChild(div)

        const label = document.createElement("label")
        label.innerText = labelContent
        label.htmlFor = id
        div.appendChild(label)

        const input = document.createElement("input")
        input.id = id
        input.name = name
        div.appendChild(input)

        const br = document.createElement("br")
        div.appendChild(br)

        const errorDiv = document.createElement("div")
        errorDiv.classList.add("error")
        div.appendChild(errorDiv)
        this.#required = required
        this.#errorDiv = errorDiv

        this.#input = input
        this.#name = name

    }
    /**
     * 
     * @returns {boolean}
     */
    validate(){
        let result = true
        if(this.#required && !this.value){
            result = false
            this.#errorDiv.innerText = "Kötelező"
        }else{
            this.#errorDiv.innerText = ""
        }
        return result
    }
}
export {FormController}