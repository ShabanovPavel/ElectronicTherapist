/**
 * Created by FIRCorp on 23.03.2017.
 */

/**
 * Класс вопроса
 */
exports.classQuestion= class Question {

    /**
     * Constructor of the Question
     * @param item {{wording: string, yes: Array<TypeDiseases>, no: Array<TypeDiseases>}}
     */
    constructor(item) {
        let {wording, yes, no}=item;
        this.wording = wording;
        this.answerYes = yes;
        this.answerNo = no;
    }

    /**
     * Выполняет фиксацию ответа да
     * @returns {boolean}
     */
    yes() {
        return this.answerYes;
    }

    /**
     * Выполняет фиксацию ответа нет
     * @returns {boolean}
     */
    no() {
        return this.answerNo;
    }

    /**
     * Возвращает формулировку вопроса
     * @return {string}
     */
    getWording() {
        return this.wording;
    }
}
