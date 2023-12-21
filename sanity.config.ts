// /**
//  * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...index]]/page.tsx` route
//  */

// import { visionTool } from '@sanity/vision';
// import { defineConfig } from 'sanity';
// import { deskTool } from 'sanity/desk';

// // Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
// import { apiVersion, dataset, projectId } from './sanity/env';
// import { schema } from './sanity/schema';

// export default defineConfig({
//   basePath: '/admin',
//   projectId,
//   dataset,
//   // Add and edit the content schema in the './sanity/schema' folder
//   schema,
//   plugins: [
//     deskTool(),
//     // Vision is a tool that lets you query your content with GROQ in the studio
//     // https://www.sanity.io/docs/the-vision-plugin
//     visionTool({ defaultApiVersion: apiVersion })
//   ]
// });

import { defineConfig, isDev } from 'sanity';

import { colorInput } from '@sanity/color-input';
import { visionTool } from '@sanity/vision';
import { imageHotspotArrayPlugin } from 'sanity-plugin-hotspot-array';
import { media, mediaAssetSource } from 'sanity-plugin-media';
// @ts-ignore
import { deskTool } from 'sanity/desk';
import { structure } from './sanity/desk';
import { dataset, projectId } from './sanity/env';
import { customDocumentActions } from './sanity/plugins/customDocumentActions';
import { schema } from './sanity/schema';

const devOnlyPlugins = [visionTool()];

export default defineConfig({
  name: 'default',
  title: 'Stephen J',
  basePath: '/admin',
  projectId,
  dataset,

  plugins: [
    deskTool({ structure }),
    colorInput(),
    imageHotspotArrayPlugin(),
    customDocumentActions(),
    media(),
    ...(isDev ? devOnlyPlugins : [])
  ],

  schema,

  form: {
    file: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource !== mediaAssetSource);
      }
    },
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter((assetSource) => assetSource === mediaAssetSource);
      }
    }
  }
});
