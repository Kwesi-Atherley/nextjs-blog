import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function getSortedPostsData() {
  // Instead of the file system,
  // fetch post data from an external API endpoint
  //endpoint vars
  const base_url = 'https://cdn.contentstack.io';
  const content_type_uid = 'post';
  const entry_uid = 'blta52cb7ffba9feec8';
  const environment = 'dev';
  //header vars
  const api_key = 'blt78bc505eb9430baf';
  const delivery_token = 'cs840f045cd6092b020f81ffc4';
  const branch = 'main';

  const url = new URL(
    `/v3/content_types/${content_type_uid}/entries?environment=${environment}&asc`,
    base_url
  );

  const headers = {
    api_key: `${api_key}`,
    access_token: `${delivery_token}`,
    'Content-Type': 'application/json',
  };

  const res = await fetch(url, { headers: headers });
  const jsonRes = await res.json();
  return jsonRes;
}

export async function getAllPostIds() {
  const base_url = 'https://cdn.contentstack.io';
  const content_type_uid = 'post';
  const entry_uid = 'blta52cb7ffba9feec8';
  const environment = 'dev';
  //header vars
  const api_key = 'blt78bc505eb9430baf';
  const delivery_token = 'cs840f045cd6092b020f81ffc4';
  const branch = 'main';

  const url = new URL(
    `/v3/content_types/${content_type_uid}/entries?environment=${environment}`,
    base_url
  );

  const headers = {
    api_key: `${api_key}`,
    access_token: `${delivery_token}`,
    'Content-Type': 'application/json',
  };

  const res = await fetch(url, { headers: headers });
  const posts = await res.json();

  // Returns an array that looks like this:
  const ids = [
    {
      params: {
        id: 'ssg-ssr',
      },
    },
    {
      params: {
        id: 'pre-rendering',
      },
    },
  ];
  return ids;
}

export async function getPostData(id) {
  //endpoint vars
  const base_url = 'https://cdn.contentstack.io';
  const content_type_uid = 'post';
  const entry_uid = 'blta52cb7ffba9feec8';
  const environment = 'dev';
  //header vars
  const api_key = 'blt78bc505eb9430baf';
  const delivery_token = 'cs840f045cd6092b020f81ffc4';
  const branch = 'main';
  const url = new URL(
    `/v3/content_types/${content_type_uid}/entries/?environment=${environment}&query=${JSON.stringify(
      { slug: id }
    )}`,
    base_url
  );

  const headers = {
    api_key: `${api_key}`,
    access_token: `${delivery_token}`,
    'Content-Type': 'application/json',
  };

  const res = await fetch(url, { headers: headers });
  const jsonRes = await res.json();
  const post = jsonRes.entries[0];
  const title = post.title;
  const date = post.date;

  console.log(jsonRes.entries);
  const matterResult = matter(jsonRes.entries[0].content);
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    date,
    title,
  };
}
