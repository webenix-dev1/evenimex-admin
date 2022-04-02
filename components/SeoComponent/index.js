import Head from "next/head"
import { seoDetail } from "../../utils/constant"

const MetaSEO = ({ metaDetail }) => {
  const title = metaDetail?.title || seoDetail.title
  const desc =
    metaDetail?.desc ||
    seoDetail.desc
  const canonical = metaDetail?.canonical || seoDetail.canonical
  const image = metaDetail?.image || seoDetail.image
  const siteKeywords = metaDetail?.keywords || seoDetail.keywords
  const siteName = seoDetail.siteName
  const siteIcon = seoDetail.siteIcon

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={desc} />
      {metaDetail?.keywords && <meta name="keywords" content={siteKeywords} />}
      <meta property="og:type" content="website" />
      <meta name="og:title" property="og:title" content={title} />
      <meta name="og:description" property="og:description" content={desc} />
      <meta property="og:site_name" content={siteName}/>
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={desc} />
      {/* <meta name="twitter:site" content="@propernounco" /> */}
      {/* <meta name="twitter:creator" content="@propernounco" /> */}
      <link
        rel="icon"
        sizes="192x192"
        href={metaDetail?.image || siteIcon}
      />
      <link
        rel="apple-touch-icon"
        href={metaDetail?.image || siteIcon}
      />
      <meta property="og:image" content={image} />
      <meta name="twitter:image" content={image} />
      {metaDetail?.canonical && <link rel="canonical" href={canonical} />}
    </Head>
  )
}

export default MetaSEO
