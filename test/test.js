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
    });

    describe('#Check class Question', () => {
        it('checking the existence of the wording of the question', () => {
            let question = new Question();
            assert.equal(' ', question.getWording());
        });

        it('сhecking the wording of the question', () => {
            let question = new Question();
            assert.ok(question.wording);
        });

        it('checking TypeDiseases according to the answer to yes', () => {
            let question = new Question();
            assert.equal(TypeDiseases.ORZ, question.yes());
        });

        it('checking TypeDiseases according to the answer to no', () => {
            let question = new Question();
            assert.equal(TypeDiseases.flu, question.no());
        });

        it('checking wording constructor', () => {
            let wording='Вы испытываете головную боль';
            let question = new Question(wording);
            assert.equal(wording, question.wording);
        });

        it('checking answerYes constructor', () => {
            let yes=[TypeDiseases.ORZ,TypeDiseases.ORV];
            let question = new Question(yes);
            assert.equal(yes, question.answerYes);
        });

        it('checking answerNo constructor', () => {
            let no=[TypeDiseases.flu];
            let question = new Question(no);
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

    constructor() {
        this.wording = ' ';
        this.answerYes = TypeDiseases.ORZ;
        this.answerNo = TypeDiseases.flu;
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