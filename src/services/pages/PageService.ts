import { BaseEntityService } from "../BaseEntityService"
import { PageODataRepo, PageRepo } from "../../data/repo";
import { Page } from "../../data/entities/pages/Page";

export class PageService extends BaseEntityService<Page, PageRepo, PageODataRepo> {
  constructor(){
    super(new PageRepo(), new PageODataRepo());
  }
}

export default PageService;
