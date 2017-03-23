import { Facade } from './core/facade';
cc.Class({
    extends: cc.Component,
    properties: {
        btnStart: cc.Node,
        pnlQuestions: cc.Node,
        pnlFinish: cc.Node,
        question: cc.Label,
        finish: cc.Label,
        API: null
    },
    onLoad: function () {
        this.amountQuestion=0;
        this.API = new Facade();
    },

    onClickBtnStart() {
        this.btnStart.active = false;
        this.pnlQuestions.active = true;
        this.getQuestion();
    },

    onClickBtnYes() {
        this.API.go(this.currentQuestion,this.currentQuestion.yes());
        this.getQuestion();
    },
    onClickBtnNo() {
        this.API.go(this.currentQuestion,this.currentQuestion.no());
        this.getQuestion();
    },

    stopTesting(){
        this.pnlFinish.active=true;
        this.finish.string=this.API.getTypeDiseases();
    },

    /**
     * Метод получения нового вопроса 
     */
    getQuestion() {
        this.currentQuestion=this.amountQuestion===0?this.API.getStartIssuse():this.API.getNextIssuse();
        if(this.currentQuestion===null){
            this.stopTesting();
        }else {
            this.amountQuestion++;
            this.question.string = this.currentQuestion.wording;
        }
    },
});
