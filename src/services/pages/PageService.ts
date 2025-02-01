import { BaseEntityService } from "../BaseEntityService"
import { PageODataRepo, PageRepo } from "../../data/repo";
import { Page } from "../../data/entities/pages/Page";
import { ODataResponse } from "../../data/entities";

export class PageService extends BaseEntityService<Page, PageRepo, PageODataRepo> {
  constructor(){
    super(new PageRepo(), new PageODataRepo());
  }

  getBySlug(userName: string, slug: string): Promise<ODataResponse<Page>> {
    return this.oDataRepo.query(`userId eq ${userName} and slug eq ${slug}`);
  }

  getByUsernameAndSlug(userName: string, slug?: string | null): Promise<Page> {
    return this.repo.getByUsernameAndSlug(userName, slug);
  }

  getPreview(userName: string, slug?: string | null): Promise<Page> {
    return this.repo.getPreview(userName, slug);
  }

}

export default PageService;
