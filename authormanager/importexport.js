import { AuthorManager } from "./manager.js";
import { ViewElement } from "./ViewElement.js";

class ImportView extends ViewElement{ // definialjuk az importexport osztalyt leszarmazik a viewelementbol
    /** @type {AuthorManager} */
    #manager //definialunk egy privat manager tulajdonsagot

    /**
     * 
     * @param {string} id 
     * @param {AuthorManager} manager 
     */
    constructor(id, manager){ //konstruktor dfinialasa
        super(id) //szuloosztaly konstruktor meghivasa
        this.#manager = manager //manager tulajdonsaganak az ertek megadasa
        const fileInput = document.createElement("input") //input letrehozasa
        fileInput.type = "file" //tipus fajlra allitasa
        this.div.appendChild(fileInput) //input hozzafuzese a divhez
        const resultDiv = document.createElement("div")
        this.div.appendChild(resultDiv) //resultDiv hozzacsatolasa a divhez
        this.#manager.importResultCallback = (message) =>{ //fuggveny definialasa 
            resultDiv.innerText = message //resultdiv tartalmanak beallitasa
            setTimeout(()=>{ //settimeout hivasa
                resultDiv.innerText = "" //tartalom torlese masfel mp mulva
            }, 1500)
        }
        fileInput.addEventListener("change", (e)=>{ //change esemenyre valo feliratkozasa
            const file = e.target.files[0] //elkerjuk az esemeny targetjenek a files tulajdonsagabol az elso elemet
            const reader = new FileReader() //peldanyositjuk a filereader osztalyt
            reader.readAsText(file, "UTF-8") // elkezdjuk beolvasni a fajlt a memoriaba (ha sikeres akkor fut le az onload) 
            reader.onload = () =>{ //feliratkozunk az onload esemenyre
                /** @type {import("./index.js").AuthorType[]} */
                const result =[] //leterhozunk egy result tombot ures tombkent
                const fileContent = reader.result //elkerjuk a filereader result tulajdonsagat
                const fileContentLines = fileContent.split("\n") //szetvalasztjuk a file tartalmat soronkent
                for(const line of fileContentLines){// vegigiteralunk a sorokon
                    const data = line.split(";") // szetvalasztjuk a sorokat pontosvesszonkent
                    /** @type {import("./index.js").AuthorType} */
                    const authorType = { //deklaralunk egy authortipusu objektumot
                        author:data[0], //ahol az author a sor elso pontosvesszojeig tart
                        work:data[1], //a work a masodikig
                        concept:data[2] // a vege pedig a content
                    }
                    result.push(authorType) //hozzaadjuk az objektumot a result tombhoz
                    
                } 
                this.#manager.addElementList(result) //meghivjuk a tombbel az authormanager.addelementlist metodusat
            }
        })
        const exportButton = document.createElement("button") //letrehozunk egy gombot
        exportButton.innerText = "export" //megadjuk a gomb szoveget
        this.div.appendChild(exportButton) //hozzafuzzuk a divhez a gombot
        exportButton.addEventListener("click", ()=>{ //feliratkozunk a gomb click esemenyere
            const a = document.createElement("a") //letrehozunk egy linket
            const fileContent = this.#manager.getExportString() //elkerjuk az authorok string reprezentaciojat az AuthorManagertol
            const file = new Blob([fileContent]) //peldanyositunk egy Blobot amelynek megadjuk a tombot ami tartalmazza az authorok string reprezentaciojat
            const fileUrl = URL.createObjectURL(file) //letrehozunk egy url- t a Blob alapjan 
            a.href = fileUrl //megadjuk a link hrefjenek a letrehozott Blob urljet 
            a.download = "export.csv" //megadjuk a letoltendo file nevet
            a.click() //clickelunk a linken
            URL.revokeObjectURL(a.href) //visszavonjuk a Blob linkjenek az urljet
        })
    }

}
export {ImportView} //exportaljuk az osztalyt