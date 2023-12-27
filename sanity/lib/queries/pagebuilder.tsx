import { client } from '../client';

export const getPageBuilder = async (slug: string) => {
  console.log(slug);
  const content = await client.fetch(`*[_type == "page" && slug.current == "${slug}"]`);
  const pageContent = content[0].pageBuilder;
  return pageContent;
};
