import { BorderEdge, ButtonWithBorderEdges } from '@components/BorderEdge'
import { Logo } from '@components/Logo'
import { Button } from '@components/SquareButton'
import Image from 'next/image'
import { FC } from 'react'
import styles from './HomeMasonryGrid.module.css'

export const HomeMasonryGrid: FC = () => (
	<div className={styles.container}>
		<div>
			<div className={[styles.buttonsContainer, 'inline-flex bg-primary'].join(' ')}>
				<Button type="button" colorType="Buy">
					Buy <span className="text-sm font-normal">(123€)</span>
				</Button>
				<ButtonWithBorderEdges
					edges={[{ position: 'RightBottom', orientation: 'BottomLeft' }]}
					openings={['TopRight']}
					colorType="Edit"
				>
					Customize
				</ButtonWithBorderEdges>
			</div>
		</div>
		<div className="gfc -ml-bd -mt-bd w-full-p">
			<div className="grid grid-cols-12 lg:grid-flow-col-dense">
				<div className="gf col-span-6 lg:col-span-6 grid lg:grid-cols-5 p-8">
					<div className="col-span-2">
						<Logo framed={false} className="transform scale-75 origin-top-left" />
						<h4 className="text-2xl font-bold uppercase leading-6">
							Fast
							<br />
							Assembled
							<br />
							Furniture
						</h4>
					</div>
					<p className="md:text-xl lg:text-2xl col-span-3">
						A customizable modular furniture system. Quick to assemble and disassemble. Industrial
						components – or found objects – are collaged to form a piece of furniture.
					</p>
				</div>
				<div
					className={[styles.imageContainer, 'gf col-span-6 lg:col-span-6 lg:row-span-3'].join(' ')}
				>
					<Image src="/images/LargeBlock01.png" width={696} height={808} objectFit="cover" />
				</div>
				<div
					className={[
						styles.imageContainer,
						'gf lg:h-72 col-span-6 lg:col-span-3',
					].join(' ')}
				>
					<Image src="/images/Detail01.png" width={300} height={300} objectFit="cover" />
				</div>
				<div className="relative col-span-6 lg:col-span-3">
					<div className={[styles.imageContainer, 'absolute gf h-full-p w-full-p'].join(' ')}>
						<Image src="/images/Detail03.png" width={300} height={300} objectFit="cover" />
					</div>
				</div>
				<div
					className={[
						styles.imageContainer,
						'gf lg:h-72 col-span-6 lg:col-span-3',
					].join(' ')}
				>
					<Image src="/images/Detail02.png" width={300} height={300} objectFit="cover" />
				</div>
				<div className="relative col-span-6 lg:col-span-3">
					<div className={[styles.middleBlock, 'gf h-full-p p-8 pt-24'].join(' ')}>
						<div
							className={[
								styles.marquee,
								'absolute text-2xl uppercase font-bold whitespace-nowrap top-10',
							].join(' ')}
						>
							<div className={styles.marqueeInner} aria-hidden>
								<span>Box · Strap · Board ·&nbsp;</span>
								<span>Box · Strap · Board ·&nbsp;</span>
								<span>Box · Strap · Board ·&nbsp;</span>
								<span>Box · Strap · Board ·&nbsp;</span>
							</div>
						</div>
						<p className="md:text-xl lg:text-2xl">
							The core elements of FAF allow for a quick and flexible assembly. The straps, the box
							and the boards can be customized at will to match your branding or room atmosphere.
						</p>
					</div>
					<BorderEdge
						orientation="BottomLeft"
						className="opacity-0 lg:opacity-100 absolute -top-6"
						style={{ left: 'calc(100% - var(--borderWidth, 3px))' }}
					/>
					<BorderEdge
						orientation="BottomLeft"
						className="opacity-0 lg:opacity-100 absolute bottom-0"
						style={{ left: 'calc(200% - (2 * var(--borderWidth, 3px)))' }}
					/>
					<BorderEdge
						orientation="BottomRight"
						className="opacity-0 lg:opacity-100 absolute bottom-0"
						style={{ left: 'calc(200% - var(--borderWidth, 3px) - 24px)' }}
					/>
				</div>
			</div>
			<div className="gfc -ml-bd -mt-bd w-full-p">
				<div className="gf h-96"></div>
			</div>
		</div>
	</div>
)
