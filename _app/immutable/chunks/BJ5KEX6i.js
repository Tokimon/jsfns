var e=[{name:`camelCase`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">camelCase</span>(<span class="hljs-attr" title="The string to format">input</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr" title="The settings for the transform">settings</span>?: <span class="hljs-title class_" data-custom-type="CamelCaseSettings">CamelCaseSettings</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Transform a string into a camelCased word (eg. &#39;camel case&#39; -&gt; &#39;camelCase&#39;)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">camelCase</span>(<span class="hljs-string">&#x27;data-value2-input&#x27;</span>); <span class="hljs-comment">// --&gt; dataValue2input</span>
<span class="hljs-title function_">camelCase</span>(<span class="hljs-string">&#x27;XML data input&#x27;</span>); <span class="hljs-comment">// --&gt; XmlDataInput</span>

<span class="hljs-comment">// With settings</span>
<span class="hljs-keyword">const</span> settings = { <span class="hljs-attr">abbr</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">numbers</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">upper</span>: <span class="hljs-literal">true</span> };

<span class="hljs-title function_">camelCase</span>(<span class="hljs-string">&#x27;data-VALUE2-input&#x27;</span>, settings); <span class="hljs-comment">// --&gt; DataVALUE2Input</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The formatted string</p>
`,typesMarkdown:``}]},{name:`capitalize`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">capitalize</span>(<span class="hljs-attr" title="String to capitalize">str</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Capitalize each word in a phrase</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">capitalize</span>(<span class="hljs-string">&#x27;capitalize this phrase&#x27;</span>); <span class="hljs-comment">// --&gt; Capitalize This Phrase</span>
<span class="hljs-title function_">capitalize</span>(<span class="hljs-string">&#x27;capitalize-This-phrase&#x27;</span>); <span class="hljs-comment">// --&gt; Capitalize-This-Phrase</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Capitalized string</p>
`,typesMarkdown:``}]},{name:`chunkString`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">chunkString</span>(<span class="hljs-attr" title="String to split up">str</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr" title="The configuration options">options</span>?: <span class="hljs-title class_" data-custom-type="ChunkStringOptions">ChunkStringOptions</span>): <span class="hljs-built_in">string</span>[]
</code></pre>`,comment:`<p>Split a String up into smaller strings of a give size (eg. &#39;ABCDEF&#39; -&gt; [AB,CD,EF])</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">chunkString</span>(<span class="hljs-string">&#x27;abcdefghijkl&#x27;</span>); <span class="hljs-comment">// --&gt; [&#x27;ab&#x27;, &#x27;cd&#x27;, &#x27;ef&#x27;, &#x27;gh&#x27;, &#x27;ij&#x27;, &#x27;kl&#x27;]</span>
<span class="hljs-title function_">chunkString</span>(<span class="hljs-string">&#x27;abcdefghij&#x27;</span>, { <span class="hljs-attr">size</span>: <span class="hljs-number">4</span> }); <span class="hljs-comment">// --&gt; [&#x27;abcd&#x27;, &#x27;efgh&#x27;, &#x27;ij&#x27;]</span>
<span class="hljs-title function_">chunkString</span>(<span class="hljs-string">&#x27;abcdefghij&#x27;</span>, { <span class="hljs-attr">size</span>: <span class="hljs-number">4</span>, <span class="hljs-attr">reverse</span>: <span class="hljs-literal">true</span> }); <span class="hljs-comment">// --&gt; [&#x27;ab&#x27;, &#x27;cdef&#x27;, &#x27;ghij&#x27;]</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Array of chunks</p>
`,typesMarkdown:``}]},{name:`clamp`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">clamp</span>(<span class="hljs-attr" title="Lower limit">min</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr" title="The number to clamp">value</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr" title="Upper limit">max</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span>
</code></pre>`,comment:``,examples:[],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The number clamped to the min/max boundaries</p>
`,typesMarkdown:``}]},{name:`debounce`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">debounce</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_" data-custom-type="DebounceCallback">DebounceCallback</span>&gt;(<span class="hljs-attr" title="The function to add debounce to">callback</span>: T, <span class="hljs-attr" title="Number of milliseconds without another call to trigger the last function">ms</span>?: <span class="hljs-built_in">number</span>): <span class="hljs-title class_" data-custom-type="DebouncedFunction">DebouncedFunction</span>&lt;T&gt;
</code></pre>`,comment:`<p>Ensure that the givcen <code>callback</code> function will only be called <code>ms</code> milliseconds after the last call.<br>This ensures to not trigger too many consecutive calls, but only the last in the sequence.</p>
`,examples:[],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The debounce enabled function</p>
`,typesMarkdown:``}]},{name:`deleteProperty`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">deleteProperty</span>(<span class="hljs-attr" title="The object or array to remove from">input</span>: <span class="hljs-title class_" data-custom-type="InputObject">InputObject</span>, <span class="hljs-attr" title="A dot-separated string (e.g. \`'a.b.0.c'\`) or an array of keys
              (e.g. \`['a', 'b', '0', 'c']\`)">path</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[], <span class="hljs-attr" title="Optional behavior modifiers">options</span>?: <span class="hljs-title class_" data-custom-type="DeletePropertyOptions">DeletePropertyOptions</span>): {
  <span class="hljs-comment">// The resulting object — see \`@returns\` description for reference semantics</span>
  <span class="hljs-attr">obj</span>: <span class="hljs-title class_" data-custom-type="InputObject">InputObject</span>
  <span class="hljs-comment">// Whether anything was deleted</span>
  <span class="hljs-attr">removed</span>: <span class="hljs-built_in">boolean</span>
}
</code></pre>`,comment:`<p>Remove a property from an object or array by following a path of keys.<br>The removal behavior is configurable via the given options.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// Object input</span>
<span class="hljs-title function_">deleteProperty</span>({ <span class="hljs-attr">a</span>: { <span class="hljs-attr">b</span>: <span class="hljs-number">1</span> } }, <span class="hljs-string">&#x27;a.b&#x27;</span>);
<span class="hljs-comment">// --&gt; { removed: true, obj: { a: {} } }</span>

<span class="hljs-title function_">deleteProperty</span>({ <span class="hljs-attr">a</span>: [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>] }, <span class="hljs-string">&#x27;a.1&#x27;</span>);
<span class="hljs-comment">// --&gt; { removed: true, obj: { a: [10, 30] } }</span>

<span class="hljs-comment">// Array input</span>
<span class="hljs-title function_">deleteProperty</span>([<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>], <span class="hljs-string">&#x27;1&#x27;</span>);
<span class="hljs-comment">// --&gt; { removed: true, obj: [10, 30] }</span>

<span class="hljs-comment">// Array path</span>
<span class="hljs-title function_">deleteProperty</span>({ <span class="hljs-attr">a</span>: { <span class="hljs-attr">b</span>: <span class="hljs-number">1</span> } }, [<span class="hljs-string">&#x27;a&#x27;</span>, <span class="hljs-string">&#x27;b&#x27;</span>]);
<span class="hljs-comment">// --&gt; { removed: true, obj: { a: {} } }</span>

<span class="hljs-comment">// Options</span>
<span class="hljs-title function_">deleteProperty</span>({ <span class="hljs-attr">a</span>: { <span class="hljs-attr">b</span>: { <span class="hljs-attr">c</span>: <span class="hljs-number">1</span> } } }, <span class="hljs-string">&#x27;a.b.c&#x27;</span>, { <span class="hljs-attr">cleanup</span>: <span class="hljs-literal">true</span> });
<span class="hljs-comment">// --&gt; { removed: true, obj: {} }</span>

<span class="hljs-title function_">deleteProperty</span>({ <span class="hljs-attr">a</span>: { <span class="hljs-attr">b</span>: <span class="hljs-number">1</span> } }, <span class="hljs-string">&#x27;a.b&#x27;</span>, { <span class="hljs-attr">safe</span>: <span class="hljs-literal">true</span> });
<span class="hljs-comment">// --&gt; { removed: false, obj: { a: { b: 1 } } }</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : An object with <code>removed</code> (whether anything was deleted) and <code>obj</code><br>         (the resulting object — the same reference as <code>input</code>, unless<br>         <code>immutable</code> is set <em>and</em> a modification was made, in which case<br>         <code>obj</code> is a new reference)</p>
`,typesMarkdown:``}]},{name:`formatCurrency`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">formatCurrency</span>(<span class="hljs-attr" title="The template for how to format a number, takes an example of 1000 in the desired currency (eg. '1.000,00 €')">thousandTemplate</span>?: <span class="hljs-built_in">string</span>): <span class="hljs-title class_" data-custom-type="CurrencyFormatter">CurrencyFormatter</span>
</code></pre>`,comment:`<p>Creates a function that formats a number to a given currency format (eg. 1000 -&gt; 1.000,00 €)</p>
<p>The template string should be the number 1000 described with before and after<br>symbols (no numbers), a thousand separator and a decimal separator followed by<br>the number of decimals defined with zeroes: <code>[before]1[thou.]000[dec.]00[after] -&gt; $ 1,000.00</code></p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// Format number to default currency format (euro)</span>
<span class="hljs-keyword">const</span> euro = <span class="hljs-title function_">formatCurrency</span>();
<span class="hljs-title function_">euro</span>(<span class="hljs-number">2345234.678</span>); <span class="hljs-comment">// --&gt; &#x27;2.345.234,68 €&#x27;</span>

<span class="hljs-comment">// Format number to USD currency format</span>
<span class="hljs-keyword">const</span> usd = <span class="hljs-title function_">formatCurrency</span>(<span class="hljs-string">&#x27;$ 1,000.00&#x27;</span>);
<span class="hljs-title function_">usd</span>(<span class="hljs-number">2345234.678</span>); <span class="hljs-comment">// --&gt; &#x27;$ 2,345,234.68&#x27;</span>

<span class="hljs-comment">// Format number to custom currency format</span>
<span class="hljs-keyword">const</span> custom = <span class="hljs-title function_">formatCurrency</span>(<span class="hljs-string">&#x27;# 1-000;00 ¤&#x27;</span>);
<span class="hljs-title function_">custom</span>(<span class="hljs-number">2345234.678</span>); <span class="hljs-comment">// --&gt; &#x27;# 2-345-234;68 ¤&#x27;</span>

<span class="hljs-comment">// Specifying number of decimals</span>
<span class="hljs-keyword">const</span> sixDecimals = <span class="hljs-title function_">formatCurrency</span>(<span class="hljs-string">&#x27;$ 1,000.000000&#x27;</span>);
<span class="hljs-title function_">sixDecimals</span>(<span class="hljs-number">2345234.678</span>); <span class="hljs-comment">// --&gt; &#x27;$ 2,345,234.678000&#x27;</span>
<span class="hljs-title function_">sixDecimals</span>(<span class="hljs-number">234.12345678</span>); <span class="hljs-comment">// --&gt; &#x27;$ 234.123457&#x27;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Curried function to format a given number</p>
`,typesMarkdown:``}]},{name:`formatNumber`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">formatNumber</span>(<span class="hljs-attr" title="Number to format">num</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr" title="Settings for the number formatting">settings</span>?: <span class="hljs-title class_" data-custom-type="FormatNumberSettings">FormatNumberSettings</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Formats a number with defined thousand and decimal separator, and a decimal limit<br>(see <a href="#limitDecimals">limitDecimals</a> for details on <code>decimalCount</code>)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// Default format</span>
<span class="hljs-title function_">formatNumber</span>(<span class="hljs-number">123456</span>); <span class="hljs-comment">// --&gt; 123.456,00</span>

<span class="hljs-comment">// Custom format</span>
<span class="hljs-title function_">formatNumber</span>(<span class="hljs-number">123456</span>, { <span class="hljs-attr">decimalCount</span>: <span class="hljs-string">&#x27;&gt;3&#x27;</span>, <span class="hljs-attr">thousand</span>: <span class="hljs-string">&#x27;-&#x27;</span>, <span class="hljs-attr">decimal</span>: <span class="hljs-string">&#x27;:&#x27;</span> }); <span class="hljs-comment">// --&gt; 123-456:000</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Formatted number as a string</p>
`,typesMarkdown:``}]},{name:`fuzzySearch`,functions:[{definition:'<pre><code class="hljs language-ts"><span class="hljs-title function_">fuzzySearch</span>(<span class="hljs-attr" title="Word or phrase to search in">input</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr" title="The collection of characters to match into the `input`">searchWord</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">options</span>?: <span class="hljs-title class_" data-custom-type="FuzzySearchOptions">FuzzySearchOptions</span>): <span class="hljs-built_in">boolean</span>\n</code></pre>',comment:`<p>Match the given search word (collection of characters) could be found in in a given input (word or phrase)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">fuzzySearch</span>(<span class="hljs-string">&#x27;search me&#x27;</span>, <span class="hljs-string">&#x27;src&#x27;</span>) <span class="hljs-comment">// =&gt; true</span>
<span class="hljs-title function_">fuzzySearch</span>(<span class="hljs-string">&#x27;search me&#x27;</span>, <span class="hljs-string">&#x27;ache&#x27;</span>) <span class="hljs-comment">// =&gt; true</span>
<span class="hljs-title function_">fuzzySearch</span>(<span class="hljs-string">&#x27;search me&#x27;</span>, <span class="hljs-string">&#x27;reach&#x27;</span>) <span class="hljs-comment">// =&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : if the <code>searchWord</code> was found in the <code>input</code> or not</p>
`,typesMarkdown:``}]},{name:`getProperty`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">getProperty</span>(<span class="hljs-attr" title="The object or array to read from">input</span>: <span class="hljs-title class_" data-custom-type="Dictionary">Dictionary</span> | <span class="hljs-built_in">unknown</span>[], <span class="hljs-attr" title="A dot-separated string (e.g. \`'a.b.0.c'\`) or an array of keys
              (e.g. \`['a', 'b', '0', 'c']\`). Empty segments are ignored, so
              \`'a..b'\` and \`'.a.b.'\` resolve the same as \`'a.b'\`.">path</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[]): {
  <span class="hljs-comment">// Whether the path was fully traversed</span>
  <span class="hljs-attr">success</span>: <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">// The value at the path, or \`null\` if any step could not be traversed</span>
  <span class="hljs-attr">value</span>: <span class="hljs-built_in">unknown</span>
}
</code></pre>`,comment:`<p>Read a value from an object or array by following a path of keys.</p>
<p>Returns a <code>{ success, value }</code> discriminator — use <code>success</code> to distinguish<br>a missing path from a stored <code>null</code> or <code>undefined</code>.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// Object input</span>
<span class="hljs-title function_">getProperty</span>({ <span class="hljs-attr">a</span>: { <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> } }, <span class="hljs-string">&#x27;a.b&#x27;</span>); <span class="hljs-comment">// --&gt; { success: true, value: 2 }</span>
<span class="hljs-title function_">getProperty</span>({ <span class="hljs-attr">a</span>: [{ <span class="hljs-attr">b</span>: <span class="hljs-string">&#x27;hi&#x27;</span> }] }, <span class="hljs-string">&#x27;a.0.b&#x27;</span>); <span class="hljs-comment">// --&gt; { success: true, value: &#x27;hi&#x27; }</span>
<span class="hljs-title function_">getProperty</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> }, <span class="hljs-string">&#x27;a.b&#x27;</span>); <span class="hljs-comment">// --&gt; { success: false, value: null }</span>

<span class="hljs-comment">// Distinguishing missing from stored null</span>
<span class="hljs-title function_">getProperty</span>({ <span class="hljs-attr">a</span>: <span class="hljs-literal">null</span> }, <span class="hljs-string">&#x27;a&#x27;</span>); <span class="hljs-comment">// --&gt; { success: true, value: null }</span>
<span class="hljs-title function_">getProperty</span>({}, <span class="hljs-string">&#x27;a&#x27;</span>);          <span class="hljs-comment">// --&gt; { success: false, value: null }</span>

<span class="hljs-comment">// Array input</span>
<span class="hljs-title function_">getProperty</span>([<span class="hljs-number">10</span>, <span class="hljs-number">20</span>, <span class="hljs-number">30</span>], <span class="hljs-string">&#x27;1&#x27;</span>); <span class="hljs-comment">// --&gt; { success: true, value: 20 }</span>
<span class="hljs-title function_">getProperty</span>([<span class="hljs-string">&#x27;a&#x27;</span>, [<span class="hljs-string">&#x27;b&#x27;</span>, <span class="hljs-string">&#x27;c&#x27;</span>]], <span class="hljs-string">&#x27;1.0&#x27;</span>); <span class="hljs-comment">// --&gt; { success: true, value: &#x27;b&#x27; }</span>

<span class="hljs-comment">// Array path</span>
<span class="hljs-title function_">getProperty</span>({ <span class="hljs-attr">a</span>: { <span class="hljs-attr">b</span>: <span class="hljs-number">2</span> } }, [<span class="hljs-string">&#x27;a&#x27;</span>, <span class="hljs-string">&#x27;b&#x27;</span>]); <span class="hljs-comment">// --&gt; { success: true, value: 2 }</span>
</code></pre>`],remarks:[`<ul>
<li>An empty path (or one that filters down to no keys) returns<br><code>{ success: false, value: null }</code>.</li>
<li>On arrays, only canonical numeric-string keys are accepted; <code>&#39;length&#39;</code>,<br><code>&#39;map&#39;</code>, and other inherited or non-numeric keys return failure.</li>
<li>Sparse-array holes are treated as missing (<code>success: false</code>), not as a<br>stored <code>undefined</code>.</li>
</ul>
`],descriptions:`<p><span class="hljs-doctag">@returns</span> : <code>{ success, value }</code> — see the property docs for details.</p>
`,typesMarkdown:``}]},{name:`hash`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">hash</span>(<span class="hljs-attr" title="String to generate hash string from">str</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Generates a unique hash (DJB2) string from a string</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">hash</span>(<span class="hljs-string">&#x27;Hash this string&#x27;</span>); <span class="hljs-comment">// --&gt; sg463l</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Hash string</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">hashCode</span>(<span class="hljs-attr" title="String to generate hash code from">str</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">number</span>
</code></pre>`,comment:`<p>Generates a unique numeric hash (DJB2) code from a string</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">hashCode</span>(<span class="hljs-string">&#x27;Hash this string&#x27;</span>); <span class="hljs-comment">// --&gt; 1720121313</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Hash code</p>
`,typesMarkdown:``}]},{name:`hexToNumber`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">hexToNumber</span>(<span class="hljs-attr" title="Hex code to parse">hex</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">number</span>
</code></pre>`,comment:``,examples:[],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Numeric representation of the hex code</p>
`,typesMarkdown:``}]},{name:`hexToRGB`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">hexToRGB</span>(<span class="hljs-attr" title="Hex color to convert to RGB">hex</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">number</span>[]
</code></pre>`,comment:`<p>Converts a Hexadecimal color to a RGB(A) color array</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">hexToRGB</span>(<span class="hljs-string">&#x27;#fff&#x27;</span>); <span class="hljs-comment">// --&gt; [255, 255, 255]</span>
<span class="hljs-title function_">hexToRGB</span>(<span class="hljs-string">&#x27;#2fd466&#x27;</span>); <span class="hljs-comment">// --&gt; [47, 212, 102]</span>

<span class="hljs-comment">// And with alpha channel</span>
<span class="hljs-title function_">hexToRGB</span>(<span class="hljs-string">&#x27;#2fd46680&#x27;</span>); <span class="hljs-comment">// --&gt; [47, 212, 102, 0.5]</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Array with RGB values</p>
`,typesMarkdown:``}]},{name:`isBoolean`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isBoolean</span>(<span class="hljs-attr" title="Argument to test">x</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (x is <span class="hljs-built_in">boolean</span>)
</code></pre>`,comment:`<p>Is the given argument a boolean</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">isBoolean</span>(<span class="hljs-literal">false</span>); <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isBoolean</span>(<span class="hljs-string">&#x27;string&#x27;</span>); <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Whether the argument a Boolean or not</p>
`,typesMarkdown:``}]},{name:`isEmpty`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isEmpty</span>(<span class="hljs-attr" title="The value to check">x</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-built_in">boolean</span>
</code></pre>`,comment:`<p>Is the given value considered empty.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">isEmpty</span>(<span class="hljs-literal">null</span>); <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isEmpty</span>(<span class="hljs-string">&#x27;&#x27;</span>); <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isEmpty</span>([]); <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isEmpty</span>({}); <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isEmpty</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Set</span>()); <span class="hljs-comment">// --&gt; true</span>

<span class="hljs-title function_">isEmpty</span>(<span class="hljs-number">0</span>); <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">isEmpty</span>(<span class="hljs-literal">false</span>); <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">isEmpty</span>([<span class="hljs-number">1</span>]); <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">isEmpty</span>({ <span class="hljs-attr">a</span>: <span class="hljs-number">1</span> }); <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">isEmpty</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>()); <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[`<ul>
<li><code>null</code>, <code>undefined</code>, and <code>&#39;&#39;</code> are always empty</li>
<li>Numbers and booleans are never empty (including <code>0</code> and <code>false</code>)</li>
<li>Arrays, <code>Map</code>s, and <code>Set</code>s are empty when they have no entries</li>
<li>Plain objects (including <code>Object.create(null)</code>) are empty when they have<br>no own enumerable keys</li>
<li>Non-plain objects (<code>Date</code>, <code>RegExp</code>, class instances, etc.) are never<br>reported as empty</li>
</ul>
`],descriptions:`<p><span class="hljs-doctag">@returns</span> : Whether the value is empty or not</p>
`,typesMarkdown:``}]},{name:`isFunction`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isFunction</span>(<span class="hljs-attr" title="Argument to test">x</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (x is <span class="hljs-title class_">Function</span>)
</code></pre>`,comment:`<p>Is the given argument a Function</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">isFunction</span>(<span class="hljs-function">() =&gt;</span> {}); <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isFunction</span>(<span class="hljs-string">&#x27;string&#x27;</span>); <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Whether the argument a Function or not</p>
`,typesMarkdown:``}]},{name:`isGenerator`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isGenerator</span>(<span class="hljs-attr" title="Argument to test">x</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (x is <span class="hljs-title class_">GeneratorFunction</span>)
</code></pre>`,comment:`<p>Determine if the given argument is a Generator Function</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-keyword">function</span>* <span class="hljs-title function_">gen</span>(<span class="hljs-params"></span>) {}

<span class="hljs-title function_">isGenerator</span>(gen); <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isGenerator</span>(<span class="hljs-function">() =&gt;</span> {}); <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Whether the argument a Generator or not</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isGeneratorLike</span>(<span class="hljs-attr" title="Argument to test">x</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (x is <span class="hljs-title class_">Generator</span>&lt;<span class="hljs-built_in">unknown</span>, <span class="hljs-built_in">any</span>, <span class="hljs-built_in">any</span>&gt;)
</code></pre>`,comment:`<p>Determine if the given argument is a Generator object.<br>(A generator is the one created when calling a generator function)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-keyword">function</span> *<span class="hljs-title function_">gen</span>(<span class="hljs-params"></span>) {}

<span class="hljs-title function_">isGeneratorLike</span>(<span class="hljs-title function_">gen</span>()); <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isGeneratorLike</span>({ <span class="hljs-title function_">next</span>(<span class="hljs-params"></span>) {}, <span class="hljs-keyword">throw</span>() {} <span class="hljs-keyword">return</span>() {} [<span class="hljs-title class_">Symbol</span>.<span class="hljs-property">iterator</span>]() {} }); <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isGeneratorLike</span>(<span class="hljs-function">() =&gt;</span> {}); <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Whether the argument a Generator like function or not</p>
`,typesMarkdown:``}]},{name:`isNumber`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isNumber</span>(<span class="hljs-attr" title="Argument to test">x</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (x is <span class="hljs-built_in">number</span>)
</code></pre>`,comment:`<p>Is the given argument is a finite Number</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">isNumber</span>(<span class="hljs-number">123</span>); <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isNumber</span>(<span class="hljs-title class_">Infinity</span>); <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">isNumber</span>(<span class="hljs-string">&#x27;123&#x27;</span>); <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Whether the argument a finite number or not</p>
`,typesMarkdown:``}]},{name:`isNumeric`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isNumeric</span>(<span class="hljs-attr" title="Argument to test">x</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-built_in">boolean</span>
</code></pre>`,comment:`<p>Is the given argument is a finite numeric value (number as string or number directly) or not.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">isNumeric</span>(<span class="hljs-number">123</span>); <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isNumeric</span>(<span class="hljs-string">&#x27;123&#x27;</span>); <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isNumeric</span>(<span class="hljs-title class_">Infinity</span>); <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Whether the given argument is a numeric value</p>
`,typesMarkdown:``}]},{name:`isObject`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isObject</span>(<span class="hljs-attr" title="Argument to test">x</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (x is <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">unknown</span>&gt;)
</code></pre>`,comment:`<p>Is the given argument a plain object (non-null, non-array) or not</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Obj</span> {}

<span class="hljs-title function_">isObject</span>({}); <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isObject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Obj</span>()); <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isObject</span>(<span class="hljs-string">&#x27;123&#x27;</span>); <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Whether the argument a plain object or not</p>
`,typesMarkdown:``}]},{name:`isObjectLike`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isObjectLike</span>(<span class="hljs-attr" title="Argument to test">x</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (x is <span class="hljs-built_in">unknown</span>[] | <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">unknown</span>&gt;)
</code></pre>`,comment:`<p>Is the given argument of type of <code>object</code> and not <code>null</code></p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Obj</span> {}

<span class="hljs-title function_">isObject</span>({}); <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isObject</span>([]); <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isObject</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Obj</span>()); <span class="hljs-comment">// --&gt; true</span>

<span class="hljs-title function_">isObject</span>(<span class="hljs-string">&#x27;123&#x27;</span>); <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">isObject</span>(<span class="hljs-literal">null</span>); <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Whether the argument a plain object or not</p>
`,typesMarkdown:``}]},{name:`isString`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isString</span>(<span class="hljs-attr" title="Argument to test">x</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (x is <span class="hljs-built_in">string</span>)
</code></pre>`,comment:``,examples:[],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Whether the argument is a string or not</p>
`,typesMarkdown:``}]},{name:`kebabCase`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">kebabCase</span>(<span class="hljs-attr" title="String to transform">str</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Transform phrase into a dashed phrase<br>(eg. &#39;camelCase&#39; -&gt; &#39;camel-case&#39; or &#39;spaced phrase&#39; -&gt; &#39;spaced-phrase&#39;)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">kebabCase</span>(<span class="hljs-string">&#x27;some dashed phrase&#x27;</span>); <span class="hljs-comment">// --&gt; some-dashed-phrase</span>
<span class="hljs-title function_">kebabCase</span>(<span class="hljs-string">&#x27;dash version1 beta&#x27;</span>, { <span class="hljs-attr">numbers</span>: <span class="hljs-literal">true</span> }); <span class="hljs-comment">// --&gt; dash-version-1-beta</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The string with spaces replaced by a dash (-)</p>
`,typesMarkdown:``}]},{name:`leadingZero`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">leadingZero</span>(<span class="hljs-attr" title="Number to add leading zeroes to">num</span>: <span class="hljs-built_in">number</span> | <span class="hljs-built_in">string</span>, <span class="hljs-attr" title="minimum length of the returned string">len</span>?: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:``,examples:[],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The given number as a string padded with zeroes to match the given min length</p>
`,typesMarkdown:``}]},{name:`limitDecimals`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">limitDecimals</span>(<span class="hljs-attr" title="Number to limit the decimals on">num</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr" title="Setting for how to handle the decimals">decimalCount</span>?: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Limit decimals of a floating number to specified length. The length depends on <code>decimalCount</code><br>which can have the following settings (eg. 2 or &quot;&gt;3&quot; or &quot;&lt;5&quot;):</p>
<table>
<thead>
<tr>
<th>Char</th>
<th>Description</th>
</tr>
</thead>
<tbody><tr>
<td><strong>&gt;n</strong></td>
<td>Minimum number of decimals, if the current number of decimals are shorter than the defined length, extra 0 (zeros) will be added.</td>
</tr>
<tr>
<td><strong>&lt;n</strong></td>
<td>Maximum number of decimals, longer decimals will be rounded and shortened down to this number.</td>
</tr>
<tr>
<td><strong>n</strong></td>
<td>Match this exact number of decimals, rounding longer decimals and adding extra 0 (zeroes) to shorter ones.</td>
</tr>
</tbody></table>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// Exact number of decimals</span>
<span class="hljs-title function_">limitDecimals</span>(<span class="hljs-number">123.4567</span>) <span class="hljs-comment">// --&gt; 123.46</span>
<span class="hljs-title function_">limitDecimals</span>(<span class="hljs-number">123</span>, <span class="hljs-number">5</span>) <span class="hljs-comment">// --&gt; 123.00000</span>

<span class="hljs-comment">// Max number of decimals</span>
<span class="hljs-title function_">limitDecimals</span>(<span class="hljs-number">123.4567</span>, <span class="hljs-string">&#x27;&lt;3&#x27;</span>) <span class="hljs-comment">// --&gt; 123.457</span>
<span class="hljs-title function_">limitDecimals</span>(<span class="hljs-number">123</span>, <span class="hljs-string">&#x27;&lt;3&#x27;</span>) <span class="hljs-comment">// --&gt; 123</span>

<span class="hljs-comment">// Min number decimals</span>
<span class="hljs-title function_">limitDecimals</span>(<span class="hljs-number">123.4</span>, <span class="hljs-string">&#x27;&gt;4&#x27;</span>) <span class="hljs-comment">// --&gt; 123.4000</span>
<span class="hljs-title function_">limitDecimals</span>(<span class="hljs-number">123.456789</span>, <span class="hljs-string">&#x27;&gt;4&#x27;</span>) <span class="hljs-comment">// --&gt; 123.456789</span>

<span class="hljs-comment">// Min, Max number decimals</span>
<span class="hljs-title function_">limitDecimals</span>(<span class="hljs-number">123.4</span>, <span class="hljs-string">&#x27;2,4&#x27;</span>) <span class="hljs-comment">// --&gt; 123.40</span>
<span class="hljs-title function_">limitDecimals</span>(<span class="hljs-number">123.456789</span>, <span class="hljs-string">&#x27;2,4&#x27;</span>) <span class="hljs-comment">// --&gt; 123.4568</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : String representation of the number with the decimals adjusted according to the decimal setting</p>
`,typesMarkdown:``}]},{name:`numberToHex`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">numberToHex</span>(<span class="hljs-attr" title="Number to convert">num</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:``,examples:[],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Hex representation of the given number</p>
`,typesMarkdown:``}]},{name:`pascalCase`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">pascalCase</span>(<span class="hljs-attr" title="The string to format">input</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr" title="The settings for the transform">settings</span>?: <span class="hljs-title class_" data-custom-type="PascalCaseSettings">PascalCaseSettings</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:``,examples:[],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The formatted string</p>
`,typesMarkdown:``}]},{name:`phrasify`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">phrasify</span>(<span class="hljs-attr" title="The string to transform">input</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Transform a string into a space separated phrase</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">phrasify</span>(<span class="hljs-string">&#x27;XMLDataInput&#x27;</span>); <span class="hljs-comment">// --&gt; XML data input</span>
<span class="hljs-title function_">phrasify</span>(<span class="hljs-string">&#x27;99LuftBallons&#x27;</span>); <span class="hljs-comment">// --&gt; 99 Luft Ballons</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The transformed phrase or word</p>
`,typesMarkdown:``}]},{name:`popAtIndex`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">popAtIndex</span>&lt;T&gt;(<span class="hljs-attr" title="The Array to remove the item from">list</span>: T[], <span class="hljs-attr" title="At what index to remove from">index</span>: <span class="hljs-built_in">number</span>): T
</code></pre>`,comment:`<p>Removes and returns an entry from a given array, at a designated index position.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">popIndex</span>([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>], <span class="hljs-number">1</span>); <span class="hljs-comment">// --&gt; 2 (array will then be [1, 3])</span>
</code></pre>`],remarks:[`<p>This is not a pure function and will alter the given array internally</p>
`],descriptions:``,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">popAtIndexPure</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-built_in">unknown</span>[]&gt;(<span class="hljs-attr" title="The Array to remove the item from">list</span>: T, <span class="hljs-attr" title="At what index to remove from">index</span>: <span class="hljs-built_in">number</span>): [<span class="hljs-built_in">unknown</span>, T]
</code></pre>`,comment:`<p>Removes and returns an entry from a given array, at a designated index position.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">popIndexPure</span>([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>], <span class="hljs-number">1</span>); <span class="hljs-comment">// --&gt; [2,  [1, 3]]</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : An array with two entries: the first entry is the value just removed and the second<br>         is the new array with the entry removed.</p>
`,typesMarkdown:``}]},{name:`promisefy`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">promisefy</span>(<span class="hljs-attr" title="The callback to promisefy">fn</span>: <span class="hljs-title class_" data-custom-type="PromisefyCallback">PromisefyCallback</span>): <span class="hljs-title class_" data-custom-type="PromisefiedFunction">PromisefiedFunction</span>
</code></pre>`,comment:`<p>Converts a callback based action into one returning a Promise instead.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-keyword">function</span> <span class="hljs-title function_">action</span>(<span class="hljs-params">name, callback</span>) { ... <span class="hljs-title function_">callback</span>(); }

action = <span class="hljs-title function_">promisefy</span>(action);

action
  .<span class="hljs-title function_">then</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-string">&#x27;all good&#x27;</span>)
  .<span class="hljs-title function_">catch</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-string">&#x27;Something went wrong&#x27;</span>);
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The promisefied function</p>
`,typesMarkdown:``}]},{name:`randomCryptoId`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">randomCryptoId</span>(<span class="hljs-attr" title="The desired length of the id (minimum 2)">length</span>?: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Generate a random id of designated length - using cryptographic secure random numbers,<br>so it is a bit slower than <code>randomId</code></p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">randomCryptoId</span>(); <span class="hljs-comment">// --&gt; eg. &#x27;efuc6f1n4xf&#x27;</span>
<span class="hljs-title function_">randomCryptoId</span>(<span class="hljs-number">20</span>); <span class="hljs-comment">// --&gt; eg. &#x27;3vsmrbxlh9at0vhcsf1xh&#x27;</span>
</code></pre>`],remarks:[`<p>This method differs from <code>crypto.randomUUID()</code> in the way that it can be of any specified length<br>and doesn&#39;t contain any &quot;-&quot;.<br>The methods would be slightly slower than <code>randomId</code> since it is using <code>crypto.getRandomValues()</code>,<br>but it is a more secure method.</p>
`],descriptions:`<p><span class="hljs-doctag">@returns</span> : A random generated id of a specified length</p>
`,typesMarkdown:``}]},{name:`randomHexColor`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">randomHexColor</span>(): <span class="hljs-built_in">string</span>
</code></pre>`,comment:``,examples:[],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : A random hex color</p>
`,typesMarkdown:``}]},{name:`randomId`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">randomId</span>(<span class="hljs-attr" title="The desired length of the id (minimum 2)">length</span>?: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Generate a random id of designated length</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">randomId</span>(); <span class="hljs-comment">// --&gt; eg. &#x27;efuc6f1n4xf&#x27;</span>
<span class="hljs-title function_">randomId</span>(<span class="hljs-number">20</span>); <span class="hljs-comment">// --&gt; eg. &#x27;3vsmrbxlh9at0vhcsf1xh&#x27;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : A random generated id of a specified length</p>
`,typesMarkdown:``}]},{name:`randomInt`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">randomInt</span>(<span class="hljs-attr" title="The minimum number to generate">min</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr" title="The maximum number to generate">max</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span>
</code></pre>`,comment:`<p>Returns a random integer from a base number or range of numbers</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">randomInt</span>(<span class="hljs-number">100</span>, <span class="hljs-number">200</span>); <span class="hljs-comment">// --&gt; a number between 100 and 200</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : A random number between the given min and max</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">randomInt</span>(<span class="hljs-attr" title="The maximum number to generate">max</span>?: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span>
</code></pre>`,comment:`<p>Returns a random integer from a base number or range of numbers</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// Any random number</span>
<span class="hljs-title function_">randomInt</span>(); <span class="hljs-comment">// --&gt; a number between 0 and Number.MAX_SAFE_INTEGER</span>

<span class="hljs-comment">// With max number</span>
<span class="hljs-title function_">randomInt</span>(<span class="hljs-number">100</span>); <span class="hljs-comment">// --&gt; a number between 0 and 100</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : A random number between 0 and the given max</p>
`,typesMarkdown:``}]},{name:`randomRGBColor`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">randomRGBColor</span>(): [<span class="hljs-attr">r</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">g</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">b</span>: <span class="hljs-built_in">number</span>]
</code></pre>`,comment:``,examples:[],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : An Array with random R G B values</p>
`,typesMarkdown:``}]},{name:`RGBToHex`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title class_">RGBToHex</span>(<span class="hljs-attr" title="The R G B (A) color represented as an array">rgb</span>: <span class="hljs-title class_" data-custom-type="RGBTuple">RGBTuple</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Converts an Array of R G B (A) colors into a hex color.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title class_">RGBToHex</span>([<span class="hljs-number">123</span>, <span class="hljs-number">123</span>, <span class="hljs-number">123</span>]) <span class="hljs-comment">// --&gt; #7b7b7b</span>

<span class="hljs-comment">// With alpha channel</span>
<span class="hljs-title class_">RGBToHex</span>([<span class="hljs-number">123</span>, <span class="hljs-number">123</span>, <span class="hljs-number">123</span>, <span class="hljs-number">0.5</span>]) <span class="hljs-comment">// --&gt; #7b7b7b80</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : A Hex representation of the given color</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title class_">RGBToHex</span>(<span class="hljs-attr" title="Red color">r</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr" title="Green color">g</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr" title="Blue color">b</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr" title="Alpha channel">a</span>?: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Converts R G B (A) color arguments into a hex color.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// RGB as arguments</span>
<span class="hljs-title class_">RGBToHex</span>( <span class="hljs-number">123</span>, <span class="hljs-number">123</span>, <span class="hljs-number">123</span> ) <span class="hljs-comment">// --&gt; #7b7b7b80</span>

<span class="hljs-comment">// With alpha channel</span>
<span class="hljs-title class_">RGBToHex</span>( <span class="hljs-number">123</span>, <span class="hljs-number">123</span>, <span class="hljs-number">123</span>, <span class="hljs-number">0.5</span> ) <span class="hljs-comment">// --&gt; #7b7b7b80</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : A Hex representation of the given colors</p>
`,typesMarkdown:``}]},{name:`safeDateChange`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">safeDateChange</span>(<span class="hljs-attr" title="Date going from">from</span>: <span class="hljs-title class_">Date</span>, <span class="hljs-attr" title="Date going to">to</span>: <span class="hljs-title class_">Date</span>): <span class="hljs-title class_">Date</span>
</code></pre>`,comment:`<p>Verifies and corrects Dates where the month could accidentally have skipped into the<br>next month because the date is out of bounds by the month changed to.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-keyword">const</span> date = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-number">2017</span>, <span class="hljs-number">0</span>, <span class="hljs-number">31</span>);
newDate = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(date);
newDate.<span class="hljs-title function_">setMonth</span>(<span class="hljs-number">1</span>);

