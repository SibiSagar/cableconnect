import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DuesPage } from './dues.page';

describe('DuesPage', () => {
  let component: DuesPage;
  let fixture: ComponentFixture<DuesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DuesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
