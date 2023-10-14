import { type SchemaTypeDefinition } from 'sanity';

import footerNavigation from './schemas/footerNavigation';
import headerNavigation from './schemas/headerNavigation';
import navOption from './schemas/navOption';
import page from './schemas/page';

import fullWidthImage from './schemas/fullWidthImage';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [page, headerNavigation, footerNavigation, navOption, fullWidthImage]
};
