import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PowerBIReportComponent } from './powerbi.component';
// import * as registrationform from 'angular-elements-registration-form';
// import * as login from 'angular-login-webcomponent';
import * as pbi from 'powerbi-client';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PowerBIReportComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppComponent {
  title = 'powerbi-poc';
  loginObject!: any;
  embedConfig: pbi.models.IReportEmbedConfiguration = {
    type: 'report',
    id: '',
    accessToken: '',
    embedUrl: '',
    settings: {
      filterPaneEnabled: false,
      navContentPaneEnabled: false,
    },
    tokenType: pbi.models.TokenType.Embed,
  };

  img = '';
  onLoginSubmit(Event: any) {
    console.log('onLoginSubmit');
    console.log(Event, 'event');
    this.loginObject = Event;
  }
}
