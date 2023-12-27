import { $, JSXNode, Signal, TaskCtx, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';
import { Link, useLocation } from '@builder.io/qwik-city';
import { MONTH_NAMES } from '~/library/contant';
import { Test } from '~/library/type';
import { decodeBase64, getBitsPositions, getQueryArray } from '~/library/utility';
import TestItem from '~/components/testItem';
import Loader from '~/components/loader';
import Logo from '~/assets/logo.svg';
import Index from './index.module.css';
import Footer from '~/components/footer';

export default component$(function (): JSXNode {
	const isEnd: Signal<boolean> = useSignal(false);
	const isLoading: Signal<boolean> = useSignal(false);
	const index: Signal<number> = useSignal(0);
	const tests: Signal<Test[]> = useSignal([]);
	let url: string = 'https://api.mochive.com/tests?page[size]=20';

	let rawQuery: string | null = useLocation()['url']['searchParams'].get('query');

	if(rawQuery !== null) {
		rawQuery = decodeBase64(rawQuery);

		const term: string = rawQuery.slice(0, rawQuery.indexOf(','));
		const queries: number[] = getQueryArray(rawQuery, term['length'] + 1);

		if(term['length'] !== 0) {
			url += '&term=' + encodeURIComponent(term);
		}

		if(queries[0] !== 0) {
			url += '&grades=' + getBitsPositions(queries[0]).join(',');
		}

		if(queries[1] !== 0) {
			url += '&subjects=' + getBitsPositions(queries[1]).join(',');
		}

		if(queries[2] !== 0) {
			const months: number[] = getBitsPositions(queries[2]);

			for(let i: number = 0; i < months['length']; i++) {
				months[i] = MONTH_NAMES[months[i] - 1];
			}

			url += '&months=' + months.join(',');
		}

		url += '&startAt=' + queries[3] + '&endAt=' + queries[4];
	} else {
		return <p>Error</p>;
	}

	useVisibleTask$(function (context: TaskCtx): void {
		context.track(function (): number {
			return index['value'];
		});

		isLoading['value'] = true;

		fetch(url + '&page[index]=' + index['value'])
		.then(function (response: Response): Promise<{
			status: string;
			data: Test[];
		}> {
			if(response['status'] === 200) {
				return response.json();
			} else {
				throw response;
			}
		})
		.then(function (result: {
			status: string;
			data: Test[];
		}): void {
			tests['value'] = tests['value'].concat(result['data']);
		
			isLoading['value'] = false;
			
			if(result['data']['length'] !== 20) {
				isEnd['value'] = true;
			}
			
			return;
		})
		.catch(function (error: unknown): void {
			console.error(error);

			return;
		});
	});

  return <>
		<nav class={Index['navigation']}>
			<Link href='/'>
				{/* @ts-expect-error */}
				<Logo class={Index['logo']} />
			</Link>
		</nav>
		<ul class={Index['list']}>
			{tests['value'].map(function (test: Test): JSXNode {
				return <TestItem value={test} />;
			})}

			{!isEnd['value'] ? <Loader isLoading={isLoading['value']} onVisible={$(function (): void {
				if(!isLoading['value']) {
					index['value']++;
				}

				return;
			})} /> : undefined}
		</ul>
		<Footer />
	</>;
});
