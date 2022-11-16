import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BatePapoPage } from './bate-papo.page';

describe('BatePapoPage', () => {
  let component: BatePapoPage;
  let fixture: ComponentFixture<BatePapoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BatePapoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BatePapoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
