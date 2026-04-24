import { createInputAndErrorDiv } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./ViewElement.js";

class FormView extends ViewElement{ // leszarmazunk a viewElementbol es definialjuk a FormController osztalyt

    /** @type {FormField[]} */
    #formInputList //letrehozzuk a privat formInputList tulajdonsagot
    /** @type {AuthorManager} */
    #manager //letrehozzuk a privat manager tulajdonsagot
    /** @type {HTMLFormElement} */
    #form 


    /**
     * 
     * @param {string} id
     * @param {import("./index.js").FormFieldType[]} formFieldList  
     * @param {AuthorManager} manager 
     */
    constructor(id, formFieldList, manager){
        super(id) //meghivjuk a szuloosztaly konstruktorat
        this.#manager = manager //erteket adunk a manager privat tulajdonsagnak
        this.#formInputList = [] //inicializaljuk a forminputlist tulajdonsagot
        const form = document.createElement("form") //letrehozunk egy formot
        for(const field of formFieldList){ //vegigiteralunk a formfieldlistent
            const formField = new FormField(field.id, field.label, field.name, form) //peldanyostijuk a forminputokat
            this.#formInputList.push(formField) //hozzaadjuk a forminputlistahoz
        }
        const button = document.createElement("button") //letrehozunk egy gombot
        button.innerText = "Küldés" //form szovegenek bellitasa
        form.appendChild(button) //hozzafuzzuk a formhoz
        const resultDiv = document.createElement("div") //letrehozunk egy resultdivet a megjelenitendo uzenetnek
        resultDiv.innerText = "eredmeny"
        this.div.appendChild(resultDiv) //hozzacsatoljuk a divhez

        form.addEventListener("submit", (e)=>{ //feliratkozunk a form submit esemenyere
            e.preventDefault() //megakadalyozzuk az urlap alapertelmezett mukodeset
            const elem = this.#createElement() //meghivjuk a createElement metodust
            this.#manager.addElement(elem) //meghivjuk a manager addelement fuggvenyet (lasd: authormanager.addelement)

            
        })

        this.div.appendChild(form)
        this.#manager.addElementResultCallback = (result) =>{ //definialjuk az addelementresultcallbacket (az authormanager.addElement hivja a callbackewt)
            resultDiv.innerText = result //beallitjuk a resultdiv ertekenek a kapott stringet
            setTimeout(()=>{ //meghivjuk a setTimeoutot
                resultDiv.innerText = "" //toroljuk a resultdiv tartalmat
            }, 1500) //masfel masodperc mulva
        }
        
    }
    /**
     * @returns {import("./index.js").AuthorType}
     */
    #createElement(){ // createelement metodus definialasa
        /**
         * @type {import("./index.js").AuthorType}
         */
        let result = {} //letrehozunk egy authortype tipusu objektumot
        for(const field of this.#formInputList){ //vegigiteralunk a forminputlist elemein
            if(field.validate()){ //meghivjuk minden forminputra a validate fuggvenyt
                result[field.name] = field.value // a result objektum forminputfield name ertekevel megegyezo nevu tulajdonsaganak megadjuk a forminput beviteli mezo inoutjanak az erteket
            }
        }
        return result //visszaterunk az objektummal
    }
}

class FormField { // definialunk egy formField osztalyt
    /** @type {HTMLInputElement} */
    #inputElement //definialunk egy privat inputElement tulajdonsagot
    /** @type {HTMLDivElement} */
    #errorDiv //definialunk egy privat errorDiv tulajdonsagot
    /** @type {string} */
    #name //definialunk egy privat name tulajdonsagot

    get name() { //definialunk gettert a namenek
        return this.#name // visszaterunk a name tulajdonsag ertekevel 
    }

    get value(){ //definialunk gettert a valuenak
        return this.#inputElement ? this.#inputElement.value : undefined //amennyiben az inputElementnek van beirt erteke akkor visszater vele egyebkent undefineddel ter vissza
    }

    /**
     * 
     * @param {string} id 
     * @param {string} label 
     * @param {string} name 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, label, name, parent){ //definialunk egy konstruktort 
        const {input, errorDiv} = createInputAndErrorDiv({id, label, name, parent}) //letrehozunk egy divet ami letrehoz egy idt labelt namet
        this.#name = name //beallitjuk a name tulajdonsag erteket 
        this.#inputElement = input //visszateresi ertek input tulajdonsag erteket allitjuk be
        this.#errorDiv = errorDiv //visszateresi ertek errorDiv tulajdonsag erteket allitjuk be
    }
    /**
     * @returns {boolean}
     */
    validate(){ //definialjuk a validate fuggvenyt 
        let result = true //letrehozunk egy result valtozot igaz ertekkel
        if(!this.value){ //ha a value getter visszateresi erteke undefined
            this.#errorDiv.innerText = "Mező kitöltése kötelező" //beallitjuk az errordiv  erteket hibauzenetre
            result = false //a result erteket falsera allituk
        }else{ //egyebkent
            this.#errorDiv.innerText = "" //toroljuk az errordiv tartalmat
        }
        return result //visszaterunk a result valtozo ertekevel
    }
}
export {FormView} //exportaljuk a formViewet