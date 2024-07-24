import { AsyncPipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer } from '@angular/platform-browser';
import { AppFacade } from '@app-state';
import { fadeIn } from '@app/shared/animations';
import {
  LayoutComponent,
  OrderHistoryFiltersComponent,
  OrderHistoryListComponent,
} from '@ui-components';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    OrderHistoryFiltersComponent,
    OrderHistoryListComponent,
    LayoutComponent,
    MatProgressSpinnerModule,
    AsyncPipe,
    MatIconModule,
  ],
  animations: [fadeIn],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  private _appFacade = inject(AppFacade);
  private _matIconRegistry = inject(MatIconRegistry);
  private _domSanitizer = inject(DomSanitizer);
  protected isLoading$ = this._appFacade.isLoading$;
  protected orders$ = this._appFacade.filteredOrders$;

  ngOnInit(): void {
    this._appFacade.loadOrders();

    this._matIconRegistry.addSvgIcon(
      'info',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        'assets/images/info.svg'
      )
    );
  }
}
