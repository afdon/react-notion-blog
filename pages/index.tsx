import Link from "next/link";

const NOTION_BLOG_ID = "95ab2b08451a4f878b30492cbef2960d";

export type Post = { id: string; slug: string; title: string; date: string };

export const getAllPosts = async (): Promise<Post[]> => {
  return await fetch(
    `https://notion-api.splitbee.io/v1/table/${NOTION_BLOG_ID}`
  ).then((res) => res.json());
};

export async function getStaticProps() {
  const posts = await getAllPosts();

  return {
    props: {
      posts,
    },
  };
}

function HomePage({ posts }: { posts: Post[] }) {
  return (
    <div className="content">
      <h1>Posts</h1>
      <div>
        {posts.map((post) => (
          <Link href="/[slug]" as={`/${post.slug}`}>
            <a>
              <b>{post.title}</b>
              <div className="sub">posted on {post.date}</div>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
