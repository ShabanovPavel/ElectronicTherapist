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