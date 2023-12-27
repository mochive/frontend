import { $, JSXNode, QRL, Signal, TaskCtx, component$, useOnWindow, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { RouteNavigate, useNavigate } from '@builder.io/qwik-city';
import FlagLatch from '~/components/flagLatch';
import RangeSlider from '~/components/rangeSlider';
import { GRADE_NAMES, MONTH_NAMES, SUBJECT_NAMES } from '~/library/contant';
import SearchBox from './searchbox.module.css';
import { encodeBase64 } from '~/library/utility';
import Search from '~/assets/search.svg';
import Grade from '~/assets/grade.svg';
import Subject from '~/assets/subject.svg';
import Month from '~/assets/month.svg';

export default component$(function (): JSXNode {
	const navigate: RouteNavigate = useNavigate();
	const currentYear: string = String((new Date()).getFullYear());
	const gradeFlag: Signal<number> = useSignal(0);
	const subjectFlag: Signal<number> = useSignal(0);
	const monthFlag: Signal<number> = useSignal(0);
	const startYear: Signal<string> = useSignal('2006');
	const endYear: Signal<string> = useSignal(currentYear);
	const term: Signal<string> = useSignal('');
	
	useVisibleTask$(function (context: TaskCtx): void {
		context.track(function (): string {
			return endYear['value'];
		});

		if(startYear['value'] > endYear['value']) {
			startYear['value'] = endYear['value'];
		}

		return;
	});

	useVisibleTask$(function (context: TaskCtx): void {
		context.track(function (): string {
			return startYear['value'];
		});

		if(startYear['value'] > endYear['value']) {
			endYear['value'] = startYear['value'];
		}

		return;
	});

	const search: QRL<() => void> = $(function (): void {
		let query: string = '';

		if(term['value']['length'] !== 0) {
			query += term['value'].replace(/,/g, ' ');
		}
		
		query += ',';
		
		if(gradeFlag['value'] !== 0) {
			query += gradeFlag['value'];
		}
		
		query += ',';
		
		if(subjectFlag['value'] !== 0) {
			query += subjectFlag['value'];
		}
		
		query += ',';
		
		if(monthFlag['value'] !== 0) {
			query += monthFlag['value'];
		}

		navigate('/search?query=' + encodeBase64(query + ',' + startYear['value'] + ',' + endYear['value']));

		return;
	});

	useOnWindow('keydown', $(function (event: KeyboardEvent): void {
		if(event['key'] === 'Enter') {
			search();
		}

		return;
	}));
	
  return <form preventdefault:submit class={SearchBox['searchBox']} onSubmit$={search}>
			<div class={SearchBox['term']}>
				<input type='text' bind:value={term} />
				{/* @ts-expect-error */}
				<Search class={SearchBox['search']} onClick$={search} />
			</div>

		<div class={SearchBox['option']}>
			{/* @ts-expect-error */}
			<FlagLatch flag={gradeFlag} unit={0b111}><Grade class={SearchBox['icon']} /></FlagLatch>
			<FlagLatch flag={gradeFlag} unit={1}>{GRADE_NAMES[0]}</FlagLatch>
			<FlagLatch flag={gradeFlag} unit={2}>{GRADE_NAMES[1]}</FlagLatch>
			<FlagLatch flag={gradeFlag} unit={4}>{GRADE_NAMES[2]}</FlagLatch>
		</div>

		<div class={SearchBox['option']}>
			{/* @ts-expect-error */}
			<FlagLatch flag={subjectFlag} unit={0b11111111}><Subject class={SearchBox['icon']} /></FlagLatch>
			<FlagLatch flag={subjectFlag} unit={1}>{SUBJECT_NAMES[0]}</FlagLatch>
			<FlagLatch flag={subjectFlag} unit={2}>{SUBJECT_NAMES[1]}</FlagLatch>
			<FlagLatch flag={subjectFlag} unit={4}>{SUBJECT_NAMES[2]}</FlagLatch>
			<FlagLatch flag={subjectFlag} unit={8}>{SUBJECT_NAMES[3]}</FlagLatch>
			<div class={SearchBox['option']} style={{
				margin: '0'
			}}>
				<FlagLatch flag={subjectFlag} unit={16}>{SUBJECT_NAMES[4]}</FlagLatch>
				<FlagLatch flag={subjectFlag} unit={32}>{SUBJECT_NAMES[5]}</FlagLatch>
				<FlagLatch flag={subjectFlag} unit={64}>{SUBJECT_NAMES[6]}</FlagLatch>
				<FlagLatch flag={subjectFlag} unit={128}>{SUBJECT_NAMES[7]}</FlagLatch>
			</div>
		</div>
		<div class={SearchBox['option']}>
			{/* @ts-expect-error */}
			<FlagLatch flag={monthFlag} unit={0b1111111}><Month class={SearchBox['icon']} /></FlagLatch>
			<FlagLatch flag={monthFlag} unit={1}>{MONTH_NAMES[0] + '월'}</FlagLatch>
			<FlagLatch flag={monthFlag} unit={2}>{MONTH_NAMES[1] + '월'}</FlagLatch>
			<FlagLatch flag={monthFlag} unit={4}>{MONTH_NAMES[2] + '월'}</FlagLatch>
			<FlagLatch flag={monthFlag} unit={8}>{MONTH_NAMES[3] + '월'}</FlagLatch>
			<FlagLatch flag={monthFlag} unit={16}>{MONTH_NAMES[4] + '월'}</FlagLatch>
			<FlagLatch flag={monthFlag} unit={32}>{MONTH_NAMES[5] + '월'}</FlagLatch>
			<FlagLatch flag={monthFlag} unit={64}>{MONTH_NAMES[6] + '월'}</FlagLatch>
		</div>

		<div class={SearchBox['yearContainer']}>
			<div class={SearchBox['inputContainer']}>
				<input type='number' bind:value={startYear} min='2006' max={currentYear} class={SearchBox['startInput']} />
				<div class={[SearchBox['resetInput'], 'nonSelectable']} onClick$={function (): void {
					startYear['value'] = '2006';
					endYear['value'] = currentYear;

					return;
				}}>—</div>
				<input type='number' bind:value={endYear} min='2006' max={currentYear} class={SearchBox['endInput']} />
			</div>
			<RangeSlider start={startYear} end={endYear} minimum='2006' maximum='2023' />
		</div>
	</form>;
});