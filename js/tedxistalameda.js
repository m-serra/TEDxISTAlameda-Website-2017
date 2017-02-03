!function(b, f) {
    var n = b.GreenSockGlobals = b.GreenSockGlobals || b;
    if (!n.TweenLite) {
        var q, p, c, k, y, w = function(d) {
            var h = d.split("."),
				m = n;
            for (d = 0; d < h.length; d++) {
				m[h[d]] = m = m[h[d]] || {}
			};
            return m
        }, e = w("com.greensock"), v = function(d) {
            var h, m = [], a = d.length;
            for (h = 0; h !== a; m.push(d[h++]))
            return m
        }, I = function() {}, H = function() {
            var d = Object.prototype.toString
              , h = d.call([]);
            return function(m) {
                return null != m && (m instanceof Array || "object" == typeof m && !!m.push && d.call(m) === h)
            }
        }(), P = {}, E = function(d, h, m, a) {
            this.sc = P[d] ? P[d].sc : [];
            P[d] = this;
            this.gsClass = null;
            this.func = m;
            var t = [];
            this.check = function(c) {
                for (var fa, G, wa, k = h.length, e = k; -1 < --k; )
                    (fa = P[h[k]] || new E(h[k],[])).gsClass ? (t[k] = fa.gsClass,
                    e--) : c && fa.sc.push(this);
                if (0 === e && m)
                    for (c = ("com.greensock." + d).split("."),
                    fa = c.pop(),
                    G = w(c.join("."))[fa] = this.gsClass = m.apply(m, t),
                    a && (n[fa] = G,
                    wa = "undefined" != typeof module && module.exports,
                    !wa && "function" == typeof define && define.amd ? define((b.GreenSockAMDPath ? b.GreenSockAMDPath + "/" : "") + d.split(".").pop(), [], function() {
                        return G
                    }) : d === f && wa && (module.exports = G)),
                    k = 0; k < this.sc.length; k++)
                        this.sc[k].check()
            }
            ;
            this.check(!0)
        }, a = b._gsDefine = function(d, h, m, a) {
            return new E(d,h,m,a)
        }
        , N = e._class = function(d, h, m) {
            return h = h || function() {}
            ,
            a(d, [], function() {
                return h
            }, m),
            h
        }
        ;
        a.globals = n;
        var F = [0, 0, 1, 1]
          , la = []
          , z = N("easing.Ease", function(d, h, m, a) {
            this._func = d;
            this._type = m || 0;
            this._power = a || 0;
            this._params = h ? F.concat(h) : F
        }, !0)
          , K = z.map = {}
          , R = z.register = function(d, h, m, a) {
            var t, b, c;
            h = h.split(",");
            for (var G = h.length, k = (m || "easeIn,easeOut,easeInOut").split(","); -1 < --G; )
                for (t = h[G],
                m = a ? N("easing." + t, null, !0) : e.easing[t] || {},
                b = k.length; -1 < --b; )
                    c = k[b],
                    K[t + "." + c] = K[c + t] = m[c] = d.getRatio ? d : d[c] || new d
        }
        ;
        c = z.prototype;
        c._calcEnd = !1;
        c.getRatio = function(d) {
            if (this._func)
                return this._params[0] = d,
                this._func.apply(null, this._params);
            var h = this._type
              , m = this._power
              , a = 1 === h ? 1 - d : 2 === h ? d : .5 > d ? 2 * d : 2 * (1 - d);
            return 1 === m ? a *= a : 2 === m ? a *= a * a : 3 === m ? a *= a * a * a : 4 === m && (a *= a * a * a * a),
            1 === h ? 1 - a : 2 === h ? a : .5 > d ? a / 2 : 1 - a / 2
        }
        ;
        q = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"];
        for (p = q.length; -1 < --p; )
            c = q[p] + ",Power" + p,
            R(new z(null,null,1,p), c, "easeOut", !0),
            R(new z(null,null,2,p), c, "easeIn" + (0 === p ? ",easeNone" : "")),
            R(new z(null,null,3,p), c, "easeInOut");
        K.linear = e.easing.Linear.easeIn;
        K.swing = e.easing.Quad.easeInOut;
        var oa = N("events.EventDispatcher", function(d) {
            this._listeners = {};
            this._eventTarget = d || this
        });
        c = oa.prototype;
        c.addEventListener = function(d, h, a, t, b) {
            b = b || 0;
            var m, c = this._listeners[d], fa = 0;
            null == c && (this._listeners[d] = c = []);
            for (m = c.length; -1 < --m; )
                d = c[m],
                d.c === h && d.s === a ? c.splice(m, 1) : 0 === fa && d.pr < b && (fa = m + 1);
            c.splice(fa, 0, {
                c: h,
                s: a,
                up: t,
                pr: b
            });
            this !== k || y || k.wake()
        }
        ;
        c.removeEventListener = function(d, h) {
            var a, t = this._listeners[d];
            if (t)
                for (a = t.length; -1 < --a; )
                    if (t[a].c === h)
                        return void t.splice(a, 1)
        }
        ;
        c.dispatchEvent = function(d) {
            var h, a, t, b = this._listeners[d];
            if (b)
                for (h = b.length,
                a = this._eventTarget; -1 < --h; )
                    (t = b[h]) && (t.up ? t.c.call(t.s || a, {
                        type: d,
                        target: a
                    }) : t.c.call(t.s || a))
        }
        ;
        var aa = b.requestAnimationFrame
          , T = b.cancelAnimationFrame
          , J = Date.now || function() {
            return (new Date).getTime()
        }
          , X = J();
        q = ["ms", "moz", "webkit", "o"];
        for (p = q.length; -1 < --p && !aa; )
            aa = b[q[p] + "RequestAnimationFrame"],
            T = b[q[p] + "CancelAnimationFrame"] || b[q[p] + "CancelRequestAnimationFrame"];
        N("Ticker", function(d, h) {
            var a, t, b, c, f, G = this, e = J(), p = !1 !== h && aa ? "auto" : !1, q = 500, A = 33, n = function(d) {
                var h, m;
                h = J() - X;
                h > q && (e += h - A);
                X += h;
                G.time = (X - e) / 1E3;
                h = G.time - f;
                (!a || 0 < h || !0 === d) && (G.frame++,
                f += h + (h >= c ? .004 : c - h),
                m = !0);
                !0 !== d && (b = t(n));
                m && G.dispatchEvent("tick")
            };
            oa.call(G);
            G.time = G.frame = 0;
            G.tick = function() {
                n(!0)
            }
            ;
            G.lagSmoothing = function(d, h) {
                q = d || 1E10;
                A = Math.min(h, q, 0)
            }
            ;
            G.sleep = function() {
                null != b && (p && T ? T(b) : clearTimeout(b),
                t = I,
                b = null,
                G === k && (y = !1))
            }
            ;
            G.wake = function(d) {
                null !== b ? G.sleep() : d ? e += -X + (X = J()) : 10 < G.frame && (X = J() - q + 5);
                t = 0 === a ? I : p && aa ? aa : function(d) {
                    return setTimeout(d, 1E3 * (f - G.time) + 1 | 0)
                }
                ;
                G === k && (y = !0);
                n(2)
            }
            ;
            G.fps = function(d) {
                return arguments.length ? (a = d,
                c = 1 / (a || 60),
                f = this.time + c,
                void G.wake()) : a
            }
            ;
            G.useRAF = function(d) {
                return arguments.length ? (G.sleep(),
                p = d,
                void G.fps(a)) : p
            }
            ;
            G.fps(d);
            setTimeout(function() {
                "auto" === p && 5 > G.frame && "hidden" !== document.visibilityState && G.useRAF(!1)
            }, 1500)
        });
        c = e.Ticker.prototype = new e.events.EventDispatcher;
        c.constructor = e.Ticker;
        var S = N("core.Animation", function(d, h) {
            if (this.vars = h = h || {},
            this._duration = this._totalDuration = d || 0,
            this._delay = Number(h.delay) || 0,
            this._timeScale = 1,
            this._active = !0 === h.immediateRender,
            this.data = h.data,
            this._reversed = !0 === h.reversed,
            ra) {
                y || k.wake();
                var a = this.vars.useFrames ? ia : ra;
                a.add(this, a._time);
                this.vars.paused && this.paused(!0)
            }
        });
        k = S.ticker = new e.Ticker;
        c = S.prototype;
        c._dirty = c._gc = c._initted = c._paused = !1;
        c._totalTime = c._time = 0;
        c._rawPrevTime = -1;
        c._next = c._last = c._onUpdate = c._timeline = c.timeline = null;
        c._paused = !1;
        var ha = function() {
            y && 2E3 < J() - X && k.wake();
            setTimeout(ha, 2E3)
        };
        ha();
        c.play = function(d, h) {
            return null != d && this.seek(d, h),
            this.reversed(!1).paused(!1)
        }
        ;
        c.pause = function(d, h) {
            return null != d && this.seek(d, h),
            this.paused(!0)
        }
        ;
        c.resume = function(d, h) {
            return null != d && this.seek(d, h),
            this.paused(!1)
        }
        ;
        c.seek = function(d, h) {
            return this.totalTime(Number(d), !1 !== h)
        }
        ;
        c.restart = function(d, h) {
            return this.reversed(!1).paused(!1).totalTime(d ? -this._delay : 0, !1 !== h, !0)
        }
        ;
        c.reverse = function(d, h) {
            return null != d && this.seek(d || this.totalDuration(), h),
            this.reversed(!0).paused(!1)
        }
        ;
        c.render = function(d, h, a) {}
        ;
        c.invalidate = function() {
            return this._time = this._totalTime = 0,
            this._initted = this._gc = !1,
            this._rawPrevTime = -1,
            (this._gc || !this.timeline) && this._enabled(!0),
            this
        }
        ;
        c.isActive = function() {
            var d, h = this._timeline, a = this._startTime;
            return !h || !this._gc && !this._paused && h.isActive() && (d = h.rawTime()) >= a && d < a + this.totalDuration() / this._timeScale
        }
        ;
        c._enabled = function(d, h) {
            return y || k.wake(),
            this._gc = !d,
            this._active = this.isActive(),
            !0 !== h && (d && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !d && this.timeline && this._timeline._remove(this, !0)),
            !1
        }
        ;
        c._kill = function(d, h) {
            return this._enabled(!1, !1)
        }
        ;
        c.kill = function(d, h) {
            return this._kill(d, h),
            this
        }
        ;
        c._uncache = function(d) {
            for (d = d ? this : this.timeline; d; )
                d._dirty = !0,
                d = d.timeline;
            return this
        }
        ;
        c._swapSelfInParams = function(d) {
            for (var h = d.length, a = d.concat(); -1 < --h; )
                "{self}" === d[h] && (a[h] = this);
            return a
        }
        ;
        c._callback = function(d) {
            var a = this.vars;
            a[d].apply(a[d + "Scope"] || a.callbackScope || this, a[d + "Params"] || la)
        }
        ;
        c.eventCallback = function(d, a, m, b) {
            if ("on" === (d || "").substr(0, 2)) {
                var h = this.vars;
                if (1 === arguments.length)
                    return h[d];
                null == a ? delete h[d] : (h[d] = a,
                h[d + "Params"] = H(m) && -1 !== m.join("").indexOf("{self}") ? this._swapSelfInParams(m) : m,
                h[d + "Scope"] = b);
                "onUpdate" === d && (this._onUpdate = a)
            }
            return this
        }
        ;
        c.delay = function(d) {
            return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + d - this._delay),
            this._delay = d,
            this) : this._delay
        }
        ;
        c.duration = function(d) {
            return arguments.length ? (this._duration = this._totalDuration = d,
            this._uncache(!0),
            this._timeline.smoothChildTiming && 0 < this._time && this._time < this._duration && 0 !== d && this.totalTime(d / this._duration * this._totalTime, !0),
            this) : (this._dirty = !1,
            this._duration)
        }
        ;
        c.totalDuration = function(d) {
            return this._dirty = !1,
            arguments.length ? this.duration(d) : this._totalDuration
        }
        ;
        c.time = function(d, a) {
            return arguments.length ? (this._dirty && this.totalDuration(),
            this.totalTime(d > this._duration ? this._duration : d, a)) : this._time
        }
        ;
        c.totalTime = function(d, a, m) {
            if (y || k.wake(),
            !arguments.length)
                return this._totalTime;
            if (this._timeline) {
                if (0 > d && !m && (d += this.totalDuration()),
                this._timeline.smoothChildTiming) {
                    this._dirty && this.totalDuration();
                    var h = this._totalDuration
                      , b = this._timeline;
                    if (d > h && !m && (d = h),
                    this._startTime = (this._paused ? this._pauseTime : b._time) - (this._reversed ? h - d : d) / this._timeScale,
                    b._dirty || this._uncache(!1),
                    b._timeline)
                        for (; b._timeline; )
                            b._timeline._time !== (b._startTime + b._totalTime) / b._timeScale && b.totalTime(b._totalTime, !0),
                            b = b._timeline
                }
                this._gc && this._enabled(!0, !1);
                (this._totalTime !== d || 0 === this._duration) && (ba.length && va(),
                this.render(d, a, !1),
                ba.length && va())
            }
            return this
        }
        ;
        c.progress = c.totalProgress = function(d, a) {
            var h = this.duration();
            return arguments.length ? this.totalTime(h * d, a) : h ? this._time / h : this.ratio
        }
        ;
        c.startTime = function(d) {
            return arguments.length ? (d !== this._startTime && (this._startTime = d,
            this.timeline && this.timeline._sortChildren && this.timeline.add(this, d - this._delay)),
            this) : this._startTime
        }
        ;
        c.endTime = function(d) {
            return this._startTime + (0 != d ? this.totalDuration() : this.duration()) / this._timeScale
        }
        ;
        c.timeScale = function(d) {
            if (!arguments.length)
                return this._timeScale;
            if (d = d || 1E-10,
            this._timeline && this._timeline.smoothChildTiming) {
                var a = this._pauseTime
                  , a = a || 0 === a ? a : this._timeline.totalTime();
                this._startTime = a - (a - this._startTime) * this._timeScale / d
            }
            return this._timeScale = d,
            this._uncache(!1)
        }
        ;
        c.reversed = function(d) {
            return arguments.length ? (d != this._reversed && (this._reversed = d,
            this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)),
            this) : this._reversed
        }
        ;
        c.paused = function(d) {
            if (!arguments.length)
                return this._paused;
            var a, m, b = this._timeline;
            return d != this._paused && b && (y || d || k.wake(),
            a = b.rawTime(),
            m = a - this._pauseTime,
            !d && b.smoothChildTiming && (this._startTime += m,
            this._uncache(!1)),
            this._pauseTime = d ? a : null,
            this._paused = d,
            this._active = this.isActive(),
            !d && 0 !== m && this._initted && this.duration() && (a = b.smoothChildTiming ? this._totalTime : (a - this._startTime) / this._timeScale,
            this.render(a, a === this._totalTime, !0))),
            this._gc && !d && this._enabled(!0, !1),
            this
        }
        ;
        q = N("core.SimpleTimeline", function(d) {
            S.call(this, 0, d);
            this.autoRemoveChildren = this.smoothChildTiming = !0
        });
        c = q.prototype = new S;
        c.constructor = q;
        c.kill()._gc = !1;
        c._first = c._last = c._recent = null;
        c._sortChildren = !1;
        c.add = c.insert = function(d, a, m, b) {
            if (d._startTime = Number(a || 0) + d._delay,
            d._paused && this !== d._timeline && (d._pauseTime = d._startTime + (this.rawTime() - d._startTime) / d._timeScale),
            d.timeline && d.timeline._remove(d, !0),
            d.timeline = d._timeline = this,
            d._gc && d._enabled(!0, !0),
            a = this._last,
            this._sortChildren)
                for (m = d._startTime; a && a._startTime > m; )
                    a = a._prev;
            return a ? (d._next = a._next,
            a._next = d) : (d._next = this._first,
            this._first = d),
            d._next ? d._next._prev = d : this._last = d,
            d._prev = a,
            this._recent = d,
            this._timeline && this._uncache(!0),
            this
        }
        ;
        c._remove = function(d, a) {
            return d.timeline === this && (a || d._enabled(!1, !0),
            d._prev ? d._prev._next = d._next : this._first === d && (this._first = d._next),
            d._next ? d._next._prev = d._prev : this._last === d && (this._last = d._prev),
            d._next = d._prev = d.timeline = null,
            d === this._recent && (this._recent = this._last),
            this._timeline && this._uncache(!0)),
            this
        }
        ;
        c.render = function(d, a, m) {
            var h, b = this._first;
            for (this._totalTime = this._time = this._rawPrevTime = d; b; )
                h = b._next,
                (b._active || d >= b._startTime && !b._paused) && (b._reversed ? b.render((b._dirty ? b.totalDuration() : b._totalDuration) - (d - b._startTime) * b._timeScale, a, m) : b.render((d - b._startTime) * b._timeScale, a, m)),
                b = h
        }
        ;
        c.rawTime = function() {
            return y || k.wake(),
            this._totalTime
        }
        ;
        var C = N("TweenLite", function(d, a, m) {
            if (S.call(this, a, m),
            this.render = C.prototype.render,
            null == d)
                throw "Cannot tween a null target.";
            this.target = d = "string" != typeof d ? d : C.selector(d) || d;
            var h, c;
            h = d.jquery || d.length && d !== b && d[0] && (d[0] === b || d[0].nodeType && d[0].style && !d.nodeType);
            m = this.vars.overwrite;
            if (this._overwrite = m = null == m ? ma[C.defaultOverwrite] : "number" == typeof m ? m >> 0 : ma[m],
            (h || d instanceof Array || d.push && H(d)) && "number" != typeof d[0])
                for (this._targets = c = v(d),
                this._propLookup = [],
                this._siblings = [],
                d = 0; d < c.length; d++)
                    (h = c[d]) ? "string" != typeof h ? h.length && h !== b && h[0] && (h[0] === b || h[0].nodeType && h[0].style && !h.nodeType) ? (c.splice(d--, 1),
                    this._targets = c = c.concat(v(h))) : (this._siblings[d] = sa(h, this, !1),
                    1 === m && 1 < this._siblings[d].length && O(h, this, null, 1, this._siblings[d])) : (h = c[d--] = C.selector(h),
                    "string" == typeof h && c.splice(d + 1, 1)) : c.splice(d--, 1);
            else
                this._propLookup = {},
                this._siblings = sa(d, this, !1),
                1 === m && 1 < this._siblings.length && O(d, this, null, 1, this._siblings);
            (this.vars.immediateRender || 0 === a && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -1E-10,
            this.render(-this._delay))
        }, !0)
          , L = function(d) {
            return d && d.length && d !== b && d[0] && (d[0] === b || d[0].nodeType && d[0].style && !d.nodeType)
        };
        c = C.prototype = new S;
        c.constructor = C;
        c.kill()._gc = !1;
        c.ratio = 0;
        c._firstPT = c._targets = c._overwrittenProps = c._startAt = null;
        c._notifyPluginsOfEnabled = c._lazy = !1;
        C.version = "1.18.2";
        C.defaultEase = c._ease = new z(null,null,1,1);
        C.defaultOverwrite = "auto";
        C.ticker = k;
        C.autoSleep = 120;
        C.lagSmoothing = function(d, a) {
            k.lagSmoothing(d, a)
        }
        ;
        C.selector = b.$ || b.jQuery || function(d) {
            var a = b.$ || b.jQuery;
            return a ? (C.selector = a,
            a(d)) : "undefined" == typeof document ? d : document.querySelectorAll ? document.querySelectorAll(d) : document.getElementById("#" === d.charAt(0) ? d.substr(1) : d)
        }
        ;
        var ba = []
          , ca = {}
          , V = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi
          , A = function(d) {
            for (var a, b = this._firstPT; b; )
                a = b.blob ? d ? this.join("") : this.start : b.c * d + b.s,
                b.r ? a = Math.round(a) : 1E-6 > a && -1E-6 < a && (a = 0),
                b.f ? b.fp ? b.t[b.p](b.fp, a) : b.t[b.p](a) : b.t[b.p] = a,
                b = b._next
        }
          , U = function(d, a, b, c) {
            var h, m, t, k, f = [d, a], e = 0, p = "", q = 0;
            f.start = d;
            b && (b(f),
            d = f[0],
            a = f[1]);
            f.length = 0;
            d = d.match(V) || [];
            b = a.match(V) || [];
            c && (c._next = null,
            c.blob = 1,
            f._firstPT = c);
            m = b.length;
            for (c = 0; m > c; c++)
                k = b[c],
                t = a.substr(e, a.indexOf(k, e) - e),
                p += t || !c ? t : ",",
                e += t.length,
                q ? q = (q + 1) % 5 : "rgba(" === t.substr(-5) && (q = 1),
                k === d[c] || d.length <= c ? p += k : (p && (f.push(p),
                p = ""),
                h = parseFloat(d[c]),
                f.push(h),
                f._firstPT = {
                    _next: f._firstPT,
                    t: f,
                    p: f.length - 1,
                    s: h,
                    c: ("=" === k.charAt(1) ? parseInt(k.charAt(0) + "1", 10) * parseFloat(k.substr(2)) : parseFloat(k) - h) || 0,
                    f: 0,
                    r: q && 4 > q
                }),
                e += k.length;
            return p += a.substr(e),
            p && f.push(p),
            f.setRatio = A,
            f
        }
          , M = function(d, a, b, c, k, f, e, G) {
            var h, m, t = "get" === b ? d[a] : b, p = typeof d[a], q = "string" == typeof c && "=" === c.charAt(1);
            f = {
                t: d,
                p: a,
                s: t,
                f: "function" === p,
                pg: 0,
                n: k || a,
                r: f,
                pr: 0,
                c: q ? parseInt(c.charAt(0) + "1", 10) * parseFloat(c.substr(2)) : parseFloat(c) - t || 0
            };
            return "number" !== p && ("function" === p && "get" === b && (m = a.indexOf("set") || "function" != typeof d["get" + a.substr(3)] ? a : "get" + a.substr(3),
            f.s = t = e ? d[m](e) : d[m]()),
            "string" == typeof t && (e || isNaN(t)) ? (f.fp = e,
            h = U(t, c, G || C.defaultStringFilter, f),
            f = {
                t: h,
                p: "setRatio",
                s: 0,
                c: 1,
                f: 2,
                pg: 0,
                n: k || a,
                pr: 0
            }) : q || (f.s = parseFloat(t),
            f.c = parseFloat(c) - f.s || 0)),
            f.c ? ((f._next = this._firstPT) && (f._next._prev = f),
            this._firstPT = f,
            f) : void 0
        };
        p = C._internals = {
            isArray: H,
            isSelector: L,
            lazyTweens: ba,
            blobDif: U
        };
        var ta = C._plugins = {}
          , da = p.tweenLookup = {}
          , Ba = 0
          , ja = p.reservedProps = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1,
            autoCSS: 1,
            lazy: 1,
            onOverwrite: 1,
            callbackScope: 1,
            stringFilter: 1
        }
          , ma = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        }
          , ia = S._rootFramesTimeline = new q
          , ra = S._rootTimeline = new q
          , Ca = 30
          , va = p.lazyRender = function() {
            var d, a = ba.length;
            for (ca = {}; -1 < --a; )
                (d = ba[a]) && !1 !== d._lazy && (d.render(d._lazy[0], d._lazy[1], !0),
                d._lazy = !1);
            ba.length = 0
        }
        ;
        ra._startTime = k.time;
        ia._startTime = k.frame;
        ra._active = ia._active = !0;
        setTimeout(va, 1);
        S._updateRoot = C.render = function() {
            var d, a, b;
            if (ba.length && va(),
            ra.render((k.time - ra._startTime) * ra._timeScale, !1, !1),
            ia.render((k.frame - ia._startTime) * ia._timeScale, !1, !1),
            ba.length && va(),
            k.frame >= Ca) {
                Ca = k.frame + (parseInt(C.autoSleep, 10) || 120);
                for (b in da) {
                    a = da[b].tweens;
                    for (d = a.length; -1 < --d; )
                        a[d]._gc && a.splice(d, 1);
                    0 === a.length && delete da[b]
                }
                if (b = ra._first,
                (!b || b._paused) && C.autoSleep && !ia._first && 1 === k._listeners.tick.length) {
                    for (; b && b._paused; )
                        b = b._next;
                    b || k.sleep()
                }
            }
        }
        ;
        k.addEventListener("tick", S._updateRoot);
        var sa = function(d, a, b) {
            var h, c, m = d._gsTweenID;
            if (da[m || (d._gsTweenID = m = "t" + Ba++)] || (da[m] = {
                target: d,
                tweens: []
            }),
            a && (h = da[m].tweens,
            h[c = h.length] = a,
            b))
                for (; -1 < --c; )
                    h[c] === a && h.splice(c, 1);
            return da[m].tweens
        }
          , ya = function(d, a, b, c) {
            var h, m, f = d.vars.onOverwrite;
            return f && (h = f(d, a, b, c)),
            f = C.onOverwrite,
            f && (m = f(d, a, b, c)),
            !1 !== h && !1 !== m
        }
          , O = function(d, a, b, c, f) {
            var h, m, t;
            if (1 === c || 4 <= c) {
                b = f.length;
                for (h = 0; b > h; h++)
                    if ((t = f[h]) !== a)
                        t._gc || t._kill(null, d, a) && (m = !0);
                    else if (5 === c)
                        break;
                return m
            }
            var k, e = a._startTime + 1E-10, p = [], q = 0, A = 0 === a._duration;
            for (h = f.length; -1 < --h; )
                (t = f[h]) === a || t._gc || t._paused || (t._timeline !== a._timeline ? (k = k || na(a, 0, A),
                0 === na(t, k, A) && (p[q++] = t)) : t._startTime <= e && t._startTime + t.totalDuration() / t._timeScale > e && ((A || !t._initted) && 2E-10 >= e - t._startTime || (p[q++] = t)));
            for (h = q; -1 < --h; )
                (t = p[h],
                2 === c && t._kill(b, d, a) && (m = !0),
                2 !== c || !t._firstPT && t._initted) && (2 === c || ya(t, a)) && t._enabled(!1, !1) && (m = !0);
            return m
        }
          , na = function(d, a, b) {
            for (var h = d._timeline, c = h._timeScale, m = d._startTime; h._timeline; ) {
                if (m += h._startTime,
                c *= h._timeScale,
                h._paused)
                    return -100;
                h = h._timeline
            }
            return m /= c,
            m > a ? m - a : b && m === a || !d._initted && 2E-10 > m - a ? 1E-10 : (m += d.totalDuration() / d._timeScale / c) > a + 1E-10 ? 0 : m - a - 1E-10
        };
        c._init = function() {
            var d, a, b, c = this.vars, f = this._overwrittenProps, k = this._duration, e = !!c.immediateRender, p = c.ease;
            if (c.startAt) {
                this._startAt && (this._startAt.render(-1, !0),
                this._startAt.kill());
                b = {};
                for (d in c.startAt)
                    b[d] = c.startAt[d];
                if (b.overwrite = !1,
                b.immediateRender = !0,
                b.lazy = e && !1 !== c.lazy,
                b.startAt = b.delay = null,
                this._startAt = C.to(this.target, 0, b),
                e)
                    if (0 < this._time)
                        this._startAt = null;
                    else if (0 !== k)
                        return
            } else if (c.runBackwards && 0 !== k)
                if (this._startAt)
                    this._startAt.render(-1, !0),
                    this._startAt.kill(),
                    this._startAt = null;
                else {
                    0 !== this._time && (e = !1);
                    b = {};
                    for (d in c)
                        ja[d] && "autoCSS" !== d || (b[d] = c[d]);
                    if (b.overwrite = 0,
                    b.data = "isFromStart",
                    b.lazy = e && !1 !== c.lazy,
                    b.immediateRender = e,
                    this._startAt = C.to(this.target, 0, b),
                    e) {
                        if (0 === this._time)
                            return
                    } else
                        this._startAt._init(),
                        this._startAt._enabled(!1),
                        this.vars.immediateRender && (this._startAt = null)
                }
            if (this._ease = p = p ? p instanceof z ? p : "function" == typeof p ? new z(p,c.easeParams) : K[p] || C.defaultEase : C.defaultEase,
            c.easeParams instanceof Array && p.config && (this._ease = p.config.apply(p, c.easeParams)),
            this._easeType = this._ease._type,
            this._easePower = this._ease._power,
            this._firstPT = null,
            this._targets)
                for (d = this._targets.length; -1 < --d; )
                    this._initProps(this._targets[d], this._propLookup[d] = {}, this._siblings[d], f ? f[d] : null) && (a = !0);
            else
                a = this._initProps(this.target, this._propLookup, this._siblings, f);
            if (a && C._onPluginEvent("_onInitAllProps", this),
            f && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)),
            c.runBackwards)
                for (b = this._firstPT; b; )
                    b.s += b.c,
                    b.c = -b.c,
                    b = b._next;
            this._onUpdate = c.onUpdate;
            this._initted = !0
        }
        ;
        c._initProps = function(d, a, c, f) {
            var h, m, k, t, e;
            if (null == d)
                return !1;
            ca[d._gsTweenID] && va();
            if (!this.vars.css && d.style && d !== b && d.nodeType && ta.css && !1 !== this.vars.autoCSS) {
                m = this.vars;
                var p = {};
                for (e in m)
                    ja[e] || e in d && "transform" !== e && "x" !== e && "y" !== e && "width" !== e && "height" !== e && "className" !== e && "border" !== e || !(!ta[e] || ta[e] && ta[e]._autoCSS) || (p[e] = m[e],
                    delete m[e]);
                m.css = p
            }
            for (h in this.vars)
                if (m = this.vars[h],
                ja[h])
                    m && (m instanceof Array || m.push && H(m)) && -1 !== m.join("").indexOf("{self}") && (this.vars[h] = this._swapSelfInParams(m, this));
                else if (ta[h] && (t = new ta[h])._onInitTween(d, this.vars[h], this)) {
                    this._firstPT = e = {
                        _next: this._firstPT,
                        t: t,
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 1,
                        n: h,
                        pg: 1,
                        pr: t._priority
                    };
                    for (m = t._overwriteProps.length; -1 < --m; )
                        a[t._overwriteProps[m]] = this._firstPT;
                    (t._priority || t._onInitAllProps) && (k = !0);
                    (t._onDisable || t._onEnable) && (this._notifyPluginsOfEnabled = !0);
                    e._next && (e._next._prev = e)
                } else
                    a[h] = M.call(this, d, h, "get", m, h, 0, null, this.vars.stringFilter);
            return f && this._kill(f, d) ? this._initProps(d, a, c, f) : 1 < this._overwrite && this._firstPT && 1 < c.length && O(d, this, a, this._overwrite, c) ? (this._kill(a, d),
            this._initProps(d, a, c, f)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (ca[d._gsTweenID] = !0),
            k)
        }
        ;
        c.render = function(d, a, b) {
            var c, h, m, f, e = this._time, k = this._duration;
            m = this._rawPrevTime;
            if (d >= k - 1E-7)
                this._totalTime = this._time = k,
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1,
                this._reversed || (c = !0,
                h = "onComplete",
                b = b || this._timeline.autoRemoveChildren),
                0 === k && (this._initted || !this.vars.lazy || b) && (this._startTime === this._timeline._duration && (d = 0),
                (0 > m || 0 >= d && -1E-7 <= d || 1E-10 === m && "isPause" !== this.data) && m !== d && (b = !0,
                1E-10 < m && (h = "onReverseComplete")),
                this._rawPrevTime = f = !a || d || m === d ? d : 1E-10);
            else if (1E-7 > d)
                this._totalTime = this._time = 0,
                this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0,
                (0 !== e || 0 === k && 0 < m) && (h = "onReverseComplete",
                c = this._reversed),
                0 > d && (this._active = !1,
                0 === k && (this._initted || !this.vars.lazy || b) && (0 <= m && (1E-10 !== m || "isPause" !== this.data) && (b = !0),
                this._rawPrevTime = f = !a || d || m === d ? d : 1E-10)),
                this._initted || (b = !0);
            else if (this._totalTime = this._time = d,
            this._easeType) {
                var p = d / k
                  , q = this._easeType
                  , A = this._easePower;
                (1 === q || 3 === q && .5 <= p) && (p = 1 - p);
                3 === q && (p *= 2);
                1 === A ? p *= p : 2 === A ? p *= p * p : 3 === A ? p *= p * p * p : 4 === A && (p *= p * p * p * p);
                1 === q ? this.ratio = 1 - p : 2 === q ? this.ratio = p : .5 > d / k ? this.ratio = p / 2 : this.ratio = 1 - p / 2
            } else
                this.ratio = this._ease.getRatio(d / k);
            if (this._time !== e || b) {
                if (!this._initted) {
                    if (this._init(),
                    !this._initted || this._gc)
                        return;
                    if (!b && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration))
                        return this._time = this._totalTime = e,
                        this._rawPrevTime = m,
                        ba.push(this),
                        void (this._lazy = [d, a]);
                    this._time && !c ? this.ratio = this._ease.getRatio(this._time / k) : c && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                !1 !== this._lazy && (this._lazy = !1);
                this._active || !this._paused && this._time !== e && 0 <= d && (this._active = !0);
                0 !== e || (this._startAt && (0 <= d ? this._startAt.render(d, a, b) : h || (h = "_dummyGS")),
                !this.vars.onStart || 0 === this._time && 0 !== k || !a && this._callback("onStart"));
                for (m = this._firstPT; m; )
                    m.f ? m.t[m.p](m.c * this.ratio + m.s) : m.t[m.p] = m.c * this.ratio + m.s,
                    m = m._next;
                this._onUpdate && (0 > d && this._startAt && -1E-4 !== d && this._startAt.render(d, a, b),
                a || (this._time !== e || c) && this._callback("onUpdate"));
                h && (!this._gc || b) && (0 > d && this._startAt && !this._onUpdate && -1E-4 !== d && this._startAt.render(d, a, b),
                c && (this._timeline.autoRemoveChildren && this._enabled(!1, !1),
                this._active = !1),
                !a && this.vars[h] && this._callback(h),
                0 === k && 1E-10 === this._rawPrevTime && 1E-10 !== f && (this._rawPrevTime = 0))
            }
        }
        ;
        c._kill = function(d, a, b) {
            if ("all" === d && (d = null),
            null == d && (null == a || a === this.target))
                return this._lazy = !1,
                this._enabled(!1, !1);
            a = "string" != typeof a ? a || this._targets || this.target : C.selector(a) || a;
            var c, h, m, f, k, e, p, q, A = b && this._time && b._startTime === this._startTime && this._timeline === b._timeline;
            if ((H(a) || L(a)) && "number" != typeof a[0])
                for (c = a.length; -1 < --c; )
                    this._kill(d, a[c], b) && (e = !0);
            else {
                if (this._targets)
                    for (c = this._targets.length; -1 < --c; ) {
                        if (a === this._targets[c]) {
                            k = this._propLookup[c] || {};
                            this._overwrittenProps = this._overwrittenProps || [];
                            h = this._overwrittenProps[c] = d ? this._overwrittenProps[c] || {} : "all";
                            break
                        }
                    }
                else {
                    if (a !== this.target)
                        return !1;
                    k = this._propLookup;
                    h = this._overwrittenProps = d ? this._overwrittenProps || {} : "all"
                }
                if (k) {
                    if (c = d || k,
                    p = d !== h && "all" !== h && d !== k && ("object" != typeof d || !d._tempKill),
                    b && (C.onOverwrite || this.vars.onOverwrite)) {
                        for (m in c)
                            k[m] && (q || (q = []),
                            q.push(m));
                        if ((q || !d) && !ya(this, b, a, q))
                            return !1
                    }
                    for (m in c)
                        (f = k[m]) && (A && (f.f ? f.t[f.p](f.s) : f.t[f.p] = f.s,
                        e = !0),
                        f.pg && f.t._kill(c) && (e = !0),
                        f.pg && 0 !== f.t._overwriteProps.length || (f._prev ? f._prev._next = f._next : f === this._firstPT && (this._firstPT = f._next),
                        f._next && (f._next._prev = f._prev),
                        f._next = f._prev = null),
                        delete k[m]),
                        p && (h[m] = 1);
                    !this._firstPT && this._initted && this._enabled(!1, !1)
                }
            }
            return e
        }
        ;
        c.invalidate = function() {
            return this._notifyPluginsOfEnabled && C._onPluginEvent("_onDisable", this),
            this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null,
            this._notifyPluginsOfEnabled = this._active = this._lazy = !1,
            this._propLookup = this._targets ? {} : [],
            S.prototype.invalidate.call(this),
            this.vars.immediateRender && (this._time = -1E-10,
            this.render(-this._delay)),
            this
        }
        ;
        c._enabled = function(d, a) {
            if (y || k.wake(),
            d && this._gc) {
                var b, c = this._targets;
                if (c)
                    for (b = c.length; -1 < --b; )
                        this._siblings[b] = sa(c[b], this, !0);
                else
                    this._siblings = sa(this.target, this, !0)
            }
            return S.prototype._enabled.call(this, d, a),
            this._notifyPluginsOfEnabled && this._firstPT ? C._onPluginEvent(d ? "_onEnable" : "_onDisable", this) : !1
        }
        ;
        C.to = function(d, a, b) {
            return new C(d,a,b)
        }
        ;
        C.from = function(d, a, b) {
            return b.runBackwards = !0,
            b.immediateRender = 0 != b.immediateRender,
            new C(d,a,b)
        }
        ;
        C.fromTo = function(d, a, b, c) {
            return c.startAt = b,
            c.immediateRender = 0 != c.immediateRender && 0 != b.immediateRender,
            new C(d,a,c)
        }
        ;
        C.delayedCall = function(a, b, c, f, k) {
            return new C(b,0,{
                delay: a,
                onComplete: b,
                onCompleteParams: c,
                callbackScope: f,
                onReverseComplete: b,
                onReverseCompleteParams: c,
                immediateRender: !1,
                lazy: !1,
                useFrames: k,
                overwrite: 0
            })
        }
        ;
        C.set = function(a, b) {
            return new C(a,0,b)
        }
        ;
        C.getTweensOf = function(a, b) {
            if (null == a)
                return [];
            a = "string" != typeof a ? a : C.selector(a) || a;
            var d, c, h, f;
            if ((H(a) || L(a)) && "number" != typeof a[0]) {
                d = a.length;
                for (c = []; -1 < --d; )
                    c = c.concat(C.getTweensOf(a[d], b));
                for (d = c.length; -1 < --d; )
                    for (f = c[d],
                    h = d; -1 < --h; )
                        f === c[h] && c.splice(d, 1)
            } else
                for (c = sa(a).concat(),
                d = c.length; -1 < --d; )
                    (c[d]._gc || b && !c[d].isActive()) && c.splice(d, 1);
            return c
        }
        ;
        C.killTweensOf = C.killDelayedCallsTo = function(a, b, c) {
            "object" == typeof b && (c = b,
            b = !1);
            b = C.getTweensOf(a, b);
            for (var d = b.length; -1 < --d; )
                b[d]._kill(c, a)
        }
        ;
        var qa = N("plugins.TweenPlugin", function(a, b) {
            this._overwriteProps = (a || "").split(",");
            this._propName = this._overwriteProps[0];
            this._priority = b || 0;
            this._super = qa.prototype
        }, !0);
        if (c = qa.prototype,
        qa.version = "1.18.0",
        qa.API = 2,
        c._firstPT = null,
        c._addTween = M,
        c.setRatio = A,
        c._kill = function(a) {
            var d, b = this._overwriteProps, c = this._firstPT;
            if (null != a[this._propName])
                this._overwriteProps = [];
            else
                for (d = b.length; -1 < --d; )
                    null != a[b[d]] && b.splice(d, 1);
            for (; c; )
                null != a[c.n] && (c._next && (c._next._prev = c._prev),
                c._prev ? (c._prev._next = c._next,
                c._prev = null) : this._firstPT === c && (this._firstPT = c._next)),
                c = c._next;
            return !1
        }
        ,
        c._roundProps = function(a, b) {
            for (var d = this._firstPT; d; )
                (a[this._propName] || null != d.n && a[d.n.split(this._propName + "_").join("")]) && (d.r = b),
                d = d._next
        }
        ,
        C._onPluginEvent = function(a, b) {
            var d, c, f, h, k, e = b._firstPT;
            if ("_onInitAllProps" === a) {
                for (; e; ) {
                    k = e._next;
                    for (c = f; c && c.pr > e.pr; )
                        c = c._next;
                    (e._prev = c ? c._prev : h) ? e._prev._next = e : f = e;
                    (e._next = c) ? c._prev = e : h = e;
                    e = k
                }
                e = b._firstPT = f
            }
            for (; e; )
                e.pg && "function" == typeof e.t[a] && e.t[a]() && (d = !0),
                e = e._next;
            return d
        }
        ,
        qa.activate = function(a) {
            for (var d = a.length; -1 < --d; )
                a[d].API === qa.API && (ta[(new a[d])._propName] = a[d]);
            return !0
        }
        ,
        a.plugin = function(a) {
            if (!(a && a.propName && a.init && a.API))
                throw "illegal plugin definition.";
            var d, b = a.propName, c = a.priority || 0, f = a.overwriteProps, e = {
                init: "_onInitTween",
                set: "setRatio",
                kill: "_kill",
                round: "_roundProps",
                initAll: "_onInitAllProps"
            }, k = N("plugins." + b.charAt(0).toUpperCase() + b.substr(1) + "Plugin", function() {
                qa.call(this, b, c);
                this._overwriteProps = f || []
            }, !0 === a.global), p = k.prototype = new qa(b);
            p.constructor = k;
            k.API = a.API;
            for (d in e)
                "function" == typeof a[d] && (p[e[d]] = a[d]);
            return k.version = a.version,
            qa.activate([k]),
            k
        }
        ,
        q = b._gsQueue) {
            for (p = 0; p < q.length; p++)
                q[p]();
            for (c in P)
                P[c].func || b.console.log("GSAP encountered missing dependency: com.greensock." + c)
        }
        y = !1
    }
}("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window, "TweenLite");
/*
 VERSION: 1.15.3
 DATE: 2015-12-22
 UPDATES AND DOCS AT: http://greensock.com

 @license Copyright (c) 2008-2016, GreenSock. All rights reserved.
 This work is subject to the terms at http://greensock.com/standard-license or for
 Club GreenSock members, the software agreement that was issued with your membership.

 @author: Jack Doyle, jack@greensock.com
*/
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    _gsScope._gsDefine("easing.Back", ["easing.Ease"], function(b) {
        var f, n, q, p = _gsScope.GreenSockGlobals || _gsScope, c = 2 * Math.PI, k = Math.PI / 2, y = p.com.greensock._class, w = function(a, c) {
            var f = y("easing." + a, function() {}, !0)
              , e = f.prototype = new b;
            return e.constructor = f,
            e.getRatio = c,
            f
        }, e = b.register || function() {}
        , v = function(a, b, c, f, k) {
            b = y("easing." + a, {
                easeOut: new b,
                easeIn: new c,
                easeInOut: new f
            }, !0);
            return e(b, a),
            b
        }, I = function(a, b, c) {
            this.t = a;
            this.v = b;
            c && (this.next = c,
            c.prev = this,
            this.c = c.v - b,
            this.gap = c.t - a)
        }, H = function(a, c) {
            var f = y("easing." + a, function(a) {
                this._p1 = a || 0 === a ? a : 1.70158;
                this._p2 = 1.525 * this._p1
            }, !0)
              , e = f.prototype = new b;
            return e.constructor = f,
            e.getRatio = c,
            e.config = function(a) {
                return new f(a)
            }
            ,
            f
        }, H = v("Back", H("BackOut", function(a) {
            return --a * a * ((this._p1 + 1) * a + this._p1) + 1
        }), H("BackIn", function(a) {
            return a * a * ((this._p1 + 1) * a - this._p1)
        }), H("BackInOut", function(a) {
            return 1 > (a *= 2) ? .5 * a * a * ((this._p2 + 1) * a - this._p2) : .5 * ((a -= 2) * a * ((this._p2 + 1) * a + this._p2) + 2)
        })), P = y("easing.SlowMo", function(a, b, c) {
            null == a ? a = .7 : 1 < a && (a = 1);
            this._p = 1 !== a ? b || 0 === b ? b : .7 : 0;
            this._p1 = (1 - a) / 2;
            this._p2 = a;
            this._p3 = this._p1 + this._p2;
            this._calcEnd = !0 === c
        }, !0), E = P.prototype = new b;
        return E.constructor = P,
        E.getRatio = function(a) {
            var b = a + (.5 - a) * this._p;
            return a < this._p1 ? this._calcEnd ? 1 - (a = 1 - a / this._p1) * a : b - (a = 1 - a / this._p1) * a * a * a * b : a > this._p3 ? this._calcEnd ? 1 - (a = (a - this._p3) / this._p1) * a : b + (a - b) * (a = (a - this._p3) / this._p1) * a * a * a : this._calcEnd ? 1 : b
        }
        ,
        P.ease = new P(.7,.7),
        E.config = P.config = function(a, b, c) {
            return new P(a,b,c)
        }
        ,
        f = y("easing.SteppedEase", function(a) {
            a = a || 1;
            this._p1 = 1 / a;
            this._p2 = a + 1
        }, !0),
        E = f.prototype = new b,
        E.constructor = f,
        E.getRatio = function(a) {
            return 0 > a ? a = 0 : 1 <= a && (a = .999999999),
            (this._p2 * a >> 0) * this._p1
        }
        ,
        E.config = f.config = function(a) {
            return new f(a)
        }
        ,
        n = y("easing.RoughEase", function(a) {
            a = a || {};
            for (var c, f, e, k, p = a.taper || "none", q = [], n = 0, v = k = 0 | (a.points || 20), y = !1 !== a.randomize, w = !0 === a.clamp, H = a.template instanceof b ? a.template : null, E = "number" == typeof a.strength ? .4 * a.strength : .4; -1 < --v; )
                a = y ? Math.random() : 1 / k * v,
                c = H ? H.getRatio(a) : a,
                "none" === p ? f = E : "out" === p ? (e = 1 - a,
                f = e * e * E) : "in" === p ? f = a * a * E : .5 > a ? (e = 2 * a,
                f = e * e * .5 * E) : (e = 2 * (1 - a),
                f = e * e * .5 * E),
                y ? c += Math.random() * f - .5 * f : v % 2 ? c += .5 * f : c -= .5 * f,
                w && (1 < c ? c = 1 : 0 > c && (c = 0)),
                q[n++] = {
                    x: a,
                    y: c
                };
            q.sort(function(a, b) {
                return a.x - b.x
            });
            f = new I(1,1,null);
            for (v = k; -1 < --v; )
                k = q[v],
                f = new I(k.x,k.y,f);
            this._prev = new I(0,0,0 !== f.t ? f : f.next)
        }, !0),
        E = n.prototype = new b,
        E.constructor = n,
        E.getRatio = function(a) {
            var b = this._prev;
            if (a > b.t) {
                for (; b.next && a >= b.t; )
                    b = b.next;
                b = b.prev
            } else
                for (; b.prev && a <= b.t; )
                    b = b.prev;
            return this._prev = b,
            b.v + (a - b.t) / b.gap * b.c
        }
        ,
        E.config = function(a) {
            return new n(a)
        }
        ,
        n.ease = new n,
        v("Bounce", w("BounceOut", function(a) {
            return 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375
        }), w("BounceIn", function(a) {
            return (a = 1 - a) < 1 / 2.75 ? 1 - 7.5625 * a * a : 2 / 2.75 > a ? 1 - (7.5625 * (a -= 1.5 / 2.75) * a + .75) : 2.5 / 2.75 > a ? 1 - (7.5625 * (a -= 2.25 / 2.75) * a + .9375) : 1 - (7.5625 * (a -= 2.625 / 2.75) * a + .984375)
        }), w("BounceInOut", function(a) {
            var b = .5 > a;
            return a = b ? 1 - 2 * a : 2 * a - 1,
            a = 1 / 2.75 > a ? 7.5625 * a * a : 2 / 2.75 > a ? 7.5625 * (a -= 1.5 / 2.75) * a + .75 : 2.5 / 2.75 > a ? 7.5625 * (a -= 2.25 / 2.75) * a + .9375 : 7.5625 * (a -= 2.625 / 2.75) * a + .984375,
            b ? .5 * (1 - a) : .5 * a + .5
        })),
        v("Circ", w("CircOut", function(a) {
            return Math.sqrt(1 - --a * a)
        }), w("CircIn", function(a) {
            return -(Math.sqrt(1 - a * a) - 1)
        }), w("CircInOut", function(a) {
            return 1 > (a *= 2) ? -.5 * (Math.sqrt(1 - a * a) - 1) : .5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
        })),
        q = function(a, f, e) {
            var k = y("easing." + a, function(a, b) {
                this._p1 = 1 <= a ? a : 1;
                this._p2 = (b || e) / (1 > a ? a : 1);
                this._p3 = this._p2 / c * (Math.asin(1 / this._p1) || 0);
                this._p2 = c / this._p2
            }, !0);
            a = k.prototype = new b;
            return a.constructor = k,
            a.getRatio = f,
            a.config = function(a, b) {
                return new k(a,b)
            }
            ,
            k
        }
        ,
        v("Elastic", q("ElasticOut", function(a) {
            return this._p1 * Math.pow(2, -10 * a) * Math.sin((a - this._p3) * this._p2) + 1
        }, .3), q("ElasticIn", function(a) {
            return -(this._p1 * Math.pow(2, 10 * --a) * Math.sin((a - this._p3) * this._p2))
        }, .3), q("ElasticInOut", function(a) {
            return 1 > (a *= 2) ? -.5 * this._p1 * Math.pow(2, 10 * --a) * Math.sin((a - this._p3) * this._p2) : this._p1 * Math.pow(2, -10 * --a) * Math.sin((a - this._p3) * this._p2) * .5 + 1
        }, .45)),
        v("Expo", w("ExpoOut", function(a) {
            return 1 - Math.pow(2, -10 * a)
        }), w("ExpoIn", function(a) {
            return Math.pow(2, 10 * (a - 1)) - .001
        }), w("ExpoInOut", function(a) {
            return 1 > (a *= 2) ? .5 * Math.pow(2, 10 * (a - 1)) : .5 * (2 - Math.pow(2, -10 * (a - 1)))
        })),
        v("Sine", w("SineOut", function(a) {
            return Math.sin(a * k)
        }), w("SineIn", function(a) {
            return -Math.cos(a * k) + 1
        }), w("SineInOut", function(a) {
            return -.5 * (Math.cos(Math.PI * a) - 1)
        })),
        y("easing.EaseLookup", {
            find: function(a) {
                return b.map[a]
            }
        }, !0),
        e(p.SlowMo, "SlowMo", "ease,"),
        e(n, "RoughEase", "ease,"),
        e(f, "SteppedEase", "ease,"),
        H
    }, !0)
});
_gsScope._gsDefine && _gsScope._gsQueue.pop()();
(function() {
    var b = function() {
        return _gsScope.GreenSockGlobals || _gsScope
    };
    "function" == typeof define && define.amd ? define(["TweenLite"], b) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"),
    module.exports = b())
})();
_gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;
(_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function() {
    _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function(b, f) {
        var n, q, p, c, k = function() {
            b.call(this, "css");
            this._overwriteProps.length = 0;
            this.setRatio = k.prototype.setRatio
        }, y = _gsScope._gsDefine.globals, w = {}, e = k.prototype = new b("css");
        e.constructor = k;
        k.version = "1.18.2";
        k.API = 2;
        k.defaultTransformPerspective = 0;
        k.defaultSkewType = "compensated";
        k.defaultSmoothOrigin = !0;
        e = "px";
        k.suffixMap = {
            top: e,
            right: e,
            bottom: e,
            left: e,
            width: e,
            height: e,
            fontSize: e,
            padding: e,
            margin: e,
            perspective: e,
            lineHeight: ""
        };
        var v, I, H, P, E, a, N = /(?:\d|\-\d|\.\d|\-\.\d)+/g, F = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g, la = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi, z = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g, K = /(?:\d|\-|\+|=|#|\.)*/g, R = /opacity *= *([^)]*)/i, oa = /opacity:([^;]*)/i, aa = /alpha\(opacity *=.+?\)/i, T = /^(rgb|hsl)/, J = /([A-Z])/g, X = /-([a-z])/gi, S = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi, ha = function(a, d) {
            return d.toUpperCase()
        }, C = /(?:Left|Right|Width)/i, L = /(M11|M12|M21|M22)=[\d\-\.e]+/gi, ba = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i, ca = /,(?=[^\)]*(?:\(|$))/gi, V = Math.PI / 180, A = 180 / Math.PI, U = {}, M = document, ta = function(a) {
            return M.createElementNS ? M.createElementNS("http://www.w3.org/1999/xhtml", a) : M.createElement(a)
        }, da = ta("div"), Ba = ta("img"), ja = k._internals = {
            _specialProps: w
        }, ma = navigator.userAgent, ia = function() {
            var g = ma.indexOf("Android")
              , d = ta("a");
            return H = -1 !== ma.indexOf("Safari") && -1 === ma.indexOf("Chrome") && (-1 === g || 3 < Number(ma.substr(g + 8, 1))),
            E = H && 6 > Number(ma.substr(ma.indexOf("Version/") + 8, 1)),
            P = -1 !== ma.indexOf("Firefox"),
            (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(ma) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(ma)) && (a = parseFloat(RegExp.$1)),
            d ? (d.style.cssText = "top:1px;opacity:.55;",
            /^0.55/.test(d.style.opacity)) : !1
        }(), ra = function(a) {
            return R.test("string" == typeof a ? a : (a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
        }, Ca = "", va = "", sa = function(a, d) {
            d = d || da;
            var g, b, l = d.style;
            if (void 0 !== l[a])
                return a;
            a = a.charAt(0).toUpperCase() + a.substr(1);
            g = ["O", "Moz", "ms", "Ms", "Webkit"];
            for (b = 5; -1 < --b && void 0 === l[g[b] + a]; )
                ;
            return 0 <= b ? (va = 3 === b ? "ms" : g[b],
            Ca = "-" + va.toLowerCase() + "-",
            va + a) : null
        }, ya = M.defaultView ? M.defaultView.getComputedStyle : function() {}
        , O = k.getStyle = function(a, d, b, c, l) {
            var g;
            return ia || "opacity" !== d ? (!c && a.style[d] ? g = a.style[d] : (b = b || ya(a)) ? g = b[d] || b.getPropertyValue(d) || b.getPropertyValue(d.replace(J, "-$1").toLowerCase()) : a.currentStyle && (g = a.currentStyle[d]),
            null == l || g && "none" !== g && "auto" !== g && "auto auto" !== g ? g : l) : ra(a)
        }
        , na = ja.convertToPixels = function(a, d, b, c, l) {
            if ("px" === c || !c)
                return b;
            if ("auto" === c || !b)
                return 0;
            var g, r, u, x = C.test(d), D = a;
            g = da.style;
            var e = 0 > b;
            if (e && (b = -b),
            "%" === c && -1 !== d.indexOf("border"))
                g = b / 100 * (x ? a.clientWidth : a.clientHeight);
            else {
                if (g.cssText = "border:0 solid red;position:" + O(a, "position") + ";line-height:0;",
                "%" !== c && D.appendChild && "v" !== c.charAt(0) && "rem" !== c)
                    g[x ? "borderLeftWidth" : "borderTopWidth"] = b + c;
                else {
                    if (D = a.parentNode || M.body,
                    r = D._gsCache,
                    u = f.ticker.frame,
                    r && x && r.time === u)
                        return r.width * b / 100;
                    g[x ? "width" : "height"] = b + c
                }
                D.appendChild(da);
                g = parseFloat(da[x ? "offsetWidth" : "offsetHeight"]);
                D.removeChild(da);
                x && "%" === c && !1 !== k.cacheWidths && (r = D._gsCache = D._gsCache || {},
                r.time = u,
                r.width = g / b * 100);
                0 !== g || l || (g = na(a, d, b, c, !0))
            }
            return e ? -g : g
        }
        , qa = ja.calculateOffset = function(a, d, b) {
            if ("absolute" !== O(a, "position", b))
                return 0;
            var g = "left" === d ? "Left" : "Top";
            b = O(a, "margin" + g, b);
            return a["offset" + g] - (na(a, d, parseFloat(b), b.replace(K, "")) || 0)
        }
        , d = function(a, d) {
            var b, g, l, c = {};
            if (d = d || ya(a, null))
                if (b = d.length)
                    for (; -1 < --b; )
                        l = d[b],
                        -1 !== l.indexOf("-transform") && Qa !== l || (c[l.replace(X, ha)] = d.getPropertyValue(l));
                else
                    for (b in d)
                        -1 !== b.indexOf("Transform") && ea !== b || (c[b] = d[b]);
            else if (d = a.currentStyle || a.style)
                for (b in d)
                    "string" == typeof b && void 0 === c[b] && (c[b.replace(X, ha)] = d[b]);
            return ia || (c.opacity = ra(a)),
            g = za(a, d, !1),
            c.rotation = g.rotation,
            c.skewX = g.skewX,
            c.scaleX = g.scaleX,
            c.scaleY = g.scaleY,
            c.x = g.x,
            c.y = g.y,
            ua && (c.z = g.z,
            c.rotationX = g.rotationX,
            c.rotationY = g.rotationY,
            c.scaleZ = g.scaleZ),
            c.filters && delete c.filters,
            c
        }, h = function(a, d, b, c, l) {
            var g, r, u, x = {}, D = a.style;
            for (r in b)
                "cssText" !== r && "length" !== r && isNaN(r) && (d[r] !== (g = b[r]) || l && l[r]) && -1 === r.indexOf("Origin") && ("number" == typeof g || "string" == typeof g) && (x[r] = "auto" !== g || "left" !== r && "top" !== r ? "" !== g && "auto" !== g && "none" !== g || "string" != typeof d[r] || "" === d[r].replace(z, "") ? g : 0 : qa(a, r),
                void 0 !== D[r] && (u = new Ma(D,r,D[r],u)));
            if (c)
                for (r in c)
                    "className" !== r && (x[r] = c[r]);
            return {
                difs: x,
                firstMPT: u
            }
        }, m = {
            width: ["Left", "Right"],
            height: ["Top", "Bottom"]
        }, t = ["marginLeft", "marginRight", "marginTop", "marginBottom"], fa = function(a, d) {
            if ("contain" === a || "auto" === a || "auto auto" === a)
                return a + " ";
            null != a && "" !== a || (a = "0 0");
            var b = a.split(" ")
              , g = -1 !== a.indexOf("left") ? "0%" : -1 !== a.indexOf("right") ? "100%" : b[0]
              , l = -1 !== a.indexOf("top") ? "0%" : -1 !== a.indexOf("bottom") ? "100%" : b[1];
            return null == l ? l = "center" === g ? "50%" : "0" : "center" === l && (l = "50%"),
            ("center" === g || isNaN(parseFloat(g)) && -1 === (g + "").indexOf("=")) && (g = "50%"),
            a = g + " " + l + (2 < b.length ? " " + b[2] : ""),
            d && (d.oxp = -1 !== g.indexOf("%"),
            d.oyp = -1 !== l.indexOf("%"),
            d.oxr = "=" === g.charAt(1),
            d.oyr = "=" === l.charAt(1),
            d.ox = parseFloat(g.replace(z, "")),
            d.oy = parseFloat(l.replace(z, "")),
            d.v = a),
            d || a
        }, wa = function(a, d) {
            return "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) : parseFloat(a) - parseFloat(d)
        }, ka = function(a, d) {
            return null == a ? d : "string" == typeof a && "=" === a.charAt(1) ? parseInt(a.charAt(0) + "1", 10) * parseFloat(a.substr(2)) + d : parseFloat(a)
        }, G = function(a, d, b, c) {
            var g, x, r, u;
            return null == a ? r = d : "number" == typeof a ? r = a : (g = a.split("_"),
            u = "=" === a.charAt(1),
            x = (u ? parseInt(a.charAt(0) + "1", 10) * parseFloat(g[0].substr(2)) : parseFloat(g[0])) * (-1 === a.indexOf("rad") ? 1 : A) - (u ? 0 : d),
            g.length && (c && (c[b] = d + x),
            -1 !== a.indexOf("short") && (x %= 360,
            x !== x % 180 && (x = 0 > x ? x + 360 : x - 360)),
            -1 !== a.indexOf("_cw") && 0 > x ? x = (x + 3599999999640) % 360 - 360 * (x / 360 | 0) : -1 !== a.indexOf("ccw") && 0 < x && (x = (x - 3599999999640) % 360 - 360 * (x / 360 | 0))),
            r = d + x),
            1E-6 > r && -1E-6 < r && (r = 0),
            r
        }, Aa = {
            aqua: [0, 255, 255],
            lime: [0, 255, 0],
            silver: [192, 192, 192],
            black: [0, 0, 0],
            maroon: [128, 0, 0],
            teal: [0, 128, 128],
            blue: [0, 0, 255],
            navy: [0, 0, 128],
            white: [255, 255, 255],
            fuchsia: [255, 0, 255],
            olive: [128, 128, 0],
            yellow: [255, 255, 0],
            orange: [255, 165, 0],
            gray: [128, 128, 128],
            purple: [128, 0, 128],
            green: [0, 128, 0],
            red: [255, 0, 0],
            pink: [255, 192, 203],
            cyan: [0, 255, 255],
            transparent: [255, 255, 255, 0]
        }, Ka = function(a, d, b) {
            return a = 0 > a ? a + 1 : 1 < a ? a - 1 : a,
            255 * (1 > 6 * a ? d + (b - d) * a * 6 : .5 > a ? b : 2 > 3 * a ? d + (b - d) * (2 / 3 - a) * 6 : d) + .5 | 0
        }, Ea = k.parseColor = function(a, d) {
            var b, c, l, g, r, u, f, e, k, h, p;
            if (a)
                if ("number" == typeof a)
                    b = [a >> 16, a >> 8 & 255, 255 & a];
                else {
                    if ("," === a.charAt(a.length - 1) && (a = a.substr(0, a.length - 1)),
                    Aa[a])
                        b = Aa[a];
                    else if ("#" === a.charAt(0))
                        4 === a.length && (c = a.charAt(1),
                        l = a.charAt(2),
                        g = a.charAt(3),
                        a = "#" + c + c + l + l + g + g),
                        a = parseInt(a.substr(1), 16),
                        b = [a >> 16, a >> 8 & 255, 255 & a];
                    else if ("hsl" === a.substr(0, 3))
                        if (b = p = a.match(N),
                        d) {
                            if (-1 !== a.indexOf("="))
                                return a.match(F)
                        } else
                            r = Number(b[0]) % 360 / 360,
                            u = Number(b[1]) / 100,
                            f = Number(b[2]) / 100,
                            l = .5 >= f ? f * (u + 1) : f + u - f * u,
                            c = 2 * f - l,
                            3 < b.length && (b[3] = Number(a[3])),
                            b[0] = Ka(r + 1 / 3, c, l),
                            b[1] = Ka(r, c, l),
                            b[2] = Ka(r - 1 / 3, c, l);
                    else
                        b = a.match(N) || Aa.transparent;
                    b[0] = Number(b[0]);
                    b[1] = Number(b[1]);
                    b[2] = Number(b[2]);
                    3 < b.length && (b[3] = Number(b[3]))
                }
            else
                b = Aa.black;
            return d && !p && (c = b[0] / 255,
            l = b[1] / 255,
            g = b[2] / 255,
            e = Math.max(c, l, g),
            k = Math.min(c, l, g),
            f = (e + k) / 2,
            e === k ? r = u = 0 : (h = e - k,
            u = .5 < f ? h / (2 - e - k) : h / (e + k),
            r = e === c ? (l - g) / h + (g > l ? 6 : 0) : e === l ? (g - c) / h + 2 : (c - l) / h + 4,
            r *= 60),
            b[0] = r + .5 | 0,
            b[1] = 100 * u + .5 | 0,
            b[2] = 100 * f + .5 | 0),
            b
        }
        , Oa = function(a, b) {
            var d, c, l, g = a.match(pa) || [], r = 0, u = g.length ? "" : a;
            for (d = 0; d < g.length; d++)
                c = g[d],
                l = a.substr(r, a.indexOf(c, r) - r),
                r += l.length + c.length,
                c = Ea(c, b),
                3 === c.length && c.push(1),
                u += l + (b ? "hsla(" + c[0] + "," + c[1] + "%," + c[2] + "%," + c[3] : "rgba(" + c.join(",")) + ")";
            return u
        }, pa = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (e in Aa)
            pa += "|" + e + "\\b";
        pa = new RegExp(pa + ")","gi");
        k.colorStringFilter = function(a) {
            var b, d = a[0] + a[1];
            pa.lastIndex = 0;
            pa.test(d) && (b = -1 !== d.indexOf("hsl(") || -1 !== d.indexOf("hsla("),
            a[0] = Oa(a[0], b),
            a[1] = Oa(a[1], b))
        }
        ;
        f.defaultStringFilter || (f.defaultStringFilter = k.colorStringFilter);
        var Pa = function(a, b, d, c) {
            if (null == a)
                return function(a) {
                    return a
                }
                ;
            var l, g = b ? (a.match(pa) || [""])[0] : "", r = a.split(g).join("").match(la) || [], u = a.substr(0, a.indexOf(r[0])), x = ")" === a.charAt(a.length - 1) ? ")" : "", D = -1 !== a.indexOf(" ") ? " " : ",", f = r.length, e = 0 < f ? r[0].replace(N, "") : "";
            return f ? l = b ? function(a) {
                var b, Y, k;
                if ("number" == typeof a)
                    a += e;
                else if (c && ca.test(a)) {
                    a = a.replace(ca, "|").split("|");
                    for (k = 0; k < a.length; k++)
                        a[k] = l(a[k]);
                    return a.join(",")
                }
                if (b = (a.match(pa) || [g])[0],
                Y = a.split(b).join("").match(la) || [],
                k = Y.length,
                f > k--)
                    for (; ++k < f; )
                        Y[k] = d ? Y[(k - 1) / 2 | 0] : r[k];
                return u + Y.join(D) + D + b + x + (-1 !== a.indexOf("inset") ? " inset" : "")
            }
            : function(a) {
                var b, g;
                if ("number" == typeof a)
                    a += e;
                else if (c && ca.test(a)) {
                    a = a.replace(ca, "|").split("|");
                    for (g = 0; g < a.length; g++)
                        a[g] = l(a[g]);
                    return a.join(",")
                }
                if (b = a.match(la) || [],
                g = b.length,
                f > g--)
                    for (; ++g < f; )
                        b[g] = d ? b[(g - 1) / 2 | 0] : r[g];
                return u + b.join(D) + x
            }
            : function(a) {
                return a
            }
        }
          , La = function(a) {
            return a = a.split(","),
            function(b, d, c, l, g, r, Y) {
                c = (d + "").split(" ");
                Y = {};
                for (d = 0; 4 > d; d++)
                    Y[a[d]] = c[d] = c[d] || c[(d - 1) / 2 >> 0];
                return l.parse(b, Y, g, r)
            }
        }
          , Ma = (ja._setPluginRatio = function(a) {
            this.plugin.setRatio(a);
            var b, d, c;
            c = this.data;
            for (var l = c.proxy, g = c.firstMPT; g; )
                b = l[g.v],
                g.r ? b = Math.round(b) : 1E-6 > b && -1E-6 < b && (b = 0),
                g.t[g.p] = b,
                g = g._next;
            if (c.autoRotate && (c.autoRotate.rotation = l.rotation),
            1 === a || 0 === a)
                for (g = c.firstMPT,
                c = 1 === a ? "e" : "b"; g; ) {
                    if (d = g.t,
                    d.type) {
                        if (1 === d.type) {
                            b = d.xs0 + d.s + d.xs1;
                            for (a = 1; a < d.l; a++)
                                b += d["xn" + a] + d["xs" + (a + 1)];
                            d[c] = b
                        }
                    } else
                        d[c] = d.s + d.xs0;
                    g = g._next
                }
        }
        ,
        function(a, b, d, c, l) {
            this.t = a;
            this.p = b;
            this.v = d;
            this.r = l;
            c && (c._prev = this,
            this._next = c)
        }
        )
          , W = (ja._parseToProxy = function(a, b, d, c, l, f) {
            var g, u, x, e = c, D = {}, k = {};
            u = d._transform;
            var h = U;
            d._transform = null;
            U = b;
            c = a = d.parse(a, b, c, l);
            U = h;
            for (f && (d._transform = u,
            e && (e._prev = null,
            e._prev && (e._prev._next = null))); c && c !== e; ) {
                if (1 >= c.type && (g = c.p,
                k[g] = c.s + c.c,
                D[g] = c.s,
                f || (x = new Ma(c,"s",g,x,c.r),
                c.c = 0),
                1 === c.type))
                    for (d = c.l; 0 < --d; )
                        u = "xn" + d,
                        g = c.p + "_" + u,
                        k[g] = c.data[u],
                        D[g] = c[u],
                        f || (x = new Ma(c,u,g,x,c.rxp[u]));
                c = c._next
            }
            return {
                proxy: D,
                end: k,
                firstMPT: x,
                pt: a
            }
        }
        ,
        ja.CSSPropTween = function(a, b, d, f, l, e, r, Y, k, h, p) {
            this.t = a;
            this.p = b;
            this.s = d;
            this.c = f;
            this.n = r || b;
            a instanceof W || c.push(this.n);
            this.r = Y;
            this.type = e || 0;
            k && (this.pr = k,
            n = !0);
            this.b = void 0 === h ? d : h;
            this.e = void 0 === p ? d + f : p;
            l && (this._next = l,
            l._prev = this)
        }
        )
          , Fa = function(a, b, d, c, l, f) {
            a = new W(a,b,d,c - d,l,-1,f);
            return a.b = d,
            a.e = a.xs0 = c,
            a
        }
          , Ga = k.parseComplex = function(a, d, b, c, l, f, r, Y, e, k) {
            b = b || f || "";
            r = new W(a,d,0,0,r,k ? 2 : 1,null,!1,Y,b,c);
            c += "";
            var g, u, x, D, h;
            a = b.split(", ").join(",").split(" ");
            d = c.split(", ").join(",").split(" ");
            Y = a.length;
            var p = !1 !== v;
            (-1 !== c.indexOf(",") || -1 !== b.indexOf(",")) && (a = a.join(" ").replace(ca, ", ").split(" "),
            d = d.join(" ").replace(ca, ", ").split(" "),
            Y = a.length);
            Y !== d.length && (a = (f || "").split(" "),
            Y = a.length);
            r.plugin = e;
            r.setRatio = k;
            for (b = pa.lastIndex = 0; Y > b; b++)
                if (g = a[b],
                e = d[b],
                x = parseFloat(g),
                x || 0 === x)
                    r.appendXtra("", x, wa(e, x), e.replace(F, ""), p && -1 !== e.indexOf("px"), !0);
                else if (l && pa.test(g))
                    k = "," === e.charAt(e.length - 1) ? ")," : ")",
                    D = -1 !== e.indexOf("hsl") && ia,
                    g = Ea(g, D),
                    e = Ea(e, D),
                    (f = 6 < g.length + e.length) && !ia && 0 === e[3] ? (r["xs" + r.l] += r.l ? " transparent" : "transparent",
                    r.e = r.e.split(d[b]).join("transparent")) : (ia || (f = !1),
                    D ? r.appendXtra(f ? "hsla(" : "hsl(", g[0], wa(e[0], g[0]), ",", !1, !0).appendXtra("", g[1], wa(e[1], g[1]), "%,", !1).appendXtra("", g[2], wa(e[2], g[2]), f ? "%," : "%" + k, !1) : r.appendXtra(f ? "rgba(" : "rgb(", g[0], e[0] - g[0], ",", !0, !0).appendXtra("", g[1], e[1] - g[1], ",", !0).appendXtra("", g[2], e[2] - g[2], f ? "," : k, !0),
                    f && (g = 4 > g.length ? 1 : g[3],
                    r.appendXtra("", g, (4 > e.length ? 1 : e[3]) - g, k, !1))),
                    pa.lastIndex = 0;
                else if (f = g.match(N)) {
                    if (u = e.match(F),
                    !u || u.length !== f.length)
                        return r;
                    for (e = k = 0; e < f.length; e++)
                        h = f[e],
                        D = g.indexOf(h, k),
                        r.appendXtra(g.substr(k, D - k), Number(h), wa(u[e], h), "", p && "px" === g.substr(D + h.length, 2), 0 === e),
                        k = D + h.length;
                    r["xs" + r.l] += g.substr(k)
                } else
                    r["xs" + r.l] += r.l ? " " + e : e;
            if (-1 !== c.indexOf("=") && r.data) {
                k = r.xs0 + r.data.s;
                for (b = 1; b < r.l; b++)
                    k += r["xs" + b] + r.data["xn" + b];
                r.e = k + r["xs" + b]
            }
            return r.l || (r.type = -1,
            r.xs0 = r.e),
            r.xfirst || r
        }
          , Z = 9
          , e = W.prototype;
        for (e.l = e.pr = 0; 0 < --Z; )
            e["xn" + Z] = 0,
            e["xs" + Z] = "";
        e.xs0 = "";
        e._next = e._prev = e.xfirst = e.data = e.plugin = e.setRatio = e.rxp = null;
        e.appendXtra = function(a, b, d, c, l, f) {
            var g = this.l;
            return this["xs" + g] += f && g ? " " + a : a || "",
            d || 0 === g || this.plugin ? (this.l++,
            this.type = this.setRatio ? 2 : 1,
            this["xs" + this.l] = c || "",
            0 < g ? (this.data["xn" + g] = b + d,
            this.rxp["xn" + g] = l,
            this["xn" + g] = b,
            this.plugin || (this.xfirst = new W(this,"xn" + g,b,d,this.xfirst || this,0,this.n,l,this.pr),
            this.xfirst.xs0 = 0),
            this) : (this.data = {
                s: b + d
            },
            this.rxp = {},
            this.s = b,
            this.c = d,
            this.r = l,
            this)) : (this["xs" + g] += b + (c || ""),
            this)
        }
        ;
        var Ra = function(a, b) {
            b = b || {};
            this.p = b.prefix ? sa(a) || a : a;
            w[a] = w[this.p] = this;
            this.format = b.formatter || Pa(b.defaultValue, b.color, b.collapsible, b.multi);
            b.parser && (this.parse = b.parser);
            this.clrs = b.color;
            this.multi = b.multi;
            this.keyword = b.keyword;
            this.dflt = b.defaultValue;
            this.pr = b.priority || 0
        }
          , Q = ja._registerComplexSpecialProp = function(a, b, d) {
            "object" != typeof b && (b = {
                parser: d
            });
            var c = a.split(",")
              , l = b.defaultValue;
            d = d || [l];
            for (a = 0; a < c.length; a++)
                b.prefix = 0 === a && b.prefix,
                b.defaultValue = d[a] || l,
                new Ra(c[a],b)
        }
          , Ya = function(a) {
            if (!w[a]) {
                var b = a.charAt(0).toUpperCase() + a.substr(1) + "Plugin";
                Q(a, {
                    parser: function(a, d, c, g, r, f, e) {
                        var l = y.com.greensock.plugins[b];
                        l ? a = (l._cssRegister(),
                        w[c].parse(a, d, c, g, r, f, e)) : (window.console && console.log("Error: " + b + " js file not loaded."),
                        a = r);
                        return a
                    }
                })
            }
        }
          , e = Ra.prototype;
        e.parseComplex = function(a, b, d, c, l, f) {
            var g, e, k, u, h, D, x = this.keyword;
            if (this.multi && (ca.test(d) || ca.test(b) ? (e = b.replace(ca, "|").split("|"),
            k = d.replace(ca, "|").split("|")) : x && (e = [b],
            k = [d])),
            k) {
                u = k.length > e.length ? k.length : e.length;
                for (g = 0; u > g; g++)
                    b = e[g] = e[g] || this.dflt,
                    d = k[g] = k[g] || this.dflt,
                    x && (h = b.indexOf(x),
                    D = d.indexOf(x),
                    h !== D && (-1 === D ? e[g] = e[g].split(x).join("") : -1 === h && (e[g] += " " + x)));
                b = e.join(", ");
                d = k.join(", ")
            }
            return Ga(a, this.p, b, d, this.clrs, this.dflt, c, this.pr, l, f)
        }
        ;
        e.parse = function(a, b, d, c, l, f, r) {
            return this.parseComplex(a.style, this.format(O(a, this.p, p, !1, this.dflt)), this.format(b), l, f)
        }
        ;
        k.registerSpecialProp = function(a, b, d) {
            Q(a, {
                parser: function(a, c, g, r, f, e, k) {
                    f = new W(a,g,0,0,f,2,g,!1,d);
                    return f.plugin = e,
                    f.setRatio = b(a, c, r._tween, g),
                    f
                },
                priority: d
            })
        }
        ;
        k.useSVGTransformAttr = H || P;
        var xa, Sa = "scaleX scaleY scaleZ x y z skewX skewY rotation rotationX rotationY perspective xPercent yPercent".split(" "), ea = sa("transform"), Qa = Ca + "transform", Da = sa("transformOrigin"), ua = null !== sa("perspective"), Ha = ja.Transform = function() {
            this.perspective = parseFloat(k.defaultTransformPerspective) || 0;
            this.force3D = !1 !== k.defaultForce3D && ua ? k.defaultForce3D || "auto" : !1
        }
        , Za = window.SVGElement, Ta = function(a, b, d) {
            var c;
            a = M.createElementNS("http://www.w3.org/2000/svg", a);
            var l = /([a-z])([A-Z])/g;
            for (c in d)
                a.setAttributeNS(null, c.replace(l, "$1-$2").toLowerCase(), d[c]);
            return b.appendChild(a),
            a
        }, Ua = M.documentElement, $a = function() {
            var b, d, c, f = a || /Android/i.test(ma) && !window.chrome;
            return M.createElementNS && !f && (b = Ta("svg", Ua),
            d = Ta("rect", b, {
                width: 100,
                height: 50,
                x: 100
            }),
            c = d.getBoundingClientRect().width,
            d.style[Da] = "50% 50%",
            d.style[ea] = "scaleX(0.5)",
            f = c === d.getBoundingClientRect().width && !(P && ua),
            Ua.removeChild(b)),
            f
        }(), Wa = function(a, b, d, c, l) {
            var g, r, f, e, h, u, x, D, p, m, q, A, n, B = a._gsTransform, v = Va(a, !0);
            B && (A = B.xOrigin,
            n = B.yOrigin);
            (!c || 2 > (g = c.split(" ")).length) && (u = a.getBBox(),
            b = fa(b).split(" "),
            g = [(-1 !== b[0].indexOf("%") ? parseFloat(b[0]) / 100 * u.width : parseFloat(b[0])) + u.x, (-1 !== b[1].indexOf("%") ? parseFloat(b[1]) / 100 * u.height : parseFloat(b[1])) + u.y]);
            d.xOrigin = b = parseFloat(g[0]);
            d.yOrigin = e = parseFloat(g[1]);
            c && v !== Na && (h = v[0],
            u = v[1],
            x = v[2],
            D = v[3],
            p = v[4],
            m = v[5],
            q = h * D - u * x,
            r = D / q * b + -x / q * e + (x * m - D * p) / q,
            f = -u / q * b + h / q * e - (h * m - u * p) / q,
            b = d.xOrigin = g[0] = r,
            e = d.yOrigin = g[1] = f);
            B && (l || !1 !== l && !1 !== k.defaultSmoothOrigin ? (r = b - A,
            f = e - n,
            B.xOffset += r * v[0] + f * v[2] - r,
            B.yOffset += r * v[1] + f * v[3] - f) : B.xOffset = B.yOffset = 0);
            a.setAttribute("data-svg-origin", g.join(" "))
        }, Xa = function(a) {
            return !!(Za && "function" == typeof a.getBBox && a.getCTM && (!a.parentNode || a.parentNode.getBBox && a.parentNode.getCTM))
        }, Na = [1, 0, 0, 1, 0, 0], Va = function(a, b) {
            var d, c, l, g, f = a._gsTransform || new Ha;
            if (ea ? c = O(a, Qa, null, !0) : a.currentStyle && (c = a.currentStyle.filter.match(L),
            c = c && 4 === c.length ? [c[0].substr(4), Number(c[2].substr(4)), Number(c[1].substr(4)), c[3].substr(4), f.x || 0, f.y || 0].join() : ""),
            d = !c || "none" === c || "matrix(1, 0, 0, 1, 0, 0)" === c,
            (f.svg || a.getBBox && Xa(a)) && (d && -1 !== (a.style[ea] + "").indexOf("matrix") && (c = a.style[ea],
            d = 0),
            l = a.getAttribute("transform"),
            d && l && (-1 !== l.indexOf("matrix") ? (c = l,
            d = 0) : -1 !== l.indexOf("translate") && (c = "matrix(1,0,0,1," + l.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")",
            d = 0))),
            d)
                return Na;
            l = (c || "").match(/(?:\-|\b)[\d\-\.e]+\b/gi) || [];
            for (Z = l.length; -1 < --Z; )
                d = Number(l[Z]),
                l[Z] = (g = d - (d |= 0)) ? (1E5 * g + (0 > g ? -.5 : .5) | 0) / 1E5 + d : d;
            return b && 6 < l.length ? [l[0], l[1], l[4], l[5], l[12], l[13]] : l
        }, za = ja.getTransform = function(a, b, d, c) {
            if (a._gsTransform && d && !c)
                return a._gsTransform;
            var l, g, r, e = d ? a._gsTransform || new Ha : new Ha, h = 0 > e.scaleX, u = ua ? parseFloat(O(a, Da, b, !1, "0 0 0").split(" ")[2]) || e.zOrigin || 0 : 0, x = parseFloat(k.defaultTransformPerspective) || 0;
            if (e.svg = !(!a.getBBox || !Xa(a)),
            e.svg && (Wa(a, O(a, Da, p, !1, "50% 50%") + "", e, a.getAttribute("data-svg-origin")),
            xa = k.useSVGTransformAttr || $a),
            l = Va(a),
            l !== Na) {
                if (16 === l.length) {
                    var D, m, q, n, h = l[0], x = l[1];
                    b = l[2];
                    c = l[3];
                    var v = l[4]
                      , t = l[5]
                      , y = l[6]
                      , B = l[7]
                      , w = l[8]
                      , z = l[9]
                      , M = l[10]
                      , U = l[12]
                      , C = l[13]
                      , H = l[14]
                      , I = l[11]
                      , J = Math.atan2(y, M);
                    e.zOrigin && (H = -e.zOrigin,
                    U = w * H - l[12],
                    C = z * H - l[13],
                    H = M * H + e.zOrigin - l[14]);
                    e.rotationX = J * A;
                    J && (n = Math.cos(-J),
                    r = Math.sin(-J),
                    D = v * n + w * r,
                    m = t * n + z * r,
                    q = y * n + M * r,
                    w = v * -r + w * n,
                    z = t * -r + z * n,
                    M = y * -r + M * n,
                    I = B * -r + I * n,
                    v = D,
                    t = m,
                    y = q);
                    J = Math.atan2(-b, M);
                    e.rotationY = J * A;
                    J && (n = Math.cos(-J),
                    r = Math.sin(-J),
                    D = h * n - w * r,
                    m = x * n - z * r,
                    q = b * n - M * r,
                    z = x * r + z * n,
                    M = b * r + M * n,
                    I = c * r + I * n,
                    h = D,
                    x = m,
                    b = q);
                    J = Math.atan2(x, h);
                    e.rotation = J * A;
                    J && (n = Math.cos(-J),
                    r = Math.sin(-J),
                    h = h * n + v * r,
                    m = x * n + t * r,
                    t = x * -r + t * n,
                    y = b * -r + y * n,
                    x = m);
                    e.rotationX && 359.9 < Math.abs(e.rotationX) + Math.abs(e.rotation) && (e.rotationX = e.rotation = 0,
                    e.rotationY = 180 - e.rotationY);
                    e.scaleX = (1E5 * Math.sqrt(h * h + x * x) + .5 | 0) / 1E5;
                    e.scaleY = (1E5 * Math.sqrt(t * t + z * z) + .5 | 0) / 1E5;
                    e.scaleZ = (1E5 * Math.sqrt(y * y + M * M) + .5 | 0) / 1E5;
                    e.skewX = 0;
                    e.perspective = I ? 1 / (0 > I ? -I : I) : 0;
                    e.x = U;
                    e.y = C;
                    e.z = H;
                    e.svg && (e.x -= e.xOrigin - (e.xOrigin * h - e.yOrigin * v),
                    e.y -= e.yOrigin - (e.yOrigin * x - e.xOrigin * t))
                } else
                    ua && !c && l.length && e.x === l[4] && e.y === l[5] && (e.rotationX || e.rotationY) || void 0 !== e.x && "none" === O(a, "display", b) || (D = (n = 6 <= l.length) ? l[0] : 1,
                    m = l[1] || 0,
                    q = l[2] || 0,
                    n = n ? l[3] : 1,
                    e.x = l[4] || 0,
                    e.y = l[5] || 0,
                    l = Math.sqrt(D * D + m * m),
                    r = Math.sqrt(n * n + q * q),
                    b = D || m ? Math.atan2(m, D) * A : e.rotation || 0,
                    c = q || n ? Math.atan2(q, n) * A + b : e.skewX || 0,
                    90 < Math.abs(c) && 270 > Math.abs(c) && (h ? (l *= -1,
                    c += 0 >= b ? 180 : -180,
                    b += 0 >= b ? 180 : -180) : (r *= -1,
                    c += 0 >= c ? 180 : -180)),
                    e.scaleX = l,
                    e.scaleY = r,
                    e.rotation = b,
                    e.skewX = c,
                    ua && (e.rotationX = e.rotationY = e.z = 0,
                    e.perspective = x,
                    e.scaleZ = 1),
                    e.svg && (e.x -= e.xOrigin - (e.xOrigin * D + e.yOrigin * q),
                    e.y -= e.yOrigin - (e.xOrigin * m + e.yOrigin * n)));
                e.zOrigin = u;
                for (g in e)
                    2E-5 > e[g] && -2E-5 < e[g] && (e[g] = 0)
            }
            return d && (a._gsTransform = e,
            e.svg && (xa && a.style[ea] ? f.delayedCall(.001, function() {
                Ia(a.style, ea)
            }) : !xa && a.getAttribute("transform") && f.delayedCall(.001, function() {
                a.removeAttribute("transform")
            }))),
            e
        }
        , ab = function(b) {
            var d, c, g = this.data, l = -g.rotation * V, e = l + g.skewX * V, f = (Math.cos(l) * g.scaleX * 1E5 | 0) / 1E5, k = (Math.sin(l) * g.scaleX * 1E5 | 0) / 1E5, h = (Math.sin(e) * -g.scaleY * 1E5 | 0) / 1E5, p = (Math.cos(e) * g.scaleY * 1E5 | 0) / 1E5, e = this.t.style;
            if (l = this.t.currentStyle) {
                c = k;
                k = -h;
                h = -c;
                d = l.filter;
                e.filter = "";
                var m, q;
                c = this.t.offsetWidth;
                var n = this.t.offsetHeight
                  , A = "absolute" !== l.position
                  , v = "progid:DXImageTransform.Microsoft.Matrix(M11=" + f + ", M12=" + k + ", M21=" + h + ", M22=" + p
                  , y = g.x + c * g.xPercent / 100
                  , z = g.y + n * g.yPercent / 100;
                if (null != g.ox && (m = (g.oxp ? c * g.ox * .01 : g.ox) - c / 2,
                q = (g.oyp ? n * g.oy * .01 : g.oy) - n / 2,
                y += m - (m * f + q * k),
                z += q - (m * h + q * p)),
                A ? (m = c / 2,
                q = n / 2,
                v += ", Dx=" + (m - (m * f + q * k) + y) + ", Dy=" + (q - (m * h + q * p) + z) + ")") : v += ", sizingMethod='auto expand')",
                -1 !== d.indexOf("DXImageTransform.Microsoft.Matrix(") ? e.filter = d.replace(ba, v) : e.filter = v + " " + d,
                (0 === b || 1 === b) && 1 === f && 0 === k && 0 === h && 1 === p && (A && -1 === v.indexOf("Dx=0, Dy=0") || R.test(d) && 100 !== parseFloat(RegExp.$1) || -1 === d.indexOf(d.indexOf("Alpha")) && e.removeAttribute("filter")),
                !A)
                    for (b = 8 > a ? 1 : -1,
                    m = g.ieOffsetX || 0,
                    q = g.ieOffsetY || 0,
                    g.ieOffsetX = Math.round((c - ((0 > f ? -f : f) * c + (0 > k ? -k : k) * n)) / 2 + y),
                    g.ieOffsetY = Math.round((n - ((0 > p ? -p : p) * n + (0 > h ? -h : h) * c)) / 2 + z),
                    Z = 0; 4 > Z; Z++)
                        f = t[Z],
                        k = l[f],
                        c = -1 !== k.indexOf("px") ? parseFloat(k) : na(this.t, f, parseFloat(k), k.replace(K, "")) || 0,
                        k = c !== g[f] ? 2 > Z ? -g.ieOffsetX : -g.ieOffsetY : 2 > Z ? m - g.ieOffsetX : q - g.ieOffsetY,
                        e[f] = (g[f] = Math.round(c - k * (0 === Z || 2 === Z ? 1 : b))) + "px"
            }
        }, bb = ja.set3DTransformRatio = ja.setTransformRatio = function(a) {
            var b, d, c, l, g, e, f, k, h, p, m, q, n, A, v, t, y, B = this.data, z = this.t.style, w = B.rotation, M = B.rotationX, J = B.rotationY, I = B.scaleX, H = B.scaleY, U = B.scaleZ, C = B.x, E = B.y, T = B.z, G = B.svg, F = B.perspective;
            e = B.force3D;
            if (!((1 !== a && 0 !== a || "auto" !== e || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && e || T || F || J || M) && 1 === U || xa && G || !ua)
                return void (w || B.skewX || G ? (w *= V,
                g = B.skewX * V,
                b = Math.cos(w) * I,
                c = Math.sin(w) * I,
                d = Math.sin(w - g) * -H,
                l = Math.cos(w - g) * H,
                g && "simple" === B.skewType && (t = Math.tan(g),
                t = Math.sqrt(1 + t * t),
                d *= t,
                l *= t,
                B.skewY && (b *= t,
                c *= t)),
                G && (C += B.xOrigin - (B.xOrigin * b + B.yOrigin * d) + B.xOffset,
                E += B.yOrigin - (B.xOrigin * c + B.yOrigin * l) + B.yOffset,
                xa && (B.xPercent || B.yPercent) && (n = this.t.getBBox(),
                C += .01 * B.xPercent * n.width,
                E += .01 * B.yPercent * n.height),
                n = 1E-6,
                n > C && C > -n && (C = 0),
                n > E && E > -n && (E = 0)),
                q = (1E5 * b | 0) / 1E5 + "," + (1E5 * c | 0) / 1E5 + "," + (1E5 * d | 0) / 1E5 + "," + (1E5 * l | 0) / 1E5 + "," + C + "," + E + ")",
                G && xa ? this.t.setAttribute("transform", "matrix(" + q) : z[ea] = (B.xPercent || B.yPercent ? "translate(" + B.xPercent + "%," + B.yPercent + "%) matrix(" : "matrix(") + q) : z[ea] = (B.xPercent || B.yPercent ? "translate(" + B.xPercent + "%," + B.yPercent + "%) matrix(" : "matrix(") + I + ",0,0," + H + "," + C + "," + E + ")");
            if (P && (n = 1E-4,
            n > I && I > -n && (I = U = 2E-5),
            n > H && H > -n && (H = U = 2E-5),
            !F || B.z || B.rotationX || B.rotationY || (F = 0)),
            w || B.skewX)
                w *= V,
                A = b = Math.cos(w),
                v = c = Math.sin(w),
                B.skewX && (w -= B.skewX * V,
                A = Math.cos(w),
                v = Math.sin(w),
                "simple" === B.skewType && (t = Math.tan(B.skewX * V),
                t = Math.sqrt(1 + t * t),
                A *= t,
                v *= t,
                B.skewY && (b *= t,
                c *= t))),
                d = -v,
                l = A;
            else {
                if (!(J || M || 1 !== U || F || G))
                    return void (z[ea] = (B.xPercent || B.yPercent ? "translate(" + B.xPercent + "%," + B.yPercent + "%) translate3d(" : "translate3d(") + C + "px," + E + "px," + T + "px)" + (1 !== I || 1 !== H ? " scale(" + I + "," + H + ")" : ""));
                b = l = 1;
                d = c = 0
            }
            k = 1;
            a = g = e = f = h = p = 0;
            m = F ? -1 / F : 0;
            q = B.zOrigin;
            n = 1E-6;
            (w = J * V) && (A = Math.cos(w),
            v = Math.sin(w),
            e = -v,
            h = m * -v,
            a = b * v,
            g = c * v,
            k = A,
            m *= A,
            b *= A,
            c *= A);
            (w = M * V) && (A = Math.cos(w),
            v = Math.sin(w),
            t = d * A + a * v,
            y = l * A + g * v,
            f = k * v,
            p = m * v,
            a = d * -v + a * A,
            g = l * -v + g * A,
            k *= A,
            m *= A,
            d = t,
            l = y);
            1 !== U && (a *= U,
            g *= U,
            k *= U,
            m *= U);
            1 !== H && (d *= H,
            l *= H,
            f *= H,
            p *= H);
            1 !== I && (b *= I,
            c *= I,
            e *= I,
            h *= I);
            (q || G) && (q && (C += a * -q,
            E += g * -q,
            T += k * -q + q),
            G && (C += B.xOrigin - (B.xOrigin * b + B.yOrigin * d) + B.xOffset,
            E += B.yOrigin - (B.xOrigin * c + B.yOrigin * l) + B.yOffset),
            n > C && C > -n && (C = "0"),
            n > E && E > -n && (E = "0"),
            n > T && T > -n && (T = 0));
            q = B.xPercent || B.yPercent ? "translate(" + B.xPercent + "%," + B.yPercent + "%) matrix3d(" : "matrix3d(";
            q = q + ((n > b && b > -n ? "0" : b) + "," + (n > c && c > -n ? "0" : c) + "," + (n > e && e > -n ? "0" : e)) + ("," + (n > h && h > -n ? "0" : h) + "," + (n > d && d > -n ? "0" : d) + "," + (n > l && l > -n ? "0" : l));
            M || J || 1 !== U ? (q += "," + (n > f && f > -n ? "0" : f) + "," + (n > p && p > -n ? "0" : p) + "," + (n > a && a > -n ? "0" : a),
            q += "," + (n > g && g > -n ? "0" : g) + "," + (n > k && k > -n ? "0" : k) + "," + (n > m && m > -n ? "0" : m) + ",") : q += ",0,0,0,0,1,0,";
            q += C + "," + E + "," + T + "," + (F ? 1 + -T / F : 1) + ")";
            z[ea] = q
        }
        , e = Ha.prototype;
        e.x = e.y = e.z = e.skewX = e.skewY = e.rotation = e.rotationX = e.rotationY = e.zOrigin = e.xPercent = e.yPercent = e.xOffset = e.yOffset = 0;
        e.scaleX = e.scaleY = e.scaleZ = 1;
        Q("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
            parser: function(a, b, d, c, l, e, f) {
                if (c._lastParsedTransform === f)
                    return l;
                c._lastParsedTransform = f;
                var g, h, r, m, u, n, q, x, D;
                b = a._gsTransform;
                var A = a.style
                  , v = Sa.length
                  , t = {};
                if (f.display ? (m = O(a, "display"),
                A.display = "block",
                g = za(a, p, !0, f.parseTransform),
                A.display = m) : g = za(a, p, !0, f.parseTransform),
                c._transform = g,
                "string" == typeof f.transform && ea)
                    m = da.style,
                    m[ea] = f.transform,
                    m.display = "block",
                    m.position = "absolute",
                    M.body.appendChild(da),
                    h = za(da, null, !1),
                    M.body.removeChild(da),
                    h.perspective || (h.perspective = g.perspective),
                    null != f.xPercent && (h.xPercent = ka(f.xPercent, g.xPercent)),
                    null != f.yPercent && (h.yPercent = ka(f.yPercent, g.yPercent));
                else if ("object" == typeof f) {
                    if (h = {
                        scaleX: ka(null != f.scaleX ? f.scaleX : f.scale, g.scaleX),
                        scaleY: ka(null != f.scaleY ? f.scaleY : f.scale, g.scaleY),
                        scaleZ: ka(f.scaleZ, g.scaleZ),
                        x: ka(f.x, g.x),
                        y: ka(f.y, g.y),
                        z: ka(f.z, g.z),
                        xPercent: ka(f.xPercent, g.xPercent),
                        yPercent: ka(f.yPercent, g.yPercent),
                        perspective: ka(f.transformPerspective, g.perspective)
                    },
                    q = f.directionalRotation,
                    null != q)
                        if ("object" == typeof q)
                            for (m in q)
                                f[m] = q[m];
                        else
                            f.rotation = q;
                    "string" == typeof f.x && -1 !== f.x.indexOf("%") && (h.x = 0,
                    h.xPercent = ka(f.x, g.xPercent));
                    "string" == typeof f.y && -1 !== f.y.indexOf("%") && (h.y = 0,
                    h.yPercent = ka(f.y, g.yPercent));
                    h.rotation = G("rotation"in f ? f.rotation : "shortRotation"in f ? f.shortRotation + "_short" : "rotationZ"in f ? f.rotationZ : g.rotation, g.rotation, "rotation", t);
                    ua && (h.rotationX = G("rotationX"in f ? f.rotationX : "shortRotationX"in f ? f.shortRotationX + "_short" : g.rotationX || 0, g.rotationX, "rotationX", t),
                    h.rotationY = G("rotationY"in f ? f.rotationY : "shortRotationY"in f ? f.shortRotationY + "_short" : g.rotationY || 0, g.rotationY, "rotationY", t));
                    h.skewX = null == f.skewX ? g.skewX : G(f.skewX, g.skewX);
                    h.skewY = null == f.skewY ? g.skewY : G(f.skewY, g.skewY);
                    (r = h.skewY - g.skewY) && (h.skewX += r,
                    h.rotation += r)
                }
                ua && null != f.force3D && (g.force3D = f.force3D,
                n = !0);
                g.skewType = f.skewType || g.skewType || k.defaultSkewType;
                for ((r = g.force3D || g.z || g.rotationX || g.rotationY || h.z || h.rotationX || h.rotationY || h.perspective) || null == f.scale || (h.scaleZ = 1); -1 < --v; )
                    d = Sa[v],
                    u = h[d] - g[d],
                    (1E-6 < u || -1E-6 > u || null != f[d] || null != U[d]) && (n = !0,
                    l = new W(g,d,g[d],u,l),
                    d in t && (l.e = t[d]),
                    l.xs0 = 0,
                    l.plugin = e,
                    c._overwriteProps.push(l.n));
                return u = f.transformOrigin,
                g.svg && (u || f.svgOrigin) && (x = g.xOffset,
                D = g.yOffset,
                Wa(a, fa(u), h, f.svgOrigin, f.smoothOrigin),
                l = Fa(g, "xOrigin", (b ? g : h).xOrigin, h.xOrigin, l, "transformOrigin"),
                l = Fa(g, "yOrigin", (b ? g : h).yOrigin, h.yOrigin, l, "transformOrigin"),
                (x !== g.xOffset || D !== g.yOffset) && (l = Fa(g, "xOffset", b ? x : g.xOffset, g.xOffset, l, "transformOrigin"),
                l = Fa(g, "yOffset", b ? D : g.yOffset, g.yOffset, l, "transformOrigin")),
                u = xa ? null : "0px 0px"),
                (u || ua && r && g.zOrigin) && (ea ? (n = !0,
                d = Da,
                u = (u || O(a, d, p, !1, "50% 50%")) + "",
                l = new W(A,d,0,0,l,-1,"transformOrigin"),
                l.b = A[d],
                l.plugin = e,
                ua ? (m = g.zOrigin,
                u = u.split(" "),
                g.zOrigin = (2 < u.length && (0 === m || "0px" !== u[2]) ? parseFloat(u[2]) : m) || 0,
                l.xs0 = l.e = u[0] + " " + (u[1] || "50%") + " 0px",
                l = new W(g,"zOrigin",0,0,l,-1,l.n),
                l.b = m,
                l.xs0 = l.e = g.zOrigin) : l.xs0 = l.e = u) : fa(u + "", g)),
                n && (c._transformType = g.svg && xa || !r && 3 !== this._transformType ? 2 : 3),
                l
            },
            prefix: !0
        });
        Q("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        });
        Q("borderRadius", {
            defaultValue: "0px",
            parser: function(a, b, d, c, l, f) {
                b = this.format(b);
                var g, e, h, k, m, u, n, x, D, A, v, t, w, y = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"], z = a.style;
                c = parseFloat(a.offsetWidth);
                f = parseFloat(a.offsetHeight);
                b = b.split(" ");
                for (g = 0; g < y.length; g++)
                    this.p.indexOf("border") && (y[g] = sa(y[g])),
                    k = h = O(a, y[g], p, !1, "0px"),
                    -1 !== k.indexOf(" ") && (h = k.split(" "),
                    k = h[0],
                    h = h[1]),
                    m = e = b[g],
                    u = parseFloat(k),
                    D = k.substr((u + "").length),
                    (A = "=" === m.charAt(1)) ? (n = parseInt(m.charAt(0) + "1", 10),
                    m = m.substr(2),
                    n *= parseFloat(m),
                    x = m.substr((n + "").length - (0 > n ? 1 : 0)) || "") : (n = parseFloat(m),
                    x = m.substr((n + "").length)),
                    "" === x && (x = q[d] || D),
                    x !== D && (v = na(a, "borderLeft", u, D),
                    t = na(a, "borderTop", u, D),
                    "%" === x ? (k = v / c * 100 + "%",
                    h = t / f * 100 + "%") : "em" === x ? (w = na(a, "borderLeft", 1, "em"),
                    k = v / w + "em",
                    h = t / w + "em") : (k = v + "px",
                    h = t + "px"),
                    A && (m = parseFloat(k) + n + x,
                    e = parseFloat(h) + n + x)),
                    l = Ga(z, y[g], k + " " + h, m + " " + e, !1, "0px", l);
                return l
            },
            prefix: !0,
            formatter: Pa("0px 0px 0px 0px", !1, !0)
        });
        Q("backgroundPosition", {
            defaultValue: "0 0",
            parser: function(b, d, c, f, l, e) {
                var g, h, k;
                c = p || ya(b, null);
                c = this.format((c ? a ? c.getPropertyValue("background-position-x") + " " + c.getPropertyValue("background-position-y") : c.getPropertyValue("background-position") : b.currentStyle.backgroundPositionX + " " + b.currentStyle.backgroundPositionY) || "0 0");
                var m = this.format(d);
                if (-1 !== c.indexOf("%") != (-1 !== m.indexOf("%")) && (g = O(b, "backgroundImage").replace(S, ""),
                g && "none" !== g)) {
                    d = c.split(" ");
                    f = m.split(" ");
                    Ba.setAttribute("src", g);
                    for (g = 2; -1 < --g; )
                        c = d[g],
                        h = -1 !== c.indexOf("%"),
                        h !== (-1 !== f[g].indexOf("%")) && (k = 0 === g ? b.offsetWidth - Ba.width : b.offsetHeight - Ba.height,
                        d[g] = h ? parseFloat(c) / 100 * k + "px" : parseFloat(c) / k * 100 + "%");
                    c = d.join(" ")
                }
                return this.parseComplex(b.style, c, m, l, e)
            },
            formatter: fa
        });
        Q("backgroundSize", {
            defaultValue: "0 0",
            formatter: fa
        });
        Q("perspective", {
            defaultValue: "0px",
            prefix: !0
        });
        Q("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        });
        Q("transformStyle", {
            prefix: !0
        });
        Q("backfaceVisibility", {
            prefix: !0
        });
        Q("userSelect", {
            prefix: !0
        });
        Q("margin", {
            parser: La("marginTop,marginRight,marginBottom,marginLeft")
        });
        Q("padding", {
            parser: La("paddingTop,paddingRight,paddingBottom,paddingLeft")
        });
        Q("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function(b, d, c, f, l, e) {
                var g, h, k;
                return 9 > a ? (h = b.currentStyle,
                k = 8 > a ? " " : ",",
                g = "rect(" + h.clipTop + k + h.clipRight + k + h.clipBottom + k + h.clipLeft + ")",
                d = this.format(d).split(",").join(k)) : (g = this.format(O(b, this.p, p, !1, this.dflt)),
                d = this.format(d)),
                this.parseComplex(b.style, g, d, l, e)
            }
        });
        Q("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        });
        Q("autoRound,strictUnits", {
            parser: function(a, b, d, c, l) {
                return l
            }
        });
        Q("border", {
            defaultValue: "0px solid #000",
            parser: function(a, b, d, c, l, f) {
                return this.parseComplex(a.style, this.format(O(a, "borderTopWidth", p, !1, "0px") + " " + O(a, "borderTopStyle", p, !1, "solid") + " " + O(a, "borderTopColor", p, !1, "#000")), this.format(b), l, f)
            },
            color: !0,
            formatter: function(a) {
                var b = a.split(" ");
                return b[0] + " " + (b[1] || "solid") + " " + (a.match(pa) || ["#000"])[0]
            }
        });
        Q("borderWidth", {
            parser: La("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
        });
        Q("float,cssFloat,styleFloat", {
            parser: function(a, b, d, c, l, f) {
                a = a.style;
                c = "cssFloat"in a ? "cssFloat" : "styleFloat";
                return new W(a,c,0,0,l,-1,d,!1,0,a[c],b)
            }
        });
        var cb = function(a) {
            var b, d = this.t, c = d.filter || O(this.data, "filter") || "";
            a = this.s + this.c * a | 0;
            100 === a && (-1 === c.indexOf("atrix(") && -1 === c.indexOf("radient(") && -1 === c.indexOf("oader(") ? (d.removeAttribute("filter"),
            b = !O(this.data, "filter")) : (d.filter = c.replace(aa, ""),
            b = !0));
            b || (this.xn1 && (d.filter = c = c || "alpha(opacity=" + a + ")"),
            -1 === c.indexOf("pacity") ? 0 === a && this.xn1 || (d.filter = c + " alpha(opacity=" + a + ")") : d.filter = c.replace(R, "opacity=" + a))
        };
        Q("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function(a, b, d, c, l, f) {
                var g = parseFloat(O(a, "opacity", p, !1, "1"))
                  , e = a.style
                  , h = "autoAlpha" === d;
                return "string" == typeof b && "=" === b.charAt(1) && (b = ("-" === b.charAt(0) ? -1 : 1) * parseFloat(b.substr(2)) + g),
                h && 1 === g && "hidden" === O(a, "visibility", p) && 0 !== b && (g = 0),
                ia ? l = new W(e,"opacity",g,b - g,l) : (l = new W(e,"opacity",100 * g,100 * (b - g),l),
                l.xn1 = h ? 1 : 0,
                e.zoom = 1,
                l.type = 2,
                l.b = "alpha(opacity=" + l.s + ")",
                l.e = "alpha(opacity=" + (l.s + l.c) + ")",
                l.data = a,
                l.plugin = f,
                l.setRatio = cb),
                h && (l = new W(e,"visibility",0,0,l,-1,null,!1,0,0 !== g ? "inherit" : "hidden",0 === b ? "hidden" : "inherit"),
                l.xs0 = "inherit",
                c._overwriteProps.push(l.n),
                c._overwriteProps.push(d)),
                l
            }
        });
        var Ia = function(a, b) {
            b && (a.removeProperty ? (("ms" === b.substr(0, 2) || "webkit" === b.substr(0, 6)) && (b = "-" + b),
            a.removeProperty(b.replace(J, "-$1").toLowerCase())) : a.removeAttribute(b))
        }
          , db = function(a) {
            if (this.t._gsClassPT = this,
            1 === a || 0 === a) {
                this.t.setAttribute("class", 0 === a ? this.b : this.e);
                for (var b = this.data, d = this.t.style; b; )
                    b.v ? d[b.p] = b.v : Ia(d, b.p),
                    b = b._next;
                1 === a && this.t._gsClassPT === this && (this.t._gsClassPT = null)
            } else
                this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
        };
        Q("className", {
            parser: function(a, b, c, f, l, e, k) {
                var g, m, q, r, u = a.getAttribute("class") || "", A = a.style.cssText;
                if (l = f._classNamePT = new W(a,c,0,0,l,2),
                l.setRatio = db,
                l.pr = -11,
                n = !0,
                l.b = u,
                c = d(a, p),
                m = a._gsClassPT) {
                    q = {};
                    for (r = m.data; r; )
                        q[r.p] = 1,
                        r = r._next;
                    m.setRatio(1)
                }
                return a._gsClassPT = l,
                l.e = "=" !== b.charAt(1) ? b : u.replace(new RegExp("\\s*\\b" + b.substr(2) + "\\b"), "") + ("+" === b.charAt(0) ? " " + b.substr(2) : ""),
                a.setAttribute("class", l.e),
                g = h(a, c, d(a), k, q),
                a.setAttribute("class", u),
                l.data = g.firstMPT,
                a.style.cssText = A,
                l.xfirst = f.parse(a, g.difs, l, e)
            }
        });
        var eb = function(a) {
            if ((1 === a || 0 === a) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var b, d, c, g, f = this.t.style, e = w.transform.parse;
                if ("all" === this.e)
                    f.cssText = "",
                    c = !0;
                else
                    for (a = this.e.split(" ").join("").split(","),
                    d = a.length; -1 < --d; )
                        b = a[d],
                        w[b] && (w[b].parse === e ? c = !0 : b = "transformOrigin" === b ? Da : w[b].p),
                        Ia(f, b);
                c && (Ia(f, ea),
                g = this.t._gsTransform,
                g && (g.svg && (this.t.removeAttribute("data-svg-origin"),
                this.t.removeAttribute("transform")),
                delete this.t._gsTransform))
            }
        };
        Q("clearProps", {
            parser: function(a, b, d, c, l) {
                return l = new W(a,d,0,0,l,2),
                l.setRatio = eb,
                l.e = b,
                l.pr = -10,
                l.data = c._tween,
                n = !0,
                l
            }
        });
        e = ["bezier", "throwProps", "physicsProps", "physics2D"];
        for (Z = e.length; Z--; )
            Ya(e[Z]);
        e = k.prototype;
        e._firstPT = e._lastParsedTransform = e._transform = null;
        e._onInitTween = function(a, b, f) {
            if (!a.nodeType)
                return !1;
            this._target = a;
            this._tween = f;
            this._vars = b;
            v = b.autoRound;
            n = !1;
            q = b.suffixMap || k.suffixMap;
            p = ya(a, "");
            c = this._overwriteProps;
            var g, l, e, m, A, u;
            u = a.style;
            if (I && "" === u.zIndex && (g = O(a, "zIndex", p),
            ("auto" === g || "" === g) && this._addLazySet(u, "zIndex", 0)),
            "string" == typeof b && (m = u.cssText,
            g = d(a, p),
            u.cssText = m + ";" + b,
            g = h(a, g, d(a)).difs,
            !ia && oa.test(b) && (g.opacity = parseFloat(RegExp.$1)),
            b = g,
            u.cssText = m),
            b.className ? this._firstPT = l = w.className.parse(a, b.className, "className", this, null, null, b) : this._firstPT = l = this.parse(a, b, null),
            this._transformType) {
                b = 3 === this._transformType;
                ea ? H && (I = !0,
                "" === u.zIndex && (e = O(a, "zIndex", p),
                ("auto" === e || "" === e) && this._addLazySet(u, "zIndex", 0)),
                E && this._addLazySet(u, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (b ? "visible" : "hidden"))) : u.zoom = 1;
                for (e = l; e && e._next; )
                    e = e._next;
                u = new W(a,"transform",0,0,null,2);
                this._linkCSSP(u, null, e);
                u.setRatio = ea ? bb : ab;
                u.data = this._transform || za(a, p, !0);
                u.tween = f;
                u.pr = -1;
                c.pop()
            }
            if (n) {
                for (; l; ) {
                    a = l._next;
                    for (e = m; e && e.pr > l.pr; )
                        e = e._next;
                    (l._prev = e ? e._prev : A) ? l._prev._next = l : m = l;
                    (l._next = e) ? e._prev = l : A = l;
                    l = a
                }
                this._firstPT = m
            }
            return !0
        }
        ;
        e.parse = function(a, b, d, c) {
            var e, f, g, h, k, n, A, u, t, x = a.style;
            for (e in b) {
                k = b[e];
                if (f = w[e])
                    d = f.parse(a, k, e, this, d, c, b);
                else if (f = O(a, e, p) + "",
                u = "string" == typeof k,
                "color" === e || "fill" === e || "stroke" === e || -1 !== e.indexOf("Color") || u && T.test(k))
                    u || (k = Ea(k),
                    k = (3 < k.length ? "rgba(" : "rgb(") + k.join(",") + ")"),
                    d = Ga(x, e, f, k, !0, "transparent", d, 0, c);
                else if (!u || -1 === k.indexOf(" ") && -1 === k.indexOf(",")) {
                    n = (g = parseFloat(f)) || 0 === g ? f.substr((g + "").length) : "";
                    if ("" === f || "auto" === f)
                        if ("width" === e || "height" === e) {
                            g = a;
                            var D = e;
                            n = p;
                            t = parseFloat("width" === D ? g.offsetWidth : g.offsetHeight);
                            var D = m[D]
                              , y = D.length;
                            for (n = n || ya(g, null); -1 < --y; )
                                t -= parseFloat(O(g, "padding" + D[y], n, !0)) || 0,
                                t -= parseFloat(O(g, "border" + D[y] + "Width", n, !0)) || 0;
                            g = t;
                            n = "px"
                        } else
                            "left" === e || "top" === e ? (g = qa(a, e, p),
                            n = "px") : (g = "opacity" !== e ? 0 : 1,
                            n = "");
                    (t = u && "=" === k.charAt(1)) ? (h = parseInt(k.charAt(0) + "1", 10),
                    k = k.substr(2),
                    h *= parseFloat(k),
                    A = k.replace(K, "")) : (h = parseFloat(k),
                    A = u ? k.replace(K, "") : "");
                    "" === A && (A = e in q ? q[e] : n);
                    k = h || 0 === h ? (t ? h + g : h) + A : b[e];
                    n !== A && "" !== A && (h || 0 === h) && g && (g = na(a, e, g, n),
                    "%" === A ? (g /= na(a, e, 100, "%") / 100,
                    !0 !== b.strictUnits && (f = g + "%")) : "em" === A || "rem" === A || "vw" === A || "vh" === A ? g /= na(a, e, 1, A) : "px" !== A && (h = na(a, e, h, A),
                    A = "px"),
                    t && (h || 0 === h) && (k = h + g + A));
                    t && (h += g);
                    !g && 0 !== g || !h && 0 !== h ? void 0 !== x[e] && (k || "NaN" != k + "" && null != k) ? (d = new W(x,e,h || g || 0,0,d,-1,e,!1,0,f,k),
                    d.xs0 = "none" !== k || "display" !== e && -1 === e.indexOf("Style") ? k : f) : window.console && console.log("invalid " + e + " tween value: " + b[e]) : (d = new W(x,e,g,h - g,d,0,e,!1 !== v && ("px" === A || "zIndex" === e),0,f,k),
                    d.xs0 = A)
                } else
                    d = Ga(x, e, f, k, !0, null, d, 0, c);
                c && d && !d.plugin && (d.plugin = c)
            }
            return d
        }
        ;
        e.setRatio = function(a) {
            var b, d, c, e = this._firstPT;
            if (1 !== a || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                if (a || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1E-6 === this._tween._rawPrevTime)
                    for (; e; ) {
                        if (b = e.c * a + e.s,
                        e.r ? b = Math.round(b) : 1E-6 > b && -1E-6 < b && (b = 0),
                        e.type)
                            if (1 === e.type)
                                if (c = e.l,
                                2 === c)
                                    e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2;
                                else if (3 === c)
                                    e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3;
                                else if (4 === c)
                                    e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4;
                                else if (5 === c)
                                    e.t[e.p] = e.xs0 + b + e.xs1 + e.xn1 + e.xs2 + e.xn2 + e.xs3 + e.xn3 + e.xs4 + e.xn4 + e.xs5;
                                else {
                                    d = e.xs0 + b + e.xs1;
                                    for (c = 1; c < e.l; c++)
                                        d += e["xn" + c] + e["xs" + (c + 1)];
                                    e.t[e.p] = d
                                }
                            else
                                -1 === e.type ? e.t[e.p] = e.xs0 : e.setRatio && e.setRatio(a);
                        else
                            e.t[e.p] = b + e.xs0;
                        e = e._next
                    }
                else
                    for (; e; )
                        2 !== e.type ? e.t[e.p] = e.b : e.setRatio(a),
                        e = e._next;
            else
                for (; e; ) {
                    if (2 !== e.type)
                        if (e.r && -1 !== e.type)
                            if (b = Math.round(e.s + e.c),
                            e.type) {
                                if (1 === e.type) {
                                    d = e.xs0 + b + e.xs1;
                                    for (c = 1; c < e.l; c++)
                                        d += e["xn" + c] + e["xs" + (c + 1)];
                                    e.t[e.p] = d
                                }
                            } else
                                e.t[e.p] = b + e.xs0;
                        else
                            e.t[e.p] = e.e;
                    else
                        e.setRatio(a);
                    e = e._next
                }
        }
        ;
        e._enableTransforms = function(a) {
            this._transform = this._transform || za(this._target, p, !0);
            this._transformType = this._transform.svg && xa || !a && 3 !== this._transformType ? 2 : 3
        }
        ;
        var fb = function(a) {
            this.t[this.p] = this.e;
            this.data._linkCSSP(this, this._next, null, !0)
        };
        e._addLazySet = function(a, b, d) {
            a = this._firstPT = new W(a,b,0,0,this._firstPT,2);
            a.e = d;
            a.setRatio = fb;
            a.data = this
        }
        ;
        e._linkCSSP = function(a, b, d, c) {
            return a && (b && (b._prev = a),
            a._next && (a._next._prev = a._prev),
            a._prev ? a._prev._next = a._next : this._firstPT === a && (this._firstPT = a._next,
            c = !0),
            d ? d._next = a : c || null !== this._firstPT || (this._firstPT = a),
            a._next = b,
            a._prev = d),
            a
        }
        ;
        e._kill = function(a) {
            var d, c, e, f = a;
            if (a.autoAlpha || a.alpha) {
                f = {};
                for (c in a)
                    f[c] = a[c];
                f.opacity = 1;
                f.autoAlpha && (f.visibility = 1)
            }
            return a.className && (d = this._classNamePT) && (e = d.xfirst,
            e && e._prev ? this._linkCSSP(e._prev, d._next, e._prev._prev) : e === this._firstPT && (this._firstPT = d._next),
            d._next && this._linkCSSP(d._next, d._next._next, e._prev),
            this._classNamePT = null),
            b.prototype._kill.call(this, f)
        }
        ;
        var Ja = function(a, b, c) {
            var e, f, g;
            if (a.slice)
                for (e = a.length; -1 < --e; )
                    Ja(a[e], b, c);
            else
                for (a = a.childNodes,
                e = a.length; -1 < --e; )
                    f = a[e],
                    g = f.type,
                    f.style && (b.push(d(f)),
                    c && c.push(f)),
                    1 !== g && 9 !== g && 11 !== g || !f.childNodes.length || Ja(f, b, c)
        };
        return k.cascadeTo = function(a, b, d) {
            var c, e, g;
            g = f.to(a, b, d);
            var k = [g]
              , m = []
              , n = []
              , p = []
              , q = f._internals.reservedProps;
            a = g._targets || g.target;
            Ja(a, m, p);
            g.render(b, !0, !0);
            Ja(a, n);
            g.render(0, !0, !0);
            g._enabled(!0);
            for (a = p.length; -1 < --a; )
                if (c = h(p[a], m[a], n[a]),
                c.firstMPT) {
                    c = c.difs;
                    for (e in d)
                        q[e] && (c[e] = d[e]);
                    g = {};
                    for (e in c)
                        g[e] = m[a][e];
                    k.push(f.fromTo(p[a], b, g, c))
                }
            return k
        }
        ,
        b.activate([k]),
        k
    }, !0)
});
_gsScope._gsDefine && _gsScope._gsQueue.pop()();
(function(b) {
    var f = function() {
        return (_gsScope.GreenSockGlobals || _gsScope)[b]
    };
    "function" == typeof define && define.amd ? define(["TweenLite"], f) : "undefined" != typeof module && module.exports && (require("../TweenLite.js"),
    module.exports = f())
})("CSSPlugin");
var BrowserDetect = {
    init: function() {
        BrowserDetect.MOBILE = BrowserDetect.checkMobile();
        BrowserDetect.TABLET = BrowserDetect.checkTablet();
        BrowserDetect.MOBILE || BrowserDetect.TABLET || (BrowserDetect.DESKTOP = !0);
        BrowserDetect.MOBILE ? BrowserDetect.DEVICE = "mobile" : BrowserDetect.TABLET ? BrowserDetect.DEVICE = "tablet" : BrowserDetect.DESKTOP && (BrowserDetect.DEVICE = "desktop");
        BrowserDetect.BROWSER_NAME = this.searchString(this.dataBrowser) || "An unknown browser";
        BrowserDetect.BROWSER_VERSION = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
        BrowserDetect.OS = this.searchString(this.dataOS) || "an unknown OS";
        "Firefox" == BrowserDetect.BROWSER_NAME ? BrowserDetect.FIREFOX = !0 : "Chrome" == BrowserDetect.BROWSER_NAME ? BrowserDetect.CHROME = !0 : "Safari" == BrowserDetect.BROWSER_NAME ? BrowserDetect.SAFARI = !0 : "Explorer" == BrowserDetect.BROWSER_NAME ? BrowserDetect.IE = !0 : "Opera" == BrowserDetect.BROWSER_NAME && (BrowserDetect.OPERA = !0);
        BrowserDetect.IE && 8 >= BrowserDetect.BROWSER_VERSION && (BrowserDetect.IE8 = !0);
        BrowserDetect.IE && 9 == BrowserDetect.BROWSER_VERSION && (BrowserDetect.IE9 = !0);
        BrowserDetect.FIREFOX && 10 <= BrowserDetect.BROWSER_VERSION && (BrowserDetect.TRANSLATE3D_SUPPORT = !0)
    },
    searchString: function(b) {
        for (var f = 0; f < b.length; f++) {
            var n = b[f].string
              , q = b[f].prop;
            BrowserDetect.BROWSER_VERSIONSearchString = b[f].versionSearch || b[f].identity;
            if (n) {
                if (-1 != n.indexOf(b[f].subString))
                    return b[f].identity
            } else if (q)
                return b[f].identity
        }
    },
    searchVersion: function(b) {
        var f = b.indexOf(BrowserDetect.BROWSER_VERSIONSearchString);
        if (-1 != f)
            return parseFloat(b.substring(f + BrowserDetect.BROWSER_VERSIONSearchString.length + 1))
    },
    getOlderSafariVersion: function(b) {
        if (100 > b)
            return 1;
        if (125.2 > b)
            return 1.1;
        if (312.1 > b)
            return 1.2;
        if (412 > b)
            return 1.3;
        if (523.1 > b)
            return 2;
        if (523.12 >= b)
            return 3
    }
};
BrowserDetect.dataBrowser = [{
    string: navigator.userAgent,
    subString: "Chrome",
    identity: "Chrome"
}, {
    string: navigator.userAgent,
    subString: "OmniWeb",
    versionSearch: "OmniWeb/",
    identity: "OmniWeb"
}, {
    string: navigator.vendor,
    subString: "Apple",
    identity: "Safari",
    versionSearch: "Version"
}, {
    prop: window.opera,
    identity: "Opera"
}, {
    string: navigator.vendor,
    subString: "iCab",
    identity: "iCab"
}, {
    string: navigator.vendor,
    subString: "KDE",
    identity: "Konqueror"
}, {
    string: navigator.userAgent,
    subString: "Firefox",
    identity: "Firefox"
}, {
    string: navigator.vendor,
    subString: "Camino",
    identity: "Camino"
}, {
    string: navigator.userAgent,
    subString: "Netscape",
    identity: "Netscape"
}, {
    string: navigator.userAgent,
    subString: "MSIE",
    identity: "Explorer",
    versionSearch: "MSIE"
}, {
    string: navigator.userAgent,
    subString: "Gecko",
    identity: "Mozilla",
    versionSearch: "rv"
}, {
    string: navigator.userAgent,
    subString: "Mozilla",
    identity: "Netscape",
    versionSearch: "Mozilla"
}];
BrowserDetect.dataOS = [{
    string: navigator.platform,
    subString: "Win",
    identity: "Windows"
}, {
    string: navigator.platform,
    subString: "Mac",
    identity: "Mac"
}, {
    string: navigator.userAgent,
    subString: "iPhone",
    identity: "iPhone/iPod"
}, {
    string: navigator.userAgent,
    subString: "iPad",
    identity: "iPad"
}, {
    string: navigator.userAgent,
    subString: "Android",
    identity: "Android"
}, {
    string: navigator.userAgent,
    subString: "Windows CE",
    identity: "Windows CE"
}, {
    string: navigator.userAgent,
    subString: "Palm",
    identity: "Palm"
}, {
    string: navigator.userAgent,
    subString: "Blackberry",
    identity: "Blackberry"
}, {
    string: navigator.platform,
    subString: "Linux",
    identity: "Linux"
}];
BrowserDetect.checkMobile = function() {
    var b = /iphone|ipod|kindle|android|blackberry|opera mini|opera mobi|skyfire|maemo|windows phone|palm|iemobile|symbian|symbianos|fennec/i.test(navigator.userAgent.toLowerCase());
    1 == b && (BrowserDetect.TABLET = !1);
    return !0 === b ? !0 : !1
}
;
BrowserDetect.checkTablet = function() {
    var b = /ipad|sch-i800|playbook|xoom|tablet|gt-p1000|gt-p7510|sgh-t849|nexus 7|nexus 10|shw-m180s|a100|dell streak|silk/i.test(navigator.userAgent.toLowerCase());
    if (!0 === /android/i.test(navigator.userAgent.toLowerCase()) || !0 === b) {
        var b = screen.height
          , f = screen.width;
        b > f && (f = screen.height,
        b = screen.width);
        736 <= b && 1024 <= f ? b = !0 : (BrowserDetect.MOBILE = !0,
        b = !1)
    }
    1 == b && (BrowserDetect.MOBILE = !1);
    return !0 === b ? !0 : !1
}
;
BrowserDetect.has3d = function() {
    var b = document.createElement("p"), f, n = {
        webkitTransform: "-webkit-transform",
        OTransform: "-o-transform",
        msTransform: "-ms-transform",
        MozTransform: "-moz-transform",
        transform: "transform"
    };
    document.body.insertBefore(b, null);
    for (var q in n)
        void 0 !== b.style[q] && (b.style[q] = "translate3d(1px,1px,1px)",
        f = window.getComputedStyle(b).getPropertyValue(n[q]));
    document.body.removeChild(b);
    return void 0 !== f && 0 < f.length && "none" !== f
}
;
BrowserDetect.BROWSER_NAME = null;
BrowserDetect.BROWSER_VERSION = null;
BrowserDetect.OS = null;
BrowserDetect.DEVICE = "";
BrowserDetect.MOBILE = !1;
BrowserDetect.TABLET = !1;
BrowserDetect.DESKTOP = !1;
BrowserDetect.CHROME = !1;
BrowserDetect.SAFARI = !1;
BrowserDetect.FIREFOX = !1;
BrowserDetect.OPERA = !1;
BrowserDetect.IE = !1;
BrowserDetect.IE8 = !1;
BrowserDetect.IE9 = !1;
BrowserDetect.TRANSLATE3D_SUPPORT = BrowserDetect.has3d();
BrowserDetect.init();
(function(b) {
    function f() {
        b.scrollTo(q.x, q.y)
    }
    var n = {}
      , q = {};
    n.scroll = function(p) {
        var c = {
            x: 0,
            y: 0,
            speed: .8,
            ease: Quad.easeInOut,
            animate: !0,
            onComplete: function() {},
            onUpdate: function() {}
        }, k;
        for (k in p)
            c[k] = p[k];
        q.x = n.getPositionX();
        q.y = n.getPositionY();
        c.animate ? TweenLite.to(q, c.speed, {
            onUpdate: f,
            x: c.x,
            y: c.y,
            ease: c.ease,
            onComplete: c.onComplete
        }) : b.scrollTo(c.x, c.y)
    }
    ;
    n._setPositions = function() {
        q.x = b.pageXOffset || document.body.scrollLeft;
        q.y = b.pageYOffset || document.body.scrollTop;
        0 > q.x && (q.x = 0);
        0 > q.y && (q.y = 0)
    }
    ;
    n.getPositionX = function() {
        return q.x
    }
    ;
    n.getPositionY = function() {
        return q.y
    }
    ;
    (function() {
        n._setPositions();
        b.addEventListener("scroll", function(b) {
            n._setPositions()
        })
    })();
    b.WindowScroll = n
})(window);
function CreateDiv(b) {
    b = b || document.createElement("div");
    b._x = 0;
    b._y = 0;
    b._rotation = 0;
    b._update = CreateDiv.update;
    return b
}
CreateDiv.prefix = "";
CreateDiv.jsTransform = "";
CreateDiv.update = function() {
    var b = "";
    if (0 != this._x || 0 != this._y)
        b = BrowserDetect.TRANSLATE3D_SUPPORT ? b + ("translate3d(" + this._x + "px, " + this._y + "px, 0) ") : b + ("translate(" + this._x + "px, " + this._y + "px) ");
    0 != this._rotation && (b += "rotate(" + this._rotation + "deg) ");
    this.style[CreateDiv.jsTransform] = b
}
;
CreateDiv.setPrefix = function() {
    if (!BrowserDetect.IE8) {
        var b = window.getComputedStyle(document.documentElement, "")
          , b = (Array.prototype.slice.call(b).join("").match(/-(moz|webkit|ms)-/) || "" === b.OLink && ["", "o"])[1];
        CreateDiv.prefix = b[0].toUpperCase() + b.substr(1);
        "ms" == CreateDiv.prefix.toLowerCase() && (CreateDiv.prefix = "ms");
        CreateDiv.jsTransform = CreateDiv.prefix + "Transform"
    }
}
;
CreateDiv.setPrefix();
var Template = {
    extend: function(b, f) {
        var n;
        f = f || [];
        n = b.apply(b, f);
        n._super = n._super || {};
        n.override = function(b, f) {
            void 0 !== this[b] && (this._super[b] = this[b]);
            this[b] = f
        }
        ;
        return n
    }
};
function AssetLoader() {
    function b() {
        e = !1;
        var f = document.createElement("img");
        f.onload = function(v) {
            f.onload = null;
            n.push({
                path: w + q[p],
                element: v.target
            });
            p++;
            k(p / q.length);
            p >= q.length ? (e = !0,
            c()) : b()
        }
        ;
        f.onerror = function(b) {
            y(b)
        }
        ;
        f.src = w + q[p];
    }
    var f = {}, n = [], q = [], p, c, k, y, w = "", e = !0;
    f.setBasePath = function(b) {
        w = b || ""
    }
    ;
    f.getBasePath = function() {
        return w
    }
    ;
    f.load = function(f, n, w, P) {
        q = f;
        c = n;
        k = w;
        y = P;
        p = 0;
        e && b()
    }
    ;
    f.restart = function() {
        p = 0;
        n = [];
        b()
    }
    ;
    f.getAsset = function(b) {
        for (var c = 0, e = n.length; c < e; c++)
            if (n[c].path == b)
                return n[c].element.cloneNode();
        console.log(b + " wasnt found.")
    }
    ;
    return f
}
;function Swipe(b, f, n, q, p) {
    function c(b) {
        if (null == b.targetTouches || b.targetTouches.length == w)
            e = (null == b.targetTouches ? b : b.targetTouches[0]).pageX,
            v = !0
    }
    function k(b) {
        null != b.targetTouches && b.targetTouches.length != w || 1 != v || (b = e - (null == b.targetTouches ? b : b.targetTouches[0]).pageX,
        "left" == n && b > f ? (v = !1,
        I()) : "right" == n && -1 * b > f && (v = !1,
        I()))
    }
    function y(b) {
        v = !1
    }
    var w = p || 1
      , e = 0
      , v = !1
      , I = q;
    this.deactivate = function() {
        b.removeEventListener("touchmove", k, !1);
        b.removeEventListener("touchstart", c, !1);
        b.removeEventListener("touchend", y, !1);
        b.removeEventListener("mousemove", k, !1);
        b.removeEventListener("mousedown", c, !1);
        b.removeEventListener("mouseup", y, !1)
    }
    ;
    this.activate = function() {
        b.addEventListener("touchmove", k, !1);
        b.addEventListener("touchstart", c, !1);
        b.addEventListener("touchend", y, !1);
        b.addEventListener("mousemove", k, !1);
        b.addEventListener("mousedown", c, !1);
        b.addEventListener("mouseup", y, !1)
    }
    ;
    this.activate()
}

// CREATES AND INITIALIZES NAVIGATION BAR
;function Nav() {
    function b(b) {
        _nav.style.width = Model.viewport.width + "px"
    }
    var f = {}, n, q, p, c;
    f.showX = function() {
		m = document.querySelector(".menu-list");
        document.body.classList.remove("home");
        TweenLite.to(p, .4, {
            delay: .6,
            top: Model.viewport.width < 450 ? 80 : 25,
            ease: Quart.easeOut
        })
		TweenLite.to(m, .4, {
			delay: .6,
			opacity: 0,
			ease: Quart.easeOut
		})
    }
    ;
    f.hideX = function() {
		m = document.querySelector(".menu-list");
        document.body.classList.add("home");
        TweenLite.to(p, .3, {
            top: -30,
            ease: Quart.easeIn
        })
		TweenLite.to(m, .4, {
			delay: .6,
			opacity: 1,
			ease: Quart.easeOut
		})
    }
    ;
    f.animateIn = function() {
        TweenLite.to(_nav, .7, {
            top: 0,
            ease: Quad.easeOut
        })
    }
    ;
    _nav = document.querySelector(".nav");
	_nav.style.visibility = "visible";
    n = document.querySelector(".nav_logo");
    q = document.querySelector(".nav_burger");
    p = document.querySelector(".nav_x");
    document.querySelector("body main");
    window.addEventListener("resize", b);
    p.addEventListener("click", function(b) {
        Controller.updateURL("/")
    });
    b();
    _nav.style.top = "-100px";
    return f
}

;function List() {
    function b(b) {
        var c = {};
        1650 <= Model.viewport.width && 1070 <= Model.viewport.height ? (c.multiplier = 1.25,
        c.width = 1120,
        c.height = 700) : 1500 <= Model.viewport.width && 880 <= Model.viewport.height ? (c.multiplier = 1.12,
        c.width = 960,
        c.height = 600) : 1220 <= Model.viewport.width && 720 <= Model.viewport.height ? (c.multiplier = 1,
        c.width = 800,
        c.height = 500) : 980 <= Model.viewport.width && 620 <= Model.viewport.height ? (c.multiplier = .9,
        c.width = 640,
        c.height = 400) : 780 <= Model.viewport.width && 500 <= Model.viewport.height ? (c.multiplier = .8,
        c.width = 480,
        c.height = 300) : (c.multiplier = .7,
        c.width = 240,
        c.height = 150);
        if (Model.tileDimensions != c && (Model.tileDimensions = c,
        !1 !== b && a))
            for (b = 0; b < a.length; b++) {
                var e = a[b];
                e.isOpen || (e.style.width = c.width + "px",
                e.style.height = c.height + "px")
            }
    }
    function f(c) {
        b();
        for (var e = a[0].clientWidth, f = (Model.viewport.height - a[0].clientHeight) / 2, k = (Model.viewport.width - e) / 2, n = Math.floor((Model.viewport.width - e - 2 * H) / 2), p = 0; p < a.length; p++) {
            var q = a[p];
            q.isOpen || (q.style.top = Math.floor(f) + "px",
            q.style.left = Math.floor(k) + "px");
            k += e + n
        }
        !0 === c && (E._x = Math.floor(-a[F].offsetLeft + (Model.viewport.width - Model.tileDimensions.width) / 2),
        E._update())
    }
    function n(a) {
        37 == a.keyCode ? k() : 39 == a.keyCode && c()
    }
    function q(a) {
        z || (a.preventDefault(),
        N || ("Firefox" == BrowserDetect.BROWSER_NAME ? 3 < a.detail ? (N = !0,
        c()) : -3 > a.detail && (N = !0,
        k()) : -70 > a.wheelDelta ? (N = !0,
        c()) : 70 < a.wheelDelta && (N = !0,
        k())))
    }
    function p(b) {
        a[F].deselect();
        F = b;
        w();
        setTimeout(a[F].select, 150);
        y()
    }
    function c() {
        if (F + 1 > a.length - 1){
			N = !1;
		} else {
			a[F].deselect();
        	F++;
        	w();
        	setTimeout(a[F].select, 150);
        	y();
		}
    }
    function k() {
		if (0 > F - 1){
			N = !1;
		} else {
			a[F].deselect();
        	F--;
        	w();
        	setTimeout(a[F].select, 150);
        	y();
		}
    }
    function y() {
        v();
        TweenLite.to(E, .7, {
            _x: Math.floor(-a[F].offsetLeft + (Model.viewport.width - Model.tileDimensions.width) / 2),
            ease: Quart.easeInOut,
            onUpdate: function() {
                E._update()
            },
            onComplete: function() {
                N = !1
            }
        })
    }
    function w() {
        la.changeNumber(F)
    }
    function e(a) {
        H = 550 > Model.viewport.width ? 0 : 100;
        K.style.top = Math.floor(Model.viewport.height / 2) + "px";
        R.style.top = Math.floor(Model.viewport.height / 2) + "px";
        z ? b() : BrowserDetect.DESKTOP && f(!0)
    }
    function v() { 
        oa.activate();
        aa.activate();
        4 === F ? R.classList.remove("arrow-right-show") : R.classList.add("arrow-right-show");
        0 === F ? K.classList.remove("arrow-left-show") : K.classList.add("arrow-left-show")
    }
    function I() {
        oa.deactivate();
        aa.deactivate();
        K.classList.remove("arrow-left-show");
        R.classList.remove("arrow-right-show")
    }
    var H = 100, P = {}, E, a, N = !1, F = 0, la, z = !1, K, R, oa, aa;
    P.animateIn = function(b) {
        TweenLite.to(la, .7, {
            delay: .7,
            opacity: 1,
            ease: Quad.easeOut
        });
        F = "" === Controller.url ? 0 : 5 - Number(Controller.url);
        w();
        var c = 1.2 + .3 * F;
        setTimeout(a[F].select, 1E3 * (c + 1 - .5));
        TweenLite.to(E, c, {
            delay: 1,
            _x: Math.floor(-a[F].offsetLeft + (Model.viewport.width - Model.tileDimensions.width) / 2),
            ease: Quart.easeInOut,
            onUpdate: function() {
                E._update()
            },
            onComplete: function() {
                v();
                b()
            }
        })
    }
    ;
    P.update = function(b) {
        z && "" === b ? (z = !1,
        a[F].close(function() {
            a[F].style.zIndex = "";
            f();
            v();
            E._x = Math.floor(-a[F].offsetLeft + (Model.viewport.width - Model.tileDimensions.width) / 2);
            E._update()
        }),
        Model.nav.hideX()) : !z && b && (z = !0,
        I(),
        b = 5 - Number(b),
        F !== b ? (a[F].deselect(),
        F = 0,
        N = !0,
        w(),
        TweenLite.to(E, .7, {
            _x: Math.floor(-a[F].offsetLeft + (Model.viewport.width - Model.tileDimensions.width) / 2),
            ease: Quart.easeInOut,
            onUpdate: function() {
                E._update()
            },
            onComplete: function() {
                Model.nav.showX();
                a[F].open();
                N = !1
            }
        })) : (Model.nav.showX(),
        a[F].open(),
        I(),
        E._x = Math.floor(-a[F].offsetLeft + (Model.viewport.width - Model.tileDimensions.width) / 2),
        E._update()))
    }
    ;
    Model.listMask = document.querySelector(".list-mask");
    E = new CreateDiv(document.querySelector(".list"));
    E.style.visibility = "visible";
    H = 550 > Model.viewport.width ? 0 : 100;
    b(!1);
    (function() {
        var b = E.querySelectorAll(".list_item");
        a = [];
        for (var c = 0; c < b.length; c++) {
            var e = new DayItem(b[c]);
            e.href = b[c].dataset.name;
            a.push(e)
        }
        la = new MenuList(p);
        Model.mainContainer.appendChild(la)
    })();
    K = Model.mainContainer.querySelector(".arrow-left");
    R = Model.mainContainer.querySelector(".arrow-right");
    K.style.top = Math.floor(Model.viewport.height / 2) + "px";
    R.style.top = Math.floor(Model.viewport.height / 2) + "px";
    K.addEventListener("click", k);
    R.addEventListener("click", c);
    f();
    E._x = Model.viewport.width;
    E._update();
    (function() {
        window.addEventListener("resize", e);
        window.addEventListener("keyup", n);
        "Firefox" == BrowserDetect.BROWSER_NAME ? window.addEventListener("DOMMouseScroll", q) : window.addEventListener("mousewheel", q);
        oa = new Swipe(document,70,"left",function() {
            !1 === z && (N = !0,
            c())
        }
        );
        aa = new Swipe(document,70,"right",function() {
            !1 === z && (N = !0,
            k())
        }
        )
    })();
    return P
}
;function DayItem(b) {
    function f(a) {
        TweenLite.to([document.documentElement, aa], .3, {
            backgroundColor: a,
            ease: Linear.easeNone
        })
    }
    function q(a) {
        !z.isOpen && ba && Controller.updateURL(z.href)
    }
	function m(a) {
		if (27 == a.keyCode) {
			Controller.updateURL("/");
		}
	}
	// WHEN MOUSE ENTER (HOVER)
    function p(a) {
        if (!z.isOpen && ba)
            for (k(),
            TweenLite.to(z, .3, {
                _y: -15,
                _x: -25,
                width: Model.tileDimensions.width + 50,
                height: Model.tileDimensions.height + 30,
                ease: Quart.easeInOut,
                onUpdate: function() {
                    z._update()
                },
                onComplete: function() {}
            }),
            a = 0; a < K.length; a++)
                TweenLite.to(K[a], .3, {
                    _x: Model.photoPositions[L][a].hoverX,
                    _y: Model.photoPositions[L][a].hoverY,
                    _rotation: Model.photoPositions[L][a].rotation,
                    ease: Quart.easeInOut,
                    onUpdate: function() {
                        this.target._update()
                    }
                })
    }
	// WHEN MOUSE LEAVE (HOVER)
    function c(a) {
        if (!z.isOpen && ba)
            for (k(),
            TweenLite.to(z, .3, {
                _y: 0,
                _x: 0,
                width: Model.tileDimensions.width,
                height: Model.tileDimensions.height,
                ease: Quart.easeInOut,
                onUpdate: function() {
                    z._update()
                },
                onComplete: function() {}
            }),
            a = 0; a < K.length; a++)
                TweenLite.to(K[a], .3, {
                    _x: Model.photoPositions[L][a].focusX,
                    _y: Model.photoPositions[L][a].focusY,
                    _rotation: Model.photoPositions[L][a].rotation,
                    ease: Quart.easeInOut,
                    onUpdate: function() {
                        this.target._update()
                    }
                })
    }
	// POSITION OF TITLE
    function k() {
        TweenLite.to(J, .3, {
            _y: 100,
            ease: Quad.easeInOut,
            onUpdate: function() {
                J._update()
            }
        });
    }
	function Contest_open() {
		TweenLite.to(Js, 0, {
			delay: 0.2,
			opacity: 1,
			ease: Quad.easeInOut,
			onUpdate: function(){
				for (i = 0; i < Js.getElementsByTagName("span").length; i++){
					var el = Js.getElementsByTagName("span")[i];
					TweenLite.to(el, .3, {
						delay: .5 + i*.5,
						opacity: 1, 
						ease: Quad.easeInOut
					});
				}
			}
		});
		TweenLite.to(Jb, .5, {
			delay: 1.8,
			opacity: 1, 
			ease: Quad.easeInOut
		});
		TweenLite.to(D, .5, {
			delay: 2,
			opacity: 1,
			bottom: 20,
			ease: Quad.easeInOut
		});
	}
	function Partners_open() {
		TweenLite.to(Jb, .5, {
			delay: .3,
			opacity: 1, 
			ease: Quad.easeInOut
		});
	}
	function Contest_close() {
		TweenLite.to(Js, .3, {
			opacity: 0,
			ease: Quad.easeInOut,
			onUpdate: function(){
				for (i = 0; i < Js.getElementsByTagName("span").length; i++){
					var el = Js.getElementsByTagName("span")[i];
					TweenLite.to(el, 0, {
						opacity: 0, 
						ease: Quad.easeInOut
					});
				}
			}
		});
		TweenLite.to(Jb, .3, {
			opacity: 0,
			ease: Quad.easeInOut
		});
		TweenLite.to(D, .3, {
			opacity: 0,
			bottom: 30,
			ease: Quad.easeInOut
		});
	}
	function Partners_close() {
		TweenLite.to(Jb, .3, {
			opacity: 0, 
			ease: Quad.easeInOut
		});
	}
    function w() {
		for (var d = 0; d < R.length; d++)
        	for (var a = R[d].querySelectorAll(".album__designer span"), b = 0; b < a.length; b++)
            	a[b].addEventListener("click", e)
    }
    function e(a) {
        if (a = this.getAttribute("data-artist-name").toLowerCase())
            a = document.body.querySelectorAll('img[data-artist-name="' + a + '"]'),
            V = new ArtistPanel(this.innerHTML,a,v),
            document.body.appendChild(V)
    }
    function v() {
        document.body.removeChild(V);
        V = null
    }
	// UPDATES POSITION OF PHOTOS
    function I() {
        K = [];
        for (var a = b.querySelectorAll(".list_photo"), c = 0; c < a.length; c++) {
            var e = new CreateDiv(a[c]);
            e._x = Model.photoPositions[L][c].x * Model.tileDimensions.multiplier;
            e._y = Model.photoPositions[L][c].y * Model.tileDimensions.multiplier;
            e._rotation = Model.photoPositions[L][c].rotation;
            e._update();
            K.push(e)
        }
    }
    // ADICIONAR AQUI PLAY DO VIDEO
    function P(b) {
        if (b.currentTarget.querySelector("iframe"))
            a();
        else {
            a();
            b.currentTarget.classList.add("playing");
            var c = document.createElement("iframe");
            c.src = "https://www.youtube.com/embed/" + b.currentTarget.getAttribute("data-media") + "?rel=0&amp;controls=1&amp;showinfo=0&amp;autoplay=1";
			c.classList.add("videotalk");
            c.frameborder = "0";
            c.allowtransparency = "true";
            c.style.display = "block";
			c.setAttribute('allowFullScreen', '');
			c.setAttribute('webkitAllowFullScreen', '');
			c.setAttribute('mozallowFullScreen', '');
            b.currentTarget.appendChild(c);
			
			// HIDES THUMBNAIL & ICON
			c.parentNode.getElementsByTagName("img")[0].style.display = "none";
			c.parentNode.getElementsByTagName("div")[0].style.display = "none";
			c.style.border = 0;
        }
    }
	// CHANGES PLACEHOLDER IMAGE WITH THUMBNAIL FROM TALK
    function E() {
        ca = !0;
        for (var a = b.querySelectorAll(".talkcontainer"), c = 0; c < a.length; c++) {
			// ADD THUMBNAIL
            var e = document.createElement("img");
            e.num = c;
            e.onload = function() {
                a[this.num].src = this.src
            };
            e.src = Model.IMAGE_PATH + "https://img.youtube.com/vi/" + a[c].getAttribute("data-media") + "/hqdefault.jpg"
			e.classList.add("imgtalk");
			a[c].appendChild(e);
			
			// ADD YOUTUBE ICON
			var f = document.createElement("div");
			f.classList.add("hoverlay");
			a[c].appendChild(f); 
        }
    }
	// TERMINA A TALK
    function a() {
        for (var a = b.querySelectorAll(".playing"), c = 0; c < a.length; c++) {
            var e = a[c];
            e.classList.remove("playing");
			e.getElementsByTagName("img")[0].style.display = "block";
			e.getElementsByTagName("div")[0].style.display = "block";
            (e = e.querySelector("iframe")) && e.parentNode.removeChild(e)
        }
    }
    function N(a) {
        f(Model.colors[T]);
        Model.listMask.style.height = "100%";
        document.documentElement.style.backgroundColor = "";
		for (var jj = 0; jj < R.length; jj++)
			R[jj].style.display = "";
		S[0].style.display = "";
        oa.style.overflow = "";
        z.style.cursor = "pointer";
        z.isOpen = !1;
        z.select();
        aa.style.height = "";
		if (rn) {
			Rn[0].style.display = "";
		}  
		if (rp) {
			bg.style.filter = "blur(5px)";
			Rp[0].style.display = "";
			Partners_close();
		}
		if (rc) {
			Rc[0].style.display = "";
			bg.style.filter = "blur(5px)";	
			Contest_close();
		}
		if (rpe) {
			for (var jj = 0; jj < Q.length; jj++)
				Q[jj].style.display = "";
		}
		TweenLite.to(z, .6, {
            delay: .2,
            top: Math.ceil((Model.viewport.height - Model.tileDimensions.height) / 2),
			_y: 0,
            _x: 0,
            width: Model.tileDimensions.width,
            height: Model.tileDimensions.height,
            ease: Quart.easeInOut,
            onUpdate: function() {
                z._update()
            },
            onComplete: function() {
                z.style.zIndex = "";
                a()
            }
        })
    }
	// UPDATES LISTMASK HEIGHT
    function F() {
		var h = Model.viewport.height*0.47 + 646, // DON'T CHANGE!
			a = 0;
		// Sections -----
		// NEWS
		if (rn) {
			// Item-section-news
			var d = 0, h = Model.viewport.height - 100, a = h, c = Rn[0], e = 0;
			c.style.top = h + "px";
			c.style.display = "block";
			c.style.border = "1px solid transparent"; 
			var list = c.getElementsByClassName("social-feed-element");
			for (var b = 0; b < list.length; b++) {
				d += list[b].clientHeight + 25; 
			}
			if (Model.viewport.width > 1100) {
				e = Math.round(d/2);
				for (var b = 0; b < list.length; b++) {
					e -= list[b].clientHeight + 25;
					if (e < 0) {
						e = Math.round(d/2 + Math.abs(e));
						break;
					}
				}
				c.style.height = e + 140 + "px";
			} else {
				c.style.height = d + 184 + "px";
			}
            a += c.clientHeight + 40;
		// SPEAKERS
		} else if (rs) {
			h = Model.viewport.height;
			a = h;
		// PARTNERS
		} else if (rp) {
			// Item-section-intro
			h = Model.viewport.height;
			a = h;
			c = Rp[0];
			c.style.top = h; 
			c.style.display = "block";
			c.style.border = "1px solid transparent"; 
            c.style.height = "280px";
            a += 280;
			// Item-section
			for (var b = 0; b < R.length; b++) {
            	var c = R[b];
				c.style.top = h + "px";
				c.style.display = "block";
            	c.style.height = Model.viewport.width > 1100 ? "260px" : Model.viewport.width < 600 ? "370px" : "500px";
            	c.style.border = "1px solid transparent";
            	a += Model.viewport.width > 1100 ? 300 : Model.viewport.width < 600 ? 410 : 540;
        	}
		// CONTEST
		} else if (rc) {
			// Item-section-contest
			h = Model.viewport.height;
			a = h;
			c = Rc[0];
			c.style.top = h; 
			c.style.display = "block";
			c.style.border = "1px solid transparent"; 
            c.style.height = "100px";
            a += 100;	 
		// PAST EDITIONS
		} else {
			a = h;
			// Item-section
			for (var b = 0; b < R.length; b++) {
            	var c = R[b];
				c.style.top = h + "px";
				c.style.display = "block";
            	c.style.height = Model.viewport.width > 1100 ? "260px" : Model.viewport.width < 600 ? "370px" : "500px";
            	c.style.border = "1px solid transparent";
            	a += Model.viewport.width > 1100 ? 300 : Model.viewport.width < 600 ? 410 : 540;
        	}
			// Especial section - editions
			for (var b=0; b < Q.length; b++) {
				var c = Q[b];
				c.style.top = h + "px";
				c.style.display = "block";
				c.style.height = Model.viewport.width > 1100 ? "260px" : Model.viewport.width < 600 ? "160px" : "200px";
				c.style.border = "1px solid transparent";
				a += Model.viewport.width > 1100 ? 300 : Model.viewport.width < 600 ? 200 : 240;
			}
		}
		// Footer
		var f = S[0];
		f.style.top = h + "px";
		f.style.display = "block";
		f.style.height = Model.viewport.width > 800 ? "180px" : Model.viewport.width < 550 ? "160px" : "140px";
		f.style.border = "1px solid transparent";
		a += Model.viewport.width > 800 ? 180 : Model.viewport.width < 550 ? 160 : 140;
		// Update listMask height
		Model.listMask.style.height = a + "px";
    }
    function la(a) {
		z.isOpen && (z.style.width = Model.viewport.width + "px",
        z.style.height = Model.viewport.height + "px",
        aa.style.height = Model.viewport.height + 0 + "px",
        z._update(),
        F())
    }
    var z = new CreateDiv(b);
    z.href;
    z.isDisabled = !1;
    z.isOpen = !1;
    var K = [], R, Rn, Rc, Rp, oa, aa, T, J, Js, Jb, D, bg, X, S, Q, ha = 0, C = !1, L = "layout-1", ba = !1, ca = !1, rn = !1, rs = !1, rp = !1, rc = !1, rpe = !1, V;
    z.open = function(a) {
		if (rc || rp) { 
			TweenLite.to(bg, .6, {
				filter: "blur(0px)",
				ease: Quart.easeInOut
			})
		}
        for (a = 0; a < K.length; a++)
            TweenLite.to(K[a], .6, {
                _x: Model.photoPositions[L][a].headerX,
                _y: Model.photoPositions[L][a].headerY,
                _rotation: Model.photoPositions[L][a].rotation,
                ease: Quart.easeInOut,
                onUpdate: function() {
                    this.target._update()
					this.target.querySelector("img").classList.remove("blur");
                }
            });
        k();
		if (rc) { 
			Contest_open(); 
		}
		if (rp) {
			Partners_open();
		}
        z.style.cursor = "";
        z.isOpen = !0;
        z.style.zIndex = 1;
        TweenLite.to(z, .6, {
            //_y: Math.ceil(-(Model.viewport.height - Model.tileDimensions.height) / 2),
            _x: Math.ceil(-(Model.viewport.width - Model.tileDimensions.width) / 2),
			top: (BrowserDetect.MOBILE || BrowserDetect.TABLET) ? 0 : 15,
            width: Model.viewport.width,
            height: Model.viewport.height,
            ease: Quart.easeInOut,
            onUpdate: function() {
                z._update()
            },
            onComplete: function() {
                document.documentElement.style.backgroundColor = Model.colors[T];
                oa.style.overflow = "visible";
                la();
				// ADICIONA VIDEO DA TALK
                for (var a = b.querySelectorAll(".talkcontainer"), c = 0; c < a.length; c++) {
                    var e = a[c];
                    e.addEventListener("click", P)
                }
                ca || E()
            }
        })
    }
    ;
    z.close = function(b) {
        V && V.close();
        a(); // TERMINA A TALK DE SER EXECUTADA
        0 < WindowScroll.getPositionY() ? WindowScroll.scroll({
            y: 0,
            speed: .4,
            onComplete: function() {
                N(b);
			}
        }) : N(b); 
    }
    ;
    z.select = function() {
        ba = !0;
        if (!z.isDisabled && BrowserDetect.DESKTOP) {
            z.style.cursor = "pointer";
            for (var a = 0; a < K.length; a++)
                TweenLite.to(K[a], .6, {
                    delay: .2 * Math.random(),
                    _x: Model.photoPositions[L][a].focusX,
                    _y: Model.photoPositions[L][a].focusY,
                    _rotation: Model.photoPositions[L][a].rotation,
                    ease: Quart.easeInOut,
                    onUpdate: function() {
                        this.target._update()
						this.target.querySelector("img").classList.add("blur");
                    }
                })
        }
    }
    ;
    z.deselect = function() {
        c();
        ba = !1;
        if (!z.isDisabled && BrowserDetect.DESKTOP) {
            z.style.cursor = "";
            for (var a = 0; a < K.length; a++)
                TweenLite.to(K[a], .4, {
                    _x: Model.photoPositions[L][a].x * Model.tileDimensions.multiplier,
                    _y: Model.photoPositions[L][a].y * Model.tileDimensions.multiplier,
                    _rotation: Model.photoPositions[L][a].rotation,
                    ease: Quart.easeInOut,
                    onUpdate: function() {
                        this.target._update()
                    }
                })
        }
    }
    ;
    R = b.querySelectorAll(".item_section");
	S = b.querySelectorAll(".page_footer")
    aa = b.querySelector(".list_bg");
    J = new CreateDiv(b.querySelector(".list_title"));	
	k();
	if (b.getAttribute("data-name") == "News") {
		rn = 1;
		Rn = b.querySelectorAll(".item_section_news");
	}
	if (b.getAttribute("data-name") == "Speakers") {
		rs = 1;
		//Rs = b.querySelectorAll(".item_section_news");
	}
	if (b.getAttribute("data-name") == "Partners") {
		rp = 1;
		Jb = b.querySelector(".list_blurb_partners"); 
		bg = b.querySelector(".bg");
		bg.style.filter = "blur(5px)";
		Rp = b.querySelectorAll(".item_section_intro");
	}
	if (b.getAttribute("data-name") == "Contest") {
		rc = 1;
		Js = b.querySelector(".list_subtitle");
		Jb = b.querySelector(".list_blurb");
		D = b.querySelector(".arrow");
		bg = b.querySelector(".bg");
		bg.style.filter = "blur(5px)";
		Rc = b.querySelectorAll(".item_section_contest");
	}
	if (b.getAttribute("data-name") == "Past editions") {
		rpe = 1;
		Q = b.querySelectorAll(".edition");
	}
    T = b.getAttribute("data-color");
    oa = b.querySelector(".list_header");
    L = b.getAttribute("data-layout") ? "layout-" + b.getAttribute("data-layout") : L;
    I();
    w();
    window.addEventListener("resize", la);
    z.addEventListener("click", q);
    BrowserDetect.DESKTOP && (z.addEventListener("mouseenter", p),
    z.addEventListener("mouseleave", c));
	document.addEventListener("keydown", m);
    return z
}

// CREATES MENU LIST
;function MenuList(b) {
    function f(c) {
        c.preventDefault();
        b && b(this.num)
    }
    var n = document.createElement("div");
    n.changeNumber = function(b) {
        n.querySelector(".menu-list_item-selected").classList.remove("menu-list_item-selected");
        setTimeout(function() {
            n.children[b].classList.add("menu-list_item-selected")
        }, 150);
    }
    ;
    n.classList.add("menu-list");
    (function() {
        for (var b = document.body.querySelectorAll(".list .list_item"), k = "blue lgrey dgrey white lgrey".split(" "), p = 0, q = 0; q < b.length; q++) {
            var v = document.createElement("a");
            v.color = k[p]; 
            v.classList.add("menu-list_item");
            v.classList.add(v.color);
			v.num = q;
            v.innerHTML = b[q].dataset.name;
            n.appendChild(v);
            p++;
            p > k.length - 1 && (k = 0);
            0 === q && v.classList.add("menu-list_item-selected");
			//v.href = b[q].dataset.name;
            v.addEventListener("click", f);
        }
    })();
    return n
}

// SOCIAL MEDIA SHARE BUTTONS
;function SocialButtons() {
    function b(b) {
        if (b.target.classList.contains("share")) { 
			b.preventDefault(),
        	b.target.classList.contains("share-facebook") ? window.open("https://www.facebook.com/sharer/sharer.php?u=https://www.tedxistalameda.com", "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600") : b.target.classList.contains("share-twitter") && window.open("https://twitter.com/share?text=TEDxISTAlameda 2017 is right around the corner! Follow along at&url=https://www.tedxistalameda.com", "", "menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600")
			}
    }
    (function() {
        for (var f = document.querySelectorAll(".share, .share-facebook, .share-twitter"), n = 0; n < f.length; n++)
            f[n].addEventListener("click", b)
    })();
    return {}
}

// THIS SHOULD COME IN HANDY IN NEAR FUTURE
;function ArtistPanel(b, f, n) {
    function q() {
        for (var b = 0; 10 > b; b++)
            if (f[b]) {
                var c = f[b].cloneNode();
                c.num = b;
                c.style.opacity = 0;
                c.onload = function() {
                    TweenLite.to(this, .2, {
                        delay: .1 * this.num,
                        opacity: 1,
                        ease: Linear.easeNone
                    })
                }
                ;
                c.onerror = function() {
                    c.src = c.getAttribute("data-image")
                }
                ;
                c.src = Model.IMAGE_PATH + c.getAttribute("data-image");
                e[b].appendChild(c)
            }
    }
    function p() {
        c.close()
    }
    var c = new CreateDiv, k, y, w, e = [];
    c.close = function() {
        TweenLite.to(k, .3, {
            opacity: 0,
            ease: Linear.easeNone
        });
        TweenLite.to(y, .3, {
            _x: y.clientWidth,
            ease: Quad.easeInOut,
            onUpdate: function() {
                y._update()
            },
            onComplete: function() {
                document.documentElement.style.overflowY = "";
                n()
            }
        })
    }
    ;
    c.classList.add("artist-panel");
    document.documentElement.style.overflowY = "hidden";
    k = document.createElement("div");
    k.classList.add("artist-panel__bg");
    c.appendChild(k);
    y = new CreateDiv;
    y.classList.add("artist-panel__sidebar");
    c.appendChild(y);
    (function() {
        w = document.createElement("div");
        w.classList.add("artist-panel__close-x");
        y.appendChild(w);
        var b = document.createElement("img");
        b.src = "/images/ui/close-x.svg";
        w.appendChild(b)
    })();
    (function() {
        var c = document.createElement("span");
        c.classList.add("artist-panel__name");
        c.innerHTML = b;
        y.appendChild(c)
    })();
    (function() {
        for (var b = 0; 10 > b; b++) {
            var c = document.createElement("div");
            c.classList.add("artist-panel__box");
            y.appendChild(c);
            var f = document.createElement("span");
            f.classList.add("artist-panel__box-num");
            f.innerHTML = 10 - b;
            c.appendChild(f);
            e.push(c)
        }
    })();
    k.addEventListener("click", p);
    w.addEventListener("click", p);
    (function() {
        y._x = 460;
        y._update();
        TweenLite.to(k, .3, {
            opacity: 1,
            ease: Linear.easeNone
        });
        TweenLite.to(y, .3, {
            _x: 0,
            ease: Quad.easeInOut,
            onUpdate: function() {
                y._update()
            },
            onComplete: function() {
                q()
            }
        })
    })();
    return c
}
;(function() {
    function b() {
        history && history.pushState && setTimeout(function() {
            window.addEventListener("popstate", f)
        }, 100)
    }
    function f(b) {
        p.url = b;
        Model.view.update()
    }
    function n() {
        return window.location.pathname.replace(/^\/|\/$/g, "")
    }
    var p = {
        url: "/",
        init: function() {
            p.url = ""; 
            b()
        },
        updateURL: function(b) {
            p.url = b;
            Model.view.update()
        }
    };
    window.Controller = p
})();

// CHANGE HERE FOR COLORS, DIMENSIONS AND POSITION OF PHOTOS
(function() {
    function b(b) {
        f.viewport.width = window.innerWidth;
        f.viewport.height = window.innerHeight
    }
    var f = {
        IMAGE_PATH: ""
    };
    f.view;
    f.nav;
    f.mainContainer = document.querySelector("body main");
    f.listMask;
    f.viewport = {
        width: 0,
        height: 0
    };
    f.tileDimensions = {
        multiplier: 1,
        width: 0,
        height: 0
    };
    f.colors = {
        blue: "#00A0E4", // IST websafe BLUE
        red:  "#FF2100", // TEDx websafe RED
		lgrey:"#E0E0E0", // Grey light "F2F2F2",
		dgrey:"#292929", // TEDx websafe GREY
		white:"#FFFFFF",// White
        pink: "#FAC8FA"  // Disabled color
    };
    f.photoPositions = {
        "layout-1": [{
            x: 700,
            y: -290,
            rotation: -50,
            focusX: 240,
            focusY: -340,
            hoverX: 230,
            hoverY: -350,
            headerX: 220,
            headerY: -360,
            scrollX: 100,
            scrollY: 100,
            scrollRotation: -5
        }, {
            x: 670,
            y: 70,
            rotation: 20,
            focusX: 480,
            focusY: 100,
            hoverX: 496,
            hoverY: 108,
            headerX: 540,
            headerY: 125,
            scrollX: -30,
            scrollY: 100,
            scrollRotation: 4
        }, {
            x: 20,
            y: 500,
            rotation: 12,
            focusX: -20,
            focusY: 345,
            hoverX: -28,
            hoverY: 361,
            headerX: -56,
            headerY: 377, 
            scrollX: 30,
            scrollY: -100,
            scrollRotation: -3
        }],
        "layout-2": [{
            x: 100,
            y: -530,
            rotation: 24,
            focusX: 120,
            focusY: -250,
            hoverX: 130,
            hoverY: -270,
            headerX: 155,
            headerY: -300,
            scrollX: 30,
            scrollY: 180,
            scrollRotation: -3
        }, {
			x: 685,
            y: 130,
            rotation: -12,
            focusX: 365,
            focusY: 90,
            hoverX: 385,
            hoverY: 105,
            headerX: 425,
            headerY: 120,
            scrollX: -90,
            scrollY: 300,
            scrollRotation: 4
        }, {
            x: -650,
            y: 120,
            rotation: -10,
            focusX: -360,
            focusY: 140,
            hoverX: -380,
            hoverY: 145,
            headerX: -430,
            headerY: 150,
            scrollX: 50,
            scrollY: 80,
            scrollRotation: -5
        }]
    };
    f.init = function() {
        BrowserDetect.DESKTOP ? (window.addEventListener("resize", b),
        b()) : (f.viewport.width = window.innerWidth,
		f.viewport.height = 630 < window.innerHeight ? window.innerHeight : 630)		
        //f.viewport.height = screen ? window.innerWidth > window.innerHeight ? 630 > screen.width ? 630 : screen.width - 40 : 630 > screen.height ? 630 : screen.height - 40 : 630 < window.innerHeight ? window.innerHeight : 630) 
    }
    ;
    window.Model = f
})();

// UPDATES VIEW
function View() {
    function b(b) {
        Model.mainContainer.style.width = Model.viewport.width + "px"
    }
    var f = {}, n;
    f.update = function() {
		var num;
		switch(Controller.url) {
			case "News":
				num = 5;
				break;
			case "Speakers":
				num = 4;
				break;
			case "Partners":
				num = 3;
				break;
			case "Contest":
				num = 2	
				break;
			case "Past editions":
				num = 1;
				break;
			default:
				num = ""; 
		}
        n.update(num)
    }
    ;
    (function() {
        Model.nav = new Nav;
        window.addEventListener("resize", b);
        b();
        n = new List;
        n.animateIn(function() {
            f.update()
        })
    })();
    return f
}

// INITIALIZES WEBSITE
;(function() {
    function b() {
        k.setBasePath("");
        k.restart()
    }
    function f() {}
    function n() {
        for (var b = 0; b < p.length; b++) {
			p[b].querySelector("img").src = k.getBasePath() + p[b].getAttribute("data-image");
		}
        b = (new Date).getTime() - w.getTime();
        Model.view = new View;
		setTimeout(function() {
            Model.nav.animateIn();
        }, 200)
    }
    var p, c = [], k, y, w;
    BrowserDetect.DESKTOP && document.body.classList.add("desktop");
    Controller.init();
    Model.init();
	w = new Date;
	p = document.querySelectorAll(".list_photo");
	for (var e = 0; e < p.length; e++) {
		c.push(p[e].getAttribute("data-image"));
	}
	k = new AssetLoader;
	k.setBasePath(Model.IMAGE_PATH);
	k.load(c, n, f, b)
    window.Main = {}
})();
window.onbeforeunload = function() {
    WindowScroll.scroll({
        y: 0,
        animate: !1
    })
}
;
window.onload = Main.init;

//-------------------------------------------------------------------------------------------
// COUNTDOWN
jQuery.fn.countdown = function(options, callback) {

  //custom 'this' selector
  var thisEl = $(this);

  //array of custom settings
  var settings = { 
	'date': '1 march 2017 00:00:00',
	'format': 'on'
  };

  //main countdown function
  var countdown_proc = function () {

	var eventDate = Date.parse(settings['date']) / 1000;
	var currentDate = Math.floor($.now() / 1000);

	if(eventDate <= currentDate) {
	  callback.call(this);
	  clearInterval(interval);
	};

	var seconds = eventDate - currentDate;

	var days = Math.floor(seconds / (60 * 60 * 24)); //calculate the number of days
	seconds -= days * 60 * 60 * 24; //update the seconds variable with no. of days removed

	var hours = Math.floor(seconds / (60 * 60));
	seconds -= hours * 60 * 60; //update the seconds variable with no. of hours removed

	var minutes = Math.floor(seconds / 60);
	seconds -= minutes * 60; //update the seconds variable with no. of minutes removed

	//conditional Ss
	if (days == 1) { thisEl.find(".timeRefDays").text("Day"); } else { thisEl.find(".timeRefDays").text("Days"); }
	if (hours == 1) { thisEl.find(".timeRefHours").text("Hour"); } else { thisEl.find(".timeRefHours").text("Hours"); }
	if (minutes == 1) { thisEl.find(".timeRefMinutes").text("Minute"); } else { thisEl.find(".timeRefMinutes").text("Minutes"); }
	if (seconds == 1) { thisEl.find(".timeRefSeconds").text("Second"); } else { thisEl.find(".timeRefSeconds").text("Seconds"); }

	//logic for the two_digits ON setting
	if(settings['format'] == "on") {
	  days = (String(days).length >= 2) ? days : "0" + days;
	  hours = (String(hours).length >= 2) ? hours : "0" + hours;
	  minutes = (String(minutes).length >= 2) ? minutes : "0" + minutes;
	  seconds = (String(seconds).length >= 2) ? seconds : "0" + seconds;
	}

	//update the countdown's html values.
	if(!isNaN(eventDate)) {
	  thisEl.find(".days").text(days);
	  thisEl.find(".hours").text(hours);
	  thisEl.find(".minutes").text(minutes);
	  thisEl.find(".seconds").text(seconds);
	} else { 
	  alert("Invalid date. Here's an example: 12 Tuesday 2012 17:30:00");
	  clearInterval(interval); 
	}
  }

  //run the function
  countdown_proc();

  //loop the function
  interval = setInterval(countdown_proc, 1000);
}