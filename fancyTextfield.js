import { LitElement, css, html } from 'lit';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';


export class FancyTextfield extends LitElement {

    static styles = css`    
        :host {
            white-space: nowrap;
            display: flex;
            flex-direction: row;
            flex-wrap: nowrap;
            gap: 0;
        }

        :host span {
            white-space: nowrap;
        }
        
        :host span:first-child {
            overflow: hidden;
            position: relative;
            text-overflow: ellipsis;
        }

        :host span:last-child {
            overflow: visible;
            transform: translateX(-0.4px); // fixes hairline crack if text element has underline decoration
        }
    `;

    static properties = {
        title: { type: String },
        tailSize: { type: Number },
        breakOnPeriod: { type: Boolean },
    };

    constructor() {
        super();

        this.title = "";
        this.tailSize = 3;
        this.breakOnPeriod = false;
    }

    render() {
        let tailSize = this.tailSize;
        let periodBreak = this.breakOnPeriod;
        let textContent = String(this.title);

        // Match the tail size to the length of the last word if it is shorter.
        let words = '';

        if (periodBreak) {
            words = textContent.trim().split(/[ .]+/);
        } else {
            words = textContent.trim().split(/[ ]+/);
        }
        const lastWord = words[words.length - 1];
        if (lastWord.length < tailSize) tailSize = lastWord.length;

        // Dissect text into 2 parts and add &nbsp to keep proper spacing.
        let firstPart = textContent.slice(0, textContent.length - tailSize);
        let lastPart = String(textContent).slice(textContent.length - tailSize, textContent.length);

        let space = '';
        if (firstPart.charAt(firstPart.length - 1) === ' ') {
            firstPart = firstPart.trimEnd(); // prevent unintentional double spaces
            space = '&nbsp;';
        }

        return html`
                <span>${firstPart}${unsafeHTML(space)}</span>
                <span>${lastPart}</span>
        `;
    }
}

customElements.define('fancy-textfield', FancyTextfield);