<span class="hljs-comment">// Normally you would expect &quot;newDate&quot; month to be February, but since the date</span>
<span class="hljs-comment">// of the previous date was 31 and february max date is 28 (or 29), the actual</span>
<span class="hljs-comment">// &quot;newDate&quot; is &quot;Match 3rd 2017&quot; (or 2nd). Using this function keeps it at &quot;February 28 2017&quot;</span>

<span class="hljs-title function_">safeDateChange</span>(date, newDate);

<span class="hljs-comment">// newDate === &quot;February 28 2017&quot;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Altered &quot;to&quot; date</p>
`,typesMarkdown:``}]},{name:`snakeCase`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">snakeCase</span>(<span class="hljs-attr" title="String to transform">str</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Transform phrase into a snake_case phrase<br>(eg. &#39;camelCase&#39; -&gt; &#39;camel-case&#39; or &#39;spaced phrase&#39; -&gt; &#39;spaced-phrase&#39;)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">snakeCase</span>(<span class="hljs-string">&#x27;Convert This phrase&#x27;</span>); <span class="hljs-comment">// --&gt; convert_this_phrase</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The string transformed to snake_case</p>
`,typesMarkdown:``}]},{name:`throttle`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">throttle</span>&lt;T <span class="hljs-title function_">extends</span> (<span class="hljs-attr">args</span>: <span class="hljs-built_in">unknown</span>[]) =&gt; <span class="hljs-built_in">void</span>&gt;(<span class="hljs-attr" title="The function to throttle">callback</span>: T, <span class="hljs-attr" title="Number of milliseconds before the function can be called again">ms</span>?: <span class="hljs-built_in">number</span>): T
</code></pre>`,comment:`<p>Ensure that the given <code>callback</code> function can only be called every <code>ms</code> milliseconds</p>
`,examples:[],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The throttled function</p>
`,typesMarkdown:``}]},{name:`toWords`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">toWords</span>(<span class="hljs-attr" title="String to find words in">str</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">string</span>[]
</code></pre>`,comment:`<p>Find the words in a string delimeterd by any non letter/number characters.<br>Numbers will be a word in them selves, so something like <code>some99words</code> becomes <code>[some, 99, words]</code>.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">toWords</span>(<span class="hljs-string">&#x27;camelCase&#x27;</span>) <span class="hljs-comment">// --&gt; [&#x27;camel&#x27;, &#x27;Case&#x27;]</span>
<span class="hljs-title function_">toWords</span>(<span class="hljs-string">&#x27;HTMLElement&#x27;</span>) <span class="hljs-comment">// --&gt; [&#x27;HTML&#x27;, &#x27;Element&#x27;]</span>
<span class="hljs-title function_">toWords</span>(<span class="hljs-string">&#x27;kebab-case&#x27;</span>) <span class="hljs-comment">// --&gt; [&#x27;kebab&#x27;, &#x27;case&#x27;]</span>
<span class="hljs-title function_">toWords</span>(<span class="hljs-string">&#x27;snake_case&#x27;</span>) <span class="hljs-comment">// --&gt; [&#x27;snake&#x27;, &#x27;case&#x27;]</span>
<span class="hljs-title function_">toWords</span>(<span class="hljs-string">&#x27;some99words&#x27;</span>) <span class="hljs-comment">// --&gt; [&#x27;some&#x27;, &#x27;99&#x27;, &#x27;words&#x27;]</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The words found in the string</p>
`,typesMarkdown:``}]},{name:`truncate`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">truncate</span>(<span class="hljs-attr" title="String to truncate">str</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr" title="Settings to use with the truncation">settings</span>?: <span class="hljs-title class_" data-custom-type="TruncateSettings">TruncateSettings</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Limits a string to a given number of characters and adds &#39;...&#39; in the end</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">truncate</span>(<span class="hljs-string">&#x27;No max length to the string&#x27;</span>); <span class="hljs-comment">// --&gt; No max limit to the string length</span>
<span class="hljs-title function_">truncate</span>(<span class="hljs-string">&#x27;With a max length to the string&#x27;</span>, { <span class="hljs-attr">maxLength</span>: <span class="hljs-number">10</span> }); <span class="hljs-comment">// --&gt; With a max...</span>
<span class="hljs-title function_">truncate</span>(<span class="hljs-string">&#x27;With a max length to the string and a different ending&#x27;</span>, { <span class="hljs-attr">maxLength</span>: <span class="hljs-number">10</span>, <span class="hljs-attr">end</span>: <span class="hljs-string">&#x27; &lt;---&#x27;</span> }); <span class="hljs-comment">// --&gt; With a max &lt;---</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The truncated string</p>
`,typesMarkdown:``}]},{name:`uniqueArray`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">uniqueArray</span>&lt;T&gt;(<span class="hljs-attr" title="ArrayLike or Iterable collection to convert">arr</span>: <span class="hljs-title class_">ArrayLike</span>&lt;T&gt; | <span class="hljs-title class_">Iterable</span>&lt;T, <span class="hljs-built_in">any</span>, <span class="hljs-built_in">any</span>&gt;): T[]
</code></pre>`,comment:`<p>Filter out duplicate values from an array</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">uniqueArray</span>([<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>,<span class="hljs-number">1</span>,<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">3</span>,<span class="hljs-number">7</span>]); <span class="hljs-comment">// --&gt; [1,2,3,4,5,6,7]</span>
<span class="hljs-title function_">uniqueArray</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">querySelectorAll</span>(<span class="hljs-string">&#x27;.my-elm, .selected&#x27;</span>)); <span class="hljs-comment">// --&gt; unique array of elements (so .my-elm.selected will only be present once)</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : A list with only unique items</p>
`,typesMarkdown:``}]}],t=[{name:`CamelCaseSettings`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="CamelCaseSettings">CamelCaseSettings</span> = {
  <span class="hljs-comment">// Keep abbreviations uppercase (false == HTMLElement =&gt; HtmlElement | true == HTMLElement =&gt; HTMLElement)</span>
  <span class="hljs-attr">abbr</span>?: <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">// Convert to UpperCase CamelCase (aka PascalCase)</span>
  <span class="hljs-attr">upper</span>?: <span class="hljs-built_in">boolean</span>
};
</code></pre>`,moduleName:`camelCase`},{name:`ChunkStringOptions`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="ChunkStringOptions">ChunkStringOptions</span> = {
  <span class="hljs-comment">// Chunk strings from the end to front ([&#x27;ab&#x27;, &#x27;cde&#x27;, &#x27;fgh&#x27;] instead of [&#x27;abc&#x27;, &#x27;def&#x27;, &#x27;gh&#x27;])</span>
  <span class="hljs-attr">reverse</span>?: <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">// The max size of each chunk</span>
  <span class="hljs-attr">size</span>?: <span class="hljs-built_in">number</span>
};
</code></pre>`,moduleName:`chunkString`},{name:`DebounceCallback`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="DebounceCallback">DebounceCallback</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">args</span>: <span class="hljs-built_in">unknown</span>[]</span>) =&gt;</span> <span class="hljs-built_in">void</span>;
</code></pre>`,moduleName:`debounce`},{name:`DebouncedFunction`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="DebouncedFunction">DebouncedFunction</span> = T &amp; {
  <span class="hljs-comment">// Method to cancel the current debounce</span>
  <span class="hljs-attr">cancelDebounce</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>
};
</code></pre>`,moduleName:`debounce`},{name:`DeletePropertyOptions`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="DeletePropertyOptions">DeletePropertyOptions</span> = {
  <span class="hljs-comment">// Remove any empty objects left in the path.</span>
  <span class="hljs-comment">// *Note:* this will remove any empty objects in the path even if the given property was not finally found</span>
  <span class="hljs-attr">cleanup</span>?: <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">// Do not modify the given object directly, but return a modified copy</span>
  <span class="hljs-attr">immutable</span>?: <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">// Only remove property if it is empty</span>
  <span class="hljs-attr">safe</span>?: <span class="hljs-built_in">boolean</span>
};
</code></pre>`,moduleName:`deleteProperty`},{name:`InputObject`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="InputObject">InputObject</span> = <span class="hljs-title class_" data-custom-type="Dictionary">Dictionary</span> | <span class="hljs-built_in">unknown</span>[];
</code></pre>`,moduleName:`deleteProperty`},{name:`CurrencyFormatter`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="CurrencyFormatter">CurrencyFormatter</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">num</span>: <span class="hljs-built_in">number</span></span>) =&gt;</span> <span class="hljs-built_in">string</span>;
</code></pre>`,moduleName:`formatCurrency`},{name:`FormatNumberSettings`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="FormatNumberSettings">FormatNumberSettings</span> = {
  <span class="hljs-comment">// The decimal separator character</span>
  <span class="hljs-attr">decimal</span>?: <span class="hljs-built_in">string</span>
  <span class="hljs-comment">// How many decimals to show</span>
  <span class="hljs-attr">decimalCount</span>?: <span class="hljs-built_in">number</span> | <span class="hljs-built_in">string</span>
  <span class="hljs-comment">// The thousand separator character</span>
  <span class="hljs-attr">thousand</span>?: <span class="hljs-built_in">string</span>
};
</code></pre>`,moduleName:`formatNumber`},{name:`FuzzySearchOptions`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="FuzzySearchOptions">FuzzySearchOptions</span> = {
  <span class="hljs-comment">// Respect the case of the input, or not</span>
  <span class="hljs-attr">caseSensitive</span>: <span class="hljs-built_in">boolean</span>
};
</code></pre>`,moduleName:`fuzzySearch`},{name:`PascalCaseSettings`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="PascalCaseSettings">PascalCaseSettings</span> = <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_" data-custom-type="CamelCaseSettings">CamelCaseSettings</span>, <span class="hljs-string">&#x27;upper&#x27;</span>&gt;;
</code></pre>`,moduleName:`pascalCase`},{name:`PromisefiedFunction`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="PromisefiedFunction">PromisefiedFunction</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">args</span>: <span class="hljs-built_in">any</span>[]</span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt;;
</code></pre>`,moduleName:`promisefy`},{name:`PromisefyCallback`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="PromisefyCallback">PromisefyCallback</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">args</span>: <span class="hljs-built_in">any</span>[]</span>) =&gt;</span> <span class="hljs-built_in">any</span>;
</code></pre>`,moduleName:`promisefy`},{name:`RGBTuple`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="RGBTuple">RGBTuple</span> = [<span class="hljs-attr">red</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">green</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">blue</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">alpha</span>?: <span class="hljs-built_in">number</span>];
</code></pre>`,moduleName:`RGBToHex`},{name:`TruncateSettings`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="TruncateSettings">TruncateSettings</span> = {
  <span class="hljs-comment">// What ending to give the truncated string (default is &quot;...&quot;)</span>
  <span class="hljs-attr">end</span>?: <span class="hljs-built_in">string</span>
  <span class="hljs-comment">// Max length of the given string</span>
  <span class="hljs-attr">maxLength</span>?: <span class="hljs-built_in">number</span>
};
</code></pre>`,moduleName:`truncate`},{name:`Dictionary`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="Dictionary">Dictionary</span> = <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, T&gt;;
</code></pre>`,moduleName:`types`},{name:`Maybe`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="Maybe">Maybe</span> = T | <span class="hljs-literal">null</span> | <span class="hljs-literal">undefined</span>;
</code></pre>`,moduleName:`types`},{name:`NotFirst`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="NotFirst">NotFirst</span> = T <span class="hljs-keyword">extends</span> [<span class="hljs-attr">arg0</span>: T[<span class="hljs-number">0</span>], <span class="hljs-attr">rest</span>: infer R] ? <span class="hljs-attr">R</span>: <span class="hljs-built_in">never</span>;
</code></pre>`,moduleName:`types`}],n={modules:e,customTypes:t};export{t as customTypes,n as default,e as modules};