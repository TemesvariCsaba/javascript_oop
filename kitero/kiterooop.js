class Student {
    constructor(name){
        this.name = name
        this.askedQuestionNumber = 0
    }
    askQuestion(){
        console.log("???")
        this.askedQuestionNumber ++
    }
}
const stu1 = new Student("Csaba")
stu1.askQuestion();
console.log(stu1)

class StudentWithWork extends Student{
    constructor(name){
        super(name)
        this.workDone = 0
    }
    doWork(){
        this.workDone ++
    }
}
const stu2 = new StudentWithWork("Temesvari")
stu2.doWork()
stu2.askQuestion()
console.log(stu2)