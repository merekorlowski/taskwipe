export default class Curriculum {
    constructor(id, title, description, colour, materials, steps) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.colour = colour;
        this.curriculums = [];
        this.materials = [];
        this.steps = [];
    }

    addCurriculum(curriculum) {
        this.curriculums.push(curriculum);
    }

    removeCurriculum(curriculum) {
        for (let i = 0; i < this.curriculums.length; i++) {
            if (curriculum.id == this.curriculums[i].id) {
                this.curriculums.splice(i, 1);
                break;
            }
        }
    }

    modifyCurriculum(title, description, color, materials, steps) {
        this.title = title;
        this.description = description;
        this.color = color;
        this.materials = materials;
        this.steps = steps;
    }
}
