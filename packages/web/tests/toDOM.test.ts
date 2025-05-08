import { toDOM } from '@jsfns/web/toDOM';

describe('"toDOM"', () => {
	it('Return a HTMLCollection of all root elements converted', () => {
		const nodes = toDOM(`
      <div></div>
      <p></p>
      <a></a>
    `) as HTMLCollection;

		expect(nodes[0].tagName).toBe('DIV');
		expect(nodes[1].tagName).toBe('P');
		expect(nodes[2].tagName).toBe('A');
	});

	describe('Returns null for unsupported tags', () => {
		it.each([
			'<html></html>',
			'<head></head>',
			'<body></body>',
			'<frame></frame>',
			'<frameset></frameset>',
		])('"%s"', (val) => {
			expect(toDOM(val)).toBeNull();
		});
	});

	describe('Tags converted to a DOM element', () => {
		it.each([
			'<a></a>',
			'<abbr></abbr>',
			'<acronym></acronym>',
			'<address></address>',
			'<applet></applet>',
			'<area></area>',
			'<article></article>',
			'<aside></aside>',
			'<audio></audio>',
			'<b></b>',
			'<base></base>',
			'<basefont></basefont>',
			'<bdo></bdo>',
			'<big></big>',
			'<blockquote></blockquote>',
			'<br />',
			'<button></button>',
			'<canvas></canvas>',
			'<caption></caption>',
			'<center></center>',
			'<cite></cite>',
			'<code></code>',
			'<col></col>',
			'<colgroup></colgroup>',
			'<datalist></datalist>',
			'<dd></dd>',
			'<del></del>',
			'<dfn></dfn>',
			'<div></div>',
			'<dl></dl>',
			'<dt></dt>',
			'<em></em>',
			'<embed></embed>',
			'<fieldset></fieldset>',
			'<figcaption></figcaption>',
			'<figure></figure>',
			'<font></font>',
			'<footer></footer>',
			'<form></form>',
			'<header></header>',
			'<h1></h1>',
			'<h2></h2>',
			'<h3></h3>',
			'<h4></h4>',
			'<h5></h5>',
			'<h6></h6>',
			'<hr />',
			'<i></i>',
			'<iframe></iframe>',
			'<img />',
			'<input />',
			'<ins></ins>',
			'<kbd></kbd>',
			'<label></label>',
			'<legend></legend>',
			'<li></li>',
			'<link />',
			'<main></main>',
			'<map></map>',
			'<mark></mark>',
			'<meta />',
			'<meter></meter>',
			'<nav></nav>',
			'<noscript></noscript>',
			'<object></object>',
			'<ol></ol>',
			'<optgroup></optgroup>',
			'<option></option>',
			'<p></p>',
			'<param />',
			'<pre></pre>',
			'<progress></progress>',
			'<q></q>',
			'<s></s>',
			'<samp></samp>',
			'<script></script>',
			'<section></section>',
			'<select></select>',
			'<small></small>',
			'<source />',
			'<span></span>',
			'<strike></strike>',
			'<strong></strong>',
			'<style></style>',
			'<sub></sub>',
			'<sup></sup>',
			'<table></table>',
			'<tbody></tbody>',
			'<td></td>',
			'<textarea></textarea>',
			'<tfoot></tfoot>',
			'<th></th>',
			'<thead></thead>',
			'<time></time>',
			'<title></title>',
			'<tr></tr>',
			'<u></u>',
			'<ul></ul>',
			'<var></var>',
			'<video></video>',
			'<wbr />',
		])('"%s"', (tag) => {
			const tagName = tag.match(/<(\w+)(?: \/)?>/);
			expect((toDOM(tag) as HTMLCollection)[0].tagName).toBe(tagName?.[1].toUpperCase());
		});
	});
});
