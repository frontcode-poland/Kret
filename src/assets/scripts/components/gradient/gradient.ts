import {Component} from "../../component";
import * as Granim from 'Granim';

export class Gradient extends Component {
    private granimInstance: Granim;

    constructor (element) {
        super(element);
    }

    protected onMounted(): void {
        this.initialize();
    }

    protected onUnmounted(): void { }

    private initialize (): void {
        this.granimInstance = new Granim({
            element: '#app-background',
            name: 'interactive-gradient',
            elToSetClassOn: '.app',
            direction: 'diagonal',
            isPausedWhenNotInView: true,
            stateTransitionSpeed: 5000,
            states : {
                "default-state": {
                    gradients: [
                        ['#3d0075', '#0e2475'],
                        ['#9D50BB', '#6E48AA'],
                        ['#4776E6', '#8E54E9']
                    ],
                    transitionSpeed: 7500
                }
            }
        });
    }
}