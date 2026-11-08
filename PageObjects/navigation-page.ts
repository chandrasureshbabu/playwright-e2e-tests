import { Page } from "@playwright/test";
import { step } from "../Helpers/test-step-decorator";
import { BaseHelper } from "./base-helper";

export class NavigateionPage extends BaseHelper {
 //private readonly page: Page; //since we calling the base helper class constructor to initialize the
  //  page object with super class constructor we dont need to declare page object here in this class


  constructor(page: Page) {
    //this.page = page;
    super(page); // we are calling base helper class constructor to initialize the page object with super class constructor
    console.log("In Navigation page");
  }
  @step
  async formLayoutpage() {
    //await this.page.getByText("Forms").click();
    await this.selectGroupmenuItem("Forms");
    await this.page.getByText("Form Layouts").click();
  }

  @step
  async NvaigateTo_Toasterconfiguration() {
    //await this.page.getByText("Modal & Overlays").click();
    await this.selectGroupmenuItem("Modal & Overlays");
    await this.page.getByText("Toastr").click();
  }
  @step
  async NvaigateTo_ToolTip() {
    // await this.page.getByText("Modal & Overlays").click();
    await this.selectGroupmenuItem("Modal & Overlays");
    await this.page.getByText("Tooltip").click();
  }
  @step
  async NvaigateTo_SMartTable() {
    //await this.page.getByText("Tables & Data").click();
    await this.selectGroupmenuItem("Tables & Data");
    await this.page.getByText("Smart Table").click();
  }
  @step
  async NvaigateTo_Datepicker() {
    //await this.page.getByText("Forms").click();
    await this.selectGroupmenuItem("Forms");
    await this.page.getByText("Datepicker").click();
    const toasterMessage = await this.getToaster_Message();
    console.log("Toaster Message from navigation page- datepicker method:", toasterMessage);
  }
  @step
  async NvaigateTo_Dashboard() {
    //await this.page.getByText("IoT Dashboard").click();
    await this.selectGroupmenuItem("IoT Dashboard");
  }
  @step
  async NvaigateTo_Dialog() {
    //await this.page.getByText("Modal & Overlays").click();
    await this.selectGroupmenuItem("Modal & Overlays");
    await this.page.getByText("Dialog").click();
  }
  @step
  async NvaigateTo_DragAndDrop() {
    //await this.page.getByText("Extra Components").click();
    await this.selectGroupmenuItem("Extra Components");
    await this.page.getByText("Drag & Drop").click();
  }

  private async selectGroupmenuItem(groupMenuItem: string) {
    const menu = this.page.getByTitle(groupMenuItem);
    const menustatus = await menu.getAttribute("aria-expanded");
    if (menustatus == "false") {
      await menu.click();
    }
  }
}
