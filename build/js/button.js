(function (window) {
	
	function PokerButtonFx(button) {
		this.button = button;
		this._init();
	}
	
	PokerButtonFx.prototype._init = function () {
		var contentSpan = document.createElement('span'),
			spanDiv = document.createElement('div');
		
		this.transformSpan = document.createElement('span');
		this.transformSpan.style = 'height:100%;width:100%;position:absolute;top:0px;left:0px;overflow:hidden';
		this.transformDiv = document.createElement('div');
		
		if (!this.button.hasChildNodes()) {
			contentSpan.textContent = this.button.textContent;
			this.button.textContent = '';
		} else {
			contentSpan.innerHTML = this.button.innerHTML;
			this.button.innerHTML = '';
		}
		
		contentSpan.style = 'width:100%;height:100%;position:relative;'
			+ 'padding-left:16px;padding-right:16px;vertical-align:middle;'
			+ 'letter-spacing:0px;font-weight:500;font-size:14px;text-transform: uppercase;line-height:inherit';
		
		spanDiv.appendChild(this.transformSpan);
		spanDiv.appendChild(contentSpan);
		this.transformSpan.appendChild(this.transformDiv);
		this.button.appendChild(spanDiv);
		
		if (classie.has(this.button, 'disabled') || this.button.disabled) {
			if (this.button.nodeName.toLowerCase() === 'a') {
				this._disabledA(this.button);
			}
			return;
		} else {
			this._initEvents();
		}
	};
	
	PokerButtonFx.prototype._disabledA = function(el) {
		el.addEventListener('click', function(e) {
			e.preventDefault();
		});
	};
	
	PokerButtonFx.prototype._initEvents = function () {
		
		var self = this;
		
		this.button.addEventListener('mouseup', function () {
			if (classie.has(self.button, 'raised')) {
				self.button.style.boxShadow = 'rgba(0, 0, 0, 0.117647) 0px 1px 6px, rgba(0, 0, 0, 0.117647) 0px 1px 4px';
			}
			self.transformDiv.style.opacity = 0;
		});
		
		this.button.addEventListener('mousedown', function (el) {
			self.transformDiv.style = `opacity: 1;transform: scale(0);`;
			var x = el.clientX - self.button.offsetLeft, y = el.clientY - self.button.offsetTop, width = self.button.offsetWidth, backgroundColor = 'rgb(153, 153, 153)';
			width - x > x ? width = width - x : width = x;
			width += 16;
			
			if (classie.has(self.button, 'raised') && (classie.has(self.button, 'primary') || classie.has(self.button, 'secondary'))) {
				backgroundColor = 'rgba(255, 255, 255, 0.7)';
			}
			self.transformDiv.style = `width:${width + width}px;height:${width + width}px;border-radius:50%;background-color:${backgroundColor};top:${y - width}px;left:${x - width}px;position:absolute;opacity:0;transform:scale(1);transition:opacity 2s cubic-bezier(0.23, 1, 0.32, 1) 0ms, transform 1s cubic-bezier(0.23, 1, 0.32, 1) 0ms;`;
			if (classie.has(self.button, 'raised')) {
				self.button.style.boxShadow = 'rgba(0, 0, 0, 0.156863) 0px 3px 10px, rgba(0, 0, 0, 0.227451) 0px 3px 10px';
			}
			self.transformDiv.style.opacity = 0.4;
		});
		
		this.button.addEventListener('mouseout', function () {
			self.transformDiv.style.opacity = 0;
		});
	};
	
	window.PokerButtonFx = PokerButtonFx;
	
	window.onload = function () {
		[].slice.call(document.querySelectorAll('.poker.button'))
			.forEach(function (button) {
				new PokerButtonFx(button);
			});
	};
})(window);