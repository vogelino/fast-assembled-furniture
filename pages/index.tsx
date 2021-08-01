import React, { FC } from 'react'
import Layout from '@components/Layout'
import { HomeHeroSection } from '@components/HomeHeroSection'
import { HomeIntroGrid } from '@components/HomeIntroGrid'
import { HomePresetsSection } from '@components/HomePresetsSection'

const Grid: FC = () => (
	<Layout>
		<HomeHeroSection />
		<HomeIntroGrid />
		<HomePresetsSection />
	</Layout>
)
export default Grid
