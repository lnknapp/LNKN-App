import { Page } from "./Page";
import { Tag } from "./Tag";

export interface PageTag {
  id: number;
  pageId: number;
  tagId: number;
  page: Page;
  tag: Tag;
}
