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
            assert.ok(new Question({}));
        });
    });

    describe('#Check class Catalog', () => {
        it('should return true, if class create ', () => {
            assert.ok(new Catalog([]));
        });
    });
});

describe('Therapist', () => {
    describe('#Check class Catalog', () => {
        describe('#Check list of diseases', () => {
            it('correctness of withdrawal', () => {
                let catalog = new Catalog([]);
                assert.equal(TypeDiseases.ORV, catalog.getTypeDiseases());
            });

        });


        describe('#Check constructor Catalog', () => {
            it('create a global catalog of questions', () => {

                let catalog = new Catalog(baseQuestion);
                let obj = baseQuestion[0];
                assert.equal(obj.wording, catalog.getArrayQuestion()[0].wording);
                assert.equal(obj.yes, catalog.getArrayQuestion()[0].answerYes);
                assert.equal(obj.no, catalog.getArrayQuestion()[0].answerNo);
            });

            it('check create matrix for links on global matrix', () => {

                let catalog = new Catalog(baseQuestion);
                assert.equal([], catalog.getArrayLinksOnQuestion(TypeDiseases.ORZ));

            });
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

/**
 * Класс базы вопросов и заболеваний
 */
class Catalog {
    /**
     * Constructor of the Catalog
     */
    constructor(baseQuestion) {
        this.arrayQuestion=[];
        baseQuestion.forEach((item) => {
            this.arrayQuestion.push(new Question(item));
        });
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

/**
 * База вопросов
 * @type {[*]}
 */
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