function Kt(t, e) {
	t.indexOf(e) === -1 && t.push(e)
}
const Pt = (t, e, n) => Math.min(Math.max(n, t), e),
	v = { duration: 0.3, delay: 0, endDelay: 0, repeat: 0, easing: 'ease' },
	B = (t) => typeof t == 'number',
	D = (t) => Array.isArray(t) && !B(t[0]),
	zt = (t, e, n) => {
		const i = e - t
		return ((((n - t) % i) + i) % i) + t
	}
function Gt(t, e) {
	return D(t) ? t[zt(0, t.length, e)] : t
}
const Rt = (t, e, n) => -n * t + n * e + t,
	Dt = () => {},
	A = (t) => t,
	rt = (t, e, n) => (e - t === 0 ? 1 : (n - t) / (e - t))
function xt(t, e) {
	const n = t[t.length - 1]
	for (let i = 1; i <= e; i++) {
		const r = rt(0, e, i)
		t.push(Rt(n, 1, r))
	}
}
function Zt(t) {
	const e = [0]
	return xt(e, t - 1), e
}
function Jt(t, e = Zt(t.length), n = A) {
	const i = t.length,
		r = i - e.length
	return (
		r > 0 && xt(e, r),
		(o) => {
			let c = 0
			for (; c < i - 2 && !(o < e[c + 1]); c++);
			let s = Pt(0, 1, rt(e[c], e[c + 1], o))
			return (s = Gt(n, c)(s)), Rt(t[c], t[c + 1], s)
		}
	)
}
const It = (t) => Array.isArray(t) && B(t[0]),
	Q = (t) => typeof t == 'object' && !!t.createAnimation,
	I = (t) => typeof t == 'function',
	Qt = (t) => typeof t == 'string',
	C = { ms: (t) => t * 1e3, s: (t) => t / 1e3 },
	kt = (t, e, n) => (((1 - 3 * n + 3 * e) * t + (3 * n - 6 * e)) * t + 3 * e) * t,
	te = 1e-7,
	ee = 12
function ne(t, e, n, i, r) {
	let o,
		c,
		s = 0
	do (c = e + (n - e) / 2), (o = kt(c, i, r) - t), o > 0 ? (n = c) : (e = c)
	while (Math.abs(o) > te && ++s < ee)
	return c
}
function M(t, e, n, i) {
	if (t === e && n === i) return A
	const r = (o) => ne(o, 0, 1, t, n)
	return (o) => (o === 0 || o === 1 ? o : kt(r(o), e, i))
}
const ie =
		(t, e = 'end') =>
		(n) => {
			n = e === 'end' ? Math.min(n, 0.999) : Math.max(n, 0.001)
			const i = n * t,
				r = e === 'end' ? Math.floor(i) : Math.ceil(i)
			return Pt(0, 1, r / t)
		},
	dt = {
		ease: M(0.25, 0.1, 0.25, 1),
		'ease-in': M(0.42, 0, 1, 1),
		'ease-in-out': M(0.42, 0, 0.58, 1),
		'ease-out': M(0, 0, 0.58, 1)
	},
	re = /\((.*?)\)/
