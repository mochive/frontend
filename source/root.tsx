import { JSXNode, component$ } from '@builder.io/qwik';
import { QwikCityProvider, RouterOutlet, ServiceWorkerRegister } from '@builder.io/qwik-city';

import './global.css';

export default component$(function (): JSXNode {
  return <QwikCityProvider>
		<head>
			{/* @ts-expect-error */}
			<meta charset='UTF-8' />
			<meta http-equiv='X-UA-Compatible' content='IE=edge' />
			<meta name='viewport' content='width=device-width, initial-scale=1.0' />
			<link rel='icon' href='favicon.svg' />
			<link rel='mask-icon' href='favicon-mask.svg' />
			<link rel='shortcut icon' href='favicon.ico' />
			<link rel='apple-touch-icon' href='apple-touch-icon.png' />
			<meta name='theme-color' content='#F5F2EB' />
			<title>Mochive</title>
			<meta name="description" content="모카이브: 모의고사 아카이브" />
			<meta name="keywords" content="모의고사, 모의평가, 모고, 모평, 전국연합학력평가, 학력평가, 대학수학능력시험, 수능, ebs, ebsi" />
			<meta property='og:type' content='website' />
			<meta property='og:title' content='Mochive' />
			<meta property='og:description' content='모카이브: 모의고사 아카이브' />
			<meta property='og:image' content='https://mochive.com/ogImage.png' />
			<meta property='twitter:card' content='summary_large_image' />
			<meta property='twitter:title' content='Mochive' />
			<meta property='twitter:description' content='모카이브: 모의고사 아카이브' />
			<meta property='twitter:image' content='https://mochive.com/ogImage.png' />
		</head>
		<body lang='ko'>
			<RouterOutlet />
			<ServiceWorkerRegister />
		</body>
	</QwikCityProvider>;
});
