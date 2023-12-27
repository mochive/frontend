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
			<title>Mochive</title>
		</head>
		<body lang='ko'>
			<RouterOutlet />
			<ServiceWorkerRegister />
		</body>
	</QwikCityProvider>;
});
