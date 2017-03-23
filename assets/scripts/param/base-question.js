/**
 * Created by FIRCorp on 23.03.2017.
 */
var modTypeDiseases=require('./type-diseases');
var TypeDiseases=modTypeDiseases.TypeDiseases;

/**
 * База вопросов
 * @type {[*]}
 */
exports.baseQuestion = [
    {
        wording: 'У вас есть температура?',
        yes: [
            TypeDiseases.flu,
            TypeDiseases.ORV,
            TypeDiseases.ORZ,
            TypeDiseases.angina,
        ],
        no: [
            TypeDiseases.perelom
        ]
    },
    {
        wording: 'У вас есть насморк?',
        yes: [
            TypeDiseases.flu,
            TypeDiseases.ORV,
            TypeDiseases.ORZ,
        ],
        no: [
            TypeDiseases.angina,
        ]
    },
    {
        wording: 'У вас есть кашель?',
        yes: [
            TypeDiseases.angina,
        ],
        no: [
            TypeDiseases.ORV
        ]
    },
    {
        wording: 'У вас есть боли в груди?',
        yes: [
            TypeDiseases.perelom,
        ],
        no: [
            TypeDiseases.flu,
            TypeDiseases.ORV,
            TypeDiseases.ORZ,
            TypeDiseases.angina
        ]
    },
    {
        wording: 'У вас кружится голова?',
        yes: [
            TypeDiseases.flu,
        ],
        no: [
            TypeDiseases.angina
        ]
    },
    {
        wording: 'У вас есть синяки?',
        yes: [
            TypeDiseases.perelom
        ],
        no: [
            TypeDiseases.angina
        ]
    }
];