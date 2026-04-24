/**
 * @callback TableCallback
 * @param {Author[]} authorList
 * @returns {void}
 * 
 * @callback AddElementResultCallback
 * @param {string} message
 * @returns {void}
 * 
 * @callback ImportResultCallback
 * @param {string} message
 * @returns {void}
 */

class AuthorManager{ //definialjuk az authorManager osztalyt 
    
    /**@type {Author[]} */
    #authorList // definialunk egy privat authorList tulajdonsagot
    /** @type {TableCallback} */
    #tableCallback //definialunk egy privat tablecallback tulajdonsagot (lasd getAllElement)
    /** @type {AddElementResultCallback} */
    #addElementResultCallback //definialunk egy addelementresultcallback tulajdonsagot (lasd addelement)
    /** @type {ImportResultCallback} */
    #importResultCallback //definialunk egy privat importresultcallback tulajdonsagot (lasd addelementList)

    /**
     * @param {AddElementResultCallback} value 
     */
    set addElementResultCallback(value){ //definialunk egy settert az addelementresultcallbacknek (hivjuk a fromviewben)
        this.#addElementResultCallback = value //erteket adunk a privat tulajdonsagnak
    }

    /**
     * @param {TableCallback} value 
     */
    set tableCallback(value){ //definialunk egy settert a tablecallbacknek (hivjuk a tableben)
        this.#tableCallback = value //erteket adunk a privat tulajdonsagnak
    }
    /**
     * @param {ImportResultCallback} value 
     */

    set importResultCallback(value){ //definialunk egy settert a tablecallbacknek (hivjuk a tableben)
        this.#importResultCallback = value //erteket adunk a privat tulajdonsagnak
    }

    constructor(){ //definialunk egy konstruktort
        this.#authorList = [] //inicializaljuk az authorListet ures tombbel
    }
    /** @param {import(".").AuthorType} element */
    addElement(element){  //definialjuk az addElement fuggvenyt
        const author = new Author() //peldanyositunk egy authort 
        author.id = this.#authorList.length //beallitjuk az id tulajdonsag erteket a kovetkezo indexre
        author.name  =element.author //beallitjuk a name tulajdonsagot
        author.work = element.work //beallitjuk a work tulajdonsagot
        author.concept = element.concept //beallitjuk a concept tulajdonsagot
        if(author.validate()){ //meghivjuk a validate fuggvenyet az author peldanyanak es ha valid
            this.#authorList.push(author) //hozzaadjuk a listahoz az elemet 
            this.#addElementResultCallback('Sikeres elemfelvetel') //meghivjuk az addelementresultcallbacket es megadjuk a szoveget
        }else{// egyebkent
            this.#addElementResultCallback("Nem volt sikeres az elemfelvetel")
        }
        
    }
    /**
     * 
     * @param {import(".").AuthorType[]} elementList 
     */
    addElementList(elementList){ //definialjuk az addelementlist fuggvenyt 
        for(const elem of elementList){ //vegigiteralunk az elementlisten
            const author = new Author() //peldanyositjuk az authort
            author.id = this.#authorList.length //beallitjuk az idt
            author.name = elem.author //namet
            author.work = elem.work //workot
            author.concept = elem.concept //conceptet
            if(author.validate()){ // meghivjuk a validatet (lasd author.validate)
                this.#authorList.push(author) //ha valid hozzaadjuk az authorlistahoz
                this.#importResultCallback("sikeres volt.") //meghivjuk az importresultCallbacket
            }
            else{
                this.#importResultCallback("Sikertelen muvelet")
                break; //megallitjuk a ciklus futasat uj elemet nem fogunk vizsgalni, hogy megelel e
            }
        }
    }

    /**
     * @returns {void}
     */
    getAllElement(){ //definialjuk a getallelement fuggvenyt
        this.#tableCallback(this.#authorList) //meghivjuk a tablecallbacket (implementacio lasd: Table)
    }
    /**
     * @returns {string}
     */
    getExportString(){ // definialjuk a getExporrtString fuggvenyt
        const result = [] // definialunk egy ures tombot
        for(const author of this.#authorList){ //vegigiteralunk az authorListen
            result.push(`${author.name};${author.work};${author.concept}`) //hozzaadjuk a tombhoz a string reprezentaciojat az entitashoz

        }
        return result.join("\n") // joinoljuk egy sortores karakterrel a tomb string elemeit
    }
}

class Author{  // definialunk egy author entitas osztalyt
    /** @type {string} */
    #id //definialunk egy id privat tulajdonsagot
    /** @type {string} */
    #name //definialunk egy name privat tulajdonsagot
    /** @type {string} */
    #work //definialunk egy work privat tulajdonsagot
    /** @type {string} */
    #concept //definialunk egy concept privat tulajdonsagot

    get id(){ //definialunk gettert az azonositonak
        return this.#id // visszaterunk a privat id tulajdonsaggal
    }

    get name(){ //definialunk gettert a namenek
        return this.#name // visszaterunk a privat name tulajdonsaggal
    }

    get work(){ //definialunk gettert a worknek
        return this.#work // visszaterunk a privat work tulajdonsaggal
    }

    get concept(){ //definialunk gettert a conceptnek
        return this.#concept // visszaterunk a privat concept tulajdonsaggal
    }

    set id(value){ //setter az idnek
        this.#id = value //beallitjuk az id-t
    }
    set name(value){ //setter az namenek
        this.#name = value //beallitjuk az name-t
    }
    set work(value){ //setter az worknek 
        this.#work = value //beallitjuk az work-t
    }
    set concept(value){ //setter az conceptnek
        this.#concept = value //beallitjuk az concept-t
    }

    /**
     * @returns {boolean}
     */
    validate(){ //definialunk egy validate fuggvenyt a peldanynak
        return this.#name && this.#concept && this.#work //ha mindennek helyes erteke van akkor beallitja
    }
}

export {AuthorManager}