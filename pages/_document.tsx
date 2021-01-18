import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import { ColorThemeProvider } from '../components/ColorThemeContext'

class MyDocument extends Document {
	static async getInitialProps(ctx: DocumentContext) {
		const initialProps = await Document.getInitialProps(ctx)

		return initialProps
	}

	render() {
		return (
			<Html>
				<Head />
				<ColorThemeProvider>
					<Main />
					<NextScript />
				</ColorThemeProvider>
			</Html>
		)
	}
}

export default MyDocument
