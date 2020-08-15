import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DuepayPage } from './duepay.page';

describe('DuepayPage', () => {
  let component: DuepayPage;
  let fixture: ComponentFixture<DuepayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuepayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DuepayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
