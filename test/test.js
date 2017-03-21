/**
 * Created by FIRCorp on 20.03.2017.
 */
var assert = require('assert');

describe('TherapistStart', () => {
    describe('#Check job', () => {
        it('should return error', () => {
            assert.equal(4, 4);
        });
    });

    describe('#Check class Main', () => {
        it('should return true, if class create ', () => {
            assert.ok(new Main());
        });
    });

    describe('#Check class Question', () => {
        it('should return true, if class create ', () => {
            assert.ok(new Question());
        });
    });

    describe('#Check class Catalog', () => {
        it('should return true, if class create ', () => {
            assert.ok(new Catalog());
        });
    });
});

describe('Therapist', () => {
    describe('#Check class Catalog', () => {
        describe('#Check list of diseases', () => {
            it('correctness of withdrawal', () => {
                let catalog = new Catalog();
                assert.equal(TypeDiseases.ORV, catalog.getTypeDiseases());
            });

        });

        describe('#Check matrix Question', () => {
            it('checking the array of questions', () => {
                let catalog = new Catalog();
                assert.equal(1, catalog.getArrayQuestion()[0]);
            });
        });

        describe('#Check constructor Catalog', () => {
            it('create a global catalog of questions', () => {
                const baseQuestion = [
                    {
                        wording: 'У вас есть температура?',
                        yes: [
                            TypeDiseases.ORV
                        ],
                        no: [
                            TypeDiseases.ORZ
                        ]
                    },
                    {
                        wording: 'У вас есть насморк?',
                        yes: [
                            TypeDiseases.ORZ
                        ],
                        no: [
                            TypeDiseases.ORV
                        ]
                    },
                ];
                let catalog = new Catalog(baseQuestion);
                let obj=baseQuestion[0];
                assert.equal(obj.wording, catalog.getArrayQuestion()[0].wording);
                assert.equal(obj.yes, catalog.getArrayQuestion()[0].yes);
                assert.equal(obj.no, catalog.getArrayQuestion()[0].no);
            });
        });
    });

    describe('#Check class Question', () => {

        it('checking wording constructor', () => {
            let wording = 'Вы испытываете головную боль';
            let question = new Question(wording);
            assert.equal(wording, question.wording);
        });

        it('checking answerYes constructor', () => {
            let yes = [TypeDiseases.ORZ, TypeDiseases.ORV];
            let question = new Question(null, yes);
            assert.equal(yes, question.answerYes);
        });

        it('checking answerNo constructor', () => {
            let no = [TypeDiseases.flu];
            let question = new Question(null, null, no);
            assert.equal(no, question.answerNo);
        });


    });
});

/**
 * Главный класс программы
 */
class Main {

}

/**
 * Класс вопроса
 */
class Question {

    /**
     * Constructor of the Question
     * @param wording {string} формулировка вопроса
     * @param answerYes {Array<TypeDiseases>} массив заболеваний которые подозреваются при ответе на вопрос ответом да
     * @param answerNo {Array<TypeDiseases>} массив заболеваний которые подозреваются при ответе на вопрос ответом нет
     */
    constructor(wording, answerYes, answerNo) {
        this.wording = wording;
        this.answerYes = answerYes;
        this.answerNo = answerNo;
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

/**
 * Класс базы вопросов и заболеваний
 */
class Catalog {
    /**
     * Constructor of the Catalog
     */
    constructor() {
        this.arrayQuestion = [1];
    }

    /**
     * Возвращает диагноз по результату опроса
     * @returns {number} тип заболевания
     */
    getTypeDiseases() {
        return TypeDiseases.ORV;
    }

    /**
     * Возвращет массив вопросов
     * @returns {Array|[number]}
     */
    getArrayQuestion() {
        return this.arrayQuestion;
    }
}

/**
 * Enum типов заболеваний
 * @type {{ORZ: number, ORV: number, flu: number}}
 */
const TypeDiseases = {
    ORZ: 0,
    ORV: 1,
    flu: 2,
};