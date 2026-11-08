import { Page } from "@playwright/test";
import { step } from "../Helpers/test-step-decorator";
import { BaseHelper } from "./base-helper";

export class FormslayoutPage extends BaseHelper {
  //private readonly page: Page;  //since we calling the base helper class constructor to initialize the
  //  page object with super class constructor we dont need to declare page object here in this class

  constructor(page: Page) {
    //this.page = page; // we are calling base helper class constructor to initialize the page object with super class constructor
    super(page);
    console.log("In forms-Layoutpage");
  }

  @step
  async submitInline_form(
    fullname: string,
    email: string,
    reMembermeCheckBox: boolean,
  ) {
    console.log("started submitInline_form execution");
    const InlineForm = this.page.locator(".inline-form-card", {
      hasText: "Inline form",
    });
    await InlineForm.getByRole("textbox", { name: "Jane Doe" }).fill(fullname);
    await InlineForm.getByRole("textbox", { name: "Email" }).fill(email);
    if (reMembermeCheckBox) {
      await InlineForm.getByRole("checkbox").check({ force: true });
    }
    await InlineForm.getByRole("button", { name: "Submit" }).click();
    const toasterMessage = await this.getToaster_Message();
    console.log("Toaster Message:", toasterMessage);
    
  }
  @step
  async SubmittingUsingformgrid(
    Email: string,
    Password: string,
    Optiontext: string,
  ) {
    //const formgrid = this.page.locator('Using the Grid',{hasText:'Using the formgrid'})
    const formgrid = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    });
    await formgrid.getByRole("textbox", { name: "Email" }).fill(Email);
    await formgrid.getByRole("textbox", { name: "Password" }).fill(Password);
    await formgrid
      .getByRole("radio", { name: Optiontext })
      .check({ force: true });
    await formgrid.getByRole("button", { name: "Sign in" }).click();
  }
}
