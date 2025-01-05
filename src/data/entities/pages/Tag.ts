import { PageTag } from "./PageTag";
import { TagType } from "./TagType";

export interface Tag {
  id: number;
  name: string;
  theme: JSON;
  type: TagType;
  pageTags: PageTag[];
}
