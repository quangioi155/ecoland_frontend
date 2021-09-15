import { Component, Input, OnChanges, OnInit } from "@angular/core";

/**
 * @export class ReportPageComponent
 *
 * common-report-page
 *
 * author: ITSG - HoanNNC
 */
@Component({
    selector: 'app-report-page',
    template: `
        <label>[{{startItem}} - {{endItem}}件（全{{totalRecord}}件）]</label>
    `,
    styles: [
    ]
})
export class ReportPageComponent implements OnInit, OnChanges {

    @Input() page: number = 1;

    @Input() pageSize: number = 1;

    @Input() totalRecord: number = 0;

    startItem: number = 1;

    endItem: number = 1;

    ngOnInit() {
        this.renderReport();
    }

    ngOnChanges() {
        this.renderReport();
    }

    renderReport() {
        this.startItem = this.totalRecord > 0 ? (this.page - 1) * this.pageSize + 1 : 0;

        if(this.totalRecord == 0) {
            this.endItem = 0;
        }
        else if(this.pageSize < this.totalRecord) {
            this.endItem = this.page * this.pageSize > this.totalRecord ? this.totalRecord : this.page * this.pageSize;
        }
        else {
            this.endItem = this.totalRecord;
        }
    }

}