function ft(t) {
	if (I(t)) return t
	if (It(t)) return M(...t)
	if (dt[t]) return dt[t]
	if (t.startsWith('steps')) {
		const e = re.exec(t)
		if (e) {
			const n = e[1].split(',')
			return ie(parseFloat(n[0]), n[1].trim())
		}
	}
	return A
}
class Ot {
	constructor(
		e,
		n = [0, 1],
		{
			easing: i,
			duration: r = v.duration,
			delay: o = v.delay,
			endDelay: c = v.endDelay,
			repeat: s = v.repeat,
			offset: l,
			direction: u = 'normal'
		} = {}
	) {
		if (
			((this.startTime = null),
			(this.rate = 1),
			(this.t = 0),
			(this.cancelTimestamp = null),
			(this.easing = A),
			(this.duration = 0),
			(this.totalDuration = 0),
			(this.repeat = 0),
			(this.playState = 'idle'),
			(this.finished = new Promise((a, f) => {
				;(this.resolve = a), (this.reject = f)
			})),
			(i = i || v.easing),
			Q(i))
		) {
			const a = i.createAnimation(n)
			;(i = a.easing), (n = a.keyframes || n), (r = a.duration || r)
		}
		;(this.repeat = s), (this.easing = D(i) ? A : ft(i)), this.updateDuration(r)
		const d = Jt(n, l, D(i) ? i.map(ft) : A)
		;(this.tick = (a) => {
			var f
			o = o
			let m = 0
			this.pauseTime !== void 0 ? (m = this.pauseTime) : (m = (a - this.startTime) * this.rate),
				(this.t = m),
				(m /= 1e3),
				(m = Math.max(m - o, 0)),
				this.playState === 'finished' && this.pauseTime === void 0 && (m = this.totalDuration)
			const g = m / this.duration
			let T = Math.floor(g),
				y = g % 1
			!y && g >= 1 && (y = 1), y === 1 && T--
			const q = T % 2
			;(u === 'reverse' || (u === 'alternate' && q) || (u === 'alternate-reverse' && !q)) &&
				(y = 1 - y)
			const k = m >= this.totalDuration ? 1 : Math.min(y, 1),
				P = d(this.easing(k))
			e(P),
				this.pauseTime === void 0 && (this.playState === 'finished' || m >= this.totalDuration + c)
					? ((this.playState = 'finished'),
					  (f = this.resolve) === null || f === void 0 || f.call(this, P))
					: this.playState !== 'idle' && (this.frameRequestId = requestAnimationFrame(this.tick))
		}),
			this.play()
	}
	play() {
		const e = performance.now()
		;(this.playState = 'running'),
			this.pauseTime !== void 0
				? (this.startTime = e - this.pauseTime)
				: this.startTime || (this.startTime = e),
			(this.cancelTimestamp = this.startTime),
			(this.pauseTime = void 0),
			(this.frameRequestId = requestAnimationFrame(this.tick))
	}
	pause() {
		;(this.playState = 'paused'), (this.pauseTime = this.t)
	}
	finish() {
		;(this.playState = 'finished'), this.tick(0)
	}
	stop() {
		var e
		;(this.playState = 'idle'),
			this.frameRequestId !== void 0 && cancelAnimationFrame(this.frameRequestId),
			(e = this.reject) === null || e === void 0 || e.call(this, !1)
	}
	cancel() {
		this.stop(), this.tick(this.cancelTimestamp)
	}
	reverse() {
		this.rate *= -1
	}
	commitStyles() {}
	updateDuration(e) {
		;(this.duration = e), (this.totalDuration = e * (this.repeat + 1))
	}
	get currentTime() {
		return this.t
	}
	set currentTime(e) {
		this.pauseTime !== void 0 || this.rate === 0
			? (this.pauseTime = e)
			: (this.startTime = performance.now() - e / this.rate)
	}
	get playbackRate() {
		return this.rate
	}
	set playbackRate(e) {
		this.rate = e
	}
}
class oe {
	setAnimation(e) {
		;(this.animation = e), e?.finished.then(() => this.clearAnimation()).catch(() => {})
	}
	clearAnimation() {
		this.animation = this.generator = void 0
	}
}
const z = new WeakMap()
function Mt(t) {
	return z.has(t) || z.set(t, { transforms: [], values: new Map() }), z.get(t)
}
function se(t, e) {
	return t.has(e) || t.set(e, new oe()), t.get(e)
}
const ae = ['', 'X', 'Y', 'Z'],
	ce = ['translate', 'scale', 'rotate', 'skew'],
	V = { x: 'translateX', y: 'translateY', z: 'translateZ' },
	mt = { syntax: '<angle>', initialValue: '0deg', toDefaultUnit: (t) => t + 'deg' },
	le = {
		translate: {
			syntax: '<length-percentage>',
			initialValue: '0px',
			toDefaultUnit: (t) => t + 'px'
		},
		rotate: mt,
		scale: { syntax: '<number>', initialValue: 1, toDefaultUnit: A },
		skew: mt
	},
	_ = new Map(),
	ot = (t) => `--motion-${t}`,
	X = ['x', 'y', 'z']
ce.forEach((t) => {
	ae.forEach((e) => {
		X.push(t + e), _.set(ot(t + e), le[t])
	})
})
const ue = (t, e) => X.indexOf(t) - X.indexOf(e),
	de = new Set(X),
	Ct = (t) => de.has(t),
	fe = (t, e) => {
		V[e] && (e = V[e])
		const { transforms: n } = Mt(t)
		Kt(n, e), (t.style.transform = me(n))
	},
	me = (t) => t.sort(ue).reduce(he, '').trim(),
	he = (t, e) => `${t} ${e}(var(${ot(e)}))`,
	tt = (t) => t.startsWith('--'),
	ht = new Set()
function pe(t) {
	if (!ht.has(t)) {
		ht.add(t)
		try {
			const { syntax: e, initialValue: n } = _.has(t) ? _.get(t) : {}
			CSS.registerProperty({ name: t, inherits: !1, syntax: e, initialValue: n })
		} catch {}
	}
}
const G = (t, e) => document.createElement('div').animate(t, e),
	pt = {
		cssRegisterProperty: () =>
			typeof CSS < 'u' && Object.hasOwnProperty.call(CSS, 'registerProperty'),
		waapi: () => Object.hasOwnProperty.call(Element.prototype, 'animate'),
		partialKeyframes: () => {
			try {
				G({ opacity: [1] })
			} catch {
				return !1
			}
			return !0
		},
		finished: () => !!G({ opacity: [0, 1] }, { duration: 0.001 }).finished,
		linearEasing: () => {
			try {
				G({ opacity: 0 }, { easing: 'linear(0, 1)' })
			} catch {
				return !1
			}
			return !0
		}
	},
	Z = {},
	R = {}
for (const t in pt) R[t] = () => (Z[t] === void 0 && (Z[t] = pt[t]()), Z[t])
const ge = 0.015,
	ye = (t, e) => {
		let n = ''
		const i = Math.round(e / ge)
		for (let r = 0; r < i; r++) n += t(rt(0, i - 1, r)) + ', '
		return n.substring(0, n.length - 2)
	},
	gt = (t, e) => (I(t) ? (R.linearEasing() ? `linear(${ye(t, e)})` : v.easing) : It(t) ? we(t) : t),
	we = ([t, e, n, i]) => `cubic-bezier(${t}, ${e}, ${n}, ${i})`
