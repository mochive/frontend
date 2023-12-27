import { JSXNode, component$, useVisibleTask$ } from '@builder.io/qwik';
import { Test, TestListening } from '~/library/type';
import Korean from '~/assets/korean.svg';
import Mathematics from '~/assets/mathematics.svg';
import English from '~/assets/english.svg';
import History from '~/assets/history.svg';
import SocialStudy from '~/assets/socialStudy.svg';
import Science from '~/assets/science.svg';
import VocationalEducation from '~/assets/vocationalEducation.svg';
import SecondForeignLanguage from '~/assets/secondForeignLanguage.svg';
import TestItem from './testItem.module.css';
import Question from '~/assets/question.svg';
import Answer from '~/assets/answer.svg';
import Commentary from '~/assets/commentary.svg';
import Audio from '~/assets/audio.svg';
import Script from '~/assets/script.svg';

export default component$(function (properties: {
	value: Test & {
		listening?: TestListening;
	};
}): JSXNode {
	let icon: JSXNode;

	switch(properties['value']['subject']) {
		case 1: {
			// @ts-expect-error
			icon = <Korean class={TestItem['icon']} />;

			break;
		}
		
		case 2: {
			// @ts-expect-error
			icon = <Mathematics class={TestItem['icon']} />;

			break;
		}
		
		case 3: {
			// @ts-expect-error
			icon = <English class={TestItem['icon']} />;

			break;
		}
		
		case 4: {
			// @ts-expect-error
			icon = <History class={TestItem['icon']} />;

			break;
		}
		
		case 5: {
			// @ts-expect-error
			icon = <SocialStudy class={TestItem['icon']} />;

			break;
		}
		
		case 6: {
			// @ts-expect-error
			icon = <Science class={TestItem['icon']} />;

			break;
		}
		
		case 7: {
			// @ts-expect-error
			icon = <VocationalEducation class={TestItem['icon']} />;

			break;
		}
		
		case 8: {
			// @ts-expect-error
			icon = <SecondForeignLanguage class={TestItem['icon']} />;

			break;
		}
	}
	

	useVisibleTask$(function () {
		
	console.log()
	})
	return <li class={TestItem['testItem']}>
			{icon}
		<div class='nonSelectable'>
			<h1 class={TestItem['name']}>{properties['value']['name']}</h1>
			<p class={TestItem['takenAt']}>{properties['value']['takenAt']}</p>
		</div>
		<div class={TestItem['button']} style={{
			flexDirection: typeof(properties['value']['listening']) === 'undefined' ? 'column' : undefined
		}}>
			{typeof(properties['value']['listening']) !== 'undefined' ? <>
				<div>
					{/* @ts-expect-error */}
					<a target='_blank' href={'https://wdown.ebsi.co.kr/W61001/01exam' + properties['value']['question']} download><Question class={TestItem['buttonIcon']} /></a>
					{/* @ts-expect-error */}
					{!properties['value']['name'].endsWith('짝수형') ? <a target='_blank' href={'https://wdown.ebsi.co.kr/W61001/01exam' + properties['value']['commentary']} download><Commentary class={TestItem['buttonIcon']} /></a> : <a target='_blank' href={'https://wdown.ebsi.co.kr/W61001/01exam' + properties['value']['answer']} download><Answer class={TestItem['buttonIcon']} /></a>}
					{/*<a target='_blank' href={'https://wdown.ebsi.co.kr/W61001/01exam' + properties['value']['commentary']} download><Commentary class={TestItem['buttonIcon']} /></a>*/}
				</div>
				<div>
					{/* @ts-expect-error */}
					<a target='_blank' href={'https://wdown.ebsi.co.kr/W61001/01exam' + properties['value']['listening']['audio']} download><Audio class={TestItem['buttonIcon']} /></a>
					{/* @ts-expect-error */}
					{typeof(properties['value']['listening']['script']) === 'string' ? <a target='_blank' href={'https://wdown.ebsi.co.kr/W61001/01exam' + properties['value']['listening']['script']} download><Script class={TestItem['buttonIcon']} /></a> : <a class={TestItem['disabled']} preventdefault:click><Script class={TestItem['buttonIcon']} /></a>}
				</div>
			</> : <>
				{/* @ts-expect-error */}
				<a target='_blank' href={'https://wdown.ebsi.co.kr/W61001/01exam' + properties['value']['question']} download><Question class={TestItem['buttonIcon']} /><p>&nbsp;문제</p></a>
				{/* @ts-expect-error */}
				{!properties['value']['name'].endsWith('짝수형') ? <a target='_blank' href={'https://wdown.ebsi.co.kr/W61001/01exam' + properties['value']['commentary']} download><Commentary class={TestItem['buttonIcon']} /><p>&nbsp;해설</p></a> : <a target='_blank' href={'https://wdown.ebsi.co.kr/W61001/01exam' + properties['value']['answer']} download><Answer class={TestItem['buttonIcon']} /><p>&nbsp;정답</p></a>}
			</>}
		</div>
	</li>;
});