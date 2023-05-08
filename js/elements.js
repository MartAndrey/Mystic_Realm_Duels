export class Element {
    constructor(strengths) {
        this.strengths = new Map();
        strengths.forEach((element) => {
            this.strengths.set(element, []);
        });
    }
}