function ve(t, e) {
	for (let n = 0; n < t.length; n++) t[n] === null && (t[n] = n ? t[n - 1] : e())
	return t
}
const be = (t) => (Array.isArray(t) ? t : [t])
function et(t) {
	return V[t] && (t = V[t]), Ct(t) ? ot(t) : t
}
const H = {
	get: (t, e) => {
		e = et(e)
		let n = tt(e) ? t.style.getPropertyValue(e) : getComputedStyle(t)[e]
		if (!n && n !== 0) {
			const i = _.get(e)
			i && (n = i.initialValue)
		}
		return n
	},
	set: (t, e, n) => {
		;(e = et(e)), tt(e) ? t.style.setProperty(e, n) : (t.style[e] = n)
	}
}
function _t(t, e = !0) {
	if (!(!t || t.playState === 'finished'))
		try {
			t.stop ? t.stop() : (e && t.commitStyles(), t.cancel())
		} catch {}
}
function Te(t, e) {
	var n
	let i = e?.toDefaultUnit || A
	const r = t[t.length - 1]
	if (Qt(r)) {
		const o = ((n = r.match(/(-?[\d.]+)([a-z%]*)/)) === null || n === void 0 ? void 0 : n[2]) || ''
		o && (i = (c) => c + o)
	}
	return i
}
function Ee() {
	return window.__MOTION_DEV_TOOLS_RECORD
}
function Ae(t, e, n, i = {}, r) {
	const o = Ee(),
		c = i.record !== !1 && o
	let s,
		{
			duration: l = v.duration,
			delay: u = v.delay,
			endDelay: d = v.endDelay,
			repeat: a = v.repeat,
			easing: f = v.easing,
			persist: m = !1,
			direction: g,
			offset: T,
			allowWebkitAcceleration: y = !1
		} = i
	const q = Mt(t),
		k = Ct(e)
	let P = R.waapi()
	k && fe(t, e)
	const b = et(e),
		$ = se(q.values, b),
		E = _.get(b)
	return (
		_t($.animation, !(Q(f) && $.generator) && i.record !== !1),
		() => {
			const U = () => {
				var h, O
				return (O = (h = H.get(t, b)) !== null && h !== void 0 ? h : E?.initialValue) !== null &&
					O !== void 0
					? O
					: 0
			}
			let p = ve(be(n), U)
			const ut = Te(p, E)
			if (Q(f)) {
				const h = f.createAnimation(p, e !== 'opacity', U, b, $)
				;(f = h.easing), (p = h.keyframes || p), (l = h.duration || l)
			}
			if (
				(tt(b) && (R.cssRegisterProperty() ? pe(b) : (P = !1)),
				k && !R.linearEasing() && (I(f) || (D(f) && f.some(I))) && (P = !1),
				P)
			) {
				E && (p = p.map((S) => (B(S) ? E.toDefaultUnit(S) : S))),
					p.length === 1 && (!R.partialKeyframes() || c) && p.unshift(U())
				const h = {
					delay: C.ms(u),
					duration: C.ms(l),
					endDelay: C.ms(d),
					easing: D(f) ? void 0 : gt(f, l),
					direction: g,
					iterations: a + 1,
					fill: 'both'
				}
				;(s = t.animate({ [b]: p, offset: T, easing: D(f) ? f.map((S) => gt(S, l)) : void 0 }, h)),
					s.finished ||
						(s.finished = new Promise((S, Yt) => {
							;(s.onfinish = S), (s.oncancel = Yt)
						}))
				const O = p[p.length - 1]
				s.finished
					.then(() => {
						m || (H.set(t, b, O), s.cancel())
					})
					.catch(Dt),
					y || (s.playbackRate = 1.000001)
			} else if (r && k)
				(p = p.map((h) => (typeof h == 'string' ? parseFloat(h) : h))),
					p.length === 1 && p.unshift(parseFloat(U())),
					(s = new r(
						(h) => {
							H.set(t, b, ut ? ut(h) : h)
						},
						p,
						Object.assign(Object.assign({}, i), { duration: l, easing: f })
					))
			else {
				const h = p[p.length - 1]
				H.set(t, b, E && B(h) ? E.toDefaultUnit(h) : h)
			}
			return (
				c && o(t, e, p, { duration: l, delay: u, easing: f, repeat: a, offset: T }, 'motion-one'),
				$.setAnimation(s),
				s
			)
		}
	)
}
const Se = (t, e) => (t[e] ? Object.assign(Object.assign({}, t), t[e]) : Object.assign({}, t))
function Le(t, e) {
	return (
		typeof t == 'string' ? (t = document.querySelectorAll(t)) : t instanceof Element && (t = [t]),
		Array.from(t || [])
	)
}
const Pe = (t) => t(),
	Ft = (t, e, n = v.duration) =>
		new Proxy({ animations: t.map(Pe).filter(Boolean), duration: n, options: e }, De),
	Re = (t) => t.animations[0],
	De = {
		get: (t, e) => {
			const n = Re(t)
			switch (e) {
				case 'duration':
					return t.duration
				case 'currentTime':
					return C.s(n?.[e] || 0)
				case 'playbackRate':
				case 'playState':
					return n?.[e]
				case 'finished':
					return (
						t.finished || (t.finished = Promise.all(t.animations.map(xe)).catch(Dt)), t.finished
					)
				case 'stop':
					return () => {
						t.animations.forEach((i) => _t(i))
					}
				case 'forEachNative':
					return (i) => {
						t.animations.forEach((r) => i(r, t))
					}
				default:
					return typeof n?.[e] > 'u' ? void 0 : () => t.animations.forEach((i) => i[e]())
			}
		},
		set: (t, e, n) => {
			switch (e) {
				case 'currentTime':
					n = C.ms(n)
				case 'playbackRate':
					for (let i = 0; i < t.animations.length; i++) t.animations[i][e] = n
					return !0
			}
			return !1
		}
	},
	xe = (t) => t.finished
