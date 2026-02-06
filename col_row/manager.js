/** @import {FormFieldType, HeaderArrayType , ColspanType, RowspanType} from './functions.js'} 
    @callback AddCallback  
 *  @param {ColspanType | RowspanType} param
 *  @returns {void}
*/



class Manager{
    /** @type {ColspanType[] | RowspanType[]} */
    #dataArr
    /** @type {AddCallback} */
    #addCallback
    constructor(){
        this.#dataArr = []
    }
    
    /**
     * @param {AddCallback} value 
     */
    set callback(value){
        this.#addCallback = value
    }
    /**
     * 
     * @param {ColspanType | RowspanType} element
     * @returns {void} 
     */
    addElement(element){
        this.#dataArr.push(element)

        if(this.#addCallback){
            this.#addCallback(element)
        }
    }
}
export {Manager }