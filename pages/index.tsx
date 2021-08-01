import React, { FC } from 'react'
import Layout from '@components/Layout'
import { HomeHeroSection } from '@components/HomeHeroSection'
import { HomeIntroGrid } from '@components/HomeIntroGrid'
import { HomeStructureGrid } from '@components/HomeStructureGrid'
import { HomeAssemblageGrid } from '@components/HomeAssemblageGrid'
import { Footer } from '@components/Footer'

const Grid: FC = () => (
	<Layout>
		<HomeHeroSection />
		<HomeIntroGrid />
		<HomeAssemblageGrid />
		<HomeStructureGrid />
		<Footer />
	</Layout>
)
export default Grid
