/**
 * 
 * @param {string} color 
 */
function Tanyer(color){
    this.color = color
}
/**
 * 
 * @param {string} color 
 */
function kisTanyer(color){
    Tanyer.call(this, color)
    this.size = "kistányér"
}
/**
 * 
 * @param {string} color 
 */
function nagyTanyer(color){
    Tanyer.call(this,color)
    this.size = "nagytányér"
}
/**
 * 
 * @param {string} color 
 */
function Pohar(color){
    this.color = color
}

const ktanyer1 = new kisTanyer("piros")
console.log(ktanyer1)
const ktanyer2 = new kisTanyer("hupilila")
console.log(ktanyer2)
const ntanyer = new nagyTanyer("ikeas feher")
console.log(ntanyer)
const pohar = new Pohar("uvegszinu")
console.log(pohar)


class Dishes {
    constructor(color){
        this.color = color
    }
}

class SmallDish extends Dishes{
    constructor(color){
        super(color)
        this.size = "kistányér"
    }
}
class BigDih extends Dishes{
    constructor(color){
        super(color)
        this.size = "nagytányér"
    }
}

class Glasses {
    constructor(color){
        this.color = color
    }
}

const sDih1 = new SmallDish("piros")
const sDih2 = new SmallDish ("hupilila")
const xxlDih = new BigDih ("fekete")
const glass = new Glasses("uvegszinu")

console.log(sDih1)
console.log(sDih2)
console.log(xxlDih)
console.log(glass)