/*globals jQuery, define, module, exports, require, window, document, postMessage */
(function (factory) {
	"use strict";
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	}
	else if(typeof module !== 'undefined' && module.exports) {
		module.exports = factory(require('jquery'));
	}
	else {
		factory(jQuery);
	}
}(function ($, undefined) {
	"use strict";
/*!
 * jsTree 3.3.8
 * http://jstree.com/
 *
 * Copyright (c) 2014 Ivan Bozhanov (http://vakata.com)
 *
 * Licensed same as jquery - under the terms of the MIT License
 *   http://www.opensource.org/licenses/mit-license.php
 */
/*!
 * if using jslint please allow for the jQuery global and use following options:
 * jslint: loopfunc: true, browser: true, ass: true, bitwise: true, continue: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, white: true
 */
/*jshint -W083 */

	// prevent another load? maybe there is a better way?
	if($.jstree) {
		return;
	}

	/**
	 * ### jsTree core functionality
	 */

	// internal variables
	var instance_counter = 0,
		ccp_node = false,
		ccp_mode = false,
		ccp_inst = false,
		themes_loaded = [],
		src = $('script:last').attr('src'),
		document = window.document; // local variable is always faster to access then a global

	/**
	 * holds all jstree related functions and variables, including the actual class and methods to create, access and manipulate instances.
	 * @name $.jstree
	 */
	$.jstree = {
		/**
		 * specifies the jstree version in use
		 * @name $.jstree.version
		 */
		version : '3.3.8',
		/**
		 * holds all the default options used when creating new instances
		 * @name $.jstree.defaults
		 */
		defaults : {
			/**
			 * configure which plugins will be active on an instance. Should be an array of strings, where each element is a plugin name. The default is `[]`
			 * @name $.jstree.defaults.plugins
			 */
			plugins : []
		},
		/**
		 * stores all loaded jstree plugins (used internally)
		 * @name $.jstree.plugins
		 */
		plugins : {},
		path : src && src.indexOf('/') !== -1 ? src.replace(/\/[^\/]+$/,'') : '',
		idregex : /[\\:&!^|()\[\]<>@*'+~#";.,=\- \/${}%?`]/g,
		root : '#'
	};
	
	/**
	 * creates a jstree instance
	 * @name $.jstree.create(el [, options])
	 * @param {DOMElement|jQuery|String} el the element to create the instance on, can be jQuery extended or a selector
	 * @param {Object} options options for this instance (extends `$.jstree.defaults`)
	 * @return {jsTree} the new instance
	 */
	$.jstree.create = function (el, options) {
		var tmp = new $.jstree.core(++instance_counter),
			opt = options;
		options = $.extend(true, {}, $.jstree.defaults, options);
		if(opt && opt.plugins) {
			options.plugins = opt.plugins;
		}
		$.each(options.plugins, function (i, k) {
			if(i !== 'core') {
				tmp = tmp.plugin(k, options[k]);
			}
		});
		$(el).data('jstree', tmp);
		tmp.init(el, options);
		return tmp;
	};
	/**
	 * remove all traces of jstree from the DOM and destroy all instances
	 * @name $.jstree.destroy()
	 */
	$.jstree.destroy = function () {
		$('.jstree:jstree').jstree('destroy');
		$(document).off('.jstree');
	};
	/**
	 * the jstree class constructor, used only internally
	 * @private
	 * @name $.jstree.core(id)
	 * @param {Number} id this instance's index
	 */
	$.jstree.core = function (id) {
		this._id = id;
		this._cnt = 0;
		this._wrk = null;
		this._data = {
			core : {
				themes : {
					name : false,
					dots : false,
					icons : false,
					ellipsis : false
				},
				selected : [],
				last_error : {},
				working : false,
				worker_queue : [],
				focused : null
			}
		};
	};
	/**
	 * get a reference to an existing instance
	 *
	 * __Examples__
	 *
	 *	// provided a container with an ID of "tree", and a nested node with an ID of "branch"
	 *	// all of there will return the same instance
	 *	$.jstree.reference('tree');
	 *	$.jstree.reference('#tree');
	 *	$.jstree.reference($('#tree'));
	 *	$.jstree.reference(document.getElementByID('tree'));
	 *	$.jstree.reference('branch');
	 *	$.jstree.reference('#branch');
	 *	$.jstree.reference($('#branch'));
	 *	$.jstree.reference(document.getElementByID('branch'));
	 *
	 * @name $.jstree.reference(needle)
	 * @param {DOMElement|jQuery|String} needle
	 * @return {jsTree|null} the instance or `null` if not found
	 */
	$.jstree.reference = function (needle) {
		var tmp = null,
			obj = null;
		if(needle && needle.id && (!needle.tagName || !needle.nodeType)) { needle = needle.id; }

		if(!obj || !obj.length) {
			try { obj = $(needle); } catch (ignore) { }
		}
		if(!obj || !obj.length) {
			try { obj = $('#' + needle.replace($.jstree.idregex,'\\$&')); } catch (ignore) { }
		}
		if(obj && obj.length && (obj = obj.closest('.jstree')).length && (obj = obj.data('jstree'))) {
			tmp = obj;
		}
		else {
			$('.jstree').each(function () {
				var inst = $(this).data('jstree');
				if(inst && inst._model.data[needle]) {
					tmp = inst;
					return false;
				}
			});
		}
		return tmp;
	};
	/**
	 * Create an instance, get an instance or invoke a command on a instance.
	 *
	 * If there is no instance associated with the current node a new one is created and `arg` is used to extend `$.jstree.defaults` for this new instance. There would be no return value (chaining is not broken).
	 *
	 * If there is an existing instance and `arg` is a string the command specified by `arg` is executed on the instance, with any additional arguments passed to the function. If the function returns a value it will be returned (chaining could break depending on function).
	 *
	 * If there is an existing instance and `arg` is not a string the instance itself is returned (similar to `$.jstree.reference`).
	 *
	 * In any other case - nothing is returned and chaining is not broken.
	 *
	 * __Examples__
	 *
	 *	$('#tree1').jstree(); // creates an instance
	 *	$('#tree2').jstree({ plugins : [] }); // create an instance with some options
	 *	$('#tree1').jstree('open_node', '#branch_1'); // call a method on an existing instance, passing additional arguments
	 *	$('#tree2').jstree(); // get an existing instance (or create an instance)
	 *	$('#tree2').jstree(true); // get an existing instance (will not create new instance)
	 *	$('#branch_1').jstree().select_node('#branch_1'); // get an instance (using a nested element and call a method)
	 *
	 * @name $().jstree([arg])
	 * @param {String|Object} arg
	 * @return {Mixed}
	 */
	$.fn.jstree = function (arg) {
		// check for string argument
		var is_method	= (typeof arg === 'string'),
			args		= Array.prototype.slice.call(arguments, 1),
			result		= null;
		if(arg === true && !this.length) { return false; }
		this.each(function () {
			// get the instance (if there is one) and method (if it exists)
			var instance = $.jstree.reference(this),
				method = is_method && instance ? instance[arg] : null;
			// if calling a method, and method is available - execute on the instance
			result = is_method && method ?
				method.apply(instance, args) :
				null;
			// if there is no instance and no method is being called - create one
			if(!instance && !is_method && (arg === undefined || $.isPlainObject(arg))) {
				$.jstree.create(this, arg);
			}
			// if there is an instance and no method is called - return the instance
			if( (instance && !is_method) || arg === true ) {
				result = instance || false;
			}
			// if there was a method call which returned a result - break and return the value
			if(result !== null && result !== undefined) {
				return false;
			}
		});
		// if there was a method call with a valid return value - return that, otherwise continue the chain
		return result !== null && result !== undefined ?
			result : this;
	};
	/**
	 * used to find elements containing an instance
	 *
	 * __Examples__
	 *
	 *	$('div:jstree').each(function () {
	 *		$(this).jstree('destroy');
	 *	});
	 *
	 * @name $(':jstree')
	 * @return {jQuery}
	 */
	$.expr.pseudos.jstree = $.expr.createPseudo(function(search) {
		return function(a) {
			return $(a).hasClass('jstree') &&
				$(a).data('jstree') !== undefined;
		};
	});

	/**
	 * stores all defaults for the core
	 * @name $.jstree.defaults.core
	 */
	$.jstree.defaults.core = {
		/**
		 * data configuration
		 *
		 * If left as `false` the HTML inside the jstree container element is used to populate the tree (that should be an unordered list with list items).
		 *
		 * You can also pass in a HTML string or a JSON array here.
		 *
		 * It is possible to pass in a standard jQuery-like AJAX config and jstree will automatically determine if the response is JSON or HTML and use that to populate the tree.
		 * In addition to the standard jQuery ajax options here you can suppy functions for `data` and `url`, the functions will be run in the current instance's scope and a param will be passed indicating which node is being loaded, the return value of those functions will be used.
		 *
		 * The last option is to specify a function, that function will receive the node being loaded as argument and a second param which is a function which should be called with the result.
		 *
		 * __Examples__
		 *
		 *	// AJAX
		 *	$('#tree').jstree({
		 *		'core' : {
		 *			'data' : {
		 *				'url' : '/get/children/',
		 *				'data' : function (node) {
		 *					return { 'id' : node.id };
		 *				}
		 *			}
		 *		});
		 *
		 *	// direct data
		 *	$('#tree').jstree({
		 *		'core' : {
		 *			'data' : [
		 *				'Simple root node',
		 *				{
		 *					'id' : 'node_2',
		 *					'text' : 'Root node with options',
		 *					'state' : { 'opened' : true, 'selected' : true },
		 *					'children' : [ { 'text' : 'Child 1' }, 'Child 2']
		 *				}
		 *			]
		 *		}
		 *	});
		 *
		 *	// function
		 *	$('#tree').jstree({
		 *		'core' : {
		 *			'data' : function (obj, callback) {
		 *				callback.call(this, ['Root 1', 'Root 2']);
		 *			}
		 *		});
		 *
		 * @name $.jstree.defaults.core.data
		 */
		data			: false,
		/**
		 * configure the various strings used throughout the tree
		 *
		 * You can use an object where the key is the string you need to replace and the value is your replacement.
		 * Another option is to specify a function which will be called with an argument of the needed string and should return the replacement.
		 * If left as `false` no replacement is made.
		 *
		 * __Examples__
		 *
		 *	$('#tree').jstree({
		 *		'core' : {
		 *			'strings' : {
		 *				'Loading ...' : 'Please wait ...'
		 *			}
		 *		}
		 *	});
		 *
		 * @name $.jstree.defaults.core.strings
		 */
		strings			: false,
		/**
		 * determines what happens when a user tries to modify the structure of the tree
		 * If left as `false` all operations like create, rename, delete, move or copy are prevented.
		 * You can set this to `true` to allow all interactions or use a function to have better control.
		 *
		 * __Examples__
		 *
		 *	$('#tree').jstree({
		 *		'core' : {
		 *			'check_callback' : function (operation, node, node_parent, node_position, more) {
		 *				// operation can be 'create_node', 'rename_node', 'delete_node', 'move_node', 'copy_node' or 'edit'
		 *				// in case of 'rename_node' node_position is filled with the new node name
		 *				return operation === 'rename_node' ? true : false;
		 *			}
		 *		}
		 *	});
		 *
		 * @name $.jstree.defaults.core.check_callback
		 */
		check_callback	: false,
		/**
		 * a callback called with a single object parameter in the instance's scope when something goes wrong (operation prevented, ajax failed, etc)
		 * @name $.jstree.defaults.core.error
		 */
		error			: $.noop,
		/**
		 * the open / close animation duration in milliseconds - set this to `false` to disable the animation (default is `200`)
		 * @name $.jstree.defaults.core.animation
		 */
		animation		: 200,
		/**
		 * a boolean indicating if multiple nodes can be selected
		 * @name $.jstree.defaults.core.multiple
		 */
		multiple		: true,
		/**
		 * theme configuration object
		 * @name $.jstree.defaults.core.themes
		 */
		themes			: {
			/**
			 * the name of the theme to use (if left as `false` the default theme is used)
			 * @name $.jstree.defaults.core.themes.name
			 */
			name			: false,
			/**
			 * the URL of the theme's CSS file, leave this as `false` if you have manually included the theme CSS (recommended). You can set this to `true` too which will try to autoload the theme.
			 * @name $.jstree.defaults.core.themes.url
			 */
			url				: false,
			/**
			 * the location of all jstree themes - only used if `url` is set to `true`
			 * @name $.jstree.defaults.core.themes.dir
			 */
			dir				: false,
			/**
			 * a boolean indicating if connecting dots are shown
			 * @name $.jstree.defaults.core.themes.dots
			 */
			dots			: true,
			/**
			 * a boolean indicating if node icons are shown
			 * @name $.jstree.defaults.core.themes.icons
			 */
			icons			: true,
			/**
			 * a boolean indicating if node ellipsis should be shown - this only works with a fixed with on the container
			 * @name $.jstree.defaults.core.themes.ellipsis
			 */
			ellipsis		: false,
			/**
			 * a boolean indicating if the tree background is striped
			 * @name $.jstree.defaults.core.themes.stripes
			 */
			stripes			: false,
			/**
			 * a string (or boolean `false`) specifying the theme variant to use (if the theme supports variants)
			 * @name $.jstree.defaults.core.themes.variant
			 */
			variant			: false,
			/**
			 * a boolean specifying if a reponsive version of the theme should kick in on smaller screens (if the theme supports it). Defaults to `false`.
			 * @name $.jstree.defaults.core.themes.responsive
			 */
			responsive		: false
		},
		/**
		 * if left as `true` all parents of all selected nodes will be opened once the tree loads (so that all selected nodes are visible to the user)
		 * @name $.jstree.defaults.core.expand_selected_onload
		 */
		expand_selected_onload : true,
		/**
		 * if left as `true` web workers will be used to parse incoming JSON data where possible, so that the UI will not be blocked by large requests. Workers are however about 30% slower. Defaults to `true`
		 * @name $.jstree.defaults.core.worker
		 */
		worker : true,
		/**
		 * Force node text to plain text (and escape HTML). Defaults to `false`
		 * @name $.jstree.defaults.core.force_text
		 */
		force_text : false,
		/**
		 * Should the node be toggled if the text is double clicked. Defaults to `true`
		 * @name $.jstree.defaults.core.dblclick_toggle
		 */
		dblclick_toggle : true,
		/**
		 * Should the loaded nodes be part of the state. Defaults to `false`
		 * @name $.jstree.defaults.core.loaded_state
		 */
		loaded_state : false,
		/**
		 * Should the last active node be focused when the tree container is blurred and the focused again. This helps working with screen readers. Defaults to `true`
		 * @name $.jstree.defaults.core.restore_focus
		 */
		restore_focus : true,
		/**
		 * Default keyboard shortcuts (an object where each key is the button name or combo - like 'enter', 'ctrl-space', 'p', etc and the value is the function to execute in the instance's scope)
		 * @name $.jstree.defaults.core.keyboard
		 */
		keyboard : {
			'ctrl-space': function (e) {
				// aria defines space only with Ctrl
				e.type = "click";
				$(e.currentTarget).trigger(e);
			},
			'enter': function (e) {
				// enter
				e.type = "click";
				$(e.currentTarget).trigger(e);
			},
			'left': function (e) {
				// left
				e.preventDefault();
				if(this.is_open(e.currentTarget)) {
					this.close_node(e.currentTarget);
				}
				else {
					var o = this.get_parent(e.currentTarget);
					if(o && o.id !== $.jstree.root) { this.get_node(o, true).children('.jstree-anchor').focus(); }
				}
			},
			'up': function (e) {
				// up
				e.preventDefault();
				var o = this.get_prev_dom(e.currentTarget);
				if(o && o.length) { o.children('.jstree-anchor').focus(); }
			},
			'right': function (e) {
				// right
				e.preventDefault();
				if(this.is_closed(e.currentTarget)) {
					this.open_node(e.currentTarget, function (o) { this.get_node(o, true).children('.jstree-anchor').focus(); });
				}
				else if (this.is_open(e.currentTarget)) {
					var o = this.get_node(e.currentTarget, true).children('.jstree-children')[0];
					if(o) { $(this._firstChild(o)).children('.jstree-anchor').focus(); }
				}
			},
			'down': function (e) {
				// down
				e.preventDefault();
				var o = this.get_next_dom(e.currentTarget);
				if(o && o.length) { o.children('.jstree-anchor').focus(); }
			},
			'*': function (e) {
				// aria defines * on numpad as open_all - not very common
				this.open_all();
			},
			'home': function (e) {
				// home
				e.preventDefault();
				var o = this._firstChild(this.get_container_ul()[0]);
				if(o) { $(o).children('.jstree-anchor').filter(':visible').focus(); }
			},
			'end': function (e) {
				// end
				e.preventDefault();
				this.element.find('.jstree-anchor').filter(':visible').last().focus();
			},
			'f2': function (e) {
				// f2 - safe to include - if check_callback is false it will fail
				e.preventDefault();
				this.edit(e.currentTarget);
			}
		}
	};
	$.jstree.core.prototype = {
		/**
		 * used to decorate an instance with a plugin. Used internally.
		 * @private
		 * @name plugin(deco [, opts])
		 * @param  {String} deco the plugin to decorate with
		 * @param  {Object} opts options for the plugin
		 * @return {jsTree}
		 */
		plugin : function (deco, opts) {
			var Child = $.jstree.plugins[deco];
			if(Child) {
				this._data[deco] = {};
				Child.prototype = this;
				return new Child(opts, this);
			}
			return this;
		},
		/**
		 * initialize the instance. Used internally.
		 * @private
		 * @name init(el, optons)
		 * @param {DOMElement|jQuery|String} el the element we are transforming
		 * @param {Object} options options for this instance
		 * @trigger init.jstree, loading.jstree, loaded.jstree, ready.jstree, changed.jstree
		 */
		init : function (el, options) {
			this._model = {
				data : {},
				changed : [],
				force_full_redraw : false,
				redraw_timeout : false,
				default_state : {
					loaded : true,
					opened : false,
					selected : false,
					disabled : false
				}
			};
			this._model.data[$.jstree.root] = {
				id : $.jstree.root,
				parent : null,
				parents : [],
				children : [],
				children_d : [],
				state : { loaded : false }
			};

			this.element = $(el).addClass('jstree jstree-' + this._id);
			this.settings = options;

			this._data.core.ready = false;
			this._data.core.loaded = false;
			this._data.core.rtl = (this.element.css("direction") === "rtl");
			this.element[this._data.core.rtl ? 'addClass' : 'removeClass']("jstree-rtl");
			this.element.attr('role','tree');
			if(this.settings.core.multiple) {
				this.element.attr('aria-multiselectable', true);
			}
			if(!this.element.attr('tabindex')) {
				this.element.attr('tabindex','0');
			}

			this.bind();
			/**
			 * triggered after all events are bound
			 * @event
			 * @name init.jstree
			 */
			this.trigger("init");

			this._data.core.original_container_html = this.element.find(" > ul > li").clone(true);
			this._data.core.original_container_html
				.find("li").addBack()
				.contents().filter(function() {
					return this.nodeType === 3 && (!this.nodeValue || /^\s+$/.test(this.nodeValue));
				})
				.remove();
			this.element.html("<"+"ul class='jstree-container-ul jstree-children' role='group'><"+"li id='j"+this._id+"_loading' class='jstree-initial-node jstree-loading jstree-leaf jstree-last' role='tree-item'><i class='jstree-icon jstree-ocl'></i><"+"a class='jstree-anchor' href='#'><i class='jstree-icon jstree-themeicon-hidden'></i>" + this.get_string("Loading ...") + "</a></li></ul>");
			this.element.attr('aria-activedescendant','j' + this._id + '_loading');
			this._data.core.li_height = this.get_container_ul().children("li").first().outerHeight() || 24;
			this._data.core.node = this._create_prototype_node();
			/**
			 * triggered after the loading text is shown and before loading starts
			 * @event
			 * @name loading.jstree
			 */
			this.trigger("loading");
			this.load_node($.jstree.root);
		},
		/**
		 * destroy an instance
		 * @name destroy()
		 * @param  {Boolean} keep_html if not set to `true` the container will be emptied, otherwise the current DOM elements will be kept intact
		 */
		destroy : function (keep_html) {
			/**
			 * triggered before the tree is destroyed
			 * @event
			 * @name destroy.jstree
			 */
			this.trigger("destroy");
			if(this._wrk) {
				try {
					window.URL.revokeObjectURL(this._wrk);
					this._wrk = null;
				}
				catch (ignore) { }
			}
			if(!keep_html) { this.element.empty(); }
			this.teardown();
		},
		/**
		 * Create a prototype node
		 * @name _create_prototype_node()
		 * @return {DOMElement}
		 */
		_create_prototype_node : function () {
			var _node = document.createElement('LI'), _temp1, _temp2;
			_node.setAttribute('role', 'treeitem');
			_temp1 = document.createElement('I');
			_temp1.className = 'jstree-icon jstree-ocl';
			_temp1.setAttribute('role', 'presentation');
			_node.appendChild(_temp1);
			_temp1 = document.createElement('A');
			_temp1.className = 'jstree-anchor';
			_temp1.setAttribute('href','#');
			_temp1.setAttribute('tabindex','-1');
			_temp2 = document.createElement('I');
			_temp2.className = 'jstree-icon jstree-themeicon';
			_temp2.setAttribute('role', 'presentation');
			_temp1.appendChild(_temp2);
			_node.appendChild(_temp1);
			_temp1 = _temp2 = null;

			return _node;
		},
		_kbevent_to_func : function (e) {
			var keys = {
				8: "Backspace", 9: "Tab", 13: "Enter", 19: "Pause", 27: "Esc",
				32: "Space", 33: "PageUp", 34: "PageDown", 35: "End", 36: "Home",
				37: "Left", 38: "Up", 39: "Right", 40: "Down", 44: "Print", 45: "Insert",
				46: "Delete", 96: "Numpad0", 97: "Numpad1", 98: "Numpad2", 99 : "Numpad3",
				100: "Numpad4", 101: "Numpad5", 102: "Numpad6", 103: "Numpad7",
				104: "Numpad8", 105: "Numpad9", '-13': "NumpadEnter", 112: "F1",
				113: "F2", 114: "F3", 115: "F4", 116: "F5", 117: "F6", 118: "F7",
				119: "F8", 120: "F9", 121: "F10", 122: "F11", 123: "F12", 144: "Numlock",
				145: "Scrolllock", 16: 'Shift', 17: 'Ctrl', 18: 'Alt',
				48: '0',  49: '1',  50: '2',  51: '3',  52: '4', 53:  '5',
				54: '6',  55: '7',  56: '8',  57: '9',  59: ';',  61: '=', 65:  'a',
				66: 'b',  67: 'c',  68: 'd',  69: 'e',  70: 'f',  71: 'g', 72:  'h',
				73: 'i',  74: 'j',  75: 'k',  76: 'l',  77: 'm',  78: 'n', 79:  'o',
				80: 'p',  81: 'q',  82: 'r',  83: 's',  84: 't',  85: 'u', 86:  'v',
				87: 'w',  88: 'x',  89: 'y',  90: 'z', 107: '+', 109: '-', 110: '.',
				186: ';', 187: '=', 188: ',', 189: '-', 190: '.', 191: '/', 192: '`',
				219: '[', 220: '\\',221: ']', 222: "'", 111: '/', 106: '*', 173: '-'
			};
			var parts = [];
			if (e.ctrlKey) { parts.push('ctrl'); }
			if (e.altKey) { parts.push('alt'); }
			if (e.shiftKey) { parts.push('shift'); }
			parts.push(keys[e.which] || e.which);
			parts = parts.sort().join('-').toLowerCase();

			var kb = this.settings.core.keyboard, i, tmp;
			for (i in kb) {
				if (kb.hasOwnProperty(i)) {
					tmp = i;
					if (tmp !== '-' && tmp !== '+') {
						tmp = tmp.replace('--', '-MINUS').replace('+-', '-MINUS').replace('++', '-PLUS').replace('-+', '-PLUS');
						tmp = tmp.split(/-|\+/).sort().join('-').replace('MINUS', '-').replace('PLUS', '+').toLowerCase();
					}
					if (tmp === parts) {
						return kb[i];
					}
				}
			}
			return null;
		},
		/**
		 * part of the destroying of an instance. Used internally.
		 * @private
		 * @name teardown()
		 */
		teardown : function () {
			this.unbind();
			this.element
				.removeClass('jstree')
				.removeData('jstree')
				.find("[class^='jstree']")
					.addBack()
					.attr("class", function () { return this.className.replace(/jstree[^ ]*|$/ig,''); });
			this.element = null;
		},
		/**
		 * bind all events. Used internally.
		 * @private
		 * @name bind()
		 */
		bind : function () {
			var word = '',
				tout = null,
				was_click = 0;
			this.element
				.on("dblclick.jstree", function (e) {
						if(e.target.tagName && e.target.tagName.toLowerCase() === "input") { return true; }
						if(document.selection && document.selection.empty) {
							document.selection.empty();
						}
						else {
							if(window.getSelection) {
								var sel = window.getSelection();
								try {
									sel.removeAllRanges();
									sel.collapse();
								} catch (ignore) { }
							}
						}
					})
				.on("mousedown.jstree", $.proxy(function (e) {
						if(e.target === this.element[0]) {
							e.preventDefault(); // prevent losing focus when clicking scroll arrows (FF, Chrome)
							was_click = +(new Date()); // ie does not allow to prevent losing focus
						}
					}, this))
				.on("mousedown.jstree", ".jstree-ocl", function (e) {
						e.preventDefault(); // prevent any node inside from losing focus when clicking the open/close icon
					})
				.on("click.jstree", ".jstree-ocl", $.proxy(function (e) {
						this.toggle_node(e.target);
					}, this))
				.on("dblclick.jstree", ".jstree-anchor", $.proxy(function (e) {
						if(e.target.tagName && e.target.tagName.toLowerCase() === "input") { return true; }
						if(this.settings.core.dblclick_toggle) {
							this.toggle_node(e.target);
						}
					}, this))
				.on("click.jstree", ".jstree-anchor", $.proxy(function (e) {
						e.preventDefault();
						if(e.currentTarget !== document.activeElement) { $(e.currentTarget).focus(); }
						this.activate_node(e.currentTarget, e);
					}, this))
				.on('keydown.jstree', '.jstree-anchor', $.proxy(function (e) {
						if(e.target.tagName && e.target.tagName.toLowerCase() === "input") { return true; }
						if(this._data.core.rtl) {
							if(e.which === 37) { e.which = 39; }
							else if(e.which === 39) { e.which = 37; }
						}
						var f = this._kbevent_to_func(e);
						if (f) {
							var r = f.call(this, e);
							if (r === false || r === true) {
								return r;
							}
						}
					}, this))
				.on("load_node.jstree", $.proxy(function (e, data) {
						if(data.status) {
							if(data.node.id === $.jstree.root && !this._data.core.loaded) {
								this._data.core.loaded = true;
								if(this._firstChild(this.get_container_ul()[0])) {
									this.element.attr('aria-activedescendant',this._firstChild(this.get_container_ul()[0]).id);
								}
								/**
								 * triggered after the root node is loaded for the first time
								 * @event
								 * @name loaded.jstree
								 */
								this.trigger("loaded");
							}
							if(!this._data.core.ready) {
								setTimeout($.proxy(function() {
									if(this.element && !this.get_container_ul().find('.jstree-loading').length) {
										this._data.core.ready = true;
										if(this._data.core.selected.length) {
											if(this.settings.core.expand_selected_onload) {
												var tmp = [], i, j;
												for(i = 0, j = this._data.core.selected.length; i < j; i++) {
													tmp = tmp.concat(this._model.data[this._data.core.selected[i]].parents);
												}
												tmp = $.vakata.array_unique(tmp);
												for(i = 0, j = tmp.length; i < j; i++) {
													this.open_node(tmp[i], false, 0);
												}
											}
											this.trigger('changed', { 'action' : 'ready', 'selected' : this._data.core.selected });
										}
										/**
										 * triggered after all nodes are finished loading
										 * @event
										 * @name ready.jstree
										 */
										this.trigger("ready");
									}
								}, this), 0);
							}
						}
					}, this))
				// quick searching when the tree is focused
				.on('keypress.jstree', $.proxy(function (e) {
						if(e.target.tagName && e.target.tagName.toLowerCase() === "input") { return true; }
						if(tout) { clearTimeout(tout); }
						tout = setTimeout(function () {
							word = '';
						}, 500);

						var chr = String.fromCharCode(e.which).toLowerCase(),
							col = this.element.find('.jstree-anchor').filter(':visible'),
							ind = col.index(document.activeElement) || 0,
							end = false;
						word += chr;

						// match for whole word from current node down (including the current node)
						if(word.length > 1) {
							col.slice(ind).each($.proxy(function (i, v) {
								if($(v).text().toLowerCase().indexOf(word) === 0) {
									$(v).focus();
									end = true;
									return false;
								}
							}, this));
							if(end) { return; }

							// match for whole word from the beginning of the tree
							col.slice(0, ind).each($.proxy(function (i, v) {
								if($(v).text().toLowerCase().indexOf(word) === 0) {
									$(v).focus();
									end = true;
									return false;
								}
							}, this));
							if(end) { return; }
						}
						// list nodes that start with that letter (only if word consists of a single char)
						if(new RegExp('^' + chr.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&') + '+$').test(word)) {
							// search for the next node starting with that letter
							col.slice(ind + 1).each($.proxy(function (i, v) {
								if($(v).text().toLowerCase().charAt(0) === chr) {
									$(v).focus();
									end = true;
									return false;
								}
							}, this));
							if(end) { return; }

							// search from the beginning
							col.slice(0, ind + 1).each($.proxy(function (i, v) {
								if($(v).text().toLowerCase().charAt(0) === chr) {
									$(v).focus();
									end = true;
									return false;
								}
							}, this));
							if(end) { return; }
						}
					}, this))
				// THEME RELATED
				.on("init.jstree", $.proxy(function () {
						var s = this.settings.core.themes;
						this._data.core.themes.dots			= s.dots;
						this._data.core.themes.stripes		= s.stripes;
						this._data.core.themes.icons		= s.icons;
						this._data.core.themes.ellipsis		= s.ellipsis;
						this.set_theme(s.name || "default", s.url);
						this.set_theme_variant(s.variant);
					}, this))
				.on("loading.jstree", $.proxy(function () {
						this[ this._data.core.themes.dots ? "show_dots" : "hide_dots" ]();
						this[ this._data.core.themes.icons ? "show_icons" : "hide_icons" ]();
						this[ this._data.core.themes.stripes ? "show_stripes" : "hide_stripes" ]();
						this[ this._data.core.themes.ellipsis ? "show_ellipsis" : "hide_ellipsis" ]();
					}, this))
				.on('blur.jstree', '.jstree-anchor', $.proxy(function (e) {
						this._data.core.focused = null;
						$(e.currentTarget).filter('.jstree-hovered').trigger('mouseleave');
						this.element.attr('tabindex', '0');
					}, this))
				.on('focus.jstree', '.jstree-anchor', $.proxy(function (e) {
						var tmp = this.get_node(e.currentTarget);
						if(tmp && tmp.id) {
							this._data.core.focused = tmp.id;
						}
						this.element.find('.jstree-hovered').not(e.currentTarget).trigger('mouseleave');
						$(e.currentTarget).trigger('mouseenter');
						this.element.attr('tabindex', '-1');
					}, this))
				.on('focus.jstree', $.proxy(function () {
						if(+(new Date()) - was_click > 500 && !this._data.core.focused && this.settings.core.restore_focus) {
							was_click = 0;
							var act = this.get_node(this.element.attr('aria-activedescendant'), true);
							if(act) {
								act.find('> .jstree-anchor').focus();
							}
						}
					}, this))
				.on('mouseenter.jstree', '.jstree-anchor', $.proxy(function (e) {
						this.hover_node(e.currentTarget);
					}, this))
				.on('mouseleave.jstree', '.jstree-anchor', $.proxy(function (e) {
						this.dehover_node(e.currentTarget);
					}, this));
		},
		/**
		 * part of the destroying of an instance. Used internally.
		 * @private
		 * @name unbind()
		 */
		unbind : function () {
			this.element.off('.jstree');
			$(document).off('.jstree-' + this._id);
		},
		/**
		 * trigger an event. Used internally.
		 * @private
		 * @name trigger(ev [, data])
		 * @param  {String} ev the name of the event to trigger
		 * @param  {Object} data additional data to pass with the event
		 */
		trigger : function (ev, data) {
			if(!data) {
				data = {};
			}
			data.instance = this;
			this.element.triggerHandler(ev.replace('.jstree','') + '.jstree', data);
		},
		/**
		 * returns the jQuery extended instance container
		 * @name get_container()
		 * @return {jQuery}
		 */
		get_container : function () {
			return this.element;
		},
		/**
		 * returns the jQuery extended main UL node inside the instance container. Used internally.
		 * @private
		 * @name get_container_ul()
		 * @return {jQuery}
		 */
		get_container_ul : function () {
			return this.element.children(".jstree-children").first();
		},
		/**
		 * gets string replacements (localization). Used internally.
		 * @private
		 * @name get_string(key)
		 * @param  {String} key
		 * @return {String}
		 */
		get_string : function (key) {
			var a = this.settings.core.strings;
			if($.isFunction(a)) { return a.call(this, key); }
			if(a && a[key]) { return a[key]; }
			return key;
		},
		/**
		 * gets the first child of a DOM node. Used internally.
		 * @private
		 * @name _firstChild(dom)
		 * @param  {DOMElement} dom
		 * @return {DOMElement}
		 */
		_firstChild : function (dom) {
			dom = dom ? dom.firstChild : null;
			while(dom !== null && dom.nodeType !== 1) {
				dom = dom.nextSibling;
			}
			return dom;
		},
		/**
		 * gets the next sibling of a DOM node. Used internally.
		 * @private
		 * @name _nextSibling(dom)
		 * @param  {DOMElement} dom
		 * @return {DOMElement}
		 */
		_nextSibling : function (dom) {
			dom = dom ? dom.nextSibling : null;
			while(dom !== null && dom.nodeType !== 1) {
				dom = dom.nextSibling;
			}
			return dom;
		},
		/**
		 * gets the previous sibling of a DOM node. Used internally.
		 * @private
		 * @name _previousSibling(dom)
		 * @param  {DOMElement} dom
		 * @return {DOMElement}
		 */
		_previousSibling : function (dom) {
			dom = dom ? dom.previousSibling : null;
			while(dom !== null && dom.nodeType !== 1) {
				dom = dom.previousSibling;
			}
			return dom;
		},
		/**
		 * get the JSON representation of a node (or the actual jQuery extended DOM node) by using any input (child DOM element, ID string, selector, etc)
		 * @name get_node(obj [, as_dom])
		 * @param  {mixed} obj
		 * @param  {Boolean} as_dom
		 * @return {Object|jQuery}
		 */
		get_node : function (obj, as_dom) {
			if(obj && obj.id) {
				obj = obj.id;
			}
			if (obj instanceof $ && obj.length && obj[0].id) {
				obj = obj[0].id;
			}
			var dom;
			try {
				if(this._model.data[obj]) {
					obj = this._model.data[obj];
				}
				else if(typeof obj === "string" && this._model.data[obj.replace(/^#/, '')]) {
					obj = this._model.data[obj.replace(/^#/, '')];
				}
				else if(typeof obj === "string" && (dom = $('#' + obj.replace($.jstree.idregex,'\\$&'), this.element)).length && this._model.data[dom.closest('.jstree-node').attr('id')]) {
					obj = this._model.data[dom.closest('.jstree-node').attr('id')];
				}
				else if((dom = this.element.find(obj)).length && this._model.data[dom.closest('.jstree-node').attr('id')]) {
					obj = this._model.data[dom.closest('.jstree-node').attr('id')];
				}
				else if((dom = this.element.find(obj)).length && dom.hasClass('jstree')) {
					obj = this._model.data[$.jstree.root];
				}
				else {
					return false;
				}

				if(as_dom) {
					obj = obj.id === $.jstree.root ? this.element : $('#' + obj.id.replace($.jstree.idregex,'\\$&'), this.element);
				}
				return obj;
			} catch (ex) { return false; }
		},
		/**
		 * get the path to a node, either consisting of node texts, or of node IDs, optionally glued together (otherwise an array)
		 * @name get_path(obj [, glue, ids])
		 * @param  {mixed} obj the node
		 * @param  {String} glue if you want the path as a string - pass the glue here (for example '/'), if a falsy value is supplied here, an array is returned
		 * @param  {Boolean} ids if set to true build the path using ID, otherwise node text is used
		 * @return {mixed}
		 */
		get_path : function (obj, glue, ids) {
			obj = obj.parents ? obj : this.get_node(obj);
			if(!obj || obj.id === $.jstree.root || !obj.parents) {
				return false;
			}
			var i, j, p = [];
			p.push(ids ? obj.id : obj.text);
			for(i = 0, j = obj.parents.length; i < j; i++) {
				p.push(ids ? obj.parents[i] : this.get_text(obj.parents[i]));
			}
			p = p.reverse().slice(1);
			return glue ? p.join(glue) : p;
		},
		/**
		 * get the next visible node that is below the `obj` node. If `strict` is set to `true` only sibling nodes are returned.
		 * @name get_next_dom(obj [, strict])
		 * @param  {mixed} obj
		 * @param  {Boolean} strict
		 * @return {jQuery}
		 */
		get_next_dom : function (obj, strict) {
			var tmp;
			obj = this.get_node(obj, true);
			if(obj[0] === this.element[0]) {
				tmp = this._firstChild(this.get_container_ul()[0]);
				while (tmp && tmp.offsetHeight === 0) {
					tmp = this._nextSibling(tmp);
				}
				return tmp ? $(tmp) : false;
			}
			if(!obj || !obj.length) {
				return false;
			}
			if(strict) {
				tmp = obj[0];
				do {
					tmp = this._nextSibling(tmp);
				} while (tmp && tmp.offsetHeight === 0);
				return tmp ? $(tmp) : false;
			}
			if(obj.hasClass("jstree-open")) {
				tmp = this._firstChild(obj.children('.jstree-children')[0]);
				while (tmp && tmp.offsetHeight === 0) {
					tmp = this._nextSibling(tmp);
				}
				if(tmp !== null) {
					return $(tmp);
				}
			}
			tmp = obj[0];
			do {
				tmp = this._nextSibling(tmp);
			} while (tmp && tmp.offsetHeight === 0);
			if(tmp !== null) {
				return $(tmp);
			}
			return obj.parentsUntil(".jstree",".jstree-node").nextAll(".jstree-node:visible").first();
		},
		/**
		 * get the previous visible node that is above the `obj` node. If `strict` is set to `true` only sibling nodes are returned.
		 * @name get_prev_dom(obj [, strict])
		 * @param  {mixed} obj
		 * @param  {Boolean} strict
		 * @return {jQuery}
		 */
		get_prev_dom : function (obj, strict) {
			var tmp;
			obj = this.get_node(obj, true);
			if(obj[0] === this.element[0]) {
				tmp = this.get_container_ul()[0].lastChild;
				while (tmp && tmp.offsetHeight === 0) {
					tmp = this._previousSibling(tmp);
				}
				return tmp ? $(tmp) : false;
			}
			if(!obj || !obj.length) {
				return false;
			}
			if(strict) {
				tmp = obj[0];
				do {
					tmp = this._previousSibling(tmp);
				} while (tmp && tmp.offsetHeight === 0);
				return tmp ? $(tmp) : false;
			}
			tmp = obj[0];
			do {
				tmp = this._previousSibling(tmp);
			} while (tmp && tmp.offsetHeight === 0);
			if(tmp !== null) {
				obj = $(tmp);
				while(obj.hasClass("jstree-open")) {
					obj = obj.children(".jstree-children").first().children(".jstree-node:visible:last");
				}
				return obj;
			}
			tmp = obj[0].parentNode.parentNode;
			return tmp && tmp.className && tmp.className.indexOf('jstree-node') !== -1 ? $(tmp) : false;
		},
		/**
		 * get the parent ID of a node
		 * @name get_parent(obj)
		 * @param  {mixed} obj
		 * @return {String}
		 */
		get_parent : function (obj) {
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			return obj.parent;
		},
		/**
		 * get a jQuery collection of all the children of a node (node must be rendered), returns false on error
		 * @name get_children_dom(obj)
		 * @param  {mixed} obj
		 * @return {jQuery}
		 */
		get_children_dom : function (obj) {
			obj = this.get_node(obj, true);
			if(obj[0] === this.element[0]) {
				return this.get_container_ul().children(".jstree-node");
			}
			if(!obj || !obj.length) {
				return false;
			}
			return obj.children(".jstree-children").children(".jstree-node");
		},
		/**
		 * checks if a node has children
		 * @name is_parent(obj)
		 * @param  {mixed} obj
		 * @return {Boolean}
		 */
		is_parent : function (obj) {
			obj = this.get_node(obj);
			return obj && (obj.state.loaded === false || obj.children.length > 0);
		},
		/**
		 * checks if a node is loaded (its children are available)
		 * @name is_loaded(obj)
		 * @param  {mixed} obj
		 * @return {Boolean}
		 */
		is_loaded : function (obj) {
			obj = this.get_node(obj);
			return obj && obj.state.loaded;
		},
		/**
		 * check if a node is currently loading (fetching children)
		 * @name is_loading(obj)
		 * @param  {mixed} obj
		 * @return {Boolean}
		 */
		is_loading : function (obj) {
			obj = this.get_node(obj);
			return obj && obj.state && obj.state.loading;
		},
		/**
		 * check if a node is opened
		 * @name is_open(obj)
		 * @param  {mixed} obj
		 * @return {Boolean}
		 */
		is_open : function (obj) {
			obj = this.get_node(obj);
			return obj && obj.state.opened;
		},
		/**
		 * check if a node is in a closed state
		 * @name is_closed(obj)
		 * @param  {mixed} obj
		 * @return {Boolean}
		 */
		is_closed : function (obj) {
			obj = this.get_node(obj);
			return obj && this.is_parent(obj) && !obj.state.opened;
		},
		/**
		 * check if a node has no children
		 * @name is_leaf(obj)
		 * @param  {mixed} obj
		 * @return {Boolean}
		 */
		is_leaf : function (obj) {
			return !this.is_parent(obj);
		},
		/**
		 * loads a node (fetches its children using the `core.data` setting). Multiple nodes can be passed to by using an array.
		 * @name load_node(obj [, callback])
		 * @param  {mixed} obj
		 * @param  {function} callback a function to be executed once loading is complete, the function is executed in the instance's scope and receives two arguments - the node and a boolean status
		 * @return {Boolean}
		 * @trigger load_node.jstree
		 */
		load_node : function (obj, callback) {
			var k, l, i, j, c;
			if($.isArray(obj)) {
				this._load_nodes(obj.slice(), callback);
				return true;
			}
			obj = this.get_node(obj);
			if(!obj) {
				if(callback) { callback.call(this, obj, false); }
				return false;
			}
			// if(obj.state.loading) { } // the node is already loading - just wait for it to load and invoke callback? but if called implicitly it should be loaded again?
			if(obj.state.loaded) {
				obj.state.loaded = false;
				for(i = 0, j = obj.parents.length; i < j; i++) {
					this._model.data[obj.parents[i]].children_d = $.vakata.array_filter(this._model.data[obj.parents[i]].children_d, function (v) {
						return $.inArray(v, obj.children_d) === -1;
					});
				}
				for(k = 0, l = obj.children_d.length; k < l; k++) {
					if(this._model.data[obj.children_d[k]].state.selected) {
						c = true;
					}
					delete this._model.data[obj.children_d[k]];
				}
				if (c) {
					this._data.core.selected = $.vakata.array_filter(this._data.core.selected, function (v) {
						return $.inArray(v, obj.children_d) === -1;
					});
				}
				obj.children = [];
				obj.children_d = [];
				if(c) {
					this.trigger('changed', { 'action' : 'load_node', 'node' : obj, 'selected' : this._data.core.selected });
				}
			}
			obj.state.failed = false;
			obj.state.loading = true;
			this.get_node(obj, true).addClass("jstree-loading").attr('aria-busy',true);
			this._load_node(obj, $.proxy(function (status) {
				obj = this._model.data[obj.id];
				obj.state.loading = false;
				obj.state.loaded = status;
				obj.state.failed = !obj.state.loaded;
				var dom = this.get_node(obj, true), i = 0, j = 0, m = this._model.data, has_children = false;
				for(i = 0, j = obj.children.length; i < j; i++) {
					if(m[obj.children[i]] && !m[obj.children[i]].state.hidden) {
						has_children = true;
						break;
					}
				}
				if(obj.state.loaded && dom && dom.length) {
					dom.removeClass('jstree-closed jstree-open jstree-leaf');
					if (!has_children) {
						dom.addClass('jstree-leaf');
					}
					else {
						if (obj.id !== '#') {
							dom.addClass(obj.state.opened ? 'jstree-open' : 'jstree-closed');
						}
					}
				}
				dom.removeClass("jstree-loading").attr('aria-busy',false);
				/**
				 * triggered after a node is loaded
				 * @event
				 * @name load_node.jstree
				 * @param {Object} node the node that was loading
				 * @param {Boolean} status was the node loaded successfully
				 */
				this.trigger('load_node', { "node" : obj, "status" : status });
				if(callback) {
					callback.call(this, obj, status);
				}
			}, this));
			return true;
		},
		/**
		 * load an array of nodes (will also load unavailable nodes as soon as they appear in the structure). Used internally.
		 * @private
		 * @name _load_nodes(nodes [, callback])
		 * @param  {array} nodes
		 * @param  {function} callback a function to be executed once loading is complete, the function is executed in the instance's scope and receives one argument - the array passed to _load_nodes
		 */
		_load_nodes : function (nodes, callback, is_callback, force_reload) {
			var r = true,
				c = function () { this._load_nodes(nodes, callback, true); },
				m = this._model.data, i, j, tmp = [];
			for(i = 0, j = nodes.length; i < j; i++) {
				if(m[nodes[i]] && ( (!m[nodes[i]].state.loaded && !m[nodes[i]].state.failed) || (!is_callback && force_reload) )) {
					if(!this.is_loading(nodes[i])) {
						this.load_node(nodes[i], c);
					}
					r = false;
				}
			}
			if(r) {
				for(i = 0, j = nodes.length; i < j; i++) {
					if(m[nodes[i]] && m[nodes[i]].state.loaded) {
						tmp.push(nodes[i]);
					}
				}
				if(callback && !callback.done) {
					callback.call(this, tmp);
					callback.done = true;
				}
			}
		},
		/**
		 * loads all unloaded nodes
		 * @name load_all([obj, callback])
		 * @param {mixed} obj the node to load recursively, omit to load all nodes in the tree
		 * @param {function} callback a function to be executed once loading all the nodes is complete,
		 * @trigger load_all.jstree
		 */
		load_all : function (obj, callback) {
			if(!obj) { obj = $.jstree.root; }
			obj = this.get_node(obj);
			if(!obj) { return false; }
			var to_load = [],
				m = this._model.data,
				c = m[obj.id].children_d,
				i, j;
			if(obj.state && !obj.state.loaded) {
				to_load.push(obj.id);
			}
			for(i = 0, j = c.length; i < j; i++) {
				if(m[c[i]] && m[c[i]].state && !m[c[i]].state.loaded) {
					to_load.push(c[i]);
				}
			}
			if(to_load.length) {
				this._load_nodes(to_load, function () {
					this.load_all(obj, callback);
				});
			}
			else {
				/**
				 * triggered after a load_all call completes
				 * @event
				 * @name load_all.jstree
				 * @param {Object} node the recursively loaded node
				 */
				if(callback) { callback.call(this, obj); }
				this.trigger('load_all', { "node" : obj });
			}
		},
		/**
		 * handles the actual loading of a node. Used only internally.
		 * @private
		 * @name _load_node(obj [, callback])
		 * @param  {mixed} obj
		 * @param  {function} callback a function to be executed once loading is complete, the function is executed in the instance's scope and receives one argument - a boolean status
		 * @return {Boolean}
		 */
		_load_node : function (obj, callback) {
			var s = this.settings.core.data, t;
			var notTextOrCommentNode = function notTextOrCommentNode () {
				return this.nodeType !== 3 && this.nodeType !== 8;
			};
			// use original HTML
			if(!s) {
				if(obj.id === $.jstree.root) {
					return this._append_html_data(obj, this._data.core.original_container_html.clone(true), function (status) {
						callback.call(this, status);
					});
				}
				else {
					return callback.call(this, false);
				}
				// return callback.call(this, obj.id === $.jstree.root ? this._append_html_data(obj, this._data.core.original_container_html.clone(true)) : false);
			}
			if($.isFunction(s)) {
				return s.call(this, obj, $.proxy(function (d) {
					if(d === false) {
						callback.call(this, false);
					}
					else {
						this[typeof d === 'string' ? '_append_html_data' : '_append_json_data'](obj, typeof d === 'string' ? $($.parseHTML(d)).filter(notTextOrCommentNode) : d, function (status) {
							callback.call(this, status);
						});
					}
					// return d === false ? callback.call(this, false) : callback.call(this, this[typeof d === 'string' ? '_append_html_data' : '_append_json_data'](obj, typeof d === 'string' ? $(d) : d));
				}, this));
			}
			if(typeof s === 'object') {
				if(s.url) {
					s = $.extend(true, {}, s);
					if($.isFunction(s.url)) {
						s.url = s.url.call(this, obj);
					}
					if($.isFunction(s.data)) {
						s.data = s.data.call(this, obj);
					}
					return $.ajax(s)
						.done($.proxy(function (d,t,x) {
								var type = x.getResponseHeader('Content-Type');
								if((type && type.indexOf('json') !== -1) || typeof d === "object") {
									return this._append_json_data(obj, d, function (status) { callback.call(this, status); });
									//return callback.call(this, this._append_json_data(obj, d));
								}
								if((type && type.indexOf('html') !== -1) || typeof d === "string") {
									return this._append_html_data(obj, $($.parseHTML(d)).filter(notTextOrCommentNode), function (status) { callback.call(this, status); });
									// return callback.call(this, this._append_html_data(obj, $(d)));
								}
								this._data.core.last_error = { 'error' : 'ajax', 'plugin' : 'core', 'id' : 'core_04', 'reason' : 'Could not load node', 'data' : JSON.stringify({ 'id' : obj.id, 'xhr' : x }) };
								this.settings.core�}tǣ?@>ϩ�Ӯ�޷M�����9��˯G�>��Ƿ�Q����Ͽ��\qߞS���޳yO����Z{-v��� x��u����wVw?O���?��8լ�Hw�_
õ�_/
^�W���۾���{7������?_����}A4���'�����dm�[m�~�,����N�?�[x9(?����	|6��k�o���i��w��_���?SU��_y��ˤ��������u���W.����;�~���f�T���k�oo�����㟽癲?ίk����_��۲�����}����������]��>��������N�7=<Nu�UݏQ~I��rQ��s�����+f��k�=����^7��gl�Ͽ�����Grw���7G����a��f�[�����|�{^:�?�o��5����������w������}���λ0������?m_�������9R�����]���������<{����u7?��߫�I��3��ҿ�������O���m��^z��ا���͓w���Y�����w�\
�tVf.��z�W���<�ٓ�E�s{~o�t���̻G��㯈�w��7?�ϝ�즣n����?���~�mR_q0ש�[�����zo����Էo��G���u[E"}��A��-��ۋ�O�˴=��뽾��?F�v���m]��޻>>_y�9�_��}?����>O�]��~ϙ�˾��Z��y�^��8~�V�����w>_�������嵿�m���������M5�����S}g�����{w�5���Tל�,}��8�ݯ%<+~���伿k������������^��k~�����n�
��X��y�����?'z������<&n�n\�h������9�>7�؝s}�~��i��kk	~�ϕ�g�z}���y6W��}�S>|������'_oM�/��n�9
		 * @param  {Boolean} force_processing internal param - do not set
		 * @trigger model.jstree, changed.jstree
		 */
		_append_json_data : function (dom, data, cb, force_processing) {
			if(this.element === null) { return; }
			dom = this.get_node(dom);
			dom.children = [];
			dom.children_d = [];
			// *%$@!!!
			if(data.d) {
				data = data.d;
				if(typeof data === "string") {
					data = JSON.parse(data);
				}
			}
			if(!$.isArray(data)) { data = [data]; }
			var w = null,
				args = {
					'df'	: this._model.default_state,
					'dat'	: data,
					'par'	: dom.id,
					'm'		: this._model.data,
					't_id'	: this._id,
					't_cnt'	: this._cnt,
					'sel'	: this._data.core.selected
				},
				inst = this,
				func = function (data, undefined) {
					if(data.data) { data = data.data; }
					var dat = data.dat,
						par = data.par,
						chd = [],
						dpc = [],
						add = [],
						df = data.df,
						t_id = data.t_id,
						t_cnt = data.t_cnt,
						m = data.m,
						p = m[par],
						sel = data.sel,
						tmp, i, j, rslt,
						parse_flat = function (d, p, ps) {
							if(!ps) { ps = []; }
							else { ps = ps.concat(); }
							if(p) { ps.unshift(p); }
							var tid = d.id.toString(),
								i, j, c, e,
								tmp = {
									id			: tid,
									text		: d.text || '',
									icon		: d.icon !== undefined ? d.icon : true,
									parent		: p,
									parents		: ps,
									children	: d.children || [],
									children_d	: d.children_d || [],
									data		: d.data,
									state		: { },
									li_attr		: { id : false },
									a_attr		: { href : '#' },
									original	: false
								};
							for(i in df) {
								if(df.hasOwnProperty(i)) {
									tmp.state[i] = df[i];
								}
							}
							if(d && d.data && d.data.jstree && d.data.jstree.icon) {
								tmp.icon = d.data.jstree.icon;
							}
							if(tmp.icon === undefined || tmp.icon === null || tmp.icon === "") {
								tmp.icon = true;
							}
							if(d && d.data) {
								tmp.data = d.data;
								if(d.data.jstree) {
									for(i in d.data.jstree) {
										if(d.data.jstree.hasOwnProperty(i)) {
											tmp.state[i] = d.data.jstree[i];
										}
									}
								}
							}
							if(d && typeof d.state === 'object') {
								for (i in d.state) {
									if(d.state.hasOwnProperty(i)) {
										tmp.state[i] = d.state[i];
									}
								}
							}
							if(d && typeof d.li_attr === 'object') {
								for (i in d.li_attr) {
									if(d.li_attr.hasOwnProperty(i)) {
										tmp.li_attr[i] = d.li_attr[i];
									}
								}
							}
							if(!tmp.li_attr.id) {
								tmp.li_attr.id = tid;
							}
							if(d && typeof d.a_attr === 'object') {
								for (i in d.a_attr) {
									if(d.a_attr.hasOwnProperty(i)) {
										tmp.a_attr[i] = d.a_attr[i];
									}
								}
							}
							if(d && d.children && d.children === true) {
								tmp.state.loaded = false;
								tmp.children = [];
								tmp.children_d = [];
							}
							m[tmp.id] = tmp;
							for(i = 0, j = tmp.children.length; i < j; i++) {
								c = parse_flat(m[tmp.children[i]], tmp.id, ps);
								e = m[c];
								tmp.children_d.push(c);
								if(e.children_d.length) {
									tmp.children_d = tmp.children_d.concat(e.children_d);
								}
							}
							delete d.data;
							delete d.children;
							m[tmp.id].original = d;
							if(tmp.state.selected) {
								add.push(tmp.id);
							}
							return tmp.id;
						},
						parse_nest = function (d, p, ps) {
							if(!ps) { ps = []; }
							else { ps = ps.concat(); }
							if(p) { ps.unshift(p); }
							var tid = false, i, j, c, e, tmp;
							do {
								tid = 'j' + t_id + '_' + (++t_cnt);
							} while(m[tid]);

							tmp = {
								id			: false,
								text		: typeof d === 'string' ? d : '',
								icon		: typeof d === 'object' && d.icon !== undefined ? d.icon : true,
								parent		: p,
								parents		: ps,
								children	: [],
								children_d	: [],
								data		: null,
								state		: { },
								li_attr		: { id : false },
								a_attr		: {   i��I�7�� p 8  
NP�L  �l�D�� �� �-��  a��H� � ���  :M��~^ ������ pq>�����   L  }��� �F�  �i�#�����   �k�����k���� ��x��  �(�L  S�-� ���  ���9����                 0        Ǎ� @        �^ Y	�
�� `  ��   L � p6� 03 �`�   L � �l� @3    L � VS
  �Y��^ ��� 0L�����  ���L   �L6�����o� ��D�7   M��   ;�5� �   �  3Q��R ������� `e+L��  
�  ����Q� �  L��   �2�L  �� �  L��L  M� �@�� �G������   h��L  8� ���
�^ ����	��I��$� p�j�Z7	��  �O�iI� `2  v   L � `f �f/�f�� ��n��l+J\f�dV9ZEfj�\DfS$T&f�ZL`��}�V -n5Ldj�� ii�`�fhl�d�fi�������Ɖ�i�)�֦���Y`6�f���UFft	L=	%QB� TVi%W�X� Yj9LqY,]~	&a2%&c�i&L�yk�i!�1�!�� oB'�1W'v��e�'�i�'���'}�	8�(���
 �Z��6��F��f(�!����(L��(���(��(�F
�NJ)LX
 � S�    1  �2������*�` �"������܈*,"$�3�3Ȇ����)Ȓ"�2�����̨�*("(����ȇ%ĩ��"b"������،"(�#�2�ʈ�-�-�b"r!��+#����*&"(�"�#�͊�.H"pB2A1�|���̨�"(",�3�2����-���` �"���c����*(*(�#�2����)�-Lb"b"���S�̜�*&�2������*X*�b"R2JӋ����","$�3�2��H�-�*L�"�"
#��(���ҧ���`e�   ~&�   ^ �	�̈́
� 0 y	  
�F�L  	^ �+��(� �2 �"   L  
^ ����[
��a��� �    
���:Z�*r�oz � �B��7-��t���b	� ��  �=��{�     j��R$� �6��   �� �L  ?e����� ���  �  
^ A��D��v���� �O ^ ��x����� �]^ 5����/-� �  ��X��L  ^ J&�qv	�4��r�� �� �P�  
�  �
���� �� ^ �,	�-L�6�� �� �b� Э   
I����I���� 05 @e�  
�#�L � ^ h���� �* �g�   L � ���|���#/�� #  
^ �o�K�   @��L  ȕ�r<�"M� � 4Z�L  ^ B���� � <��  ��
�  ����f�vU����    ��oC�%^ B8�������   �\���L  &^ �|��� �K�� ��|�7'^ H��G.������Z����q�� � �[  L  +^ @
��2	�YE�<L� P4 t��� �� �  ���   g>�L � Z����   v   L � �#�D� ` ��   L � /^ :D �~� �C������   0h�L  �=��!� �1 ��  
 ��L  1^ ^�����L�
g��L  �j
��k ���� �  |Z�M��   ��� 0 T�t{�L  "��}�"��}� 0  h  E_�}�
  �g�   <C�/o�vW� �X��7   �  ������ �p ���  m2���� � `K�  
Z��a� `D��7:^ ȑ� pD����� ��=�����   /&	�<^ �N��[�  ���7   �1�
L  ���ƶ�a�� У �6��a����� �t�7C^ s������� � �$�D^ ����	� 0  ��   L � R���� �6 l<z��t�
�L�� �� �  G^ �^������ � P�  
H^ �x�0[�8� �    L  I^ O�Vb� p�݁����   ���L  J^ �`����   *;�l�� ��D�  k�� ��D  l�� p�D  �d�dZDfMڥFi�VJ�Zl��U� ii�UF�d��f�}d��llQ���J������V	Ff�,f?i���m�i��dEf�q�F��i
����`n���i��Dxl$�T�Fa�i��   "� �1� ,9� ���44Y���t!�v�!��!��#����"I�"H��"-�#2;#4�h#72�#92�;2�#
"���Ș�*(���₂�������2q1iq�q��\�*,"������)�-�b"` ���c�˟�*,Z����ƭ̭�b2b"���b����"(��2��������-�b"a1Ia�a�̘�
��Ҁ���%���a"a!�����Ș�*���"���������"b"���S�Ȩ�"%�"�"��H�L.�R2�"���b����,*(�2 � h�   Dj�L  �] _�es����  	 
�9����GJ� �\ <�d�� �\ �� ���	�T�� � ���  :��N�� � h��  
�	��] �����|��@� P  ������c� p������   q�L  �`���� `�D�  �] ���ǻ� P�D  ������J��n� � 8�  :���L  �Mg��#� �  ,�L  ������ ��H�  �j�8���k� Е ��  
ǖ�L  [.�1��[.�4^� �    *����� ��K�����   ���L  ����� ��K�   ���=Y
� @�K�   ������ � �C�st
�  ���  p �n� 0p �P�!`���� @p �t��L�   v   L � �1��?	� p�V   �'�  ����w� � D				else {
						for(i = 0, j = dat.length; i < j; i++) {
							tmp = parse_nest(dat[i], par, p.parents.concat());
							if(tmp) {
								chd.push(tmp);
								dpc.push(tmp);
								if(m[tmp].children_d.length) {
									dpc = dpc.concat(m[tmp].children_d);
								}
							}
						}
						p.children = chd;
						p.children_d = dpc;
						for(i = 0, j = p.parents.length; i < j; i++) {
							m[p.parents[i]].children_d = m[p.parents[i]].children_d.concat(dpc);
						}
						rslt = {
							'cnt' : t_cnt,
							'mod' : m,
							'sel' : sel,
							'par' : par,
							'dpc' : dpc,
							'add' : add
						};
					}
					if(typeof window === 'undefined' || typeof window.document === 'undefined') {
						postMessage(rslt);
					}
					else {
						return rslt;
					}
				},
				rslt = function (rslt, worker) {
					if(this.element === null) { return; }
					this._cnt = rslt.cnt;
					var i, m = this._model.data;
					for (i in m) {
						if (m.hasOwnProperty(i) && m[i].state && m[i].state.loading && rslt.mod[i]) {
							rslt.mod[i].state.loading = true;
						}
					}
					this._model.data = rslt.mod; // breaks the reference in load_node - careful

					if(worker) {
						var j, a = rslt.add, r = rslt.sel, s = this._data.core.selected.slice();
						m = this._model.data;
						// if selection was changed while calculating in worker
						if(r.length !== s.length || $.vakata.array_unique(r.concat(s)).length !== r.length) {
							// deselect nodes that are no longer selected
							for(i = 0, j = r.length; i < j; i++) {
								if($.inArray(r[i], a) === -1 && $.inArray(r[i], s) === -1) {
									m[r[i]].state.selected = false;
								}
							}
							// select nodes that were selected in the mean time
							for(i = 0, j = s.length; i < j; i++) {
								if($.inArray(s[i], r) === -1) {
									m[s[i]].state.selected = true;
								}
							}
						}
					}
					if(rslt.add.length) {
						this._data.core.selected = this._data.core.selected.concat(rslt.add);
					}

					this.trigger('model', { "nodes" : rslt.dpc, 'parent' : rslt.par });

					if(rslt.par !== $.jstree.root) {
						this._node_changed(rslt.par);
						this.redraw();
					}
					else {
						// this.get_container_ul().children('.jstree-initial-node').remove();
						this.redraw(true);
					}
					if(rslt.add.length) {
						this.trigger('changed', { 'action' : 'model', 'selected' : this._data.core.selected });
					}
					cb.call(this, true);
				};
			if(this.settings.core.worker && window.Blob && window.URL && window.Worker) {
				try {
					if(this._wrk === null) {
						this._wrk = window.URL.createObjectURL(
							new window.Blob(
								['self.onmessage = ' + func.toString()],
								{type:"text/javascript"}
							)
						);
					}
					if(!this._data.core.working || force_processing) {
						this._data.core.working = true;
						w = new window.Worker(this._wrk);
						w.onmessage = $.proxy(function (e) {
							rslt.call(this, e.data, true);
							try { w.terminate(); w = null; } catch(ignore) { }
							if(this._data.core.worker_queue.length) {
								this._append_json_data.apply(this, this._data.core.worker_queue.shift());
							}
							else {
								this._data.core.working = false;
							}
						}, this);
						if(!args.par) {
							if(this._data.core.worker_queue.length) {
								this._append_json_data.apply(this, this._data.core.worker_queue.shift());
							}
							else {
								this._data.core.working = false;
							}
						}
						else {
							w.postMessage(args);
						}
					}
					else {
						this._data.core.worker_queue.push([dom, data, cb, true]);
					}
				}
				catch(e) {
					rslt.call(this, func(args), false);
					if(this._data.core.worker_queue.length) {
						this._append_json_data.apply(this, this._data.core.worker_queue.shift());
					}
					else {
						this._data.core.working = false;
					}
				}
			}
			else {
				rslt.call(this, func(args), false);
			}
		},
		/**
		 * parses a node from a jQuery object and appends them to the in memory tree model. Used internally.
		 * @private
		 * @name _parse_model_from_html(d [, p, ps])
		 * @param  {jQuery} d the jQuery object to parse
		 * @param  {String} p the parent ID
		 * @param  {Array} ps list of all parents
		 * @return {String} the ID of the object added to the model
		 */
		_parse_model_from_html : function (d, p, ps) {
			if(!ps) { ps = []; }
			else { ps = [].concat(ps); }
			if(p) { ps.unshift(p); }
			var c, e, m = this._model.data,
				data = {
					id			: false,
					text		: false,
					icon		: true,
					parent		: p,
					parents		: ps,
					children	: [],
					children_d	: [],
					data		: null,
					state		: { },
					li_attr		: { id : false },
					a_attr		: { href : '#' },
					original	: false
				}, i, tmp, tid;
			for(i in this._model.default_state) {
				if(this._model.default_state.hasOwnProperty(i)) {
					data.state[i] = this._model.default_state[i];
				}
			}
			tmp = $.vakata.attributes(d, true);
			$.each(tmp, function (i, v) {
				v = $.trim(v);
				if(!v.length) { return true; }
				data.li_attr[i] = v;
				if(i === 'id') {
					data.id = v.toString();
				}
			});
			tmp = d.children('a').first();
			if(tmp.length) {
				tmp = $.vakata.attributes(tmp, true);
				$.each(tmp, function (i, v) {
					v = $.trim(v);
					if(v.length) {
						data.a_attr[i] = v;
					}
				});
			}
			tmp = d.children("a").first().length ? d.children("a").first().clone() : d.clone();
			tmp.children("ins, i, ul").remove();
			tmp = tmp.html();
			tmp = $('<div />').html(tmp);
			data.text = this.settings.core.force_text ? tmp.text() : tmp.html();
			tmp = d.data();
			data.data = tmp ? $.extend(true, {}, tmp) : null;
			data.state.opened = d.hasClass('jstree-open');
			data.state.selected = d.children('a').hasClass('jstree-clicked');
			data.state.disabled = d.children('a').hasClass('jstree-disabled');
			if(data.data && data.data.jstree) {
				for(i in data.data.jstree) {
					if(data.data.jstree.hasOwnProperty(i)) {
						data.state[i] = data.data.jstree[i];
					}
				}
			}
			tmp = d.children("a").children(".jstree-themeicon");
			if(tmp.length) {
				data.icon = tmp.hasClass('jstree-themeicon-hidden') ? false : tmp.attr('rel');
			}
			if(data.state.icon !== undefined) {
				data.icon = data.state.icon;
			}
			if(data.icon === undefined || data.icon === null || data.icon === "") {
				data.icon = true;
			}
			tmp = d.children("ul").children("li");
			do {
				tid = 'j' + this._id + '_' + (++this._cnt);
			} while(m[tid]);
			data.id = data.li_attr.id ? data.li_attr.id.toString() : tid;
			if(tmp.length) {
				tmp.each($.proxy(function (i, v) {
					c = this._parse_model_from_html($(v), data.id, ps);
					e = this._model.data[c];
					data.children.push(c);
					if(e.children_d.length) {
						data.children_d = data.children_d.concat(e.children_d);
					}
				}, this));
				data.children_d = data.children_d.concat(data.children);
			}
			else {
				if(d.hasClass('jstree-closed')) {
					data.state.loaded = false;
				}
			}
			if(data.li_attr['class']) {
				data.li_attr['class'] = data.li_attr['class'].replace('jstree-closed','').replace('jstree-open','');
			}
			if(data.a_attr['class']) {
				data.a_attr['class'] = data.a_attr['class'].replace('jstree-clicked','').replace('jstree-disabled','');
			}
			m[data.id] = data;
			if(data.state.selected) {
				this._data.core.selected.push(data.id);
			}
			return data.id;
		},
		/**
		 * parses a node from a JSON object (used when dealing with flat data, which has no nesting of children, but has id and parent properties) and appends it to the in memory tree model. Used internally.
		 * @private
		 * @name _parse_model_from_flat_json(d [, p, ps])
		 * @param  {Object} d the JSON object to parse
		 * @param  {String} p the parent ID
		 * @param  {Array} ps list of all parents
		 * @return {String} the ID of the object added to the model
		 */
		_parse_model_from_flat_json : function (d, p, ps) {
			if(!ps) { ps = []; }
			else { ps = ps.concat(); }
			if(p) { ps.unshift(p); }
			var tid = d.id.toString(),
				m = this._model.data,
				df = this._model.default_state,
				i, j, c, e,
				tmp = {
					id			: tid,��-��=��W]�o�/Q{�Y��=�u��VN$��~���sO/����і\��'�<����w��w���v�������5��݇п��������^�ғ�%��W�'7���aO�>����͟�S���
cHb�#��g*�H�1Cd� �@ �L�i�d� �gD
	PRT� �����{� �@+a���R� �S��y8�(1v�BGb,H��!��GG D�)� @P�
�
7�: +t!��
�,E #
D�*!����"���Ϛ�k��Wi/r�W�v���w��^ν�s��s��������>���be�m���zmC��|
�s�K���~�4�'W�G]os���k?�>�'ߟ+������K��^7-��n���kq�;��$	"�9a P�0 $(RYpp��f!De��[���HʈQ���  �8TB������RX�G���#fhO@"�f� �A�����A
!� H0�P�HMH�A�@(���m�ͷ=}�?Vf�K�o�9��FuO񸮅���ya���o~nz�pPr�u:՝��tR�ζX$U�W�~g�޹��3~w3�[��e7l�c����ʽ��\Ց�jo�����7��%_�-�os��2�_��ɦ>t��w{�~
�!�LX�PBAhTOJ3�(	 T 9aADDp��O4)�D8�"62,�: ��* �	�@A�� T�!�����
H� /��FoDp(P0�l"l0
U`�K
�8p �3 `���x(1  c�RH��p1 `BP"��� $@@
Z�F�h2P%�QP�E���'��v}�ok�tZ�t��g��7>��|N��;��g�ʩ	�_��2�[���ʟ�g��6������5�~?>�W|/Ѧ���,�j�m?�\��`ߤ���~t�ܮ�{�|����Ѽ�d>���� ] �@%E���
l (n�b� �J ��#*�#@! J�,*@�8��� �C 1*�ā1�� p �� 8�-�B ��
 � ) J�XmH�`���Q�@M��8g
�B@�J���K-7�d^�;wu3Ӣ�o^�q�g����2��-��@��8�q.}��@���m+7oʷ�����f)[W�|\�[����g�o���d\���o���v�+��]��}���������L=���NNne�8�v��=�������[�k+uǯ����U]����2���61o��p�W(������u�k��"�/�����2+������f?�����"ˁ������;�ͷ��X����o4�U��*w���m�Kۛ�c�l!��J �I3P�h�� !(*�@B  �P-Qq��`	���� XE!���%�K�$@D"86B0�D�� 1V2Y��$�B|�%@
�
��Q-�����]u�l��{�g�����������?�z��1��Kͥv��������l�76�v����6�  �� � �@@���`���p�� PW!r�d�a�
@&�`R���|[fa���`	�<Q�T0' W0�P�`@�&bP[4�b a2���9���<���ZC#!����`�!�!�C�@d�(e�0  u"�4 2�`!"K$!�T�($
C���@ ��*���� B��/#Cb@�A�,�P�I�RaR @?�d�!�0� %<�� s"H� @�p  C`�������\�����﵏���o��~�����ev�����\h]�����}��_����=���U�t�-�������Cf��O��[z���	��?�|��t����߿ߵ֧�K�����ֿ��갓X��%Y;\b� �I@X>$�"
vd	A m����")"�`,"G�\�CQZT�T:z�((R(��A@0J"�O
�q�pp)H '	;�DF� �2�@($m�!��P 
��
T T�Pi�*B�@��8&��"! !dj�4!$V��V�n+ ��D�$X�55#@���m�q< "`�,�()�"�<������)+�X�տ�r�l�����:۾n�n%K������?����}E��o�??�N��.K�7ܗ�Oio��^ki.�QY���z��>옷�_���՟��1��J{�d�������]��\�y�����?N�~��e7oB� �V 8�� ��*��\! 0#8!�2	�L4@�"�a%�� �8�-�fI� D  �@`P�"(� lp�E�E�P	#�G"��`�#c�	m,RMH �!���ab$8���f296�����XR�^�O��Z�;���'}�}հ�O��r~�o�����>_������/���iW�/��B���������v�t]j��gh���o��a~���yU���5�e=�~2_�{���[%��7�,��^g��No,�o����?^S��O��/��Z�~iN���<M��b&�(���w��yO�����5/�}�Z?~?��g*�>��8u��7��z��rv����sx�f�[����o��?��W	�U��c���UMT�T�P�� �x��� HIr�)��B ���^q$�#j0.� �U  H!@N1� �`�JiJ�HP  (B��!�#DR@ AXm�7a
b�n/2�?ǵ�����k�ó�3���v��6q�g�'��W�tOU�g�w�.E�����I�|і��|�N��ĺ�_�����}��_{����οv�a����u����?���X������?�����������[������/˽�����}���?�|���������_o����?�W�{��.����|����r��_�������?���N������������_������->����W�+����W/�mOO����S���z�o��_�_�ww�|�����ز�xg�ٯ����?_8/��������#g��v�������ۯ'j����U�~ג��M��������v��[p�|'�|����q���~v�����~Fْ�6�;��o㝵ٽw��_Ho�?���_q������ό����+�_�C�>{r���zU�{��{���f�w�*G�����w��}ޗ��/�iV/u���������ѽuy�3'�V��-zb�w�p���o�����z9�y������}���׃[���.�ݎQ�}��or?���{^�?�uGK���Ƴ��
)pa$pN d� "+�Xp�D8&�� Є!B�$C���[f��%�G�#�0@�I*#0^)1�&����w������m���oyg|�s׳�{|�;����_�3�n}Կ������7��ӗ=��wͽO��?O��_��t����?���}}?ٽ�e����ݧ��W�������u���;�}M��mo���9�u�����X��q�_�OOw�s�˶���vޟ���c��N��/~3~�s������e�y��MO��>Я�������f�?�M�_�{nr����<s������j��k��/��������>��ݿ���
4 F��L"L�	3� �(� ��� W��� �j�S7( �!-�
�
�#�3�Hൂ� �;+�Ccd��(*�Ee!CTX0L*�w&�E � HK��j��'4���&0� ����_��^�����oz�ݹ��k��:�����3?�����o�7~�Nn�M���vl�k���fJ���b�]g�g������ۊ��N|������ֿ������?w��HoV��զ���Q��y�\/�B���fSA#Mn$w"h�a$
f��#�� #�fI�6��@�0H
(bmd�GnC�,�$�� �I	�f���Q�X�(��P%x��@* q���@�@�K: (4@3i���P-(
fGfB���%��Y��>_�1ۙ⟻3�i��Own���&�WX��Ʒ����zk}��j���b��z���K�>����?{�/��F+����î/�Nhu��_�Zo�~x���o��j����Z[�$%��o��{�;%������B�����U����8P  	��@0N�T;jI� �a���*���pAȚB(�%=@�DЀ\a�1�I�P  �-���"�"̱ ��G0�� �<`D8 �
J`$I*E���|ϛ����'�������os�v������������Z�_b6�����o��[�s��ߺ���^��ow�}iY�_�/�c�O����v����:�������}lv��q}[�k�������<S�{UH;�7_p����].��쮏^����_߽�{��~����J����g�z�Sb�?������?��B�����'��z�_��5�qu������7�S��?�Ԯ�����n+?Q�^s�y�~�YY�~�����ٯ��w��k B�a��*� ��ԑ�������` �A��"�D�����q����LT���5AA^	�d�@���ESʩ���P��ؖ;�4�!" B��l�
AeD�đC�%�#�^��#B�(jƎ�D �(~c(�"%p0T$aB������v�ܡ�O־�)�����>��������<��f�����Ǯ��_ot�����u����I�*�R��ݶ���u#�B}.��ύ?���x��?ϸ���؎��f���1~�\?��u4��֯��w����)�݂����$�f��0qbu���c�w�@$p�NGhR��� Ãj�
�"E!sj6Dj@��NȒ���lS|A�'a�O!�	@Y��x��@@�F$J$�BA�-4��� -���N�u��QeW]֥��ۿ����ݭ���y��σ��6�����������>�=�O���{]��ȯ��+�8����������_얻�.���m�&
P?����V�p��x�p������/��y��e4��<5�imw_�P�[�u������@�}�v�����^�ُ��"���d٧��wz�������m[����˻���P3y6>�~N���]��i����S���Z��սm�.w_ɗ����v_'֟�ܦY���lݛ�)F����Q"�H����2и�.�@4�i@&(*I��p�� 0��
8��
�� �h@7x�i1 ��Nq҈��T���?gdq0�(w���_��~M�:������������_����<n�{���?�n�'��g�<�V{���ާ��_����w���wߛ���R�\�����x��?�O��������n�/��?�y�]��Wk�����}������ �XlB!�`�F	J�4fȀQO
�E��c!Y�B�ʃ6901Eh@�*)5�N���p��D�4:�! t�D&R52�e@g`��c�iH��H�"�X�� E0N���_�v�F���sto����l�y<�7��4��>��Ե��W��?�?�����sZ�^��m6�c�~��?e��_^�3l޿����r�����ײ9?����st�����k{�_����}s��p��^^0�������f�-\]���7���v���cq����z����^}�φV�&��7������p�o�<�wls]��?�x���������sc��iŜ�/}�����~�C�������^�/��W�/{�g���^$Xpl���@,�X�#�0i� � ��@�p<�|����0
��֐����, n���`#V~#�M*w�b!�6�d�T
T�HM�F_�p��b� ��" �. �hXL9p�"��lA�����\��䨵!(`)B��� 3.��	E����~%e�
�&DJ �� ~�$r TĦ	P@� ��BI�(
���6�rI-4�D�(�+0,.q
9���[�I9FH,�@$$�Y��08^�p��"�8��PA@�CR�"�S�� �
0��%��AA|�P�"lF"X
<�$��-�DB� 	q�z"�2�D0��dYf�
� cN+8*=�S�dI.��T��A Ϫ�:Z���`pn����&�BJ�A��
B&K%���"�X L��Q����K`*� #e�!Q���k�%G�h���$
�䔥�K@4E� �3$fLa/�F�&��e�&
H��h�(R�*3hÀ\����e��P�*#��$��+�1 0��TW��p 
�6���Q�.��И(@�*��d��#��� !@^R $P3�DDp6$��0`�i
��[CH����T�� ���ʨ��  � mf�`
B �4	�E�H �� ���*��I(r� tH*Y� 
xP"�4��8
 -	"Ȉ0 ���"��p�R�rl�-@�"0DE )���d�p�{��Y3$�,��@@�A6���8�0$��c8F0 $V� F8cD@ERJ 5��R�A�+2� xs��
1���
 �:��b��6�6��F�`"���q"�!8���pL6P��IP� �XE]&@�ILԨ�IEp��
 ( A@�8
$���j �  � (� �tBc ��  NKK��aTD	<��y��@ �� H2 %` A�4����&�D���R �@���4 z2�R@�2�A*
�b0�'D� �vb�d�(rA,���� ���P#���	&h1�H�0�D> r!�`cqhA!�e @��T��(�ख���R���US 2T<��"	?X����%��2Z�`|(���%!L"�ԼB�2�Yq���Q�r�Ph�T�XHF�2�q7B�
^�0�c}U6\����:$z�0D��0�6@ �P�j�+က�0@i��T�� ��0$ aA6\�(��B`4��b��42�8�bA@ 2�QB5� 4(��	
 D2�90 cg�H/y�����¸0 ��@B�� `�8
�1�	�,�q�
f
@e!�aQ`���F�v�FG'��0�M����0 D�sBp�����D5�XT�%h�t��0�,�� $ ��&����b$�J� �@,'
k��u@�b�
�@���*d'�*'m,c  �
��+1��� �e��P�"� ( �D|�#c����
� 
un-��T��AȢ� (`7v
D`� Sp���2�4Q	B �@��=(�KR	(*&�HE{ B�!
HɃWH�J � I � #��P���:�A@  �� E�
�A� .�ԙ*į��V�(*@ �L@ 4
��"�N�!9s i��L8�h �]��
	Et�"��<
\!b�(
`�� �i�bP4�p	I�p؂(��uJV� $X� �*��P(-"%(s@q��D���P�H���?��	P�{�R �����Q�(
# "k�dC��)�� JP1��. >�I�����@�A�
6Y���� �9����$��'�"�TA*��K�=��@@�: Y�7�� 'xpQ<�T(ɘd�F�P1�D�_� �'�(B�b I*��0��� �߬D?�!�8�@�U �$(� ��`�
 (�C 		����HK  ܂��P& �`�P�� ����@H��d4�Xb$�� �Q� (Yd�"KrUAE �q�N�PaB�T&t�L��! &r�A��5�$<,*8��$e� ��c@�fG0��(���`�A��p� F	M(��@ �
��I� �a	d� @Ħ �	�pH��!
�@@�

��� n�2a& �jLL �А�c8HU@T�@G�	H� �&1@�̶GL�����6p���`#�f�*�vP�� )�*$��(A����GHH�DBH�&��hD&`�(@$)"	^ �#��!6 f����B�MAnB֢��Ԇ�
�!ˁxG�J�&�$�FP#V	 ���B#I
#L��r�@�h!ޣ  �*�"QP���� ( 0 @� $���� 9v�G�H W�
"$uH"j��qa��& ��XI �=�D� ��#��`�b�! �$B0Вb)��N��p Sؤ �3�0CJt p  P"�	@
5K�F�HB�E�@J �$�CX
EH�6"f20�dFI@9����e�T�L�,&�x�M��PH:R����Iu�4Tj�%4 �`�2�S �̱�(FRA�  ���J5 T���!1CC
�8(00"'FI%� q��W-+EC��\E��*��Y�P@�D��G�Dp�"��3 ���P"� M�����
4�+d$��C��,E\M�P'��`

HтP�I��@�D�UB4`W�AIP�A�*B
GM Dx�"�����S 
bg�� �}��'��U���)�@�H�` �B  һ$5�	JD 8��  ��"�@�EЂ	��	�Q������&B F���;f��R�^�	D�ր
�� T@
Q3�c��!��I���� <,P6�#6t�`PA6>���gS��DUe"�rAd� Z!��M&@q ��*���Dt x�� �  le�����4�J "摞Em��   (i ��X	��T�d t
H�1浅C�
�����,�XX1P ��	�(i� C�@���+D�)�� ��� m �4" �(9LTɂ�hΓ���8���:�蹉H� pҠ�7)�S@w	��eH!`GA�E j4eչ q�d,$@$v ��)���UJ�MRA,�� �D0 �hj�Bv�wqDTE$(D � �B(��@'B�P���(Q� ,�E 	G2�J�����N�@IW`

k@��7McH` @ �� "���Q* H :��`b�P!�U� @z�{�<y6�c�@L�'�Z
J`�	Ԕ�)r�gtSw��A'S���P��%+��HE��H,�+B�  ����05�ȯ�$T�~;X��qI�G +�1�a#ΕSZ$!A��*d� �
�,
��~X�"X��+ �M�jhˣI
Dd �W�J(h�Q  � H@
!������0)��Q�B(D@bT��@��^��BX4`	   8
(2'�� �q�� T��X�< Ѡ ��K	&�#A$���Iv�]` �0J
R�T��@bD&9l��C���PP`�(�$]<C	�p	��	x=, jP a@ĈdYZ;p�"XS 
4��H����`�$�@B�h�f�8�T`  .����D� P
Kn- ����! (����B,m
�!	�H

L?ST�O"E D�%��C�d���(p�B������AghpU�� f:�@���   �A�		"dtB]  �0/�9��E!EA`�N;\�� �B��S>.��D EZ (�"�VW�9���p�G.�da�v1@�(�(V`Qs~9��d¤�H4�P��JB���$��9���3�!PYR@%���׭Q�H)!"Q�
^DpF��x�����x��<T��Xݸ
+x�r AO�
G�GA

ɰ�C #�A �PD��"]@ ��HA�L�� �)� $���V����gD��	��z�D.���B�PFB�Bf�2)�1���"��)�C�(�`DL�Hz��� # � DQ,��pÄ!!�T�S b�P
�dخ�Q�HM �C0��b$DD� �h3C�
��dFdD�PH1 yʠ���JA�1��f�1�Y`0�#�d 8��P�8�`� "��0�� �!%4�ABFgA/��+�0 @@#S1�UC3�C����p�O�h�dɐ�FP�"%�	B�&���5�� 4^@.b����CCl�Y�	����U,��`�e�R�@� �<�1
�Dp�l0$�
 $AHG&�� h�H �$BI��P�����JG�,��B0�$���$4���
A� ! 1vk�F���53
(��n3��8���*�6 K��B0!�i� �*����PWI�B�ӴH?��A�Q� &E(R�a� *a҄����1�"�al%�R6V!6A�x �US��UA7�
�3 }LdNS$ �J����B �%B:�U�H��X @��@��1}��!�a/i�atQ��
@�1HN ��((���QBe	 '40+�ܿ0�%`U�Ɍ�@@U!�9V,2��� �d2���B��Q$�,��HY�	��J2xƇ�@j��*�
tP	P"(E4@�� �Y� ~2`�[ĮP���0�)�� �'
  �8)uA0��@p �E��}�1�W� � 
�T.8/H�SKZ_������gqVy���w�3�6������ܞ�#G:��Y�w���~����S�J'��[���S�Mo�kS��o�T������&�)�}���]�'�w���5�O��/��{g;���{q��	n3��Z��*@� %0, 0!<�F $$���0�.``�D!I>�cVb Ҥ�D2 Z���� �P*� ��U9N  � ]�J �b�* "�R��h����pdPFj���P�c%
U(Eta �U� )!0H\�& 84ƕP��`<" �>@� ��� ��I  ���(�@���:�H!�fb h� &�2 �+��H�D���">U  
`j�4�2���<�|<c���������M��v/��{�g��ҿj�fO�y~����N���G���~����%e�O�HeO�|j�O|�g�K��wW�\�U�����S�m��s�u��-�[�|���ow�����?o���� @��	U
���H@��8��
 x
i	tJ8z��)���A� �,"��m$�P�
0� ��:�Hd`%�`��D�P6��H0��0��` C�@P�D���"!Y��#<����U����� l�!4�	�I'6/�	��*"��cP$Ċ) D�1q�O�Ҙe�M��V��l]��^�e_;�ۉW�u����n��o�Y���'��/:��Ϗ�Yv��w��na�>���1���׼������K�K:��������x|%ʛ�M�UzG{R#i���F�oۤ��:y����/���泓o�e���'[}���~��V�7A��|�>5�RG��q�������m�z�M�������&���,�������>�t��;'sJw��nMZ���>�Cк�^���Zj���78����^�����H\4�Ac� �6c�  �`5�.�6BC���"� � ��|�DP�� ` B ppd�� Yg�� �
���A � &L�t�D�BPY%�%XЅS@$#X�h@�� k�1V}��I���Y6֖�N���?��ʛ�f���[�l���iw4k���[������T���݆�}w�*o|hm{i�/����pl�E��[��{��崚)���7Nz���������uo5��ǹNOu�ɆA*bB�y"�8�5B�|�a"FiR�J0��a� �+�DY�BK�E%Am�  '�0,+�B�@0dc�D� a$3F�� jX8	:G) �X�"��Ђ� ����I�PE 4�KC	A�L� "I�Q"A�s��l�@A0E�%� ����MGe"�`�<�AH"�<� ��&H.`"�)%r
C����U�r�n/���ג~�5B�KWw������uߵ�O�V{�h6i�s��@B��4T�X06D%@ҍ
Y" ��&�H@�� ]H�aPd�%��	f�
�( 00�4EHQ����@���с
$�RP),��d � ��@%(�`V�
� t��9��R(Qz>�������������A��[���:����g���-��n�{�����?��ޟ��&ǵ����X��?��W���ϢN�W�{����ğ��)�?�����i������n�;W�W.�ݛW����uz{������������ҟ�������۷&�.׷�X�������?�R��r�{0����u_v�L��o�����t٢�_|~~��gN��2�}�]�k����ߚ�k��/=���*���}����zӷ<[��`��k��@B 	�D"�%`C�� �@AnhJ�s4# :�&$@ � �J`AFF�$cp46 �A����bY��X	�CA���� @!%ȓ�@�P
���$ PPC� E!@]RY(�h��Z�zB���g^��o�E��Ҩ��o�rs�W+�}�^������Ɲk��D���7������?�����?����}�j
H������ �X+�AX�#�2���!�����Hp��ʃ�%K��� �!�(9v
��� H&���$X5�� �t�  �f	p``t(��z	 �`00
C��	��X� $ �P @VPR�)�p"" Y� �� �2��r�0H����, �G#�`c�M�" 0&��0h HC��  2S�Q�8A! d$��K���3��Ͻi�΅��gҚ/��Cަ��y�M�qvgw5�#�#V��u�c��S/nyY^��{��ǧ?6���7�b����63c��}����^�ͽ���^������ۓ���ݹ.-7�[�?���.�x�h���2
��d`$9fK@9.���i�AaQLDM�1� BvgL
>:{I;E
�P�$�
�BRT� �n�LR	J�� ��,�"�Y���g�8R2H�a���h	�I�t� ��a ��4��� 
@�<@ Fp�8�,�H� k	d�s�+AJI(O@��H
q�]����_����|Ϸ�y�[����߸�K�ݮ�O�������m������W����9�������yeߌ��q=�{q�����������^���M�޻�i�z��<������7����9���f�ߘ�����<ġC��FVG� ���P����$1�lBy1Rx�
�	f��M 
��xR0�l�*�JOg�d23ov�#  �ff� @��P^�Jr�2X� F��a
��4�PqH����m �Q|������
K�6"X� �Js � �!i�;U$ � 25p ����4Q�RCi� ��=��w��ӻ���{�]wW+��ks�[�n���}���=��M?	���oz��[�Q~�t�^(������w����߿����w?�}�����w�߸��������nu��y����or}׾���VPO�G���=�	p� �� x�
� /�L�	)M	]bS��MT�*$�B��QD����J����AHX�B� �Bk�'�`�rP&��-��CDI AC45�fO@AIX��@��1�e�[���Y"�AJ �BU� �9QT��B �8Jk��V(CR�BЬDaej��� kM
֟�		x�ҁx�Č��Ƭ�B'r�� d�c�-���K���p=A' %�����ͯ߿�~S�|G����m����^����^�������W�����ۧ����S������~xԾ��
���j���_�����������o��^�{�h}��?&e�C�o��w~UF�0����8w�����l���0n�Q���?_����F˘��u7�����.��������'Ѩ�k��=��k��G�������Gf5A�����v��4��b��}������s��������������n�w�ˬ�o����뿫���}s����ғ���s|<n�
=��d�(����T'��%� �N��dЉ���,D��$����e�4
��Wo����c�n˴x�Y�^*��U�\  �C���� ���� V�h.�`Y.@!���[C�:�@,�S�BZ��%�J1�Nd5�$�� :L -�J�V>��K�L�1�d�b�F(�j�Y��l	���_��}��S�)۟�����������g���;��g˿���]z������_��m�������n���o��϶������w~���c���~���������-j����̷O��$����,k����b��������x��Y�*O}Ϗ�G��;��|��O�|�?/�v�[����E�?�r�<p��v??������f�����U�_�ݻ�_���&���F}��r���u?��?�k��_��3�����}��{i�k��ݢ�����$F
� ���Q d\��e��L���TD�KO@��'� �3Hd*U� ���u7����m:�ZG=�����������.�z_��~�ÿ"�����,��|���{�{������}=?���U
�	P�e3Y Ƹ�
���_�! $yA�{��SK����o��f��{}n�7�w���������w�ջ�N{9˿�t�΋2������������(���Ϸ��?������m������}����w���{�=�ݯ���������������Y{_}�ߏ������{o�~��{Y{����������~[|��y���d���m����xw�A�}������g�^����{��+��Β��ݛEy���L���w�/e�=��ػ%]��9���K�����A�z����ch���*0��ܾ7�+��[��&Y1�0B+F����Č8PA
͗��D�xI��7j �a�ÙH�H���G ��`2�Jˤ 4�\�s�`�V #��L�����
��$�'�P( E\U#��4=�@A�!^I4�`	Vhp�LP����Wd(g2	!<	ݐQBp��KdV� `!�� qЀ��P�$�")h�5 e�}�&�.���ub�߫W�^����o�_�&�c?W��eKo��'������\����p5r.����^�����O���]#�~LwH��ڦ��Ј��~o��;���3/����}�����5�~�a���N,^�����v�F�-I]���_̳�7��wՏM6�[n������(����&�_�qW���~vݧ�Lט�'�}��n��>����������0����k��݊Wӂn!�y���;`����ݭ��0-�	�D�b3Q�7c� ��P�9+5�.
������@�炠�b���%	� HB(���5
AbIde�%`L)�P&<D�@�A8�hł�@+� G\CI��J�l����BD H0n�2󫻗����'�2'���� ������������z�S�̻�a��Q��j�I�5���Ԝ��z/Fo~���[o���W���
} V ��# �B b0�xCx�D�@0�
� �Qޅ+����ȀS DVP���ʌb���۰�L��������W���n�[�yO�#�>�"��Iw��o��~���������N��Gy���ù������q��#�-�ӳ�4[�r�2�,s����7��mp���q���4�3���W�<��Wy��-G�$<�$AT :
�I$� mY��# 9 b�p� ��P k�2h�b`$� �/h`�QC��`��P�FBF�7 �0�Bq� �0�! Gr��DA1�h� �<��j�N�`�~t?*�ŏ�S*w���w�:����;tz����<��U���-_�����OE��WQ�;G�'f�z�ƿ�z8������բ�L*o�������������߷�'c�<;?�=��u݆�q;|�����?������UY�|���uŚq]_Z5����gG���o���b�@mn�
� KC8�(�E$�T1(b��Iu��P��s:r�8PP���
��� ���!������ZV�D���}E f\���e�2�0(�0�յz�G/�-��$_�����j��?�<�k����������������]����,~���޴0ߜ�������?���j/����r�����W��w��|���M�鞎��	i����sz�
I� �(@�#�"%ai�1��" �B � QT�&.��-�@ ���nd � �僴9�uX�d�BJ@��� ��)&ᣀ��H (�� �B�T+ �0@�$���~�P, -#02 ��@�b%�mv�A 'E
 `hp���02RJ&D� 1h��D��B� �|T�؅4�X �D(@�B 5,p@(( H�2��&x��b>AF JD�q�  $ Q��a�D�bÄB�aR ϳ��O�GG���/}��O�o����������6h�̽7������[���b��-j�[T���?��g�[~������o���q���.^�&{����=����ʻ��]{:��R��/��:o�?p�y���Q�Xn���,�@ �" -�0(��,)�a��F�   p����! I��#* �0�0"
 �nW�
��A U�(M ��AH9I`k���X�$!�"��D ��L�0��.&�"`���o��'N}]��q������7�8e���O�z-[Ր����m�ד��Kܤu��ku2��T
#�rH����*��  `� $�9�@	D8;(�C�.*�!�Dt�pA�2������f��X�t�����e�zg�v�V�u��^�ǯ+����E�+=&���<Q.�&�.����+w�:/o;>%���N����oy{��|�/�U��_n�����w�W9io�ǿS�mw�s�V��OH����ݩ!=2��,01d�B� `&�d ��[M  ����r� СP���V�4�$ Q�"8%`?�u�P9]�
�<,�a���D&�ܜ0c�^	�)9� 
�L"��Ж#��DJW�d<�D�2'�$T�!�3�MN��v]3O��~���?5��{}���`?��v�����'o�{߻zﹷ������������W�ӽ]5:��lmn������n�'Z+���?[���{����[;��^�\���e���\�^��}���+�#I���|�F����G㮮��U��(�Ĝ���/�7߯_�<_���)�Z��?�w4_-�o�o�{����/[?��}�q�Ҭ�^�Ꞑn��\�~��w��-�6����_���^�߭l۵�������^u���d�oi[@ A�, $"�@��D�Xap J�
�����D@���FEm%-�
@P6Dc@��(B�W�)T@I� b �H   -�Pt��8�QFCD���aT%P k�i�TF�A?����ο޼�����c{��z��mۖ������=�x���p��������>/�������{����kw��{����~���Zzw�b�±�W����>�v�]^���s�?o���d�ww�z}����V�=��Y�����0h���1@Ȑ/W� ��01��cPh�(`�����9 A�!"�<ࠠ���(	"𡀄�� @�E-�t�� %� �A	bUJa
B	�%�J�a( �$P��8�\R4Ik �"a����@�@|�JR.ʌ��QVI�@��@��P���a��8�"
�`i$��|1�Q��F
�l`�G^��C�(fd�4 ,��?Jf�g������i~�	�?�S����0}^|����2��#��۟.߻[��U�>�jB��?W�k������������������n��~�5��O���q.�����N����[�����>=�_�6;�����#�|} 
x���x(�D������M2?��ֿ����N�5�Omc��4t�������j
n�3|�B@*H�����/D@�����h�5�xr� �<�����"�%!@2�x�`4�i� �z1!�jg`��CV<	��ñӐ�� *�ʔl�|������M����G�G�%w��v�G/^?�]�{�����v�Vn���f�C��������~�����~���랡��qI:�%m��z�o��a��Z������?���U�d�w�������7�+F��d��P% ,�x�M���@&""� t�Ra�r\����@�i�@X)*�ȶ�0�
��ɉ�J� 4ea�`�E�(�
bℬ�
 ��� 3(#���%�`��
�$ 9�`A(@s�0���1p6c���)@6'����"���f�A �'�0�A ��L�����@!��A�pi`8�UrHd8��{ !$ 
 !e�1�Iq�d0:�w�,]��rz�^���_���9���7W�������eK���vg���]?s�Ǉ?���i9���J���,S|�u�no{�C�m_�p	���we��腣���Uw��=��׿g�O�nkݱW��.���O���m	�W��Dt�J7�y��V�O��s;�s�������{���^7�<�~�x4��X���;������KW�V�{��������V_������%�/,3����~�־ӯ��{��d<��^����p�p ��X4 �� �D@�� M ���BDIL@F�1���eA$X@��H%	T�48E��-@CA `�	 D����� &$�E!S64A �����@vD��l� 0p�R�O`))`�|+�*������+�o��w�ٱ�r��ٟ�	���ow�����7�=m?�}��6ۏqU���9��9��9����i~�w��}�������7p����=��ds����%�����V��ǳ�������O��y����6� @$��� =h�������$ā�,�`	�!#�� ��h�y-��	  *V(xU ( ��
P�`@$�!	0 "������4�P�6e �D"@ *$�!�����a`	����z ��8��!"��TBV5��p�GJdU4`�� vJ�0a�(�H�	*E 3-Hb8h���TA�& �D�� 2(X,���@J �8
Ń@���1$)��7{��R��_���S�\������{��������g���_���x?��������O����B�8��o�.s����k�z�w~�mU�{�eWu#Q����>3�Q�KV����M��7ʱ�h�{W��M�ʤd�4�uhġ0�QD�J
�( �:�� �,rP�(�� ���AvD�9a�n��HJ�@1;y� �DaH�*�NdD�B ����`:KJF��{���(� �  �� ���׽�[_�ŭȘ����>�\��n)���_�2�	��-�c�����c�vS[��ҳ��������?�����{�۾�WK�b�n+�����������[n��E_�[�Ky��VGě}rk������8�u���	�i������w���q~i�o���=���7b��_N��z^��ޛ�噿�Ӌ�E|Nb��}���۵�؎�-��g57�u��?���U����|������)���{�}����F�����n�<�#�o�{	�@�g$� -(LD�`"&4Ie�@h�
 %Ъ TaH�
�Dr.�l�
�������z����*��+�ܷF�7F�犻�[�W�_�B�s�_��+����ˮ�i8��{w��X4���o�9%p}s^>M��8�׭��z�ۏ?��������׏�m������
��WIm)!N �~�c� 76@NP�@�F!�I��["�Y2� ��`���!��9�@ c��0` �F�6 81�,����	|@�* 	j@ �����Tr�JT%�2�< R@Q0ʠ D� - ÄH �
��0$ R��,k��� ��d2�X2 " �J@0	  �!D�%�PT"" ��
T�c�*���Q@ɰ�&  @`�V@(�SB>AE��� M���N_���
`B�	k11�<�0J���@)g�`0 �#' 8�����$ $���T�dB� A4�N� h �)�hYA ɔ0��@T���!8�!/�Z�@�GT�  �9 
�	sA�j������}��;���������nL���?��~_g��_�ܻ����o�����������]���
e������׳���~����+�R�|B�{������:4�������ֽϯ�7��2�s�����ݭ��g���?^�u��'��nT�_޿��s/��w�N�_�S�}]��;����4����;�1��_�Y{7���٥�s��~P6�ƛ�Ҭ?��c��4��踻�Z������3�G���`ab����#J��BѤQB���` ���
@�A|QT��J��O�	FT�����X�"���
�qHQ8�A61�"
`��D�	 �4�U�L��Xe ��# � �1Ș� �D � ���Cd𱈊��DX����X.
�@�z*X#R�ȱ�  ŀ �V,|*� ��Ő(V�-:�	A�M�@�@�J�	 ����@@���̅I h�R>��D1ZNJ!��R	�f?
cXEd�)�  ��%�ĵ6�.&$< ��I���1������$
�S�$�!)H��<���l�E�4��&����*Tf ��H<(�3J6@�52"\¸#f�V�!J1�@ ����P
4�b#" 4� �!RT($ @
	�����C��i���D�H@�`	 ظ|���{�n � ���M�������$HS�<�����T"$�4B3� �@ �!@�TIx.��,� N2� `�`
C ZbN�%ec$!�RD��X0�0�K��$ذQQT&��R ����t 9B ��y� 	  ؉�`:�G��*@ �p�Q�<9$Y\�d *Ic� �5#��1))
6	H�J+ �-CTZ��J �m<�@RD *$4  5�� r�DP�[�0B$c��z�)����0yQ�$���< "�B�1���`q-3 ���	�
 ���$�p ˄�f�	X I*�)� ���FH4�� "� �2�a�:
�` � ��X�0������ ��L� ��B��1�`A�) ,� BP�3�3���R���ȁ�	-@g�@
���@X�* J�|�� ����Y`�)<��$P��"!"8RDf#9��T *܀�\�$Q
���GE#)e���`�C��5`F��Tj/�`
 P�LY�<����1���(h��L �&����$��K&"�P J����HB`EI�A�i�	(��*����D��� CQ@6��M�vU�h�I��*��#R $� ��8l@fDp�Ca� 40�rPz`�@(���+�(6th�`	���bP�*�H�P���`& C � c�B`�ȐAJ�4���+ ����"�7m� ��b4�����h���J�
p��K ���UT! ~G"�(��p�P�`
 
$2��)�h�	%�)�q0(.H�)4�	��@�.I 
�A�Y�" ��q�!��`�p�`�
 hŀF�l،�P �V�
�� 4�b�lE����8`�x%B�3�j�@��Et��4,���Pd�?0t(H	�y��B�F��x�H8�H��tB�b�EԈ���bn#��7���IW$F�� #����`�	2T��+T0i*����Q�i0'fH��9���&���a�!!(̰D�܊ �ǃ�a����E*BA�p_�IR�� ��C@4A �"`�b4�a�&OH��GdR �
@R=@�
a.8�&HDe!�����IbQ��Q�l�Y0�F$A`(��8�"�DD�g��`"� h� 9aq`�Q��(��8�2&QPh�� `(Nt�D* `�&�\@D�J�aBEiC��!�4��0!	`�CNA(#&��i��NaC� �"�`�D��& � (���gh�$*�@," P���\��`JA:25�2HGL��. a�J���)(JDⴂ1���^&E(dQ��8��s˃E�M� �C! @�	d�
d����60"H�� l�s0"��� ��-�HL��Ԇ !hʎ��")�� � T�`�lH���"*�� Aj�@R@��h�(���L�`�(�8�$:,i�����
rH��ݠ�.@��
�@@�D�&�+@��$I@_�eA!C � �dS� `�#@�e���d� �� p�D�I
p���N@v4�aZd��8o��@G�j@������ (#����g�*U�"�8�	$Z��
���	�E��2B|]B� f ����r#,"0Q�h
 !� 8 f�� ���D6
���0	2����@	�	JR��!B:  	��â$ ȸ�D<4�  `$���(.� F#p S">�!CE �
*r���0�8��YD HB"WA#� "ʂʰ&	 fb���
e�6,Cq8��(��&� ���@L�P�t	���HR�>�G�L�
:�TY�=�r � 䄆�OT��`�-Ac�.` (�<���C�&�����s��E  ��FBA	A@��M���5�!�D�鬐$B�\��h�!q��I��B�P�@_$ �
J�K����Ц
E0��� ���ws�f�M_?
�M3@���2 P %�����QV�a5�40�����	�� �9`@.T� � m�@�!T (�Ģ � �T7R� ��`�"
*���ڐpP(H�� �	T����
����/�_�k߭=��S��\���s}O�G�v����o��,��j���}m���o��=y'^N�k���&�����s�kmۧ<<����O7�_ă_x�_>�@�
x�X���ч�~��2��/�����3��HH��6?Q
�ɐ8
��C5GU�_)�8t����W�����ݞn�^��z���o��j�WSK�3%��~��Usݦ�'��� q?��z�g��_��w�h�����l���wM��m<�s,��ۏ�{���:�ԥ���_��$���	ޞ�n����_O��/`?��>)����<GGc�,v���
��ϵg�6����s{o��%��e�=S���A=�ԁ��r�Ҷv]W�۽����s��>�?��-���A���"W�ZJ�qT�	�D+"TtR
Y
�Q���N0��An9���%� M�4�  �@  �(�1� �P�BI��*�e�K��` �ee@1A t��LҀ� !��&pZ3����cR����w����J���ު����:�y�����=w�&�Q���_8��W~W�D�b��O�ͯ�I���;��(�w�G;)Ә�{�w܏�+�lGY����
�0	�)�1�]�� ��p

 �@�Ԃ"��a�Ԡ��"(��;�'@�>��(B@!VDY�  �@�� 4`�## [  �0��Q�Bj�i@�
ҫ�-�P	�Qe��
jl  8�!*B0j ��a��d��
s�  $�3��VQ �@D�A ��|PS��z���^_�w���ي�~��5XWz��Rd]�~�;����r����=�8�Ͻ�����;of��յ�f�Ƚ�������_��^������-k������������?'��~o�L��W����ԭ)����E�iwm���[��ͯ��������Tk��Y�~�����E7{����fu�Q�z}��w|�+l��ђ�C��[c�{�O|w����ٹ�&3��~�^6��������tw�ǞI�ad@3 ��(DBu8�$�q��� I2d� 1�"8�� � ��(�0KQ�P�&�@h�h�B�B0Ҁ�Bw�
�"P	+! 
j%4!Zp�'A�(	&�a ZqB83 ��M�4�8��D''�SV���� ��D 0��I�P��\Q��@�0@� xBQ�
(��P@`D�щ��TA&-	B�VB��E�!l"# ��pJ�8PD
0�! Q��#A�b��(JX���(@!�F&R$ ��ڒ �H�j�D"�jZ~x1�M5�$ʼ4&H�1�E	C  �j�<���q�E��ko���Wg����9��}6r/;�\����!o_���y���w�q_������w�sG⥏�w]8˟�ߗ�Q�{�������g����&�������}�|�ɿ���{��;1 D�4�W 0���9�"
`�b#� 0�# )��  A�"�k� R �
(�/ �D P��J� ���c� ��l�#��_���𽔱��N�>�g#��uۘ�ZL�z���Z���wD{�{}NojU�8��Wx����}���:���}��EQe���#��x�������dӼ��ix��!$����Q�kE��Lh*� �dA'*+5�$%-j$( A�0�!$�#� �AJݱ !(f�@�@�N@� Ō
:�c�� q�P,��
h�0  3�F"PB �� ��`����	P���`*)$�G@���B1e� ,HT o�#�.�L��aЂ��$�@�F@.�+@�I3
. 	��A����LP��p!x�0  e w7�_��
����O�<��:����mM������h���WW�}nu�ߛ�R�O[��G4m;A�.�_��u���2g��|���R�wew7v�F��c��#`��¯��@ �  ��a �,A�D�jD[��-q0B24qf$�9p
� �Fx�B�L
��X-���`�CȘ2(SƜb�QP�M=�16JJ,g@2_����~��o���z��<-���m����~c{�L�wf���.��s䯞����|����/_�u���烵^K��ko������.�w��-���?�˻ח���/���?�����j>��ڤɿ9��������^7E�_Ag��r�a��ڿi��wt�Z���J�O6��׷nQz��֊�i��|���W��s���}�y�xu7�����ݾ�P��7M6��:]I�gy���%�^�����w��:��gq�9Ծ�=?� $�\ �¢0��I4A�O j�'N �
3�`E� n ])�t䲌 hH�"��$�	~�cA`�Ȕ�H=�8��y�G�`4�j$�IP$�_9�I, �f"2�@0U��$H����  #GM��K#4	Q�0�� ��$�`I6� �BJ`I*B$P� �`��dMI3�yD%��( Cc���u[y�9�TD��۲Q��d9��A��}Ƈ@�|�2��?��7�?���V��8����[}~��3�w(V{�9�P�׋_����<�M3��Vns���������{���Ň�Y_���6���u?��LO��]�������s�_�
��G���r$��\׿��ئ�?�7q}�m^4�6�c�5�^�s~�W�Ρ~&��[�~���y��z׾k�?�5�pV<%+m�y��o>]�}���7;����{��5�?|�[��H
���O� ؀�X��E�&��d�a�Cd�L���G �@��@(7���F!P �X)DA
��)	BEG�Y+|���4��oH��@�@�� �A�D�0)�+�Ů!�)B�Dyb�����p}�������k�uc�N�$L����}����?�e�=�����V�g�8>��z���޾�:��.?�Z�Y�o���bK@��K~�MW�`��5���͋V��;�e�6�����z3�����{���k���+� �.R � �D8�b�G�P ��!(�4:&��]��-�`80�@b��tlD	�b�
�"-J��H� �!`��7" ��J�
�8Ap���*��
��$@
���� C,ă;�#8�Bu�`E�	���D��@  'P*!�������gQ��&w�%S>�V��{�%챯�+-���θ���������>b{M���r/��Ǿ�8^{��w�2â�7���5��W��wc��gU|���'��!�A�џ�1�q���6�C���d�1��;v��#�$�6��W**Dy1��#�4 �
г5���j�=���]�v�y�f�ܗ��k���ݗߕ�Zlp���V}~�L��Ԭc����_�_Vo�����گ�;�.���X�����c��g��[��)?��[��Y�BlȢ����# O�I -2I���S$2�� @��b����BA�������c �T9H�h�P�)): @��`P0T�S:X$ �  =H&
������ JD������/����~{���O~�λ:�1�c��s�ݘ��t﫲�n��e���oV}�}_����o������u�b�n�Zc��azVMã�M_�;o�W������to�^�����
��'�u��a�:��

*3J��p �$O x
 ,�bT �S�u���?�w�ן�p(۸�KyA����n��)��\���v �����]�ngW�=�ڏ�-��fw���g>4�����c�}��}ֳ���o�����7���o��߿��عY\I���wp���[��o��1���A��� �( ��U�B(��� ��Kr<  ��@�� P  �!�  JuPć>A��EMDǲ�*E"�
b�XB+$k�4�$"W�D`�SB�)�#��
����9pzB"q�"@L���
��;�^|��r���o�G��Y���5���-���C����7;y�������Cz����W*ҫ�u��sJk]ڨ���O��W�Y�O���;�Pk�ϵ���r������x�k��{����:7Z��֮�O�ѻH��������&���������+�m�޻"��u��m1�~�bU�i1��'�?{��zȎ�o�����g��oG�&��O��{�g[�߼s���ѿ���f�/��ݨ��݋��[3�>�޷���r�� Y
` @�
���
,  ��n vPd�ax*p�@XHa�cz8�!te"�� P
���`Pn|�"H � d�B���`����������@'�A$f�$��&�]A@����k���'�ѫe���_� �g5�-O������� ���������-����=���ϴ����n���_ίt�*��*�w�y�����P��]ejF�7����ݟQ;����vS��̔�EO��fZ���g���(\��$�M����~�b�6���R&^  0����P"��F+$p(H �����U�$�B�_
 Q�qK�^T �E�9Up�  P4!� ��D e@
Z�h ��4P�Ô�A�la 6�!     >"��D�Df�����Ho���"�_�׵�J~�V��æp?��{���eww����{�{GQ����w���՗K�����n�]E����_�=�;�f|w�M����콳�wx���~X���mr��u�������h�����Y��(�$!��1 �Y�B�lc�`�A @u�q�	6 
�0� 	��Z �
��L�R� a`�AR�`���-u�P&�L�i� i@ l � �`(�^A��eE�H�#!m9�C
���0#I*�"0~ $"��{/|���DFǺ�U����~�8?�g�nn�s�?�Roң[����=�����]-�����~|I��U���(�s�̾���[]�e�߫x?\n�zjeJ����l�NJ��o�H�m��uɳ�ӹ陫�"������)�2 1���hB���-Q
@�`(�  k��F���� 8�dRIP�0U��<��"�D'  Ap����QDJX&_�@��d"H� ���	�XP�< p���w��5� td$�w`*yt��arH*��B*���Q
$
;�B
�= P$ Qn�bfaԠ���H�#R�j���&:�@��$ � N@�Vq���X���
J�3�H2
���� @;`@ C48�)JB��XOF�YB(�CA���� �q`��� ��	�
d 2�3@�9 @ܩ@�!�-G���u�}�LD�V���p�4�Z�U�  �.�dd����! �3�A@P(��0*z�B�0`	Ё�g�R2���c�2�,�c@@��	j 
!7tf40���$EBp5@v��j�5�   �yAFҀ&$��#| @�	PC	@�
0"�AM��T�p���`�
�h�# 8�tB� ���AM�A�RE�2�J� 
p�C;I( �
���"�`@�G�4d��B% g �*p�� �`Y!8x"wy
B�e�|
 WF���NG@@ X� &` atT	���Di;�+B��\k � �bqy��@ "�A%����6b � RLPB��P��  �
<���g5� � �@A@Y�
�G��RU� L���i��rvHD�9�P�'�JY�X�������;
 :�5�G�&���Iza	�Q�Fʐ����Xb�h� �P�"��X ��
)70#H/  �)\��
�9M� ��������A?0� ��J�P���-�B!� �5�\p�@��@�� `
$A�p�@�~�� pFb)Ip�J� |��� �<%�]��$`��W� J�wX�0�0�����H�aD��3$� @�$��"D�UD�yFP�
dH�00�E.%�� B&��hK��У�S*�<P�P!��� ��$���Pud�
�(� ���1 +)���UyД�!�7%A��*�f*&�*���w��!c

�%
�?5	砀�@����Q� ��"�P�JH
(  ���01Ds��㓰6 �3`P%����$"�  C
78#�! � Q4e(A8 dWqA�@�*�� I<ÀЩ
f� P>  d*B�R2h(	� �
-l�1��� ;��`Cp�8)0B��u$a���r�!<3#90��� �X�hx��aD� �HCJ�QH] �L��`�$��h"��E���$0-@� ��P ��`a H��v 1�C- "�I@14*p�$4�,�
�:P�E�) � . ��h��� 	2&Q	�	@T
L�  l�^�ֆa� %� (N(,@ � ��D�� �$R4K@>< ذ��,��+�x$�X���C�Uq6�R��
X�
m�E��5Uh��-���|2�@@H��"^)l���8u��#��$�0jh�@3 ' �9%@$��`@�H(	�R�:B�"*X�D� %��G��0 ��@�0�i�4�&�!h�(qd�5I@�0C�`�sAE�i�Edq�� �0�<N& fpA����TDK�,�X@)6�y'I����3��0r#�!�y	��/*E�f+���!���� 04�����$@0H�L��
�P�S���<t�(�E�	�@	�s�n�
lY�'a�L(��
��bd&D�j	�
IͰ�Z�i`	�P�� �j�FQD  �f� ��.�`2\I)r	l(� R�
�\�?�
�&H����t���8b����
Pvq�F�$e|��EaL��3U�聤J1 %0�P8�F f< ���J��6
 I���� ��H8ZB�%����(����0D�N1P�t@�"Qp �(�L1��L+�  `)Vo ��$B��g0�Qd�W�b��c2,�Ӹ�$c@F�]D��dI�2�2r<p���!Y�
M��.4> m@���ɀE!"h#�0Ɇs �G��Ȱ�#9��@PApb D�B3T�� h��'E0@1�DQ��|@#}�q0����DXJF���%0h!@�p!�
��R��
��!6�  $�"G@ � %F��O�@A@�b�=@<�'=�"A$���� �
a�#tw�@��ĊS�BD !�{��ՊP,a<Q�
�
��`Y"� 0P��-����?�b 2 �� g��8$H ((�jË(
 	��ː�@��\�� a$X
��*p���V�s&@HA����`BN�(#���	��H!��1D��0#1Dà%l$E5a�T(����M� ����`��4�n�H"P ��Ee*�{�G%Q�@Z<ę���PX��P� 
��	��d� 5�*��0JU��Xh�F� @�Tr�8&$heN(" �@
 �  @#	h!PAe��Б	T6 g
�|����	���L���Af�+��#����(��g�$)A��V ��d�Ő�i��u�@ d�[�ʀ,@)L� ��7$��""<�6��`�fr�$�/I����@��\�qd�(@d�^`��ɢ��k���D�A@��Ԁ�H���BZq�Y4C�0-A�� W���e��h��Y&DG��XAl�#$A�a0�0��g Ā@ TB�@�@pX�#X8� ���  ����_ �zHf1tE�PB+0( W1�v ��2�D�	
p
!����rtx���@�E��0�`a�3* ���crBB����@"p���J�O9�f`p�0�������Bh�|��EÛ
�I�j�V�D� "�a�	E��&1.��  (P9EmN S�%L 0 Q:aćr``�*��>a��P�ς@��@5�-�:<�b"�@��/#�"��/���� `5��sL#�&a��1���  Gd"�A�%G$�`I���,{i���쁔N�)cP~M�*��;�@�c6H�$��	��% �@#U�ƍ��$Y0`�`L�R ��4��-Q %�,"q��%� ��`�F  ���D3Y�˴�#
L�� �)l� &�TDBB@�, @l��	!*FЌ��@\�  �$x��
�PҤSaO�1���b��Y�Bd@B��ɸD�223 ��8��HJ@���Brp�A��x�4 *��*� f�%D8~A``b�wI� �wA=�-10 � �J6C"ja
a@�a� �Q�**eB@4T!�!��dA����BdS��
uo $Ӂ�L$ք ʄ�8�"����Q�2H�"F��-�R,��7�஀�H��d6
!��U)�`�	`�� � 0�8��8" B����C0L��0X*!.��2�{ڝ mQ@L�	 �"����L|��g�@��x��"���] Q�fD�
�N2 
P�L�H0Z� U��X�(`$�b�HE\0� ��xY�f��d(
�!����6YL�C!��v�P`� (J�a��_&�4eev@ HCC��à 1G$.�!3� �43��h#50��!�K� �+�r@ �h?Ba��$��a�1���@��rP�!%dDI"X!"���� ��2���n�es�
��Ȑ�
�Җ@�� �Y" t �P�a ��P�R�����&"��F�P�
A4��V������,��%�H/��� �)=@
|� �4�O� �q ̢��	�"�J!@�$W)@ 	!K`!`�%��*x& �;8�@訒T��i�O���� L"%�0
'�*�	� ���9��  ��Ds
�>@ d⁈���7@�Ҁ�q�C"�H�DL��,	���Cb�fd�s	�$j� h�	�e��L�#*ѦX@����#x�0��) �	,1�Xv����a��,eؙ���"4�)<*��͡l��j1D@� 8��	#a@�%B$ 
��"8�Q$��R ��'
�`�V
��b�#�PTɈ?�@� 
 �6`ED����BB,uL�,  
�cq! 
	p� �qO�9�$��XU�)D�dl�2��f ���4� UHs�	`����s@rG�$NSU��
��&��"n��E�=`3IH(L�*��"ZD�?`�Kh �Z�EBU��9���7 ��&� y ��ƃK�2T�����%Z� ���?T @% }�@dI�1GY�G������ �@DR'����@� *PQK���AR>
,$"O
 �g���@J ���{�����Z�G�M��)�;�m�yE7����=�����',�S�����Z����z��~�ܖ���;�C�Tw��|�'j|�����ܗ�;�v��|����߾����է��i�?��y�{�?����աc�HB�»!�2�8�q���`G�$\`Ħ�
�@��p@�G�R p�P�W!lP0�A��0�bP\��&ZP�������Z��w}��G3cw|�ն��u��g�mP������N����'oo��xoy��~�v��߾�٪��SU���'����k�^=����o�k�~g�/�}���_3����l'X_lo����{9�z׫m�t������/�^Z?���gg�o��ܯm��\�>ű��6�Ǚ��WF��T�c�j��v�W������)S�'���#زQ�?�n/����{=�Ů�]_���gZM��o^���y�y�ڻ�����vϦ��O<������	�3֣��"� p��K�C�!Hn:6�����gx���O@e��
�E�)'N����zCp����<�W;w�%���� �@��8w!9��L!c	s@�� ( 4@�B
�5jFV��'�}��	�XnXB&�=m4P��eN� )!3ST\�;����S�P>f�w�i�T�`9*@��y�@@�Ω6,�7P��Jr��}w�0Q�8 �Z�-
��	�(�ȓ$fAL�rl��B�n\���M��?����y�L����]���[��������iv3���[k>�_~���r�������ް��������շ�S���w������7��6���������y���ߚ��i�7������󼯧�~��A~��T H���FK�4
� ����z�^a�B;}� ' `� d� )q�	T�
BR� ,�G�\#T �!L	xDAm8)P�Z 3� ):Q����S��������ue�����z3���_������x���?���co�����������������u�sݺ�����i�+2����˺�?��������e�U������jw���������֠�{������$#� �� �	X�(�e�o@� b�B4@�G�Q�m�1 
 �1 8�	���Y��pՐ��x�jp3���t�*!�R
�� V7
`����0��
��)b�C�
�b �D1�G�z�S�Q;F&IT=>Bc}9�D�@d�	N�P1rc4�� �� W��� �v
K�.0%Ɛ10yIH Sb @�P�b��|�BI&ţ.C�H	$b�0C�|  �	j�A4 �*v����@��6G0�M\Gl�|�LMT���JD
+�B��f�2�W2A+�����t��F � ��_  bA)��b��@��6>���`�U 5  ���OqH���(���:��pA��L.��g@��Њ�!$@G.@.l0��ߘ`2��q�`F�'�4@z�
�����l}_��po�����?�s��A�];�s�s9�}��?���(M����J�ݯ������$�K����',�C&q��G�Ż�8Z���[�&
�"XL ųRN�
�da�zlA؃�PdXyԓ<���M���X��e�H�D�JhP $
�_�c��[d����w�O����<�u�w��徭����l.����g� Ϟy�/׍)�]�����(z����I��l�vi�_,�_����,�=l��$���n\�5��^x���;��{��_�V��� �s���`���}���{��߿���5������'�������2����-[�$��ݏC� �w��3]��������=R�ٺ��^:O�^�~Y������6!"zR" T�Q�� ѳ#��CYЁR0`+�"&�
��"'Q�B�FHc�b���!R����C	A
�h�4�B�_n@��XӄI�l`�I!��hR&�
��G�|���m�&8pDz`���2�uC)�r��X��E�%��Q$���
��h2`pb�5��F0��X�db��p	�  �ب6� I��_�`ue��0�Ҕ�L���DY� �FF���-+҄��!
`�
�b��'Lx��0�R 
H&���5���V� $6�u�PAt�*�a�"inH���D.!6��Ei;@a@	��m � W ���EmJ�$���������>�u՗�ߦ_u�8���?7�����~��t����������^Ӊ�s��?|ݔ���_���������W��w�k���#?��k����n�����E��#�5��=�߭��"������;�{�zG���	�������E]��y�����mo_���o<��:
��TM�4���[���d�F x�C��
8 pv@�BJ�N�s��s
`��<8'â����z��-��C�B��������wӝ�_�{�V��/�'�K=y� �ծ��~�����{��r����Tݳ{��߼c;��u
����9�D�(� *�v�� 	I���Z���#
R�N�pC��K�����km��^7bGZ���ξ  � ��Q��ͩ@V�뉀� �
�e�pU4^`���BY�1T $
H�Ga`��D�IR��GtfY��� )�d��� 2�E�7V%6R��� ��G)h� �%�ef�ߕ���<�������������:�w�5.�g���Dn}��>�/#v����� ��#zw�狤��^ ��^����H��ݿ��}�}����}��{��v��%(���k��C�޾�׷��P��{w�n�ܢp�T�%P��	�AZ�$3UD��+Z�q¨["��V)�U�
hJFz�
5r�ƅK�P,�6	�W$�N�Mt���6c��d�" v	old_par = (obj.parent || $.jstree.root).toString();
			new_par = (!pos.toString().match(/^(before|after)$/) || par.id === $.jstree.root) ? par : this.get_node(par.parent);
			old_ins = origin ? origin : (this._model.data[obj.id] ? this : $.jstree.reference(obj.id));
			is_multi = !old_ins || !old_ins._id || (this._id !== old_ins._id);
			old_pos = old_ins && old_ins._id && old_par && old_ins._model.data[old_par] && old_ins._model.data[old_par].children ? $.inArray(obj.id, old_ins._model.data[old_par].children) : -1;
			if(old_ins && old_ins._id) {
				obj = old_ins._model.data[obj.id];
			}

			if(is_multi) {
				if((tmp = this.copy_node(obj, par, pos, callback, is_loaded, false, origin))) {
					if(old_ins) { old_ins.delete_node(obj); }
					return tmp;
				}
				return false;
			}
			//var m = this._model.data;
			if(par.id === $.jstree.root) {
				if(pos === "before") { pos = "first"; }
				if(pos === "after") { pos = "last"; }
			}
			switch(pos) {
				case "before":
					pos = $.inArray(par.id, new_par.children);
					break;
				case "after" :
					pos = $.inArray(par.id, new_par.children) + 1;
					break;
				case "inside":
				case "first":
					pos = 0;
					break;
				case "last":
					pos = new_par.children.length;
					break;
				default:
					if(!pos) { pos = 0; }
					break;
			}
			if(pos > new_par.children.length) { pos = new_par.children.length; }
			if(!this.check("move_node", obj, new_par, pos, { 'core' : true, 'origin' : origin, 'is_multi' : (old_ins && old_ins._id && old_ins._id !== this._id), 'is_foreign' : (!old_ins || !old_ins._id) })) {
				this.settings.core.error.call(this, this._data.core.last_error);
				return false;
			}
			if(obj.parent === new_par.id) {
				dpc = new_par.children.concat();
				tmp = $.inArray(obj.id, dpc);
				if(tmp !== -1) {
					dpc = $.vakata.array_remove(dpc, tmp);
					if(pos > tmp) { pos--; }
				}
				tmp = [];
				for(i = 0, j = dpc.length; i < j; i++) {
					tmp[i >= pos ? i+1 : i] = dpc[i];
				}
				tmp[pos] = obj.id;
				new_par.children = tmp;
				this._node_changed(new_par.id);
				this.redraw(new_par.id === $.jstree.root);
			}
			else {
				// clean old parent and up
				tmp = obj.children_d.concat();
				tmp.push(obj.id);
				for(i = 0, j = obj.parents.length; i < j; i++) {
					dpc = [];
					p = old_ins._model.data[obj.parents[i]].children_d;
					for(k = 0, l = p.length; k < l; k++) {
						if($.inArray(p[k], tmp) === -1) {
							dpc.push(p[k]);
						}
					}
					old_ins._model.data[obj.parents[i]].children_d = dpc;
				}
				old_ins._model.data[old_par].children = $.vakata.array_remove_item(old_ins._model.data[old_par].children, obj.id);

				// insert into new parent and up
				for(i = 0, j = new_par.parents.length; i < j; i++) {
					this._model.data[new_par.parents[i]].children_d = this._model.data[new_par.parents[i]].children_d.concat(tmp);
				}
				dpc = [];
				for(i = 0, j = new_par.children.length; i < j; i++) {
					dpc[i >= pos ? i+1 : i] = new_par.children[i];
				}
				dpc[pos] = obj.id;
				new_par.children = dpc;
				new_par.children_d.push(obj.id);
				new_par.children_d = new_par.children_d.concat(obj.children_d);

				// update object
				obj.parent = new_par.id;
				tmp = new_par.parents.concat();
				tmp.unshift(new_par.id);
				p = obj.parents.length;
				obj.parents = tmp;

				// update object children
				tmp = tmp.concat();
				for(i = 0, j = obj.children_d.length; i < j; i++) {
					this._model.data[obj.children_d[i]].parents = this._model.data[obj.children_d[i]].parents.slice(0,p*-1);
					Array.prototype.push.apply(this._model.data[obj.children_d[i]].parents, tmp);
				}

				if(old_par === $.jstree.root || new_par.id === $.jstree.root) {
					this._model.force_full_redraw = true;
				}
				if(!this._model.force_full_redraw) {
					this._node_changed(old_par);
					this._node_changed(new_par.id);
				}
				if(!skip_redraw) {
					this.redraw();
				}
			}
			if(callback) { callback.call(this, obj, new_par, pos); }
			/**
			 * triggered when a node is moved
			 * @event
			 * @name move_node.jstree
			 * @param {Object} node
			 * @param {String} parent the parent's ID
			 * @param {Number} position the position of the node among the parent's children
			 * @param {String} old_parent the old parent of the node
			 * @param {Number} old_position the old position of the node
			 * @param {Boolean} is_multi do the node and new parent belong to different instances
			 * @param {jsTree} old_instance the instance the node came from
			 * @param {jsTree} new_instance the instance of the new parent
			 */
			this.trigger('move_node', { "node" : obj, "parent" : new_par.id, "position" : pos, "old_parent" : old_par, "old_position" : old_pos, 'is_multi' : (old_ins && old_ins._id && old_ins._id !== this._id), 'is_foreign' : (!old_ins || !old_ins._id), 'old_instance' : old_ins, 'new_instance' : this });
			return obj.id;
		},
		/**
		 * copy a node to a new parent
		 * @name copy_node(obj, par [, pos, callback, is_loaded])
		 * @param  {mixed} obj the node to copy, pass an array to copy multiple nodes
		 * @param  {mixed} par the new parent
		 * @param  {mixed} pos the position to insert at (besides integer values, "first" and "last" are supported, as well as "before" and "after"), defaults to integer `0`
		 * @param  {function} callback a function to call once the move is completed, receives 3 arguments - the node, the new parent and the position
		 * @param  {Boolean} is_loaded internal parameter indicating if the parent node has been loaded
		 * @param  {Boolean} skip_redraw internal parameter indicating if the tree should be redrawn
		 * @param  {Boolean} instance internal parameter indicating if the node comes from another instance
		 * @trigger model.jstree copy_node.jstree
		 */
		copy_node : function (obj, par, pos, callback, is_loaded, skip_redraw, origin) {
			var t1, t2, dpc, tmp, i, j, node, old_par, new_par, old_ins, is_multi;

			par = this.get_node(par);
			pos = pos === undefined ? 0 : pos;
			if(!par) { return false; }
			if(!pos.toString().match(/^(before|after)$/) && !is_loaded && !this.is_loaded(par)) {
				return this.load_node(par, function () { this.copy_node(obj, par, pos, callback, true, false, origin); });
			}

			if($.isArray(obj)) {
				if(obj.length === 1) {
					obj = obj[0];
				}
				else {
					//obj = obj.slice();
					for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
						if((tmp = this.copy_node(obj[t1], par, pos, callback, is_loaded, true, origin))) {
							par = tmp;
							pos = "after";
						}
					}
					this.redraw();
					return true;
				}
			}
			obj = obj && obj.id ? obj : this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) { return false; }

			old_par = (obj.parent || $.jstree.root).toString();
			new_par = (!pos.toString().match(/^(before|after)$/) || par.id === $.jstree.root) ? par : this.get_node(par.parent);
			old_ins = origin ? origin : (this._model.data[obj.id] ? this : $.jstree.reference(obj.id));
			is_multi = !old_ins || !old_ins._id || (this._id !== old_ins._id);

			if(old_ins && old_ins._id) {
				obj = old_ins._model.data[obj.id];
			}

			if(par.id === $.jstree.root) {
				if(pos === "before") { pos = "first"; }
				if(pos === "after") { pos = "last"; }
			}
			switch(pos) {
				case "before":
					pos = $.inArray(par.id, new_par.children);
					break;
				case "after" :
					pos = $.inArray(par.id, new_par.children) + 1;
					break;
				case "inside":
				case "first":
					pos = 0;
					break;
				case "last":
					pos = new_par.children.length;
					break;
				default:
					if(!pos) { pos = 0; }
					break;
			}
			if(pos > new_par.children.length) { pos = new_par.children.length; }
			if(!this.check("copy_node", obj, new_par, pos, { 'core' : true, 'origin' : origin, 'is_multi' : (old_ins && old_ins._id && old_ins._id !== this._id), 'is_foreign' : (!old_ins || !old_ins._id) })) {
				this.settings.core.error.call(this, this._data.core.last_error);
				return false;
			}
			node = old_ins ? old_ins.get_json(obj, { no_id : true, no_data : true, no_state : true }) : obj;
			if(!node) { return false; }
			if(node.id === true) { delete node.id; }
			node = this._parse_model_from_jsT�����V�������ߵ�[}.�\��������/��}5���|�&}���5��v��������w�Ϳ�����x]u2������n�{�ʩ��_�7��w��f�������Ϙ�g�����u��A�@:D  &���   XA6DD8  ���+��(P(=B��vG` +�& �Cq���qbA�����g Ȃq��E#pO�"h �!���Aj�_�S�2�@�$W*C`  Y�0�P�8H (I2����# �@L��# �B�j���! �`�2Ђ H�b��\ 
�?�*`�(!�,� �@r BN�K��� p,�<GL"�� * 1����! ������@������u�W��/�ōn���|�y���������^t��k���f�����m������}���	�G�����ͻ������uc��r��7y�����߿��~���|}�^쓫�|���o���9��w|���?�;����}��n�Ȁ a�(�V@P)��f� �4E��Vp�:�,:DB$u��p�S< z��
 ) *�
$p���	8Fa�JBX �[�-!w83���=��,�|��ۯ���{7O���.�N���%.���������"'���w�����4O��yv���+�{���?bY��aV~�ro>F�z�}�{m�{[�#y�Y?u�z�������O��qp���2��X� (!
�AA�'�`,�F�Y!4@ꔫ��V�4�S��J���p��XU!� HP��i֦�{P��CE�t0��1& ��lM  9� :�<@
  
�l�
�#� �	�k$�2h�#"�)R������L0���,�a���В���A�Z�d��$��Q��E�˼	���D27{���d-����x�|���U]�SF�+�m�*I~;�8p��f���K��+ݲ�r��|��fv��F�j��N��>�����q}w�ZU�������>�y���0�1��>z��;<�靈Ȳ�J���4P� �!0&p� �!$�Y�QE]ADg� z�h#"�aDr&Q&$�%@D� i`+aC��,��[T����"$p"�������RD�d#J�a�֨�a`��N�U��<
��]�_�ۨK�~�Xo��Y���}�o��;!z/�K�Y�~����wb���ZN�5߯����n�[�~����G���s�*������ݿ���׹���o��v�2�V�]�?���o���?�����9���'��dׇ��[����kZ�����m�t������ػ?��|^_�����O���7���~.�fk�߻���R��^���j��yqy[]"?&�zzڕ�wӓ�z�����nn������oq2��O��\���q/�@ ���3J��6h�@�T���L��P�@@�EA�@	A0Oz�!�b����)��"���(��� �ك)�`A ^B5��F�`��AB	� ���#PKϗ@؆��8 `  ,�Z{7��U��-8�M�b�y���myg���>�U2C��+����Ĺ��8��;�K�N������?�����ﾣ�`������-�������;��/�]v�>�����j많t=��k���?���_��20h�@�
:���bHl�  ���#F�H"��0�A���X��l)�� ���pB(��X� 3w`��!��	i�+��Hp	$D,A1� D@�I���Q*�$�Hc�
Z͈�
@ @F�K `8!0�</��b2%I0� Eԍ���P R�m�(�
�Y����E�B H 	
�@,��J���O_5r���W�_��O���*��Ξ���w������ΛD�侪k=�[o�+�̙����׃��sfv�6�8�CN��ض�G�r��ܟ�ߍ�?��:W՟��O��������m�HUDw)!���L0 `h@V�A�`h"�Bđ  C�4� @��.3�.�
a�Ѐh 5�G��B��2,@ H�fS��
�Z((,9�� xu�t��ߗq����~m���7��ߖx��I�CO��K����������-��=}_��n�g��ޛ�=7j���ks�;�_�cs6�oԺ+nu^{;�Q��1	{�+��}q�����}���s�Y��Y�Gk��l�^��oн�}���Gߵo���q���/��}�9���������u���q̓gw�u5;��w}����u���/�������}�k�����b��nm}����ܻ�O���;���]�}W�������۽�eϯ���:}�v�����{���w��7?/Ϯ�}�_p=�o����������O����O�y?�x�ڛ?�͗���};ol'�
�{�߿_��6�V~��W���٪*�g{w�'΋����ۤ�oſ��g�����v���;�r�N����s>(�?9,�,f?��N��~�;��
rl�T�;����͟��~���V��eg��tc����ï=����wj�騂~s����ƿmmQ�ԛ�~���}���^�>�j{�*��m~2O���ۿ�o�M�}�����s/z���v��,o������r����m�<�I��&��!v������g�w�������'���l�/�<�}ܯ܎(�Ѽ��t����칛�����O�����������G-^�v�Y����؎j�y�گ��Y����	o/��~=S{~~qY
~��]�T�����:!�/�oӌW~�צϔ�C湻�x����V!��RC��H/�|��8�����߹��wS�i-���Y�c���R?��}��y��5�������������i�Uo��#�[�{�������&~��?�������5�wwꧥ�)��O��w��濛ʗ���A}=.�\n{_��(�9�'��a�f2�7�Qw��q?���o��sA�g�u><���k�ޓ����|m6󽜯�Ek�w�3{�[��۹=�_����zM|������Q߽�x}/W����y9����e�;?�}�S����������׿]q�������e;����/�?�^�n��>v�������I���k�^dxWl.n�����G�������:~�USw��k�R$8�UF��zN����T�������6cp�]\�/|���~k�f�������Җ�䳆��6�xis����h9�����E����Z�g�V;��~�o�������I[e�?_�Y^�����>��?�?�V�_��b���������?�j��������r����-�c>��eڏ�<Il�O�����x�黟�퍶�r�����[�ո;���������������Gk��w�';Ƿy�������/�<���ݞߗ������_���{���{�������?�3�������/^�y����R���n�~�����O������~F���ft��o+��wm��?����l���_�q;p�Z�'o�S��^��<i�|f�{���P����Ϟ:���/�ͪ�\��t��������鬭d﷯�)Fq� �<y��p�C�vk%�P��������-��oc���a�?�?�7G��+�|�_��e�f����~v$��g��	�'��~;r�s@�����|�T��W�����? ���w��/惡o���y�;���ܾ?��+�{]�\��w�_�5�Num�����������F��������M�>2e^����K��O�(�W�{�������~����t�3����W��7'���WQkE��W�vŤ9ֆ�����v�&W�`��߿��{t'��a�j�K���rG/Z�ޫ���V�ͽZ�җ�U����ܚ�W|n�)���G�{z��}%5�������������+�Ο�&��^u�W��-�7�:�|��e[��/ß�oŭYZ�ܥz������{�>�ڟ�*w�?���=!�k5�/w5��z�v�;���ړ�[�{�d/��dw��?�^ �����/յ����>�ӿ%9��~n7r�W����<�w���vm���g�_�Z��U���M�o��ݿ���n�����o��+�
fL�q���?�������R������F���B[o�����O�7�=���c���/���s�?�������V�������������xm�_ؽ��?���W����0�G�8��KI�����~�w坶��M7�{��k^ԗ��#�J%��3>�F����>�k��A��/ǿ��n�*�TRR���o�=�{���+zI����пx��������wN>�ٛ�Ϳ����mv�������q�%�*��/�c#��˭�ʗ��^��g�P�T9����#��Y����D~���%ON�k}��؂�?g{#�?{�ߗ�s�>�mP�o��m�WB�o�þ�r�_��[��w��o?����c�����ݞ����^�zu�?��!�?�p��ϖ��v��G������k���������WWV��}�޲y��5u��/ps������Z��^q���ܿ;׻Џ��?�?�����w����������������G�Gx���������g_z��~�f���/>��}������1��sU�{����c�b����O�w}^e�����
�u7�M;~<����]�.���ө�"�_>����k��N4/����G���&=�_ҝ�h�{�����]|�[����f�k�����Y�j{���~b�8��]��U}>���ڋw���c����]�����ڏ_�k_uV���d�����������/�������od)����כ��su������u��>�k��ߓ�㿸,��{�@��y����]>��-���^�_6����_��֎�]�꿿G������߹O��c��e������?Y��_�z=M����_k?���![[�����]�o�|}��Ou�뾧�G����+��ݏ��{�}G6O{~���U��wW,ߏ��Cj�z�όM���������v��l�qѹ~�/cW;���x�m�i���z_+��u��]����D��3������ѝ�8�P�u�
�G���:_t������a��˕�f��Wї���d��yi�;w�}�����J:��P���w��Vb����w0�����؋s���^��zS�{=T��5�,�A�����{�^�����m��\�_+��g<ϓ~��-��*������w��nի߹_����G�g������~�u���Ll�i�����瓻��a��{}F֋هC�Z�?�O�u��#�Zco�ri۵��ne{���~�g��2�k�j��m|;n���lgv��p��t{��!�溧��u���U/�Zj�ɩ[��VS�>ofǯ7�k"���f��w;��M��>��%�����W�|�������OR��I��C�q�
������e����6���Zal�[+�L��?���_b�g^~����x=UBz�>0..����+F}�Mm_����킥�=��~��ǹ�#y���roO�t�%��ݻ���t�<��"���/���?��o�8T���������x�_6G�U�����?�[�O6�ҿ��ۿ/��M��w�_'�A�ߨ����������o3~}������Ω�}��7�ȷ�{V&vm9i
����+�r��m���_���6����k���gk�ѱ���Ir�k��ޗ���o{�k�6�]q%ܜ��P�}�߿{�v�/�������r�]N�����L�������?����������s9���/�����g������mo��}��������y7��Ҧ��
			if(this._data.core.themes.variant) {
				this.element.removeClass('jstree-' + this._data.core.themes.name + '-' + this._data.core.themes.variant);
			}
			this._data.core.themes.variant = variant_name;
			if(variant_name) {
				this.element.addClass('jstree-' + this._data.core.themes.name + '-' + this._data.core.themes.variant);
			}
		},
		/**
		 * gets the name of the currently applied theme variant
		 * @name get_theme()
		 * @return {String}
		 */
		get_theme_variant : function () { return this._data.core.themes.variant; },
		/**
		 * shows a striped background on the container (if the theme supports it)
		 * @name show_stripes()
		 */
		show_stripes : function () {
			this._data.core.themes.stripes = true;
			this.get_container_ul().addClass("jstree-striped");
			/**
			 * triggered when stripes are shown
			 * @event
			 * @name show_stripes.jstree
			 */
			this.trigger('show_stripes');
		},
		/**
		 * hides the striped background on the container
		 * @name hide_stripes()
		 */
		hide_stripes : function () {
			this._data.core.themes.stripes = false;
			this.get_container_ul().removeClass("jstree-striped");
			/**
			 * triggered when stripes are hidden
			 * @event
			 * @name hide_stripes.jstree
			 */
			this.trigger('hide_stripes');
		},
		/**
		 * toggles the striped background on the container
		 * @name toggle_stripes()
		 */
		toggle_stripes : function () { if(this._data.core.themes.stripes) { this.hide_stripes(); } else { this.show_stripes(); } },
		/**
		 * shows the connecting dots (if the theme supports it)
		 * @name show_dots()
		 */
		show_dots : function () {
			this._data.core.themes.dots = true;
			this.get_container_ul().removeClass("jstree-no-dots");
			/**
			 * triggered when dots are shown
			 * @event
			 * @name show_dots.jstree
			 */
			this.trigger('show_dots');
		},
		/**
		 * hides the connecting dots
		 * @name hide_dots()
		 */
		hide_dots : function () {
			this._data.core.themes.dots = false;
			this.get_container_ul().addClass("jstree-no-dots");
			/**
			 * triggered when dots are hidden
			 * @event
			 * @name hide_dots.jstree
			 */
			this.trigger('hide_dots');
		},
		/**
		 * toggles the connecting dots
		 * @name toggle_dots()
		 */
		toggle_dots : function () { if(this._data.core.themes.dots) { this.hide_dots(); } else { this.show_dots(); } },
		/**
		 * show the node icons
		 * @name show_icons()
		 */
		show_icons : function () {
			this._data.core.themes.icons = true;
			this.get_container_ul().removeClass("jstree-no-icons");
			/**
			 * triggered when icons are shown
			 * @event
			 * @name show_icons.jstree
			 */
			this.trigger('show_icons');
		},
		/**
		 * hide the node icons
		 * @name hide_icons()
		 */
		hide_icons : function () {
			this._data.core.themes.icons = false;
			this.get_container_ul().addClass("jstree-no-icons");
			/**
			 * triggered when icons are hidden
			 * @event
			 * @name hide_icons.jstree
			 */
			this.trigger('hide_icons');
		},
		/**
		 * toggle the node icons
		 * @name toggle_icons()
		 */
		toggle_icons : function () { if(this._data.core.themes.icons) { this.hide_icons(); } else { this.show_icons(); } },
		/**
		 * show the node ellipsis
		 * @name show_icons()
		 */
		show_ellipsis : function () {
			this._data.core.themes.ellipsis = true;
			this.get_container_ul().addClass("jstree-ellipsis");
			/**
			 * triggered when ellisis is shown
			 * @event
			 * @name show_ellipsis.jstree
			 */
			this.trigger('show_ellipsis');
		},
		/**
		 * hide the node ellipsis
		 * @name hide_ellipsis()
		 */
		hide_ellipsis : function () {
			this._data.core.themes.ellipsis = false;
			this.get_container_ul().removeClass("jstree-ellipsis");
			/**
			 * triggered when ellisis is hidden
			 * @event
			 * @name hide_ellipsis.jstree
			 */
			this.trigger('hide_ellipsis');
		},
		/**
		 * toggle the node ellipsis
		 * @name toggle_icons()
		 */
		toggle_ellipsis : function () { if(this._data.core.themes.ellipsis) { this.hide_ellipsis(); } else { this.show_ellipsis(); } },
		/**
		 * set the node icon for a node
		 * @name set_icon(obj, icon)
		 * @param {mixed} obj
		 * @param {String} icon the new icon - can be a path to an icon or a className, if using an image that is in the current directory use a `./` prefix, otherwise it will be detected as a class
		 */
		set_icon : function (obj, icon) {
			var t1, t2, dom, old;
			if($.isArray(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.set_icon(obj[t1], icon);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) { return false; }
			old = obj.icon;
			obj.icon = icon === true || icon === null || icon === undefined || icon === '' ? true : icon;
			dom = this.get_node(obj, true).children(".jstree-anchor").children(".jstree-themeicon");
			if(icon === false) {
				dom.removeClass('jstree-themeicon-custom ' + old).css("background","").removeAttr("rel");
				this.hide_icon(obj);
			}
			else if(icon === true || icon === null || icon === undefined || icon === '') {
				dom.removeClass('jstree-themeicon-custom ' + old).css("background","").removeAttr("rel");
				if(old === false) { this.show_icon(obj); }
			}
			else if(icon.indexOf("/") === -1 && icon.indexOf(".") === -1) {
				dom.removeClass(old).css("background","");
				dom.addClass(icon + ' jstree-themeicon-custom').attr("rel",icon);
				if(old === false) { this.show_icon(obj); }
			}
			else {
				dom.removeClass(old).css("background","");
				dom.addClass('jstree-themeicon-custom').css("background", "url('" + icon + "') center center no-repeat").attr("rel",icon);
				if(old === false) { this.show_icon(obj); }
			}
			return true;
		},
		/**
		 * get the node icon for a node
		 * @name get_icon(obj)
		 * @param {mixed} obj
		 * @return {String}
		 */
		get_icon : function (obj) {
			obj = this.get_node(obj);
			return (!obj || obj.id === $.jstree.root) ? false : obj.icon;
		},
		/**
		 * hide the icon on an individual node
		 * @name hide_icon(obj)
		 * @param {mixed} obj
		 */
		hide_icon : function (obj) {
			var t1, t2;
			if($.isArray(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.hide_icon(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj === $.jstree.root) { return false; }
			obj.icon = false;
			this.get_node(obj, true).children(".jstree-anchor").children(".jstree-themeicon").addClass('jstree-themeicon-hidden');
			return true;
		},
		/**
		 * show the icon on an individual node
		 * @name show_icon(obj)
		 * @param {mixed} obj
		 */
		show_icon : function (obj) {
			var t1, t2, dom;
			if($.isArray(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.show_icon(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj === $.jstree.root) { return false; }
			dom = this.get_node(obj, true);
			obj.icon = dom.length ? dom.children(".jstree-anchor").children(".jstree-themeicon").attr('rel') : true;
			if(!obj.icon) { obj.icon = true; }
			dom.children(".jstree-anchor").children(".jstree-themeicon").removeClass('jstree-themeicon-hidden');
			return true;
		}
	};

	// helpers
	$.vakata = {};
	// collect attributes
	$.vakata.attributes = function(node, with_values) {
		node = $(node)[0];
		var attr = with_values ? {} : [];
		if(node && node.attributes) {
			$.each(node.attributes, function (i, v) {
				if($.inArray(v.name.toLowerCase(),['style','contenteditable','hasfocus','tabindex']) !== -1) { return; }
				if(v.value !== null && $.trim(v.value) !== '') {
					if(with_values) { attr[v.name] = v.value; }
					else { attr.push(v.name); }
				}
			});
		}
		return attr;
	};
	$.vakata.array_unique = function(array) {
		var a = [], i, j, l, o = {};
		for(i = 0, l = array.length; i < l; i++) {
			if(o[array[i]] === undefined) {
				a.push(array[i]);
				o[array[i]] = true;
			}
		}
		return a;
	};
	// remove item from array
	$.vakata.array_remove = function(array, from) {
		array.splice(from, 1);
		return array;
		//var rest = array.slice((to || from) + 1 || array.length);
		//array.length = from < 0 ? array.lengt������������~�w�y�������1��o���_W���ꫣ���sz��[������o���s��\ж}���5߳��?�֏w�s��v�!�_���9������6���eo�m����2�����=�Y$Ž���K��u��7h�����������6�[�瓶�z�߽���? ���k��A�ǺJ��}�ͨ����N�]lm���c]�"��m2���|����i����>��n����)�=*��u����K�#����մ�Bn{�|����Y�����o�p�����u������뿯�c�����&����z�����=�����E����ߍ��]��1��m:��s]����w\m���w���W�c���E��f���_Hw�묏���+y���'��{�:��蘞�N<�;������S�k��Y_�ڲ��������珧���߾��_p��1׻�o���Y>���7_zy�O���6_���+����v������M��=9��������۩������ś�D6Ϛ��{�*_Y����	�������~�ǿ���Cs[�p���{�~�����7������'����R��rq@�[�~�=���޾/�Zߪ{N�9�_vno��c��ϭ.�K�_�|�gƣ�cZ���.�J����z�����~��K��ۯ��O�/���{�^�������P�?t��޽�'���>\�?�_z�Ϟ?��{+w���{����~�]jO�>�z�?�?����}���{W�O������~������[�۳�s��T�k��f�����?������~}<�z�_��'����Y���x_��������=����������lm�����I�������������������x��z�K�ޮ~�����oo�'���߯�.��G[�ν3��~�Y�~�_�k����=\m������{��ì7��=~�������{W;���*�㻘X��{{��Bw���lF�����+���_��/�?b����}7V��Gk����;��Q
W}2ި�b��g�.�;��˟��������~�_p�_i�������~������Ի�w����y뿟�km}��
		 * @name $.jstree.defaults.checkbox.cascade
		 * @plugin checkbox
		 */
		cascade				: '',
		/**
		 * This setting controls if checkbox are bound to the general tree selection or to an internal array maintained by the checkbox plugin. Defaults to `true`, only set to `false` if you know exactly what you are doing.
		 * @name $.jstree.defaults.checkbox.tie_selection
		 * @plugin checkbox
		 */
		tie_selection		: true,

		/**
		 * This setting controls if cascading down affects disabled checkboxes
		 * @name $.jstree.defaults.checkbox.cascade_to_disabled
		 * @plugin checkbox
		 */
		cascade_to_disabled : true,

		/**
		 * This setting controls if cascading down affects hidden checkboxes
		 * @name $.jstree.defaults.checkbox.cascade_to_hidden
		 * @plugin checkbox
		 */
		cascade_to_hidden : true
	};
	$.jstree.plugins.checkbox = function (options, parent) {
		this.bind = function () {
			parent.bind.call(this);
			this._data.checkbox.uto = false;
			this._data.checkbox.selected = [];
			if(this.settings.checkbox.three_state) {
				this.settings.checkbox.cascade = 'up+down+undetermined';
			}
			this.element
				.on("init.jstree", $.proxy(function () {
						this._data.checkbox.visible = this.settings.checkbox.visible;
						if(!this.settings.checkbox.keep_selected_style) {
							this.element.addClass('jstree-checkbox-no-clicked');
						}
						if(this.settings.checkbox.tie_selection) {
							this.element.addClass('jstree-checkbox-selection');
						}
					}, this))
				.on("loading.jstree", $.proxy(function () {
						this[ this._data.checkbox.visible ? 'show_checkboxes' : 'hide_checkboxes' ]();
					}, this));
			if(this.settings.checkbox.cascade.indexOf('undetermined') !== -1) {
				this.element
					.on('changed.jstree uncheck_node.jstree check_node.jstree uncheck_all.jstree check_all.jstree move_node.jstree copy_node.jstree redraw.jstree open_node.jstree', $.proxy(function () {
							// only if undetermined is in setting
							if(this._data.checkbox.uto) { clearTimeout(this._data.checkbox.uto); }
							this._data.checkbox.uto = setTimeout($.proxy(this._undetermined, this), 50);
						}, this));
			}
			if(!this.settings.checkbox.tie_selection) {
				this.element
					.on('model.jstree', $.proxy(function (e, data) {
						var m = this._model.data,
							p = m[data.parent],
							dpc = data.nodes,
							i, j;
						for(i = 0, j = dpc.length; i < j; i++) {
							m[dpc[i]].state.checked = m[dpc[i]].state.checked || (m[dpc[i]].original && m[dpc[i]].original.state && m[dpc[i]].original.state.checked);
							if(m[dpc[i]].state.checked) {
								this._data.checkbox.selected.push(dpc[i]);
							}
						}
					}, this));
			}
			if(this.settings.checkbox.cascade.indexOf('up') !== -1 || this.settings.checkbox.cascade.indexOf('down') !== -1) {
				this.element
					.on('model.jstree', $.proxy(function (e, data) {
							var m = this._model.data,
								p = m[data.parent],
								dpc = data.nodes,
								chd = [],
								c, i, j, k, l, tmp, s = this.settings.checkbox.cascade, t = this.settings.checkbox.tie_selection;

							if(s.indexOf('down') !== -1) {
								// apply down
								if(p.state[ t ? 'selected' : 'checked' ]) {
									for(i = 0, j = dpc.length; i < j; i++) {
										m[dpc[i]].state[ t ? 'selected' : 'checked' ] = true;
									}

									this._data[ t ? 'core' : 'checkbox' ].selected = this._data[ t ? 'core' : 'checkbox' ].selected.concat(dpc);
								}
								else {
									for(i = 0, j = dpc.length; i < j; i++) {
										if(m[dpc[i]].state[ t ? 'selected' : 'checked' ]) {
											for(k = 0, l = m[dpc[i]].children_d.length; k < l; k++) {
												m[m[dpc[i]].children_d[k]].state[ t ? 'selected' : 'checked' ] = true;
											}
											this._data[ t ? 'core' : 'checkbox' ].selected = this._data[ t ? 'core' : 'checkbox' ].selected.concat(m[dpc[i]].children_d);
										}
									}
								}
							}

							if(s.indexOf('up') !== -1) {
								// apply up
								for(i = 0, j = p.children_d.length; i < j; i++) {
									if(!m[p.children_d[i]].children.length)�����������T�x���'���]��߽�o�JYw����F�^����W�{4���F����ݛ�����O�~|�߫��l��t���r�����d����.:��[����[����o(�����}�_տ�n�w�G�X %e����"88�x�|�!IQ �L��Q,v N��' G��d�)FW�$#���B��@*� �M��5F�� "	�c�(o���F���
 ��B.�#Kaa�IT�fь�F�P&+,3F����AE�Jhi(H�1C0��D�d{���$*D���C� ��	��,���M.G�9��r��C"�) �t�OY��EXL����D@���w�EX]&�
��1g�djB)�bPhH!&� (Q
' 
`>UfB*���D����Gi�hH��AaTX@

�8a��P��(!� ���"�\ T���^�R��_�k���������޿����ߺ~���O��+���w��v��W����٣?��k������������
��rJHl2W�=OT�-2�"��UMN*�p!#BӶ�E^�n123"4A|G�
���*�E����XP�c�1Ŧ�"]D_jz@eҍE��dP�.�6�".N���	�~ I��Ap7}��!� B{� �Oj����������������:8�y�����{�>���c�u���W��7����������_�������}��Ƨ�۱�y����+󚹿�����6zgox+�w����[��CE��s��|�ߵ������_ (0R�v�3�+@�`�@� NϠ<'pZ�`��9�%�������{D�8<��Ă9
DL�LpA�� �dط�PG &���VL��Rb K���e����t����x������Ϭ߶�O�[�;���������:����W��w�sK�&��/��ǵ�i_���������|~_��u���^�W����{ri�^w����U�e>�������W������%����[������������/��n������ߵ���N�ot���[Mr������k����ݐ����O�R^U�}}}�����-شw�w����?���p_�������?�������}�����^'��'��h��D�VV�C�<H�i �f[-.�!P����� {+X�x\���*rjB� � ��a)~�����܃���H@D���D��p��`@"1�W,I9�
���y��΋T3H��.P"B	\�V�H�T�8 FB��a��8ȸ|E���1M�@?�T�5��"n4�[N�� @�&%��2�2@2��¡
���b!��Pp$�A�j�'"���<KM$ =0��&��TI+���A  ��G'�K��� v	��W����s��<w{��|����߭<����{���k6r���o��_g"���׾�g���:��]ag��ݝUo���/y�|���O����j&Ym�d��~{P,��HϷ��hM�=��.쿸ׯ����������W��gp@� Q�G*Gf_
�Y-��#����<+��X�P �a9cx�
��@S)°D�&xB�I '�9�.��"<2�5$��Bl�ȕK
6!��kg���eZ�L�	��oI� �P@$IM��2��
�4E����dp�G
��P��6�ԓ'ɉ<� C��'�@?$ ���8�,�� ����(���#��(��0c�T��H#�q���
i�I�2`F6.!Q\���"Ę^Q2�Ѐ j�����|)��t�s���Gk���n�w�Z�����3~�ﵺ�T;�_����Ve)w�����7�p����2ש�����ӕ���>��oϾ�����ں����=���:���l������.���������������&�&dŒu_� '�Z�DMВr7) ���ʀ��%�p,�j�E�sh�D L��$7T�F� 
��� $i��K`2-MB`�
sB�@IC!�D��j���jR
��^(��l�޺�������V�^��}�������t�}���,�G�\?����� lw��G���D����ï���ؾ�������W߯����g]��}z��w��?�����݉�����NJ��U?�����}
���D�9�5E�b��%#UE1+����@�B�4 l���I<0A�@tG�h���BF

								cur = $.vakata.array_filter(cur, function(id) {
									return allIds.indexOf(id) === -1 || selectedIds.indexOf(id) > -1;
								});
							}

							// only apply up if cascade up is enabled and if this node is not selected
							// (if all child nodes are disabled and cascade_to_disabled === false then this node will till be selected).
							if(s.indexOf('up') !== -1 && cur.indexOf(obj.id) === -1) {
								for(i = 0, j = obj.parents.length; i < j; i++) {
									tmp = this._model.data[obj.parents[i]];
									tmp.state[ t ? 'selected' : 'checked' ] = false;
									if(tmp && tmp.original && tmp.original.state && tmp.original.state.undetermined) {
										tmp.original.state.undetermined = false;
									}
									tmp = this.get_node(obj.parents[i], true);
									if(tmp && tmp.length) {
										tmp.attr('aria-selected', false).children('.jstree-anchor').removeClass(t ? 'jstree-clicked' : 'jstree-checked');
									}
								}

								cur = $.vakata.array_filter(cur, function(id) {
									return obj.parents.indexOf(id) === -1;
								});
							}

							this._data[ t ? 'core' : 'checkbox' ].selected = cur;
						}, this));
			}
			if(this.settings.checkbox.cascade.indexOf('up') !== -1) {
				this.element
					.on('delete_node.jstree', $.proxy(function (e, data) {
							// apply up (whole handler)
							var p = this.get_node(data.parent),
								m = this._model.data,
								i, j, c, tmp, t = this.settings.checkbox.tie_selection;
							while(p && p.id !== $.jstree.root && !p.state[ t ? 'selected' : 'checked' ]) {
								c = 0;
								for(i = 0, j = p.children.length; i < j; i++) {
									c += m[p.children[i]].state[ t ? 'selected' : 'checked' ];
								}
								if(j > 0 && c === j) {
									p.state[ t ? 'selected' : 'checked' ] = true;
									this._data[ t ? 'core' : 'checkbox' ].selected.push(p.id);
									tmp = this.get_node(p, true);
									if(tmp && tmp.length) {
										tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
									}
								}
								else {
									break;
								}
								p = this.get_node(p.parent);
							}
						}, this))
					.on('move_node.jstree', $.proxy(function (e, data) {
							// apply up (whole handler)
							var is_multi = data.is_multi,
								old_par = data.old_parent,
								new_par = this.get_node(data.parent),
								m = this._model.data,
								p, c, i, j, tmp, t = this.settings.checkbox.tie_selection;
							if(!is_multi) {
								p = this.get_node(old_par);
								while(p && p.id !== $.jstree.root && !p.state[ t ? 'selected' : 'checked' ]) {
									c = 0;
									for(i = 0, j = p.children.length; i < j; i++) {
										c += m[p.children[i]].state[ t ? 'selected' : 'checked' ];
									}
									if(j > 0 && c === j) {
										p.state[ t ? 'selected' : 'checked' ] = true;
										this._data[ t ? 'core' : 'checkbox' ].selected.push(p.id);
										tmp = this.get_node(p, true);
										if(tmp && tmp.length) {
											tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
										}
									}
									else {
										break;
									}
									p = this.get_node(p.parent);
								}
							}
							p = new_par;
							while(p && p.id !== $.jstree.root) {
								c = 0;
								for(i = 0, j = p.children.length; i < j; i++) {
									c += m[p.children[i]].state[ t ? 'selected' : 'checked' ];
								}
								if(c === j) {
									if(!p.state[ t ? 'selected' : 'checked' ]) {
										p.state[ t ? 'selected' : 'checked' ] = true;
										this._data[ t ? 'core' : 'checkbox' ].selected.push(p.id);
										tmp = this.get_node(p, true);
										if(tmp && tmp.length) {
											tmp.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
										}
									}
								}
								else {
									if(p.state[ t ? 'selected' : 'checked' ]) {
										p.state[ t ? 'selected' : 'checked' ] = false;
										this._data[ t ? 'core' : 'checkbox' ].selected = $.vakata.array_remove_item(this._data[ t ? 'core' : 'checkbox' ].selected, p.id);
										tmp = this.get_node(p, true);
										if(tmp && tmp.length) {
											tmp.attr('aria-selected', false).children('.jstree-anchor').removeClass(t ? 'jstree-clicked' : 'jstree-checked');
										}
									}
									else {
										break;
									}
								}
								p = this.get_node(p.parent);
							}
						}, this));
			}
		};
		/**
		 * get an array of all nodes whose state is "undetermined"
		 * @name get_undetermined([full])
		 * @param  {boolean} full: if set to `true` the returned array will consist of the full node objects, otherwise - only IDs will be returned
		 * @return {Array}
		 * @plugin checkbox
		 */
		this.get_undetermined = function (full) {
			if (this.settings.checkbox.cascade.indexOf('undetermined') === -1) {
				return [];
			}
			var i, j, k, l, o = {}, m = this._model.data, t = this.settings.checkbox.tie_selection, s = this._data[ t ? 'core' : 'checkbox' ].selected, p = [], tt = this, r = [];
			for(i = 0, j = s.length; i < j; i++) {
				if(m[s[i]] && m[s[i]].parents) {
					for(k = 0, l = m[s[i]].parents.length; k < l; k++) {
						if(o[m[s[i]].parents[k]] !== undefined) {
							break;
						}
						if(m[s[i]].parents[k] !== $.jstree.root) {
							o[m[s[i]].parents[k]] = true;
							p.push(m[s[i]].parents[k]);
						}
					}
				}
			}
			// attempt for server side undetermined state
			this.element.find('.jstree-closed').not(':has(.jstree-children)')
				.each(function () {
					var tmp = tt.get_node(this), tmp2;
					
					if(!tmp) { return; }
					
					if(!tmp.state.loaded) {
						if(tmp.original && tmp.original.state && tmp.original.state.undetermined && tmp.original.state.undetermined === true) {
							if(o[tmp.id] === undefined && tmp.id !== $.jstree.root) {
								o[tmp.id] = true;
								p.push(tmp.id);
							}
							for(k = 0, l = tmp.parents.length; k < l; k++) {
								if(o[tmp.parents[k]] === undefined && tmp.parents[k] !== $.jstree.root) {
									o[tmp.parents[k]] = true;
									p.push(tmp.parents[k]);
								}
							}
						}
					}
					else {
						for(i = 0, j = tmp.children_d.length; i < j; i++) {
							tmp2 = m[tmp.children_d[i]];
							if(!tmp2.state.loaded && tmp2.original && tmp2.original.state && tmp2.original.state.undetermined && tmp2.original.state.undetermined === true) {
								if(o[tmp2.id] === undefined && tmp2.id !== $.jstree.root) {
									o[tmp2.id] = true;
									p.push(tmp2.id);
								}
								for(k = 0, l = tmp2.parents.length; k < l; k++) {
									if(o[tmp2.parents[k]] === undefined && tmp2.parents[k] !== $.jstree.root) {
										o[tmp2.parents[k]] = true;
										p.push(tmp2.parents[k]);
									}
								}
							}
						}
					}
				});
			for (i = 0, j = p.length; i < j; i++) {
				if(!m[p[i]].state[ t ? 'selected' : 'checked' ]) {
					r.push(full ? m[p[i]] : p[i]);
				}
			}
			return r;
		};
		/**
		 * set the undetermined state where and if necessary. Used internally.
		 * @private
		 * @name _undetermined()
		 * @plugin checkbox
		 */
		this._undetermined = function () {
			if(this.element === null) { return; }
			var p = this.get_undetermined(false), i, j, s;

			this.element.find('.jstree-undetermined').removeClass('jstree-undetermined');
			for (i = 0, j = p.length; i < j; i++) {
				s = this.get_node(p[i], true);
				if(s && s.length) {
					s.children('.jstree-anchor').children('.jstree-checkbox').addClass('jstree-undetermined');
				}
			}
		};
		this.redraw_node = function(obj, deep, is_callback, force_render) {
			obj = parent.redraw_node.apply(this, arguments);
			if(obj) {
				var i, j, tmp = null, icon = null;
				for(i = 0, j = obj.childNodes.length; i < j; i++) {
					if(obj.childNodes[i] && obj.childNodes[i].className && obj.childNodes[i].className.indexOf("jstree-anchor") !== -1) {
						tmp = obj.childNodes[i];
						break;
					}
				}
				if(tmp) {
					if(!this.settings.checkbox.tie_selection && this._model.data[obj.id].state.checked) { tmp.className += ' jstree-checked'; }
					icon = _i.cloneNode(false);
					if(this._model.data[obj.id].state.checkbox_disabled) { icon.className += ' jstree-checkbox-disabled'; }
					tmp.insertBefore(icon, tmp.childNodes[0]);
				}
			}
			if(!is_callback && this.settings.checkbox.cascade.indexOf('undetermined') !== -1) {
				if(this._data.checkbox.uto) { clearTimeout(this._data.checkbox.uto); }
				this._data.checkbox.uto = setTimeout($.proxy(this._undetermined, this), 50);
			}
			return obj;
		};
		/**
		 * show the node checkbox icons
		 * @name show_checkboxes()
		 * @plugin checkbox
		 */
		this.show_checkboxes = function () { this._data.core.themes.checkboxes = true; this.get_container_ul().removeClass("jstree-no-checkboxes"); };
		/**
		 * hide the node checkbox icons
		 * @name hide_checkboxes()
		 * @plugin checkbox
		 */
		this.hide_checkboxes = function () { this._data.core.themes.checkboxes = false; this.get_container_ul().addClass("jstree-no-checkboxes"); };
		/**
		 * toggle the node icons
		 * @name toggle_checkboxes()
		 * @plugin checkbox
		 */
		this.toggle_checkboxes = function () { if(this._data.core.themes.checkboxes) { this.hide_checkboxes(); } else { this.show_checkboxes(); } };
		/**
		 * checks if a node is in an undetermined state
		 * @name is_undetermined(obj)
		 * @param  {mixed} obj
		 * @return {Boolean}
		 */
		this.is_undetermined = function (obj) {
			obj = this.get_node(obj);
			var s = this.settings.checkbox.cascade, i, j, t = this.settings.checkbox.tie_selection, d = this._data[ t ? 'core' : 'checkbox' ].selected, m = this._model.data;
			if(!obj || obj.state[ t ? 'selected' : 'checked' ] === true || s.indexOf('undetermined') === -1 || (s.indexOf('down') === -1 && s.indexOf('up') === -1)) {
				return false;
			}
			if(!obj.state.loaded && obj.original.state.undetermined === true) {
				return true;
			}
			for(i = 0, j = obj.children_d.length; i < j; i++) {
				if($.inArray(obj.children_d[i], d) !== -1 || (!m[obj.children_d[i]].state.loaded && m[obj.children_d[i]].original.state.undetermined)) {
					return true;
				}
			}
			return false;
		};
		/**
		 * disable a node's checkbox
		 * @name disable_checkbox(obj)
		 * @param {mixed} obj an array can be used too
		 * @trigger disable_checkbox.jstree
		 * @plugin checkbox
		 */
		this.disable_checkbox = function (obj) {
			var t1, t2, dom;
			if($.isArray(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.disable_checkbox(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			if(!obj.state.checkbox_disabled) {
				obj.state.checkbox_disabled = true;
				if(dom && dom.length) {
					dom.children('.jstree-anchor').children('.jstree-checkbox').addClass('jstree-checkbox-disabled');
				}
				/**
				 * triggered when an node's checkbox is disabled
				 * @event
				 * @name disable_checkbox.jstree
				 * @param {Object} node
				 * @plugin checkbox
				 */
				this.trigger('disable_checkbox', { 'node' : obj });
			}
		};
		/**
		 * enable a node's checkbox
		 * @name enable_checkbox(obj)
		 * @param {mixed} obj an array can be used too
		 * @trigger enable_checkbox.jstree
		 * @plugin checkbox
		 */
		this.enable_checkbox = function (obj) {
			var t1, t2, dom;
			if($.isArray(obj)) {
				obj = obj.slice();
				for(t1 = 0, t2 = obj.length; t1 < t2; t1++) {
					this.enable_checkbox(obj[t1]);
				}
				return true;
			}
			obj = this.get_node(obj);
			if(!obj || obj.id === $.jstree.root) {
				return false;
			}
			dom = this.get_node(obj, true);
			if(obj.state.checkbox_disabled) {
				obj.state.checkbox_disabled = false;
				if(dom && dom.length) {
					dom.children('.jstree-anchor').children('.jstree-checkbox').removeClass('jstree-checkbox-disabled');
				}
				/**
				 * triggered when an node's checkbox is enabled
				 * @event
				 * @name enable_checkbox.jstree
				 * @param {Object} node
				 * @plugin checkbox
				 */
				this.trigger('enable_checkbox', { 'node' : obj });
			}
		};

		this.activate_node = function (obj, e) {
			if($(e.target).hasClass('jstree-checkbox-disabled')) {
				return false;
			}
			if(this.settings.checkbox.tie_selection && (this.settings.checkbox.whole_node || $(e.target).hasClass('jstree-checkbox'))) {
				e.ctrlKey = true;
			}
			if(this.settings.checkbox.tie_selection || (!this.settings.checkbox.whole_node && !$(e.target).hasClass('jstree-checkbox'))) {
				return parent.activate_node.call(this, obj, e);
			}
			if(this.is_disabled(obj)) {
				return false;
			}
			if(this.is_checked(obj)) {
				this.uncheck_node(obj, e);
			}
			else {
				this.check_node(obj, e);
			}
			this.trigger('activate_node', { 'node' : this.get_node(obj) });
		};

		/**
		 * Cascades checked state to a node and all its descendants. This function does NOT affect hidden and disabled nodes (or their descendants).
		 * However if these unaffected nodes are already selected their ids will be included in the returned array.
		 * @private
		 * @param {string} id the node ID
		 * @param {bool} checkedState should the nodes be checked or not
		 * @returns {Array} Array of all node id's (in this tree branch) that are checked.
		 */
		this._cascade_new_checked_state = function (id, checkedState) {
			var self = this;
			var t = this.settings.checkbox.tie_selection;
			var node = this._model.data[id];
			var selectedNodeIds = [];
			var selectedChildrenIds = [], i, j, selectedChildIds;

			if (
				(this.settings.checkbox.cascade_to_disabled || !node.state.disabled) &&
				(this.settings.checkbox.cascade_to_hidden || !node.state.hidden)
			) {
				//First try and check/uncheck the children
				if (node.children) {
					for (i = 0, j = node.children.length; i < j; i++) {
						var childId = node.children[i];
						selectedChildIds = self._cascade_new_checked_state(childId, checkedState);
						selectedNodeIds = selectedNodeIds.concat(selectedChildIds);
						if (selectedChildIds.indexOf(childId) > -1) {
							selectedChildrenIds.push(childId);
						}
					}
				}

				var dom = self.get_node(node, true);

				//A node's state is undetermined if some but not all of it's children are checked/selected .
				var undetermined = selectedChildrenIds.length > 0 && selectedChildrenIds.length < node.children.length;

				if(node.original && node.original.state && node.original.state.undetermined) {
					node.original.state.undetermined = undetermined;
				}

				//If a node is undetermined then remove selected class
				if (undetermined) {
					node.state[ t ? 'selected' : 'checked' ] = false;
					dom.attr('aria-selected', false).children('.jstree-anchor').removeClass(t ? 'jstree-clicked' : 'jstree-checked');
				}
				//Otherwise, if the checkedState === true (i.e. the node is being checked now) and all of the node's children are checked (if it has any children),
				//check the node and style it correctly.
				else if (checkedState && selectedChildrenIds.length === node.children.length) {
					node.state[ t ? 'selected' : 'checked' ] = checkedState;
					selectedNodeIds.push(node.id);

					dom.attr('aria-selected', true).children('.jstree-anchor').addClass(t ? 'jstree-clicked' : 'jstree-checked');
				}
				else {
					node.state[ t ? 'selected' : 'checked' ] = false;
					dom.attr('aria-selected', false).children('.jstree-anchor').removeClass(t ? 'jstree-clicked' : 'jstree-checked');
				}
			}
			else {
				selectedChildIds = this.get_checked_descendants(id);

				if (node.state[ t ? 'selected' : 'checked' ]) {
					selectedChildIds.push(node.id);
				}

				selectedNodeIds = selectedNodeIds.concat(selectedChildIds);
			}

			return selectedNodeIds;
		};

		/**
		 * Gets ids of nodes selected in branch (of tree) specified by id (does not include the node specified by id)
		 * @name get_checked_descendants(obj)
		 * @param {string} id the node ID
		 * @return {Array} array of IDs
		 * @plugin checkbox
		 */
		this.get_checked_descendants = function (id) {
			var self = this;
			var t = self.settings.checkbox.tie_selection;
			var node = self._model.data[id];

			return $.vakata.array_filter(node.children_d, function(_id)�������"������̓�����X�q&����d���u�>��_�㑟�nVz�>Y��J���x?���[>�I��Ƭ/��2��#�����vņ�>ܶ f}I)��w�<��;w��qy�����T� ���T��C0�&�d�Á�
��PK��s0�Nx�
��		��IM�Ax��
�b�Db(�H� S`" ��	@�
�F<N@�c)D��Sr��@�� i+�@�X��x��d$b ���@ A | $J�@.�H
����-�K��c�U@w_��\�_;�?dq�]c�7��+F]�S�=Z�7VC�׭��A�uf��o��I��t;lN��m��������>�aL���~�G�?Μϸ�����,|�\��۟a����{��?����mbH ��DBj �!1��88 B!p�H�p
�;=g����Ὓ'��>P\9���}��<��c���ݻw~���w���g������ν��~�n���Dd��JpCA�����I��:DT��(W`V @r�$6�U6!a�+W�B%�PT7�5'�	 @�R��0p��C�L!�p!
\��# ��|����%���[Mg�K�5W��n����������w��c������>����M��|��g	��?^����f=�_��^���񆿇�8ߺ�k��c�����P(E�նCE�U���˔@?o��+��elcHa~�0� (�@  ����!��t���4� (�le��A
PqR��f�8�F� H S+(�o�R0['(԰�� �A �0����� 
p$@�"��#�0�%?�%"��  1tx���0����6 CICm* i)�V���y�i ���C �U�J1`P��H� �C��!A�0�!J�	 �ФA�M�� J(
9�-�J$¿��
$� 0@��	�� `eG'�!0�(Y?V�HDp��( 5H �H	 �L���" A  ��Cj �@�ɐ�� U�8����~�m�����.w����?
v�m���zF�l�=��OҮ^����ߴt�f��[Q����m����-��������\\=25��~�������~}�}���W�޿V�z�v�����7�����}nq@��;z9���
|l0h�C!U�R����h�%��ԁJ�x\I����.O`M� ���	���"���
�4�)#%�$
�
A:�pX 8*jsA�� <F$ %Q�����'��v��O��=oO�r�܃�~���׼��g�}��7:��/��G�����So=��9ə_���������C��o�I���п:_����~�����q�'?�OÁFx�յ�)ƿ��{Wh�����y���*4FH�  �)HXr�%L��ۀRׂ���@�r9LH|�G�!�  � @�!� 
��"S����'��s�zm�u����p�����w�nzTg��쵝6~����)im��`�A�nW�[�q�o<7�6������o�i�������/�yՕ߬�׌�[BY� " "�I�m�a��N �B������`�u�v��0�:�Q��Qo�l 1R
р��-@�p�P$a� ꕈ0�Z��k��o��*0�T�
D8���BS�OLH�@��`�� �&��.=��	�mj-Z�7-ϛ"�����=��=_�7�}����ػ}M�>[/=�7��4▼T�g��>�҃6��T?�g��k�5
�*�	6�@@ C̈́A�XJA�A �V��� �@&e�#G&�,<�(H.A�@�� � 0�EFP�!� 4�a�d"�", : =D�Y�C`b@�P �!�r
2�D4B� �H��&ȃ�t���a0���fH��~!�0�FZ��b,"H ��2� /� ���nXJY�틋��i�s�M��%�S��;�>�w�;�\����σzɬ��|�0OR�v��ou��宿+����'�o�u�}��m�IG1��{�+ż�����\�]H����ڳq=�a�I����}d
��*DD	��G@�
x�M^4N6 � �!O6�CR! d# )
  2�y0R@r"�Cbi�J���8
�Dt�: �W��b�"
�� b��`�遚��׷U'�n�x5����O�[m����{}���Z�����.va���nn�����L�����K�Ҥ.o��}V��r柨��z��~�T1o����^�bh��'��^����`�U��T���G����*�������}�=���L߷��;�v{6+��^^?֏���}�
�}�{�`�U�4t�&�ԝ@��n �L1AH� %�D�O,��@��#R{�
��D�D<����0� Bf�y��� �hCQhrH@%
��B�,ИD�#hD�R�F�ڈ3T1+�dA�E�%��P{-�L9�
 "�Y��a+��F�(��G�.���Ny���Z~S�������t�y�������]���w������˿����e���z]��{}+����?~�ߟ����w;�����z�-��4۞������_�;�������>�m��~����c��{��{��;�Sd����_���������en����������j�t�\������Z��O�\����Q���?�{�u_���}m���E2�b��z�����~�[���ǟ�ܜ~����
i��jP�$p����T@�� YD2"w�RE��^���#��0�$ R50DjNP��	ci�܀���&h�B�N�bD�R��&�� �%�n��;Q�F<��L��/h��0j��-�
��(�? [�5�^
¢�P7 �dS�9���C�K^�b�D��I"J�d�,	�""= �D"��MĆb�aJX�J	z�/$E�TDU $�	T��b1��.��X׏�k �B�<�C��U1HK�v�c�{������K�r���/O�����zi�u*Ww�+����f���O���d,_���]��e����_��^��7�޻���[��E���q�

p���BH Lb3�Ҕ���!�r�#�(�e���"?(�"A �IF#ف9�����w]�O�o����k���ܮf���W��;��͞�\o������߾ۛ�GqO<�ߞuw�_T�[����u�z�_���1r{�ͻ�~�M�y��ݞ�}�o���z��P���O����ۢ���2���/���fQ���r!��+F�d���Q[	�:-�D�c1	� K�=r��M2+�8b�Q���PT���!��*R�B(K�SO�6<�
23�$�4<��BL���e^B��*@K��d���0xTeY��� �!DL=B�pD�$��
�\�TI	�i@�X!"M�0 0�6P �`��� "
��u���{�c��o������ =�������%O\3�.-���o�-�v=���?�k�����ݽ�����؛���x��������_�}����S^�����{���z������Ǳ�����K���s{�H��5�WXJ� T~�b�#���*M(�Da��C1���3�"a�B� "t����@L���	H�A����� 2����ZQ�A|�N,���d�*��1�(J�mƣ̚� B��0�C4D �|��8��\P��PVr )䘷(M�erJ�)dE�
OiCQDF0�la h@	��@i-���Ђ.�`q��1UH�`�D�FD- �pJ�LA@��v��DA�e߀Zj������޻��m���_����y[��u;��_��o�j;�橣-�������������~��I���߫$ox��ο�^t��/.�'��x>�]��U��?��������U��m}��y�<5�����o������v?�������ӧ�������\�oͧ<
F.0��ҖjFF�0>*��J� 0�N��7÷����I�~ٽ��?I����};����~���z�|�V[�~��������~��_�m������w������t���������v�+:w�޹��o��7����u��?.ӽ_��s�������y+�u�}���jG|�����5���?�]]�0���;~������������]m�k�ؙ��?}w�����U"V'�}OK�N�r�h�w���l�;�����uYN���������+n\{7��������{��:���l�?/��}�?#+�_����ds���g��{��e�������X�Ϻ�s>�~P���}r\�n���wz:�C���%��~����Z������mN���Wf�݀y.mU݆�rkv�o�'`�X��.���k}�������'���o�~���:���{ߣ��Q����{�">3�������Wq��s����������/�����7s����}��i�+'�n��ڛ�����}֮r_&�S��ߥW�hu�<^��[��j������ߴwsX���vZ�/}��J،f>�ﳞ�����oU�����W8���V+���ߗ�uL�����Wǿv��VG���G�i^�_�ۇM3�"zͿ�/[���l���~��Ϯ�[��|���m�Z����o������}|���9_��z�H���e.��{ry�-��_߷�ŷ�]�w��?�3�|=�V������yE��A/��W�^?���f�_�˟�������㢬�������ᮮ�oY��z����+�?�J{�������n�W�_Y{p�W��;Nߕ�Ϙ���_���{�ߟ���}.����]��S���}����5�˹\�}�^�g\�v�=�ۼ����ۋN�!���Kz?�'�~rF�9eY����u����]};���n���y�;�ݻ�oNynjݬz���w��mR<���S;����g�>�י��)�d��7�?ޜ�o��~���]�V�U�"����;?U�݃��=��u�]��۷�_��������o�r�-}[����w���ý���]_.V������[���m~���k3?���
TO��n��M�������JOu.���HQ�ν3>�N߷����|�ܯ�?}�5ۛ�s]�ﲡ=�<��݄�B}T^�����Jw��9<W}}ﯕ������0���N�\���n��2O��w<��&��������z?����ٜ��~߯=�{�;�S��+��Os�����s�e�~�����"c���]����y~:�u�o���n��~?���~��^3on?���g߷[�y����p3��oS����kt�����ߒ��*_�mݻ��3i��l�򓺧N�ap̆,���+��w�n�c�W���v�w����Yn}��ˍ�?�mt!wU[��9�n����Pu�s�����Q�>+x��>�[y?�r����YL�I�3
�G    XC�    @P2L豈LH��G  ;�      ݵ'�K$�\/�k���& �     �A     `��M������G  p��MX�3    H�iLP�G  &3     4��zW���?`N' �     �A     _�E����0S�E 
���� ����@��.:�����X ���.:
 ��.>
 �w��}�0 �����p��Π� �������
 �
  ������8�>m/I�   0      ������k&���    p� 0��j�j�8    ��"#�����9	        � �����!
  ������j�n      X��	    �ٙ;����������G����      �G+�K5�C�k��, �     �A     05K������G    �5K�5K(ژ�$���TȆ    @�.G�M     �ǆ >L1P#���C���� �  �A  (ژ�$���Xq�    ��;�����ԞH  ��    q�  �-(�KA��w�k��o�& �     �A     @t�M�����{�M     |�MPۘ�$����f    �-�L��N����     D�L@���~�A�/�@ �  �A  ���GPۘ�$���X��    ��?�ihKh��G  ��      ݵ'�Kd2{E��& �     �A     �ۡM����0ܡM����  0ԡMX   �� p�G       ݵ��b3�k/�î& �     �A     @ԡM����`ܡM����   ݡM�����ܡM����X   HԬ?ةiKxМG     ��2.�& �     �A     �ӡM�������G    �ܡM����X�3    ��8CЕ)@^�G  &3     ,�VK�2��k�^N' �     �A     PR�E����0��G  `^�EXإ	    ���8�G  ��	     �;I)aK)�xF8>��, �     �A     ��aL�������G    5K�5Kh���$������     ��L�q�G     \W6g��H���% �  �A  ���G����h���$���X�    <?X��ΜG  ��    '�Kwes3�VŮ& �     �A     �ݡM����pݡM����8��G����  `ݡM����PݡM�����Ԙ�=f    /�L09nG     "t8�������`�@ �  �A  ���G�����X ���( 	� �>�����0� ��n>[ �,�>k;����n;k0����~.Q�����X����� � ���;P�
ں�/�~g�0��}#�n���rW�������?��=���_�ve���`����z��}��n�:�o�q�=�]���w��r��󽏯�s�7�S�����Cv{G�?kٵ����.e���	q-�鯞Z>��w��w���?||�G�_�=������;��[?��ݑ�o�+�\��+Mm���_��������^��6������5������_{W���>%���g'y�o��_�������k�|�5|ޙmC����_�h?��>I��nE��F��M��þߏV���q��u��~���1��|~�ʿݒ��{>���\f�����z�w��rSI�~7S˽>M'�Kz�Ŀ2y�Ϛ���oV���]���G��hQ����{F9�:����{�޲�W�wپ���z^N͕���њq;�m�������k}F���,j'��_���3���RR���g������?�sﶺ����I�����O�ⰾ���e�ٿ���w��~�����f��_�Cֿ�g�G����︝��=��>-���1h�R�_yԹ�̗��
v��e�]�������ԗ�/Q������\�e�{��_�N����N߾�ݒ���\#�E"w�w��_�#�_����6����#0ۗ��_�5��u�ǿ��m'w~��*����I��o�����Rk��e+�i�u�~�6��9��g��Ī'���o���v�k_���<sWa;�};����y0{�]A��Y�X��>�/�2	����=��G�^�|fe��vu�o�yz��-�������]O����Ey���������mƖj���(��/k��E���]y�����M�k������_�t�����R�����;)���ˬ�~����1��ܯv��%���c�Uצ�V�e���=����>�/�WK��{?e0'�5�o?o*������O'�1�f�{��?�������7��8ʹ�{������W���*��O�_m���_���>�����W��������fk������~�;����__:�n��m=�.�����~Ͽ���j���յ�������o>���'��7�����������u�m9z�[�/�]��������l��{�r5�%�����ұ��~_۾���~[��?��KW�q����_�F�V����>�|c�Ǟ�����+���<���}����ި�?k�z]������O����z�Q�}��}����w�~}�w��n�Ѹ�Ƿ}���_�.�{�+�Z}�[����>��z��4��}������?�K�{ȼ���
�}I��;��������ZL�����������z��+�;���f>�dKen��O������e�u׹������֏]&)��?������[���֎n�%����n��5�s^~�+Q�<F�&�z�3�Wo��_E}l��qu���3P/���_Z����}���-���!{����_���z`ˏ3�����;��&���[�?����W�Wr��ǡ0�ii�s�����P��W�
Տ*�ݍ^5"{���?���ε�߱jL����n���/5[�S6���?��z~����i��6���B'�r�)��5��/ѿۧ�����_�}��o�����_;���r�z�����K{���������]�/��?u������#���y��5����_�O+�S��㯠m��^N�����鯿��M��6�Ս���O]qO���#|���\�m���Ŕ-�������_�V�W='w���������m���=��������=ǽ����ߵ�:����_s�����{��;���t�����o��+��?�����������������~������H�?}�w~���ٿu��������W�۫_����w뉗�7��N]�$Hm}����5ڿ+��7��"�����ߏ�?y�����7ɱ�����Ok�rkg�?�+��X/Y�܁�==��c���۳���{�|K����`�j����#������^���|��ʱ�i������1���w��[�����5�3w���Tf[�����6@��t�ܻ��I��������~�υ�0�%Ǐ�sV]�%���vgƹJ�L�%��v����{��5����߼��������e���w�o���]�[�ٕ�F���n�����r:�ͬV�}�_^��2�3��u�/�~�Tp���+���Ϯ�y��v����������On�ߏ�}}����F�k�k��l���y����]���n7~[�|���{��-����޳��8���S��3�����+K��?�����[�6������[�y�՝I����&}��}�Gz��&v]���G�!}�
���g��y��{�g�����'���w[��v�ߒ�ֶ�8�g��,�o��៫�=����y����u��?۽���m)iү'���>oe���v�ׯ�?f{��_w�|O|c���Y͗u�%��/�}����[�����������}>�����f���=���׍��l�Y��������M? ���+�����s����{?��
[\?�����o�����'��
���>e}�����_>��ߟ�ߺ����"cW_�w�+�gp�ͧ���x��Q����Y�����OlO���w��
MWn>���N�6�qf�(�-x����y��G�'m��>����<���_j��a����_�d���3�{�_�W`��ۓ����������lv�ߴ?K������o�W�g���)��}�ӷ�����+��ߜ�?� g�6�K�����������peUv��ї���Oc�ë����_����ߧ�u���xx��|���r����J�{K�^[X���gy�pG�٣f�U;�v��yj��3[u��ú��{���|�f�^��-����`�ӧmW?n��i��o[���Fvf�=������r���y,vf��� Ϲc��z��G,�㯻+���v�p���M�[|�m����#N'�28�:���b5{�MM������� ���n�&�|�ǯ�6��r4W¿e�6�˥�q�4�<fu��o>����<z�p���]A� �������ؑ4��ʷ�4L�/��O�F{���e�i�j��������Z��w?�|�g��w�}�#�W�U?}���u����[���s���~���^�Ε���_{?[�����0oY�m�}�,���+�z�[�����;�s����x\_��w������j��}�f��kr�����W-k���&�d�����5����toZ
_�����O�������6ݱK�>g���ђ?�Vv����|���^pK?�o����:�}}{}�}����>�e��Օ�k|����������-�}�k��
��*{OU���;r�S���a���S[�i������x�/���~���"��߷�՗|��ے��w���Zٺ�����\����=X���[���;��7����v��_}�L��5����j�n�u��]i�q�_빷��z߷3��n��M+�O�~?�_����2���~f��#�9�{^֯�[�6K�?�����7{�W�|^q6����KF�_�m��U�,Rze���1��S����������f�lO�X�{*��]@������~�}�/�󚧮����y��^�{]������չ����/������S��[ǜ�g��=�n�������me]Q��������*_�\��M��}���}������^��9����n�������
X�QK�i�Յ@F$
D�T��o`~������
7R�0�FaP ���Rv�(��V_P�����T����R�RD����@ �0�e�J���G�X����T.CD���y$ ΦQ+ T!�qR�to�	��%&IEZ��0$�M"�єF@d1z���K�M�,@�dk�ϟ-���oq&����wuV�{�md�V�_���������ڗ�l+��u�߶�}|��o}����-��ofE�{��2��]���g�������ݿ����[��������������{R��O����U��[v���l� b-� `R�/4,�d��G�1B2�Q�Ÿы@-� 
�m$Hl�����i�f66@ę�YIl�bRA����P
"�0��"l)��	zJp� @�(�����!��]��L���$G��?�2�Q��b,�!�S�/��\��[��J�f������Q��<U�
O( ��4Jѽ��x�� 䒃7
�e>Á�{U�(<2'� Ŧ�)�29 )Q1/�X,�� ��� P��4 r<��t�	(a0�Sf�J�FQ/���`T��2�4�qiBS[A| f4P��� ����_W�ɪ��r�E
+���o�w�˛�z�߫���u������[��������I&g����]����m���忒��k���p�������u=���`�^^z�y���Yd���u� @�"@����R�6��K�$�S�F#A2/5C$cP'(�D	����M�R� Bs �SAN)��|�ש�%�R��!0�(4�XL1,�V2T�FS��a���}�ʜIch{3]���SFB2�v�YR���Pl�JiH.(
���2�C3`�E@d���D'Ȋ�0cD	DI�6 �QH�d.��@Oiaí
�{@&W/�a�D,"( ��U�� ��}�όs��Ί�_g������,���]�=u��Oi��ѵ�Q�Yu>�̷��
��m�{���{��BOڼ�������ި��z�Ȼ;���"N�R+����ÿ�n�7�O��w|��t�M���i�}˓�{��4�� �z�
R���I�����Y��� �pP� D��ĳ��:�	��u�C'�Ԙ��#T�b2�x�-	��G��R �pCA�B���	1��L����N2!G)��`��Ե�P��ym�^n�����������[�[S^����K����>�3���7�ϟ��z���&��w����A�֛�����~��n�4��3����<�"�u�k��:�|ۗo����o��y��ջ�o�|��OU���?���~v��}��f���}�
fs�~���n�y�w��5Ӑ�si�Cݿ���_�׳�ꣾns˺_W��������o�4��ݭ�ۭ!����ʟ����[S��]��:������ξ�_�:��`~���5�D2T����DD���$ �X� �� ����H0�6 �Cbd`fP$���QڱU,C�.�F P"/�0�k4$=�LR�I9�GD$xp�(��~��� �3���\R�1;�x4hZ����{��9{�?�q	�~���s�R��=��w������/���ߵ�������5}��7�6N��n���K{���C������MsM���3:���/���7m���#o�}���Ż�j���������~��k�0x��Qs�v�.�(�@4|E���I# ' 6 �"%H 0E"�0=�G� 5�y��@�&3��D�[ p"]�`���S
r$R���uB�B�![$C8k@	��څ��� b;R=A���p �e�"9�49�?�
� ��/fD�!�f>�S�Aa��B��n�
6�D �-U�6�$f$�`@e��	@�RF @D����	=	� *dF� p�Re�CS0(fT�B���-Km�}��o�_����]�����n�Z��٢���c�����ܮ�n/梻�|��E�/��[c������Ү���������ӟn���h�����ㅫ�u�������ӏ˾��������8P���O�[?Gnw�UtH�B�02!
�
ߟ����-�_{t�ɽ������:�_O�w��;����zxo��Wu��}`�8/�&͹����w�[����]��{]q�R�o*����tL��?�����~ʾj�����)���v��V�5��^�R��|c��;����G��������e��e�Q��g�/*��~s�j,�ߟ����������GN�F�o=�t�o��?�������_]����i����u������q���{�My���M��?�����Σ�{�u��`7�ribE;$(N(�I
�@o�Bz0ی�vg���^<�J��� _��0��'�-��^,FC�;�Ab&���3V�@b�$�Gd�4��h@R�Cu����P)�hYW�� `7 C�
T�>Fs_visible = true;
					/**
					 * triggered on the document when the contextmenu is shown
					 * @event
					 * @plugin contextmenu
					 * @name context_show.vakata
					 * @param {jQuery} reference the element that was right clicked
					 * @param {jQuery} element the DOM element of the menu itself
					 * @param {Object} position the x & y coordinates of the menu
					 */
					$.vakata.context._trigger("show");
				}
			},
			hide : function () {
				if(vakata_context.is_visible) {
					vakata_context.element.hide().find("ul").hide().end().find(':focus').blur().end().detach();
					vakata_context.is_visible = false;
					/**
					 * triggered on the document when the contextmenu is hidden
					 * @event
					 * @plugin contextmenu
					 * @name context_hide.vakata
					 * @param {jQuery} reference the element that was right clicked
					 * @param {jQuery} element the DOM element of the menu itself
					 * @param {Object} position the x & y coordinates of the menu
					 */
					$.vakata.context._trigger("hide");
				}
			}
		};
		$(function () {
			right_to_left = $(document.body).css("direction") === "rtl";
			var to = false;

			vakata_context.element = $("<ul class='vakata-context'></ul>");
			vakata_context.element
				.on("mouseenter", "li", function (e) {
					e.stopImmediatePropagation();

					if($.contains(this, e.relatedTarget)) {
						// премахнато заради delegate mouseleave по-долу
						// $(this).find(".vakata-context-hover").removeClass("vakata-context-hover");
						return;
					}

					if(to) { clearTimeout(to); }
					vakata_context.element.find(".vakata-context-hover").removeClass("vakata-context-hover").end();

					$(this)
						.siblings().find("ul").hide().end().end()
						.parentsUntil(".vakata-context", "li").addBack().addClass("vakata-context-hover");
					$.vakata.context._show_submenu(this);
				})
				// тестово - дали не натоварва?
				.on("mouseleave", "li", function (e) {
					if($.contains(this, e.relatedTarget)) { return; }
					$(this).find(".vakata-context-hover").addBack().removeClass("vakata-context-hover");
				})
				.on("mouseleave", function (e) {
					$(this).find(".vakata-context-hover").removeClass("vakata-context-hover");
					if($.vakata.context.settings.hide_onmouseleave) {
						to = setTimeout(
							(function (t) {
								return function () { $.vakata.context.hide(); };
							}(this)), $.vakata.context.settings.hide_onmouseleave);
					}
				})
				.on("click", "a", function (e) {
					e.preventDefault();
				//})
				//.on("mouseup", "a", function (e) {
					if(!$(this).blur().parent().hasClass("vakata-context-disabled") && $.vakata.context._execute($(this).attr("rel")) !== false) {
						$.vakata.context.hide();
					}
				})
				.on('keydown', 'a', function (e) {
						var o = null;
						switch(e.which) {
							case 13:
							case 32:
								e.type = "click";
								e.preventDefault();
								$(e.currentTarget).trigger(e);
								break;
							case 37:
								if(vakata_context.is_visible) {
									vakata_context.element.find(".vakata-context-hover").last().closest("li").first().find("ul").hide().find(".vakata-context-hover").removeClass("vakata-context-hover").end().end().children('a').focus();
									e.stopImmediatePropagation();
									e.preventDefault();
								}
								break;
							case 38:
								if(vakata_context.is_visible) {
									o = vakata_context.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").prevAll("li:not(.vakata-context-separator)").first();
									if(!o.length) { o = vakata_context.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").last(); }
									o.addClass("vakata-context-hover").children('a').focus();
									e.stopImmediatePropagation();
									e.preventDefault();
								}
								break;
							case 39:
								if(vakata_context.is_visible) {
									vakata_context.element.find(".vakata-context-hover").last().children("ul").show().children("li:not(.vakata-context-separator)").removeClass("vakata-context-hover").first().addClass("vakata-context-hover").children('a').focus();
									e.stopImmediatePropagation();
									e.preventDefault();
								}
								break;
							case 40:
								if(vakata_context.is_visible) {
									o = vakata_context.element.find("ul:visible").addBack().last().children(".vakata-context-hover").removeClass("vakata-context-hover").nextAll("li:not(.vakata-context-separator)").first();
									if(!o.length) { o = vakata_context.element.find("ul:visible").addBack().last().children("li:not(.vakata-context-separator)").first(); }
									o.addClass("vakata-context-hover").children('a').focus();
									e.stopImmediatePropagation();
									e.preventDefault();
								}
								break;
							case 27:
								$.vakata.context.hide();
								e.preventDefault();
								break;
							default:
								//console.log(e.which);
								break;
						}
					})
				.on('keydown', function (e) {
					e.preventDefault();
					var a = vakata_context.element.find('.vakata-contextmenu-shortcut-' + e.which).parent();
					if(a.parent().not('.vakata-context-disabled')) {
						a.click();
					}
				});

			$(document)
				.on("mousedown.vakata.jstree", function (e) {
					if(vakata_context.is_visible && vakata_context.element[0] !== e.target  && !$.contains(vakata_context.element[0], e.target)) {
						$.vakata.context.hide();
					}
				})
				.on("context_show.vakata.jstree", function (e, data) {
					vakata_context.element.find("li:has(ul)").children("a").addClass("vakata-context-parent");
					if(right_to_left) {
						vakata_context.element.addClass("vakata-context-rtl").css("direction", "rtl");
					}
					// also apply a RTL class?
					vakata_context.element.find("ul").hide().end();
				});
		});
	}($));
	// $.jstree.defaults.plugins.push("contextmenu");


/**
 * ### Drag'n'drop plugin
 *
 * Enables dragging and dropping of nodes in the tree, resulting in a move or copy operations.
 */

	/**
	 * stores all defaults for the drag'n'drop plugin
	 * @name $.jstree.defaults.dnd
	 * @plugin dnd
	 */
	$.jstree.defaults.dnd = {
		/**
		 * a boolean indicating if a copy should be possible while dragging (by pressint the meta key or Ctrl). Defaults to `true`.
		 * @name $.jstree.defaults.dnd.copy
		 * @plugin dnd
		 */
		copy : true,
		/**
		 * a number indicating how long a node should remain hovered while dragging to be opened. Defaults to `500`.
		 * @name $.jstree.defaults.dnd.open_timeout
		 * @plugin dnd
		 */
		open_timeout : 500,
		/**
		 * a function invoked each time a node is about to be dragged, invoked in the tree's scope and receives the nodes about to be dragged as an argument (array) and the event that started the drag - return `false` to prevent dragging
		 * @name $.jstree.defaults.dnd.is_draggable
		 * @plugin dnd
		 */
		is_draggable : true,
		/**
		 * a boolean indicating if checks should constantly be made while the user is dragging the node (as opposed to checking only on drop), default is `true`
		 * @name $.jstree.defaults.dnd.check_while_dragging
		 * @plugin dnd
		 */
		check_while_dragging : true,
		/**
		 * a boolean indicating if nodes from this tree should only be copied with dnd (as opposed to moved), default is `false`
		 * @name $.jstree.defaults.dnd.always_copy
		 * @plugin dnd
		 */
		always_copy : false,
		/**
		 * when dropping a node "inside", this setting indicates the position the node should go to - it can be an integer or a string: "first" (same as 0) or "last", default is `0`
		 * @name $.jstree.defaults.dnd.inside_pos
		 * @plugin dnd
		 */
		inside_pos : 0,
		/**
		 * when starting the drag on a node that is selected this setting controls if all selected nodes are dragged or only the single node, default is `true`, which means all selected nodes are dragged when the drag is started on a selected node
		 * @name $.jstree.defaults.dnd.drag_selection
		 * @plugin dnd
		 */
		drag_selection : true,
		/**
		 * controls whether dnd works on touch devices. If left as boolean true dnd will work the same as in desktop browsers, which in some cases may impair scrolling. If set to boolean false dnd will not work on touch devices. There is a special third option - string "selected" which means only selected nodes can be dragged on touch devices.
		 * @name $.jstree.defaults.dnd.touch
		 * @plugin dnd
		 */
		touch : true,
		/**
		 * controls whether items can be dropped anywhere on the node, not just on the anchor, by default only the node anchor is a valid drop target. Works best with the wholerow plugin. If enabled on mobile depending on the interface it might be hard for the user to cancel the drop, since the whole tree container will be a valid drop target.
		 * @name $.jstree.defaults.dnd.large_drop_target
		 * @plugin dnd
		 */
		large_drop_target : false,
		/**
		 * controls whether a drag can be initiated from any part of the node and not just the text/icon part, works best with the wholerow plugin. Keep in mind it can cause problems with tree scrolling on mobile depending on the interface - in that case set the touch option to "selected".
		 * @name $.jstree.defaults.dnd.large_drag_target
		 * @plugin dnd
		 */
		large_drag_target : false,
		/**
		 * controls whether use HTML5 dnd api instead of classical. That will allow better integration of dnd events with other HTML5 controls.
		 * @reference http://caniuse.com/#feat=dragndrop
		 * @name $.jstree.defaults.dnd.use_html5
		 * @plugin dnd
		 */
		use_html5: false
	};
	var drg, elm;
	// TODO: now check works by checking for each node individually, how about max_children, unique, etc?
	$.jstree.plugins.dnd = function (options, parent) {
		this.init = function (el, options) {
			parent.init.call(this, el, options);
			this.settings.dnd.use_html5 = this.settings.dnd.use_html5 && ('draggable' in document.createElement('span'));
		};
		this.bind = function () {
			parent.bind.call(this);

			this.element
				.on(this.settings.dnd.use_html5 ? 'dragstart.jstree' : 'mousedown.jstree touchstart.jstree', this.settings.dnd.large_drag_target ? '.jstree-node' : '.jstree-anchor', $.proxy(function (e) {
						if(this.settings.dnd.large_drag_target && $(e.target).closest('.jstree-node')[0] !== e.currentTarget) {
							return true;
						}
						if(e.type === "touchstart" && (!this.settings.dnd.touch || (this.settings.dnd.touch === 'selected' && !$(e.currentTarget).closest('.jstree-node').children('.jstree-anchor').hasClass('jstree-clicked')))) {
							return true;
						}
						var obj = this.get_node(e.target),
							mlt = this.is_selected(obj) && this.settings.dnd.drag_selection ? this.get_top_selected().length : 1,
							txt = (mlt > 1 ? mlt + ' ' + this.get_string('nodes') : this.get_text(e.currentTarget));
						if(this.settings.core.force_text) {
							txt = $.vakata.html.escape(txt);
						}
						if(obj && obj.id && obj.id !== $.jstree.root && (e.which === 1 || e.type === "touchstart" || e.type === "dragstart") &&
							(this.settings.dnd.is_draggable === true || ($.isFunction(this.settings.dnd.is_draggable) && this.settings.dnd.is_draggable.call(this, (mlt > 1 ? this.get_top_selected(true) : [obj]), e)))
						) {
							drg = { 'jstree' : true, 'origin' : this, 'obj' : this.get_node(obj,true), 'nodes' : mlt > 1 ? this.get_top_selected() : [obj.id] };
							elm = e.currentTarget;
							if (this.settings.dnd.use_html5) {
								$.vakata.dnd._trigger('start', e, { 'helper': $(), 'element': elm, 'data': drg });
							} else {
								this.element.trigger('mousedown.jstree');
								return $.vakata.dnd.start(e, drg, '<div id="jstree-dnd" class="jstree-' + this.get_theme() + ' jstree-' + this.get_theme() + '-' + this.get_theme_variant() + ' ' + ( this.settings.core.themes.responsive ? ' jstree-dnd-responsive' : '' ) + '"><i class="jstree-icon jstree-er"></i>' + txt + '<ins class="jstree-copy" style="display:none;">+</ins></div>');
							}
						}
					}, this));
			if (this.settings.dnd.use_html5) {
				this.element
					.on('dragover.jstree', function (e) {
							e.preventDefault();
							$.vakata.dnd._trigger('move', e, { 'helper': $(), 'element': elm, 'data': drg });
							return false;
						})
					//.on('dragenter.jstree', this.settings.dnd.large_drop_target ? '.jstree-node' : '.jstree-anchor', $.proxy(function (e) {
					//		e.preventDefault();
					//		$.vakata.dnd._trigger('move', e, { 'helper': $(), 'element': elm, 'data': drg });
					//		return false;
					//	}, this))
					.on('drop.jstree', $.proxy(function (e) {
							e.preventDefault();
							$.vakata.dnd._trigger('stop', e, { 'helper': $(), 'element': elm, 'data': drg });
							return false;
						}, this));
			}
		};
		this.redraw_node = function(obj, deep, callback, force_render) {
			obj = parent.redraw_node.apply(this, arguments);
			if (obj && this.settings.dnd.use_html5) {
				if (this.settings.dnd.large_drag_target) {
					obj.setAttribute('draggable', true);
				} else {
					var i, j, tmp = null;
					for(i = 0, j = obj.childNodes.length; i < j; i++) {
						if(obj.childNodes[i] && obj.childNodes[i].className && obj.childNodes[i].className.indexOf("jstree-anchor") !== -1) {
							tmp = obj.childNodes[i];
							break;
						}
					}
					if(tmp) {
						tmp.setAttribute('draggable', true);
					}
				}
			}
			return obj;
		};
	};

	$(function() {
		// bind only once for all instances
		var lastmv = false,
			laster = false,
			lastev = false,
			opento = false,
			marker = $('<div id="jstree-marker">&#160;</div>').hide(); //.appendTo('body');

		$(document)
			.on('dragover.vakata.jstree', function (e) {
				if (elm) {
					$.vakata.dnd._trigger('move', e, { 'helper': $(), 'element': elm, 'data': drg });
				}
			})
			.on('drop.vakata.jstree', function (e) {
				if (elm) {
					$.vakata.dnd._trigger('stop', e, { 'helper': $(), 'element': elm, 'data': drg });
					elm = null;
					drg = null;
				}
			})
			.on('dnd_start.vakata.jstree', function (e, data) {
				lastmv = false;
				lastev = false;
				if(!data || !data.data || !data.data.jstree) { return; }
				marker.appendTo(document.body); //.show();
			})
			.on('dnd_move.vakata.jstree', function (e, data) {
				var isDifferentNode = data.event.target !== lastev.target;
				if(opento) {
					if (!data.event || data.event.type !== 'dragover' || isDifferentNode) {
						clearTimeout(opento);
					}
				}
				if(!data || !data.data || !data.data.jstree) { return; }

				// if we are hovering the marker image do nothing (can happen on "inside" drags)
				if(data.event.target.id && data.event.target.id === 'jstree-marker') {
					return;
				}
				lastev = data.event;

				var ins = $.jstree.reference(data.event.target),
					ref = false,
					off = false,
					rel = false,
					tmp, l, t, h, p, i, o, ok, t1, t2, op, ps, pr, ip, tm, is_copy, pn;
				// if we are over an instance
				if(ins && ins._data && ins._data.dnd) {
					marker.attr('class', 'jstree-' + ins.get_theme() + ( ins.settings.core.themes.responsive ? ' jstree-dnd-responsive' : '' ));
					is_copy = data.data.origin && (data.data.origin.settings.dnd.always_copy || (data.data.origin.settings.dnd.copy && (data.event.metaKey || data.event.ctrlKey)));
					data.helper
						.children().attr('class', 'jstree-' + ins.get_theme() + ' jstree-' + ins.get_theme() + '-' + ins.get_theme_variant() + ' ' + ( ins.settings.core.themes.responsive ? ' jstree-dnd-responsive' : '' ))
						.find('.jstree-copy').first()[ is_copy ? 'show' : 'hide' ]();

					// if are hovering the container itself add a new root node
					//console.log(data.event);
					if( (data.event.target === ins.element[0] || data.event.target === ins.get_container_ul()[0]) && ins.get_container_ul().children().length === 0) {
						ok = true;
						for(t1 = 0, t2 = data.data.nodes.length; t1 < t2; t1++) {
							ok = ok && ins.check( (data.data.origin && (data.data.origin.settings.dnd.always_copy || (data.data.origin.settings.dnd.copy && (data.event.metaKey || data.event.ctrlKey)) ) ? "copy_node" : "move_node"), (data.data.origin && data.data.origin !== ins ? data.data.origin.get_node(data.data.nodes[t1]) : data.data.nodes[t1]), $.jstree.root, 'last', { 'dnd' : true, 'ref' : ins.get_node($.jstree.root), 'pos' : 'i', 'origin' : data.data.origin, 'is_multi' : (data.data.origin && data.data.origin !== ins), 'is_foreign' : (!data.data.origin) });
							if(!ok) { break; }
						}
						if(ok) {
							lastmv = { 'ins' : ins, 'par' : $.jstree.root, 'pos' : 'last' };
							marker.hide();
							data.helper.find('.jstree-icon').first().removeClass('jstree-er').addClass('jstree-ok');
							if (data.event.originalEvent && data.event.originalEvent.dataTransfer) {
								data.event.originalEvent.dataTransfer.dropEffect = is_copy ? 'copy' : 'move';
							}
							return;
						}
					}
					else {
						// if we are hovering a tree node
						ref = ins.settings.dnd.large_drop_target ? $(data.event.target).closest('.jstree-node').children('.jstree-anchor') : $(data.event.target).closest('.jstree-anchor');
						if(ref && ref.length && ref.parent().is('.jstree-closed, .jstree-open, .jstree-leaf')) {
							off = ref.offset();
							rel = (data.event.pageY !== undefined ? data.event.pageY : data.event.originalEvent.pageY) - off.top;
							h = ref.outerHeight();
							if(rel < h / 3) {
								o = ['b', 'i', 'a'];
							}
							else if(rel > h - h / 3) {
								o = ['a', 'i', 'b'];
							}
							else {
								o = rel > h / 2 ? ['i', 'a', 'b'] : ['i', 'b', 'a'];
							}
							$.each(o, function (j, v) {
								switch(v) {
									case 'b':
										l = off.left - 6;
										t = off.top;
										p = ins.get_parent(ref);
										i = ref.parent().index();
										break;
									case 'i':
										ip = ins.settings.dnd.inside_pos;
										tm = ins.get_node(ref.parent());
										l = off.left - 2;
										t = off.top + h / 2 + 1;
										p = tm.id;
										i = ip === 'first' ? 0 : (ip === 'last' ? tm.children.length : Math.min(ip, tm.children.length));
										break;
									case 'a':
										l = off.left - 6;
										t = off.top + h;
										p = ins.get_parent(ref);
										i = ref.parent().index() + 1;
										break;
								}
								ok = true;
								for(t1 = 0, t2 = data.data.nodes.length; t1 < t2; t1++) {
									op = data.data.origin && (data.data.origin.settings.dnd.always_copy || (data.data.origin.settings.dnd.copy && (data.event.metaKey || data.event.ctrlKey))) ? "copy_node" : "move_node";
									ps = i;
									if(op === "move_node" && v === 'a' && (data.data.origin && data.data.origin === ins) && p === ins.get_parent(data.data.nodes[t1])) {
										pr = ins.get_node(p);
										if(ps > $.inArray(data.data.nodes[t1], pr.children)) {
											ps -= 1;
										}
									}
									ok = ok && ( (ins && ins.settings && ins.settings.dnd && ins.settings.dnd.check_while_dragging === false) || ins.check(op, (data.data.origin && data.data.origin !== ins ? data.data.origin.get_node(data.data.nodes[t1]) : data.data.nodes[t1]), p, ps, { 'dnd' : true, 'ref' : ins.get_node(ref.parent()), 'pos' : v, 'origin' : data.data.origin, 'is_multi' : (data.data.origin && data.data.origin !== ins), 'is_foreign' : (!data.data.origin) }) );
									if(!ok) {
										if(ins && ins.last_error) { laster = ins.last_error(); }
										break;
									}
								}
								if(v === 'i' && ref.parent().is('.jstree-closed') && ins.settings.dnd.open_timeout) {
									if (!data.event || data.event.type !== 'dragover' || isDifferentNode) {
										if (opento) { clearTimeout(opento); }
										opento = setTimeout((function (x, z) { return function () { x.open_node(z); }; }(ins, ref)), ins.settings.dnd.open_timeout);
									}
								}
								if(ok) {
									pn = ins.get_node(p, true);
									if (!pn.hasClass('.jstree-dnd-parent')) {
										$('.jstree-dnd-parent').removeClass('jstree-dnd-parent');
										pn.addClass('jstree-dnd-parent');
									}
									lastmv = { 'ins' : ins, 'par' : p, 'pos' : v === 'i' && ip === 'last' && i === 0 && !ins.is_loaded(tm) ? 'last' : i };
									marker.css({ 'left' : l + 'px', 'top' : t + 'px' }).show();
									data.helper.find('.jstree-icon').first().removeClass('jstree-er').addClass('jstree-ok');
									if (data.event.originalEvent && data.event.originalEvent.dataTransfer) {
										data.event.ori�x�~�:,o�X���)�/s�g5�h~f]����3w�j�y���o�tNs�?G��N�_U˅��os��%�ǋط#8���qe�7�e�-�פ�wG�ϝ�ƛ|uن���G���������m�/���Cz������g<�������w��ͻ�/��KO���?�����R��y�̸��^��������\��������{���&�QY��&��N���L�'x=����<��o��/�^)��{V�9����<�Z�~oߋ8{nD�y�����������W�>�̿z������)�����������3ݦ�
�=���?7|������tn^�������������뻸�h��y�8����s3���C�Lk�_��������6�]�h�߸������2�ږ�iSw������}�_�YWy�7�H��e����
<��oy�ϯ?�]��_�ޮ�[e�����_�k~:{���wɺ��~�^vZ�3,�?q_}����`����_R���߯?�
ww�cf���o�r���݅��������������|+��G�F^<���w��������/�'=Kx=�t�~M��mK����o��'��m���{�M,ݗ?�{~������7���жOv��V�������ߢ)�������Ѿn�w翵O!�7�e�ߨ�����{JS����S/�O���������Π٧Ͻ��o�����>�ǽ
u�_�i���E������u�������/����k�k�����(�~�����}����3��:m���[���3N����wi��_sf6{&6���{������ṷ��N��u�_S�����W��׹���ݒ�r���^�o�X�˻
��fo���s3��d��N��Ox�f�g��{����w���3�;����	������ا��?�y�7��������S1������|�ҷ�9֯���~5����Y����x?���������Z�}���k�ͭ�<��4�L˻V�G��W���w����ϵ�~n��`�����p�>�����o����PJ�/�]7M��Ս�\���u?���g�4�|�f��?b����t���f��?��e�O�r4�g�S���;{�s��ݹ7a�~����A�������Z̏����}SS}uv��s��_��3���Y�׺���^Wa����?}��x����O����w��_�Ґ����|��>���ݚ�t��7w�u���dw?=�\ӷuW�~��[��켭����uܾ)�_���.���/��<-�<�.s3�5vw�����a�����f/�T�1��~Σ����ѣ�{����Kb����5#����uc}�{��E��6g��\߁���eߏv8�J�]�����8���W�Fp�H��HͰdɖ7J�7���?���}�
�Ws��?�!=j�j.ݳج�W���?"�?�A�k4��}T���|o����b�7�_c�o�Cc���{j�����擬������{�?�t�qz�7��wx7s�������u����������ئ���e��S�5��;n���,�qw�m�_�u�Wne����{f�����l�͛��S��*����˧����g���5��}�:Ic/s�<�w�so�g�T�]O�`W�׿T�t٬�vb@��´]g��[��_����{�Oʱ3{ϗ����b�;�>���[��3wp:`�/� -���b��i2��yQ]�}!MQ
("
�R E(K@� ��:(@y�	� @*�R\��2����5��r��H�G3�U� ���Dq ��	0 Q�0-a a�1�M�àH.�b8�M�BE�_P�F$�))!5(Y)�2��}b�$�@T�D	"�� �� d�I�I�H@ �xQ�:9�C��G�(� �14� l��@ !���BB+�@�jC�#�
��$�TA���	�ڥ�-�'� �40Lq�GCt!
��r����^�H$�(A+��+�C����!��h!��� �R �(�RlPz+H�H �� &B1
DXa+   �� j1�m�Q � �Cx~� PH!�jf{*�$��0 0P}�!� 2W��=H'���� �@G d0�D��`*!4 ʅ-A 3��"����I�v ��RP� d������8`-��U�iHt�Qk�Ԡ[4�PYU(��05��'�4����0% lu̸ �H�2��G�HVhe�����O��S��&	���':��D�@� ,aV,�� P4H̃@ @�_"!f(2�$���D4�()x��s�	8� ��'`�� 0A�%,��� ?���00�@�f#Q��quJ�+ �Ƅ�}��bp��P�qp0 i �2CO��8AP� �@��@�eX��&
�/=�t#F� � p�QJ �!�n2�κ
�B# g�6 7TMFNa
 �J�`d	JI�B�$Z�츍�*DX :`	A�� @�4�0`� V"��d<qFh�!2@� 	��̥��0<�	 j��1��@&�	,�DB@�N2�aI �	hV���ę ��E�l)��$ �Ȃ��CrƵHDCV ��1�T��VjNB��' R���@@H�ACk���$��  {��2adXN�]�d@� �i&"% ��2$"�3- 87 ���CLS�A"�A�鐠x� Ѐ#H � �J&���� P$��0 [� *4�gL��`�9�%өbm E��� %�M����1� p �jT؁�TT��I�%E�X�T7� @ "��@?U�Х"�	|	PS�$@#e@8y� �Ș(X`����z ��,0 �L0��0P�̂& Q*X�
�2�0�"�|C !�#�0`x��2�Vh����*��f�@
� z�3AT���Q8 ����q�OA"�B�)
� ^ D!up3CP�v�Eik�CD��V���B��4�h�*a$����V��&,A[!���h1p�� q0� �!�T(�HD`�@3A�XK2 r��
i`@`L�E���'
+�
LN�����90Ę#R�`��FL@�)48�"
��g��ev$ #I�Dg;�#� �4A�ր�ـ������4D`,�(�S�xf�@A�@�*fRC4�Y<�	�
H�*� H��8cK���#h0
��pe��@2���@XH�9D�D��W�GK�y�1�r� `�O�dZD6 ��@R����
V��0A@�J��`H `DYkc���*5< 1Q�E�A7��@��5f@�BC@�'�s؂�&B$ ��QCDI !J�r��y�X�L������r0�IW�Bz |XB Ar!\� 
��pa���3��m��$�I"% T\�\v�1D" �X�
5���h	Hh�`UGD��$���� 4EGh�0�����PpFb��ܐ6&�L� �Eo�
�&%��8��0�PC��\BRnD�2�D41\��6D5APW� �h�TDQ �1J@
"Ƥ@% !�|
 /��"P�d�Ӊ��Pf�� �A�@r �d�+����� A"E=�� �He��1�r�>p�ar!�2�! ����F2��	ؑ/o���
a�	 �f̐��])щn0���i�E �'؁�0a6��ʷ&RS��"
�
����L0��I�!�DI"@H�,��jZQ�B�eN�"��Q�@��8��PBK� a�ddX-��C	 {sl���G!�/���  K`4��ǡ�����*Hy�����H 0�2�G��C2Ã���� U���M����;�&  ��&0�p�9��� �
H�օ��h�4�P� lM:�R�,$�Ҵ4�(�L�QcC�`zJ�$���W@��C!`bv_;9 Eem1���
3B�ǈo�FL8aHU�^ � DMp�S�!�UAHf,��MlF7�MY�� @��CM0���3��L�	pT�sY� @B�Cp!� �&D$#6  A�4 4��2;t��A$'C)�	�Jd $Hr�C�
� P%�i�۴J�x2�@@`��A&���#D !ԩC�V�(�TB��6������q��#0�@A��C�<�� *�l�I���1��9ᄝ+��`94"zN �u�碫JRݧ�Nɀ
 1��O�D6&���	h��@~�a  �
0y�H��`]D$K�%�E�p��@��
��C��  �@��M��z� ��!\`�(�24�B
U4�  q��I��5����D$B\E�����hD��,D P���x6�

F�����p�#�Y��	A�a�5��J�nq�l��a�I"���"���l(x�� ՁZ�N��F(U��@�Ȑ�pa��J�Lԗ����&hA���c�p��H�ޕ�(��L$��0 A�yza�HȠL@P��c2s�V������Fy��s���lQވ��O�������b�iq��vۇ�G�����-����ۻ)���v���}������[dw�*��ű0���g��Kic��G�$��,���6\���}>�K���XW�j���ͮOH�#�@#E�P)�� Db�(�h�T�Oi�%���`F<�E�<� �� M y�If�C�* �L;P�T�ch�< b��  �	C6Q�d4DR �Ax8�Z
P��� �1) N� tP�I���1$�C�  ^�8��0ʚ JY��(
 ��A��O}�j:���q;�������R���Jɦ��������#������w�w[��ՐuB���~іs�m��wl�-��N�7�^�U��������u��{�t,�!��~�ݎK�W?�~��z�K���;����;I�+/&� �3p0��,B �;:[� Ql��
��@ָ8P����!�bR���S�!�DDS1b@����<E7�(@AL��0;�E�����2l ��.��,
4��"Ji� �$�	(* �S&���(�K�4$<�(�@���P*��(� �B$e @$�-R�@pY0a�&,c0�3E�&0�� F!�!�P-�H�����%� � &�B��b��`x�bda�%��V
��C (J�F@� 
C!" �a#Md  ��
�	��4ߖ溗�_���~��MnW�VzU���zEG���
�}��E �4�"�`�B?�f8��Ӱ�d����0w�4A�O@2���; !�c��>/b+yK[�o�L^�Wl�v�;�{����LRy�J3~�ͦ<\�n����K�u]O6)�Y��Q���-�n~������w7a�۹���Pί�q2Gh_���۴>�u�%�3x��۠��j��<��V?�gT��?���u��.����#�6k���B(]ocnO_�_%�6F��'�����.ݷ׷���o_�2�>s��^���c�n]d�%v���J>3�w�q����[��_���2[��皿z�r��g�o����?���73��2���@r S�48	�B�)-���<-`�d@��
# 2%Q$0�L�نl�	�$�\��$Fu��C"(�P8�#%p�d�" 
����em �������B�I $(�d���*���f�pʑ��IA��� r���!�C-`�Le �Z S�@ED���Hw � ��K�$
�Nn�$@���!g
�(����nm�ACy Z��A��0�%�B��4�	[ʀ4�� [n}��\J����r�{�l��^���z��-��}�v�^b���^�{@��N��C�����Io�W�]a��W4Svz���,^��}�^�񩟽�uW�̴��ճߟ�}w�G��q��zN��_�s^��5�� �@h&
�$!l�! !���
 &L�x�2`$
�!�`�"�M�2X!� �$@�{��#ހH�B$B���2l���A  
4Є��00�Egd,@3��	��!��c��\��p����h:E��0IA68�#� �^��@iA��K 0`H QD$$@턨��� d�( Q`�H�[� s ,0@��0	�-dd� C]���h �j�fxl FCҀ``&�wk_��<���{ϾOy����ں�u~���_/�����em��g]wzQ�|�~п{����� ��˿�Fɒ,�/�����Q�?�_�
M��  p ͈� �6 
þ
�coj���r�y���=g|���� �����Me��-֦�3�m�����u���Aj�/�:׏��m�W�w�5�GmG8�
@���[�#� �w��Uw:r��;�ӧ��p�j�q�)��� �t:�@$HT�&�� � ����F� ��=�d	�Q(p
  ��
^$Y>&��`��9Ā�AN� ��C����`8!Z�0d�"�X"[Rl�x�
 $����Q0( AIC,��+�`@%� E��T�ƨP�a
Rv�
�$r�CX�fG� �%Nx0Gs H� )x��@�+�2��@Z*�� 5�n�-L�Y"B�ΙMl�  �����u&HKn@�M違���6���y���-�Q&^��������eO�W��������?��K�1��~��٭o���|�V�I�����׸��䅗]Y�w{F��'���K_�<�g�nyk��ͽn�ŀ�Z�H6����>��>��\Y���{�~���7��v�ݽ?�͙��?��Ϧ�/�����~+g�{��_z�w��Q�9�O��y�{��~��������.����~�|�w����ꦝ{���~��}�������ӿӻ��?�z��\��}����a}�)[".�@<O��I*!-WC�� (!*�T 	�\�(���8L��ڠ�؄*O�@t� �W1L)-k!e�J��B��xS @m�����%i`��J@!@���1$��HZ ?{����

p��
���B
D	���gq�@+�
w7w�Y�@*��(4�H�2��EA0P
����Y",0v2���"�Hs��=�~���}V�[������=����?)�BڻU�M۳����ϼ�-��/}������������}��9�������5�����g�޶{}�������w��=�x��l���x��k�ru����������y0�b!�'7@B��� $A
@G�
X$�'@�� -��BTSE�v��5$�-!![�<P8��#
H)�4b� � �E��XIfu$i@��L�CT��b�}}T�E��*s��53������������e���/���h���~��"�;��]�����w{&g����f�R��l�8�����}��u���Ӿ��g����f]s��Ɨ���W�~���|]�"o�����6���r����ͱ���|o���-]�����|���`�>�}����w�}����˳���k�}�������-��;�_�/��K���\������ǻk{˥���U���߻�}�����c���7ӒO�g����޽���o�q߻��������N#�t@(⪃V�è���5	�&� ��e�x��1��8TJeT�nX	$$$ ����EXH E �5
}-@he0��HB��@���
 T�I8@	YM+�Q�J" j���c��~q,����=�Uu���?&��δ?����������k�������6�_��Qv?�o�-ـ��\�����:��{x���#�eO*_�o�#���o������k��O����{����@w����[J����@$��M��"H�,��d� TG�5�|D���'A�vV_X PP�R@4�Uj�P���3H@T1҅��  �a��H,���)���
��s q��
�� ���! @��;*�G�A�q���&��W����� �4��>V�H�`� �3�4h�Dzb�#b5�YvF$A���o J?sLI����B�d2Rפ<@ ����N�p �1	�+p0HQE��2Dnߛ9�����������/������]���_����k��������z���os{��s���-��o9�B��j��u_��˺+��w��?��мO������?_-�.�S��?��q����>�X��k���
���<Za��
�p�d
�!d@�Q�0؀�0DElhj��E ��������1�0�w	�^�¥�@�sq�R�D��I�f�~	E�PZZM��B`d! 	�1j	a#�01%%	&��@E��C
�j�9�0围�@F�����w�
�<

33�����P�B䨐J�ݒ�@!�",����r,�KH����� 秔���A������5��e��k�[�Kg_�����c��;�x]w����p��{��?�����y|�g�v��޻��fG_uqW���}�������g[�j����>���s�~���{�������i��ݹ�=���r��������]c��7���������s��&�/-o��
S���V_���:؄�m�!Y�۴I[�GVF����6і�|��s�z}m��3�|z
?���=��{�/>�>��-���9��п�_���=��_�\o���_�}ϫ~=��~�*~�����loY�۹�a����|��/���3��i�[\�Gd»����W��{_���������V��k(�??���~?��o��m��dC��r������ޫ�Y�kw������Z�ޛǑSzq��Wrs�����4�ΟX��'xb�9�x[�����A����2������^y��������6�g����~Wjtc���Y:�}���}�;�t���8��}{���������T�b
��wn�=n��{��#�׿���������?{�z;?ڍ�=�w���$��>���nxyjqڻ{��}_���F���α�G��_���ln׫�|����i�F_[ŗ��=^����>M[�l���)�l��~���!��3.W��c>�n���ז�On�W7��@�w�}�~?h}�_���G��a�ꇾ([�r�ƿ��X~��k�o���������+���������>��?�t���nM���[����o����&6}�W�~����v�����{���4�����w�����/�>�����m�E���]k���wN?�Ͽ{�/�������}���ҪGW��[�������O>'�X��
������q+�y7��-��1s\���m�ww��?��)��s_����p�����~:+gl���ww�ݫ~������?�W�^u���w��9z����ڸ�R��Ŷ/qI����Ա�}��ym�7�Mɷ���W�C����x����w/�qQo�������ڛ��}��V�W���T�I���#������υ��^E�>�׿�Qs�F�?ӷ�D����s�k���?F^��v.�]�� 1I �����\�EFB!U�XA*@�
��d"D�aG���@�Ă�e<�� @��IH ,�#��B�Tp� ��2�X���  HG!D�AJ�2�������$ H�'`�(JD|�0��dX� T�m�i��r1��H�х�fJ�A��0!�XF,��CBP,B o� ��2�����#ePA�1��K ]6M0�#H ���0B�����څ
 ^Ŋ�K2�k@*��xHJ,�""�5$C!D<4 D"pėR( �š!���Ѱ�����JB�E6h�>7@	���B��5A�`�Q(`/�	I�PQ$��M@�5�FF6
"��j���4� @#$�J�+#I�p���"¨ �r�p�(!]*(��� b
ʥ&4�@"P�%+Ƞj� a�B5�J�p!/C��	K� %�Xw�C�0�`*6+QAb�
��O�
E H��pB(B<	 
�Q�����@�	
�DJ�H�&�XJ$ELP� l��HHA�r�@X�����h@��qF� &+0����4� �� `�����`(�@�]@\f���V�%�%����T]鸑����\���V8ءf �0H��"�r�s�� w,Q�֕ �@"C&�('thA� ��Fd 0"D=-%�<B � ��KѦ4�D�P0	�4w�	B��Q��Z� p��&
5�0]�-�
BЂ������0���A�"9�
�ea���W��K@�"=P w
��@@!�Ar��,<�
p�\�N`E�#�d� ��01�w�s��F�ɡP�� �dDB���$#��"p =h|C @#p0�	�1��q: ,`+8*��Q"L#`hp��G
*�"DAH�(@S`�]�x�m��C$�Q'�QDt@�3Q*�0� �L�Ja�
h��� E�!�K�"�p|�q�ed�6��Ё�@��8 {" ��E��	P����5X@ ��E̠>��.(d�"
(d��Z%M�$@C��J�­�@1!�	�a�Yt "�(���	w,�$GH�@��

(���,P�L. e��WL�QP L6A/q�J��S��]
�leU!�^�I�� 
�%���TD f����0�2��!@�(�0�j�b� "���`X��� ����!hC���*/	R @�C�)���
�"$�
beb$ 
R����NC!󑕠�0�\&2�a�1���")��*I� ���I�2	�+��% 
��a��%"�P��)@�0�	�$�P �����
Ho@@� �Z )YU�LU����b��  �5@0�9 LF�c��@@�@L�� 8�� C4���6;�ȰN�P�!r
 �� F�<@��� 4��� �hoXF%���N �ظG���bAa�U�Dp���H	h�j�V�p�����
�@2�D�D@�l%I�����-5�@b��f�� "A�	� ���m9�D !��I@ <@O�q3�4@� 	HQ��@ ���@�"D�DR �` H@��@  B��������	�
� ��f	��3ˡ	� �@��A >�%Ѩ��2?� C �x҂9ii�a��wgY���m�F1W`
4"$T.� ���A�l�E /�Q+W0�� ��	IY��u U�[*��=��5<}D�F��@h���0D�� )�C �C8lӿ"m�X����%\P#R�
��5aE��[�fe6vx8`��2�Y���^�8�F�b�,�E� &}    	�P�����-0@�' �`���`[`,	4B`@�� �Q��1
Qe� B�>Ch@
�aB�� @���A
\&+A f�`)a�B��*�)E�L�l*E��ɬ��@�( ���z�aB��8l0�K0�|M�
�ҋ��Ԅ�R`�!��Z�JX  "�A�
]E�c@:"�'s�� 
C������D)� S�oB�{� G"8న��v�r� F�M�B,0�M�E@CEBB� � �S b,$� �( (4RO�A��H&v�G �A ��D���D B ��@@)x���	�
��� �� H� �$�P�`�P"D  A�"��U �P ���@!� !J�X�@
Nʠ�b����i���t:�]0( *)��� ���
Ԅ0�$��[K�J�	$H
��Bb)�JHx
�z#2�Bc&�#��&E8F� X  ��@
!�Ŋ� 4�3��X0�p
���Bm0�Uq��BĘ9f��\94a �n�6L �`v�H@*�@�J"�R�' Э�.�Q3�$d$ \� ��0D����J� Yh�F�"H�  A%�A	 
�@PYM�� .�x"P �H�P��
��=���`p-$�@f
s$V *� +@b�`@꙲ a��@�� @#ˁ:�P &��W�8�!�fDu2C�@����C� (��BHT�N�$]Z),���	w E1`� ��	 [Dlt0��,I���dZ�)�B A ��D����5)� L P�
@X�P
 $R���aPUG�hT��P�&P@I��c�w-�&���P  Q"�(� ��
!	��0WF!-)AP��D�\@�� ��Qm�������D0����� �<@��$ ]R�`��( Q�D�����)Ae	k����d��H�� @`�IP"�Y�   �-"IDOO�( a0�� p��{�!  � �� �+��"6 ��<B��� xhr�c$�(@q���3@ ��� �!��	�. G` 1dB7�����d%h!���Ђ8��>n+Ȋ��@�T���g�P��'�i	`YM�*"�� �	��!H ��C��@��� ��;d���'�UYEt��AF	
_�-#5 ���4 �370D�, � �@�A��8Q"���E�
0@  ��Q@0q�#�v �
 }�&�`�*`p�d!�W�M$
� � (�B�(�ə�2��1
d @$L��cD �D6�08V�H`����K$!
,�B�Ҁ��� �#WC��.�`�ā �����iH �T���O@�.Rd�t0��d���m�X���� �$y#&a�HP]�D �	��8`�rp��!1$���c�[�  �LB��  A�$�C2�X�8=�Tj!a����"/<����3�0�0 �Iqi ��P
@ *5,14( ��X�b� ))S� �@ ���&	�0� ��G
"�A�A`C��` �J	 �!
��Pp� xB3���a�)���H���W�D��z"����}Тq�I�1PA�BR"@Pȩv|R`I@� I�K V`A7q;� �I�4VaE��A�M`�6�!h��2�r/b7 �r��  ���&#��A�h�0���aA�S�:F���&� ���� \�QU� D ��@  ���X��n�`
�wA(�~"  �01�=@�@H�$0���@�d��@��'�Fp����H�Ĉ8���J� � �I	<2� 0�� ` *)yJK
hAA��0�e�'�{����PO,�Q#�6J� x �"� &�!R�HW9�����E��M�'P��Q*`z��+0}$�:Crb  v�=I��Z+%B%NA��P�	����"@�� ��@���&�q

ȖXтR��Q ,�0N@ � g��1$"R�� #H��bB   �a$!B(� 	 �&	�B��:��d�� �#{"	 
��M�b����%�V �C  ��s�:D��4B ���b�l �9�=����0H(�ʏ
G���%��,f����j0��+т���P�a@(Pi�H
Q����
!@�Q�aQ��0����P�D �A&"��!^� �8�-r�C �(JX�,� �  "�X �� �� 2d���U G� �$���Z��(q�@f"�abR�X A$�@d>V(�"0���P�r`sR	��  D1r���S F/�J@����D 	#"���BB��@	S�0`/�	�����at0<!�`&ZCb,$#!a�� 9�A�
�#a�A�!ؐ	��D���  U�H �  0N��5@�Hth)��*�����8$@	`�%�@h�L $�v�@`@�
�DktmP���2P��Qa�XB%�]1r���&�[M
Y` %("�)e ��B�X�$94
@9@8�
t)�Qo�lPH�CS(&�`�
PxS4�v@	�H���6�� �'Q%`(Ö�, �����b�lU�	V Lxdb��iH&�<&2���H ��$A2 �B2� ��$ ���=h��I1@x^�8�F�H��QMi�"�JX��"BP
02H(� A���*A���CqCK)G�(��e"��d�O�n��W�� N��q�44��hn� ��`I ,+)р�.C 	\�K	�d���
'�U$@�D�� ���,j
��aX�`�4� D����  @
�AAoB�@�8���D��� h ����� I�	�׆T ��� B��XK0�B�RT�(�BH d 5 @qB �D�9�# .�L�  ���
�g] 4��~E/J�:q�!(`:��
�ĪBy��*`D�Vda$�1��'Vx��P	�!�L^0��M�u����� fPAr�k=1(Z�) �Q�(����j	�4I���U ��֐0�>��$q�TO� wDR &� ��8�D h�E�r����N +zRh	
f�(J���Y�C �@�T�
���5/gp>����b��1��!�.���DCT@
�"�;�#4[V�c�4b� � ��p��  J��4$ 2;:2tl 6.@ `��ޥ���$ �
E¨@$2(SD �� �-	%D@(�( �80B "��(X �т(@�@GP@� P
 `D%aB!*j 	�6�5 0�%� D( P�  J*=!0�I�D�K ���"QY!� P ��5@�	
��@D�A�I�D����( �"I �n��d� �L`Da b�� �)��8�0��X���DI��H��J��
A 1&S�
�`�GH�tFp�9w襄�0�*E�c�H� �`i�\�
L-!m�2!$�0͆A!H��"g�C!MC
���b�H0$ Dd��,�,DJG�4c ad�P7"kl@��3���$�� �,��2d! 0ip���p���(M�c(#@@�A�U@2X0�� 	�@�$�����)x��W��(�  2D.�R2.B0��(1"����	�� �8�$ �$G�pj@0���i �0#�hH(�!��8��@`�X� ��B�0(BT2,�
��P�  ``r��@���X�  *˔��$  �dH!0!�p*�@���D�+06@S���`����`�R��ɗ-E���&H�Lq�E�bX�!�#@`aP	�B$`Du
Q��`D��0%�c$��(\*��Bm�-� �AE	��VB ��O�4��ڬ�K �@�1 �fp	�3A0����Jfn�h% `�HxFA� @)B�* ф䢊,� "�.@�E �ֳ�@�4�L ��E� �hr�X �� R�S�=0P��!TA=�@�"�	@� 
�@ ��� Pa�c8AaO��">�Ә��4w.��T"Ņ<`���k�0�Zc�:D�,JO�	�l3˒
pЁ� 	�@](��1R��ݷ��\C�F�	o�$��8Pk(,
�G�!@��" P	ڂ@��
� ��ʣͦ�0��ň""�-"~�D��ˤ΀�  �H �j��R��&��� +!� �B�Y� 0
�P�	�� 8$B< `5 
��� W�N�DE�U
�	 
�5
%1
��D@SX@Z�1 �
DCP/ S8�8�j ���RB"f�\���EP���@ �H%hpCA â����
��-���$( >��������� "�,��B I� !P2� D�a �	T�  �P.�N��"[!� �1� YDT�B
�  ����� �������Q)<m GL+)��OW�	Cˀ`�A����h`�� $J�ht�Y+ ����s��@
g�	g��p.VX ��g id�"��' Г�ꅑ  ���"�qE��Ȃ0��F�� � �@fib���a�0�P���4 ��F�Z#��E��P�3�H �� ��L� $���&�
�����@M޹I@"�@���B��� 0$ %(�td�@@���5Cb ��� ��@1��,�� ��
1*4 �D@��D���C"�H�!	��� ���ŀ"2R�I�"�j�B�8q��!�P	D`�e {�^G5� �4u�@�)փ�  ANA(B`mL��@D��N����B��&�DQ��`0�h �"�����062 I���# �D���,A��D�0%�"��2#�	0@O� ����r��� !`u:ȊaXA��`0B!��bڱ@��>0� ��Q�� 5�  *��Pp�� @P� D���qRA����'8TECBĐčH��NB�$ �+��� �p �P�y  @(;� ��cJ �.L `��Y��$)	 	ĐR D� f�c�G(�H@  J�v�=c�
�`�@>pi��FDbD�a�(�GE�2@Q����MSє��"S �  �� �-�%�Yp< &���$� pH�,A D�pH$p�R�I�H ���A �B�[ �%�7"' �I��U`V� C�@DER�P@P�&Q�( p���� V�<�8@ I�b͉�`	n�A �eFqG��H0�b�$S@
����$�A��_{��  ������-9 �,����@�CH"#`tF"ZX�%(iZ8QE$�	 �4�b
!�)���JV"" ���B���9ځ���!���"آj��H�(���S�6#�� ��cƢ����N�B�h�QV� �!D�D�����i�	)Hy��Щc�X�d0E0L	L 
��&��.��L�$��a(g�	�G�Ā��` Dt
U �iP3R��cM0W#��1U�	��P�V $��N�ӠaІȗ��Md����`ѐV� �x8E� ���:	�� P2�) � ��H����d$R�DD�R'ĕBRwR�a�uAFDPFK  SՇ��2� d��H���nN��%�T�BI)��ӡ��7+ ���6b
 p\��H �hЃ�� ��l���)� +XB4 ��l2 ����9�/�E$�DZO�ķ*E�* �&`H�D� P��D$-�ql��I�@��P� Sd$"-�� �R��ӵ��!�/$�6.b8�,�!a�
$�&Q�
�A
]`��%�����hh��Y�@@c���0 �X�2a%D6� F�)���0s�A��U��DD�" ���>1 T,�@!*��9&���
.�
P,BF&Pt'��Pq*�?���18��'" Pd	%�x� U����$�D�U7R�E8 4  � ��
P+_#X���F��P����#`@��(��0*0�-J����Xx
��9P8�,		@�(� .�
D!A@
�H���0%�D*���8
U@�"���@ @!7(  e�QoH!H� �#�f�PV`@L�I 8��������D�"&��Ì��
D��S"��`��P�l�+S$=BE�����$�|D�9� ���A���$���D"f@SV�UE` �X��D�9�M$6��F��
�� ��,

��A�X���*1pB�p
�r�$@����p��B���d%2t@�%���N+D D�@*�$ \:���� ������3�#� �p��a S��� FR�s��` �R�0�L	��&�	T��nA
P��J����)����P��KL"Ma��%\+N�p�bH8�Ʉc��h�������"��|�G� 
 ��  ��*d�!�*�P� x�@�DJ�t���'��!��b��-f2�=�� �(@�d&��x�`H�W��	m"��Y��zEaf������	���t�@-(��D-��@�D��$ �^% �
P�
0��p��"�@� p
[D�� H�A
C $����ဋ,$��	E��(@��  �2�bGe� ��0J�!y J Z��$"����BA� �q	��h@�2�@�
 ��5W�@6�(Pd��� � 	P�� >���$�a�&�A�d��A��0Fq��L�0 �		AxCuqd	
?, !����(%CP�a=��2� ��N �"� �!����P�%j� �1���d:P7�0 `�(0 �)�H��V�4�@�Ԑxh�0�@	р$�P	� � !_=Q��D�+d	�"� �Є�� Q� 
�m` � h9�Lj�@���5 ]�� 	b<�I� qP�D\����� B �
N��тhB��I{!�C���]F�"8��B����Y!<¦���R)"�>�
(4P����	��0�D� �:FKIa��EDH�9!baBJOD
I �6D3�̂ /I @��>���-�@�2@Xac�5�0�<��(W@:JA�P#�b" D�2T�@ґV��]�R����CB@�B��H�)@H�X&�0�`�����T1�-l) j����0BhL\XCSd �.�!�G�XǢ	��2� ���p��� �$^� �B(�U@�KHd�l��&�M�@D �H  !h�h 0
�v �J@Ѐ&pR 0D��P+1$�k�[����>T�>2�N�c��BUb.�B,Vr�������h4�wK�a6e(F"� P����hA��A	)�bc 92)pV�p��&�8����� P9��E6
NAh2��Y4��@A�s����&B�[�]!�A�*&E���.r�!A`���NzH�D.U�F���q FZ l��Ti@I%�$�(�0%�0�SP��
 @&�B )"����j"�A��2A�!ą�AD؀$	4� �+(J hV���������Ia(X�C�d@0H,����B��������1Y :ð�mLb �! �a��0T�2D%9B�I�  $�%*#�IAd���$�+ � �H��*^E$�^��Ÿ�!�!��D����""��  h�AG*@�� ����"T"&A1r�]�CE�@ S�Q(D0(D!@H =�1%���C�d�B�G}
DAh�R@� �� �$ � AyU�R��ap�h+��L�6i����E
t�N"$Ò�v�E+-9!0!�oa� J0�!P
�ILS�{����
@$� ��� �� @�ne��P@b�@(��
%@�Adb ���� PDA�$(4��AC5���U�@D��`
 PDH��mL�
ML��II��CS��#� (8$X.�  �
��-P���"@�P8A@�"H20� � 5R:�|!�d$D�� ����
h���8�*D��r p�0&h�e
�2PC� "� EI�L�������#�D7]� Ȝ"4� 0fD0!@����w�MU�p@"� ��� �M0Bd��  Tθ=� �"�؜MPR��iT'H2��J���� �L�NQ�F�"��ˆ����p|@tZ�"m�Y@!)�� ��> B8�TV� 8�kPV�(� +2VP�$��a"T$%���I�C�(A^N��R� h
p$3@���"�0�M�Q{��
�$��r�P�A�A)���FC� ����4� #,�*�%`
�@( ��Q��J,�
��" 元����Wv��������Q�c���-�������k�M�ݾ�ǥ��|���6���^���D������������������^��W��oi�o���������KO�������{�����W'��CV�ݣ�{��{j��g�w���?����}�M�~�_�W���o��5������~O��8��4��<��������g_�Ê��/���{���������M���cd��_���;�ݯ-�5����������s'{�Oޯ��7��70������n��k��^�_�.�;�^c�������e��j��z/�+F���uͶ�i��	���Ž;j�x�~i�=T���Ǐ>?!���y?�[���n����s����|u�����r����gGA��f�T֗��%ܖ�N��=7���.o����_�?��5�{�6����>�o3���z֜��^����/=�����2�L�;������~�y��:���]���}�k�=]Uof�g�}�����47[����"-�[߹��]ݿ_W�_R���
��.�W�͐�|�?�kH���n��<��T�o�8�O�}N�l�R�ԗm���l��t��2m����։j���]S���e�q���ŏ��OG�%f5��M��}���g��އ����mLfe���U�W_��'���x��ÿ�3mbW����/���>��G�R�_.�׾ޫO��?�V~�#���wt�ڢ�������x]������b����[����u��j���.��]T~]�x��������瞥b�斷��g���}����z�߿�����{o3���n���y��ڶL��*u��}����{�������{���}��?��=u�IEս��[�9�׷���+U[�߫��������_����;wܩ �����[��{���'&��W�(I�f��_o��&�9�����?�����P}3���{��:��!����ggI�ߌ��{��T��+8Y��Χ�}k��z���]�N�{�0��`��4�q�֯�*X[�6�՝W7~�E�f�����他l{�?U�V�9��ه9W��ѷ>6��=��~��="�{�����߽�o������8�xwo������⿾��N������.7�}Z��{��{c�k}��	���?ݳ��\�)����j�~�z��䖉��ޣ��J�~~u|k
j�O�!��~�?�q���jg�����^���ӗ7_��������s�|{�սk�n��[�>s���o�y�r���{��_@�.o~�~5�|q�l��'��k�9﮶��;�o��T+m'r?�{t����^m���:��c^�_�+�k=��o���vi�y۪[ܦ����S��k�w�_9hgu�ӯ�|nr��lt������_׷�Ե�w[{&��V��o����C}gJ��8�]��V�7�<�b���*������j�9��]��|�/��R�>��[>y���|���{�����k����:���o�z����������޿~�o��r���3��翮��������%���|�����L�X�km��O�\Fח;���uS
��WN�UG��?�����/�y������e�-=�5�v����r�����".=O~�������L�z�_Է��mYg���p��W��
�>��U��W���o��vƂ�ܺ_慑N����+s��t�̞�]���6�s�y�0��yͪz��2�W�g�[o����^v|�����o��~O�����j���M��{3������]���=q}y/%�]��G�����o州�<��ݽ�羷�����������+|׫���8�����~����_|�S������*���jϥ����Ue�ͮ�|s�����q	�f��� q4���Z��3������s�eS���O�����9�Oo{��?�}����"�[o�Y�������NW�^b<�������]��m��Zi�۴�°/[w������s��B�����������L�#��?��W�/EI��,��;�����OӮ�y�?ۇ��O�ؽ����r�}�v�0����o�&Y|�wG�G��y���ݿ�������1)?e���2���K��oo���{s��r������?f��������6��s�ߟ�޶��-�/���Ϸ��]�_����5�Ο����n���n}u����?}�oM��ϸ��ӷ�?��T�Ⱥ���w�}ӻ���p�]�O�Z��kk��������XΗ�S�w��g��s���)t�Ȝ-l�����y��{�K������������;�9�a�x�݉��:���SS;&���_�Q���;IB)K���q�.������3�oZ�_���All�6�'e9��%.����#�F~���Mk��������3�s�����+��_����ד�����߸vw����2{{9��Og����+�>n�����^���?�������K�|淗ww��w�������������l�{�]����o�_�{uKma��w[�g����t���������������l�����n��{|���������m{���V�����W�����?�������������`�s��e������7^r��;��*�i�ܿo����{�{;?�,������4`��3����.Z�3�;86?�=������:�'�h���w�|ۻ>��"������ߍ�Q��O�v��������˔3�y�q5��ҍ*J�'�9�#}��٭x3�?�u���O¯��ſ�3����?��q������^�����<3ěZ<���^�m����I���e�﹩.���V�wz�ݩ���������~?��g}�o����}Tv���n�m�Sd����ϻ�����|�,�v�a9��t��G��Z��������������~���wQ��T��Bs|��1׶E�~�ߋ��s��o�3��S�Z���k-���!v5���v�����4hG��o����n҇w�������б�����a�Zgܫ�m��7������]9L��-��K�7�<M��z�o�_��۝���W�����xn����V���'���K�O�Wo3M�{�����r�˾}?������_��O�����M�Kr�:�����x���ƻ���k��ڃ^ooϡ����-���cc����u�����=�����}��wk�A��?ӻ���7{��&��s�{-#�>��ޭߌ��ϠK�{+�q��������[���e_���G���Ω֯�{�v�m��E��������{����a����G�+z�|O��n����o�8�J������x��Z{~�_��q���;k���V{�4�VW������{r~xu�K�����d������\�g���;������-�������j��g_~�����|_(/�k�e�_7���9���K｝s������w�����K�׏��z�&� ��~������6����:���u�2��������������߫���$f�]����������߱�W5k�֚��w~���[������^�~��T�rv�ݽ�m��q�:���r�$����v���|��w7G�zQ�=﷠�K������.�`������W�����^}��������꿴O��������x�_7EW+Q�zw6�r�������C�3�����n��*;���W5Ͼ��t�d�"��vp��������榟~����cY�Ye��ȫ��O�v-�������d�����g�.�����|�΄�9����}��Vs�k���������}^ݾ��(ʀ�F����h$��� ��)�KI0H i�A�8� $Tt	`R``� @�@{L�� N (����H7�  ���!8 "d D)�I
�[�1 ���(
 4@��� bh�%��$�@	(&D� C-ȑAJ�@	1d�$S���� �e�£�Ej���g�c���{������m�c.���D��L잢����7��|���W��n{�{s����v+Ƶk���n���+����u>�6jԿ�������wO?�r����v/�?�����:�^�m��T6n�����mS�HL5������ 	 r�%�@�al�daB�B �IZ��� ṭR>E��Pd_ c"0rS	
 x;�iG@9 ����� �@0���Eh�.F4  @ @�V.@�c@��	��B���h� de`�ҁ@���	M`�3(' ��	!� r� (E�cT<��B��`�pA
:Q�B#�B�
+Hp��`!�);A\�>�p0 �"� �E!��HS PF� 2p�ؘ�;%@�D� ���w��)Ɏ��m1�֟��@'��{[�i����M�)�B�(�W��6�6v�{M-����mD���U�F��I}l8|�[ۤ������{E��|���g�-	���ɷm����vjӇ�����;�Vt���"��_��$%)*&K����V��3�ù�),�)܀�� fF80$ I
<�0P
3< "�EB
�x� �0 �r�D�0�@N�4�Ĕ$L����l.��	D#O��$b� ��f�@��+1i�|����>:w?t�����<���3��l��;j���]����P�jN�U������L�S�_�):2�Q�� �������\�m�/;���\�d�ף�>��5?σ����*�����<���_��
���(,��
 ��/����
H	` �lZ�1p8df2v ɀ0����4 �凐
�,��pP�S$��1��I�l�L(��B�%�3@�h�g���z	�fM�Sk8[�E�������$/s�y΍��s�[�=�k��V�:y��۲���m�_����ؕ����7:�ݵ�z��u�ҟ��ε湭mG�:����n��q����ѡ��k��s��W���� E5@R��� �x)$�(3��� �LB�� ��!���'���f��/�E��	 �T��$�X�l��@FC�B!��YD$ ��, E�!\�@("�@ ���M�A"%g�b@
��"��@��LM$,Њ�D	J!� CP A	X䢙� ��U4�h�2@t�D�EPq�ySD
�ف6/"$@���X(p>
��k�F�� �H � 
_6#��w��̬7O���g}M;,~����o�k�7G��>~ſ=�7�|�'��v5���B�۽����p�/����ϒ�������������S���-�Ucs՛kD���nvo��sl��r�o�J��|E����\@v�]���/7V������}��Z-/��|	g�ȟ���>���o_tH��n���nϹ�v��z��#�}�e�v�~��/�x�y�>�^�c��߳������7c����r���}�6�B�(j��E1y�D	�J֘��A�P��e�[@�̊�0@P� �������`0�! ��΀@�Yd�@�&%�d	@28L(@ �F@ ��DVx �
(@�R�cb�6��4S���z�ɿ���"�y��ٻ���4ٰҟ�_���O�H�f�WH{�����y��s��=퇶53�������Y�����wi���/�Bpu��o���ͼ�c_�Z��]����_>�_���uv�Zo~QI@B�PAA�LK 1X�!R'.�$-CA D<23E2%����9	�c�B��
	� 8 ��E/PT��Bf�L @�RAHO�Z� ��J$1$��&I�@ �	��B`
T�!�(�A�''J1+� ZB4@�=��bL
�2� ���P0AQ8Rvc�HAd�M�D� 
�~G���	�|yaL�
��`���m�Ur�w������_i���~�~�zz��~�ʜY�?\�}�V���f>��sv�}����F�Ͽ�"rD`� ��
f4@)�h��y 0���8�F��B��(�lF�@p
�J��2p�@�-��'M�a@�r�Ȑ)�%��` �P�5� G�
8�G�~jg������gc���3�����J��H��=֭k����3�:^�|e�z������_R}����,F���ܥW�}���f�y��)���Go����)��������
�TM��V]�ÿÛ���EV�������KO��H��D@ D� �_B$� �Hp�01�!@�Cc(2/�e	c@.�(O� ����`�E�N��� Q�	 m)Fw`�B) 5�HQ"�p�P��"6I�@*0f�%� 8�>VP @ �8�aO@�4	B!Jg	!=�� BEz��{ZA��1� `�	(�L4�a�)(d�<Z��J4�$�B��(�&d �X�Jx��
Hx����0,Cup��R�А���(@��BAV�$���~�7��u������\���Y���>��ג��m��#{�ݯ��>���u��|6��+߶�V���v�VS�sg�w��y�����>��w��i;�?������o�U�ݽ��|Gϳ�_f�O绽�哦��>�~    ������u
�V~6k�w�	��q9�������w|�<����=>@<��\�V���O��3=ގ�o�#Ο��mwo�=^W��ίs&��^��_�_�����q�%��O�6%r�������-���5g�?\��@�P�#0�
�0Ă�Z�DR-a9C �0
1���!����� &��x &�H!�3�d��dk�A k!L���$ �1J��(2$� ����@ YP��
�	BHA�b20�CP*4�ʄ��#PK�C�����`R6Z4
TE�!���ȑ��������p�b�}�

�TR(4 Afd��r�#�:,BD�	���$ZAF* ��
Tt$ ��^��$�	��B�@� 3�,V��&�� ����"�	 8d@	�gD � v�	� �]�uM�[�:e�[Y�{���y��w��������-��ڢ����l�ۿ���G����WK�~�Iվ�/>��{���]��0��ֹ�][��o�����������T��u/�������e�l-�?ǻvs���>+�\g+�|�
cc4?�r�n�O���G>Ӿ�~�,�>���������E��_��O����R���_����(ۉ|���__/�?����ަ���~���V�����){����nW���Џ�Ϗ���|*�6 ��O�
 43�^	
%@5 ���$0p� �6�JH��؉(��D	( 'D�#�L��!� �C��`
P���҈��p�YY\�  ��ȁ8 ��D4N �3Ԍ��, ��$�LP������|۟��=m:�~�x������/��t,gz�2'x!�������>v���h~2a�����֏G^d��k���|��V&��_x	d[_��/�o�n�<����>}����'L�-������&Ooot-P�?-Ċy8MDCwES T��X DL�9��@mB�N�x
  H
$lI$��P�@<,8̄� (�@*�������t D ���^��c�oy4Ef�$}|E���[�����^�V�?���'?���~���d��Q��	��ܯ�ksC�c��6�����nټn�� ����x����w���[���x]�y�������ݞ���������l���X 	 8@"���@��X	 �SA�J(�
JaT� 
� p@E� AZ��!�,�`#�0��@p` 2v�S� T��S��M
D
Td���7k�_���r�M}����[����_Zt�3���t�b�����uˎ����}���h�y�=��m�.���x_�e�q����x��l>��U�o�<��j�ɻoڞ�����o����-{��������;�+�,PA�� M D�<��LB7D�TV�� �� �	���Ȅ
 �8��H�
H��-E% �5jT$d������ L�ȐP�B�$0\`��0 @  
�@'�  �I�� 0 S�i�;P:@
��;��9��Of�F����!��O����������f��֭i����q�����}�FM},��
r����o���Uk}��wk'�w��������fg��V��{ܳ��kW�S����nW���׬��om�!@`, QQ���U�i�
Bá��AB~� '�� 	S   �� �� �@��D}� ��0(��x�� p�
�# Q8�D� ZB]��2������-���@��*�*�lH�%�1�DF �8J@D1��� 2������ �"����� >�,�hJ `�:J�b�a��&��Z-D@HDAW `��� �Rl' ArDR �TZ�
�KJ�$�U�_���8ߧ�޸����G=��S���w�j�=?=��W�{�-ū��c�vn�?����sO����eM�E=���{���"���������?1��Y_9�ǻ�͜�zK���o����A�kWx�K��b{�h��폣�B��!A!��L�>�4� D@ e�B� �  S�,�@��3B��=@�0C F�)DXMN$bA���*�� `��54$��@!6�(� JI�QC$���q]�M(1p��).
�j�,���}/�M7��P4���k���㉻i�\>V��q/no6������i~�?e��o��a�
�Z�@҄OeH���H�Td�� h���ń������ �@���J� �)� `*�XH��;3F='25��E<
�:�#Рօ�� �0 d��T������4"�����!�B$���
X�C�.BA0�
� @�0��0m0���!2� * P�(C-�@a! �БiL	;�W"2��&�3�!��J�	�P�ddH�
�3CD�� ���@z� `&��-�h�D��}P'@P���!
�0�3�&�$�'�d
 Cd�bDHb���`Rހ���,@��
��6��q�J0 �0 � �%� ���	>p!��5@+Q��C��c� E���b���ܳ���ps��c���d�܁�� xG�.@T1 �@��ܴ��)D9D�AML��<$00�	�O%�+�P�x��?�v/��=��DD�M�U�fB���hg4úq8�dBA�r
0�TL)S���RQ"�:��RY��dP�����<�����@�vM@2*�� �:
ΐ�   ���Ƞ��!��P��H �p��+�L@���u1p�V�p"@P��4`��3B�E%k e4b�R !���
aD�p�p!�D��t����@,��a�u��;�O�SK�*����PD�� ���L��{  ��C   ��HFC��E��Zr� c *��$@@t��hP�! ���j S�İB�`@��t8��z5�`���+�%N ��"�0���O�c�Lj� �;JE�AD!@S!x�a��%*9d �5D��r8ZP�Q�QQ������ "�!���4$P'l!���D �Etp�(  �B�b0��#�A ���$�i�* a� 
8�����B7�P
��C�,hy�T���)��ӣ�	qn�F�O@8��q�d�(2Dh �_��gMX�� x�	Ba9U �ɓ�݂iu�
��0���(YQ$��K�6ަ`-��P�"a����F�$�e%�M�	TdH$*(8X{{�.& H2![��p @�:
�$��zc$�O�Pp�K�	��QGP�-�� ����T�A���Bٜ6t�� � �S%��F5b
�JyE8!�Xӌ被=`AW�& �*ND�*! 3D	1)La �*P�l�PLO�+��n���� 0,��.��e� ���� �����E����D �CvDE"l�	!]z+�:�A�5�;�hdL  �G� �

�QH\�i�B�E� ��`�HW0���&�ț0�0��@a P�(<d�
�,N�

���fP*> ����B�� �d ��)� DB�B ��# L3"�p
���	���Z�Fp�̚�F8� я0xC,�x�f9!�8T���䘑
�2i�S@�9AD1�R ڑ6x%1Z4
�
h � ����
28��0	O 0�E�@Y �dF ���� 0��� �  / � 8���<���P���Gh���=� �c���(KȂ�H M�n� �\� �:j���!tE T���:�����h
�"�=H&H�P��C1�PPم��07"�ACD�%-f��	��
!0 
���<8�Y��Є#��A�4f< 6�D0)  # �����'�M�)$���(*A@ �%P��4J��.0TF�����T�t�BbAk�,�b��i��Q#+!"��H�"�@%&�pE� �0��Sb���F�D��Q
�pq]�MK���G
.�L$5��8� �� ��� 	��P�"����!�T���ǣ!�	�#$���EN @BoA�  `:%�v0$�� 
!R�
�� ��$b����(E�@`(x��`E,�*d��0
���saA�b�y���$�D-��v()ӥP%��@�KO�F�M� S6G.Ne�x\��$�"���@��P� AQ$D1�'�& .�H�h��aI
�EX ei���  ����:�B�1��q Q<�$DT�$�B@
�\ ��
T���0d�u%��g@�8
L ���e@���!+	 ��X��!x  �$�:��͠��XI-�0�Ӱ@ 	�A��G� ���Ft�DL��|rШ�8`J�U�(Am�к4� O�P�'�`�#�����hP
 0h�x�@�,�Gg$��!* ��`!T�.C`a�P�D�8�1
�`��L&�PP�E�I ��� �  ��DI0 �K�#���`uh�0�@p�9��c`�� �(�  � ��@L(�JB�_PDQ	���� ��!�a ��`� I�H�mЇ�!�)�)B$P�A d�AR&� 	�Y����	� I@��W� d!
0�)/�t��E���
8A�N�X-L� 
`�3a/(��U�'8�A�f&��0 ��)6��!�%�Lā��c�$��d �q	�DZ#��]!x*�2�/� �� (P8Vp�E� L�!,�, ��$ �I�%����@�hUi$L���^j�� CARf ��X��8�BH  D�1\��,L�0��@�/�k^�1�+ ����(0h`[�B�Px���J�6 "A�� �C!�Y B � ����rH��"J��8BCeJc�2A< 7b�$^�8 ��
��
�����3�"QȠ��
RG�(	��@��`�@��IL�����̀\��bE*h  ��Y�P%|�� �o�����! �1
&��N�	;�B,"�0��"
��%Ն0 * ��L(�h4��'d���P�]�0 ࠅ�K@H H@�)�2"HD�R�  Db@@n)�MB��[� �	
^P� q(k�0 �fP!@�p�(p �dBR�嬀:��r�L�)���� 6 �b����Ȥ3	6 �a�G""	� ,�3���JPfO3U@ �	�	��� Q�q�H�4�#��` G1U�� ��%�'�ޤ5�
-JP�)���%��c~3�0H���A�@�Ґ�@��y̓Ę�G�bY�PX!�` C���o@ 2@A�ē�H ���?�Q���J�@C�0 "�D �m+$D@��H�It̂�!A�w� i�b[ !���E!��BCa��PAv�QQ�9`�H�~�PE�
�Y�@P!P�@0PR$(�%jLKxf,�"D��Fk E�@i�`�K1�%��\� 3*��Ńp0���  �a�ɰ��!��2�@�q
.�,1ƼB %D$�PH̔��,�� ��T� �a"�h�P 6@߀fD�7&�& �N
N<Ās�
�`Q��"�䌨�`�P� �̄�|X��
��0`M�HhhR\+`9r  $"!��0e� �(� :��a
�`H�Da� 5J����	�A@��²#
A4�@� `N8��! 
R
9c���r4��D~cV�@� �A�Z3 BXf 
Kq�%"���ڢj.IRo6� �0�R�&e��@W�����{@PTY 4��`��D��'F@� RD)H�"�(�� u�  ��D �
8	`4P��IX��<P5@ �
�H��`�
А��
 ��(�� h)ȎA$(����
4�O  @�=$Y2�D
��W`�w3�26�-��)],nX����w�l��X�`�-)���U,0��� 1�I�n�-�0��D!H�	 l�P��]Yr�
��  	�8JR9�� ڈQ%�J@X����d* ˑ0�R?#��� �	4�x.��'�d�AJH *���M�
 �$F(S�'S='�%6
�a��R�8h����]�`%�Q��@�$/���m����P�*T��b�ئa ]��E$�X ��C6� f~`J�A�TJ��mpB������t8D��ETb��
�C���F��8 n�fD$�nR�@9B` �
P� �h���E	�!��q1 �΀��< 
.{�ӻaJ��D��Q��pT츀:& � 4<��@��!	
��$T���R`U!q) D��B
lP�� �NMA�f E�"P�$�
)�!A��$8�&a��
%  E�1� +@�,=�PA��B �b�(��4�����#��	�%6��Q .�P. ��c�d��pF��X�p�0�$ IDts��p�& ��
�zR ��y�xQ�0
IPb` RҨ	�����(HE��B2 [¯�% �0�	� ��$��4��	QA�Ab��8��  ��;H�BtT��-@
%��^ �$� YP�4��o��:jS�Đd1���� RhYKP"�Rh L+O'��l� Fb1Q�&\R
K4 ���(x��4Z��&B(HΓ�F �Pנ+��s
@��B
Ҙ r0L�b	 �"*L�@�(@� Ղ9����^%0	2�C(< p�aG�
0]\�9B� #� �p�g�%XXGw�fH����{�p�7P�v�����9�{���?ۤe�_��Ӽ����f�+�����&��o��v{>K9e��|��Z�ĳ�~�O������w�u�sZ�c�׆�k��6��?�_����9w�.�ڍ=�4��O�˼�{������^���������&9'�3�+���[���'���]�����a�������o!P��uq��o��N��W}_3.��*��?/�O���;��.��	���v�錏��+l���  h��I�E5  P�d�
�7� �%��q(0��-�`�B�S 0��dl   �D@ �c@�H"Y���@=ixbyP�@ A\r+j( ��sH$e@DC����& %F����ml�����vO���x�z~ߑ롿�?��{�W����5!N{�������w����ҫ����O~�6�k�/~�V����sg���v� b7]����o�}N�;���/�X^���}���*z�g�{pHL�* )˃��$ ���D��AƲ �RI  A A�ș"�P r���J� LQ"� �� ��h�P�Z	��,� .B�q �&S	@aȡ9l"� G	I�E)"M� �-T��@�c�@�
DE!`�[$Hi"f�+'GJ 1��P8�l"��@ ���M@��2�	��@ B��`��J��R����z��� ��#�A�$������
!�@ ph�{e��ߏm�{Ϳ��{>��pwg߯�5�w���}�������\o�|h������{�ݕ��}Vm�o������������6��B����b=���u���ߒ�>sg�#�����X���nr�������kHU;���������0��	�0RZ< #AG`(u	A� �P  @Ƞ�  ��@LI�|0,J�cA0	B�
�)�B���Ob���IF=d� �EB��t) ZD �W%��Q���$���4 5��Zo�wF��~;{���_�l}��:?�S'q��?�~�)ԟ������M�MM��
uu�٨��\���}��������<���}^��5���7r�^�\��Z���E���}��u*޿]�
cm�a"� 
dR
I@�>�a��� ���X�c� �� �`zQ
An��٘$!2 )`�& 2  �,�  ��_��{���}m�3�<eeN�}{��w[����Y�o��OT�5���,�O�7ҿ>���/�����u��Õ{�{{{���۹G��Uw[�w����<^<:�R�-��:}���_������k�w�x�;?��*`N� �	ҡBa��X� !~�"��t+�x� A T��T) b�0#phK p�����:�`� 5�C�BrV1� ( �� Ā��
H��-���I؂�2&�"6VeI<�P"%C�Ҁh�ȉ����!��&�%Mi ���8(�!؈PN	�h� @�HKP<jD�3�0dJ�3L1���AC� �X%
"�� �S�8Z�6!T b��) ��*O�D� (�Y�B�� ҈ �"�6"N9@(��)P .׀ �%I�@�Y�Ą�*�x� R�  A(�+䐑7O����A����/s�x���i�~&#�B�'���;�o�]���j�:�;o�_s�I�{w>m?��i�j'�v��U��ӏ��^�/3_y��I��3�/�}��?=��A�d�]�a²K�ݽ����ϗ�U��;_F���p�u�G����c�;����?��{-	�_������_^��/��v�q�����M{�Nی�v��;���s�L?��Wo��U;���_�����ZA�y�/��^�?��k�u���|��=�?�6r��Ux���^�v�׮_���#aA��%@+�b �X�RY<�GOf� )�A5`� ��`n� !B�
H�Є 	�*N@�� ��ІH0&FBBMY.5@$ D�@xH�J��Pqd	�A(A�"f@P "�� (Ty4AG�C @
  ( ����e��L�� �@�, @� (��&�X� "�Y�"6b
�`��RD��� ]A@��Y@q�@"ˈ��A\ O�P�E\_ ��A&�w��K�z���Vq�6O��7�_v���׼�����wܦ{�����xo~���]���%�/�޽?ţ�}���c�/w6��߲S��о>��ov����o�G��WG��cw[۷�z�}�WR�s�Ϧ_�fͻ�h�B��AP@
�<BS
���D�8  =����o�G>L������u}ﻅ��w�����S�?�m�Ɵ��m�<z����/T�'��gon}
�  �ǁ&W�d	�������@@ �^�]	���QA��fj�x 0�#fA� F�s
d  )Z�A��((&��	
$��
�@���>��$.�?]��Ѻ��o�é�s6~e�@��k��m���<���B����������e���Kw+G�j�5�Uw���{c���y=�����?��{S�-�ͩo�cM�n�{���x���_Q�S��o��: �|y�{>W������^8���QX��?o����~������5�y��Fs�8��w��v���{�{�����xk�R��מ���&���v���迷��Y���������ߩa����K_WY�}����������ӆ=���x��� ��D쀼
�TR'2�vc��J� x�NGl�4B#rpa�+AhI"�`輸Q���fS�B��-��� 
o�bcIѐ!MNb!h b��A�DTB�ʁҦ"CF  ��_U��3H�����00i������R�&(Zt��a��<4�J��s"@ea	C($CA	A����8dB�#B{ �81%&	��TZI�xÐ"0M�D�4
����®Z �)&��L�6J�LF�(D��*;
MI��@�X�gJQ��i-!L"�1��ds6�{f�p�ePʤ� 	�ۿ��k����}^w��T���F2�S��'HΝr����T���l"��
�Ԝ���E�[|9o���n���?���?o��U���[����}�������~�����������?r=����wj$9?��FIA�PPJ���d�H�()hÀF��7�S(��2��X�J/3V��@�X�QpW��R�IX�2 o�eʜ�PX��!�ޗ $�p�LdM�D�DT�@�o@�A�;PAT�L�s!đ&�rإ�#	���� D�Z�0�7A��;�%� e@ʹ"E��X�0)6�1$ER��lO�`��?*��H�k6'԰����T
��(炡$��	�Q�R i����  �D�[T��"�2�F��������y��	y[�=����r�����~ߓ���~�����~}��W����v�[�w��پ��ۿ��%�����"�^�߿��>