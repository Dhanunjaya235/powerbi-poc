// src/app/services/power-bi.service.ts
import { Injectable } from '@angular/core';
import * as pbi from 'powerbi-client';

@Injectable({
  providedIn: 'root',
})
export class PowerBIService {
  private powerBI: pbi.service.Service;

  constructor() {
    this.powerBI = new pbi.service.Service(
      pbi.factories.hpmFactory,
      pbi.factories.wpmpFactory,
      pbi.factories.routerFactory
    );
  }

  async embedReport(
    container: HTMLElement,
    embedConfig: pbi.models.IReportEmbedConfiguration
  ) {
    const report = (await this.powerBI.embed(
      container,
      embedConfig
    )) as pbi.Report;
    report.on('loaded', function () {
      const basicFilter = {
        $schema: 'http://powerbi.com/product/schema#basic',
        target: {
          table: 'Sheet1', // Replace with your table name
          column: 'City', // Replace with your column name
        },
        operator: 'In',
        values: ['Marion'], // Replace with your filter values
        filterType: pbi.models.FilterType.Basic,
        requireSingleSelection: true,
      };
      console.log(basicFilter, 'basic');

      // Apply the filter
      report
        .updateFilters(pbi.models.FiltersOperations.Add, [basicFilter])
        .then(function () {
          console.log('Filter was applied successfully');
        })
        .catch(function (errors: any) {
          console.error(errors);
        });
    });
  }
}
