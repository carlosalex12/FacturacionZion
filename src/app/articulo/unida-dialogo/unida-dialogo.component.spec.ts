import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidaDialogoComponent } from './unida-dialogo.component';

describe('UnidaDialogoComponent', () => {
  let component: UnidaDialogoComponent;
  let fixture: ComponentFixture<UnidaDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidaDialogoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidaDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