function Ie(t, e, n) {
	return I(t) ? t(e, n) : t
}
function ke(t) {
	return function (n, i, r = {}) {
		n = Le(n)
		const o = n.length,
			c = []
		for (let s = 0; s < o; s++) {
			const l = n[s]
			for (const u in i) {
				const d = Se(r, u)
				d.delay = Ie(d.delay, s, o)
				const a = Ae(l, u, i[u], d, t)
				c.push(a)
			}
		}
		return Ft(c, r, r.duration)
	}
}
const Oe = ke(Ot)
function Me(t, e = {}) {
	return Ft(
		[
			() => {
				const n = new Ot(t, [0, 1], e)
				return n.finished.catch(() => {}), n
			}
		],
		e,
		e.duration
	)
}
function Ce(t, e, n) {
	return (I(t) ? Me : Oe)(t, e, n)
}
document.addEventListener('click', (t) => {
	const e = document.getElementById('astro-header-drawer'),
		n = document.getElementById('astro-header-drawer-button')
	e?.contains(t.target) || n?.contains(t.target)
		? e?.classList.toggle('translate-x-96')
		: e?.classList.add('translate-x-96')
})
class _e extends HTMLElement {
	constructor() {
		super()
		const e = this.querySelector('button')
		e &&
			e.addEventListener('click', (n) => {
				if (n.currentTarget instanceof HTMLButtonElement) {
					let i = n.currentTarget.getAttribute('aria-pressed') === 'true',
						r = new CustomEvent('theme-change', { detail: { theme: i ? 'light' : 'dark' } })
					document.dispatchEvent(r), e.setAttribute('aria-pressed', String(!i))
				}
			})
	}
}
'customElements' in window && customElements.define('theme-toggle', _e)
const Fe = 'modulepreload',
	Ne = function (t) {
		return '/' + t
	},
	yt = {},
	qe = function (e, n, i) {
		let r = Promise.resolve()
		if (n && n.length > 0) {
			document.getElementsByTagName('link')
			const c = document.querySelector('meta[property=csp-nonce]'),
				s = c?.nonce || c?.getAttribute('nonce')
			r = Promise.allSettled(
				n.map((l) => {
					if (((l = Ne(l)), l in yt)) return
					yt[l] = !0
					const u = l.endsWith('.css'),
						d = u ? '[rel="stylesheet"]' : ''
					if (document.querySelector(`link[href="${l}"]${d}`)) return
					const a = document.createElement('link')
					if (
						((a.rel = u ? 'stylesheet' : Fe),
						u || (a.as = 'script'),
						(a.crossOrigin = ''),
						(a.href = l),
						s && a.setAttribute('nonce', s),
						document.head.appendChild(a),
						u)
					)
						return new Promise((f, m) => {
							a.addEventListener('load', f),
								a.addEventListener('error', () => m(new Error(`Unable to preload CSS for ${l}`)))
						})
				})
			)
		}
		function o(c) {
			const s = new Event('vite:preloadError', { cancelable: !0 })
			if (((s.payload = c), window.dispatchEvent(s), !s.defaultPrevented)) throw c
		}
		return r.then((c) => {
			for (const s of c || []) s.status === 'rejected' && o(s.reason)
			return e().catch(o)
		})
	}
