import { render, RenderResult, RenderOptions } from '@builder.io/qwik';
import Root from './root';

export default function (options: RenderOptions): Promise<RenderResult> {
  return render(document, <Root />, options);
}
