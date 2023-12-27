import { JSXNode, component$, useStyles$ } from '@builder.io/qwik';

export default component$(function (): JSXNode {
	useStyles$('body,div{display:flex}body{background-color:#e6e6e6;justify-content:center;align-items:center;height:100vh}div{border:1px solid #949494;width:100%;max-width:700px;height:150px;justify-content:center;align-items:center;border-radius:16px;flex-direction:column;gap:4px}a,h1{font-weight:400;font-family:\'굴림\',Gulim}h1{font-size:2.4rem}@media (width <= 840px){div{width:90%}h1{font-size:2.2rem}a{font-size:.9rem}}@media (width <= 490px){div{width:95%}h1{font-size:2rem}a{font-size:.8rem}}');
	
	return <div>
		<h1>이 면은 여백입니다.</h1>
		<a href='/'>처음으로</a>
	</div>;
});