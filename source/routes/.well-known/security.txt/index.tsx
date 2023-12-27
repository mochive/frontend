import { RequestEvent } from '@builder.io/qwik-city';

export function onGet(event: RequestEvent): void {
	event.text(200, 'Contact: mailto:me@kangmin.kim\nContact: mailto:support@mochive.com\nExpires: ' + ((new Date()).getFullYear() + 1) + '-01-01T00:00:00.000Z\nPreferred-Languages: ko, en\nCanonical: https://mochive.com/.well-known/security.txt');

	return;
}