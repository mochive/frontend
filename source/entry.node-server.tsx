import { createQwikCity } from '@builder.io/qwik-city/middleware/node';
import qwikCityPlan from '@qwik-city-plan';
import render from './entry.ssr';
import { manifest } from '@qwik-client-manifest';
import { IncomingMessage, ServerResponse, createServer } from 'node:http';
import 'dotenv/config';
import Logger from './library/logger';

const port: number = Number(process['env']['PORT']);

if(Number.isInteger(port) && port > 0) {
	const qwikCity: ReturnType<typeof createQwikCity> = createQwikCity({
		static: {
			root: 'distribution'
		},
		render: render,
		qwikCityPlan: qwikCityPlan,
		manifest: manifest
	});
	
	createServer().on('request', function (request: IncomingMessage, response: ServerResponse): void {
		const startTime: number = Date.now();
	
		qwikCity.staticFile(request, response, function (): void {
			Logger['logger'].info((typeof(request['headers']['x-forward-for']) === 'string' ? request['headers']['x-forward-for'] : (request['socket']['remoteAddress'] as string).slice(7)) + ' "' + request['method'] + ' ' + decodeURIComponent(request['url'] as string) + ' HTTP/' + request['httpVersion'] + '" ' + response['statusCode'] + ' "' + request['headers']['user-agent'] + '" (' + (Date.now() - startTime) + 'ms)');
	
			qwikCity.router(request, response, function (): void {
				qwikCity.notFound(request, response, function (): void {
					
					return;
				});
	
				return;
			});
			
			return;
		});
		
		return;
	})
	.listen(port)
	.once('listening', function (): void {
		Logger['logger'].info('http://127.0.0.1:' + process['env']['PORT']);
	
		return;
	})
	.on('error', Logger['logger'].error.bind(Logger['logger']));
} else {
	throw new Error('PORT must be configured');
}