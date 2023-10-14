import { type SchemaTypeDefinition } from 'sanity';

import author from './schemas/author';
import blockContent from './schemas/blockContent';
import category from './schemas/category';
import footerNavigation from './schemas/footerNavigation';
import headerNavigation from './schemas/headerNavigation';
import navOption from './schemas/navOption';
import page from './schemas/page';
import post from './schemas/post';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [post, author, category, blockContent, page, headerNavigation, footerNavigation, navOption]
};
