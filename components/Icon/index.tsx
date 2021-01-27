import { FC } from 'react'
import * as featherIcons from 'react-feather'

export type IconType = FC<{ size?: number | undefined; color?: string | undefined }>

type IconsType = {
	[key: string]: IconType
}

export const icons: IconsType = featherIcons as IconsType
