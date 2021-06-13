import React, { FC } from 'react'
import Layout from '@components/Layout'
import { HomeHeroSection } from '@components/HomeHeroSection'
import { HomeMasonryGrid } from '@components/HomeMasonryGrid'
import { HomePresetsSection } from '@components/HomePresetsSection'

const Grid: FC = () => (
	<Layout>
		<HomeHeroSection />
		<HomeMasonryGrid />
		<HomePresetsSection />
	</Layout>
)
export default Grid