class $e extends HTMLElement {
	constructor() {
		super()
		const e = this.querySelector('button[data-open-modal]'),
			n = this.querySelector('button[data-close-modal]'),
			i = this.querySelector('dialog'),
			r = this.querySelector('.dialog-frame'),
			o = (u) => {
				document.body.contains(u.target) && !r.contains(u.target) && l()
			},
			c = (u) => {
				if (u.key === 'Escape' && i.open) l(), window.removeEventListener('keydown', c)
				else return
			},
			s = (u) => {
				i.showModal(),
					Ce(
						'dialog',
						{
							clipPath: [
								'polygon(0 0, 100% 0, 100% -200%, -200% -200%)',
								'polygon(0 0, 100% 0, 100% 100%, 0% 100%)'
							],
							opacity: [0, 1]
						},
						{ duration: 0.2 }
					),
					document.body.classList.add('overflow-hidden'),
					this.querySelector('input')?.focus(),
					u?.stopPropagation(),
					window.addEventListener('click', o),
					window.addEventListener('keydown', c)
			},
			l = () => {
				i.close(),
					document.body.classList.remove('overflow-hidden'),
					window.removeEventListener('click', o),
					window.addEventListener('keydown', c)
			}
		e.addEventListener('click', s),
			(e.disabled = !1),
			n.addEventListener('click', l),
			document.addEventListener('astro:after-swap', l),
			window.addEventListener('keydown', (u) => {
				u.key === '/' && !i.open && (s(), u.preventDefault())
			}),
			window.addEventListener('DOMContentLoaded', () => {
				;(window.requestIdleCallback || ((d) => setTimeout(d, 1)))(async () => {
					const { PagefindUI: d } = await qe(async () => {
						const { PagefindUI: a } = await import('./ui-core.CQUEo8s8.js')
						return { PagefindUI: a }
					}, [])
					new d({
						element: '#pagefind__search',
						baseUrl: '/',
						bundlePath: '/'.replace(/\/$/, '') + '/pagefind/',
						showImages: !1
					})
				})
			})
	}
}
customElements.define('site-search', $e)
const x = 'data-astro-transition-persist'
function Ue(t) {
	for (const e of document.scripts)
		for (const n of t.scripts)
			if (
				!n.hasAttribute('data-astro-rerun') &&
				((!e.src && e.textContent === n.textContent) ||
					(e.src && e.type === n.type && e.src === n.src))
			) {
				n.dataset.astroExec = ''
				break
			}
}
function He(t) {
	const e = document.documentElement,
		n = [...e.attributes].filter(
			({ name: i }) => (e.removeAttribute(i), i.startsWith('data-astro-'))
		)
	;[...t.documentElement.attributes, ...n].forEach(({ name: i, value: r }) => e.setAttribute(i, r))
}
function Be(t) {
	for (const e of Array.from(document.head.children)) {
		const n = je(e, t)
		n ? n.remove() : e.remove()
	}
	document.head.append(...t.head.children)
}
function Ve(t, e) {
	e.replaceWith(t)
	for (const n of e.querySelectorAll(`[${x}]`)) {
		const i = n.getAttribute(x),
			r = t.querySelector(`[${x}="${i}"]`)
		r &&
			(r.replaceWith(n),
			r.localName === 'astro-island' &&
				We(n) &&
				!Ye(n, r) &&
				(n.setAttribute('ssr', ''), n.setAttribute('props', r.getAttribute('props'))))
	}
}
const Xe = () => {
		const t = document.activeElement
		if (t?.closest(`[${x}]`)) {
			if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) {
				const e = t.selectionStart,
					n = t.selectionEnd
				return () => J({ activeElement: t, start: e, end: n })
			}
			return () => J({ activeElement: t })
		} else return () => J({ activeElement: null })
	},
	J = ({ activeElement: t, start: e, end: n }) => {
		t &&
			(t.focus(),
			(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement) &&
				(typeof e == 'number' && (t.selectionStart = e),
				typeof n == 'number' && (t.selectionEnd = n)))
	},
	je = (t, e) => {
		const n = t.getAttribute(x),
			i = n && e.head.querySelector(`[${x}="${n}"]`)
		if (i) return i
		if (t.matches('link[rel=stylesheet]')) {
			const r = t.getAttribute('href')
			return e.head.querySelector(`link[rel=stylesheet][href="${r}"]`)
		}
		return null
	},
	We = (t) => {
		const e = t.dataset.astroTransitionPersistProps
		return e == null || e === 'false'
	},
	Ye = (t, e) => t.getAttribute('props') === e.getAttribute('props'),
	Ke = (t) => {
		Ue(t), He(t), Be(t)
		const e = Xe()
		Ve(t.body, document.body), e()
	},
	ze = 'astro:before-preparation',
	Ge = 'astro:after-preparation',
	Ze = 'astro:before-swap',
	Je = 'astro:after-swap',
	Qe = (t) => document.dispatchEvent(new Event(t))
class Nt extends Event {
	from
	to
	direction
	navigationType
	sourceElement
	info
	newDocument
	signal
	constructor(e, n, i, r, o, c, s, l, u, d) {
		super(e, n),
			(this.from = i),
			(this.to = r),
			(this.direction = o),
			(this.navigationType = c),
			(this.sourceElement = s),
			(this.info = l),
			(this.newDocument = u),
			(this.signal = d),
			Object.defineProperties(this, {
				from: { enumerable: !0 },
				to: { enumerable: !0, writable: !0 },
				direction: { enumerable: !0, writable: !0 },
				navigationType: { enumerable: !0 },
				sourceElement: { enumerable: !0 },
				info: { enumerable: !0 },
				newDocument: { enumerable: !0, writable: !0 },
				signal: { enumerable: !0 }
			})
	}
}
class tn extends Nt {
	formData
	loader
	constructor(e, n, i, r, o, c, s, l, u, d) {
		super(ze, { cancelable: !0 }, e, n, i, r, o, c, s, l),
			(this.formData = u),
			(this.loader = d.bind(this, this)),
			Object.defineProperties(this, {
				formData: { enumerable: !0 },
				loader: { enumerable: !0, writable: !0 }
			})
	}
}
class en extends Nt {
	direction
	viewTransition
	swap
	constructor(e, n) {
		super(
			Ze,
			void 0,
			e.from,
			e.to,
			e.direction,
			e.navigationType,
			e.sourceElement,
			e.info,
			e.newDocument,
			e.signal
		),
			(this.direction = e.direction),
			(this.viewTransition = n),
			(this.swap = () => Ke(this.newDocument)),
			Object.defineProperties(this, {
				direction: { enumerable: !0 },
				viewTransition: { enumerable: !0 },
				swap: { enumerable: !0, writable: !0 }
			})
	}
}
async function nn(t, e, n, i, r, o, c, s, l) {
	const u = new tn(t, e, n, i, r, o, window.document, c, s, l)
	return (
		document.dispatchEvent(u) &&
			(await u.loader(),
			u.defaultPrevented || (Qe(Ge), u.navigationType !== 'traverse' && st({ scrollX, scrollY }))),
		u
	)
}
function rn(t, e) {
	const n = new en(t, e)
	return document.dispatchEvent(n), n.swap(), n
}
const on = history.pushState.bind(history),
	j = history.replaceState.bind(history),
	st = (t) => {
		history.state && ((history.scrollRestoration = 'manual'), j({ ...history.state, ...t }, ''))
	},
	at = !!document.startViewTransition,
	ct = () => !!document.querySelector('[name="astro-view-transitions-enabled"]'),
	qt = (t, e) => t.pathname === e.pathname && t.search === e.search
