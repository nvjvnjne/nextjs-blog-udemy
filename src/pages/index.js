import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";
import Head from "next/head";
import Layout, { siteTitle } from "../../components/Layout";
import styles from "../styles/Home.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import { getPostsData } from "../../lib/post";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

//SSGの場合
export async function getStaticProps() {
  const allPostData = getPostsData();
  console.log(allPostData);

  return {
    props: {
      allPostData,
    },
  };
}

export default function Home({ allPostData }) {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          私はフロントエンドエンジニアです。Javascript, React,
          Next.jsを使っています
        </p>
      </section>

      <section>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostData.map(({ id, title, date, thumbnail }) => (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`} className={utilStyles.boldText}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}
