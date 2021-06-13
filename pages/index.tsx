import React, { FC } from 'react'
import Layout from '@components/Layout'
import { HomeHeroSection } from '@components/HomeHeroSection'
import { HomeMasonryGrid } from '@components/HomeMasonryGrid'

const Grid: FC = () => (
	<Layout>
		<HomeHeroSection />
		<HomeMasonryGrid />
	</Layout>
)
export default Grid
