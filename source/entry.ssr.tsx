import { renderToStream, RenderToStreamResult, RenderToStreamOptions } from '@builder.io/qwik/server';
import { manifest } from '@qwik-client-manifest';
import Root from './root';

export default function (options: RenderToStreamOptions): Promise<RenderToStreamResult> {
  return renderToStream(<Root />, Object.assign({
		manifest: manifest,
	}, options, {
		containerAttributes: Object.assign({
			lang: 'ko-kr'
		}, options['containerAttributes'])
	}));
}