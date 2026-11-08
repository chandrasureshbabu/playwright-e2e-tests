import { Page } from "@playwright/test";

export class BaseHelper {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  protected async getToaster_Message() {
    return "am cool toster";
  }
}
