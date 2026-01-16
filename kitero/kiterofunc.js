function Student(name){
    this.name = name
    this.askedQuestionNumber = 0
}
Student.prototype.askQuestion = function(){
    console.log("??")
    this.askedQuestionNumber ++
}
const stu1 = new Student("Csaba")
console.log(stu1)
stu1.askQuestion()
console.log(stu1)

const stu2 = new Student("Temesvári")
console.log(stu2)
stu2.askQuestion()  
console.log(stu2)

function StudentWithWork(name){
    Student.call(this, name)
    this.workDone = 0
}
StudentWithWork.prototype.doWork = function(){
    this.workDone ++
}
Object.setPrototypeOf(StudentWithWork.prototype, Student.prototype)
const stu3 = new StudentWithWork("pikachu")
stu3.askQuestion()
stu3.doWork()
console.log(stu3)