/**
 *
 *
 */
(function (window) {
	
	'use strict';
	
	function hasParent(e, p) {
		if (!e) return false;
		var el = e.target || e.srcElement || e || false;
		while (el && el != p) {
			el = el.parentNode || false;
		}
		return (el !== false);
	}
	
	function extend(a, b) {
		for (var key in b) {
			if (b.hasOwnProperty(key)) {
				a[key] = b[key];
			}
		}
		return a;
	}
	
	function PokerSelectFx(el, options) {
		this.el = el;
		this.options = extend({}, this.options);
		extend(this.options, options);
		this._init();
	}
	
	PokerSelectFx.prototype.options = {
		newTab: true,
		stickyPlaceholder: true,
		onChange: function (val) {
			return false;
		}
	};
	
	PokerSelectFx.prototype._init = function () {
		var selectedOpt = this.el.querySelector('option[selected]');
		this.hasDefaultPlaceholder = selectedOpt && selectedOpt.disabled;
		
		this.selectedOpt = selectedOpt || this.el.querySelector('option');
		
		this._createSelectEl();
		
		this.selOpts = [].slice.call(this.selEl.querySelectorAll('li[data-option]'));
		
		this.selOptsCount = this.selOpts.length;
		
		this.current = this.selOpts.indexOf(this.selEl.querySelector('li.selected')) || -1;
		
		this.selPlaceholder = this.selEl.querySelector('span.placeholder');
		
		this._initEvents();
	};
	
	PokerSelectFx.prototype._createSelectEl = function () {
		var self = this, options = '', createOptionHTML = function (el) {
			var optclass = '', classes = '', link = '';

			if (el.selectedOpt && !self.foundSelected && !self.hasDefaultPlaceholder) {
				classes += ' selected ';
				this.foundSelected = true;
			}
			
			if (el.getAttribute('class')) {
				el.removeAttribute('class');
			}
			
			if (el.getAttribute('data-link')) {
				link = 'data-link=' + el.getAttribute('data-link');
			}
			
			if (classes !== '') {
				optclass = 'class="' + classes + '" ';
			} else {
				optclass += 'class="poker select option"';
			}
			
			return '<li ' + optclass + link + ' data-option data-value="' + el.value + '"><span>' + el.textContent + '</span></li>';
		};
		
		[].slice.call(this.el.children).forEach(function (el) {
			if (el.disabled) {
				return;
			}
			
			var tag = el.tagName.toLowerCase();
			
			if (tag === 'option') {
				options += createOptionHTML(el);
			} else if (tag === 'optgroup') {
				options += '<li class="poker select optgroup"><span>' + el.label + '</span><ul>';
				[].slice.call(el.children).forEach(function (opt) {
					options += createOptionHTML(opt);
				});
				
				options += '</ul></li>';
			}
		});

		var opts_el = '<div class="poker select options"><ul>' + options + '</ul></div>';
		this.selEl = document.createElement('div');
		this.selEl.className = this.el.className;
		this.el.removeAttribute('class');
		this.el.style.display = "none";
		this.selEl.tabIndex = this.el.tabIndex;
		this.selEl.innerHTML = '<span class="poker select placeholder">' + this.selectedOpt.textContent + '</span>' + opts_el;
		this.el.parentNode.appendChild(this.selEl);
		this.selEl.appendChild(this.el);
	};
	
	PokerSelectFx.prototype._initEvents = function() {
		var self = this;
		
		this.selPlaceholder.addEventListener('click', function() {
			self._toggleSelect();
		});
		
		this.selOpts.forEach(function(opt, idx) {
			opt.addEventListener('click', function() {
				self.current = idx;
				self._changeOption();
				self._toggleSelect();
			});
		});
		
		document.addEventListener('click', function(ev) {
			var target = ev.target;
			if (self._isOpen() && target !== self.selEl && !hasParent(target, self.selEl)) {
				self._toggleSelect();
			}
		});
		
		this.selEl.addEventListener('keydown', function(ev) {
			var keyCode = ev.keyCode || ev.which;
			
			switch (keyCode) {
				case 38:
					ev.preventDefault();
					self._navigateOpts('prev');
					break;
				case 40:
					ev.preventDefault();
					self._navigateOpts('next');
					break;
				case 32:
					ev.preventDefault();
					if (self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1) {
						self._changeOption();
					}
					self._toggleSelect();
					break;
				case 13:
					ev.preventDefault();
					if (self._isOpen() && typeof self.preSelCurrent != 'undefined' && self.preSelCurrent !== -1) {
						self._changeOption();
					}
					self._toggleSelect();
					break;
				case 27:
					ev.preventDefault();
					if (self._isOpen()) {
						self._toggleSelect();
					}
					break;
			}
		});
	};
	
	PokerSelectFx.prototype._navigateOpts = function(dir) {
		if (!this._isOpen) {
			this._toggleSelect();
		}
		
		var tmpcurrent = typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1 ? this.preSelCurrent : this.current;
		
		if (dir === 'prev' && tmpcurrent > 0 || dir === 'next' && tmpcurrent < this.selOptsCount - 1) {
			this.preSelCurrent = dir === 'next' ? tmpcurrent + 1 : tmpcurrent - 1;
			
			this._removeFocus();
			classie.add(this.selOpts[this.preSelCurrent], 'focus');
		}
	};
	
	PokerSelectFx.prototype._toggleSelect = function() {
		this._removeFocus();
		
		if (this._isOpen()) {
			if (this.current !== -1) {
				this.selPlaceholder.textContent = this.selOpts[this.current].textContent;
			}
			classie.remove(this.selEl, 'active');
		} else {
			if (this.hasDefaultPlaceholder && this.options.stickyPlaceholder) {
				this.selPlaceholder.textContent = this.selectedOpt.textContent;
			}
			classie.add(this.selEl, 'active');
		}
	};
	
	PokerSelectFx.prototype._changeOption = function() {
		if (typeof this.preSelCurrent != 'undefined' && this.preSelCurrent !== -1) {
			this.current = this.preSelCurrent;
			this.preSelCurrent = -1;
		}
		
		var opt = this.selOpts[this.current];
		
		this.selPlaceholder.textContent = opt.textContent;
		
		this.el.value = opt.getAttribute('data-value');
		
		var oldOpt = this.selEl.querySelector('li.selected');
		if (oldOpt) {
			classie.remove(oldOpt, 'selected');
		}
		classie.add(opt, 'selected');
		
		if (opt.getAttribute('data-link')) {
			if (this.options.newTab) {
				window.open(opt.getAttribute('data-link'), '_blank');
			} else {
				window.location = opt.getAttribute('data-link');
			}
		}
		
		this.options.onChange(this.el.value);
	};
	
	PokerSelectFx.prototype._isOpen = function(opt) {
		return classie.has(this.selEl, 'active');
	}
	
	PokerSelectFx.prototype._removeFocus = function(opt) {
		var focusEl = this.selEl.querySelector('li.focus');
		if (focusEl) {
			classie.remove(focusEl, 'focus');
		}
	};
	
	window.PokerSelectFx = PokerSelectFx;
})(window);