let w, L, Y
const $t = (t) => document.dispatchEvent(new Event(t)),
	Ut = () => $t('astro:page-load'),
	sn = () => {
		let t = document.createElement('div')
		t.setAttribute('aria-live', 'assertive'),
			t.setAttribute('aria-atomic', 'true'),
			(t.className = 'astro-route-announcer'),
			document.body.append(t),
			setTimeout(() => {
				let e = document.title || document.querySelector('h1')?.textContent || location.pathname
				t.textContent = e
			}, 60)
	},
	wt = 'data-astro-transition-persist',
	vt = 'data-astro-transition',
	nt = 'data-astro-transition-fallback'
let bt,
	F = 0
history.state
	? ((F = history.state.index),
	  scrollTo({ left: history.state.scrollX, top: history.state.scrollY }))
	: ct() && (j({ index: F, scrollX, scrollY }, ''), (history.scrollRestoration = 'manual'))
async function an(t, e) {
	try {
		const n = await fetch(t, e),
			r = (n.headers.get('content-type') ?? '').split(';', 1)[0].trim()
		return r !== 'text/html' && r !== 'application/xhtml+xml'
			? null
			: { html: await n.text(), redirected: n.redirected ? n.url : void 0, mediaType: r }
	} catch {
		return null
	}
}
function Ht() {
	const t = document.querySelector('[name="astro-view-transitions-fallback"]')
	return t ? t.getAttribute('content') : 'animate'
}
function cn() {
	let t = Promise.resolve()
	for (const e of document.getElementsByTagName('script')) {
		if (e.dataset.astroExec === '') continue
		const n = e.getAttribute('type')
		if (n && n !== 'module' && n !== 'text/javascript') continue
		const i = document.createElement('script')
		i.innerHTML = e.innerHTML
		for (const r of e.attributes) {
			if (r.name === 'src') {
				const o = new Promise((c) => {
					i.onload = i.onerror = c
				})
				t = t.then(() => o)
			}
			i.setAttribute(r.name, r.value)
		}
		;(i.dataset.astroExec = ''), e.replaceWith(i)
	}
	return t
}
const Bt = (t, e, n, i, r) => {
	const o = qt(e, t),
		c = document.title
	document.title = i
	let s = !1
	if (t.href !== location.href && !r)
		if (n.history === 'replace') {
			const l = history.state
			j({ ...n.state, index: l.index, scrollX: l.scrollX, scrollY: l.scrollY }, '', t.href)
		} else on({ ...n.state, index: ++F, scrollX: 0, scrollY: 0 }, '', t.href)
	if (
		((document.title = c),
		(Y = t),
		o || (scrollTo({ left: 0, top: 0, behavior: 'instant' }), (s = !0)),
		r)
	)
		scrollTo(r.scrollX, r.scrollY)
	else {
		if (t.hash) {
			history.scrollRestoration = 'auto'
			const l = history.state
			;(location.href = t.href),
				history.state || (j(l, ''), o && window.dispatchEvent(new PopStateEvent('popstate')))
		} else s || scrollTo({ left: 0, top: 0, behavior: 'instant' })
		history.scrollRestoration = 'manual'
	}
}
function ln(t) {
	const e = []
	for (const n of t.querySelectorAll('head link[rel=stylesheet]'))
		if (
			!document.querySelector(
				`[${wt}="${n.getAttribute(wt)}"], link[rel=stylesheet][href="${n.getAttribute('href')}"]`
			)
		) {
			const i = document.createElement('link')
			i.setAttribute('rel', 'preload'),
				i.setAttribute('as', 'style'),
				i.setAttribute('href', n.getAttribute('href')),
				e.push(
					new Promise((r) => {
						;['load', 'error'].forEach((o) => i.addEventListener(o, r)), document.head.append(i)
					})
				)
		}
	return e
}
async function Tt(t, e, n, i, r) {
	async function o(l) {
		function u(m) {
			const g = m.effect
			return !g || !(g instanceof KeyframeEffect) || !g.target
				? !1
				: window.getComputedStyle(g.target, g.pseudoElement).animationIterationCount === 'infinite'
		}
		const d = document.getAnimations()
		document.documentElement.setAttribute(nt, l)
		const f = document.getAnimations().filter((m) => !d.includes(m) && !u(m))
		return Promise.allSettled(f.map((m) => m.finished))
	}
	if (r === 'animate' && !n.transitionSkipped && !t.signal.aborted)
		try {
			await o('old')
		} catch {}
	const c = document.title,
		s = rn(t, n.viewTransition)
	Bt(s.to, s.from, e, c, i),
		$t(Je),
		r === 'animate' &&
			(!n.transitionSkipped && !s.signal.aborted
				? o('new').finally(() => n.viewTransitionFinished())
				: n.viewTransitionFinished())
}
function un() {
	return w?.controller.abort(), (w = { controller: new AbortController() })
}
async function Vt(t, e, n, i, r) {
	const o = un()
	if (!ct() || location.origin !== n.origin) {
		o === w && (w = void 0), (location.href = n.href)
		return
	}
	const c = r ? 'traverse' : i.history === 'replace' ? 'replace' : 'push'
	if (
		(c !== 'traverse' && st({ scrollX, scrollY }),
		qt(e, n) && ((t !== 'back' && n.hash) || (t === 'back' && e.hash)))
	) {
		Bt(n, e, i, document.title, r), o === w && (w = void 0)
		return
	}
	const s = await nn(e, n, t, c, i.sourceElement, i.info, o.controller.signal, i.formData, l)
	if (s.defaultPrevented || s.signal.aborted) {
		o === w && (w = void 0), s.signal.aborted || (location.href = n.href)
		return
	}
	async function l(a) {
		const f = a.to.href,
			m = { signal: a.signal }
		if (a.formData) {
			m.method = 'POST'
			const y =
				a.sourceElement instanceof HTMLFormElement
					? a.sourceElement
					: a.sourceElement instanceof HTMLElement && 'form' in a.sourceElement
					? a.sourceElement.form
					: a.sourceElement?.closest('form')
			m.body =
				y?.attributes.getNamedItem('enctype')?.value === 'application/x-www-form-urlencoded'
					? new URLSearchParams(a.formData)
					: a.formData
		}
		const g = await an(f, m)
		if (g === null) {
			a.preventDefault()
			return
		}
		if (g.redirected) {
			const y = new URL(g.redirected)
			if (y.origin !== a.to.origin) {
				a.preventDefault()
				return
			}
			a.to = y
		}
		if (
			((bt ??= new DOMParser()),
			(a.newDocument = bt.parseFromString(g.html, g.mediaType)),
			a.newDocument.querySelectorAll('noscript').forEach((y) => y.remove()),
			!a.newDocument.querySelector('[name="astro-view-transitions-enabled"]') && !a.formData)
		) {
			a.preventDefault()
			return
		}
		const T = ln(a.newDocument)
		T.length && !a.signal.aborted && (await Promise.all(T))
	}
	async function u() {
		if (L && L.viewTransition) {
			try {
				L.viewTransition.skipTransition()
			} catch {}
			try {
				await L.viewTransition.updateCallbackDone
			} catch {}
		}
		return (L = { transitionSkipped: !1 })
	}
	const d = await u()
	if (s.signal.aborted) {
		o === w && (w = void 0)
		return
	}
	if ((document.documentElement.setAttribute(vt, s.direction), at))
		d.viewTransition = document.startViewTransition(async () => await Tt(s, i, d, r))
	else {
		const a = (async () => {
			await Promise.resolve(), await Tt(s, i, d, r, Ht())
		})()
		d.viewTransition = {
			updateCallbackDone: a,
			ready: a,
			finished: new Promise((f) => (d.viewTransitionFinished = f)),
			skipTransition: () => {
				;(d.transitionSkipped = !0), document.documentElement.removeAttribute(nt)
			}
		}
	}
	d.viewTransition?.updateCallbackDone.finally(async () => {
		await cn(), Ut(), sn()
	}),
		d.viewTransition?.finished.finally(() => {
			;(d.viewTransition = void 0),
				d === L && (L = void 0),
				o === w && (w = void 0),
				document.documentElement.removeAttribute(vt),
				document.documentElement.removeAttribute(nt)
		})
	try {
		await d.viewTransition?.updateCallbackDone
	} catch (a) {
		const f = a
		console.log('[astro]', f.name, f.message, f.stack)
	}
}
async function Et(t, e) {
	await Vt('forward', Y, new URL(t, location.href), e ?? {})
}
function dn(t) {
	if (!ct() && t.state) {
		location.reload()
		return
	}
	if (t.state === null) return
	const e = history.state,
		n = e.index,
		i = n > F ? 'forward' : 'back'
	;(F = n), Vt(i, Y, new URL(location.href), {}, e)
}
const At = () => {
	history.state &&
		(scrollX !== history.state.scrollX || scrollY !== history.state.scrollY) &&
		st({ scrollX, scrollY })
}
{
	if (at || Ht() !== 'none')
		if (
			((Y = new URL(location.href)),
			addEventListener('popstate', dn),
			addEventListener('load', Ut),
			'onscrollend' in window)
		)
			addEventListener('scrollend', At)
		else {
			let t, e, n, i
			const r = () => {
				if (i !== history.state?.index) {
					clearInterval(t), (t = void 0)
					return
				}
				if (e === scrollY && n === scrollX) {
					clearInterval(t), (t = void 0), At()
					return
				} else (e = scrollY), (n = scrollX)
			}
			addEventListener(
				'scroll',
				() => {
					t === void 0 &&
						((i = history.state.index),
						(e = scrollY),
						(n = scrollX),
						(t = window.setInterval(r, 50)))
				},
				{ passive: !0 }
			)
		}
	for (const t of document.getElementsByTagName('script')) t.dataset.astroExec = ''
}
const Xt = new Set(),
	W = new WeakSet()
