var e=[{name:`addClass`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">addClass</span>(<span class="hljs-attr" title="HTML ELement to add class names to">elm</span>: <span class="hljs-title class_">Element</span>, <span class="hljs-attr" title="Class name(s) to add">classNames</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[]): <span class="hljs-title class_">Element</span>
</code></pre>`,comment:`<p>Adds one or multiple class names to a DOM element</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">addClass</span>(<span class="hljs-title class_">MyNode</span>, <span class="hljs-string">&#x27;active&#x27;</span>) <span class="hljs-comment">// --&gt; &lt;div class=&quot;active&quot; /&gt;</span>
<span class="hljs-title function_">addClass</span>(<span class="hljs-title class_">MyNode</span>, [<span class="hljs-string">&#x27;active&#x27;</span>, <span class="hljs-string">&#x27;open&#x27;</span>]) <span class="hljs-comment">// --&gt; &lt;div class=&quot;active open&quot; /&gt;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The given <code>elm</code></p>
`,typesMarkdown:``}]},{name:`append`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">append</span>(<span class="hljs-attr" title="The DOM element to append to">elm</span>: <span class="hljs-title class_">Element</span>, <span class="hljs-attr" title="DOM element or HTML (or selector) to append to insert">insertElm</span>: <span class="hljs-built_in">string</span> | <span class="hljs-title class_">Node</span>): <span class="hljs-title class_">Element</span>
</code></pre>`,comment:`<p>Append DOM element or plain HTML to the end of a given DOM element</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">append</span>(<span class="hljs-title class_">MyNode</span>, <span class="hljs-title class_">NodeToAppend</span>)
<span class="hljs-title function_">append</span>(<span class="hljs-title class_">MyNode</span>, <span class="hljs-string">&#x27;&lt;span&gt;appended&lt;/span&gt;&#x27;</span>)
<span class="hljs-title function_">append</span>(<span class="hljs-title class_">MyNode</span>, <span class="hljs-string">&#x27;.my-appended-element&#x27;</span>)
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The inserted child element</p>
`,typesMarkdown:``}]},{name:`attr`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">attr</span>(<span class="hljs-attr" title="The DOM element to fetch/set the attribute from">elm</span>: <span class="hljs-title class_">Element</span>, <span class="hljs-attr" title="Name of the attribute to handle">attrName</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr" title="Value to insert into the attribute">value</span>?: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> | <span class="hljs-built_in">boolean</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Get/set the value of an attribute on a given DOM element</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// Get the value of an attribute</span>
<span class="hljs-title function_">attr</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>, <span class="hljs-string">&#x27;lang&#x27;</span>); <span class="hljs-comment">// --&gt; eg. &#x27;en-US&#x27;</span>

<span class="hljs-comment">// Set the value of an attribute</span>
<span class="hljs-title function_">attr</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>, <span class="hljs-string">&#x27;lang&#x27;</span>, <span class="hljs-string">&#x27;da-DK&#x27;</span>); <span class="hljs-comment">// --&gt; &lt;html lang=&quot;da-DK&quot;&gt;</span>

<span class="hljs-comment">// Set a boolean value</span>
<span class="hljs-title function_">attr</span>(<span class="hljs-title class_">MyInput</span>, <span class="hljs-keyword">readonly</span>, <span class="hljs-literal">true</span>); <span class="hljs-comment">// --&gt; &lt;input readonly /&gt;</span>
<span class="hljs-title function_">attr</span>(<span class="hljs-title class_">MyInput</span>, <span class="hljs-keyword">readonly</span>, <span class="hljs-literal">false</span>); <span class="hljs-comment">// --&gt; &lt;input /&gt;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Data found in the attribute (the old value if {value} is defined)</p>
`,typesMarkdown:``}]},{name:`boxModel`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">boxModel</span>(<span class="hljs-attr" title="The element to parse numbers from">elm</span>: <span class="hljs-title class_">Element</span>): <span class="hljs-title class_" data-custom-type="BoxModelMapping">BoxModelMapping</span>
</code></pre>`,comment:`<p>Parses the box model numbers of an given Element (margin, padding and border widths)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">boxModel</span>(someDiv);
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The mapping of the box model</p>
`,typesMarkdown:``}]},{name:`children`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">children</span>(<span class="hljs-attr" title="DOM element to find children from">elm</span>: <span class="hljs-title class_">ParentNode</span>): <span class="hljs-title class_">Element</span>[]
</code></pre>`,comment:``,examples:[],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : List of found child DOM elements</p>
`,typesMarkdown:``}]},{name:`classNameString`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">classNameString</span>(<span class="hljs-attr" title="a single class name or a record of class name: boolean">args</span>: <span class="hljs-title class_" data-custom-type="ClassNamesInput">ClassNamesInput</span>[]): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Create a string of names that will be used as class names for a given element.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">classNameString</span>(<span class="hljs-string">&#x27;my-elm&#x27;</span>, <span class="hljs-string">&#x27;open&#x27;</span>, <span class="hljs-string">&#x27;active&#x27;</span>) <span class="hljs-comment">// --&gt; &quot;my-elm open active&quot;</span>
<span class="hljs-title function_">classNameString</span>([<span class="hljs-string">&#x27;my-elm&#x27;</span>, <span class="hljs-string">&#x27;open&#x27;</span>, <span class="hljs-string">&#x27;active&#x27;</span>]) <span class="hljs-comment">// --&gt; &quot;my-elm open active&quot;</span>
<span class="hljs-title function_">classNameString</span>(<span class="hljs-string">&#x27;my-elm&#x27;</span>, [<span class="hljs-string">&#x27;open&#x27;</span>, <span class="hljs-string">&#x27;active&#x27;</span>]) <span class="hljs-comment">// --&gt; &quot;my-elm open active&quot;</span>
<span class="hljs-title function_">classNameString</span>(<span class="hljs-string">&#x27;my-elm&#x27;</span>, { <span class="hljs-attr">open</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">active</span>: <span class="hljs-literal">true</span> }) <span class="hljs-comment">// --&gt; &quot;my-elm open active&quot;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The list of class names (eg. &quot;my-elm open active&quot;)</p>
`,typesMarkdown:``}]},{name:`contentBoxSize`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">contentBoxSize</span>(<span class="hljs-attr" title="The DOM element (or window) to find the size of">element</span>: <span class="hljs-title class_">Document</span> | <span class="hljs-title class_" data-custom-type="GeneralWindow">GeneralWindow</span> | <span class="hljs-title class_">HTMLElement</span>): <span class="hljs-title class_" data-custom-type="Size">Size</span>
</code></pre>`,comment:`<p>Find the size of a DOM element, document or window excluding borders, margins and padding<br>(Getting the size of the viewport if <code>document</code> or <code>window</code> is given)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// &lt;div style=&quot;width: 200px; height: 300px; margin: 10px; border: 2px solid;&quot; /&gt;</span>
<span class="hljs-title function_">contentBoxSize</span>(div) <span class="hljs-comment">// --&gt; { width: 200, height: 300 }</span>

<span class="hljs-title function_">contentBoxSize</span>(<span class="hljs-variable language_">window</span>) <span class="hljs-comment">// --&gt; [size of the viewport]</span>
<span class="hljs-title function_">contentBoxSize</span>(<span class="hljs-variable language_">document</span>) <span class="hljs-comment">// --&gt; [size of the viewport]</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Object describing width and height of the element</p>
`,typesMarkdown:``}]},{name:`contentSize`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">contentSize</span>(<span class="hljs-attr" title="The DOM element (or window) to find the size of">element</span>: <span class="hljs-title class_">Document</span> | <span class="hljs-title class_" data-custom-type="GeneralWindow">GeneralWindow</span> | <span class="hljs-title class_">HTMLElement</span>): <span class="hljs-title class_" data-custom-type="Size">Size</span>
</code></pre>`,comment:`<p>Find the size of the content (scrollable area minus padding) of a DOM element, document or window<br>(Getting the size of the viewport if <code>document</code> or <code>window</code> is given)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// &lt;div style=&quot;width: 200px; height: 200px; margin: 10px; border: 2px solid; overflow: scroll&quot;&gt;</span>
<span class="hljs-comment">//   &lt;div style=&quot;height: 400px; width: 400px&quot; /&gt;</span>
<span class="hljs-comment">// &lt;/div&gt;</span>
<span class="hljs-title function_">contentSize</span>(div) <span class="hljs-comment">// --&gt; { width: 400, height: 400 }</span>

<span class="hljs-title function_">contentSize</span>(<span class="hljs-variable language_">window</span>) <span class="hljs-comment">// --&gt; [size of the viewport]</span>
<span class="hljs-title function_">contentSize</span>(<span class="hljs-variable language_">document</span>) <span class="hljs-comment">// --&gt; [size of the viewport]</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Object describing width and height of the element</p>
`,typesMarkdown:``}]},{name:`copyEvent`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">copyEvent</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Event</span>&gt;(<span class="hljs-attr" title="The event to copy">event</span>: T, <span class="hljs-attr" title="Element to define as currentTarget (falls back to the event currentTarget if not defined)">currentTarget</span>?: <span class="hljs-title class_">EventTarget</span>): T
</code></pre>`,comment:`<p>Copies a given event and optionally changes the <code>currentTarget</code></p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">copyEvent</span>(<span class="hljs-title class_">SomeEvent</span>, <span class="hljs-title class_">MyNewCurrentTargetElement</span>)
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The copied event</p>
`,typesMarkdown:``}]},{name:`createElement`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">createElement</span>(<span class="hljs-attr" title="The CSS selector to convert">selector</span>?: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">Element</span>
</code></pre>`,comment:`<p>Creates an element from a given CSS selector (restricted to only one element)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// Create a div</span>
<span class="hljs-title function_">create</span>(); <span class="hljs-comment">// --&gt; &lt;div /&gt;</span>

<span class="hljs-comment">// Create an element</span>
<span class="hljs-title function_">create</span>(<span class="hljs-string">&#x27;img&#x27;</span>); <span class="hljs-comment">// --&gt; &lt;img /&gt;</span>

<span class="hljs-comment">// Create an element from a selector</span>
<span class="hljs-title function_">create</span>(<span class="hljs-string">&#x27;#MyElement.active&#x27;</span>); <span class="hljs-comment">// --&gt; &lt;div id=&quot;MyElement&quot; class=&quot;active&quot; /&gt;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The created element</p>
`,typesMarkdown:``}]},{name:`css`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">css</span>(<span class="hljs-attr" title="DOM element to set the style of">elm</span>: <span class="hljs-title class_">HTMLElement</span>): <span class="hljs-title class_">CSSStyleDeclaration</span>
</code></pre>`,comment:`<p>Get the computed styling of a DOM element.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">css</span>(<span class="hljs-title class_">MyElm</span>) <span class="hljs-comment">// --&gt; All computed styles of MyElm</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : All styling on the element</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">css</span>(<span class="hljs-attr" title="DOM element to get/set the style on">elm</span>: <span class="hljs-title class_">HTMLElement</span>, <span class="hljs-attr" title="Style property name">property</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>
</code></pre>`,comment:`<p>Gets a given inline style property on a DOM element.<br>Return values that are pure numbers or pixel values will be converted to pure number first</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">css</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;font-size&#x27;</span>) <span class="hljs-comment">// --&gt; 30</span>
<span class="hljs-title function_">css</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;borderSize&#x27;</span>) <span class="hljs-comment">// --&gt; &#x27;1px&#x27;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : All styling on the element or the value of the given style property</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">css</span>(<span class="hljs-attr" title="DOM element to set the style on">elm</span>: <span class="hljs-title class_">HTMLElement</span>, <span class="hljs-attr" title="Styling to set on the element">styles</span>: <span class="hljs-title class_" data-custom-type="CSSStyleProperties">CSSStyleProperties</span>): <span class="hljs-title class_">CSSStyleDeclaration</span>
</code></pre>`,comment:`<p>Set multiple inline styling properties on a DOM element.</p>
<p>Notes on values:</p>
<ul>
<li><code>null</code> as value, removes the given property</li>
<li><code>!important</code> in the value will be parsed and set correctly (eg. font-size: 15px !important)</li>
</ul>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">css</span>(<span class="hljs-title class_">MyElm</span>, { <span class="hljs-attr">fontSize</span>: <span class="hljs-number">30</span>, <span class="hljs-string">&#x27;font-weight&#x27;</span>: <span class="hljs-string">&#x27;bold !important&#x27;</span> }) <span class="hljs-comment">// --&gt; All computed styles of MyElm</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : All styling on the element</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">css</span>(<span class="hljs-attr" title="DOM element to get/set the style on">elm</span>: <span class="hljs-title class_">HTMLElement</span>, <span class="hljs-attr" title="Style property name">property</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr" title="The new value">value</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span>): <span class="hljs-title class_">CSSStyleDeclaration</span>
</code></pre>`,comment:`<p>Set a given inline style property on a DOM element.</p>
<p>Notes on values:</p>
<ul>
<li><code>null</code> removes the given property</li>
<li><code>!important</code> added to the value, it will be parsed and set correctly</li>
</ul>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">css</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;fontSize&#x27;</span>, <span class="hljs-number">30</span>) <span class="hljs-comment">// --&gt; All computed styles of MyElm</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : All styling on the element or the value of the given style property</p>
`,typesMarkdown:``}]},{name:`domReady`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">domReady</span>(<span class="hljs-attr" title="Function to execute once the document has finished loading">handler</span>: <span class="hljs-function">() =&gt;</span> <span class="hljs-built_in">void</span>): <span class="hljs-built_in">void</span>
</code></pre>`,comment:`<p>Execute a given function once the document has finished loading</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">domReady</span>(<span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">e</span>: <span class="hljs-title class_">Event</span></span>) =&gt;</span> { <span class="hljs-title function_">alert</span>(<span class="hljs-string">&#x27;DOM Ready&#x27;</span>) });
</code></pre>`],remarks:[],descriptions:``,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">docComplete</span>(): <span class="hljs-built_in">boolean</span>
</code></pre>`,comment:`<p>returns whether document ready state indicates that the document is ready to be manipulated</p>
`,examples:[],remarks:[],descriptions:``,typesMarkdown:``}]},{name:`elementData`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">elementData</span>(<span class="hljs-attr" title="Element to link the data to">elm</span>: <span class="hljs-title class_">Node</span>, <span class="hljs-attr" title="Data key">key</span>?: <span class="hljs-built_in">string</span>, <span class="hljs-attr" title="Data to store">data</span>?: <span class="hljs-built_in">unknown</span>): <span class="hljs-built_in">unknown</span>
</code></pre>`,comment:`<p>Inspired by jQuery&#39;s data method that stores data in memory associated with a given element.</p>
<ul>
<li><code>data</code> = <code>undefined</code>: Return the stored data for the given key</li>
<li><code>data</code> = <code>null</code>: Remove the stored data for the given key</li>
<li><code>key</code> = <code>undefined</code>: return the entire data object</li>
</ul>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">elementData</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;entry&#x27;</span>, { <span class="hljs-attr">count</span>: <span class="hljs-number">10</span> }) <span class="hljs-comment">// --&gt; { count: 10 }</span>
<span class="hljs-title function_">elementData</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;entry&#x27;</span>) <span class="hljs-comment">// --&gt; &lt;What ever was stored under &quot;entry&quot;&gt;</span>
<span class="hljs-title function_">elementData</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;entry&#x27;</span>, <span class="hljs-literal">null</span>) <span class="hljs-comment">// --&gt; delete the &quot;entry&quot; entry</span>
<span class="hljs-title function_">elementData</span>(<span class="hljs-title class_">MyElm</span>) <span class="hljs-comment">// --&gt; everything was stored for the given element</span>
</code></pre>`],remarks:[`<p>Data is stored in a WeakMap, so when an element is deleted, the associated data is deleted as well.</p>
`],descriptions:`<p><span class="hljs-doctag">@returns</span> : The entire cache or the data for the given key</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">resetCache</span>(): <span class="hljs-built_in">void</span>
</code></pre>`,comment:`<p>Resets ALL local data cache</p>
`,examples:[],remarks:[],descriptions:``,typesMarkdown:``}]},{name:`elmIndex`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">elmIndex</span>(<span class="hljs-attr" title="DOM element to find the index of">elm</span>: <span class="hljs-title class_">Element</span>): <span class="hljs-built_in">number</span>
</code></pre>`,comment:`<p>Find the index of a DOM element amongst its siblings</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">elmIndex</span>(someDiv); <span class="hljs-comment">// --&gt; 3</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The index of <code>elm</code></p>
`,typesMarkdown:``}]},{name:`ensureHTML`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">ensureHTML</span>(<span class="hljs-attr" title="The string to parse">htmlOrSelector</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Parses a string to see if it is already HTML otherwise it assumes<br>is a selector and parses it to HTML</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// String is already HTML so it is returned as is</span>
<span class="hljs-title function_">ensureHTML</span>(<span class="hljs-string">&#x27;&lt;div /&gt;&#x27;</span>);

<span class="hljs-comment">// String is a selector, to is is parsed before it is returned</span>
<span class="hljs-title function_">ensureHTML</span>(<span class="hljs-string">&#x27;.my-div&#x27;</span>); <span class="hljs-comment">// --&gt; &lt;div class=&quot;my-div&quot; /&gt;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The HTML string</p>
`,typesMarkdown:``}]},{name:`find`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">find</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(<span class="hljs-attr" title="The selector to use">selector</span>: <span class="hljs-built_in">string</span>): T | T[]
</code></pre>`,comment:`<p>Find elements by a given selector. The selector will be lightly analyzed to determine<br>the appropriate <code>findByXX</code> function. This should be faster than just running querySelector(All)<br>to find elements.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">find</span>(<span class="hljs-string">&#x27;#my-id&#x27;</span>) <span class="hljs-comment">// Uses getElementById()</span>
<span class="hljs-title function_">find</span>(<span class="hljs-string">&#x27;.my-class&#x27;</span>) <span class="hljs-comment">// Uses getElementsByClassName()</span>
<span class="hljs-title function_">find</span>(<span class="hljs-string">&#x27;div&#x27;</span>) <span class="hljs-comment">// Uses getElementsByTagName()</span>
<span class="hljs-title function_">find</span>(<span class="hljs-string">&#x27;#my-id.my-class&#x27;</span>) <span class="hljs-comment">// Uses querySelectorAll()</span>
<span class="hljs-title function_">find</span>(<span class="hljs-string">&#x27;#my-id &gt; .my-class + p&#x27;</span>) <span class="hljs-comment">// Uses querySelectorAll()</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : List of found DOM elements</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">find</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(<span class="hljs-attr" title="The DOM element to start the search from">elm</span>: <span class="hljs-title class_" data-custom-type="Maybe">Maybe</span>&lt;<span class="hljs-title class_">Document</span> | <span class="hljs-title class_">HTMLElement</span>&gt;, <span class="hljs-attr" title="The selector to use">selector</span>: <span class="hljs-built_in">string</span>): T | T[]
</code></pre>`,comment:`<p>Find elements by a given selector from a given element. The selector will be lightly analyzed to determine<br>the appropriate <code>findByXX</code> function. This should be faster than just running querySelector(All)<br>to find elements.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">find</span>(myElm, <span class="hljs-string">&#x27;#my-id&#x27;</span>) <span class="hljs-comment">// Uses myElm.querySelectorAll()</span>
<span class="hljs-title function_">find</span>(myElm, <span class="hljs-string">&#x27;.my-class&#x27;</span>) <span class="hljs-comment">// Uses myElm.getElementsByClassName()</span>
<span class="hljs-title function_">find</span>(myElm, <span class="hljs-string">&#x27;div&#x27;</span>) <span class="hljs-comment">// Uses myElm.getElementsByTagName()</span>
<span class="hljs-title function_">find</span>(myElm, <span class="hljs-string">&#x27;#my-id.my-class&#x27;</span>) <span class="hljs-comment">// Uses myElm.querySelectorAll()</span>
<span class="hljs-title function_">find</span>(myElm, <span class="hljs-string">&#x27;#my-id &gt; .my-class + p&#x27;</span>) <span class="hljs-comment">// Uses myElm.querySelectorAll()</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : List of found DOM elements</p>
`,typesMarkdown:``}]},{name:`findByClass`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">findByClass</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(<span class="hljs-attr" title="Class name(s) to find elements by">classNames</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[]): T[]
</code></pre>`,comment:`<p>Finds DOM elements with a given class name.<br>Separate multiple selectors by comma. Separate multiple class names by space.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">findByClass</span>(<span class="hljs-string">&#x27;my-id&#x27;</span>) <span class="hljs-comment">// --&gt; all &quot;.my-elm&quot; elements</span>
<span class="hljs-title function_">findByClass</span>(<span class="hljs-string">&#x27;my-id, my-other-elm&#x27;</span>) <span class="hljs-comment">// --&gt; all &quot;.my-elm&quot; and &quot;.my-other-elm&quot; elements</span>
<span class="hljs-title function_">findByClass</span>(<span class="hljs-string">&#x27;my-id my-other-elm&#x27;</span>) <span class="hljs-comment">// --&gt; all &quot;.my-elm.my-other-elm&quot; elements</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : List of found DOM elements</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">findByClass</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(<span class="hljs-attr" title="The DOM element to start the search from">elm</span>: <span class="hljs-title class_" data-custom-type="Maybe">Maybe</span>&lt;<span class="hljs-title class_">Document</span> | <span class="hljs-title class_">HTMLElement</span>&gt;, <span class="hljs-attr" title="Class name(s) to find elements by">classNames</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[]): T[]
</code></pre>`,comment:`<p>Finds DOM elements with a given class name from a given element.<br>Separate multiple selectors by comma. Separate multiple class names by space.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">findByClass</span>(myElm, <span class="hljs-string">&#x27;my-id&#x27;</span>) <span class="hljs-comment">// --&gt; all &quot;.my-elm&quot; elements as descendant of myElm</span>
<span class="hljs-title function_">findByClass</span>(myElm, <span class="hljs-string">&#x27;my-id, my-other-elm&#x27;</span>) <span class="hljs-comment">// --&gt; all &quot;.my-elm&quot; and &quot;.my-other-elm&quot; elements as descendant of myElm</span>
<span class="hljs-title function_">findByClass</span>(myElm, <span class="hljs-string">&#x27;my-id my-other-elm&#x27;</span>) <span class="hljs-comment">// --&gt; all &quot;.my-elm.my-other-elm&quot; elements as descendant of myElm</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : List of found DOM elements</p>
`,typesMarkdown:``}]},{name:`findById`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">findById</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(<span class="hljs-attr" title="ID to find the element by">id</span>: <span class="hljs-built_in">string</span>): T
</code></pre>`,comment:`<p>Find a DOM element with the given ID</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">findById</span>(<span class="hljs-string">&#x27;my-id&#x27;</span>) <span class="hljs-comment">// --&gt; &quot;#my-id&quot; element</span>
<span class="hljs-title function_">findById</span>(<span class="hljs-string">&#x27;non-existing&#x27;</span>) <span class="hljs-comment">// --&gt; null</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The found element</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">findById</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(<span class="hljs-attr" title="ID to find the element by">ids</span>: <span class="hljs-built_in">string</span>[]): T[]
</code></pre>`,comment:`<p>Find a DOM elements from a list of IDs</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">findById</span>([<span class="hljs-string">&#x27;my-id&#x27;</span>, <span class="hljs-string">&#x27;my-other-id&#x27;</span>]) <span class="hljs-comment">// --&gt; &quot;#my-id&quot; and &quot;#my-other-elm&quot; elements</span>
<span class="hljs-title function_">findById</span>([<span class="hljs-string">&#x27;non-existing&#x27;</span>, <span class="hljs-string">&#x27;non-existing-2&#x27;</span>]) <span class="hljs-comment">// --&gt; []</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The found elements</p>
`,typesMarkdown:``}]},{name:`findByName`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">findByName</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(<span class="hljs-attr" title="Value of name attribute to find the elements by">names</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[]): T[]
</code></pre>`,comment:`<p>Find DOM elements with the given name</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">findByName</span>(<span class="hljs-string">&#x27;my-element-name&#x27;</span>) <span class="hljs-comment">// --&gt; all &quot;[name=my-element-name]&quot; elements</span>
<span class="hljs-title function_">findByName</span>([<span class="hljs-string">&#x27;my-element-name&#x27;</span>, <span class="hljs-string">&#x27;my-second-name&#x27;</span>]) <span class="hljs-comment">// --&gt; all &quot;[name=my-element-name]&quot; and &quot;[name=my-second-name]&quot; elements</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : List of found DOM elements</p>
`,typesMarkdown:``}]},{name:`findByQuery`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">findByQuery</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(<span class="hljs-attr" title="The DOM element to start the search from">elm</span>: <span class="hljs-title class_" data-custom-type="Maybe">Maybe</span>&lt;<span class="hljs-title class_">Document</span> | <span class="hljs-title class_">HTMLElement</span>&gt;, <span class="hljs-attr" title="CSS selector to find elements by">queries</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[]): T[]
</code></pre>`,comment:`<p>Find all elements matching a given CSS selector from a given element</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">findByQuery</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;span.my-class&#x27;</span>) <span class="hljs-comment">// --&gt; All &quot;span.my-class&quot; elements that are descendants of MyElm</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : List of found DOM elements</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">findByQuery</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(<span class="hljs-attr" title="CSS selector to find elements by">queries</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[]): T[]
</code></pre>`,comment:`<p>Find all elements matching a given CSS selector</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">findByQuery</span>(<span class="hljs-string">&#x27;span.my-class&#x27;</span>) <span class="hljs-comment">// --&gt; All &quot;span.my-class&quot; elements that are descendants of document</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : List of found DOM elements</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">findOneByQuery</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(<span class="hljs-attr" title="The DOM element to start the search from">elm</span>: <span class="hljs-title class_" data-custom-type="Maybe">Maybe</span>&lt;<span class="hljs-title class_">Document</span> | <span class="hljs-title class_">HTMLElement</span>&gt;, <span class="hljs-attr" title="CSS selector to find elements by">query</span>: <span class="hljs-built_in">string</span>): T
</code></pre>`,comment:`<p>Find first elements matching a given CSS selector from a given element</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">findOneByQuery</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;span.my-class&#x27;</span>) <span class="hljs-comment">// --&gt; First &quot;span.my-class&quot; elements that are descendants of MyElm</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : List of found DOM elements</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">findOneByQuery</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(<span class="hljs-attr" title="CSS selector to find elements by">query</span>: <span class="hljs-built_in">string</span>): T
</code></pre>`,comment:`<p>Find first elements matching a given CSS selector</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">findOneByQuery</span>(<span class="hljs-string">&#x27;span.my-class&#x27;</span>) <span class="hljs-comment">// --&gt; First &quot;span.my-class&quot; elements that are descendants of document</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : List of found DOM elements</p>
`,typesMarkdown:``}]},{name:`findByTagName`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">findByTagName</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(<span class="hljs-attr" title="Tag name to find the elements by">tagNames</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[]): T[]
</code></pre>`,comment:`<p>Find elements by given tag name</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">findByTagName</span>(<span class="hljs-string">&#x27;div&#x27;</span>) <span class="hljs-comment">// --&gt; All &lt;div&gt; elements</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : List of found DOM elements</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">findByTagName</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">HTMLElement</span>&gt;(<span class="hljs-attr" title="The DOM element to start the search from">elm</span>: <span class="hljs-title class_" data-custom-type="Maybe">Maybe</span>&lt;<span class="hljs-title class_">Document</span> | <span class="hljs-title class_">HTMLElement</span>&gt;, <span class="hljs-attr" title="Tag name to find the elements by">tagNames</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[]): T[]
</code></pre>`,comment:`<p>Find elements by given tag name</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">findByTagName</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;div&#x27;</span>) <span class="hljs-comment">// --&gt; All &lt;div&gt; elements that are descendants of MyElm</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : List of found DOM elements</p>
`,typesMarkdown:``}]},{name:`getCurrentDocument`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">getCurrentDocument</span>(<span class="hljs-attr" title="The node to determine the document from">node</span>: <span class="hljs-title class_">Node</span> | <span class="hljs-title class_">Document</span> | <span class="hljs-title class_" data-custom-type="GeneralWindow">GeneralWindow</span>): <span class="hljs-title class_">Document</span>
</code></pre>`,comment:`<p>Determines the relevant owner <code>document</code> object from a give node</p>
`,examples:['<pre><code class="hljs language-ts"><span class="hljs-title function_">getCurrentDocument</span>(<span class="hljs-variable language_">document</span>) <span class="hljs-comment">// --&gt; `document` directly</span>\n<span class="hljs-title function_">getCurrentDocument</span>(<span class="hljs-variable language_">window</span>) <span class="hljs-comment">// --&gt; `window.document`</span>\n<span class="hljs-title function_">getCurrentDocument</span>(myNode) <span class="hljs-comment">// --&gt; The `document` in which myNode resides</span>\n</code></pre>'],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The owner document (if can be determined)</p>
`,typesMarkdown:``}]},{name:`getCurrentWindow`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">getCurrentWindow</span>(<span class="hljs-attr" title="The node to determine the window from">node</span>: <span class="hljs-title class_">Node</span> | <span class="hljs-title class_">Document</span> | <span class="hljs-title class_" data-custom-type="GeneralWindow">GeneralWindow</span>): <span class="hljs-title class_" data-custom-type="GeneralWindow">GeneralWindow</span>
</code></pre>`,comment:`<p>Determines the relevant owner <code>window</code> object from a give node</p>
`,examples:['<pre><code class="hljs language-ts"><span class="hljs-title function_">getCurrentWindow</span>(<span class="hljs-variable language_">document</span>) <span class="hljs-comment">// --&gt; `window` the document belongs to</span>\n<span class="hljs-title function_">getCurrentWindow</span>(<span class="hljs-variable language_">window</span>) <span class="hljs-comment">// --&gt; `window` directly</span>\n<span class="hljs-title function_">getCurrentWindow</span>(myNode) <span class="hljs-comment">// --&gt; The `window` in which myNode resides</span>\n</code></pre>'],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The owner window (if can be determined)</p>
`,typesMarkdown:``}]},{name:`hasClass`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">hasClass</span>(<span class="hljs-attr" title="DOM element to test">elm</span>: <span class="hljs-title class_">Element</span>, <span class="hljs-attr" title="Class names to test">classNames</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[], <span class="hljs-attr" title="Test if at least one class name exist">any</span>?: <span class="hljs-built_in">boolean</span>): <span class="hljs-built_in">boolean</span>
</code></pre>`,comment:`<p>Does all (or any) of the listed class names exist in the DOM elements list of class names</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">hasClass</span>(myElm, <span class="hljs-string">&#x27;open&#x27;</span>) <span class="hljs-comment">// --&gt; true if myElm has the &quot;open&quot; class name</span>
<span class="hljs-title function_">hasClass</span>(myElm, [<span class="hljs-string">&#x27;open&#x27;</span>, <span class="hljs-string">&#x27;shown&#x27;</span>]) <span class="hljs-comment">// --&gt; true if myElm has some or all given class names</span>
<span class="hljs-title function_">hasClass</span>(myElm, [<span class="hljs-string">&#x27;open&#x27;</span>, <span class="hljs-string">&#x27;shown&#x27;</span>], <span class="hljs-literal">true</span>) <span class="hljs-comment">// --&gt; true if myElm has all given class names</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : All/any class names listed were found in the elements list of class names</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">hasAllClass</span>(<span class="hljs-attr" title="DOM element to test">elm</span>: <span class="hljs-title class_">Element</span>, <span class="hljs-attr" title="Class names to test">classNames</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[]): <span class="hljs-built_in">boolean</span>
</code></pre>`,comment:`<p>Does all of the listed class names exist in the DOM elements list of class names</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">hasAllClassNames</span>(myElm, <span class="hljs-string">&#x27;open&#x27;</span>) <span class="hljs-comment">// --&gt; true if myElm has the &quot;open&quot; class name</span>
<span class="hljs-title function_">hasAllClassNames</span>(myElm, [<span class="hljs-string">&#x27;open&#x27;</span>, <span class="hljs-string">&#x27;shown&#x27;</span>]) <span class="hljs-comment">// --&gt; true if myElm has all given class names</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : All of the class names listed were found in the elements list of class names</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">hasAnyClass</span>(<span class="hljs-attr" title="DOM element to test">elm</span>: <span class="hljs-title class_">Element</span>, <span class="hljs-attr" title="Class names to test">classNames</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[]): <span class="hljs-built_in">boolean</span>
</code></pre>`,comment:`<p>Does any of the listed class names exist in the DOM elements list of class names</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">hasAnyClassName</span>(myElm, <span class="hljs-string">&#x27;open&#x27;</span>) <span class="hljs-comment">// --&gt; true if myElm has the &quot;open&quot; class name</span>
<span class="hljs-title function_">hasAnyClassName</span>(myElm, [<span class="hljs-string">&#x27;open&#x27;</span>, <span class="hljs-string">&#x27;shown&#x27;</span>]) <span class="hljs-comment">// --&gt; true if myElm has at least one of the given class names</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : At least one of the class names listed were found in the elements list of class names</p>
`,typesMarkdown:``}]},{name:`hidden`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">hidden</span>(<span class="hljs-attr" title="DOM element to test">elm</span>: <span class="hljs-title class_">HTMLElement</span>): <span class="hljs-built_in">boolean</span>
</code></pre>`,comment:`<p>Test if a given DOM element is technically hidden</p>
<ul>
<li>Not in DOM</li>
<li>Collapsed (no width and height)</li>
<li>display: none</li>
<li>visibility: hidden.</li>
</ul>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">hidden</span>(myNormalElement) <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">hidden</span>(myZeroWidthAndHeightElement) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">hidden</span>(myNoDisplayElement) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">hidden</span>(myNoVisibilityElement) <span class="hljs-comment">// --&gt; true</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Is the element technically hidden or not</p>
`,typesMarkdown:``}]},{name:`inDOM`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">inDOM</span>(<span class="hljs-attr" title="The element to check">elm</span>: <span class="hljs-title class_">Node</span>): <span class="hljs-built_in">boolean</span>
</code></pre>`,comment:`<p>Is the given DOM node inserted into the DOM</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">inDOM</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;my-elm&#x27;</span>)) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">inDOM</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;div&#x27;</span>)) <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Is it a DOM node in the DOM or not</p>
`,typesMarkdown:``}]},{name:`innerSize`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">innerSize</span>(<span class="hljs-attr" title="The DOM element (or window) to find the size of">element</span>: <span class="hljs-title class_">Document</span> | <span class="hljs-title class_" data-custom-type="GeneralWindow">GeneralWindow</span> | <span class="hljs-title class_">HTMLElement</span>): <span class="hljs-title class_" data-custom-type="Size">Size</span>
</code></pre>`,comment:`<p>Find the size of a DOM element, document or window excluding borders, margins and scrollbars.<br>Getting the size of the viewport if <code>document</code> or <code>window</code> is given.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// &lt;div style=&quot;width: 200px; height: 300px; margin: 15px; padding: 10px; border-width: 2px;&quot; /&gt;</span>
<span class="hljs-title function_">innerSize</span>(div) <span class="hljs-comment">// --&gt; { width: 220, height: 320 }</span>

<span class="hljs-title function_">innerSize</span>(<span class="hljs-variable language_">window</span>) <span class="hljs-comment">// --&gt; [size of the viewport]</span>
<span class="hljs-title function_">innerSize</span>(<span class="hljs-variable language_">document</span>) <span class="hljs-comment">// --&gt; [size of the viewport]</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Object describing width and height of the element</p>
`,typesMarkdown:``}]},{name:`innerXML`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">innerXML</span>(<span class="hljs-attr" title="The XML node to grab the inner XML structure from">elm</span>: <span class="hljs-title class_">Element</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Gets the inner XML structure as a string from a XML/HTML element<br>(like innerHTML but also for XML elements - eg. in SVG)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">innerXML</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">span</span>&gt;</span>my text<span class="hljs-tag">&lt;/<span class="hljs-name">span</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>); <span class="hljs-comment">// --&gt; &#x27;&lt;span&gt;my text&lt;/span&gt;&#x27;</span>
<span class="hljs-title function_">innerXML</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">svg</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">g</span>&gt;</span><span class="hljs-tag">&lt;<span class="hljs-name">path</span> /&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">g</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">svg</span>&gt;</span></span>); <span class="hljs-comment">// --&gt; &#x27;&lt;g&gt;&lt;path /&gt;&lt;/g&gt;&#x27;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The inner XML structure</p>
`,typesMarkdown:``}]},{name:`insertAfter`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">insertAfter</span>(<span class="hljs-attr" title="The DOM element to insert elements after">elm</span>: <span class="hljs-title class_">Element</span>, <span class="hljs-attr" title="DOM element or HTML (or selector) to insert">insertElm</span>: <span class="hljs-built_in">string</span> | <span class="hljs-title class_">Element</span>): <span class="hljs-title class_">Element</span>
</code></pre>`,comment:`<p>Inserts DOM element or plain HTML after a given DOM element<br>(not possible for detached elements or the <html> element)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">insertAfter</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>, myInsertElm) <span class="hljs-comment">// --&gt; null (not possible)</span>
<span class="hljs-title function_">insertAfter</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;div&#x27;</span>), myInsertElm) <span class="hljs-comment">// --&gt; null (not possible)</span>

<span class="hljs-title function_">insertAfter</span>(myElm, myInsertElm) <span class="hljs-comment">// --&gt; myInsertElement</span>
<span class="hljs-title function_">insertAfter</span>(myElm, <span class="hljs-string">&#x27;&lt;div /&gt;&#x27;</span>) <span class="hljs-comment">// --&gt; &lt;div /&gt;</span>
<span class="hljs-title function_">insertAfter</span>(myElm, <span class="hljs-string">&#x27;.inserted-element&#x27;</span>) <span class="hljs-comment">// --&gt; &lt;div class=&quot;inserted-element&quot; /&gt;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The inserted element</p>
`,typesMarkdown:``}]},{name:`insertBefore`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">insertBefore</span>(<span class="hljs-attr" title="The DOM element to insert elements before">elm</span>: <span class="hljs-title class_">Element</span>, <span class="hljs-attr" title="DOM element or HTML (or selector) to insert">insertElm</span>: <span class="hljs-built_in">string</span> | <span class="hljs-title class_">Element</span>): <span class="hljs-title class_">Element</span>
</code></pre>`,comment:`<p>Inserts DOM element or plain HTML before a given DOM element<br>(not possible for detached elements or the <html> element)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">insertBefore</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>, myInsertElm) <span class="hljs-comment">// --&gt; null (not possible)</span>
<span class="hljs-title function_">insertBefore</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;div&#x27;</span>), myInsertElm) <span class="hljs-comment">// --&gt; null (not possible)</span>

<span class="hljs-title function_">insertBefore</span>(myElm, myInsertElm) <span class="hljs-comment">// --&gt; myInsertElement</span>
<span class="hljs-title function_">insertBefore</span>(myElm, <span class="hljs-string">&#x27;&lt;div /&gt;&#x27;</span>) <span class="hljs-comment">// --&gt; &lt;div /&gt;</span>
<span class="hljs-title function_">insertBefore</span>(myElm, <span class="hljs-string">&#x27;.inserted-element&#x27;</span>) <span class="hljs-comment">// --&gt; &lt;div class=&quot;inserted-element&quot; /&gt;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The inserted element</p>
`,typesMarkdown:``}]},{name:`inView`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">inView</span>(<span class="hljs-attr" title="DOM element to test">elm</span>: <span class="hljs-title class_">HTMLElement</span>, <span class="hljs-attr" title="The distance to the edge of the viewport before
                   the element is no longer inside in the viewport area,
                   in pixels">threshold</span>?: <span class="hljs-built_in">number</span>): <span class="hljs-title class_" data-custom-type="PositionIndicator">PositionIndicator</span>
</code></pre>`,comment:`<p>Determines whether the element is in the area of the viewport or not.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// Element inside viewport</span>
<span class="hljs-keyword">const</span> { inside } = <span class="hljs-title function_">inView</span>(myElement); <span class="hljs-comment">// --&gt; inside === true</span>

<span class="hljs-comment">// Element outside viewport</span>
<span class="hljs-keyword">const</span> { inside, below } = <span class="hljs-title function_">inView</span>(myElement); <span class="hljs-comment">// --&gt; inside === false; below === true</span>

<span class="hljs-comment">// With a threshold</span>
<span class="hljs-keyword">const</span> { inside } = <span class="hljs-title function_">inView</span>(myElement, <span class="hljs-number">30</span>); <span class="hljs-comment">// --&gt; inside === true</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : An object with indications of where the element is compared to the viewport area</p>
`,typesMarkdown:``}]},{name:`invisible`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">invisible</span>(<span class="hljs-attr" title="DOM element to test">elm</span>: <span class="hljs-title class_">HTMLElement</span>): <span class="hljs-built_in">boolean</span>
</code></pre>`,comment:`<p>Test if a given DOM element is invisible.</p>
<p>Itself or a parent is:</p>
<ul>
<li><a href="#hidden">hidden</a></li>
<li>No width or no height</li>
<li>opacity: 0</li>
</ul>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">invisible</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>) <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">invisible</span>(<span class="hljs-title class_">MyNormalElement</span>) <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">invisible</span>(myZeroHeightElement) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">invisible</span>(myZeroWidthElement) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">invisible</span>(myNoDisplayElement) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">invisible</span>(myNoVisibilityElement) <span class="hljs-comment">// --&gt; true</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Is the element invisible</p>
`,typesMarkdown:``}]},{name:`isBlob`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isBlob</span>(<span class="hljs-attr" title="The object to check">obj</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (obj is <span class="hljs-title class_">Blob</span>)
</code></pre>`,comment:``,examples:[],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Is it a Blob object or not</p>
`,typesMarkdown:``}]},{name:`isDocument`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isDocument</span>(<span class="hljs-attr" title="The object to check">obj</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (obj is <span class="hljs-title class_">Document</span>)
</code></pre>`,comment:`<p>Is the given object a DOM document node</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">isDocument</span>(<span class="hljs-variable language_">window</span>.<span class="hljs-property">document</span>) <span class="hljs-comment">// --&gt; true</span>

<span class="hljs-title function_">isDocument</span>(<span class="hljs-variable language_">window</span>) <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">isDocument</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>) <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Is it a DOM document node or not</p>
`,typesMarkdown:``}]},{name:`isDOMChildNode`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isDOMChildNode</span>(<span class="hljs-attr" title="The object to check">obj</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (obj is <span class="hljs-title class_" data-custom-type="ChildNodeWithParent">ChildNodeWithParent</span>)
</code></pre>`,comment:`<p>Is the given object a DOM node child of a DOM element</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">isDOMChildNode</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isDOMChildNode</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;my-elm&#x27;</span>)) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isDOMChildNode</span>(<span class="hljs-title function_">createDetachedDocument</span>().<span class="hljs-property">body</span>) <span class="hljs-comment">// --&gt; true</span>

<span class="hljs-title function_">isDOMChildNode</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>) <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Is it a DOM child node or not</p>
`,typesMarkdown:``}]},{name:`isDOMContainer`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isDOMContainer</span>(<span class="hljs-attr" title="The object to check">obj</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-built_in">boolean</span>
</code></pre>`,comment:``,examples:[],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Is it a DOM container or not</p>
`,typesMarkdown:``}]},{name:`isDOMElement`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isDOMElement</span>(<span class="hljs-attr" title="The object to check">obj</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (obj is <span class="hljs-title class_">Element</span>)
</code></pre>`,comment:`<p>Is the given object a DOM element node and optionally of a given type</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">isDOMElement</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;p&#x27;</span>)) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isDOMElement</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isDOMElement</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>) <span class="hljs-comment">// --&gt; true</span>

<span class="hljs-title function_">isDOMElement</span>(<span class="hljs-variable language_">window</span>) <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">isDOMElement</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createTextNode</span>(<span class="hljs-string">&#x27;&#x27;</span>)) <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Is it a DOM element node or not and optionally of the right type</p>
`,typesMarkdown:``}]},{name:`isDOMFragment`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isDOMFragment</span>(<span class="hljs-attr" title="The object to check">obj</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (obj is <span class="hljs-title class_">DocumentFragment</span>)
</code></pre>`,comment:`<p>Is the given object a Document Fragment</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">isDOMFragment</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createDocumentFragment</span>()) <span class="hljs-comment">// --&gt; true</span>

<span class="hljs-title function_">isDOMFragment</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;p&#x27;</span>)) <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">isDOMFragment</span>(<span class="hljs-variable language_">document</span>) <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">isDOMFragment</span>(<span class="hljs-variable language_">window</span>) <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Is it a Document Fragment or not</p>
`,typesMarkdown:``}]},{name:`isDOMNode`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isDOMNode</span>(<span class="hljs-attr" title="The object to check">obj</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (obj is <span class="hljs-title class_">Node</span>)
</code></pre>`,comment:`<p>Is the given object a DOM Node</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">isDOMNode</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isDOMNode</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createTextNode</span>(<span class="hljs-string">&#x27;&#x27;</span>)) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isDOMNode</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createComment</span>(<span class="hljs-string">&#x27;&#x27;</span>)) <span class="hljs-comment">// --&gt; true</span>

<span class="hljs-title function_">isDOMNode</span>(<span class="hljs-variable language_">window</span>) <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Is it a DOM node or not</p>
`,typesMarkdown:``}]},{name:`isDOMRoot`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isDOMRoot</span>(<span class="hljs-attr" title="The object to check">obj</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (obj is <span class="hljs-title class_">HTMLElement</span>)
</code></pre>`,comment:`<p>Is the given object root node of the DOM (eg <code>&lt;html&gt;</code> for HTML documents og <code>&lt;svg&gt;</code> for SVG documents)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">isDOMRoot</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>) <span class="hljs-comment">// --&gt; true</span>

<span class="hljs-title function_">isDOMRoot</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>) <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">isDOMRoot</span>(<span class="hljs-variable language_">document</span>) <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">isDOMRoot</span>(<span class="hljs-variable language_">window</span>) <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Is it the root node of the DOM or not</p>
`,typesMarkdown:``}]},{name:`isEventTarget`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isEventTarget</span>(<span class="hljs-attr" title="The object to check">obj</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (obj is <span class="hljs-title class_">EventTarget</span>)
</code></pre>`,comment:``,examples:[],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Is it an Event Target or not</p>
`,typesMarkdown:``}]},{name:`isHTMLChildElement`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isHTMLChildElement</span>(<span class="hljs-attr" title="The object to check">obj</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (obj is <span class="hljs-title class_" data-custom-type="HTMLChildElement">HTMLChildElement</span>)
</code></pre>`,comment:`<p>Is the given object a HTML element child of a DOM element</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">isHTMLChildElement</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isHTMLChildElement</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;my-elm&#x27;</span>)) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isHTMLChildElement</span>(<span class="hljs-title function_">createDetachedDocument</span>().<span class="hljs-property">body</span>) <span class="hljs-comment">// --&gt; true</span>

<span class="hljs-title function_">isHTMLChildElement</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>) <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Is it a child HTMLElement or not</p>
`,typesMarkdown:``}]},{name:`isHTMLElement`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isHTMLElement</span>(<span class="hljs-attr" title="The object to check">obj</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (obj is <span class="hljs-title class_">HTMLElement</span>)
</code></pre>`,comment:`<p>Is the given object a HTMLElement node</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">isHTMLElement</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;p&#x27;</span>)) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isHTMLElement</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">isHTMLElement</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>) <span class="hljs-comment">// --&gt; true</span>

<span class="hljs-title function_">isHTMLElement</span>(<span class="hljs-variable language_">window</span>) <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">isHTMLElement</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createTextNode</span>(<span class="hljs-string">&#x27;&#x27;</span>)) <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Is it a HTML element node</p>
`,typesMarkdown:``}]},{name:`isWindow`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">isWindow</span>(<span class="hljs-attr" title="The object to check">obj</span>: <span class="hljs-built_in">unknown</span>): <span class="hljs-title function_">boolean</span> (obj is <span class="hljs-title class_" data-custom-type="GeneralWindow">GeneralWindow</span>)
</code></pre>`,comment:`<p>Is the given object a Window object (eg. window or IFrame.contentWindow)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">isWindow</span>(<span class="hljs-variable language_">window</span>) <span class="hljs-comment">// --&gt; true</span>

<span class="hljs-title function_">isWindow</span>(<span class="hljs-variable language_">document</span>) <span class="hljs-comment">// --&gt; false</span>
<span class="hljs-title function_">isWindow</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>) <span class="hljs-comment">// --&gt; false</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Is it a Window object or not</p>
`,typesMarkdown:``}]},{name:`marginBoxSize`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">marginBoxSize</span>(<span class="hljs-attr" title="The DOM element (or window) to find the size of">element</span>: <span class="hljs-title class_">Document</span> | <span class="hljs-title class_" data-custom-type="GeneralWindow">GeneralWindow</span> | <span class="hljs-title class_">HTMLElement</span>): <span class="hljs-title class_" data-custom-type="Size">Size</span>
</code></pre>`,comment:`<p>Find the size of a DOM element, document or window including margins and borders<br>(Getting the size of the viewport if <code>document</code> or <code>window</code> is given)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// &lt;div style=&quot;width: 200px; height: 300px; margin: 15px; padding: 10px; border-width: 2px;&quot; /&gt;</span>
<span class="hljs-title function_">marginBoxSize</span>(div) <span class="hljs-comment">// --&gt; { width: 254, height: 354 }</span>

<span class="hljs-title function_">marginBoxSize</span>(<span class="hljs-variable language_">window</span>) <span class="hljs-comment">// --&gt; [size of the viewport]</span>
<span class="hljs-title function_">marginBoxSize</span>(<span class="hljs-variable language_">document</span>) <span class="hljs-comment">// --&gt; [size of the viewport]</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Object describing width and height of the element</p>
`,typesMarkdown:``}]},{name:`nextSiblings`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">nextSiblings</span>(<span class="hljs-attr" title="DOM element to find siblings of">elm</span>: <span class="hljs-title class_">Element</span>): <span class="hljs-title class_">Element</span>[]
</code></pre>`,comment:`<p>Get all sibling elements after a given DOM element in the structure</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">nextSiblings</span>(someElement);
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Collection of sibling elements</p>
`,typesMarkdown:``}]},{name:`off`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">off</span>&lt;E <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>&gt;(<span class="hljs-attr" title="DOM element to bind the event to">elm</span>: <span class="hljs-title class_">EventTarget</span>, <span class="hljs-attr" title="Event names to bind the handler to">eventNames</span>: E | E[], <span class="hljs-attr" title="Handler to bind to the event">handler</span>: <span class="hljs-title class_" data-custom-type="EventHandler">EventHandler</span>&lt;E&gt;, <span class="hljs-attr" title="Options to pass to the 'removeEventListener'">options</span>?: <span class="hljs-title class_">AddEventListenerOptions</span>): <span class="hljs-title class_">EventTarget</span>
</code></pre>`,comment:`<p>Bind an event handler for one or more event names on a given DOM element.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">off</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;click&#x27;</span>, <span class="hljs-function">() =&gt;</span> {})
<span class="hljs-title function_">off</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;click&#x27;</span>, <span class="hljs-function">() =&gt;</span> {}, { <span class="hljs-attr">passive</span>: <span class="hljs-literal">true</span> })
<span class="hljs-title function_">off</span>(<span class="hljs-title class_">MyElm</span>, [<span class="hljs-string">&#x27;mouseenter&#x27;</span>, <span class="hljs-string">&#x27;touchstart&#x27;</span>], <span class="hljs-function">() =&gt;</span> {})
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : <code>elm</code></p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">off</span>&lt;E <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>&gt;(<span class="hljs-attr" title="Event names to bind the handler to">eventNames</span>: E | E[], <span class="hljs-attr" title="Handler to bind to the event">handler</span>: <span class="hljs-title class_" data-custom-type="EventHandler">EventHandler</span>&lt;E&gt;, <span class="hljs-attr" title="Options to pass to the 'removeEventListener'">options</span>?: <span class="hljs-title class_">AddEventListenerOptions</span>): <span class="hljs-title class_">Document</span>
</code></pre>`,comment:`<p>Bind an event handler for one or more event names to <code>document</code></p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">off</span>(<span class="hljs-string">&#x27;click&#x27;</span>, <span class="hljs-function">() =&gt;</span> {})
<span class="hljs-title function_">off</span>(<span class="hljs-string">&#x27;click&#x27;</span>, <span class="hljs-function">() =&gt;</span> {}, { <span class="hljs-attr">passive</span>: <span class="hljs-literal">true</span> })
<span class="hljs-title function_">off</span>([<span class="hljs-string">&#x27;mouseenter&#x27;</span>, <span class="hljs-string">&#x27;touchstart&#x27;</span>], <span class="hljs-function">() =&gt;</span> {})
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : document</p>
`,typesMarkdown:``}]},{name:`on`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">on</span>&lt;E <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>&gt;(<span class="hljs-attr" title="DOM element to bind the event to">elm</span>: <span class="hljs-title class_">EventTarget</span>, <span class="hljs-attr" title="Event names to bind the handler to">eventNames</span>: E | E[], <span class="hljs-attr" title="Handler to bind to the event">handler</span>: <span class="hljs-title class_" data-custom-type="EventHandler">EventHandler</span>&lt;E&gt;, <span class="hljs-attr" title="Options to pass to the 'addEventListener'">options</span>?: <span class="hljs-title class_" data-custom-type="OnOptions">OnOptions</span>&lt;E&gt;): <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">EventTarget</span>
</code></pre>`,comment:`<p>Bind an event handler for one or more event names on a given DOM element.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-keyword">const</span> removeEvent = <span class="hljs-title function_">on</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;click&#x27;</span>, someHandler)
<span class="hljs-keyword">const</span> removeEvent = <span class="hljs-title function_">on</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;click&#x27;</span>, someHandler, { <span class="hljs-attr">passive</span>: <span class="hljs-literal">true</span> })
<span class="hljs-keyword">const</span> removeEvent = <span class="hljs-title function_">on</span>(<span class="hljs-title class_">MyElm</span>, [<span class="hljs-string">&#x27;mouseenter&#x27;</span>, <span class="hljs-string">&#x27;touchstart&#x27;</span>], someHandler)
</code></pre><p><strong>When using <code>options.when</code></strong></p>
<pre><code class="hljs language-ts"><span class="hljs-keyword">let</span> allowClick = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">const</span> removeEvent = <span class="hljs-title function_">on</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;click&#x27;</span>, someHandler, { <span class="hljs-attr">when</span>: <span class="hljs-function">() =&gt;</span> allowClick });

<span class="hljs-comment">// In this case the \`click\` event won&#x27;t trigger unless &quot;allowClick&quot; is \`true\`</span>
</code></pre><p><strong>When using <code>options.delegate</code></strong></p>
<pre><code class="hljs language-ts"><span class="hljs-keyword">const</span> removeEvent = <span class="hljs-title function_">on</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;click&#x27;</span>, someHandler, { <span class="hljs-attr">delegate</span>: <span class="hljs-string">&#x27;.click-me&#x27;</span> });

<span class="hljs-comment">// Here we listen to the \`click\` on MyElm, but the event will only trigger</span>
<span class="hljs-comment">// if the clicked target is a child of \`MyElm\` and matches the given selector (&#x27;.click-me&#x27;).</span>
<span class="hljs-comment">// \`this\` and currentTarget, will match the current &quot;.click-me&quot; element</span>
</code></pre><p><strong>A combination of options</strong></p>
<pre><code class="hljs language-ts"><span class="hljs-keyword">const</span> removeEvent = <span class="hljs-title function_">on</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;click&#x27;</span>, someHandler, {
  <span class="hljs-attr">delegate</span>: <span class="hljs-string">&#x27;.click-me&#x27;</span>,
  <span class="hljs-attr">when</span>: <span class="hljs-function">() =&gt;</span> allowClick,
  <span class="hljs-attr">once</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-comment">// In this scenario a MyElm &#x27;.click-me&#x27; child element will trigger the event handler,</span>
<span class="hljs-comment">// but only if the condition of \`when\` returns true (&quot;allowClick&quot; is \`true\`) and the</span>
<span class="hljs-comment">// event will trigger only once (event will be removed when the conditions for when</span>
<span class="hljs-comment">// and delegate have been fulfilled).</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : function to remove added event handlers</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">on</span>&lt;E <span class="hljs-keyword">extends</span> <span class="hljs-built_in">string</span>&gt;(<span class="hljs-attr" title="Event names to bind the handler to">eventNames</span>: E | E[], <span class="hljs-attr" title="Handler to bind to the event">handler</span>: <span class="hljs-title class_" data-custom-type="EventHandler">EventHandler</span>&lt;E&gt;, <span class="hljs-attr" title="Options to pass to the 'addEventListener'">options</span>?: <span class="hljs-title class_" data-custom-type="OnOptions">OnOptions</span>&lt;E&gt;): <span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Document</span>
</code></pre>`,comment:`<p>Bind an event handler for one or more event names on <code>document</code>.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-keyword">const</span> removeEvent = <span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;click&#x27;</span>, someHandler)
<span class="hljs-keyword">const</span> removeEvent = <span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;click&#x27;</span>, someHandler, { <span class="hljs-attr">passive</span>: <span class="hljs-literal">true</span> })
<span class="hljs-keyword">const</span> removeEvent = <span class="hljs-title function_">on</span>([<span class="hljs-string">&#x27;mouseenter&#x27;</span>, <span class="hljs-string">&#x27;touchstart&#x27;</span>], someHandler)
</code></pre><p><strong>When using <code>options.when</code></strong></p>
<pre><code class="hljs language-ts"><span class="hljs-keyword">let</span> allowClick = <span class="hljs-literal">false</span>;
<span class="hljs-keyword">const</span> removeEvent = <span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;click&#x27;</span>, someHandler, { <span class="hljs-attr">when</span>: <span class="hljs-function">() =&gt;</span> allowClick });

<span class="hljs-comment">// In this case the \`click\` event won&#x27;t trigger unless &quot;allowClick&quot; is \`true\`</span>
</code></pre><p><strong>When using <code>options.delegate</code></strong></p>
<pre><code class="hljs language-ts"><span class="hljs-keyword">const</span> removeEvent = <span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;click&#x27;</span>, someHandler, { <span class="hljs-attr">delegate</span>: <span class="hljs-string">&#x27;.click-me&#x27;</span> });

<span class="hljs-comment">// Here we listen to the \`click\` on but the event will only trigger</span>
<span class="hljs-comment">// if the clicked target matches the given selector (&#x27;.click-me&#x27;).</span>
<span class="hljs-comment">// \`this\` and currentTarget, will match the current &quot;.click-me&quot; element</span>
</code></pre><p><strong>A combination of options</strong></p>
<pre><code class="hljs language-ts"><span class="hljs-keyword">const</span> removeEvent = <span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;click&#x27;</span>, someHandler, {
  <span class="hljs-attr">delegate</span>: <span class="hljs-string">&#x27;.click-me&#x27;</span>,
  <span class="hljs-attr">when</span>: <span class="hljs-function">() =&gt;</span> allowClick,
  <span class="hljs-attr">once</span>: <span class="hljs-literal">true</span>
});

<span class="hljs-comment">// In this scenario a &#x27;.click-me&#x27; child element will trigger the event handler,</span>
<span class="hljs-comment">// but only if the condition of \`when\` returns true (&quot;allowClick&quot; is \`true\`) and the</span>
<span class="hljs-comment">// event will trigger only once (event will be removed when the conditions for when</span>
<span class="hljs-comment">// and delegate have been fulfilled).</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : function to remove added event handlers</p>
`,typesMarkdown:``}]},{name:`outerSize`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">outerSize</span>(<span class="hljs-attr" title="The DOM element (or window) to find the size of">element</span>: <span class="hljs-title class_">Document</span> | <span class="hljs-title class_" data-custom-type="GeneralWindow">GeneralWindow</span> | <span class="hljs-title class_">HTMLElement</span>): <span class="hljs-title class_" data-custom-type="Size">Size</span>
</code></pre>`,comment:`<p>Find the size of a DOM element, document or window including borders.<br>(Getting the size of the viewport if <code>document</code> is given)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// &lt;div style=&quot;width: 200px; height: 300px; margin: 10px; border: 2px solid;&quot; /&gt;</span>
<span class="hljs-title function_">outerSize</span>(div) <span class="hljs-comment">// --&gt; { width: 224, height: 324 }</span>

<span class="hljs-title function_">outerSize</span>(<span class="hljs-variable language_">document</span>) <span class="hljs-comment">// --&gt; [size of the viewport]</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Object describing width and height of the element</p>
`,typesMarkdown:``}]},{name:`parseSelector`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">parseSelector</span>(<span class="hljs-attr" title="The CSS selector to parse">selector</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_" data-custom-type="SelectorParsing">SelectorParsing</span>
</code></pre>`,comment:`<p>Parses CSS a selector string into a structured object</p>
`,examples:[],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The attribute parsing mapping</p>
<pre><code class="hljs language-ts"><span class="hljs-title function_">parseSelector</span>(<span class="hljs-string">&#x27;.my-elm[name=test]&#x27;</span>) <span class="hljs-comment">// --&gt; { tagName: &#x27;div&#x27;, attributes: { name: &#x27;test&#x27;, class: &#x27;my-elm&#x27; }, attributeList: [&#x27;name&#x27;, &#x27;class&#x27;] }</span>
<span class="hljs-title function_">parseSelector</span>(<span class="hljs-string">&#x27;input[type=submit]&#x27;</span>) <span class="hljs-comment">// --&gt; { tagName: &#x27;input&#x27;, attributes: { type: &#x27;submit&#x27; }, attributeList: [&#x27;type&#x27;] }</span>
</code></pre>`,typesMarkdown:``}]},{name:`position`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">position</span>(<span class="hljs-attr" title="The DOM element to find the position of">elm</span>: <span class="hljs-title class_">HTMLElement</span>): <span class="hljs-title class_" data-custom-type="PositionData">PositionData</span>
</code></pre>`,comment:`<p>Get the current absolute position of a DOM element and optionally also the relative position (position relative to offset parent)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// Returns a 0 position</span>
<span class="hljs-title function_">position</span>(<span class="hljs-literal">null</span>);

<span class="hljs-comment">// Basically returns the size of the element, as top and left will be 0</span>
<span class="hljs-title function_">position</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>);
<span class="hljs-title function_">position</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>);

