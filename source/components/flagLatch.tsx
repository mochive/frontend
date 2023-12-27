import { JSXNode, Signal, Slot, component$, useComputed$ } from '@builder.io/qwik';
import FlagLatch from './flagLatch.module.css';

export default component$(function (properties: {
	flag: Signal<number>;
	unit: number;
}): JSXNode {
	const inverseFlag: number = properties['flag']['value'] ^ properties['unit'];
	const isActive: Readonly<Signal<boolean>> = useComputed$(function (): boolean {
		return (properties['flag']['value'] & properties['unit']) !== 0;
	});

	return <button type='button' onClick$={function (): void {;
		if(isActive['value']) {
			properties['flag']['value'] &= inverseFlag;
		} else {
			properties['flag']['value'] |= properties['unit'];
		}

		return;
	}} class={[FlagLatch['flagLatch'], 'nonSelectable', isActive['value'] ? FlagLatch['active'] : undefined]}>
		<Slot />
	</button>;
});