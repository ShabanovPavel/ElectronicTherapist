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
        });

        it('check create matrix for links on global matrix [0]', () => {

            let catalog = new Catalog(baseQuestion);
            catalog.addArrayLinks(TypeDiseases.ORZ);
            assert.equal(new Question(baseQuestion[0]).wording, catalog.getArrayLinksOnQuestion(TypeDiseases.ORZ)[0].wording);
        });

        it('check for duplication of information in the reference array for ORZ', () => {
            let basa = [
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
                        TypeDiseases.flu
                    ],
                    no: [
                        TypeDiseases.ORV
                    ]
                },
                {
                    wording: 'Першит в горле?',
                    yes: [
                        TypeDiseases.flu
                    ],
                    no: [
                        TypeDiseases.ORV
                    ]
                },
                {
                    wording: 'Вас тошнит?',
                    yes: [
                        TypeDiseases.flu
                    ],
                    no: [
                        TypeDiseases.ORZ
                    ]
                },
            ];
            let catalog = new Catalog(basa);
            catalog.addArrayLinks(TypeDiseases.ORZ);
            assert.equal(2, catalog.getArrayLinksOnQuestion(TypeDiseases.ORZ).length);
        });

        it('check for duplication of information in the reference array for flu', () => {
            let basa = [
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
                        TypeDiseases.flu
                    ],
                    no: [
                        TypeDiseases.ORV
                    ]
                },
                {
                    wording: 'Першит в горле?',
                    yes: [
                        TypeDiseases.flu
                    ],
                    no: [
                        TypeDiseases.ORV
                    ]
                },
                {
                    wording: 'Вас тошнит?',
                    yes: [
                        TypeDiseases.flu
                    ],
                    no: [
                        TypeDiseases.ORZ
                    ]
                },
            ];
            let catalog = new Catalog(basa);

            catalog.addArrayLinks(TypeDiseases.flu);
            assert.equal(3, catalog.getArrayLinksOnQuestion(TypeDiseases.flu).length);
        });
    });

    describe('#Check class Main', () => {
        describe('#Check the array of answers', () => {
            it('initial array initialization check', () => {
                let main = new Main();
                assert.equal(3, main.arrayDiseases.length);
            });

            it('initialization check current assumption', () => {
                let main = new Main();
                assert.equal(0, main.currentAssumption);
            });

        });

        describe('#Verification methods', () => {

            it('test for issuing', () => {
                let main = new Main();
                assert.ok(main.getIssue());
            });

            it('test for add Diseases[]', () => {
                let main = new Main();
                let q = [TypeDiseases.ORV, TypeDiseases.ORZ];

                main.addDiseases(q);
                assert.equal(1, main.arrayDiseases[TypeDiseases.ORZ]);
            });

            it('test for add Diseases', () => {
                let main = new Main();
                let q = [TypeDiseases.ORZ];

                main.addDiseases(q);
                assert.equal(1, main.arrayDiseases[TypeDiseases.ORZ]);
            });

            it('checking the correctness of the choice of the question after answering the initial question', () => {
                let basa = [
                    {
                        wording: 'У вас есть насморк?',
                        yes: [
                            TypeDiseases.flu,
                            TypeDiseases.ORZ,
                        ],
                        no: [
                            TypeDiseases.ORV
                        ]
                    },
                    {
                        wording: 'У вас есть тошнота?',
                        yes: [
                            TypeDiseases.flu,
                        ],
                        no: [
                            TypeDiseases.ORV
                        ]
                    },
                ];
                let main = new Main(basa);
                let question = main.catalog.arrayQuestion[0];
                let q = question.yes();

                main.addDiseases(q);
                main.getIssue().wording;
                assert.equal(basa[1].wording, main.getIssue().wording);
            });
        });
    });
});

/**
 * Главный класс программы
 */
class Main {
    constructor(basa) {
        this.arrayDiseases = [];
        this.arrayDiseases[TypeDiseases.ORV] = 0;
        this.arrayDiseases[TypeDiseases.ORZ] = 0;
        this.arrayDiseases[TypeDiseases.flu] = 0;

        this.currentAssumption = 0;
        let base=basa||baseQuestion;
        this.catalog = new Catalog(base);
    }

    getRandomIssue() {
        let min = 0;
        let max = this.catalog.arrayQuestion.length;
        let index = Math.floor(Math.random() * (max - min + 1)) + min;

        return this.catalog.arrayQuestion[index];
    }

    getIssue() {

        return true;
    }

    addDiseases(arrayType) {
        arrayType.forEach((item) => {
            this.arrayDiseases[item]++;
        });
        return true;
    }
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
    constructor(base) {
        this.arrayQuestion = [];
        base.forEach((item) => {
            this.arrayQuestion.push(new Question(item));
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
            TypeDiseases.ORV,
            TypeDiseases.ORZ,
        ],
        no: [
            TypeDiseases.ORZ
        ]
    },
    {
        wording: 'У вас есть насморк?',
        yes: [
            TypeDiseases.flu,
            TypeDiseases.ORZ,
        ],
        no: [
            TypeDiseases.ORV
        ]
    },
];