<span class="hljs-comment">// Get the position of a given element</span>
<span class="hljs-title function_">position</span>(<span class="hljs-title class_">MyElm</span>);
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : the position information of the element</p>
`,typesMarkdown:``}]},{name:`prepend`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">prepend</span>(<span class="hljs-attr" title="The DOM element to prepend to">elm</span>: <span class="hljs-title class_">Element</span>, <span class="hljs-attr" title="DOM element or HTML (or selector) to prepend to">insertElm</span>: <span class="hljs-built_in">string</span> | <span class="hljs-title class_">Node</span>): <span class="hljs-title class_">Element</span>
</code></pre>`,comment:`<p>Append DOM element or plain HTML to the beginning of a given DOM element</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">prepend</span>(<span class="hljs-title class_">MyNode</span>, <span class="hljs-title class_">NodeToPrepend</span>)
<span class="hljs-title function_">prepend</span>(<span class="hljs-title class_">MyNode</span>, <span class="hljs-string">&#x27;&lt;span&gt;prepended&lt;/span&gt;&#x27;</span>)
<span class="hljs-title function_">prepend</span>(<span class="hljs-title class_">MyNode</span>, <span class="hljs-string">&#x27;.my-prepended-element&#x27;</span>)
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The inserted child element</p>
`,typesMarkdown:``}]},{name:`previousSiblings`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">previousSiblings</span>(<span class="hljs-attr" title="DOM element to find siblings of">elm</span>: <span class="hljs-title class_">Element</span>): <span class="hljs-title class_">Element</span>[]
</code></pre>`,comment:`<p>Get all sibling elements before a given DOM element in the structure</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">previousSiblings</span>(someElement);
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Collection of sibling elements</p>
`,typesMarkdown:``}]},{name:`removeClass`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">removeClass</span>(<span class="hljs-attr" title="HTML ELement to remove class names from">elm</span>: <span class="hljs-title class_">Element</span>, <span class="hljs-attr" title="Class names to remove">classNames</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[]): <span class="hljs-title class_">Element</span>
</code></pre>`,comment:`<p>Remove one or multiple class names from a DOM element</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// &lt;div class=&quot;active open&quot; /&gt;</span>
<span class="hljs-title function_">removeClass</span>(<span class="hljs-title class_">MyNode</span>, <span class="hljs-string">&#x27;active&#x27;</span>) <span class="hljs-comment">// --&gt; &lt;div class=&quot;open&quot; /&gt;</span>
<span class="hljs-title function_">removeClass</span>(<span class="hljs-title class_">MyNode</span>, [<span class="hljs-string">&#x27;active&#x27;</span>, <span class="hljs-string">&#x27;open&#x27;</span>]) <span class="hljs-comment">// --&gt; &lt;div class=&quot;&quot; /&gt;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Returns element given in &#39;elm&#39;</p>
`,typesMarkdown:``}]},{name:`replaceClass`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">replaceClass</span>(<span class="hljs-attr" title="HTML ELement to remove class names from">elm</span>: <span class="hljs-title class_">Element</span>, <span class="hljs-attr" title="Class names to remove">classNames</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[], <span class="hljs-attr">replacements</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[]): <span class="hljs-title class_">Element</span>
</code></pre>`,comment:`<p>Replaces css class with another on a DOM element.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// &lt;div class=&quot;active open&quot; /&gt;</span>
<span class="hljs-title function_">replaceClass</span>(<span class="hljs-title class_">MyNode</span>, <span class="hljs-string">&#x27;active&#x27;</span>, <span class="hljs-string">&#x27;inactive&#x27;</span>) <span class="hljs-comment">// --&gt; &lt;div class=&quot;inactive open&quot; /&gt;</span>
<span class="hljs-title function_">replaceClass</span>(<span class="hljs-title class_">MyNode</span>, [<span class="hljs-string">&#x27;active&#x27;</span>, <span class="hljs-string">&#x27;open&#x27;</span>], [<span class="hljs-string">&#x27;inactive&#x27;</span>, <span class="hljs-string">&#x27;closed&#x27;</span>]) <span class="hljs-comment">// --&gt; &lt;div class=&quot;inactive closed&quot; /&gt;</span>
<span class="hljs-title function_">replaceClass</span>(<span class="hljs-title class_">MyNode</span>, <span class="hljs-string">&#x27;active&#x27;</span>, [<span class="hljs-string">&#x27;inactive&#x27;</span>, <span class="hljs-string">&#x27;removed&#x27;</span>]) <span class="hljs-comment">// --&gt; &lt;div class=&quot;inactive removed open&quot; /&gt;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Returns element given in &#39;elm&#39;</p>
`,typesMarkdown:``}]},{name:`replaceNode`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">replaceNode</span>(<span class="hljs-attr" title="DOM element to replace">elm</span>: <span class="hljs-title class_">Node</span>, <span class="hljs-attr" title="DOM element or plain HTML string to replace {elm}">replacement</span>?: <span class="hljs-built_in">string</span> | <span class="hljs-title class_">Node</span>): <span class="hljs-built_in">void</span> | <span class="hljs-title class_">Node</span>
</code></pre>`,comment:`<p>Replace a given DOM element with another DOM element or plain HTML string</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// &lt;div&gt;&lt;span id=&#x27;a&#x27; /&gt;&lt;/div&gt;</span>
<span class="hljs-title function_">replaceNode</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;a&#x27;</span>), <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;p&#x27;</span>)) <span class="hljs-comment">// --&gt; &lt;div&gt;&lt;p /&gt;&lt;/div&gt;</span>
<span class="hljs-title function_">replaceNode</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;a&#x27;</span>), <span class="hljs-string">&#x27;p.p&#x27;</span>) <span class="hljs-comment">// --&gt; &lt;div&gt;&lt;p class=&quot;p&quot; /&gt;&lt;/div&gt;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The value given in <code>elm</code></p>
`,typesMarkdown:``}]},{name:`scrollInfo`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">scrollInfo</span>(<span class="hljs-attr" title="The element to find the scrolling position from">elm</span>?: <span class="hljs-title class_">Element</span> | <span class="hljs-title class_">Document</span> | <span class="hljs-title class_" data-custom-type="GeneralWindow">GeneralWindow</span>): <span class="hljs-title class_" data-custom-type="ScrollInfo">ScrollInfo</span>
</code></pre>`,comment:`<p>Gather the current scroll position information of a DOM element or the window</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">scrollInfo</span>(<span class="hljs-variable language_">window</span>)
<span class="hljs-title function_">scrollInfo</span>(<span class="hljs-variable language_">document</span>)
<span class="hljs-title function_">scrollInfo</span>(<span class="hljs-title class_">MyElm</span>)
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The scroll information</p>
`,typesMarkdown:``}]},{name:`scrollParent`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">scrollParent</span>(<span class="hljs-attr" title="The element whose scroll parent is determined">elm</span>: <span class="hljs-title class_">Element</span>): <span class="hljs-title class_">Element</span> | <span class="hljs-title class_">HTMLElement</span>
</code></pre>`,comment:`<p>Get the parent element that has scrolling</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">scrollParent</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">body</span>) <span class="hljs-comment">// --&gt; \`&lt;html&gt;\`</span>

<span class="hljs-comment">// &lt;div style=&quot;overflow:auto&quot;&gt;&lt;p id=&quot;P&quot; /&gt;&lt;/div&gt;</span>
<span class="hljs-title function_">scrollParent</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;P&#x27;</span>)) <span class="hljs-comment">// --&gt; \`&lt;div&gt;\`</span>

<span class="hljs-comment">// &lt;div style=&quot;overflow:auto&quot;&gt;&lt;p id=&quot;P&quot; style=&quot;position: fixed&quot; /&gt;&lt;/div&gt;</span>
<span class="hljs-title function_">scrollParent</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;P&#x27;</span>)) <span class="hljs-comment">// --&gt; \`&lt;html&gt;\`</span>

<span class="hljs-comment">// &lt;div style=&quot;overflow:auto&quot;&gt;&lt;p id=&quot;P&quot; style=&quot;position: absolute&quot; /&gt;&lt;/div&gt;</span>
<span class="hljs-title function_">scrollParent</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;P&#x27;</span>)) <span class="hljs-comment">// --&gt; \`&lt;html&gt;\`</span>

<span class="hljs-comment">// &lt;div style=&quot;overflow:auto; position: relative&quot;&gt;&lt;p id=&quot;P&quot; style=&quot;position: absolute&quot; /&gt;&lt;/div&gt;</span>
<span class="hljs-title function_">scrollParent</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;P&#x27;</span>)) <span class="hljs-comment">// --&gt; \`&lt;div&gt;\`</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The scroll parent or the viewport</p>
`,typesMarkdown:``}]},{name:`selectorToHTML`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">selectorToHTML</span>(<span class="hljs-attr" title="The CSS selector to convert">selector</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">string</span>
</code></pre>`,comment:`<p>Converts a given CSS selector into HTML<br>(No this is not an Emmet substitute, so it is limited to only one element)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">selectorToHTML</span>(<span class="hljs-string">&#x27;#id.class-name&#x27;</span>); <span class="hljs-comment">// --&gt; &#x27;&lt;div id=&quot;id&quot; class=&quot;class-name&quot; /&gt;&#x27;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The parsed HTML</p>
`,typesMarkdown:``}]},{name:`siblings`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">siblings</span>(<span class="hljs-attr" title="DOM element to find siblings of">elm</span>: <span class="hljs-title class_">Element</span>): <span class="hljs-title class_">Element</span>[]
</code></pre>`,comment:`<p>Get all sibling elements of a given DOM element</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">siblings</span>(someElement);
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Collection of sibling elements</p>
`,typesMarkdown:``}]},{name:`toDOM`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">toDOM</span>(<span class="hljs-attr" title="HTML string to transform into nodes">html</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_">HTMLCollection</span>
</code></pre>`,comment:`<p>Convert HTML into DOM node(s)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// HTML cannot be parsed easily</span>
<span class="hljs-title function_">toDOM</span>(<span class="hljs-string">&#x27;&lt;html&gt;&lt;body&gt;&lt;div /&gt;&lt;/body&gt;&lt;/html&gt;&#x27;</span>); <span class="hljs-comment">// --&gt; null</span>

<span class="hljs-comment">// Convert a given HTML string to HTML</span>
<span class="hljs-title function_">toDOM</span>(<span class="hljs-string">&#x27;&lt;div&gt;&lt;a&gt;link&lt;/a&gt;&lt;/div&gt;&#x27;</span>)
<span class="hljs-comment">// --&gt; &lt;div&gt;&lt;a&gt;link&lt;/a&gt;&lt;/div&gt;</span>
</code></pre>`],remarks:[`<p>To keep the method simple and short, this method uses the <code>&lt;template /&gt;</code><br>element to convert the HTML. For older browsers, either<br>use a polyfill like <code>@webcomponents/template</code> or a more elaborate HTML parser<br>(like <code>parsehtml</code> or <code>html-parser</code>)</p>
`],descriptions:`<p><span class="hljs-doctag">@returns</span> : DOM elements that the HTML represented</p>
`,typesMarkdown:``}]},{name:`toggleClass`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">toggleClass</span>(<span class="hljs-attr" title="DOM element to toggle class names from">elm</span>: <span class="hljs-title class_">Element</span>, <span class="hljs-attr" title="Class names to toggle">classNames</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[], <span class="hljs-attr" title="Force to add/remove the given class names (true = add, false = remove)">force</span>?: <span class="hljs-built_in">boolean</span>): <span class="hljs-title class_">Element</span>
</code></pre>`,comment:`<p>Toggles (add/remove) one or multiple class names on a DOM element</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// &lt;div class=&quot;active open&quot; /&gt;</span>
<span class="hljs-title function_">toggleClass</span>(<span class="hljs-title class_">MyNode</span>, <span class="hljs-string">&#x27;active&#x27;</span>) <span class="hljs-comment">// --&gt; &lt;div class=&quot;open&quot; /&gt;</span>
<span class="hljs-title function_">toggleClass</span>(<span class="hljs-title class_">MyNode</span>, [<span class="hljs-string">&#x27;active&#x27;</span>, <span class="hljs-string">&#x27;open&#x27;</span>]) <span class="hljs-comment">// --&gt; &lt;div class=&quot;active&quot; /&gt;</span>

<span class="hljs-comment">// &lt;div class=&quot;active open&quot; /&gt;</span>
<span class="hljs-title function_">toggleClass</span>(<span class="hljs-title class_">MyNode</span>, <span class="hljs-string">&#x27;active&#x27;</span>, <span class="hljs-literal">true</span>) <span class="hljs-comment">// --&gt; &lt;div class=&quot;active open&quot; /&gt;</span>
<span class="hljs-title function_">toggleClass</span>(<span class="hljs-title class_">MyNode</span>, <span class="hljs-string">&#x27;active&#x27;</span>, <span class="hljs-literal">false</span>) <span class="hljs-comment">// --&gt; &lt;div class=&quot;open&quot; /&gt;</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The given <code>elm</code></p>
`,typesMarkdown:``}]},{name:`trigger`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">trigger</span>(<span class="hljs-attr" title="DOM element to trigger the event on">elm</span>: <span class="hljs-title class_">EventTarget</span>, <span class="hljs-attr" title="Event names to trigger">eventNames</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[], <span class="hljs-attr" title="Extra data to add to the triggered event">data</span>?: <span class="hljs-built_in">unknown</span>): <span class="hljs-title class_">EventTarget</span>
</code></pre>`,comment:`<p>Trigger one or more events on a given DOM element.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">trigger</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;click&#x27;</span>)
<span class="hljs-title function_">trigger</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;my-event&#x27;</span>, { <span class="hljs-title class_">SomeEntry</span>: <span class="hljs-literal">true</span> })
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The &#39;elm&#39; (or document)</p>
`,typesMarkdown:``},{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">trigger</span>(<span class="hljs-attr" title="Event names to trigger">eventNames</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[], <span class="hljs-attr" title="Extra data to add to the triggered event">data</span>?: <span class="hljs-built_in">unknown</span>): <span class="hljs-title class_">Document</span>
</code></pre>`,comment:`<p>Trigger one or more events on Document.</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">trigger</span>(<span class="hljs-string">&#x27;click&#x27;</span>)
<span class="hljs-title function_">trigger</span>(<span class="hljs-string">&#x27;my-event&#x27;</span>, { <span class="hljs-title class_">SomeEntry</span>: <span class="hljs-literal">true</span> })
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The &#39;elm&#39; (or document)</p>
`,typesMarkdown:``}]},{name:`uniqueNodeList`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">uniqueNodeList</span>&lt;T <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Element</span>&gt;(<span class="hljs-attr">args</span>: (T | T[] | <span class="hljs-title class_">NodeListOf</span>&lt;T&gt; | <span class="hljs-title class_">HTMLCollectionOf</span>&lt;T&gt;)[]): T[]
</code></pre>`,comment:`<p>Make a unique list of Elements from on or multiple Element collections<br>(usually as a result of some element selection method)</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-keyword">const</span> <span class="hljs-title function_">byClassName</span> = (<span class="hljs-params">selector</span>) =&gt; <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementsByClassName</span>(selector)

<span class="hljs-comment">// Using a single selector</span>
<span class="hljs-title function_">findUniqueNodeCollection</span>(<span class="hljs-string">&#x27;my-elements&#x27;</span>, byClassName);

<span class="hljs-comment">// Using multiple selectors</span>
<span class="hljs-title function_">findUniqueNodeCollection</span>([<span class="hljs-string">&#x27;.my-element&#x27;</span>, <span class="hljs-string">&#x27;sone-other-elements&#x27;</span>], byClassName);
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The unique list of elements</p>
`,typesMarkdown:``}]},{name:`vendorPrefixed`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">vendorPrefixed</span>(<span class="hljs-attr" title="String to add vendor prefixes to">str</span>: <span class="hljs-built_in">string</span>): <span class="hljs-title class_" data-custom-type="VendorPrefixing">VendorPrefixing</span>
</code></pre>`,comment:`<p>Add vendor prefixes to a string</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">vendorPrefixed</span>(<span class="hljs-string">&#x27;backface-visibility&#x27;</span>)
<span class="hljs-comment">// [</span>
<span class="hljs-comment">//   { prefix: &#x27;&#x27;, js: &#x27;backfaceVisibility&#x27;, css: &#x27;backface-visibility&#x27; }</span>
<span class="hljs-comment">//   { prefix: &#x27;webkit&#x27;, js: &#x27;webkitBackfaceVisibility&#x27;, css: &#x27;-webkit-backface-visibility&#x27; }</span>
<span class="hljs-comment">//   { prefix: &#x27;moz&#x27;, js: &#x27;mozBackfaceVisibility&#x27;, css: &#x27;-moz-backface-visibility&#x27; }</span>
<span class="hljs-comment">//   { prefix: &#x27;ms&#x27;, js: &#x27;msBackfaceVisibility&#x27;, css: &#x27;-ms-backface-visibility&#x27; }</span>
<span class="hljs-comment">//   { prefix: &#x27;o&#x27;, js: &#x27;oBackfaceVisibility&#x27;, css: &#x27;-o-backface-visibility&#x27; }</span>
<span class="hljs-comment">// ]</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Array of the various vendor vendorPrefixed versions of the string</p>
`,typesMarkdown:``}]},{name:`viewport`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">viewport</span>(<span class="hljs-attr" title="Element to find the viewport element from">elm</span>?: <span class="hljs-title class_">Element</span> | <span class="hljs-title class_">Document</span> | <span class="hljs-title class_" data-custom-type="GeneralWindow">GeneralWindow</span>): <span class="hljs-title class_">HTMLElement</span>
</code></pre>`,comment:`<p>Get the current viewport element (scrolling element) of the current document, from a given element</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-comment">// Get the viewport of the current document</span>
<span class="hljs-title function_">viewport</span>();

<span class="hljs-comment">// Get the viewport of the current window</span>
<span class="hljs-title function_">viewport</span>(<span class="hljs-variable language_">window</span>);

<span class="hljs-comment">// Get the viewport of a given element</span>
<span class="hljs-title function_">viewport</span>(someElementInSomeDocument);
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : The viewport element</p>
`,typesMarkdown:``}]},{name:`visible`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">visible</span>(<span class="hljs-attr" title="DOM element to test">elm</span>: <span class="hljs-title class_">HTMLElement</span>): <span class="hljs-built_in">boolean</span>
</code></pre>`,comment:``,examples:[],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : Is the element visible for the user</p>
`,typesMarkdown:``}]},{name:`wrap`,functions:[{definition:`<pre><code class="hljs language-ts"><span class="hljs-title function_">wrap</span>(<span class="hljs-attr" title="DOM element to wrap with the given HTML">elm</span>: <span class="hljs-title class_">Element</span>, <span class="hljs-attr" title="The HTML, selector or element to wrap the given element with">wrapping</span>: <span class="hljs-built_in">string</span> | <span class="hljs-title class_">Element</span>): <span class="hljs-title class_">Element</span>
</code></pre>`,comment:`<p>Wrap a given element in the given HTML, selector or element</p>
`,examples:[`<pre><code class="hljs language-ts"><span class="hljs-title function_">wrap</span>(<span class="hljs-variable language_">document</span>.<span class="hljs-property">documentElement</span>, <span class="hljs-string">&#x27;&lt;div /&gt;&#x27;</span>) <span class="hljs-comment">// --&gt; false - you cannot wrap the &lt;html&gt; element</span>

<span class="hljs-title function_">wrap</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">createElement</span>(<span class="hljs-string">&#x27;div&#x27;</span>)) <span class="hljs-comment">// --&gt; true</span>
<span class="hljs-title function_">wrap</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;&lt;div class=&quot;wrap-element&quot;&gt;&lt;span&gt;&lt;b /&gt;&lt;/span&gt;&lt;/div&gt;&#x27;</span>) <span class="hljs-comment">// --&gt; true - element inserted into the &lt;b&gt; tag</span>
<span class="hljs-title function_">wrap</span>(<span class="hljs-title class_">MyElm</span>, <span class="hljs-string">&#x27;.wrap-element&#x27;</span>) <span class="hljs-comment">// --&gt; true</span>
</code></pre>`],remarks:[],descriptions:`<p><span class="hljs-doctag">@returns</span> : If the wrapping was successful or not</p>
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
</code></pre>`,moduleName:`types`},{name:`BoxModelMapping`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="BoxModelMapping">BoxModelMapping</span> = {
  <span class="hljs-comment">// The element’s border widths (top, left, bottom, right).</span>
  <span class="hljs-attr">border</span>: <span class="hljs-title class_" data-custom-type="BoxModelSectionMapping">BoxModelSectionMapping</span>
  <span class="hljs-comment">// The element’s margin sizes (top, left, bottom, right).</span>
  <span class="hljs-attr">margin</span>: <span class="hljs-title class_" data-custom-type="BoxModelSectionMapping">BoxModelSectionMapping</span>
  <span class="hljs-comment">// The element’s padding sizes (top, left, bottom, right).</span>
  <span class="hljs-attr">padding</span>: <span class="hljs-title class_" data-custom-type="BoxModelSectionMapping">BoxModelSectionMapping</span>
};
</code></pre>`,moduleName:`boxModel`},{name:`BoxModelSectionMapping`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="BoxModelSectionMapping">BoxModelSectionMapping</span> = {
  <span class="hljs-comment">// The size (in pixels) of the bottom side.</span>
  <span class="hljs-attr">bottom</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">// The size (in pixels) of the left side.</span>
  <span class="hljs-attr">left</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">// The size (in pixels) of the right side.</span>
  <span class="hljs-attr">right</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">// The size (in pixels) of the top side.</span>
  <span class="hljs-attr">top</span>: <span class="hljs-built_in">number</span>
};
</code></pre>`,moduleName:`boxModel`},{name:`ClassNamesInput`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="ClassNamesInput">ClassNamesInput</span> = <span class="hljs-title class_" data-custom-type="SimpleClassNameInput">SimpleClassNameInput</span> | <span class="hljs-title class_" data-custom-type="ClassNamesInput">ClassNamesInput</span>[];
</code></pre>`,moduleName:`classNameString`},{name:`SimpleClassNameInput`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="SimpleClassNameInput">SimpleClassNameInput</span> = <span class="hljs-built_in">string</span> | <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">boolean</span> | <span class="hljs-literal">undefined</span>&gt;;
</code></pre>`,moduleName:`classNameString`},{name:`CamelCaseCSSStyleDeclarationKeys`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="CamelCaseCSSStyleDeclarationKeys">CamelCaseCSSStyleDeclarationKeys</span> = { [K <span class="hljs-keyword">in</span> <span class="hljs-title class_" data-custom-type="CSSStyleDeclarationKeys">CSSStyleDeclarationKeys</span>]?: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> };
</code></pre>`,moduleName:`css`},{name:`CamelToKebab`,markdown:'<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="CamelToKebab">CamelToKebab</span> = S <span class="hljs-keyword">extends</span> <span class="hljs-string">`<span class="hljs-subst">${infer T}</span><span class="hljs-subst">${infer U}</span>`</span> ? U <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Uncapitalize</span>&lt;U&gt; ? <span class="hljs-string">`<span class="hljs-subst">${Lowercase&lt;T&gt;}</span><span class="hljs-subst">${CamelToKebab&lt;U&gt;}</span>`</span>: <span class="hljs-string">`<span class="hljs-subst">${Lowercase&lt;T&gt;}</span>-<span class="hljs-subst">${CamelToKebab&lt;U&gt;}</span>`</span>: S;\n</code></pre>',moduleName:`css`},{name:`CSSProperty`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="CSSProperty">CSSProperty</span> = keyof <span class="hljs-title class_" data-custom-type="CSSStyleProperties">CSSStyleProperties</span>;
</code></pre>`,moduleName:`css`},{name:`CSSStyleDeclarationKeys`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="CSSStyleDeclarationKeys">CSSStyleDeclarationKeys</span> = { [K <span class="hljs-keyword">in</span> keyof <span class="hljs-title class_">CSSStyleDeclaration</span>]: <span class="hljs-title class_">CSSStyleDeclaration</span>[K] <span class="hljs-title function_">extends</span> (<span class="hljs-attr">args</span>: <span class="hljs-built_in">unknown</span>[]) =&gt; <span class="hljs-built_in">unknown</span> ? <span class="hljs-attr">never</span>: K }[keyof <span class="hljs-title class_">CSSStyleDeclaration</span>];
</code></pre>`,moduleName:`css`},{name:`CSSStyleProperties`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="CSSStyleProperties">CSSStyleProperties</span> = <span class="hljs-title class_" data-custom-type="CamelCaseCSSStyleDeclarationKeys">CamelCaseCSSStyleDeclarationKeys</span> &amp; <span class="hljs-title class_" data-custom-type="KebabCaseCSSStyleDeclarationKeys">KebabCaseCSSStyleDeclarationKeys</span>;
</code></pre>`,moduleName:`css`},{name:`KebabCaseCSSStyleDeclarationKeys`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="KebabCaseCSSStyleDeclarationKeys">KebabCaseCSSStyleDeclarationKeys</span> = { [K <span class="hljs-keyword">in</span> <span class="hljs-title class_" data-custom-type="CSSStyleDeclarationKeys">CSSStyleDeclarationKeys</span>]?: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">number</span> };
</code></pre>`,moduleName:`css`},{name:`Args`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="Args">Args</span> = [<span class="hljs-attr">elm</span>: <span class="hljs-title class_" data-custom-type="Maybe">Maybe</span>&lt;<span class="hljs-title class_">Document</span> | <span class="hljs-title class_">HTMLElement</span>&gt;, <span class="hljs-attr">queries</span>: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[]];
</code></pre>`,moduleName:`findByQuery`},{name:`OneArgs`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="OneArgs">OneArgs</span> = [<span class="hljs-attr">elm</span>: <span class="hljs-title class_" data-custom-type="Args">Args</span>[<span class="hljs-number">0</span>], <span class="hljs-attr">query</span>: <span class="hljs-built_in">string</span>];
</code></pre>`,moduleName:`findByQuery`},{name:`PositionIndicator`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="PositionIndicator">PositionIndicator</span> = {
  <span class="hljs-comment">// Above the viewport area?</span>
  <span class="hljs-attr">above</span>: <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">// Below the viewport area?</span>
  <span class="hljs-attr">below</span>: <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">// Inside the viewport area?</span>
  <span class="hljs-attr">inside</span>: <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">// To the left of the viewport area?</span>
  <span class="hljs-attr">left</span>: <span class="hljs-built_in">boolean</span>
  <span class="hljs-comment">// To the right of the viewport area?</span>
  <span class="hljs-attr">right</span>: <span class="hljs-built_in">boolean</span>
};
</code></pre>`,moduleName:`inView`},{name:`ChildNodeParentProps`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="ChildNodeParentProps">ChildNodeParentProps</span> = <span class="hljs-string">&#x27;parentElement&#x27;</span> | <span class="hljs-string">&#x27;parentNode&#x27;</span>;
</code></pre>`,moduleName:`isDOMChildNode`},{name:`ChildNodeWithParent`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="ChildNodeWithParent">ChildNodeWithParent</span> = <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">ChildNode</span>, <span class="hljs-title class_" data-custom-type="ChildNodeParentProps">ChildNodeParentProps</span>&gt; &amp; { [K <span class="hljs-keyword">in</span> <span class="hljs-title class_" data-custom-type="ChildNodeParentProps">ChildNodeParentProps</span>]: <span class="hljs-title class_">HTMLElement</span>[K] };
</code></pre>`,moduleName:`isDOMChildNode`},{name:`HTMLChildElement`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="HTMLChildElement">HTMLChildElement</span> = <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">HTMLElement</span>, <span class="hljs-title class_" data-custom-type="HTMLElementParentProps">HTMLElementParentProps</span>&gt; &amp; { [K <span class="hljs-keyword">in</span> <span class="hljs-title class_" data-custom-type="HTMLElementParentProps">HTMLElementParentProps</span>]: <span class="hljs-title class_">HTMLElement</span>[K] };
</code></pre>`,moduleName:`isHTMLChildElement`},{name:`HTMLElementParentProps`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="HTMLElementParentProps">HTMLElementParentProps</span> = <span class="hljs-string">&#x27;offsetParent&#x27;</span> | <span class="hljs-string">&#x27;parentElement&#x27;</span> | <span class="hljs-string">&#x27;parentNode&#x27;</span>;
</code></pre>`,moduleName:`isHTMLChildElement`},{name:`OnOptions`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="OnOptions">OnOptions</span> = <span class="hljs-title class_">AddEventListenerOptions</span> &amp; {
  <span class="hljs-comment">// A selector that defines which element is the actual target of the event</span>
  <span class="hljs-attr">delegate</span>?: <span class="hljs-built_in">string</span>
  <span class="hljs-comment">// A method that returns true when the event should trigger</span>
  <span class="hljs-comment">// Combined with \`once\`, it will only remove the handler when \`when()\` resolves to true)</span>
  <span class="hljs-attr">when</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">event</span>: <span class="hljs-title class_" data-custom-type="ActualEvent">ActualEvent</span>&lt;E&gt;</span>) =&gt;</span> <span class="hljs-built_in">boolean</span>
};
</code></pre>`,moduleName:`on`},{name:`AttributeMapping`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="AttributeMapping">AttributeMapping</span> = <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span> | <span class="hljs-string">&#x27;true&#x27;</span>&gt; &amp; {
  <span class="hljs-comment">// Class name(s) of the tag</span>
  <span class="hljs-attr">class</span>?: <span class="hljs-title class_">Set</span>&lt;<span class="hljs-built_in">string</span>&gt;
};
</code></pre>`,moduleName:`parseSelector`},{name:`SelectorParsing`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="SelectorParsing">SelectorParsing</span> = {
  <span class="hljs-comment">// List of attributes on the tag</span>
  <span class="hljs-attr">attributeList</span>: <span class="hljs-built_in">string</span>[]
  <span class="hljs-comment">// Record of the tags final attributes</span>
  <span class="hljs-attr">attributes</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>&gt;
  <span class="hljs-comment">// Current tag name</span>
  <span class="hljs-attr">tagName</span>: <span class="hljs-built_in">string</span>
};
</code></pre>`,moduleName:`parseSelector`},{name:`Position`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="Position">Position</span> = {
  <span class="hljs-comment">// Number of pixels from the top to the bottom side of the element</span>
  <span class="hljs-attr">bottom</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">// Number of pixels from the left</span>
  <span class="hljs-attr">left</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">// Number of pixels from the left to the right side of the element</span>
  <span class="hljs-attr">right</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">// Number of pixels from the top</span>
  <span class="hljs-attr">top</span>: <span class="hljs-built_in">number</span>
};
</code></pre>`,moduleName:`position`},{name:`PositionData`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="PositionData">PositionData</span> = <span class="hljs-title class_" data-custom-type="Position">Position</span> &amp; {
  <span class="hljs-comment">// Position relative to the offset parent</span>
  <span class="hljs-attr">relative</span>?: <span class="hljs-title class_" data-custom-type="Position">Position</span>
};
</code></pre>`,moduleName:`position`},{name:`ScrollInfo`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="ScrollInfo">ScrollInfo</span> = {
  <span class="hljs-comment">// The horizontal scroll position</span>
  <span class="hljs-attr">x</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">// The maximum horizontal scroll position</span>
  <span class="hljs-attr">xMax</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">// The horizontal scroll percentage</span>
  <span class="hljs-attr">xPct</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">// The vertical scroll position</span>
  <span class="hljs-attr">y</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">// The maximum vertical scroll position</span>
  <span class="hljs-attr">yMax</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">// The vertical scroll percentage</span>
  <span class="hljs-attr">yPct</span>: <span class="hljs-built_in">number</span>
};
</code></pre>`,moduleName:`scrollInfo`},{name:`ActualEvent`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="ActualEvent">ActualEvent</span> = E <span class="hljs-keyword">extends</span> keyof <span class="hljs-title class_">DocumentEventMap</span> ? <span class="hljs-title class_">DocumentEventMap</span>[E]: <span class="hljs-title class_">CustomEvent</span>&lt;E&gt;;
</code></pre>`,moduleName:`types`},{name:`EventHandler`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="EventHandler">EventHandler</span> = <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">this</span>: <span class="hljs-title class_">EventSource</span> | <span class="hljs-title class_">EventTarget</span>, <span class="hljs-attr">event</span>: <span class="hljs-title class_" data-custom-type="ActualEvent">ActualEvent</span>&lt;E&gt;</span>) =&gt;</span> <span class="hljs-built_in">unknown</span>;
</code></pre>`,moduleName:`types`},{name:`EventName`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="EventName">EventName</span> = keyof <span class="hljs-title class_">DocumentEventMap</span> | <span class="hljs-built_in">string</span>;
</code></pre>`,moduleName:`types`},{name:`GeneralWindow`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="GeneralWindow">GeneralWindow</span> = <span class="hljs-title class_">Window</span> | <span class="hljs-variable language_">window</span>;
</code></pre>`,moduleName:`types`},{name:`GlobalWindow`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="GlobalWindow">GlobalWindow</span> = <span class="hljs-title class_">Window</span> &amp; globalThis;
</code></pre>`,moduleName:`types`},{name:`Size`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="Size">Size</span> = {
  <span class="hljs-comment">// Height in pixels</span>
  <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span>
  <span class="hljs-comment">// Width in pixels</span>
  <span class="hljs-attr">width</span>: <span class="hljs-built_in">number</span>
};
</code></pre>`,moduleName:`types`},{name:`VendorMicrosoft`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="VendorMicrosoft">VendorMicrosoft</span> = {
  <span class="hljs-comment">// The microsoft prefix for CSS properties</span>
  <span class="hljs-attr">css</span>: <span class="hljs-string">\`-ms-<span class="hljs-subst">\${<span class="hljs-built_in">string</span>}</span>\`</span>
  <span class="hljs-comment">// The microsoft prefix for JS methods</span>
  <span class="hljs-attr">js</span>: <span class="hljs-string">\`ms<span class="hljs-subst">\${<span class="hljs-built_in">string</span>}</span>\`</span>
  <span class="hljs-comment">// The microsoft prefix name</span>
  <span class="hljs-attr">prefix</span>: <span class="hljs-string">&#x27;ms&#x27;</span>
};
</code></pre>`,moduleName:`vendorPrefixed`},{name:`VendorMozilla`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="VendorMozilla">VendorMozilla</span> = {
  <span class="hljs-comment">// The mozilla prefix for CSS properties</span>
  <span class="hljs-attr">css</span>: <span class="hljs-string">\`-moz-<span class="hljs-subst">\${<span class="hljs-built_in">string</span>}</span>\`</span>
  <span class="hljs-comment">// The mozilla prefix for JS methods</span>
  <span class="hljs-attr">js</span>: <span class="hljs-string">\`moz<span class="hljs-subst">\${<span class="hljs-built_in">string</span>}</span>\`</span>
  <span class="hljs-comment">// The mozilla prefix name</span>
  <span class="hljs-attr">prefix</span>: <span class="hljs-string">&#x27;moz&#x27;</span>
};
</code></pre>`,moduleName:`vendorPrefixed`},{name:`VendorNone`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="VendorNone">VendorNone</span> = {
  <span class="hljs-comment">// CSS property without prefix</span>
  <span class="hljs-attr">css</span>: <span class="hljs-built_in">string</span>
  <span class="hljs-comment">// JS method without prefix</span>
  <span class="hljs-attr">js</span>: <span class="hljs-built_in">string</span>
  <span class="hljs-comment">// No prefix needed</span>
  <span class="hljs-attr">prefix</span>: <span class="hljs-string">&#x27;&#x27;</span>
};
</code></pre>`,moduleName:`vendorPrefixed`},{name:`VendorOpera`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="VendorOpera">VendorOpera</span> = {
  <span class="hljs-comment">// The opera prefix for CSS properties</span>
  <span class="hljs-attr">css</span>: <span class="hljs-string">\`-o-<span class="hljs-subst">\${<span class="hljs-built_in">string</span>}</span>\`</span>
  <span class="hljs-comment">// The opera prefix for JS methods</span>
  <span class="hljs-attr">js</span>: <span class="hljs-string">\`o<span class="hljs-subst">\${<span class="hljs-built_in">string</span>}</span>\`</span>
  <span class="hljs-comment">// The opera prefix name</span>
  <span class="hljs-attr">prefix</span>: <span class="hljs-string">&#x27;o&#x27;</span>
};
</code></pre>`,moduleName:`vendorPrefixed`},{name:`VendorPrefixing`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="VendorPrefixing">VendorPrefixing</span> = [<span class="hljs-title class_" data-custom-type="VendorNone">VendorNone</span>, <span class="hljs-title class_" data-custom-type="VendorWebkit">VendorWebkit</span>, <span class="hljs-title class_" data-custom-type="VendorMozilla">VendorMozilla</span>, <span class="hljs-title class_" data-custom-type="VendorMicrosoft">VendorMicrosoft</span>, <span class="hljs-title class_" data-custom-type="VendorOpera">VendorOpera</span>];
</code></pre>`,moduleName:`vendorPrefixed`},{name:`VendorWebkit`,markdown:`<pre><code class="hljs language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_" data-custom-type="VendorWebkit">VendorWebkit</span> = {
  <span class="hljs-comment">// The webkit prefix for CSS properties</span>
  <span class="hljs-attr">css</span>: <span class="hljs-string">\`-webkit-<span class="hljs-subst">\${<span class="hljs-built_in">string</span>}</span>\`</span>
  <span class="hljs-comment">// The webkit prefix for JS methods</span>
  <span class="hljs-attr">js</span>: <span class="hljs-string">\`webkit<span class="hljs-subst">\${<span class="hljs-built_in">string</span>}</span>\`</span>
  <span class="hljs-comment">// The webkit prefix name</span>
  <span class="hljs-attr">prefix</span>: <span class="hljs-string">&#x27;webkit&#x27;</span>
};
</code></pre>`,moduleName:`vendorPrefixed`}],n={modules:e,customTypes:t};export{t as customTypes,n as default,e as modules};