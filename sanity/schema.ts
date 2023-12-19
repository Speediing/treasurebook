import { type SchemaTypeDefinition } from 'sanity';

import footerNavigation from './schemas/footerNavigation';
import headerNavigation from './schemas/headerNavigation';
import navOption from './schemas/navOption';
import page from './schemas/page';

import { schemaTypes } from './schemas';
import fullWidthImage from './schemas/fullWidthImage';
import splitSmallText from './schemas/splitSmallText';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    page,
    headerNavigation,
    footerNavigation,
    navOption,
    fullWidthImage,
    splitSmallText,
    ...schemaTypes
  ]
};
