/**
 * Created by FIRCorp on 20.03.2017.
 */
var assert = require('assert');

var Main=require('../assets/scripts/core/main');
var Question=require('../assets/scripts/core/question');
var Catalog=require('../assets/scripts/core/catalog');
var modBaseQuestion=require('../assets/scripts/param/base-question');
var baseQuestion=modBaseQuestion.baseQuestion;
var modTypeDiseases=require('../assets/scripts/param/type-diseases');
var TypeDiseases=modTypeDiseases.TypeDiseases;

describe('TherapistStart', () => {
    describe('#Check job', () => {
        it('should return error', () => {
            assert.equal(4, 4);
        });
    });

    describe('#Check class Main', () => {
        it('should return true, if class create ', () => {
            assert.ok(new Main.classMain([]));
        });
    });

    describe('#Check class Question', () => {
        it('should return true, if class create ', () => {
            assert.ok(new Question.classQuestion({}));
        });
    });

    describe('#Check class Catalog', () => {
        it('should return true, if class create ', () => {
            assert.ok(new Catalog.classCatalog([]));
        });
    });
});

describe('Therapist', () => {
    describe('#Check class Catalog', () => {
        describe('#Check constructor Catalog', () => {
            it('create a global catalog of questions', () => {

                let catalog = new Catalog.classCatalog(baseQuestion);
                let obj = baseQuestion[0];
                assert.equal(obj.wording, catalog.getArrayQuestion()[0].wording);
                assert.equal(obj.yes, catalog.getArrayQuestion()[0].answerYes);
                assert.equal(obj.no, catalog.getArrayQuestion()[0].answerNo);
            });

            it('check create matrix for links on global matrix', () => {

                let catalog = new Catalog.classCatalog(baseQuestion);
                catalog.addArrayLinks(TypeDiseases.ORZ);
                assert.equal([].indexOf(0), catalog.getArrayLinksOnQuestion(TypeDiseases.ORZ).indexOf(0));

            });
        });

        it('check create matrix for links on global matrix [0]', () => {

            let catalog = new Catalog.classCatalog(baseQuestion);
            catalog.addArrayLinks(TypeDiseases.ORZ);
            assert.equal(new Question.classQuestion(baseQuestion[0]).wording, catalog.getArrayLinksOnQuestion(TypeDiseases.ORZ)[0].wording);
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
            let catalog = new Catalog.classCatalog(basa);
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
            let catalog = new Catalog.classCatalog(basa);

            catalog.addArrayLinks(TypeDiseases.flu);
            assert.equal(3, catalog.getArrayLinksOnQuestion(TypeDiseases.flu).length);
        });
    });

    describe('#Check class Main', () => {
        describe('#Check the array of answers', () => {
            it('initial array initialization check', () => {
                let main = new Main.classMain([]);
                assert.equal(3, main.arrayDiseases.length);
            });

            it('initialization check current assumption', () => {
                let main = new Main.classMain([]);
                assert.equal(0, main.currentAssumption);
            });

        });

        describe('#Verification methods', () => {

            it('test for add Diseases[]', () => {
                let main = new Main.classMain([]);
                let q = [TypeDiseases.ORV, TypeDiseases.ORZ];

                main.addDiseases(q);
                assert.equal(1, main.arrayDiseases[TypeDiseases.ORZ]);
            });

            it('test for add Diseases', () => {
                let main = new Main.classMain([]);
                let q = [TypeDiseases.ORZ];

                main.addDiseases(q);
                assert.equal(1, main.arrayDiseases[TypeDiseases.ORZ]);
            });

            it('checking the correctness of the choice of the question after answering the initial question', () => {
                let basa = [
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
                        wording: 'У вас есть тошнота?',
                        yes: [
                            TypeDiseases.flu
                        ],
                        no: [
                            TypeDiseases.ORV
                        ]
                    },
                    {
                        wording: 'У вас есть ощущение рвоты?',
                        yes: [
                            TypeDiseases.flu
                        ],
                        no: [
                            TypeDiseases.ORV
                        ]
                    },
                ];
                let main = new Main.classMain(basa);
                let question = main.catalog.arrayQuestion[0];
                let q = question.yes();
                main.addDiseases(q);
                main.addQuestion(question);
                 question = main.catalog.arrayQuestion[1];
                q = question.no();
                main.addDiseases(q);
                main.addQuestion(question);
                question = main.catalog.arrayQuestion[2];
                q = question.yes();
                main.addDiseases(q);
                assert.equal(basa[2].wording, main.getIssue().wording);
            });

            it('checking the choice of priority for the question ORZ', () => {
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
                let main = new Main.classMain(basa);
                let question = main.catalog.arrayQuestion[0];
                let q = question.yes();

                main.addDiseases(q);
                assert.equal(TypeDiseases.ORZ, main.calculationDiseasePriority());
            });

            it('checking the choice of priority for the question Flu', () => {
                let basa = [
                    {
                        wording: 'У вас есть насморк?',
                        yes: [
                            TypeDiseases.flu,
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
                let main = new Main.classMain(basa);
                let question = main.catalog.arrayQuestion[0];
                let q = question.yes();

                main.addDiseases(q);
                assert.equal(TypeDiseases.flu, main.calculationDiseasePriority());
            });

            it('проверка фильтрации массива вопросов по типу гипотезы на основе уже спрошеных', ()=>{
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
                    {
                        wording: 'У вас есть ощущение рвоты?',
                        yes: [
                            TypeDiseases.flu,
                            TypeDiseases.ORV,
                        ],
                        no: [
                            TypeDiseases.ORV
                        ]
                    },
                ];
                let main = new Main.classMain(basa);
                let question = main.catalog.arrayQuestion[0];
                let q = question.yes();
                main.addDiseases(q);
                main.addQuestion(question);
                question = main.catalog.arrayQuestion[1];
                q = question.yes();
                main.addDiseases(q);
                main.addQuestion(question);
                let type=main.calculationDiseasePriority();
                let masQuestion= main.catalog.getArrayLinksOnQuestion(type);
                let mass=masQuestion.filter((item)=>{
                    return !main.stack.includes(item);
                });
                assert.equal(1,mass.length);
            });

            it('проверка фиксации отвеченных вопросов', ()=>{
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
                    {
                        wording: 'У вас есть ощущение рвоты?',
                        yes: [
                            TypeDiseases.flu,
                            TypeDiseases.ORV,
                        ],
                        no: [
                            TypeDiseases.ORV
                        ]
                    },
                ];
                let main = new Main.classMain(basa);
                let question = main.catalog.arrayQuestion[0];
                let q = question.yes();
                main.addDiseases(q);
                main.addQuestion(question);

                assert.equal(1,main.stack.length);
            });

            it('проверка завершения теста по окончанию вопросов в базе',()=>{
                let basa = [
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
                        wording: 'У вас есть тошнота?',
                        yes: [
                            TypeDiseases.flu
                        ],
                        no: [
                            TypeDiseases.ORV
                        ]
                    },
                    {
                        wording: 'У вас есть ощущение рвоты?',
                        yes: [
                            TypeDiseases.flu
                        ],
                        no: [
                            TypeDiseases.ORV
                        ]
                    },
                ];
                let main = new Main.classMain(basa);

                setTimeout(()=>{
                    let question1 = main.getRandomIssue();
                    let q = question1.yes();
                    main.addDiseases(q);
                    main.addQuestion(question1);

                    question1 = main.getIssue();
                    q = question1.yes();
                    main.addDiseases(q);
                    main.addQuestion(question1);

                    question1 = main.getIssue();
                    q = question1.yes();
                    main.addDiseases(q);
                    main.addQuestion(question1);

                    assert.equal(null,main.getIssue());
                },1000);

            });

            it('проверка завершения теста по преобладанию одной из гипотез в 2 раза над ближайшей',()=>{
                let basa = [
                    {
                        wording: 'У вас есть насморк?',
                        yes: [
                            TypeDiseases.flu,
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
                    {
                        wording: 'У вас есть ощущение рвоты?',
                        yes: [
                            TypeDiseases.flu,
                        ],
                        no: [
                            TypeDiseases.ORV
                        ]
                    },
                ];
                let main = new Main.classMain(basa);
                setTimeout(()=>{
                    let question = main.getRandomIssue();
                    let q = question.yes();
                    main.addDiseases(q);
                    main.addQuestion(question);

                    question = main.getIssue();
                    q = question.yes();
                    main.addDiseases(q);
                    main.addQuestion(question);

                    assert.equal(TypeDiseases.flu,main.getIssue());
                },1000);

            });


        });
    });
});
