import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetCategories } from '../actions/sales-screen.action';
import { Category } from '../model/Category';
import { salesScreenStateModal } from '../model/sales-screen.state.model';

@State<salesScreenStateModal>({
  name: 'salesScreenModel',
  defaults: {
    categories: {
      categories: [] as Category[],
      id: ''
    }
  }
})
@Injectable()
export class SalesScreenState {

  // Selectors
  @Selector()
  static getCategories(state: salesScreenStateModal) {
    return state.categories;
  }

  // Actions
  @Action(SetCategories)
  SetCategories(ctx: StateContext<salesScreenStateModal>, action: any){
    ctx.patchState({
      categories: action.payload
    })
  }
}