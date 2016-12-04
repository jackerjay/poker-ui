(function(window) {
	
	'use strict';
	
	function PokerInputFx(input) {
		this.input = input;
		this._init();
	}
	
	PokerInputFx.prototype._init = function() {
		this._createInputDiv();
	};
	
	PokerInputFx.prototype._createInputDiv = function() {
		var parent = this.input.parentNode,
			newDiv = document.createElement('div'),
			label = document.createElement('label'),
			hrDiv = document.createElement('div'),
			placeholderDiv = document.createElement('div'),
			hr = document.createElement('hr'),
			activeHr = document.createElement('hr');
		
		newDiv.className = 'poker input div';
		label.className = 'poker input label';
		
		if (this.input.getAttribute('data-label')) {
			label.textContent = this.input.getAttribute('data-label');
		}
		
		if (this.input.getAttribute('placeholder')) {
			placeholderDiv.textContent = this.input.getAttribute('placeholder');
			this.input.removeAttribute('placeholder');
		}
		
		hr.className = 'poker input bottom line';
		activeHr.className = 'poker input bottom resting line';
		placeholderDiv.className = "poker input placeholder";
		
		this.activeLabel = label;
		this.activeHr = activeHr;
		this.hr = hr;
		this.placeholderDiv = placeholderDiv;
		
		newDiv.appendChild(label);
		newDiv.appendChild(placeholderDiv);
		hrDiv.appendChild(hr);
		hrDiv.appendChild(activeHr);
		newDiv.appendChild(hrDiv);
		
		parent.insertBefore(newDiv, this.input);
		
		newDiv.appendChild(this.input);
		
		this.newDiv = newDiv;
		if (!this.input.disabled) {
			if (this.input.value != '' && this.input.value.length > 0) {
				classie.add(this.activeLabel, 'active');
				classie.add(this.activeLabel, 'float');
			}
			this._initEvents();
		} else if (this.input.value != '' && this.input.value.length > 0){
			classie.add(this.input, 'disabled');
			classie.add(this.newDiv, 'disabled');
			classie.add(this.hr, 'disabled');
			classie.add(this.activeLabel, 'active');
			classie.add(this.activeLabel, 'float');
		} else {
			classie.add(this.input, 'disabled');
			classie.add(this.newDiv, 'disabled');
			classie.add(this.hr, 'disabled');
		}
	};
	
	PokerInputFx.prototype._initEvents = function() {
		
		var self = this;
		
			document.addEventListener('click', function (el) {
				if (el.target !== self.input) {
					classie.remove(self.activeHr, 'active');
					classie.remove(self.placeholderDiv, 'active');
					if (self.input.value != '' && self.input.value.length > 0) {
						classie.add(self.activeLabel, 'float');
					} else {
						classie.remove(self.activeLabel, 'float');
						classie.remove(self.activeLabel, 'active');
					}
				} else {
					self._toggleSelect(el);
				}
			});
			
			this.input.addEventListener('keyup', function (el) {
				if (el.target.value == '' || el.target.value.length < 1) {
					classie.add(self.placeholderDiv, 'active');
				} else {
					classie.remove(self.placeholderDiv, 'active');
				}
			});
	};
	
	PokerInputFx.prototype._toggleSelect = function(el) {
		if (classie.has(this.input, 'active')) {
			classie.remove(this.activeHr, 'active');
			classie.remove(this.activeLabel, 'active');
			classie.remove(this.placeholderDiv, 'active');
			classie.remove(this.activeLabel, 'float');
		} else {
			classie.add(this.activeHr, 'active');
			classie.add(this.activeLabel, 'active');
			classie.remove(this.activeLabel, 'float');
			if (el.target.value == '' && el.target.value.length < 1) {
				classie.add(this.placeholderDiv, 'active');
			} else {
				classie.remove(this.placeholderDiv, 'active');
			}
		}
	};
	
	if (typeof define === 'function' && define.amd) {
		define( PokerInputFx );
	} else {
		window.PokerInputFx = PokerInputFx;
	}
	
	
		[].slice.call(document.querySelectorAll(['poker', 'input'])).forEach(function(input) {
			new PokerInputFx(input);
		});
	
})(window);