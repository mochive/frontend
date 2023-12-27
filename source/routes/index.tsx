import { JSXNode, component$ } from '@builder.io/qwik';
import SearchBox from '~/components/searchBox';
import Mochive from '~/assets/mochive.svg';
import Index from './index.module.css';
import Footer from '~/components/footer';

export default component$(function (): JSXNode {
	return <>
		<main class={Index['main']}>
			{/* @ts-expect-error */}
			<Mochive class={Index['mochive']} />
			<SearchBox />
		</main>
		<Footer />
	</>;
});