
var modMain=require('../core/main');
var Main=modMain.classMain;
var modBaseQuestion=require('../param/base-question');
var baseQuestion=modBaseQuestion.baseQuestion;
export class Facade {

    constructor(){
        this.main=new Main(baseQuestion);
    }

    getStartIssuse(){
        return this.main.getRandomIssue();
    }

    getNextIssuse(){
        return this.main.getIssue();
    }
    getTypeDiseases(){
        return this.main.calculationDiseasePriority();
    }

    go(question,mas){
        this.main.addDiseases(mas);
        this.main.addQuestion(question);
    }
}