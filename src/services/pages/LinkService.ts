import { BaseEntityService } from "../BaseEntityService";
import { LinkODataRepo, LinkRepo } from "../../data/repo/pages";
import { Link } from "../../data/entities/pages";

export class LinkService extends BaseEntityService<Link, LinkRepo, LinkODataRepo> {
  constructor() {
    super(new LinkRepo(), new LinkODataRepo());
  }

  getByPageId(pageId: number): Promise<Link[]> {
    return this.repo.getByPageId(pageId);
  }
}

export default LinkService;
