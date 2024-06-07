// src/app/components/power-bi-report/power-bi-report.component.ts
import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { PowerBIService } from '../../services/power-bi.service';
import * as pbi from 'powerbi-client';
@Component({
  selector: 'app-power-bi-report',
  template: '<div #reportContainer style="width:100%;height:600px;"></div>',
  standalone: true,
})
export class PowerBIReportComponent implements OnInit {
  @ViewChild('reportContainer', { static: true }) reportContainer!: ElementRef;
  @Input() embedConfig!: pbi.models.IReportEmbedConfiguration;

  constructor(private powerBIService: PowerBIService) {}

  ngOnInit() {
    if (this.embedConfig) {
      this.powerBIService.embedReport(
        this.reportContainer.nativeElement,
        this.embedConfig
      );
    }
  }
}
