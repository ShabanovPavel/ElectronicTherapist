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
        it('verify that the answer is true', () => {
            let question = new Question();
            assert.equal(true, question.yes());
        });

        it('verify that the answer is false', () => {
            let question = new Question();
            assert.equal(false, question.no());
        });

        it('checking the existence of the wording of the question', () => {
            let question = new Question();
            assert.equal(' ', question.getWording());
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
     * Выполняет фиксацию ответа да
     * @returns {boolean}
     */
    yes() {
        return true;
    }

    /**
     * Выполняет фиксацию ответа нет
     * @returns {boolean}
     */
    no() {
        return false;
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