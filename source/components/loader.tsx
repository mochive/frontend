import { JSXNode, Signal, TaskCtx, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import Loader from './loader.module.css';

export default component$(function (properties: {
	onVisible: () => void;
	isLoading: boolean;
}): JSXNode {
	const loader: Signal<Element> = useSignal() as Signal<Element>;
	const isVisible: Signal<boolean> = useSignal(false);

	useVisibleTask$(function (context: TaskCtx): void {
		const observer = new IntersectionObserver(function (): void {
			isVisible['value'] = !isVisible['value'];

			if(isVisible['value']) {
				properties.onVisible();
			}
		});

		observer.observe(loader['value']);

		return context.cleanup(function (): void {
			observer.unobserve(loader['value']);

			return;
		});
	});
	
	return <div class={Loader['loader']} ref={loader}>
		<p hidden={properties['isLoading']}>로딩중...</p>
	</div>;
})