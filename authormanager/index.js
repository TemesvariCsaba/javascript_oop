
/**
 * @typedef {{id: number, author?: string, work?: string, concept?: string}} AuthorType
 * @typedef {{id: string, label: string, name: string}} FormFieldType
 */

import { FormView } from "./form.js";
import { AuthorManager } from "./manager.js";
import { Navigationbar } from "./navigationBar.js"
import { TableView } from "./table.js";

const formFields = [{
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

const headerArray = ['Szerző', 'Mű', 'Fogalom']

const manager = new AuthorManager()

const navBar = new Navigationbar();
navBar.appendTo(document.body)

const tableView = new TableView("table", headerArray, manager);
tableView.appendTo(document.body)
navBar.addviewElement("Táblázat", tableView)

const formView = new FormView("tableform", formFields, manager)
formView.appendTo(document.body)
navBar.addviewElement("Form", formView)

navBar.activate("table")
