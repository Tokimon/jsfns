Object.setPrototypeOf(window, Window.prototype);

function getBorder(style) {
	const {
		border,
		borderWidth,
		borderTopWidth,
		borderLeftWidth,
		borderRightWidth,
		borderBottomWidth,
	} = style;

	let bT = 0;
	let bR = 0;
	let bB = 0;
	let bL = 0;

	const bMatch = /(\d+)px/.exec(border || '');
	if (bMatch) {
		const w = Number(bMatch[1]);
		bT = w;
		bR = w;
		bB = w;
		bL = w;
	}

	if (borderWidth) {
		const bw = borderWidth.split(' ');
		bT = Number.parseInt(bw[0]);
		bR = bw[1] ? Number.parseInt(bw[1]) : bT;
		bB = bw[2] ? Number.parseInt(bw[2]) : bT;
		bL = bw[3] ? Number.parseInt(bw[3]) : bR;
	}

	if (borderTopWidth) bT = Number.parseInt(borderTopWidth);
	if (borderLeftWidth) bL = Number.parseInt(borderLeftWidth);
	if (borderRightWidth) bR = Number.parseInt(borderRightWidth);
	if (borderBottomWidth) bB = Number.parseInt(borderBottomWidth);

	return { bT, bR, bB, bL };
}

Object.defineProperties(window.HTMLElement.prototype, {
	// offsetLeft: {
	//   get() { return parseFloat(this.style.marginLeft) || 0; }
	// },
	// offsetTop: {
	//   get() { return parseFloat(this.style.marginTop) || 0; }
	// },
	offsetHeight: {
		get() {
			return Number.parseInt(this.style.height) || 0;
		},
	},
	offsetWidth: {
		get() {
			return Number.parseInt(this.style.width) || 0;
		},
	},

	clientHeight: {
		get() {
			const { bT, bB } = getBorder(this.style);
			return this.offsetHeight - bT - bB;
		},
	},
	clientWidth: {
		get() {
			const { bR, bL } = getBorder(this.style);
			return this.offsetWidth - bR - bL;
		},
	},

	scrollHeight: {
		get() {
			return this.clientHeight + 50;
		},
	},
	scrollWidth: {
		get() {
			return this.clientWidth + 50;
		},
	},
});
