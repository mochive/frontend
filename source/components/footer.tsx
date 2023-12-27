import { JSXNode, component$ } from '@builder.io/qwik';
import Heart from '~/assets/heart.svg';
import Footer from './footer.module.css';

export default component$(function (): JSXNode {
	return <footer class={Footer['footer']}>
		<p class='nonSelectable'>
			{/* @ts-expect-error */}
			Made with&nbsp;<Heart class={Footer['icon']} />&nbsp;by&nbsp;<a href='https://github.com/h2owater425'>H2Owater425</a></p>
		<div>
			<a href='https://github.com/mochive'>Github</a>
			·
			<a href='mailto:support@mochive.com'>Email</a>
		</div>
	</footer>;
})