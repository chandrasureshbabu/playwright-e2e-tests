import { Page } from "@playwright/test";
import { NavigateionPage } from "./navigation-page";
import { DatePickerPage } from "./DatePicker-page";
import { FormslayoutPage } from "./Forms-page";

export class PageManager{
    readonly Navigate_TO:NavigateionPage
    readonly Date_PickerPage:DatePickerPage
    readonly Forms_Page:FormslayoutPage

    constructor(page:Page){
        this.Navigate_TO =  new NavigateionPage(page)
        this.Date_PickerPage =  new DatePickerPage(page)
        this.Forms_Page = new FormslayoutPage(page)
    }
}