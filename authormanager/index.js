
/**
 * @typedef {{id: number, author?: string, work?: string, concept?: string}} AuthorType
 * @typedef {{id: string, label: string, name: string}} FormFieldType
 */

import { FormView } from "./form.js";
import { ImportView } from "./importexport.js";
import { AuthorManager } from "./manager.js";
import { Navigationbar } from "./navigationBar.js"
import { TableView } from "./table.js";

const formFields = [{ //letrehozunk egy formfieldlistat ami alapjan peldanyositja a formcontroller a formfield peldanyokat
    id: 'author',
    label: 'Név',
    name: 'author'
},
{
    id: 'work',
    label: 'Mű',
    name: 'work'
},
{
    id: 'concept',
    label: 'Fogalom',
    name: 'concept'
}]

const headerArray = ['Szerző', 'Mű', 'Fogalom'] //letrehozunk egy headerlistat

const manager = new AuthorManager() //peldanyositjuk a managert

const navBar = new Navigationbar(); //a navbart
navBar.appendTo(document.body) //hozzafuzzuk a bodyhoz

const tableView = new TableView("table", headerArray, manager); //peldanyositjuk a tablet
tableView.appendTo(document.body) //hozzafuzzuk a tablet a bodyhoz
navBar.addviewElement("Táblázat", tableView) //hozzaadjuk a tablet a navbarhoz


const formView = new FormView("tableform", formFields, manager) //peldanyositjuk a formviviwet
formView.appendTo(document.body) // hozzafuzzuk a bodyhoz
navBar.addviewElement("Form", formView) //hozzaadjuk a navbarhoz

const importExport = new ImportView("importexport", manager) //peldanyositjuk az importexportot
importExport.appendTo(document.body) //hozzafuzzuk a bodyhoz
navBar.addviewElement("Import/Export", importExport) //hozzaadjuk a navbarhoz

navBar.activate("table") //meghivjuk a navbar activate metodusat a table azonositojaval
