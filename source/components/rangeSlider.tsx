import { $, JSXNode, QRL, Signal, TaskCtx, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import RangeSlider from './rangeSlider.module.css';

export default component$(function (properties: {
	start: Signal<string>;
	end: Signal<string>;
	minimum: string;
	maximum: string;
}): JSXNode {
	const minimum: number = Number(properties['minimum']);
	const range: number = Number(properties['maximum']) - minimum;
	const start: Signal<HTMLInputElement> = useSignal() as Signal<HTMLInputElement>;
	const end: Signal<HTMLInputElement> = useSignal() as Signal<HTMLInputElement>;
	const fill: Signal<HTMLElement> = useSignal() as Signal<HTMLElement>;

	const updateFill: QRL<() => void> = $(function (): void {
		fill['value']['style']['width'] = 'calc(' + (Number(end['value']['value']) - Number(start['value']['value'])) / range * 100 + '% - 2px)';
		fill['value']['style']['left'] = 'calc(' + ((Number(start['value']['value']) - minimum) / range) * 100 + '% + 1px)';

		return;
	});

	useVisibleTask$(function (context: TaskCtx): void {
		context.track(function (): string {
			return properties['start']['value'];
		});

		context.track(function (): string {
			return properties['end']['value'];
		});
		
		updateFill();

		return;
	});

	return <div class={RangeSlider['rangeSlider']}>
		<div ref={fill} class={RangeSlider['fill']}></div>
		<input class={RangeSlider['pointer']} ref={start} type='range' min={properties['minimum']} max={properties['maximum']} value={properties['start']['value']} onInput$={function (): void {
			if(start['value']['value'] > end['value']['value']) {
				end['value']['value'] = start['value']['value'];
			}
			
			updateFill();
			
			properties['start']['value'] = start['value']['value'];
			
			return;
		}} />
		<input class={RangeSlider['pointer']} ref={end} type='range' min={properties['minimum']} max={properties['maximum']} value={properties['end']['value']} onInput$={function (): void {
			if(end['value']['value'] < start['value']['value']) {
				start['value']['value'] = end['value']['value'];
			}
			
			updateFill();
			
			properties['end']['value'] = end['value']['value'];
			
			return;
		}} />
		<div class={RangeSlider['background']}></div>
	</div>;
});