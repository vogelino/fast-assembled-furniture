import { useRouter } from 'next/router'
import { FC } from 'react'
import { PageTreeType, MenuItemType } from '@components/BrandGuide/Menu'
import Link from '@components/Link'
import { identity } from '@utils/functionsUtil'

function cleanupPath(path: string): string {
	return path.replace('/brand', '')
}

function cleanupTree(tree: PageTreeType): PageTreeType {
	return tree.reduce((acc: PageTreeType, treeItem: MenuItemType) => {
		const newTreeItem = {
			...treeItem,
			path: cleanupPath(treeItem.path),
			children: treeItem.children ? cleanupTree(treeItem.children) : undefined,
		}
		return [...acc, newTreeItem]
	}, [])
}

function findPageByPath(path: string, tree: PageTreeType): MenuItemType | undefined {
	let page

	for (let index = 0; index < tree.length; index += 1) {
		const treeItem = tree[index]
		if (treeItem.path === path) {
			page = treeItem
			break
		}
		if (treeItem.children && treeItem.children.length) {
			const pageAsChild = findPageByPath(path, treeItem.children)
			if (pageAsChild) {
				page = pageAsChild
				break
			}
		}
	}

	return page
}

function getParentPath(currentPath: string): string | undefined {
	const currentPathArray = currentPath.split('/').filter(identity)
	if (currentPathArray[0] === currentPath) return undefined
	currentPathArray.pop()
	return currentPathArray && `/${currentPathArray.join('/')}`
}

function getBreadcrumb(page: MenuItemType, tree: PageTreeType): MenuItemType[] {
	const parentPath = getParentPath(page.path)
	if (parentPath) {
		const parentPage = findPageByPath(parentPath, tree)

		if (parentPage) {
			return [...getBreadcrumb(parentPage, tree), page]
		}
	}
	return [page]
}

type BreadcrumbPropType = {
	pageTree: PageTreeType
}

const Breadcrumb: FC<BreadcrumbPropType> = ({ pageTree }) => {
	const router = useRouter()

	const tree = cleanupTree(pageTree)
	const cleanRoute = cleanupPath(router.asPath)
	const currentPage = findPageByPath(cleanRoute, tree)
	const breadcrumb = currentPage ? getBreadcrumb(currentPage, tree) : []
	return (
		<ul>
			{breadcrumb.map((treeItem, idx) => (
				<li key={treeItem.path} className="inline-block">
					{idx > 0 && <span className="mx-3 opacity-20">→</span>}
					<Link
						href={`/brand${treeItem.path}`}
						activeClassName="line-through"
						inactiveClassName="opacity-50"
						className="hover:opacity-100 transition-opacity"
					>
						{treeItem.title}
					</Link>
				</li>
			))}
		</ul>
	)
}

export default Breadcrumb
