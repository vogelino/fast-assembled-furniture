import { FC } from 'react'
import Layout from '@components/Layout'
import { PrivacySection } from '@components/PrivacySection'
import { Footer } from '@components/Footer'

const Grid: FC = () => (
	<Layout>
		<PrivacySection />
		<Footer />
	</Layout>
)
export default Grid
