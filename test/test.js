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
                catalog.addArrayLinks(TypeDiseases.ORZ);
                assert.equal([].indexOf(0), catalog.getArrayLinksOnQuestion(TypeDiseases.ORZ).indexOf(0));

            });

            it('check create matrix for links on global matrix [0]', () => {

                let catalog = new Catalog(baseQuestion);
                catalog.addArrayLinks(TypeDiseases.ORZ);
                assert.equal(0, catalog.getArrayLinksOnQuestion(TypeDiseases.ORZ).indexOf(0));

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
        this.arrayQuestion = [];
        baseQuestion.forEach((item) => {
            this.arrayQuestion.push(new Question(item));
        });
        this.arrayLinksOnQuestion = [];
    }

    /**
     * Добавляет новый тип заболевания в массив предназначенный для хранения ссылок на вопросы с возможным результатирующим ввиде этого заболевания
     * @param type {TypeDiseases} тип нового заболевания
     */
    addArrayLinks(type){
        this.arrayLinksOnQuestion[type]=[];
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

    /**
     * Возвращает массив ссылок по типу заболевания
     * @param type {TypeDiseases} тип заболевания
     * @returns {*} массив ссылок на вопросы в базе
     */
    getArrayLinksOnQuestion(type) {
        return this.arrayLinksOnQuestion[type];
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