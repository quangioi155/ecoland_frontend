import { Component, Input } from "@angular/core";

/**
 * @export class TitleComponent
 *
 * common-title-screen
 *
 * author: ITSG - HoanNNC
 */
@Component({
    selector: 'title-component',
    template: `
        <p-divider align="left">
            <div class="p-d-inline-flex p-ai-center">
                <h3 class="title-screen">{{title}}</h3>
            </div>
        </p-divider>
    `,
    styles: [
        '.title-screen {padding: 5px 5px; margin: 0px}'
    ]
})
export class TitleComponent {
    @Input() title: string = '';
}
