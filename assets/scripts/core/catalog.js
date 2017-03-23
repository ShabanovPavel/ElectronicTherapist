/**
 * Created by FIRCorp on 23.03.2017.
 */
/**
 * Класс базы вопросов и заболеваний
 */
const Question =require('./question');
exports.classCatalog= class Catalog {
    /**
     * Constructor of the Catalog
     */
    constructor(base) {
        this.arrayQuestion = [];
        base.forEach((item) => {
            this.arrayQuestion.push(new Question.classQuestion(item));
        });
        this.arrayLinksOnQuestion = [];
    }

    /**
     * Добавляет новый тип заболевания в массив предназначенный для хранения ссылок на вопросы с возможным результатирующим ввиде этого заболевания
     * @param type {TypeDiseases} тип нового заболевания
     */
    addArrayLinks(type) {
        this.arrayLinksOnQuestion[type] = [];
        this.arrayQuestion.forEach((item) => {
            item.answerYes.forEach((itemType) => {
                if (type === itemType && !this.arrayLinksOnQuestion[type].includes(item)) {
                    this.arrayLinksOnQuestion[type].push(item);
                }
            });
            item.answerNo.forEach((itemType) => {
                if (type === itemType && !this.arrayLinksOnQuestion[type].includes(item)) {
                    this.arrayLinksOnQuestion[type].push(item);
                }
            });
        });
    }

    /**
     * Возвращет массив вопросов
     * @returns {Array|[number]}
     */
    getArrayQuestion() {
        return this.arrayQuestion;
    }

    /**
     * Возвращает массив ссылок по типу заболевания
     * @param type {TypeDiseases} тип заболевания
     * @returns {*} массив ссылок на вопросы в базе
     */
    getArrayLinksOnQuestion(type) {
        return this.arrayLinksOnQuestion[type];
    }
}
