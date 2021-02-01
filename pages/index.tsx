import { FC } from 'react'
import { gql } from 'graphql-request'
import { GetStaticProps } from 'next'
import { request } from '@utils/requestUtil'
import { MappedSeoProps, mapSeoToProps, RawSeoCommons, RawHomePage } from '@utils/graphcmsUtil'
import Layout from '@components/Layout'
import { Homepage } from '@components/Homepage'

const Home: FC<{ homepage: RawHomePage }> = ({ homepage }) => (
	<Layout>
		<Homepage {...homepage} />
	</Layout>
)

export default Home

const query = gql`
	query HomepageQuery($stage: Stage!, $locale: Locale!) {
		pages(where: { isHomepage: true }, stage: $stage, locales: [$locale]) {
			seoTitle
			seoDescription
			seoKeywords
			displayTitle
			introductionText
			mainGallery {
				id
				url
			}
			detailImages {
				id
				url
			}
			secondaryTitle
			secondaryText
			shelveIcon {
				id
				url
			}
			backgroundImage {
				id
				url
			}
		}
		seoCommons(stage: $stage, locales: [$locale]) {
			siteTitle
			themeTextColor
			twitterUsername
		}
	}
`

interface Data {
	seoCommons: RawSeoCommons[]
	pages: RawHomePage[]
}

const mapDataToProps = ({
	pages,
	seoCommons,
}: Data): {
	seo: MappedSeoProps
	homepage: RawHomePage
} => ({
	seo: mapSeoToProps({ pages, seoCommons }),
	homepage: pages[0],
})

export const getStaticProps: GetStaticProps = async ({ locale, defaultLocale }) => {
	const lang = locale || defaultLocale
	const props = await request(query, { locale: lang })
	return { props: mapDataToProps(props) }
}
