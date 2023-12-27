import { setupServiceWorker } from '@builder.io/qwik-city/service-worker';

setupServiceWorker();

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', function (): Promise<void> {
	return self.skipWaiting();
});

self.addEventListener('activate', function (): Promise<void> {
	return self['clients'].claim();
});