let it,
	jt,
	St = !1
function fn(t) {
	St ||
		((St = !0),
		(it ??= t?.prefetchAll),
		(jt ??= t?.defaultStrategy ?? 'hover'),
		mn(),
		hn(),
		pn(),
		yn())
}
function mn() {
	for (const t of ['touchstart', 'mousedown'])
		document.body.addEventListener(
			t,
			(e) => {
				N(e.target, 'tap') && K(e.target.href, { ignoreSlowConnection: !0 })
			},
			{ passive: !0 }
		)
}
function hn() {
	let t
	document.body.addEventListener(
		'focusin',
		(i) => {
			N(i.target, 'hover') && e(i)
		},
		{ passive: !0 }
	),
		document.body.addEventListener('focusout', n, { passive: !0 }),
		lt(() => {
			for (const i of document.getElementsByTagName('a'))
				W.has(i) ||
					(N(i, 'hover') &&
						(W.add(i),
						i.addEventListener('mouseenter', e, { passive: !0 }),
						i.addEventListener('mouseleave', n, { passive: !0 })))
		})
	function e(i) {
		const r = i.target.href
		t && clearTimeout(t),
			(t = setTimeout(() => {
				K(r)
			}, 80))
	}
	function n() {
		t && (clearTimeout(t), (t = 0))
	}
}
function pn() {
	let t
	lt(() => {
		for (const e of document.getElementsByTagName('a'))
			W.has(e) || (N(e, 'viewport') && (W.add(e), (t ??= gn()), t.observe(e)))
	})
}
function gn() {
	const t = new WeakMap()
	return new IntersectionObserver((e, n) => {
		for (const i of e) {
			const r = i.target,
				o = t.get(r)
			i.isIntersecting
				? (o && clearTimeout(o),
				  t.set(
						r,
						setTimeout(() => {
							n.unobserve(r), t.delete(r), K(r.href)
						}, 300)
				  ))
				: o && (clearTimeout(o), t.delete(r))
		}
	})
}
function yn() {
	lt(() => {
		for (const t of document.getElementsByTagName('a')) N(t, 'load') && K(t.href)
	})
}
function K(t, e) {
	t = t.replace(/#.*/, '')
	const n = e?.ignoreSlowConnection ?? !1
	if (wn(t, n))
		if (
			(Xt.add(t),
			document.createElement('link').relList?.supports?.('prefetch') && e?.with !== 'fetch')
		) {
			const i = document.createElement('link')
			;(i.rel = 'prefetch'), i.setAttribute('href', t), document.head.append(i)
		} else fetch(t, { priority: 'low' })
}
function wn(t, e) {
	if (!navigator.onLine || (!e && Wt())) return !1
	try {
		const n = new URL(t, location.href)
		return (
			location.origin === n.origin &&
			(location.pathname !== n.pathname || location.search !== n.search) &&
			!Xt.has(t)
		)
	} catch {}
	return !1
}
function N(t, e) {
	if (t?.tagName !== 'A') return !1
	const n = t.dataset.astroPrefetch
	return n === 'false'
		? !1
		: e === 'tap' && (n != null || it) && Wt()
		? !0
		: (n == null && it) || n === ''
		? e === jt
		: n === e
}
function Wt() {
	if ('connection' in navigator) {
		const t = navigator.connection
		return t.saveData || /2g/.test(t.effectiveType)
	}
	return !1
}
function lt(t) {
	t()
	let e = !1
	document.addEventListener('astro:page-load', () => {
		if (!e) {
			e = !0
			return
		}
		t()
	})
}
function vn() {
	const t = document.querySelector('[name="astro-view-transitions-fallback"]')
	return t ? t.getAttribute('content') : 'animate'
}
function Lt(t) {
	return t.dataset.astroReload !== void 0
}
;(at || vn() !== 'none') &&
	(document.addEventListener('click', (t) => {
		let e = t.target
		if (
			(t.composed && (e = t.composedPath()[0]),
			e instanceof Element && (e = e.closest('a, area')),
			!(e instanceof HTMLAnchorElement) &&
				!(e instanceof SVGAElement) &&
				!(e instanceof HTMLAreaElement))
		)
			return
		const n = e instanceof HTMLElement ? e.target : e.target.baseVal,
			i = e instanceof HTMLElement ? e.href : e.href.baseVal,
			r = new URL(i, location.href).origin
		Lt(e) ||
			e.hasAttribute('download') ||
			!e.href ||
			(n && n !== '_self') ||
			r !== location.origin ||
			t.button !== 0 ||
			t.metaKey ||
			t.ctrlKey ||
			t.altKey ||
			t.shiftKey ||
			t.defaultPrevented ||
			(t.preventDefault(),
			Et(i, {
				history: e.dataset.astroHistory === 'replace' ? 'replace' : 'auto',
				sourceElement: e
			}))
	}),
	document.addEventListener('submit', (t) => {
		let e = t.target
		if (e.tagName !== 'FORM' || t.defaultPrevented || Lt(e)) return
		const n = e,
			i = t.submitter,
			r = new FormData(n, i),
			o = typeof n.action == 'string' ? n.action : n.getAttribute('action'),
			c = typeof n.method == 'string' ? n.method : n.getAttribute('method')
		let s = i?.getAttribute('formaction') ?? o ?? location.pathname
		const l = i?.getAttribute('formmethod') ?? c ?? 'get'
		if (l === 'dialog' || location.origin !== new URL(s, location.href).origin) return
		const u = { sourceElement: i ?? n }
		if (l === 'get') {
			const d = new URLSearchParams(r),
				a = new URL(s)
			;(a.search = d.toString()), (s = a.toString())
		} else u.formData = r
		t.preventDefault(), Et(s, u)
	}),
	fn({ prefetchAll: !0 }))
export { qe as _, Ce as a }
