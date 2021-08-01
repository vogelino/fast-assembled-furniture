import React, { FC } from 'react'
import Layout from '@components/Layout'
import { HomeHeroSection } from '@components/HomeHeroSection'
import { HomeIntroGrid } from '@components/HomeIntroGrid'
import { HomeStructureGrid } from '@components/HomeStructureGrid'
import { HomeAssemblageGrid } from '@components/HomeAssemblageGrid'

const Grid: FC = () => (
	<Layout>
		<HomeHeroSection />
		<HomeIntroGrid />
		<HomeAssemblageGrid />
		<HomeStructureGrid />
	</Layout>
)
export default Grid
