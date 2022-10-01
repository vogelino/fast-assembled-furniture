import { FC } from 'react'
import Layout from '@components/Layout'
import { ImprintSection } from '@components/ImprintSection'
import { Footer } from '@components/Footer'

const Grid: FC = () => (
	<Layout>
		<ImprintSection />
		<Footer />
	</Layout>
)
export default Grid
