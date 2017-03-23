/**
 * Created by FIRCorp on 23.03.2017.
 */
const Catalog =require( './catalog');
const ModTypeDiseases=require('../param/type-diseases');
const TypeDiseases=ModTypeDiseases.TypeDiseases;
/**
 * Главный класс программы
 */
exports.classMain= class Main {
    constructor(base) {
        this.catalog = new Catalog.classCatalog(base);
        this.arrayDiseases = [];
        this.catalog.addArrayLinks(TypeDiseases.ORV);
        this.catalog.addArrayLinks(TypeDiseases.ORZ);
        this.catalog.addArrayLinks(TypeDiseases.flu);
        this.arrayDiseases[TypeDiseases.ORV] = 0;
        this.arrayDiseases[TypeDiseases.ORZ] = 0;
        this.arrayDiseases[TypeDiseases.flu] = 0;

        this.currentAssumption = 0;//текущий тип приоритета

        this.stack=[];//массив заданных вопросов
    }

    /**
     * Возвращает рандомныйвопрос не зависящий от гипотиз
     * @returns {*}
     */
    getRandomIssue() {
        let index = this.randomInt(0, this.catalog.arrayQuestion.length);
        return this.catalog.arrayQuestion[index];
    }

    /**
     * Возвращает осмысленный вопрос по теме гипотезы
     * @returns {boolean}
     */
    getIssue() {
        let type=this.calculationDiseasePriority();
        if(this.checkEnd(type)) return null;
        let mass=this.catalog.getArrayLinksOnQuestion(type).filter((item)=>{
            return !this.stack.includes(item);
        });
        return mass.length>0? mass[0]:null;
    }

    /**
     * Расчет приоритета для определения следующего вопроса
     */
    calculationDiseasePriority() {
        let max = 0;
        this.arrayDiseases.forEach((item) => {
            if (max < item) max = item;
        });
        return this.arrayDiseases.indexOf(max);
    }

    /**
     * Возвращает рандомноечисло наполуинтервале [min, max)
     * @param min минимальное допустимое значение
     * @param max меньшеэтогозначения
     * @returns {*} рандомное число
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * Фиксирует намеки на заболевания
     * @param arrayType {Array<TypeDiseases>} список заболеваний
     * @returns {boolean}
     */
    addDiseases(arrayType) {
        arrayType.forEach((item) => {
            this.arrayDiseases[item]++;
        });
        return true;
    }

    /**
     * Фиксирует вопрос который был уже спрошен
     * @param question {Question} вопрос
     */
    addQuestion(question){
        this.stack.push(question);
    }

    /**
     * Проверяет на преобладание какой-либо гипотезы в 2 раза над ближайшей
     * @param type
     */
    checkEnd(type){
        let max=0;
        this.arrayDiseases.forEach((item) => {
            if (max < item&&this.arrayDiseases.indexOf(item)!=type) max = item;
        });
        let vremen=this.arrayDiseases[type]-this.arrayDiseases[max];

        return vremen>1+this.arrayDiseases[max];
    }
}

