function initItem(dropdownItems) {
	var options = dropdownItems.getElementsByTagName("option");
	var selectElement = options[0].parentNode;
	var parentElement = selectElement.parentNode;
	var _ul = document.createElement("ul");
	var _default_value = null, _default_text = null;
	
	for (var i = 0; i < options.length; i++) {
		var _li = document.createElement("li");
		var _a = document.createElement("a");
		_li.className = "poker-dropdown-item";
		_a.innerHTML = options[i].innerText;
		_a.dataset["dropdownId"] = selectElement.id;
		_a.dataset["dropdownValue"] = options[i].value;
		if (selectElement.dataset["defaultValue"] == options[i].value) {
			_default_value = selectElement.dataset["defaultValue"];
			_default_text = options[i].innerHTML;
		}
		if (options[i].hasChildNodes()) {
			for(var j = 0; j < options[i].childNodes.length; j ++) {
				console.log(options[i].childNodes)
			}
		}
		_a.onclick = function(e) {
			var id = e.target.dataset["dropdownId"];
			document.getElementById(id).value = e.target.dataset["dropdownValue"];
			e.target.parentNode.parentNode.parentNode.getElementsByTagName("span")[0].innerHTML = e.target.innerText;
		};
		_li.appendChild(_a);
		_ul.appendChild(_li);
		_ul.className = "poker-dropdown-menu";
	}
	
	var _input = document.createElement("input");
	
	_input.id = options[0].parentNode.id;
	_input.style.display = "none";
	_input.value = _default_value;
	
	var _span = document.createElement("span");

	_span.dataset["dropdownId"] = selectElement.id;
	
	_span.innerHTML = !!_default_text ? _default_text : "请选择";
	
	_span.addEventListener("click", _addSpanEvent);
	
	_span.addEventListener("mouseover", _addSpanEvent);
	
	_ul.addEventListener("mouseover", function () {
		this.classList.add("poker-dropdown-visible");
	});
	
	_ul.addEventListener("mouseout", function () {
		this.classList.remove("poker-dropdown-visible");
	});
	
	parentElement.replaceChild(_ul, selectElement);
	parentElement.appendChild(_input);
	parentElement.insertBefore(_span, _input);
	parentElement.className = "poker-dropdown-wrapper";
}

function _addSpanEvent(e) {
	var ulNode = this.parentNode.getElementsByTagName("ul")[0];
	
	if (e.type === "click") {
		if (ulNode.classList.contains("poker-dropdown-visible")) {
			ulNode.classList.remove("poker-dropdown-visible");
			e.stopPropagation();
		} else {
			ulNode.classList.add("poker-dropdown-visible");
		}
	} else if (e.type === "mouseover") {
		ulNode.classList.add("poker-dropdown-visible");
		ulNode.style.top = this.offsetHeight + this.offsetTop + "px";
	}
}

(function initDropdown() {
	var dropdowns = document.getElementsByClassName("poker-dropdown");
	while (dropdowns.length > 0) {
		initItem(dropdowns[0]);
	}
	document.getElementsByTagName("body")[0].addEventListener("click", function() {
		var _dropdowns = document.getElementsByClassName("poker-dropdown-menu poker-dropdown-visible");
		if (_dropdowns.length > 0) {
			for (var i = 0; i < _dropdowns.length; i ++) {
				_dropdowns[i].classList.remove("poker-dropdown-visible");
			}
		}
	});
})();