window.console && console.log('Use tinymce.js instead of tinymce.jquery.js.');
// 4.6.4 (2017-06-13)
(function () {

var defs = {}; // id -> {dependencies, definition, instance (possibly undefined)}

// Used when there is no 'main' module.
// The name is probably (hopefully) unique so minification removes for releases.
var register_3795 = function (id) {
  var module = dem(id);
  var fragments = id.split('.');
  var target = Function('return this;')();
  for (var i = 0; i < fragments.length - 1; ++i) {
    if (target[fragments[i]] === undefined)
      target[fragments[i]] = {};
    target = target[fragments[i]];
  }
  target[fragments[fragments.length - 1]] = module;
};

var instantiate = function (id) {
  var actual = defs[id];
  var dependencies = actual.deps;
  var definition = actual.defn;
  var len = dependencies.length;
  var instances = new Array(len);
  for (var i = 0; i < len; ++i)
    instances[i] = dem(dependencies[i]);
  var defResult = definition.apply(null, instances);
  if (defResult === undefined)
     throw 'module [' + id + '] returned undefined';
  actual.instance = defResult;
};

var def = function (id, dependencies, definition) {
  if (typeof id !== 'string')
    throw 'module id must be a string';
  else if (dependencies === undefined)
    throw 'no dependencies for ' + id;
  else if (definition === undefined)
    throw 'no definition function for ' + id;
  defs[id] = {
    deps: dependencies,
    defn: definition,
    instance: undefined
  };
};

var dem = function (id) {
  var actual = defs[id];
  if (actual === undefined)
    throw 'module [' + id + '] was undefined';
  else if (actual.instance === undefined)
    instantiate(id);
  return actual.instance;
};

var req = function (ids, callback) {
  var len = ids.length;
  var instances = new Array(len);
  for (var i = 0; i < len; ++i)
    instances.push(dem(ids[i]));
  callback.apply(null, callback);
};

var ephox = {};

ephox.bolt = {
  module: {
    api: {
      define: def,
      require: req,
      demand: dem
    }
  }
};

var define = def;
var require = req;
var demand = dem;
// this helps with minificiation when using a lot of global references
var defineGlobal = function (id, ref) {
  define(id, [], function () { return ref; });
};
/*jsc
["tinymce.core.api.Main","tinymce.core.api.Tinymce","tinymce.core.Register","tinymce.core.geom.Rect","tinymce.core.util.Promise","tinymce.core.util.Delay","tinymce.core.Env","tinymce.core.dom.EventUtils","tinymce.core.dom.Sizzle","tinymce.core.util.Tools","tinymce.core.dom.DomQuery","tinymce.core.html.Styles","tinymce.core.dom.TreeWalker","tinymce.core.html.Entities","tinymce.core.dom.DOMUtils","tinymce.core.dom.ScriptLoader","tinymce.core.AddOnManager","tinymce.core.dom.RangeUtils","tinymce.core.html.Node","tinymce.core.html.Schema","tinymce.core.html.SaxParser","tinymce.core.html.DomParser","tinymce.core.html.Writer","tinymce.core.html.Serializer","tinymce.core.dom.Serializer","tinymce.core.util.VK","tinymce.core.dom.ControlSelection","tinymce.core.dom.BookmarkManager","tinymce.core.dom.Selection","tinymce.core.Formatter","tinymce.core.UndoManager","tinymce.core.EditorCommands","tinymce.core.util.URI","tinymce.core.util.Class","tinymce.core.util.EventDispatcher","tinymce.core.util.Observable","tinymce.core.WindowManager","tinymce.core.NotificationManager","tinymce.core.EditorObservable","tinymce.core.Shortcuts","tinymce.core.Editor","tinymce.core.util.I18n","tinymce.core.FocusManager","tinymce.core.EditorManager","tinymce.core.util.XHR","tinymce.core.util.JSON","tinymce.core.util.JSONRequest","tinymce.core.util.JSONP","tinymce.core.util.LocalStorage","tinymce.core.api.Compat","tinymce.core.util.Color","tinymce.core.ui.Api","tinymce.core.util.Arr","tinymce.core.dom.Range","tinymce.core.dom.StyleSheetLoader","tinymce.core.dom.NodeType","tinymce.core.caret.CaretContainer","tinymce.core.text.Zwsp","ephox.katamari.api.Fun","tinymce.core.dom.RangePoint","tinymce.core.caret.CaretBookmark","tinymce.core.caret.CaretPosition","ephox.sugar.api.dom.Compare","ephox.sugar.api.node.Element","tinymce.core.dom.ScrollIntoView","tinymce.core.dom.TridentSelection","tinymce.core.selection.FragmentReader","tinymce.core.dom.ElementUtils","tinymce.core.util.Fun","tinymce.core.fmt.Preview","tinymce.core.fmt.Hooks","tinymce.core.undo.Levels","tinymce.core.delete.DeleteCommands","tinymce.core.InsertContent","global!document","tinymce.core.ui.Window","tinymce.core.ui.MessageBox","tinymce.core.ui.Notification","tinymce.core.EditorSettings","tinymce.core.init.Render","tinymce.core.Mode","tinymce.core.ui.Sidebar","tinymce.core.util.Uuid","tinymce.core.ErrorReporter","tinymce.core.LegacyInput","tinymce.core.ui.Selector","tinymce.core.ui.Collection","tinymce.core.ui.ReflowQueue","tinymce.core.ui.Control","tinymce.core.ui.Factory","tinymce.core.ui.KeyboardNavigation","tinymce.core.ui.Container","tinymce.core.ui.DragHelper","tinymce.core.ui.Scrollable","tinymce.core.ui.Panel","tinymce.core.ui.Movable","tinymce.core.ui.Resizable","tinymce.core.ui.FloatPanel","tinymce.core.ui.Tooltip","tinymce.core.ui.Widget","tinymce.core.ui.Progress","tinymce.core.ui.Layout","tinymce.core.ui.AbsoluteLayout","tinymce.core.ui.Button","tinymce.core.ui.ButtonGroup","tinymce.core.ui.Checkbox","tinymce.core.ui.ComboBox","tinymce.core.ui.ColorBox","tinymce.core.ui.PanelButton","tinymce.core.ui.ColorButton","tinymce.core.ui.ColorPicker","tinymce.core.ui.Path","tinymce.core.ui.ElementPath","tinymce.core.ui.FormItem","tinymce.core.ui.Form","tinymce.core.ui.FieldSet","tinymce.core.ui.FilePicker","tinymce.core.ui.FitLayout","tinymce.core.ui.FlexLayout","tinymce.core.ui.FlowLayout","tinymce.core.ui.FormatControls","tinymce.core.ui.GridLayout","tinymce.core.ui.Iframe","tinymce.core.ui.InfoBox","tinymce.core.ui.Label","tinymce.core.ui.Toolbar","tinymce.core.ui.MenuBar","tinymce.core.ui.MenuButton","tinymce.core.ui.MenuItem","tinymce.core.ui.Throbber","tinymce.core.ui.Menu","tinymce.core.ui.ListBox","tinymce.core.ui.Radio","tinymce.core.ui.ResizeHandle","tinymce.core.ui.SelectBox","tinymce.core.ui.Slider","tinymce.core.ui.Spacer","tinymce.core.ui.SplitButton","tinymce.core.ui.StackLayout","tinymce.core.ui.TabPanel","tinymce.core.ui.TextBox","ephox.katamari.api.Arr","global!Array","global!Error","ephox.katamari.api.Future","ephox.katamari.api.Futures","ephox.katamari.api.Result","tinymce.core.geom.ClientRect","tinymce.core.caret.CaretCandidate","tinymce.core.text.ExtendingChar","ephox.sand.api.Node","ephox.sand.api.PlatformDetection","ephox.sugar.api.search.Selectors","global!console","ephox.sugar.api.dom.Insert","ephox.sugar.api.dom.Replication","ephox.sugar.api.node.Fragment","ephox.sugar.api.node.Node","tinymce.core.dom.ElementType","tinymce.core.dom.Parents","tinymce.core.selection.SelectionUtils","tinymce.core.undo.Fragments","tinymce.core.delete.BlockBoundaryDelete","tinymce.core.delete.BlockRangeDelete","tinymce.core.delete.CefDelete","tinymce.core.delete.InlineBoundaryDelete","tinymce.core.caret.CaretWalker","tinymce.core.dom.RangeNormalizer","tinymce.core.InsertList","tinymce.core.data.ObservableObject","tinymce.core.ui.DomUtils","tinymce.core.ui.BoxUtils","tinymce.core.ui.ClassList","global!window","tinymce.core.init.Init","tinymce.core.PluginManager","tinymce.core.ThemeManager","tinymce.core.content.LinkTargets","tinymce.core.fmt.FontInfo","ephox.katamari.api.Option","global!String","ephox.katamari.api.LazyValue","ephox.katamari.async.Bounce","ephox.katamari.async.AsyncValues","ephox.sand.util.Global","ephox.katamari.api.Thunk","ephox.sand.core.PlatformDetection","global!navigator","ephox.sugar.api.node.NodeTypes","ephox.sugar.api.search.Traverse","ephox.sugar.api.properties.Attr","ephox.sugar.api.dom.InsertAll","ephox.sugar.api.dom.Remove","ephox.katamari.api.Options","tinymce.core.undo.Diff","tinymce.core.delete.BlockBoundary","tinymce.core.delete.MergeBlocks","tinymce.core.delete.DeleteUtils","tinymce.core.caret.CaretUtils","tinymce.core.delete.CefDeleteAction","tinymce.core.delete.DeleteElement","tinymce.core.caret.CaretFinder","tinymce.core.keyboard.BoundaryCaret","tinymce.core.keyboard.BoundaryLocation","tinymce.core.keyboard.BoundarySelection","tinymce.core.keyboard.InlineUtils","tinymce.core.data.Binding","tinymce.core.init.InitContentBody","global!Object","global!setTimeout","ephox.katamari.api.Resolve","ephox.sand.core.Browser","ephox.sand.core.OperatingSystem","ephox.sand.detect.DeviceType","ephox.sand.detect.UaString","ephox.sand.info.PlatformInfo","ephox.katamari.api.Type","ephox.katamari.api.Struct","ephox.sugar.alien.Recurse","ephox.katamari.api.Obj","ephox.sugar.api.search.PredicateFind","tinymce.core.dom.Empty","ephox.katamari.api.Adt","tinymce.core.text.Bidi","tinymce.core.caret.CaretContainerInline","tinymce.core.caret.CaretContainerRemove","tinymce.core.util.LazyEvaluator","ephox.katamari.api.Cell","tinymce.core.caret.CaretContainerInput","tinymce.core.EditorUpload","tinymce.core.ForceBlocks","tinymce.core.keyboard.KeyboardOverrides","tinymce.core.NodeChange","tinymce.core.SelectionOverrides","tinymce.core.util.Quirks","ephox.katamari.api.Global","ephox.sand.detect.Version","ephox.katamari.api.Strings","ephox.katamari.data.Immutable","ephox.katamari.data.MixedBag","ephox.sugar.api.node.Body","ephox.sugar.impl.ClosestOrAncestor","ephox.sugar.api.search.SelectorExists","tinymce.core.file.Uploader","tinymce.core.file.ImageScanner","tinymce.core.file.BlobCache","tinymce.core.file.UploadStatus","tinymce.core.keyboard.ArrowKeys","tinymce.core.keyboard.DeleteBackspaceKeys","tinymce.core.keyboard.EnterKey","tinymce.core.keyboard.SpaceKey","tinymce.core.caret.FakeCaret","tinymce.core.caret.LineUtils","tinymce.core.DragDropOverrides","tinymce.core.EditorView","tinymce.core.keyboard.CefUtils","tinymce.core.dom.NodePath","global!Number","ephox.katamari.str.StrAppend","ephox.katamari.str.StringParts","ephox.katamari.util.BagUtils","ephox.sugar.api.search.SelectorFind","tinymce.core.file.Conversions","global!URL","tinymce.core.keyboard.CefNavigation","tinymce.core.keyboard.MatchKeys","tinymce.core.keyboard.InsertSpace","tinymce.core.dom.Dimensions","tinymce.core.dom.MousePosition","ephox.sugar.api.properties.Css","tinymce.core.caret.LineWalker","ephox.katamari.api.Merger","ephox.sugar.impl.Style"]
jsc*/
/**
 * Rect.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * Contains various tools for rect/position calculation.
 *
 * @class tinymce.geom.Rect
 */
define(
  'tinymce.core.geom.Rect',
  [
  ],
  function () {
    "use strict";

    var min = Math.min, max = Math.max, round = Math.round;

    /**
     * Returns the rect positioned based on the relative position name
     * to the target rect.
     *
     * @method relativePosition
     * @param {Rect} rect Source rect to modify into a new rect.
     * @param {Rect} targetRect Rect to move relative to based on the rel option.
     * @param {String} rel Relative position. For example: tr-bl.
     */
    function relativePosition(rect, targetRect, rel) {
      var x, y, w, h, targetW, targetH;

      x = targetRect.x;
      y = targetRect.y;
      w = rect.w;
      h = rect.h;
      targetW = targetRect.w;
      targetH = targetRect.h;

      rel = (rel || '').split('');

      if (rel[0] === 'b') {
        y += targetH;
      }

      if (rel[1] === 'r') {
        x += targetW;
      }

      if (rel[0] === 'c') {
        y += round(targetH / 2);
      }

      if (rel[1] === 'c') {
        x += round(targetW / 2);
      }

      if (rel[3] === 'b') {
        y -= h;
      }

      if (rel[4] === 'r') {
        x -= w;
      }

      if (rel[3] === 'c') {
        y -= round(h / 2);
      }

      if (rel[4] === 'c') {
        x -= round(w / 2);
      }

      return create(x, y, w, h);
    }

    /**
     * Tests various positions to get the most suitable one.
     *
     * @method findBestRelativePosition
     * @param {Rect} rect Rect to use as source.
     * @param {Rect} targetRect Rect to move relative to.
     * @param {Rect} constrainRect Rect to constrain within.
     * @param {Array} rels Array of relative positions to test against.
     */
    function findBestRelativePosition(rect, targetRect, constrainRect, rels) {
      var pos, i;

      for (i = 0; i < rels.length; i++) {
        pos = relativePosition(rect, targetRect, rels[i]);

        if (pos.x >= constrainRect.x && pos.x + pos.w <= constrainRect.w + constrainRect.x &&
          pos.y >= constrainRect.y && pos.y + pos.h <= constrainRect.h + constrainRect.y) {
          return rels[i];
        }
      }

      return null;
    }

    /**
     * Inflates the rect in all directions.
     *
     * @method inflate
     * @param {Rect} rect Rect to expand.
     * @param {Number} w Relative width to expand by.
     * @param {Number} h Relative height to expand by.
     * @return {Rect} New expanded rect.
     */
    function inflate(rect, w, h) {
      return create(rect.x - w, rect.y - h, rect.w + w * 2, rect.h + h * 2);
    }

    /**
     * Returns the intersection of the specified rectangles.
     *
     * @method intersect
     * @param {Rect} rect The first rectangle to compare.
     * @param {Rect} cropRect The second rectangle to compare.
     * @return {Rect} The intersection of the two rectangles or null if they don't intersect.
     */
    function intersect(rect, cropRect) {
      var x1, y1, x2, y2;

      x1 = max(rect.x, cropRect.x);
      y1 = max(rect.y, cropRect.y);
      x2 = min(rect.x + rect.w, cropRect.x + cropRect.w);
      y2 = min(rect.y + rect.h, cropRect.y + cropRect.h);

      if (x2 - x1 < 0 || y2 - y1 < 0) {
        return null;
      }

      return create(x1, y1, x2 - x1, y2 - y1);
    }

    /**
     * Returns a rect clamped within the specified clamp rect. This forces the
     * rect to be inside the clamp rect.
     *
     * @method clamp
     * @param {Rect} rect Rectangle to force within clamp rect.
     * @param {Rect} clampRect Rectable to force within.
     * @param {Boolean} fixedSize True/false if size should be fixed.
     * @return {Rect} Clamped rect.
     */
    function clamp(rect, clampRect, fixedSize) {
      var underflowX1, underflowY1, overflowX2, overflowY2,
        x1, y1, x2, y2, cx2, cy2;

      x1 = rect.x;
      y1 = rect.y;
      x2 = rect.x + rect.w;
      y2 = rect.y + rect.h;
      cx2 = clampRect.x + clampRect.w;
      cy2 = clampRect.y + clampRect.h;

      underflowX1 = max(0, clampRect.x - x1);
      underflowY1 = max(0, clampRect.y - y1);
      overflowX2 = max(0, x2 - cx2);
      overflowY2 = max(0, y2 - cy2);

      x1 += underflowX1;
      y1 += underflowY1;

      if (fixedSize) {
        x2 += underflowX1;
        y2 += underflowY1;
        x1 -= overflowX2;
        y1 -= overflowY2;
      }

      x2 -= overflowX2;
      y2 -= overflowY2;

      return create(x1, y1, x2 - x1, y2 - y1);
    }

    /**
     * Creates a new rectangle object.
     *
     * @method create
     * @param {Number} x Rectangle x location.
     * @param {Number} y Rectangle y location.
     * @param {Number} w Rectangle width.
     * @param {Number} h Rectangle height.
     * @return {Rect} New rectangle object.
     */
    function create(x, y, w, h) {
      return { x: x, y: y, w: w, h: h };
    }

    /**
     * Creates a new rectangle object form a clientRects object.
     *
     * @method fromClientRect
     * @param {ClientRect} clientRect DOM ClientRect object.
     * @return {Rect} New rectangle object.
     */
    function fromClientRect(clientRect) {
      return create(clientRect.left, clientRect.top, clientRect.width, clientRect.height);
    }

    return {
      inflate: inflate,
      relativePosition: relativePosition,
      findBestRelativePosition: findBestRelativePosition,
      intersect: intersect,
      clamp: clamp,
      create: create,
      fromClientRect: fromClientRect
    };
  }
);

/**
 * Promise.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * Promise polyfill under MIT license: https://github.com/taylorhakes/promise-polyfill
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/* eslint-disable */
/* jshint ignore:start */

/**
 * Modifed to be a feature fill and wrapped as tinymce module.
 */
define(
  'tinymce.core.util.Promise',
  [],
  function () {
    if (window.Promise) {
      return window.Promise;
    }

    // Use polyfill for setImmediate for performance gains
    var asap = Promise.immediateFn || (typeof setImmediate === 'function' && setImmediate) ||
      function (fn) { setTimeout(fn, 1); };

    // Polyfill for Function.prototype.bind
    function bind(fn, thisArg) {
      return function () {
        fn.apply(thisArg, arguments);
      };
    }

    var isArray = Array.isArray || function (value) { return Object.prototype.toString.call(value) === "[object Array]"; };

    function Promise(fn) {
      if (typeof this !== 'object') throw new TypeError('Promises must be constructed via new');
      if (typeof fn !== 'function') throw new TypeError('not a function');
      this._state = null;
      this._value = null;
      this._deferreds = [];

      doResolve(fn, bind(resolve, this), bind(reject, this));
    }

    function handle(deferred) {
      var me = this;
      if (this._state === null) {
        this._deferreds.push(deferred);
        return;
      }
      asap(function () {
        var cb = me._state ? deferred.onFulfilled : deferred.onRejected;
        if (cb === null) {
          (me._state ? deferred.resolve : deferred.reject)(me._value);
          return;
        }
        var ret;
        try {
          ret = cb(me._value);
        }
        catch (e) {
          deferred.reject(e);
          return;
        }
        deferred.resolve(ret);
      });
    }

    function resolve(newValue) {
      try { //Promise Resolution Procedure: https://github.com/promises-aplus/promises-spec#the-promise-resolution-procedure
        if (newValue === this) throw new TypeError('A promise cannot be resolved with itself.');
        if (newValue && (typeof newValue === 'object' || typeof newValue === 'function')) {
          var then = newValue.then;
          if (typeof then === 'function') {
            doResolve(bind(then, newValue), bind(resolve, this), bind(reject, this));
            return;
          }
        }
        this._state = true;
        this._value = newValue;
        finale.call(this);
      } catch (e) { reject.call(this, e); }
    }

    function reject(newValue) {
      this._state = false;
      this._value = newValue;
      finale.call(this);
    }

    function finale() {
      for (var i = 0, len = this._deferreds.length; i < len; i++) {
        handle.call(this, this._deferreds[i]);
      }
      this._deferreds = null;
    }

    function Handler(onFulfilled, onRejected, resolve, reject) {
      this.onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : null;
      this.onRejected = typeof onRejected === 'function' ? onRejected : null;
      this.resolve = resolve;
      this.reject = reject;
    }

    /**
     * Take a potentially misbehaving resolver function and make sure
     * onFulfilled and onRejected are only called once.
     *
     * Makes no guarantees about asynchrony.
     */
    function doResolve(fn, onFulfilled, onRejected) {
      var done = false;
      try {
        fn(function (value) {
          if (done) return;
          done = true;
          onFulfilled(value);
        }, function (reason) {
          if (done) return;
          done = true;
          onRejected(reason);
        });
      } catch (ex) {
        if (done) return;
        done = true;
        onRejected(ex);
      }
    }

    Promise.prototype['catch'] = function (onRejected) {
      return this.then(null, onRejected);
    };

    Promise.prototype.then = function (onFulfilled, onRejected) {
      var me = this;
      return new Promise(function (resolve, reject) {
        handle.call(me, new Handler(onFulfilled, onRejected, resolve, reject));
      });
    };

    Promise.all = function () {
      var args = Array.prototype.slice.call(arguments.length === 1 && isArray(arguments[0]) ? arguments[0] : arguments);

      return new Promise(function (resolve, reject) {
        if (args.length === 0) return resolve([]);
        var remaining = args.length;
        function res(i, val) {
          try {
            if (val && (typeof val === 'object' || typeof val === 'function')) {
              var then = val.then;
              if (typeof then === 'function') {
                then.call(val, function (val) { res(i, val); }, reject);
                return;
              }
            }
            args[i] = val;
            if (--remaining === 0) {
              resolve(args);
            }
          } catch (ex) {
            reject(ex);
          }
        }
        for (var i = 0; i < args.length; i++) {
          res(i, args[i]);
        }
      });
    };

    Promise.resolve = function (value) {
      if (value && typeof value === 'object' && value.constructor === Promise) {
        return value;
      }

      return new Promise(function (resolve) {
        resolve(value);
      });
    };

    Promise.reject = function (value) {
      return new Promise(function (resolve, reject) {
        reject(value);
      });
    };

    Promise.race = function (values) {
      return new Promise(function (resolve, reject) {
        for (var i = 0, len = values.length; i < len; i++) {
          values[i].then(resolve, reject);
        }
      });
    };

    return Promise;
  }
);

/* jshint ignore:end */
/* eslint-enable */
/**
 * Delay.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * Utility class for working with delayed actions like setTimeout.
 *
 * @class tinymce.util.Delay
 */
define(
  'tinymce.core.util.Delay',
  [
    "tinymce.core.util.Promise"
  ],
  function (Promise) {
    var requestAnimationFramePromise;

    function requestAnimationFrame(callback, element) {
      var i, requestAnimationFrameFunc = window.requestAnimationFrame, vendors = ['ms', 'moz', 'webkit'];

      function featurefill(callback) {
        window.setTimeout(callback, 0);
      }

      for (i = 0; i < vendors.length && !requestAnimationFrameFunc; i++) {
        requestAnimationFrameFunc = window[vendors[i] + 'RequestAnimationFrame'];
      }

      if (!requestAnimationFrameFunc) {
        requestAnimationFrameFunc = featurefill;
      }

      requestAnimationFrameFunc(callback, element);
    }

    function wrappedSetTimeout(callback, time) {
      if (typeof time != 'number') {
        time = 0;
      }

      return setTimeout(callback, time);
    }

    function wrappedSetInterval(callback, time) {
      if (typeof time != 'number') {
        time = 1; // IE 8 needs it to be > 0
      }

      return setInterval(callback, time);
    }

    function wrappedClearTimeout(id) {
      return clearTimeout(id);
    }

    function wrappedClearInterval(id) {
      return clearInterval(id);
    }

    function debounce(callback, time) {
      var timer, func;

      func = function () {
        var args = arguments;

        clearTimeout(timer);

        timer = wrappedSetTimeout(function () {
          callback.apply(this, args);
        }, time);
      };

      func.stop = function () {
        clearTimeout(timer);
      };

      return func;
    }

    return {
      /**
       * Requests an animation frame and fallbacks to a timeout on older browsers.
       *
       * @method requestAnimationFrame
       * @param {function} callback Callback to execute when a new frame is available.
       * @param {DOMElement} element Optional element to scope it to.
       */
      requestAnimationFrame: function (callback, element) {
        if (requestAnimationFramePromise) {
          requestAnimationFramePromise.then(callback);
          return;
        }

        requestAnimationFramePromise = new Promise(function (resolve) {
          if (!element) {
            element = document.body;
          }

          requestAnimationFrame(resolve, element);
        }).then(callback);
      },

      /**
       * Sets a timer in ms and executes the specified callback when the timer runs out.
       *
       * @method setTimeout
       * @param {function} callback Callback to execute when timer runs out.
       * @param {Number} time Optional time to wait before the callback is executed, defaults to 0.
       * @return {Number} Timeout id number.
       */
      setTimeout: wrappedSetTimeout,

      /**
       * Sets an interval timer in ms and executes the specified callback at every interval of that time.
       *
       * @method setInterval
       * @param {function} callback Callback to execute when interval time runs out.
       * @param {Number} time Optional time to wait before the callback is executed, defaults to 0.
       * @return {Number} Timeout id number.
       */
      setInterval: wrappedSetInterval,

      /**
       * Sets an editor timeout it's similar to setTimeout except that it checks if the editor instance is
       * still alive when the callback gets executed.
       *
       * @method setEditorTimeout
       * @param {tinymce.Editor} editor Editor instance to check the removed state on.
       * @param {function} callback Callback to execute when timer runs out.
       * @param {Number} time Optional time to wait before the callback is executed, defaults to 0.
       * @return {Number} Timeout id number.
       */
      setEditorTimeout: function (editor, callback, time) {
        return wrappedSetTimeout(function () {
          if (!editor.removed) {
            callback();
          }
        }, time);
      },

      /**
       * Sets an interval timer it's similar to setInterval except that it checks if the editor instance is
       * still alive when the callback gets executed.
       *
       * @method setEditorInterval
       * @param {function} callback Callback to execute when interval time runs out.
       * @param {Number} time Optional time to wait before the callback is executed, defaults to 0.
       * @return {Number} Timeout id number.
       */
      setEditorInterval: function (editor, callback, time) {
        var timer;

        timer = wrappedSetInterval(function () {
          if (!editor.removed) {
            callback();
          } else {
            clearInterval(timer);
          }
        }, time);

        return timer;
      },

      /**
       * Creates debounced callback function that only gets executed once within the specified time.
       *
       * @method debounce
       * @param {function} callback Callback to execute when timer finishes.
       * @param {Number} time Optional time to wait before the callback is executed, defaults to 0.
       * @return {Function} debounced function callback.
       */
      debounce: debounce,

      // Throttle needs to be debounce due to backwards compatibility.
      throttle: debounce,

      /**
       * Clears an interval timer so it won't execute.
       *
       * @method clearInterval
       * @param {Number} Interval timer id number.
       */
      clearInterval: wrappedClearInterval,

      /**
       * Clears an timeout timer so it won't execute.
       *
       * @method clearTimeout
       * @param {Number} Timeout timer id number.
       */
      clearTimeout: wrappedClearTimeout
    };
  }
);

/**
 * Env.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class contains various environment constants like browser versions etc.
 * Normally you don't want to sniff specific browser versions but sometimes you have
 * to when it's impossible to feature detect. So use this with care.
 *
 * @class tinymce.Env
 * @static
 */
define(
  'tinymce.core.Env',
  [
  ],
  function () {
    var nav = navigator, userAgent = nav.userAgent;
    var opera, webkit, ie, ie11, ie12, gecko, mac, iDevice, android, fileApi, phone, tablet, windowsPhone;

    function matchMediaQuery(query) {
      return "matchMedia" in window ? matchMedia(query).matches : false;
    }

    opera = window.opera && window.opera.buildNumber;
    android = /Android/.test(userAgent);
    webkit = /WebKit/.test(userAgent);
    ie = !webkit && !opera && (/MSIE/gi).test(userAgent) && (/Explorer/gi).test(nav.appName);
    ie = ie && /MSIE (\w+)\./.exec(userAgent)[1];
    ie11 = userAgent.indexOf('Trident/') != -1 && (userAgent.indexOf('rv:') != -1 || nav.appName.indexOf('Netscape') != -1) ? 11 : false;
    ie12 = (userAgent.indexOf('Edge/') != -1 && !ie && !ie11) ? 12 : false;
    ie = ie || ie11 || ie12;
    gecko = !webkit && !ie11 && /Gecko/.test(userAgent);
    mac = userAgent.indexOf('Mac') != -1;
    iDevice = /(iPad|iPhone)/.test(userAgent);
    fileApi = "FormData" in window && "FileReader" in window && "URL" in window && !!URL.createObjectURL;
    phone = matchMediaQuery("only screen and (max-device-width: 480px)") && (android || iDevice);
    tablet = matchMediaQuery("only screen and (min-width: 800px)") && (android || iDevice);
    windowsPhone = userAgent.indexOf('Windows Phone') != -1;

    if (ie12) {
      webkit = false;
    }

    // Is a iPad/iPhone and not on iOS5 sniff the WebKit version since older iOS WebKit versions
    // says it has contentEditable support but there is no visible caret.
    var contentEditable = !iDevice || fileApi || userAgent.match(/AppleWebKit\/(\d*)/)[1] >= 534;

    return {
      /**
       * Constant that is true if the browser is Opera.
       *
       * @property opera
       * @type Boolean
       * @final
       */
      opera: opera,

      /**
       * Constant that is true if the browser is WebKit (Safari/Chrome).
       *
       * @property webKit
       * @type Boolean
       * @final
       */
      webkit: webkit,

      /**
       * Constant that is more than zero if the browser is IE.
       *
       * @property ie
       * @type Boolean
       * @final
       */
      ie: ie,

      /**
       * Constant that is true if the browser is Gecko.
       *
       * @property gecko
       * @type Boolean
       * @final
       */
      gecko: gecko,

      /**
       * Constant that is true if the os is Mac OS.
       *
       * @property mac
       * @type Boolean
       * @final
       */
      mac: mac,

      /**
       * Constant that is true if the os is iOS.
       *
       * @property iOS
       * @type Boolean
       * @final
       */
      iOS: iDevice,

      /**
       * Constant that is true if the os is android.
       *
       * @property android
       * @type Boolean
       * @final
       */
      android: android,

      /**
       * Constant that is true if the browser supports editing.
       *
       * @property contentEditable
       * @type Boolean
       * @final
       */
      contentEditable: contentEditable,

      /**
       * Transparent image data url.
       *
       * @property transparentSrc
       * @type Boolean
       * @final
       */
      transparentSrc: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",

      /**
       * Returns true/false if the browser can or can't place the caret after a inline block like an image.
       *
       * @property noCaretAfter
       * @type Boolean
       * @final
       */
      caretAfter: ie != 8,

      /**
       * Constant that is true if the browser supports native DOM Ranges. IE 9+.
       *
       * @property range
       * @type Boolean
       */
      range: window.getSelection && "Range" in window,

      /**
       * Returns the IE document mode for non IE browsers this will fake IE 10.
       *
       * @property documentMode
       * @type Number
       */
      documentMode: ie && !ie12 ? (document.documentMode || 7) : 10,

      /**
       * Constant that is true if the browser has a modern file api.
       *
       * @property fileApi
       * @type Boolean
       */
      fileApi: fileApi,

      /**
       * Constant that is true if the browser supports contentEditable=false regions.
       *
       * @property ceFalse
       * @type Boolean
       */
      ceFalse: (ie === false || ie > 8),

      /**
       * Constant if CSP mode is possible or not. Meaning we can't use script urls for the iframe.
       */
      canHaveCSP: (ie === false || ie > 11),

      desktop: !phone && !tablet,
      windowsPhone: windowsPhone
    };
  }
);

/**
 * EventUtils.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*jshint loopfunc:true*/
/*eslint no-loop-func:0 */

/**
 * This class wraps the browsers native event logic with more convenient methods.
 *
 * @class tinymce.dom.EventUtils
 */
define(
  'tinymce.core.dom.EventUtils',
  [
    "tinymce.core.util.Delay",
    "tinymce.core.Env"
  ],
  function (Delay, Env) {
    "use strict";

    var eventExpandoPrefix = "mce-data-";
    var mouseEventRe = /^(?:mouse|contextmenu)|click/;
    var deprecated = {
      keyLocation: 1, layerX: 1, layerY: 1, returnValue: 1,
      webkitMovementX: 1, webkitMovementY: 1, keyIdentifier: 1
    };

    // Checks if it is our own isDefaultPrevented function
    var hasIsDefaultPrevented = function (event) {
      return event.isDefaultPrevented === returnTrue || event.isDefaultPrevented === returnFalse;
    };

    // Dummy function that gets replaced on the delegation state functions
    var returnFalse = function () {
      return false;
    };

    // Dummy function that gets replaced on the delegation state functions
    var returnTrue = function () {
      return true;
    };

    /**
     * Binds a native event to a callback on the speified target.
     */
    function addEvent(target, name, callback, capture) {
      if (target.addEventListener) {
        target.addEventListener(name, callback, capture || false);
      } else if (target.attachEvent) {
        target.attachEvent('on' + name, callback);
      }
    }

    /**
     * Unbinds a native event callback on the specified target.
     */
    function removeEvent(target, name, callback, capture) {
      if (target.removeEventListener) {
        target.removeEventListener(name, callback, capture || false);
      } else if (target.detachEvent) {
        target.detachEvent('on' + name, callback);
      }
    }

    /**
     * Gets the event target based on shadow dom properties like path and deepPath.
     */
    function getTargetFromShadowDom(event, defaultTarget) {
      var path, target = defaultTarget;

      // When target element is inside Shadow DOM we need to take first element from path
      // otherwise we'll get Shadow Root parent, not actual target element

      // Normalize target for WebComponents v0 implementation (in Chrome)
      path = event.path;
      if (path && path.length > 0) {
        target = path[0];
      }

      // Normalize target for WebComponents v1 implementation (standard)
      if (event.deepPath) {
        path = event.deepPath();
        if (path && path.length > 0) {
          target = path[0];
        }
      }

      return target;
    }

    /**
     * Normalizes a native event object or just adds the event specific methods on a custom event.
     */
    function fix(originalEvent, data) {
      var name, event = data || {}, undef;

      // Copy all properties from the original event
      for (name in originalEvent) {
        // layerX/layerY is deprecated in Chrome and produces a warning
        if (!deprecated[name]) {
          event[name] = originalEvent[name];
        }
      }

      // Normalize target IE uses srcElement
      if (!event.target) {
        event.target = event.srcElement || document;
      }

      // Experimental shadow dom support
      if (Env.experimentalShadowDom) {
        event.target = getTargetFromShadowDom(originalEvent, event.target);
      }

      // Calculate pageX/Y if missing and clientX/Y available
      if (originalEvent && mouseEventRe.test(originalEvent.type) && originalEvent.pageX === undef && originalEvent.clientX !== undef) {
        var eventDoc = event.target.ownerDocument || document;
        var doc = eventDoc.documentElement;
        var body = eventDoc.body;

        event.pageX = originalEvent.clientX + (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
          (doc && doc.clientLeft || body && body.clientLeft || 0);

        event.pageY = originalEvent.clientY + (doc && doc.scrollTop || body && body.scrollTop || 0) -
          (doc && doc.clientTop || body && body.clientTop || 0);
      }

      // Add preventDefault method
      event.preventDefault = function () {
        event.isDefaultPrevented = returnTrue;

        // Execute preventDefault on the original event object
        if (originalEvent) {
          if (originalEvent.preventDefault) {
            originalEvent.preventDefault();
          } else {
            originalEvent.returnValue = false; // IE
          }
        }
      };

      // Add stopPropagation
      event.stopPropagation = function () {
        event.isPropagationStopped = returnTrue;

        // Execute stopPropagation on the original event object
        if (originalEvent) {
          if (originalEvent.stopPropagation) {
            originalEvent.stopPropagation();
          } else {
            originalEvent.cancelBubble = true; // IE
          }
        }
      };

      // Add stopImmediatePropagation
      event.stopImmediatePropagation = function () {
        event.isImmediatePropagationStopped = returnTrue;
        event.stopPropagation();
      };

      // Add event delegation states
      if (hasIsDefaultPrevented(event) === false) {
        event.isDefaultPrevented = returnFalse;
        event.isPropagationStopped = returnFalse;
        event.isImmediatePropagationStopped = returnFalse;
      }

      // Add missing metaKey for IE 8
      if (typeof event.metaKey == 'undefined') {
        event.metaKey = false;
      }

      return event;
    }

    /**
     * Bind a DOMContentLoaded event across browsers and executes the callback once the page DOM is initialized.
     * It will also set/check the domLoaded state of the event_utils instance so ready isn't called multiple times.
     */
    function bindOnReady(win, callback, eventUtils) {
      var doc = win.document, event = { type: 'ready' };

      if (eventUtils.domLoaded) {
        callback(event);
        return;
      }

      function isDocReady() {
        // Check complete or interactive state if there is a body
        // element on some iframes IE 8 will produce a null body
        return doc.readyState === "complete" || (doc.readyState === "interactive" && doc.body);
      }

      // Gets called when the DOM is ready
      function readyHandler() {
        if (!eventUtils.domLoaded) {
          eventUtils.domLoaded = true;
          callback(event);
        }
      }

      function waitForDomLoaded() {
        if (isDocReady()) {
          removeEvent(doc, "readystatechange", waitForDomLoaded);
          readyHandler();
        }
      }

      function tryScroll() {
        try {
          // If IE is used, use the trick by Diego Perini licensed under MIT by request to the author.
          // http://javascript.nwbox.com/IEContentLoaded/
          doc.documentElement.doScroll("left");
        } catch (ex) {
          Delay.setTimeout(tryScroll);
          return;
        }

        readyHandler();
      }

      // Use W3C method (exclude IE 9,10 - readyState "interactive" became valid only in IE 11)
      if (doc.addEventListener && !(Env.ie && Env.ie < 11)) {
        if (isDocReady()) {
          readyHandler();
        } else {
          addEvent(win, 'DOMContentLoaded', readyHandler);
        }
      } else {
        // Use IE method
        addEvent(doc, "readystatechange", waitForDomLoaded);

        // Wait until we can scroll, when we can the DOM is initialized
        if (doc.documentElement.doScroll && win.self === win.top) {
          tryScroll();
        }
      }

      // Fallback if any of the above methods should fail for some odd reason
      addEvent(win, 'load', readyHandler);
    }

    /**
     * This class enables you to bind/unbind native events to elements and normalize it's behavior across browsers.
     */
    function EventUtils() {
      var self = this, events = {}, count, expando, hasFocusIn, hasMouseEnterLeave, mouseEnterLeave;

      expando = eventExpandoPrefix + (+new Date()).toString(32);
      hasMouseEnterLeave = "onmouseenter" in document.documentElement;
      hasFocusIn = "onfocusin" in document.documentElement;
      mouseEnterLeave = { mouseenter: 'mouseover', mouseleave: 'mouseout' };
      count = 1;

      // State if the DOMContentLoaded was executed or not
      self.domLoaded = false;
      self.events = events;

      /**
       * Executes all event handler callbacks for a specific event.
       *
       * @private
       * @param {Event} evt Event object.
       * @param {String} id Expando id value to look for.
       */
      function executeHandlers(evt, id) {
        var callbackList, i, l, callback, container = events[id];

        callbackList = container && container[evt.type];
        if (callbackList) {
          for (i = 0, l = callbackList.length; i < l; i++) {
            callback = callbackList[i];

            // Check if callback exists might be removed if a unbind is called inside the callback
            if (callback && callback.func.call(callback.scope, evt) === false) {
              evt.preventDefault();
            }

            // Should we stop propagation to immediate listeners
            if (evt.isImmediatePropagationStopped()) {
              return;
            }
          }
        }
      }

      /**
       * Binds a callback to an event on the specified target.
       *
       * @method bind
       * @param {Object} target Target node/window or custom object.
       * @param {String} names Name of the event to bind.
       * @param {function} callback Callback function to execute when the event occurs.
       * @param {Object} scope Scope to call the callback function on, defaults to target.
       * @return {function} Callback function that got bound.
       */
      self.bind = function (target, names, callback, scope) {
        var id, callbackList, i, name, fakeName, nativeHandler, capture, win = window;

        // Native event handler function patches the event and executes the callbacks for the expando
        function defaultNativeHandler(evt) {
          executeHandlers(fix(evt || win.event), id);
        }

        // Don't bind to text nodes or comments
        if (!target || target.nodeType === 3 || target.nodeType === 8) {
          return;
        }

        // Create or get events id for the target
        if (!target[expando]) {
          id = count++;
          target[expando] = id;
          events[id] = {};
        } else {
          id = target[expando];
        }

        // Setup the specified scope or use the target as a default
        scope = scope || target;

        // Split names and bind each event, enables you to bind multiple events with one call
        names = names.split(' ');
        i = names.length;
        while (i--) {
          name = names[i];
          nativeHandler = defaultNativeHandler;
          fakeName = capture = false;

          // Use ready instead of DOMContentLoaded
          if (name === "DOMContentLoaded") {
            name = "ready";
          }

          // DOM is already ready
          if (self.domLoaded && name === "ready" && target.readyState == 'complete') {
            callback.call(scope, fix({ type: name }));
            continue;
          }

          // Handle mouseenter/mouseleaver
          if (!hasMouseEnterLeave) {
            fakeName = mouseEnterLeave[name];

            if (fakeName) {
              nativeHandler = function (evt) {
                var current, related;

                current = evt.currentTarget;
                related = evt.relatedTarget;

                // Check if related is inside the current target if it's not then the event should
                // be ignored since it's a mouseover/mouseout inside the element
                if (related && current.contains) {
                  // Use contains for performance
                  related = current.contains(related);
                } else {
                  while (related && related !== current) {
                    related = related.parentNode;
                  }
                }

                // Fire fake event
                if (!related) {
                  evt = fix(evt || win.event);
                  evt.type = evt.type === 'mouseout' ? 'mouseleave' : 'mouseenter';
                  evt.target = current;
                  executeHandlers(evt, id);
                }
              };
            }
          }

          // Fake bubbling of focusin/focusout
          if (!hasFocusIn && (name === "focusin" || name === "focusout")) {
            capture = true;
            fakeName = name === "focusin" ? "focus" : "blur";
            nativeHandler = function (evt) {
              evt = fix(evt || win.event);
              evt.type = evt.type === 'focus' ? 'focusin' : 'focusout';
              executeHandlers(evt, id);
            };
          }

          // Setup callback list and bind native event
          callbackList = events[id][name];
          if (!callbackList) {
            events[id][name] = callbackList = [{ func: callback, scope: scope }];
            callbackList.fakeName = fakeName;
            callbackList.capture = capture;
            //callbackList.callback = callback;

            // Add the nativeHandler to the callback list so that we can later unbind it
            callbackList.nativeHandler = nativeHandler;

            // Check if the target has native events support

            if (name === "ready") {
              bindOnReady(target, nativeHandler, self);
            } else {
              addEvent(target, fakeName || name, nativeHandler, capture);
            }
          } else {
            if (name === "ready" && self.domLoaded) {
              callback({ type: name });
            } else {
              // If it already has an native handler then just push the callback
              callbackList.push({ func: callback, scope: scope });
            }
          }
        }

        target = callbackList = 0; // Clean memory for IE

        return callback;
      };

      /**
       * Unbinds the specified event by name, name and callback or all events on the target.
       *
       * @method unbind
       * @param {Object} target Target node/window or custom object.
       * @param {String} names Optional event name to unbind.
       * @param {function} callback Optional callback function to unbind.
       * @return {EventUtils} Event utils instance.
       */
      self.unbind = function (target, names, callback) {
        var id, callbackList, i, ci, name, eventMap;

        // Don't bind to text nodes or comments
        if (!target || target.nodeType === 3 || target.nodeType === 8) {
          return self;
        }

        // Unbind event or events if the target has the expando
        id = target[expando];
        if (id) {
          eventMap = events[id];

          // Specific callback
          if (names) {
            names = names.split(' ');
            i = names.length;
            while (i--) {
              name = names[i];
              callbackList = eventMap[name];

              // Unbind the event if it exists in the map
              if (callbackList) {
                // Remove specified callback
                if (callback) {
                  ci = callbackList.length;
                  while (ci--) {
                    if (callbackList[ci].func === callback) {
                      var nativeHandler = callbackList.nativeHandler;
                      var fakeName = callbackList.fakeName, capture = callbackList.capture;

                      // Clone callbackList since unbind inside a callback would otherwise break the handlers loop
                      callbackList = callbackList.slice(0, ci).concat(callbackList.slice(ci + 1));
                      callbackList.nativeHandler = nativeHandler;
                      callbackList.fakeName = fakeName;
                      callbackList.capture = capture;

                      eventMap[name] = callbackList;
                    }
                  }
                }

                // Remove all callbacks if there isn't a specified callback or there is no callbacks left
                if (!callback || callbackList.length === 0) {
                  delete eventMap[name];
                  removeEvent(target, callbackList.fakeName || name, callbackList.nativeHandler, callbackList.capture);
                }
              }
            }
          } else {
            // All events for a specific element
            for (name in eventMap) {
              callbackList = eventMap[name];
              removeEvent(target, callbackList.fakeName || name, callbackList.nativeHandler, callbackList.capture);
            }

            eventMap = {};
          }

          // Check if object is empty, if it isn't then we won't remove the expando map
          for (name in eventMap) {
            return self;
          }

          // Delete event object
          delete events[id];

          // Remove expando from target
          try {
            // IE will fail here since it can't delete properties from window
            delete target[expando];
          } catch (ex) {
            // IE will set it to null
            target[expando] = null;
          }
        }

        return self;
      };

      /**
       * Fires the specified event on the specified target.
       *
       * @method fire
       * @param {Object} target Target node/window or custom object.
       * @param {String} name Event name to fire.
       * @param {Object} args Optional arguments to send to the observers.
       * @return {EventUtils} Event utils instance.
       */
      self.fire = function (target, name, args) {
        var id;

        // Don't bind to text nodes or comments
        if (!target || target.nodeType === 3 || target.nodeType === 8) {
          return self;
        }

        // Build event object by patching the args
        args = fix(null, args);
        args.type = name;
        args.target = target;

        do {
          // Found an expando that means there is listeners to execute
          id = target[expando];
          if (id) {
            executeHandlers(args, id);
          }

          // Walk up the DOM
          target = target.parentNode || target.ownerDocument || target.defaultView || target.parentWindow;
        } while (target && !args.isPropagationStopped());

        return self;
      };

      /**
       * Removes all bound event listeners for the specified target. This will also remove any bound
       * listeners to child nodes within that target.
       *
       * @method clean
       * @param {Object} target Target node/window object.
       * @return {EventUtils} Event utils instance.
       */
      self.clean = function (target) {
        var i, children, unbind = self.unbind;

        // Don't bind to text nodes or comments
        if (!target || target.nodeType === 3 || target.nodeType === 8) {
          return self;
        }

        // Unbind any element on the specified target
        if (target[expando]) {
          unbind(target);
        }

        // Target doesn't have getElementsByTagName it's probably a window object then use it's document to find the children
        if (!target.getElementsByTagName) {
          target = target.document;
        }

        // Remove events from each child element
        if (target && target.getElementsByTagName) {
          unbind(target);

          children = target.getElementsByTagName('*');
          i = children.length;
          while (i--) {
            target = children[i];

            if (target[expando]) {
              unbind(target);
            }
          }
        }

        return self;
      };

      /**
       * Destroys the event object. Call this on IE to remove memory leaks.
       */
      self.destroy = function () {
        events = {};
      };

      // Legacy function for canceling events
      self.cancel = function (e) {
        if (e) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }

        return false;
      };
    }

    EventUtils.Event = new EventUtils();
    EventUtils.Event.bind(window, 'ready', function () { });

    return EventUtils;
  }
);

/**
 * Sizzle.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 *
 * @ignore-file
 */

/*jshint bitwise:false, expr:true, noempty:false, sub:true, eqnull:true, latedef:false, maxlen:255 */
/*eslint-disable */

/**
 * Sizzle CSS Selector Engine v@VERSION
 * http://sizzlejs.com/
 *
 * Copyright 2008, 2014 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: @DATE
 */
define(
  'tinymce.core.dom.Sizzle',
  [],
  function () {
    var i,
      support,
      Expr,
      getText,
      isXML,
      tokenize,
      compile,
      select,
      outermostContext,
      sortInput,
      hasDuplicate,

      // Local document vars
      setDocument,
      document,
      docElem,
      documentIsHTML,
      rbuggyQSA,
      rbuggyMatches,
      matches,
      contains,

      // Instance-specific data
      expando = "sizzle" + -(new Date()),
      preferredDoc = window.document,
      dirruns = 0,
      done = 0,
      classCache = createCache(),
      tokenCache = createCache(),
      compilerCache = createCache(),
      sortOrder = function (a, b) {
        if (a === b) {
          hasDuplicate = true;
        }
        return 0;
      },

      // General-purpose constants
      strundefined = typeof undefined,
      MAX_NEGATIVE = 1 << 31,

      // Instance methods
      hasOwn = ({}).hasOwnProperty,
      arr = [],
      pop = arr.pop,
      push_native = arr.push,
      push = arr.push,
      slice = arr.slice,
      // Use a stripped-down indexOf if we can't use a native one
      indexOf = arr.indexOf || function (elem) {
        var i = 0,
          len = this.length;
        for (; i < len; i++) {
          if (this[i] === elem) {
            return i;
          }
        }
        return -1;
      },

      booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

      // Regular expressions

      // http://www.w3.org/TR/css3-selectors/#whitespace
      whitespace = "[\\x20\\t\\r\\n\\f]",

      // http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
      identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

      // Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
      attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
        // Operator (capture 2)
        "*([*^$|!~]?=)" + whitespace +
        // "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
        "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
        "*\\]",

      pseudos = ":(" + identifier + ")(?:\\((" +
        // To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
        // 1. quoted (capture 3; capture 4 or capture 5)
        "('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
        // 2. simple (capture 6)
        "((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
        // 3. anything else (capture 2)
        ".*" +
        ")\\)|)",

      // Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
      rtrim = new RegExp("^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g"),

      rcomma = new RegExp("^" + whitespace + "*," + whitespace + "*"),
      rcombinators = new RegExp("^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*"),

      rattributeQuotes = new RegExp("=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g"),

      rpseudo = new RegExp(pseudos),
      ridentifier = new RegExp("^" + identifier + "$"),

      matchExpr = {
        "ID": new RegExp("^#(" + identifier + ")"),
        "CLASS": new RegExp("^\\.(" + identifier + ")"),
        "TAG": new RegExp("^(" + identifier + "|[*])"),
        "ATTR": new RegExp("^" + attributes),
        "PSEUDO": new RegExp("^" + pseudos),
        "CHILD": new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
          "*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
          "*(\\d+)|))" + whitespace + "*\\)|)", "i"),
        "bool": new RegExp("^(?:" + booleans + ")$", "i"),
        // For use in libraries implementing .is()
        // We use this for POS matching in `select`
        "needsContext": new RegExp("^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
          whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i")
      },

      rinputs = /^(?:input|select|textarea|button)$/i,
      rheader = /^h\d$/i,

      rnative = /^[^{]+\{\s*\[native \w/,

      // Easily-parseable/retrievable ID or TAG or CLASS selectors
      rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

      rsibling = /[+~]/,
      rescape = /'|\\/g,

      // CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
      runescape = new RegExp("\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig"),
      funescape = function (_, escaped, escapedWhitespace) {
        var high = "0x" + escaped - 0x10000;
        // NaN means non-codepoint
        // Support: Firefox<24
        // Workaround erroneous numeric interpretation of +"0x"
        return high !== high || escapedWhitespace ?
          escaped :
          high < 0 ?
            // BMP codepoint
            String.fromCharCode(high + 0x10000) :
            // Supplemental Plane codepoint (surrogate pair)
            String.fromCharCode(high >> 10 | 0xD800, high & 0x3FF | 0xDC00);
      };

    // Optimize for push.apply( _, NodeList )
    try {
      push.apply(
        (arr = slice.call(preferredDoc.childNodes)),
        preferredDoc.childNodes
      );
      // Support: Android<4.0
      // Detect silently failing push.apply
      arr[preferredDoc.childNodes.length].nodeType;
    } catch (e) {
      push = {
        apply: arr.length ?

          // Leverage slice if possible
          function (target, els) {
            push_native.apply(target, slice.call(els));
          } :

          // Support: IE<9
          // Otherwise append directly
          function (target, els) {
            var j = target.length,
              i = 0;
            // Can't trust NodeList.length
            while ((target[j++] = els[i++])) { }
            target.length = j - 1;
          }
      };
    }

    function Sizzle(selector, context, results, seed) {
      var match, elem, m, nodeType,
        // QSA vars
        i, groups, old, nid, newContext, newSelector;

      if ((context ? context.ownerDocument || context : preferredDoc) !== document) {
        setDocument(context);
      }

      context = context || document;
      results = results || [];

      if (!selector || typeof selector !== "string") {
        return results;
      }

      if ((nodeType = context.nodeType) !== 1 && nodeType !== 9) {
        return [];
      }

      if (documentIsHTML && !seed) {

        // Shortcuts
        if ((match = rquickExpr.exec(selector))) {
          // Speed-up: Sizzle("#ID")
          if ((m = match[1])) {
            if (nodeType === 9) {
              elem = context.getElementById(m);
              // Check parentNode to catch when Blackberry 4.6 returns
              // nodes that are no longer in the document (jQuery #6963)
              if (elem && elem.parentNode) {
                // Handle the case where IE, Opera, and Webkit return items
                // by name instead of ID
                if (elem.id === m) {
                  results.push(elem);
                  return results;
                }
              } else {
                return results;
              }
            } else {
              // Context is not a document
              if (context.ownerDocument && (elem = context.ownerDocument.getElementById(m)) &&
                contains(context, elem) && elem.id === m) {
                results.push(elem);
                return results;
              }
            }

            // Speed-up: Sizzle("TAG")
          } else if (match[2]) {
            push.apply(results, context.getElementsByTagName(selector));
            return results;

            // Speed-up: Sizzle(".CLASS")
          } else if ((m = match[3]) && support.getElementsByClassName) {
            push.apply(results, context.getElementsByClassName(m));
            return results;
          }
        }

        // QSA path
        if (support.qsa && (!rbuggyQSA || !rbuggyQSA.test(selector))) {
          nid = old = expando;
          newContext = context;
          newSelector = nodeType === 9 && selector;

          // qSA works strangely on Element-rooted queries
          // We can work around this by specifying an extra ID on the root
          // and working up from there (Thanks to Andrew Dupont for the technique)
          // IE 8 doesn't work on object elements
          if (nodeType === 1 && context.nodeName.toLowerCase() !== "object") {
            groups = tokenize(selector);

            if ((old = context.getAttribute("id"))) {
              nid = old.replace(rescape, "\\$&");
            } else {
              context.setAttribute("id", nid);
            }
            nid = "[id='" + nid + "'] ";

            i = groups.length;
            while (i--) {
              groups[i] = nid + toSelector(groups[i]);
            }
            newContext = rsibling.test(selector) && testContext(context.parentNode) || context;
            newSelector = groups.join(",");
          }

          if (newSelector) {
            try {
              push.apply(results,
                newContext.querySelectorAll(newSelector)
              );
              return results;
            } catch (qsaError) {
            } finally {
              if (!old) {
                context.removeAttribute("id");
              }
            }
          }
        }
      }

      // All others
      return select(selector.replace(rtrim, "$1"), context, results, seed);
    }

    /**
     * Create key-value caches of limited size
     * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
     * property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
     * deleting the oldest entry
     */
    function createCache() {
      var keys = [];

      function cache(key, value) {
        // Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
        if (keys.push(key + " ") > Expr.cacheLength) {
          // Only keep the most recent entries
          delete cache[keys.shift()];
        }
        return (cache[key + " "] = value);
      }
      return cache;
    }

    /**
     * Mark a function for special use by Sizzle
     * @param {Function} fn The function to mark
     */
    function markFunction(fn) {
      fn[expando] = true;
      return fn;
    }

    /**
     * Support testing using an element
     * @param {Function} fn Passed the created div and expects a boolean result
     */
    function assert(fn) {
      var div = document.createElement("div");

      try {
        return !!fn(div);
      } catch (e) {
        return false;
      } finally {
        // Remove from its parent by default
        if (div.parentNode) {
          div.parentNode.removeChild(div);
        }
        // release memory in IE
        div = null;
      }
    }

    /**
     * Adds the same handler for all of the specified attrs
     * @param {String} attrs Pipe-separated list of attributes
     * @param {Function} handler The method that will be applied
     */
    function addHandle(attrs, handler) {
      var arr = attrs.split("|"),
        i = attrs.length;

      while (i--) {
        Expr.attrHandle[arr[i]] = handler;
      }
    }

    /**
     * Checks document order of two siblings
     * @param {Element} a
     * @param {Element} b
     * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
     */
    function siblingCheck(a, b) {
      var cur = b && a,
        diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
          (~��w�����>��{y�i�`F�_u'�n�%����^�ȿ�}\�Z�i���.��]���>���_�����vvJ�:�t�/T����-��qT�����E����{�z�kG�(���?��N���|��'�_����ގ����v7gύ����=�ެm=����}��W�����޹3��r��t{���η{~��O�u��5�?Y�du���v�2}��p�u/D>�-���W��ʏ_�o2��Y��~�W-]߶�����{���{��۾�kCN��������GRߜ�����=���c����o�����߷�{�����}��޳���������o_�#'�u�������n������<4P���W�>����O��8M��zm�����o��זּ���ʬ�/nV���͇��?��w��C�q�]�/����h^:�|���4r<������|�wͰ��t��S�����������>�����:l����n���kw�e���~K��8�ۿݣil���y������-?�?zS/_&���'^_|k��7,����FmYu.���='[}�����x�4�����������~ܰ5���S��w��u�}��c���z������?ݿ�sכY�߫�7�"�wo�����z�S�����?�ך~o����������{���ק��������]�Ž����?��/�ﻲ6�U�gk2��q�O�n��˿qo4m�'�1����D;>��wu�&�m�Ǧ��ڄz���S������%�����������=6������~�zR��a�����?3&���5�`��$2�-��u������?ѝ���<|7�/�<�3������o��[�����?��,��Y�%u}������.�g���wc��������߲`��o��y��v[�����]��z7޿����?<��G���[����y�����������u��WVu��H�����Oo���&�?�w����g���d�������捹P���Xo�����_v���.���/�����ɇ������:�Z���n~���m<߽���Ow�6?�-zI�����vt�^�����5��!5����������o�cχ������m�o��
%���sF+�VG���,=�?����G��ƿ�s�=s��F�?]��������;��>?S|/��?��.�>���[�9Z�{���z��#��<��M�����r鍭h����o�~���L���o��}����ػ�e���u�����A��;|?͗����תdͿ�~��㇭��7�w���?x�ޥA��r���vW��F>�Z0*Хa6�{m�>�>�����o6_������^z��}u��,;6<�w�sy���?l\u�s=�~E���-Gu����v�ݽu~]u�뜻���Xo�
���������]v���V߯[�ٶl:�ާ�o�|�����>�_��{uξ�]�o������q������s���¾;�{���t}���~�?O��Ԝ�߳��j�޵�O��������������^����u~���������_��������_g�;�]�#�;���-Φ}����z���u�o�;��ϵ������w��mν���y��{���$-��L������jv}[x����9~�N���&�1W���ߓ��/z֢��-ח��_Z������~<y�[�{�{���E�C=����&�?z��c���_�ec+�ݖ<\�{ǜx��󒓧WO�7�'�b_{���I{�9�����{�������Ի��/�u׻���j�o�q�~I������>jN�o���nǹ������_�7<F��w���ϞM��%+����C�ۘ��yo����φ,�%�a~�g{o������{B���}����w%?շ�]���?f���)���R'��k_��(�~�-��9�����3�=��������N�L������r˿�g}�������x��g��A�w*�Iq�����)W��^�����{��b�3e�/}to%7{�7���+)j����=��G�����%�k�e�ҩ,�������2h��~W�^[��?�d*���Gz���b?ǿ�%/�Bo�:������!�,���y��^����ujte��������/��)���W�7��{������t[m������v�图��&�[=�ޖ57�����le����O����C�:���kx+�����^w�W�Tޕk[��ϿSe9���>��������������n~����_���Y�>o�&״��s�6��Kv4ռ���<[�����g�2������s?.���ﳟ��{SV����w���U������_;�/��k��S�?ׂ�{g?�]�Vt�z���n�v��~z�]D�o�3/m���q����O\��D}���l����?ޯn��������{���d�Ȝ/(�����m��꼿e�����{ܱo�u�譗]����m�/��tn���\>�n�����0��
��v���u��������W����=Q^sq~����Z��Oo�6�ں����]�0���M�cj��z�{צ�J��yt�w������B|�u�q1�s�?S?n�S.�{��������/P���̯�����R������n��<�o����|�������}n�5e���ۯ��3{_�u��.w���ȿ��w��i7�������o��T��7�^��m�g��uճ5ߎ�}[�����k��N�T�^�//?����a=����s���r��Fgv/����s��A�����37�G�c�V�?ߒ��se��_�:S6g���uww�����yO��[��_���/���=R�u_{�����i���t���W����U7u���{����>W�|���{�N{s���G6�w�����'kߟ���_�7�]�3nZ��&�l���׾�}������9d��,�iտ�O��C��?oKh���:�ٵ��c+�ݻ�_m�{�g��ܣ���,��۝~7k���߬s�x��'�4~o���޾���������?�����y����;���o���3��u�s�����']�~~�!�f�Ӥ��_o?�z���7;��4;o�����������W��m���O����������p'�W����um�v�ğ�J�ѽ��w��?��o�Z����N�֪����3R;��׫�u��ެ�Z���_ʄtp��N1�']�ۮ���ӿP跿r=�go����9.O�7�nlϮq��;o����߿������{�w����^\�����ky����<���'s���3~��ʟ�����uמQ~��W_���=�>'�[ig��]���޽���}����Қ�/��/����������_��������۟���ߕ�m���۳}��e�M�7�л���ǟ��j[C�x�����.�;���Ӻ;��*��照��ǭ�vt]\�}�{*�>���[9�\}g�~+�=���]��{��{ݿQ���}�j_<��ݟ?|�lR�=/
��^���%���w�����}�����f�eO���:~7y��������O睭gy���_��ӵ
        assert(function (div) {
          // Select is set to empty string on purpose
          // This is to test IE's treatment of not explicitly
          // setting a boolean content attribute,
          // since its presence should be enough
          // http://bugs.jquery.com/ticket/12359
          div.innerHTML = "<select msallowcapture=''><option selected=''></option></select>";

          // Support: IE8, Opera 11-12.16
          // Nothing should be selected when empty strings follow ^= or $= or *=
          // The test attribute must be unknown in Opera but "safe" for WinRT
          // http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
          if (div.querySelectorAll("[msallowcapture^='']").length) {
            rbuggyQSA.push("[*^$]=" + whitespace + "*(?:''|\"\")");
          }

          // Support: IE8
          // Boolean attributes and "value" are not treated correctly
          if (!div.querySelectorAll("[selected]").length) {
            rbuggyQSA.push("\\[" + whitespace + "*(?:value|" + booleans + ")");
          }

          // Webkit/Opera - :checked should return selected option elements
          // http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
          // IE8 throws error here and will not see later tests
          if (!div.querySelectorAll(":checked").length) {
            rbuggyQSA.push(":checked");
          }
        });

        assert(function (div) {
          // Support: Windows 8 Native Apps
          // The type and name attributes are restricted during .innerHTML assignment
          var input = doc.createElement("input");
          input.setAttribute("type", "hidden");
          div.appendChild(input).setAttribute("name", "D");

          // Support: IE8
          // Enforce case-sensitivity of name attribute
          if (div.querySelectorAll("[name=d]").length) {
            rbuggyQSA.push("name" + whitespace + "*[*^$|!~]?=");
          }

          // FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
          // IE8 throws error here and will not see later tests
          if (!div.querySelectorAll(":enabled").length) {
            rbuggyQSA.push(":enabled", ":disabled");
          }

          // Opera 10-11 does not throw on post-comma invalid pseudos
          div.querySelectorAll("*,:x");
          rbuggyQSA.push(",.*:");
        });
      }

      if ((support.matchesSelector = rnative.test((matches = docElem.matches ||
        docElem.webkitMatchesSelector ||
        docElem.mozMatchesSelector ||
        docElem.oMatchesSelector ||
        docElem.msMatchesSelector)))) {

        assert(function (div) {
          // Check to see if it's possible to do matchesSelector
          // on a disconnected node (IE 9)
          support.disconnectedMatch = matches.call(div, "div");

          // This should fail with an exception
          // Gecko does not error, returns false instead
          matches.call(div, "[s!='']:x");
          rbuggyMatches.push("!=", pseudos);
        });
      }

      rbuggyQSA = rbuggyQSA.length && new RegExp(rbuggyQSA.join("|"));
      rbuggyMatches = rbuggyMatches.length && new RegExp(rbuggyMatches.join("|"));

      /* Contains
      ---------------------------------------------------------------------- */
      hasCompare = rnative.test(docElem.compareDocumentPosition);

      // Element contains another
      // Purposefully does not implement inclusive descendent
      // As in, an element does not contain itself
      contains = hasCompare || rnative.test(docElem.contains) ?
        function (a, b) {
          var adown = a.nodeType === 9 ? a.documentElement : a,
            bup = b && b.parentNode;
          return a === bup || !!(bup && bup.nodeType === 1 && (
            adown.contains ?
              adown.contains(bup) :
              a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
          ));
        } :
        function (a, b) {
          if (b) {
            while ((b = b.parentNode)) {
              if (b === a) {
                return true;
              }
            }
          }
          return false;
        };

      /* Sorting
      ---------------------------------------------------------------------- */

      // Document order sorting
      sortOrder = hasCompare ?
        function (a, b) {

          // Flag for duplicate removal
          if (a === b) {
            hasDuplicate = true;
            return 0;
          }

          // Sort on method existence if only one input has compareDocumentPosition
          var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
          if (compare) {
            return compare;
          }

          // Calculate position if both inputs belong to the same document
          compare = (a.ownerDocument || a) === (b.ownerDocument || b) ?
            a.compareDocumentPosition(b) :

            // Otherwise we know they are disconnected
            1;

          // Disconnected nodes
          if (compare & 1 ||
            (!support.sortDetached && b.compareDocumentPosition(a) === compare)) {

            // Choose the first element that is related to our preferred document
            if (a === doc || a.ownerDocument === preferredDoc && contains(preferredDoc, a)) {
              return -1;
            }
            if (b === doc || b.ownerDocument === preferredDoc && contains(preferredDoc, b)) {
              return 1;
            }

            // Maintain original order
            return sortInput ?
              (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) :
              0;
          }

          return compare & 4 ? -1 : 1;
        } :
        function (a, b) {
          // Exit early if the nodes are identical
          if (a === b) {
            hasDuplicate = true;
            return 0;
          }

          var cur,
            i = 0,
            aup = a.parentNode,
            bup = b.parentNode,
            ap = [a],
            bp = [b];

          // Parentless nodes are either documents or disconnected
          if (!aup || !bup) {
            return a === doc ? -1 :
              b === doc ? 1 :
                aup ? -1 :
                  bup ? 1 :
                    sortInput ?
                      (indexOf.call(sortInput, a) - indexOf.call(sortInput, b)) :
                      0;

            // If the nodes are siblings, we can do a quick check
          } else if (aup === bup) {
            return siblingCheck(a, b);
          }

          // Otherwise we need full lists of their ancestors for comparison
          cur = a;
          while ((cur = cur.parentNode)) {
            ap.unshift(cur);
          }
          cur = b;
          while ((cur = cur.parentNode)) {
            bp.unshift(cur);
          }

          // Walk down the tree looking for a discrepancy
          while (ap[i] === bp[i]) {
            i++;
          }

          return i ?
            // Do a sibling check if the nodes have a common ancestor
            siblingCheck(ap[i], bp[i]) :

            // Otherwise nodes in our document sort first
            ap[i] === preferredDoc ? -1 :
              bp[i] === preferredDoc ? 1 :
                0;
        };

      return doc;
    };

    Sizzle.matches = function (expr, elements) {
      return Sizzle(expr, null, null, elements);
    };

    Sizzle.matchesSelector = function (elem, expr) {
      // Set document vars if needed
      if ((elem.ownerDocument || elem) !== document) {
        setDocument(elem);
      }

      // Make sure that attribute selectors are quoted
      expr = expr.replace(rattributeQuotes, "='$1']");

      if (support.matchesSelector && documentIsHTML &&
        (!rbuggyMatches || !rbuggyMatches.test(expr)) &&
        (!rbuggyQSA || !rbuggyQSA.test(expr))) {

        try {
          var ret = matches.call(elem, expr);

          // IE 9's matchesSelector returns false on disconnected nodes
          if (ret || support.disconnectedMatch ||
            // As well, disconnected nodes are said to be in a document
            // fragment in IE 9
            elem.documen�@�`���0 	�.�إ �XT�"eHC� ; Ђ
��4�l @�r�8��DQ�L0yBF @�#E(1P�-x�<j� ��� T $�
�����L`�3&C�RQC��*T	��T�(�h�H,��9�/��X4�XV�9� H�4�)S(:%((�HE�P6�2�F�8`�*FĀ� �L���D0! Q�^����
�d$�uCH���H(�_F�P2�0$ �`A����F UXs6.�< d��>�u ����#p���H E�*�I P ��&*7�(�R(�Ї��+��_$��� �P����O���` ��3��.d&�T7��R��#ָɰ�B8�Ix���ҀA�
��KEr�"�D�@# % 
�Z�Џ� �l4�,!�0�7P
�M ( ! )dg
�^T$�"�Y e*�<��`X�@3�� l�� ��y$�E1�� #b	��B��x`+��p�ME����A�&i�$HFD �!̄�W��H�
)C'�>		a2�C`��� B�;P�����S�T	pb!n$CD`P>E�hH
,P"m��4+���`�+TMb��� )&2�

8�0%1�\�
"H hB� �t����$�8Q
U�S
-�DB�@��(u �!*�M�A�Cq��B�@%�CP�qp�F�"7 &�&�`�G���2 a �Y���9"PHH
A�%΢mJKAP�� C� �0/D����
$	�(<��KBA'
������, �$BZ�`d"�@ C� �@�T�nE��RBF
& E@C<�D�X��X ����Ă�
х������U7�符5�:g�E�E��Z?����,@�b���0�0���JfA2��,D8 Uhp`B���E!�	"����ppQ�@ tCV�s8܀3 Fu�͐�@
��)6�ЪD I�'2h��fR|0By PXv��Dy$\ � r�p#��c#Xۇ/�+0��C��b�GF�OBa��A��q8�wi��+G�M-3B�8&0�+� @�$R ��\0C$MeC@M�e�RVEL��%`��A�p!`� �0��Ubز��<Q��iB��<OX���
aM�� �$"yڹ(DT�#�@�%��#��ND�r���b�@0 �LQ�f1	U@Ĳ��%ȇ2
(� >%�I�
8�2��G�Hq�ܝ� 6A��&��+b�5@�����P���(w�Y�`��pq@1d0
H��(� W!dX�@B#�fh��j��1V��D ��4���J �Yn���J[�P �Y@�
Q`���� Le�|�� 23�Ĥ�'�!�Q) N$��4Y!�a�Q   � �@�%�� �G�`�%�����ϣ$�dRpq�F�:6�� P[�i!%ph���ZrFB: 
@i>��(q3�@E 0�PĪHD�G�1f2�r����$	C�H�A<`���@��-9�� +�a @WgdC�$
0�S{���X� � �>��  � ƀ`� � ]�Ĵ
�nded�@<�ESFG[ a�"%�p8�",�E��F�,b�H0$F��F1?�T���: ��p{��~p %&;D�h`_fB��̃g��Eq"�a4�ă@�0��	��*R
�pDj  @ ����0��ae�3U�*%"ud��"�"@�E@��b tŐ�X ��v9�$��g@�BI��AUP.�%��3X�A�L������I��2���
@p��*��CI&�����ˈ�!��
�G�|�%�f�(!PG!�mT�1tP
����&"hE$��a��Cp������
 `"в�$�% ����" s,PP��p��0�H��P���@@Bn�@!��@�&�3D��@A��A��Y`�)�D �
�F��H�$&�W��0	`0�&����At��á�
,ΐ����BfF��X<Pu�@�P���P�x�G
�B��`(�� ��
� t Z��0m%(,I�-@�\P�I��ɬ��
1C؋        2 what (child|of-type)
            3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
            4 xn-component of xn+y argument ([+-]?\d*n|)
            5 sign of xn-component
            6 x of xn-component
            7 sign of y-component
            8 y of y-component
          */
          match[1] = match[1].toLowerCase();

          if (match[1].slice(0, 3) === "nth") {
            // nth-* requires argument
            if (!match[3]) {
              Sizzle.error(match[0]);
            }

            // numeric x and y parameters for Expr.filter.CHILD
            // remember that false/true cast respectively to 0/1
            match[4] = +(match[4] ? match[5] + (match[6] || 1) : 2 * (match[3] === "even" || match[3] === "odd"));
            match[5] = +((match[7] + match[8]) || match[3] === "odd");

            // other types prohibit arguments
          } else if (match[3]) {
            Sizzle.error(match[0]);
          }

          return match;
        },

        "PSEUDO": function (match) {
          var excess,
            unquoted = !match[6] && match[2];

          if (matchExpr["CHILD"].test(match[0])) {
            return null;
          }

          // Accept quoted arguments as-is
          if (match[3]) {
            match[2] = match[4] || match[5] || "";

            // Strip excess characters from unquoted arguments
          } else if (unquoted && rpseudo.test(unquoted) &&
            // Get excess from tokenize (recursively)
            (excess = tokenize(unquoted, true)) &&
            // advance to the next closing parenthesis
            (excess = unquoted.indexOf(")", unquoted.length - excess) - unquoted.length)) {

            // excess is a negative index
            match[0] = match[0].slice(0, excess);
            match[2] = unquoted.slice(0, excess);
          }

          // Return only captures needed by the pseudo filter method (type and argument)
          return match.slice(0, 3);
        }
      },

      filter: {

        "TAG": function (nodeNameSelector) {
          var nodeName = nodeNameSelector.replace(runescape, funescape).toLowerCase();
          return nodeNameSelector === "*" ?
            function () { return true; } :
            function (elem) {
              return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
            };
        },

        "CLASS": function (className) {
          var pattern = classCache[className + " "];

          return pattern ||
            (pattern = new RegExp("(^|" + whitespace + ")" + className + "(" + whitespace + "|$)")) &&
            classCache(className, function (elem) {
              return pattern.test(typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "");
            });
        },

        "ATTR": function (name, operator, check) {
          return function (elem) {
            var result = Sizzle.attr(elem, name);

            if (result == null) {
              return operator === "!=";
            }
            if (!operator) {
              return true;
            }

            result += "";

            return operator === "=" ? result === check :
              operator === "!=" ? result !== check :
                operator === "^=" ? check && result.indexOf(check) === 0 :
                  operator === "*=" ? check && result.indexOf(check) > -1 :
                    operator === "$=" ? check && result.slice(-check.length) === check :
                      operator === "~=" ? (" " + result + " ").indexOf(check) > -1 :
                        operator === "|=" ? result === check || result.slice(0, check.length + 1) === check + "-" :
                          false;
          };
        },

        "CHILD": function (type, what, argument, first, last) {
          var simple = type.slice(0, 3) !== "nth",
            forward = type.slice(-4) !== "last",
            ofType = what === "of-type";

          return first === 1 && last === 0 ?

            // Shortcut for :nth-*(n)
            function (elem) {
              return !!elem.parentNode;
            } :

            function (elem, context, xml) {
              var cache, outerCache, node, diff, nodeIndex, start,
                dir = simple !== forward ? "nextSibling" : "previousSibling",
                parent = elem.parentNode,
                name = ofType && elem.nodeName.toLowerCase(),
                useCache = !xml && !ofType;

              if (parent) {

                // :(first|last|only)-(child|of-type)
                if (simple) {
                  while (dir) {
                    node = elem;
                    while ((node = node[dir])) {
                      if (ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) {
                        return false;
                      }
                    }
                    // Reverse direction for :only-* (if we haven't yet done so)
                    start = dir = type === "only" && !start && "nextSibling";
                  }
                  return true;
                }

                start = [forward ? parent.firstChild : parent.lastChild];

                // non-xml :nth-child(...) stores cache data on `parent`
                if (forward && useCache) {
                  // Seek `elem` from a previously-cached index
                  outerCache = parent[expando] || (parent[expando] = {});
                  cache = outerCache[type] || [];
                  nodeIndex = cache[0] === dirruns && cache[1];
                  diff = cache[0] === dirruns && cache[2];
                  node = nodeIndex && parent.childNodes[nodeIndex];

                  while ((node = ++nodeIndex && node && node[dir] ||

                    // Fallback to seeking `elem` from the start
                    (diff = nodeIndex = 0) || start.pop())) {

                    // When found, cache indexes on `parent` and break
                    if (node.nodeType === 1 && ++diff && node === elem) {
                      outerCache[type] = [dirruns, nodeIndex, diff];
                      break;
                    }
                  }

                  // Use previously-cached element index if available
                } else if (useCache && (cache = (elem[expando] || (elem[expando] = {}))[type]) && cache[0] === dirruns) {
                  diff = cache[1];

                  // xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
                } else {
                  // Use the same loop as above to seek `elem` from the start
                  while ((node = ++nodeIndex && node && node[dir] ||
                    (diff = nodeIndex = 0) || start.pop())) {

                    if ((ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1) && ++diff) {
                      // Cache the index of each encountered element
                      if (useCache) {
                        (node[expando] || (node[expando] = {}))[type] = [dirruns, diff];
                      }

                      if (node === elem) {
                        break;
                      }
                    }
                  }
                }

                // Incorporate the offset, then check against cycle size
                diff -= last;
                return diff === first || (diff % first === 0 && diff / first >= 0);
              }
            };
        },

        "PSEUDO": function (pseudo, argument) {
          // pseudo-class names are case-insensitive
          // http://www.w3.org/TR/selectors/#pseudo-classes
          // Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
          // Remember that setFilters inherits from pseudos
          var args,
            fn = Expr.pseudos[pseudo] || Expr.setFilters[pseudo.toLowerCase()] ||
              Sizzle.error("unsupported pseudo: " + pseudo);

          // The user may use createPseudo to indicate that
          // arguments are needed to create the filter function
          // just as Sizzle does
          if (fn[expando]) {
            return fn(argument);
          }

          // But maintain support for old signatures
          if (fn.length > 1) {
            args = [pseudo, pseudo, "", argument];
            return Expr.setFilters.hasOwnProperty(pseudo.toLowerCase()) ?
              markFunction(function (seed, matches) {
                var idx,
                  matched = fn(seed, argument),
                  i = matched.length;
                while (i--) {
                  idx = indexOf.call(seed, matched[i]);
                  seed[idx] = !(matches[idx] = matched[i]);
                }
              }) :
              function (elem) {
                return fn(elem, 0, args);
              };
          }

          return fn;
        }
      },

      pseudos: {
        // Potentially complex pseudos
        "not": markFunction(function (selector) {
          // Trim the selector passed to compile
          // to avoid treating leading and trailing
          // spaces as combinators
          var input = [],
            results = [],
            matcher = compile(selector.replace(rtrim, "$1"));

          return matcher[expando] ?
            markFunction(function (seed, matches, context, xml) {
              var elem,
                unmatched = matcher(seed, null, xml, []),
                i = seed.length;

              // Match elements unmatched by `matcher`
              while (i--) {
                if ((elem = unmatched[i])) {
                  seed[i] = !(matches[i] = elem);
                }
              }
            }) :
            function (elem, context, xml) {
              input[0] = elem;
              matcher(input, null, xml, results);
              return !results.pop();
            };
        }),

        "has": markFunction(function (selector) {
          return function (elem) {
            return Sizzle(selector, elem).length > 0;
          };
        }),

        "contains": markFunction(function (text) {
          text = text.replace(runescape, funescape);
          return function (elem) {
            return (elem.textContent || elem.innerText || getText(elem)).indexOf(text) > -1;
          };
        }),

        // "Whether an element is represented by a :lang() selector
        // is based solely on the element's language value
        // being equal to the identifier C,
        // or beginning with the identifier C immediately followed by "-".
        // The matching of C against the element's language value is performed case-insensitively.
        // The identifier C does not have to be a valid language name."
        // http://www.w3.org/TR/selectors/#lang-pseudo
        "lang": markFunction(function (lang) {
          // lang value must be a valid identifier
          if (!ridentifier.test(lang || "")) {
            Sizzle.error("unsupported lang: " + lang);
          }
          lang = lang.replace(runescape, funescape).toLowerCase();
          return function (elem) {
            var elemLang;
            do {
              if ((elemLang = documentIsHTML ?
                elem.lang :
                elem.getAttribute("xml:lang") || elem.getAttribute("lang"))) {

                elemLang = elemLang.toLowerCase();
                return elemLang === lang || elemLang.indexOf(lang + "-") === 0;
              }
            } while ((elem = elem.parentNode) && elem.nodeType === 1);
            return false;
          };
        }),

        // Miscellaneous
        "target": function (elem) {
          var hash = window.location && window.location.hash;
          return hash && hash.slice(1) === elem.id;
        },

        "root": function (elem) {
          return elem === docElem;
        },

        "focus": function (elem) {
          return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
        },

        // Boolean properties
        "enabled": function (elem) {
          return elem.disabled === false;
        },

        "disabled": function (elem) {
          return elem.disabled === true;
        },

        "checked": function (elem) {
          // In CSS3, :checked should return both che�$���Aq������	�<�1�=�E�P��B�P!(鸜 `�8F� �4E%�دm�
���w|߂����g��oo=_�߷Vr�f�G���|��ߵߣ�5�����Y�KW~����M�/r?M�ϵ*��uݬ��l�m����c�u[�έ���0���{>��W���Y�������~ZY){��_'�|��m��7ʗ������0�����������<:�Om�e�~��7gz���k����F��7��n�O�����K������yv�����_��?�J��w�}���_���¿���OT+�^���nCm���a���w� �@���H����҇
���I�%X��F�N�G ���H�R�Q+ep� Av)�3�
L 'X"(	`yUP�Z  ���j����5@-���+��H D.����#D8�1��0(���~���m��������e�}wO1�g�O���F���k%9�ֽ�O��^����k�����~^z����W_t�?����^��׿��n��
�<���/���{�v�*�z������>^����LM�t��^���^��!�F 죁��#�!Ԡ��`"
 Y@`(���q�Cʤ������*0/�
�b�&B8�ep�EܰJ�j *�� !�(F���hW b�s<������<�=O��3 #W�2���	a~'~�ߟ��]�����������N=}}����7��}~�TY�[}����]����v_��������5�_l#�����֞���s����?����~��_�_w�����:���h��yk�n��o]`[������ۓ�@��*���� `@O�z R�ze�#d{ 0!F5�1H ���5"1
@ @IDx�`[^�5�p�A�Јf�@�����H
p��{^���w?{�,�+c�uO����g���w����[2������)��������n_i����O�}}�����{�������w׵V��x�7��_�χt�Ƿ����������?����u޻��-�O�>��w��ˆ� J��X$�	�am����%��L-���+� ; d�RiՀ!@"(s�Y �����0���l:��4�-F�G�P�m���ö�.Df
JtA($ ń����Q'e��/�{�������?����_�~?�g�'ߟ>}��N�����iݛ��7�v<�+�+G�����?��꫋>����?�����ڹ��H�|�oaGse���Ҿo�<���]n�g�fk��.߿����Z��Z��|>?u���~p�?ݖ�=���y�����~��~�9.ն^������~���]i�i����������ʺ��}�}���x������|t����&�}~�U�4��q��U�H��๿�O��_�Y����ӠJ _��5d{E�DX�h���if6�$6�%H� I C 0H����VGp  e0�F�J�)��A��@`$�g�Pd}�!uf$����$L���pdd�P00(�=+���$h8CA �~�o�ѭ�>�k����y=�}�������{��߻�緧��4B�����C?��m�6������t������f��{��x�_�_OW��~���e?��������?������_���q���''�n�����M?������1�
 �<���W�Q
�E P�P#�"�uB ���		t:RszA�?�"��un`�$�P��� (r�bX�X ň@��}������S����V�{�n�~������y����7w��߿˾�����f�oo*���;���K�������{��_�}��}������w�4����}���<߷�5������������Z��~���Q������~���������'{���_�gO�����/��k�y�}eN�k�ow}����W�����$�V�w�������]}N���ݽ�ߗ�|��f�{��o��=���-���ǣ'�����_�_=E��ަ��o����_節 %������c�!ܒ��La�Pi�<�t~5 �)� !Ӝ�a�`b(� �*`�T0 X 0�@
#�kAG�))@��BU�"vD���K�D3��Ab���$J�~o�W(  ��D��� ��Ea�r<�`E i�Cf!e	q6
In@� "� $���Cc���9��>)�
��A�Eʴ8@� �n���8!�$@@I�	-���p�B����S+ �x u�0��8ư��e	��k�}I
GQ9f���T��001 �XC��p+B��Τ"8	$Z%��������?���w���z��=g���/��}��o<w'�Fw�f[������~�F����w��U����F�������֯?"�W��f�;�����O�ŗ����}*��.�gr�'���~�{����s�ѿ�����;�o�zK�O�>uS5k��ޙ��}����i�����������}p���^眸|{���L������o�m?�u�Y��cw��yrc�*G|����p��&���G4ؼ�r���ζe��_zP-������2���./����e߾�%����s��{��2_�]�������}���ߍ��ͮ��}u��~�r���?��]��}>��P������Uo�G�Y��k�F�Y���gϳ��Ui]���~�]�����.���~�e��+W��K�e�w��<��wsӖ��w��=Sv����~���Vs����{����{����i��g����1�����[������N�o�Z�mo{�~�����W�O/���[��偌|�}b��ܟ����E���-{�u���dT]��}�����s���>Msk3q{?�]�_�������\w����j�_Q��Wk3�Y�Lsދ��m����K'�]w�W�n�!�5����cC�%��kV-7��S��Z-�ݦ��<�?��A���z��<��;���']�~���ձ��7�S���C�=I��Gi���b��ܨ뇼�v����D��<r���	����w����弟����o��������ۛ�l�����ڤ����|������t}���Tܯ!��+_�½J7N�ȷ�;�;T�����r��1c�;�R�&�]���ûU�F6w�|���<\u�����3�2�&�w��~%]��߾w�������C��o^�;�z�E��b^Wϫ��=2�=�
[jև���7z[v��}7�A@}��W����W����=�|[��g�Ͽ����m�������gڻ�'�v��kk��������?�����Ϸ#o���������Ms�O�Ѿ�o��E�{�)}{��z�:��y��������>�׬�3�eo����O��E��Z�{�U;zT�����U��,r�M/�����M��~����ŬSx�뽿W��w��6��=Cg�]���ݝ���o�������կ�7�wѯm[��Z�_�z�~����w���6o���e�������������}ӿ�������>��������߰��+�7���o����oo	����=��w���=z���i���5������û��<t�������}����wٯ��]�� �9��կ��S\�����?E��?o�T����>��׿�q_����g*���M/�G�y�+�?�������o���v�?���?a6u��狧��$�_R���ueOG�Bb5���w�m�F�=WJ�A��_�'kqg��^��?����ww���Y�9�N���O{)�;+Z	s��{g��pj��죵�j��H����V�߾���=zr��'wI������?e\��k�W�������?ե��=������ӝ�������O��Sޑ��h����r���|�ʭ{��������u��U]듕�~Mߝ��>�c�������c�;S�w��_��3t������^�*�����=��}ŧϷ���k��[!�����e�#Jk޻_�i�#m�5����������N��.������wt�wo0��`9�Zت��u��j>��O���W�O���g=�S���x�����S;OZ!+{C=�g�w7���������6���ѽZTΆ�~Ե�5n	������M�ޝ��i�7���ֶ��r�������߳��{ix���z?��<�o���
      var i = 0,
        len = contexts.length;
      for (; i < len; i++) {
        Sizzle(selector, contexts[i], results);
      }
      return results;
    }

    function condense(unmatched, map, filter, context, xml) {
      var elem,
        newUnmatched = [],
        i = 0,
        len = unmatched.length,
        mapped = map != null;

      for (; i < len; i++) {
        if ((elem = unmatched[i])) {
          if (!filter || filter(elem, context, xml)) {
            newUnmatched.push(elem);
            if (mapped) {
              map.push(i);
            }
          }
        }
      }

      return newUnmatched;
    }

    function setMatcher(preFilter, selector, matcher, postFilter, postFinder, postSelector) {
      if (postFilter && !postFilter[expando]) {
        postFilter = setMatcher(postFilter);
      }
      if (postFinder && !postFinder[expando]) {
        postFinder = setMatcher(postFinder, postSelector);
      }
      return markFunction(function (seed, results, context, xml) {
        var temp, i, elem,
          preMap = [],
          postMap = [],
          preexisting = results.length,

          // Get initial elements from seed or context
          elems = seed || multipleContexts(selector || "*", context.nodeType ? [context] : context, []),

          // Prefilter to get matcher input, preserving a map for seed-results synchronization
          matcherIn = preFilter && (seed || !selector) ?
            condense(elems, preMap, preFilter, context, xml) :
            elems,

          matcherOut = matcher ?
            // If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
            postFinder || (seed ? preFilter : preexisting || postFilter) ?

              // ...intermediate processing is necessary
              [] :

              // ...otherwise use results directly
              results :
            matcherIn;

        // Find primary matches
        if (matcher) {
          matcher(matcherIn, matcherOut, context, xml);
        }

        // Apply postFilter
        if (postFilter) {
          temp = condense(matcherOut, postMap);
          postFilter(temp, [], context, xml);

          // Un-match failing elements by moving them back to matcherIn
          i = temp.length;
          while (i--) {
            if ((elem = temp[i])) {
              matcherOut[postMap[i]] = !(matcherIn[postMap[i]] = elem);
            }
          }
        }

        if (seed) {
          if (postFinder || preFilter) {
            if (postFinder) {
              // Get the final matcherOut by condensing this intermediate into postFinder contexts
              temp = [];
              i = matcherOut.length;
              while (i--) {
                if ((elem = matcherOut[i])) {
                  // Restore matcherIn since elem is not yet a final match
                  temp.push((matcherIn[i] = elem));
                }
              }
              postFinder(null, (matcherOut = []), temp, xml);
            }

            // Move matched elements from seed to results to keep them synchronized
            i = matcherOut.length;
            while (i--) {
              if ((elem = matcherOut[i]) &&
                (temp = postFinder ? indexOf.call(seed, elem) : preMap[i]) > -1) {

                seed[temp] = !(results[temp] = elem);
              }
            }
          }

          // Add elements to results, through postFinder if defined
        } else {
          matcherOut = condense(
            matcherOut === results ?
              matcherOut.splice(preexisting, matcherOut.length) :
              matcherOut
          );
          if (postFinder) {
            postFinder(null, results, matcherOut, xml);
          } else {
            push.apply(results, matcherOut);
          }
        }
      });
    }

    function matcherFromTokens(tokens) {
      var checkContext, matcher, j,
        len = tokens.length,
        leadingRelative = Expr.relative[tokens[0].type],
        implicitRelative = leadingRelative || Expr.relative[" "],
        i = leadingRelative ? 1 : 0,

        // The foundational matcher ensures that elements are reachable from top-level context(s)
        matchContext = addCombinator(function (elem) {
          return elem === checkContext;
        }, implicitRelative, true),
        matchAnyContext = addCombinator(function (elem) {
          return indexOf.call(checkContext, elem) > -1;
        }, implicitRelative, true),
        matchers = [function (elem, context, xml) {
          return (!leadingRelative && (xml || context !== outermostContext)) || (
            (checkContext = context).nodeType ?
              matchContext(elem, context, xml) :
              matchAnyContext(elem, context, xml));
        }];

      for (; i < len; i++) {
        if ((matcher = Expr.relative[tokens[i].type])) {
          matchers = [addCombinator(elementMatcher(matchers), matcher)];
        } else {
          matcher = Expr.filter[tokens[i].type].apply(null, tokens[i].matches);

          // Return special upon seeing a positional matcher
          if (matcher[expando]) {
            // Find the next relative operator (if any) for proper handling
            j = ++i;
            for (; j < len; j++) {
              if (Expr.relative[tokens[j].type]) {
                break;
              }
            }
            return setMatcher(
              i > 1 && elementMatcher(matchers),
              i > 1 && toSelector(
                // If the preceding token was a descendant combinator, insert an implicit any-element `*`
                tokens.slice(0, i - 1).concat({ value: tokens[i - 2].type === " " ? "*" : "" })
              ).replace(rtrim, "$1"),
              matcher,
              i < j && matcherFromTokens(tokens.slice(i, j)),
              j < len && matcherFromTokens((tokens = tokens.slice(j))),
              j < len && toSelector(tokens)
            );
          }
          matchers.push(matcher);
        }
      }

      return elementMatcher(matchers);
    }

    function matcherFromGroupMatchers(elementMatchers, setMatchers) {
      var bySet = setMatchers.length > 0,
        byElement = elementMatchers.length > 0,
        superMatcher = function (seed, context, xml, results, outermost) {
          var elem, j, matcher,
            matchedCount = 0,
            i = "0",
            unmatched = seed && [],
            setMatched = [],
            contextBackup = outermostContext,
            // We must always have either seed elements or outermost context
            elems = seed || byElement && Expr.find["TAG"]("*", outermost),
            // Use integer dirruns iff this is the outermost matcher
            dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
            len = elems.length;

          if (outermost) {
            outermostContext = context !== document && context;
          }

          // Add elements passing elementMatchers directly to results
          // Keep `i` a string if there are no elements so `matchedCount` will be "00" below
          // Support: IE<9, Safari
          // Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
          for (; i !== len && (elem = elems[i]) != null; i++) {
            if (byElement && elem) {
              j = 0;
              while ((matcher = elementMatchers[j++])) {
                if (matcher(elem, context, xml)) {
                  results.push(elem);
                  break;
                }
              }
              if (outermost) {
                dirruns = dirrunsUnique;
              }
            }

            // Track unmatched elements for set filters
            if (bySet) {
              // They will have gone through all possible matchers
              if ((elem = !matcher && elem)) {
                matchedCount--;
              }

              // Lengthen the array for every element, matched or not
              if (seed) {
                unmatched.push(elem);
              }
            }
          }

          // Apply set filters to unmatched elements
          matchedCount += i;
          if (bySe _�CEr`[��ˇ�)	�j�pB��Qч%��'& ΰ;� q���B���y�J-�Ě@&C-"�����@����m�����ō��4�����0wj��`�ܯ��� TVipC1���c�S������w���~���g��t���K���w�coۗ+����������;��}tX���t���v_ϴ�������߿�K<��;�t����}��?���������Z��F���|6��������7;g������z}nN[��޳����n�e�{j�����?V��n롯�{u�o|��{���������~/���ڝѝ����'�������=WW���\W�������;�u�N���C�O߮���kλ��w�y��%���b Ryc�8��t0CP��a�$Hp Me���a
�G���"d�M���M�`����\J��
  RaA$G�	��	J��� ���U�SFtP@$�TH�JG
PI�BT0��.�m����V��W�+��l{W�w}������E�=g���Kh�]���V����?n�~��[�g����h����K��n���O����?��{��t���~��/���_��̓�� �O����~�3�F���)_�RD�m��!�N
$�����%����A0��)�����Xˋ$;	4B X"QDĸŗT��
�

��R�&��s��@����hå�5�l�Ԥ���\�)FQP$T
��e(
D�� +�n�VJ�}TԬR�j����	�b�
�n�GK�#�v��/k B�wo�m����ک�Z����y���������w�������:�����;����=?������h�_�v��Ⱦ�r���vW�����t޿�yE>�L&�+g���N�㔷�l����<��yQ,�&n�"6!����r�`!�<	p�d���PM�!�c���ێ`�٧0� �tQ��	T�!D���U�d��IM�k 0��(,�Ș ơ0>$ibpXFQ�Z����:�p
0� "�X&d`0
A�*�:2U�J�x����k���0�AE���
0T.���!;U�`%�\�wR� �Y�j�*<(V�FGH*� E./� tF�Э}�'M6�.��5����B1F@x���(X�Ȑ�� �u�rc������oY��N�����w�~���ݼm�����������vor���?Ͼ�y��-Ե������������o�oX��m��o��|��A����?���o����a5���=?O��w��>=Y���|��U9,!��O

��0CM3�&
��j�	B�G "J�H�aMz�IM f���,� 
��Z�P%����Qa�0�Q��W 7�� �C LY{ @�� J s+@A�`r
`#�̔�C��#`r���n����N�A�B�&��i �#z �j)uA�H���`fy� n�	a���@h:@����I�Х"�Rr��	Sp:]3��� ��ve �������~/Ͻ�\VU���S�]m=��[w��폿�������}�w��w&?��������6�I>�����生Nˆ�Z5�~�z��9_5�~�O
&
���������n?����u�£���~���{^j�'������63����w����������po��)�s2.o��Vo�>u���̯���z���sg������[����#O���V��;޿������z��v��}M������ד�ާ��#�_���[z�������n���9���T�nת����?z�����sN��m��͕�W�?����������w�����Ed.��|����~W���|�g��{�G��?X������������"�UD#��q P�!�"�-���D�R K�@�2xgD��D�e-��TdP���.�� �*L ̇�X#ͅ����D�Bԍ!F�

 �}��$[$�� �ݼ�J�
Y����I�L��o��_���o�߾�'��J[b���\�����6w��oH����������微�yB��S��7�ߩ�Z���mo���is���q�ͻ�]�����_6���{������z���	������j�٘ï�{������,J�Jb�H!Sa��r�
i"�e��4z DG ���w��&������� �$!mVFD-��;���œ�b�xp��f�=���Y���B���͍H!Q�����&+�]�1�$�"7��D�`��G���TEIL�@�e� h7�A�Y@P�$@x!����RX�
���i|�ش�F��9;�<j_}�/c���]��7����;���;=�%���.������8d��o��V��֛o:^<��~]�[��.��o�߬��o����v�|���w��?��po�ͽ�?�eg7������{���/���s�����}��I�{���������'������������}w�
��������=���?�~���z���������o���x�N��v���ߟ㫶�]��<�u�w5�K�����������a}����7��:��{׮'8�}]>b���Ю���wxW�� }C_cO���A�zC^O//���e���楮�X�2�(״7θ�|s�vm��?���|[���z��ֿ��7���Z޶>�>g�����������~���}�N>��h�}���w�x�o����.{�?�w��{�j~��ܐ힛'����{;p�y_�^���zy�t����}�K���v�5_�o��������>]O�������|_���n�c=}N?����7�~��o�o�����昷��x�����>K��)����ϿϪYOw�%�?O?��5Ǫ�������8�w�����2���W���S��k��\��\?�N������^�|��ϻ�/��?��~CU­��*~1g��~��������߽�ٳ�W��*_�7^0��o��5�e��ڛ���3{����"���#�����k�۳��y=�dg;˻|���uOV�n�^�����y�����z��w�yk6�C+�皹?��]����ߓ^�������>������w�K/y?�/������i��?�n�{�m�������������ˋ��_����L���}�}�v0{�<g�u����^v���p�}7�����=?���}wϿ��/���O���}���x'5��W��N�8��;��3���o�����?/��R�ޱ/������}��{������/�����������5��;��/�ݪ�����W/����~�k�rk�K7絲_&1�c�[���v嶵������������å���`��m��9י���_�ܟ{=��{�~z-;��\Es��7�^=��Y�S������������y�?�W���-ߔ�}�zo�?3���Ȼ��竼��VM��u}{�Ovo�W����{���}��ʙo��n���X�Vs��>����q��ù�e?��e8o}���~F����~[�{v+���k^�_�����+���|�o�z�2�V�_Ư���L�Y���ji�1����������$��t�f�ַ��?k�[5��^s6?�;�om�Μ>�����|��6�[0�iE|ƿi���ϳmǪ��o�����ח�p�C�we�
�E���5�M�YW�����w����/�{�B$�o,�U�6�7_������#�Wz}�N����s]mokx����_��?kL��-�<���^�?v������ŵ�.wq�6ۧ.t�������z�����Fm�51�g]k�m���濋���W�F���'���������~�^��+�>Un����rկ�o��������k��������C�������>����[�鿙�����P������������k�������^2#ۯ�v���?���n�m�����}���ʹ�-��9���ݦ[��W��i3���Wr�l�]y[��{؞��\G���y>�K��:�|��}����￵�;��y�>��~E^M9��>���:u�a�����g�����g��-��ۗ�
�s?�;�
W�o?���7�Uy_L�a���V�=�3���k��Q7�N?��G�e��KO_m[��������Vzac��w����qڋ����M�7W����=�����I������ws��ۛ����+�d���]F�2���޷����]��h�ڌ���)}�pm�������_��iy�oG��;��Ҟ.����}�^��N5����k{��4I���2^p���m	u��H�����˿�[ol�#�\��i�?gN��NN�}�o�_뽝��1�|��t�g��9������~�/~��E���,�B��qW����9/�#�|7{ﯹo���?Z������x������ޑ��J>�?w�����k�u���}�����P��>��yW^��
          if (cb.call(s, o[n], n, o) === false) {
            return 0;
          }
        }
      } else {
        // Hashtables
        for (n in o) {
          if (o.hasOwnProperty(n)) {
            if (cb.call(s, o[n], n, o) === false) {
              return 0;
            }
          }
        }
      }

      return 1;
    }

    function map(array, callback) {
      var out = [];

      each(array, function (item, index) {
        out.push(callback(item, index, array));
      });

      return out;
    }

    function filter(a, f) {
      var o = [];

      each(a, function (v, index) {
        if (!f || f(v, index, a)) {
          o.push(v);
        }
      });

      return o;
    }

    function indexOf(a, v) {
      var i, l;

      if (a) {
        for (i = 0, l = a.length; i < l; i++) {
          if (a[i] === v) {
            return i;
          }
        }
      }

      return -1;
    }

    function reduce(collection, iteratee, accumulator, thisArg) {
      var i = 0;

      if (arguments.length < 3) {
        accumulator = collection[0];
      }

      for (; i < collection.length; i++) {
        accumulator = iteratee.call(thisArg, accumulator, collection[i], i);
      }

      return accumulator;
    }

    function findIndex(array, predicate, thisArg) {
      var i, l;

      for (i = 0, l = array.length; i < l; i++) {
        if (predicate.call(thisArg, array[i], i, array)) {
          return i;
        }
      }

      return -1;
    }

    function find(array, predicate, thisArg) {
      var idx = findIndex(array, predicate, thisArg);

      if (idx !== -1) {
        return array[idx];
      }

      return undefined;
    }

    function last(collection) {
      return collection[collection.length - 1];
    }

    return {
      isArray: isArray,
      toArray: toArray,
      each: each,
      map: map,
      filter: filter,
      indexOf: indexOf,
      reduce: reduce,
      findIndex: findIndex,
      find: find,
      last: last
    };
  }
);
/**
 * Tools.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class contains various utlity functions. These are also exposed
 * directly on the tinymce namespace.
 *
 * @class tinymce.util.Tools
 */
define(
  'tinymce.core.util.Tools',
  [
    "tinymce.core.Env",
    "tinymce.core.util.Arr"
  ],
  function (Env, Arr) {
    /**
     * Removes whitespace from the beginning and end of a string.
     *
     * @method trim
     * @param {String} s String to remove whitespace from.
     * @return {String} New string with removed whitespace.
     */
    var whiteSpaceRegExp = /^\s*|\s*$/g;

    function trim(str) {
      return (str === null || str === undefined) ? '' : ("" + str).replace(whiteSpaceRegExp, '');
    }

    /**
     * Checks if a object is of a specific type for example an array.
     *
     * @method is
     * @param {Object} obj Object to check type of.
     * @param {string} type Optional type to check for.
     * @return {Boolean} true/false if the object is of the specified type.
     */
    function is(obj, type) {
      if (!type) {
        return obj !== undefined;
      }

      if (type == 'array' && Arr.isArray(obj)) {
        return true;
      }

      return typeof obj == type;
    }

    /**
     * Makes a name/object map out of an array with names.
     *
     * @method makeMap
     * @param {Array/String} items Items to make map out of.
     * @param {String} delim Optional delimiter to split string by.
     * @param {Object} map Optional map to add items to.
     * @return {Object} Name/value map of items.
     */
    function makeMap(items, delim, map) {
      var i;

      items = items || [];
      delim = delim || ',';

      if (typeof items == "string") {
        items = items.split(delim);
      }

      map = map || {};

      i = items.length;
      while (i--) {
        map[items[i]] = {};
      }

      return map;
    }

    /**
     * JavaScript does not protect hasOwnProperty method, so it is possible to overwrite it. This is
     * object independent version.
     *
     * @param {Object} obj
     * @param {String} prop
     * @returns {Boolean}
     */
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }

    /**
     * Creates a class, subclass or static singleton.
     * More details on this method can be found in the Wiki.
     *
     * @method create
     * @param {String} s Class name, inheritance and prefix.
     * @param {Object} p Collection of methods to add to the class.
     * @param {Object} root Optional root object defaults to the global window object.
     * @example
     * // Creates a basic class
     * tinymce.create('tinymce.somepackage.SomeClass', {
     *     SomeClass: function() {
     *         // Class constructor
     *     },
     *
     *     method: function() {
     *         // Some method
     *     }
     * });
     *
     * // Creates a basic subclass class
     * tinymce.create('tinymce.somepackage.SomeSubClass:tinymce.somepackage.SomeClass', {
     *     SomeSubClass: function() {
     *         // Class constructor
     *         this.parent(); // Call parent constructor
     *     },
     *
     *     method: function() {
     *         // Some method
     *         this.parent(); // Call parent method
     *     },
     *
     *     'static': {
     *         staticMethod: function() {
     *             // Static method
     *         }
     *     }
     * });
     *
     * // Creates a singleton/static class
     * tinymce.create('static tinymce.somepackage.SomeSingletonClass', {
     *     method: function() {
     *         // Some method
     *     }
     * });
     */
    function create(s, p, root) {
      var self = this, sp, ns, cn, scn, c, de = 0;

      // Parse : <prefix> <class>:<super class>
      s = /^((static) )?([\w.]+)(:([\w.]+))?/.exec(s);
      cn = s[3].match(/(^|\.)(\w+)$/i)[2]; // Class name

      // Create namespace for new class
      ns = self.createNS(s[3].replace(/\.\w+$/, ''), root);

      // Class already exists
      if (ns[cn]) {
        return;
      }

      // Make pure static class
      if (s[2] == 'static') {
        ns[cn] = p;

        if (this.onCreate) {
          this.onCreate(s[2], s[3], ns[cn]);
        }

        return;
      }

      // Create default constructor
      if (!p[cn]) {
        p[cn] = function () { };
        de = 1;
      }

      // Add constructor and methods
      ns[cn] = p[cn];
      self.extend(ns[cn].prototype, p);

      // Extend
      if (s[5]) {
        sp = self.resolve(s[5]).prototype;
        scn = s[5].match(/\.(\w+)$/i)[1]; // Class name

        // Extend constructor
        c = ns[cn];
        if (de) {
          // Add passthrough constructor
          ns[cn] = function () {
            return sp[scn].apply(this, arguments);
          };
        } else {
          // Add inherit constructor
          ns[cn] = function () {
            this.parent = sp[scn];
            return c.apply(this, arguments);
          };
        }
        ns[cn].prototype[cn] = ns[cn];

        // Add super methods
        self.each(sp, function (f, n) {
          ns[cn].prototype[n] = sp[n];
        });

        // Add overridden methods
        self.each(p, function (f, n) {
          // Extend methods if needed
          if (sp[n]) {
            ns[cn].prototype[n] = function () {
              this.parent = sp[n];
              return f.apply(this, arguments);
            };
          } else {
            if (n != cn) {
              ns[cn].prototype[n] = f;
            }
          }
        });
      }

      // Add static methods
      /*jshint sub:true*/
      /*eslint dot-notation:0*/
      self.each(p['static'], function (f, n) {
        ns[cn][n] = f;
      });
    }

    function extend(obj, ext) {
      var i, l, name, args = arguments, value;

      for (i = 1, l = args.length; i < l; i++) {
        ext = args[i];
        for (name in ext) {
          if (ext.hasOwnProperty(name)) {
 ���۝�#��]U������M�����M��Fߟ�SΛ�_����������*�]���}}�{�;���O|��￫���������������x������n�.�{��qO�w�|��Z�/�����|���PF��ǀ��1҃D
2�$��%V� H �
m��C��-Z߮������8��]��;���ޯ�m�7����w�~�����gC{��s�?*�v��������O���{��~]o�ksީj�u��/%OL�Ǵ�\	Bв�C���&�Iȭ0��
������	�r]tL>Nҍ�`�m!
@�78�D������8�>c-�@�� �%�|�({�'�7�*���GY	a� j���~vG̷�����^�N���5��{^��~��5��<wη��\O}�h�wwY�^��Ukc��7ی�s����ޑ������e��T�p����5]�v�-֮��9�����}?�������n���?��r��w��;�gZ�ߺ�o����տ�ٿn�I_�{�O�o>�ε}�}�������g�g�������o��ϫ����*����nR?~����?��������7��~����������Y���=�W?U�}���QW�k�_���DE%�2�	}z Z,�L�H�P�g  �Q���%
�f�#��9L �Ћ!x#�e )� ���x�$� D&��l5����XNV������yD�Ƥ�E�FUP�G�O K �S�, ֒�hP�I�d!(\F��0"a��	&e�@ ���u�ku�q֝�0�=����o26�Ե���s\���x^Ս�G�[�[������?L��\Ϸ}�v#}����������?�oփ��=��3�?�����+��ߚ���?�<�x��6e�����첻��O���D$"( �*+��R`�"�P0a��F7b�+ ,�<�N�2�6���j
@��fb�:b���`F
�8���/A+�&�*	@`B�T���a�@'@� b��
 ¢��B�ghwAP���b2��*�䅢H�pP���,0�o� �0���	��t�N;pK���,  )��WJ�#y�3PA#0�8��|A�d4!�@Sɨ*9x(�"T���0��$�(�� 0a����<��t�C���{����Ӿ��i�w���ۻ��]���oϻz���Ie�{�^�_���_v��o]w���j]������_����+x[~�3u}�(���N"�������u[��ob���u�\�yY-˄t$mP���F��^�I6ɸ�D�� Hp���ɢ � �A8A� ��	G
�ČH �]N$��&9A���@�(&� `�H��BM�6�� �A��UtIE�
 x�,A�x��J0P�@�BdrQ�)�ī ��� EH�x D@B��0�q�����-� P��jBZ4��)�a�'$P P0N	/�Jq�%��	IIB� 
��T!bL!8���T�Q���9o�s����n����3�|����?��>�Q��_���{���u�{}TG���g�����ߛ�B�<�kX��;��&b4�����?����>Ӷ�������������I=���~]��އ��95���N���氣�8)�D��&�2-'�����NV��Y�m�h��@�$H�D�Y">!"c�!�#T���9`�v%h�.��6��_/�P�&��E�lE�� 	g9�2�H��>A`=���]� 0ւ� �!�J@���"�4����RJ�W?߅�H�MBe^6��m���D��2$�E�J'� Z�M@$��xf'�'������2Y��`A�L��QC$ ]""�-O��v30 �E#�tk �B�|��[������u�������O���ة�Kz���o�ߘ�+��}�o��;�������������]vߎ����^���Z�g��}�Y���v���_~���)���Sտ^���&~3�g���|?��<�u?~q��<������RKtWѸ�i��� ��ڣ��P� �3�A]E&��.�D�P0q  
S`#�@�\�������{R��(g�����f���g� ����n�N �4 E"`.jX��5xHH�j�;�.3��������r��O޽���/���^ܰ��R�?����Q_d��W���7E�W�����/��	�}����&���u���������8ӷ���Xׯ�w�>��w9��4�e]���l����mG3���?m�o������I�t/�v�+j;��������e4������Wz��{�}>�_�����?�mߝ���￿u������;nw|��7;~�zv��s�^y��?�m�<�������������೏���V</����W}�+�{���=M%��y���W�Ts��TaжY�ęD#�)��JMӢ�"C`��D��B2it��՜H
@ ��p	Te"+Lb��0�G��D��R�8��
�Q�a�3��h�     * @param {function} cb Callback function to execute for each item.
       * @param {Object} s Optional scope to execute the callback in.
       * @example
       * // Iterate an array
       * tinymce.each([1,2,3], function(v, i) {
       *     console.debug("Value: " + v + ", Index: " + i);
       * });
       *
       * // Iterate an object
       * tinymce.each({a: 1, b: 2, c: 3], function(v, k) {
       *     console.debug("Value: " + v + ", Key: " + k);
       * });
       */
      each: Arr.each,

      /**
       * Creates a new array by the return value of each iteration function call. This enables you to convert
       * one array list into another.
       *
       * @method map
       * @param {Array} array Array of items to iterate.
       * @param {function} callback Function to call for each item. It's return value will be the new value.
       * @return {Array} Array with new values based on function return values.
       */
      map: Arr.map,

      /**
       * Filters out items from the input array by calling the specified function for each item.
       * If the function returns false the item will be excluded if it returns true it will be included.
       *
       * @method grep
       * @param {Array} a Array of items to loop though.
       * @param {function} f Function to call for each item. Include/exclude depends on it's return value.
       * @return {Array} New array with values imported and filtered based in input.
       * @example
       * // Filter out some items, this will return an array with 4 and 5
       * var items = tinymce.grep([1,2,3,4,5], function(v) {return v > 3;});
       */
      grep: Arr.filter,

      /**
       * Returns an index of the item or -1 if item is not present in the array.
       *
       * @method inArray
       * @param {any} item Item to search for.
       * @param {Array} arr Array to search in.
       * @return {Number} index of the item or -1 if item was not found.
       */
      inArray: Arr.indexOf,

      hasOwn: hasOwnProperty,

      extend: extend,
      create: create,
      walk: walk,
      createNS: createNS,
      resolve: resolve,
      explode: explode,
      _addCacheSuffix: _addCacheSuffix
    };
  }
);
/**
 * DomQuery.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class mimics most of the jQuery API:
 *
 * This is whats currently implemented:
 * - Utility functions
 * - DOM traversial
 * - DOM manipulation
 * - Event binding
 *
 * This is not currently implemented:
 * - Dimension
 * - Ajax
 * - Animation
 * - Advanced chaining
 *
 * @example
 * var $ = tinymce.dom.DomQuery;
 * $('p').attr('attr', 'value').addClass('class');
 *
 * @class tinymce.dom.DomQuery
 */
define(
  'tinymce.core.dom.DomQuery',
  [
    "tinymce.core.dom.EventUtils",
    "tinymce.core.dom.Sizzle",
    "tinymce.core.util.Tools",
    "tinymce.core.Env"
  ],
  function (EventUtils, Sizzle, Tools, Env) {
    var doc = document, push = Array.prototype.push, slice = Array.prototype.slice;
    var rquickExpr = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/;
    var Event = EventUtils.Event, undef;
    var skipUniques = Tools.makeMap('children,contents,next,prev');

    function isDefined(obj) {
      return typeof obj !== 'undefined';
    }

    function isString(obj) {
      return typeof obj === 'string';
    }

    function isWindow(obj) {
      return obj && obj == obj.window;
    }

    function createFragment(html, fragDoc) {
      var frag, node, container;

      fragDoc = fragDoc || doc;
      container = fragDoc.createElement('div');
      frag = fragDoc.createDocumentFragment();
      container.innerHTML = html;

      while ((node = container.firstChild)) {
        frag.appendChild(node);
      }

      return frag;
    }

    function domManipulate(targetNodes, sourceItem, callback, reverse) {
      var i;

      if (isString(sourceItem)) {
        sourceItem = createFragment(sourceItem, getElementDocument(targetNodes[0]));
      } else if (sourceItem.length && !sourceItem.nodeType) {
        sourceItem = DomQuery.makeArray(sourceItem);

        if (reverse) {
          for (i = sourceItem.length - 1; i >= 0; i--) {
            domManipulate(targetNodes, sourceItem[i], callback, reverse);
          }
        } else {
          for (i = 0; i < sourceItem.length; i++) {
            domManipulate(targetNodes, sourceItem[i], callback, reverse);
          }
        }

        return targetNodes;
      }

      if (sourceItem.nodeType) {
        i = targetNodes.length;
        while (i--) {
          callback.call(targetNodes[i], sourceItem);
        }
      }

      return targetNodes;
    }

    function hasClass(node, className) {
      return node && className && (' ' + node.className + ' ').indexOf(' ' + className + ' ') !== -1;
    }

    function wrap(elements, wrapper, all) {
      var lastParent, newWrapper;

      wrapper = DomQuery(wrapper)[0];

      elements.each(function () {
        var self = this;

        if (!all || lastParent != self.parentNode) {
          lastParent = self.parentNode;
          newWrapper = wrapper.cloneNode(false);
          self.parentNode.insertBefore(newWrapper, self);
          newWrapper.appendChild(self);
        } else {
          newWrapper.appendChild(self);
        }
      });

      return elements;
    }

    var numericCssMap = Tools.makeMap('fillOpacity fontWeight lineHeight opacity orphans widows zIndex zoom', ' ');
    var booleanMap = Tools.makeMap('checked compact declare defer disabled ismap multiple nohref noshade nowrap readonly selected', ' ');
    var propFix = {
      'for': 'htmlFor',
      'class': 'className',
      'readonly': 'readOnly'
    };
    var cssFix = {
      'float': 'cssFloat'
    };

    var attrHooks = {}, cssHooks = {};

    function DomQuery(selector, context) {
      /*eslint new-cap:0 */
      return new DomQuery.fn.init(selector, context);
    }

    function inArray(item, array) {
      var i;

      if (array.indexOf) {
        return array.indexOf(item);
      }

      i = array.length;
      while (i--) {
        if (array[i] === item) {
          return i;
        }
      }

      return -1;
    }

    var whiteSpaceRegExp = /^\s*|\s*$/g;

    function trim(str) {
      return (str === null || str === undef) ? '' : ("" + str).replace(whiteSpaceRegExp, '');
    }

    function each(obj, callback) {
      var length, key, i, undef, value;

      if (obj) {
        length = obj.length;

        if (length === undef) {
          // Loop object items
          for (key in obj) {
            if (obj.hasOwnProperty(key)) {
              value = obj[key];
              if (callback.call(value, key, value) === false) {
                break;
              }
            }
          }
        } else {
          // Loop array items
          for (i = 0; i < length; i++) {
            value = obj[i];
            if (callback.call(value, i, value) === false) {
              break;
            }
          }
        }
      }

      return obj;
    }

    function grep(array, callback) {
      var out = [];

      each(array, function (i, item) {
        if (callback(item, i)) {
          out.push(item);
        }
      });

      return out;
    }

    function getElementDocument(element) {
      if (!element) {
        return doc;
      }

      if (element.nodeType == 9) {
        return element;
      }

      return element.ownerDocument;
    }

    DomQuery.fn = DomQuery.prototype = {
      constructor: DomQuery,

      /**
       * Selector for the current set.
       *
       * @property selector
       * @type String
       */
      selector: "",

      /**
       * Context used to create the set.
       *
       * @property context
       * @type Element
       */
      context: null,

      /**
       * Number of items in the current set.
       *
       * @property length
       * @type Number
       */
      length: 0,

      /**
       * Constructs a new DomQuery instance with the specified selector or context.
       *
       * @constructor
       * @method init
       * @param {String/Array/DomQuery} selector Optional CSS selector/Array or array like object or HTML string.
       * @param {Document/Element} context Optional context to search in.
       */
      init: function (selector, context) {
        var self = this, match, node;

        if (!selector) {
          return self;
        }

        if (selector.nodeType) {
          self.context = self[0] = selector;
          self.length = 1;

          return self;
        }

        if (context && context.nodeType) {
          self.context = context;
        } else {
          if (context) {
            return DomQuery(selector).attr(context);
          }

          self.context = context = document;
        }

        if (isString(selector)) {
          self.selector = selector;

          if (selector.charAt(0) === "<" && selector.charAt(selector.length - 1) === ">" && selector.length >= 3) {
            match = [null, selector, null];
          } else {
            match = rquickExpr.exec(selector);
          }

          if (match) {
            if (match[1]) {
              node = createFragment(selector, getElementDocument(context)).firstChild;

              while (node) {
                push.call(self, node);
                node = node.nextSibling;
              }
            } else {
              node = getElementDocument(context).getElementById(match[2]);

              if (!node) {
                return self;
              }

              if (node.id !== match[2]) {
                return self.find(selector);
              }

              self.length = 1;
              self[0] = node;
            }
          } else {
            return DomQuery(context).find(selector);
          }
        } else {
          this.add(selector, false);
        }

        return self;
      },

      /**
       * Converts the current set to an array.
       *
       * @method toArray
       * @return {Array} Array of all nodes in set.
       */
      toArray: function () {
        return Tools.toArray(this);
      },

      /**
       * Adds new nodes to the set.
       *
       * @method add
       * @param {Array/tinymce.core.dom.DomQuery} items Array of all nodes to add to set.
       * @param {Boolean} sort Optional sort flag that enables sorting of elements.
       * @return {tinymce.dom.DomQuery} New instance with nodes added.
       */
      add: function (items, sort) {
        var self = this, nodes, i;

        if (isString(items)) {
          return self.add(DomQuery(items));
        }

        if (sort !== false) {
          nodes = DomQuery.unique(self.toArray().concat(DomQuery.makeArray(items)));
          self.length = nodes.length;
          for (i = 0; i < nodes.length; i++) {
            self[i] = nodes[i];
          }
        } else {
          push.apply(self, DomQuery.makeArray(items));
        }

        return self;
      },

      /**
       * Sets/gets attributes on the elements in the current set.
       *
       * @method attr
       * @param {String/Object} name Name of attribute to get or an object with attributes to set.
       * @param {String} value Optional value to set.
       * @return {tinymce.dom.DomQuery/String} Current set or the specified attribute when only the name is specified.
       */
      attr: function (name, value) {
        var self = this, hook;

        if (typeof name === "object") {
          each(name, function (name, value) {
            self.attr(name, value);
          });
        } else if (isDefined(value)) {
          this.each(function () {
            var hook;

            if (this.nodeType === 1) {
              hook = attrHooks[name];
              if (hook && hook.set) {
                hook.set(this, value);
                return;
              }

              if (value === null) {
                this.removeAttribute(name, 2);
              } else {
                this.setAttribute(name, value, 2);
              }
            }
          });
        } else {
          if (self[0] && self[0].nodeType === 1) {
            ho�~�¾����o���6xUw?Ͼ��v������������gY���|����z~��>��������ח����:����}����׽o���-��~���^�����zfM�����[��O����]p��/���z�o���ewD�Ň%ah]�H4��G�M�AеJ�⚓����:�A
�P)G 
��B�h$PA(:��a0�ـ5��ʯX\��3 Xa�1�Rp|C�<�.�<���	�����7�
R� @F�� #���ƎÂ @d�[r@��^�gF҄�d�����w�������4�����������߇T�e<�sy����.�w����r�����ۡ��'������?�W��>��u�՟�����z���n�?ʿ���7_׭y���gt>������~�g����p��]����T��
��!:�n��D�
* �n�!&VHTB���O� HP.qB*C BVe8PI���脪��b�� 	�4	�	�i�E� ?�aJ(�� �Q+�FBT�	���h�9"�)��U�	*:AP	Dc�~��3�� �A��k�P�!����@@Nj�C�w*`a
-jfdԽYt�L�0�+��T�L m�懨 
� � �)w	�xlF��Ё�$t� 7c��(5�$PW*�g;�}�5��o����:���Ʒ��}�����a�������V������.�>�[T�G���{�����J��z�Aߵ�/���'@�߽�w�o��ws����������
��*d-�|���f@m��  �\,�P��GQ8 0�@�@�DL�� 0P2��)mp$$r,	g)�@��`���'�uw6�sٞz�/�����7������k��ݞ�������C�}��~��|~��������Y�������JQ�?�ڮ�|�ݲ}�w_���L������J����i���n���'�o�e~߰ԯ���������?������j��v|w/<�?��}�q�
i)z�H3a0�+
�&`�#W�A`��0���HS��u� Ğ&
	e�J�4�2%J����?�.������Z�{Vu�
�1p��IF9Q�
	�!�BB 	B�Qc�a ֱ"U�0�� C
&!%�BP!b�
7EQ�FvII�L��	 (5��l	�1]��&X���$F��ŰDA��� B�Z2��i5�iL�r0�ai��a1�F����T�����@	`X��Gl�׷����G�����V�s�v{��?7;��y��_����v�_��cwa~�}�_����!�F���a���}�������]ۏ߻~��ߏ�������������}�ݶ���X�V;l��ݿ^������~o{�������w��_���`������������������I�'���[�YG�������8bo��������s���[;�����w��[�����~�mۻ��������b�?����]zz�}������E���D�M�4`e�)�`����("(����B����kBF%W� t2)`Y5Z�\�� �����ha��*���@X ,AL���SZF< �G�CHX&E�� C!~Y���PsP2#lf0�;^�7s�Ͽ�1��������_^?w#���?<�~��~?�ɡ����U�n�iw��翿�������Iv�������_<q��}\s�ǐ����<ڝ�U�9�z�а��c3+s���{̥�����Y�_�=]vިC@ҥ�"Gnd|B�c

d�ŋ x�"�ȧ�@N0HK  E�	B"b��p��C(p  K Hh��3��m(Z/�	���f;K�9 F�",0�� ,#�Ҁ�D�3�RЋy�����g�R�5p�3���Xp>H���!��}�?	��l�s���_���~��ߧ���=����9��oߣ��c�w�o}1��?5�q����?�}���&t���*���߇{��u�����}���u�������K���O���z�����
��O��D�(�`�C�܃DJ0X�D�����[f��T�"E.�� U�R�`���U�)[@�� a��.h@�LƜrC�'��0	����Mh
b 
�`F�16+��QR]>�xP����{�>�O��ss������?��L�~����������-���oM��Y{�_����_�����'����մ�2���8��߯�[�w��i��U2=ͷ��φﮒ�����{����	�f4��o�S(���8w���o��������s����}��q�N?������<
Sa�8	Z,� i��HHA�x�:�T��`*AF�h�@W� �I��!�eJ���a ��=����%�!�'L$2���PN� pp) "�A�6    },

      /**
       * Removes all nodes in set from the document.
       *
       * @method remove
       * @return {tinymce.dom.DomQuery} Current set with the removed nodes.
       */
      remove: function () {
        var self = this, node, i = this.length;

        while (i--) {
          node = self[i];
          Event.clean(node);

          if (node.parentNode) {
            node.parentNode.removeChild(node);
          }
        }

        return this;
      },

      /**
       * Empties all elements in set.
       *
       * @method empty
       * @return {tinymce.dom.DomQuery} Current set with the empty nodes.
       */
      empty: function () {
        var self = this, node, i = this.length;

        while (i--) {
          node = self[i];
          while (node.firstChild) {
            node.removeChild(node.firstChild);
          }
        }

        return this;
      },

      /**
       * Sets or gets the HTML of the current set or first set node.
       *
       * @method html
       * @param {String} value Optional innerHTML value to set on each element.
       * @return {tinymce.dom.DomQuery/String} Current set or the innerHTML of the first element.
       */
      html: function (value) {
        var self = this, i;

        if (isDefined(value)) {
          i = self.length;

          try {
            while (i--) {
              self[i].innerHTML = value;
            }
          } catch (ex) {
            // Workaround for "Unknown runtime error" when DIV is added to P on IE
            DomQuery(self[i]).empty().append(value);
          }

          return self;
        }

        return self[0] ? self[0].innerHTML : '';
      },

      /**
       * Sets or gets the text of the current set or first set node.
       *
       * @method text
       * @param {String} value Optional innerText value to set on each element.
       * @return {tinymce.dom.DomQuery/String} Current set or the innerText of the first element.
       */
      text: function (value) {
        var self = this, i;

        if (isDefined(value)) {
          i = self.length;
          while (i--) {
            if ("innerText" in self[i]) {
              self[i].innerText = value;
            } else {
              self[0].textContent = value;
            }
          }

          return self;
        }

        return self[0] ? (self[0].innerText || self[0].textContent) : '';
      },

      /**
       * Appends the specified node/html or node set to the current set nodes.
       *
       * @method append
       * @param {String/Element/Array/tinymce.dom.DomQuery} content Content to append to each element in set.
       * @return {tinymce.dom.DomQuery} Current set.
       */
      append: function () {
        return domManipulate(this, arguments, function (node) {
          // Either element or Shadow Root
          if (this.nodeType === 1 || (this.host && this.host.nodeType === 1)) {
            this.appendChild(node);
          }
        });
      },

      /**
       * Prepends the specified node/html or node set to the current set nodes.
       *
       * @method prepend
       * @param {String/Element/Array/tinymce.dom.DomQuery} content Content to prepend to each element in set.
       * @return {tinymce.dom.DomQuery} Current set.
       */
      prepend: function () {
        return domManipulate(this, arguments, function (node) {
          // Either element or Shadow Root
          if (this.nodeType === 1 || (this.host && this.host.nodeType === 1)) {
            this.insertBefore(node, this.firstChild);
          }
        }, true);
      },

      /**
       * Adds the specified elements before current set nodes.
       *
       * @method before
       * @param {String/Element/Array/tinymce.dom.DomQuery} content Content to add before to each element in set.
       * @return {tinymce.dom.DomQuery} Current set.
       */
      before: function () {
        var self = this;

        if (self[0] && self[0].parentNode) {
          return domManipulate(self, arguments, function (node) {
            this.parentNode.insertBefore(node, this);
          });
        }

        return self;
      },

      /**
       * Adds the specified elements after current set nodes.
       *
       * @method after
       * @param {String/Element/Array/tinymce.dom.DomQuery} content Content to add after to each element in set.
       * @return {tinymce.dom.DomQuery} Current set.
       */
      after: function () {
        var self = this;

        if (self[0] && self[0].parentNode) {
          return domManipulate(self, arguments, function (node) {
            this.parentNode.insertBefore(node, this.nextSibling);
          }, true);
        }

        return self;
      },

      /**
       * Appends the specified set nodes to the specified selector/instance.
       *
       * @method appendTo
       * @param {String/Element/Array/tinymce.dom.DomQuery} val Item to append the current set to.
       * @return {tinymce.dom.DomQuery} Current set with the appended nodes.
       */
      appendTo: function (val) {
        DomQuery(val).append(this);

        return this;
      },

      /**
       * Prepends the specified set nodes to the specified selector/instance.
       *
       * @method prependTo
       * @param {String/Element/Array/tinymce.dom.DomQuery} val Item to prepend the current set to.
       * @return {tinymce.dom.DomQuery} Current set with the prepended nodes.
       */
      prependTo: function (val) {
        DomQuery(val).prepend(this);

        return this;
      },

      /**
       * Replaces the nodes in set with the specified content.
       *
       * @method replaceWith
       * @param {String/Element/Array/tinymce.dom.DomQuery} content Content to replace nodes with.
       * @return {tinymce.dom.DomQuery} Set with replaced nodes.
       */
      replaceWith: function (content) {
        return this.before(content).remove();
      },

      /**
       * Wraps all elements in set with the specified wrapper.
       *
       * @method wrap
       * @param {String/Element/Array/tinymce.dom.DomQuery} content Content to wrap nodes with.
       * @return {tinymce.dom.DomQuery} Set with wrapped nodes.
       */
      wrap: function (content) {
        return wrap(this, content);
      },

      /**
       * Wraps all nodes in set with the specified wrapper. If the nodes are siblings all of them
       * will be wrapped in the same wrapper.
       *
       * @method wrapAll
       * @param {String/Element/Array/tinymce.dom.DomQuery} content Content to wrap nodes with.
       * @return {tinymce.dom.DomQuery} Set with wrapped nodes.
       */
      wrapAll: function (content) {
        return wrap(this, content, true);
      },

      /**
       * Wraps all elements inner contents in set with the specified wrapper.
       *
       * @method wrapInner
       * @param {String/Element/Array/tinymce.dom.DomQuery} content Content to wrap nodes with.
       * @return {tinymce.dom.DomQuery} Set with wrapped nodes.
       */
      wrapInner: function (content) {
        this.each(function () {
          DomQuery(this).contents().wrapAll(content);
        });

        return this;
      },

      /**
       * Unwraps all elements by removing the parent element of each item in set.
       *
       * @method unwrap
       * @return {tinymce.dom.DomQuery} Set with unwrapped nodes.
       */
      unwrap: function () {
        return this.parent().each(function () {
          DomQuery(this).replaceWith(this.childNodes);
        });
      },

      /**
       * Clones all nodes in set.
       *
       * @method clone
       * @return {tinymce.dom.DomQuery} Set with cloned nodes.
       */
      clone: function () {
        var result = [];

        this.each(function () {
          result.push(this.cloneNode(true));
        });

        return DomQuery(result);
      },

      /**
       * Adds the specified class name to the current set elements.
       *
       * @method addClass
       * @param {String} className Class name to add.
       * @return {tinymce.dom.DomQuery} Current set.
       */
      addClass: function (className) {
        return this.toggleClass(className, true);
      },

      /**
       * Removes the specified class name to the current set elements.
       *
       * @method removeClass
       * @param {String} className Class name to remove.
       * @return {tinymce.dom.DomQuery} Current set.
       */
      removeClass: function (className) {
        return this.toggleClass(className, false);
      },

      /**
       * Toggles the specified class name on the current set elements.
       *
       * @method toggleClass
       * @param {String} className Class name to add/remove.
       * @param {Boolean} state Optional state to toggle on/off.
       * @return {tinymce.dom.DomQuery} Current set.
       */
      toggleClass: function (className, state) {
        var self = this;

        // Functions are not supported
        if (typeof className != 'string') {
          return self;
        }

        if (className.indexOf(' ') !== -1) {
          each(className.split(' '), function () {
            self.toggleClass(this, state);
          });
        } else {
          self.each(function (index, node) {
            var existingClassName, classState;

            classState = hasClass(node, className);
            if (classState !== state) {
              existingClassName = node.className;

              if (classState) {
                node.className = trim((" " + existingClassName + " ").replace(' ' + className + ' ', ' '));
              } else {
                node.className += existingClassName ? ' ' + className : className;
              }
            }
          });
        }

        return self;
      },

      /**
       * Returns true/false if the first item in set has the specified class.
       *
       * @method hasClass
       * @param {String} className Class name to check for.
       * @return {Boolean} True/false if the set has the specified class.
       */
      hasClass: function (className) {
        return hasClass(this[0], className);
      },

      /**
       * Executes the callback function for each item DomQuery collection. If you return false in the
       * callback it will break the loop.
       *
       * @method each
       * @param {function} callback Callback function to execute for each item.
       * @return {tinymce.dom.DomQuery} Current set.
       */
      each: function (callback) {
        return each(this, callback);
      },

      /**
       * Binds an event with callback function to the elements in set.
       *
       * @method on
       * @param {String} name Name of the event to bind.
       * @param {function} callback Callback function to execute when the event occurs.
       * @return {tinymce.dom.DomQuery} Current set.
       */
      on: function (name, callback) {
        return this.each(function () {
          Event.bind(this, name, callback);
        });
      },

      /**
       * Unbinds an event with callback function to the elements in set.
       *
       * @method off
       * @param {String} name Optional name of the event to bind.
       * @param {function} callback Optional callback function to execute when the event occurs.
       * @return {tinymce.dom.DomQuery} Current set.
       */
      off: function (name, callback) {
        return this.each(function () {
          Event.unbind(this, name, callback);
        });
      },

      /**
       * Triggers the specified event by name or event object.
       *
       * @method trigger
       * @param {String/Object} name Name of the event to trigger or event object.
       * @return {tinymce.dom.DomQuery} Current set.
       */
      trigger: function (name) {
        return this.each(function () {
          if (typeof name == 'object') {
            Event.fire(this, name.type, name);
          } else {
            Event.fire(this, name);
          }
        });
      },

      /**
       * Shows all elements in set.
       *
       * @method show
       * @return {tinymce.dom.DomQuery} Current set.
       */
      show: function () {
        return this.css('display', '');
      },

      /**
       * Hides all elements in set.
       *
       * @method hide
       * @return {tinymce.dom.DomQuery} Current set.
       */
      hide: function () {
        return this.css('display', 'none');
      },

      /**
       * Slices the current set.
       *
       * @method slice
       * @param {Number} start Start index to slice at.
       * @param {Number} end Optional end index to end slice at.
       * @return {tinymce.dom.DomQuery} Sliced set.
       */
      slice: function () {
        return new DomQuery(slice.apply(this, arguments));
      },

      /**
       * Makes the set equal to the specified index.
       *
       * @method eq
       * @param {Number} index Index to set it equal to.
       * @return {tinymce.dom.DomQuery} Single item set.
       */
      eq: function (index) {
        return index === -1 ? this.slice(index) : this.slice(index, +index + 1);
      },

      /**
       * Makes the set equal to first element in set.
       *
       * @method first
       * @return {tinymce.dom.DomQuery} Single item set.
       */
      first: function () {
        return this.eq(0);
      },

      /**
       * Makes the set equal to last element in set.
       *
       * @method last
       * @return {tinymce.dom.DomQuery} Single item set.
       */
      last: function () {
        return this.eq(-1);
      },

      /**
       * Finds elements by the specified selector for each element in set.
       *
       * @method find
       * @param {String} selector Selector to find elements by.
       * @return {tinymce.dom.DomQuery} Set with matches elements.
       */
      find: function (selector) {
        var i, l, ret = [];

        for (i = 0, l = this.length; i < l; i++) {
          DomQuery.find(selector, this[i], ret);
        }

        return DomQuery(ret);
      },

      /**
       * Filters the current set with the specified selector.
       *
       * @method filter
       * @param {String/function} selector Selector to filter elements by.
       * @return {tinymce.dom.DomQuery} Set with filtered elements.
       */
      filter: function (selector) {
        if (typeof selector == 'function') {
          return DomQuery(grep(this.toArray(), function (item, i) {
            return selector(i, item);
          }));
        }

        return DomQuery(DomQuery.filter(selector, this.toArray()));
      },

      /**
       * Gets the current node or any parent matching the specified selector.
       *
       * @method closest
       * @param {String/Element/tinymce.dom.DomQuery} selector Selector or element to find.
       * @return {tinymce.dom.DomQuery} Set with closest elements.
       */
      closest: function (selector) {
        var result = [];

        if (selector instanceof DomQuery) {
          selector = selector[0];
        }

        this.each(function (i, node) {
          while (node) {
            if (typeof selector == 'string' && DomQuery(node).is(selector)) {
              result.push(node);
              break;
            } else if (node == selector) {
              result.push(node);
              break;
            }

            node = node.parentNode;
          }
        });

        return DomQuery(result);
      },

      /**
       * Returns the offset of the first element in set or sets the top/left css properties of all elements in set.
       *
       * @method offset
       * @param {Object} offset Optional offset object to set on each item.
       * @return {Object/tinymce.dom.DomQuery} Returns the first element offset or the current set if you specified an offset.
       */
      offset: function (offset) {
        var elm, doc, docElm;
        var x = 0, y = 0, pos;

        if (!offset) {
          elm = this[0];

          if (elm) {
            doc = elm.ownerDocument;
            docElm = doc.documentElement;

            if (elm.getBoundingClientRect) {
              pos = elm.getBoundingClientRect();
              x = pos.left + (docElm.scrollLeft || doc.body.scrollLeft) - docElm.clientLeft;
              y = pos.top + (docElm.scrollTop || doc.body.scrollTop) - docElm.clientTop;
            }
    �����|���M���l���4U��y�k���x��ߝ��C������v����?�����կ��:���{��f�����|��o^������z�Y������_���W�_���J���f�g�Y�^�=q�����}�c������d��6Y��@f�n��%a�P�����}]#8k ��@��Rz�Fg�
���p�!�0��3��*�IE�B
#����7!F��U�b�dR���M���G����[�k�拭�iz4���f�����Gu�ǻ��/��{�^�/���������m�u���{9���~;�=���ַ��-۾3ʃ��{�2�n�.�''��=y�_}o�aG�֜�s���];�n��a'���g��T� L?�E#C�E���H�dc$�R�@
��4'Hh 8�l�R *+�f��B���{&�w ���O	[�Կ����p��Ȟ��?5��y[�����!�R��eO^����m�ͳ}����^��������>���c=_彽'ߛ����~��[S��,屗���M�?w���N�J��=�>��{\������������y������_,��?���{�����1��g<�n�%��?����g��?�_~G��?��5��O�>�q�o����Ǳg������}]����c���8�3������ܯ�_&��W�]������zW�;��f�u����pk�u)j ���q:$���D�Yn� ���<
�F��#����p�+��x�Á �P�P��-VEf���pԈD�@���ti�!�B�)ʒJ'�����'�  0e�������s|�o�����}B����̬���|���/���Lb�]�����[�]�����g�c�����_~�����������[��������H���x���ߚ��������.���n�������<�������oeY����Fpe2B A1���� %h�D)�P`��qNq� �,
��F0A24A�H� 
�$ "#�Õ�c�90 @�DHL��G�`����1;�ł�@�EI��Č%��Cmu�Di�n<c��R 
	B� ���T(9�����6w�z[��/s����U���C��o׹�rw�)�����N�n���S+���1�������-��}�<�����~�޵ǻ��u���P����}����o����]�y̹����`ww���{�[�U]����ze���כ�~��7ͷ��v���'�G�矿��_�]�?y���uW��w����}v_���SI}F7��~m��?��{�k��?��y�����������/�N��_�˷���9���[jg���O��^m���I��"AX
�rnR����4 ���D��N�JT�LGH�H�P_��� p�&�АX��O� �\@��H1d�-1 BV	�=;�dg��$@�0�a#@��	�)( �Dr���~x{߻�ڿ���&���~y����h��%͟������~3��kr-���?��3��Զ���og���~w�����k}o��,�h�!~�7�����98�ӟ�Ot��~/��;>z��߫��Oˀ0�TBP�P�����C��^@�T� z��h.�0�'t����jq8C�B�	S���p�B(,�R�נz�P�r&Sd-
���$��q�d-P� �`�& t�Jt�1�I ���A��O�<N������=�f�0�S� 
 �-��klD�	PjE+�7LO�@�cn#+��6rY�yRV�>��
pZ��D4,��V�II-��)��yˑ�p�>#�^P ��S|������9�IU����C�Q�s���u{�����������������������<�{oB�~��ﱾzv}�E{-������ۼ�kg����~��m���˴� ���m�V������o_��{̅���TAH%��O��R��j $Ƞ"�k4J�F�OF�$� �
��/�#Va 7"�PHAf���A@ 
���	҅Q�q`$؋�`@���C����C���AX4���) ����I������-�?����w�����^�f�׻|��s��]�o��	w���Oj>��z���[�F�����vkY�nR帹7���~�}����>/e�����V�h��z<��?��}?��y�e�� s�[������������/������~k8���>���_��#u�����\��=�v�;����ߣ+y�kWڇ���υ����~��똿M��K����wóU�������<���)���\����Y������]�����_��k6	��� P�5�@�Tq�Fj�Fh =p`
~��?ߊ�}W�m���f����y��Hx,M����9���{�_��tu�����?����_~swkY���^��_�s���������xi潼�u�]�9���/�v�������3o�����w��|����Ow� Gx�	ǂb�k�� �z
��@�
8���"|:���A��j XObl	P���#\ k�`�"�((�W$�$ �rά�-�����������?�ŗ�|�F��.N��xݣW�_w�s���?u��yE7?���v=�'��y�(~�I�����z�,^��]����|��]�J��u�����_����������u�ޙ/���{�g�����K��o��?WV�|�^���?����ڿ�~�^�ǌ���m�W������5��y��������e�_�������������߮�L?l�]��3��|����'�4O��=��[�N������K�������M�qeE�L��T>uY��u�� h3 Z^�X�OT.��W��#<�? �p'�	�D!d�� :s�c� A9�te$��
?�HB
���w)20��Q��z5  }

        if (cur.nodeType === 1) {
          matched.push(cur);
        }

        cur = cur[prop];
      }

      return matched;
    }

    function sibling(node, siblingName, nodeType, until) {
      var result = [];

      if (until instanceof DomQuery) {
        until = until[0];
      }

      for (; node; node = node[siblingName]) {
        if (nodeType && node.nodeType !== nodeType) {
          continue;
        }

        if (until !== undefined) {
          if (node === until) {
            break;
          }

          if (typeof until == 'string' && DomQuery(node).is(until)) {
            break;
          }
        }

        result.push(node);
      }

      return result;
    }

    function firstSibling(node, siblingName, nodeType) {
      for (node = node[siblingName]; node; node = node[siblingName]) {
        if (node.nodeType == nodeType) {
          return node;
        }
      }

      return null;
    }

    each({
      /**
       * Returns a new collection with the parent of each item in current collection matching the optional selector.
       *
       * @method parent
       * @param {Element/tinymce.dom.DomQuery} node Node to match parents against.
       * @return {tinymce.dom.DomQuery} New DomQuery instance with all matching parents.
       */
      parent: function (node) {
        var parent = node.parentNode;

        return parent && parent.nodeType !== 11 ? parent : null;
      },

      /**
       * Returns a new collection with the all the parents of each item in current collection matching the optional selector.
       *
       * @method parents
       * @param {Element/tinymce.dom.DomQuery} node Node to match parents against.
       * @return {tinymce.dom.DomQuery} New DomQuery instance with all matching parents.
       */
      parents: function (node) {
        return dir(node, "parentNode");
      },

      /**
       * Returns a new collection with next sibling of each item in current collection matching the optional selector.
       *
       * @method next
       * @param {Element/tinymce.dom.DomQuery} node Node to match the next element against.
       * @return {tinymce.dom.DomQuery} New DomQuery instance with all matching elements.
       */
      next: function (node) {
        return firstSibling(node, 'nextSibling', 1);
      },

      /**
       * Returns a new collection with previous sibling of each item in current collection matching the optional selector.
       *
       * @method prev
       * @param {Element/tinymce.dom.DomQuery} node Node to match the previous element against.
       * @return {tinymce.dom.DomQuery} New DomQuery instance with all matching elements.
       */
      prev: function (node) {
        return firstSibling(node, 'previousSibling', 1);
      },

      /**
       * Returns all child elements matching the optional selector.
       *
       * @method children
       * @param {Element/tinymce.dom.DomQuery} node Node to match the elements against.
       * @return {tinymce.dom.DomQuery} New DomQuery instance with all matching elements.
       */
      children: function (node) {
        return sibling(node.firstChild, 'nextSibling', 1);
      },

      /**
       * Returns all child nodes matching the optional selector.
       *
       * @method contents
       * @param {Element/tinymce.dom.DomQuery} node Node to get the contents of.
       * @return {tinymce.dom.DomQuery} New DomQuery instance with all matching elements.
       */
      contents: function (node) {
        return Tools.toArray((node.nodeName === "iframe" ? node.contentDocument || node.contentWindow.document : node).childNodes);
      }
    }, function (name, fn) {
      DomQuery.fn[name] = function (selector) {
        var self = this, result = [];

        self.each(function () {
          var nodes = fn.call(result, this, selector, result);

          if (nodes) {
            if (DomQuery.isArray(nodes)) {
              result.push.apply(result, nodes);
            } else {
              result.push(nodes);
            }
          }
        });

        // If traversing on multiple elements we might get the same elements twice
        if (this.length > 1) {
          if (!skipUniques[name]) {
            result = DomQuery.unique(result);
          }

          if (name.indexOf('parents') === 0) {
            result = result.reverse();
          }
        }

        result = DomQuery(result);

        if (selector) {
          return result.filter(selector);
        }

        return result;
      };
    });

    each({
      /**
       * Returns a new collection with the all the parents until the matching selector/element
       * of each item in current collection matching the optional selector.
       *
       * @method parentsUntil
       * @param {Element/tinymce.dom.DomQuery} node Node to find parent of.
       * @param {String/Element/tinymce.dom.DomQuery} until Until the matching selector or element.
       * @return {tinymce.dom.DomQuery} New DomQuery instance with all matching parents.
       */
      parentsUntil: function (node, until) {
        return dir(node, "parentNode", until);
      },

      /**
       * Returns a new collection with all next siblings of each item in current collection matching the optional selector.
       *
       * @method nextUntil
       * @param {Element/tinymce.dom.DomQuery} node Node to find next siblings on.
       * @param {String/Element/tinymce.dom.DomQuery} until Until the matching selector or element.
       * @return {tinymce.dom.DomQuery} New DomQuery instance with all matching elements.
       */
      nextUntil: function (node, until) {
        return sibling(node, 'nextSibling', 1, until).slice(1);
      },

      /**
       * Returns a new collection with all previous siblings of each item in current collection matching the optional selector.
       *
       * @method prevUntil
       * @param {Element/tinymce.dom.DomQuery} node Node to find previous siblings on.
       * @param {String/Element/tinymce.dom.DomQuery} until Until the matching selector or element.
       * @return {tinymce.dom.DomQuery} New DomQuery instance with all matching elements.
       */
      prevUntil: function (node, until) {
        return sibling(node, 'previousSibling', 1, until).slice(1);
      }
    }, function (name, fn) {
      DomQuery.fn[name] = function (selector, filter) {
        var self = this, result = [];

        self.each(function () {
          var nodes = fn.call(result, this, selector, result);

          if (nodes) {
            if (DomQuery.isArray(nodes)) {
              result.push.apply(result, nodes);
            } else {
              result.push(nodes);
            }
          }
        });

        // If traversing on multiple elements we might get the same elements twice
        if (this.length > 1) {
          result = DomQuery.unique(result);

          if (name.indexOf('parents') === 0 || name === 'prevUntil') {
            result = result.reverse();
          }
        }

        result = DomQuery(result);

        if (filter) {
          return result.filter(filter);
        }

        return result;
      };
    });

    /**
     * Returns true/false if the current set items matches the selector.
     *
     * @method is
     * @param {String} selector Selector to match the elements against.
     * @return {Boolean} True/false if the current set matches the selector.
     */
    DomQuery.fn.is = function (selector) {
      return !!selector && this.filter(selector).length > 0;
    };

    DomQuery.fn.init.prototype = DomQuery.fn;

    DomQuery.overrideDefaults = function (callback) {
      var defaults;

      function sub(selector, context) {
        defaults = defaults || callback();

        if (arguments.length === 0) {
          selector = defaults.element;
        }

        if (!context) {
          context = defaults.context;
        }

        return new sub.fn.init(selector, context);
      }

      DomQuery.extend(sub, this);

      return sub;
    };

    function appendHooks(targetHooks, prop, hooks) {
      each(hooks, function (name, func) {
        targetHooks[name] = targetHooks[name] || {};
        targetHooks[name][prop] = func;
      });
    }

    if (Env.ie && Env.ie < 8) {
      appendHooks(attrHooks, 'get', {
        maxlength: function (elm) {
          var value = elm.maxLength;

          if (value === 0x7fffffff) {
            return undef;
          }

          return value;
        },

        size: function (elm) {
          var value = elm.size;

          if (value === 20) {
            return undef;
          }

          return value;
        },

        'class': function (elm) {
          return elm.className;
        },

        style: function (elm) {
          var value = elm.style.cssText;

          if (value.length === 0) {
            return undef;
          }

          return value;
        }
      });

      appendHooks(attrHooks, 'set', {
        'class': function (elm, value) {
          elm.className = value;
        },

        style: function (elm, value) {
          elm.style.cssText = value;
        }
      });
    }

    if (Env.ie && Env.ie < 9) {
      /*jshint sub:true */
      /*eslint dot-notation: 0*/
      cssFix['float'] = 'styleFloat';

      appendHooks(cssHooks, 'set', {
        opacity: function (elm, value) {
          var style = elm.style;

          if (value === null || value === '') {
            style.removeAttribute('filter');
          } else {
            style.zoom = 1;
            style.filter = 'alpha(opacity=' + (value * 100) + ')';
          }
        }
      });
    }

    DomQuery.attrHooks = attrHooks;
    DomQuery.cssHooks = cssHooks;

    return DomQuery;
  }
);

/**
 * Styles.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class is used to parse CSS styles it also compresses styles to reduce the output size.
 *
 * @example
 * var Styles = new tinymce.html.Styles({
 *    url_converter: function(url) {
 *       return url;
 *    }
 * });
 *
 * styles = Styles.parse('border: 1px solid red');
 * styles.color = 'red';
 *
 * console.log(new tinymce.html.StyleSerializer().serialize(styles));
 *
 * @class tinymce.html.Styles
 * @version 3.4
 */
define(
  'tinymce.core.html.Styles',
  [
  ],
  function () {
    return function (settings, schema) {
      /*jshint maxlen:255 */
      /*eslint max-len:0 */
      var rgbRegExp = /rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi,
        urlOrStrRegExp = /(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^\']+)\'\s*\))|(?:\(\s*([^)\s]+)\s*\))))|(?:\'([^\']+)\')|(?:\"([^\"]+)\")/gi,
        styleRegExp = /\s*([^:]+):\s*([^;]+);?/g,
        trimRightRegExp = /\s+$/,
        i, encodingLookup = {}, encodingItems, validStyles, invalidStyles, invisibleChar = '\uFEFF';

      settings = settings || {};

      if (schema) {
        validStyles = schema.getValidStyles();
        invalidStyles = schema.getInvalidStyles();
      }

      encodingItems = ('\\" \\\' \\; \\: ; : ' + invisibleChar).split(' ');
      for (i = 0; i < encodingItems.length; i++) {
        encodingLookup[encodingItems[i]] = invisibleChar + i;
        encodingLookup[invisibleChar + i] = encodingItems[i];
      }

      function toHex(match, r, g, b) {
        function hex(val) {
          val = parseInt(val, 10).toString(16);

          return val.length > 1 ? val : '0' + val; // 0 -> 00
        }

        return '#' + hex(r) + hex(g) + hex(b);
      }

      return {
        /**
         * Parses the specified RGB color value and returns a hex version of that color.
         *
         * @method toHex
         * @param {String} color RGB string value like rgb(1,2,3)
         * @return {String} Hex version of that RGB value like #FF00FF.
         */
        toHex: function (color) {
          return color.replace(rgbRegExp, toHex);
        },

        /**
         * Parses the specified style value into an object collection. This parser will also
         * merge and remove any redundant items that browsers might have added. It will also convert non hex
         * colors to hex valuesp�A����.�T�� �2Vg��(y�� �� #�X *P��R%R�" A�H�� �@�J��x��&��@P� 0,��4�	�0�R"J",�5�a@�
  9��������"l���.A�gf@l@ .����$@c@��$�"x�銩G>)*�/"F�T�ɉ�<<E��Ѣ,�� �V�o[�� � ٔhR�	�Pмq��\�@�8��!��.	ĤQBYJ�P% �x���lV�mN(����J�:V���"H @ nlI �C<@Z�� ��!����@��@ �be( �F�$4P��Dآ �A@!�4H�
A�bOgts�NP��(E�FH �"���(� P� ��*\u�2*���܄���pX
����eL�e)��8��8�q�ɉ��d���b0!
��
����@���a  ��O
 QL�d���f) Ȣs��� h�4Ͱ
S� +Ζ�.D0%�Tc��]A��4@
��� "Z��2'+0`�F&
On8 XU0D%�Y4� kD&tP
``���p��͡��b�-|�m80���"ŕ�p%���9��V@x���] ������9ğ�J�|,�P�>�JPB� G��6���-h����c�1��;lh�vh���s8�L��[��Y��
��) ���F��h� ��� @ jT� 2�2 `@���* ����\$�@ 
.@B���Q""8��S��� �I���1���Ղƭ�3����
�`ƜÃ��*k�!�G��i�֩<��uaBC ��d�r2�a�A �Rk1ᔁ�x!� �g ���9Ր�:�xz�E�Va��H1,&�"��%Tc	���
4(RO�.�
��	@a��(P�!WB��J!D(G�U���)Շ!�J�b)������Њ��@`�ŀ�<3�DY�DX

A�� �h���c1�`yH3y�4�Jك�X3�g��0J�	( �?#
	�N�@���d  ��� ��ҦI��$�q0, ��P%R�N�"	 /`Y"BDaB>0MȤ�A@�pq�I�� ��@S��H`)��A�(KA"#L� J �F��T�����d@�``FQ�0�( ������R�D��*B\@1���gi�8HZ 6-@F\ʭ�81��^�Њ�E�(�=��B���[L��ܨ`� �jJP%Ȣؓy��YLC
��\01рOЅ��&"<�Y´p �̛㴃�D�O�`
i��-�($d����K�$V� (�TU!A)�A ��E qA�"p�A&٤I��E��F�� �)G,� F_X�$�f��0�!�AC�0�� �pU�@!k)A&ԙ � ! !��(A9�pH0�Pq���Lp�% �LP� � �����  /�W$
�0��	`��
�\ '(�
5�yq�!UM���"C��hJ��^Ԗo@kR�e�gL@I �
�� $ !��dZ����#��ÅV��F2P!-5���6V�0��̘�e�@F�jB�2m[I�	@@1ԅA�2�̜I�;$��V��!'�NfF�@:�@4�,1�/�06f�S��;�B�c�cH	�C0"�  oz
nAQLb���Z�N� �E] �`*H��!� \ǥH �8�p��J@��0"��I$�C�X�) � â�vH!TF�0 l#>T�*�`�9�&
9"��0W�"���" zm`X�P,j+#��`��R8*0�C,&@�OP9 ApBP� $���(@ �� ��iH F�"H �* �9�H�D (" $  
(�� ��%�6� ���A����D�,	P�yC�5 � ��$��[P;�.�
5l�T9� ��)��h@ߒlĄ��� J8 P(U�x!` 
��9$ )��  �@B 8�)ØNQ40�����$
*�raS�� Ap�H"3��� V0�6Er)�4������0�C�7(Z�2 ,EbJr�Qpá�� ~��� S�o$B�*�|W���EQ �^j1h�R-� tS�G	*O���A0R� d`n�J��\F("�+�K lA����X�I3@UB�� ��@�@�L!�Q$J�����)p�� _:p�����;�g4\TrP����W�Ad�xF��PMw�P$`C.:e|'�
A\6�0�
 �z� � 40��� � P
g	"0j�Q�
��D
~�~l���Ѕ;B9�҂�RB\��-sQ$�Cp9��a�q*#(�#�`
NP��DAV�_OR�$�L܅��P�$�Caf��Lǜ#���":�
X1@�U&1H���(#'��&�B��ZA���%L!P�Q$8  @�2�$GaҠ�B�
(
. �Q8 R�aĿ�Jj�`L�S-Y+*�D#
�( `01*�+H�L����	�k�" PT� �H��RA��M !�����iOkИR ��2���Dt��"M`(!T�1���B!eMD��������l%�,� ��̣06��d��n�s � 0@@-��L���!b�� ��`p !)Ef$�`ACB	'� d �Pa�6d`#&��B�D f!���Q(%O������^5UD`��cl�C��V!Ud@�.��q�ܺHg�BE��
��$D�3C7��3G#2�@щ�$NX����<�@$�-g�<|�dk95O���)��.5c$� �#�`��A����#D��
J�a"�J�P6��zB0M����)��� �+$s��D�[�
 F�c/B�/ `̀�`YT
2��lx ��t IA���,��C�~4D��
s�@�d@�a�[)��0�P+�(q\`�B e28dAU
��r !@k���4��M��e� �����6p,ࡺR@��4	�@�H�@� � �RAfh/B2��iLp�n@�T����7RIC��"��� P� �3N���Ђ�� `���u�'��-�0]L�jp��ң�J�A(�
�Ê� �`'H+aP�	1tBCag�)᝕ �X4�Im�
�n
�� 9DM�"�F J@1� .�.�	Ԣ?�(��w���T}x�5�@� R �)"(�"	D&���aiL���2!q�Չ2�	�^����f	��u�7!�Y,L�&���Y ,�E@LD �����$�	� �`uA����a� 
��#UE'�  ��΀�S�cdI0��AD��F�'�)�A� @E0����2�L� p`'�� ătA�Z`pz�(GHPb�M@���@$$�W���`�t�0@
H ��Vq@&5�4��wrD��K��B�@$@L�r�D���i��������1"F �4��H��`@	I��D�d�@��� 1p� �� p�D� �Zyճ;�Y��Wz�#��Ɗ��  8[���q�BXT��l����@�+�!�9� &������P�2��K���!�0Ȧp��YЩ��
��%��pds�� Sb�� 0����4�L1TX�ΐ��t� �`�� �<&�X.�rD5D�� �1B����@IH@R*d�B�R�>���Ė�&FI@�M�$
5P$C�E~ ��$G@4iDu&R!JÙ3}
Fj ��A�.�7ћa����	b0{��v�P8t�Y�Kr���HL u2X��PB11(���t�|J�Ӵ�@�68�`����ޥǒ�#�gFP/2�0�h3�M D��S u` ��"h%q�G���%d)B0H4�L(��<���@$''��ԀB���b� K����#��p��o˱c@ �d@��.n���jY�Є�EdB����3o���ɑ)
.Fa�8�� 
K���#��V8!�1 Q0B��jF�Å�yR�@�0dB�B�\ �V�P�T�C��B� dV� @2��`:�ș=w���1  @"n � 'kU��JfB#RC%gB*p
44I��{CI \($q��(	� 
���d$L ��	��a1;��TlP;0 (# 0P��B��\��
%N��r#�8� B՛	�	!N�������C�t��烍��"� )᷑�G ��*T��B
�\���
�)�%,BCaބBY��
���ȤH��F��(	  PcP�Q
D�� �� �Ò!pB��k�؊ �b�h��j/�F X�PZ!N:�����0I�В X �QԂ�� 򴆐������X1a,zhi� 3z3	#��(۶�M���5

�� LT��0LZ\(���� � $PR�1K"�� =�L$�Wp
�R,���,L� �LP8�� d VN!EL*�Y8y�D)  �� ��3�٠��	 ��$(��@pr@�5� @F"�� L�AΨA������ @&D� 
�5\��8�PD �8P(8TA3lF�Ӭi�����@З�j�J�T��	���B���0��Rx퉡�@A��C&'T, ш@ �v"|$�yYZ2�X(	E
�d��-�B���VJ �J2�`;ۯF�+�éC2�h���g,\t �&�VW��'��A�ʰ�q����ip /#����*�?x {`�Y � @�V0�PD�R�PK�,�vشD04���@Ev(Ԙ
Im=�٘#!K80��q���G�Z9$�9�A��@@r� AKP �NR[� ���*(�5 2�
r@��)Pր!�а&�e�X�(�H�E��@Ŝi����D�� �DRs�a�,(�* %D�^/� ��N EM�&�%�xq%�,[� F*H �A�s �(h0�hȈ��v@�� �/�H��	� Q�"@ �L2�@
SQ�HJ��&�8A����a����
 @
���l p"�@�@�(4����O� �h`Vz���0Q��}R��
1$�Bv�bp"�����d]��7�)ԈQi�aBSB���ۂ2�HusG��a1����	�DD���+��ݝU0�	C�Hp6��aE
'�(-V��5  ����
�	��f(hu���Z E"
Sd���Q�!�����$��'�"�%��U<��r@�y�� @��#J�t���MjH�\N� ��� P�BY� �f�=)"h�C��� A@��1]����K�`��6'͐%�"#���DYɁp�@G��D��� �.L�HAC\<�E:S i[SLR(B�%�e�`0V"�5
@̀� rA�'� �1&��6���O�� ���W�B�0���H��d�9�� P�lC��#�PQ�L��	��AZ�҄-�G �� |)IA��$t� �� @L�S�1CA�$����<�	�	 5HLh h ,(H��)p��!�=A��C�54� �*��`�2�����*R���!D�(�R4EH�
P�	�E؟��S ��B�i��Ez
(
F)@�Bf�I%P���9 �2����(:�(F�x`��AT^Q�O��LDJ`z[f �`0  "D�},�,��!f���lNb(���D�P_X��CP���A 7 ("��K 
 �
�8@�
U�B�" �d�x[	�6LP%
�BHD@`g���<�P �!$�Zc��d�W_�
���+N{���� z�!�HI�%�)��Bئ"�!U
H� H�����P�TQ�� C#�B��RBD�H��D$B��@P�\�h��a�
A�
���$!*����Z�#E��|��P�R��ɷ��I�(V �t���D�BB�� ����R�  ����C)ًq ��L� q`�h(��`X����J�!#���c -� �4�@��M#�Q�PC� R��`���XD@7���F}j�"#� �K�3��i	XɁGDذ��p���I�| V�@��BA`T@E"��*�G=J5
,� $��JJ�s��4"y�|� �P�>�!�/S�&,3C !o|P��+&�`8�T0���� #�Ep�lxR��n��#�`�aH� �(`��� a�$�(C d ҆D(jɒU�*��x	�	��DAH�����X��0�nX0�B	F�!f���H8L�,B:@ ���4"��N�K A����J�H}i��5�
T;�� L�� �D�6z#z�"p�a:HF#BLL�T`���l�EH�I C	�9��
2 ��8J�	� �(2J��<�B#��!���FI��H&8v&�hB�Xػ	*
� ���(�%@L� �5B����dD��:R����L@�ք���De��m`P]�L H�T��b@gpK���0��[�<(-���Kz������	`�*)  |�@n� (���@�h3�TA��k�1@�A�����7� ��&��A�PJ� (\' �!Pɀ��IW��* 	D@��B�H
D��d[
V�ǉ��KT�ՠ�� %@p~._ 0"�<���+%dhC"8�Msb����H����Áed�b����Q�ӠS�4ɂ�( � �E��T��1�� F
  "�6����74:�0C��Bc@	;��@� ��aD�H$�r��Q$���d��!
�23($�E� ]�le	0�ئA$G�P&@D A`�� �p���
��3��� 0�		R�F�jB(�9�#��A'#a���,�qJ%�T  ����a�A���@,�=ٖ��f4ɇ�iB��Y��r���rԀ�U���n�*�J�v@e����	6��7ܙH���% @�	�:|e���6=Ј& +H@H�@m�e�t����(�"P<	<,��C(y0�`!H�$P0K��(���@-SH�q���ҰB
�P���p
f[ ,I�*�Ol3���p����
(��Ph�4>#5Ac0`��F�Ш��1
return parent;
          }
        }
      }

      /**
       * Returns the current node.
       *
       * @method current
       * @return {Node} Current node where the walker is.
       */
      this.current = function () {
        return node;
      };

      /**
       * Walks to the next node in tree.
       *
       * @method next
       * @return {Node} Current node where the walker is after moving to the next node.
       */
      this.next = function (shallow) {
        node = findSibling(node, 'firstChild', 'nextSibling', shallow);
        return node;
      };

      /**
       * Walks to the previous node in tree.
       *
       * @method prev
       * @return {Node} Current node where the walker is after moving to the previous node.
       */
      this.prev = function (shallow) {
        node = findSibling(node, 'lastChild', 'previousSibling', shallow);
        return node;
      };

      this.prev2 = function (shallow) {
        node = findPreviousNode(node, 'lastChild', 'previousSibling', shallow);
        return node;
      };
    };
  }
);

/**
 * Entities.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*jshint bitwise:false */
/*eslint no-bitwise:0 */

/**
 * Entity encoder class.
 *
 * @class tinymce.html.Entities
 * @static
 * @version 3.4
 */
define(
  'tinymce.core.html.Entities',
  [
    "tinymce.core.util.Tools"
  ],
  function (Tools) {
    var makeMap = Tools.makeMap;

    var namedEntities, baseEntities, reverseEntities,
      attrsCharsRegExp = /[&<>\"\u0060\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
      textCharsRegExp = /[<>&\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
      rawCharsRegExp = /[<>&\"\']/g,
      entityRegExp = /&#([a-z0-9]+);?|&([a-z0-9]+);/gi,
      asciiMap = {
        128: "\u20AC", 130: "\u201A", 131: "\u0192", 132: "\u201E", 133: "\u2026", 134: "\u2020",
        135: "\u2021", 136: "\u02C6", 137: "\u2030", 138: "\u0160", 139: "\u2039", 140: "\u0152",
        142: "\u017D", 145: "\u2018", 146: "\u2019", 147: "\u201C", 148: "\u201D", 149: "\u2022",
        150: "\u2013", 151: "\u2014", 152: "\u02DC", 153: "\u2122", 154: "\u0161", 155: "\u203A",
        156: "\u0153", 158: "\u017E", 159: "\u0178"
      };

    // Raw entities
    baseEntities = {
      '\"': '&quot;', // Needs to be escaped since the YUI compressor would otherwise break the code
      "'": '&#39;',
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '\u0060': '&#96;'
    };

    // Reverse lookup table for raw entities
    reverseEntities = {
      '&lt;': '<',
      '&gt;': '>',
      '&amp;': '&',
      '&quot;': '"',
      '&apos;': "'"
    };

    // Decodes text by using the browser
    function nativeDecode(text) {
      var elm;

      elm = document.createElement("div");
      elm.innerHTML = text;

      return elm.textContent || elm.innerText || text;
    }

    // Build a two way lookup table for the entities
    function buildEntitiesLookup(items, radix) {
      var i, chr, entity, lookup = {};

      if (items) {
        items = items.split(',');
        radix = radix || 10;

        // Build entities lookup table
        for (i = 0; i < items.length; i += 2) {
          chr = String.fromCharCode(parseInt(items[i], radix));

          // Only add non base entities
          if (!baseEntities[chr]) {
            entity = '&' + items[i + 1] + ';';
            lookup[chr] = entity;
            lookup[entity] = chr;
          }
        }

        return lookup;
      }
    }

    // Unpack entities lookup where the numbers are in radix 32 to reduce the size
    namedEntities = buildEntitiesLookup(
      '50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,' +
      '5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,' +
      '5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,' +
      '5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,' +
      '68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,' +
      '6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,' +
      '6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,' +
      '75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,' +
      '7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,' +
      '7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,' +
      'sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,' +
      'st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,' +
      't9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,' +
      'tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,' +
      'u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,' +
      '81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,' +
      '8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,' +
      '8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,' +
      '8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,' +
      '8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,' +
      'nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,' +
      'rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,' +
      'Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,' +
      '80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,' +
      '811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro', 32);

    var Entities = {
      /**
       * Encodes the specified string using raw entities. This means only the required XML base entities will be encoded.
       *
       * @method encodeRaw
       * @param {String} text Text to encode.
       * @param {Boolean} attr Optional flag to specify if the text is attribute contents.
       * @return {String} Entity encoded text.
       */
      encodeRaw: function (text, attr) {
        return text.replace(attr ? attrsCharsRegExp : textCharsRegExp, function (chr) {
          return baseEntities[chr] || chr;
        });
      },

      /**
       * Encoded the specified text with both the attributes and text entities. This function will produce larger text contents
       * since it doesn't know if the context is within a attribute or text node. This was added for compatibility
       * and is exposed as the DOMUtils.encode function.
       *
       * @method encodeAllRaw
       * @param {String} text Text to encode.
       * @return {String} Entity encoded text.
       */
      encodeAllRaw: function (text) {
        return ('' + text).replace(rawCharsRegExp, function (chr) {
          return baseEntities[chr] || chr;
        });
      },

      /**
       * Encodes the specified string using numeric entities. The core entities will be
       * encoded as named ones but all non lower ascii characters will be encoded into numeric entities.
       *
       * @method encodeNumeric
       * @param {String} text Text to encode.
       * @param {Boolean} attr Optional flag to specify if the text is attribute contents.
       * @return {String} Entity encoded text.
       */
      encodeNumeric: function (text, attr) {
        return text.replace(attr ? attrsCharsRegExp : textCharsRegExp, function (chr) {
          // Multi byte sequence convert it to a single entity
          if (chr.length > 1) {
            return '&#' + (((chr.charCodeAt(0) - 0xD800) * 0x400) + (chr.charCodeAt(1) - 0xDC00) + 0x10000) + ';';
          }

          return baseEntities[chr] || '&#' + chr.charCodeAt(0) + ';';
        });
      },

      /**
       * Encodes the specified string using named entities. The core entities will be encoded
       * as named ones but all non lower ascii characters will be encoded into named entities.
       *
       * @method encodeNamed
       * @param {String} text Text to encode.
       * @param {Boolean} attr Optional flag to specify if the text is attribute contents.
       * @param {Object} entities Optional parameter with entities to use.
       * @return {String} Entity encoded text.
       */
      encodeNamed: function (text, attr, entities) {
        entities = entities || namedEntities;

        return text.replace(attr ? attrsCharsRegExp : textCharsRegExp, function (chr) {
          return baseEntities[chr] || entities[chr] || chr;
        });
      },

      /**
       * Returns an encode function based on the name(s) and it's optional entities.
       *
       * @method getEncodeFunc
       * @param {String} name Comma separated list of encoders for example named,numeric.
       * @param {String} entities Optional parameter with entities to use instead of the built in set.
       * @return {function} Encode function to be used.
       */
      getEncodeFunc: function (name, entities) {
        entities = buildEntitiesLookup(entities) || namedEntities;

        function encodeNamedAndNumeric(text, attr) {
          return text.replace(attr ? attrsCharsRegExp : textCharsRegExp, function (chr) {
            if (baseEntities[chr] !== undefined) {
              return baseEntities[chr];
            }

            if (entities[chr] !== undefined) {
              return entities[chr];
            }

            // Convert multi-byte sequences to a single entity.
            if (chr.length > 1) {
              return '&#' + (((chr.charCodeAt(0) - 0xD800) * 0x400) + (chr.charCodeAt(1) - 0xDC00) + 0x10000) + ';';
            }

            return '&#' + chr.charCodeAt(0) + ';';
          });
        }

        function encodeCustomNamed(text, attr) {
          return Entities.encodeNamed(text, attr, entities);
        }

        // Replace + with , to be compatible with previous TinyMCE versions
        name = makeMap(name.replace(/\+/g, ','));

        // Named and numeric encoder
        if (name.named && name.numeric) {
          return encodeNamedAndNumeric;
        }

        // Named encoder
        if (name.named) {
          // Custom names
          if (entities) {
            return encodeCustomNamed;
          }

          return Entities.encodeNamed;
        }

        // Numeric
        if (name.numeric) {
          return Entities.encodeNumeric;
        }

        // Raw encoder
        return Entities.encodeRaw;
      },

      /**
       * Decodes the specified string, this will replace entities with raw UTF characters.
       *
       * @method decode
       * @param {String} text Text to entity decode.
       * @return {String} Entity decoded string.
       */
      decode: function (text) {
        return text.replace(entityRegExp, function (all, numeric) {
          if (numeric) {
            if (numeric.charAt(0).toLowerCase() === 'x') {
              numeric = parseInt(numeric.substr(1), 16);
            } else {
              numeric = parseInt(numeric, 10);
            }

            // Support upper UTF
            if (numeric > 0xFFFF) {
              numeric -= 0x10000;

              return String.fromCharCode(0xD800 + (numeric >> 10), 0xDC00 + (numeric & 0x3FF));
            }

            return asciiMap[numeric] || String.fromCharCode(numeric);
          }

          return reverseEntities[all] || namedEntities[all] || nativeDecode(all);
        });
      }
    };

    return Entities;
  }
);

/**
 * Range.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * Old IE Range.
 *
 * @private
 * @class tinymce.dom.Range
 */
define(
  'tinymce.core.dom.Range',
  [
    "tinymce.core.util.Tools"
  ],
  function (Tools) {
    // Range constructor
    function Range(dom) {
      var self = this,
        doc = dom.doc,
        EXTRACT = 0,
        CLONE = 1,
        DELETE = 2,
        TRUE = true,
        FALSE = false,
        START_OFFSET = 'startOffset',
        START_CONTAINER = 'startContainer',
        END_CONTAINER = 'endContainer',
        END_OFFSET = 'endOffset',
        extend = Tools.extend,
        nodeIndex = dom.nodeIndex;

      function createDocumentFragment() {
        return doc.createDocumentFragment();
      }

      function setStart(n, o) {
        _setEndPoint(TRUE, n, o);
      }

      function setEnd(n, o) {
        _setEndPoint(FALSE, n, o);
      }

      function setStartBefore(n) {
        setStart(n.parentNode, nodeIndex(n));
      }

      function setStartAfter(n) {
        setStart(n.parentNode, nodeIndex(n) + 1);
      }

      function setEndBefore(n) {
        setEnd(n.parentNode, nodeIndex(n));
      }

      function setEndAfter(n) {
        setEnd(n.parentNode, nodeIndex(n) + 1);
      }

      function collapse(ts) {
        if (ts) {
          self[END_CONTAINER] = self[START_CONTAINER];
          self[END_OFFSET] = self[START_OFFSET];
        } else {
          self[START_CONTAINER] = self[END_CONTAINER];
          self[START_OFFSET] = self[END_OFFSET];
        }

        self.collapsed = TRUE;
      }

      function selectNode(n) {
        setStartBefore(n);
        setEndAfter(n);
      }

      function selectNodeContents(n) {
        setStart(n, 0);
        setEnd(n, n.nodeType === 1 ? n.childNodes.length : n.nodeValue.length);
      }

      function compareBoundaryPoints(h, r) {
        var sc = self[START_CONTAINER], so = self[START_OFFSET], ec = self[END_CONTAINER], eo = self[END_OFFSET],
          rsc = r.startContainer, rso = r.startOffset, rec = r.endContainer, reo = r.endOffset;

        // Check START_TO_START
        if (h === 0) {
          return _compareBoundaryPoints(sc, so, rsc, rso);
        }

        // Check START_TO_END
        if (h === 1) {
          return _compareBoundaryPoints(ec, eo, rsc, rso);
        }

        // Check END_TO_END
        if (h === 2) {
          return _compareBoundaryPoints(ec, eo, rec, reo);
        }

        // Check END_TO_START
        if (h === 3) {
          return _compareBoundaryPoints(sc, so, rec, reo);
        }
      }

      function deleteContents() {
        _traverse(DELETE);
      }

      function extractContents() {
        return _traverse(EXTRACT);
      }

      function cloneContents() {
        return _traverse(CLONE);
      }

      function insertNode(n) {
        var startContainer = this[START_CONTAINER],
          startOffset = this[START_OFFSET], nn, o;

        // Node is TEXT_NODE or CDATA
        if ((startContainer.nodeType === 3 || startContainer.nodeType === 4) && startContainer.nodeValue) {
          if (!startOffset) {
            // At the start of text
            startContainer.parentNode.insertBefore(n, startContainer);
          } else if (startOffset >= startContainer.nodeValue.length) {
            // At the end of text
            dom.insertAfter(n, startContainer);
          } else {
            // Middle, need to split
            nn = startContainer.splitText(startOffset);
            startContainer.parentNode.insertBefore(n, nn);
          }
        } else {
          // Insert element node
          if (startContainer.childNodes.length > 0) {
            o = startContainer.childNodes[startOffset];
          }

          if (o) {
            startContainer.insertBefore(n, o);
          } else {
            if (startContainer.nodeType == 3) {
              dom.insertAfter(n, startContainer);
            } else {
              startContainer.appendChild(n);
            }
          }
        }
      }

      function surroundContents(n) {
        var f = self.extractContents();

        self.insertNode(n);
        n.appendChild(f);
        self.selectNode(n);
      }

      function cloneRange() {
        return extend(new Range(dom), {
          startContainer: self[START_CONTAINER],
          startOffset: self[START_OFFSET],
          endContainer: self[END_CONTAINER],
          endOffset: self[END_OFFSET],
          collapsed: self.collapsed,
          commonAncestorContainer: self.commonAncestorContainer
        });
      }

      // Private methods

      function _getSelectedNode(container, offset) {
        var child;

        // TEXT_NODE
        if (container.nodeType == 3) {
          return container;
        }

        if (offset < 0) {
          return container;
        }

        child = container.firstChild;
        while (child && offset > 0) {
          --offset;
          child = child.nextSibling;
        }

        if (child) {
          return child;
        }

        return container;
      }

      function _isCollapsed() {
        return (self[START_CONTAINER] == self[END_CONTAINER] && self[START_OFFSET] == self[END_OFFSET]);
      }

      function _compareBoundaryPoints(containerA, offsetA, containerB, offsetB) {
        var c, offsetC, n, cmnRoot, childA, childB;

        // In the first case the boundary-points have the same container. A is before B
        // if its offset is less than the offset of B, A is equal to B if its offset is
        // equal to the offset of B, and A is after B if its offset is greater than the
        // offset of B.
        if (containerA == containerB) {
          if (offsetA == offsetB) {
            return 0; // equal
          }

          if (offsetA < offsetB) {
            return -1; // before
          }

          return 1; // after
        }

        // In the second case a child node C of the container of A is an ancestor
        // container of B. In this case, A is before B if the offset of A is less than or
        // equal to the index of the child node C and A is after B otherwise.
        c = containerB;
        while (c && c.parentNode != containerA) {
          c = c.parentNode;
        }

        if (c) {
          offsetC = 0;
          n = containerA.firstChild;

          while (n != c && offsetC < offsetA) {
            offsetC++;
            n = n.nextSibling;
          }

          if (offsetA <= offsetC) {
            return -1; // before
          }

          return 1; // after
        }

        // In the third case a child node C of the container of B is an ancestor container
        // of A. In this case, A is before B if the index of the child node C is less than
        // the offset of B and A is after B otherwise.
        c = containerA;
        while (c && c.parentNode != containerB) {
          c = c.parentNode;
        }

        if (c) {
          offsetC = 0;
          n = containerB.firstChild;

          while (n != c && offsetC < offsetB) {
            offsetC++;
            n = n.nextSibling;
          }

          if (offsetC < offsetB) {
            return -1; // before
          }

          return 1; // after
        }

        // In the fourth case, none of three other cases hold: the containers of A and B
        // are siblings or descendants of sibling nodes. In this case, A is before B if
        // the container of A is before the container of B in a pre-order traversal of the
        // Ranges' context tree and A is after B otherwise.
        cmnRoot = dom.findCommonAncestor(containerA, containerB);
        childA = containerA;

        while (childA && childA.parentNode != cmnRoot) {
          childA = childA.parentNode;
        }

        if (!childA) {
          childA = cmnRoot;
        }

        childB = containerB;
        while (childB && childB.parentNode != cmnRoot) {
          childB = childB.parentNode;
        }

        if (!childB) {
          childB = cmnRoot;
        }

        if (childA == childB) {
          return 0; // equal
        }

        n = cmnRoot.firstChild;
        while (n) {
          if (n == childA) {
            return -1; // before
          }

          if (n == childB) {
            JP�!+�?�kdι� 0�1���Pp K�P0�j I !B)b� g<�s�  ?� J�`H@�)�]�?C"A� �:�9��:8A{H�Q�45�H�"$�P 9+C��@� ,C.�|�~�����u�6J��ϙ{�'sV�nK���2ڹn�����D&�ݕYd�Q¾���z�/k��j���~��n���7�lO�^���U����#�=�y~\��V���?�k�Z��J����n�z�����
�j��������}߷�����g�����;�o]N��|�Ʉ��ٿG��I���mnO����_۾��F�7��7-���u�u��궟�]�_�ozR��L�g�?�q�O����L?O~��s��y?��%��O�� DPFa��dD�wҠ@MB����Xa
����D!@�"�! �"`0i���� �$`L b@���@T �% ��� ���	)�4+Be��Aa�Ҡ
A�0� #�@X��(=@cb*@�� kpwx��5��3Xe=�|���ӝ�\ݫ~��d���������5j6������%_Νʋ�^�_����o�g������U�����62~M ������-��Vr�?����n�⟞��=��p�<�m��a2L��*x��4"$
����+ ����! q��-!���8�H0 "OA��d<� "�d±���� F�c
b8�C���
 @��)�4@�0�0*�`DPD�
 �:�e�� H��J�`���c�C&d5C �.
��E@9�PEZ5XR��E�X��#AM�l�HF\ #�pS�@!A�, a0   ��� ���=5?�>}fs�Q>g�5�A�H�~o�������گ{/��ܽޥ�V� ¹����l~iw<ns�3߂��W�c��+���;��א�m�`�M_���g�'j�g}�n��X��_�W�ۏ����_�Y~�\�N -�`1 ��(A�	ā@�5�
�ɑ�$
�ۃ���������#�凳�������_�z�X��4-N�}���G_�+����ؾ�n�������fsv���n���έ.�n�}��Q{��v�~���y_���#X�����
��P38 "�a�l"�P@�ca��8���p�6��c���3���%,�� 6l!��q3n��W�O�ˌ�W����{���.7��߽�����?�q�]X��/����;�K_��U��d�W̶�E�tS#�_��|W��}���~��f���?��k�����;����/��ȟ����^��wzkטH�����j�^VG�~�-����k�6��6��3��]o����;l^�6�s׾���v���z�;ֺ�-��z���|�Y�zY�:��^2����G��ʹۭ�}����v�Ώ��O�����G�����f�o�g6���bL� �A1���l�a@�IbR$�� ;�"D%G��КR$&X��Y�!2d�f  eG!�A0-�(<�X0 
�\` �`��ƬRD��ı�e`� @�`�O ���Q� yƞv��ty�{�w�5��1�	�?g����"�6�/(�QVo�����V�޾�?�z�7�۵-��洟������78������m{�<(�=��o>�o�
T
��Č��
��s6P�\�CS �AЈk�O7#�ݳ���:�y�yolj��u�KĿ+wt{�_�N#�MoJ۾�{��QK����H��sO�u�\ǫ�rY;�~5,Sk?��|�+e����]��������_[Ҝ�G�z	�c�[Uy�M�^7)~����m�*���\G>+ؓ��sP�8�t�s��������e_z�M4�"�u�؟l���ݾ�@�;���S���WS�6�O>̣,��k�������w�M� l���?�d���������7�����}����9Է�S{���Q@�
!�/о1 ��#SZ	�,�ٜ/�AC���tT� � "��1�ZH�`���dA�@�Q�`E)�d��HITB��F���RL!��& ����%� j�	��a� �6��_M(n���F��v�t����\:��{y�9��;���kݮ����y�AK-���'���<����6~5ݽfO׽wz����u=��r�/�����W_ûqh?k����X�������?��n�x���Z�]��2	d
L�xk;�#A�E0��&"Dh�HIO\,P��P�Q �Y�#
#m@B��0@�ЀB�1R
iF�- ��@���h  45=AA)�2�IK0�	���T!����)G� �P*�J`��
HP�!�h�*���`�@l`E@T0 hA %(H�*�``a0*��p!�
�-k��+�z���*70��%R  return;
          }

          if (sub.length > 0) {
            frag.appendChild(doc.createTextNode(sub));
          }

          return frag;
        }

        // Copy nodes between the start/end offsets.
        n = _getSelectedNode(self[START_CONTAINER], self[START_OFFSET]);
        cnt = self[END_OFFSET] - self[START_OFFSET];

        while (n && cnt > 0) {
          sibling = n.nextSibling;
          xferNode = _traverseFullySelected(n, how);

          if (frag) {
            frag.appendChild(xferNode);
          }

          --cnt;
          n = sibling;
        }

        // Nothing is partially selected, so collapse to start point
        if (how != CLONE) {
          self.collapse(TRUE);
        }

        return frag;
      }

      function _traverseCommonStartContainer(endAncestor, how) {
        var frag, n, endIdx, cnt, sibling, xferNode;

        if (how != DELETE) {
          frag = createDocumentFragment();
        }

        n = _traverseRightBoundary(endAncestor, how);

        if (frag) {
          frag.appendChild(n);
        }

        endIdx = nodeIndex(endAncestor);
        cnt = endIdx - self[START_OFFSET];

        if (cnt <= 0) {
          // Collapse to just before the endAncestor, which
          // is partially selected.
          if (how != CLONE) {
            self.setEndBefore(endAncestor);
            self.collapse(FALSE);
          }

          return frag;
        }

        n = endAncestor.previousSibling;
        while (cnt > 0) {
          sibling = n.previousSibling;
          xferNode = _traverseFullySelected(n, how);

          if (frag) {
            frag.insertBefore(xferNode, frag.firstChild);
          }

          --cnt;
          n = sibling;
        }

        // Collapse to just before the endAncestor, which
        // is partially selected.
        if (how != CLONE) {
          self.setEndBefore(endAncestor);
          self.collapse(FALSE);
        }

        return frag;
      }

      function _traverseCommonEndContainer(startAncestor, how) {
        var frag, startIdx, n, cnt, sibling, xferNode;

        if (how != DELETE) {
          frag = createDocumentFragment();
        }

        n = _traverseLeftBoundary(startAncestor, how);
        if (frag) {
          frag.appendChild(n);
        }

        startIdx = nodeIndex(startAncestor);
        ++startIdx; // Because we already traversed it

        cnt = self[END_OFFSET] - startIdx;
        n = startAncestor.nextSibling;
        while (n && cnt > 0) {
          sibling = n.nextSibling;
          xferNode = _traverseFullySelected(n, how);

          if (frag) {
            frag.appendChild(xferNode);
          }

          --cnt;
          n = sibling;
        }

        if (how != CLONE) {
          self.setStartAfter(startAncestor);
          self.collapse(TRUE);
        }

        return frag;
      }

      function _traverseCommonAncestors(startAncestor, endAncestor, how) {
        var n, frag, startOffset, endOffset, cnt, sibling, nextSibling;

        if (how != DELETE) {
          frag = createDocumentFragment();
        }

        n = _traverseLeftBoundary(startAncestor, how);
        if (frag) {
          frag.appendChild(n);
        }

        startOffset = nodeIndex(startAncestor);
        endOffset = nodeIndex(endAncestor);
        ++startOffset;

        cnt = endOffset - startOffset;
        sibling = startAncestor.nextSibling;

        while (cnt > 0) {
          nextSibling = sibling.nextSibling;
          n = _traverseFullySelected(sibling, how);

          if (frag) {
            frag.appendChild(n);
          }

          sibling = nextSibling;
          --cnt;
        }

        n = _traverseRightBoundary(endAncestor, how);

        if (frag) {
          frag.appendChild(n);
        }

        if (how != CLONE) {
          self.setStartAfter(startAncestor);
          self.collapse(TRUE);
        }

        return frag;
      }

      function _traverseRightBoundary(root, how) {
        var next = _getSelectedNode(self[END_CONTAINER], self[END_OFFSET] - 1), parent, clonedParent;
        var prevSibling, clonedChild, clonedGrandParent, isFullySelected = next != self[END_CONTAINER];

        if (next == root) {
          return _traverseNode(next, isFullySelected, FALSE, how);
        }

        parent = next.parentNode;
        clonedParent = _traverseNode(parent, FALSE, FALSE, how);

        while (parent) {
          while (next) {
            prevSibling = next.previousSibling;
            clonedChild = _traverseNode(next, isFullySelected, FALSE, how);

            if (how != DELETE) {
              clonedParent.insertBefore(clonedChild, clonedParent.firstChild);
            }

            isFullySelected = TRUE;
            next = prevSibling;
          }

          if (parent == root) {
            return clonedParent;
          }

          next = parent.previousSibling;
          parent = parent.parentNode;

          clonedGrandParent = _traverseNode(parent, FALSE, FALSE, how);

          if (how != DELETE) {
            clonedGrandParent.appendChild(clonedParent);
          }

          clonedParent = clonedGrandParent;
        }
      }

      function _traverseLeftBoundary(root, how) {
        var next = _getSelectedNode(self[START_CONTAINER], self[START_OFFSET]), isFullySelected = next != self[START_CONTAINER];
        var parent, clonedParent, nextSibling, clonedChild, clonedGrandParent;

        if (next == root) {
          return _traverseNode(next, isFullySelected, TRUE, how);
        }

        parent = next.parentNode;
        clonedParent = _traverseNode(parent, FALSE, TRUE, how);

        while (parent) {
          while (next) {
            nextSibling = next.nextSibling;
            clonedChild = _traverseNode(next, isFullySelected, TRUE, how);

            if (how != DELETE) {
              clonedParent.appendChild(clonedChild);
            }

            isFullySelected = TRUE;
            next = nextSibling;
          }

          if (parent == root) {
            return clonedParent;
          }

          next = parent.nextSibling;
          parent = parent.parentNode;

          clonedGrandParent = _traverseNode(parent, FALSE, TRUE, how);

          if (how != DELETE) {
            clonedGrandParent.appendChild(clonedParent);
          }

          clonedParent = clonedGrandParent;
        }
      }

      function _traverseNode(n, isFullySelected, isLeft, how) {
        var txtValue, newNodeValue, oldNodeValue, offset, newNode;

        if (isFullySelected) {
          return _traverseFullySelected(n, how);
        }

        // TEXT_NODE
        if (n.nodeType == 3) {
          txtValue = n.nodeValue;

          if (isLeft) {
            offset = self[START_OFFSET];
            newNodeValue = txtValue.substring(offset);
            oldNodeValue = txtValue.substring(0, offset);
          } else {
            offset = self[END_OFFSET];
            newNodeValue = txtValue.substring(0, offset);
            oldNodeValue = txtValue.substring(offset);
          }

          if (how != CLONE) {
            n.nodeValue = oldNodeValue;
          }

          if (how == DELETE) {
            return;
          }

          newNode = dom.clone(n, FALSE);
          newNode.nodeValue = newNodeValue;

          return newNode;
        }

        if (how == DELETE) {
          return;
        }

        return dom.clone(n, FALSE);
      }

      function _traverseFullySelected(n, how) {
        if (how != DELETE) {
          return how == CLONE ? dom.clone(n, TRUE) : n;
        }

        n.parentNode.removeChild(n);
      }

      function toStringIE() {
        return dom.create('body', null, cloneContents()).outerText;
      }

      extend(self, {
        // Initial states
        startContainer: doc,
        startOffset: 0,
        endContainer: doc,
        endOffset: 0,
        collapsed: TRUE,
        commonAncestorContainer: doc,

        // Range constants
        START_TO_START: 0,
        START_TO_END: 1,
        END_TO_END: 2,
        END_TO_START: 3,

        // Public methods
        setStart: setStart,
        setEnd: setEnd,
        setStartBefore: setStartBefore,
        setStartAfter: setStartAfter,
        setEndBefore: setEndBefore,
        setEndAfter: setEndAfter,
        collapse: collapse,
        selectNode: selectNode,
        selectNodeContents: selectNodeContents,
        compareBoundaryPoints: compareBoundaryPoints,
        deleteContents: deleteContents,
        extractContents: extractContents,
        cloneContents: cloneContents,
        insertNode: insertNode,
        surroundContents: surroundContents,
        cloneRange: cloneRange,
        toStringIE: toStringIE
      });

      return self;
    }

    // Older IE versions doesn't let you override toString by it's constructor so we have to stick it in the prototype
    Range.prototype.toString = function () {
      return this.toStringIE();
    };

    return Range;
  }
);

defineGlobal("global!Array", Array);
defineGlobal("global!Error", Error);
define(
  'ephox.katamari.api.Fun',

  [
    'global!Array',
    'global!Error'
  ],

  function (Array, Error) {

    var noop = function () { };

    var compose = function (fa, fb) {
      return function () {
        return fa(fb.apply(null, arguments));
      };
    };

    var constant = function (value) {
      return function () {
        return value;
      };
    };

    var identity = function (x) {
      return x;
    };

    var tripleEquals = function(a, b) {
      return a === b;
    };

    // Don't use array slice(arguments), makes the whole function unoptimisable on Chrome
    var curry = function (f) {
      // equivalent to arguments.slice(1)
      // starting at 1 because 0 is the f, makes things tricky.
      // Pay attention to what variable is where, and the -1 magic.
      // thankfully, we have tests for this.
      var args = new Array(arguments.length - 1);
      for (var i = 1; i < arguments.length; i++) args[i-1] = arguments[i];

      return function () {
        var newArgs = new Array(arguments.length);
        for (var j = 0; j < newArgs.length; j++) newArgs[j] = arguments[j];

        var all = args.concat(newArgs);
        return f.apply(null, all);
      };
    };

    var not = function (f) {
      return function () {
        return !f.apply(null, arguments);
      };
    };

    var die = function (msg) {
      return function () {
        throw new Error(msg);
      };
    };

    var apply = function (f) {
      return f();
    };

    var call = function(f) {
      f();
    };

    var never = constant(false);
    var always = constant(true);
    

    return {
      noop: noop,
      compose: compose,
      constant: constant,
      identity: identity,
      tripleEquals: tripleEquals,
      curry: curry,
      not: not,
      die: die,
      apply: apply,
      call: call,
      never: never,
      always: always
    };
  }
);

defineGlobal("global!Object", Object);
define(
  'ephox.katamari.api.Option',

  [
    'ephox.katamari.api.Fun',
    'global!Object'
  ],

  function (Fun, Object) {

    var never = Fun.never;
    var always = Fun.always;

    /**
      Option objects support the following methods:

      fold :: this Option a -> ((() -> b, a -> b)) -> Option b

      is :: this Option a -> a -> Boolean

      isSome :: this Option a -> () -> Boolean

      isNone :: this Option a -> () -> Boolean

      getOr :: this Option a -> a -> a

      getOrThunk :: this Option a -> (() -> a) -> a

      getOrDie :: this Option a -> String -> a

      or :: this Option a -> Option a -> Option a
        - if some: return self
        - if none: return opt

      orThunk :: this Option a -> (() -> Option a) -> Option a
        - Same as "or", but uses a thunk instead of a value

      map :: this Option a -> (a -> b) -> Option b
        - "fmap" operation on the Option Functor.
        - same as 'each'

      ap :: this Option a -> Option (a -> b) -> Option b
        - "apply" operation on the Option Apply/Applicative.
        - Equivalent to <*> in Haskell/PureScript.

      each :: this Option a -> (a -> b) -> Option b
        - same as 'map'

      bind :: this Option a -> (a -> Option b) -> Option b
        - "bind"/"flatMap" operation on the Option Bind/Monad.
        - Equivalent to >>= in Haskell/PureScript; flatMap in Scala.

      flatten :: {this Option (Option a))} -> () -> Option a
        - "flatten"/"join" operation on the Option Monad.

      exists :: this Option a -> (a -> Boolean) -> Boolean

      forall :: this Option a -> (a -> Boolean) -> Boolean

      filter :: this Option a -> (a -> Boolean) -> Option a

      equals :: this Option a -> Option a -> Boolean

      equals_ :: this Option a -> (Option a, a -> Boolean) -> Boolean

      toArray :: this Option a -> () -> [a]

    */

    var none = function () { return NONE; };

    var NONE = (function () {
      var eq = function (o) {
        return o.isNone();
      };

      // inlined from peanut, maybe a micro-optimisation?
      var call = function (thunk) { return thunk(); };
      var id = function (n) { return n; };
      var noop = function () { };

      var me = {
        fold: function (n, s) { return n(); },
        is: never,
        isSome: never,
        isNone: always,
        getOr: id,
        getOrThunk: call,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        or: id,
        orThunk: call,
        map: none,
        ap: none,
        each: noop,
        bind: none,
        flatten: none,
        exists: never,
        forall: always,
        filter: none,
        equals: eq,
        equals_: eq,
        toArray: function () { return []; },
        toString: Fun.constant("none()")
      };
      if (Object.freeze) Object.freeze(me);
      return me;
    })();


    /** some :: a -> Option a */
    var some = function (a) {

      // inlined from peanut, maybe a micro-optimisation?
      var constant_a = function () { return a; };

      var self = function () {
        // can't Fun.constant this one
        return me;
      };

      var map = function (f) {
        return some(f(a));
      };

      var bind = function (f) {
        return f(a);
      };

      var me = {
        fold: function (n, s) { return s(a); },
        is: function (v) { return a === v; },
        isSome: always,
        isNone: never,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        or: self,
        orThunk: self,
        map: map,
        ap: function (optfab) {
          return optfab.fold(none, function(fab) {
            return some(fab(a));
          });
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        flatten: constant_a,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE;
        },
        equals: function (o) {
          return o.is(a);
        },
        equals_: function (o, elementEq) {
          return o.fold(
            never,
            function (b) { return elementEq(a, b); }
          );
        },
        toArray: function () {
          return [a];
        },
        toString: function () {
          return 'some(' + a + ')';
        }
      };
      return me;
    };

    /** from :: undefined|null|a -> Option a */
    var from = function (value) {
      return value === null || value === undefined ? NONE : some(value);
    };

    return {
      some: some,
      none: none,
      from: from
    };
  }
);

defineGlobal("global!String", String);
define(
  'ephox.katamari.api.Arr',

  [
    'ephox.katamari.api.Option',
    'global!Array',
    'global!Error',
    'global!String'
  ],

  function (Option, Array, Error, String) {
    // Use the native Array.indexOf if it is available (IE9+) otherwise fall back to manual iteration
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
    var rawIndexOf = (function () {
      var pIndexOf = Array.prototype.indexOf;

      var fastIndex = function (xs, x) { return  pIndexOf.call(xs, x); };

      var slowIndex = function(xs, x) { return slowIndexOf(xs, x); };

      return pIndexOf === undefined ? slowIndex : fastIndex;
    })();

    var indexOf = function (�II�:�� �'N�*����B��� 6�}�5r�-x�
�A
!#�&��@\��@�� Z�A<=	G/%�(ZP!�0dҨ�z@ #JAR���CN 	*	duJ+!A[
�hc��8�`X ! >5�8�_Bc�j�F"B � T�	�!���@$	K����@���"���
��(Q� '�АA� ���
6�MO��P 
>�	RP"�0ĀC�@$�9��H@$��@Z�!D&Πk��!�`@;�J� 
�#RgI����Q|2�d�X)�����/sp�vऑJ2I=� @b�����*`  v�`A ����x�h)
r7"��2r
Q��撸a�RY �D@	Ʌ�� ��X���	r�SO�y��4�'��	��3GŁ"�� ^'�GAA�A �
C d)A�`T@16� 1A>����N4�iBЄ!�1��H:�h�(
 � VS"���fT3��/����8��QPX����0d#@�&QL���H(�� 2&	�i�I�J�B � -�|
`� � ,@"��LT�R'X��� ȷaJBp����� �H��� ED1��
Bd (B@l]Y�]�`ZH2E�c,5@�� �������m �L��N
�	
$Dݢ@�H���$�@�PТPvĀ�F�9(�� ɱTH��@*�*�^π0 1   H9 �!FJ
�i���sX Њ�5B�B"8�@d$2 �H`
؊@ �:�L@�
iG��R�
�P#͠�Gm�cD����Ap
@�!Q��
�	H��#aW���!<�) ���
ة/s ��!�1���82� )	��` m�Xc#�D<�K�X��P�(

T	j�An�h�q
 ��$�@f"䪊��h���&%&8����s6�qU��k@gE4�S�.�&P��p3 �W�-��aB��)!pM>D�PP:�#H
о$��(Ȁ! T!P�Ť)��V�:2��e( ����LQ�dD8�	���* �@�B��0�!7 )f}��0�5s���T� rڥE@�GL����rc�����$�(�G�y��/����D#�
bCT ����\
҆ bH(� �(L0FK�3E�!��)X��")8�A 8T�
��/D�� ��A�RR��h4�`��ppCE*:Q8� ��a Cj ��l yVG ��Z�8	05��� �"Σ�H$`<� ��`8���B @��@���U�Q\BE��PQ@��d "���H*�����  T��-�+	U	LM���ja
����@N��(�`r���SKrt+���H�Ԅ  \�p�fE�5 �ʋ��@UҸ�RK% ��"��uD�" b�4�� ��0` �
�+  ��rM�\ D �π%�H�N�
���B���jet� 	�	�Z0�� �-	�� IXGq�if
��G-�<��\����04!�S(HB3�c�f�
@Q1B8�nRC� C��R� �#0�H��B!0%� .� & @U !�j0� pp�D>�A ��"x2�q�H{vi�AH�HC�@O��R��
�&�$�4w�	+0A� � +U4bS,�g��&��t!���h�t �QA�����8
&��p����X!D1J����r��E)���� a� �fQQʲ �� Q��i��Q���I�@@!��
L�%Zx!�a Ԑ
��U���P�q		F%��Z  T
40�`A�6���� x@3�4,H�0��8�p B�x (� �S\!S  I@PD(2"F�� 
@t/l*,@��)��I�A�B�Q�!�-��
 �P B��rВض���/�
��lO�r�Hi�9 � A
nB @@�$ �Q�SC#�	p A1 ъ��T�!�����(��YD�k� �N�&ͱQ�FȪ�47x�^��Fh�a��B��3�a&P@%
�@ak�b��'\a�T��� ]C   P�^� �  
A#E��V�NA��'S��!� r2��Ao��E *�d�Ed�0��Օ� "� 
�0�$�v؀PIQO��)b(xw4 Hb  ��n���:���8P��� A�
�

R��P�2�/` ��4na���4�!pE 0ER �Q&�� 90� blP 1(H�@

`  0red(x, i, xs)) {
          return Option.some(x);
        }
      }
      return Option.none();
    };

    var findIndex = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i, xs)) {
          return Option.some(i);
        }
      }

      return Option.none();
    };

    var slowIndexOf = function (xs, x) {
      for (var i = 0, len = xs.length; i < len; ++i) {
        if (xs[i] === x) {
          return i;
        }
      }

      return -1;
    };

    var push = Array.prototype.push;
    var flatten = function (xs) {
      // Note, this is possible because push supports multiple arguments:
      // http://jsperf.com/concat-push/6
      // Note that in the past, concat() would silently work (very slowly) for array-like objects.
      // With this change it will throw an error.
      var r = [];
      for (var i = 0, len = xs.length; i < len; ++i) {
        // Ensure that each value is an array itself
        if (! Array.prototype.isPrototypeOf(xs[i])) throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
        push.apply(r, xs[i]);
      }
      return r;
    };

    var bind = function (xs, f) {
      var output = map(xs, f);
      return flatten(output);
    };

    var forall = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; ++i) {
        var x = xs[i];
        if (pred(x, i, xs) !== true) {
          return false;
        }
      }
      return true;
    };

    var equal = function (a1, a2) {
      return a1.length === a2.length && forall(a1, function (x, i) {
        return x === a2[i];
      });
    };

    var slice = Array.prototype.slice;
    var reverse = function (xs) {
      var r = slice.call(xs, 0);
      r.reverse();
      return r;
    };

    var difference = function (a1, a2) {
      return filter(a1, function (x) {
        return !contains(a2, x);
      });
    };

    var mapToObject = function(xs, f) {
      var r = {};
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        r[String(x)] = f(x, i);
      }
      return r;
    };

    var pure = function(x) {
      return [x];
    };

    var sort = function (xs, comparator) {
      var copy = slice.call(xs, 0);
      copy.sort(comparator);
      return copy;
    };

    return {
      map: map,
      each: each,
      eachr: eachr,
      partition: partition,
      filter: filter,
      groupBy: groupBy,
      indexOf: indexOf,
      foldr: foldr,
      foldl: foldl,
      find: find,
      findIndex: findIndex,
      flatten: flatten,
      bind: bind,
      forall: forall,
      exists: exists,
      contains: contains,
      equal: equal,
      reverse: reverse,
      chunk: chunk,
      difference: difference,
      mapToObject: mapToObject,
      pure: pure,
      sort: sort,
      range: range
    };
  }
);
defineGlobal("global!setTimeout", setTimeout);
define(
  'ephox.katamari.api.LazyValue',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Option',
    'global!setTimeout'
  ],

  function (Arr, Option, setTimeout) {
    var nu = function (baseFn) {
      var data = Option.none();
      var callbacks = [];

      /** map :: this LazyValue a -> (a -> b) -> LazyValue b */
      var map = function (f) {
        return nu(function (nCallback) {
          get(function (data) {
            nCallback(f(data));
          });
        });
      };

      var get = function (nCallback) {
        if (isReady()) call(nCallback);
        else callbacks.push(nCallback);
      };

      var set = function (x) {
        data = Option.some(x);
        run(callbacks);
        callbacks = [];
      };

      var isReady = function () {
        return data.isSome();
      };

      var run = function (cbs) {
        Arr.each(cbs, call);
      };

      var call = function(cb) {
        data.each(function(x) {
          setTimeout(function() {
            cb(x);
          }, 0);
        });
      };

      // Lazy values cache the value and kick off immediately
      baseFn(set);

      return {
        get: get,
        map: map,
        isReady: isReady
      };
    };

    var pure = function (a) {
      return nu(function (callback) {
        callback(a);
      });
    };

    return {
      nu: nu,
      pure: pure
    };
  }
);
define(
  'ephox.katamari.async.Bounce',

  [
    'global!Array',
    'global!setTimeout'
  ],

  function (Array, setTimeout) {

    var bounce = function(f) {
      return function() {
        var args = Array.prototype.slice.call(arguments);
        var me = this;
        setTimeout(function() {
          f.apply(me, args);
        }, 0);
      };
    };

    return {
      bounce: bounce
    };
  }
);

define(
  'ephox.katamari.api.Future',

  [
    'ephox.katamari.api.LazyValue',
    'ephox.katamari.async.Bounce'
  ],

  /** A future value that is evaluated on demand. The base function is re-evaluated each time 'get' is called. */
  function (LazyValue, Bounce) {
    var nu = function (baseFn) {
      var get = function(callback) {
        baseFn(Bounce.bounce(callback));
      };

      /** map :: this Future a -> (a -> b) -> Future b */
      var map = function (fab) {
        return nu(function (callback) {
          get(function (a) {
            var value = fab(a);
            callback(value);
          });
        });
      };

      /** bind :: this Future a -> (a -> Future b) -> Future b */
      var bind = function (aFutureB) {
        return nu(function (callback) {
          get(function (a) {
            aFutureB(a).get(callback);
          });
        });
      };

      /** anonBind :: this Future a -> Future b -> Future b
       *  Returns a future, which evaluates the first future, ignores the result, then evaluates the second.
       */
      var anonBind = function (futureB) {
        return nu(function (callback) {
          get(function (a) {
            futureB.get(callback);
          });
        });
      };

      var toLazy = function () {
        return LazyValue.nu(get);
      };

      return {
        map: map,
        bind: bind,
        anonBind: anonBind,
        toLazy: toLazy,
        get: get
      };

    };

    /** a -> Future a */
    var pure = function (a) {
      return nu(function (callback) {
        callback(a);
      });
    };

    return {
      nu: nu,
      pure: pure
    };
  }
);

define(
  'ephox.katamari.async.AsyncValues',

  [
    'ephox.katamari.api.Arr'
  ],

  function (Arr) {
    /* 
     * NOTE: an `asyncValue` must have a `get` function which gets given a callback and calls 
     * that callback with a value once it is ready
     *
     * e.g 
     * {
     *   get: function (callback) { callback(10); }
     * }
     */
    var par = function (asyncValues, nu) {
      return nu(function(callback) {
        var r = [];
        var count = 0;

        var cb = function(i) {
          return function(value) {
            r[i] = value;
            count++;
            if (count >= asyncValues.length) {
              callback(r);
            }
          };
        };

        if (asyncValues.length === 0) {
          callback([]);
        } else {
          Arr.each(asyncValues, function(asyncValue, i) {
            asyncValue.get(cb(i));
          });
        }
      });
    };

    return {
      par: par
    };
  }
);
define(
  'ephox.katamari.api.Futures',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Future',
    'ephox.katamari.async.AsyncValues'
  ],

  function (Arr, Future, AsyncValues) {
    /** par :: [Future a] -> Future [a] */
    var par = function(futures) {
      return AsyncValues.par(futures, Future.nu);
    };

    /** mapM :: [a] -> (a -> Future b) -> Future [b] */
    var mapM = function(array, fn) {
      var futures = Arr.map(array, fn);
      return par(futures);
    };

    /** Kleisli composition of two functions: a -> Future b.
     *  Note the order of arguments: g is invoked first, then the result passed to f.
     *  This is in line with f . g = \x -> f (g a)
     *
     *  compose :: ((b -> Future c), (a -> Future b)) -> a -> Future c
     */
    var compose = function (f, g) {
     ۟��M��W����+��_���g�n�ܝ���m��/��v�So��ߖ����K�#�5����i������w�u��Q�?��n���}���<mg���;9���gk�q����g��~�?w�:�~���x��ۿs�W���܃�u������|����3��A�����A|�����қ��ֽ#l���_�z5�ީ�]����,O*غh�jǊq�/����qgտ���tk�#��uaԶ��տ�����i�=�����L����v�Ê7������v�\@��� �ܠ����҅����������/c⹆�oʢg��#���t�w���72+.i����_��o�/��|c+��~��{���u����}����}�IQ���~�_��kCG����]I7��������s�/�|߼��0N���������U�?������[���Ҿ�w���~�_3�s{�~��?�{?�8F����睟���Y[���_s��^�_��?���ud/c\W��o��t�������������/医������������ԧ��#�������f/�獞<�D7�ϟ������g}�?�O�W�?��ۯ��z�R�Ey_uǵllo���]��ס��ۭ� �����{��]��wr��������[���/]w=�/�8���w�����bo:~>������o���ݛOd����uN���w��~�mh�����ye����z�s'��FϏ�����ҿ�cW�������w����7|.�~�&l*�����/B���w��nw����+��m�������ҷ��?{���������}��_�����[��<��z�.ӦѠ���i���{<7%�E�|��m��o�{�O�̿R��߿��_r��:m��������=��~}?ϸ?������ů�~]���n�/�]~���k=����j6>^��h��<65���C��w��d���=~��V7��'�A��{���~�睟�{��I�����g3�w�oV�|�_y�������.�J~O��~>_Z�Ώ�J���_o�j�}���N�{����L���|���齿(��-滶�ݽ��.��
_��q�2?X����f�~�����>������^S����w��������i����z˧���������~w�w������$7���)�^�{o�ϖ��������/���o��n��{z�=	~/��G]?�N��KX���G�^���߳�7����ܿ��>���y�t��~и�@]�=ދ��w������o��Wt������H럷�?��v�K����luOCu����筵�,�ՖX�ҽc�����ݴ���^~>���<?~z}K���v}w���o�:�o��w��������b��R�I������w����?�����^l.m}v��=���ţ�J�fa&��ߏ�\��޹��yy��W��v-�����Ue�>=���W���f����\y���u���߽�=�������������Q��������go���̍���{ӹ���_����˔�wWv;�~�u|�����n�����>L���oz����nڻ�t^�C�z��f��I�o�vg��;����nzZ��s��c��x��_��~����О��[�;����~�q��e~�����[:o��[Ϳ��{�|��՟u��{_��d���bU����W?�:ۙ6�܋�|����է���/;�f�����Z����~_;�.���=�~z���w�w���ߚ��������߽[��S��{�������Ow�rR�L[c]}�'�~�3u�0�W瘏�u�[�������E��ϟ��������������2��c�@�����}]s���~W?�7���<���r�~i=�~����_��{��_���rԞ���߯����v�}��������*��=�ѿg�����^ٽ�O_�q��ߛ��}u�h�Ѫo����;��r��	/����)'��g�n���j}������{���>�D�i��������o������z�e��n��u_���Vt��>�����^ʆ޲�o����߿��)�����o���ԾU���gL���h�ѿ�����K�>�'��_���v��H����`�咇ޟ;��s�G_���W��{��v���/�^	�?�s�����%����/��U��|#��Z��h}ܶ������l��r=�O�����k���{.�7����~W5^����;�֯����n_���Wߧz��{߷������3�����ގ��ywg��k���㳽���������x%���K�>�K����K�������q��޷k����������d��v��{��w�w�t��=ힾ6�w�8��=����o����{��}���>݄w;���[�3޿/e�������-sK�W���7���
�L���
A�`b��I` G��ȵ��Xf(� u�ka$P��І� #����3���"{G�Tu��<���`��1�
P�>��D�r�� �����B�A,Nx^��k;��6n�g���{����.�Z�����V?��߿w��N��?3������s?��3<���5��ݺ?_�?S~˛}����}Ϭ�~�Y;��y#LZ�n�m�Ϊ�^�~�̪߶����׫9����M�?�����U�F��ه�������-[�����Ν��խ���G��_Wu��������<�9��Z���l{kg���~B���>��?���Ea8�U-ڙ�]���`S�|����ٙg������?E�W�_�w��?�@�@�
�T{��KA6�.�	��N !�X�
�$� ĝ������
�
tG�{� DD.)�b`0�OE��Y�m(^�4
� $$K��,�:�4��4T��@૰�%@
;p�P�`�` ��(5�nc���8��
d(
�! @Y��J"��� E5 BA�w�V+�H��}/����~�vo���
D �XG� A!����k`�Р�B��U 	�A<C�`4�
���Oz�������]������������~���.�����\�e���{��N���t?�g�1����{��s��O������G�nZ�*5o�$x��0��q����y��ӄnU{9�|���v��M�7��l?��I�w�n�k���;��f9�����?����]~�;��ɾ�yn���?�����_���>��^���x��u���~翘�����Ouߎ��4���gH�>Ҍ�~���7�����#�3���}�?%��ի������	_+� ;' ���"���O��+A�f"H!�M�͍� A fP�R@�MT!�&:�r)) A���G�,��Sp�B�t  <�F0)P��Z�����H@).Y��UV4	�������o�=���?g]��������|u���;3�!����~����e/���\o���:��?��{�g���\�e�i����9��{�Q���z�3���6?��_�������v&Wv�|=���u���X LFhV��ZF$�@9���OF�Q@F���Op{ �� �pJl 9X�:�K��0^���!w��F��dTi,G�I0"@�!��*!(�a'�bJ� ���O�	`3A��8l2�C�2�n�"@HC$��&��uP1	�0���S��<B2�d@p�5��@4B1܌��`',8!0DɎ�8�ډ #!NA� CG�FUBE\b   �5#� FU� �;�`��1`A ��-a�<7b�����������~~����{_�u�[��o����o^�����}�{��E��{��O��u�]�=�rd�?���z������w_[�������������v{�w�W�6��_֞mݛ�^����Z���������
X$�Ld��P�!
�pRzF.�tXdB%A&`)���*[��Q�$(ꂫXx���9s���epj�?tVW��V'`m4ᨡ�@_@ƚ�[� 0h#I6
^��:�.��ߧ�?�E�{?��~���y{���������{�������₸�y�}���>���:�]����}{��4y�o71��w���~����������������7��ko~)�M������n_������o�SO��?ͬ��ϧZ����g�ʺ�{��������?7�ǜ�I��̭����*���
00+�Ȱ�V��z -�@�Z�(��	 լ�: RnX��@��J@%���	�c �±� ��d�X`hP��Tf 3�6
E4 ��`+�"�����H����C����}�Y~S��ߟ����.�����~I��&���\��6�����>gv�������/��������b�����U�������w��s�޷�v���nk��q����/�R�������g�㙵����ov���\���)r��4C�0;E�P�*�A4�b �a�jWp����wF!-��Q3҂9Hx�D8@4`C
���y.�q�������?��W�O�vMq���]���<���{��z=ž����}�ǶI����p:�3�>���Y���V>�?/���}�h:^�?�x�q�������)|�)l�4�\�ߘ��sɤ��o����Ϯ��.�?��f�<AV�`)	� &���
�4d
[�  A �1TA,�t !Bnm`l��i&
��x$4($�I0�W��Q`
,�*u�!����!P�Ȃ�A@F%�A���2�Xs�Q�D�,P��@kb ѕb�������w6�������x�_�KwUל2�MnMڛ��w����?���}2�{x��O[�m����g�>�α����o�k��N�~�tϹ�[��~<�RW�?s��-�s�����������g~L}~��ֽ� 9�Ϝ1>�o�W�;�:�����/��-+�׳i��[n��嶕���u��_M�|�O��]�+���^��{����?�|y]C퇻�Jw�v��?�?��e����Y��~�Oh�W�/�+O���<����u������{  � �h��t�!Eѹ��he ad�
#�V ��E)��xpbibSF$D6@�9p]xs�p3d1@	ly�2�IP���S�1Ux�p� Y�(2W� 0
�`��$���ħSL��?����ܗ����x�ʺ����x�O	��~��c_����K���Ͽt����ˍ}2�;��n7����_����~F�.�A�|��,���:����ͅ{���w칎���`��Y���M��������x"! ���D�d?X"V�c*	�h 
�����pl����dR$����-�pX�	��]@0a!���C�f%��m )�C5J���$�Na`�4�p��R�� c�(Y hپ�|^1�Mt
        link.defer = false;
        startTime = new Date().getTime();

        // Feature detect onload on link element and sniff older webkits since it has an broken onload event
        if ("onload" in link && !isOldWebKit()) {
          link.onload = waitForWebKitLinkLoaded;
          link.onerror = failed;
        } else {
          // Sniff for old Firefox that doesn't support the onload event on link elements
          // TODO: Remove this in the future when everyone uses modern browsers
          if (navigator.userAgent.indexOf("Firefox") > 0) {
            style = document.createElement('style');
            style.textContent = '@import "' + url + '"';
            waitForGeckoLinkLoaded();
            appendToHead(style);
            return;
          }

          // Use the id owner on older webkits
          waitForWebKitLinkLoaded();
        }

        appendToHead(link);
        link.href = url;
      }

      var loadF = function (url) {
        return Future.nu(function (resolve) {
          load(
            url,
            Fun.compose(resolve, Fun.constant(Result.value(url))),
            Fun.compose(resolve, Fun.constant(Result.error(url)))
          );
        });
      };

      var unbox = function (result) {
        return result.fold(Fun.identity, Fun.identity);
      };

      var loadAll = function (urls, success, failure) {
        Futures.par(Arr.map(urls, loadF)).get(function (result) {
          var parts = Arr.partition(result, function (r) {
            return r.isValue();
          });

          if (parts.fail.length > 0) {
            failure(parts.fail.map(unbox));
          } else {
            success(parts.pass.map(unbox));
          }
        });
      };

      return {
        load: load,
        loadAll: loadAll
      };
    };
  }
);

/**
 * Schema.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * Schema validator class.
 *
 * @class tinymce.html.Schema
 * @example
 *  if (tinymce.activeEditor.schema.isValidChild('p', 'span'))
 *    alert('span is valid child of p.');
 *
 *  if (tinymce.activeEditor.schema.getElementRule('p'))
 *    alert('P is a valid element.');
 *
 * @class tinymce.html.Schema
 * @version 3.4
 */
define(
  'tinymce.core.html.Schema',
  [
    "tinymce.core.util.Tools"
  ],
  function (Tools) {
    var mapCache = {}, dummyObj = {};
    var makeMap = Tools.makeMap, each = Tools.each, extend = Tools.extend, explode = Tools.explode, inArray = Tools.inArray;

    function split(items, delim) {
      items = Tools.trim(items);
      return items ? items.split(delim || ' ') : [];
    }

    /**
     * Builds a schema lookup table
     *
     * @private
     * @param {String} type html4, html5 or html5-strict schema type.
     * @return {Object} Schema lookup table.
     */
    function compileSchema(type) {
      var schema = {}, globalAttributes, blockContent;
      var phrasingContent, flowContent, html4BlockContent, html4PhrasingContent;

      function add(name, attributes, children) {
        var ni, attributesOrder, element;

        function arrayToMap(array, obj) {
          var map = {}, i, l;

          for (i = 0, l = array.length; i < l; i++) {
            map[array[i]] = obj || {};
          }

          return map;
        }

        children = children || [];
        attributes = attributes || "";

        if (typeof children === "string") {
          children = split(children);
        }

        name = split(name);
        ni = name.length;
        while (ni--) {
          attributesOrder = split([globalAttributes, attributes].join(' '));

          element = {
            attributes: arrayToMap(attributesOrder),
            attributesOrder: attributesOrder,
            children: arrayToMap(children, dummyObj)
          };

          schema[name[ni]] = element;
        }
      }

      function addAttrs(name, attributes) {
        var ni, schemaItem, i, l;

        name = split(name);
       #0�^�6 �`&�$�&�6F�5� ʀF��z�ـ�^"@��AA6����	@"�M
�6�AXe֭�	A�N'$*��I�� �BJ	8+ v'�Bu'/�z�R����E�>�/ i*1G�d#D��R���( r�a�B����CH9 PAB0��� H��bi��8"(�@�$.d0&@�0��0	�:%d(�P	�$%"Z ""�c<� "�!�$� $HPx.�QQ� �@�4�4���D���l  ����6U:'0@m-
�ѐ���A����,H�QB� �b�]�P��0F�bI]'B�#Q@o�
 .�	�B@:� !���P� 6�̪@�<�V��  GZo9�p��!9 f7 �L� �4�K��Ŕ
`RR��\�/���L 
Q(@`}B ����b� !W
�Phd��m��y�f����� \���"��PAs�HD@R����� @p0�`P.HP�	�(��!�0b �FB���*$�,�@��D�<�Щ� Q�3P��5��SDeL:7��=pFi�$;�IEP ��Htj+	E;�gZ�}�,+�T�.R�
B���s�@6l!n �< ATy
����"�E@��@�C�D�O�Q�2D8)琀�e�� !�i
��I��CGkv���JA<4A�(q��B
P*���"��0�`5+��6$a��"=H`�c,+/ ��� ?3�͔�T݁�;�܀����h�dx0��
�xa�Q ?K�AczR`E�Uu �� H�F���`G�P�:02p$F'$��`�d��hq`BI��QDd@%��1�
	�� Q�@@`1�� ,X
3*��� D^� ���ɸ&-@� A����"U��
_b�A�j� 
D�������D��(J�"�$��� (0�Q��X$��
�X�AGw@\bBC��ԅ8Ҍ	 IL	6��
��%�H偶`
q� ��6	@ ��EB%(X�t���}PlQ C?0D�#i���o�T�CA� H�[p�ϦH,��U�� do��Fa�!<��BԻY��  
Ų(C�VӀ&�H� � �C�>�� U� 
� h$� �84���K0!5��� �iF��x��
��D%0 �u@X`�,�N�w�+B�hӊ�@T�UGQ��|P"@�@�� �v � �
a�Kb0�@��`e
@�������A:"Ni�7� `TO(�ge�d�%�yG�@�q��  �lBa�BՍ�qd�M(q��8�"��I�B0: � x��Q$ Y�AW�I�0PB�1!��9��5�8!Qd
6
0`|h�:��0�$���� 
��0.�Cx��p�Q>h�4�WZVV ,
XA! YZ��! P[�BXd�BC�DI�I*�`)p��l �<( ��D8EjCx�0�h���pO�h�~V�`�b�)�ug"Q�% ���b�(�A�d�Da02���CU�x1@L��%�Qx�&%v�@!� &�#X�b�G8�Rd "�'��Rh"B"�� C ��_�zbE!�`F$�� c�
�� ._I�1j@SQ/eP����>äD2$,&�����S5�b��B����S��N5
�'�p� �F�
F�6uzA DF2(
$c(���	��"��DIBl@��Y�P |L��
�j�K,�t
�4�S�. �x� ^0H  �\؂2�1��be$X%��9 �B�^x���"p�P 	t )
p(�bA�� � yVhP0f������ I�:)�N�� 2��� �� K�C��(e"��[����l��{'�B �֡�,�y �BT������A��@R -(u~ u�(0���\	�8c��9�J�
K -
�H3
)�gh E8$��Р�gAh)"���@Id�8���$��@���T�~瑡D
`�Q J2� H�l���`\�$��>�� ڍ�AY��T@�T j�#��B		$��*�b�c�[+�+�D���� ` �$*����T>��H-�]����r1Y 
O@�D��pgr�$L�� {4'
"@ "���H!p,T�D<@�@��1e�� (��,�&��נ�0F � �����P�(2 �,@E�v
"   \(��$�� �$�Q��,�@ �����D@��"�x� �JabPL*(A��@��R��L�&�`���p�A��`�0�	��C&�� �(j���|& bdo span legend em strong small s cite dfn", "", phrasingContent);
      add("blockquote", "cite", flowContent);
      add("ol", "reversed start type", "li");
      add("ul", "", "li");
      add("li", "value", flowContent);
      add("dl", "", "dt dd");
      add("a", "href target rel media hreflang type", phrasingContent);
      add("q", "cite", phrasingContent);
      add("ins del", "cite datetime", flowContent);
      add("img", "src sizes srcset alt usemap ismap width height");
      add("iframe", "src name width height", flowContent);
      add("embed", "src type width height");
      add("object", "data type typemustmatch name usemap form width height", [flowContent, "param"].join(' '));
      add("param", "name value");
      add("map", "name", [flowContent, "area"].join(' '));
      add("area", "alt coords shape href target rel media hreflang type");
      add("table", "border", "caption colgroup thead tfoot tbody tr" + (type == "html4" ? " col" : ""));
      add("colgroup", "span", "col");
      add("col", "span");
      add("tbody thead tfoot", "", "tr");
      add("tr", "", "td th");
      add("td", "colspan rowspan headers", flowContent);
      add("th", "colspan rowspan headers scope abbr", flowContent);
      add("form", "accept-charset action autocomplete enctype method name novalidate target", flowContent);
      add("fieldset", "disabled form name", [flowContent, "legend"].join(' '));
      add("label", "form for", phrasingContent);
      add("input", "accept alt autocomplete checked dirname disabled form formaction formenctype formmethod formnovalidate " +
        "formtarget height list max maxlength min multiple name pattern readonly required size src step type value width"
      );
      add("button", "disabled form formaction formenctype formmethod formnovalidate formtarget name type value",
        type == "html4" ? flowContent : phrasingContent);
      add("select", "disabled form multiple name required size", "option optgroup");
      add("optgroup", "disabled label", "option");
      add("option", "disabled label selected value");
      add("textarea", "cols dirname disabled form maxlength name readonly required rows wrap");
      add("menu", "type label", [flowContent, "li"].join(' '));
      add("noscript", "", flowContent);

      // Extend with HTML5 elements
      if (type != "html4") {
        add("wbr");
        add("ruby", "", [phrasingContent, "rt rp"].join(' '));
        add("figcaption", "", flowContent);
        add("mark rt rp summary bdi", "", phrasingContent);
        add("canvas", "width height", flowContent);
        add("video", "src crossorigin poster preload autoplay mediagroup loop " +
          "muted controls width height buffered", [flowContent, "track source"].join(' '));
        add("audio", "src crossorigin preload autoplay mediagroup loop muted controls " +
          "buffered volume", [flowContent, "track source"].join(' '));
        add("picture", "", "img source");
        add("source", "src srcset type media sizes");
        add("track", "kind src srclang label default");
        add("datalist", "", [phrasingContent, "option"].join(' '));
        add("article section nav aside header footer", "", flowContent);
        add("hgroup", "", "h1 h2 h3 h4 h5 h6");
        add("figure", "", [flowContent, "figcaption"].join(' '));
        add("time", "datetime", phrasingContent);
        add("dialog", "open", flowContent);
        add("command", "type label icon disabled checked radiogroup command");
        add("output", "for form name", phrasingContent);
        add("progress", "value max", phrasingContent);
        add("meter", "value min max low high optimum", phrasingContent);
        add("details", "open", [flowContent, "summary"].join(' '));
        add("keygen", "autofocus challenge disabled form keytype name");
      }

      // Extend with HTML4 attributes unless it's html5-strict
      if (type != "html5-strict") {
        addAttrs("script", "language xml:space");
        addAttrs("style", "xml:space");
        addAttrs("object", "declare classid code codebase codetype archive standby align border hspace vspace");
        addAttrs("embed", "align name hspace vspace");
        addAttrs("param", "valuetype type");
        addAttrs("a", "charset name rev shape coords");
        addAttrs("br", "clear");
        addAttrs("applet", "codebase archive code object alt name width height align hspace vspace");
        addAttrs("img", "name longdesc align border hspace vspace");
        addAttrs("iframe", "longdesc frameborder marginwidth marginheight scrolling align");
        addAttrs("font basefont", "size color face");
        addAttrs("input", "usemap align");
        addAttrs("select", "onchange");
        addAttrs("textarea");
        addAttrs("h1 h2 h3 h4 h5 h6 div p legend caption", "align");
        addAttrs("ul", "type compact");
        addAttrs("li", "type");
        addAttrs("ol dl menu dir", "compact");
        addAttrs("pre", "width xml:space");
        addAttrs("hr", "align noshade size width");
        addAttrs("isindex", "prompt");
        addAttrs("table", "summary width frame rules cellspacing cellpadding align bgcolor");
        addAttrs("col", "width align char charoff valign");
        addAttrs("colgroup", "width align char charoff valign");
        addAttrs("thead", "align char charoff valign");
        addAttrs("tr", "align char charoff valign bgcolor");
        addAttrs("th", "axis align char charoff valign nowrap bgcolor width height");
        addAttrs("form", "accept");
        addAttrs("td", "abbr axis scope align char charoff valign nowrap bgcolor width height");
        addAttrs("tfoot", "align char charoff valign");
        addAttrs("tbody", "align char charoff valign");
        addAttrs("area", "nohref");
        addAttrs("body", "background bgcolor text link vlink alink");
      }

      // Extend with HTML5 attributes unless it's html4
      if (type != "html4") {
        addAttrs("input button select textarea", "autofocus");
        addAttrs("input textarea", "placeholder");
        addAttrs("a", "download");
        addAttrs("link script img", "crossorigin");
        addAttrs("iframe", "sandbox seamless allowfullscreen"); // Excluded: srcdoc
      }

      // Special: iframe, ruby, video, audio, label

      // Delete children of the same name from it's parent
      // For example: form can't have a child of the name form
      each(split('a form meter progress dfn'), function (name) {
        if (schema[name]) {
          delete schema[name].children[name];
        }
      });

      // Delete header, footer, sectioning and heading content descendants
      /*each('dt th address', function(name) {
       delete schema[name].children[name];
       });*/

      // Caption can't have tables
      delete schema.caption.children.table;

      // Delete scripts by default due to possible XSS
      delete schema.script;

      // TODO: LI:s can only have value if parent is OL

      // TODO: Handle transparent elements
      // a ins del canvas map

      mapCache[type] = schema;

      return schema;
    }

    function compileElementMap(value, mode) {
      var styles;

      if (value) {
        styles = {};

        if (typeof value == 'string') {
          value = {
            '*': value
          };
        }

        // Convert styles into a rule list
        each(value, function (value, key) {
          styles[key] = styles[key.toUpperCase()] = mode == 'map' ? makeMap(value, /[, ]/) : explode(value, /[, ]/);
        });
      }

      return styles;
    }

    /**
     * Constructs a new Schema instance.
     *
     * @constructor
     * @method Schema
     * @param {Object} settings Name/value settings object.
     */
    return function (settings) {
      var self = this, elements = {}, children = {}, patternElements = [], validStyles, invalidStyles, schemaItems;
      var whiteSpaceElementsMap, selfClosingElementsMap, shortEndedElementsMap, boolAttrMap, validClasses;
      var blockElementsMap, nonEmptyElementsMap, moveCaretBeforeOnEnterElementsMap, textBlockElementsMap, textInlineElementsMap;
      var customElementsMap = {}, specialElements ��C�lE�&N�>��� ���( 4L;D80��#�,f�� 	��A	�Hs�B�� 0H3� @!1TF�
Bӷ�
z������78Q0	�!X�f
X.'PjF�������=�~�/���g������׽�=����������9ﳅ�r9�����������_��&�:盷��羶�Şt�=�|�W�����߅r��5����uz�Os�������;���R�]ۥ�~�9��s��{������?���K�������r��cY����^v��e��p��u'k]������z��>ϯ���?˦�����̹���5��};�uO_7����u�㾧�t?{F��������~�W��;g}�w�sV��ؕ��w�D	�Y_O��gaBx �v �Dp���',��J/ �0
1j'�ކ��1�,�g���~9���l�R=o��wg�kr��`ƭw��������X�~����h�������`�:�}�w��S?�������^������loǞ�ݹ{���������^��������f������������ӹ����s��.6��2�bQ��DR8 I1�
�`˷��  $	�4 �{y ���2SȤ@wI� `s�Y�(�!(ve
��D'I�r��J�	J�Ѐ�T�
=oq� üG���� �����*A�
	#�e`�#
`� �8p �0֑B�b�Ag�@��G�Μ�\��Ｖ|
c�H��O&8GW�	��x�B%���S�A#�%�YKB
�$1����*.,/�.��'P0byA�qhNTk@�-@�1;0(�&<�L�^ZU���	���#�.!:)`�JE0A5�H��
,E#��4CJ
�I�L����+�@~	�"�A��& �]�@� AR� "!�r�a�5N�a Ƞ;a aS���P"$] z��$�
.`��U
e&�0@ @��~(��u!�Mua�4OT����	R���)cDc��� %�I|����uG��;��o~��X�V��ˬ{�ù��Î�翮��t�����8�����ZO��9��h����ͪo[��o�����g�ٞ<_��6|�г���[��?���]�{suW�w����������~x$L��P���"J�rꁐ��B�$C��2�`w�r� 38���`�DBS�%Nx�W!�}J�����Q�
P��, ��x#�����@L@r�EE� �P���f8Eu� ���c��ݫn�����s���s����ֹ�>���'�}��j=��z�OY��7������߶�����ǟ�w���ջs}w3q��n���OV��/m���i�^�g�~���.�����������t�-���'���[���{o��a�߶��e��?s�ݻ�����g�{��;�o��������^;���}��������_�ɳs����2��:��Q>��\׿�W�W���F��}/�
�t�8�t���yO�{U���l֋���V�ke�m����=��}��w]k�w��_o�W��`��՛G���V������uz����d����������m�g���	lyŷ��v����_����w���;|�ۯ�������D�lb*� %S ��BB���'1@�U9 �����c Y&���4���dJL���0�!�&aAX�m���"o�
 �QGU
          }

          // Loop all rules
          for (ei = 0, el = validElements.length; ei < el; ei++) {
            // Parse element rule
            matches = elementRuleRegExp.exec(validElements[ei]);
            if (matches) {
              // Setup local names for matches
              prefix = matches[1];
              elementName = matches[2];
              outputName = matches[3];
              attrData = matches[5];

              // Create new attributes and attributesOrder
              attributes = {};
              attributesOrder = [];

              // Create the new element
              element = {
                attributes: attributes,
                attributesOrder: attributesOrder
              };

              // Padd empty elements prefix
              if (prefix === '#') {
                element.paddEmpty = true;
              }

              // Remove empty elements prefix
              if (prefix === '-') {
                element.removeEmpty = true;
              }

              if (matches[4] === '!') {
                element.removeEmptyAttrs = true;
              }

              // Copy attributes from global rule into current rule
              if (globalAttributes) {
                for (key in globalAttributes) {
                  attributes[key] = globalAttributes[key];
                }

                attributesOrder.push.apply(attributesOrder, globalAttributesOrder);
              }

              // Attributes defined
              if (attrData) {
                attrData = split(attrData, '|');
                for (ai = 0, al = attrData.length; ai < al; ai++) {
                  matches = attrRuleRegExp.exec(attrData[ai]);
                  if (matches) {
                    attr = {};
                    attrType = matches[1];
                    attrName = matches[2].replace(/::/g, ':');
                    prefix = matches[3];
                    value = matches[4];

                    // Required
                    if (attrType === '!') {
                      element.attributesRequired = element.attributesRequired || [];
                      element.attributesRequired.push(attrName);
                      attr.required = true;
                    }

                    // Denied from global
                    if (attrType === '-') {
                      delete attributes[attrName];
                      attributesOrder.splice(inArray(attributesOrder, attrName), 1);
                      continue;
                    }

                    // Default value
                    if (prefix) {
                      // Default value
                      if (prefix === '=') {
                        element.attributesDefault = element.attributesDefault || [];
                        element.attributesDefault.push({ name: attrName, value: value });
                        attr.defaultValue = value;
                      }

                      // Forced value
                      if (prefix === ':') {
                        element.attributesForced = element.attributesForced || [];
                        element.attributesForced.push({ name: attrName, value: value });
                        attr.forcedValue = value;
                      }

                      // Required values
                      if (prefix === '<') {
                        attr.validValues = makeMap(value, '?');
                      }
                    }

                    // Check for attribute patterns
                    if (hasPatternsRegExp.test(attrName)) {
                      element.attributePatterns = element.attributePatterns || [];
                      attr.pattern = patternToRegExp(attrName);
                      element.attributePatterns.push(attr);
                    } else {
                      // Add attribute to order list if it doesn't already exist
                      if (!attributes[attrName]) {
                        attributesOrder.push(attrName);
                      }

                      attributes[attrName] = attr;
             �����0��@�� ��P.P�������������@��p�������� ��Э� ��  �0��`���� 8�  �`@��^��:��:� =�P?���������6�@>��������
x:������v:�_:    @x:��c�$����    �!�L�k<     wu b��(MakF��:r��2��^ �  �  �  ��_:������c�$���Xbc�$���� �
L��;     qu �#P�!|m����6���� �  ��  ��_:�����_:Xbc�$���X�
    @��G��9      hc�D�W t\��k�u�-   �A     P(R�����(R  �c�$���u     [=     L fN��hFk^�׶9��a �  �A  ��  h�_:�c�$���X�    ��=J����a<  �k    �!�f��.���x^,�y�1��4 �  �=FJB �_:  @ @ ��=F���GXEk
    ���8�������J�^:  Bk
      Vނ`  Vނ`�4��k��,. �     �A     �o]:�����`]:�_:    XFk
    0{wA�����^:  Ek
      Vނ`  Vނ`���k�� (�
�4��/3Wk|�F�� �  �A  ����p��G��       kH�����c�$���#L    (�i;����8X=     �)�/o��0k��� �  �����ް� @� �~��  ���1! N�^�^�� ��>
�  � 0
            return element;
          }
        }
      }

      if (!settings.valid_elements) {
        // No valid elements defined then clone the elements from the schema spec
        each(schemaItems, function (element, name) {
          elements[name] = {
            attributes: element.attributes,
            attributesOrder: element.attributesOrder
          };

          children[name] = element.children;
        });

        // Switch these on HTML4
        if (settings.schema != "html5") {
          each(split('strong/b em/i'), function (item) {
            item = split(item, '/');
            elements[item[1]].outputName = item[0];
          });
        }

        // Add default alt attribute for images, removed since alt="" is treated as presentational.
        // elements.img.attributesDefault = [{name: 'alt', value: ''}];

        // Remove these if they are empty by default
        each(split('ol ul sub sup blockquote span font a table tbody tr strong em b i'), function (name) {
          if (elements[name]) {
            elements[name].removeEmpty = true;
          }
        });

        // Padd these by default
        each(split('p h1 h2 h3 h4 h5 h6 th td pre div address caption'), function (name) {
          elements[name].paddEmpty = true;
        });

        // Remove these if they have no attributes
        each(split('span'), function (name) {
          elements[name].removeEmptyAttrs = true;
        });

        // Remove these by default
        // TODO: Reenable in 4.1
        /*each(split('script style'), function(name) {
         delete elements[name];
         });*/
      } else {
        setValidElements(settings.valid_elements);
      }

      addCustomElements(settings.custom_elements);
      addValidChildren(settings.valid_children);
      addValidElements(settings.extended_valid_elements);

      // Todo: Remove this when we fix list handling to be valid
      addValidChildren('+ol[ul|ol],+ul[ul|ol]');


      // Some elements are not valid by themselves - require parents
      each({
        dd: 'dl',
        dt: 'dl',
        li: 'ul ol',
        td: 'tr',
        th: 'tr',
        tr: 'tbody thead tfoot',
        tbody: 'table',
        thead: 'table',
        tfoot: 'table',
        legend: 'fieldset',
        area: 'map',
        param: 'video audio object'
      }, function (parents, item) {
        if (elements[item]) {
          elements[item].parentsRequired = split(parents);
        }
      });


      // Delete invalid elements
      if (settings.invalid_elements) {
        each(explode(settings.invalid_elements), function (item) {
          if (elements[item]) {
            delete elements[item];
          }
        });
      }

      // If the user didn't allow span only allow internal spans
      if (!getElementRule('span')) {
        addValidElements('span[!data-mce-type|*]');
      }

      /**
       * Name/value map object with valid parents and children to those parents.
       *
       * @example
       * children = {
       *    div:{p:{}, h1:{}}
       * };
       * @field children
       * @type Object
       */
      self.children = children;

      /**
       * Name/value map object with valid styles for each element.
       *
       * @method getValidStyles
       * @type Object
       */
      self.getValidStyles = function () {
        return validStyles;
      };

      /**
       * Name/value map object with valid styles for each element.
       *
       * @method getInvalidStyles
       * @type Object
       */
      self.getInvalidStyles = function () {
        return invalidStyles;
      };

      /**
       * Name/value map object with valid classes for each element.
       *
       * @method getValidClasses
       * @type Object
       */
      self.getValidClasses = function () {
        return validClasses;
      };

      /**
       * Returns a map with boolean attributes.
       *
       * @method getBoolAttrs
       * @return {Object} Name/value lookup map for boolean attributes.
       */
      self.getBoolAttrs = function () {
        return boolAttrMap;
      };

      /**
       * Returns a map with block elements.
       *
       * @method getBlockElements
       * @return {Object} Name/value lookup map for block elements.
       */
      self.getBlockElements = function () {
        return blockElementsMap;
      };

      /**
       * Returns a map with text block elements. Such as: p,h1-h6,div,address
       *
       * @method getTextBlockElements
       * @return {Object} Name/value lookup map for block elements.
       */
      self.getTextBlockElements = function () {
        return textBlockElementsMap;
      };

      /**
       * Returns a map of inline text format nodes for example strong/span or ins.
       *
       * @method getTextInlineElements
       * @return {Object} Name/value lookup map for text format elements.
       */
      self.getTextInlineElements = function () {
        return textInlineElementsMap;
      };

      /**
       * Returns a map with short ended elements such as BR or IMG.
       *
       * @method getShortEndedElements
       * @return {Object} Name/value lookup map for short ended elements.
       */
      self.getShortEndedElements = function () {
        return shortEndedElementsMap;
      };

      /**
       * Returns a map with self closing tags such as <li>.
       *
       * @method getSelfClosingElements
       * @return {Object} Name/value lookup map for self closing tags elements.
       */
      self.getSelfClosingElements = function () {
        return selfClosingElementsMap;
      };

      /**
       * Returns a map with elements that should be treated as contents regardless if it has text
       * content in them or not such as TD, VIDEO or IMG.
       *
       * @method getNonEmptyElements
       * @return {Object} Name/value lookup map for non empty elements.
       */
      self.getNonEmptyElements = function () {
        return nonEmptyElementsMap;
      };

      /**
       * Returns a map with elements that the caret should be moved in front of after enter is
       * pressed
       *
       * @method getMoveCaretBeforeOnEnterElements
       * @return {Object} Name/value lookup map for elements to place the caret in front of.
       */
      self.getMoveCaretBeforeOnEnterElements = function () {
        return moveCaretBeforeOnEnterElementsMap;
      };

      /**
       * Returns a map with elements where white space is to be preserved like PRE or SCRIPT.
       *
       * @method getWhiteSpaceElements
       * @return {Object} Name/value lookup map for white space elements.
       */
      self.getWhiteSpaceElements = function () {
        return whiteSpaceElementsMap;
      };

      /**
       * Returns a map with special elements. These are elements that needs to be parsed
       * in a special way such as script, style, textarea etc. The map object values
       * are regexps used to find the end of the element.
       *
       * @method getSpecialElements
       * @return {Object} Name/value lookup map for special elements.
       */
      self.getSpecialElements = function () {
        return specialElements;
      };

      /**
       * Returns true/false if the specified element and it's child is valid or not
       * according to the schema.
       *
       * @method isValidChild
       * @param {String} name Element name to check for.
       * @param {String} child Element child to verify.
       * @return {Boolean} True/false if the element is a valid child of the specified parent.
       */
      self.isValidChild = function (name, child) {
        var parent = children[name.toLowerCase()];

        return !!(parent && parent[child.toLowerCase()]);
      };

      /**
       * Returns true/false if the specified element name and optional attribute is
       * valid according to the schema.
       *
       * @method isValid
       * @param {String} name Name of element to check.
       * @param {String} attr Optional attribute name to check for.
       * @return {Boolean} True/false if the element and attribute is valid.
       */
      self.isValid = function (name, attr) {
        var attrPatterns, i, rule = getElementRule(name);

        // Check if it's a valid element
        if (rule) {
          if (attr) {
            // Check if attribute name exists
            if (rule.attributes[attr]) {
              return true;
            }

            // Check if attribute matches a regexp pattern
            attrPatterns = rule.attributePatterns;
            if (attrPatterns) {
              i = attrPatterns.length;
              while (i--) {
                if (attrPatterns[i].pattern.test(name)) {
                  return true;
                }
              }
            }
          } else {
            return true;
          }
        }

        // No match
        return false;
      };

      /**
       * Returns true/false if the specified element is valid or not
       * according to the schema.
       *
       * @method getElementRule
       * @param {String} name Element name to check for.
       * @return {Object} Element object or undefined if the element isn't valid.
       */
      self.getElementRule = getElementRule;

      /**
       * Returns an map object of all custom elements.
       *
       * @method getCustomElements
       * @return {Object} Name/value map object of all custom elements.
       */
      self.getCustomElements = function () {
        return customElementsMap;
      };

      /**
       * Parses a valid elements string and adds it to the schema. The valid elements
       * format is for example "element[attr=default|otherattr]".
       * Existing rules will be replaced with the ones specified, so this extends the schema.
       *
       * @method addValidElements
       * @param {String} valid_elements String in the valid elements format to be parsed.
       */
      self.addValidElements = addValidElements;

      /**
       * Parses a valid elements string and sets it to the schema. The valid elements
       * format is for example "element[attr=default|otherattr]".
       * Existing rules will be replaced with the ones specified, so this extends the schema.
       *
       * @method setValidElements
       * @param {String} valid_elements String in the valid elements format to be parsed.
       */
      self.setValidElements = setValidElements;

      /**
       * Adds custom non HTML elements to the schema.
       *
       * @method addCustomElements
       * @param {String} custom_elements Comma separated list of custom elements to add.
       */
      self.addCustomElements = addCustomElements;

      /**
       * Parses a valid children string and adds them to the schema structure. The valid children
       * format is for example: "element[child1|child2]".
       *
       * @method addValidChildren
       * @param {String} valid_children Valid children elements string to parse
       */
      self.addValidChildren = addValidChildren;

      self.elements = elements;
    };
  }
);

/**
 * DOMUtils.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * Utility class for various DOM manipulation and retrieval functions.
 *
 * @class tinymce.dom.DOMUtils
 * @example
 * // Add a class to an element by id in the page
 * tinymce.DOM.addClass('someid', 'someclass');
 *
 * // Add a class to an element by id inside the editor
 * tinymce.activeEditor.dom.addClass('someid', 'someclass');
 */
define(
  'tinymce.core.dom.DOMUtils',
  [
    'tinymce.core.dom.DomQuery',
    'tinymce.core.dom.EventUtils',
    'tinymce.core.dom.Range',
    'tinymce.core.dom.Sizzle',
    'tinymce.core.dom.StyleSheetLoader',
    'tinymce.core.dom.TreeWalker',
    'tinymce.core.Env',
    'tinymce.core.html.Entities',
    'tinymce.core.html.Schema',
    'tinymce.core.html.Styles',
    'tinymce.core.util.Tools'
  ],
  function (DomQuery, EventUtils, Range, Sizzle, StyleSheetLoader, TreeWalker, Env, Entities, Schema, Styles, Tools) {
    // Shorten names
    var each = Tools.each, is = Tools.is, grep = Tools.grepx����x��:�,o��u���i�cC��w^���~m�>s�y2-�<Ov6��ؼ�����=��u�]ݯ���|����/f?�On�o��|���[��I��/����{�~�j�����i�݄{fÏ_�z��w�;{X�A�M��ar �L� pMx1 ���A*�*$�
�؃]I�@!0 � 590�a1��h�1�hA��,�Z�SM))�8Rj�؆�	WD�V�(,q���tR��8��'
F�O�$|C�h&IQ��@�b����@ ��K�	�@�QAB�����譬��@#�A!!A�$��!�Y�BtW���RG�Y�`D�r}g|ig��;����7E�t���I��g��wJ?/�����������/��_���Խ��?}��ݝ��z��o�p�G���_��4�.�=/����_�;���o������svު����>���z�����Kݾ��b ��R�	@���'<��C�"�,!cIs��Ԃ�8B�(F���Ȥ�`�@�`��L�
4�b���rG �2�sֹ
�L�	�$�a�pI�N�$�ؐA'�0�=�8^NI�^0GPHU"�nS:Q��`�L�@G
��QJ�
B0�(D�##�$� t�: �`�M�C����A�6��ܑ�cc5d��Pr�
;A&��'k=�'����
�{����'���?o�_5�y�߽~g��77������άn��{���si��D������ }3�o���~��;j
,��A �	�68p��Gk�
�$A�f5�r�QD��1 R݊@������.�$�A*e��� :c�B����!$�p5C0o��*���乍"T�ALa��B5�� 	!n�溰Xw��{#�"�v0P%�c�Dq�1����,�7Q6Z*�����7H�pX�X�j���Eh�X��'�"/ �����/<{��!_'U�s��ק�����B�oZ�
l���\����{����q��K������ΟW���[�F�&��`������~�����wܵ��f����Sc�fyW����y��������M
�0�,I��O�q�Z��0 �s㡭���e �r04`�a �(p��|n�0U��/2�� $�
0a8�� <M
�� ��P^t�7��I �  Pd&�_	&��~���c������_~�������ث�~��������q����������������������O�O5���kO0�0����������g{���_�����_����l���"��σ�g��{��rH�}[��gpgSG��������e��d֯���Wl�u�a��]����-�ٽ�����N������|G����n��������r�������f�|���-w{��������������:��+��ί��+h
M�*&.�����
`� $H'��7�  @��C
�T	�$L*&x�gnq�J�t�PR����GX�%�1,�_�Z0ŏ���[k�& #Y�!��'dh�<L&�� �΋��O��v��B�� �A��@� �E.��i��~�`ז�o��h�o�]�o��}��;��p�zM����������i?�8������ݼjkؗv�S�����������W���<��mF��4�loܸ�����}r����n�|X���Ϡ��/;:q����1���W���_�=;���?�����ϡ%�'˻�s����z��{��U�Ow���������F�~���}�}��~��_���nZ�����_�~ۭӶ�6�������������������=�{��ȗK	��k���W%/X��Ł���.@(%B�� �y<1ML��m�����@RA�h	��kHpz�
KA�9�rD[��t我���N�8 ��y����a$ fY��D�}� *�
�!0D�e pattern style since it might be executed with the wrong this scope
        var type = node.nodeType;

        // If it's a node then check the type and use the nodeName
        if (type) {
          return !!(type === 1 && blockElementsMap[node.nodeName]);
        }

        return !!blockElementsMap[node];
      };
    }

    DOMUtils.prototype = {
      $$: function (elm) {
        if (typeof elm == 'string') {
          elm = this.get(elm);
        }

        return this.$(elm);
      },

      root: null,

      fixDoc: function (doc) {
        var settings = this.settings, name;

        if (isIE && settings.schema) {
          // Add missing HTML 4/5 elements to IE
          ('abbr article aside audio canvas ' +
            'details figcaption figure footer ' +
            'header hgroup mark menu meter nav ' +
            'output progress section summary ' +
            'time video').replace(/\w+/g, function (name) {
              doc.createElement(name);
            });

          // Create all custom elements
          for (name in settings.schema.getCustomElements()) {
            doc.createElement(name);
          }
        }
      },

      clone: function (node, deep) {
        var self = this, clone, doc;

        // TODO: Add feature detection here in the future
        if (!isIE || node.nodeType !== 1 || deep) {
          return node.cloneNode(deep);
        }

        doc = self.doc;

        // Make a HTML5 safe shallow copy
        if (!deep) {
          clone = doc.createElement(node.nodeName);

          // Copy attribs
          each(self.getAttribs(node), function (attr) {
            self.setAttrib(clone, attr.nodeName, self.getAttrib(node, attr.nodeName));
          });

          return clone;
        }

        return clone.firstChild;
      },

      /**
       * Returns the root node of the document. This is normally the body but might be a DIV. Parents like getParent will not
       * go above the point of this root node.
       *
       * @method getRoot
       * @return {Element} Root element for the utility class.
       */
      getRoot: function () {
        var self = this;

        return self.settings.root_element || self.doc.body;
      },

      /**
       * Returns the viewport of the window.
       *
       * @method getViewPort
       * @param {Window} win Optional window to get viewport of.
       * @return {Object} Viewport object with fields x, y, w and h.
       */
      getViewPort: function (win) {
        var doc, rootElm;

        win = !win ? this.win : win;
        doc = win.document;
        rootElm = this.boxModel ? doc.documentElement : doc.body;

        // Returns viewport size excluding scrollbars
        return {
          x: win.pageXOffset || rootElm.scrollLeft,
          y: win.pageYOffset || rootElm.scrollTop,
          w: win.innerWidth || rootElm.clientWidth,
          h: win.innerHeight || rootElm.clientHeight
        };
      },

      /**
       * Returns the rectangle for a specific element.
       *
       * @method getRect
       * @param {Element/String} elm Element object or element ID to get rectangle from.
       * @return {object} Rectangle for specified element object with x, y, w, h fields.
       */
      getRect: function (elm) {
        var self = this, pos, size;

        elm = self.get(elm);
        pos = self.getPos(elm);
        size = self.getSize(elm);

        return {
          x: pos.x, y: pos.y,
          w: size.w, h: size.h
        };
      },

      /**
       * Returns the size dimensions of the specified element.
       *
       * @method getSize
       * @param {Element/String} elm Element object or element ID to get rectangle from.
       * @return {object} Rectangle for specified element object with w, h fields.
       */
      getSize: function (elm) {
        var self = this, w, h;

        elm = self.get(elm);
        w = self.getStyle(elm, 'width');
        h = self.getStyle(elm, 'height');

        // Non pixel value, then force offset/clientWidth
        if (w.indexOf('px') === -1) {
          w = 0;
        }

        // Non pixel value, then force offset/clientWidth
        if (h.indexOf('px') === -1) {
          h = 0;
        }

        return {
          w: parseInt(w, 10) || elm.offsetWidth || elm.clientWidth,
          h: parseInt(h, 10) || elm.offsetHeight || elm.clientHeight
        };
      },

      /**
       * Returns a node by the specified selector function. This function will
       * loop through all parent nodes and call the specified function for each node.
       * If the function then returns true indicating that it has found what it was looking for, the loop execution will then end
       * and the node it found will be returned.
       *
       * @method getParent
       * @param {Node/String} node DOM node to search parents on or ID string.
       * @param {function} selector Selection function or CSS selector to execute on each node.
       * @param {Node} root Optional root element, never go beyond this point.
       * @return {Node} DOM Node or null if it wasn't found.
       */
      getParent: function (node, selector, root) {
        return this.getParents(node, selector, root, false);
      },

      /**
       * Returns a node list of all parents matching the specified selector function or pattern.
       * If the function then returns true indicating that it has found what it was looking for and that node will be collected.
       *
       * @method getParents
       * @param {Node/String} node DOM node to search parents on or ID string.
       * @param {function} selector Selection function to execute on each node or CSS pattern.
       * @param {Node} root Optional root element, never go beyond this point.
       * @return {Array} Array of nodes or null if it wasn't found.
       */
      getParents: function (node, selector, root, collect) {
        var self = this, selectorVal, result = [];

        node = self.get(node);
        collect = collect === undefined;

        // Default root on inline mode
        root = root || (self.getRoot().nodeName != 'BODY' ? self.getRoot().parentNode : null);

        // Wrap node name as func
        if (is(selector, 'string')) {
          selectorVal = selector;

          if (selector === '*') {
            selector = function (node) {
              return node.nodeType == 1;
            };
          } else {
            selector = function (node) {
              return self.is(node, selectorVal);
            };
          }
        }

        while (node) {
          if (node == root || !node.nodeType || node.nodeType === 9) {
            break;
          }

          if (!selector || selector(node)) {
            if (collect) {
              result.push(node);
            } else {
              return node;
            }
          }

          node = node.parentNode;
        }

        return collect ? result : null;
      },

      /**
       * Returns the specified element by ID or the input element if it isn't a string.
       *
       * @method get
       * @param {String/Element} n Element id to look for or element to just pass though.
       * @return {Element} Element matching the specified id or null if it wasn't found.
       */
      get: function (elm) {
        var name;

        if (elm && this.doc && typeof elm == 'string') {
          name = elm;
          elm = this.doc.getElementById(elm);

          // IE and Opera returns meta elements when they match the specified input ID, but getElementsByName seems to do the trick
          if (elm && elm.id !== name) {
            return this.doc.getElementsByName(name)[1];
          }
        }

        return elm;
      },

      /**
       * Returns the next node that matches selector or function
       *
       * @method getNext
       * @param {Node} node Node to find siblings from.
       * @param {String/function} selector Selector CSS expression or function.
       * @return {Node} Next node item matching the selector or null if it wasn't found.
       */
      getNext: function (node, selector) {
        return this._findSib(node, selector, 'nextSibling');
      },

      /**
       * Returns the previous node that matches selector or function
       *
       * @method getPrev
       * @param {Node} node Node to find siblings from.
       * @param {String/function} selector Selector CSS expression or function.
       * @return {Node} Previous node item matching the selector or null if it wasn't found.
       */
      getPrev: function (node, selector) {
        return this._findSib(node, selector, 'previousSibling');
      },

      // #ifndef jquery

      /**
       * Selects specific elements by a CSS level 3 pattern. For example "div#a1 p.test".
       * This function is optimized for the most common patterns needed in TinyMCE but it also performs well enough
       * on more complex patterns.
       *
       * @method select
       * @param {String} selector CSS level 3 pattern to select/find elements by.
       * @param {Object} scope Optional root element/scope element to search in.
       * @return {Array} Array with all matched elements.
       * @example
       * // Adds a class to all paragraphs in the currently active editor
       * tinymce.activeEditor.dom.addClass(tinymce.activeEditor.dom.select('p'), 'someclass');
       *
       * // Adds a class to all spans that have the test class in the currently active editor
       * tinymce.activeEditor.dom.addClass(tinymce.activeEditor.dom.select('span.test'), 'someclass')
       */
      select: function (selector, scope) {
        var self = this;

        /*eslint new-cap:0 */
        return Sizzle(selector, self.get(scope) || self.settings.root_element || self.doc, []);
      },

      /**
       * Returns true/false if the specified element matches the specified css pattern.
       *
       * @method is
       * @param {Node/NodeList} elm DOM node to match or an array of nodes to match.
       * @param {String} selector CSS pattern to match the element against.
       */
      is: function (elm, selector) {
        var i;

        if (!elm) {
          return false;
        }

        // If it isn't an array then try to do some simple selectors instead of Sizzle for to boost performance
        if (elm.length === undefined) {
          // Simple all selector
          if (selector === '*') {
            return elm.nodeType == 1;
          }

          // Simple selector just elements
          if (simpleSelectorRe.test(selector)) {
            selector = selector.toLowerCase().split(/,/);
            elm = elm.nodeName.toLowerCase();

            for (i = selector.length - 1; i >= 0; i--) {
              if (selector[i] == elm) {
                return true;
              }
            }

            return false;
          }
        }

        // Is non element
        if (elm.nodeType && elm.nodeType != 1) {
          return false;
        }

        var elms = elm.nodeType ? [elm] : elm;

        /*eslint new-cap:0 */
        return Sizzle(selector, elms[0].ownerDocument || elms[0], null, elms).length > 0;
      },

      // #endif

      /**
       * Adds the specified element to another element or elements.
       *
       * @method add
       * @param {String/Element/Array} parentElm Element id string, DOM node element or array of ids or elements to add to.
       * @param {String/Element} name Name of new element to add or existing element to add.
       * @param {Object} attrs Optional object collection with arguments to add to the new element(s).
       * @param {String} html Optional inner HTML contents to add for each element.
       * @param {Boolean} create Optional flag if the element should be created or added.
       * @return {Element/Array} Element that got created, or an array of created elements if multiple input elements
       * were passed in.
       * @example
       * // Adds a new paragraph to the end of the active editor
       * tinymce.activeEditor.dom.add(tinymce.activeEditor.getBody(), 'p', {title: 'my title'}, 'Some content');
       */
      add: function (parentElm, name, attrs, html, create) {
        var self = this;

        return this.run(parentElm, function (parentElm) {
          var newElm;

         І�� a� �6HPD% f1�	�)4��@@M
B4��@� ��n@BA(�	$�RQS
B�u�R;�`B%,����3H!jq�8֣�<��|-����*]��~ܟ^������)���^��E����[�lg�m��<kq����f�/9��Y:���S��M���m9
��V���͟�_��K�������������nc���[�& ��j��ؿs�����3Yy۶�}{���[��:K���M���h�Gbw7M�q}�u�O��c���_��q�άw�]���|l[�:��Mb�wo����οz���eS�p��f=��������mGݶ�<���ӈ� I���"ǬG��@W*����� � ��	P�b(G"�|	!34a[#;�3,R!��%����P* l$��BL�@'8���* =d�!� P 4 �XÀ�ZE�����|2�.j���gx�����~x�y�_0�_�vJ�-ڸ�o��};-�.���)�'?c�^w^o���h�>{�⿽Y�;n�����E��Ͼ�2U��W����e���G�7�H�?����G8��w�~�B� 4������N���d�" +�؂ #��I�
 "5 dD���Aesn@I���p$.�He HŤ�$�;� ��y�!�
T��� lH)!�D � � ��i	�/
X��^Ѐ@�S8��X2�50�@��0*Ԓ���Z@�"8��@Hp($���P1|*4�$1�A`���8� ����O���n������g^ǻoub>��i?�_���eZ�����.�{5N�W�W����6_���~����\��&;����j���W��Ϧ`BwH[_�Bs�����ݿ�vz���]r�Sf���S�b�߉O�E�M�o���'>�c�{R�Y��s'�*|w���{�{M����wso�]uw�o�"��7�ؿ5���Wfwٻ駽w{�U�������2��qb����S1}{�#&�?�����s��nO���-��ڟN�TA�t�D� ��HT%ذ �`�0� AB�� �k �A � ��
�`���� 	m�C�*��D,2��� �	�e��  �tBp��
�PX$� 0|��aB�"�@�#��c;�=7G������>)������-��Fx����g�rS��!{�x����N�ҟ�����V^�[q/��yM������������?�m���H�\�|/>���d�7>�j�y�^G�����bD��V�j�X��D !� 0��D�h
�hm�ƀ�B
�����D1@l��� �� @�k�(
�$��B@P�"������
d�-\`.�.i�C6�2��C!S@@`� ^��E(��o
vu���ܫITU����ra�>�߻Ӷ��g�W���o�_G��toRU���?��^�����7N7�z�뷽:<��_�z~�+�~�Ý�0?��;?Y����_�ۺ��/|�S��_ś��os��z�.7 B|�r 
�}���@�L@4њ�2��h���E ���R*��� ��\��  P͂TN�F4h2�d
� D ÃL�aE�"�c
 pK��X	 ��v" - ��b�t*տv�Ǘ[���u����.�^�W����6��=+��vO�w�����V�}��Θ�?����;��}oV���PG�5c}������ï=��Fm����ӝWiӏރ��u�~���G���]x�y+���A�8:��߽��[L��w����j)�]M�{3r�j�\�S.���OM���������o���<O8N��k?�`mz�u�+�����s�}H��	�G��p�5�km�ug;W�]�v�9�&��{s:�sߺq�Y?��� ��LA�� # `Be	�!
� ��
�;�$�go\u-�X�����㯕��]�%����� ������h'd��=�PPr�t0`� 0Ye��A�dmD�VJ��<@X<�,���!��P!� �N!#�A@	H�SB:P��UQP�َ&	�b$A �(+��R�Ҩ,��S D1�� �G� �� 5  2�%Ix`�LLR`��DX�TD�T� 6��44  &�@ �A `B���Q� � �:��8! L��!�$`@@bK�0
� E@ �B�\��]#y)���> ����p��1�w���(���?�g��ݯ�y4N���{��~3�x�D^#��_��O�7�x�����ퟩ1�߯ܜ�>�*.��O�����+w?>e�L�kW���^��w����:~g�@ E�"�MT#= Q���Ā��Al"%i�4�T�R�@�iC� w�P���"A��2Q�*P�@�Q %� �.���f�,$)� �0@@!�  h �'��3H( �H�@BK�,  I��� C��qv~-��Pg���w�ϟ_l���u���_|o��k�_��?��_��e���ѰO��.�y1]�T�����>��b�|����_��o4�[������x�_[!\|N�?������+�[�os�
�<|ooڿb{b�z[a7��-���|U�����sXf�_9�F��Ew^ɚ��>���h���//����.���ⷞ��V�M����oM�to��7�<m�M������b멗K�5�w
�z�o��|����W��\�	
RH��I�0� =kbGD@Ȧ@bB�H`A��.hX�Y1��@@ ��d[�`� ���E@���( L�V-P |A�� ��H��;� _,�'���t�*H�H)0(�H 4�d�ٶ����֛�MM.�������������]&�վ?=�r�=���������4�]���O���K7�������b�W��7��7c��j���l�2����t}�y��_��7;:�L�tO�E:�~/�?^�Fu�I#DP���f"�A���-�I�t��% f� ��BBPV%� �
tRG$�H���(C } �
��<C3� �,� ��Dp!_�5�� L�N@��dZ��B �&�-�JL(0`����!����$�h� `J(�9DU�B&�&�I% '@

            while ((child = this.firstChild)) {
              if (child.nodeType == 3 && child.data.length === 0) {
                this.removeChild(child);
              } else {
                this.parentNode.insertBefore(child, this);
              }
            }
          }).remove();
        } else {
          node.remove();
        }

        return node.length > 1 ? node.toArray() : node[0];
      },

      /**
       * Sets the CSS style value on a HTML element. The name can be a camelcase string
       * or the CSS style name like background-color.
       *
       * @method setStyle
       * @param {String/Element/Array} elm HTML element/Array of elements to set CSS style value on.
       * @param {String} name Name of the style value to set.
       * @param {String} value Value to set on the style.
       * @example
       * // Sets a style value on all paragraphs in the currently active editor
       * tinymce.activeEditor.dom.setStyle(tinymce.activeEditor.dom.select('p'), 'background-color', 'red');
       *
       * // Sets a style value to an element by id in the current document
       * tinymce.DOM.setStyle('mydiv', 'background-color', 'red');
       */
      setStyle: function (elm, name, value) {
        elm = this.$$(elm).css(name, value);

        if (this.settings.update_styles) {
          updateInternalStyleAttr(this, elm);
        }
      },

      /**
       * Returns the current style or runtime/computed value of an element.
       *
       * @method getStyle
       * @param {String/Element} elm HTML element or element id string to get style from.
       * @param {String} name Style name to return.
       * @param {Boolean} computed Computed style.
       * @return {String} Current style or computed style value of an element.
       */
      getStyle: function (elm, name, computed) {
        elm = this.$$(elm);

        if (computed) {
          return elm.css(name);
        }

        // Camelcase it, if needed
        name = name.replace(/-(\D)/g, function (a, b) {
          return b.toUpperCase();
        });

        if (name == 'float') {
          name = Env.ie && Env.ie < 12 ? 'styleFloat' : 'cssFloat';
        }

        return elm[0] && elm[0].style ? elm[0].style[name] : undefined;
      },

      /**
       * Sets multiple styles on the specified element(s).
       *
       * @method setStyles
       * @param {Element/String/Array} elm DOM element, element id string or array of elements/ids to set styles on.
       * @param {Object} styles Name/Value collection of style items to add to the element(s).
       * @example
       * // Sets styles on all paragraphs in the currently active editor
       * tinymce.activeEditor.dom.setStyles(tinymce.activeEditor.dom.select('p'), {'background-color': 'red', 'color': 'green'});
       *
       * // Sets styles to an element by id in the current document
       * tinymce.DOM.setStyles('mydiv', {'background-color': 'red', 'color': 'green'});
       */
      setStyles: function (elm, styles) {
        elm = this.$$(elm).css(styles);

        if (this.settings.update_styles) {
          updateInternalStyleAttr(this, elm);
        }
      },

      /**
       * Removes all attributes from an element or elements.
       *
       * @method removeAllAttribs
       * @param {Element/String/Array} e DOM element, element id string or array of elements/ids to remove attributes from.
       */
      removeAllAttribs: function (e) {
        return this.run(e, function (e) {
          var i, attrs = e.attributes;
          for (i = attrs.length - 1; i >= 0; i--) {
            e.removeAttributeNode(attrs.item(i));
          }
        });
      },

      /**
       * Sets the specified attribute of an element or elements.
       *
       * @method setAttrib
       * @param {Element/String/Array} elm DOM element, element id string or array of elements/ids to set attribute on.
       * @param {String} name Name of attribute to set.
       * @param {String} value Value to set on the attribute - if this value is falsy like null, 0 or '' it will remove
       * the attribute instead.
       * @example
       * // Sets class attribute on all paragraphs in the active editor
       * tinymce.activeEditor.dom.setAttrib(tinymce.activeEditor.dom.select('p'), 'class', 'myclass');
       *
       * // Sets class attribute on a specific element in the current page
       * tinymce.dom.setAttrib('mydiv', 'class', 'myclass');
       */
      setAttrib: function (elm, name, value) {
        var self = this, originalValue, hook, settings = self.settings;

        if (value === '') {
          value = null;
        }

        elm = self.$$(elm);
        originalValue = elm.attr(name);

        if (!elm.length) {
          return;
        }

        hook = self.attrHooks[name];
        if (hook && hook.set) {
          hook.set(elm, value, name);
        } else {
          elm.attr(name, value);
        }

        if (originalValue != value && settings.onSetAttrib) {
          settings.onSetAttrib({
            attrElm: elm,
            attrName: name,
            attrValue: value
          });
        }
      },

      /**
       * Sets two or more specified attributes of an element or elements.
       *
       * @method setAttribs
       * @param {Element/String/Array} elm DOM element, element id string or array of elements/ids to set attributes on.
       * @param {Object} attrs Name/Value collection of attribute items to add to the element(s).
       * @example
       * // Sets class and title attributes on all paragraphs in the active editor
       * tinymce.activeEditor.dom.setAttribs(tinymce.activeEditor.dom.select('p'), {'class': 'myclass', title: 'some title'});
       *
       * // Sets class and title attributes on a specific element in the current page
       * tinymce.DOM.setAttribs('mydiv', {'class': 'myclass', title: 'some title'});
       */
      setAttribs: function (elm, attrs) {
        var self = this;

        self.$$(elm).each(function (i, node) {
          each(attrs, function (value, name) {
            self.setAttrib(node, name, value);
          });
        });
      },

      /**
       * Returns the specified attribute by name.
       *
       * @method getAttrib
       * @param {String/Element} elm Element string id or DOM element to get attribute from.
       * @param {String} name Name of attribute to get.
       * @param {String} defaultVal Optional default value to return if the attribute didn't exist.
       * @return {String} Attribute value string, default value or null if the attribute wasn't found.
       */
      getAttrib: function (elm, name, defaultVal) {
        var self = this, hook, value;

        elm = self.$$(elm);

        if (elm.length) {
          hook = self.attrHooks[name];

          if (hook && hook.get) {
            value = hook.get(elm, name);
          } else {
            value = elm.attr(name);
          }
        }

        if (typeof value == 'undefined') {
          value = defaultVal || '';
        }

        return value;
      },

      /**
       * Returns the absolute x, y position of a node. The position will be returned in an object with x, y fields.
       *
       * @method getPos
       * @param {Element/String} elm HTML element or element id to get x, y position from.
       * @param {Element} rootElm Optional root element to stop calculations at.
       * @return {object} Absolute position of the specified element object with x, y fields.
       */
      getPos: function (elm, rootElm) {
        var self = this, x = 0, y = 0, offsetParent, doc = self.doc, body = doc.body, pos;

        elm = self.get(elm);
        rootElm = rootElm || body;

        if (elm) {
          // Use getBoundingClientRect if it exists since it's faster than looping offset nodes
          // Fallback to offsetParent calculations if the body isn't static better since it stops at the body root
          if (rootElm === body && elm.getBoundingClientRect && DomQuery(body).css('position') === 'static') {
            pos = elm.getBoundingClientRect();
            rootElm = self.boxModel ? doc.documentElement : body;

            // Add scroll offsets from documentElement or body since IE with the wrong box model will use d.body and so do WebKit
            // Also remove the body/documentelement clientTop/clientLeft on IE 6, 7 since they offset the position
            x = pos.left + (doc.documentElement.scrollLeft || body.scrollLeft) - rootElm.clientLeft;
            y = pos.top + (doc.documentElement.scrollTop || body.scrollTop) - rootElm.clientTop;

            return { x: x, y: y };
          }

          offsetParent = elm;
          while (offsetParent && offsetParent != rootElm && offsetParent.nodeType) {
            x += offsetParent.offsetLeft || 0;
            y += offsetParent.offsetTop || 0;
            offsetParent = offsetParent.offsetParent;
          }

          offsetParent = elm.parentNode;
          while (offsetParent && offsetParent != rootElm && offsetParent.nodeType) {
            x -= offsetParent.scrollLeft || 0;
            y -= offsetParent.scrollTop || 0;
            offsetParent = offsetParent.parentNode;
          }
        }

        return { x: x, y: y };
      },

      /**
       * Parses the specified style value into an object collection. This parser will also
       * merge and remove any redundant items that browsers might have added. It will also convert non-hex
       * colors to hex values. Urls inside the styles will also be converted to absolute/relative based on settings.
       *
       * @method parseStyle
       * @param {String} cssText Style value to parse, for example: border:1px solid red;.
       * @return {Object} Object representation of that style, for example: {border: '1px solid red'}
       */
      parseStyle: function (cssText) {
        return this.styles.parse(cssText);
      },

      /**
       * Serializes the specified style object into a string.
       *
       * @method serializeStyle
       * @param {Object} styles Object to serialize as string, for example: {border: '1px solid red'}
       * @param {String} name Optional element name.
       * @return {String} String representation of the style object, for example: border: 1px solid red.
       */
      serializeStyle: function (styles, name) {
        return this.styles.serialize(styles, name);
      },

      /**
       * Adds a style element at the top of the document with the specified cssText content.
       *
       * @method addStyle
       * @param {String} cssText CSS Text style to add to top of head of document.
       */
      addStyle: function (cssText) {
        var self = this, doc = self.doc, head, styleElm;

        // Prevent inline from loading the same styles twice
        if (self !== DOMUtils.DOM && doc === document) {
          var addedStyles = DOMUtils.DOM.addedStyles;

          addedStyles = addedStyles || [];
          if (addedStyles[cssText]) {
            return;
          }

          addedStyles[cssText] = true;
          DOMUtils.DOM.addedStyles = addedStyles;
        }

        // Create style element if needed
        styleElm = doc.getElementById('mceDefaultStyles');
        if (!styleElm) {
          styleElm = doc.createElement('style');
          styleElm.id = 'mceDefaultStyles';
          styleElm.type = 'text/css';

          head = doc.getElementsByTagName('head')[0];
          if (head.firstChild) {
            head.insertBefore(styleElm, head.firstChild);
          } else {
            head.appendChild(styleElm);
          }
        }

        // Append style data to old or new style element
        if (styleElm.styleSheet) {
          styleElm.styleSheet.cssText += cssText;
        } else {
          styleElm.appendChild(doc.createTextNode(cssText));
        }
      },

      /**
       * Imports/loads the specified CSS file into the document bound to the class.
       *
       * @method loadCSS
       * @param {String} url URL to CSS file to load.
       * @example
       * // Loads a CSS file dynamically into the current document
       * tinymce.DOM.loadCSS('somepath/some.css');
       *
       * // Loads a CSS file into the currently active editor instance
       * tinymce.activeEditor.dom.loadCSS('somepath/some.css');
       *
       * // Loads a CSS file into an editor instance by id
       * tinymce.get('someid').dom.loadCSS('somepath/some.css');
       *
       * // Loads multiple CSS files into the current document
       * tinymce.DOM.loadCSS('somepath/some.css,somepath/someother.css');
       */
      loadCSS: function (url) {
        var self = this, doc = self.doc, head;

        // Prevent inline from loading the same CSS file twice
        if (self !== DOMUtils.DOM && doc === document) {
          DOMUtils.DOM.loadCSS(url);
          return;
        }

        if (!url) {
          url = '';
        }

        head = doc.getElementsByTagName('head')[0];

        each(url.split(','), function (url) {
          var link;

          url = Tools._addCacheSuffix(url);

          if (self.files[url]) {
            return;
          }

          self.files[url] = true;
          link = self.create('link', { rel: 'stylesheet', href: url });

          // IE 8 has a bug where dynamically loading stylesheets would produce a 1 item remaining bug
          // This fix seems to resolve that issue by recalcing the document once a stylesheet finishes loading
          // It's ugly but it seems to work fine.
          if (isIE && doc.documentMode && doc.recalc) {
            link.onload = function () {
              if (doc.recalc) {
                doc.recalc();
              }

              link.onload = null;
            };
          }

          head.appendChild(link);
        });
      },

      /**
       * Adds a class to the specified element or elements.
       *
       * @method addClass
       * @param {String/Element/Array} elm Element ID string or DOM element or array with elements or IDs.
       * @param {String} cls Class name to add to each element.
       * @return {String/Array} String with new class value or array with new class values for all elements.
       * @example
       * // Adds a class to all paragraphs in the active editor
       * tinymce.activeEditor.dom.addClass(tinymce.activeEditor.dom.select('p'), 'myclass');
       *
       * // Adds a class to a specific element in the current page
       * tinymce.DOM.addClass('mydiv', 'myclass');
       */
      addClass: function (elm, cls) {
        this.$$(elm).addClass(cls);
      },

      /**
       * Removes a class from the specified element or elements.
       *
       * @method removeClass
       * @param {String/Element/Array} elm Element ID string or DOM element or array with elements or IDs.
       * @param {String} cls Class name to remove from each element.
       * @return {String/Array} String of remaining class name(s), or an array of strings if multiple input elements
       * were passed in.
       * @example
       * // Removes a class from all paragraphs in the active editor
       * tinymce.activeEditor.dom.removeClass(tinymce.activeEditor.dom.select('p'), 'myclass');
       *
       * // Removes a class from a specific element in the current page
       * tinymce.DOM.removeClass('mydiv', 'myclass');
       */
      removeClass: function (elm, cls) {
        this.toggleClass(elm, cls, false);
      },

      /**
       * Returns true if the specified element has the specified class.
       *
       * @method hasClass
       * @param {String/Element} elm HTML element or element id string to check CSS class on.
       * @param {String} cls CSS class to check for.
       * @return {Boolean} true/false if the specified element has the specified class.
       */
      hasClass: function (elm, cls) {
        return this.$$(elm).hasClass(cls);
      },

      /**
       * Toggles the specified class on/off.
       *
       * @method toggleClass
       * @param {Element} elm Element to toggle class on.
       * @param {[type]} cls Class to toggle on/off.
       * @param {[type]} state Optional state to set.
       */
      toggleClass: function (elm, cls, state) {
        this.$$(elm).toggleClass(cls, state).each(function () {
          if (this.className === '') {
            DomQuery(this).attr('class', null);
          }
        });
      },

      /**
       * Shows the specified element(s) by ID by setting the "display" style.
       *
       * @method show
       * @param {String/Element/Array} elm ID of DOM element or DOM element or array with elements or IDs to show.
       */
      show: function (elm) {
        this.$$(elm).show();
      },

      /**
       * Hides the specified element(s) by ID by setting the "display" style.
       *
       * @method hide
       * @param {String/Element/Array} elm ID of DOM element or DOM element or array with elements or IDs to hide.
       * @example
       * // Hides an element by id in the document
       * tinymce.DOM.hide('myid');
       */
      hide: function (elm) {
        this.$$(elm).hide();
      },

      /**
       * Returns true/false if the element is hidden or not by checking the "display" style.
       *
       * @method isHidden
       * @param {String/Element} elm Id or element to check display state on.
       * @return {Boolean} true/false if the element is hidden or not.
       */
      isHidden: function (elm) {
        return this.$$(elm).css('display') == 'none';
      },

      /**
       * Returns a unique id. This can be useful when generating elements on the fly.
       * This method will not check if the element already exists.
       *
       * @method uniqueId
       * @param {String} prefix Optional prefix to add in front of all ids - defaults to "mce_".
       * @return {String} Unique id.
       */
      uniqueId: function (prefix) {
        return (!prefix ? 'mce_' : prefix) + (this.counter++);
      },

      /**
       * Sets the specified HTML content inside the element or elements. The HTML will first be processed. This means
       * URLs will get converted, hex color values fixed etc. Check processHTML for details.
       *
       * @method setHTML
       * @param {Element/String/Array} elm DOM element, element id string or array of elements/ids to set HTML inside of.
       * @param {String} html HTML content to set as inner HTML of the element.
       * @example
       * // Sets the inner HTML of all paragraphs in the active editor
       * tinymce.activeEditor.dom.setHTML(tinymce.activeEditor.dom.select('p'), 'some inner html');
       *
       * // Sets the inner HTML of an element by id in the document
       * tinymce.DOM.setHTML('mydiv', 'some inner html');
       */
      setHTML: function (elm, html) {
        elm = this.$$(elm);

        if (isIE) {
          elm.each(function (i, target) {
            if (target.canHaveHTML === false) {
              return;
            }

            // Remove all child nodes, IE keeps empty text nodes in DOM
            while (target.firstChild) {
              target.removeChild(target.firstChild);
            }

            try {
              // IE will remove comments from the beginning
              // unless you padd the contents with something
              target.innerHTML = '<br>' + html;
              target.removeChild(target.firstChild);
            } catch (ex) {
              // IE sometimes produces an unknown runtime error on innerHTML if it's a div inside a p
              DomQuery('<div></div>').html('<br>' + html).contents().slice(1).appendTo(target);
            }

            return html;
          });
        } else {
          elm.html(html);
        }
      },

      /**
       * Returns the outer HTML of an element.
       *
       * @method getOuterHTML
       * @param {String/Element} elm Element ID or element object to get outer HTML from.
       * @return {String} Outer HTML string.
       * @example
       * tinymce.DOM.getOuterHTML(editorElement);
       * tinymce.activeEditor.getOuterHTML(tinymce.activeEditor.getBody());
       */
      getOuterHTML: function (elm) {
        elm = this.get(elm);

        // Older FF doesn't have outerHTML 3.6 is still used by some orgaizations
        return elm.nodeType == 1 && "outerHTML" in elm ? elm.outerHTML : DomQuery('<div></div>').append(DomQuery(elm).clone()).html();
      },

      /**
       * Sets the specified outer HTML on an element or elements.
       *
       * @method setOuterHTML
       * @param {Element/String/Array} elm DOM element, element id string or array of elements/ids to set outer HTML on.
       * @param {Object} html HTML code to set as outer value for the element.
       * @example
       * // Sets the outer HTML of all paragraphs in the active editor
       * tinymce.activeEditor.dom.setOuterHTML(tinymce.activeEditor.dom.select('p'), '<div>some html</div>');
       *
       * // Sets the outer HTML of an element by id in the document
       * tinymce.DOM.setOuterHTML('mydiv', '<div>some html</div>');
       */
      setOuterHTML: function (elm, html) {
        var self = this;

        self.$$(elm).each(function () {
          try {
            // Older FF doesn't have outerHTML 3.6 is still used by some organizations
            if ("outerHTML" in this) {
              this.outerHTML = html;
              return;
            }
          } catch (ex) {
            // Ignore
          }

          // OuterHTML for IE it sometimes produces an "unknown runtime error"
          self.remove(DomQuery(this).html(html), true);
        });
      },

      /**
       * Entity decodes a string. This method decodes any HTML entities, such as &aring;.
       *
       * @method decode
       * @param {String} s String to decode entities on.
       * @return {String} Entity decoded string.
       */
      decode: Entities.decode,

      /**
       * Entity encodes a string. This method encodes the most common entities, such as <>"&.
       *
       * @method encode
       * @param {String} text String to encode with entities.
       * @return {String} Entity encoded string.
       */
      encode: Entities.encodeAllRaw,

      /**
       * Inserts an element after the reference element.
       *
       * @method insertAfter
       * @param {Element} node Element to insert after the reference.
       * @param {Element/String/Array} referenceNode Reference element, element id or array of elements to insert after.
       * @return {Element/Array} Element that got added or an array with elements.
       */
      insertAfter: function (node, referenceNode) {
        referenceNode = this.get(referenceNode);

        return this.run(node, function (node) {
          var parent, nextSibling;

          parent = referenceNode.parentNode;
          nextSibling = referenceNode.nextSibling;

          if (nextSibling) {
            parent.insertBefore(node, nextSibling);
          } else {
            parent.appendChild(node);
          }

          return node;
        });
      },

      /**
       * Replaces the specified element or elements with the new element specified. The new element will
       * be cloned if multiple input elements are passed in.
       *
       * @method replace
       * @param {Element} newElm New element to replace old ones with.
       * @param {Element/String/Array} oldElm Element DOM node, element id or array of elements or ids to replace.
       * @param {Boolean} keepChildren Optional keep children state, if set to true child nodes from the old object will be added
       * to new ones.
       */
      replace: function (newElm, oldElm, keepChildren) {
        var self = this;

        return self.run(oldElm, function (oldElm) {
          if (is(oldElm, 'array')) {
            newElm = newElm.cloneNode(true);
          }

          if (keepChildren) {
            each(grep(oldElm.childNodes), function (node) {
              newElm.appendChild(node);
            });
          }

          return oldElm.parentNode.replaceChild(newElm, oldElm);
        });
      },

      /**
       * Renames the specified element and keeps its attributes and children.
       *
       * @method rename
       * @param {Element} elm Element to rename.
       * @param {String} name Name of the new element.
       * @return {Element} New element or the old element if it needed renaming.
       */
      rename: function (elm, name) {
        var self = this, newElm;

        if (elm.nodeName != name.toUpperCase()) {
          // Rename block element
          newElm = self.create(name);

          // Copy attribs to new block
          each(self.getAttribs(elm), function (attrNode) {
            self.setAttrib(newElm, attrNode.nodeName, self.getAttrib(elm, attrNode.nodeName));
          });

          // Replace block
          self.replace(newElm, elm, 1);
        }

        return newElm || elm;
      },

      /**
       * Find the common ancestor of two elements. This is a shorter method than using the DOM Range logic.
       *
       * @method findCommonAncestor
       * @param {Element} a Element to find common ancestor of.
       * @param {Element} b Element to find common ancestor of.
       * @return {Element} Common ancestor element of the two input elements.
       */
      findCommonAncestor: function (a, b) {
        var ps = a, pe;

        while (ps) {
          pe = b;

          while (pe && ps != pe) {
            pe = pe.parentNode;
          }

          if (ps == pe) {
            break;
          }

          ps = ps.parentNode;
        }

        if (!ps && a.ownerDocument) {
          return a.ownerDocument.documentElement;
        }

        return ps;
      },

      /**
       * Parses the specified RGB color value and returns a hex version of that color.
       *
       * @method toHex
       * @param {String} rgbVal RGB string value like rgb(1,2,3)
       * @return {String} Hex version of that RGB value like #FF00FF.
       */
      toHex: function (rgbVal) {
        return this.styles.toHex(Tools.trim(rgbVal));
      },

      /**
       * Executes the specified function on the element by id or dom element node or array of elements/id.
       *
       * @method run
       * @param {String/Element/Array} elm ID or DOM element object or array with ids or elements.
       * @param {function} func Function to execute for each item.
       * @param {Object} scope Optional scope to execute the function in.
       * @return {Object/Array} Single object, or an array of objects if multiple input elements were passed in.
       */
      run: function (elm, func, scope) {
        var self = this, result;

        if (typeof elm === 'string') {
          elm = self.get(elm);
        }

        if (!elm) {
          return false;
        }

        scope = scope || this;
        if (!elm.nodeType && (elm.length || elm.length === 0)) {
          result = [];

          each(elm, function (elm, i) {
            if (elm) {
              if (typeof elm == 'string') {
                elm = self.get(elm);
              }

              result.push(func.call(scope, elm, i));
            }
          });

          return result;
        }

        return func.call(scope, elm);
      },

      /**
       * Returns a NodeList with attributes for the element.
       *
       * @method getAttribs
       * @param {HTMLElement/string} elm Element node or string id to get attributes from.
       * @return {NodeList} NodeList with attributes.
       */
      getAttribs: function (elm) {
        var attrs;

        elm = this.get(elm);

        if (!elm) {
          return [];
        }

        if (isIE) {
          attrs = [];

          // Object will throw exception in IE
          if (elm.nodeName == 'OBJECT') {
            return elm.attributes;
          }

          // IE doesn't keep the selected attribute if you clone option elements
          if (elm.nodeName === 'OPTION' && this.getAttrib(elm, 'selected')) {
            attrs.push({ specified: 1, nodeName: 'selected' });
          }

          // It's crazy that this is faster in IE but it's because it returns all attributes all the time
          var attrRegExp = /<\/?[\w:\-]+ ?|=[\"][^\"]+\"|=\'[^\']+\'|=[\w\-]+|>/gi;
          elm.cloneNode(false).outerHTML.replace(attrRegExp, '').replace(/[\w:\-]+/gi, function (a) {
            attrs.push({ specified: 1, nodeName: a });
          });

          return attrs;
        }

        return elm.attributes;
      },

      /**
       * Returns true/false if the specified node is to be considered empty or not.
       *
       * @example
       * tinymce.DOM.isEmpty(node, {img: true});
       * @method isEmpty
       * @param {Object} elements Optional name/value object with elements that are automatically treated as non-empty elements.
       * @return {Boolean} true/false if the node is empty or not.
       */
      isEmpty: function (node, elements) {
        var self = this, i, attributes, type, whitespace, walker, name, brCount = 0;

        node = node.firstChild;
        if (node) {
          walker = new TreeWalker(node, node.parentNode);
          elements = elements || (self.schema ? self.schema.getNonEmptyElements() : null);
          whitespace = self.schema ? self.schema.getWhiteSpaceElements() : {};

          do {
            type = node.nodeType;

            if (type === 1) {
              // Ignore bogus elements
              var bogusVal = node.getAttribute('data-mce-bogus');
              if (bogusVal) {
                node = walker.next(bogusVal === 'all');
                continue;
              }

              // Keep empty elements like <img />
              name = node.nodeName.toLowerCase();
              if (elements && elements[name]) {
                // Ignore single BR elements in blocks like <p><br /></p> or <p><span><br /></span></p>
                if (name === 'br') {
                  brCount++;
                  node = walker.next();
                  continue;
                }

                return false;
              }

              // Keep elements with data-bookmark attributes or name attribute like <a name="1"></a>
              attributes = self.getAttribs(node);
              i = attributes.length;
              while (i--) {
                name = attributes[i].nodeName;
                if (name === "name" || name === 'data-mce-bookmark') {
                  return false;
                }
              }
            }

            // Keep comment nodes
            if (type == 8) {
              return false;
            }

            // Keep non whitespace text nodes
            if (type === 3 && !whiteSpaceRegExp.test(node.nodeValue)) {
              return false;
            }

            // Keep whitespace preserve elements
            if (type === 3 && node.parentNode && whitespace[node.parentNode.nodeName] && whiteSpaceRegExp.test(node.nodeValue)) {
              return false;
            }

            node = walker.next();
          } while (node);
        }

        return brCount <= 1;
      },

      /**
       * Creates a new DOM Range object. This will use the native DOM Range API if it's
       * available. If it's not, it will fall back to the custom TinyMCE implementation.
       *
       * @method createRng
       * @return {DOMRange} DOM Range object.
       * @example
       * var rng = tinymce.DOM.createRng();
       * alert(rng.startContainer + "," + rng.startOffset);
       */
      createRng: function () {
        var doc = this.doc;

        return doc.createRange ? doc.createRange() : new Range(this);
      },

      /**
       * Returns the index of the specified node within its parent.
       *
       * @method nodeIndex
       * @param {Node} node Node to look for.
       * @param {boolean} normalized Optional true/false state if the index is what it would be after a normalization.
       * @return {Number} Index of the specified node.
       */
      nodeIndex: nodeIndex,

      /**
       * Splits an element into two new elements and places the specified split
       * element or elements between the new ones. For example splitting the paragraph at the bold element in
       * this example <p>abc<b>abc</b>123</p> would produce <p>abc</p><b>abc</b><p>123</p>.
       *
       * @method split
       * @param {Element} parentElm Parent element to split.
       * @param {Element} splitElm Element to split at.
       * @param {Element} replacementElm Optional replacement element to replace the split element with.
       * @return {Element} Returns the split element or the replacement element if that is specified.
       */
      split: function (parentElm, splitElm, replacementElm) {
        var self = this, r = self.createRng(), bef, aft, pa;

        // W3C valid browsers tend to leave empty nodes to the left/right side of the contents - this makes sense
        // but we don't want that in our code since it serves no purpose for the end user
        // For example splitting this html at the bold element:
        //   <p>text 1<span><b>CHOP</b></span>text 2</p>
        // would produce:
        //   <p>text 1<span></span></p><b>CHOP</b><p><span></span>text 2</p>
        // this function will then trim off empty edges and produce:
        //   <p>text 1</p><b>CHOP</b><p>text 2</p>
        function trimNode(node) {
          var i, children = node.childNodes, type = node.nodeType;

          function surroundedBySpans(node) {
            var previousIsSpan = node.previousSibling && node.previousSibling.nodeName == 'SPAN';
            var nextIsSpan = node.nextSibling && node.nextSibling.nodeName == 'SPAN';
            return previousIsSpan && nextIsSpan;
          }

          if (type == 1 && node.getAttribute('data-mce-type') == 'bookmark') {
            return;
          }

          for (i = children.length - 1; i >= 0; i--) {
            trimNode(children[i]);
          }

          if (type != 9) {
            // Keep non whitespace text nodes
            if (type == 3 && node.nodeValue.length > 0) {
              // If parent element isn't a block or there isn't any useful contents for example "<p>   </p>"
              // Also keep text nodes with only spaces if surrounded by spans.
              // eg. "<p><span>a</span> <span>b</span></p>" should keep space between a and b
              var trimmedLength = trim(node.nodeValue).length;
              if (!self.isBlock(node.parentNode) || trimmedLength > 0 || trimmedLength === 0 && surroundedBySpans(node)) {
                return;
              }
            } else if (type == 1) {
              // If the only child is a bookmark then move it up
              children = node.childNodes;

              // TODO fix this complex if
              if (children.length == 1 && children[0] && children[0].nodeType == 1 &&
                children[0].getAttribute('data-mce-type') == 'bookmark') {
                node.parentNode.insertBefore(children[0], node);
              }

              // Keep non empty elements or img, hr etc
              if (children.length || /^(br|hr|input|img)$/i.test(node.nodeName)) {
                return;
              }
            }

            self.remove(node);
          }

          return node;
        }

        if (parentElm && splitElm) {
          // Get before chunk
          r.setStart(parentElm.parentNode, self.nodeIndex(parentElm));
          r.setEnd(splitElm.parentNode, self.nodeIndex(splitElm));
          bef = r.extractContents();

          // Get after chunk
          r = self.createRng();
          r.setStart(splitElm.parentNode, self.nodeIndex(splitElm) + 1);
          r.setEnd(parentElm.parentNode, self.nodeIndex(parentElm) + 1);
          aft = r.extractContents();

          // Insert before chunk
          pa = parentElm.parentNode;
          pa.insertBefore(trimNode(bef), parentElm);

          // Insert middle chunk
          if (replacementElm) {
            pa.insertBefore(replacementElm, parentElm);
            //pa.replaceChild(replacementElm, splitElm);
          } else {
            pa.insertBefore(splitElm, parentElm);
          }

          // Insert after chunk
          pa.insertBefore(trimNode(aft), parentElm);
          self.remove(parentElm);

          return replacementElm || splitElm;
        }
      },

      /**
       * Adds an event handler to the specified object.
       *
       * @method bind
       * @param {Element/Document/Window/Array} target Target element to bind events to.
       * handler to or an array of elements/ids/documents.
       * @param {String} name Name of event handler to add, for example: click.
       * @param {function} func Function to execute when the event occurs.
       * @param {Object} scope Optional scope to execute the function in.
       * @return {function} Function callback handler the same as the one passed in.
       */
      bind: function (target, name, func, scope) {
        var self = this;

        if (Tools.isArray(target)) {
          var i = target.length;

          while (i--) {
            target[i] = self.bind(target[i], name, func, scope);
          }

          return target;
        }

        // Collect all window/document events bound by editor instance
        if (self.settings.collect && (target === self.doc || target === self.win)) {
          self.boundEvents.push([target, name, func, scope]);
        }

        return self.events.bind(target, name, func, scope || self);
      },

      /**
       * Removes the specified event handler by name and function from an element or collection of elements.
       *
       * @method unbind
       * @param {Element/Document/Window/Array} target Target element to unbind events on.
       * @param {String} name Event handler name, for example: "click"
       * @param {function} func Function to remove.
       * @return {bool/Array} Bool state of true if the handler was removed, or an array of states if multiple input elements
       * were passed in.
       */
      unbind: function (target, name, func) {
        var self = this, i;

        if (Tools.isArray(target)) {
          i = target.length;

          while (i--) {
            target[i] = self.unbind(target[i], name, func);
          }

          return target;
        }

        // Remove any bound events matching the input
        if (self.boundEvents && (target === self.doc || target === self.win)) {
          i = self.boundEvents.length;

          while (i--) {
            var item = self.boundEvents[i];

            if (target == item[0] && (!name || name == item[1]) && (!func || func == item[2])) {
              this.events.unbind(item[0], item[1], item[2]);
            }
          }
        }

        return this.events.unbind(target, name, func);
      },

      /**
       * Fires the specified event name with object on target.
       *
       * @method fire
       * @param {Node/Document/Window} target Target element or object to fire event on.
       * @param {String} name Name of the event to fire.
       * @param {Object} evt Event object to send.
       * @return {Event} Event object.
       */
      fire: function (target, name, evt) {
        return this.events.fire(target, name, evt);
      },

      // Returns the content editable state of a node
      getContentEditable: function (node) {
        var contentEditable;

        // Check type
        if (!node || node.nodeType != 1) {
          return null;
        }

        // Check for fake content editable
        contentEditable = node.getAttribute("data-mce-contenteditable");
        if (contentEditable && contentEditable !== "inherit") {
          return contentEditable;
        }

        // Check for real content editable
        return node.contentEditable !== "inherit" ? node.contentEditable : null;
      },

      getContentEditableParent: function (node) {
        var root = this.getRoot(), state = null;

        for (; node && node !== root; node = node.parentNode) {
          state = this.getContentEditable(node);

          if (state !== null) {
            break;
          }
        }

        return state;
      },

      /**
       * Destroys all internal references to the DOM to solve IE leak issues.
       *
       * @method destroy
       */
      destroy: function () {
        var self = this;

        // Unbind all events bound to window/document by editor instance
        if (self.boundEvents) {
          var i = self.boundEvents.length;

          while (i--) {
            var item = self.boundEvents[i];
            this.events.unbind(item[0], item[1], item[2]);
          }

          self.boundEvents = null;
        }

        // Restore sizzle document to window.document
        // Since the current document might be removed producing "Permission denied" on IE see #6325
        if (Sizzle.setDocument) {
          Sizzle.setDocument();
        }

        self.win = self.doc = self.root = self.events = self.frag = null;
      },

      isChildOf: function (node, parent) {
        while (node) {
          if (parent === node) {
            return true;
          }

          node = node.parentNode;
        }

        return false;
      },

      // #ifdef debug

      dumpRng: function (r) {
        return (
          'startContainer: ' + r.startContainer.nodeName +
          ', startOffset: ' + r.startOffset +
          ', endContainer: ' + r.endContainer.nodeName +
          ', endOffset: ' + r.endOffset
        );
      },

      // #endif

      _findSib: function (node, selector, name) {
        var self = this, func = selector;

        if (node) {
          // If expression make a function of it using is
          if (typeof func == 'string') {
            func = function (node) {
              return self.is(node, selector);
            };
          }

          // Loop all siblings
          for (node = node[name]; node; node = node[name]) {
            if (func(node)) {
              return node;
            }
          }
        }

        return null;
      }
    };

    /**
     * Instance of DOMUtils for the current document.
     *
     * @static
     * @property DOM
     * @type tinymce.dom.DOMUtils
     * @example
     * // Example of how to add a class to some element by id
     * tinymce.DOM.addClass('someid', 'someclass');
     */
    DOMUtils.DOM = new DOMUtils(document);
    DOMUtils.nodeIndex = nodeIndex;

    return DOMUtils;
  }
);

/**
 * ScriptLoader.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*globals console*/

/**
 * This class handles asynchronous/synchronous loading of JavaScript files it will execute callbacks
 * when various items gets loaded. This class is useful to load external JavaScript files.
 *
 * @class tinymce.dom.ScriptLoader
 * @example
 * // Load a script from a specific URL using the global script loader
 * tinymce.ScriptLoader.load('somescript.js');
 *
 * // Load a script using a unique instance of the script loader
 * var scriptLoader = new tinymce.dom.ScriptLoader();
 *
 * scriptLoader.load('somescript.js');
 *
 * // Load multiple scripts
 * var scriptLoader = new tinymce.dom.ScriptLoader();
 *
 * scriptLoader.add('somescript1.js');
 * scriptLoader.add('somescript2.js');
 * scriptLoader.add('somescript3.js');
 *
 * scriptLoader.loadQueue(function() {
 *    alert('All scripts are now loaded.');
 * });
 */
define(
  'tinymce.core.dom.ScriptLoader',
  [
    "tinymce.core.dom.DOMUtils",
    "tinymce.core.util.Tools"
  ],
  function (DOMUtils, Tools) {
    var DOM = DOMUtils.DOM;
    var each = Tools.each, grep = Tools.grep;

    var isFunction = function (f) {
      return typeof f === 'function';
    };

    function ScriptLoader() {
      var QUEUED = 0,
        LOADING = 1,
        LOADED = 2,
        FAILED = 3,
        states = {},
        queue = [],
        scriptLoadedCallbacks = {},
        queueLoadedCallbacks = [],
        loading = 0,
        undef;

      /**
       * Loads a specific script directly without adding it to the load queue.
       *
       * @method load
       * @param {String} url Absolute URL to script to add.
       * @param {function} callback Optional success callback function when the script loaded successfully.
       * @param {function} callback Optional failure callback function when the script failed to load.
       */
      function loadScript(url, success, failure) {
        var dom = DOM, elm, id;

        // Execute callback when script is loaded
        function done() {
          dom.remove(id);

          if (elm) {
            elm.onreadystatechange = elm.onload = elm = null;
          }

          success();
        }

        function error() {
          /*eslint no-console:0 */

          // We can't mark it as done if there is a load error since
          // A) We don't want to produce 404 errors on the server and
          // B) the onerror event won't fire on all browsers.
          // done();

          if (isFunction(failure)) {
            failure();
          } else {
            // Report the error so it's easier for people to spot loading errors
            if (typeof console !== "undefined" && console.log) {
              console.log("Failed to load script: " + url);
            }
          }
        }

        id = dom.uniqueId();

        // Create new script element
        elm = document.createElement('script');
        elm.id = id;
        elm.type = 'text/javascript';
        elm.src = Tools._addCacheSuffix(url);

        // Seems that onreadystatechange works better on IE 10 onload seems to fire incorrectly
        if ("onreadystatechange" in elm) {
          elm.onreadystatechange = function () {
            if (/loaded|complete/.test(elm.readyState)) {
              done();
            }
          };
        } else {
          elm.onload = done;
        }

        // Add onerror event will get fired on some browsers but not all of them
        elm.onerror = error;

        // Add script to document
        (document.getElementsByTagName('head')[0] || document.body).appendChild(elm);
      }

      /**
       * Returns true/false if a script has been loaded or not.
       *
       * @method isDone
       * @param {String} url URL to check for.
       * @return {Boolean} true/false if the URL is loaded.
       */
      this.isDone = function (url) {
        return states[url] == LOADED;
      };

      /**
       * Marks a specific script to be loaded. This can be useful if a script got loaded outside
       * the script loader or to skip it from loading some script.
       *
       * @method markDone
       * @param {string} url Absolute URL to the script to mark as loaded.
       */
      this.markDone = function (url) {
        states[url] = LOADED;
      };

      /**
       * Adds a specific script to the load queue of the script loader.
       *
       * @method add
       * @param {String} url Absolute URL to script to add.
       * @param {function} success Optional success callback function to execute when the script loades successfully.
       * @param {Object} scope Optional scope to execute callback in.
       * @param {function} failure Optional failure callback function to execute when the script failed to load.
       */
      this.add = this.load = function (url, success, scope, failure) {
        var state = states[url];

        // Add url to load queue
        if (state == undef) {
          queue.push(url);
          states[url] = QUEUED;
        }

        if (success) {
          // Store away callback for later execution
          if (!scriptLoadedCallbacks[url]) {
            scriptLoadedCallbacks[url] = [];
          }

          scriptLoadedCallbacks[url].push({
            success: success,
            failure: failure,
            scope: scope || this
          });
        }
      };

      this.remove = function (url) {
        delete states[url];
        delete scriptLoadedCallbacks[url];
      };

      /**
       * Starts the loading of the queue.
       *
       * @method loadQueue
       * @param {function} success Optional callback to execute when all queued items are loaded.
       * @param {function} failure Optional callback to execute when queued items failed to load.
       * @param {Object} scope Optional scope to execute the callback in.
       */
      this.loadQueue = function (success, scope, failure) {
        this.loadScripts(queue, success, scope, failure);
      };

      /**
       * Loads the specified queue of files and executes the callback ones they are loaded.
       * This method is generally not used outside this class but it might be useful in some scenarios.
       *
       * @method loadScripts
       * @param {Array} scripts Array of queue items to load.
       * @param {function} callback Optional callback to execute when scripts is loaded successfully.
       * @param {Object} scope Optional scope to execute callback in.
       * @param {function} callback Optional callback to execute if scripts failed to load.
       */
      this.loadScripts = function (scripts, success, scope, failure) {
        var loadScripts, failures = [];

        function execCallbacks(name, url) {
          // Execute URL callback functions
          each(scriptLoadedCallbacks[url], function (callback) {
            if (isFunction(callback[name])) {
              callback[name].call(callback.scope);
            }
          });

          scriptLoadedCallbacks[url] = undef;
        }

        queueLoadedCallbacks.push({
          success: success,
          failure: failure,
          scope: scope || this
        });

        loadScripts = function () {
          var loadingScripts = grep(scripts);

          // Current scripts has been handled
          scripts.length = 0;

          // Load scripts that needs to be loaded
          each(loadingScripts, function (url) {
            // Script is already loaded then execute script callbacks directly
            if (states[url] === LOADED) {
              execCallbacks('success', url);
              return;
            }

            if (states[url] === FAILED) {
              execCallbacks('failure', url);
              return;
            }

            // Is script not loading then start loading it
            if (states[url] !== LOADING) {
              states[url] = LOADING;
              loading++;

              loadScript(url, function () {
                states[url] = LOADED;
                loading--;

                execCallbacks('success', url);

                // Load more scripts if they where added by the recently loaded script
                loadScripts();
              }, function () {
                states[url] = FAILED;
                loading--;

                failures.push(url);
                execCallbacks('failure', url);

                // Load more scripts if they where added by the recently loaded script
                loadScripts();
              });
            }
          });

          // No scripts are currently loading then execute all pending queue loaded callbacks
          if (!loading) {
            each(queueLoadedCallbacks, function (callback) {
              if (failures.length === 0) {
                if (isFunction(callback.success)) {
                  callback.success.call(callback.scope);
                }
              } else {
                if (isFunction(callback.failure)) {
                  callback.failure.call(callback.scope, failures);
                }
              }
            });

            queueLoadedCallbacks.length = 0;
          }
        };

        loadScripts();
      };
    }

    ScriptLoader.ScriptLoader = new ScriptLoader();

    return ScriptLoader;
  }
);

/**
 * AddOnManager.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class handles the loading of themes/plugins or other add-ons and their language packs.
 *
 * @class tinymce.AddOnManager
 */
define(
  'tinymce.core.AddOnManager',
  [
    "tinymce.core.dom.ScriptLoader",
    "tinymce.core.util.Tools"
  ],
  function (ScriptLoader, Tools) {
    var each = Tools.each;

    function AddOnManager() {
      var self = this;

      self.items = [];
      self.urls = {};
      self.lookup = {};
    }

    AddOnManager.prototype = {
      /**
       * Returns the specified add on by the short name.
       *
       * @method get
       * @param {String} name Add-on to look for.
       * @return {tinymce.Theme/tinymce.Plugin} Theme or plugin add-on instance or undefined.
       */
      get: function (name) {
        if (this.lookup[name]) {
          return this.lookup[name].instance;
        }

        return undefined;
      },

      dependencies: function (name) {
        var result;

        if (this.lookup[name]) {
          result = this.lookup[name].dependencies;
        }

        return result || [];
      },

      /**
       * Loads a language pack for the specified add-on.
       *
       * @method requireLangPack
       * @param {String} name Short name of the add-on.
       * @param {String} languages Optional comma or space separated list of languages to check if it matches the name.
       */
      requireLangPack: function (name, languages) {
        var language = AddOnManager.language;

        if (language && AddOnManager.languageLoad !== false) {
          if (languages) {
            languages = ',' + languages + ',';

            // Load short form sv.js or long form sv_SE.js
            if (languages.indexOf(',' + language.substr(0, 2) + ',') != -1) {
              language = language.substr(0, 2);
            } else if (languages.indexOf(',' + language + ',') == -1) {
              return;
            }
          }

          ScriptLoader.ScriptLoader.add(this.urls[name] + '/langs/' + language + '.js');
        }
      },

      /**
       * Adds a instance of the add-on by it's short name.
       *
       * @method add
       * @param {String} id Short name/id for the add-on.
       * @param {tinymce.Theme/tinymce.Plugin} addOn Theme or plugin to add.
       * @return {tinymce.Theme/tinymce.Plugin} The same theme or plugin instance that got passed in.
       * @example
       * // Create a simple plugin
       * tinymce.create('tinymce.plugins.TestPlugin', {
       *   TestPlugin: function(ed, url) {
       *   ed.on('click', function(e) {
       *      ed.windowManager.alert('Hello World!');
       *   });
       *   }
       * });
       *
       * // Register plugin using the add method
       * tinymce.PluginManager.add('test', tinymce.plugins.TestPlugin);
       *
       * // Initialize TinyMCE
       * tinymce.init({
       *  ...
       *  plugins: '-test' // Init the plugin but don't try to load it
       * });
       */
      add: function (id, addOn, dependencies) {
        this.items.push(addOn);
        this.lookup[id] = { instance: addOn, dependencies: dependencies };

        return addOn;
      },

      remove: function (name) {
        delete this.urls[name];
        delete this.lookup[name];
      },

      createUrl: function (baseUrl, dep) {
        if (typeof dep === "object") {
          return dep;
        }

        return { prefix: baseUrl.prefix, resource: dep, suffix: baseUrl.suffix };
      },

      /**
       * Add a set of components that will make up the add-on. Using the url of the add-on name as the base url.
       * This should be used in development mode.  A new compressor/javascript munger process will ensure that the
       * components are put together into the plugin.js file and compressed correctly.
       *
       * @method addComponents
       * @param {String} pluginName name of the plugin to load scripts from (will be used to get the base url for the plugins).
       * @param {Array} scripts Array containing the names of the scripts to load.
       */
      addComponents: function (pluginName, scripts) {
        var pluginUrl = this.urls[pluginName];

        each(scripts, function (script) {
          ScriptLoader.ScriptLoader.add(pluginUrl + "/" + script);
        });
      },

      /**
       * Loads an add-on from a specific url.
       *
       * @method load
       * @param {String} name Short name of the add-on that gets loaded.
       * @param {String} addOnUrl URL to the add-on that will get loaded.
       * @param {function} success Optional success callback to execute when an add-on is loaded.
       * @param {Object} scope Optional scope to execute the callback in.
       * @param {function} failure Optional failure callback to execute when an add-on failed to load.
       * @example
       * // Loads a plugin from an external URL
       * tinymce.PluginManager.load('myplugin', '/some/dir/someplugin/plugin.js');
       *
       * // Initialize TinyMCE
       * tinymce.init({
       *  ...
       *  plugins: '-myplugin' // Don't try to load it again
       * });
       */
      load: function (name, addOnUrl, success, scope, failure) {
        var self = this, url = addOnUrl;

        function loadDependencies() {
          var dependencies = self.dependencies(name);

          each(dependencies, function (dep) {
            var newUrl = self.createUrl(addOnUrl, dep);

            self.load(newUrl.resource, newUrl, undefined, undefined);
          });

          if (success) {
            if (scope) {
              success.call(scope);
            } else {
              success.call(ScriptLoader);
            }
          }
        }

        if (self.urls[name]) {
          return;
        }

        if (typeof addOnUrl === "object") {
          url = addOnUrl.prefix + addOnUrl.resource + addOnUrl.suffix;
        }

        if (url.indexOf('/') !== 0 && url.indexOf('://') == -1) {
          url = AddOnManager.baseURL + '/' + url;
        }

        self.urls[name] = url.substring(0, url.lastIndexOf('/'));

        if (self.lookup[name]) {
          loadDependencies();
        } else {
          ScriptLoader.ScriptLoader.add(url, loadDependencies, scope, failure);
        }
      }
    };

    AddOnManager.PluginManager = new AddOnManager();
    AddOnManager.ThemeManager = new AddOnManager();

    return AddOnManager;
  }
);

/**
 * TinyMCE theme class.
 *
 * @class tinymce.Theme
 */

/**
 * This method is responsible for rendering/generating the overall user interface with toolbars, buttons, iframe containers etc.
 *
 * @method renderUI
 * @param {Object} obj Object parameter containing the targetNode DOM node that will be replaced visually with an editor instance.
 * @return {Object} an object with items like iframeContainer, editorContainer, sizeContainer, deltaWidth, deltaHeight.
 */

/**
 * Plugin base class, this is a pseudo class that describes how a plugin is to be created for TinyMCE. The methods below are all optional.
 *
 * @class tinymce.Plugin
 * @example
 * tinymce.PluginManager.add('example', function(editor, url) {
 *     // Add a button that opens a window
 *     editor.addButton('example', {
 *         text: 'My button',
 *         icon: false,
 *         onclick: function() {
 *             // Open window
 *             editor.windowManager.open({
 *                 title: 'Example plugin',
 *                 body: [
 *                     {type: 'textbox', name: 'title', label: 'Title'}
 *                 ],
 *                 onsubmit: function(e) {
 *                     // Insert content when the window form is submitted
 *                     editor.insertContent('Title: ' + e.data.title);
 *                 }
 *             });
 *         }
 *     });
 *
 *     // Adds a menu item to the tools menu
 *     editor.addMenuItem('example', {
 *         text: 'Example plugin',
 *         context: 'tools',
 *         onclick: function() {
 *             // Open window with a specific url
 *             editor.windowManager.open({
 *                 title: 'TinyMCE site',
 *                 url: 'http://www.tinymce.com',
 *                 width: 800,
 *                 height: 600,
 *                 buttons: [{
 *                     text: 'Close',
 *                     onclick: 'close'
 *                 }]
 *             });
 *         }
 *     });
 * });
 */

/**
 * NodeType.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * Contains various node validation functions.
 *
 * @private
 * @class tinymce.dom.NodeType
 */
define(
  'tinymce.core.dom.NodeType',
  [
  ],
  function () {
    function isNodeType(type) {
      return function (node) {
        return !!node && node.nodeType == type;
      };
    }

    var isElement = isNodeType(1);

    function matchNodeNames(names) {
      names = names.toLowerCase().split(' ');

      return function (node) {
        var i, name;

        if (node && node.nodeType) {
          name = node.nodeName.toLowerCase();

          for (i = 0; i < names.length; i++) {
            if (name === names[i]) {
              return true;
            }
          }
        }

        return false;
      };
    }

    function matchStyleValues(name, values) {
      values = values.toLowerCase().split(' ');

      return function (node) {
        var i, cssValue;

        if (isElement(node)) {
          for (i = 0; i < values.length; i++) {
            cssValue = node.ownerDocument.defaultView.getComputedStyle(node, null).getPropertyValue(name);
            if (cssValue === values[i]) {
              return true;
            }
          }
        }

        return false;
      };
    }

    function hasPropValue(propName, propValue) {
      return function (node) {
        return isElement(node) && node[propName] === propValue;
      };
    }

    function hasAttribute(attrName, attrValue) {
      return function (node) {
        return isElement(node) && node.hasAttribute(attrName);
      };
    }

    function hasAttributeValue(attrName, attrValue) {
      return function (node) {
        return isElement(node) && node.getAttribute(attrName) === attrValue;
      };
    }

    function isBogus(node) {
      return isElement(node) && node.hasAttribute('data-mce-bogus');
    }

    function hasContentEditableState(value) {
      return function (node) {
        if (isElement(node)) {
          if (node.contentEditable === value) {
            return true;
          }

          if (node.getAttribute('data-mce-contenteditable') === value) {
            return true;
          }
        }

        return false;
      };
    }

    return {
      isText: isNodeType(3),
      isElement: isElement,
      isComment: isNodeType(8),
      isBr: matchNodeNames('br'),
      isContentEditableTrue: hasContentEditableState('true'),
      isContentEditableFalse: hasContentEditableState('false'),
      matchNodeNames: matchNodeNames,
      hasPropValue: hasPropValue,
      hasAttribute: hasAttribute,
      hasAttributeValue: hasAttributeValue,
      matchStyleValues: matchStyleValues,
      isBogus: isBogus
    };
  }
);
/**
 * Zwsp.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * Utility functions for working with zero width space
 * characters used as character containers etc.
 *
 * @private
 * @class tinymce.text.Zwsp
 * @example
 * var isZwsp = Zwsp.isZwsp('\uFEFF');
 * var abc = Zwsp.trim('a\uFEFFc');
 */
define(
  'tinymce.core.text.Zwsp',
  [
  ],
  function () {
    // This is technically not a ZWSP but a ZWNBSP or a BYTE ORDER MARK it used to be a ZWSP
    var ZWSP = '\uFEFF';

    var isZwsp = function (chr) {
      return chr === ZWSP;
    };

    var trim = function (text) {
      return text.replace(new RegExp(ZWSP, 'g'), '');
    };

    return {
      isZwsp: isZwsp,
      ZWSP: ZWSP,
      trim: trim
    };
  }
);
/**
 * CaretContainer.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This module handles caret containers. A caret container is a node that
 * holds the caret for positional purposes.
 *
 * @private
 * @class tinymce.caret.CaretContainer
 */
define(
  'tinymce.core.caret.CaretContainer',
  [
    "tinymce.core.dom.NodeType",
    "tinymce.core.text.Zwsp"
  ],
  function (NodeType, Zwsp) {
    var isElement = NodeType.isElement,
      isText = NodeType.isText;

    function isCaretContainerBlock(node) {
      if (isText(node)) {
        node = node.parentNode;
      }

      return isElement(node) && node.hasAttribute('data-mce-caret');
    }

    function isCaretContainerInline(node) {
      return isText(node) && Zwsp.isZwsp(node.data);
    }

    function isCaretContainer(node) {
      return isCaretContainerBlock(node) || isCaretContainerInline(node);
    }

    var hasContent = function (node) {
      return node.firstChild !== node.lastChild || !NodeType.isBr(node.firstChild);
    };

    function insertInline(node, before) {
      var doc, sibling, textNode, parentNode;

      doc = node.ownerDocument;
      textNode = doc.createTextNode(Zwsp.ZWSP);
      parentNode = node.parentNode;

      if (!before) {
        sibling = node.nextSibling;
        if (isText(sibling)) {
          if (isCaretContainer(sibling)) {
            return sibling;
          }

          if (startsWithCaretContainer(sibling)) {
            sibling.splitText(1);
            return sibling;
          }
        }

        if (node.nextSibling) {
          parentNode.insertBefore(textNode, node.nextSibling);
        } else {
          parentNode.appendChild(textNode);
        }
      } else {
        sibling = node.previousSibling;
        if (isText(sibling)) {
          if (isCaretContainer(sibling)) {
            return sibling;
          }

          if (endsWithCaretContainer(sibling)) {
            return sibling.splitText(sibling.data.length - 1);
          }
        }

        parentNode.insertBefore(textNode, node);
      }

      return textNode;
    }

    var prependInline = function (node) {
      if (NodeType.isText(node)) {
        var data = node.data;
        if (data.length > 0 && data.charAt(0) !== Zwsp.ZWSP) {
          node.insertData(0, Zwsp.ZWSP);
        }
        return node;
      } else {
        return null;
      }
    };

    var appendInline = function (node) {
      if (NodeType.isText(node)) {
        var data = node.data;
        if (data.length > 0 && data.charAt(data.length - 1) !== Zwsp.ZWSP) {
          node.insertData(data.length, Zwsp.ZWSP);
        }
        return node;
      } else {
        return null;
      }
    };

    var isBeforeInline = function (pos) {
      return pos && NodeType.isText(pos.container()) && pos.container().data.charAt(pos.offset()) === Zwsp.ZWSP;
    };

    var isAfterInline = function (pos) {
      return pos && NodeType.isText(pos.container()) && pos.container().data.charAt(pos.offset() - 1) === Zwsp.ZWSP;
    };

    function createBogusBr() {
      var br = document.createElement('br');
      br.setAttribute('data-mce-bogus', '1');
      return br;
    }

    function insertBlock(blockName, node, before) {
      var doc, blockNode, parentNode;

      doc = node.ownerDocument;
      blockNode = doc.createElement(blockName);
      blockNode.setAttribute('data-mce-caret', before ? 'before' : 'after');
      blockNode.setAttribute('data-mce-bogus', 'all');
      blockNode.appendChild(createBogusBr());
      parentNode = node.parentNode;

      if (!before) {
        if (node.nextSibling) {
          parentNode.insertBefore(blockNode, node.nextSibling);
        } else {
          parentNode.appendChild(blockNode);
        }
      } else {
        parentNode.insertBefore(blockNode, node);
      }

      return blockNode;
    }

    function startsWithCaretContainer(node) {
      return isText(node) && node.data[0] == Zwsp.ZWSP;
    }

    function endsWithCaretContainer(node) {
      return isText(node) && node.data[node.data.length - 1] == Zwsp.ZWSP;
    }

    function trimBogusBr(elm) {
      var brs = elm.getElementsByTagName('br');
      var lastBr = brs[brs.length - 1];
      if (NodeType.isBogus(lastBr)) {
        lastBr.parentNode.removeChild(lastBr);
      }
    }

    function showCaretContainerBlock(caretContainer) {
      if (caretContainer && caretContainer.hasAttribute('data-mce-caret')) {
        trimBogusBr(caretContainer);
        caretContainer.removeAttribute('data-mce-caret');
        caretContainer.removeAttribute('data-mce-bogus');
        caretContainer.removeAttribute('style');
        caretContainer.removeAttribute('_moz_abspos');
        return caretContainer;
      }

      return null;
    }

    return {
      isCaretContainer: isCaretContainer,
      isCaretContainerBlock: isCaretContainerBlock,
      isCaretContainerInline: isCaretContainerInline,
      showCaretContainerBlock: showCaretContainerBlock,
      insertInline: insertInline,
      prependInline: prependInline,
      appendInline: appendInline,
      isBeforeInline: isBeforeInline,
      isAfterInline: isAfterInline,
      insertBlock: insertBlock,
      hasContent: hasContent,
      startsWithCaretContainer: startsWithCaretContainer,
      endsWithCaretContainer: endsWithCaretContainer
    };
  }
);
/**
 * RangeUtils.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class contains a few utility methods for ranges.
 *
 * @class tinymce.dom.RangeUtils
 */
define(
  'tinymce.core.dom.RangeUtils',
  [
    "tinymce.core.util.Tools",
    "tinymce.core.dom.TreeWalker",
    "tinymce.core.dom.NodeType",
    "tinymce.core.dom.Range",
    "tinymce.core.caret.CaretContainer"
  ],
  function (Tools, TreeWalker, NodeType, Range, CaretContainer) {
    var each = Tools.each,
      isContentEditableTrue = NodeType.isContentEditableTrue,
      isContentEditableFalse = NodeType.isContentEditableFalse,
      isCaretContainer = CaretContainer.isCaretContainer;

    function hasCeProperty(node) {
      return isContentEditableTrue(node) || isContentEditableFalse(node);
    }

    function getEndChild(container, index) {
      var childNodes = container.childNodes;

      index--;

      if (index > childNodes.length - 1) {
        index = childNodes.length - 1;
      } else if (index < 0) {
        index = 0;
      }

      return childNodes[index] || container;
    }

    function findParent(node, rootNode, predicate) {
      while (node && node !== rootNode) {
        if (predicate(node)) {
          return node;
        }

        node = node.parentNode;
      }

      return null;
    }

    function hasParent(node, rootNode, predicate) {
      return findParent(node, rootNode, predicate) !== null;
    }

    function hasParentWithName(node, rootNode, name) {
      return hasParent(node, rootNode, function (node) {
        return node.nodeName === name;
      });
    }

    function isFormatterCaret(node) {
      return node.id === '_mce_caret';
    }

    function isCeFalseCaretContainer(node, rootNode) {
      return isCaretContainer(node) && hasParent(node, rootNode, isFormatterCaret) === false;
    }

    function RangeUtils(dom) {
      /**
       * Walks the specified range like object and executes the callback for each sibling collection it finds.
       *
       * @private
       * @method walk
       * @param {Object} rng Range like object.
       * @param {function} callback Callback function to execute for each sibling collection.
       */
      this.walk = function (rng, callback) {
        var startContainer = rng.startContainer,
          startOffset = rng.startOffset,
          endContainer = rng.endContainer,
          endOffset = rng.endOffset,
          ancestor, startPoint,
          endPoint, node, parent, siblings, nodes;

        // Handle table cell selection the table plugin enables
        // you to fake select table cells and perform formatting actions on them
        nodes = dom.select('td[data-mce-selected],th[data-mce-selected]');
        if (nodes.length > 0) {
          each(nodes, function (node) {
            callback([node]);
          });

          return;
        }

        /**
         * Excludes start/end text node if they are out side the range
         *
         * @private
         * @param {Array} nodes Nodes to exclude items from.
         * @return {Array} Array with nodes excluding the start/end container if needed.
         */
        function exclude(nodes) {
          var node;

          // First node is excluded
          node = nodes[0];
          if (node.nodeType === 3 && node === startContainer && startOffset >= node.nodeValue.length) {
            nodes.splice(0, 1);
          }

          // Last node is excluded
          node = nodes[nodes.length - 1];
          if (endOffset === 0 && nodes.length > 0 && node === endContainer && node.nodeType === 3) {
            nodes.splice(nodes.length - 1, 1);
          }

          return nodes;
        }

        /**
         * Collects siblings
         *
         * @private
         * @param {Node} node Node to collect siblings from.
         * @param {String} name Name of the sibling to check for.
         * @param {Node} endNode
         * @return {Array} Array of collected siblings.
         */
        function collectSiblings(node, name, endNode) {
          var siblings = [];

          for (; node && node != endNode; node = node[name]) {
            siblings.push(node);
          }

          return siblings;
        }

        /**
         * Find an end point this is the node just before the common ancestor root.
         *
         * @private
         * @param {Node} node Node to start at.
         * @param {Node} root Root/ancestor element to stop just before.
         * @return {Node} Node just before the root element.
         */
        function findEndPoint(node, root) {
          do {
            if (node.parentNode == root) {
              return node;
            }

            node = node.parentNode;
          } while (node);
        }

        function walkBoundary(startNode, endNode, next) {
          var siblingName = next ? 'nextSibling' : 'previousSibling';

          for (node = startNode, parent = node.parentNode; node && node != endNode; node = parent) {
            parent = node.parentNode;
            siblings = collectSiblings(node == startNode ? node : node[siblingName], siblingName);

            if (siblings.length) {
              if (!next) {
                siblings.reverse();
              }

              callback(exclude(siblings));
            }
          }
        }

        // If index based start position then resolve it
        if (startContainer.nodeType == 1 && startContainer.hasChildNodes()) {
          startContainer = startContainer.childNodes[startOffset];
        }

        // If index based end position then resolve it
        if (endContainer.nodeType == 1 && endContainer.hasChildNodes()) {
          endContainer = getEndChild(endContainer, endOffset);
        }

        // Same container
        if (startContainer == endContainer) {
          return callback(exclude([startContainer]));
        }

        // Find common ancestor and end points
        ancestor = dom.findCommonAncestor(startContainer, endContainer);

        // Process left side
        for (node = startContainer; node; node = node.parentNode) {
          if (node === endContainer) {
            return walkBoundary(startContainer, ancestor, true);
          }

          if (node === ancestor) {
            break;
          }
        }

        // Process right side
        for (node = endContainer; node; node = node.parentNode) {
          if (node === startContainer) {
            return walkBoundary(endContainer, ancestor);
          }

          if (node === ancestor) {
            break;
          }
        }

        // Find start/end point
        startPoint = findEndPoint(startContainer, ancestor) || startContainer;
        endPoint = findEndPoint(endContainer, ancestor) || endContainer;

        // Walk left leaf
        walkBoundary(startContainer, startPoint, true);

        // Walk the middle from start to end point
        siblings = collectSiblings(
          startPoint == startContainer ? startPoint : startPoint.nextSibling,
          'nextSibling',
          endPoint == endContainer ? endPoint.nextSibling : endPoint
        );

        if (siblings.length) {
          callback(exclude(siblings));
        }

        // Walk right leaf
        walkBoundary(endContainer, endPoint);
      };

      /**
       * Splits the specified range at it's start/end points.
       *
       * @private
       * @param {Range/RangeObject} rng Range to split.
       * @return {Object} Range position object.
       */
      this.split = function (rng) {
        var startContainer = rng.startContainer,
          startOffset = rng.startOffset,
          endContainer = rng.endContainer,
          endOffset = rng.endOffset;

        function splitText(node, offset) {
          return node.splitText(offset);
        }

        // Handle single text node
        if (startContainer == endContainer && startContainer.nodeType == 3) {
          if (startOffset > 0 && startOffset < startContainer.nodeValue.length) {
            endContainer = splitText(startContainer, startOffset);
            startContainer = endContainer.previousSibling;

            if (endOffset > startOffset) {
              endOffset = endOffset - startOffset;
              startContainer = endContainer = splitText(endContainer, endOffset).previousSibling;
              endOffset = endContainer.nodeValue.length;
              startOffset = 0;
            } else {
              endOffset = 0;
            }
          }
        } else {
          // Split startContainer text node if needed
          if (startContainer.nodeType == 3 && startOffset > 0 && startOffset < startContainer.nodeValue.length) {
            startContainer = splitText(startContainer, startOffset);
            startOffset = 0;
          }

          // Split endContainer text node if needed
          if (endContainer.nodeType == 3 && endOffset > 0 && endOffset < endContainer.nodeValue.length) {
            endContainer = splitText(endContainer, endOffset).previousSibling;
            endOffset = endContainer.nodeValue.length;
          }
        }

        return {
          startContainer: startContainer,
          startOffset: startOffset,
          endContainer: endContainer,
          endOffset: endOffset
        };
      };

      /**
       * Normalizes the specified range by finding the closest best suitable caret location.
       *
       * @private
       * @param {Range} rng Range to normalize.
       * @return {Boolean} True/false if the specified range was normalized or not.
       */
      this.normalize = function (rng) {
        var normalized = false, collapsed;

        function normalizeEndPoint(start) {
          var container, offset, walker, body = dom.getRoot(), node, nonEmptyElementsMap;
          var directionLeft, isAfterNode;

          function isTableCell(node) {
            return node && /^(TD|TH|CAPTION)$/.test(node.nodeName);
          }

          function hasBrBeforeAfter(node, left) {
            var walker = new TreeWalker(node, dom.getParent(node.parentNode, dom.isBlock) || body);

            while ((node = walker[left ? 'prev' : 'next']())) {
              if (node.nodeName === "BR") {
                return true;
              }
            }
          }

          function hasContentEditableFalseParent(node) {
            while (node && node != body) {
              if (isContentEditableFalse(node)) {
                return true;
              }

              node = node.parentNode;
            }

            return false;
          }

          function isPrevNode(node, name) {
            return node.previousSibling && node.previousSibling.nodeName == name;
          }

          // Walks the dom left/right to find a suitable text node to move the endpoint into
          // It will only walk within the current parent block or body and will stop if it hits a block or a BR/IMG
          function findTextNodeRelative(left, startNode) {
            var walker, lastInlineElement, parentBlockContainer;

            startNode = startNode || container;
            parentBlockContainer = dom.getParent(startNode.parentNode, dom.isBlock) || body;

            // Lean left before the BR element if it's the only BR within a block element. Gecko bug: #6680
            // This: <p><br>|</p> becomes <p>|<br></p>
            if (left && startNode.nodeName == 'BR' && isAfterNode && dom.isEmpty(parentBlockContainer)) {
              container = startNode.parentNode;
              offset = dom.nodeIndex(startNode);
              normalized = true;
              return;
            }

            // Walk left until we hit a text node we can move to or a block/br/img
            walker = new TreeWalker(startNode, parentBlockContainer);
            while ((node = walker[left ? 'prev' : 'next']())) {
              // Break if we hit a non content editable node
              if (dom.getContentEditableParent(node) === "false" || isCeFalseCaretContainer(node, dom.getRoot())) {
                return;
              }

              // Found text node that has a length
              if (node.nodeType === 3 && node.nodeValue.length > 0) {
                if (hasParentWithName(node, body, 'A') === false) {
                  container = node;
                  offset = left ? node.nodeValue.length : 0;
                  normalized = true;
                }

                return;
              }

              // Break if we find a block or a BR/IMG/INPUT etc
              if (dom.isBlock(node) || nonEmptyElementsMap[node.nodeName.toLowerCase()]) {
                return;
              }

              lastInlineElement = node;
            }

            // Only fetch the last inline element when in caret mode for now
            if (collapsed && lastInlineElement) {
              container = lastInlineElement;
              normalized = true;
              offset = 0;
            }
          }

          container = rng[(start ? 'start' : 'end') + 'Container'];
          offset = rng[(start ? 'start' : 'end') + 'Offset'];
          isAfterNode = container.nodeType == 1 && offset === container.childNodes.length;
          nonEmptyElementsMap = dom.schema.getNonEmptyElements();
          directionLeft = start;

          if (isCaretContainer(container)) {
            return;
          }

          if (container.nodeType == 1 && offset > container.childNodes.length - 1) {
            directionLeft = false;
          }

          // If the container is a document move it to the body element
          if (container.nodeType === 9) {
            container = dom.getRoot();
            offset = 0;
          }

          // If the container is body try move it into the closest text node or position
          if (container === body) {
            // If start is before/after a image, table etc
            if (directionLeft) {
              node = container.childNodes[offset > 0 ? offset - 1 : 0];
              if (node) {
                if (isCaretContainer(node)) {
                  return;
                }

                if (nonEmptyElementsMap[node.nodeName] || node.nodeName == "TABLE") {
                  return;
                }
              }
            }

            // Resolve the index
            if (container.hasChildNodes()) {
              offset = Math.min(!directionLeft && offset > 0 ? offset - 1 : offset, container.childNodes.length - 1);
              container = container.childNodes[offset];
              offset = 0;

              // Don't normalize non collapsed selections like <p>[a</p><table></table>]
              if (!collapsed && container === body.lastChild && container.nodeName === 'TABLE') {
                return;
              }

              if (hasContentEditableFalseParent(container) || isCaretContainer(container)) {
                return;
              }

              // Don't walk into elements that doesn't have any child nodes like a IMG
              if (container.hasChildNodes() && !/TABLE/.test(container.nodeName)) {
                // Walk the DOM to find a text node to place the caret at or a BR
                node = container;
                walker = new TreeWalker(container, body);

                do {
                  if (isContentEditableFalse(node) || isCaretContainer(node)) {
                    normalized = false;
                    break;
                  }

                  // Found a text node use that position
                  if (node.nodeType === 3 && node.nodeValue.length > 0) {
                    offset = directionLeft ? 0 : node.nodeValue.length;
                    container = node;
                    normalized = true;
                    break;
                  }

                  // Found a BR/IMG element that we can place the caret before
                  if (nonEmptyElementsMap[node.nodeName.toLowerCase()] && !isTableCell(node)) {
                    offset = dom.nodeIndex(node);
                    container = node.parentNode;

                    // Put caret after image when moving the end point
                    if (node.nodeName == "IMG" && !directionLeft) {
                      offset++;
                    }

                    normalized = true;
                    break;
                  }
                } while ((node = (directionLeft ? walker.next() : walker.prev())));
              }
            }
          }

          // Lean the caret to the left if possible
          if (collapsed) {
            // So this: <b>x</b><i>|x</i>
            // Becomes: <b>x|</b><i>x</i>
            // Seems that only gecko has issues with this
            if (container.nodeType === 3 && offset === 0) {
              findTextNodeRelative(true);
            }

            // Lean left into empty inline elements when the caret is before a BR
            // So this: <i><b></b><i>|<br></i>
            // Becomes: <i><b>|</b><i><br></i>
            // Seems that only gecko has issues with this.
            // Special edge case for <p><a>x</a>|<br></p> since we don't want <p><a>x|</a><br></p>
            if (container.nodeType === 1) {
              node = container.childNodes[offset];

              // Offset is after the containers last child
              // then use the previous child for normalization
              if (!node) {
                node = container.childNodes[offset - 1];
              }

              if (node && node.nodeName === 'BR' && !isPrevNode(node, 'A') &&
                !hasBrBeforeAfter(node) && !hasBrBeforeAfter(node, true)) {
                findTextNodeRelative(true, node);
              }
            }
          }

          // Lean the start of the selection right if possible
          // So this: x[<b>x]</b>
          // Becomes: x<b>[x]</b>
          if (directionLeft && !collapsed && container.nodeType === 3 && offset === container.nodeValue.length) {
            findTextNodeRelative(false);
          }

          // Set endpoint if it was normalized
          if (normalized) {
            rng['set' + (start ? 'Start' : 'End')](container, offset);
          }
        }

        collapsed = rng.collapsed;

        normalizeEndPoint(true);

        if (!collapsed) {
          normalizeEndPoint();
        }

        // If it was collapsed then make sure it still is
        if (normalized && collapsed) {
          rng.collapse(true);
        }

        return normalized;
      };
    }

    /**
     * Compares two ranges and checks if they are equal.
     *
     * @static
     * @method compareRanges
     * @param {DOMRange} rng1 First range to compare.
     * @param {DOMRange} rng2 First range to compare.
     * @return {Boolean} true/false if the ranges are equal.
     */
    RangeUtils.compareRanges = function (rng1, rng2) {
      if (rng1 && rng2) {
        // Compare native IE ranges
        if (rng1.item || rng1.duplicate) {
          // Both are control ranges and the selected element matches
          if (rng1.item && rng2.item && rng1.item(0) === rng2.item(0)) {
            return true;
          }

          // Both are text ranges and the range matches
          if (rng1.isEqual && rng2.isEqual && rng2.isEqual(rng1)) {
            return true;
          }
        } else {
          // Compare w3c ranges
          return rng1.startContainer == rng2.startContainer && rng1.startOffset == rng2.startOffset;
        }
      }

      return false;
    };

    /**
     * Finds the closest selection rect tries to get the range from that.
     */
    function findClosestIeRange(clientX, clientY, doc) {
      var element, rng, rects;

      element = doc.elementFromPoint(clientX, clientY);
      rng = doc.body.createTextRange();

      if (!element || element.tagName == 'HTML') {
        element = doc.body;
      }

      rng.moveToElementText(element);
      rects = Tools.toArray(rng.getClientRects());

      rects = rects.sort(function (a, b) {
        a = Math.abs(Math.max(a.top - clientY, a.bottom - clientY));
        b = Math.abs(Math.max(b.top - clientY, b.bottom - clientY));

        return a - b;
      });

      if (rects.length > 0) {
        clientY = (rects[0].bottom + rects[0].top) / 2;

        try {
          rng.moveToPoint(clientX, clientY);
          rng.collapse(true);

          return rng;
        } catch (ex) {
          // At least we tried
        }
      }

      return null;
    }

    function moveOutOfContentEditableFalse(rng, rootNode) {
      var parentElement = rng && rng.parentElement ? rng.parentElement() : null;
      return isContentEditableFalse(findParent(parentElement, rootNode, hasCeProperty)) ? null : rng;
    }

    /**
     * Gets the caret range for the given x/y location.
     *
     * @static
     * @method getCaretRangeFromPoint
     * @param {Number} clientX X coordinate for range
     * @param {Number} clientY Y coordinate for range
     * @param {Document} doc Document that x/y are relative to
     * @returns {Range} caret range
     */
    RangeUtils.getCaretRangeFromPoint = function (clientX, clientY, doc) {
      var rng, point;

      if (doc.caretPositionFromPoint) {
        point = doc.caretPositionFromPoint(clientX, clientY);
        rng = doc.createRange();
        rng.setStart(point.offsetNode, point.offset);
        rng.collapse(true);
      } else if (doc.caretRangeFromPoint) {
        rng = doc.caretRangeFromPoint(clientX, clientY);
      } else if (doc.body.createTextRange) {
        rng = doc.body.createTextRange();

        try {
          rng.moveToPoint(clientX, clientY);
          rng.collapse(true);
        } catch (ex) {
          rng = findClosestIeRange(clientX, clientY, doc);
        }

        return moveOutOfContentEditableFalse(rng, doc.body);
      }

      return rng;
    };

    RangeUtils.getSelectedNode = function (range) {
      var startContainer = range.startContainer,
        startOffset = range.startOffset;

      if (startContainer.hasChildNodes() && range.endOffset == startOffset + 1) {
        return startContainer.childNodes[startOffset];
      }

      return null;
    };

    RangeUtils.getNode = function (container, offset) {
      if (container.nodeType == 1 && container.hasChildNodes()) {
        if (offset >= container.childNodes.length) {
          offset = container.childNodes.length - 1;
        }

        container = container.childNodes[offset];
      }

      return container;
    };

    return RangeUtils;
  }
);

/**
 * Node.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class is a minimalistic implementation of a DOM like node used by the DomParser class.
 *
 * @example
 * var node = new tinymce.html.Node('strong', 1);
 * someRoot.append(node);
 *
 * @class tinymce.html.Node
 * @version 3.4
 */
define(
  'tinymce.core.html.Node',
  [
  ],
  function () {
    var whiteSpaceRegExp = /^[ \t\r\n]*$/;
    var typeLookup = {
      '#text': 3,
      '#comment': 8,
      '#cdata': 4,
      '#pi': 7,
      '#doctype': 10,
      '#document-fragment': 11
    };

    // Walks the tree left/right
    function walk(node, rootNode, prev) {
      var sibling, parent, startName = prev ? 'lastChild' : 'firstChild', siblingName = prev ? 'prev' : 'next';

      // Walk into nodes if it has a start
      if (node[startName]) {
        return node[startName];
      }

      // Return the sibling if it has one
      if (node !== rootNode) {
        sibling = node[siblingName];

        if (sibling) {
          return sibling;
        }

        // Walk up the parents to look for siblings
        for (parent = node.parent; parent && parent !== rootNode; parent = parent.parent) {
          sibling = parent[siblingName];

          if (sibling) {
            return sibling;
          }
        }
      }
    }

    /**
     * Constructs a new Node instance.
     *
     * @constructor
     * @method Node
     * @param {String} name Name of the node type.
     * @param {Number} type Numeric type representing the node.
     */
    function Node(name, type) {
      this.name = name;
      this.type = type;

      if (type === 1) {
        this.attributes = [];
        this.attributes.map = {};
      }
    }

    Node.prototype = {
      /**
       * Replaces the current node with the specified one.
       *
       * @example
       * someNode.replace(someNewNode);
       *
       * @method replace
       * @param {tinymce.html.Node} node Node to replace the current node with.
       * @return {tinymce.html.Node} The old node that got replaced.
       */
      replace: function (node) {
        var self = this;

        if (node.parent) {
          node.remove();
        }

        self.insert(node, self);
        self.remove();

        return self;
      },

      /**
       * Gets/sets or removes an attribute by name.
       *
       * @example
       * someNode.attr("name", "value"); // Sets an attribute
       * console.log(someNode.attr("name")); // Gets an attribute
       * someNode.attr("name", null); // Removes an attribute
       *
       * @method attr
       * @param {String} name Attribute name to set or get.
       * @param {String} value Optional value to set.
       * @return {String/tinymce.html.Node} String or undefined on a get operation or the current node on a set operation.
       */
      attr: function (name, value) {
        var self = this, attrs, i, undef;

        if (typeof name !== "string") {
          for (i in name) {
            self.attr(i, name[i]);
          }

          return self;
        }

        if ((attrs = self.attributes)) {
          if (value !== undef) {
            // Remove attribute
            if (value === null) {
              if (name in attrs.map) {
                delete attrs.map[name];

                i = attrs.length;
                while (i--) {
                  if (attrs[i].name === name) {
                    attrs = attrs.splice(i, 1);
                    return self;
                  }
                }
              }

              return self;
            }

            // Set attribute
            if (name in attrs.map) {
              // Set attribute
              i = attrs.length;
              while (i--) {
                if (attrs[i].name === name) {
                  attrs[i].value = value;
                  break;
                }
              }
            } else {
              attrs.push({ name: name, value: value });
            }

            attrs.map[name] = value;

            return self;
          }

          return attrs.map[name];
        }
      },

      /**
       * Does a shallow clones the node into a new node. It will also exclude id attributes since
       * there should only be one id per document.
       *
       * @example
       * var clonedNode = node.clone();
       *
       * @method clone
       * @return {tinymce.html.Node} New copy of the original node.
       */
      clone: function () {
        var self = this, clone = new Node(self.name, self.type), i, l, selfAttrs, selfAttr, cloneAttrs;

        // Clone element attributes
        if ((selfAttrs = self.attributes)) {
          cloneAttrs = [];
          cloneAttrs.map = {};

          for (i = 0, l = selfAttrs.length; i < l; i++) {
            selfAttr = selfAttrs[i];

            // Clone everything except id
            if (selfAttr.name !== 'id') {
              cloneAttrs[cloneAttrs.length] = { name: selfAttr.name, value: selfAttr.value };
              cloneAttrs.map[selfAttr.name] = selfAttr.value;
            }
          }

          clone.attributes = cloneAttrs;
        }

        clone.value = self.value;
        clone.shortEnded = self.shortEnded;

        return clone;
      },

      /**
       * Wraps the node in in another node.
       *
       * @example
       * node.wrap(wrapperNode);
       *
       * @method wrap
       */
      wrap: function (wrapper) {
        var self = this;

        self.parent.insert(wrapper, self);
        wrapper.append(self);

        return self;
      },

      /**
       * Unwraps the node in other words it removes the node but keeps the children.
       *
       * @example
       * node.unwrap();
       *
       * @method unwrap
       */
      unwrap: function () {
        var self = this, node, next;

        for (node = self.firstChild; node;) {
          next = node.next;
          self.insert(node, self, true);
          node = next;
        }

        self.remove();
      },

      /**
       * Removes the node from it's parent.
       *
       * @example
       * node.remove();
       *
       * @method remove
       * @return {tinymce.html.Node} Current node that got removed.
       */
      remove: function () {
        var self = this, parent = self.parent, next = self.next, prev = self.prev;

        if (parent) {
          if (parent.firstChild === self) {
            parent.firstChild = next;

            if (next) {
              next.prev = null;
            }
          } else {
            prev.next = next;
          }

          if (parent.lastChild === self) {
            parent.lastChild = prev;

            if (prev) {
              prev.next = null;
            }
          } else {
            next.prev = prev;
          }

          self.parent = self.next = self.prev = null;
        }

        return self;
      },

      /**
       * Appends a new node as a child of the current node.
       *
       * @example
       * node.append(someNode);
       *
       * @method append
       * @param {tinymce.html.Node} node Node to append as a child of the current one.
       * @return {tinymce.html.Node} The node that got appended.
       */
      append: function (node) {
        var self = this, last;

        if (node.parent) {
          node.remove();
        }

        last = self.lastChild;
        if (last) {
          last.next = node;
          node.prev = last;
          self.lastChild = node;
        } else {
          self.lastChild = self.firstChild = node;
        }

        node.parent = self;

        return node;
      },

      /**
       * Inserts a node at a specific position as a child of the current node.
       *
       * @example
       * parentNode.insert(newChildNode, oldChildNode);
       *
       * @method insert
       * @param {tinymce.html.Node} node Node to insert as a child of the current node.
       * @param {tinymce.html.Node} refNode Reference node to set node before/after.
       * @param {Boolean} before Optional state to insert the node before the reference node.
       * @return {tinymce.html.Node} The node that got inserted.
       */
      insert: function (node, refNode, before) {
        var parent;

        if (node.parent) {
          node.remove();
        }

        parent = refNode.parent || this;

        if (before) {
          if (refNode === parent.firstChild) {
            parent.firstChild = node;
          } else {
            refNode.prev.next = node;
          }

          node.prev = refNode.prev;
          node.next = refNode;
          refNode.prev = node;
        } else {
          if (refNode === parent.lastChild) {
            parent.lastChild = node;
          } else {
            refNode.next.prev = node;
          }

          node.next = refNode.next;
          node.prev = refNode;
          refNode.next = node;
        }

        node.parent = parent;

        return node;
      },

      /**
       * Get all children by name.
       *
       * @method getAll
       * @param {String} name Name of the child nodes to collect.
       * @return {Array} Array with child nodes matchin the specified name.
       */
      getAll: function (name) {
        var self = this, node, collection = [];

        for (node = self.firstChild; node; node = walk(node, self)) {
          if (node.name === name) {
            collection.push(node);
          }
        }

        return collection;
      },

      /**
       * Removes all children of the current node.
       *
       * @method empty
       * @return {tinymce.html.Node} The current node that got cleared.
       */
      empty: function () {
        var self = this, nodes, i, node;

        // Remove all children
        if (self.firstChild) {
          nodes = [];

          // Collect the children
          for (node = self.firstChild; node; node = walk(node, self)) {
            nodes.push(node);
          }

          // Remove the children
          i = nodes.length;
          while (i--) {
            node = nodes[i];
            node.parent = node.firstChild = node.lastChild = node.next = node.prev = null;
          }
        }

        self.firstChild = self.lastChild = null;

        return self;
      },

      /**
       * Returns true/false if the node is to be considered empty or not.
       *
       * @example
       * node.isEmpty({img: true});
       * @method isEmpty
       * @param {Object} elements Name/value object with elements that are automatically treated as non empty elements.
       * @param {Object} whitespace Name/value object with elements that are automatically treated whitespace preservables.
       * @return {Boolean} true/false if the node is empty or not.
       */
      isEmpty: function (elements, whitespace) {
        var self = this, node = self.firstChild, i, name;

        whitespace = whitespace || {};

        if (node) {
          do {
            if (node.type === 1) {
              // Ignore bogus elements
              if (node.attributes.map['data-mce-bogus']) {
                continue;
              }

              // Keep empty elements like <img />
              if (elements[node.name]) {
                return false;
              }

              // Keep bookmark nodes and name attribute like <a name="1"></a>
              i = node.attributes.length;
              while (i--) {
                name = node.attributes[i].name;
                if (name === "name" || name.indexOf('data-mce-bookmark') === 0) {
                  return false;
                }
              }
            }

            // Keep comments
            if (node.type === 8) {
              return false;
            }

            // Keep non whitespace text nodes
            if (node.type === 3 && !whiteSpaceRegExp.test(node.value)) {
              return false;
            }

            // Keep whitespace preserve elements
            if (node.type === 3 && node.parent && whitespace[node.parent.name] && whiteSpaceRegExp.test(node.value)) {
              return false;
            }
          } while ((node = walk(node, self)));
        }

        return true;
      },

      /**
       * Walks to the next or previous node and returns that node or null if it wasn't found.
       *
       * @method walk
       * @param {Boolean} prev Optional previous node state defaults to false.
       * @return {tinymce.html.Node} Node that is next to or previous of the current node.
       */
      walk: function (prev) {
        return walk(this, null, prev);
      }
    };

    /**
     * Creates a node of a specific type.
     *
     * @static
     * @method create
     * @param {String} name Name of the node type to create for example "b" or "#text".
     * @param {Object} attrs Name/value collection of attributes that will be applied to elements.
     */
    Node.create = function (name, attrs) {
      var node, attrName;

      // Create node
      node = new Node(name, typeLookup[name] || 1);

      // Add attributes if needed
      if (attrs) {
        for (attrName in attrs) {
          node.attr(attrName, attrs[attrName]);
        }
      }

      return node;
    };

    return Node;
  }
);

/**
 * SaxParser.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*eslint max-depth:[2, 9] */

/**
 * This class parses HTML code using pure JavaScript and executes various events for each item it finds. It will
 * always execute the events in the right order for tag soup code like <b><p></b></p>. It will also remove elements
 * and attributes that doesn't fit the schema if the validate setting is enabled.
 *
 * @example
 * var parser = new tinymce.html.SaxParser({
 *     validate: true,
 *
 *     comment: function(text) {
 *         console.log('Comment:', text);
 *     },
 *
 *     cdata: function(text) {
 *         console.log('CDATA:', text);
 *     },
 *
 *     text: function(text, raw) {
 *         console.log('Text:', text, 'Raw:', raw);
 *     },
 *
 *     start: function(name, attrs, empty) {
 *         console.log('Start:', name, attrs, empty);
 *     },
 *
 *     end: function(name) {
 *         console.log('End:', name);
 *     },
 *
 *     pi: function(name, text) {
 *         console.log('PI:', name, text);
 *     },
 *
 *     doctype: function(text) {
 *         console.log('DocType:', text);
 *     }
 * }, schema);
 * @class tinymce.html.SaxParser
 * @version 3.4
 */
define(
  'tinymce.core.html.SaxParser',
  [
    "tinymce.core.html.Schema",
    "tinymce.core.html.Entities",
    "tinymce.core.util.Tools"
  ],
  function (Schema, Entities, Tools) {
    var each = Tools.each;

    var isValidPrefixAttrName = function (name) {
      return name.indexOf('data-') === 0 || name.indexOf('aria-') === 0;
    };

    var trimComments = function (text) {
      return text.replace(/<!--|-->/g, '');
    };

    /**
     * Returns the index of the end tag for a specific start tag. This can be
     * used to skip all children of a parent element from being processed.
     *
     * @private
     * @method findEndTag
     * @param {tinymce.html.Schema} schema Schema instance to use to match short ended elements.
     * @param {String} html HTML string to find the end tag in.
     * @param {Number} startIndex Indext to start searching at should be after the start tag.
     * @return {Number} Index of the end tag.
     */
    function findEndTag(schema, html, startIndex) {
      var count = 1, index, matches, tokenRegExp, shortEndedElements;

      shortEndedElements = schema.getShortEndedElements();
      tokenRegExp = /<([!?\/])?([A-Za-z0-9\-_\:\.]+)((?:\s+[^"\'>]+(?:(?:"[^"]*")|(?:\'[^\']*\')|[^>]*))*|\/|\s+)>/g;
      tokenRegExp.lastIndex = index = startIndex;

      while ((matches = tokenRegExp.exec(html))) {
        index = tokenRegExp.lastIndex;

        if (matches[1] === '/') { // End element
          count--;
        } else if (!matches[1]) { // Start element
          if (matches[2] in shortEndedElements) {
            continue;
          }

          count++;
        }

        if (count === 0) {
          break;
        }
      }

      return index;
    }

    /**
     * Constructs a new SaxParser instance.
     *
     * @constructor
     * @method SaxParser
     * @param {Object} settings Name/value collection of settings. comment, cdata, text, start and end are callbacks.
     * @param {tinymce.html.Schema} schema HTML Schema class to use when parsing.
     */
    function SaxParser(settings, schema) {
      var self = this;

      function noop() { }

      settings = settings || {};
      self.schema = schema = schema || new Schema();

      if (settings.fix_self_closing !== false) {
        settings.fix_self_closing = true;
      }

      // Add handler functions from settings and setup default handlers
      each('comment cdata text start end pi doctype'.split(' '), function (name) {
        if (name) {
          self[name] = settings[name] || noop;
        }
      });

      /**
       * Parses the specified HTML string and executes the callbacks for each item it finds.
       *
       * @example
       * new SaxParser({...}).parse('<b>text</b>');
       * @method parse
       * @param {String} html Html string to sax parse.
       */
      self.parse = function (html) {
        var self = this, matches, index = 0, value, endRegExp, stack = [], attrList, i, text, name;
        var isInternalElement, removeInternalElements, shortEndedElements, fillAttrsMap, isShortEnded;
        var validate, elementRule, isValidElement, attr, attribsValue, validAttributesMap, validAttributePatterns;
        var attributesRequired, attributesDefault, attributesForced, processHtml;
        var anyAttributesRequired, selfClosing, tokenRegExp, attrRegExp, specialElements, attrValue, idCount = 0;
        var decode = Entities.decode, fixSelfClosing, filteredUrlAttrs = Tools.makeMap('src,href,data,background,formaction,poster');
        var scriptUriRegExp = /((java|vb)script|mhtml):/i, dataUriRegExp = /^data:/i;

        function processEndTag(name) {
          var pos, i;

          // Find position of parent of the same type
          pos = stack.length;
          while (pos--) {
            if (stack[pos].name === name) {
              break;
            }
          }

          // Found parent
          if (pos >= 0) {
            // Close all the open elements
            for (i = stack.length - 1; i >= pos; i--) {
              name = stack[i];

              if (name.valid) {
                self.end(name.name);
              }
            }

            // Remove the open elements from the stack
            stack.length = pos;
          }
        }

        function parseAttribute(match, name, value, val2, val3) {
          var attrRule, i, trimRegExp = /[\s\u0000-\u001F]+/g;

          name = name.toLowerCase();
          value = name in fillAttrsMap ? name : decode(value || val2 || val3 || ''); // Handle boolean attribute than value attribute

          // Validate name and value pass through all data- attributes
          if (validate && !isInternalElement && isValidPrefixAttrName(name) === false) {
            attrRule = validAttributesMap[name];

            // Find rule by pattern matching
            if (!attrRule && validAttributePatterns) {
              i = validAttributePatterns.length;
              while (i--) {
                attrRule = validAttributePatterns[i];
                if (attrRule.pattern.test(name)) {
                  break;
                }
              }

              // No rule matched
              if (i === -1) {
                attrRule = null;
              }
            }

            // No attribute rule found
            if (!attrRule) {
              return;
            }

            // Validate value
            if (attrRule.validValues && !(value in attrRule.validValues)) {
              return;
            }
          }

          // Block any javascript: urls or non image data uris
          if (filteredUrlAttrs[name] && !settings.allow_script_urls) {
            var uri = value.replace(trimRegExp, '');

            try {
              // Might throw malformed URI sequence
              uri = decodeURIComponent(uri);
            } catch (ex) {
              // Fallback to non UTF-8 decoder
              uri = unescape(uri);
            }

            if (scriptUriRegExp.test(uri)) {
              return;
            }

            if (!settings.allow_html_data_urls && dataUriRegExp.test(uri) && !/^data:image\//i.test(uri)) {
              return;
            }
          }

          // Block data or event attributes on elements marked as internal
          if (isInternalElement && (name in filteredUrlAttrs || name.indexOf('on') === 0)) {
            return;
          }

          // Add attribute to list and map
          attrList.map[name] = value;
          attrList.push({
            name: name,
            value: value
          });
        }

        // Precompile RegExps and map objects
        tokenRegExp = new RegExp('<(?:' +
          '(?:!--([\\w\\W]*?)-->)|' + // Comment
          '(?:!\\[CDATA\\[([\\w\\W]*?)\\]\\]>)|' + // CDATA
          '(?:!DOCTYPE([\\w\\W]*?)>)|' + // DOCTYPE
          '(?:\\?([^\\s\\/<>]+) ?([\\w\\W]*?)[?/]>)|' + // PI
          '(?:\\/([A-Za-z][A-Za-z0-9\\-_\\:\\.]*)>)|' + // End element
          '(?:([A-Za-z][A-Za-z0-9\\-_\\:\\.]*)((?:\\s+[^"\'>]+(?:(?:"[^"]*")|(?:\'[^\']*\')|[^>]*))*|\\/|\\s+)>)' + // Start element
          ')', 'g');

        attrRegExp = /([\w:\-]+)(?:\s*=\s*(?:(?:\"((?:[^\"])*)\")|(?:\'((?:[^\'])*)\')|([^>\s]+)))?/g;

        // Setup lookup tables for empty elements and boolean attributes
        shortEndedElements = schema.getShortEndedElements();
        selfClosing = settings.self_closing_elements || schema.getSelfClosingElements();
        fillAttrsMap = schema.getBoolAttrs();
        validate = settings.validate;
        removeInternalElements = settings.remove_internals;
        fixSelfClosing = settings.fix_self_closing;
        specialElements = schema.getSpecialElements();
        processHtml = html + '>';

        while ((matches = tokenRegExp.exec(processHtml))) { // Adds and extra '>' to keep regexps from doing catastrofic backtracking on malformed html
          // Text
          if (index < matches.index) {
            self.text(decode(html.substr(index, matches.index - index)));
          }

          if ((value = matches[6])) { // End element
            value = value.toLowerCase();

            // IE will add a ":" in front of elements it doesn't understand like custom elements or HTML5 elements
            if (value.charAt(0) === ':') {
              value = value.substr(1);
            }

            processEndTag(value);
          } else if ((value = matches[7])) { // Start element
            // Did we consume the extra character then treat it as text
            // This handles the case with html like this: "text a<b text"
            if (matches.index + matches[0].length > html.length) {
              self.text(decode(html.substr(matches.index)));
              index = matches.index + matches[0].length;
              continue;
            }

            value = value.toLowerCase();

            // IE will add a ":" in front of elements it doesn't understand like custom elements or HTML5 elements
            if (value.charAt(0) === ':') {
              value = value.substr(1);
            }

            isShortEnded = value in shortEndedElements;

            // Is self closing tag for example an <li> after an open <li>
            if (fixSelfClosing && selfClosing[value] && stack.length > 0 && stack[stack.length - 1].name === value) {
              processEndTag(value);
            }

            // Validate element
            if (!validate || (elementRule = schema.getElementRule(value))) {
              isValidElement = true;

              // Grab attributes map and patters when validation is enabled
              if (validate) {
                validAttributesMap = elementRule.attributes;
                validAttributePatterns = elementRule.attributePatterns;
              }

              // Parse attributes
              if ((attribsValue = matches[8])) {
                isInternalElement = attribsValue.indexOf('data-mce-type') !== -1; // Check if the element is an internal element

                // If the element has internal attributes then remove it if we are told to do so
                if (isInternalElement && removeInternalElements) {
                  isValidElement = false;
                }

                attrList = [];
                attrList.map = {};

                attribsValue.replace(attrRegExp, parseAttribute);
              } else {
                attrList = [];
                attrList.map = {};
              }

              // Process attributes if validation is enabled
              if (validate && !isInternalElement) {
                attributesRequired = elementRule.attributesRequired;
                attributesDefault = elementRule.attributesDefault;
                attributesForced = elementRule.attributesForced;
                anyAttributesRequired = elementRule.removeEmptyAttrs;

                // Check if any attribute exists
                if (anyAttributesRequired && !attrList.length) {
                  isValidElement = false;
                }

                // Handle forced attributes
                if (attributesForced) {
                  i = attributesForced.length;
                  while (i--) {
                    attr = attributesForced[i];
                    name = attr.name;
                    attrValue = attr.value;

                    if (attrValue === '{$uid}') {
                      attrValue = 'mce_' + idCount++;
                    }

                    attrList.map[name] = attrValue;
                    attrList.push({ name: name, value: attrValue });
                  }
                }

                // Handle default attributes
                if (attributesDefault) {
                  i = attributesDefault.length;
                  while (i--) {
                    attr = attributesDefault[i];
                    name = attr.name;

                    if (!(name in attrList.map)) {
                      attrValue = attr.value;

                      if (attrValue === '{$uid}') {
                        attrValue = 'mce_' + idCount++;
                      }

                      attrList.map[name] = attrValue;
                      attrList.push({ name: name, value: attrValue });
                    }
                  }
                }

                // Handle required attributes
                if (attributesRequired) {
                  i = attributesRequired.length;
                  while (i--) {
                    if (attributesRequired[i] in attrList.map) {
                      break;
                    }
                  }

                  // None of the required attributes where found
                  if (i === -1) {
                    isValidElement = false;
                  }
                }

                // Invalidate element if it's marked as bogus
                if ((attr = attrList.map['data-mce-bogus'])) {
                  if (attr === 'all') {
                    index = findEndTag(schema, html, tokenRegExp.lastIndex);
                    tokenRegExp.lastIndex = index;
                    continue;
                  }

                  isValidElement = false;
                }
              }

              if (isValidElement) {
                self.start(value, attrList, isShortEnded);
              }
            } else {
              isValidElement = false;
            }

            // Treat script, noscript and style a bit different since they may include code that looks like elements
            if ((endRegExp = specialElements[value])) {
              endRegExp.lastIndex = index = matches.index + matches[0].length;

              if ((matches = endRegExp.exec(html))) {
                if (isValidElement) {
                  text = html.substr(index, matches.index - index);
                }

                index = matches.index + matches[0].length;
              } else {
                text = html.substr(index);
                index = html.length;
              }

              if (isValidElement) {
                if (text.length > 0) {
                  self.text(text, true);
                }

                self.end(value);
              }

              tokenRegExp.lastIndex = index;
              continue;
            }

            // Push value on to stack
            if (!isShortEnded) {
              if (!attribsValue || attribsValue.indexOf('/') != attribsValue.length - 1) {
                stack.push({ name: value, valid: isValidElement });
              } else if (isValidElement) {
                self.end(value);
              }
            }
          } else if ((value = matches[1])) { // Comment
            // Padd comment value to avoid browsers from parsing invalid comments as HTML
            if (value.charAt(0) === '>') {
              value = ' ' + value;
            }

            if (!settings.allow_conditional_comments && value.substr(0, 3).toLowerCase() === '[if') {
              value = ' ' + value;
            }

            self.comment(value);
          } else if ((value = matches[2])) { // CDATA
            self.cdata(trimComments(value));
          } else if ((value = matches[3])) { // DOCTYPE
            self.doctype(value);
          } else if ((value = matches[4])) { // PI
            self.pi(value, matches[5]);
          }

          index = matches.index + matches[0].length;
        }

        // Text
        if (index < html.length) {
          self.text(decode(html.substr(index)));
        }

        // Close any open elements
        for (i = stack.length - 1; i >= 0; i--) {
          value = stack[i];

          if (value.valid) {
            self.end(value.name);
          }
        }
      };
    }

    SaxParser.findEndTag = findEndTag;

    return SaxParser;
  }
);
/**
 * DomParser.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class parses HTML code into a DOM like structure of nodes it will remove redundant whitespace and make
 * sure that the node tree is valid according to the specified schema.
 * So for example: <p>a<p>b</p>c</p> will become <p>a</p><p>b</p><p>c</p>
 *
 * @example
 * var parser = new tinymce.html.DomParser({validate: true}, schema);
 * var rootNode = parser.parse('<h1>content</h1>');
 *
 * @class tinymce.html.DomParser
 * @version 3.4
 */
define(
  'tinymce.core.html.DomParser',
  [
    "tinymce.core.html.Node",
    "tinymce.core.html.Schema",
    "tinymce.core.html.SaxParser",
    "tinymce.core.util.Tools"
  ],
  function (Node, Schema, SaxParser, Tools) {
    var makeMap = Tools.makeMap, each = Tools.each, explode = Tools.explode, extend = Tools.extend;

    var paddEmptyNode = function (settings, node) {
      if (settings.padd_empty_with_br) {
        node.empty().append(new Node('br', '1')).shortEnded = true;
      } else {
        node.empty().append(new Node('#text', '3')).value = '\u00a0';
      }
    };

    var hasOnlyChild = function (node, name) {
      return node && node.firstChild === node.lastChild && node.firstChild.name === name;
    };

    /**
     * Constructs a new DomParser instance.
     *
     * @constructor
     * @method DomParser
     * @param {Object} settings Name/value collection of settings. comment, cdata, text, start and end are callbacks.
     * @param {tinymce.html.Schema} schema HTML Schema class to use when parsing.
     */
    return function (settings, schema) {
      var self = this, nodeFilters = {}, attributeFilters = [], matchedNodes = {}, matchedAttributes = {};

      settings = settings || {};
      settings.validate = "validate" in settings ? settings.validate : true;
      settings.root_name = settings.root_name || 'body';
      self.schema = schema = schema || new Schema();

      function fixInvalidChildren(nodes) {
        var ni, node, parent, parents, newParent, currentNode, tempNode, childNode, i;
        var nonEmptyElements, whitespaceElements, nonSplitableElements, textBlockElements, specialElements, sibling, nextNode;

        nonSplitableElements = makeMap('tr,td,th,tbody,thead,tfoot,table');
        nonEmptyElements = schema.getNonEmptyElements();
        whitespaceElements = schema.getWhiteSpaceElements();
        textBlockElements = schema.getTextBlockElements();
        specialElements = schema.getSpecialElements();

        for (ni = 0; ni < nodes.length; ni++) {
          node = nodes[ni];

          // Already removed or fixed
          if (!node.parent || node.fixed) {
            continue;
          }

          // If the invalid element is a text block and the text block is within a parent LI element
          // Then unwrap the first text block and convert other sibling text blocks to LI elements similar to Word/Open Office
          if (textBlockElements[node.name] && node.parent.name == 'li') {
            // Move sibling text blocks after LI element
            sibling = node.next;
            while (sibling) {
              if (textBlockElements[sibling.name]) {
                sibling.name = 'li';
                sibling.fixed = true;
                node.parent.insert(sibling, node.parent);
              } else {
                break;
              }

              sibling = sibling.next;
            }

            // Unwrap current text block
            node.unwrap(node);
            continue;
          }

          // Get list of all parent nodes until we find a valid parent to stick the child into
          parents = [node];
          for (parent = node.parent; parent && !schema.isValidChild(parent.name, node.name) &&
            !nonSplitableElements[parent.name]; parent = parent.parent) {
            parents.push(parent);
          }

          // Found a suitable parent
          if (parent && parents.length > 1) {
            // Reverse the array since it makes looping easier
            parents.reverse();

            // Clone the related parent and insert that after the moved node
            newParent = currentNode = self.filterNode(parents[0].clone());

            // Start cloning and moving children on the left side of the target node
            for (i = 0; i < parents.length - 1; i++) {
              if (schema.isValidChild(currentNode.name, parents[i].name)) {
                tempNode = self.filterNode(parents[i].clone());
                currentNode.append(tempNode);
              } else {
                tempNode = currentNode;
              }

              for (childNode = parents[i].firstChild; childNode && childNode != parents[i + 1];) {
                nextNode = childNode.next;
                tempNode.append(childNode);
                childNode = nextNode;
              }

              currentNode = tempNode;
            }

            if (!newParent.isEmpty(nonEmptyElements, whitespaceElements)) {
              parent.insert(newParent, parents[0], true);
              parent.insert(node, newParent);
            } else {
              parent.insert(node, parents[0], true);
            }

            // Check if the element is empty by looking through it's contents and special treatment for <p><br /></p>
            parent = parents[0];
            if (parent.isEmpty(nonEmptyElements, whitespaceElements) || hasOnlyChild(parent, 'br')) {
              parent.empty().remove();
            }
          } else if (node.parent) {
            // If it's an LI try to find a UL/OL for it or wrap it
            if (node.name === 'li') {
              sibling = node.prev;
              if (sibling && (sibling.name === 'ul' || sibling.name === 'ul')) {
                sibling.append(node);
                continue;
              }

              sibling = node.next;
              if (sibling && (sibling.name === 'ul' || sibling.name === 'ul')) {
                sibling.insert(node, sibling.firstChild, true);
                continue;
              }

              node.wrap(self.filterNode(new Node('ul', 1)));
              continue;
            }

            // Try wrapping the element in a DIV
            if (schema.isValidChild(node.parent.name, 'div') && schema.isValidChild('div', node.name)) {
              node.wrap(self.filterNode(new Node('div', 1)));
            } else {
              // We failed wrapping it, then remove or unwrap it
              if (specialElements[node.name]) {
                node.empty().remove();
              } else {
                node.unwrap();
              }
            }
          }
        }
      }

      /**
       * Runs the specified node though the element and attributes filters.
       *
       * @method filterNode
       * @param {tinymce.html.Node} Node the node to run filters on.
       * @return {tinymce.html.Node} The passed in node.
       */
      self.filterNode = function (node) {
        var i, name, list;

        // Run element filters
        if (name in nodeFilters) {
          list = matchedNodes[name];

          if (list) {
            list.push(node);
          } else {
            matchedNodes[name] = [node];
          }
        }

        // Run attribute filters
        i = attributeFilters.length;
        while (i--) {
          name = attributeFilters[i].name;

          if (name in node.attributes.map) {
            list = matchedAttributes[name];

            if (list) {
              list.push(node);
            } else {
              matchedAttributes[name] = [node];
            }
          }
        }

        return node;
      };

      /**
       * Adds a node filter function to the parser, the parser will collect the specified nodes by name
       * and then execute the callback ones it has finished parsing the document.
       *
       * @example
       * parser.addNodeFilter('p,h1', function(nodes, name) {
       *  for (var i = 0; i < nodes.length; i++) {
       *   console.log(nodes[i].name);
       *  }
       * });
       * @method addNodeFilter
       * @method {String} name Comma separated list of nodes to collect.
       * @param {function} callback Callback function to execute once it has collected nodes.
       */
      self.addNodeFilter = function (name, callback) {
        each(explode(name), function (name) {
          var list = nodeFilters[name];

          if (!list) {
            nodeFilters[name] = list = [];
          }

          list.push(callback);
        });
      };

      /**
       * Adds a attribute filter function to the parser, the parser will collect nodes that has the specified attributes
       * and then execute the callback ones it has finished parsing the document.
       *
       * @example
       * parser.addAttributeFilter('src,href', function(nodes, name) {
       *  for (var i = 0; i < nodes.length; i++) {
       *   console.log(nodes[i].name);
       *  }
       * });
       * @method addAttributeFilter
       * @method {String} name Comma separated list of nodes to collect.
       * @param {function} callback Callback function to execute once it has collected nodes.
       */
      self.addAttributeFilter = function (name, callback) {
        each(explode(name), function (name) {
          var i;

          for (i = 0; i < attributeFilters.length; i++) {
            if (attributeFilters[i].name === name) {
              attributeFilters[i].callbacks.push(callback);
              return;
            }
          }

          attributeFilters.push({ name: name, callbacks: [callback] });
        });
      };

      /**
       * Parses the specified HTML string into a DOM like node tree and returns the result.
       *
       * @example
       * var rootNode = new DomParser({...}).parse('<b>text</b>');
       * @method parse
       * @param {String} html Html string to sax parse.
       * @param {Object} args Optional args object that gets passed to all filter functions.
       * @return {tinymce.html.Node} Root node containing the tree.
       */
      self.parse = function (html, args) {
        var parser, rootNode, node, nodes, i, l, fi, fl, list, name, validate;
        var blockElements, startWhiteSpaceRegExp, invalidChildren = [], isInWhiteSpacePreservedElement;
        var endWhiteSpaceRegExp, allWhiteSpaceRegExp, isAllWhiteSpaceRegExp, whiteSpaceElements;
        var children, nonEmptyElements, rootBlockName;

        args = args || {};
        matchedNodes = {};
        matchedAttributes = {};
        blockElements = extend(makeMap('script,style,head,html,body,title,meta,param'), schema.getBlockElements());
        nonEmptyElements = schema.getNonEmptyElements();
        children = schema.children;
        validate = settings.validate;
        rootBlockName = "forced_root_block" in args ? args.forced_root_block : settings.forced_root_block;

        whiteSpaceElements = schema.getWhiteSpaceElements();
        startWhiteSpaceRegExp = /^[ \t\r\n]+/;
        endWhiteSpaceRegExp = /[ \t\r\n]+$/;
        allWhiteSpaceRegExp = /[ \t\r\n]+/g;
        isAllWhiteSpaceRegExp = /^[ \t\r\n]+$/;

        function addRootBlocks() {
          var node = rootNode.firstChild, next, rootBlockNode;

          // Removes whitespace at beginning and end of block so:
          // <p> x </p> -> <p>x</p>
          function trim(rootBlockNode) {
            if (rootBlockNode) {
              node = rootBlockNode.firstChild;
              if (node && node.type == 3) {
                node.value = node.value.replace(startWhiteSpaceRegExp, '');
              }

              node = rootBlockNode.lastChild;
              if (node && node.type == 3) {
                node.value = node.value.replace(endWhiteSpaceRegExp, '');
              }
            }
          }

          // Check if rootBlock is valid within rootNode for example if P is valid in H1 if H1 is the contentEditabe root
          if (!schema.isValidChild(rootNode.name, rootBlockName.toLowerCase())) {
            return;
          }

          while (node) {
            next = node.next;

            if (node.type == 3 || (node.type == 1 && node.name !== 'p' &&
              !blockElements[node.name] && !node.attr('data-mce-type'))) {
              if (!rootBlockNode) {
                // Create a new root block element
                rootBlockNode = createNode(rootBlockName, 1);
                rootBlockNode.attr(settings.forced_root_block_attrs);
                rootNode.insert(rootBlockNode, node);
                rootBlockNode.append(node);
              } else {
                rootBlockNode.append(node);
              }
            } else {
              trim(rootBlockNode);
              rootBlockNode = null;
            }

            node = next;
          }

          trim(rootBlockNode);
        }

        function createNode(name, type) {
          var node = new Node(name, type), list;

          if (name in nodeFilters) {
            list = matchedNodes[name];

            if (list) {
              list.push(node);
            } else {
              matchedNodes[name] = [node];
            }
          }

          return node;
        }

        function removeWhitespaceBefore(node) {
          var textNode, textNodeNext, textVal, sibling, blockElements = schema.getBlockElements();

          for (textNode = node.prev; textNode && textNode.type === 3;) {
            textVal = textNode.value.replace(endWhiteSpaceRegExp, '');

            // Found a text node with non whitespace then trim that and break
            if (textVal.length > 0) {
              textNode.value = textVal;
              return;
            }

            textNodeNext = textNode.next;

            // Fix for bug #7543 where bogus nodes would produce empty
            // text nodes and these would be removed if a nested list was before it
            if (textNodeNext) {
              if (textNodeNext.type == 3 && textNodeNext.value.length) {
                textNode = textNode.prev;
                continue;
              }

              if (!blockElements[textNodeNext.name] && textNodeNext.name != 'script' && textNodeNext.name != 'style') {
                textNode = textNode.prev;
                continue;
              }
            }

            sibling = textNode.prev;
            textNode.remove();
            textNode = sibling;
          }
        }

        function cloneAndExcludeBlocks(input) {
          var name, output = {};

          for (name in input) {
            if (name !== 'li' && name != 'p') {
              output[name] = input[name];
            }
          }

          return output;
        }

        parser = new SaxParser({
          validate: validate,
          allow_script_urls: settings.allow_script_urls,
          allow_conditional_comments: settings.allow_conditional_comments,

          // Exclude P and LI from DOM parsing since it's treated better by the DOM parser
          self_closing_elements: cloneAndExcludeBlocks(schema.getSelfClosingElements()),

          cdata: function (text) {
            node.append(createNode('#cdata', 4)).value = text;
          },

          text: function (text, raw) {
            var textNode;

            // Trim all redundant whitespace on non white space elements
            if (!isInWhiteSpacePreservedElement) {
              text = text.replace(allWhiteSpaceRegExp, ' ');

              if (node.lastChild && blockElements[node.lastChild.name]) {
                text = text.replace(startWhiteSpaceRegExp, '');
              }
            }

            // Do we need to create the node
            if (text.length !== 0) {
              textNode = createNode('#text', 3);
              textNode.raw = !!raw;
              node.append(textNode).value = text;
            }
          },

          comment: function (text) {
            node.append(createNode('#comment', 8)).value = text;
          },

          pi: function (name, text) {
            node.append(createNode(name, 7)).value = text;
            removeWhitespaceBefore(node);
          },

          doctype: function (text) {
            var newNode;

            newNode = node.append(createNode('#doctype', 10));
            newNode.value = text;
            removeWhitespaceBefore(node);
          },

          start: function (name, attrs, empty) {
            var newNode, attrFiltersLen, elementRule, attrName, parent;

            elementRule = validate ? schema.getElementRule(name) : {};
            if (elementRule) {
              newNode = createNode(elementRule.outputName || name, 1);
              newNode.attributes = attrs;
              newNode.shortEnded = empty;

              node.append(newNode);

              // Check if node is valid child of the parent node is the child is
              // unknown we don't collect it since it's probably a custom element
              parent = children[node.name];
              if (parent && children[newNode.name] && !parent[newNode.name]) {
                invalidChildren.push(newNode);
              }

              attrFiltersLen = attributeFilters.length;
              while (attrFiltersLen--) {
                attrName = attributeFilters[attrFiltersLen].name;

                if (attrName in attrs.map) {
                  list = matchedAttributes[attrName];

                  if (list) {
                    list.push(newNode);
                  } else {
                    matchedAttributes[attrName] = [newNode];
                  }
                }
              }

              // Trim whitespace before block
              if (blockElements[name]) {
                removeWhitespaceBefore(newNode);
              }

              // Change current node if the element wasn't empty i.e not <br /> or <img />
              if (!empty) {
                node = newNode;
              }

              // Check if we are inside a whitespace preserved element
              if (!isInWhiteSpacePreservedElement && whiteSpaceElements[name]) {
                isInWhiteSpacePreservedElement = true;
              }
            }
          },

          end: function (name) {
            var textNode, elementRule, text, sibling, tempNode;

            elementRule = validate ? schema.getElementRule(name) : {};
            if (elementRule) {
              if (blockElements[name]) {
                if (!isInWhiteSpacePreservedElement) {
                  // Trim whitespace of the first node in a block
                  textNode = node.firstChild;
                  if (textNode && textNode.type === 3) {
                    text = textNode.value.replace(startWhiteSpaceRegExp, '');

                    // Any characters left after trim or should we remove it
                    if (text.length > 0) {
                      textNode.value = text;
                      textNode = textNode.next;
                    } else {
                      sibling = textNode.next;
                      textNode.remove();
                      textNode = sibling;

                      // Remove any pure whitespace siblings
                      while (textNode && textNode.type === 3) {
                        text = textNode.value;
                        sibling = textNode.next;

                        if (text.length === 0 || isAllWhiteSpaceRegExp.test(text)) {
                          textNode.remove();
                          textNode = sibling;
                        }

                        textNode = sibling;
                      }
                    }
                  }

                  // Trim whitespace of the last node in a block
                  textNode = node.lastChild;
                  if (textNode && textNode.type === 3) {
                    text = textNode.value.replace(endWhiteSpaceRegExp, '');

                    // Any characters left after trim or should we remove it
                    if (text.length > 0) {
                      textNode.value = text;
                      textNode = textNode.prev;
                    } else {
                      sibling = textNode.prev;
                      textNode.remove();
                      textNode = sibling;

                      // Remove any pure whitespace siblings
                      while (textNode && textNode.type === 3) {
                        text = textNode.value;
                        sibling = textNode.prev;

                        if (text.length === 0 || isAllWhiteSpaceRegExp.test(text)) {
                          textNode.remove();
                          textNode = sibling;
                        }

                        textNode = sibling;
                      }
                    }
                  }
                }

                // Trim start white space
                // Removed due to: #5424
                /*textNode = node.prev;
                if (textNode && textNode.type === 3) {
                  text = textNode.value.replace(startWhiteSpaceRegExp, '');

                  if (text.length > 0)
                    textNode.value = text;
                  else
                    textNode.remove();
                }*/
              }

              // Check if we exited a whitespace preserved element
              if (isInWhiteSpacePreservedElement && whiteSpaceElements[name]) {
                isInWhiteSpacePreservedElement = false;
              }

              // Handle empty nodes
              if (elementRule.removeEmpty || elementRule.paddEmpty) {
                if (node.isEmpty(nonEmptyElements, whiteSpaceElements)) {
                  if (elementRule.paddEmpty) {
                    paddEmptyNode(settings, node);
                  } else {
                    // Leave nodes that have a name like <a name="name">
                    if (!node.attributes.map.name && !node.attributes.map.id) {
                      tempNode = node.parent;

                      if (blockElements[node.name]) {
                        node.empty().remove();
                      } else {
                        node.unwrap();
                      }

                      node = tempNode;
                      return;
                    }
                  }
                }
              }

              node = node.parent;
            }
          }
        }, schema);

        rootNode = node = new Node(args.context || settings.root_name, 11);

        parser.parse(html);

        // Fix invalid children or report invalid children in a contextual parsing
        if (validate && invalidChildren.length) {
          if (!args.context) {
            fixInvalidChildren(invalidChildren);
          } else {
            args.invalid = true;
          }
        }

        // Wrap nodes in the root into block elements if the root is body
        if (rootBlockName && (rootNode.name == 'body' || args.isRootContent)) {
          addRootBlocks();
        }

        // Run filters only when the contents is valid
        if (!args.invalid) {
          // Run node filters
          for (name in matchedNodes) {
            list = nodeFilters[name];
            nodes = matchedNodes[name];

            // Remove already removed children
            fi = nodes.length;
            while (fi--) {
              if (!nodes[fi].parent) {
                nodes.splice(fi, 1);
              }
            }

            for (i = 0, l = list.length; i < l; i++) {
              list[i](nodes, name, args);
            }
          }

          // Run attribute filters
          for (i = 0, l = attributeFilters.length; i < l; i++) {
            list = attributeFilters[i];

            if (list.name in matchedAttributes) {
              nodes = matchedAttributes[list.name];

              // Remove already removed children
              fi = nodes.length;
              while (fi--) {
                if (!nodes[fi].parent) {
                  nodes.splice(fi, 1);
                }
              }

              for (fi = 0, fl = list.callbacks.length; fi < fl; fi++) {
                list.callbacks[fi](nodes, list.name, args);
              }
            }
          }
        }

        return rootNode;
      };

      // Remove <br> at end of block elements Gecko and WebKit injects BR elements to
      // make it possible to place the caret inside empty blocks. This logic tries to remove
      // these elements and keep br elements that where intended to be there intact
      if (settings.remove_trailing_brs) {
        self.addNodeFilter('br', function (nodes) {
          var i, l = nodes.length, node, blockElements = extend({}, schema.getBlockElements());
          var nonEmptyElements = schema.getNonEmptyElements(), parent, lastParent, prev, prevName;
          var whiteSpaceElements = schema.getNonEmptyElements();
          var elementRule, textNode;

          // Remove brs from body element as well
          blockElements.body = 1;

          // Must loop forwards since it will otherwise remove all brs in <p>a<br><br><br></p>
          for (i = 0; i < l; i++) {
            node = nodes[i];
            parent = node.parent;

            if (blockElements[node.parent.name] && node === parent.lastChild) {
              // Loop all nodes to the left of the current node and check for other BR elements
              // excluding bookmarks since they are invisible
              prev = node.prev;
              while (prev) {
                prevName = prev.name;

                // Ignore bookmarks
                if (prevName !== "span" || prev.attr('data-mce-type') !== 'bookmark') {
                  // Found a non BR element
                  if (prevName !== "br") {
                    break;
                  }

                  // Found another br it's a <br><br> structure then don't remove anything
                  if (prevName === 'br') {
                    node = null;
                    break;
                  }
                }

                prev = prev.prev;
              }

              if (node) {
                node.remove();

                // Is the parent to be considered empty after we removed the BR
                if (parent.isEmpty(nonEmptyElements, whiteSpaceElements)) {
                  elementRule = schema.getElementRule(parent.name);

                  // Remove or padd the element depending on schema rule
                  if (elementRule) {
                    if (elementRule.removeEmpty) {
                      parent.remove();
                    } else if (elementRule.paddEmpty) {
                      paddEmptyNode(settings, parent);
                    }
                  }
                }
              }
            } else {
              // Replaces BR elements inside inline elements like <p><b><i><br></i></b></p>
              // so they become <p><b><i>&nbsp;</i></b></p>
              lastParent = node;
              while (parent && parent.firstChild === lastParent && parent.lastChild === lastParent) {
                lastParent = parent;

                if (blockElements[parent.name]) {
                  break;
                }

                parent = parent.parent;
              }

              if (lastParent === parent && settings.padd_empty_with_br !== true) {
                textNode = new Node('#text', 3);
                textNode.value = '\u00a0';
                node.replace(textNode);
              }
            }
          }
        });
      }


      self.addAttributeFilter('href', function (nodes) {
        var i = nodes.length, node;

        var appendRel = function (rel) {
          var parts = rel.split(' ').filter(function (p) {
            return p.length > 0;
          });
          return parts.concat(['noopener']).sort().join(' ');
        };

        var addNoOpener = function (rel) {
          var newRel = rel ? Tools.trim(rel) : '';
          if (!/\b(noopener)\b/g.test(newRel)) {
            return appendRel(newRel);
          } else {
            return newRel;
          }
        };

        if (!settings.allow_unsafe_link_target) {
          while (i--) {
            node = nodes[i];
            if (node.name === 'a' && node.attr('target') === '_blank') {
              node.attr('rel', addNoOpener(node.attr('rel')));
            }
          }
        }
      });

      // Force anchor names closed, unless the setting "allow_html_in_named_anchor" is explicitly included.
      if (!settings.allow_html_in_named_anchor) {
        self.addAttributeFilter('id,name', function (nodes) {
          var i = nodes.length, sibling, prevSibling, parent, node;

          while (i--) {
            node = nodes[i];
            if (node.name === 'a' && node.firstChild && !node.attr('href')) {
              parent = node.parent;

              // Move children after current node
              sibling = node.lastChild;
              do {
                prevSibling = sibling.prev;
                parent.insert(sibling, node);
                sibling = prevSibling;
              } while (sibling);
            }
          }
        });
      }

      if (settings.fix_list_elements) {
        self.addNodeFilter('ul,ol', function (nodes) {
          var i = nodes.length, node, parentNode;

          while (i--) {
            node = nodes[i];
            parentNode = node.parent;

            if (parentNode.name === 'ul' || parentNode.name === 'ol') {
              if (node.prev && node.prev.name === 'li') {
                node.prev.append(node);
              } else {
                var li = new Node('li', 1);
                li.attr('style', 'list-style-type: none');
                node.wrap(li);
              }
            }
          }
        });
      }

      if (settings.validate && schema.getValidClasses()) {
        self.addAttributeFilter('class', function (nodes) {
          var i = nodes.length, node, classList, ci, className, classValue;
          var validClasses = schema.getValidClasses(), validClassesMap, valid;

          while (i--) {
            node = nodes[i];
            classList = node.attr('class').split(' ');
            classValue = '';

            for (ci = 0; ci < classList.length; ci++) {
              className = classList[ci];
              valid = false;

              validClassesMap = validClasses['*'];
              if (validClassesMap && validClassesMap[className]) {
                valid = true;
              }

              validClassesMap = validClasses[node.name];
              if (!valid && validClassesMap && validClassesMap[className]) {
                valid = true;
              }

              if (valid) {
                if (classValue) {
                  classValue += ' ';
                }

                classValue += className;
              }
            }

            if (!classValue.length) {
              classValue = null;
            }

            node.attr('class', classValue);
          }
        });
      }
    };
  }
);

/**
 * Writer.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class is used to write HTML tags out it can be used with the Serializer or the SaxParser.
 *
 * @class tinymce.html.Writer
 * @example
 * var writer = new tinymce.html.Writer({indent: true});
 * var parser = new tinymce.html.SaxParser(writer).parse('<p><br></p>');
 * console.log(writer.getContent());
 *
 * @class tinymce.html.Writer
 * @version 3.4
 */
define(
  'tinymce.core.html.Writer',
  [
    "tinymce.core.html.Entities",
    "tinymce.core.util.Tools"
  ],
  function (Entities, Tools) {
    var makeMap = Tools.makeMap;

    /**
     * Constructs a new Writer instance.
     *
     * @constructor
     * @method Writer
     * @param {Object} settings Name/value settings object.
     */
    return function (settings) {
      var html = [], indent, indentBefore, indentAfter, encode, htmlOutput;

      settings = settings || {};
      indent = settings.indent;
      indentBefore = makeMap(settings.indent_before || '');
      indentAfter = makeMap(settings.indent_after || '');
      encode = Entities.getEncodeFunc(settings.entity_encoding || 'raw', settings.entities);
      htmlOutput = settings.element_format == "html";

      return {
        /**
         * Writes the a start element such as <p id="a">.
         *
         * @method start
         * @param {String} name Name of the element.
         * @param {Array} attrs Optional attribute array or undefined if it hasn't any.
         * @param {Boolean} empty Optional empty state if the tag should end like <br />.
         */
        start: function (name, attrs, empty) {
          var i, l, attr, value;

          if (indent && indentBefore[name] && html.length > 0) {
            value = html[html.length - 1];

            if (value.length > 0 && value !== '\n') {
              html.push('\n');
            }
          }

          html.push('<', name);

          if (attrs) {
            for (i = 0, l = attrs.length; i < l; i++) {
              attr = attrs[i];
              html.push(' ', attr.name, '="', encode(attr.value, true), '"');
            }
          }

          if (!empty || htmlOutput) {
            html[html.length] = '>';
          } else {
            html[html.length] = ' />';
          }

          if (empty && indent && indentAfter[name] && html.length > 0) {
            value = html[html.length - 1];

            if (value.length > 0 && value !== '\n') {
              html.push('\n');
            }
          }
        },

        /**
         * Writes the a end element such as </p>.
         *
         * @method end
         * @param {String} name Name of the element.
         */
        end: function (name) {
          var value;

          /*if (indent && indentBefore[name] && html.length > 0) {
            value = html[html.length - 1];

            if (value.length > 0 && value !== '\n')
              html.push('\n');
          }*/

          html.push('</', name, '>');

          if (indent && indentAfter[name] && html.length > 0) {
            value = html[html.length - 1];

            if (value.length > 0 && value !== '\n') {
              html.push('\n');
            }
          }
        },

        /**
         * Writes a text node.
         *
         * @method text
         * @param {String} text String to write out.
         * @param {Boolean} raw Optional raw state if true the contents wont get encoded.
         */
        text: function (text, raw) {
          if (text.length > 0) {
            html[html.length] = raw ? text : encode(text);
          }
        },

        /**
         * Writes a cdata node such as <![CDATA[data]]>.
         *
         * @method cdata
         * @param {String} text String to write out inside the cdata.
         */
        cdata: function (text) {
          html.push('<![CDATA[', text, ']]>');
        },

        /**
         * Writes a comment node such as <!-- Comment -->.
         *
         * @method cdata
         * @param {String} text String to write out inside the comment.
         */
        comment: function (text) {
          html.push('<!--', text, '-->');
        },

        /**
         * Writes a PI node such as <?xml attr="value" ?>.
         *
         * @method pi
         * @param {String} name Name of the pi.
         * @param {String} text String to write out inside the pi.
         */
        pi: function (name, text) {
          if (text) {
            html.push('<?', name, ' ', encode(text), '?>');
          } else {
            html.push('<?', name, '?>');
          }

          if (indent) {
            html.push('\n');
          }
        },

        /**
         * Writes a doctype node such as <!DOCTYPE data>.
         *
         * @method doctype
         * @param {String} text String to write out inside the doctype.
         */
        doctype: function (text) {
          html.push('<!DOCTYPE', text, '>', indent ? '\n' : '');
        },

        /**
         * Resets the internal buffer if one wants to reuse the writer.
         *
         * @method reset
         */
        reset: function () {
          html.length = 0;
        },

        /**
         * Returns the contents that got serialized.
         *
         * @method getContent
         * @return {String} HTML contents that got written down.
         */
        getContent: function () {
          return html.join('').replace(/\n$/, '');
        }
      };
    };
  }
);
/**
 * Serializer.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class is used to serialize down the DOM tree into a string using a Writer instance.
 *
 *
 * @example
 * new tinymce.html.Serializer().serialize(new tinymce.html.DomParser().parse('<p>text</p>'));
 * @class tinymce.html.Serializer
 * @version 3.4
 */
define(
  'tinymce.core.html.Serializer',
  [
    "tinymce.core.html.Writer",
    "tinymce.core.html.Schema"
  ],
  function (Writer, Schema) {
    /**
     * Constructs a new Serializer instance.
     *
     * @constructor
     * @method Serializer
     * @param {Object} settings Name/value settings object.
     * @param {tinymce.html.Schema} schema Schema instance to use.
     */
    return function (settings, schema) {
      var self = this, writer = new Writer(settings);

      settings = settings || {};
      settings.validate = "validate" in settings ? settings.validate : true;

      self.schema = schema = schema || new Schema();
      self.writer = writer;

      /**
       * Serializes the specified node into a string.
       *
       * @example
       * new tinymce.html.Serializer().serialize(new tinymce.html.DomParser().parse('<p>text</p>'));
       * @method serialize
       * @param {tinymce.html.Node} node Node instance to serialize.
       * @return {String} String with HTML based on DOM tree.
       */
      self.serialize = function (node) {
        var handlers, validate;

        validate = settings.validate;

        handlers = {
          // #text
          3: function (node) {
            writer.text(node.value, node.raw);
          },

          // #comment
          8: function (node) {
            writer.comment(node.value);
          },

          // Processing instruction
          7: function (node) {
            writer.pi(node.name, node.value);
          },

          // Doctype
          10: function (node) {
            writer.doctype(node.value);
          },

          // CDATA
          4: function (node) {
            writer.cdata(node.value);
          },

          // Document fragment
          11: function (node) {
            if ((node = node.firstChild)) {
              do {
                walk(node);
              } while ((node = node.next));
            }
          }
        };

        writer.reset();

        function walk(node) {
          var handler = handlers[node.type], name, isEmpty, attrs, attrName, attrValue, sortedAttrs, i, l, elementRule;

          if (!handler) {
            name = node.name;
            isEmpty = node.shortEnded;
            attrs = node.attributes;

            // Sort attributes
            if (validate && attrs && attrs.length > 1) {
              sortedAttrs = [];
              sortedAttrs.map = {};

              elementRule = schema.getElementRule(node.name);
              if (elementRule) {
                for (i = 0, l = elementRule.attributesOrder.length; i < l; i++) {
                  attrName = elementRule.attributesOrder[i];

                  if (attrName in attrs.map) {
                    attrValue = attrs.map[attrName];
                    sortedAttrs.map[attrName] = attrValue;
                    sortedAttrs.push({ name: attrName, value: attrValue });
                  }
                }

                for (i = 0, l = attrs.length; i < l; i++) {
                  attrName = attrs[i].name;

                  if (!(attrName in sortedAttrs.map)) {
                    attrValue = attrs.map[attrName];
                    sortedAttrs.map[attrName] = attrValue;
                    sortedAttrs.push({ name: attrName, value: attrValue });
                  }
                }

                attrs = sortedAttrs;
              }
            }

            writer.start(node.name, attrs, isEmpty);

            if (!isEmpty) {
              if ((node = node.firstChild)) {
                do {
                  walk(node);
                } while ((node = node.next));
              }

              writer.end(name);
            }
          } else {
            handler(node);
          }
        }

        // Serialize element and treat all non elements as fragments
        if (node.type == 1 && !settings.inner) {
          walk(node);
        } else {
          handlers[11](node);
        }

        return writer.getContent();
      };
    };
  }
);

/**
 * Serializer.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class is used to serialize DOM trees into a string. Consult the TinyMCE Wiki API for
 * more details and examples on how to use this class.
 *
 * @class tinymce.dom.Serializer
 */
define(
  'tinymce.core.dom.Serializer',
  [
    "tinymce.core.dom.DOMUtils",
    "tinymce.core.html.DomParser",
    "tinymce.core.html.SaxParser",
    "tinymce.core.html.Entities",
    "tinymce.core.html.Serializer",
    "tinymce.core.html.Node",
    "tinymce.core.html.Schema",
    "tinymce.core.Env",
    "tinymce.core.util.Tools",
    "tinymce.core.text.Zwsp"
  ],
  function (DOMUtils, DomParser, SaxParser, Entities, Serializer, Node, Schema, Env, Tools, Zwsp) {
    var each = Tools.each, trim = Tools.trim;
    var DOM = DOMUtils.DOM;

    /**
     * IE 11 has a fantastic bug where it will produce two trailing BR elements to iframe bodies when
     * the iframe is hidden by display: none on a parent container. The DOM is actually out of sync
     * with innerHTML in this case. It's like IE adds shadow DOM BR elements that appears on innerHTML
     * but not as the lastChild of the body. So this fix simply removes the last two
     * BR elements at the end of the document.
     *
     * Example of what happens: <body>text</body> becomes <body>text<br><br></body>
     */
    function trimTrailingBr(rootNode) {
      var brNode1, brNode2;

      function isBr(node) {
        return node && node.name === 'br';
      }

      brNode1 = rootNode.lastChild;
      if (isBr(brNode1)) {
        brNode2 = brNode1.prev;

        if (isBr(brNode2)) {
          brNode1.remove();
          brNode2.remove();
        }
      }
    }

    /**
     * Constructs a new DOM serializer class.
     *
     * @constructor
     * @method Serializer
     * @param {Object} settings Serializer settings object.
     * @param {tinymce.Editor} editor Optional editor to bind events to and get schema/dom from.
     */
    return function (settings, editor) {
      var dom, schema, htmlParser, tempAttrs = ["data-mce-selected"];

      if (editor) {
        dom = editor.dom;
        schema = editor.schema;
      }

      function trimHtml(html) {
        var trimContentRegExp = new RegExp([
          '<span[^>]+data-mce-bogus[^>]+>[\u200B\uFEFF]+<\\/span>', // Trim bogus spans like caret containers
          '\\s?(' + tempAttrs.join('|') + ')="[^"]+"' // Trim temporaty data-mce prefixed attributes like data-mce-selected
        ].join('|'), 'gi');

        html = Zwsp.trim(html.replace(trimContentRegExp, ''));

        return html;
      }

      function trimContent(html) {
        var content = html;
        var bogusAllRegExp = /<(\w+) [^>]*data-mce-bogus="all"[^>]*>/g;
        var endTagIndex, index, matchLength, matches, shortEndedElements, schema = editor.schema;

        content = trimHtml(content);
        shortEndedElements = schema.getShortEndedElements();

        // Remove all bogus elements marked with "all"
        while ((matches = bogusAllRegExp.exec(content))) {
          index = bogusAllRegExp.lastIndex;
          matchLength = matches[0].length;

          if (shortEndedElements[matches[1]]) {
            endTagIndex = index;
          } else {
            endTagIndex = SaxParser.findEndTag(schema, content, index);
          }

          content = content.substring(0, index - matchLength) + content.substring(endTagIndex);
          bogusAllRegExp.lastIndex = index - matchLength;
        }

        return content;
      }

      /**
       * Returns a trimmed version of the editor contents to be used for the undo level. This
       * will remove any data-mce-bogus="all" marked elements since these are used for UI it will also
       * remove the data-mce-selected attributes used for selection of objects and caret containers.
       * It will keep all data-mce-bogus="1" elements since these can be used to place the caret etc and will
       * be removed by the serialization logic when you save.
       *
       * @private
       * @return {String} HTML contents of the editor excluding some internal bogus elements.
       */
      function getTrimmedContent() {
        return trimContent(editor.getBody().innerHTML);
      }

      function addTempAttr(name) {
        if (Tools.inArray(tempAttrs, name) === -1) {
          htmlParser.addAttributeFilter(name, function (nodes, name) {
            var i = nodes.length;

            while (i--) {
              nodes[i].attr(name, null);
            }
          });

          tempAttrs.push(name);
        }
      }

      // Default DOM and Schema if they are undefined
      dom = dom || DOM;
      schema = schema || new Schema(settings);
      settings.entity_encoding = settings.entity_encoding || 'named';
      settings.remove_trailing_brs = "remove_trailing_brs" in settings ? settings.remove_trailing_brs : true;

      htmlParser = new DomParser(settings, schema);

      // Convert tabindex back to elements when serializing contents
      htmlParser.addAttributeFilter('data-mce-tabindex', function (nodes, name) {
        var i = nodes.length, node;

        while (i--) {
          node = nodes[i];
          node.attr('tabindex', node.attributes.map['data-mce-tabindex']);
          node.attr(name, null);
        }
      });

      // Convert move data-mce-src, data-mce-href and data-mce-style into nodes or process them if needed
      htmlParser.addAttributeFilter('src,href,style', function (nodes, name) {
        var i = nodes.length, node, value, internalName = 'data-mce-' + name;
        var urlConverter = settings.url_converter, urlConverterScope = settings.url_converter_scope, undef;

        while (i--) {
          node = nodes[i];

          value = node.attributes.map[internalName];
          if (value !== undef) {
            // Set external name to internal value and remove internal
            node.attr(name, value.length > 0 ? value : null);
            node.attr(internalName, null);
          } else {
            // No internal attribute found then convert the value we have in the DOM
            value = node.attributes.map[name];

            if (name === "style") {
              value = dom.serializeStyle(dom.parseStyle(value), node.name);
            } else if (urlConverter) {
              value = urlConverter.call(urlConverterScope, value, name, node.name);
            }

            node.attr(name, value.length > 0 ? value : null);
          }
        }
      });

      // Remove internal classes mceItem<..> or mceSelected
      htmlParser.addAttributeFilter('class', function (nodes) {
        var i = nodes.length, node, value;

        while (i--) {
          node = nodes[i];
          value = node.attr('class');

          if (value) {
            value = node.attr('class').replace(/(?:^|\s)mce-item-\w+(?!\S)/g, '');
            node.attr('class', value.length > 0 ? value : null);
          }
        }
      });

      // Remove bookmark elements
      htmlParser.addAttributeFilter('data-mce-type', function (nodes, name, args) {
        var i = nodes.length, node;

        while (i--) {
          node = nodes[i];

          if (node.attributes.map['data-mce-type'] === 'bookmark' && !args.cleanup) {
            node.remove();
          }
        }
      });

      htmlParser.addNodeFilter('noscript', function (nodes) {
        var i = nodes.length, node;

        while (i--) {
          node = nodes[i].firstChild;

          if (node) {
            node.value = Entities.decode(node.value);
          }
        }
      });

      // Force script into CDATA sections and remove the mce- prefix also add comments around styles
      htmlParser.addNodeFilter('script,style', function (nodes, name) {
        var i = nodes.length, node, value, type;

        function trim(value) {
          /*jshint maxlen:255 */
          /*eslint max-len:0 */
          return value.replace(/(<!--\[CDATA\[|\]\]-->)/g, '\n')
            .replace(/^[\r\n]*|[\r\n]*$/g, '')
            .replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi, '')
            .replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g, '');
        }

        while (i--) {
          node = nodes[i];
          value = node.firstChild ? node.firstChild.value : '';

          if (name === "script") {
            // Remove mce- prefix from script elements and remove default type since the user specified
            // a script element without type attribute
            type = node.attr('type');
            if (type) {
              node.attr('type', type == 'mce-no/type' ? null : type.replace(/^mce\-/, ''));
            }

            if (value.length > 0) {
              node.firstChild.value = '// <![CDATA[\n' + trim(value) + '\n// ]]>';
            }
          } else {
            if (value.length > 0) {
              node.firstChild.value = '<!--\n' + trim(value) + '\n-->';
            }
          }
        }
      });

      // Convert comments to cdata and handle protected comments
      htmlParser.addNodeFilter('#comment', function (nodes) {
        var i = nodes.length, node;

        while (i--) {
          node = nodes[i];

          if (node.value.indexOf('[CDATA[') === 0) {
            node.name = '#cdata';
            node.type = 4;
            node.value = node.value.replace(/^\[CDATA\[|\]\]$/g, '');
          } else if (node.value.indexOf('mce:protected ') === 0) {
            node.name = "#text";
            node.type = 3;
            node.raw = true;
            node.value = unescape(node.value).substr(14);
          }
        }
      });

      htmlParser.addNodeFilter('xml:namespace,input', function (nodes, name) {
        var i = nodes.length, node;

        while (i--) {
          node = nodes[i];
          if (node.type === 7) {
            node.remove();
          } else if (node.type === 1) {
            if (name === "input" && !("type" in node.attributes.map)) {
              node.attr('type', 'text');
            }
          }
        }
      });

      // Remove internal data attributes
      htmlParser.addAttributeFilter(
        'data-mce-src,data-mce-href,data-mce-style,' +
        'data-mce-selected,data-mce-expando,' +
        'data-mce-type,data-mce-resize',

        function (nodes, name) {
          var i = nodes.length;

          while (i--) {
            nodes[i].attr(name, null);
          }
        }
      );

      // Return public methods
      return {
        /**
         * Schema instance that was used to when the Serializer was constructed.
         *
         * @field {tinymce.html.Schema} schema
         */
        schema: schema,

        /**
         * Adds a node filter function to the parser used by the serializer, the parser will collect the specified nodes by name
         * and then execute the callback ones it has finished parsing the document.
         *
         * @example
         * parser.addNodeFilter('p,h1', function(nodes, name) {
         *  for (var i = 0; i < nodes.length; i++) {
         *   console.log(nodes[i].name);
         *  }
         * });
         * @method addNodeFilter
         * @method {String} name Comma separated list of nodes to collect.
         * @param {function} callback Callback function to execute once it has collected nodes.
         */
        addNodeFilter: htmlParser.addNodeFilter,

        /**
         * Adds a attribute filter function to the parser used by the serializer, the parser will
         * collect nodes that has the specified attributes
         * and then execute the callback ones it has finished parsing the document.
         *
         * @example
         * parser.addAttributeFilter('src,href', function(nodes, name) {
         *  for (var i = 0; i < nodes.length; i++) {
         *   console.log(nodes[i].name);
         *  }
         * });
         * @method addAttributeFilter
         * @method {String} name Comma separated list of nodes to collect.
         * @param {function} callback Callback function to execute once it has collected nodes.
         */
        addAttributeFilter: htmlParser.addAttributeFilter,

        /**
         * Serializes the specified browser DOM node into a HTML string.
         *
         * @method serialize
         * @param {DOMNode} node DOM node to serialize.
         * @param {Object} args Arguments option that gets passed to event handlers.
         */
        serialize: function (node, args) {
          var self = this, impl, doc, oldDoc, htmlSerializer, content, rootNode;

          // Explorer won't clone contents of script and style and the
          // selected index of select elements are cleared on a clone operation.
          if (Env.ie && dom.select('script,style,select,map').length > 0) {
            content = node.innerHTML;
            node = node.cloneNode(false);
            dom.setHTML(node, content);
          } else {
            node = node.cloneNode(true);
          }

          // Nodes needs to be attached to something in WebKit/Opera
          // This fix will make DOM ranges and make Sizzle happy!
          impl = document.implementation;
          if (impl.createHTMLDocument) {
            // Create an empty HTML document
            doc = impl.createHTMLDocument("");

            // Add the element or it's children if it's a body element to the new document
            each(node.nodeName == 'BODY' ? node.childNodes : [node], function (node) {
              doc.body.appendChild(doc.importNode(node, true));
            });

            // Grab first child or body element for serialization
            if (node.nodeName != 'BODY') {
              node = doc.body.firstChild;
            } else {
              node = doc.body;
            }

            // set the new document in DOMUtils so createElement etc works
            oldDoc = dom.doc;
            dom.doc = doc;
          }

          args = args || {};
          args.format = args.format || 'html';

          // Don't wrap content if we want selected html
          if (args.selection) {
            args.forced_root_block = '';
          }

          // Pre process
          if (!args.no_events) {
            args.node = node;
            self.onPreProcess(args);
          }

          // Parse HTML
          rootNode = htmlParser.parse(trim(args.getInner ? node.innerHTML : dom.getOuterHTML(node)), args);
          trimTrailingBr(rootNode);

          // Serialize HTML
          htmlSerializer = new Serializer(settings, schema);
          args.content = htmlSerializer.serialize(rootNode);

          // Replace all BOM characters for now until we can find a better solution
          if (!args.cleanup) {
            args.content = Zwsp.trim(args.content);
            args.content = args.content.replace(/\uFEFF/g, '');
          }

          // Post process
          if (!args.no_events) {
            self.onPostProcess(args);
          }

          // Restore the old document if it was changed
          if (oldDoc) {
            dom.doc = oldDoc;
          }

          args.node = null;

          return args.content;
        },

        /**
         * Adds valid elements rules to the serializers schema instance this enables you to specify things
         * like what elements should be outputted and what attributes specific elements might have.
         * Consult the Wiki for more details on this format.
         *
         * @method addRules
         * @param {String} rules Valid elements rules string to add to schema.
         */
        addRules: function (rules) {
          schema.addValidElements(rules);
        },

        /**
         * Sets the valid elements rules to the serializers schema instance this enables you to specify things
         * like what elements should be outputted and what attributes specific elements might have.
         * Consult the Wiki for more details on this format.
         *
         * @method setRules
         * @param {String} rules Valid elements rules string.
         */
        setRules: function (rules) {
          schema.setValidElements(rules);
        },

        onPreProcess: function (args) {
          if (editor) {
            editor.fire('PreProcess', args);
          }
        },

        onPostProcess: function (args) {
          if (editor) {
            editor.fire('PostProcess', args);
          }
        },

        /**
         * Adds a temporary internal attribute these attributes will get removed on undo and
         * when getting contents out of the editor.
         *
         * @method addTempAttr
         * @param {String} name string
         */
        addTempAttr: addTempAttr,

        // Internal
        trimHtml: trimHtml,
        getTrimmedContent: getTrimmedContent,
        trimContent: trimContent
      };
    };
  }
);

/**
 * VK.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This file exposes a set of the common KeyCodes for use. Please grow it as needed.
 */
define(
  'tinymce.core.util.VK',
  [
    "tinymce.core.Env"
  ],
  function (Env) {
    return {
      BACKSPACE: 8,
      DELETE: 46,
      DOWN: 40,
      ENTER: 13,
      LEFT: 37,
      RIGHT: 39,
      SPACEBAR: 32,
      TAB: 9,
      UP: 38,

      modifierPressed: function (e) {
        return e.shiftKey || e.ctrlKey || e.altKey || this.metaKeyPressed(e);
      },

      metaKeyPressed: function (e) {
        // Check if ctrl or meta key is pressed. Edge case for AltGr on Windows where it produces ctrlKey+altKey states
        return (Env.mac ? e.metaKey : e.ctrlKey && !e.altKey);
      }
    };
  }
);

/**
 * ClientRect.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * Utility functions for working with client rects.
 *
 * @private
 * @class tinymce.geom.ClientRect
 */
define(
  'tinymce.core.geom.ClientRect',
  [
  ],
  function () {
    var round = Math.round;

    function clone(rect) {
      if (!rect) {
        return { left: 0, top: 0, bottom: 0, right: 0, width: 0, height: 0 };
      }

      return {
        left: round(rect.left),
        top: round(rect.top),
        bottom: round(rect.bottom),
        right: round(rect.right),
        width: round(rect.width),
        height: round(rect.height)
      };
    }

    function collapse(clientRect, toStart) {
      clientRect = clone(clientRect);

      if (toStart) {
        clientRect.right = clientRect.left;
      } else {
        clientRect.left = clientRect.left + clientRect.width;
        clientRect.right = clientRect.left;
      }

      clientRect.width = 0;

      return clientRect;
    }

    function isEqual(rect1, rect2) {
      return (
        rect1.left === rect2.left &&
        rect1.top === rect2.top &&
        rect1.bottom === rect2.bottom &&
        rect1.right === rect2.right
      );
    }

    function isValidOverflow(overflowY, clientRect1, clientRect2) {
      return overflowY >= 0 && overflowY <= Math.min(clientRect1.height, clientRect2.height) / 2;

    }

    function isAbove(clientRect1, clientRect2) {
      if ((clientRect1.bottom - clientRect1.height / 2) < clientRect2.top) {
        return true;
      }

      if (clientRect1.top > clientRect2.bottom) {
        return false;
      }

      return isValidOverflow(clientRect2.top - clientRect1.bottom, clientRect1, clientRect2);
    }

    function isBelow(clientRect1, clientRect2) {
      if (clientRect1.top > clientRect2.bottom) {
        return true;
      }

      if (clientRect1.bottom < clientRect2.top) {
        return false;
      }

      return isValidOverflow(clientRect2.bottom - clientRect1.top, clientRect1, clientRect2);
    }

    function isLeft(clientRect1, clientRect2) {
      return clientRect1.left < clientRect2.left;
    }

    function isRight(clientRect1, clientRect2) {
      return clientRect1.right > clientRect2.right;
    }

    function compare(clientRect1, clientRect2) {
      if (isAbove(clientRect1, clientRect2)) {
        return -1;
      }

      if (isBelow(clientRect1, clientRect2)) {
        return 1;
      }

      if (isLeft(clientRect1, clientRect2)) {
        return -1;
      }

      if (isRight(clientRect1, clientRect2)) {
        return 1;
      }

      return 0;
    }

    function containsXY(clientRect, clientX, clientY) {
      return (
        clientX >= clientRect.left &&
        clientX <= clientRect.right &&
        clientY >= clientRect.top &&
        clientY <= clientRect.bottom
      );
    }

    return {
      clone: clone,
      collapse: collapse,
      isEqual: isEqual,
      isAbove: isAbove,
      isBelow: isBelow,
      isLeft: isLeft,
      isRight: isRight,
      compare: compare,
      containsXY: containsXY
    };
  }
);

/**
 * RangePoint.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.dom.RangePoint',
  [
    'ephox.katamari.api.Arr',
    'tinymce.core.geom.ClientRect'
  ],
  function (Arr, ClientRect) {
    var isXYWithinRange = function (clientX, clientY, range) {
      if (range.collapsed) {
        return false;
      }

      return Arr.foldl(range.getClientRects(), function (state, rect) {
        return state || ClientRect.containsXY(rect, clientX, clientY);
      }, false);
    };

    return {
      isXYWithinRange: isXYWithinRange
    };
  }
);
/**
 * ControlSelection.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class handles control selection of elements. Controls are elements
 * that can be resized and needs to be selected as a whole. It adds custom resize handles
 * to all browser engines that support properly disabling the built in resize logic.
 *
 * @class tinymce.dom.ControlSelection
 */
define(
  'tinymce.core.dom.ControlSelection',
  [
    'ephox.katamari.api.Fun',
    'tinymce.core.dom.NodeType',
    'tinymce.core.dom.RangePoint',
    'tinymce.core.Env',
    'tinymce.core.util.Delay',
    'tinymce.core.util.Tools',
    'tinymce.core.util.VK'
  ],
  function (Fun, NodeType, RangePoint, Env, Delay, Tools, VK) {
    var isContentEditableFalse = NodeType.isContentEditableFalse;
    var isContentEditableTrue = NodeType.isContentEditableTrue;

    function getContentEditableRoot(root, node) {
      while (node && node != root) {
        if (isContentEditableTrue(node) || isContentEditableFalse(node)) {
          return node;
        }

        node = node.parentNode;
      }

      return null;
    }

    var isImage = function (elm) {
      return elm && elm.nodeName === 'IMG';
    };

    var isEventOnImageOutsideRange = function (evt, range) {
      return isImage(evt.target) && !RangePoint.isXYWithinRange(evt.clientX, evt.clientY, range);
    };

    var contextMenuSelectImage = function (editor, evt) {
      var target = evt.target;

      if (isEventOnImageOutsideRange(evt, editor.selection.getRng()) && !evt.isDefaultPrevented()) {
        evt.preventDefault();
        editor.selection.select(target);
      }
    };

    return function (selection, editor) {
      var dom = editor.dom, each = Tools.each;
      var selectedElm, selectedElmGhost, resizeHelper, resizeHandles, selectedHandle, lastMouseDownEvent;
      var startX, startY, selectedElmX, selectedElmY, startW, startH, ratio, resizeStarted;
      var width, height, editableDoc = editor.getDoc(), rootDocument = document, isIE = Env.ie && Env.ie < 11;
      var abs = Math.abs, round = Math.round, rootElement = editor.getBody(), startScrollWidth, startScrollHeight;

      // Details about each resize handle how to scale etc
      resizeHandles = {
        // Name: x multiplier, y multiplier, delta size x, delta size y
        /*n: [0.5, 0, 0, -1],
        e: [1, 0.5, 1, 0],
        s: [0.5, 1, 0, 1],
        w: [0, 0.5, -1, 0],*/
        nw: [0, 0, -1, -1],
        ne: [1, 0, 1, -1],
        se: [1, 1, 1, 1],
        sw: [0, 1, -1, 1]
      };

      // Add CSS for resize handles, cloned element and selected
      var rootClass = '.mce-content-body';
      editor.contentStyles.push(
        rootClass + ' div.mce-resizehandle {' +
        'position: absolute;' +
        'border: 1px solid black;' +
        'box-sizing: box-sizing;' +
        'background: #FFF;' +
        'width: 7px;' +
        'height: 7px;' +
        'z-index: 10000' +
        '}' +
        rootClass + ' .mce-resizehandle:hover {' +
        'background: #000' +
        '}' +
        rootClass + ' img[data-mce-selected],' + rootClass + ' hr[data-mce-selected] {' +
        'outline: 1px solid black;' +
        'resize: none' + // Have been talks about implementing this in browsers
        '}' +
        rootClass + ' .mce-clonedresizable {' +
        'position: absolute;' +
        (Env.gecko ? '' : 'outline: 1px dashed black;') + // Gecko produces trails while resizing
        'opacity: .5;' +
        'filter: alpha(opacity=50);' +
        'z-index: 10000' +
        '}' +
        rootClass + ' .mce-resize-helper {' +
        'background: #555;' +
        'background: rgba(0,0,0,0.75);' +
        'border-radius: 3px;' +
        'border: 1px;' +
        'color: white;' +
        'display: none;' +
        'font-family: sans-serif;' +
        'font-size: 12px;' +
        'white-space: nowrap;' +
        'line-height: 14px;' +
        'margin: 5px 10px;' +
        'padding: 5px;' +
        'position: absolute;' +
        'z-index: 10001' +
        '}'
      );

      function isResizable(elm) {
        var selector = editor.settings.object_resizing;

        if (selector === false || Env.iOS) {
          return false;
        }

        if (typeof selector != 'string') {
          selector = 'table,img,div';
        }

        if (elm.getAttribute('data-mce-resize') === 'false') {
          return false;
        }

        if (elm == editor.getBody()) {
          return false;
        }

        return editor.dom.is(elm, selector);
      }

      function resizeGhostElement(e) {
        var deltaX, deltaY, proportional;
        var resizeHelperX, resizeHelperY;

        // Calc new width/height
        deltaX = e.screenX - startX;
        deltaY = e.screenY - startY;

        // Calc new size
        width = deltaX * selectedHandle[2] + startW;
        height = deltaY * selectedHandle[3] + startH;

        // Never scale down lower than 5 pixels
        width = width < 5 ? 5 : width;
        height = height < 5 ? 5 : height;

        if (selectedElm.nodeName == "IMG" && editor.settings.resize_img_proportional !== false) {
          proportional = !VK.modifierPressed(e);
        } else {
          proportional = VK.modifierPressed(e) || (selectedElm.nodeName == "IMG" && selectedHandle[2] * selectedHandle[3] !== 0);
        }

        // Constrain proportions
        if (proportional) {
          if (abs(deltaX) > abs(deltaY)) {
            height = round(width * ratio);
            width = round(height / ratio);
          } else {
            width = round(height / ratio);
            height = round(width * ratio);
          }
        }

        // Update ghost size
        dom.setStyles(selectedElmGhost, {
          width: width,
          height: height
        });

        // Update resize helper position
        resizeHelperX = selectedHandle.startPos.x + deltaX;
        resizeHelperY = selectedHandle.startPos.y + deltaY;
        resizeHelperX = resizeHelperX > 0 ? resizeHelperX : 0;
        resizeHelperY = resizeHelperY > 0 ? resizeHelperY : 0;

        dom.setStyles(resizeHelper, {
          left: resizeHelperX,
          top: resizeHelperY,
          display: 'block'
        });

        resizeHelper.innerHTML = width + ' &times; ' + height;

        // Update ghost X position if needed
        if (selectedHandle[2] < 0 && selectedElmGhost.clientWidth <= width) {
          dom.setStyle(selectedElmGhost, 'left', selectedElmX + (startW - width));
        }

        // Update ghost Y position if needed
        if (selectedHandle[3] < 0 && selectedElmGhost.clientHeight <= height) {
          dom.setStyle(selectedElmGhost, 'top', selectedElmY + (startH - height));
        }

        // Calculate how must overflow we got
        deltaX = rootElement.scrollWidth - startScrollWidth;
        deltaY = rootElement.scrollHeight - startScrollHeight;

        // Re-position the resize helper based on the overflow
        if (deltaX + deltaY !== 0) {
          dom.setStyles(resizeHelper, {
            left: resizeHelperX - deltaX,
            top: resizeHelperY - deltaY
          });
        }

        if (!resizeStarted) {
          editor.fire('ObjectResizeStart', { target: selectedElm, width: startW, height: startH });
          resizeStarted = true;
        }
      }

      function endGhostResize() {
        resizeStarted = false;

        function setSizeProp(name, value) {
          if (value) {
            // Resize by using style or attribute
            if (selectedElm.style[name] || !editor.schema.isValid(selectedElm.nodeName.toLowerCase(), name)) {
              dom.setStyle(selectedElm, name, value);
            } else {
              dom.setAttrib(selectedElm, name, value);
            }
          }
        }

        // Set width/height properties
        setSizeProp('width', width);
        setSizeProp('height', height);

        dom.unbind(editableDoc, 'mousemove', resizeGhostElement);
        dom.unbind(editableDoc, 'mouseup', endGhostResize);

        if (rootDocument != editableDoc) {
          dom.unbind(rootDocument, 'mousemove', resizeGhostElement);
          dom.unbind(rootDocument, 'mouseup', endGhostResize);
        }

        // Remove ghost/helper and update resize handle positions
        dom.remove(selectedElmGhost);
        dom.remove(resizeHelper);

        if (!isIE || selectedElm.nodeName == "TABLE") {
          showResizeRect(selectedElm);
        }

        editor.fire('ObjectResized', { target: selectedElm, width: width, height: height });
        dom.setAttrib(selectedElm, 'style', dom.getAttrib(selectedElm, 'style'));
        editor.nodeChanged();
      }

      function showResizeRect(targetElm, mouseDownHandleName, mouseDownEvent) {
        var position, targetWidth, targetHeight, e, rect;

        hideResizeRect();
        unbindResizeHandleEvents();

        // Get position and size of target
        position = dom.getPos(targetElm, rootElement);
        selectedElmX = position.x;
        selectedElmY = position.y;
        rect = targetElm.getBoundingClientRect(); // Fix for Gecko offsetHeight for table with caption
        targetWidth = rect.width || (rect.right - rect.left);
        targetHeight = rect.height || (rect.bottom - rect.top);

        // Reset width/height if user selects a new image/table
        if (selectedElm != targetElm) {
          detachResizeStartListener();
          selectedElm = targetElm;
          width = height = 0;
        }

        // Makes it possible to disable resizing
        e = editor.fire('ObjectSelected', { target: targetElm });

        if (isResizable(targetElm) && !e.isDefaultPrevented()) {
          each(resizeHandles, function (handle, name) {
            var handleElm;

            function startDrag(e) {
              startX = e.screenX;
              startY = e.screenY;
              startW = selectedElm.clientWidth;
              startH = selectedElm.clientHeight;
              ratio = startH / startW;
              selectedHandle = handle;

              handle.startPos = {
                x: targetWidth * handle[0] + selectedElmX,
                y: targetHeight * handle[1] + selectedElmY
              };

              startScrollWidth = rootElement.scrollWidth;
              startScrollHeight = rootElement.scrollHeight;

              selectedElmGhost = selectedElm.cloneNode(true);
              dom.addClass(selectedElmGhost, 'mce-clonedresizable');
              dom.setAttrib(selectedElmGhost, 'data-mce-bogus', 'all');
              selectedElmGhost.contentEditable = false; // Hides IE move layer cursor
              selectedElmGhost.unSelectabe = true;
              dom.setStyles(selectedElmGhost, {
                left: selectedElmX,
                top: selectedElmY,
                margin: 0
              });

              selectedElmGhost.removeAttribute('data-mce-selected');
              rootElement.appendChild(selectedElmGhost);

              dom.bind(editableDoc, 'mousemove', resizeGhostElement);
              dom.bind(editableDoc, 'mouseup', endGhostResize);

              if (rootDocument != editableDoc) {
                dom.bind(rootDocument, 'mousemove', resizeGhostElement);
                dom.bind(rootDocument, 'mouseup', endGhostResize);
              }

              resizeHelper = dom.add(rootElement, 'div', {
                'class': 'mce-resize-helper',
                'data-mce-bogus': 'all'
              }, startW + ' &times; ' + startH);
            }

            if (mouseDownHandleName) {
              // Drag started by IE native resizestart
              if (name == mouseDownHandleName) {
                startDrag(mouseDownEvent);
              }

              return;
            }

            // Get existing or render resize handle
            handleElm = dom.get('mceResizeHandle' + name);
            if (handleElm) {
              dom.remove(handleElm);
            }

            handleElm = dom.add(rootElement, 'div', {
              id: 'mceResizeHandle' + name,
              'data-mce-bogus': 'all',
              'class': 'mce-resizehandle',
              unselectable: true,
              style: 'cursor:' + name + '-resize; margin:0; padding:0'
            });

            // Hides IE move layer cursor
            // If we set it on Chrome we get this wounderful bug: #6725
            if (Env.ie) {
              handleElm.contentEditable = false;
            }

            dom.bind(handleElm, 'mousedown', function (e) {
              e.stopImmediatePropagation();
              e.preventDefault();
              startDrag(e);
            });

            handle.elm = handleElm;

            // Position element
            dom.setStyles(handleElm, {
              left: (targetWidth * handle[0] + selectedElmX) - (handleElm.offsetWidth / 2),
              top: (targetHeight * handle[1] + selectedElmY) - (handleElm.offsetHeight / 2)
            });
          });
        } else {
          hideResizeRect();
        }

        selectedElm.setAttribute('data-mce-selected', '1');
      }

      function hideResizeRect() {
        var name, handleElm;

        unbindResizeHandleEvents();

        if (selectedElm) {
          selectedElm.removeAttribute('data-mce-selected');
        }

        for (name in resizeHandles) {
          handleElm = dom.get('mceResizeHandle' + name);
          if (handleElm) {
            dom.unbind(handleElm);
            dom.remove(handleElm);
          }
        }
      }

      function updateResizeRect(e) {
        var startElm, controlElm;

        function isChildOrEqual(node, parent) {
          if (node) {
            do {
              if (node === parent) {
                return true;
              }
            } while ((node = node.parentNode));
          }
        }

        // Ignore all events while resizing or if the editor instance was removed
        if (resizeStarted || editor.removed) {
          return;
        }

        // Remove data-mce-selected from all elements since they might have been copied using Ctrl+c/v
        each(dom.select('img[data-mce-selected],hr[data-mce-selected]'), function (img) {
          img.removeAttribute('data-mce-selected');
        });

        controlElm = e.type == 'mousedown' ? e.target : selection.getNode();
        controlElm = dom.$(controlElm).closest(isIE ? 'table' : 'table,img,hr')[0];

        if (isChildOrEqual(controlElm, rootElement)) {
          disableGeckoResize();
          startElm = selection.getStart(true);

          if (isChildOrEqual(startElm, controlElm) && isChildOrEqual(selection.getEnd(true), controlElm)) {
            if (!isIE || (controlElm != startElm && startElm.nodeName !== 'IMG')) {
              showResizeRect(controlElm);
              return;
            }
          }
        }

        hideResizeRect();
      }

      function attachEvent(elm, name, func) {
        if (elm && elm.attachEvent) {
          elm.attachEvent('on' + name, func);
        }
      }

      function detachEvent(elm, name, func) {
        if (elm && elm.detachEvent) {
          elm.detachEvent('on' + name, func);
        }
      }

      function resizeNativeStart(e) {
        var target = e.srcElement, pos, name, corner, cornerX, cornerY, relativeX, relativeY;

        pos = target.getBoundingClientRect();
        relativeX = lastMouseDownEvent.clientX - pos.left;
        relativeY = lastMouseDownEvent.clientY - pos.top;

        // Figure out what corner we are draging on
        for (name in resizeHandles) {
          corner = resizeHandles[name];

          cornerX = target.offsetWidth * corner[0];
          cornerY = target.offsetHeight * corner[1];

          if (abs(cornerX - relativeX) < 8 && abs(cornerY - relativeY) < 8) {
            selectedHandle = corner;
            break;
          }
        }

        // Remove native selection and let the magic begin
        resizeStarted = true;
        editor.fire('ObjectResizeStart', {
          target: selectedElm,
          width: selectedElm.clientWidth,
          height: selectedElm.clientHeight
        });
        editor.getDoc().selection.empty();
        showResizeRect(target, name, lastMouseDownEvent);
      }

      function preventDefault(e) {
        if (e.preventDefault) {
          e.preventDefault();
        } else {
          e.returnValue = false; // IE
        }
      }

      function isWithinContentEditableFalse(elm) {
        return isContentEditableFalse(getContentEditableRoot(editor.getBody(), elm));
      }

      function nativeControlSelect(e) {
        var target = e.srcElement;

        if (isWithinContentEditableFalse(target)) {
          preventDefault(e);
          return;
        }

        if (target != selectedElm) {
          editor.fire('ObjectSelected', { target: target });
          detachResizeStartListener();

          if (target.id.indexOf('mceResizeHandle') === 0) {
            e.returnValue = false;
            return;
          }

          if (target.nodeName == 'IMG' || target.nodeName == 'TABLE') {
            hideResizeRect();
            selectedElm = target;
            attachEvent(target, 'resizestart', resizeNativeStart);
          }
        }
      }

      function detachResizeStartListener() {
        detachEvent(selectedElm, 'resizestart', resizeNativeStart);
      }

      function unbindResizeHandleEvents() {
        for (var name in resizeHandles) {
          var handle = resizeHandles[name];

          if (handle.elm) {
            dom.unbind(handle.elm);
            delete handle.elm;
          }
        }
      }

      function disableGeckoResize() {
        try {
          // Disable object resizing on Gecko
          editor.getDoc().execCommand('enableObjectResizing', false, false);
        } catch (ex) {
          // Ignore
        }
      }

      function controlSelect(elm) {
        var ctrlRng;

        if (!isIE) {
          return;
        }

        ctrlRng = editableDoc.body.createControlRange();

        try {
          ctrlRng.addElement(elm);
          ctrlRng.select();
          return true;
        } catch (ex) {
          // Ignore since the element can't be control selected for example a P tag
        }
      }

      editor.on('init', function () {
        if (isIE) {
          // Hide the resize rect on resize and reselect the image
          editor.on('ObjectResized', function (e) {
            if (e.target.nodeName != 'TABLE') {
              hideResizeRect();
              controlSelect(e.target);
            }
          });

          attachEvent(rootElement, 'controlselect', nativeControlSelect);

          editor.on('mousedown', function (e) {
            lastMouseDownEvent = e;
          });
        } else {
          disableGeckoResize();

          // Sniff sniff, hard to feature detect this stuff
          if (Env.ie >= 11) {
            // Nee��H� 0� �	`�C�r���� ��E-�@�����B$T�rH!������rk `m,F�p,�
m���
�d@
��("��;�6�,�

P{PK8P���� O%�3P* C 'D�;)��	HA� NJD[�J�� G�>-ZG�HZ�6��TH�:"����
�U#�3VΨ�I��c3	�%;.!U� 
&�GP�-*�Q����dE��/�����(�om
J&��� ���  �Rc��R�D�ɄÒƩ�S9��jgIaN����@�L�>�R<�,P00+ &��R	T ��	S Q� H<��NQA� �	,l�A҈��h����	�I��u5P:=!� @:�i� ��DA�t8�D�2!#��$ 6�"�*�G"@S3`@"	�§&��H�0H%l�O�oB�B3c����Ec�
 �c( �ј��z'����F0b�!�U��5L�.L7�F{�S?�`�t$Qa-0]GW&N"� W�N_`Bf� ��b�!�G8�������� 
H,��"��nh�&Q��$0�eH� �m
�$�g���@���0t�$����D��@�_c|���"q�@#�
8,�H�� ��a!�2�Ċ�� `�p� @�1,0�(�	�P �AҦ�; 
� da����
���H4L@�L@�!`�pLb�q� p��� &
��a��p��2B �đ��Dm�N�)MQ ���?1&�CdE�|�����z��X�$�[& �t
dD�
�b���X��R&p`Kp�$S*b�$R��C���G �$6��-�������l%S҄PD��c`@� �d2D.�
q �`$A0����q¦& K�6�y�Q �2�I��ՐP���� ��:D �d�pW���$��(4,��A���q(R^�s�ØD]�2h� 0JHvM���w"0B�. t/TL�����C�lژ��-��"�C@�$]!0!G!&}�P���i&P" !ƌH�<y�f1%CjXTglwg�?V�@#6;HP����s�Hx+7F��  (aŀp6! �(M��TDt�	T"��e:� �3˓#���� @�E1��D�`# @�� c`���;#8 M"��2P��0 �422�, $��
Ȉ]�a" � �	 E���H�x��"�!ԠA�  ����X���TBө@:
� ��Ӑ*C ,�Q�jȃ `Mr�Q���
�N�H5�2��C� (H �-�C1�ML�D��	�Oj�(���!���P<�  b� bpa(D$�@��U��(�z)c�@�	H�E�A�U��DΝDK�`!E�� $� � Wt@��JȈBhAˡ�0�BM�$ |@CpH�5DKn0� �.p�uՌR���I		BD���X
�XW �	�� ��� ��i�l�$��T��&�F� ��@��R�Id��"D�!��1uQkE q��!�����ǆ�� :��C�Z�u�P�6�T�|]l��!Lx��p��a���2C�v:���  �
K �� D� 4�4�S��FRC�ɀ�@�r>��Z�u�K� Z5+H��F�#/�R�P!i
�.�a�v�*+���.:�ݷA
 ���V�$�kPӅB ��iPL
@��%h� ���K2�c%)X��ł"0x�6�#L�3\�d!$�FE�JAF�AB
D!��)����kHrK �Oep�
X =M%!��$����(P ���Ǳ1K�I����	0�c@+@>E�љBC`�������7�z��E�,@���0� H�l$&��Hƕ`K�i�<$(D&�U#Da�f�F��
��A�H�&8h�+�P�p�Bj	�,U�j�  D@5HD���& #�+�%p�H"�H��� $o�e4�k4c�+er%�!����� ;�

	#
	d���@Q*�$��8�@�C)�p@�!
 �� A�%@�&���!�&�@L�@�B uV���!� ,�D�3U�H��OB@ z�V�RP
 �<� ��u�� �QL�$x
*�*�B�a��0 $��A��!pZd
$s@ANLl�C  bj-0 �܄��C������4 #�U#k�	�F�ꄄK�d�Гq� C#X���5J�&�#�8�ss��$�
�C m ΢�h!a ��# k@�tCw��� `����RP�E @?�)	��Tp�@�#b�h��PPT�1!�MAW| �!�D p�@(ff� �"< �'��e�%) 4�T @/	����Q/���8�@�0d�$��i�**.Bj�	��� F� '@V�,�)�F��Z
)bBmꄔ�l���%��a�n� ��Cf� "
*��4 C� I�����D�I8w0������%�e)Xo�A	Q��li�^0�o�� � � ���DX�M�T�$�� /��m:|�, o�� " A��!�V
C�`E�� �U�h; i++) {
          if (!args[i](x)) {
            return false;
          }
        }

        return true;
      };
    }

    function curry(fn) {
      var args = slice.call(arguments);

      if (args.length - 1 >= fn.length) {
        return fn.apply(this, args.slice(1));
      }

      return function () {
        var tempArgs = args.concat([].slice.call(arguments));
        return curry.apply(this, tempArgs);
      };
    }

    function noop() {
    }

    return {
      constant: constant,
      negate: negate,
      and: and,
      or: or,
      curry: curry,
      compose: compose,
      noop: noop
    };
  }
);
/**
 * CaretCandidate.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This module contains logic for handling caret candidates. A caret candidate is
 * for example text nodes, images, input elements, cE=false elements etc.
 *
 * @private
 * @class tinymce.caret.CaretCandidate
 */
define(
  'tinymce.core.caret.CaretCandidate',
  [
    "tinymce.core.dom.NodeType",
    "tinymce.core.util.Arr",
    "tinymce.core.caret.CaretContainer"
  ],
  function (NodeType, Arr, CaretContainer) {
    var isContentEditableTrue = NodeType.isContentEditableTrue,
      isContentEditableFalse = NodeType.isContentEditableFalse,
      isBr = NodeType.isBr,
      isText = NodeType.isText,
      isInvalidTextElement = NodeType.matchNodeNames('script style textarea'),
      isAtomicInline = NodeType.matchNodeNames('img input textarea hr iframe video audio object'),
      isTable = NodeType.matchNodeNames('table'),
      isCaretContainer = CaretContainer.isCaretContainer;

    function isCaretCandidate(node) {
      if (isCaretContainer(node)) {
        return false;
      }

      if (isText(node)) {
        if (isInvalidTextElement(node.parentNode)) {
          return false;
        }

        return true;
      }

      return isAtomicInline(node) || isBr(node) || isTable(node) || isContentEditableFalse(node);
    }

    function isInEditable(node, rootNode) {
      for (node = node.parentNode; node && node != rootNode; node = node.parentNode) {
        if (isContentEditableFalse(node)) {
          return false;
        }

        if (isContentEditableTrue(node)) {
          return true;
        }
      }

      return true;
    }

    function isAtomicContentEditableFalse(node) {
      if (!isContentEditableFalse(node)) {
        return false;
      }

      return Arr.reduce(node.getElementsByTagName('*'), function (result, elm) {
        return result || isContentEditableTrue(elm);
      }, false) !== true;
    }

    function isAtomic(node) {
      return isAtomicInline(node) || isAtomicContentEditableFalse(node);
    }

    function isEditableCaretCandidate(node, rootNode) {
      return isCaretCandidate(node) && isInEditable(node, rootNode);
    }

    return {
      isCaretCandidate: isCaretCandidate,
      isInEditable: isInEditable,
      isAtomic: isAtomic,
      isEditableCaretCandidate: isEditableCaretCandidate
    };
  }
);
/**
 * ExtendingChar.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class contains logic for detecting extending characters.
 *
 * @private
 * @class tinymce.text.ExtendingChar
 * @example
 * var isExtending = ExtendingChar.isExtendingChar('a');
 */
define(
  'tinymce.core.text.ExtendingChar',
  [
  ],
  function () {
    // Generated from: http://www.unicode.org/Public/UNIDATA/DerivedCoreProperties.txt
    // Only includes the characters in that fit into UCS-2 16 bit
    var extendingChars = new RegExp(
      "[\u0300-\u036F\u0483-\u0487\u0488-\u0489\u0591-\u05BD\u05BF\u05C1-\u05C2\u05C4-\u05C5\u05C7\u0610-\u061A" +
      "\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7-\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0" +
      "\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08E3-\u0902\u093A\u093C" +
      "\u0941-\u0948\u094D\u0951-\u0957\u0962-\u0963\u0981\u09BC\u09BE\u09C1-\u09C4\u09CD\u09D7\u09E2-\u09E3" +
      "\u0A01-\u0A02\u0A3C\u0A41-\u0A42\u0A47-\u0A48\u0A4B-\u0A4D\u0A51\u0A70-\u0A71\u0A75\u0A81-\u0A82\u0ABC" +
      "\u0AC1-\u0AC5\u0AC7-\u0AC8\u0ACD\u0AE2-\u0AE3\u0B01\u0B3C\u0B3E\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B57" +
      "\u0B62-\u0B63\u0B82\u0BBE\u0BC0\u0BCD\u0BD7\u0C00\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55-\u0C56" +
      "\u0C62-\u0C63\u0C81\u0CBC\u0CBF\u0CC2\u0CC6\u0CCC-\u0CCD\u0CD5-\u0CD6\u0CE2-\u0CE3\u0D01\u0D3E\u0D41-\u0D44" +
      "\u0D4D\u0D57\u0D62-\u0D63\u0DCA\u0DCF\u0DD2-\u0DD4\u0DD6\u0DDF\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9" +
      "\u0EBB-\u0EBC\u0EC8-\u0ECD\u0F18-\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86-\u0F87\u0F8D-\u0F97" +
      "\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039-\u103A\u103D-\u103E\u1058-\u1059\u105E-\u1060\u1071-\u1074" +
      "\u1082\u1085-\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752-\u1753\u1772-\u1773\u17B4-\u17B5" +
      "\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u1922\u1927-\u1928\u1932\u1939-\u193B\u1A17-\u1A18" +
      "\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABD\u1ABE\u1B00-\u1B03\u1B34" +
      "\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80-\u1B81\u1BA2-\u1BA5\u1BA8-\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8-\u1BE9" +
      "\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8-\u1CF9" +
      "\u1DC0-\u1DF5\u1DFC-\u1DFF\u200C-\u200D\u20D0-\u20DC\u20DD-\u20E0\u20E1\u20E2-\u20E4\u20E5-\u20F0\u2CEF-\u2CF1" +
      "\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u302E-\u302F\u3099-\u309A\uA66F\uA670-\uA672\uA674-\uA67D\uA69E-\uA69F\uA6F0-\uA6F1" +
      "\uA802\uA806\uA80B\uA825-\uA826\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC" +
      "\uA9E5\uAA29-\uAA2E\uAA31-\uAA32\uAA35-\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7-\uAAB8\uAABE-\uAABF\uAAC1" +
      "\uAAEC-\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFF9E-\uFF9F]"
    );

    function isExtendingChar(ch) {
      return typeof ch == "string" && ch.charCodeAt(0) >= 768 && extendingChars.test(ch);
    }

    return {
      isExtendingChar: isExtendingChar
    };
  }
);
/**
 * CaretPosition.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This module contains logic for creating caret positions within a document a caretposition
 * is similar to a DOMRange object but it doesn't have two endpoints and is also more lightweight
 * since it's now updated live when the DOM changes.
 *
 * @private
 * @class tinymce.caret.CaretPosition
 * @example
 * var caretPos1 = new CaretPosition(container, offset);
 * var caretPos2 = CaretPosition.fromRangeStart(someRange);
 */
define(
  'tinymce.core.caret.CaretPosition',
  [
    "tinymce.core.util.Fun",
    "tinymce.core.dom.NodeType",
    "tinymce.core.dom.DOMUtils",
    "tinymce.core.dom.RangeUtils",
    "tinymce.core.caret.CaretCandidate",
    "tinymce.core.geom.ClientRect",
    "tinymce.core.text.ExtendingChar"
  ],
  function (Fun, NodeType, DOMUtils, RangeUtils, CaretCandidate, ClientRect, ExtendingChar) {
    var isElement = NodeType.isElement,
      isCaretCandidate = CaretCandidate.isCaretCandidate,
      isBlock = NodeType.matchStyleValues('display', 'block table'),
      isFloated = NodeType.matchStyleValues('float', 'left right'),
      isValidElementCaretCandidate = Fun.and(isElement, isCaretCandidate, Fun.negate(isFloated)),
      isNotPre = Fun.negate(NodeType.matchStyleValues('white-space', 'pre pre-line pre-wrap')),
      isText = NodeType.isText,
      isBr = NodeType.isBr,
      nodeIndex = DOMUtils.nodeIndex,
      resolveIndex = RangeUtils.getNode;

    function createRange(doc) {
      return "createRange" in doc ? doc.create�m���
S���V_Ŀ�:؄�m�!Yٛ�I[�EVF����vі�|��s�z}l��;3�|z
` D �A�� �,Q
H�[� �F*0  H�b$� F��B�
�g@
c�Ad�T��8  ��/�p-A�����1�
� �B
�89� ;��!Q�:��#EN���Q� �QV ��#�p A�
��� ��D<!��:(�&&6��^�I堪�R-�
�F�" DN	I,F@A�B!��vi  � F;A 3���C�BD� 1`	(���<�@e�LЀ�P I�
L��! !@p��A
��DTAb�$��E7D	j �
`
�P:��5���9�׾���.>��GF��xek�>eϗV�Y�U����ȇ�w�'���]��Odu7�x��W������������$��L�_�?���˾��]5vo���w��i6�/=����[b�n��-��o5�}��g_��9���g��)ڭ��﫾�yRo֑��kÂט���-���k���	�����n�>�ϝ��������?�����L��n����w��~�>���ͥ�Yiy�u}�����{O?��h��x�D��j��a�� a-@'�q2D����`�S�3 �d�?
�  h�\��0BM�`4`t�� _K pJ���4"�!$�8J Ib��@�H�"A�(�a� 
��  K��D1\�
�㤋�J����TV�m�V�}φ�/��߶yo��7��U_�W�l}d���޶�}�yZ�[�w��:�}J�����9E�s��f��_[p׿>���O����z��7}/���F���/�짛˷���_v�m��G4㗟~7�|ؔ@��
�F�J*�
W�d) @%
�B�
�#(Kx �
�r ��1�5��)� Bt0�0�,	pLJщB���ԁJ�J�C5��0����xD(�FFs�T�Gq;�����rE6��r�߿�����V���Ewlѿ^_���R�{���

KLx�����Y_���e�f�]��K��{f�mҥ�#��NW����o�U��y�?~i�w��nf��_��M����7������]���#ԧ?N��]��;�R�@�Bb��@�j�1�T�g�(c˨�#	�$Qp�B(X�����e,�@D���@g����H7` .�H4` PI��z !��	#�@���Bp	��DR�(P���P:q����Ϳ����9b����_���W�K������|���{���so��t|����ؿ�/��cM��#�J��~=�D���}>�ed���|�����V���ݸO>��������-������6��߯���5񭽃;j��_�������ɗ���<���>�Cg��P�?{���LYu�o�~��F6}'������{���O7={S�#]{7�ϼ���������󯰞����Go���{����n���!�����q��� Т�#"��!Kq�
)����R����7�S�c����s��Z;����������n]�n��wN����u ��+�޿��ׯ����,�\r�
�B � A�9� ���'$"ՄC� $��)e��`�@ �-��m� PҀe�p
� 2�@d B@q@���<L��A�
D "`�"! !� (-�t���� `4K�eE�ʉP]@��Q�����U�ذ � V��z:�v���
��h��CP�P��B	�R`� �4��h@F� �5'�GPR���@  ���"B�V������DA  h'Ƃ=�@�p9f�Q$�Q��� �а�X(��0�yR�#%(B0D*"�C�D ��c�I ����WIp)�d 2���eda �)h #�.�L 1�PD�,��i#�&�F k<
AK�AB�)�@%:��1�8�&!t�8�q(q��B��q�I�D�����&>�ƅ��֎z<�<�n�\��]���;;�Ǜ��6ߵ��o������f��v�ǿ��5c�}��+6��6|�#�o�⟼��ّ�p��{:����bN��p��t���ഷ�����B�)Gp(� 0��P0@u
r3B�*��4�VJ����[tU��QE�$� �u���0� Ȥ�t��lV���L��޴_c���c?-��E�����s�+g��������M���߆F�]���e��ڏs�������|�������o���0߹����n�zN�2sy��ܮ_/�?����TO���o�璯>oU���=��7���?�{�O���߽��zҹ���?4F��~k���[������w��Z�K>F2}w����{���=��fɳ�
|ZHDJ"]��A"�t� �b �(�Bb`���" .
�&�
Ƃ	PD�4�8�Q2$��?C0 �`�c��B@#�� 
]�S�P0a4�R�2I`p��Ɋ�G6HȠ�HP6BA2S�@PG `�"@�P�� �(`T'"�б`Ƅ�S�`�H��L�X� ��������R	QA�Z!SD��PB�|A�+E�	 1#��	xAI���m`9����j����=�禰�}]R��'�a���-������������_�ھgP�Uѽ�u�߮�ӫ����8�6}�7�oSy���[�V��_1����w�g�{��Wݩݪ]s�ya^E����v���>}>��Ѵ��'�����E�ȫ�br�N`�� Ā ��+��I�0��`NY����h� � a�(UP]R-la����D�
�@(L
F�Ќ�B,&���-Q!A� ypH@��8����{͎��j|�ۥ�ӵGW���co�g���k�5u��U���cN�n�K�쾝÷�>�����w�K����qxo}�e9�r��y�������wv߹^��c�/�wv���J�q��ܸ�G�N�%�6������X����e^��ؗ�}v����������p�O������~�������!��7_X�t�����c��������[���]�tG��������?��M'U������O��GoG#W��������B�r$MpA
J%= #8��0`�8E��DR�DH  
)��:�fPH|@j�"H�ȉ�	e)��Ilr�BB��6��� ��WD ��� Kp�G0� �j�	z �@	@�t�h�I�j��g�*z�ڼ�d���{5���+�����oֿ�����8���V�M��8e��ֽ%9������W�&�.�����ajo������������WU1�O��'��s���/����*5��������u��Ҁu I&VT�p � 1؁B���@��0X�e	�XH�qB ���l 1���)�
�*��i� 6|3�
 �a�Qt �� ����3%�p`ȈD���ҍA� �M���m���Xd �U2�$���C��y5�c(d<��P
p@��`�$J�B,�C0 ,0��i<b
5�41@D*�Q  �@�� ��� #�����9 ��������|g�o����G"��/~��q�[M�=����_���]��ֻϧ�������_q�L�?޿����`/�[�����_s��N(=Z�`��ӓ���P���k�k7Si�5G���~��G�n���?�5�ψ��0ʔ�!@  p�%�Q�� L5� 0(�Q����"x�@@0S�H�B�� �
@���9KB1J �k�$B 	h�D!A$�xb@8 ����8.��HB��#�
.Y  ��+s18p s�?�twJ�^�{?z���6�{w}�7�Sf���+�������];���5�S��U+��w������~������->1h�1��C��z{�WW|�+�;���߇�s��޿;P���{�"�O�:��=�S���|8��s��������������k:���<Շ��efn��\��g���E�{���i��}����ꆞ������?�I�D�̰id��}������w�Gk�w���������^z�����vN�=�o��z�>V}������X"�
�/8fvL�@BB�"F*h )E� I�Jm�L�` B�L&1kJS��ހX��D�@#�	
|��a+���!4 l �kWʀ� $.�"T*E �d
I  ���d��02 ~y5s�O�����y�~�y��W$�Ͽ�|�e����w�R�N���I���?s=���P���ܯ+G�����4�`>���͵����S���|��2���������O�0�]������_�ޕ�ҿc�FmFW?������P d�0("	9�F4 5����
#D+K�������L�5T
H
�D� @ r�  "�dix G��8!58�%P�_`�Q@�A��Q '��
�<�ͫC�c� Bb 
� �����8 ��@�P}@@Gd��˂5P`��h�
@%� % b�@�a8������	�,�ƈ2KƑ@(#"�i(8)
H�A@	��� �ĠQ����_��ӻ�oP=���79�ޢvGU��	�ݿ������}:�O6����S�������s�����̿���(��������[�n�=�a������.�͵��g.V~Kg��{�m�y���W��]� $!T�f&�JBd�%��R!Mp�AɈ$���!0	*l�R3�� @�SD$��zdAD��.�K�E�� 
<	�# ���Ԑ �$�hP�( �n�&��!��  � � �X�2�`D�<���(Ҽ��{�l9�c�>�Q��G�'
���}��1r�k��)·���=�~ `� ���&�LPb�p��0V� ��� �B��o!$c$##�De���aB�샄B�W�5	-%����*��l� B�"�6� $��(Tŀ��DR'��X���1����|�\���տ;n�����Ȟͅ?���pqw믿=���]z����!�����:��Hׅ�z�����~���crqW����W�/������B�zgIkt�K]��Wkni�v.��*�Hs�����~0��u`����Y� �j�#��  )JB0aB j��` ��P� &	���K)�!���< qظ8NiQ��*��@�"�f>r\@`�g@�  602��6*�������$)���&�(2�!�ҔA���A�����A�푌R�ij0�1��x��B�cN@&tJ��P�\��B�`�GH, 	�".��	� H��5Hu`FP�!:�\ ��و�
 HZ�>8N�`a u��N�wG��L=z����N�o��gz�x��n�Oo�4�G3���������|�s^�������������畷j�{:�����������[����Ƶ~)���Y����%6���ww�v7���z��]�O�   var parentNode = node.parentNode;

      if (isBogus(parentNode)) {
        return normalizedParent(parentNode);
      }

      return parentNode;
    }

    function getChildNodes(node) {
      if (!node) {
        return [];
      }

      return Arr.reduce(node.childNodes, function (result, node) {
        if (isBogus(node) && node.nodeName != 'BR') {
          result = result.concat(getChildNodes(node));
        } else {
          result.push(node);
        }

        return result;
      }, []);
    }

    function normalizedTextOffset(textNode, offset) {
      while ((textNode = textNode.previousSibling)) {
        if (!isText(textNode)) {
          break;
        }

        offset += textNode.data.length;
      }

      return offset;
    }

    function equal(targetValue) {
      return function (value) {
        return targetValue === value;
      };
    }

    function normalizedNodeIndex(node) {
      var nodes, index, numTextFragments;

      nodes = getChildNodes(normalizedParent(node));
      index = Arr.findIndex(nodes, equal(node), node);
      nodes = nodes.slice(0, index + 1);
      numTextFragments = Arr.reduce(nodes, function (result, node, i) {
        if (isText(node) && isText(nodes[i - 1])) {
          result++;
        }

        return result;
      }, 0);

      nodes = Arr.filter(nodes, NodeType.matchNodeNames(node.nodeName));
      index = Arr.findIndex(nodes, equal(node), node);

      return index - numTextFragments;
    }

    function createPathItem(node) {
      var name;

      if (isText(node)) {
        name = 'text()';
      } else {
        name = node.nodeName.toLowerCase();
      }

      return name + '[' + normalizedNodeIndex(node) + ']';
    }

    function parentsUntil(rootNode, node, predicate) {
      var parents = [];

      for (node = node.parentNode; node != rootNode; node = node.parentNode) {
        if (predicate && predicate(node)) {
          break;
        }

        parents.push(node);
      }

      return parents;
    }

    function create(rootNode, caretPosition) {
      var container, offset, path = [],
        outputOffset, childNodes, parents;

      container = caretPosition.container();
      offset = caretPosition.offset();

      if (isText(container)) {
        outputOffset = normalizedTextOffset(container, offset);
      } else {
        childNodes = container.childNodes;
        if (offset >= childNodes.length) {
          outputOffset = 'after';
          offset = childNodes.length - 1;
        } else {
          outputOffset = 'before';
        }

        container = childNodes[offset];
      }

      path.push(createPathItem(container));
      parents = parentsUntil(rootNode, container);
      parents = Arr.filter(parents, Fun.negate(NodeType.isBogus));
      path = path.concat(Arr.map(parents, function (node) {
        return createPathItem(node);
      }));

      return path.reverse().join('/') + ',' + outputOffset;
    }

    function resolvePathItem(node, name, index) {
      var nodes = getChildNodes(node);

      nodes = Arr.filter(nodes, function (node, index) {
        return !isText(node) || !isText(nodes[index - 1]);
      });

      nodes = Arr.filter(nodes, NodeType.matchNodeNames(name));
      return nodes[index];
    }

    function findTextPosition(container, offset) {
      var node = container, targetOffset = 0, dataLen;

      while (isText(node)) {
        dataLen = node.data.length;

        if (offset >= targetOffset && offset <= targetOffset + dataLen) {
          container = node;
          offset = offset - targetOffset;
          break;
        }

        if (!isText(node.nextSibling)) {
          container = node;
          offset = dataLen;
          break;
        }

        targetOffset += dataLen;
        node = node.nextSibling;
      }

      if (offset > container.data.length) {
        offset = container.data.length;
      }

      return new CaretPosition(container, offset);
    }

    function resolve(rootNode, path) {
      var parts, container, offset;

      if (!path) {
        return null;
      }

      parts = path.split(',');
      path = parts[0].split('/');
      offset = parts.length > 1 ? parts[1] : 'before';

      container = Arr.reduce(path, function (result, value) {
        value = /([\w\-\(\)]+)\[([0-9]+)\]/.exec(value);
        if (!value) {
          return null;
        }

        if (value[1] === 'text()') {
          value[1] = '#text';
        }

        return resolvePathItem(result, value[1], parseInt(value[2], 10));
      }, rootNode);

      if (!container) {
        return null;
      }

      if (!isText(container)) {
        if (offset === 'after') {
          offset = nodeIndex(container) + 1;
        } else {
          offset = nodeIndex(container);
        }

        return new CaretPosition(container.parentNode, offset);
      }

      return findTextPosition(container, parseInt(offset, 10));
    }

    return {
      /**
       * Create a xpath bookmark location for the specified caret position.
       *
       * @method create
       * @param {Node} rootNode Root node to create bookmark within.
       * @param {tinymce.caret.CaretPosition} caretPosition Caret position within the root node.
       * @return {String} String xpath like location of caret position.
       */
      create: create,

      /**
       * Resolves a xpath like bookmark location to the a caret position.
       *
       * @method resolve
       * @param {Node} rootNode Root node to resolve xpath bookmark within.
       * @param {String} bookmark Bookmark string to resolve.
       * @return {tinymce.caret.CaretPosition} Caret position resolved from xpath like bookmark.
       */
      resolve: resolve
    };
  }
);
/**
 * BookmarkManager.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class handles selection bookmarks.
 *
 * @class tinymce.dom.BookmarkManager
 */
define(
  'tinymce.core.dom.BookmarkManager',
  [
    'tinymce.core.caret.CaretBookmark',
    'tinymce.core.caret.CaretContainer',
    'tinymce.core.caret.CaretPosition',
    'tinymce.core.dom.NodeType',
    'tinymce.core.dom.RangeUtils',
    'tinymce.core.Env',
    'tinymce.core.text.Zwsp',
    'tinymce.core.util.Tools'
  ],
  function (CaretBookmark, CaretContainer, CaretPosition, NodeType, RangeUtils, Env, Zwsp, Tools) {
    var isContentEditableFalse = NodeType.isContentEditableFalse;

    var getNormalizedTextOffset = function (container, offset) {
      var node, trimmedOffset;

      trimmedOffset = Zwsp.trim(container.data.slice(0, offset)).length;
      for (node = container.previousSibling; node && node.nodeType === 3; node = node.previousSibling) {
        trimmedOffset += Zwsp.trim(node.data).length;
      }

      return trimmedOffset;
    };

    /**
     * Constructs a new BookmarkManager instance for a specific selection instance.
     *
     * @constructor
     * @method BookmarkManager
     * @param {tinymce.dom.Selection} selection Selection instance to handle bookmarks for.
     */
    function BookmarkManager(selection) {
      var dom = selection.dom;

      /**
       * Returns a bookmark location for the current selection. This bookmark object
       * can then be used to restore the selection after some content modification to the document.
       *
       * @method getBookmark
       * @param {Number} type Optional state if the bookmark should be simple or not. Default is complex.
       * @param {Boolean} normalized Optional state that enables you to get a position that it would be after normalization.
       * @return {Object} Bookmark object, use moveToBookmark with this object to restore the selection.
       * @example
       * // Stores a bookmark of the current selection
       * var bm = tinymce.activeEditor.selection.getBookmark();
       *
       * tinymce.activeEditor.setContent(tinymce.activeEditor.getContent() + 'Some new content');
       *
       * // Restore the selection bookmark
       * tinymce.activeEditor.selection.moveToBookmark(bm);
       */
      t�}�'Y��?���9����돿���{�Sm�-��K�v������������W���T����_�������}O�ӝ��}y�볧/���2�3����<j�ӯ6�gW�ݿ�]���wXs}��`�u�W�%���_!&�PȔ `�@�*	N-J�
�IH<��X��!0� B6#��P�  PȂ輕g�@AI&`'��QT�V%3Y `L�zQe V���Ŭ2�2����)�Bb�d��@v����1drQ�+d�c��H�C�`F��B$��5�	�b	�B���Y0�"P�BS �F1Y�?K���e��PL5B��
MB>�c�(v)@;��ڿ�{����b���/~s�<wx�5=�Ye���<~[���������n��C������~����?��w������׼��?����~�3[��ڏ�˿��Z�~ܿ�]�;��	��N�7�?{������?u������#iu� ��Hn�`HP`��Ib�9)�D�$�b �F�c��太�B �B@)
� ��o�V%���ǝ�9�޳������<��Y=����]��y_�����{����u��ݱׯ�����
@�.�I� #
�?������ڥf�z��:g�������ޢ�� �C'WB*x ��!DI��lƺ)���0�
tmetfB��E���ЀH�
0��DJЄ�A���4^B�H@�����`�pP��������^_���_l�g�$ﺯ�w����/����s����7�.��c�׹��w�O�������ߝז�]��k�����y_��+��˽۟n������߿���9��݀j��R���~�~��{�) 4�6��
�1A"@&ĤGY�2���a�<L���$$fT�
Q ��C!�B�J�0P��DT�Z���Q��A&� �"@����i��
X $|��AE3E��R^a��t S+�B�T��"L�b@��R��M�s��`@ �����m FLq�.�g�[ B�	d�
BЂ�	�J5CA�+ �C�X������9�ւ�JT"��N���ƙŁDā(
�.�)�DP �D@LR2 "���n9�o����k����ۗڙ�{���?~�n�{m^������WT�o�:{ߟ��s�������{/��k���[������un���<��
 \bǲQ#�CU, 8f4����%@%��"Dˉ09 Jh'&|Յ�D��/J����@��P�nQ�A�<��u��ð2A�� '�U�b@�D�9�V��- rK�����k����I��3��o����ws�~�r�����_ʥ�����_�r7���ޛ�{��[�e6�{�_����߭W�:�P~w.i����l�Yҽ��kH���|�=#u�-��G�w��o�ܞi��Z����F��I�z�7}>��ˏ�˥b���Կ�RۏC��t�?�T����g��rZ����
�'���U��~�w�mt�)�O�������?��ufc��~y��re����޲��+ߗ߷w$���ƪ����S$�؜���Wr3�����[��w~}��9�|����#�����?O�_�����獮?w��>G�_���jG���n�_��j��E�g�W������g���%^�۷��q�=�7�Ǘ���}���s�ٜb����V��u�ϷQ�Q���3_��+�9I��sf+��}?�����������Ʈu_�R�]���=�����~���.i`�o�����sS�b�w/��������ґ�-�3������2�vx=U�^�?���o��P�v�����e5���	�]��1�O}�__r���9t�;Ǘ��筮���yv_�]�w�o�}�ç�}����Xq�m�        }

            // Move element offset to best suitable location
            if (node.nodeType === 1) {
              offset = Math.min(point[0], node.childNodes.length);
            }

            // Set offset within container node
            if (start) {
              rng.setStart(node, offset);
            } else {
              rng.setEnd(node, offset);
            }
          }

          return true;
        }

        function restoreEndPoint(suffix) {
          var marker = dom.get(bookmark.id + '_' + suffix), node, idx, next, prev, keep = bookmark.keep;

          if (marker) {
            node = marker.parentNode;

            if (suffix == 'start') {
              if (!keep) {
                idx = dom.nodeIndex(marker);
              } else {
                node = marker.firstChild;
                idx = 1;
              }

              startContainer = endContainer = node;
              startOffset = endOffset = idx;
            } else {
              if (!keep) {
                idx = dom.nodeIndex(marker);
              } else {
                node = marker.firstChild;
                idx = 1;
              }

              endContainer = node;
              endOffset = idx;
            }

            if (!keep) {
              prev = marker.previousSibling;
              next = marker.nextSibling;

              // Remove all marker text nodes
              Tools.each(Tools.grep(marker.childNodes), function (node) {
                if (node.nodeType == 3) {
                  node.nodeValue = node.nodeValue.replace(/\uFEFF/g, '');
                }
              });

              // Remove marker but keep children if for example contents where inserted into the marker
              // Also remove duplicated instances of the marker for example by a
              // split operation or by WebKit auto split on paste feature
              while ((marker = dom.get(bookmark.id + '_' + suffix))) {
                dom.remove(marker, 1);
              }

              // If siblings are text nodes then merge them unless it's Opera since it some how removes the node
              // and we are sniffing since adding a lot of detection code for a browser with 3% of the market
              // isn't worth the effort. Sorry, Opera but it's just a fact
              if (prev && next && prev.nodeType == next.nodeType && prev.nodeType == 3 && !Env.opera) {
                idx = prev.nodeValue.length;
                prev.appendData(next.nodeValue);
                dom.remove(next);

                if (suffix == 'start') {
                  startContainer = endContainer = prev;
                  startOffset = endOffset = idx;
                } else {
                  endContainer = prev;
                  endOffset = idx;
                }
              }
            }
          }
        }

        function addBogus(node) {
          // Adds a bogus BR element for empty block elements
          if (dom.isBlock(node) && !node.innerHTML && !Env.ie) {
            node.innerHTML = '<br data-mce-bogus="1" />';
          }

          return node;
        }

        function resolveCaretPositionBookmark() {
          var rng, pos;

          rng = dom.createRng();
          pos = CaretBookmark.resolve(dom.getRoot(), bookmark.start);
          rng.setStart(pos.container(), pos.offset());

          pos = CaretBookmark.resolve(dom.getRoot(), bookmark.end);
          rng.setEnd(pos.container(), pos.offset());

          return rng;
        }

        if (bookmark) {
          if (Tools.isArray(bookmark.start)) {
            rng = dom.createRng();
            root = dom.getRoot();

            if (selection.tridentSel) {
              return selection.tridentSel.moveToBookmark(bookmark);
            }

            if (setEndPoint(true) && setEndPoint()) {
              selection.setRng(rng);
            }
          } else if (typeof bookmark.start == 'string') {
            selection.setRng(resolveCaretPositionBookmark(bookmark));
          } else if (bookmark.id) {
            // Restore start/end points
            restoreEndPoint('start');
            restoreEndPoint('end');

            if (startContainer) {
              rng = dom.createRng();
              rng.setStart(addBogus(startContainer), startOffset);
              rng.setEnd(addBogus(endContainer), endOffset);
              selection.setRng(rng);
            }
          } else if (bookmark.name) {
            selection.select(dom.select(bookmark.name)[bookmark.index]);
          } else if (bookmark.rng) {
            selection.setRng(bookmark.rng);
          }
        }
      };
    }

    /**
     * Returns true/false if the specified node is a bookmark node or not.
     *
     * @static
     * @method isBookmarkNode
     * @param {DOMNode} node DOM Node to check if it's a bookmark node or not.
     * @return {Boolean} true/false if the node is a bookmark node or not.
     */
    BookmarkManager.isBookmarkNode = function (node) {
      return node && node.tagName === 'SPAN' && node.getAttribute('data-mce-type') === 'bookmark';
    };

    return BookmarkManager;
  }
);
define(
  'ephox.katamari.api.Global',

  [
  ],

  function () {
    // Use window object as the global if it's available since CSP will block script evals
    if (typeof window !== 'undefined') {
      return window;
    } else {
      return Function('return this;')();
    }
  }
);


define(
  'ephox.katamari.api.Resolve',

  [
    'ephox.katamari.api.Global'
  ],

  function (Global) {
    /** path :: ([String], JsObj?) -> JsObj */
    var path = function (parts, scope) {
      var o = scope !== undefined ? scope : Global;
      for (var i = 0; i < parts.length && o !== undefined && o !== null; ++i)
        o = o[parts[i]];
      return o;
    };

    /** resolve :: (String, JsObj?) -> JsObj */
    var resolve = function (p, scope) {
      var parts = p.split('.');
      return path(parts, scope);
    };

    /** step :: (JsObj, String) -> JsObj */
    var step = function (o, part) {
      if (o[part] === undefined || o[part] === null)
        o[part] = {};
      return o[part];
    };

    /** forge :: ([String], JsObj?) -> JsObj */
    var forge = function (parts, target) {
      var o = target !== undefined ? target : Global;      
      for (var i = 0; i < parts.length; ++i)
        o = step(o, parts[i]);
      return o;
    };

    /** namespace :: (String, JsObj?) -> JsObj */
    var namespace = function (name, target) {
      var parts = name.split('.');
      return forge(parts, target);
    };

    return {
      path: path,
      resolve: resolve,
      forge: forge,
      namespace: namespace
    };
  }
);


define(
  'ephox.sand.util.Global',

  [
    'ephox.katamari.api.Resolve'
  ],

  function (Resolve) {
    var unsafe = function (name, scope) {
      return Resolve.resolve(name, scope);
    };

    var getOrDie = function (name, scope) {
      var actual = unsafe(name, scope);

      if (actual === undefined) throw name + ' not available on this browser';
      return actual;
    };

    return {
      getOrDie: getOrDie
    };
  }
);
define(
  'ephox.sand.api.Node',

  [
    'ephox.sand.util.Global'
  ],

  function (Global) {
    /*
     * MDN says (yes) for IE, but it's undefined on IE8
     */
    var node = function () {
      var f = Global.getOrDie('Node');
      return f;
    };

    /*
     * Most of numerosity doesn't alter the methods on the object.
     * We're making an exception for Node, because bitwise and is so easy to get wrong.
     *
     * Might be nice to ADT this at some point instead of having individual methods.
     */

    var compareDocumentPosition = function (a, b, match) {
      // Returns: 0 if e1 and e2 are the same node, or a bitmask comparing the positions
      // of nodes e1 and e2 in their documents. See the URL below for bitmask interpretation
      // https://developer.mozilla.org/en-US/docs/Web/API/Node/compareDocumentPosition
      return (a.compareDocumentPosition(b) & match) !== 0;
    };

    var documentPositionPreceding = function (a, b) {
      return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_PRECEDING);
    };

    var docum�1�Z� 5�		�3E(x�1�\�b,� �B`#�C؈��v!&!U����L�Ba#a��d��C��UA� �O��	�ϋ�˜B�5�1E�>�� ��I0�/b�U�^�~N��������������ٵ�z���-X�O-���S��~��ﮰkl������_�^�w��[=���������替�am����}�M��oj���}�M������^w<���;_������׿������Tߏ�?����ؽ�w_���nG?9�]f��ߧ�`����{6��]���޲��n�,���u�U����p�Ox�����~��+����{�]q���v����/����B�_���W�գھ�o����%9�L�.�8��t�H#�'Y5?��GOFH��B!��gC`�� aIb!�e��J�8(Q� ��D0�(L!T'�-�A�D+
��iq�II���7�A /2�!SAH��~�)Q� d��25;P��  SM�?؎h,#���*'�� ^2� ;QRW*U�3
&�W�K;� Y�&�g��Ȁ��f�)0��+��@���A2@" (����U�
yz�'�1��CӅi�nE�	�*	2�
ob��H9ihUp&�8��uT����?�������ĭ,7���t�}�K�x��~��'��¯���֚�5�^�_}��y�����\�~6�:Y׾]�l��bV]�.���g|��O��}��ާ���w��R�z/�����9_�{ (���q�Yb��N 8N�?kFBSNP�@F*�F"�G$AـN��hO#R��p����A Z8��P�������D�Hf�-4SB�N$�XN��LVY�ݓ�C�$ �
t���G����}l�ox��,��Z=����������������g�~�|���^�{}�����ɼ_�߶Z����Q��S����i.���������髳�]�>��&ѽ\����y���K��|׻����������\�Y8�n�������P���-��}��Ϭi������{���徾;�˭�no�������Z��{��֟�|�@��֘}f��/��v��m�����w��M��;�����$����h�e���Կ��������ϋ@�EB��
��Å̈h~i0
w
pn*�
�6d�1D"W�je��DRf�"vEz��3�k�^;��\��=���\�l��3ιY�i����]/�����������K�}��m��^����޷s�w��=�������q������Z�f��n�K>v�����	�`^�v�����ۿ{��]����7��w���ޯ�ޛ�j�^�����5&:_���o����˷T���������ީ�����α
�
��	�'��6R�$�����P�!1��C�C(P�	��]@TAH��bE�`/�!a
�Ďt)`Ɛ� u�B�
�)`�{�I�#)�7�/a%	դA0�,�P,fAE�S}�
NP,����E4a����*��ߧ����]|�����s~��'�ʋ��ޓͯ_�9�z��~�j���z��Z�n}�{E5��/���ruW�y�����ߝ�ߟ�������?��c�����G�=�R���ϖ|�/'u�}�㪴|�=�l�N���{l  i'72-5�#�M9bp#�$%`v$G����A�H����H4bw�$F��9�<�@H�d���&V�b��N���h8r� �$l�2D
�К)���D�� �zp8�� �;���M��/v'����m�;o�������/c���?�����O�}�箻���o��r�����_�k�H�����w����oz�;,�*߾f?[tl~�����$���ۻ��O��>G�m�f�ޝ�����x��_�i{��*����"���q������.���}�~{����U����~o�܇︶���h�7�{'ｳ�����Og�~����޿�{����_|�Μ�}#=�������I����t��z/�a��۷�������r��_��NA�zFv��RX̂s�TgP��T&~ V;�j&���F [C��'b�j��!Pz
{@	��YD3��e�JGe"���R��f8)A�y��UT��0Ǧ�ZE8�O��A$`'�d������Ե�����^���u�e�����]y}��O�i�����ݯ�?���?��[G��������r·}�����s-e~���~����?�[uw�nc��}�^��ٻ���ɽZ}�a��;�?_?�� ���!�7��W����0�E@T(5U��ɼD�jF��&Yp�
\��6 ��[�f��"�3��   FA���F( �j�	$c
%����!�t.��O���	��z��Y(�� U
l�D"@��Y�"#���)%x4���C$� $ΓY2* X��P>ނ !���2D��
�P`%@��*�0�@bH`,��"Y��îH�gs����ΒE�� 8��}�|���g��}��e,fò�⯸���ug�u>;p�_M���t��Q��~�����z���~�gik��t�x��XF%�_O���}�տ�~�/Jw��}������=�z��>�}�%ȶZ��͟���X4�������D�u@���j09�S. F��	���	�0"`\,�M�a�&F �j'E���`B���aZ�$
�	 �t��U:�Ar8�	j�,bZD�F	�Ѥ ��悡�:-b�*����,I���dZ�)�B A ��D����5)� L P�
�X�P
 $R��2a4PUG�hT��P�&PXI��c�w,�&���P  Q"�(� ��
!	��wF!-)AP��D�\@�� �L�Qm��2����D0����� �<@��$ ]R�`��( Q�D�����)Ae	k����d��H�� @`�IP"�Y�   �-"IDOO�( ��&��8�@��
�$�F)� �%�b�K�z*�ˌ\����?�ɀ�HA�&:�8ş�N��9 �+sP�F0,��	�����`@�`HRF��#"!�pa�"srR#  j ��P��'�h	`YM�*"�� �	��!H ��A�@��� ��;d���'�YEt��B	
_�-5 ���K4 �370D�,�� �@�A��8Q"���E�
TG���>@dt����C��ցpX�B�:4]lf34���M���]@�#��D&�I �G����o�qx\-�f�QC?��nUu1�+G
&o%QK����PPA�@��C�F*#A� ��Ji��62��1">��.��9'���d� D.r#�B9o3 ���D�v�Bg�'CԱ� � (��(�͙�2��1
d @L��cD �D6�08V�H`����K$!
,�B������ �#WC��.�`�ā �����iH �T���O@�.R��G�8�1 �EnaS��,#!S"U��ѵ"l������#����SPn�<�|�P�Z��"��6�p�y�ȧ�V�h��12YQ���@��.>I�!Z�  	�K�V�p�
@ *5.14( ��X�b� )	S� �@ ���&	�0� ;�G
"�A�A`C��` �J	 �!
�Pp� xB3���a�P+�an@*��eL��2�}4Z������l
��F�
�� �&)���q���4�:$}�����H��q�B�f[}��z��l��	�>�� X�D3}��r�'(`�Y��H/�9��aA�S�:�F���6� ����$\�PU��D ܴ@  ���X ��n�a
�wA(�~"  �0!�=@�@H�$0���D�d��@��'�Dp��� �H�80jT��1Y11�$j <�� ���!@�j @Rl@�ҚfY����D 
�'C���S&�!BZJ"ԔT@!\��BBp�SJ�F3���p�XkS+4A��<b�z#P�[9@�q$`�!�%��A�-�L �Gqk`�Pp�Q�@`
��M�b����-�V �A  ��s�:D��4C ���`�l �1�9����0X(�ʏ�
G ���$��,f���Ej0�
Q�����!@�Q�aQ��02����P�D �A&"��!^� �8�-r�G �(JX�,� �  ""�X �� �d�ic��R#`zeCV@���2�0Z�+>Y��� �7k���@��DFTĦ�"� RM��!&@�rĦXP��EF��)Х�г �
&x��
�-4oR	@�	�5R6ZXnÄ��At<!�`&ZCb,$#!a�� 9�A�
�#a�A�!ؐ	��D���  U�H � 0N��5@�HT(h)��*�����8@	`!�%�@h�L $�v�@`@�
�[�Ga�t@I�@������'��u ���	;T ^#�\��E�/�b�X`ѽ��`��tET�P���q��z�p�M+�%`�PTȽ�K ��[� d˨'��rn\��� D��@��ro_0*�n�w�������G*Ta�bt�g�V�A�3�L e~pG��ѡ=�G

02H(� A���*A@]�:�E��pJpc8
Bȗ�I��\i�aI
��aX�`�4� D����  A
�AAnB�@�8���D��� h ����� I�	���T ��� B��XK0�B�RT�(�BH d 5 @qB �D�9�# .�L� ���
8��Z �
P� �x�!
XYF���A�A�&�`�-94��ڂF�%VЄ�i>UdJ����=M�b@�!#M;��)�p�	�`�UT�$#`OV�t-�d�N�|홳��:��$qT�O� wDR!&� ��8�D@l�E�r���P +zRi	��"�	4�"T
f�(Z���Y�C �`�T�
�`rY�t6������z��S�	 3���"&C�B���Q�$
Ep�H�����
E¨�2(SD �� �-	%D@(�( �80B "��(Z `т(@�@GP!@� P
 �D%�`@! *jd: head,
      tail: tail
    };
  }
);
define(
  'ephox.katamari.api.Strings',

  [
    'ephox.katamari.str.StrAppend',
    'ephox.katamari.str.StringParts',
    'global!Error'
  ],

  function (StrAppend, StringParts, Error) {
    var checkRange = function(str, substr, start) {
      if (substr === '') return true;
      if (str.length < substr.length) return false;
      var x = str.substr(start, start + substr.length);
      return x === substr;
    };

    /** Given a string and object, perform template-replacements on the string, as specified by the object.
     * Any template fields of the form ${name} are replaced by the string or number specified as obj["name"]
     * Based on Douglas Crockford's 'supplant' method for template-replace of strings. Uses different template format.
     */
    var supplant = function(str, obj) {
      var isStringOrNumber = function(a) {
        var t = typeof a;
        return t === 'string' || t === 'number';
      };

      return str.replace(/\${([^{}]*)}/g,
        function (a, b) {
          var value = obj[b];
          return isStringOrNumber(value) ? value : a;
        }
      );
    };

    var removeLeading = function (str, prefix) {
      return startsWith(str, prefix) ? StrAppend.removeFromStart(str, prefix.length) : str;
    };

    var removeTrailing = function (str, prefix) {
      return endsWith(str, prefix) ? StrAppend.removeFromEnd(str, prefix.length) : str;
    };

    var ensureLeading = function (str, prefix) {
      return startsWith(str, prefix) ? str : StrAppend.addToStart(str, prefix);
    };

    var ensureTrailing = function (str, prefix) {
      return endsWith(str, prefix) ? str : StrAppend.addToEnd(str, prefix);
    };
 
    var contains = function(str, substr) {
      return str.indexOf(substr) !== -1;
    };

    var capitalize = function(str) {
      return StringParts.head(str).bind(function (head) {
        return StringParts.tail(str).map(function (tail) {
          return head.toUpperCase() + tail;
        });
      }).getOr(str);
    };

    /** Does 'str' start with 'prefix'?
     *  Note: all strings start with the empty string.
     *        More formally, for all strings x, startsWith(x, "").
     *        This is so that for all strings x and y, startsWith(y + x, y)
     */
    var startsWith = function(str, prefix) {
      return checkRange(str, prefix, 0);
    };

    /** Does 'str' end with 'suffix'?
     *  Note: all strings end with the empty string.
     *        More formally, for all strings x, endsWith(x, "").
     *        This is so that for all strings x and y, endsWith(x + y, y)
     */
    var endsWith = function(str, suffix) {
      return checkRange(str, suffix, str.length - suffix.length);
    };

   
    /** removes all leading and trailing spaces */
    var trim = function(str) {
      return str.replace(/^\s+|\s+$/g, '');
    };

    var lTrim = function(str) {
      return str.replace(/^\s+/g, '');
    };

    var rTrim = function(str) {
      return str.replace(/\s+$/g, '');
    };

    return {
      supplant: supplant,
      startsWith: startsWith,
      removeLeading: removeLeading,
      removeTrailing: removeTrailing,
      ensureLeading: ensureLeading,
      ensureTrailing: ensureTrailing,
      endsWith: endsWith,
      contains: contains,
      trim: trim,
      lTrim: lTrim,
      rTrim: rTrim,
      capitalize: capitalize
    };
  }
);

define(
  'ephox.sand.info.PlatformInfo',

  [
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Strings'
  ],

  function (Fun, Strings) {
    var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;

    var checkContains = function (target) {
      return function (uastring) {
        return Strings.contains(uastring, target);
      };
    };

    var browsers = [
      {
        name : 'Edge',
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function (uastring) {
          var monstrosity = Strings.contains(uastring, 'edge/') && Strings.contains(uastring, 'chrome') && Strings.contains(uastring, 'safari') && Strings.contains(uastring, 'applewebkit');
          return monstrosity;
        }
      },
      {
        name : 'Chrome',
        versionRegexes: [/.*?chrome\/([0-9]+)\.([0-9]+).*/, normalVersionRegex],
        search : function (uastring) {
          return Strings.contains(uastring, 'chrome') && !Strings.contains(uastring, 'chromeframe');
        }
      },
      {
        name : 'IE',
        versionRegexes: [/.*?msie\ ?([0-9]+)\.([0-9]+).*/, /.*?rv:([0-9]+)\.([0-9]+).*/],
        search: function (uastring) {
          return Strings.contains(uastring, 'msie') || Strings.contains(uastring, 'trident');
        }
      },
      // INVESTIGATE: Is this still the Opera user agent?
      {
        name : 'Opera',
        versionRegexes: [normalVersionRegex, /.*?opera\/([0-9]+)\.([0-9]+).*/],
        search : checkContains('opera')
      },
      {
        name : 'Firefox',
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search : checkContains('firefox')
      },
      {
        name : 'Safari',
        versionRegexes: [normalVersionRegex, /.*?cpu os ([0-9]+)_([0-9]+).*/],
        search : function (uastring) {
          return (Strings.contains(uastring, 'safari') || Strings.contains(uastring, 'mobile/')) && Strings.contains(uastring, 'applewebkit');
        }
      }
    ];

    var oses = [
      {
        name : 'Windows',
        search : checkContains('win'),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name : 'iOS',
        search : function (uastring) {
          return Strings.contains(uastring, 'iphone') || Strings.contains(uastring, 'ipad');
        },
        versionRegexes: [/.*?version\/\ ?([0-9]+)\.([0-9]+).*/, /.*cpu os ([0-9]+)_([0-9]+).*/, /.*cpu iphone os ([0-9]+)_([0-9]+).*/]
      },
      {
        name : 'Android',
        search : checkContains('android'),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name : 'OSX',
        search : checkContains('os x'),
        versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
      },
      {
        name : 'Linux',
        search : checkContains('linux'),
        versionRegexes: [ ]
      },
      { name : 'Solaris',
        search : checkContains('sunos'),
        versionRegexes: [ ]
      },
      {
       name : 'FreeBSD',
       search : checkContains('freebsd'),
       versionRegexes: [ ]
      }
    ];

    return {
      browsers: Fun.constant(browsers),
      oses: Fun.constant(oses)
    };
  }
);
define(
  'ephox.sand.core.PlatformDetection',

  [
    'ephox.sand.core.Browser',
    'ephox.sand.core.OperatingSystem',
    'ephox.sand.detect.DeviceType',
    'ephox.sand.detect.UaString',
    'ephox.sand.info.PlatformInfo'
  ],

  function (Browser, OperatingSystem, DeviceType, UaString, PlatformInfo) {
    var detect = function (userAgent) {
      var browsers = PlatformInfo.browsers();
      var oses = PlatformInfo.oses();

      var browser = UaString.detectBrowser(browsers, userAgent).fold(
        Browser.unknown,
        Browser.nu
      );
      var os = UaString.detectOs(oses, userAgent).fold(
        OperatingSystem.unknown,
        OperatingSystem.nu
      );
      var deviceType = DeviceType(os, browser, userAgent);

      return {
        browser: browser,
        os: os,
        deviceType: deviceType
      };
    };

    return {
      detect: detect
    };
  }
);
defineGlobal("global!navigator", navigator);
define(
  'ephox.sand.api.PlatformDetection',

  [
    'ephox.katamari.api.Thunk',
    'ephox.sand.core.PlatformDetection',
    'global!navigator'
  ],

  function (Thunk, PlatformDetection, navigator) {
    var detect = Thunk.cached(function () {
      var userAgent = navigator.userAgent;
      return PlatformDetection.detect(userAgent);
    });

    return {
      detect: detect
    };
  }
);
define("global!console", [], function () { if (typeof console === "undefined") console = { log: function () {} }; return console; });
defineGlobal("global!document", document);
define(
  'ephox.sugar.api.node.Element',

  [
    'ephox.katamari.api.Fun',
    'global!Error',
    'global!console',
    'global!document'
  ],

  function (Fun, Error, console, document) {
    var fromHtml = function (html, scope) {
      var doc = scope || document;
      var div = doc.createElement('div');
      div.innerHTML = html;
      if (!div.hasChildNodes() || div.childNodes.length > 1) {
        console.error('HTML does not have a single root node', html);
        throw 'HTML must have a single root node';
      }
      return fromDom(div.childNodes[0]);
    };

    var fromTag = function (tag, scope) {
      var doc = scope || document;
      var node = doc.createElement(tag);
      return fromDom(node);
    };

    var fromText = function (text, scope) {
      var doc = scope || document;
      var node = doc.createTextNode(text);
      return fromDom(node);
    };

    var fromDom = function (node) {
      if (node === null || node === undefined) throw new Error('Node cannot be null or undefined');
      return {
        dom: Fun.constant(node)
      };
    };

    return {
      fromHtml: fromHtml,
      fromTag: fromTag,
      fromText: fromText,
      fromDom: fromDom
    };
  }
);

define(
  'ephox.sugar.api.node.NodeTypes',

  [

  ],

  function () {
    return {
      ATTRIBUTE:              2,
      CDATA_SECTION:          4,
      COMMENT:                8,
      DOCUMENT:               9,
      DOCUMENT_TYPE:          10,
      DOCUMENT_FRAGMENT:      11,
      ELEMENT:                1,
      TEXT:                   3,
      PROCESSING_INSTRUCTION: 7,
      ENTITY_REFERENCE:       5,
      ENTITY:                 6,
      NOTATION:               12
    };
  }
);
define(
  'ephox.sugar.api.search.Selectors',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Option',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.NodeTypes',
    'global!Error',
    'global!document'
  ],

  function (Arr, Option, Element, NodeTypes, Error, document) {
    /*
     * There's a lot of code here; the aim is to allow the browser to optimise constant comparisons,
     * instead of doing object lookup feature detection on every call
     */
    var STANDARD = 0;
    var MSSTANDARD = 1;
    var WEBKITSTANDARD = 2;
    var FIREFOXSTANDARD = 3;

    var selectorType = (function () {
      var test = document.createElement('span');
      // As of Chrome 34 / Safari 7.1 / FireFox 34, everyone except IE has the unprefixed function.
      // Still check for the others, but do it last.
      return test.matches !== undefined ? STANDARD :
             test.msMatchesSelector !== undefined ? MSSTANDARD :
             test.webkitMatchesSelector !== undefined ? WEBKITSTANDARD :
             test.mozMatchesSelector !== undefined ? FIREFOXSTANDARD :
             -1;
    })();


    var ELEMENT = NodeTypes.ELEMENT;
    var DOCUMENT = NodeTypes.DOCUMENT;

    var is = function (element, selector) {
      var elem = element.dom();
      if (elem.nodeType !== ELEMENT) return false; // documents have querySelector but not matches

      // As of Chrome 34 / Safari 7.1 / FireFox 34, everyone except IE has the unprefixed function.
      // Still check for the others, but do it last.
      else if (selectorType === STANDARD) return elem.matches(selector);
      else if (selectorType === MSSTANDARD) return elem.msMatchesSelector(selector);
      else if (selectorType === WEBKITSTANDARD) return elem.webkitMatchesSelector(selector);
      else if (selectorType === FIREFOXSTANDARD) return elem.mozMatchesSelector(selector);
      else throw new Error('Browser lacks native selectors'); // unfortunately we can't throw this on startup :(
    };

    var bypassSelector = function (dom) {
      // Only elements and documents support querySelector
      return dom.nodeType !== ELEMENT && dom.nodeType !== DOCUMENT ||
              // IE fix for complex queries on empty nodes: http://jsfiddle.net/spyder/fv9ptr5L/
              dom.childElementCount === 0;
    };

    var all = function (selector, scope) {
      var base = scope === undefined ? document : scope.dom();
      return bypassSelector(base) ? [] : Arr.map�G���Iإ���t���[���j}�_B��}�)]�u�/�[��e�;����>t�-?�l�JůG�<�~�}�=�?�d����7����������f��o��}�g��Ǻ�_��_Ie�p�u[����翮_ hI%r�bQ�ي�h�0 ��(@ 
���� �"c�(@�(0�
�8
"��zD���@�f 4,<"����-x� D8��H2��"F���0'�8α8*H�8�
HP� ��F0����3$��1��`���!��H<%"��x��"�����^��x�t����w���Oo�!���fmnr���/Uw�+�����~�o�������~��ewo�vۙ?����WԞ��'w<�m����\��5��o����u�r�߹��E��_������'�9n������l��p�_o��7~O�w���}������Y���5����~{�7Π�m?͚����ğݙ�7����[*�z���Z�����;���P���}>�����g���g�-u�{��{�f�����3i.���� ��
�s��b�CAR TS1�� �! � ��  �R�P���Zd�Mm�C�q�&�(�3��$��B%?8ኈ�(�DN��~��+��/���n����}�6�~����s���?~�+�0?�;��T�>�gw߿o���෿�o���ɪ�|�F������N�{m{��v�W�?w"Ӹ�����e����͍���P�����{}^ӟ5p5d�T�B�XP�K�P��N��� qAE I��
 � H��Y�����r�<��JaXX�ZW��w��s�m֤����ݾz���yO�ϓ���;�O���7K������}꿷�����}�,�{Ϝqx��[�������a�SU3��m؛�m�ʑ�v�m�o��?��N���nU��uN�~��{Fx��ĉj�)p�H��䄐� �P�a��@�����L�q. 0\(P.�3"��  N5����ST��*�!� 2b$��0�Ub�H "��B�&`� @U ��P4Ou����V��m�c�������^{��_U��ھ����������ˢ�M^������ׄՍ���]�47}�/���
$�a�����������eK��'��g}Za�|_��ݡ�����޿��;-9ݻ���;yn���������v-�e�?���]���z׿5lmoO���}����
t � ��"!
e,���l 
 �J�Y�VD)�Ƞ�F)�@�R@1�I�Dv��H���G9�Ɛ)����PfT� �H���&&�!4(_ (���1t�B ��ZJ�F���   O߃0)�"-dB �h0�C� hx��@
�Y�M q!��� H	�!A�5�"#5H��� \�/�)SN�+�U�_�� ���!8 �ϼ�,TՀ,�x�ח>@�p+`&@��vJ$Bj�Z�  ��og��ۻ��ȶ���J���G��7��c7�m��Nn�c����2;�o��]߽��<�O4��������M|���}�a�_^f�N|}�����_:��\�=g����U����,������ᾮ?��߿�n�4@0`D�TiU�q�Jb�� G��H���HD� D*��v�  
A���I-� ��2�@�@�@YVJ��r�
Q�C�4� �"��Bp��F�}�� OS��eԼ[@����������{ﮞy���&�W���q}�?�����.]�����v㽚[����_�`^��uԼ]�ݻ}�s��D�{��_f��w�{����*_��m�ߚٷ���w�{��m�������_��c�?��;������:RֻҒ~�`|�74�'����/�}t4{O���hw-�o���?��ô�f��+������q���c��/�������0߻�;�}owq?���wU밻Mf�"��߾�Ɔw����o��g�����C���Xd?Ү)�|PZ��sdQ �d���� ���1i ��	��
M�/ ø�N#8DF�C0b�(ZDケ��T�K!aBq ���iC���$E�CH�^d� �->D���= 
iM%s�(��y�FWo���}7u���mevs^�{�<����o?����<�͟f}_�~����}Y�z���;�4��;���޹o5�����u�������������������^���\w��y}�����������w]#���p�5���s��5��@ @��ꊖ�@����d� *�|�C	�q!&B�0YLD*�(CF�)$�@D�)�������A���2xH� �h��V��Z` �0 "������ �h��Y�(�u���@!�)´c�T	e ÿC���h�:�B�� � Hq��!b$�� 0�Xf�	�Y@���)�A8_r�- �y!P�t1����J� �&���Р��������n��������U�ǽ�#��œ]W���
a��%Ɯ��XUM#���G'@L����� ��&�����-�
�� ��E �?"@\X İI4�W��8���   .��Y��Ѐ+BF��m)�#P/ �$8�P0��Eg����Ȼ�f�Z�ߟ�~�֪�������׌ܱ~��V���f��mf}�����=;�̏}|��ZO�̽�4�o�׆���B`�F�m��>�i�ܛ�mu��4ɿ���5�m�[��e�1G[I߿���ɥ���+橅�ޗ���������-�M�
��^ �� ��@�T�, �i�@D��N� )B!�h��@@ �@�!@@��U�А���L �)h	 ``P �D")Bc�G"D*�(d�0��
-'�|q��޼��g���N����_���;��|�t??�/����{{r�nVx�������������e����⻧�UԿ?����/a���"�����k��;�5�����>�U���O����|{�������O�I�l@�/�
��=w���&���Z��߽��#���6��y��ۿ��t��������#�=Z������������˲����ko��!�˹[v�:{�N�lg��yٷ�uG��������{�[]�������g��������v����ן��{vO���?��~���@f�������;����-/�K�������}ٛ����,���_W���������?ޭ+��=�x�+n���!�N��O���
�k~o��n���z�~w�߻�b�L���=����|}=n�-�������񺋿u��o�����Ιco���hP^��o>ËAn���S8��a�Un�_�vO�o���{g���;�/�.��T�G�'c�_��S������z����	�:o�k�s?���=����ۅ~o��W��Ol�b]yɯ>��w-���������?���V-���v{��K"�~��/������%_����3>�&���}�����w����ܘ9����������w}s��ߴ����~�8��ϖ��A��d�������.���X���7��׆�\���J�<��I/�f�|����i����8_�ս�j��>]�i��V'����u�s���_输7�{�v���������.��`���ս������J���Z۷;?�����x��ƽ�n����3�����o�������ʿ��������K��
�w�m}����[��ծ^���E��k�F��M�~�����������޶���}�Moߟ�m�������>���|h+���W�6{e���8~��#���W�u����]��l�U�r[\����6�ڄ��n�V��^�~��}�o:g�{t�?�#��sӾ�����_�y~��d��7��}����˯��j��po_fS���������[N<�����ԯw������;��=�O�߫H����ߤ��Ͽ��?���w�O��El��o���_���y�W_��fw�w�7���g�L�B��ۙ�7�W6�X���m�������O��կ��&޿�Ѿ]���i��v�_����N����x��������=��\>/���;������9����1�_egWWw�ON���������m\�쳿����t%���\z���=���_�����姷y�ޞ3�'�s�;_v��{k���ſk4~�zO�������װ�c?��DY�s?�y�c��u���_��9��W_���������YJ���r�w�V���3]�(S�f�`�]�e�����ږ���I�w�j[��m��V	����r�r����g���������^w�=f����Ϸ���X�>S+ԓ���5'��7�{Z���*�W���ϕކ�/=�����p�[۔�:��I�߮3m������MCv?���P��㵶k���}��_����������w���V6oO���������կ�l�{}��ɮ�����߿?��;�s��/��~���b�����]���w��~��{�������l�C���{�뾻����-�_�|5y�Oñ����ế��ﷵ�/���s�������j����}9u������ �:�����~����w[��{p��>�����{я�Y�N����Y �}�d�O�&V�]����^_Mq��G�&�l�7t��m�=�U�T�����v���U~�{��}��?��    }

      // Returns a W3C DOM compatible range object by using the IE Range API
      function getRange() {
        var ieRange = selection.getRng(), domRange = dom.createRng(), element, collapsed, tmpRange, element2, bookmark;

        // If selection is outside the current document just return an empty range
        element = ieRange.item ? ieRange.item(0) : ieRange.parentElement();
        if (element.ownerDocument != dom.doc) {
          return domRange;
        }

        collapsed = selection.isCollapsed();

        // Handle control selection
        if (ieRange.item) {
          domRange.setStart(element.parentNode, dom.nodeIndex(element));
          domRange.setEnd(domRange.startContainer, domRange.startOffset + 1);

          return domRange;
        }

        function findEndPoint(start) {
          var endPoint = getPosition(ieRange, start), container, offset, textNodeOffset = 0, sibling, undef, nodeValue;

          container = endPoint.node;
          offset = endPoint.offset;

          if (endPoint.inside && !container.hasChildNodes()) {
            domRange[start ? 'setStart' : 'setEnd'](container, 0);
            return;
          }

          if (offset === undef) {
            domRange[start ? 'setStartBefore' : 'setEndAfter'](container);
            return;
          }

          if (endPoint.position < 0) {
            sibling = endPoint.inside ? container.firstChild : container.nextSibling;

            if (!sibling) {
              domRange[start ? 'setStartAfter' : 'setEndAfter'](container);
              return;
            }

            if (!offset) {
              if (sibling.nodeType == 3) {
                domRange[start ? 'setStart' : 'setEnd'](sibling, 0);
              } else {
                domRange[start ? 'setStartBefore' : 'setEndBefore'](sibling);
              }

              return;
            }

            // Find the text node and offset
            while (sibling) {
              if (sibling.nodeType == 3) {
                nodeValue = sibling.nodeValue;
                textNodeOffset += nodeValue.length;

                // We are at or passed the position we where looking for
                if (textNodeOffset >= offset) {
                  container = sibling;
                  textNodeOffset -= offset;
                  textNodeOffset = nodeValue.length - textNodeOffset;
                  break;
                }
              }

              sibling = sibling.nextSibling;
            }
          } else {
            // Find the text node and offset
            sibling = container.previousSibling;

            if (!sibling) {
              return domRange[start ? 'setStartBefore' : 'setEndBefore'](container);
            }

            // If there isn't any text to loop then use the first position
            if (!offset) {
              if (container.nodeType == 3) {
                domRange[start ? 'setStart' : 'setEnd'](sibling, container.nodeValue.length);
              } else {
                domRange[start ? 'setStartAfter' : 'setEndAfter'](sibling);
              }

              return;
            }

            while (sibling) {
              if (sibling.nodeType == 3) {
                textNodeOffset += sibling.nodeValue.length;

                // We are at or passed the position we where looking for
                if (textNodeOffset >= offset) {
                  container = sibling;
                  textNodeOffset -= offset;
                  break;
                }
              }

              sibling = sibling.previousSibling;
            }
          }

          domRange[start ? 'setStart' : 'setEnd'](container, textNodeOffset);
        }

        try {
          // Find start point
          findEndPoint(true);

          // Find end point if needed
          if (!collapsed) {
            findEndPoint();
          }
        } catch (ex) {
          // IE has a nasty bug where text nodes might throw "invalid argument" when you
          // access the nodeValue or other properties of text nodes. This seems to happen when
          // text nodes are split into two nodes by a delete/backspace call.
          // So let us detect and try to fix it.
          if (ex.number == -2147024809) {
            // Get the current selection
            bookmark = self.getBookmark(2);

            // Get start element
            tmpRange = ieRange.duplicate();
            tmpRange.collapse(true);
            element = tmpRange.parentElement();

            // Get end element
            if (!collapsed) {
              tmpRange = ieRange.duplicate();
              tmpRange.collapse(false);
              element2 = tmpRange.parentElement();
              element2.innerHTML = element2.innerHTML;
            }

            // Remove the broken elements
            element.innerHTML = element.innerHTML;

            // Restore the selection
            self.moveToBookmark(bookmark);

            // Since the range has moved we need to re-get it
            ieRange = selection.getRng();

            // Find start point
            findEndPoint(true);

            // Find end point if needed
            if (!collapsed) {
              findEndPoint();
            }
          } else {
            throw ex; // Throw other errors
          }
        }

        return domRange;
      }

      this.getBookmark = function (type) {
        var rng = selection.getRng(), bookmark = {};

        function getIndexes(node) {
          var parent, root, children, i, indexes = [];

          parent = node.parentNode;
          root = dom.getRoot().parentNode;

          while (parent != root && parent.nodeType !== 9) {
            children = parent.children;

            i = children.length;
            while (i--) {
              if (node === children[i]) {
                indexes.push(i);
                break;
              }
            }

            node = parent;
            parent = parent.parentNode;
          }

          return indexes;
        }

        function getBookmarkEndPoint(start) {
          var position;

          position = getPosition(rng, start);
          if (position) {
            return {
              position: position.position,
              offset: position.offset,
              indexes: getIndexes(position.node),
              inside: position.inside
            };
          }
        }

        // Non ubstructive bookmark
        if (type === 2) {
          // Handle text selection
          if (!rng.item) {
            bookmark.start = getBookmarkEndPoint(true);

            if (!selection.isCollapsed()) {
              bookmark.end = getBookmarkEndPoint();
            }
          } else {
            bookmark.start = { ctrl: true, indexes: getIndexes(rng.item(0)) };
          }
        }

        return bookmark;
      };

      this.moveToBookmark = function (bookmark) {
        var rng, body = dom.doc.body;

        function resolveIndexes(indexes) {
          var node, i, idx, children;

          node = dom.getRoot();
          for (i = indexes.length - 1; i >= 0; i--) {
            children = node.children;
            idx = indexes[i];

            if (idx <= children.length - 1) {
              node = children[idx];
            }
          }

          return node;
        }

        function setBookmarkEndPoint(start) {
          var endPoint = bookmark[start ? 'start' : 'end'], moveLeft, moveRng, undef, offset;

          if (endPoint) {
            moveLeft = endPoint.position > 0;

            moveRng = body.createTextRange();
            moveRng.moveToElementText(resolveIndexes(endPoint.indexes));

            offset = endPoint.offset;
            if (offset !== undef) {
              moveRng.collapse(endPoint.inside || moveLeft);
              moveRng.moveStart('character', moveLeft ? -offset : offset);
            } else {
              moveRng.collapse(start);
            }

            rng.setEndPoint(start ? 'StartToStart' : 'EndToStart', moveRng);

            if (start) {
              rng.collapse(true);
            }
          }
        }

        if (bookmark.start) {
          if (bookmark.start.ctrl) {
            rng = body.create�!�N�ev*"C�`,A,F������� �  8���E:
$+�����`�8�#�{ )F1*�"� 
�2�) ᄀP�(�ZH�$�a"T PMQX�T	�9�$0RY���98�D�� i�P�� ��xb� 
$�9� j�.`�B�A� L��z5"A�4ɡ��d
zFB��v A@�!D}��@�A��@��0XJ�(��6�(!�@ ��J��a! 
��+p��J�``�`�
�X�RBК��@(8�%Zr!��(b	��gAI@@�* ����D�l���r�``"�(t�$"��O�����6"0�F� E7���� P!���i��J�$�Ū��=|T<[!�(�@B,� 2�s"��!(�a��B��
� / �(�B@��(�W��N@@ �E�

�� ���@H �j$� @�,��C��i0�E=�B��TQ�Ɗa��LO5�������7��0	���%��b�E��4��(�B�(o2�H���̤�]$�T  [�d p!s�����@�'b��Հ�P 7E>�)PHpܰ�� :�ڡ1�*h`sf �K��X�. 
� !��w�0
LjAʒ\ ���a�� �
p�:� �b\� h,"�d*G(�B$ 
'v��&pD�d0`C"�u"� 
aж��KinJ�L�N!��-	b��
����� �&��6�k���� � �&� b
�`A3�(�q
�� ���Gp@|@�BA(
b���q�Y����B(��h w@��8 �8$2QHx�<��c�))���I ��� �83(,�\!��K�H� FY�(!Bp�}�"A.��l��v,:ϔsd&�A�[�aM�	���8Q� 1��
�N���P8*k7� /8�˒�%>��4B��i@UP�q�sdYG��b����Q��3��@�	��C	�E\PH���H�H%R�a��j
�p��B����,( � ʲ)��AD&�j'@���('4 \ �F	`D- �� OD�9� AA��N
�w!@%!�@��\i� �1U 
�a��V�aHא"0)�S#0  Y\b4 
P�pA(`	�TRY�@(�2�c@]��L�*�"�0�8-�
P�a(�V�<G� b��D�b%�@͐��a��ȰzN�;`-D@`��bk#��� c (tXCCԅ 6�q	� t2�L�xo�Q��?�����,V`��%耓@��C�H���F�hxh
�-N � ��6D$`j��7G 2�Db��`��)&@)	����
6  Ԅ>�H$@�SF(�rH�@�u
h�m�,T��ŀ� �U��"��m��)G ���0=Q�U
�6JhJ�HRC�I�<(P�lR䴠��TO\�A
*.�5L8�MK�j��p�C IbRK0 �p
�Z��!�D;���`�	pP���n�G�H�N � E60�����#��`$1 ���@A���3a�-
�,��G 4Ph�1i����R�2@	��m�`��
(BeJc
�L+xC	�� a#���C�G�@o�@P*�pM�qؔ#BC$�@2a(.C֍@�t6 �� X��Ā�� ��YL�d�L@��(8U4�� �AI�l�B!�?�&(����XhQ ��=��!����{ãU�'��@/ ��������
C	�*
��2�#��eO�9e ���"&���HI�(�eP!/]A!TWa=�B���EQg&?43�	�s�x� �1X@-������ (��hA�N������1!��-�	!@C)\��PPQ`��p���$�vh�d((�FJ	C��V�
&� H��P:fP%lF�08�<������ �@pB$�H�WA��$�	ki
$��� �� �\���Q@�*ȒHF�,��p����Q��<�8�DP��5%�^��  h��'BS��
�@d偛�
ۈS��	Ԇ���K)S���B  Zb����B�!�Z���Dx#eUM�� p�ZD��P�􋃽,	Ò "�b/&��׋��"*P��2@w18
�p�ĂTr�)�8GA�PDN�
#4`��B� �q(g1��bD���H�C�L�&�I@�
���	cS�WI�`
���E���c(�Z%��p�D 	���1Q�H�  �<�b@ $�
DFP�
(�M�i�0D���U|�&M�+�����`�(�
�k !�!�z �' 1�d�2X����n"�Q�=�(�$�)�G �Tn�A %��ƹ�D#��¯��<�������PPY�
#̍G<! n$�)h���(�n�
@B!4
	q،YM5!D�r!h�mXɉ mL"Ш� B�) "H ��RDg7u��'�L�9XQW�aj�2A� �*M XUWq '�I4pB�N₁PB� �I�#e`��$���԰�
˒��u*k E3J2�t
�� C `qpUC��'�H��h�����eA�F A ���l(� �B��IbԤ�"���0'@`! 02Skf�&�a�0"
0�)	
l� � /*h��P�K	@ � `n�� �0��AKxkH�m�$ T@`!D1�`�"*b�,\0����1!Y���<�� ���0D@���<D # 
�.LPfB¨�(YH��l�i��Qʣ���  28�h��ͤo u l  (�t�ʗ��'@�� �B(%�l1Z � �W��+�J"h���J
�^���m� �8
h��]�/�ꄮ��5�8�%1@FN�lV� ��AZ�^u� ,��7����#ɓZq�I���
K(D@B�	�&c[,`�.ġd�- ^��D�m�
Ԓ@YH��"
X��x̗+ ����"�	'й�p�Qf��1e 2�j������J�L ���	X	R�
f���BxQ��	��E1�HJ@0D����	J:�1 �+�����x,��  nS�  	(��
sEĄ�'�jSl�^�Hr}1�
ŋq�|1�(�`��S�p���Ӟz�����x1A�#T��^�R�IjG�HD$ �Ȓf���!��!w@���@5�#!�(VN0�!`�8W�<ΰ�r��I �$�	���p/A�A)נA"�A��B�c$��QԷK��p"h᬴� 1Q���A$ 4R7���@��2EWX`��H&b�.     P�SRaJa � �45X��Ѡ�����c 0Dm9D  2���)�P8�`� �t�c� r��/eeB  �q�A2�:L�
��
ƧE t���`9�-L� ;�� !i4�,����Cb@����G����`, �)�(��X �� "��FiN$ C�(i
�� �]H�H4b�_ ���6f��BXp
*�CeL`�!����Y*:B@�F�
�RK � 1�!A �$�0!��� �
,�$h�ED8�Fq�@��b���	
4$@0���B!%�Q!n�����7Y�!S,\3\�)!I� ���@�� ��TJ�E	1 ��l!@0R`�@(�X!@pT�	 #�n¢"^!d��� fˠ,���z�@�����O
""�b�f%�e@"$3� S���#r,l�� �\�1#H��3	D��G�B{� 1p#Rc8F԰�.�Y(M���
5[@��*I	DHHB�)A8 t� 
  fXx�T �B�Q`X@�!�I(`PL�� * �"}h)��a�$ @A8j :�X�@��6��
� �Bm�G�'�m���"BQ�
        var tuple = f(x, i, obj);
        r[tuple.k] = tuple.v;
      });
      return r;
    };

    /** bifilter :: (JsObj(k, v), (v, k -> Bool)) -> { t: JsObj(k, v), f: JsObj(k, v) } */
    var bifilter = function (obj, pred) {
      var t = {};
      var f = {};
      each(obj, function(x, i) {
        var branch = pred(x, i) ? t : f;
        branch[i] = x;
      });
      return {
        t: t,
        f: f
      };
    };

    /** mapToArray :: (JsObj(k, v), (v, k -> a)) -> [a] */
    var mapToArray = function (obj, f) {
      var r = [];
      each(obj, function(value, name) {
        r.push(f(value, name));
      });
      return r;
    };

    /** find :: (JsObj(k, v), (v, k, JsObj(k, v) -> Bool)) -> Option v */
    var find = function (obj, pred) {
      var props = keys(obj);
      for (var k = 0, len = props.length; k < len; k++) {
        var i = props[k];
        var x = obj[i];
        if (pred(x, i, obj)) {
          return Option.some(x);
        }
      }
      return Option.none();
    };

    /** values :: JsObj(k, v) -> [v] */
    var values = function (obj) {
      return mapToArray(obj, function (v) {
        return v;
      });
    };

    var size = function (obj) {
      return values(obj).length;
    };

    return {
      bifilter: bifilter,
      each: each,
      map: objectMap,
      mapToArray: mapToArray,
      tupleMap: tupleMap,
      find: find,
      keys: keys,
      values: values,
      size: size
    };
  }
);
define(
  'ephox.katamari.util.BagUtils',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Type',
    'global!Error'
  ],

  function (Arr, Type, Error) {
    var sort = function (arr) {
      return arr.slice(0).sort();
    };

    var reqMessage = function (required, keys) {
      throw new Error('All required keys (' + sort(required).join(', ') + ') were not specified. Specified keys were: ' + sort(keys).join(', ') + '.');
    };

    var unsuppMessage = function (unsupported) {
      throw new Error('Unsupported keys for object: ' + sort(unsupported).join(', '));
    };

    var validateStrArr = function (label, array) {
      if (!Type.isArray(array)) throw new Error('The ' + label + ' fields must be an array. Was: ' + array + '.');
      Arr.each(array, function (a) {
        if (!Type.isString(a)) throw new Error('The value ' + a + ' in the ' + label + ' fields was not a string.');
      });
    };

    var invalidTypeMessage = function (incorrect, type) {
      throw new Error('All values need to be of type: ' + type + '. Keys (' + sort(incorrect).join(', ') + ') were not.');
    };

    var checkDupes = function (everything) {
      var sorted = sort(everything);
      var dupe = Arr.find(sorted, function (s, i) {
        return i < sorted.length -1 && s === sorted[i + 1];
      });

      dupe.each(function (d) {
        throw new Error('The field: ' + d + ' occurs more than once in the combined fields: [' + sorted.join(', ') + '].');
      });
    };

    return {
      sort: sort,
      reqMessage: reqMessage,
      unsuppMessage: unsuppMessage,
      validateStrArr: validateStrArr,
      invalidTypeMessage: invalidTypeMessage,
      checkDupes: checkDupes
    };
  }
);
define(
  'ephox.katamari.data.MixedBag',

  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Obj',
    'ephox.katamari.api.Option',
    'ephox.katamari.util.BagUtils',
    'global!Error',
    'global!Object'
  ],

  function (Arr, Fun, Obj, Option, BagUtils, Error, Object) {
    
    return function (required, optional) {
      var everything = required.concat(optional);
      if (everything.length === 0) throw new Error('You must specify at least one required or optional field.');

      BagUtils.validateStrArr('required', required);
      BagUtils.validateStrArr('optional', optional);

      BagUtils.checkDupes(everything);

      return function (obj) {
        var keys = Obj.keys(obj);

        // Ensure all required keys are present.
        var allReqd = Arr.forall(required, function (req) {
          return Arr.contains(keys, req);
        });

        if (! allReqd) BagUtils.reqMessage(required, keys);

        var unsupported = Arr.filter(keys, function (key) {
          return !Arr.contains(everything, key);
        });

        if (unsupported.length > 0) BagUtils.unsuppMessage(unsupported);

        var r = {};
        Arr.each(required, function (req) {
          r[req] = Fun.constant(obj[req]);
        });

        Arr.each(optional, function (opt) {
          r[opt] = Fun.constant(Object.prototype.hasOwnProperty.call(obj, opt) ? Option.some(obj[opt]): Option.none());
        });

        return r;
      };
    };
  }
);
define(
  'ephox.katamari.api.Struct',

  [
    'ephox.katamari.data.Immutable',
    'ephox.katamari.data.MixedBag'
  ],

  function (Immutable, MixedBag) {
    return {
      immutable: Immutable,
      immutableBag: MixedBag
    };
  }
);

define(
  'ephox.sugar.alien.Recurse',

  [

  ],

  function () {
    /**
     * Applies f repeatedly until it completes (by returning Option.none()).
     *
     * Normally would just use recursion, but JavaScript lacks tail call optimisation.
     *
     * This is what recursion looks like when manually unravelled :)
     */
    var toArray = function (target, f) {
      var r = [];

      var recurse = function (e) {
        r.push(e);
        return f(e);
      };

      var cur = f(target);
      do {
        cur = cur.bind(recurse);
      } while (cur.isSome());

      return r;
    };

    return {
      toArray: toArray
    };
  }
);
define(
  'ephox.sugar.api.search.Traverse',

  [
    'ephox.katamari.api.Type',
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Struct',
    'ephox.sugar.alien.Recurse',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.node.Element'
  ],

  function (Type, Arr, Fun, Option, Struct, Recurse, Compare, Element) {
    // The document associated with the current element
    var owner = function (element) {
      return Element.fromDom(element.dom().ownerDocument);
    };

    var documentElement = function (element) {
      // TODO: Avoid unnecessary wrap/unwrap here
      var doc = owner(element);
      return Element.fromDom(doc.dom().documentElement);
    };

    // The window element associated with the element
    var defaultView = function (element) {
      var el = element.dom();
      var defaultView = el.ownerDocument.defaultView;
      return Element.fromDom(defaultView);
    };

    var parent = function (element) {
      var dom = element.dom();
      return Option.from(dom.parentNode).map(Element.fromDom);
    };

    var findIndex = function (element) {
      return parent(element).bind(function (p) {
        // TODO: Refactor out children so we can avoid the constant unwrapping
        var kin = children(p);
        return Arr.findIndex(kin, function (elem) {
          return Compare.eq(element, elem);
        });
      });
    };

    var parents = function (element, isRoot) {
      var stop = Type.isFunction(isRoot) ? isRoot : Fun.constant(false);

      // This is used a *lot* so it needs to be performant, not recursive
      var dom = element.dom();
      var ret = [];

      while (dom.parentNode !== null && dom.parentNode !== undefined) {
        var rawParent = dom.parentNode;
        var parent = Element.fromDom(rawParent);
        ret.push(parent);

        if (stop(parent) === true) break;
        else dom = rawParent;
      }
      return ret;
    };

    var siblings = function (element) {
      // TODO: Refactor out children so we can just not add self instead of filtering afterwards
      var filterSelf = function (elements) {
        return Arr.filter(elements, function (x) {
          return !Compare.eq(element, x);
        });
      };

      return parent(element).map(children).map(filterSelf).getOr([]);
    };

    var offsetParent = function (element) {
      var dom = element.dom();
      return Option.from(dom.offsetParent).map(Element.fromDom);
    };

    var prevSibling = function (element) {
      var dom = element.dom();
      return Option.from(dom.previousSibling).map(Element.fromDom);
    };

    var nextSibling = function (element) {
      var dom = element.dom();
      return Option.from(dom.nextSibling).map(Element.fromDom);
    };

    var prevSiblings = function (element) {
      // This one needs to be reversed, so they're still in DOM order
      return Arr.reverse(Recurse.toArray(element, prevSibling));
    };

    var nextSiblings = function (element) {
      return Recurse.toArray(element, nextSibling);
    };

    var children = function (element) {
      var dom = element.dom();
      return Arr.map(dom.childNodes, Element.fromDom);
    };

    var child = function (element, index) {
      var children = element.dom().childNodes;
      return Option.from(children[index]).map(Element.fromDom);
    };

    var firstChild = function (element) {
      return child(element, 0);
    };

    var lastChild = function (element) {
      return child(element, element.dom().childNodes.length - 1);
    };

    var spot = Struct.immutable('element', 'offset');
    var leaf = function (element, offset) {
      var cs = children(element);
      return cs.length > 0 && offset < cs.length ? spot(cs[offset], 0) : spot(element, offset);
    };

    return {
      owner: owner,
      defaultView: defaultView,
      documentElement: documentElement,
      parent: parent,
      findIndex: findIndex,
      parents: parents,
      siblings: siblings,
      prevSibling: prevSibling,
      offsetParent: offsetParent,
      prevSiblings: prevSiblings,
      nextSibling: nextSibling,
      nextSiblings: nextSiblings,
      children: children,
      child: child,
      firstChild: firstChild,
      lastChild: lastChild,
      leaf: leaf
    };
  }
);

define(
  'ephox.sugar.api.dom.Insert',

  [
    'ephox.sugar.api.search.Traverse'
  ],

  function (Traverse) {
    var before = function (marker, element) {
      var parent = Traverse.parent(marker);
      parent.each(function (v) {
        v.dom().insertBefore(element.dom(), marker.dom());
      });
    };

    var after = function (marker, element) {
      var sibling = Traverse.nextSibling(marker);
      sibling.fold(function () {
        var parent = Traverse.parent(marker);
        parent.each(function (v) {
          append(v, element);
        });
      }, function (v) {
        before(v, element);
      });
    };

    var prepend = function (parent, element) {
      var firstChild = Traverse.firstChild(parent);
      firstChild.fold(function () {
        append(parent, element);
      }, function (v) {
        parent.dom().insertBefore(element.dom(), v.dom());
      });
    };

    var append = function (parent, element) {
      parent.dom().appendChild(element.dom());
    };

    var appendAt = function (parent, element, index) {
      Traverse.child(parent, index).fold(function () {
        append(parent, element);
      }, function (v) {
        before(v, element);
      });
    };

    var wrap = function (element, wrapper) {
      before(element, wrapper);
      append(wrapper, element);
    };

    return {
      before: before,
      after: after,
      prepend: prepend,
      append: append,
      appendAt: appendAt,
      wrap: wrap
    };
  }
);

define(
  'ephox.sugar.api.node.Node',

  [
    'ephox.sugar.api.node.NodeTypes'
  ],

  function (NodeTypes) {
    var name = function (element) {
      var r = element.dom().nodeName;
      return r.toLowerCase();
    };

    var type = function (element) {
      return element.dom().nodeType;
    };

    var value = function (element) {
      return element.dom().nodeValue;
    };

    var isType = function (t) {
      return function (element) {
        return type(element) === t;
      };
    };

    var isComment = function (element) {
      return type(element) === NodeTypes.COMMENT || name(element) === '#comment';
    };

    var isElement = isType(NodeTypes.ELEMENT);
    var isText = isType(NodeTypes.TEXT);
    var isDocument = isType(NodeTypes.DOCUMENT);

    return {
      name: name,
      type: type,
      value: value,
      isEl��_~��������a���]��?�ޮ��
���Q��jD`�*L6I�&�@@�J��R#l!�tl�S�J=H	0S��"@� �H� �ER -(�eD *@L	i�I��H�`  ����LY�ԉeL}��0��Y$�A�	
�!2A�!�@`A
H��D����C�T0��N�@�>q  �$� @p��	J5H H���#�  ��Ci��� +L !�O`�!�ED�8 Bj��|U���+���=�o}������������j��3Nt��n�۞��N����د��^:�j�cnk��g�'�rh�}�_w�����w�ﳱWP������+��m_��j����������߽�H�	� '7��� )AW`�AA�������A�"L��FK��C 9�P�1�� �u	D�*��p� ���B�E!0`	�Ѣ`j 7"���	�e2��E��A"  !���޽��Ƙ�~���f���s���XL=2k_j�y_���z�wӓ�}�7<������-:=��r����j�.���>���[o3����볯EO���Z�@sk��@������j��iOz���^�$�q��Wש���	�ơ��O�-r���=u>����_9J�>Zo���v��}�����Y��b��Y���f�5��2o�i�?��ο����������W/��lL��������,�_~~_����n3����#���w'�7��}7qK���e	�Q
��@� P��� 
	�P� F�(�(�`"���ԃ�P��E�� B�p�4�� �QpT@J!�) Y�s(���c���v����s���ޫ'���o����s��]���?��9�����ݻ���v��ӯW^k���}�����7��ۏ���ﵾc]�s�\�������_��>{3��fvm����#B/����>�r�4�(������+`�JE���!�F�� �� �
�)�	t� ]
�  �#c 0p:�)PA�1�[Ё�� @!@(Q�jAIB��(�(R@� F�$� �!���F��A�܎5��4��Uia8�"�FC`��@0ƈ �$p {@cI`�Z�a��� ����X�D@x#P�5 4�#2����d�L�2 Pu	Q*��h�XL�^��H ����gU�=s��/>�������U�"��b�z;{k��;��L�j�^��'�wG������w?�_����/��4޽������/��7V�X�h޻����ꗆ������=��׿>����B<�����w�o�} �!Q5  p F)�Q1BA  �
f$6�a�LĠ!B�P�Bh�j3$"��08���@^� 
$�p
 @Q2� �\�� �$ @� A/(�BGR��,

(* K@*��I0��- �@ ���p
R ���*5 ��!�	�0B
�H �&�
# �D���m�l��±�
�X���D��0��� ��C@�T�Ң0nU` �&����o0%�݀�M L p	�� �� ,�@ �
H ���#�l�N XY@  �^����H1!(�2
`�W��'$�	��@��� b	��l��jzc�/��{�_w͠4�s݊�/���~.�/7�����4z?�ge���������u���p��z��s�ί�������?��u����:������{�ߛ�=�����׶� �<�����e������W���L��[����_�ft����Y���~z{��q����
%  �
�&�� �rs{.�~�w�7������~�������Ϊ���jM�K;:��ݾ���W��}>�L��~����
O���4��9���۔�uI�}�g'��_�d���_y�����[�uM-�/h���׈ǟ*,�<iF��DIC��&JP�4NA!�@�h����H�8P	4B�p��R B& p��$�2r\��TY�+�@ ��3c���1� A2$0���(�D$�I)���� 4�-�4��3Wa����Ӟ�P[v6�gq�ǩ'�u��7�����{����ڲ�?�S��:z�x�ݒ���Ƨ�k������޾��7'c��Z�~��?צ_�C}���ry��ʼ,ۥ�9���S���Ӎ��u��W�|t�4�5�g���Z������O�����������dnw\�{�/��q'<΋��N���p~�_;z���+��£}���o��s�t�o��g�gs����g|T}փ����g]_�/����������~���5��kF@d�B� $"CT.�)֛��BD�b��0� �4� �p�Z1&!�EA��p@ H ��
i D�$T  F)0���)L(b����J�� !�0FM�@� W�$�� �@ �� J"u�M�Q䘀?XP*BT�$	M&��A���!	���F
���E�"�p�P��/�2U���c�̱0���d��0a�;�@ �
��"�uV�q.� B�A24h(*T�o`��F� (1  �)�s���L��b
�@(�J ��h@Q��HZEdДv.7�������-�/��~��;��c��Wk��g�i�����7��{������4�흛u�_���Ѯ����������i֗�^=������ޛ��_c���{��>�����������syz�;���a}wT����\E�&d@C<$�2:#�R�ʌ���a! $	On��&�d ��  ��C,c��@��@2�Ic�6QTG:�b�����H�wUR�*@/f�Q e#P�0	(� ��7�O���!$b6��	G1Bw" '�<@ R	pl L�Z��e(K���1�p@@"(@�ȕ1��d���B�$ t�R
�(P� 򂰥���hr�@ Nm&�p� � L�/  �"�  ڿ��{v�����}��������V?����j~�ey��_ק�,��'��߿>�?����6�[��vϭ.��?������?�������&����v�_}'��?��o3{��u�����~�3�W�����;f7H�������!B��#�J� 0^
1�`�"� �
jZ@�P��Q U�BD� �e�Gr7 )�
"�D� ��eI@��0��@�
�@S,h���ta0	&sb�� B `��*Vl "��8��-5X�9 �K�@�HA�XH�B
�*�$ D�I� �VĘQ�d)���������I'���o������~�x��t{�g�[k�
�H#�FeM�^���Ci�>�S�Ag�_��l���
 28b��� I4�@B���k�� Ӱ� L� &̂ g@��	I(DBr��z�}�(�\�w��L���?����������,����vߵ�
A0��%�Q>0� &�<�x�D5��	��2(� ;$��J�(#0��B%��� �1� F[$a!�	̚:���  ���R�BDȌ�%Y%ЀdW�@�8��P��c�< �8 ��D�� `89
�T�W����#�2 �5�6`A�@\�`�
�E��1N.R�2�%&#�V���T��'_��/�7R������g��=n??�򷻿�^���κ�������Q�d�U��MS��G>����窰��^�r+v�}g��o��y��m�������o�g������O�����ߢ���ۯ��������c�eDA���� �h�B�-	>����2���h �j�$�EQ"0f��))����b�Sh=TQh�c��Y�t�x$Hڃ F��U�,��J@�)H40�x��-B�nQD*�sL �����~�*��w��>�_�T���n�4��޺�{�Z�o�K6�Ez�0�n��U�N�}�;wj��k�w^l޷k����keߊ������z����z����]���_���؍��?�t�������T�ݽ&���V���1�v������}�~���?��'Ƿ�է��vm��οɶx��y����=����xg������j/�?n��w8k�/3�޾�m��m榸�T�Wѽ��Ϳm6��O���;��<���Ʋ�KM�����)�@:R9�(�`�!؎ (@��"]�FA@�$'`��F٠�Z�@`Ƞ �]|r�CS2ha  )�`r�l�Wʤ��FCZ&C��<YVn&q���"��!���(�5�
xAqLI��"�q!&��L/*U�+�̱!$-�H/��#!Ch ���0�1#኎#t96ZH�Ø"@  F�#`$b1ER��`�`4JH�.��NPA�A
 @�* ��(�A�JM U0�F
�w�t�����n���M?���SmNng]r��M��;K��^�|�/�>T�pK��k�����%�����7W~ߟ���r}>����o���ٻ�*���g��pY���?;���č�ݯX|ٞӷ׿q~��o��#sting', 'xmp', 'pre', 'plaintext', 'menu', 'dir', 'ul', 'ol', 'li', 'hr',
      'table', 'tbody', 'thead', 'tfoot', 'th', 'tr', 'td', 'caption'
    ];

    var voids = [
      'area', 'base', 'basefont', 'br', 'col', 'frame', 'hr', 'img', 'input',
      'isindex', 'link', 'meta', 'param', 'embed', 'source', 'wbr', 'track'
    ];

    var tableCells = ['td', 'th'];

    var textBlocks = [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'address', 'pre', 'form',
      'blockquote', 'center', 'dir', 'fieldset', 'header', 'footer', 'article',
      'section', 'hgroup', 'aside', 'nav', 'figure'
    ];

    var headings = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

    var lazyLookup = function (items) {
      var lookup;
      return function (node) {
        lookup = lookup ? lookup : Arr.mapToObject(items, Fun.constant(true));
        return lookup.hasOwnProperty(Node.name(node));
      };
    };

    var isHeading = lazyLookup(headings);

    var isBlock = lazyLookup(blocks);

    var isInline = function (node) {
      return Node.isElement(node) && !isBlock(node);
    };

    return {
      isBlock: isBlock,
      isInline: isInline,
      isHeading: isHeading,
      isTextBlock: lazyLookup(textBlocks),
      isVoid: lazyLookup(voids),
      isTableCell: lazyLookup(tableCells)
    };
  }
);

/**
 * Parents.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.dom.Parents',
  [
    'ephox.katamari.api.Fun',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.search.Traverse'
  ],
  function (Fun, Compare, Traverse) {
    var dropLast = function (xs) {
      return xs.slice(0, -1);
    };

    var parentsUntil = function (startNode, rootElm, predicate) {
      if (Compare.contains(rootElm, startNode)) {
        return dropLast(Traverse.parents(startNode, function (elm) {
          return predicate(elm) || Compare.eq(elm, rootElm);
        }));
      } else {
        return [];
      }
    };

    var parents = function (startNode, rootElm) {
      return parentsUntil(startNode, rootElm, Fun.constant(false));
    };

    var parentsAndSelf = function (startNode, rootElm) {
      return [startNode].concat(parents(startNode, rootElm));
    };

    return {
      parentsUntil: parentsUntil,
      parents: parents,
      parentsAndSelf: parentsAndSelf
    };
  }
);

define(
  'ephox.katamari.api.Options',

  [
    'ephox.katamari.api.Option'
  ],

  function (Option) {
    /** cat :: [Option a] -> [a] */
    var cat = function (arr) {
      var r = [];
      var push = function (x) {
        r.push(x);
      };
      for (var i = 0; i < arr.length; i++) {
        arr[i].each(push);
      }
      return r;
    };

    /** findMap :: ([a], (a, Int -> Option b)) -> Option b */
    var findMap = function (arr, f) {
      for (var i = 0; i < arr.length; i++) {
        var r = f(arr[i], i);
        if (r.isSome()) {
          return r;
        }
      }
      return Option.none();
    };

    /**
     * if all elements in arr are 'some', their inner values are passed as arguments to f
     * f must have arity arr.length
    */
    var liftN = function(arr, f) {
      var r = [];
      for (var i = 0; i < arr.length; i++) {
        var x = arr[i];
        if (x.isSome()) {
          r.push(x.getOrDie());
        } else {
          return Option.none();
        }
      }
      return Option.some(f.apply(null, r));
    };

    return {
      cat: cat,
      findMap: findMap,
      liftN: liftN
    };
  }
);

/**
 * SelectionUtils.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.selection.SelectionUtils',
  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Options',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.search.Traverse',
    'tinymce.core.dom.NodeType'
  ],
  function (Arr, Fun, Option, Options, Compare, Element, Node, Traverse, NodeType) {
    var getStartNode = function (rng) {
      var sc = rng.startContainer, so = rng.startOffset;
      if (NodeType.isText(sc)) {
        return so === 0 ? Option.some(Element.fromDom(sc)) : Option.none();
      } else {
        return Option.from(sc.childNodes[so]).map(Element.fromDom);
      }
    };

    var getEndNode = function (rng) {
      var ec = rng.endContainer, eo = rng.endOffset;
      if (NodeType.isText(ec)) {
        return eo === ec.data.length ? Option.some(Element.fromDom(ec)) : Option.none();
      } else {
        return Option.from(ec.childNodes[eo - 1]).map(Element.fromDom);
      }
    };

    var getFirstChildren = function (node) {
      return Traverse.firstChild(node).fold(
        Fun.constant([node]),
        function (child) {
          return [node].concat(getFirstChildren(child));
        }
      );
    };

    var getLastChildren = function (node) {
      return Traverse.lastChild(node).fold(
        Fun.constant([node]),
        function (child) {
          if (Node.name(child) === 'br') {
            return Traverse.prevSibling(child).map(function (sibling) {
              return [node].concat(getLastChildren(sibling));
            }).getOr([]);
          } else {
            return [node].concat(getLastChildren(child));
          }
        }
      );
    };

    var hasAllContentsSelected = function (elm, rng) {
      return Options.liftN([getStartNode(rng), getEndNode(rng)], function (startNode, endNode) {
        var start = Arr.find(getFirstChildren(elm), Fun.curry(Compare.eq, startNode));
        var end = Arr.find(getLastChildren(elm), Fun.curry(Compare.eq, endNode));
        return start.isSome() && end.isSome();
      }).getOr(false);
    };

    return {
      hasAllContentsSelected: hasAllContentsSelected
    };
  }
);

/**
 * FragmentReader.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.selection.FragmentReader',
  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.sugar.api.dom.Insert',
    'ephox.sugar.api.dom.Replication',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Fragment',
    'ephox.sugar.api.node.Node',
    'tinymce.core.dom.ElementType',
    'tinymce.core.dom.Parents',
    'tinymce.core.selection.SelectionUtils'
  ],
  function (Arr, Fun, Insert, Replication, Element, Fragment, Node, ElementType, Parents, SelectionUtils) {
    var findParentListContainer = function (parents) {
      return Arr.find(parents, function (elm) {
        return Node.name(elm) === 'ul' || Node.name(elm) === 'ol';
      });
    };

    var getFullySelectedListWrappers = function (parents, rng) {
      return Arr.find(parents, function (elm) {
        return Node.name(elm) === 'li' && SelectionUtils.hasAllContentsSelected(elm, rng);
      }).fold(
        Fun.constant([]),
        function (li) {
          return findParentListContainer(parents).map(function (listCont) {
            return [
              Element.fromTag('li'),
              Element.fromTag(Node.name(listCont))
            ];
          }).getOr([]);
        }
      );
    };

    var wrap = function (innerElm, elms) {
      var wrapped = Arr.foldl(elms, function (acc, elm) {
        Insert.append(elm, acc);
        return elm;
      }, innerElm);
      return elms.length > 0 ? Fragment.fromElements([wrapped]) : wrapped;
    };

    var getWrapElements = function (rootNode, rng) {
      var parents = Parents.parentsAndSelf(Element.fromDom(rng.commonAncestorContainer), Element.fromDom(rootNode));
      var wrapElements = Arr.filter(parents, function (elm) {
        return ElementType.isInline(elm) || ElementType.isHeading(elm);
      });
      var fullWrappers = getFullySelectedListWrappers(parents, rng);
     /�����������׏��������o�����{����{�����m��������뾫����|��~�]�׻xo�~���"l�~n��x���Vw�'�kUg{�}����gW�����H�^lq�ܶ����x
|+Q@(�(A �6d�X �U�  ��1|(��� L��B"�?!�C@��BaB�@�G���0 &P��4L*IB���F��D�=Y ��!P�SU&q�a!CB	@ XG�
 �4&c��E�� p �aa2ؐ@Qg "�  ``�$28�E�h��	�Xq7� �M8 7��B�6LS�Ï3�u�-�Ў��a(��!� S%�Ġ ���0̕��1!  �
�3 ���g%��G}���Y��������Vl��l=���w��������������6}�$C���t����A���}��U��k�ݾϿ�W��s���?���mJ��;��9�]_����?���?�~+q�ی�?�C@��4���� �T`CE��!A@�HBq1J � BG�#�@Ac�Ny!� @"-|�$ F�NO�(EJ{��� @��� �D�F �YXR\*q@@�.�lP�۟��������}�G�q����W��������m���ۅߟ���W}���ל���w����r���;]�W���������tg�n_o��8�Obvgx���~b��������O/��kmzy���/�y������6�2�sG���g���w�{�����kO���Ӻ敗W�����Kk����M��/y?���Q���}
�"���\}��+����]�u;|���h�^Ժ�__��^k*�v���������ͦ��s�!9 �� %e�޵ ���J�H7�a�J($I@ ��0f���G"P5�h�	WF�c�l�HD)`��"��@%a EA� M� b 9L&���� ��HFM��)�`G � ZS� �F�U���إg��v�s�~�_����Գ����������_���g۾���������l����>������l�Ga��P������$~��}�d��!��܆�������\����z�[�s���3����ܲ��cP� 0R�* 'BQ�5*�a�R3�� �PEp(jB@(��f�� $K
�r$���� �!�)?�6���0���7��;D & 1N`�I:k��i� b��6dH �j�mZ@_�R[0��E�FB D �@��L&��@B��0�B1��d��F�й,��-��TDb��l��$F��IL�&�8@$p� �����n�>U����e[d�t	
�P8.0F
�D, �IҖd%c$v�C��""  o�i�#�"���@��1,6�AJ#�09� 4GuB� �vPA��6$�@�@0 ���������[�{���s]�L:4�>��_
0"�� Yz��Q��B
�D���'�� �Af@X�<�H���.�~����k�j�~��~��o��wq���|��}�����޷��޶޾���3��V����n�W���\�����������n��_~�x���^���@o瞾���5����M��������eO��=ld �`�M`�k��c�D!z�&&�=%��Oj� @�*X�lt�	��tG����[�v Hp"!�:,�Q4�
�ED�h 0RA�X �R"Z*Pt�Q�u���G*�0Q��\VdȘ�D�$!Q��B (|�FF� a$@$  B�� b4u  ��H .��,�H�	�6}�� �P #B;�m0�1�H)h�d���C��������Ϗ�����:O��wzz_~�՞�~�z���������>���*�����붱3�������{�p������=������<�-���[����'���s�}�w�����4���u�������ݗSw�@ijA	��mX"x��@ A�70$W`��`��D���B�cv�� J�b�B�����R

:��l-<�$�4A� J���p���@�i.(�I(���#0��R(6#���.[�k��?X��M��r�f��_��mB�|��瓽���8��e���y��Rg��~�����S���oۿ�q|��S��v5��_4����{�������f{]t5���׻�����og���ͫ��^X���/w�����	�?�T�?��K���ת���&#�����<�n�v�<�޳����ޞ���s���9�u��j�'��jT���������v�y���>����?D������܎���d�٫�������w�un<�<��M>`DXp �*�$��b H�(�ADA Ue����� �#I� GF� fG�ଖ�A��Pf   ",zb�` P��FQ0�+B� ��@���4�� �� �*'� �~����-��������������嗾�e�����-�a��_�هD�w�s����?����y��Q��|���~~��n������{����o�^w�=3{öަ�	%	�麿|���w?����Ǟ�������<}�����2�g!��Q� C�k P�B@��"� ���E�A��X2S�nA�Ad�X�n�D�C9��� ikP�C��+P��|���J��mE#�2,$��R Xե���
 �4�&�K=#E,0U(uܐd9�(q��󽗾�K��W����g�����Y�_�Ri�����V�{�Ϡ�����S������������������(�H��-��wvگ����y;�	��uۛt_���&���о�>�˿��?���������)��"N
�GO1XbH� �B��t�T#��@>	J�X� 80�"2 U`>H�"#	��R ��pN *�ǉ�l�����4�,1�^��L@&�F "��"C�D(�Tg]	��O�����_�3�����ӳ����o�_������?����]��u[�\��R<�NPu_�������V����������Nowl�����Oi���c��{��z��o����v��߮�w���Woﯶ��7�������t��O�����n��ʿ�~~�{����W<�Y��������|_�������������J������������do��~�/�Z/u?�����Һ�Y�����6�w�Qyvqk���cm�����g�$z˽���_�w�N�<�G`�<$���0�M	S�~��D�Q � :d�dD�u�Eb������	�PTE�!� W�?�õ�
D0I�EɅI�������b5Ki�xAL	"j��?�I��:j8Q�/�,��׵���y�E��G�k��vW��Їލ���L��]K�>瓵�~�2�W��|��>�m���k�~������-�s���V��j/{�Ͻ�M4�/�߿z�n��k��?��r������b]���(�R�'D�`"`"�@A�E�%,4 W�@P��P��f  �@�8`�R�+����+ ^�pq!�m� @��pńEP@�%�$�:� � n J�$H�% �!�	E$\
�2 B��Bā! F�� ˄��Uy4��H "D D8��0 $�$�G���
'F�� І) @�4
 aG�<�!�B(�¤\�y�/���@�O�n��s۹����5�[����s�G�v7�������M�ி�,`��O�}�͏�����H/�
i�=��D�?�Z%�z��|�����߳�]�r����^����\����Y=�|H�JDX��@
�K�Jh*��F҆/ �9{HhdRRD�H��
� 3��� ��(1�G����*
F�"V����$'(��fF��
��B���*�҃����Ԑ�Ł�  2Ii �eB�
�Q$`
 �# �J&�����1�b�` X�C�  �ʮJ2)� 2�f0���% ����:�������=;{��_�g��Ŀ�V��f�>������y�n���j��=��w;�����=�/ΰ�qv�5o��;�������s��������ev�۲����h��4�||��:���?�B�������K�����9����a	@d� � h	� �"@0L d���(bk����x����� (A1PtL�F 2�BĆ�_�J�X,JS�A}xI���@�@Iz���  �J�<� .1B0"�T'��ӵ?�_��[����W���7|��N�c[�_~���{���syG7yޗ�����O��|������������_�{��a7������&���3������#���o����n��/���o=q�H��=;��u�oU�������Ow�v���q�{6��V�������ג�	��/U�v��9�v���ҟ��cqN?��T���3����_��W"�޻ٿ�{�:���u�-�?���_c-�ٽN���x��5������������
�0���X�3:�9H� A�7**@��VY�K�Q���
�!�E Z@ä$PK%�\1�BP ���4\���&.�<N�hn@ ZDv�EFT�@�Q`P'��;05�p=G`�羔���������}mޓ�����~�a���l/y7�;�Ͻ?�?������������VM�B�����������N^}��O��]�;���w���a�ƴT��򻮧�U�K�QV���x�p ���!E#0!� �8$A��N�DJD���(
I�y@���@ �	��@� 2D���AW��p�D4�Gn�v4
��'�p4�v�!�SaH�HQ�t��@pS6t��%à(���%I� <}��Ga�&&�6`t@��]�"FH��$8 �1 �j�N��q�$L�5MH� 
4H%)RU�����)0	6�C$X-���X������,yϞ������n����g�����!�
0G�H
�D(DÂ��8���K�m������{��{_���l�s�'���o���<_��U�~?��x��[~���~�;����__o�Ϩ�zwa�C}�'=?i��(�j]������/����Zμu�ԫ�/���s�{��;���P���w� �|ƭ�_�3��O}om�ȿ��z?��B��;��o?~���w�t���������{����)W���j���w���O��{����sfc������՝���^Q�Q���~P~�~M�S����βT�f��r͸�t�F�"� e� kd �@5 ��0I@Z4��6��"�2�$ � Й(d<q��HAꂄ�� 1@�C�+iE@#?a�FN
��L� l@ ���H mI�("�YX�  L>t��\˾ȯ���L����ۮf�n��OG�|���?����g���g_S�?>3yw�Ǟ�^os�'����7_�m᪏f����k�'�_d��q������)�����~���������o'^�k���g��@$�	Fs B��� бv�$��'h�B�JHL� �A�"��� O (LR��V�� HD�-�[3�1c �N���#m�����	J!@��Bc�d@�� kb*�pFċ""i�1B!I0eI@Aئ9 	J���|5&��B�����d��dڀ� �n
ҠA�4	8)b����DE3� �X���@�;va�0"�J@�
hp��\R�	��&� ȮIʸ�����v{�L��~���s����m����v��_���Ѫnn~�����ǝ6??������������k����7ͱ��:���y'����߁�_�s��oo������:�������G���PwNUJ{��c ��r�! (`H$H"D��B�����#i8 `  $A`���$�%����B  9�� �!�]qt ����	`  M�Z$FP��K��i`a8����P`�:�J��� *��+ k�S�s�������3���4׍=+����������&u��?�N{|�>�ƌ��Sww�?Os�C�E�87��+oI��ҝ�f��I��w��ec�_^��F\��-aîY��.���x�g|�������?{m�Hk�_��w-�_ό�=M�Ǔ����I^��_��E�y��������F{��ݯ_�����wQ����~��\�t��v�w�����it��������A�X2��w��L���2��.�u��{��'�"�$^1Z1� AX�
�
Q � ���)$D�����   -��K����@H*�(
���B�IE 9 DOMRanges
              if (rng.createContextualFragment) {
                rng.insertNode(rng.createContextualFragment(content));
              } else {
                // Fake createContextualFragment call in IE 9
                frag = doc.createDocumentFragment();
                temp = doc.createElement('div');

                frag.appendChild(temp);
                temp.outerHTML = content;

                rng.insertNode(frag);
              }
            }
          }

          // Move to caret marker
          caretNode = self.dom.get('__caret');

          // Make sure we wrap it compleatly, Opera fails with a simple select call
          rng = doc.createRange();
          rng.setStartBefore(caretNode);
          rng.setEndBefore(caretNode);
          self.setRng(rng);

          // Remove the caret position
          self.dom.remove('__caret');

          try {
            self.setRng(rng);
          } catch (ex) {
            // Might fail on Opera for some odd reason
          }
        } else {
          if (rng.item) {
            // Delete content and get caret text selection
            doc.execCommand('Delete', false, null);
            rng = self.getRng();
          }

          // Explorer removes spaces from the beginning of pasted contents
          if (/^\s+/.test(content)) {
            rng.pasteHTML('<span id="__mce_tmp">_</span>' + content);
            self.dom.remove('__mce_tmp');
          } else {
            rng.pasteHTML(content);
          }
        }

        // Dispatch set content event
        if (!args.no_events) {
          self.editor.fire('SetContent', args);
        }
      },

      /**
       * Returns the start element of a selection range. If the start is in a text
       * node the parent element will be returned.
       *
       * @method getStart
       * @param {Boolean} real Optional state to get the real parent when the selection is collapsed not the closest element.
       * @return {Element} Start element of selection range.
       */
      getStart: function (real) {
        var self = this, rng = self.getRng(), startElement, parentElement, checkRng, node;

        if (rng.duplicate || rng.item) {
          // Control selection, return first item
          if (rng.item) {
            return rng.item(0);
          }

          // Get start element
          checkRng = rng.duplicate();
          checkRng.collapse(1);
          startElement = checkRng.parentElement();
          if (startElement.ownerDocument !== self.dom.doc) {
            startElement = self.dom.getRoot();
          }

          // Check if range parent is inside the start element, then return the inner parent element
          // This will fix issues when a single element is selected, IE would otherwise return the wrong start element
          parentElement = node = rng.parentElement();
          while ((node = node.parentNode)) {
            if (node == startElement) {
              startElement = parentElement;
              break;
            }
          }

          return startElement;
        }

        startElement = rng.startContainer;

        if (startElement.nodeType == 1 && startElement.hasChildNodes()) {
          if (!real || !rng.collapsed) {
            startElement = startElement.childNodes[Math.min(startElement.childNodes.length - 1, rng.startOffset)];
          }
        }

        if (startElement && startElement.nodeType == 3) {
          return startElement.parentNode;
        }

        return startElement;
      },

      /**
       * Returns the end element of a selection range. If the end is in a text
       * node the parent element will be returned.
       *
       * @method getEnd
       * @param {Boolean} real Optional state to get the real parent when the selection is collapsed not the closest element.
       * @return {Element} End element of selection range.
       */
      getEnd: function (real) {
        var self = this, rng = self.getRng(), endElement, endOffset;

        if (rng.duplicate || rng.item) {
          if (rng.item) {
            return rng.item(�~����ޗﶙ��F�� �����=�E�b��ϑ�c��>}Z-���O��l��e�$�ׯ������&N���U�6+��^��l��-���|��?�og��w��U/�{����cu�|���=��ύ=�^˩�>?�P��E�`�� bt���ÀWB$ �T@x0x*L0P�D�.�`��I4 JX(r�
�, R8 �
%,��%����00"p�0�0 @���V�v���{?�7�f�v�����m���ח��ݭ���e����ݓ���9�۰s���O��6�Q'�Nȳ{���>΀k������˴6���I�����o�����_o��v����[ڛ��'��o^�w�����P R "!0$0 P$@L% �G�R G)c �AB $�1mP�� `"A��H�M��H`T�x
 �8�1�h�L@B�5���@"I\h�r '�B2O�¶B����<@-�(!��{Vk�M��寤c��Tí�I�������&�_�����q�3�S�����Ps�l�m4�_&�ϻq����6�٦�٨w�=�S����9_�-eXX����Q'��>s��{Qy-Y>�w=l��
�������ae0B�JQ)
���&��� �2A�"@a�R20�h0��|!
P�(��
J��
 5�  !FE�X��GZ`@��X� @@�G(n���NKH��@��@��ӑ�B�"0�6����ݧ�?�,�o�k6grEM�ln�O�owj�|�y:��sOׅ2-��o�..�����kO�c�w�Mkt�p�x�,�Z\{x��;f��o��N���<<����$�Ϛ�% �	���� ��.��*{�yo��@���^��0I� `ꡐ"kZ�fDF����$Hb�#�
���.	Ā����a��P�@ ���)�P�I���$�� U �j��`XF� ����"�)@a(j ID  Ȉ81�B�P� $m/ *"���x!	�G�HA#A XdhQP (����0
�D�d����@]@M��0D��Qb� %�4���^��g���֕�߇in0�n��}�����O����6��;�.2�}��+���7g;����D���Mo��ݩ��M��w�x���Rs��u�ٽ�Nh���ҹS��ڿr���5t���eR[���qwL�_���:y��y���l��o^Ӌٯ���/��Fվ�r��;�}��϶���c������_���{�eU+�|y��'���G���c$�>���Ϸd��+ng���~�?[���/��3�� w!'U`�jT� �F)O���! �&��	 B�$���2�TD��*h�a#0�(�T@QB�
��p�0�`A*�@���
SA40�t1���x�y� ) 0k��UCt��[�@�?n.�Y?�7��������>L��ժ��_g���O�_���{��?�+�������O>e��/�-�
��Lj/�dʮ���`o4��ӵw�j���$�#w���&k;���/�gw;ON�h#�`&�"�B�aE{ Q`A����  P#�c�F&҂
04�;������
� �TS��p(��A$@� �$P�� ��i� $Qa%�m`�zA"Z��B���� &�#�:�@X ��QI (�G�� �ؔL'.�U�T���
$J�hH���|�sK�V����J���4&O��o�}�߉s����k�����}��o���ڽ���~j������w����]J��sۺ�뭟�7^�R4p�m𗬭��j�n�#����{��>�.�����>��������1�$�A� B�`��I��4(�m"@H@A@4a8��lBBAb J �4V�F ���
������ WL%
 D#%d�N@ F{ �%D�&!%P �(����l�'�׷�*�]��ߝ�h�����2����r?���>��M�F����=o��_*˴z/ �zr����g�x����v}O����n�}y�������}���������W����׼q���7��11>��A`����3[�( ���[���0�"$�c �����K��� ǰaD"؆A B #�8E ��C	�@���Ș(�#  �L 1��
�(���RL��$�@F h��,X�" A@�>��(4"� �% ���ʂ���!��P M�&`�@( h�"���@r2���Ʉ-@�@���� ��ZO�8�@Z�@aeA @ 3���@h��Z��;;�O����]�O_�.L������w��?;���g����/�z�L�}�w}�~]Z�NK�i�?��mg��������|8��:w�&v
�Iٶ��z7HJ �
2̊q@!�	$k�F6���cȀ�B�0H
���䌐XWC{�˻~4��������������u?k�>W����+XHi�m�vYt�q�>:����~b��[y���~
}�7X;D����/�������Y�;칽�[U��N��G�QP����3��jO�Wm�����y�c��r����.פ`�)A�a�!W �P�

1�4 
�V+~߉�?��/�{�o:��������������g\���s������'*�y��ǽF�6}�\��f�w�ߙ���V����f��T�_m�����{��{����}�=������{������Km�S���ǭe�s��ݷ>xi\���E�����(���������Y�.?�������ի���Ͻ��S��[�҂�>W����"��,#�o��?\�u.�;��{
�����=h�޴?I���ޯ��Xg��3�o��Lޤ��hҟ�k��������=��Y�{���Mks��@`��������.�{w?{�7�l�����|ZO(^U��uj��en��{��Q��ε>�-�7���G�G�g�����
���s���Ss۪Q�}�y���]t
�w=�M|v��/���l/�����ok��nu��_8��������~���q�S���7]o�o�ǧ��.߬��ڭ���>8��7�_�W�:���o{�f��>�mޖ��������n|c��}|��f}߼������O���|�:�_�ʧ�>�}>���[�m�oOڍ�G������0�v����|�����fs�q�=�߿���~�=YS�.�ӑnۿ�	�EY���
>>�����پ䕻�k4��~�\�����o_9v�j�j�w����.��Z�O��l{���3��?ֿ�]��U������~q�r-Zn�~`�*��������H��������o�����u�3���{�mpۼ6������}���{z�n�o���8�����]����p�[o��V��'����ߘ�_g�����VVL��1��i��)��|f:�{k��s�ܟ��gg���߶�O�Я����9�3�������;�����k�o��_��U�_���M�U�؟���o}�����ޜ�ٿ�0�ՕOu}�L����������+���Y��g��_���3�};��r�7��������_n���xo����{���=f�_��������{�ꯏ%�O￯�x��2�o�>���v7�v�N�gz�����3�����{�SE�>��]�o�_=e0o�_o�f�)?��{���	�?.כ���IV㎪��n��󹤛��yٯ�^�<�:��?����]���k}ͣ���7W�=e���۩��_�ߛs�/���o�|��k���5����[�n^v��N+�?r�Ͻ�Gy?;�|�;�ҙ%9�E���?��������W����ݱYoO�
f0R)��Z�l��������ʷ�?�w�|�p�ֽ��ܭ?S�__���G��s?k�V޷פyN��UM�v*��G�vn�o��?��������iӟ�wk��v����{�����Q��D�b��O���}<��_.[��,�;�m?�/��n��_��?��������~��˿ݝ�+��ӎ���z=�������_}���O{�s���_C��nh��������6��V.�X���)}6>N�z?w=������)�[s���ث��/����}gW0=��޼�M��ߡ���O^��P}yL�1������׾��4=x�8�ܳ߿csߑ����~��\�1�u�3�(�� Z?�|��GKWշ�䷗��xA��A5�9���o��j۰\��H����� }3ۻ?K��N�,f���}O?NN��������j�o�|���:�z7�����B������lӹM��{���K�x�?q�v��پ��v���n���=�_kw���j����[}�w���7p�B�����k�஍��o��.������l�{��ҏ����x�>ֽY3��{�.�Mڲ���o~�_�_�{��_J}���k���t�۷g;�n_綬݄߯��s��S�Ev*��kksO����Yw�+�w/q����/n{څ��^�������{�-�Wf��{�7oQ��lԲ�?}�L-��A�}������=������/�\�g7���������#g�D�}���E��_���M�����ћ��y/,/�����2�����/ф��s.���f��������h �Ꟊ��o�{���xU���S����m���U�����O}E��I��������s���������۷�˥�׿͗��i?�?��Vk�N��dj�o��.Sgt������>��M��jquo��%o��/]������u�g�����/���'h���+���xS�u����o$w�v��{�������ku��O�pn;R���{���ŏ��q�v�ݩ����[�mo��������Q����n;�o���$�����l�q�/._�[�Y��qR�w�jG}G��e�#�_���z������+:^�D��������;���t���]�gcE��u����{�6��������J=����ן�>|�
        // IE 11 doesn't support the selection object so we check for that as well
        if (isIE && rng && rng.setStart && doc.selection) {
          try {
            // IE will sometimes throw an exception here
            ieRng = doc.selection.createRange();
          } catch (ex) {
            // Ignore
          }

          if (ieRng && ieRng.item) {
            elm = ieRng.item(0);
            rng = doc.createRange();
            rng.setStartBefore(elm);
            rng.setEndAfter(elm);
          }
        }

        // No range found then create an empty one
        // This can occur when the editor is placed in a hidden container element on Gecko
        // Or on IE when there was an exception
        if (!rng) {
          rng = doc.createRange ? doc.createRange() : doc.body.createTextRange();
        }

        // If range is at start of document then move it to start of body
        if (rng.setStart && rng.startContainer.nodeType === 9 && rng.collapsed) {
          elm = self.dom.getRoot();
          rng.setStart(elm, 0);
          rng.setEnd(elm, 0);
        }

        if (self.selectedRange && self.explicitRange) {
          if (tryCompareBoundaryPoints(rng.START_TO_START, rng, self.selectedRange) === 0 &&
            tryCompareBoundaryPoints(rng.END_TO_END, rng, self.selectedRange) === 0) {
            // Safari, Opera and Chrome only ever select text which causes the range to change.
            // This lets us use the originally set range if the selection hasn't been changed by the user.
            rng = self.explicitRange;
          } else {
            self.selectedRange = null;
            self.explicitRange = null;
          }
        }

        return rng;
      },

      /**
       * Changes the selection to the specified DOM range.
       *
       * @method setRng
       * @param {Range} rng Range to select.
       * @param {Boolean} forward Optional boolean if the selection is forwards or backwards.
       */
      setRng: function (rng, forward) {
        var self = this, sel, node, evt;

        if (!isValidRange(rng)) {
          return;
        }

        // Is IE specific range
        if (rng.select) {
          self.explicitRange = null;

          try {
            rng.select();
          } catch (ex) {
            // Needed for some odd IE bug #1843306
          }

          return;
        }

        if (!self.tridentSel) {
          sel = self.getSel();

          evt = self.editor.fire('SetSelectionRange', { range: rng, forward: forward });
          rng = evt.range;

          if (sel) {
            self.explicitRange = rng;

            try {
              sel.removeAllRanges();
              sel.addRange(rng);
            } catch (ex) {
              // IE might throw errors here if the editor is within a hidden container and selection is changed
            }

            // Forward is set to false and we have an extend function
            if (forward === false && sel.extend) {
              sel.collapse(rng.endContainer, rng.endOffset);
              sel.extend(rng.startContainer, rng.startOffset);
            }

            // adding range isn't always successful so we need to check range count otherwise an exception can occur
            self.selectedRange = sel.rangeCount > 0 ? sel.getRangeAt(0) : null;
          }

          // WebKit egde case selecting images works better using setBaseAndExtent when the image is floated
          if (!rng.collapsed && rng.startContainer === rng.endContainer && sel.setBaseAndExtent && !Env.ie) {
            if (rng.endOffset - rng.startOffset < 2) {
              if (rng.startContainer.hasChildNodes()) {
                node = rng.startContainer.childNodes[rng.startOffset];
                if (node && node.tagName === 'IMG') {
                  sel.setBaseAndExtent(
                    rng.startContainer,
                    rng.startOffset,
                    rng.endContainer,
                    rng.endOffset
                  );

                  // Since the setBaseAndExtent is fixed in more recent Blink versions we
                  // need to detect if it's doing the wrong thing and falling back to the
                  // crazy incorrect behavior api call since that seems to be the only way
                  // to get it to work on Safari WebKit as of 2017-02-23
                  if (sel.anchorNode !== rng.startContainer || sel.focusNode !== rng.endContainer) {
                    sel.setBaseAndExtent(node, 0, node, 1);
                  }
                }
              }
            }
          }

          self.editor.fire('AfterSetSelectionRange', { range: rng, forward: forward });
        } else {
          // Is W3C Range fake range on IE
          if (rng.cloneRange) {
            try {
              self.tridentSel.addRange(rng);
            } catch (ex) {
              //IE9 throws an error here if called before selection is placed in the editor
            }
          }
        }
      },

      /**
       * Sets the current selection to the specified DOM element.
       *
       * @method setNode
       * @param {Element} elm Element to set as the contents of the selection.
       * @return {Element} Returns the element that got passed in.
       * @example
       * // Inserts a DOM node at current selection/caret location
       * tinymce.activeEditor.selection.setNode(tinymce.activeEditor.dom.create('img', {src: 'some.gif', title: 'some title'}));
       */
      setNode: function (elm) {
        var self = this;

        self.setContent(self.dom.getOuterHTML(elm));

        return elm;
      },

      /**
       * Returns the currently selected element or the common ancestor element for both start and end of the selection.
       *
       * @method getNode
       * @return {Element} Currently selected element or common ancestor element.
       * @example
       * // Alerts the currently selected elements node name
       * alert(tinymce.activeEditor.selection.getNode().nodeName);
       */
      getNode: function () {
        var self = this, rng = self.getRng(), elm;
        var startContainer, endContainer, startOffset, endOffset, root = self.dom.getRoot();

        function skipEmptyTextNodes(node, forwards) {
          var orig = node;

          while (node && node.nodeType === 3 && node.length === 0) {
            node = forwards ? node.nextSibling : node.previousSibling;
          }

          return node || orig;
        }

        // Range maybe lost after the editor is made visible again
        if (!rng) {
          return root;
        }

        startContainer = rng.startContainer;
        endContainer = rng.endContainer;
        startOffset = rng.startOffset;
        endOffset = rng.endOffset;

        if (rng.setStart) {
          elm = rng.commonAncestorContainer;

          // Handle selection a image or other control like element such as anchors
          if (!rng.collapsed) {
            if (startContainer == endContainer) {
              if (endOffset - startOffset < 2) {
                if (startContainer.hasChildNodes()) {
                  elm = startContainer.childNodes[startOffset];
                }
              }
            }

            // If the anchor node is a element instead of a text node then return this element
            //if (tinymce.isWebKit && sel.anchorNode && sel.anchorNode.nodeType == 1)
            // return sel.anchorNode.childNodes[sel.anchorOffset];

            // Handle cases where the selection is immediately wrapped around a node and return that node instead of it's parent.
            // This happens when you double click an underlined word in FireFox.
            if (startContainer.nodeType === 3 && endContainer.nodeType === 3) {
              if (startContainer.length === startOffset) {
                startContainer = skipEmptyTextNodes(startContainer.nextSibling, true);
              } else {
                startContainer = startContainer.parentNode;
              }

              if (endOffset === 0) {
                endContainer = skipEmptyTextNodes(endContainer.previousSibling, false);
              } else {
                endContainer = endContainer.parentNode;
              }

              if (startContainer && startContainer === endContainer) {
                return startContainer;
              }
            }
          }

          if (elm && elm.nodeType == 3) {
            return elm.parentNode;
          }

          return elm;
        }

        elm = rng.item ? rng.item(0) : rng.parentElement();

        // IE 7 might return elements outside the iframe
        if (elm.ownerDocument !== self.win.document) {
          elm = root;
        }

        return elm;
      },

      getSelectedBlocks: function (startElm, endElm) {
        var self = this, dom = self.dom, node, root, selectedBlocks = [];

        root = dom.getRoot();
        startElm = dom.getParent(startElm || self.getStart(), dom.isBlock);
        endElm = dom.getParent(endElm || self.getEnd(), dom.isBlock);

        if (startElm && startElm != root) {
          selectedBlocks.push(startElm);
        }

        if (startElm && endElm && startElm != endElm) {
          node = startElm;

          var walker = new TreeWalker(startElm, root);
          while ((node = walker.next()) && node != endElm) {
            if (dom.isBlock(node)) {
              selectedBlocks.push(node);
            }
          }
        }

        if (endElm && startElm != endElm && endElm != root) {
          selectedBlocks.push(endElm);
        }

        return selectedBlocks;
      },

      isForward: function () {
        var dom = this.dom, sel = this.getSel(), anchorRange, focusRange;

        // No support for selection direction then always return true
        if (!sel || !sel.anchorNode || !sel.focusNode) {
          return true;
        }

        anchorRange = dom.createRng();
        anchorRange.setStart(sel.anchorNode, sel.anchorOffset);
        anchorRange.collapse(true);

        focusRange = dom.createRng();
        focusRange.setStart(sel.focusNode, sel.focusOffset);
        focusRange.collapse(true);

        return anchorRange.compareBoundaryPoints(anchorRange.START_TO_START, focusRange) <= 0;
      },

      normalize: function () {
        var self = this, rng = self.getRng();

        if (Env.range && new RangeUtils(self.dom).normalize(rng)) {
          self.setRng(rng, self.isForward());
        }

        return rng;
      },

      /**
       * Executes callback when the current selection starts/stops matching the specified selector. The current
       * state will be passed to the callback as it's first argument.
       *
       * @method selectorChanged
       * @param {String} selector CSS selector to check for.
       * @param {function} callback Callback with state and args when the selector is matches or not.
       */
      selectorChanged: function (selector, callback) {
        var self = this, currentSelectors;

        if (!self.selectorChangedData) {
          self.selectorChangedData = {};
          currentSelectors = {};

          self.editor.on('NodeChange', function (e) {
            var node = e.element, dom = self.dom, parents = dom.getParents(node, null, dom.getRoot()), matchedSelectors = {};

            // Check for new matching selectors
            each(self.selectorChangedData, function (callbacks, selector) {
              each(parents, function (node) {
                if (dom.is(node, selector)) {
                  if (!currentSelectors[selector]) {
                    // Execute callbacks
                    each(callbacks, function (callback) {
                      callback(true, { node: node, selector: selector, parents: parents });
                    });

                    currentSelectors[selector] = callbacks;
                  }

                  matchedSelectors[selector] = callbacks;
                  return false;
                }
              });
            });

            // Check if current selectors still match
            each(currentSelectors, function (callbacks, selector) {
              if (!matchedSelectors[selector]) {
                delete currentSelectors[selector];

                each(callbacks, function (callba�O�����(D`Ԓ��m��?@3���VR� j�K�.M �i��U�F����l�Z 0pH	�X��E�
h �fH���(���l��H�����0J���e
fB�)1�f���(�R�'D�`"`"�@A�M�%,4 W�@P�����f  �@��(`�R�+򀣢+ ^�pq!��m� @(�pńEP@�%�$�:� � n 	J�$H�% �!�	G4L
�2 B��Jā� ��0K���Uy4��H "E D8�&�0 $�$�G���
'F�� І) @�4 `G�<�!�B�(�¬U��AF�)�3U���@w	���x F���%�84���z�1�7iҮ�2Q��2�($� ]ű�.�6	 �XO�0�M%��c'��C&��޵'28̈́��@�|H�JDX�p@	U @�8t��(b2�@�2��(j$@@H��" "���
�I�Jl*ɋF҇- �9{HhdRRD�H���*� 3��� ��(������*
F�"����$'(���F��
�����*�҃����А���� `2Ii neB�
�Q$`
 �# �
&
����1�!�b�` X�C�  �®J2)�2�f0���% J�@  O�B7��8:
Hd�����Bi��Q �D@sp�C��* ���b  ����D �dU��9d�cW!|�6@�JND Z&�P�� �`� 91
�0���X�3:�9H� @�**@��TY�KR�Q揀�J�!�E Z@ä%PK%�\1�BP ���4���&.�N�hn@ ZDv�EFT�@�Q�P% %?�P�D�䊍ciH>
4H)RU���
��)0	6�C$X
x�E�AV���E ���@@�B� @� ��-
@H�
0G�I
�D(DÂ��8�@
סJ� 
@Ti0* 6�gt�B,*�c���5 �Ȕ�t!�$�9�\��2b�	�4	��0"���3�ЇDDj?@�	8S6�j���
��L�0lB F���H eI�("�Y�  L D�ـ ��FRŰ"D�� P�p*	�$
s��.��Xb 2�[! �;�7iBE Lpf ��% H ��`p,�� 6 �T��")��0@   od��0
p��ptF# `E\�P@��@%���GFs B��� Աv�!$��'h�B�JHL� �A�"��� O (LR��v�� D�-�[:�1c �L���#m�����	J!@�Bc�d@�� �kb*�pŋ""i�1@!I0eI@Aئ9 	J���\5&��@�����d��d��� rn
ҠA�4	8ib����DE3� �X���@�;va�0"A�J@�
hp��\Z�	��& �ʬIʸ����� 
d%��!v��F�F.
0T\y
�
dQ � ���)$D�����   =��K����@H*�(
          return false;
        }

        /**
         * Returns all the nodes attributes excluding internal ones, styles and classes.
         *
         * @private
         * @param {Node} node Node to get attributes from.
         * @return {Object} Name/value object with attributes and attribute values.
         */
        function getAttribs(node) {
          var attribs = {};

          each(dom.getAttribs(node), function (attr) {
            var name = attr.nodeName.toLowerCase();

            // Don't compare internal attributes or style
            if (name.indexOf('_') !== 0 && name !== 'style' && name.indexOf('data-') !== 0) {
              attribs[name] = dom.getAttrib(node, name);
            }
          });

          return attribs;
        }

        /**
         * Compares two objects checks if it's key + value exists in the other one.
         *
         * @private
         * @param {Object} obj1 First object to compare.
         * @param {Object} obj2 Second object to compare.
         * @return {boolean} True/false if the objects matches or not.
         */
        function compareObjects(obj1, obj2) {
          var value, name;

          for (name in obj1) {
            // Obj1 has item obj2 doesn't have
            if (obj1.hasOwnProperty(name)) {
              value = obj2[name];

              // Obj2 doesn't have obj1 item
              if (typeof value == "undefined") {
                return false;
              }

              // Obj2 item has a different value
              if (obj1[name] != value) {
                return false;
              }

              // Delete similar value
              delete obj2[name];
            }
          }

          // Check if obj 2 has something obj 1 doesn't have
          for (name in obj2) {
            // Obj2 has item obj1 doesn't have
            if (obj2.hasOwnProperty(name)) {
              return false;
            }
          }

          return true;
        }

        // Attribs are not the same
        if (!compareObjects(getAttribs(node1), getAttribs(node2))) {
          return false;
        }

        // Styles are not the same
        if (!compareObjects(dom.parseStyle(dom.getAttrib(node1, 'style')), dom.parseStyle(dom.getAttrib(node2, 'style')))) {
          return false;
        }

        return !BookmarkManager.isBookmarkNode(node1) && !BookmarkManager.isBookmarkNode(node2);
      };
    }

    return ElementUtils;
  }
);

/**
 * Preview.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * Internal class for generating previews styles for formats.
 *
 * Example:
 *  Preview.getCssText(editor, 'bold');
 *
 * @private
 * @class tinymce.fmt.Preview
 */
define(
  'tinymce.core.fmt.Preview',
  [
    "tinymce.core.dom.DOMUtils",
    "tinymce.core.util.Tools",
    "tinymce.core.html.Schema"
  ],
  function (DOMUtils, Tools, Schema) {
    var each = Tools.each;
    var dom = DOMUtils.DOM;

    function parsedSelectorToHtml(ancestry, editor) {
      var elm, item, fragment;
      var schema = editor && editor.schema || new Schema({});

      function decorate(elm, item) {
        if (item.classes.length) {
          dom.addClass(elm, item.classes.join(' '));
        }
        dom.setAttribs(elm, item.attrs);
      }

      function createElement(sItem) {
        var elm;

        item = typeof sItem === 'string' ? {
          name: sItem,
          classes: [],
          attrs: {}
        } : sItem;

        elm = dom.create(item.name);
        decorate(elm, item);
        return elm;
      }

      function getRequiredParent(elm, candidate) {
        var name = typeof elm !== 'string' ? elm.nodeName.toLowerCase() : elm;
        var elmRule = schema.getElementRule(name);
        var parentsRequired = elmRule && elmRule.parentsRequired;

        if (parentsRequired && parentsRequired.length) {
          return candidate && Tools.inArray(parentsRequired, candidate) !== -1 ? candidate : parentsRequired[0];
        } else {
          return false;
        }
      }

      function wrapInHtml(elm, ancestry, siblings) {
        var parent, parentCandidate, parentRequired;
        var ancestor = ancestry.length > 0 && ancestry[0];
        var ancestorName = ancestor && ancestor.name;

        parentRequired = getRequiredParent(elm, ancestorName);

        if (parentRequired) {
          if (ancestorName == parentRequired) {
            parentCandidate = ancestry[0];
            ancestry = ancestry.slice(1);
          } else {
            parentCandidate = parentRequired;
          }
        } else if (ancestor) {
          parentCandidate = ancestry[0];
          ancestry = ancestry.slice(1);
        } else if (!siblings) {
          return elm;
        }

        if (parentCandidate) {
          parent = createElement(parentCandidate);
          parent.appendChild(elm);
        }

        if (siblings) {
          if (!parent) {
            // if no more ancestry, wrap in generic div
            parent = dom.create('div');
            parent.appendChild(elm);
          }

          Tools.each(siblings, function (sibling) {
            var siblingElm = createElement(sibling);
            parent.insertBefore(siblingElm, elm);
          });
        }

        return wrapInHtml(parent, ancestry, parentCandidate && parentCandidate.siblings);
      }

      if (ancestry && ancestry.length) {
        item = ancestry[0];
        elm = createElement(item);
        fragment = dom.create('div');
        fragment.appendChild(wrapInHtml(elm, ancestry.slice(1), item.siblings));
        return fragment;
      } else {
        return '';
      }
    }


    function selectorToHtml(selector, editor) {
      return parsedSelectorToHtml(parseSelector(selector), editor);
    }


    function parseSelectorItem(item) {
      var tagName;
      var obj = {
        classes: [],
        attrs: {}
      };

      item = obj.selector = Tools.trim(item);

      if (item !== '*') {
        // matching IDs, CLASSes, ATTRIBUTES and PSEUDOs
        tagName = item.replace(/(?:([#\.]|::?)([\w\-]+)|(\[)([^\]]+)\]?)/g, function ($0, $1, $2, $3, $4) {
          switch ($1) {
            case '#':
              obj.attrs.id = $2;
              break;

            case '.':
              obj.classes.push($2);
              break;

            case ':':
              if (Tools.inArray('checked disabled enabled read-only required'.split(' '), $2) !== -1) {
                obj.attrs[$2] = $2;
              }
              break;
          }

          // atribute matched
          if ($3 == '[') {
            var m = $4.match(/([\w\-]+)(?:\=\"([^\"]+))?/);
            if (m) {
              obj.attrs[m[1]] = m[2];
            }
          }

          return '';
        });
      }

      obj.name = tagName || 'div';
      return obj;
    }


    function parseSelector(selector) {
      if (!selector || typeof selector !== 'string') {
        return [];
      }

      // take into account only first one
      selector = selector.split(/\s*,\s*/)[0];

      // tighten
      selector = selector.replace(/\s*(~\+|~|\+|>)\s*/g, '$1');

      // split either on > or on space, but not the one inside brackets
      return Tools.map(selector.split(/(?:>|\s+(?![^\[\]]+\]))/), function (item) {
        // process each sibling selector separately
        var siblings = Tools.map(item.split(/(?:~\+|~|\+)/), parseSelectorItem);
        var obj = siblings.pop(); // the last one is our real target

        if (siblings.length) {
          obj.siblings = siblings;
        }
        return obj;
      }).reverse();
    }


    function getCssText(editor, format) {
      var name, previewFrag, previewElm, items;
      var previewCss = '', parentFontSize, previewStyles;

      previewStyles = editor.settings.preview_styles;

      // No preview forced
      if (previewStyles === false) {
        return '';
      }

      // Default preview
      if (typeof previewStyles !== 'string') {
        previewStyles = 'font-family font-size font-weight font-style text-decoration ' +
          'text-transform color background-color border border-radius outline text-shadow';
      }

      // Removes any variables since these can't be previewed
      function removeVars(val) {
        return val.replace(/%(\w+)/g, '');
      }

      // Create block/inline element to use for preview
      if (typeof format == "string") {
        format = editor.formatter.get(format);
        if (!format) {
          return;
        }

        format = format[0];
      }

      // Format specific preview override
      // TODO: This should probably be further reduced by the previewStyles option
      if ('preview' in format) {
        previewStyles = format.preview;
        if (previewStyles === false) {
          return '';
        }
      }

      name = format.block || format.inline || 'span';

      items = parseSelector(format.selector);
      if (items.length) {
        if (!items[0].name) { // e.g. something like ul > .someClass was provided
          items[0].name = name;
        }
        name = format.selector;
        previewFrag = parsedSelectorToHtml(items, editor);
      } else {
        previewFrag = parsedSelectorToHtml([name], editor);
      }

      previewElm = dom.select(name, previewFrag)[0] || previewFrag.firstChild;

      // Add format styles to preview element
      each(format.styles, function (value, name) {
        value = removeVars(value);

        if (value) {
          dom.setStyle(previewElm, name, value);
        }
      });

      // Add attributes to preview element
      each(format.attributes, function (value, name) {
        value = removeVars(value);

        if (value) {
          dom.setAttrib(previewElm, name, value);
        }
      });

      // Add classes to preview element
      each(format.classes, function (value) {
        value = removeVars(value);

        if (!dom.hasClass(previewElm, value)) {
          dom.addClass(previewElm, value);
        }
      });

      editor.fire('PreviewFormats');

      // Add the previewElm outside the visual area
      dom.setStyles(previewFrag, { position: 'absolute', left: -0xFFFF });
      editor.getBody().appendChild(previewFrag);

      // Get parent container font size so we can compute px values out of em/% for older IE:s
      parentFontSize = dom.getStyle(editor.getBody(), 'fontSize', true);
      parentFontSize = /px$/.test(parentFontSize) ? parseInt(parentFontSize, 10) : 0;

      each(previewStyles.split(' '), function (name) {
        var value = dom.getStyle(previewElm, name, true);

        // If background is transparent then check if the body has a background color we can use
        if (name == 'background-color' && /transparent|rgba\s*\([^)]+,\s*0\)/.test(value)) {
          value = dom.getStyle(editor.getBody(), name, true);

          // Ignore white since it's the default color, not the nicest fix
          // TODO: Fix this by detecting runtime style
          if (dom.toHex(value).toLowerCase() == '#ffffff') {
            return;
          }
        }

        if (name == 'color') {
          // Ignore black since it's the default color, not the nicest fix
          // TODO: Fix this by detecting runtime style
          if (dom.toHex(value).toLowerCase() == '#000000') {
            return;
          }
        }

        // Old IE won't calculate the font size so we need to do that manually
        if (name == 'font-size') {
          if (/em|%$/.test(value)) {
            if (parentFontSize === 0) {
              return;
            }

            // Convert font size from em/% to px
            value = parseFloat(value, 10) / (/%$/.test(value) ? 100 : 1);
            value = (value * parentFontSize) + 'px';
          }
        }

        if (name == "border" && value) {
          previewCss += 'padding:0 2px;';
        }

        previewCss += name + ':' + value + ';';
      });

      editor.fire('AfterPreviewFormats');

      //previewCss += 'line-height:normal';

      dom.remove(previewFrag);

      return previewCss;
    }

    return {
      getCssText: getCssText,
      parseSelector: parseSelec"��$	�B�y����$�����4`l`$��1 ����+P!
����	�Y�� 2ő�ࠃ� 1*�c	 �E��r*4�Ch��E
Њ���& 
H}� ���<�+.� �,K���,D)'

�a1z�F �0(L$�4)@�� ��A`�$ 0�!A"PI��@�2dA@d AF
H�U�N��!�@�6�
d�����R�� S�� Z1h�0�$0I�c�<� +�)�b��p�)a�$G�%`X���PE$ΐm`<�G+Nb�
�(. 8-A�d<���1��L�B!pN
8A-��9�)"""\��� ����(H- 	 ��� " �p�J @,%� �fH���]��� $�  P@⼙�4$P��4#
Hp("�!C"�@�89(RnH��E�������
�RP����BR�sF1�Y,c�Gj 9�B9\	� �E�
 G ��$
�$��2b� sb���i!��B 9~B#GH@'?�؈����5C|/���)�N�OL4RA )�9CZ�(�%Dh)��� ��0h��a�'! �K��h`�(X��$sQ$�+#��W��<��V$�D�j��  �uF ʂfU�� X"�R�PAet��D����7�����E  ���$�Z��e�@H G� !�'AIň�bD�.9�0� "	2��\��9�! #h�C��"΍�t��rx���e�" 0a�
�@��B( � ���@!u(!�%f�h	
�@qƐ �B�D�"
P�� 2lRP`��/ C@$��$
���
 
{ x� ����?@� �@�   � ,�"�$r�7H �І4�<��`�!�p�$� $�@V� Bx*&� F;�#	
�0�

)Af>E@#	E�IdX'���7 0<� ����1�zPBX  �H��

AE�PC�A!�` B��
B�!Gd0�rS�T!hh7�P$,�Kr �d+ ��d8����� �� �&�� �TB�RQ@���4���#�H�����X����ım3"����P� �$e
B[�2i|Ţ ���Q�A�pB( �2"� �Fpv �JI���P� �
ЬĢ*�CRО�?� l� H�����%`A@ax�4��Q�
 �#* A̘��
$e�4@S %)
j!" )��$���Y4�!m# @�� �Z@$K��xPI
�fz�
�JL19G)#&�dC:$�^��P��4���F
�A'%G�� R�60�U6� 1D���#��1@J��(A`��A �
I�J�Kٕ�@�Xr��@�"
�H�AЁ 9�
�a����hE�`zF63 DQ0 
�@"E�@!�� F�5@y) ��(�f,P* @�U�@�$���2��&��@��`�%hR��R�!Wv�� �� 3%)  ���@"T
���,X7�p@e�	�HAB����$�*%��ҰBx$*a p0;H
�B�K���
 ����RGKD� ��.a�d Dx�T,X��](� `�A'�H5�I0�E VPD � $�
 �1`�0 ��f��n@�!��#0�����Z@�$�yBTt9D$����TC �a(��pT� $��8��`FFR 
 ��u
p;$�. D�P� 9N�! Pu� X"�3)�ɔ*t�� �TV ��U`
�R;D�h"�7 ,�Ť��#�`F(���!�� <@�L��-�c�R��E�aX�`T� �R�1$bP�H/� �  � (�l-���!
�8L�T �fX�Bl2�`z,�  (�O��I��H[�`8a3	^  �; Bh�4C�*%�E@�10��f��P6@�A	@ZH�J� ':H�PP
���% �5� 4B�1oj�*
�B���
�@���6��b ��P@r��}�B�
 ���BC5��  "Pd���D������B�
�`7J
:�������XAD
dB ` p�� ���0���
K j;�
��$��4���p�25� W�9&��$R% !2H@B�P�TJ)(�hiEp$`"  �	�H�hEE@dI
�qQ *��^$�(5�$���S��
X)aO ���&��	T�r4bs PP�Jmr(�{���`���E�0m�&`��
�Wd �P�q3Hm@ `@6 ^� @!��q���(
ʄ킟�<���&:���73�U([��_�b�� �PΔ�PL�,�xF�@Aq��  �"�RX0<@z�9���d!	c.���Q ��#�bA���GXJ� L� � P��$N�<K��@h� , �e�(
6Bu@��}�HЀ�� �<�3�@���
/R}

      function isInlineBlock(node) {
        return node && /^(IMG)$/.test(node.nodeName);
      }

      function getParents(node, selector) {
        return dom.getParents(node, selector, dom.getRoot());
      }

      function isCaretNode(node) {
        return node.nodeType === 1 && node.id === '_mce_caret';
      }

      function defaultFormats() {
        register({
          valigntop: [
            { selector: 'td,th', styles: { 'verticalAlign': 'top' } }
          ],

          valignmiddle: [
            { selector: 'td,th', styles: { 'verticalAlign': 'middle' } }
          ],

          valignbottom: [
            { selector: 'td,th', styles: { 'verticalAlign': 'bottom' } }
          ],

          alignleft: [
            {
              selector: 'figure.image',
              collapsed: false,
              classes: 'align-left',
              ceFalseOverride: true,
              preview: 'font-family font-size'
            },
            {
              selector: 'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',
              styles: {
                textAlign: 'left'
              },
              inherit: false,
              preview: false,
              defaultBlock: 'div'
            },
            { selector: 'img,table', collapsed: false, styles: { 'float': 'left' }, preview: 'font-family font-size' }
          ],

          aligncenter: [
            {
              selector: 'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',
              styles: {
                textAlign: 'center'
              },
              inherit: false,
              preview: false,
              defaultBlock: 'div'
            },
            {
              selector: 'figure.image',
              collapsed: false,
              classes: 'align-center',
              ceFalseOverride: true,
              preview: 'font-family font-size'
            },
            {
              selector: 'img',
              collapsed: false,
              styles: {
                display: 'block',
                marginLeft: 'auto',
                marginRight: 'auto'
              },
              preview: false
            },
            {
              selector: 'table',
              collapsed: false,
              styles: {
                marginLeft: 'auto',
                marginRight: 'auto'
              },
              preview: 'font-family font-size'
            }
          ],

          alignright: [
            {
              selector: 'figure.image',
              collapsed: false,
              classes: 'align-right',
              ceFalseOverride: true,
              preview: 'font-family font-size'
            },
            {
              selector: 'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',
              styles: {
                textAlign: 'right'
              },
              inherit: false,
              preview: 'font-family font-size',
              defaultBlock: 'div'
            },
            {
              selector: 'img,table',
              collapsed: false,
              styles: {
                'float': 'right'
              },
              preview: 'font-family font-size'
            }
          ],

          alignjustify: [
            {
              selector: 'figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li',
              styles: {
                textAlign: 'justify'
              },
              inherit: false,
              defaultBlock: 'div',
              preview: 'font-family font-size'
            }
          ],

          bold: [
            { inline: 'strong', remove: 'all' },
            { inline: 'span', styles: { fontWeight: 'bold' } },
            { inline: 'b', remove: 'all' }
          ],

          italic: [
            { inline: 'em', remove: 'all' },
            { inline: 'span', styles: { fontStyle: 'italic' } },
            { inline: 'i', remove: 'all' }
          ],

          underline: [
            { inline: 'span', styles: { textDecoration: 'underline' }, exact: true },
            { inline: 'u', remove: 'all' }
          ],

          strikethrough: [
            { inline: 'span', styles: { textDecoration: 'line-through' }, exact: true },
            { inline: 'strike', remove: 'all' }
          ],

          forecolor: { inline: 'span', styles: { color: '%value' }, links: true, remove_similar: true, clear_child_styles: true },
          hilitecolor: { inline: 'span', styles: { backgroundColor: '%value' }, links: true, remove_similar: true, clear_child_styles: true },
          fontname: { inline: 'span', styles: { fontFamily: '%value' }, clear_child_styles: true },
          fontsize: { inline: 'span', styles: { fontSize: '%value' }, clear_child_styles: true },
          fontsize_class: { inline: 'span', attributes: { 'class': '%value' } },
          blockquote: { block: 'blockquote', wrapper: 1, remove: 'all' },
          subscript: { inline: 'sub' },
          superscript: { inline: 'sup' },
          code: { inline: 'code' },

          link: {
            inline: 'a', selector: 'a', remove: 'all', split: true, deep: true,
            onmatch: function () {
              return true;
            },

            onformat: function (elm, fmt, vars) {
              each(vars, function (value, key) {
                dom.setAttrib(elm, key, value);
              });
            }
          },

          removeformat: [
            {
              selector: 'b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins',
              remove: 'all',
              split: true,
              expand: false,
              block_expand: true,
              deep: true
            },
            { selector: 'span', attributes: ['style', 'class'], remove: 'empty', split: true, expand: false, deep: true },
            { selector: '*', attributes: ['style', 'class'], split: false, expand: false, deep: true }
          ]
        });

        // Register default block formats
        each('p h1 h2 h3 h4 h5 h6 div address pre div dt dd samp'.split(/\s/), function (name) {
          register(name, { block: name, remove: 'all' });
        });

        // Register user defined formats
        register(ed.settings.formats);
      }

      var clearChildStyles = function (format, node) {
        if (format.clear_child_styles) {
          each(dom.select('*', node), function (node) {
            each(format.styles, function (value, name) {
              dom.setStyle(node, name, '');
            });
          });
        }
      };

      function addKeyboardShortcuts() {
        // Add some inline shortcuts
        ed.addShortcut('meta+b', 'bold_desc', 'Bold');
        ed.addShortcut('meta+i', 'italic_desc', 'Italic');
        ed.addShortcut('meta+u', 'underline_desc', 'Underline');

        // BlockFormat shortcuts keys
        for (var i = 1; i <= 6; i++) {
          ed.addShortcut('access+' + i, '', ['FormatBlock', false, 'h' + i]);
        }

        ed.addShortcut('access+7', '', ['FormatBlock', false, 'p']);
        ed.addShortcut('access+8', '', ['FormatBlock', false, 'div']);
        ed.addShortcut('access+9', '', ['FormatBlock', false, 'address']);
      }

      // Public functions

      /**
       * Returns the format by name or all formats if no name is specified.
       *
       * @method get
       * @param {String} name Optional name to retrieve by.
       * @return {Array/Object} Array/Object with all registered formats or a specific format.
       */
      function get(name) {
        return name ? formats[name] : formats;
      }

      /**
       * Registers a specific format by name.
       *
       * @method register
       * @param {Object/String} name Name of the format for example "bold".
       * @param {Object/Array} format Optional format object or array of format variants
       * can only be omitted if the first arg is an object.
       */
      function register(name, format) {
        if (name) {
          if (typeof name !== 'string') {
            each(name, function (format, name) {
              register(name, format);
            });
          } else {
            // Force format into array and add it to internal collection
            format = format.length ? format : [format];

            each(format, function (format) {
              // Set deep to false by default on selector formats this to avoid removing
              // alignment on images inside paragraphs when alignment is changed on paragraphs
              if (format.deep === undef) {
                format.deep = !format.selector;
              }

              // Default to true
              if (format.split === undef) {
                format.split = !format.selector || format.inline;
              }

              // Default to true
              if (format.remove === undef && format.selector && !format.inline) {
                format.remove = 'none';
              }

              // Mark format as a mixed format inline + block level
              if (format.selector && format.inline) {
                format.mixed = true;
                format.block_expand = true;
              }

              // Split classes if needed
              if (typeof format.classes === 'string') {
                format.classes = format.classes.split(/\s+/);
              }
            });

            formats[name] = format;
          }
        }
      }

      /**
       * Unregister a specific format by name.
       *
       * @method unregister
       * @param {String} name Name of the format for example "bold".
       */
      function unregister(name) {
        if (name && formats[name]) {
          delete formats[name];
        }

        return formats;
      }

      function matchesUnInheritedFormatSelector(node, name) {
        var formatList = get(name);

        if (formatList) {
          for (var i = 0; i < formatList.length; i++) {
            if (formatList[i].inherit === false && dom.is(node, formatList[i].selector)) {
              return true;
            }
          }
        }

        return false;
      }

      function getTextDecoration(node) {
        var decoration;

        ed.dom.getParent(node, function (n) {
          decoration = ed.dom.getStyle(n, 'text-decoration');
          return decoration && decoration !== 'none';
        });

        return decoration;
      }

      function processUnderlineAndColor(node) {
        var textDecoration;
        if (node.nodeType === 1 && node.parentNode && node.parentNode.nodeType === 1) {
          textDecoration = getTextDecoration(node.parentNode);
          if (ed.dom.getStyle(node, 'color') && textDecoration) {
            ed.dom.setStyle(node, 'text-decoration', textDecoration);
          } else if (ed.dom.getStyle(node, 'text-decoration') === textDecoration) {
            ed.dom.setStyle(node, 'text-decoration', null);
          }
        }
      }

      /**
       * Applies the specified format to the current selection or specified node.
       *
       * @method apply
       * @param {String} name Name of format to apply.
       * @param {Object} vars Optional list of variables to replace within format before applying it.
       * @param {Node} node Optional node to apply the format to defaults to current selection.
       */
      function apply(name, vars, node) {
        var formatList = get(name), format = formatList[0], bookmark, rng, isCollapsed = !node && selection.isCollapsed();

        function setElementFormat(elm, fmt) {
          fmt = fmt || format;

          if (elm) {
            if (fmt.onformat) {
              fmt.onformat(elm, fmt, vars, node);
            }

            each(fmt.styles, function (value, name) {
              dom.setStyle(elm, name, replaceVars(value, vars));
            });

            // Needed for the WebKit span spam bug
            // TODO: Remove this once WebKit/Blink fixes this
            if (fmt.styles) {
              var styleVal = dom.getAttrib(elm, 'style');

              if (styleVal) {
                elm.setAttribute('data-mce-style', styleVal);
              }
            }

            each(fmt.attributes, function (value, name) {
              dom.setAttrib(elm, name, replaceVars(value, vars));
            });

            each(fmt.classes, function (value) {
Z�� p������0 A1�H��AB�@а �ҼFb�  "� g�&�
�r�0��i)�ҳE�ꀥ@jTF0@JH�`��!���%��� )b����l`�5"Mr�A֓7+n~��H��y�eߴ޵�/�.2�����ºe���sf�f��e� �2�տ-t?bQ}�!�v���ݷ�����s������]��a˭��������R�G�2�C�ڇ���cz_�oN��Oѿ���}^q��7ǯ���z��_�uF�ٯ��9���å�}ok��{{g���w�'$���|�5Gl�}W������?��Q����������I����W�D�EK����~t/���E��]�.��{����l�y�P�L>^XBB���
g�(� ���,F����
bX�d�' R�`��@hB��8
�D	N#�<�/Lg� ��r60	�P�����F�BBС� ��C� �0\F4�ZAH �� $��D�H��HU�\�����'��j���w������E?:�·r<I��o�+��e.{�B�.g��n���*��SQ_z��%m��߯��{�f��Q~������Us�z������g��#RV2��k6�4���������#QH=Bz�R�$@ACCP-H�$VAP�
`��� 2�� \1�M	�$,`�H�#�� �%	 "P�'6@f�"�8� ��A�Fk0`��d��FA�B@R#S�iBTr0Y�@Z�XB�0I"���� � 	D!Ő�	��#]"?�9dH� 2��C��
H�h!$�ę�jU�}/�ş�9��.u�����NV���i]�;?)���ו���F�q�5�p����ϫz�{O��9��υ���;&�,w�1c��h���s�>����Z����j{�3�̯;��Hy������u����If�1@!P��E�@���p�:
&Z�R�c
xЁq@���1逗
]
p
������Z�d�t�~�d�;Yi�������.ww�s�dh0�k���jDO;�3Ҟ�i [0��,L�GW����7���}g���~����h�����׾�/��/p�؏��@sm�ߧ��P����b�Ufo_�������Wa�M��)_!�)n���p��oȮ-��pg����'��؀�Ծ6��
ϒ�Y���~���׶۫�o��b ��JB������A!#J4P
��\܋N��T@	�`* ĩ�!XP
  -`� 	�p�ϔ���R(J@c$ 	 <�S�D8 @��U�	#	�
 �.(@��@�B\6�1@� R�
��(K -��1E��aK(Ȁ$!�ހ��%B8!�`J� ��\�'� A)�SP	B!2��e�!� �樉�lP@R0
�w�<_���_������}w�^ɟ���g��2���;w}���ޘS�ۧ�{�T�Z[��"�z��w;�9������-Sߊ�*v{m��ݔ�`7>=�ֹ?\WW�y����&����ҵ'as`��V�.�(`S� 8"C`R"JB��C@ a�,D$1���Q=M� ���*`j�n+�T �'0 ��b!�Sp� ��7H%��D 
� |A�{Ҡ�1������MȐ
z�1���볏�O���M^|��~����<)x� ����v��q��bW������f�����?>�<ίy��q��A���a��Oj����Y�!V�����+|���]L�ɬ�[8���[� ���Eg�,>U��u�5�{������~�������L�2��7y��Cr�G��������=�V�s#WS�w~�<��_����6����W*���G�I��M�����Y�k����|l�q��t����CO�m���_��}ӏN ��C�q�(; ���*��&� �J�LX=m���'�o{=6���h|&FA�!
4 $5 �q
��&����P�/�(\X�!��"�+�� ^O� ��pH X ��G���w (��@�����CT�#�"A�N@B(ƚ�A�RQ �@J��/�Q� Є&  ����R��1�z���z��Pl�����=��_;y�q~o���}0������q��v�8�v�����=��e�:_��{��7}��[�f�����Wc�W��9����w�kF�����򯶍��^�3�v��z��������!��0s�	 !@�I�6���" X(X@���M����'� �( ��*��H��
�Ć
���/��g7+����vu��NmR���
�b �D.
e ��j|����5 ����E`� ��)V� Rd�1�V@����(	0��@���A�!��@ �DH� `$� D�p
]G��k�`�	 �Q	�D�/D xe"��z�.�6� . (]p�C�ftl��3������Gns���r�Xk��|��M���<�� 3lU��/��h��&:����~�>�����ͯ:�i�_�����s���J�����e5q�c�����Gܿ��:���S��5�k�����������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������������t wrapping it with a DIV this is for forced_root_blocks: false
              // It's kind of a hack but people should be using the default block type P since all desktop editors work that way
              if (!forcedRootBlock && formatList[0].defaultBlock && !dom.getParent(curSelNode, dom.isBlock)) {
                apply(formatList[0].defaultBlock);
              }

              // Apply formatting to selection
              ed.selection.setRng(adjustSelectionToVisibleSelection());
              bookmark = selection.getBookmark();
              applyRngStyle(expandRng(selection.getRng(TRUE), formatList), bookmark);

              if (format.styles) {
                // Colored nodes should be underlined so that the color of the underline matches the text color.
                if (format.styles.color || format.styles.textDecoration) {
                  walk(curSelNode, processUnderlineAndColor, 'childNodes');
                  processUnderlineAndColor(curSelNode);
                }

                // nodes with font-size should have their own background color as well to fit the line-height (see TINY-882)
                if (format.styles.backgroundColor) {
                  processChildElements(curSelNode,
                    hasStyle('fontSize'),
                    applyStyle('backgroundColor', replaceVars(format.styles.backgroundColor, vars))
                  );
                }
              }

              selection.moveToBookmark(bookmark);
              moveStart(selection.getRng(TRUE));
              ed.nodeChanged();
            } else {
              performCaretAction('apply', name, vars);
            }
          }

          Hooks.postProcess(name, ed);
        }
      }

      /**
       * Removes the specified format from the current selection or specified node.
       *
       * @method remove
       * @param {String} name Name of format to remove.
       * @param {Object} vars Optional list of variables to replace within format before removing it.
       * @param {Node/Range} node Optional node or DOM range to remove the format from defaults to current selection.
       */
      function remove(name, vars, node, similar) {
        var formatList = get(name), format = formatList[0], bookmark, rng, contentEditable = true;

        // Merges the styles for each node
        function process(node) {
          var children, i, l, lastContentEditable, hasContentEditableState;

          // Node has a contentEditable value
          if (node.nodeType === 1 && getContentEditable(node)) {
            lastContentEditable = contentEditable;
            contentEditable = getContentEditable(node) === "true";
            hasContentEditableState = true; // We don't want to wrap the container only it's children
          }

          // Grab the children first since the nodelist might be changed
          children = grep(node.childNodes);

          // Process current node
          if (contentEditable && !hasContentEditableState) {
            for (i = 0, l = formatList.length; i < l; i++) {
              if (removeFormat(formatList[i], vars, node, node)) {
                break;
              }
            }
          }

          // Process the children
          if (format.deep) {
            if (children.length) {
              for (i = 0, l = children.length; i < l; i++) {
                process(children[i]);
              }

              if (hasContentEditableState) {
                contentEditable = lastContentEditable; // Restore last contentEditable state from stack
              }
            }
          }
        }

        function findFormatRoot(container) {
          var formatRoot;

          // Find format root
          each(getParents(container.parentNode).reverse(), function (parent) {
            var format;

            // Find format root element
            if (!formatRoot && parent.id != '_start' && parent.id != '_end') {
              // Is the node matching the format we are looking for
              format = matchNode(parent, name, vars, similar);
              if (format && format.split !== false) {
                formatRoot = parent;
              }
            }
          });

          return formatRoot;
        }

        function wrapAndSplit(formatRoot, container, target, split) {
          var parent, clone, lastClone, firstClone, i, formatRootParent;

          // Format root found then clone formats and split it
          if (formatRoot) {
            formatRootParent = formatRoot.parentNode;

            for (parent = container.parentNode; parent && parent != formatRootParent; parent = parent.parentNode) {
              clone = dom.clone(parent, FALSE);

              for (i = 0; i < formatList.length; i++) {
                if (removeFormat(formatList[i], vars, clone, clone)) {
                  clone = 0;
                  break;
                }
              }

              // Build wrapper node
              if (clone) {
                if (lastClone) {
                  clone.appendChild(lastClone);
                }

                if (!firstClone) {
                  firstClone = clone;
                }

                lastClone = clone;
              }
            }

            // Never split block elements if the format is mixed
            if (split && (!format.mixed || !isBlock(formatRoot))) {
              container = dom.split(formatRoot, container);
            }

            // Wrap container in cloned formats
            if (lastClone) {
              target.parentNode.insertBefore(lastClone, target);
              firstClone.appendChild(target);
            }
          }

          return container;
        }

        function splitToFormatRoot(container) {
          return wrapAndSplit(findFormatRoot(container), container, container, true);
        }

        function unwrap(start) {
          var node = dom.get(start ? '_start' : '_end'),
            out = node[start ? 'firstChild' : 'lastChild'];

          // If the end is placed within the start the result will be removed
          // So this checks if the out node is a bookmark node if it is it
          // checks for another more suitable node
          if (isBookmarkNode(out)) {
            out = out[start ? 'firstChild' : 'lastChild'];
          }

          // Since dom.remove removes empty text nodes then we need to try to find a better node
          if (out.nodeType == 3 && out.data.length === 0) {
            out = start ? node.previousSibling || node.nextSibling : node.nextSibling || node.previousSibling;
          }

          dom.remove(node, true);

          return out;
        }

        function removeRngStyle(rng) {
          var startContainer, endContainer;
          var commonAncestorContainer = rng.commonAncestorContainer;

          rng = expandRng(rng, formatList, TRUE);

          if (format.split) {
            startContainer = getContainer(rng, TRUE);
            endContainer = getContainer(rng);

            if (startContainer != endContainer) {
              // WebKit will render the table incorrectly if we wrap a TH or TD in a SPAN
              // so let's see if we can use the first child instead
              // This will happen if you triple click a table cell and use remove formatting
              if (/^(TR|TH|TD)$/.test(startContainer.nodeName) && startContainer.firstChild) {
                if (startContainer.nodeName == "TR") {
                  startContainer = startContainer.firstChild.firstChild || startContainer;
                } else {
                  startContainer = startContainer.firstChild || startContainer;
                }
              }

              // Try to adjust endContainer as well if cells on the same row were selected - bug #6410
              if (commonAncestorContainer &&
                /^T(HEAD|BODY|FOOT|R)$/.test(commonAncestorContainer.nodeName) &&
                isTableCell(endContainer) && endContainer.firstChild) {
                endContainer = endContainer.firstChild || endContainer;
              }

              if (dom.isChildOf(startContainer, endContainer) && !isBlock(endContainer) &&
                !isTableCell(startContainer) && !isTableCell(endContainer)) {
                startContainer = wrap(startContainer, 'span', { id: '_start', 'data-mce-type': 'bookmark' });
                splitToFormatRoot(startContainer);
                startContainer = unwrap(TRUE);
                return;
              }

              // Wrap start/end nodes in span element since these might be cloned/moved
              startContainer = wrap(startContainer, 'span', { id: '_start', 'data-mce-type': 'bookmark' });
              endContainer = wrap(endContainer, 'span', { id: '_end', 'data-mce-type': 'bookmark' });

              // Split start/end
              splitToFormatRoot(startContainer);
              splitToFormatRoot(endContainer);

              // Unwrap start/end to get real elements again
              startContainer = unwrap(TRUE);
              endContainer = unwrap();
            } else {
              startContainer = endContainer = splitToFormatRoot(startContainer);
            }

            // Update range positions since they might have changed after the split operations
            rng.startContainer = startContainer.parentNode ? startContainer.parentNode : startContainer;
            rng.startOffset = nodeIndex(startContainer);
            rng.endContainer = endContainer.parentNode ? endContainer.parentNode : endContainer;
            rng.endOffset = nodeIndex(endContainer) + 1;
          }

          // Remove items between start/end
          rangeUtils.walk(rng, function (nodes) {
            each(nodes, function (node) {
              process(node);

              // Remove parent span if it only contains text-decoration: underline, yet a parent node is also underlined.
              if (node.nodeType === 1 && ed.dom.getStyle(node, 'text-decoration') === 'underline' &&
                node.parentNode && getTextDecoration(node.parentNode) === 'underline') {
                removeFormat({
                  'deep': false,
                  'exact': true,
                  'inline': 'span',
                  'styles': {
                    'textDecoration': 'underline'
                  }
                }, null, node);
              }
            });
          });
        }

        // Handle node
        if (node) {
          if (node.nodeType) {
            rng = dom.createRng();
            rng.setStartBefore(node);
            rng.setEndAfter(node);
            removeRngStyle(rng);
          } else {
            removeRngStyle(node);
          }

          return;
        }

        if (getContentEditable(selection.getNode()) === "false") {
          node = selection.getNode();
          for (var i = 0, l = formatList.length; i < l; i++) {
            if (formatList[i].ceFalseOverride) {
              if (removeFormat(formatList[i], vars, node, node)) {
                break;
              }
            }
          }

          return;
        }

        if (!selection.isCollapsed() || !format.inline || dom.select('td[data-mce-selected],th[data-mce-selected]').length) {
          bookmark = selection.getBookmark();
          removeRngStyle(selection.getRng(TRUE));
          selection.moveToBookmark(bookmark);

          // Check if start element still has formatting then we are at: "<b>text|</b>text"
          // and need to move the start into the next text node
          if (format.inline && match(name, vars, selection.getStart())) {
            moveStart(selection.getRng(true));
          }

          ed.nodeChanged();
        } else {
          performCaretAction('remove', name, vars, similar);
        }
      }

      /**
       * Toggles the specified format on/off.
       *
       * @method toggle
       * @param {String} name Name of format to apply/remove.
       * @param {Object} vars Optional list of variables to replace within format before applying/removing it.
       * @param {Node} node Optional node to apply the format to or remove from. Defaults to current selection.
       */
      function toggle(name, vars, node) {
        var fmt = get(name);

        if (match(name, vars, node) && (!('toggle' in fmt[0]) || fmt[0�)� ��F� �� �ݻ��+4HA�"b�p>�A���B�	 @�DD�O0��|F.4pB)H0 B#(5A�ACD��BK�	��r�����lL (���YT��"��c �	��@"�12RxЖ($�R��8��B�PQ0�tRS��.`���
	�FL�$�N*�=��"�<�>�. �)0�>�N.Q
�7p,�g \��� E @���?%�P (PD@"Ѕ>n�|"���0H�I��V�B��A(sP�@b�0��w����t f
00��t���VvTH�2HD"t�� ���DAb�(
��@	�@��TV � � <����($�T�� !T�r�$J��A��i$ �hI+ D�m�(�) 7[ �dPJ�9�߲�BD�Qu
�H�)d�� @ H�H�yY���� �r C%`��x,	�F%�h�1��0�d����A	QL��~!`(58q#2�� �#�
(�����	�`BL	�8Ke��D
��,�p��$�",V�'	W�I�V�����S��Vi "�D�
|r T�$1k* ̮ LPl	aPH�Q@Q�� @B��I )f��BC!����@��0O��@I���2`��L"/ H��)p("H�,��p5�`��S! �BɈ*o3^@B��������kDS��,
!,�0@�4��h��RRa2l$����A���z�T.�6,��c�L�h@�y�L0�S5x�$^��T8қ*���"�@����QBQIppI\�nQt�W����!�1j�E"!I�(B(L9���1��2�!8Z�#*lB5
J�/��@���0�ׄ�"�8ai�&kh<B��=B` 2x�
`F)8"<� �$a�4��FIP�.ـ` ��THU6�,dHExC�6Jy�	�	S�5�p(� T԰YC�i5E�  �D�@���*U�`B��
��	� 	� bO:� �Z�"h(9�("H  �U�O� �Dlh�י����P�"��m"B�� `� hW��G�mJ ��e��	� 1� 2���F��"��(�S
��!R:V����At�C��a� [ CYLc�SfH���i��r�Y �PD��A3f���<2G��+)D!E�&^�p��@$�2��� ?���\D�A��� B����I�D.��l .�cE�	��B�l#�*. � '	D�h,!����T-F�� j�G���  r `� I���B� @�8(@E���G�ĀPX�12A�$!B�A��0� �wGܦͳ5��%�3F0I �UH+TA S��H
 ��b	8�)�K@�P�VXG�y3��� c@�	�B�H0�d|Z�@�k/ �"?@ƶ,PL�02�� �Wp �AC�*�s+ �b'�*�`��pg
� �F DW�1��P� �L�GL(@ ȕ��D�Ȩѡ2((���H<ϒ!�BA���
ЎŃa��Xt#5�ͬ,>� P��A�=A%�
P ���B	<J
� ����
(�d�v���c��&`�	� ��0PA �q�>�BN)1
���
	b��Tf��p����.�@?B
��̄��,Wȁ	�20 XP�R�	��+%�P	d� 2Q���`@����(P	�\h@��"���@���CX4fT e	BD�@���PH 	n����`8	ed���J 
j (P����@�D�E9��\2�B�@�G����+ *3U���
��3taXi
P8�
���W)������5���&����(?�1G�� �Ń�#I�Ռ�a�!�1�i�)��4P*�&s�N#�V@��02%� �` ChI�g 
��i��H����"W�/bc�8�BP�V����2�A�������Ca � \���B" ECe�Pmi<J H D��] �@T�a��P0  Ȅ� ����&u�3"��
v�A@��BJ9@B@,�*R��
B�a��@�40��FBhfE�8�Q@gGIO{  ��h
���  �+@i2�F�R���y � 	  DѢ�
T`�P@(a)X�
        startNode = selection.getStart();
        if (startNode != node) {
          if (matchParents(startNode)) {
            return TRUE;
          }
        }

        return FALSE;
      }

      /**
       * Matches the current selection against the array of formats and returns a new array with matching formats.
       *
       * @method matchAll
       * @param {Array} names Name of format to match.
       * @param {Object} vars Optional list of variables to replace before checking it.
       * @return {Array} Array with matched formats.
       */
      function matchAll(names, vars) {
        var startElement, matchedFormatNames = [], checkedMap = {};

        // Check start of selection for formats
        startElement = selection.getStart();
        dom.getParent(startElement, function (node) {
          var i, name;

          for (i = 0; i < names.length; i++) {
            name = names[i];

            if (!checkedMap[name] && matchNode(node, name, vars)) {
              checkedMap[name] = true;
              matchedFormatNames.push(name);
            }
          }
        }, dom.getRoot());

        return matchedFormatNames;
      }

      /**
       * Returns true/false if the specified format can be applied to the current selection or not. It
       * will currently only check the state for selector formats, it returns true on all other format types.
       *
       * @method canApply
       * @param {String} name Name of format to check.
       * @return {boolean} true/false if the specified format can be applied to the current selection/node.
       */
      function canApply(name) {
        var formatList = get(name), startNode, parents, i, x, selector;

        if (formatList) {
          startNode = selection.getStart();
          parents = getParents(startNode);

          for (x = formatList.length - 1; x >= 0; x--) {
            selector = formatList[x].selector;

            // Format is not selector based then always return TRUE
            // Is it has a defaultBlock then it's likely it can be applied for example align on a non block element line
            if (!selector || formatList[x].defaultBlock) {
              return TRUE;
            }

            for (i = parents.length - 1; i >= 0; i--) {
              if (dom.is(parents[i], selector)) {
                return TRUE;
              }
            }
          }
        }

        return FALSE;
      }

      /**
       * Executes the specified callback when the current selection matches the formats or not.
       *
       * @method formatChanged
       * @param {String} formats Comma separated list of formats to check for.
       * @param {function} callback Callback with state and args when the format is changed/toggled on/off.
       * @param {Boolean} similar True/false state if the match should handle similar or exact formats.
       */
      function formatChanged(formats, callback, similar) {
        var currentFormats;

        // Setup format node change logic
        if (!formatChangeData) {
          formatChangeData = {};
          currentFormats = {};

          ed.on('NodeChange', function (e) {
            var parents = getParents(e.element), matchedFormats = {};

            // Ignore bogus nodes like the <a> tag created by moveStart()
            parents = Tools.grep(parents, function (node) {
              return node.nodeType == 1 && !node.getAttribute('data-mce-bogus');
            });

            // Check for new formats
            each(formatChangeData, function (callbacks, format) {
              each(parents, function (node) {
                if (matchNode(node, format, {}, callbacks.similar)) {
                  if (!currentFormats[format]) {
                    // Execute callbacks
                    each(callbacks, function (callback) {
                      callback(true, { node: node, format: format, parents: parents });
                    });

                    currentFormats[format] = callbacks;
                  }

                  matchedFormats[format] = callbacks;
           B�	(V��N`Z�P A �(U'���l$�@ 9`������
pĤ1H0��_�h� �v4X Ne RƠ�
����!b�  H�!@  �+�p`HKq�8��4�C���D��
�B`�	J,Y�
�T\0�*m�$� a  J 	g+   @�4 SZ+1��d����1fH �����P ��"�7a�� �A#& ʠ ��� F�5�Ԑ i � D�  ,�Rp  `�k ������ ��I��)*�ߪ_ό���h�W�<��~������b�e��;��>�G^]m*�s�<���:c�a��x�K6�,ܙӝ��z�W���V�kkۍSW���-�u��8��.~οW�g���[=+Z��e�U�����W��&����AՐ�H�F��)� ��`@ ��(� �	@�2�"e��!	��p��X��$ >� h@7DďH� �"B`0��� ��h*�	� %�l@dd �azY�  �����q�H���k���_i�fW`� �׻�<��Y����S��J���~�0���~�8�z9�����m�qS9(�O��d���.~�C�m�]\��8�*��{��䱍����v���_�!z��z';��q�g��\7ǟ�_��o��7i��7g���77ח��������q���T�k+�FVU��<�_�%�?��*����<�~ڿ�T�������K�S��U�O]�����>��A��<��v����=NJTݲ�������o��K��"(F5/A(����
��,�X H@A�EP� �T ��X @" �����F $F8 � `�
�]	h����ȵmp�+04 a���*�DEf`H"��)��Is���H��(�FP!�H��6�y ��x &�  Ed�^�Aj�o=(��3�}o��B�}���v�ot���}�˥�_v���q�WOk����}����o�ʑ�t-#-��Zy������˼�׻~�|H��RP�ܐNϾ:;�ˏ������jY��xS'��� D���$#��	6�	�
@O���0���H��w
"�$(���ra1$AD֘B��j9��L�h�+�5�) D,� ���z@������*|�O̻rvm����1��q�Z��Ir��m=?7hO�޷N;ߣ�l�7�wήsO�1���h߷���M�b���w����}����������_�eƾ���}KO��b���n�����޶��~�i����C ��@�H�&�(5H@ ��hR���8 (�H��#�lD-�AĥA�2�T
 C�Sf��
 Ci�0( �"_�4�  )�@ A,@2	3�X[a��"�c�A�2���� D`2���P� 
`�� Ҕ�$�!�/E���� L!g�t�R� r����TH����L� �*���"��Q���Il�qE` ���"XAr���"�jR�b�pZ%� ��i�s�>>8���>���lִ;��=U��s|�_h��W|�����&g�}�y������s�IGgS�eKN_������jn\��?[[��������}W����5����W���xV�S�{=g��nڽ��T�ƎY��g��������'���( 
\eHH �d�°U����-J��PU���S}��f�� ���@* ���hr�i ���(`$"�nD�� �b ��=� ��`��P�� @ �D�����&ZBU�A|�xέlpq��2��_o�.��}9��w���~��e���g��?������9i�]~�����o�e�l���
u]{������OΩ�����5���z������_֫v�F>3�J��:��i��t�'O�V���3�'x����~x��X�,�g�Q�u����I�������k}�'��q#�\��������^S~%?~�Ko����6oU�Ǉd��evh-�B -�	X�F�t@�
�RR0`���Ʊ��Q�B!��dP `b6� � ���X�p PB�@Im�� @Z !JOB2��@&�D���54�$�,�A"�U#а���DKqqوE�����~�Նe�iv}��w���������k{�����~w�Ut�	u����v�۷����G�j|�?�����ξ?CU��&�N����۶��qZ~��z*�}��z������Uw���[�ɲ�f$ @1@&H���('�@�*!	�D2ȠD�#��� 0HB5L  h�
Q�BDf����!`�D�"�@���+) �"$�_tB9� @ D!D�J0���*�$B����P4A��W�(@�H� $8'J^J����8R�F���*&0��2, ��`#�  6��8�HoD �Z�BR�d,�C0����� �*@  ��,�A��MZ
u�+� � ������=��|��/.�_�ܢ��;wK8���֏�����Ͻ獱�7^ޥ�$(���<�Ys�+������ N��YJ!-܋�[����6��8m���ӎ��'m�X(ǟ������ܝ�w�=P��V��x�!�urn Fun.curry(function (name, node) {
          return !!(node && getStyle(node, name));
        }, name);
      }

      function applyStyle(name, value) {
        return Fun.curry(function (name, value, node) {
          dom.setStyle(node, name, value);
        }, name, value);
      }

      /**
       * Returns the style by name on the specified node. This method modifies the style
       * contents to make it more easy to match. This will resolve a few browser issues.
       *
       * @private
       * @param {Node} node to get style from.
       * @param {String} name Style name to get.
       * @return {String} Style item value.
       */
      function getStyle(node, name) {
        return normalizeStyleValue(dom.getStyle(node, name), name);
      }

      /**
       * Normalize style value by name. This method modifies the style contents
       * to make it more easy to match. This will resolve a few browser issues.
       *
       * @private
       * @param {String} value Value to get style from.
       * @param {String} name Style name to get.
       * @return {String} Style item value.
       */
      function normalizeStyleValue(value, name) {
        // Force the format to hex
        if (name == 'color' || name == 'backgroundColor') {
          value = dom.toHex(value);
        }

        // Opera will return bold as 700
        if (name == 'fontWeight' && value == 700) {
          value = 'bold';
        }

        // Normalize fontFamily so "'Font name', Font" becomes: "Font name,Font"
        if (name == 'fontFamily') {
          value = value.replace(/[\'\"]/g, '').replace(/,\s+/g, ',');
        }

        return '' + value;
      }

      /**
       * Replaces variables in the value. The variable format is %var.
       *
       * @private
       * @param {String} value Value to replace variables in.
       * @param {Object} vars Name/value array with variables to replace.
       * @return {String} New value with replaced variables.
       */
      function replaceVars(value, vars) {
        if (typeof value != "string") {
          value = value(vars);
        } else if (vars) {
          value = value.replace(/%(\w+)/g, function (str, name) {
            return vars[name] || str;
          });
        }

        return value;
      }

      function isWhiteSpaceNode(node) {
        return node && node.nodeType === 3 && /^([\t \r\n]+|)$/.test(node.nodeValue);
      }

      function wrap(node, name, attrs) {
        var wrapper = dom.create(name, attrs);

        node.parentNode.insertBefore(wrapper, node);
        wrapper.appendChild(node);

        return wrapper;
      }

      /**
       * Expands the specified range like object to depending on format.
       *
       * For example on block formats it will move the start/end position
       * to the beginning of the current block.
       *
       * @private
       * @param {Object} rng Range like object.
       * @param {Array} format Array with formats to expand by.
       * @param {Boolean} remove
       * @return {Object} Expanded range like object.
       */
      function expandRng(rng, format, remove) {
        var lastIdx, leaf, endPoint,
          startContainer = rng.startContainer,
          startOffset = rng.startOffset,
          endContainer = rng.endContainer,
          endOffset = rng.endOffset;

        // This function walks up the tree if there is no siblings before/after the node
        function findParentContainer(start) {
          var container, parent, sibling, siblingName, root;

          container = parent = start ? startContainer : endContainer;
          siblingName = start ? 'previousSibling' : 'nextSibling';
          root = dom.getRoot();

          function isBogusBr(node) {
            return node.nodeName == "BR" && node.getAttribute('data-mce-bogus') && !node.nextSibling;
          }

          // If it's a text node and the offset is inside the text
          if (container.nodeType == 3 && !isWhiteSpaceNode(container)) {
            if (start ? startOffset > 0 : endOffset < container.nodeValue.length) {
      �|������ם�״���o����,|�o��Z���}]����ft�ֲN�ur��������������q�����jǘ��/�7�s�K��l����ϫ��}oڞ�E|=��K��!�_�-����������mZTw��QE��^��i��RBqH����P4	R	�vK��� ��Ć.�b	��IEf,J� �� C(y��@6�ă
`* !"21�A"	�"�P	F!LAA�A� �� �J�µmR(�֔D� 0�����6(�ګ A�e2��c�()��80��Q8Z���� H�J��$(A������M��X�"���J�0E���A"��(��`�B0 }9p�/@9� 5�'� `ĕ`�
��nK�.W�|�{���;��������ξ�?��ў��s�������������?�y�Q{���r~����=?��z٭roe��~��}�f�C[������F>s��7[I~���������������q�_���	q���,� ����@Id�@fL�H�А@�	P"�A@	p�xd��4@a�����-ȽI: "$zZH�� �� �nIld��	��$"�g��[l �UI��b(2s���2�D@I~w���O�__��{u|���s�=�m ?�ğ�_�~��we���{]�������>���y\��ݶ���߻������ѻ�/������c���v�k?��#���o��{�,�~��rZ�M���.����\ξ7s	������W��`�ϋ-���n��S�w}+����󬏮���C�����f}��zG�����}�?���m=������mW�/�������~�_Bt_��L�ߛm����_���t������ks�b�2�Q^ ,��A$10�@) �Z4���H�."�R.�8^ �"@�8 -����  !�S �p�2ABb�&��Ԫ�� ��Jh �
(� ��f��Dbt��2��   ���K���~r��������ߴ�K�/���?���y��s?��?��������_^m���~��}����-?��v��t��?�o�g��߼~��w�����!^�(����������}�x
6��T����O��^G����:FQ�,�@�'��Z`p� d+b 
�v41L�$��X  r7 �
d0A<H�>���	�E�� �Z	XI 2BdS (0�{5F�
%a(E�@FJE��GR���BA3!�&�FBl �$'�0P�E,8pp,��F�O�hP���TQ���0 ]� �&�и
�l~w�t�������6�w/y7�i�zԙ���t�vߪ;�s��/�޾����9�������������{�'��W�A����vWa����z5��Z����}�Ҏ��R��a#g2d�!&�5M$"5t��@��H�2
�
y�,� �0�D�i�����M"�
���HRHHQ�F�T&�L� �IPO�&5
eB�;����P� �PB��02�I�ʀU ℨq�=�1"��� ��H���p�` �@ A�	��E?�(������t˶kV�y;��/?���ߖ�p���_�;��ּ]?no�/��g_�p���=��WT�4�۽�����~��e����m����}����/��_����\V��>����-w���~��<g?��K�v������r�s�joNuqǯ������\�a���掠J���y�k����nn�.ۯ�6��R���?wN>��l�Xm�~��������ç��o]m󯶲U����[_�����{�������-{?�ߟ��������'� ��'tEb�3TE 9RdTAX1�0G�ܵH����@�n ��1����C`E��	\ �MTAD�V��)�
������CVh�$l��yK������w�?���W�_��x��a���л�� 7��[��g�.��v�����������Zg?uj�uRn����ǧ�u~����)�f�o�O�nu�%r�/|�j�ng�|_���}w��E�V?�gz���߼�w�@�B�PТ� ��()ɀN�}!��Pq ��A�.
=�Qj��F4Y8V`��D�����zF"���B0�Q����4
�)��󘒨�l�C $��2ை��c\8��p{�4F�+ "�a) ��4�53U��G4m�V`�	�A�Pi  ��XB�?� �8J�b�K�
GdHQi� tT�����SJ�D�c HN��A1P(P��,�4����i������q�������z�����>���#,������n�w�������n�����K~ߨ�=mW�����)����_���y��^����כ}owag��ܝ��;���������^u�\�v�κB��$���(0�D�(��!��,�L@��&�\)G�*�� b �P����B	QJ)0�52'W@��ň!���r�?��JAj)S�'[w`MpJ����ԁ� N	a1	���"�� � �%��l���s���:����K�\�ӽ-�%{��ߒ�����o�z��^n�����~+Rx?���e�~��� �=�c�~����k���;K�������b��S?���L���Β������[뎊�9w��ݬ�כ����n������<���\�����;�~�ۣٸ�y�oGb��=��
��f�����y�z�����)���W�?��F���R�_����3-���G���ϛ����.��U{w�����<���*��g�����!����X7,?�7� �<� � 2R�1�x� �$m��� 
@��T�M�\#�D� Rc����̥
Y2�)�c2�&�t7^ �󃽼{������������v��S�߯�c/�Y�7����s0ܝv2�w��p]��7u��ѿ��Gv�+�����������n������r��\-�����Y۽�,���߼��
�/��T�xD��2���� �1̒�#6.�Nh
���%��U$lK�3Ġ�; H�[�y�w��S�)[��O���s?���e���o�����w�����k�?���t��]������>����m�E����/����1BZ�\������g/���[�}ƻ����7�����~��:m׿�>�3��U�;v� 	�i�@�:��B�P�.Je��*ȡ�AШK�Aaڹ
�:�Ч� '�!p�:�1H��}���k`�	q�P�U� &�t
� ��Z�Ƀ"��	O��	�P`ɗC	�K ����[�oN�ώ��t���_(�M佟����X-�_ʫп���/�6IO�Y���{���ȥ����픗σ�\�����������������{���ڻ��wo�Lx�Q�S"��wo�l'����7߲����7vwM�����_�ٻ��_|kw��yO����4�9����q�~/-���ߥ�>ތkm�����c;{��./��ޮ^�zc|�ۯ���Ϫ��ֲ�6/�v�ߗW#s��{���}������z�h}~��z�{_��Q5V&�r�Ckd�rXֈS�P �P��
B� �A�9
�@Z�f@搨Cф����S�0�������ƙ�2��|�L�`�"�� �7�V�H�&�eK&�n��3'xB�)!�R�'�#K`JA�7xc��h�O�|]z�U HF$�� Y�LET�;�R�MV��Nl[�H�Q��l`{@��#��`0��Ld X ȝ�)��0+��d8s@�@�L 2"� k B��p�L������y��������f�|�'�^����>�����������������>�~���ǘ��w��v��;���M���Ͻ��=����U����˻�y���>W~����������n}�j���3�?k~�Oݗ���Uf�h��!$�+J��b�D@�
��K �����BNs�A"A"�HfA4G �F0|� �"" �
            endPoint = findWordEndPoint(endContainer, endOffset);
            if (endPoint) {
              endContainer = endPoint.container;
              endOffset = endPoint.offset;
            }
          }

          // Avoid applying formatting to a trailing space.
          leaf = findLeaf(endContainer, endOffset);
          if (leaf.node) {
            while (leaf.node && leaf.offset === 0 && leaf.node.previousSibling) {
              leaf = findLeaf(leaf.node.previousSibling);
            }

            if (leaf.node && leaf.offset > 0 && leaf.node.nodeType === 3 &&
              leaf.node.nodeValue.charAt(leaf.offset - 1) === ' ') {

              if (leaf.offset > 1) {
                endContainer = leaf.node;
                endContainer.splitText(leaf.offset - 1);
              }
            }
          }
        }

        // Move start/end point up the tree if the leaves are sharp and if we are in different containers
        // Example * becomes !: !<p><b><i>*text</i><i>text*</i></b></p>!
        // This will reduce the number of wrapper elements that needs to be created
        // Move start point up the tree
        if (format[0].inline || format[0].block_expand) {
          if (!format[0].inline || (startContainer.nodeType != 3 || startOffset === 0)) {
            startContainer = findParentContainer(true);
          }

          if (!format[0].inline || (endContainer.nodeType != 3 || endOffset === endContainer.nodeValue.length)) {
            endContainer = findParentContainer();
          }
        }

        // Expand start/end container to matching selector
        if (format[0].selector && format[0].expand !== FALSE && !format[0].inline) {
          // Find new startContainer/endContainer if there is better one
          startContainer = findSelectorEndPoint(startContainer, 'previousSibling');
          endContainer = findSelectorEndPoint(endContainer, 'nextSibling');
        }

        // Expand start/end container to matching block element or text node
        if (format[0].block || format[0].selector) {
          // Find new startContainer/endContainer if there is better one
          startContainer = findBlockEndPoint(startContainer, 'previousSibling');
          endContainer = findBlockEndPoint(endContainer, 'nextSibling');

          // Non block element then try to expand up the leaf
          if (format[0].block) {
            if (!isBlock(startContainer)) {
              startContainer = findParentContainer(true);
            }

            if (!isBlock(endContainer)) {
              endContainer = findParentContainer();
            }
          }
        }

        // Setup index for startContainer
        if (startContainer.nodeType == 1) {
          startOffset = nodeIndex(startContainer);
          startContainer = startContainer.parentNode;
        }

        // Setup index for endContainer
        if (endContainer.nodeType == 1) {
          endOffset = nodeIndex(endContainer) + 1;
          endContainer = endContainer.parentNode;
        }

        // Return new range like object
        return {
          startContainer: startContainer,
          startOffset: startOffset,
          endContainer: endContainer,
          endOffset: endOffset
        };
      }

      function isColorFormatAndAnchor(node, format) {
        return format.links && node.tagName == 'A';
      }

      /**
       * Removes the specified format for the specified node. It will also remove the node if it doesn't have
       * any attributes if the format specifies it to do so.
       *
       * @private
       * @param {Object} format Format object with items to remove from node.
       * @param {Object} vars Name/value object with variables to apply to format.
       * @param {Node} node Node to remove the format styles on.
       * @param {Node} compareNode Optional compare node, if specified the styles will be compared to that node.
       * @return {Boolean} True/false if the node was removed or not.
       */
      function removeFormat(format, vars, node, compareNode) {
        var i, attrs, stylesModified;

        // Check if node matches format
        if (!matchName(node, format) && !isColorFormatAndAnchor(node, format)) {
          return FALSE;
        }

        // Should we compare with format attribs and styles
        if (format.remove != 'all') {
          // Remove styles
          each(format.styles, function (value, name) {
            value = normalizeStyleValue(replaceVars(value, vars), name);

            // Indexed array
            if (typeof name === 'number') {
              name = value;
              compareNode = 0;
            }

            if (format.remove_similar || (!compareNode || isEq(getStyle(compareNode, name), value))) {
              dom.setStyle(node, name, '');
            }

            stylesModified = 1;
          });

          // Remove style attribute if it's empty
          if (stylesModified && dom.getAttrib(node, 'style') === '') {
            node.removeAttribute('style');
            node.removeAttribute('data-mce-style');
          }

          // Remove attributes
          each(format.attributes, function (value, name) {
            var valueOut;

            value = replaceVars(value, vars);

            // Indexed array
            if (typeof name === 'number') {
              name = value;
              compareNode = 0;
            }

            if (!compareNode || isEq(dom.getAttrib(compareNode, name), value)) {
              // Keep internal classes
              if (name == 'class') {
                value = dom.getAttrib(node, name);
                if (value) {
                  // Build new class value where everything is removed except the internal prefixed classes
                  valueOut = '';
                  each(value.split(/\s+/), function (cls) {
                    if (/mce\-\w+/.test(cls)) {
                      valueOut += (valueOut ? ' ' : '') + cls;
                    }
                  });

                  // We got some internal classes left
                  if (valueOut) {
                    dom.setAttrib(node, name, valueOut);
                    return;
                  }
                }
              }

              // IE6 has a bug where the attribute doesn't get removed correctly
              if (name == "class") {
                node.removeAttribute('className');
              }

              // Remove mce prefixed attributes
              if (MCE_ATTR_RE.test(name)) {
                node.removeAttribute('data-mce-' + name);
              }

              node.removeAttribute(name);
            }
          });

          // Remove classes
          each(format.classes, function (value) {
            value = replaceVars(value, vars);

            if (!compareNode || dom.hasClass(compareNode, value)) {
              dom.removeClass(node, value);
            }
          });

          // Check for non internal attributes
          attrs = dom.getAttribs(node);
          for (i = 0; i < attrs.length; i++) {
            var attrName = attrs[i].nodeName;
            if (attrName.indexOf('_') !== 0 && attrName.indexOf('data-') !== 0) {
              return FALSE;
            }
          }
        }

        // Remove the inline child if it's empty for example <b> or <span>
        if (format.remove != 'none') {
          removeNode(node, format);
          return TRUE;
        }
      }

      /**
       * Removes the node and wrap it's children in paragraphs before doing so or
       * appends BR elements to the beginning/end of the block element if forcedRootBlocks is disabled.
       *
       * If the div in the node below gets removed:
       *  text<div>text</div>text
       *
       * Output becomes:
       *  text<div><br />text<br /></div>text
       *
       * So when the div is removed the result is:
       *  text<br />text<br />text
       *
       * @private
       * @param {Node} node Node to remove + apply BR/P elements to.
       * @param {Object} format Format rule.
       * @return {Node} Input node.
       */
      function removeNode(node, format) {
        var parentNode = node.parentNode, ro8�@ 	@( ������o�@`,b:V��RI �o�0%!�Yl	sXN,�,Q.< 84�Ȥ�+Ze��H��%��D�����J�)��	@�n���(���h)��'���1�̓@2��D�R�L
���aD�+L)�!�@��d) �
�C8@DI(I��"�����&��"!"P�@ IX1�6@�P
"葌��@
�Qr �� 	.���
C�F
��	�(5U��Z
���(*���
�   E���@C��_B���
r}\$)
�dP��
�ť�\�Y�ۊ�v�UGA1	H
��*�8DFx#� �$jz�12� ��k@�DRƁ��pE[�h	� �pu]�
S�1!�1��2`P� � bH#$-S��&�;0 x84%@�b�T�@D��?xʩIu�#�\�� �B����b ��\\%��!��� �pdlH,��B�8*�Q��DS�t�A��Z�ɋ &�� J*��I�A�h(��P*A
F�)�����\\�GB&qgV枤lhF	;�a�`"��N�c.��f��@0�ia8 R� �d�a�DE���κ+��$h�9
�j��J
����Lm@k�H �Bc�AЩ�  ��@.RXT�	�x �$P� C������ne "X�"��($@@��@�!L	B��R�$��@�8R
�L:
.  1���XH" H: 7TT��$��X����g�����!  3LD@�,I!'c�KL|q� �aZġ�Ѐ����)�XB�K� �Cp�H$�!��!0H�(�	 hLj|�M%� LJ�5 H�x�M" G�� � D�0V��Ra�c�!i�� �@
 %��1+(����c�1�`�����2h�ڑ�@ʹ�8NP!#B�AM3}�$*�L
�!�MQ�
�wk�ːm!"��P��
�ZUlA
P��!.I1Vd��m���]����)�s5�,�aŹ!���
Ggg��@Aa%� � �,-RR)��J;( �'L��D-0��	v�3p&&S��+��$ �6"i`Dc&j9 0"�j�DA6�8J9G�   *�	��� �%D	y �6'�� 
I �8F:��; F�d��' 
a�@
���A��"P�lĤ4��j�n��%��H%`$��D�0BJ6
���0m�TF��	�� �Kl':��(��Ln� X@�� -TRNp! 0�3 ���B(<� pPL|8�@%)@<x(�6�X��:
��������%mb 6�R���M������i��8 �EtRE`������e�8;HLE���!� �XE S��"
 G P&01@�� @��4�j(� ((Q�AKH���mF�Z�	p
 m#� B��& �� qi#)�� ���`&�"���Q#�� "E�=%)A�Rn`�DfԢ��D�E��$D�/�����@��������a�@���@6d��@@�}rlj,жg		�d�̐�βS,G��4<b0d�T0 0��c�nI���H�6��`$�d"P@�^ �8�h.
MB� +�V@�$�%jA�H|$�����C�����BI�U�B�a��XoA! H�A&hGA�=�H�0�Q�������|!ɂ������� �4C���@L$B h"B-(p�G(@���qOD4(�?�A ���1* �E�FEDA%�{Ad� ��k�0vHقhЪ�$T&�� ���0�   T�� 1"@ը%��bhc,�e���8U��K��c	��DC��&��0'7�R� )txD��NH����H��<p����H&�
�	
)� R�C�I N�D��*I�0���aA �6�P��hlTDu[@�
�#9����Pg�I%FE@Q(� �)1CH��I�����z�#R2�  E
Itj C�  b �  �� ���2��Q]Nt$+C��$$�`�2pRP�tE�@�*5��`�%2�J2
!�b�D�(O�����gbP(C��$DN 3@��@*��\ 	l ��iQ,p��:���  @%a[���� 	� 0L�!J��e���0r�K� &/ Tͪ�� R2 X@4Th��d�F��L�bC����[ ��`L ��C��I��i��F	���)�8h�$��L�����Ab�ޤ k���H�4��"@a>�"c d �n��W	��B���0����>�o�@�VA�
����'"�t#�\+A���%���p$s�� R&BJ!�C�\��3EE�V�*dF��!\mt�X* @S�jV ���
T  ����#1��Z�0�U �����(�	��a8duI"�J=�)B�A�tX ��L� ��䀦h/"   -@�	U�PR��[C�Y��"��.)m1�$@�@D k�# �	`@!� ��bmt����2��ĹM{�]u~���Zo�����������{6
q�v��W�� �������i�g���y����㟫/���s6�w���xu�����S�}�c�RZ}�t�Oꎮ�^�������P��@d�*ʐQ0B
��B#�!  1;���&h @@� µ� ā
��K$��&� �2#Gd�p����N����	���t��|P�B ���b"V�$9
��B��"0K���@-�0�7<*%	I��ѡ k%�BI@B,�b����R7�)"F>���(:@��$�
]b��
A@ DBVR�@���"�L��C�ԪI��8��
`\�0c�#������z�.����o�����Gڲ����ߍ�u����n��M��c�w��m�{O��ҷ�����ֳ�m��������JuFuJ��~���7�����j|�/��?]z��|���g���YWX���SuM�w^��i `�:&�y�̃�'c�"2�0"��MD��Ғ�f�:����V����,@8� �@$!�P�BD
ĨN�6�����w�j�7ήtw�������;�gz���p1�[��τ�=��\��%�Ӻ�ٲ���Mݵ4�_y����>m�W_�4��g���ڌW��_9��׉�/����Z"�����'��~w��*�z/����t��}4��}W���g��=�>�)��ٳ
���e�l�}_�^z���ߖ7��in��\7d���g{ݳ�{���������x�����z�_�U��c\�	�m�[���i�'�[������������巍5�������$�P��qA��  $AB��E@��.%�	CE�Te
&�%W� 
�,}#(@ ��qpQlT#��V�����N�1?�TR�ZP�o���+�����4�i� 8/9'�	Ot��f���K}�+��ު��_����Σ�_��_^}J�Az�{��߳ek�������w��_���G����ո�n�:�����m?�v�16����F�+~���}�}��鮯?��,���{�������z�	���� <��B�l: � 
��8`��k �@h�x�W@	a	�44��bH��
 Ґ�� �Ơ!��|T�`�5���ti�	����(�HrD��
p�Moy%�$��B9
T��F���ET�,�3Y�B���Hph2P1�T2uQ�t�Q�&�`"		)�s(�H~����0�`6��1
��
" �]`$���c{s��!T�\$�h{D��$P�H)x�֐���
թ �Z��;��h�ga���A���
w�d@2J 8�&�4��&��`( \A�v��C�	$�!�<aE6�V�p��0�@T:�8����y���a�I�BD8��&!�`��!

 Dd"�D�00X!� �� ��ƮP
����ѳ%Wj�l�m_�g��m��CE7�_y���y7{�m��f�zdw�N���o��_�~m���Y�������.�����5�q}seZ5�V�݉ؽ_?����+j���7��ۇ����=g����7��y�^޾_�/��}���n��Ց��G~�����������ҏm�vE�J���M�;	���ٳ�:�iM^5�eU����w���}�<���'_�ճ������vW�	���_�W�MO��qo-���sC��[|�v�V�; _
�`�ҍ�ljQi`Df �B0]�p ࠱�I�h�'�O �)D D`�P`�,  ��eP!�
�D� �l\ (�Q@��%����%��$��db�@���
h�������d� � H@"�N`��4��B�¨(����l�!3d��.�G��@�BI2"  ���ı�9F������d�]�~��-�_����:�������l;�/����F���
���~�tI`�'����S~����w�sݥ��'���m��x�w{�����Z������qi)g?|��U�~�����������������AV�AH*�T��,Deœ�pL�:(>� b@�
�O@�UC�PP�+B@y�� �A ��� �ia���$�6�AĶP�� FT��;�����|����f��Q_�;���4V�O��-�����m;����j���6��v:W7b�~�o���ޫߗ�-iRn|���)�ner3[�	�o��>Z�#�����hy�q�{i�i���ŏ.Ȉ|����}��ԾێM_�������k%|���d����Ͻ�]��-͙?O�N����1��>Y-�C�������M�[^���^v�:��r�v���x�{��1��w��m쾓_�[�/����S�}S֗?��MT8$�B'�`)B;��_�
 @�f�A�BHc, p���*��n�5zF$*�Ko��(ǁy��ҥ�BP"�fd�2fF�[j&A

            selection.setRng(rng);
          }
        }

        // Applies formatting to the caret position
        function applyCaretFormat() {
          var rng, caretContainer, textNode, offset, bookmark, container, text;

          rng = selection.getRng(true);
          offset = rng.startOffset;
          container = rng.startContainer;
          text = container.nodeValue;

          caretContainer = getParentCaretContainer(selection.getStart());
          if (caretContainer) {
            textNode = findFirstTextNode(caretContainer);
          }

          // Expand to word if caret is in the middle of a text node and the char before/after is a alpha numeric character
          var wordcharRegex = /[^\s\u00a0\u00ad\u200b\ufeff]/;
          if (text && offset > 0 && offset < text.length &&
            wordcharRegex.test(text.charAt(offset)) && wordcharRegex.test(text.charAt(offset - 1))) {
            // Get bookmark of caret position
            bookmark = selection.getBookmark();

            // Collapse bookmark range (WebKit)
            rng.collapse(true);

            // Expand the range to the closest word and split it at those points
            rng = expandRng(rng, get(name));
            rng = rangeUtils.split(rng);

            // Apply the format to the range
            apply(name, vars, rng);

            // Move selection back to caret position
            selection.moveToBookmark(bookmark);
          } else {
            if (!caretContainer || textNode.nodeValue !== INVISIBLE_CHAR) {
              caretContainer = createCaretContainer(true);
              textNode = caretContainer.firstChild;

              rng.insertNode(caretContainer);
              offset = 1;

              apply(name, vars, caretContainer);
            } else {
              apply(name, vars, caretContainer);
            }

            // Move selection to text node
            selection.setCursorLocation(textNode, offset);
          }
        }

        function removeCaretFormat() {
          var rng = selection.getRng(true), container, offset, bookmark,
            hasContentAfter, node, formatNode, parents = [], i, caretContainer;

          container = rng.startContainer;
          offset = rng.startOffset;
          node = container;

          if (container.nodeType == 3) {
            if (offset != container.nodeValue.length) {
              hasContentAfter = true;
            }

            node = node.parentNode;
          }

          while (node) {
            if (matchNode(node, name, vars, similar)) {
              formatNode = node;
              break;
            }

            if (node.nextSibling) {
              hasContentAfter = true;
            }

            parents.push(node);
            node = node.parentNode;
          }

          // Node doesn't have the specified format
          if (!formatNode) {
            return;
          }

          // Is there contents after the caret then remove the format on the element
          if (hasContentAfter) {
            // Get bookmark of caret position
            bookmark = selection.getBookmark();

            // Collapse bookmark range (WebKit)
            rng.collapse(true);

            // Expand the range to the closest word and split it at those points
            rng = expandRng(rng, get(name), true);
            rng = rangeUtils.split(rng);

            // Remove the format from the range
            remove(name, vars, rng);

            // Move selection back to caret position
            selection.moveToBookmark(bookmark);
          } else {
            caretContainer = createCaretContainer();

            node = caretContainer;
            for (i = parents.length - 1; i >= 0; i--) {
              node.appendChild(dom.clone(parents[i], false));
              node = node.firstChild;
            }

            // Insert invisible character into inner most format element
            node.appendChild(dom.doc.createTextNode(INVISIBLE_CHAR));
            node = node.firstChild;

            var block = dom.getParent(formatNode, isTextBlock);

            if (block && dom.isEmpty(block)) {
              // Replace formatNode with caretContainer when removing format from empty block like <p><b>|</b></p>
              formatNode.parentNode.replaceChild(caretContainer, formatNode);
            } else {
              // Insert caret container after the formatted node
              dom.insertAfter(caretContainer, formatNode);
            }

            // Move selection to text node
            selection.setCursorLocation(node, 1);

            // If the formatNode is empty, we can remove it safely.
            if (dom.isEmpty(formatNode)) {
              dom.remove(formatNode);
            }
          }
        }

        // Checks if the parent caret container node isn't empty if that is the case it
        // will remove the bogus state on all children that isn't empty
        function unmarkBogusCaretParents() {
          var caretContainer;

          caretContainer = getParentCaretContainer(selection.getStart());
          if (caretContainer && !dom.isEmpty(caretContainer)) {
            walk(caretContainer, function (node) {
              if (node.nodeType == 1 && node.id !== caretContainerId && !dom.isEmpty(node)) {
                dom.setAttrib(node, 'data-mce-bogus', null);
              }
            }, 'childNodes');
          }
        }

        // Only bind the caret events once
        if (!ed._hasCaretEvents) {
          // Mark current caret container elements as bogus when getting the contents so we don't end up with empty elements
          markCaretContainersBogus = function () {
            var nodes = [], i;

            if (isCaretContainerEmpty(getParentCaretContainer(selection.getStart()), nodes)) {
              // Mark children
              i = nodes.length;
              while (i--) {
                dom.setAttrib(nodes[i], 'data-mce-bogus', '1');
              }
            }
          };

          disableCaretContainer = function (e) {
            var keyCode = e.keyCode;

            removeCaretContainer();

            // Remove caret container if it's empty
            if (keyCode == 8 && selection.isCollapsed() && selection.getStart().innerHTML == INVISIBLE_CHAR) {
              removeCaretContainer(getParentCaretContainer(selection.getStart()));
            }

            // Remove caret container on keydown and it's left/right arrow keys
            if (keyCode == 37 || keyCode == 39) {
              removeCaretContainer(getParentCaretContainer(selection.getStart()));
            }

            unmarkBogusCaretParents();
          };

          // Remove bogus state if they got filled by contents using editor.selection.setContent
          ed.on('SetContent', function (e) {
            if (e.selection) {
              unmarkBogusCaretParents();
            }
          });
          ed._hasCaretEvents = true;
        }

        // Do apply or remove caret format
        if (type == "apply") {
          applyCaretFormat();
        } else {
          removeCaretFormat();
        }
      }

      /**
       * Moves the start to the first suitable text node.
       */
      function moveStart(rng) {
        var container = rng.startContainer,
          offset = rng.startOffset,
          walker, node, nodes;

        if (rng.startContainer == rng.endContainer) {
          if (isInlineBlock(rng.startContainer.childNodes[rng.startOffset])) {
            return;
          }
        }

        // Convert text node into index if possible
        if (container.nodeType == 3 && offset >= container.nodeValue.length) {
          // Get the parent container location and walk from there
          offset = nodeIndex(container);
          container = container.parentNode;
        }

        // Move startContainer/startOffset in to a suitable node
        if (container.nodeType == 1) {
          nodes = container.childNodes;
          if (offset < nodes.length) {
            container = nodes[offset];
            walker = new TreeWalker(container, dom.getParent(container, dom.isBlock));
          } else {
            container = nodes[nodes.length - 1];
            walker = new TreeWalker(container, dom.getParent(container, dom.isBlock));
            walker.next(true);
          }

          for (node = walker.current(); node; node = walker.next()) {
            if (node.nodeType == 3 && !isWhiteSpaceNode(node)) {
              rng.setStart(node, 0);
              selection.setRng(rng);

              return;
            }
          }
        }
      }
    };
  }
);

/**
 * Diff.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * JS Implementation of the O(ND) Difference Algorithm by Eugene W. Myers.
 *
 * @class tinymce.undo.Diff
 * @private
 */
define(
  'tinymce.core.undo.Diff',
  [
  ],
  function () {
    var KEEP = 0, INSERT = 1, DELETE = 2;

    var diff = function (left, right) {
      var size = left.length + right.length + 2;
      var vDown = new Array(size);
      var vUp = new Array(size);

      var snake = function (start, end, diag) {
        return {
          start: start,
          end: end,
          diag: diag
        };
      };

      var buildScript = function (start1, end1, start2, end2, script) {
        var middle = getMiddleSnake(start1, end1, start2, end2);

        if (middle === null || middle.start === end1 && middle.diag === end1 - end2 ||
          middle.end === start1 && middle.diag === start1 - start2) {
          var i = start1;
          var j = start2;
          while (i < end1 || j < end2) {
            if (i < end1 && j < end2 && left[i] === right[j]) {
              script.push([KEEP, left[i]]);
              ++i;
              ++j;
            } else {
              if (end1 - start1 > end2 - start2) {
                script.push([DELETE, left[i]]);
                ++i;
              } else {
                script.push([INSERT, right[j]]);
                ++j;
              }
            }
          }
        } else {
          buildScript(start1, middle.start, start2, middle.start - middle.diag, script);
          for (var i2 = middle.start; i2 < middle.end; ++i2) {
            script.push([KEEP, left[i2]]);
          }
          buildScript(middle.end, end1, middle.end - middle.diag, end2, script);
        }
      };

      var buildSnake = function (start, diag, end1, end2) {
        var end = start;
        while (end - diag < end2 && end < end1 && left[end] === right[end - diag]) {
          ++end;
        }
        return snake(start, end, diag);
      };

      var getMiddleSnake = function (start1, end1, start2, end2) {
        // Myers Algorithm
        // Initialisations
        var m = end1 - start1;
        var n = end2 - start2;
        if (m === 0 || n === 0) {
          return null;
        }

        var delta = m - n;
        var sum = n + m;
        var offset = (sum % 2 === 0 ? sum : sum + 1) / 2;
        vDown[1 + offset] = start1;
        vUp[1 + offset] = end1 + 1;

        for (var d = 0; d <= offset; ++d) {
          // Down
          for (var k = -d; k <= d; k += 2) {
            // First step

            var i = k + offset;
            if (k === -d || k != d && vDown[i - 1] < vDown[i + 1]) {
              vDown[i] = vDown[i + 1];
            } else {
              vDown[i] = vDown[i - 1] + 1;
            }

            var x = vDown[i];
            var y = x - start1 + start2 - k;

            while (x < end1 && y < end2 && left[x] === right[y]) {
              vDown[i] = ++x;
              ++y;
            }
            // Second step
            if (delta % 2 != 0 && delta - d <= k && k <= delta + d) {
              if (vUp[i - delta] <= vDown[i]) {
                return buildSnake(vUp[i - delta], k + start1 - start2, end1, end2);
              }
            }
          }

          // Up
          for (k = delta - d; k <= delta + d; k += 2) {
            // First step
            i = k + offset - delta;
            if (k === delta - d || k != delta + d && vUp[i + 1] <= vUp[i - 1]) {
              vUp[i] = vUp[i + 1] - 1;
      `�0��h��D�! E��JT1`	Ps�ļM`6(�H�%0Bi�B�D" �HQ�ǖR`C�%`�6:�¸��BbA�'�1�l�m[�Ѐ9��r$\���֊��D��)��а�T��C��	i��I�  IH$L��"�T	I`��TبH�$�Q�D�H�@g�I�$F� sd@Z��@�4=� ����| $���U8@`��3�H�#��@ �� `#�aP*��0AW��$x�(�Q2�`K�@���H�@T(:�X6
0N#�T3@ �B�|0X ���B(	Ш�i�p� �(D�AD�4�(��O�$M�:LX��������	H P�D���D 5P,�H"C �����ʰ:���h�-������NB�aA`d��Z�|ĵ �$>P�Y��Q�Q� �j�9�@��0�T���"09 � �x�� �2@�4�yYG�
�@�
`TX��I|���A"#)��Đ
"
���"�3$ ?�܂OBXe�Fт�$� �J �f�@� "��X���J!4���,/$��Zc�� 3c@�!C1
!ʭ�T6ɘ1�0XE�0A�� Jf��� ��eq�r	X�@4&`�����X��
dB��	� �
�BBЉ%��
,	b��#�` �50"�� �	�@��Đu�~E�"����` ���S�G� �@�BA�@"Bj"�0X���@A�"�  �`������T� b�E�
  !��p�*� �
�+!�C�h�  �$	 h��!@D4 ��A�\�$p&$�bp���%M��0H�QXSI %���2 D���
 `���zD ,�9M0�7a�
��T� $����k(r#qA�%o�. ��E�	�AK�P�B[YLBY`����E�(�	���P��
�,��Db� �S���n!���2(
�\:�W/
Q$�^0 `�@\>�@ �8��QZ u�p���h��S���P ��'@k��I E�4��!B�z@$BrR�t��F�H `*,�D%	������)�-�E� ' F �'�g�`xa "@!�drp�`EpDi�  �:��\(u�R���@)P
ش�\Iua 	�$�� �P' e��Q�@��(� ��`� P�1R1��,��P��  !)4�r�I��#�B��4�X$,g�:-�VDBl*����Z'd4�j� $�l4�	@U1h�#ai�q�4�D@$`� �(<�R�tB�0�
���� !�8����))H" �|��{ p��JВ�	P�f�Be�I� 4U6�4R �PL
E��O8�۲�p@8@k@�  �� tk?$&	� ���A�4���@�*8hA6X=0�K��d����# ���QQ7>��C��Fi]�!�+X�
U���9 A\�`�x�HM�PH �#\pR8���P%J�N�l�!R��`&�ȭ�=	�� yu�E�4! ��@"���D@��@6A�N@�|S��2p@#0�"�����XJ�  d�*@�	&f:� Ɛ�r0i�| b�j�@�  W�3"Y�P@t&��
a!��
<4
��
���3%��0��R%�,���f$c��T�&)P�V��$�@ �C �(lR���1�(l�.��2� ��P<<!4+j U ��
��a�HT��AI <�@$!��@
Jd #�Z8�Y1�Q��a����J
 !��L�
�C" }A�% b 2�tD[B� �
P �x|�f?GA�C��
aBΐ��x����KCr>
�#���8��X `*� (��
J٤��B8���n�fDX�
P t `aD�* ��Ex��B���OJ^�dȀ��X,D��iZ��8Mȉv�	Pb�P�H)���ːv�A�dB#��5|L� �W"r��J ��$�R9�
�B��H�:�C��Bm� =�˘��4db
 "bd
�P�C �<������	�@@��1o���0 1
�0%1�B�՝�8�D�	�\ E0�)	S�H-  d�, O��H�@�%I�P�@E!*O (���	��@	��H�

O��"9`��aL F��O Rn$�0D� T� ���
�@`q�PH �4���� 	����S OCP�T-�@�4Dzik��T�D�J�[a��<3	D  �2 �2�P��H1�d'+$*�,��(0�IF�G��� 0 �!�+��R �J\�A���c)�5Bk �$�f� b<�L!	�b@HA�� �l�H�R�f��@q �i�� � H���Q ��3bP	�Ф  �B$�"v ��
D@`�48 P�� H@�H���B� ���@�U��!������hJ��:�OR�#���g��6Xq!M��&h@!c �� !#����LD�&,�A�I�E�HrASԾ>�HDʀjC�?����$�����֨E�$VLfL,':��`\6@;�a|(0ڴQ"5�)�t��J3��z�c��'M*%�!�E�
$#G�>%*��	��
m
��=\E��s(0.�T�"IompleteLevel = function (content) {
      return {
        type: 'complete',
        fragments: null,
        content: content,
        bookmark: null,
        beforeBookmark: null
      };
    };

    var createFromEditor = function (editor) {
      var fragments, content, trimmedFragments;

      fragments = Fragments.read(editor.getBody());
      trimmedFragments = Arr.map(fragments, function (html) {
        return editor.serializer.trimContent(html);
      });
      content = trimmedFragments.join('');

      return hasIframes(content) ? createFragmentedLevel(trimmedFragments) : createCompleteLevel(content);
    };

    var applyToEditor = function (editor, level, before) {
      if (level.type === 'fragmented') {
        Fragments.write(level.fragments, editor.getBody());
      } else {
        editor.setContent(level.content, { format: 'raw' });
      }

      editor.selection.moveToBookmark(before ? level.beforeBookmark : level.bookmark);
    };

    var getLevelContent = function (level) {
      return level.type === 'fragmented' ? level.fragments.join('') : level.content;
    };

    var isEq = function (level1, level2) {
      return getLevelContent(level1) === getLevelContent(level2);
    };

    return {
      createFragmentedLevel: createFragmentedLevel,
      createCompleteLevel: createCompleteLevel,
      createFromEditor: createFromEditor,
      applyToEditor: applyToEditor,
      isEq: isEq
    };
  }
);
/**
 * UndoManager.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class handles the undo/redo history levels for the editor. Since the built-in undo/redo has major drawbacks a custom one was needed.
 *
 * @class tinymce.UndoManager
 */
define(
  'tinymce.core.UndoManager',
  [
    "tinymce.core.util.VK",
    "tinymce.core.util.Tools",
    "tinymce.core.undo.Levels"
  ],
  function (VK, Tools, Levels) {
    return function (editor) {
      var self = this, index = 0, data = [], beforeBookmark, isFirstTypedCharacter, locks = 0;

      var isUnlocked = function () {
        return locks === 0;
      };

      var setTyping = function (typing) {
        if (isUnlocked()) {
          self.typing = typing;
        }
      };

      function setDirty(state) {
        editor.setDirty(state);
      }

      function addNonTypingUndoLevel(e) {
        setTyping(false);
        self.add({}, e);
      }

      function endTyping() {
        if (self.typing) {
          setTyping(false);
          self.add();
        }
      }

      // Add initial undo level when the editor is initialized
      editor.on('init', function () {
        self.add();
      });

      // Get position before an execCommand is processed
      editor.on('BeforeExecCommand', function (e) {
        var cmd = e.command;

        if (cmd !== 'Undo' && cmd !== 'Redo' && cmd !== 'mceRepaint') {
          endTyping();
          self.beforeChange();
        }
      });

      // Add undo level after an execCommand call was made
      editor.on('ExecCommand', function (e) {
        var cmd = e.command;

        if (cmd !== 'Undo' && cmd !== 'Redo' && cmd !== 'mceRepaint') {
          addNonTypingUndoLevel(e);
        }
      });

      editor.on('ObjectResizeStart Cut', function () {
        self.beforeChange();
      });

      editor.on('SaveContent ObjectResized blur', addNonTypingUndoLevel);
      editor.on('DragEnd', addNonTypingUndoLevel);

      editor.on('KeyUp', function (e) {
        var keyCode = e.keyCode;

        // If key is prevented then don't add undo level
        // This would happen on keyboard shortcuts for example
        if (e.isDefaultPrevented()) {
          return;
        }

        if ((keyCode >= 33 && keyCode <= 36) || (keyCode >= 37 && keyCode <= 40) || keyCode === 45 || e.ctrlKey) {
          addNonTypingUndoLevel();
          editor.nodeChanged();
        }

        if (keyCode === 46 || keyCode === 8) {
          editor.nodeChanged();
        }

        // Fire a TypingUndo/Change event on the first character entered
        if (isFirstTypedCharacter && self.typing && Levels.isEq(Levels.createFromEditor(editor), data[0]) === false) {
          if (editor.isDirty() === false) {
            setDirty(true);
            editor.fire('change', { level: data[0], lastLevel: null });
          }

          editor.fire('TypingUndo');
          isFirstTypedCharacter = false;
          editor.nodeChanged();
        }
      });

      editor.on('KeyDown', function (e) {
        var keyCode = e.keyCode;

        // If key is prevented then don't add undo level
        // This would happen on keyboard shortcuts for example
        if (e.isDefaultPrevented()) {
          return;
        }

        // Is character position keys left,right,up,down,home,end,pgdown,pgup,enter
        if ((keyCode >= 33 && keyCode <= 36) || (keyCode >= 37 && keyCode <= 40) || keyCode === 45) {
          if (self.typing) {
            addNonTypingUndoLevel(e);
          }

          return;
        }

        // If key isn't Ctrl+Alt/AltGr
        var modKey = (e.ctrlKey && !e.altKey) || e.metaKey;
        if ((keyCode < 16 || keyCode > 20) && keyCode !== 224 && keyCode !== 91 && !self.typing && !modKey) {
          self.beforeChange();
          setTyping(true);
          self.add({}, e);
          isFirstTypedCharacter = true;
        }
      });

      editor.on('MouseDown', function (e) {
        if (self.typing) {
          addNonTypingUndoLevel(e);
        }
      });

      // Add keyboard shortcuts for undo/redo keys
      editor.addShortcut('meta+z', '', 'Undo');
      editor.addShortcut('meta+y,meta+shift+z', '', 'Redo');

      editor.on('AddUndo Undo Redo ClearUndos', function (e) {
        if (!e.isDefaultPrevented()) {
          editor.nodeChanged();
        }
      });

      /*eslint consistent-this:0 */
      self = {
        // Explode for debugging reasons
        data: data,

        /**
         * State if the user is currently typing or not. This will add a typing operation into one undo
         * level instead of one new level for each keystroke.
         *
         * @field {Boolean} typing
         */
        typing: false,

        /**
         * Stores away a bookmark to be used when performing an undo action so that the selection is before
         * the change has been made.
         *
         * @method beforeChange
         */
        beforeChange: function () {
          if (isUnlocked()) {
            beforeBookmark = editor.selection.getBookmark(2, true);
          }
        },

        /**
         * Adds a new undo level/snapshot to the undo list.
         *
         * @method add
         * @param {Object} level Optional undo level object to add.
         * @param {DOMEvent} event Optional event responsible for the creation of the undo level.
         * @return {Object} Undo level that got added or null it a level wasn't needed.
         */
        add: function (level, event) {
          var i, settings = editor.settings, lastLevel, currentLevel;

          currentLevel = Levels.createFromEditor(editor);
          level = level || {};
          level = Tools.extend(level, currentLevel);

          if (isUnlocked() === false || editor.removed) {
            return null;
          }

          lastLevel = data[index];
          if (editor.fire('BeforeAddUndo', { level: level, lastLevel: lastLevel, originalEvent: event }).isDefaultPrevented()) {
            return null;
          }

          // Add undo level if needed
          if (lastLevel && Levels.isEq(lastLevel, level)) {
            return null;
          }

          // Set before bookmark on previous level
          if (data[index]) {
            data[index].beforeBookmark = beforeBookmark;
          }

          // Time to compress
          if (settings.custom_undo_redo_levels) {
            if (data.length > settings.custom_undo_redo_levels) {
              for (i = 0; i < data.length - 1; i++) {
                data[i] = data[i + 1];
              }

              data.length--;
              index = data.length;
            }
          }

          // Get a non intrusive normalized bookmark
          level.bookmark = editor.selection.getBookmark(2, true);

          // Crop array if needed
          if (index < data.length - 1) {
            data.length = index + 1;
          }

          data.push(level);
          index = data.length - 1;

          var args = { level: level, lastLevel: lastLevel, originalEvent: event };

          editor.fire('AddUndo', args);

          if (index > 0) {
            setDirty(true);
            editor.fire('change', args);
          }

          return level;
        },

        /**
         * Undoes the last action.
         *
         * @method undo
         * @return {Object} Undo level or null if no undo was performed.
         */
        undo: function () {
          var level;

          if (self.typing) {
            self.add();
            self.typing = false;
            setTyping(false);
          }

          if (index > 0) {
            level = data[--index];
            Levels.applyToEditor(editor, level, true);
            setDirty(true);
            editor.fire('undo', { level: level });
          }

          return level;
        },

        /**
         * Redoes the last action.
         *
         * @method redo
         * @return {Object} Redo level or null if no redo was performed.
         */
        redo: function () {
          var level;

          if (index < data.length - 1) {
            level = data[++index];
            Levels.applyToEditor(editor, level, false);
            setDirty(true);
            editor.fire('redo', { level: level });
          }

          return level;
        },

        /**
         * Removes all undo levels.
         *
         * @method clear
         */
        clear: function () {
          data = [];
          index = 0;
          self.typing = false;
          self.data = data;
          editor.fire('ClearUndos');
        },

        /**
         * Returns true/false if the undo manager has any undo levels.
         *
         * @method hasUndo
         * @return {Boolean} true/false if the undo manager has any undo levels.
         */
        hasUndo: function () {
          // Has undo levels or typing and content isn't the same as the initial level
          return index > 0 || (self.typing && data[0] && !Levels.isEq(Levels.createFromEditor(editor), data[0]));
        },

        /**
         * Returns true/false if the undo manager has any redo levels.
         *
         * @method hasRedo
         * @return {Boolean} true/false if the undo manager has any redo levels.
         */
        hasRedo: function () {
          return index < data.length - 1 && !self.typing;
        },

        /**
         * Executes the specified mutator function as an undo transaction. The selection
         * before the modification will be stored to the undo stack and if the DOM changes
         * it will add a new undo level. Any logic within the translation that adds undo levels will
         * be ignored. So a translation can include calls to execCommand or editor.insertContent.
         *
         * @method transact
         * @param {function} callback Function that gets executed and has dom manipulation logic in it.
         * @return {Object} Undo level that got added or null it a level wasn't needed.
         */
        transact: function (callback) {
          endTyping();
          self.beforeChange();
          self.ignore(callback);
          return self.add();
        },

        /**
         * Executes the specified mutator function as an undo transaction. But without adding an undo level.
         * Any logic within the translation that adds undo levels will be ignored. So a translation can
         * include calls to execCommand or editor.insertContent.
         *
         * @method ignore
         * @param {function} callback Function that gets executed and has dom manipulation logic in it.
         * @return {Object} Undo level that got added or null it a level wasn't needed.
         */
        ignore: function (callbackL!�!��d:` RB4@�B4e  !��83��J�$����� b����9�==��dPE�re�H!��T�k��E2b?
R4��y �� �&E�P�K�_ LVB&P�F$�(a�ɠBHL`$9�r��gs�w����������ܟ����n���?���c���_��~��e�O���������?�����|�_�m�?��S�k}�y�G߳
@	�T$8@
і
�@� �h�F����
b�2�.#��A��h�� �$��rQ��^q�mhtB�r
9$��� 2�AԀc�+@THVE�@�&��i�m�g��B��g���O������M{�?��������s8��>���k�����{J����������r��G~����x�s�v���~����ߴN:��]���t��G���e����Gޙ۷�������4&���b��P@xa��|CE��ı0�H��C��G'3�F"�$g*A@~� pr���:���� 9#`S&%hT�M ��de��LnL@AW	G�7�a���C�P��Rc��	�'^0��FIT�hk�G �HĢ�  D@ ��D6XU%�)�F+ll�<�,6�ɋ��H@d����6�k���g���7݁��;�0KJ�)�d
d@�ł%5c��TS 7AD�@��*V����ַę������*�=���?u���j,��;��P�޽o���y]�e��\���C����7�?�޿2��}�.��z�/�}�e}�Z�]��;�u�������?�w��6��/޻��ߝ�����}�������.���2�D�g4 S�p	��
���
���=A❙�����EV$����\���CW�R�t�CB���$r*A� U�<�m�i ��y�%���X��Ԅ"�Pr�����$ˆn����C�g��ۮ���a�.���ﹽ�ui�,��؟_׶�ԣ���?��ԗ_�-w��l�9ݿ���ޭ_��o��ۭ����N�s���
o��W����ўk��Ͻ�_��g����[�����ܯ�m�i�����|_��mI���I�}6�����^8Z�r��ge�_����ݽv�������~�E~ �jﭯ>v������.�f#�����������o��tvi��w��s]�� �����O����������=o>�1�����{������ �TSR�gJ�Q�6-
D
0 j��EO�h�F�@�@����0��HȨq�S��2%�!��3B �d*'�R�@�W�@PJ��' "��	��B4:Q���z����W���ݻ�>~�����==��Fo�g�u~ѷӭ��~�����7��د����v]���Uڮ?���?��Gj��ݙ��������ˮ�/���o��ˮ�׻�[������ݿ��g�Ͽm�������$���ʻE�O,�S�?
      var element = scope.dom();
      if (!element.parentNode) return Option.none();

      return child(Element.fromDom(element.parentNode), function (x) {
        return !Compare.eq(scope, x) && predicate(x);
      });
    };

    var child = function (scope, predicate) {
      var result = Arr.find(scope.dom().childNodes,
        Fun.compose(predicate, Element.fromDom));
      return result.map(Element.fromDom);
    };

    var descendant = function (scope, predicate) {
      var descend = function (element) {
        for (var i = 0; i < element.childNodes.length; i++) {
          if (predicate(Element.fromDom(element.childNodes[i])))
            return Option.some(Element.fromDom(element.childNodes[i]));

          var res = descend(element.childNodes[i]);
          if (res.isSome())
            return res;
        }

        return Option.none();
      };

      return descend(scope.dom());
    };

    return {
      first: first,
      ancestor: ancestor,
      closest: closest,
      sibling: sibling,
      child: child,
      descendant: descendant
    };
  }
);

/**
 * CaretUtils.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * Utility functions shared by the caret logic.
 *
 * @private
 * @class tinymce.caret.CaretUtils
 */
define(
  'tinymce.core.caret.CaretUtils',
  [
    "tinymce.core.util.Fun",
    "tinymce.core.dom.TreeWalker",
    "tinymce.core.dom.NodeType",
    "tinymce.core.caret.CaretPosition",
    "tinymce.core.caret.CaretContainer",
    "tinymce.core.caret.CaretCandidate"
  ],
  function (Fun, TreeWalker, NodeType, CaretPosition, CaretContainer, CaretCandidate) {
    var isContentEditableTrue = NodeType.isContentEditableTrue,
      isContentEditableFalse = NodeType.isContentEditableFalse,
      isBlockLike = NodeType.matchStyleValues('display', 'block table table-cell table-caption list-item'),
      isCaretContainer = CaretContainer.isCaretContainer,
      isCaretContainerBlock = CaretContainer.isCaretContainerBlock,
      curry = Fun.curry,
      isElement = NodeType.isElement,
      isCaretCandidate = CaretCandidate.isCaretCandidate;

    function isForwards(direction) {
      return direction > 0;
    }

    function isBackwards(direction) {
      return direction < 0;
    }

    function skipCaretContainers(walk, shallow) {
      var node;

      while ((node = walk(shallow))) {
        if (!isCaretContainerBlock(node)) {
          return node;
        }
      }

      return null;
    }

    function findNode(node, direction, predicateFn, rootNode, shallow) {
      var walker = new TreeWalker(node, rootNode);

      if (isBackwards(direction)) {
        if (isContentEditableFalse(node) || isCaretContainerBlock(node)) {
          node = skipCaretContainers(walker.prev, true);
          if (predicateFn(node)) {
            return node;
          }
        }

        while ((node = skipCaretContainers(walker.prev, shallow))) {
          if (predicateFn(node)) {
            return node;
          }
        }
      }

      if (isForwards(direction)) {
        if (isContentEditableFalse(node) || isCaretContainerBlock(node)) {
          node = skipCaretContainers(walker.next, true);
          if (predicateFn(node)) {
            return node;
          }
        }

        while ((node = skipCaretContainers(walker.next, shallow))) {
          if (predicateFn(node)) {
            return node;
          }
        }
      }

      return null;
    }

    function getEditingHost(node, rootNode) {
      for (node = node.parentNode; node && node != rootNode; node = node.parentNode) {
        if (isContentEditableTrue(node)) {
          return node;
        }
      }

      return rootNode;
    }

    function getParentBlock(node, rootNode) {
      while (node && node != rootNode) {
        if (isBlockLike(node)) {
          return node;
        }

        node = node.parentNode;
      }

      return null;
    }

    function isInSameBlock(caretPosition1, caretPosition2, rootNode) {
      return getParentBlock(caretPosition1.container(), rootNode) == getParentBlock(caretPosition2.container(), rootNode);
    }

    function isInSameEditingHost(caretPosition1, caretPosition2, rootNode) {
      return getEditingHost(caretPosition1.container(), rootNode) == getEditingHost(caretPosition2.container(), rootNode);
    }

    function getChildNodeAtRelativeOffset(relativeOffset, caretPosition) {
      var container, offset;

      if (!caretPosition) {
        return null;
      }

      container = caretPosition.container();
      offset = caretPosition.offset();

      if (!isElement(container)) {
        return null;
      }

      return container.childNodes[offset + relativeOffset];
    }

    function beforeAfter(before, node) {
      var range = node.ownerDocument.createRange();

      if (before) {
        range.setStartBefore(node);
        range.setEndBefore(node);
      } else {
        range.setStartAfter(node);
        range.setEndAfter(node);
      }

      return range;
    }

    function isNodesInSameBlock(rootNode, node1, node2) {
      return getParentBlock(node1, rootNode) == getParentBlock(node2, rootNode);
    }

    function lean(left, rootNode, node) {
      var sibling, siblingName;

      if (left) {
        siblingName = 'previousSibling';
      } else {
        siblingName = 'nextSibling';
      }

      while (node && node != rootNode) {
        sibling = node[siblingName];

        if (isCaretContainer(sibling)) {
          sibling = sibling[siblingName];
        }

        if (isContentEditableFalse(sibling)) {
          if (isNodesInSameBlock(rootNode, sibling, node)) {
            return sibling;
          }

          break;
        }

        if (isCaretCandidate(sibling)) {
          break;
        }

        node = node.parentNode;
      }

      return null;
    }

    var before = curry(beforeAfter, true);
    var after = curry(beforeAfter, false);

    function normalizeRange(direction, rootNode, range) {
      var node, container, offset, location;
      var leanLeft = curry(lean, true, rootNode);
      var leanRight = curry(lean, false, rootNode);

      container = range.startContainer;
      offset = range.startOffset;

      if (CaretContainer.isCaretContainerBlock(container)) {
        if (!isElement(container)) {
          container = container.parentNode;
        }

        location = container.getAttribute('data-mce-caret');

        if (location == 'before') {
          node = container.nextSibling;
          if (isContentEditableFalse(node)) {
            return before(node);
          }
        }

        if (location == 'after') {
          node = container.previousSibling;
          if (isContentEditableFalse(node)) {
            return after(node);
          }
        }
      }

      if (!range.collapsed) {
        return range;
      }

      if (NodeType.isText(container)) {
        if (isCaretContainer(container)) {
          if (direction === 1) {
            node = leanRight(container);
            if (node) {
              return before(node);
            }

            node = leanLeft(container);
            if (node) {
              return after(node);
            }
          }

          if (direction === -1) {
            node = leanLeft(container);
            if (node) {
              return after(node);
            }

            node = leanRight(container);
            if (node) {
              return before(node);
            }
          }

          return range;
        }

        if (CaretContainer.endsWithCaretContainer(container) && offset >= container.data.length - 1) {
          if (direction === 1) {
            node = leanRight(container);
            if (node) {
              return before(node);
            }
          }

          return range;
        }

        if (CaretContainer.startsWithCaretContainer(container) && offset <= 1) {
          if (direction === -1) {
            node = leanLeft(container);
            if (node) {
              return after(node);
    ��w�Nb���xg<��d6�����w�u�]7C��V��;+�/�{�'��k����k5?Vq��bK}>�s�c�Z!����������7��_���wlo�����x��<v�����_��/��/�
�vG�o�������zEj��׿f��{�����}o�~��t����5������O>����_�{����M~��5��c��������g����������^�����~��[��e���=��ȹ��x�{'��K�ե!����s�������	�._�YWo�r{���\}�ti�G��^W�g�
��+��uLK�ܝs�^����#�Sݿ'4�'��1�R�����U���*�!=_�{���Ƿ��Q�}-��˾�_�����2C�}��������������?���
�����Lo��Ja�㛀��;��{息{������6Q���agm���4�,Q��t�|o��XO��뗝�SS���7W���巨��5��s�eOV~���g�~�n���6��m���T]�;g���i<�S7���喻�I審}��&ɵO_om����{��E�ܰ׶_Q�������˼ߵ�?���7���������o�_���|�7������rۿ�v|�_� �n�����Cֻ�i}?�v�}������/�����lڿ���������˜��߼�m��k��o��������~W�_�G{��
 ��A1�&��Y
�lD:�%�?�S��\Vd��;� <*0`Ӏ;0 
6�hR���p�Bc >�*�ddb0�`*^G�N��Q��jY� V�P%�-� A0t5Ah�B�	BUj!�ቋ� $h��@$�,A�HAT R0X DA�@8!A� %����0[Ar��9Y�M,�@R"�r ��h BE���f;OB����B�ZR��!5��C���B!
�@�����R��h��@ ��F�@)Б4BH8E�B ��@���>�� @�q #Rb4�d ��3V_~ؒy�*h��c*X�'�#��	8V��I�)��G�Q
W>
4�]�Tf#�
�� *j)�@`q�SCPH^  F �
|�ˀl$C,���T �*�B��E�
�@�B*)�i
�p�r`b 	'&k*� b�Ap� ev �@�i�D�Q� o ��	���a0o�tT� #��RH��l�E)>��C�Q�D2E	��F���(2j$A�n �I���䈁n�4�g0	��A @d1�!90,$��Z�@h�td�̴� 3�h�G%UH4�d
hT�>!��cP�A)��jjs�(� �&O�5�d"!L(&{P ���A� ��I0 DO����H�X�A�$QD:���*� w!�L@� �h@@�-B&s��"� �Q*hR���(H9C�A9'���@� �����:   У'� �
 d�a�d�#sKB5]"��.p���b֠#6n�  {!�LP�C4 ��,�*���	�Z�>�PBf�@	�4&.����	�QV ������iu�H�"�>"�Y��`�h%QvJH��0�Aq��[tE�5�!� ��H4B0 M���@0@@� �<� #I+`� *�Q2�p��[Z�(�
b3h��A�V@o P�B@�AdDD��� ě9d��$� I���� ��Y HUY��՘x`A�B� �  ,�M9W��#SU �7�M�I&����M(D� ��@�EH * P��9B����`|� �(��P�P L)"H'�_̔D20��Ps$�q��P
 �%2 R҇�PZq` �0���aL%� a��dB����X�����R����AH�H
�B���� dF
�	 � �,)E�Lj�R,@
��I���0LD!���Q��#bE�
`�
B�B|�+�D(0 Lb$�G8��: F�( ,�	���@�hA%!%QY)8L$�D�� p�.�ra@(�`�0E�t
<P&��"�?�r� ���QR547�.Uց��4�	`�n3
�$qs�@���jHT�P��,)�
8V�D*���"��,�DF D�'�����J"] ����) ���ϚT6HD�5@)����8�D�b�q�21cR � � � 2�6 C*��I� � A?A\ y(00A�4
p���U��t� �Q4�e�")T�J��� [7CŪ\j@kr(G/3�Υ��*�&�P i�8��Q
őb45�Ѕ���$@P�(àL�$��G#$b4x 
( ��NF��|!@0�C��F���(����� ��X��2��
��� �
 �  ��� J`s d. �)��0D�q0���FTS�3��r�0ƌm�A`"	�O0`��	0�">��~��`IhJF�* �y� @�"�zR-6h�K!�'DL@"(�l���&����f"�����J@�P�CH$�d�ญFI1Q��P"�$y%%C�) v keh�D� K ���i  )l �4 ��4� ac�|� L
Y"�F��@%�cxEsP��)`�I !IBR!H(`����� U�BQ�.�h��/"�H1)�=R��hH�� )'���,��  �4 2Oʚ�9O3<j$Bd:6�	��! B05�&"�
���0G�7R�@���R8(D"1Di2�, p R�H"�X1��¥D@@LP#@������EP�F   H@B�B�� �D�R�
�&C1J"i���`��@H�DV� N�\҂d�و�1l�4\Mp�o�4�+:����	䄂A�  2�/��g��nψ�N���#a�+�m!�{���kCF�fG���M�{aT4�l+K7U� /���u$/�E@B�<DHp<]�X��5BD� ���p�hP���0�Q�h���AP "�)
*�,G  �x ��S+EC�)HZ  ,$I P� '�S�ua�U�U�T��'�HH�p"��`��h�k2Qj(w%��� � P��J$H&%d̸����` a�	2@� �%B� ���Zј$�Y	@ ���Z� *@!r�M� ���
 ֙�P�DT�1�#Z��e��ڡ!�&i��"O��Z �n  `,? K������QT
 � i@Z�05��y��BT1�F��`D  B��\H��.
"0<X R�0
�I�
B!
��0J�`.�AHB�D2	8����#�V�g&@pC����:`�-X�P���	�)�&g F����$!ѿ�i�a 쒇�S�) )b@�B$h.%L�@� !e@�@�}�$A��!@�� pEK|���!@`� ��
#otNode) {
      return {
        /**
         * Returns the next logical caret position from the specificed input
         * caretPoisiton or null if there isn't any more positions left for example
         * at the end specified root element.
         *
         * @method next
         * @param {tinymce.caret.CaretPosition} caretPosition Caret position to start from.
         * @return {tinymce.caret.CaretPosition} CaretPosition or null if no position was found.
         */
        next: function (caretPosition) {
          return findCaretPosition(1, caretPosition, rootNode);
        },

        /**
         * Returns the previous logical caret position from the specificed input
         * caretPoisiton or null if there isn't any more positions left for example
         * at the end specified root element.
         *
         * @method prev
         * @param {tinymce.caret.CaretPosition} caretPosition Caret position to start from.
         * @return {tinymce.caret.CaretPosition} CaretPosition or null if no position was found.
         */
        prev: function (caretPosition) {
          return findCaretPosition(-1, caretPosition, rootNode);
        }
      };
    };
  }
);
/**
 * CaretFinder.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.caret.CaretFinder',
  [
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'tinymce.core.caret.CaretCandidate',
    'tinymce.core.caret.CaretPosition',
    'tinymce.core.caret.CaretUtils',
    'tinymce.core.caret.CaretWalker',
    'tinymce.core.dom.NodeType'
  ],
  function (Fun, Option, CaretCandidate, CaretPosition, CaretUtils, CaretWalker, NodeType) {
    var walkToPositionIn = function (forward, rootNode, startNode) {
      var position = forward ? CaretPosition.before(startNode) : CaretPosition.after(startNode);
      return fromPosition(forward, rootNode, position);
    };

    var afterElement = function (node) {
      return NodeType.isBr(node) ? CaretPosition.before(node) : CaretPosition.after(node);
    };

    var isBeforeOrStart = function (position) {
      if (CaretPosition.isTextPosition(position)) {
        return position.offset() === 0;
      } else {
        return CaretCandidate.isCaretCandidate(position.getNode());
      }
    };

    var isAfterOrEnd = function (position) {
      if (CaretPosition.isTextPosition(position)) {
        return position.offset() === position.container().data.length;
      } else {
        return CaretCandidate.isCaretCandidate(position.getNode(true));
      }
    };

    var isBeforeAfterSameElement = function (from, to) {
      return !CaretPosition.isTextPosition(from) && !CaretPosition.isTextPosition(to) && from.getNode() === to.getNode(true);
    };

    var isAtBr = function (position) {
      return !CaretPosition.isTextPosition(position) && NodeType.isBr(position.getNode());
    };

    var shouldSkipPosition = function (forward, from, to) {
      if (forward) {
        return !isBeforeAfterSameElement(from, to) && !isAtBr(from) && isAfterOrEnd(from) && isBeforeOrStart(to);
      } else {
        return !isBeforeAfterSameElement(to, from) && isBeforeOrStart(from) && isAfterOrEnd(to);
      }
    };

    // Finds: <p>a|<b>b</b></p> -> <p>a<b>|b</b></p>
    var fromPosition = function (forward, rootNode, position) {
      var walker = new CaretWalker(rootNode);
      return Option.from(forward ? walker.next(position) : walker.prev(position));
    };

    // Finds: <p>a|<b>b</b></p> -> <p>a<b>b|</b></p>
    var navigate = function (forward, rootNode, from) {
      return fromPosition(forward, rootNode, from).bind(function (to) {
        if (CaretUtils.isInSameBlock(from, to, rootNode) && shouldSkipPosition(forward, from, to)) {
          return fromPosition(forward, rootNode, to);
        } else {
          return Option.some(to);
        }
      });
    };

    var positionIn = function (forward, element) {
      var startNode = forward ? element.firstChild : element.lastChild;
      if (NodeType.isText(startNode)) {
        return Option.some(new CaretPosition(startNode, forward ? 0 : startNode.data.length));
      } else if (startNode) {
        if (CaretCandidate.isCaretCandidate(startNode)) {
          return Option.some(forward ? CaretPosition.before(startNode) : afterElement(startNode));
        } else {
          return walkToPositionIn(forward, element, startNode);
        }
      } else {
        return Option.none();
      }
    };

    return {
      fromPosition: fromPosition,
      navigate: navigate,
      positionIn: positionIn
    };
  }
);

/**
 * DeleteUtils.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.delete.DeleteUtils',
  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Option',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.search.PredicateFind'
  ],
  function (Arr, Option, Compare, Element, Node, PredicateFind) {
    var toLookup = function (names) {
      var lookup = Arr.foldl(names, function (acc, name) {
        acc[name] = true;
        return acc;
      }, { });

      return function (elm) {
        return lookup[Node.name(elm)] === true;
      };
    };

    var isTextBlock = toLookup([
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'div', 'address', 'pre', 'form', 'blockquote', 'center',
      'dir', 'fieldset', 'header', 'footer', 'article', 'section', 'hgroup', 'aside', 'nav', 'figure'
    ]);

    var isBeforeRoot = function (rootNode) {
      return function (elm) {
        return Compare.eq(rootNode, Element.fromDom(elm.dom().parentNode));
      };
    };

    var getParentTextBlock = function (rootNode, elm) {
      return Compare.contains(rootNode, elm) ? PredicateFind.closest(elm, isTextBlock, isBeforeRoot(rootNode)) : Option.none();
    };

    return {
      getParentTextBlock: getParentTextBlock
    };
  }
);

define(
  'ephox.sugar.api.search.SelectorFind',

  [
    'ephox.sugar.api.search.PredicateFind',
    'ephox.sugar.api.search.Selectors',
    'ephox.sugar.impl.ClosestOrAncestor'
  ],

  function (PredicateFind, Selectors, ClosestOrAncestor) {
    // TODO: An internal SelectorFilter module that doesn't Element.fromDom() everything

    var first = function (selector) {
      return Selectors.one(selector);
    };

    var ancestor = function (scope, selector, isRoot) {
      return PredicateFind.ancestor(scope, function (e) {
        return Selectors.is(e, selector);
      }, isRoot);
    };

    var sibling = function (scope, selector) {
      return PredicateFind.sibling(scope, function (e) {
        return Selectors.is(e, selector);
      });
    };

    var child = function (scope, selector) {
      return PredicateFind.child(scope, function (e) {
        return Selectors.is(e, selector);
      });
    };

    var descendant = function (scope, selector) {
      return Selectors.one(selector, scope);
    };

    var closest = function (scope, selector, isRoot) {
      return ClosestOrAncestor(Selectors.is, ancestor, scope, selector, isRoot);
    };

    return {
      first: first,
      ancestor: ancestor,
      sibling: sibling,
      child: child,
      descendant: descendant,
      closest: closest
    };
  }
);

define(
  'ephox.sugar.api.search.SelectorExists',

  [
    'ephox.sugar.api.search.SelectorFind'
  ],

  function (SelectorFind) {
    var any = function (selector) {
      return SelectorFind.first(selector).isSome();
    };

    var ancestor = function (scope, selector, isRoot) {
      return SelectorFind.ancestor(scope, selector, isRoot).isSome();
    };

    var sibling = function (scope, selector) {
      return SelectorFind.sibling(scope, selector).isSome();
    };

    var child = function (scope, selector) {
      return SelectorFind.child(scope, selector).isSome();
    };

    var descendant = function (scope, selector) {
      return SelectorFind.descendant(scope, selector).isSome();
    };

    var closest = function (scope, selector, isRoot) {
      return SelectorFind.closest(scope, selector, isRoot).isSome();
    };

    return {
      any: any,
      ancestor: ancestor,
      sibling: sibling,
      child: child,
      descendant: descendant,
      closest: closest
    };
  }
);

/**
 * Empty.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.dom.Empty',
  [
    'ephox.katamari.api.Fun',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.search.SelectorExists',
    'tinymce.core.caret.CaretCandidate',
    'tinymce.core.dom.NodeType',
    'tinymce.core.dom.TreeWalker'
  ],
  function (Fun, Compare, Element, SelectorExists, CaretCandidate, NodeType, TreeWalker) {
    var hasWhitespacePreserveParent = function (rootNode, node) {
      var rootElement = Element.fromDom(rootNode);
      var startNode = Element.fromDom(node);
      return SelectorExists.ancestor(startNode, 'pre,code', Fun.curry(Compare.eq, rootElement));
    };

    var isWhitespace = function (rootNode, node) {
      return NodeType.isText(node) && /^[ \t\r\n]*$/.test(node.data) && hasWhitespacePreserveParent(rootNode, node) === false;
    };

    var isNamedAnchor = function (node) {
      return NodeType.isElement(node) && node.nodeName === 'A' && node.hasAttribute('name');
    };

    var isContent = function (rootNode, node) {
      return (CaretCandidate.isCaretCandidate(node) && isWhitespace(rootNode, node) === false) || isNamedAnchor(node) || isBookmark(node);
    };

    var isBookmark = NodeType.hasAttribute('data-mce-bookmark');
    var isBogus = NodeType.hasAttribute('data-mce-bogus');
    var isBogusAll = NodeType.hasAttributeValue('data-mce-bogus', 'all');

    var isEmptyNode = function (targetNode) {
      var walker, node, brCount = 0;

      if (isContent(targetNode, targetNode)) {
        return false;
      } else {
        node = targetNode.firstChild;
        if (!node) {
          return true;
        }

        walker = new TreeWalker(node, targetNode);
        do {
          if (isBogusAll(node)) {
            node = walker.next(true);
            continue;
          }

          if (isBogus(node)) {
            node = walker.next();
            continue;
          }

          if (NodeType.isBr(node)) {
            brCount++;
            node = walker.next();
            continue;
          }

          if (isContent(targetNode, node)) {
            return false;
          }

          node = walker.next();
        } while (node);

        return brCount <= 1;
      }
    };

    var isEmpty = function (elm) {
      return isEmptyNode(elm.dom());
    };

    return {
      isEmpty: isEmpty
    };
  }
);

/**
 * BlockBoundary.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.delete.BlockBoundary',
  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Options',
    'ephox.katamari.api.Struct',
    'ephox.sugar.api.dom.Compare',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.node.Node',
    'ephox.sugar.api.search.PredicateFind',
    'ephox.sugar.api.search.Traverse',
    'tinymce.core.caret.CaretFinder',
    'tinymce.core.caret.CaretPosition',
    'tinymce.core.delete.DeleteUtils',
    'tinymce.core.dom.Empty',
    'tinymce.core.dom.NodeType'
  ],
  function (Arr, Fun, Option, Options, Struct, Compare, Element, Node, PredicateFind, Traverse, CaretFinder, CaretPosition, DeleteUtils, Empty, NodeType) {
    var BlockPosition = Struct.immutable('block', 'position');
    var BlockBoundary = Struct.immutable('from', 'to');

    var getBlockPosition = function (rootNode, pos) {
      var rootElm = Element.fromDom(rootNode);
      var containerElm = Element.fromDom(pos.container());
      return DeleteUtils.getParentTextBlock(rootElm, containerElm).map(function (block) {
        return BlockPosition(block, pos);
      });
    };

    var isDifferentBlocks = function (blockBoundary) {
      return Compare.eq(blockBoundary.from().block(), blockBoundary.to().block()) === false;
    };

    var hasSameParent = function (blockBoundary) {
      return Traverse.parent(blockBoundary.from().block()).bind(function (parent1) {
        return Traverse.parent(blockBoundary.to().block()).filter(function (parent2) {
          return Compare.eq(parent1, parent2);
        });
      }).isSome();
    };

    var isEditable = function (blockBoundary) {
      return NodeType.isContentEditableFalse(blockBoundary.from().block()) === false && NodeType.isContentEditableFalse(blockBoundary.to().block()) === false;
    };

    var skipLastBr = function (rootNode, forward, blockPosition) {
      if (NodeType.isBr(blockPosition.position().getNode()) && Empty.isEmpty(blockPosition.block()) === false) {
        return CaretFinder.positionIn(false, blockPosition.block().dom()).bind(function (lastPositionInBlock) {
          if (lastPositionInBlock.isEqual(blockPosition.position())) {
            return CaretFinder.fromPosition(forward, rootNode, lastPositionInBlock).bind(function (to) {
              return getBlockPosition(rootNode, to);
            });
          } else {
            return Option.some(blockPosition);
          }
        }).getOr(blockPosition);
      } else {
        return blockPosition;
      }
    };

    var readFromRange = function (rootNode, forward, rng) {
      var fromBlockPos = getBlockPosition(rootNode, CaretPosition.fromRangeStart(rng));
      var toBlockPos = fromBlockPos.bind(function (blockPos) {
        return CaretFinder.fromPosition(forward, rootNode, blockPos.position()).bind(function (to) {
          return getBlockPosition(rootNode, to).map(function (blockPos) {
            return skipLastBr(rootNode, forward, blockPos);
          });
        });
      });

      return Options.liftN([fromBlockPos, toBlockPos], BlockBoundary).filter(function (blockBoundary) {
        return isDifferentBlocks(blockBoundary) && hasSameParent(blockBoundary) && isEditable(blockBoundary);
      });
    };

    var read = function (rootNode, forward, rng) {
      return rng.collapsed ? readFromRange(rootNode, forward, rng) : Option.none();
    };

    return {
      read: read
    };
  }
);

/**
 * MergeBlocks.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.delete.MergeBlocks',
  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Option',
    'ephox.sugar.api.dom.Insert',
    'ephox.sugar.api.dom.Remove',
    'ephox.sugar.api.node.Element',
    'ephox.sugar.api.search.Traverse',
    'tinymce.core.caret.CaretFinder',
    'tinymce.core.caret.CaretPosition',
    'tinymce.core.dom.Empty',
    'tinymce.core.dom.NodeType'
  ],
  function (Arr, Option, Insert, Remove, Element, Traverse, CaretFinder, CaretPosition, Empty, NodeType) {
    var mergeBlocksAndReposition = function (forward, fromBlock, toBlock, toPosition) {
      var children = Traverse.children(fromBlock);

      if (NodeType.isBr(toPosition.getNode())) {
        Remove.remove(Element.fromDom(toPosition.getNode()));
        toPosition = CaretFinder.positionIn(false, toBlock.dom()).getOr(toPosition);
      }

      if (Empty.isEmpty(fromBlock) === false) {
        Arr.each(children, function (node) {
          Insert.append(toBlock, node);
        });
      }

      if (Empty.isEmpty(fromBlock)) {
        Remove.remove(fromBlock);
      }

      return children.length > 0 ? Option.from(toPosition) : Option.none();
    };

    var mergeBlocks = function (forward, block1, block2) {
      if (forward) {
        if (Empty.isEmpty(block1)) {
          Remove.remove(block1);
          return CaretFi�� @E`�0�e*)�֑��L�����.���J�bX\�i�� 6)�� �A���(`0 e�A�4e�V1#
".�+0BB4�b&b$C��a�Ȗ�# �B�F��W�$q�@�� 5a��B �8��1"�U�2)$X�"h11�%q �;��Hb�27 �0�r:
4�D��C)�"L�� 5 	Cޚ�pUEh���a�� �#|�&�zc�A � D�a���#C��0c7Aj� ��i
��<�6
x�( ( e`�&�íDA��
�����EA	JTHA`��? �KA����&���`%h�3�@  1 � �(�� �
 �	D  ��+� T �+�IhJ@�D(dL�п�H���	
c�N� %Q�$�5(�p�� �Q4A�2���� ��Q��Y��`8� 7 2�� n�L�
P�.����q��@����6UbF
�"���@-�����	�&2��݌L��xe�r1AĔ$�������a(��ܩ@���K�@ �� 
OiöiB��@H�L11Bd#$HB�R���4
�
(R@LhA.�  (S0cH� �k
,� �A����1 $HH�B � �(4��D�DX�

�����)��(-2�@��"�%HP	D$ق0"Hp�p�2D�\�(�ȝX M@" �W .H(��$�  �K�`���P�4� �F
a�,����9(30@ b
� ����'`��@C�a�@	��)3 �J�"@x'%  %��B��8A-���AH��@T��/C$��X�i��0�� 8�(P@j ` 
�
#��hC4�8� �a�,	@k
�~�
�Ѧ'`y��b��(�$�b��ŀ�q
`�g�G�5+�Iu 4	#�Q��
 �P	H3�EV ,0n�`HBd���R`K�G
��Z�" P��	Y$H Q�C���b  RA�T2 �* 4��P�l!ղ8BZ��H$1A)���G� ���u!P�v�	*�
�h,��B����O& �� ��j $1���8*! ��B��N	��=
�dc���H�@A&��#)D͔eA�`T ���p � X4I:�I ���"	L�  ���B �  F
��HW9=�1@�E�Be�=D���JB� I`��L��D_$�LT�t!�}��@C(.�d��U4/`�R�.b��G	��ґ�r��6 0  ���j�E�P���$���	�9(A���FS���P�F ��$$P����	P Csa��H�j�3ʎ��Љ.� a��H0��r+���n!��PjR(��`�DH`dE�H� ��� J��P�^HD�� h
2��04`( l:����p��2	�ؒ
�V
W  �����e%vPf H��	�H6�gK�ɘK��IBi�TT���I�XA�В`�a0D
M������;
��H �8�r��u(a)���+�
@�>� �n !@r	Nth$DNd:𡠨&����� E0�#� Dj$$� e�E�����!h�$fM0�G����	0B�1q,)@Eh=��H�+� �@$��
di�:J
$���H�t"b(f���q��P�3D�@d ��wf	<X�=�$��HDV\'�	�|!�$���$ �Mz�  (b�R�L*ĠB!�j8bI� � �5r�V��q� ���A`a;��b탱��X"JH6�I[R�2�4�z�!��A�2��L| Y�#%��z` #8�a�U""[�`���A
�0 �Jhi8Y�1X���7�I B�  P%�AӖO�`N���``�a@S�A�~6������@� ����"�
�xb*�!&� 	#�	$ ��dc�&4�}�f��e ��!�(`IB�� 
@b 0\t�(�"L���/  1,�I��$3E!   Ch��ar  �Y�a���0�yD����#� R@"�  W4B�@` eL���`(S�줃�[�b
v�(����QwcB0 �0��Ha�`�d�iu!��G� \!�H`�F p���H~�"05�e*fAm��A��n�Q�����d3zP���̊�:
M�XaAS�{A�|KA�20` �� �B
:�T &@� �`��ل�I6D!�80T  x�� UJ%�e�U�L �0#��@��f ��H�Ht^��s5&��%�"I
�A���3 ���O��"�"^�@Bd��HP��	ZdB-�^;AO4��U� -�)i) �%C@eĉ"�\��*) �����+��"AP�l ����'�F�!�0���\�id�Y�a���Wk0)b 0	 �E��0�N%�D����"K���B��)�-�<,c�$* A�A/�X4�?�@)�!�E��E�W�,Z��� ���T�Q� C-mD~���lh!�Z��V� �A�@@>�
a5IVZ�p��fH�5v˂\�h� ��`P V�
���ݒ�R ��hp�[bH�4���"�L� X�a;A�L��a-$pf�Jb
        }

        var key = keys[0];
        var value = acase[key];

        // validation
        if (adt[key] !== undefined) {
          throw new Error('duplicate key detected:' + key);
        } else if (key === 'cata') {
          throw new Error('cannot have a case named cata (sorry)');
        } else if (!Type.isArray(value)) {
          // this implicitly checks if acase is an object
          throw new Error('case arguments must be an array');
        }

        constructors.push(key);
        //
        // constructor for key
        //
        adt[key] = function () {
          var argLength = arguments.length;

          // validation
          if (argLength !== value.length) {
            throw new Error('Wrong number of arguments to case ' + key + '. Expected ' + value.length + ' (' + value + '), got ' + argLength);
          }

          // Don't use array slice(arguments), makes the whole function unoptimisable on Chrome
          var args = new Array(argLength);
          for (var i = 0; i < args.length; i++) args[i] = arguments[i];


          var match = function (branches) {
            var branchKeys = Obj.keys(branches);
            if (constructors.length !== branchKeys.length) {
              throw new Error('Wrong number of arguments to match. Expected: ' + constructors.join(',') + '\nActual: ' + branchKeys.join(','));
            }

            var allReqd = Arr.forall(constructors, function (reqKey) {
              return Arr.contains(branchKeys, reqKey);
            });

            if (!allReqd) throw new Error('Not all branches were specified when using match. Specified: ' + branchKeys.join(', ') + '\nRequired: ' + constructors.join(', '));

            return branches[key].apply(null, args);
          };

          //
          // the fold function for key
          //
          return {
            fold: function (/* arguments */) {
              // runtime validation
              if (arguments.length !== cases.length) {
                throw new Error('Wrong number of arguments to fold. Expected ' + cases.length + ', got ' + arguments.length);
              }
              var target = arguments[count];
              return target.apply(null, args);
            },
            match: match,

            // NOTE: Only for debugging.
            log: function (label) {
              console.log(label, {
                constructors: constructors,
                constructor: key,
                params: args
              });
            }
          };
        };
      });

      return adt;
    };
    return {
      generate: generate
    };
  }
);
/**
 * CefDeleteAction.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.delete.CefDeleteAction',
  [
    'ephox.katamari.api.Adt',
    'ephox.katamari.api.Option',
    'ephox.sugar.api.node.Element',
    'tinymce.core.caret.CaretFinder',
    'tinymce.core.caret.CaretPosition',
    'tinymce.core.caret.CaretUtils',
    'tinymce.core.delete.DeleteUtils',
    'tinymce.core.dom.Empty',
    'tinymce.core.dom.NodeType'
  ],
  function (Adt, Option, Element, CaretFinder, CaretPosition, CaretUtils, DeleteUtils, Empty, NodeType) {
    var DeleteAction = Adt.generate([
      { remove: [ 'element' ] },
      { moveToElement: [ 'element' ] },
      { moveToPosition: [ 'position' ] }
    ]);

    var isAtContentEditableBlockCaret = function (forward, from) {
      var elm = from.getNode(forward === false);
      var caretLocation = forward ? 'after' : 'before';
      return NodeType.isElement(elm) && elm.getAttribute('data-mce-caret') === caretLocation;
    };

    var deleteEmptyBlockOrMoveToCef = function (rootNode, forward, from, to) {
      var toCefElm = to.getNode(forward === false);
      return DeleteUtils.getParentTextBlock(Element.fromDom(rootNode), Element.fromDom(from.getNode())).map(function (blockElm) {
        return Empty.isEmpty(blockElm) ? DeleteAction.remove(blockElm.dom()) : DeleteAction.moveToElement(toCefElm);
      }).orThunk(function () {
        return Option.some(DeleteAction.moveToElement(toCefElm));
      });
    };

    var findCefPosition = function (rootNode, forward, from) {
      return CaretFinder.fromPosition(forward, rootNode, from).bind(function (to) {
        if (forward && NodeType.isContentEditableFalse(to.getNode())) {
          return deleteEmptyBlockOrMoveToCef(rootNode, forward, from, to);
        } else if (forward === false && NodeType.isContentEditableFalse(to.getNode(true))) {
          return deleteEmptyBlockOrMoveToCef(rootNode, forward, from, to);
        } else if (forward && CaretUtils.isAfterContentEditableFalse(from)) {
          return Option.some(DeleteAction.moveToPosition(to));
        } else if (forward === false && CaretUtils.isBeforeContentEditableFalse(from)) {
          return Option.some(DeleteAction.moveToPosition(to));
        } else {
          return Option.none();
        }
      });
    };

    var getContentEditableBlockAction = function (forward, elm) {
      if (forward && NodeType.isContentEditableFalse(elm.nextSibling)) {
        return Option.some(DeleteAction.moveToElement(elm.nextSibling));
      } else if (forward === false && NodeType.isContentEditableFalse(elm.previousSibling)) {
        return Option.some(DeleteAction.moveToElement(elm.previousSibling));
      } else {
        return Option.none();
      }
    };

    var getContentEditableAction = function (rootNode, forward, from) {
      if (isAtContentEditableBlockCaret(forward, from)) {
        return getContentEditableBlockAction(forward, from.getNode(forward === false))
          .fold(
            function () {
              return findCefPosition(rootNode, forward, from);
            },
            Option.some
          );
      } else {
        return findCefPosition(rootNode, forward, from);
      }
    };

    var read = function (rootNode, forward, rng) {
      var normalizedRange = CaretUtils.normalizeRange(forward ? 1 : -1, rootNode, rng);
      var from = CaretPosition.fromRangeStart(normalizedRange);

      if (forward === false && CaretUtils.isAfterContentEditableFalse(from)) {
        return Option.some(DeleteAction.remove(from.getNode(true)));
      } else if (forward && CaretUtils.isBeforeContentEditableFalse(from)) {
        return Option.some(DeleteAction.remove(from.getNode()));
      } else {
        return getContentEditableAction(rootNode, forward, from);
      }
    };

    return {
      read: read
    };
  }
);

/**
 * Bidi.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.text.Bidi',
  [
  ],
  function () {
    var strongRtl = /[\u0591-\u07FF\uFB1D-\uFDFF\uFE70-\uFEFC]/;

    var hasStrongRtl = function (text) {
      return strongRtl.test(text);
    };

    return {
      hasStrongRtl: hasStrongRtl
    };
  }
);
/**
 * InlineUtils.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.keyboard.InlineUtils',
  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Options',
    'tinymce.core.caret.CaretContainer',
    'tinymce.core.caret.CaretFinder',
    'tinymce.core.caret.CaretPosition',
    'tinymce.core.caret.CaretUtils',
    'tinymce.core.caret.CaretWalker',
    'tinymce.core.dom.DOMUtils',
    'tinymce.core.dom.NodeType',
    'tinymce.core.text.Bidi'
  ],
  function (Arr, Fun, Option, Options, CaretContainer, CaretFinder, CaretPosition, CaretUtils, CaretWalker, DOMUtils, NodeType, Bidi) {
    var isInlineTarget = function (elm) {
      return DOMUtils.DOM.is(elm, 'a[href],code');
    };

    var isRtl = function (element) {
      return DOMUtils.DOM.getStyle(element, 'direction', true) === 'rtl' || Bidi.hasStrongRtl(elem"�p�		66$��` `L0@	�k`��(.W5 GP<�-���8Aaq#�Cr�ǥ�c@\��K6	�i��U*=mF�D�1���� d<%�
��@D0���! �e��5�A�E�JR
�V�*pW�`@�I�� F@� �
@O#$�Ab��R(� J �mR@+ P�8O�	��!I ��e�[( �$��0L
HDC0 Y"ASB'*࠴A0�| !��3`H��H� !��>,1��� y�P P�`؀��� g���nU&g	��D(�X�~fIn�����b��a	&�, ���� ��!
eU�(M'�``BBj<4
Kr� s�R� �@3A���!�E�	�ų�&�@��B�8BA��$l
i�
�g�#B�/�,��聀�]�ı�� ��Q�� AÆ�%  �%)+F	�� j%`�WI`K +--6a@Ek"Ă��|F�� c�Sp ���)��$Sd� \ 1�P1Z	���!+`�_
��@�! �C�JC��vH y
Z�-��L���`�a�p�B�  	
�),�D�H��ܒ1 �VT�� bO@
F DɐP�
@v	Q8s�� H) � I����U6��� 1�:8߸����,U͂җHi_�\��-�tVE�0ծt;��!����!� �Ɍu���0�k1���:7g�C��fp����� 02�B� 4ْ+෸���Ɉ�wF��f� ,�1fh�*�p")( :z%Jh( �PY(�G��#@�,B��F���	�Ը,��
5A�q�Xh�iI�?@�	��2cd� ?\,t� �.h  0@�
H��0
J 0�z�h$ � j""�Y��P����)!J��C!�"��!������� �$0��tX�1 �%�&4�`���B�h"�"�R�`��+tЃ��1 @� Q�0��UG���`q�&@@��+��&(���K�	CZ*�d�(�
H���I�2�ڌ�0l�L��
�9�Jᙪ�Wn��@�DL�R^�Yo(�E�&`/��(�з�a@R�)(�D��� ��Jqrl��qT �q0����t8M�F��߃�|J�aJH<�T8T�j� ұH�&z�xj��`
����P � � �D� $A�(`h'
y ��Uc�m
��o
(f�SVhC�)�R
)�>$�!�C�$A��ª�[� 5	� #w\�$I���b����L)�름�.
%�c
B��OR�8���
�E@$"H 1�,3I(��("1Q�  섥�W��h� � �u7�������4����42���Ɖ&h:`��L#d=!
� ��!�7g�0!  �PP�a�$�"%�g�0U@���M�2SI!RȨ�q�]ȍ�G0��!d�K�VU��S4�$%H� 
aXT`&
@��N@Q�	)E�3� ��NL��	-@,h� @D,�܂��Yh�b"D�KO��P# $@� `
�ĥ،�!��ȣ�S& Щ�Jـ �
0t	��"�8((�r5� � (��B�Xi���
8'Aq$l�" �D�a�@C, [`а@~�i!BC0�c 5� !$h�H Br 	0 qfEe�o�M�PP� ��,�L�~��+�  ���8��P�j��Q��b�	8apPQ/���
L�PM2NP��1��b@����D"脸N4�RpJ�Q]S�p*p�tMLJ!�(� i�cs@4�*
�H�0� ��   �@��� ���&� #%L`($�S�%�#�(	�.�	� �TP%
�D��@��@Y��,��$�!�*���9��KB���UFD�1@b��a�E���KD3���Q@H�\,:�h��F�p�\H�.4$vmz+ :��'`�� N2P�r��u��ĀJa�D#��
�Y� !��D��A�s�� B'�)�!��(	D ��Ɩ�(
а	�  ��c�z�i���Sn�0��t����̦����/��?_����J
PI�
��a  �����?/o���?�'��E�v��}���_�����.����F������B~~�R�߷��p��e��7������y��Q����>����/k�z}������l���%u��|��z�o���� |j�����?��F�O�5y�U���C'68&>�wo�Mm���5����v_�_�a/�v?�]�oo|�nO�7��y�i{�n9��{o���n�>Ϗ�s�$��v�miO�ܤ?�yX�������XW���3X�)p>��k��m�;�x���;,d�-�� $ e�؁@�B*D
0� `B����̊q005_6"LAҰ2�#P��X�ҋ 
U ��`� �X�@�F� X ,�X��"M� `��p��2�@ P�H9��oh��e����{�ׁ��n��}D��Z�b]�o{���ϿG�����o��z�k�6߄g�������yy�ZTn7\�_���3�̱��#���}~������ֵ�>����������4˿w/=�����c���g����ځ���e�/�1E� � � e	��0Y v�d!0a�:8?�P!OB �<A!�JL�U�u 	R P
��Ƚ&E�t���f�����x�9b_���V^�{����3�/������\w�u��]����i��[�����~�l����p\�X���m����v�7�j�*��<��W��.~�������Җ�*w��T>'eȿ�}w�}�
 (,b�`��Do$d�v �P��H)J1I�$tE�0��LP�PЅ@`�Ę�$,��,TT ���l�p�0	� <�c�,.F�!��`�	1���D�5�	
�����^I�9�5����|��w��ߝ����X�F���f�s�3[Tc?�O��8?������^���[������T�z{�z~7��p���4�����:��]�{��蘵�nrn���ޭs�W�^ִ�������iP�Ʒ  I0 2D)	NB�@��5 Fa����E�АC �BTSkT���B����f���&��pH��DdƔ	I! &��$    �  x) �d��]�V@�P݉r	1�1��S��H������T
�Ń gI0F��x6
�` M�	�A*�UE@d�#:�C"�	H�4cĝ��@����D5�������e������T���mv�s����1���\��p6��#�w�����m���o6T�WZ����o���e�>���p���j�?��G���S���=k~~?޹w�5�b�����]6�Q5ﯼ_��������z���>o�~}�'B� ��VC d.�,�� He
 `ϴ�&������Z�9~��	G��1��m�v����8K6��˟��~��/�~~��wJ�����y���佊�!Z�/�Ӊ��F�浉%_]�?�畿�l������_��m�-���#�n��p{�^	;����'���I�N@� L C!@�8�%T� �RP F:�8XP��P�	�4�-R�Da��X�
����,�Ģ5��`����`	��$A �LT�B�H`�	�0�$��
1�JDTV�>�	�(X��A��d��D �E��	��4�"R�$��r�� �2)�GBpyU�$ H	��0IB� ��� pR���ާ�N�����Ӿ��C��ܰo���w������K��Z��λΚ�2?��oLw��n_�t�ޙ���c���F�S_o/�υu�9�-��m���?���nW7���@o�ߚ�vT��ǹd�5{�{f��<��c��� ��������
%@0�� D"@�p�	GıK8
�$F�i�D� �30�� DEઠ��D� ��"` $�	0�C 4 噐�H�>AJ�.բ*�@d  P��`�%Ƴ_r������_��~�����Vw�w:�ݟ����=���n�QxW���9�?-_?��'�W�`�_}���yY��z�^�tF�����j�v����gx����慗>�sd�z�Zv�)}]?�?�ѹ�u����������
      return Options.liftN([Traverse.prevSibling(elm), Traverse.nextSibling(elm), afterDeletePosOpt], function (prev, next, afterDeletePos) {
        var offset, prevNode = prev.dom(), nextNode = next.dom();

        if (NodeType.isText(prevNode) && NodeType.isText(nextNode)) {
          offset = prevNode.data.length;
          prevNode.appendData(nextNode.data);
          Remove.remove(next);
          Remove.remove(elm);
          if (afterDeletePos.container() === nextNode) {
            return new CaretPosition(prevNode, offset);
          } else {
            return afterDeletePos;
          }
        } else {
          Remove.remove(elm);
          return afterDeletePos;
        }
      }).orThunk(function () {
        Remove.remove(elm);
        return afterDeletePosOpt;
      });
    };

    var deleteElement = function (editor, forward, elm) {
      var afterDeletePos = findCaretPosOutsideElmAfterDelete(forward, editor.getBody(), elm.dom());
      var parentBlock = PredicateFind.ancestor(elm, Fun.curry(isBlock, editor), eqRawNode(editor.getBody()));
      var normalizedAfterDeletePos = deleteNormalized(elm, afterDeletePos);

      parentBlock.bind(paddEmptyBlock).fold(
        function () {
          setSelection(editor, forward, normalizedAfterDeletePos);
        },
        function (paddPos) {
          setSelection(editor, forward, Option.some(paddPos));
        }
      );
    };

    return {
      deleteElement: deleteElement
    };
  }
);
/**
 * CefDelete.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.delete.CefDelete',
  [
    'ephox.sugar.api.node.Element',
    'tinymce.core.caret.CaretPosition',
    'tinymce.core.caret.CaretUtils',
    'tinymce.core.delete.BlockBoundary',
    'tinymce.core.delete.CefDeleteAction',
    'tinymce.core.delete.DeleteElement',
    'tinymce.core.delete.MergeBlocks',
    'tinymce.core.dom.NodeType'
  ],
  function (Element, CaretPosition, CaretUtils, BlockBoundary, CefDeleteAction, DeleteElement, MergeBlocks, NodeType) {
    var deleteElement = function (editor, forward) {
      return function (element) {
        DeleteElement.deleteElement(editor, forward, Element.fromDom(element));
        return true;
      };
    };

    var moveToElement = function (editor, forward) {
      return function (element) {
        var pos = forward ? CaretPosition.before(element) : CaretPosition.after(element);
        editor.selection.setRng(pos.toRange());
        return true;
      };
    };

    var moveToPosition = function (editor) {
      return function (pos) {
        editor.selection.setRng(pos.toRange());
        return true;
      };
    };

    var backspaceDeleteCaret = function (editor, forward) {
      var result = CefDeleteAction.read(editor.getBody(), forward, editor.selection.getRng()).map(function (deleteAction) {
        return deleteAction.fold(
          deleteElement(editor, forward),
          moveToElement(editor, forward),
          moveToPosition(editor)
        );
      });

      return result.getOr(false);
    };

    var backspaceDeleteRange = function (editor, forward) {
      var selectedElement = editor.selection.getNode();
      if (NodeType.isContentEditableFalse(selectedElement)) {
        DeleteElement.deleteElement(editor, forward, Element.fromDom(editor.selection.getNode()));
        return true;
      } else {
        return false;
      }
    };

    var getContentEditableRoot = function (root, node) {
      while (node && node !== root) {
        if (NodeType.isContentEditableTrue(node) || NodeType.isContentEditableFalse(node)) {
          return node;
        }

        node = node.parentNode;
      }

      return null;
    };

    var paddEmptyElement = function (editor) {
      var br, ceRoot = getContentEditableRoot(editor.getBody(), editor.selection.getNode());

      if (NodeType.isContentEditableTrue(ceRoot) && editor.dom.isBlock(ceRoot) && editor.dom.isEmpty(ceRoot)) {
        br = editor.dom.create('br', { "data-mce-bogus": "1" });
        editor.dom.setHTML(ceRoot, '');
        ceRoot.appendChild(br);
        editor.selection.setRng(CaretPosition.before(br).toRange());
      }

      return true;
    };

    var backspaceDelete = function (editor, forward) {
      if (editor.selection.isCollapsed()) {
        return backspaceDeleteCaret(editor, forward);
      } else {
        return backspaceDeleteRange(editor, forward);
      }
    };

    return {
      backspaceDelete: backspaceDelete,
      paddEmptyElement: paddEmptyElement
    };
  }
);

/**
 * CaretContainerInline.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.caret.CaretContainerInline',
  [
    'ephox.katamari.api.Fun',
    'tinymce.core.dom.NodeType',
    'tinymce.core.text.Zwsp'
  ],
  function (Fun, NodeType, Zwsp) {
    var isText = NodeType.isText;

    var startsWithCaretContainer = function (node) {
      return isText(node) && node.data[0] === Zwsp.ZWSP;
    };

    var endsWithCaretContainer = function (node) {
      return isText(node) && node.data[node.data.length - 1] === Zwsp.ZWSP;
    };

    var createZwsp = function (node) {
      return node.ownerDocument.createTextNode(Zwsp.ZWSP);
    };

    var insertBefore = function (node) {
      if (isText(node.previousSibling)) {
        if (endsWithCaretContainer(node.previousSibling)) {
          return node.previousSibling;
        } else {
          node.previousSibling.appendData(Zwsp.ZWSP);
          return node.previousSibling;
        }
      } else if (isText(node)) {
        if (startsWithCaretContainer(node)) {
          return node;
        } else {
          node.insertData(0, Zwsp.ZWSP);
          return node;
        }
      } else {
        var newNode = createZwsp(node);
        node.parentNode.insertBefore(newNode, node);
        return newNode;
      }
    };

    var insertAfter = function (node) {
      if (isText(node.nextSibling)) {
        if (startsWithCaretContainer(node.nextSibling)) {
          return node.nextSibling;
        } else {
          node.nextSibling.insertData(0, Zwsp.ZWSP);
          return node.nextSibling;
        }
      } else if (isText(node)) {
        if (endsWithCaretContainer(node)) {
          return node;
        } else {
          node.appendData(Zwsp.ZWSP);
          return node;
        }
      } else {
        var newNode = createZwsp(node);
        if (node.nextSibling) {
          node.parentNode.insertBefore(newNode, node.nextSibling);
        } else {
          node.parentNode.appendChild(newNode);
        }
        return newNode;
      }
    };

    var insertInline = function (before, node) {
      return before ? insertBefore(node) : insertAfter(node);
    };

    return {
      insertInline: insertInline,
      insertInlineBefore: Fun.curry(insertInline, true),
      insertInlineAfter: Fun.curry(insertInline, false)
    };
  }
);
/**
 * CaretContainerRemove.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.caret.CaretContainerRemove',
  [
    'ephox.katamari.api.Arr',
    'tinymce.core.caret.CaretContainer',
    'tinymce.core.caret.CaretPosition',
    'tinymce.core.dom.NodeType',
    'tinymce.core.text.Zwsp',
    'tinymce.core.util.Tools'
  ],
  function (Arr, CaretContainer, CaretPosition, NodeType, Zwsp, Tools) {
    var isElement = NodeType.isElement;
    var isText = NodeType.isText;

    var removeNode = function (node) {
      var parentNode = node.parentNode;
      if (parentNode) {
        parentNode.removeChild(node);
      }
    };

    var getNodeValue = function (node) {
      try {
        return node.nodeValue;
      } catch (ex) {
        // IE sometimes produces "Invalid argument" on nodes
        return "";
      }
    };

    var setNodeValue = function (node, text) {
      if (text.length === 0) {
        removeNode(node);
      } else {
        node.nodeValue = text;
      }
    };

    var trimCount = function (text) {
      var trimmedText = Zwsp.trim(text);
      return { count: text.length - trimmedText.length, text: trimmedText };
    };

    var removeUnchanged = function (caretContainer, pos) {
      remove(caretContainer);
      return pos;
    };

    var removeTextAndReposition = function (caretContainer, pos) {
      var before = trimCount(caretContainer.data.substr(0, pos.offset()));
      var after = trimCount(caretContainer.data.substr(pos.offset()));
      var text = before.text + after.text;

      if (text.length > 0) {
        setNodeValue(caretContainer, text);
        return new CaretPosition(caretContainer, pos.offset() - before.count);
      } else {
        return pos;
      }
    };

    var removeElementAndReposition = function (caretContainer, pos) {
      var parentNode = pos.container();
      var newPosition = Arr.indexOf(parentNode.childNodes, caretContainer).map(function (index) {
        return index < pos.offset() ? new CaretPosition(parentNode, pos.offset() - 1) : pos;
      }).getOr(pos);
      remove(caretContainer);
      return newPosition;
    };

    var removeTextCaretContainer = function (caretContainer, pos) {
      return pos.container() === caretContainer ? removeTextAndReposition(caretContainer, pos) : removeUnchanged(caretContainer, pos);
    };

    var removeElementCaretContainer = function (caretContainer, pos) {
      return pos.container() === caretContainer.parentNode ? removeElementAndReposition(caretContainer, pos) : removeUnchanged(caretContainer, pos);
    };

    var removeAndReposition = function (container, pos) {
      return CaretPosition.isTextPosition(pos) ? removeTextCaretContainer(container, pos) : removeElementCaretContainer(container, pos);
    };

    var remove = function (caretContainerNode) {
      if (isElement(caretContainerNode) && CaretContainer.isCaretContainer(caretContainerNode)) {
        if (CaretContainer.hasContent(caretContainerNode)) {
          caretContainerNode.removeAttribute('data-mce-caret');
        } else {
          removeNode(caretContainerNode);
        }
      }

      if (isText(caretContainerNode)) {
        var text = Zwsp.trim(getNodeValue(caretContainerNode));
        setNodeValue(caretContainerNode, text);
      }
    };

    return {
      removeAndReposition: removeAndReposition,
      remove: remove
    };
  }
);
/**
 * BoundaryCaret.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.keyboard.BoundaryCaret',
  [
    'ephox.katamari.api.Option',
    'tinymce.core.caret.CaretContainer',
    'tinymce.core.caret.CaretContainerInline',
    'tinymce.core.caret.CaretContainerRemove',
    'tinymce.core.caret.CaretPosition',
    'tinymce.core.dom.NodeType',
    'tinymce.core.keyboard.InlineUtils'
  ],
  function (Option, CaretContainer, CaretContainerInline, CaretContainerRemove, CaretPosition, NodeType, InlineUtils) {
    var insertInlinePos = function (pos, before) {
      if (NodeType.isText(pos.container())) {
        return CaretContainerInline.insertInline(before, pos.container());
      } else {
        return CaretContainerInline.insertInline(before, pos.getNode());
      }
    };

    var isPosCaretContainer = function (pos, caret) {
      var caretNode = caret.get();
      return caretNode && pos.container() === caretNode && CaretContainer.isCaretContainerInline(caretNode);
    };

    var renderCaret = function (caret, location) {
      return location.fold(
        function (element) { // Before
          CaretContainerRemove.remove(caret.get());
          var text = CaretContainerInline.insertInlineBefore(element);
          caret.set(text);
          return Option.some(new CaretPosition(text, text.length - 1));
        },
        function (element��'��-���lÿ��ve{���������u�_������!��F�?W92o�ޗ���R����mӥ~��}_���_�5Y��ڵ�m�v�������4��������e��o`���V3��~����y���]��M^T�����k�d���d���uV��X�~��C��/�������=
��/���gg�;�����Sk��n��y�������4��M}?o|�[�}��~�����
I�h�w����}Z��{�o����h��ݫ��_����Q���o�O~M�{�M��y�X6��^�:��������3��o��������|^��{o�����f*���?�}��������w��׊��Em���P>���������{������<OGq��"�"��9Ǿ������߻�w��t�����_�������}���/���/���o�O�7�׷�{^�&����������������Z�o�����z��]��9Y����b��}���/����>]��2ޟx?o��KF�/���2������Ə�:�����O��U^����������f����O^���;��gkzw=P���7z^�|}��O*�'��W����������{_򛿭���m���`��-�7�n��Q���l����Ǐ8d��.��>=x����?׮���{]���.�m�����-���������o��_�_������7��|5Yߛ��������?�\m�!��{������Y߿}����������<�eW��yS?�'����Ǘ�<��^��ϟz��M��W[*��'���u��>�o>w�>_�o�o~�?-����7���p�3������
��}�5��VQ~�K�C�5ǘ�<t=|��?�[��#�2u  var nextPos = InlineUtils.findCaretPosition(inline, true, nPos);
        return nextPos.isNone() ? Option.some(Location.end(inline)) : Option.none();
      });
    };

    var after = function (rootNode, pos) {
      var nPos = InlineUtils.normalizeBackwards(pos);
      var scope = rescope(rootNode, nPos.container());
      return InlineUtils.findRootInline(scope, nPos).fold(
        function () {
          return InlineUtils.findCaretPosition(scope, false, nPos)
            .bind(Fun.curry(InlineUtils.findRootInline, scope))
            .map(function (inline) {
              return Location.after(inline);
            });
        },
        Option.none
      );
    };

    var isValidLocation = function (location) {
      return InlineUtils.isRtl(getElement(location)) === false;
    };

    var readLocation = function (rootNode, pos) {
      var location = LazyEvaluator.evaluateUntil([
        before,
        start,
        end,
        after
      ], [rootNode, pos]);

      return location.filter(isValidLocation);
    };

    var getElement = function (location) {
      return location.fold(
        Fun.identity, // Before
        Fun.identity, // Start
        Fun.identity, // End
        Fun.identity  // After
      );
    };

    var getName = function (location) {
      return location.fold(
        Fun.constant('before'), // Before
        Fun.constant('start'),  // Start
        Fun.constant('end'),    // End
        Fun.constant('after')   // After
      );
    };

    var outside = function (location) {
      return location.fold(
        Location.before, // Before
        Location.before, // Start
        Location.after,  // End
        Location.after   // After
      );
    };

    var inside = function (location) {
      return location.fold(
        Location.start, // Before
        Location.start, // Start
        Location.end,   // End
        Location.end    // After
      );
    };

    var isEq = function (location1, location2) {
      return getName(location1) === getName(location2) && getElement(location1) === getElement(location2);
    };

    var betweenInlines = function (forward, rootNode, from, to, location) {
      return Options.liftN([
        InlineUtils.findRootInline(rootNode, from),
        InlineUtils.findRootInline(rootNode, to)
      ], function (fromInline, toInline) {
        if (fromInline !== toInline && InlineUtils.hasSameParentBlock(rootNode, fromInline, toInline)) {
          // Force after since some browsers normalize and lean left into the closest inline
          return Location.after(forward ? fromInline : toInline);
        } else {
          return location;
        }
      }).getOr(location);
    };

    var skipNoMovement = function (fromLocation, toLocation) {
      return fromLocation.fold(
        Fun.constant(true),
        function (fromLocation) {
          return !isEq(fromLocation, toLocation);
        }
      );
    };

    var findLocationTraverse = function (forward, rootNode, fromLocation, pos) {
      var from = InlineUtils.normalizePosition(forward, pos);
      var to = InlineUtils.findCaretPosition(rootNode, forward, from).map(Fun.curry(InlineUtils.normalizePosition, forward));

      var location = to.fold(
        function () {
          return fromLocation.map(outside);
        },
        function (to) {
          return readLocation(rootNode, to)
            .map(Fun.curry(betweenInlines, forward, rootNode, from, to))
            .filter(Fun.curry(skipNoMovement, fromLocation));
        }
      );

      return location.filter(isValidLocation);
    };

    var findLocationSimple = function (forward, location) {
      if (forward) {
        return location.fold(
          Fun.compose(Option.some, Location.start), // Before -> Start
          Option.none,
          Fun.compose(Option.some, Location.after), // End -> After
          Option.none
        );
      } else {
        return location.fold(
          Option.none,
          Fun.compose(Option.some, Location.before), // Before <- Start
          Option.none,
          Fun.compose(Option.some, Location.end) // End <- After
        );
      }
    };

    var findLocation = function (forward, rootNode, pos) {
      var from = InlineUtils.normalizePosition(forward, pos);
      var fromLocation = readLocation(rootNode, from);

      return readLocation(rootNode, from).bind(Fun.curry(findLocationSimple, forward)).orThunk(function () {
        return findLocationTraverse(forward, rootNode, fromLocation, pos);
      });
    };

    return {
      readLocation: readLocation,
      prevLocation: Fun.curry(findLocation, false),
      nextLocation: Fun.curry(findLocation, true),
      getElement: getElement,
      outside: outside,
      inside: inside
    };
  }
);
define(
  'ephox.katamari.api.Cell',

  [
  ],

  function () {
    var Cell = function (initial) {
      var value = initial;

      var get = function () {
        return value;
      };

      var set = function (v) {
        value = v;
      };

      var clone = function () {
        return Cell(get());
      };

      return {
        get: get,
        set: set,
        clone: clone
      };
    };

    return Cell;
  }
);

/**
 * BoundarySelection.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.keyboard.BoundarySelection',
  [
    'ephox.katamari.api.Arr',
    'ephox.katamari.api.Cell',
    'ephox.katamari.api.Fun',
    'tinymce.core.caret.CaretContainerRemove',
    'tinymce.core.caret.CaretPosition',
    'tinymce.core.keyboard.BoundaryCaret',
    'tinymce.core.keyboard.BoundaryLocation',
    'tinymce.core.keyboard.InlineUtils'
  ],
  function (Arr, Cell, Fun, CaretContainerRemove, CaretPosition, BoundaryCaret, BoundaryLocation, InlineUtils) {
    var setCaretPosition = function (editor, pos) {
      var rng = editor.dom.createRng();
      rng.setStart(pos.container(), pos.offset());
      rng.setEnd(pos.container(), pos.offset());
      editor.selection.setRng(rng);
    };

    var isFeatureEnabled = function (editor) {
      return editor.settings.inline_boundaries !== false;
    };

    var setSelected = function (state, elm) {
      if (state) {
        elm.setAttribute('data-mce-selected', '1');
      } else {
        elm.removeAttribute('data-mce-selected', '1');
      }
    };

    var renderCaretLocation = function (editor, caret, location) {
      return BoundaryCaret.renderCaret(caret, location).map(function (pos) {
        setCaretPosition(editor, pos);
        return location;
      });
    };

    var findLocation = function (editor, caret, forward) {
      var rootNode = editor.getBody();
      var from = CaretPosition.fromRangeStart(editor.selection.getRng());
      var location = forward ? BoundaryLocation.nextLocation(rootNode, from) : BoundaryLocation.prevLocation(rootNode, from);
      return location.bind(function (location) {
        return renderCaretLocation(editor, caret, location);
      });
    };

    var toggleInlines = function (dom, elms) {
      var selectedInlines = dom.select('a[href][data-mce-selected],code[data-mce-selected]');
      var targetInlines = Arr.filter(elms, InlineUtils.isInlineTarget);
      Arr.each(Arr.difference(selectedInlines, targetInlines), Fun.curry(setSelected, false));
      Arr.each(Arr.difference(targetInlines, selectedInlines), Fun.curry(setSelected, true));
    };

    var safeRemoveCaretContainer = function (editor, caret) {
      if (editor.selection.isCollapsed() && editor.composing !== true && caret.get()) {
        var pos = CaretPosition.fromRangeStart(editor.selection.getRng());
        if (CaretPosition.isTextPosition(pos) && InlineUtils.isAtZwsp(pos) === false) {
          setCaretPosition(editor, CaretContainerRemove.removeAndReposition(caret.get(), pos));
          caret.set(null);
        }
      }
    };

    var renderInsideInlineCaret = function (editor, caret, elms) {
      if (editor.selection.isCollapsed()) {
        var inlines = Arr.filter(elms, InlineUtils.isInlineTarget);
        Arr.each(inlines, function (inline) {
          var pos = CaretPosition.fromRangeStart(editor.selection.getRng());
          BoundaryLocation.readLocation(editor.getBody(), pos).bind(function (location) {
            return renderCaretLocation(editor, caret, location);
          });
        });
      }
    };

    var move = function (editor, caret, forward) {
      return function () {
        return isFeatureEnabled(editor) ? findLocation(editor, caret, forward).isSome() : false;
      };
    };

    var setupSelectedState = function (editor) {
      var caret = new Cell(null);

      editor.on('NodeChange', function (e) {
        if (isFeatureEnabled(editor)) {
          toggleInlines(editor.dom, e.parents);
          safeRemoveCaretContainer(editor, caret);
          renderInsideInlineCaret(editor, caret, e.parents);
        }
      });

      return caret;
    };

    return {
      move: move,
      setupSelectedState: setupSelectedState,
      setCaretPosition: setCaretPosition
    };
  }
);
/**
 * InlineBoundaryDelete.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.delete.InlineBoundaryDelete',
  [
    'ephox.katamari.api.Fun',
    'ephox.katamari.api.Option',
    'ephox.katamari.api.Options',
    'ephox.sugar.api.node.Element',
    'tinymce.core.caret.CaretContainer',
    'tinymce.core.caret.CaretFinder',
    'tinymce.core.caret.CaretPosition',
    'tinymce.core.caret.CaretUtils',
    'tinymce.core.delete.DeleteElement',
    'tinymce.core.keyboard.BoundaryCaret',
    'tinymce.core.keyboard.BoundaryLocation',
    'tinymce.core.keyboard.BoundarySelection',
    'tinymce.core.keyboard.InlineUtils'
  ],
  function (
    Fun, Option, Options, Element, CaretContainer, CaretFinder, CaretPosition, CaretUtils, DeleteElement, BoundaryCaret, BoundaryLocation, BoundarySelection,
    InlineUtils
  ) {
    var isFeatureEnabled = function (editor) {
      return editor.settings.inline_boundaries !== false;
    };

    var rangeFromPositions = function (from, to) {
      var range = document.createRange();

      range.setStart(from.container(), from.offset());
      range.setEnd(to.container(), to.offset());

      return range;
    };

    // Checks for delete at <code>|a</code> when there is only one item left except the zwsp caret container nodes
    var hasOnlyTwoOrLessPositionsLeft = function (elm) {
      return Options.liftN([
        InlineUtils.findCaretPositionIn(elm, true),
        InlineUtils.findCaretPositionIn(elm, false)
      ], function (firstPos, lastPos) {
        var normalizedFirstPos = InlineUtils.normalizePosition(true, firstPos);
        var normalizedLastPos = InlineUtils.normalizePosition(false, lastPos);

        return InlineUtils.findCaretPosition(elm, true, normalizedFirstPos).map(function (pos) {
          return pos.isEqual(normalizedLastPos);
        }).getOr(true);
      }).getOr(true);
    };

    var setCaretLocation = function (editor, caret) {
      return function (location) {
        return BoundaryCaret.renderCaret(caret, location).map(function (pos) {
          BoundarySelection.setCaretPosition(editor, pos);
          return true;
        }).getOr(false);
      };
    };

    var deleteFromTo = function (editor, caret, from, to) {
      var rootNode = editor.getBody();

      editor.undoManager.ignore(function () {
        editor.selection.setRng(rangeFromPositions(from, to));
        editor.execCommand('Delete');

        BoundaryLocation.readLocation(rootNode, CaretPosition.fromRangeStart(editor.selection.getRng()))
          .map(BoundaryLocation.inside)
          .map(setCaretLocation(editor, caret));
      });

      editor.nodeChanged();
    };

    var rescope = function (rootNode, node) {
      var parentBlock = CaretUtils.getParentBlock(node, rootNode);
      return parentBlock ? parentBlock : rootNode;
    };

    var backspaceDeleteCollapsed = function (editor, caret, forward, from) {
      var rootNode = rescope(editoI�`�\�Oe�rX�>����kW���{�??��1��Ļ�i��뻰U�v7/����O����ux�v�^�>�M��Yf]_�6��������D�t����d��������TǗ����<���n�s|�o~,O!Bh��SB/�G$�1 !�D��C�9D�BC~� �B�%� D$ SU:�D^&��e��D$ p�z�!d�)l�ё�8��1��:N���L*擑F�Aá�
"�A$ " ��*� r�L*$�>�����$  ��@  k�p�E�-��
�ԬixQ�nd�`D<,AtrV�a!8DB����*��;��� 0��B��A �����X��,�&���W��~>��ӛ�w�v�Y��<ￆ�Ϲ���z�\�����r_��[>}�c���\7���۫+��Sjy���O2������s5���������qs������xso_��������mϙu�WU��N�8�/�^��� K)�C� %��u��,$�1@�X� N�v�A&I$ZJ v�
�$
����h�@�呅�NPQ�:�&@"�� ��P}"!�@�"�r����TG��H������c޾�����#���-����oO�r���_���Gn������+����.�Uv�t�n��~�r?w?������9����]�x8���x&Z���y�������=?�$|�板sR��7�׫؜�7����k�^O/ۨ��y������I�����?
( !�
�B! C ��@�M@ �3��X���O�T�2DL����l�8���
R����Ӆ��}��|_���2�������v?b�k�}p޳���
��v���X�٫'G���g?\�ڮ�q�Uκ����_�W}?�����_zn?!�?k��{�q��ۮG�7���ɦ��:��oݫ�vZ�{��.e��,4q �����h�(Q0��ga)#( Dfվ�JX�p���B� ��Q,�@�!�`!B@��D�2�Əs�������6�^�H��&@��T�H ���`46J4i�B@� 
:PN2;Y��
	����R�H/��~_tߌ��y��*?��\��}�k����D����{ݐ���~�����;Wm.4MO�^)���=c��{?M=�����ƴ7�^YX��u����٥ۗ4����z�����U�޽�m�q � ��D@AK �!�c�8�BH��h0De@�S@ �b�i�  �4!{�%	m�V��Lp�!)�P� Z- )���!��8���B��(*�#�@�%�!,d@L��� �a"�5_m�Z9�߇��ǿ;��՞�L}���P�Ʈ�y���y4Q7א��7�[�s��_�9�U�ɞb�:k_ʖ���~?��������{]������{��S��"������N�эn��_�]ت����zڍ3uJSM2��������]aOsO
C�v�`�LH)��iT �E�@F1(�B"��A'�"P�P@%o��� �C� ��@p�v-tZ�%��4"p?tDr��e�^�� ��
� Z��~�����*ɿo�s.�?^�]��6=��sM�����M;�orv����w/�^��E��������?���{C>����w���I^�՛5��{���l�.u���[���S����7߶��^������o���̊-2s0�)T1� p(�I�P
B�� F��
U�@ʰ�\�
(��D)d�6AQ$.`�
�� P�<@@	!H��@��B�����0@�H ��y"1PV@ H t ���H��KAwe5�u�~v�����v}�O�s�a��7���z%~����w����~�O_g��4��#���X�?��s/3�W����w��Yj$k5Pqӱ�(���Q36l�=������0�x�Wd�8N.���e����%��l�
$
�iX�$@��<"�6��詺.۱��n���N��w����{K���mli�k�����~�~���&ه���S_��/�&�%;�������g�����[��(�7��on_�̎џ3	>/9�z�c\�(�4�]B۹g����~��� *��K�W�LY?�^W��{}��M��������"�]��å�7_��M~cV��'����u^]��v��9)
��ËQ��Z)�'����m-�֪��ݑ�״��M�VZ���?�Ԏ��5�=~���_�zSOQ/��^��5S��0&!x  CUE1 (�P�G�xH �e����ЊE0yQ�DR	Da��/���X � 0
a ,�r XK�paĘ 8�.W@
  B`		@�,$ a%
 Aо�DJEπ�RO)t��D�S؁���
��h��@0_����y��CT@I҈�r7�/>脉o�;��sC7���f��e�{�S�=j���w]�0)���?-�������T�"�'*��}���$�<n�;�~U��{�r�F��[��E�4��w����u_C�_c�Ǌ��}���������=䵺&b�������s�&�I��/��Ϸ�߻ðn����S���u�m��_|�D>��n�a�k�[?�71��_t�}��O~5/E�O�������D�U�?�y������5��
�K=�}���C�� R`b>9\p<*hnCf D_�Zo:
BT C(�"vJ`l�("��- �\�&���	 �#(Y.t�n1��d
��$ P��RX��B�$'�U��)i����2���R��8T�؎^����~����uy��2�7��{�}���U�v�K4��������
ݲyo�?�:���<����ޭ�rZ�s澵�?J��W���m�T����V���4�+�5�j�������zW�"�a����2����?�(FF C ���pDV0 C!h�� 2��LĢS��^�Ā  CH�����Y(7IH���h�� 
j��q��D��S� �	b� �� T>�@K�
2lk�16h] ?P $@�
�� �R��$@"���@@�h� )���r � "� &� ��B�@62ZX�0 ��� DE0A �
rM�0~�W�������߫�|���K���wW�s��\����p���<7}t�������/�쿪�?@����"�G���i��fם���������tW����o��ߩ���˓��'�j�m�;Z�V%���Cg9�����j�w��&!_� B�)P	�	�H��	A&E� ��*	0$KB�H@�� 
�B4�@i���K�Ј``A��AIa����	d�X
`�D�� ��@DEA��BҘ*�A�C Y����)
���T�:$N�C0��(B	!)9 �6B(HA!p
V�
	�J�l�d) �,�#����0�@�J�~z�]���gu��7I�O�rߩܨ~����7+�p�������G#��BWb�?_�|��x����_j�P�,/���?1��'��ϟ�1�?��?�fgs�}N��ߞY��Kpx�^��˲�UV]�+�%�`�.9PL�RWgR6- �������"� @ �X�`Vga�H����	$� ��81�	q�3E���<�$���@� !h& 6l�"$D�@�@����0UK�1 5�xV�ã@�� `  �Z��g5�q�j��E��	�~�gZ�ۨ~�O��1�}��$�m�į�]�r�G��^�}^����	�~�������u�{v/��r}���>H6s�{�Ӗ�,�m�}�9��'��_�Y�����}������G�������)���m5�����f�:ܟM�ͦ�G�w��z��i���������/'����ç_i�ݗ�y�ͯ�H��7�n����$����_�?�ڕuuz�{����٧��_���l����������� Q>B��� ���!@�J ��U��ʓe4��� �\G@�`�P�� ���@
��(�OKM@�� ��(B�q��2A�	K��4�0�@��@<DD���0C�ֈ�2��s_�/f�疏Mtm��}�Ow���u�Z��\�'���.ޗ�a�����NB��՟Vպ�iAOo�/�&g��%�b���㿵�;��V6�k�����n�忹[�p��2��I�j�ӝ�rW�:��kCD5����5B�S��(�Td {#�@l�!@�`�6B@R QC ��$1x�@� !-U �(��Y�f���  �@p�
��� �I �H�h� p�p
��!2,
H|�0L$<��J p��͠� ��� �� ���3P&"�ABmB�EB (��sf�� ���@0��0 �	� �Jn�� �� U� ��+@bi�b���~��{����9W�ԞȞ�Wg�m����s���L�=ϟ�cjw�������i���j�;M8t�;sc�݋�V�\z����M���V��Sv�Fr��_��F-V�)�=�V���_�y{K�)~�9B�
p�#� J�Y2C B���`Cp��A�V�@�`�Ф$�E���D�J��-F��%	�5N)4�5�% ���5X@Yv0���Ct�`0Xô� xh� ���`n� tVpf�x��o�g��̅~�����	�����V����t�����K��_ݒZ�O�fo���������v�$�D���f�߮����k�������v''K���$��%���A�~�|�omg�׮l[cw��iThW0:]+jޞW����̫�Ý��m�ڞ���K�����s9���������3�ķ���m�wr[w����yt.�-���[�YR���W�,��u_�.Ӗ+��2��7>}��������}v�֋�G:����@R�& . ,P� ��H�G�a� ��Cր��آ���
�R�  J 
$�@@\�N�� � ���  D� �q �
�@�K�`�,��%$		�#�t$�a:(�X�Iс0�؊RE�`"#�$ ��x
�&f�a�pSBY"`�D��z���� @ X"��j[�P��� �< " 	N�P��nv$s Sm�
�i�!���1�
��Ad�Z��m�-������ҟ��������������X�2}����.�m���"����{���v����~)�O�4c����_Y�yթ�v��?G��p��o������k?J�旷�{�mW}��g�.�0HY�O	lR@�ԙ��.�,`�J-K
_F!��jNPb=�Pu2F���%q � \D*�aL`���2o���������p%ǃn	 V!�! o�D$G,�	)dV�$< ��A�8qbu
�At
��pD@D�b 5�P$
�Dn1<��!*;�Ɗ�D�����	H �u��A�%DVK�	
  ! ��)�W@ h"(���*E�R�)�GA�"Ja�q&PAA|eNH�A�B9�|eM� °J���h��.��CD% (��%�P
��A��?�A��`' �4���[  $"x�I� � �M 1�Q�^��d % �`	�PI��@$�@��
,�N�  fDh �U��J9�˄C��9!dˀA��6@	
n�B�J� @0�D�� _x�f�* �AR ���r���T8%aB�,�� F���z �\jdX�!��P�a�M�=:� l��`@"����O�$A�R%)I��� s��z Ej	�P�@�	@��ЗW��F=@*	����&p�NȀ�b��`k�0Ă ��<�C)��u:�5J�=Q��
��)_�6+r7��Č D��
��POE�"(��A�Di=��� �	L��p�0�&^��CP`�����0�&
 ��I�@wP`r L@@0��� � �TP��&p�IA�e�5K�+�$����[� 	��)�CG$��0 �~�̠ns	5 ��  1D��`�!��T@��[#����X^	��p�<$�Z>���'k��1�9$�
$��v��Hŗ�Rchl
��2�ͅ7aɳ�	␒РI�`$,�%@�r& ZR� ,�	 �ԂX쉔 �D�5�T��d���0�Ԁ����
@��0XX@tb�2��jE � tB@H��HX�AI� I��>A9H�ˏ���U#d&�lI��`�!� 4�K�%�E�lD0�F�B�^��`�EjB�h��� b�%�%�!q�AÃ@)j��I7 (�(Q0�&p` )"s��%A�T�R2��"b wP
I9����d�ћsEZ��Y攮1d&�|����mD �^$
�@�u�Oy�����@�GH�I�� �
 $ �  �pV�Bp�BEQ�!��� ��1���sv���p�8@�a�,l�D�āP��JG#v�DQ�z�ьB55T�0�BP҆�����M@�x%�Ө@�@"�{L
��\�C��X�C�"Hu$�%������N���FD���
��SIxu  
X��
�dؒ�$�k �
�D,�xA��� ��eD�n ����MB�$0  H���
� T��"CR �΃��a�P	�8 �GT  �
JH"t��L<"�꒣�&Ĵ���8��'���
�p��8*
���"��D ��l5I��1�u�����p�3!�*���Z`�	h� b&� �@P
EH����D������N"B Q!Ȁ���31�$`#`LH�d�I�E� Y�P)�!� �ҁ#�Ir��  �� Ѐ8#�	�(�F��P-B
���0$�TC$��V���p���? c4�"� ���)����<5���� z
�PC:*@B�������Q����PpH@���iG0�
�����3߉&��A�����h��P@�Ԑ
qƵ�:�}Ȑ"��C�Dh�� �@   �
 ��@!Ă �'�P	���f;@u �8�:Tk��J-�7Sb�*��p 
"����$`��0Q ���p�/�4R�H$�\wAr��A�$xh� ��e4º`�zIw*5�����(��#�16��Ĺ��	D� �P��C�A�(��&cD�%)mq"IH�� �I*�K���f�`A "�6O(����u@���XP�.�%H�!C�͠�@�$�"F#��� ""�`���$�bN$� �\ R��� ���F`$���l " X 0�H`0 � ���]	� 9�@PDu! �3A��1" �$=��Q(ÁS ��(��D � D��%���,@��.�H� �B=� pQ���p�PƼ��>0N�@� �D��"����2��0b0�8\�0t`�l-�G�"��e��
`P���J�V��E�l� 6!���)0��K��
z=�Sg<�D�)�N���:���o��KD$��~�{�%у�E4�@D@�``�
I�	%d�C$!��"�0 �hU(���L� &�D
� `AɀZ
���M�������1�YS@��[z52� �9�#`mp�	�� C,P�v 8Z��� cMA:���3(�W�Y��@�by.fX ���g�Á�BX%U۳@��QI2�"�,a�GZ��'��ȃ�N�>��
0��ьmd-��4��!˧c�E`�AC(n��C�̄�", [ż���\�
0'xܼb`�Az4�
��Q�v �L\4d�M�3ЀCI�DH �$kp�����  Ev�	s�NP�`CN`p��g �QA�BpP� (Br䋐@�$a�@���D� RPp�8	�Y�&�
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * Handles inserts of contents into the editor instance.
 *
 * @class tinymce.InsertContent
 * @private
 */
define(
  'tinymce.core.InsertContent',
  [
    'tinymce.core.caret.CaretPosition',
    'tinymce.core.caret.CaretWalker',
    'tinymce.core.dom.ElementUtils',
    'tinymce.core.dom.NodeType',
    'tinymce.core.dom.RangeNormalizer',
    'tinymce.core.Env',
    'tinymce.core.html.Serializer',
    'tinymce.core.InsertList',
    'tinymce.core.util.Tools'
  ],
  function (CaretPosition, CaretWalker, ElementUtils, NodeType, RangeNormalizer, Env, Serializer, InsertList, Tools) {
    var isTableCell = NodeType.matchNodeNames('td th');

    var validInsertion = function (editor, value, parentNode) {
      // Should never insert content into bogus elements, since these can
      // be resize handles or similar
      if (parentNode.getAttribute('data-mce-bogus') === 'all') {
        parentNode.parentNode.insertBefore(editor.dom.createFragment(value), parentNode);
      } else {
        // Check if parent is empty or only has one BR element then set the innerHTML of that parent
        var node = parentNode.firstChild;
        var node2 = parentNode.lastChild;
        if (!node || (node === node2 && node.nodeName === 'BR')) {///
          editor.dom.setHTML(parentNode, value);
        } else {
          editor.selection.setContent(value);
        }
      }
    };

    var insertHtmlAtCaret = function (editor, value, details) {
      var parser, serializer, parentNode, rootNode, fragment, args;
      var marker, rng, node, node2, bookmarkHtml, merge;
      var textInlineElements = editor.schema.getTextInlineElements();
      var selection = editor.selection, dom = editor.dom;

      function trimOrPaddLeftRight(html) {
        var rng, container, offset;

        rng = selection.getRng(true);
        container = rng.startContainer;
        offset = rng.startOffset;

        function hasSiblingText(siblingName) {
          return container[siblingName] && container[siblingName].nodeType == 3;
        }

        if (container.nodeType == 3) {
          if (offset > 0) {
            html = html.replace(/^&nbsp;/, ' ');
          } else if (!hasSiblingText('previousSibling')) {
            html = html.replace(/^ /, '&nbsp;');
          }

          if (offset < container.length) {
            html = html.replace(/&nbsp;(<br>|)$/, ' ');
          } else if (!hasSiblingText('nextSibling')) {
            html = html.replace(/(&nbsp;| )(<br>|)$/, '&nbsp;');
          }
        }

        return html;
      }

      // Removes &nbsp; from a [b] c -> a &nbsp;c -> a c
      function trimNbspAfterDeleteAndPaddValue() {
        var rng, container, offset;

        rng = selection.getRng(true);
        container = rng.startContainer;
        offset = rng.startOffset;

        if (container.nodeType == 3 && rng.collapsed) {
          if (container.data[offset] === '\u00a0') {
            container.deleteData(offset, 1);

            if (!/[\u00a0| ]$/.test(value)) {
              value += ' ';
            }
          } else if (container.data[offset - 1] === '\u00a0') {
            container.deleteData(offset - 1, 1);

            if (!/[\u00a0| ]$/.test(value)) {
              value = ' ' + value;
            }
          }
        }
      }

      function reduceInlineTextElements() {
        if (merge) {
          var root = editor.getBody(), elementUtils = new ElementUtils(dom);

          Tools.each(dom.select('*[data-mce-fragment]'), function (node) {
            for (var testNode = node.parentNode; testNode && testNode != root; testNode = testNode.parentNode) {
              if (textInlineElements[node.nodeName.toLowerCase()] && elementUtils.compare(testNode, node)) {
                dom.remove(node, true);
              }
            }
          });
        }
      }

      function markFragmentElements(fragment) {
        var node = fragment;

        while ((node = node.walk())) {
          if (node.type === 1) {
            node.attr('data-mce-fragment', '1');
          }
        }
      }

      function umarkFragmentElements(elm) {
        Tools.each(elm.getElementsByTagName('*'), function (elm) {
          elm.removeAttribute('data-mce-fragment');
        });
      }

      function isPartOfFragment(node) {
        return !!node.getAttribute('data-mce-fragment');
      }

      function canHaveChildren(node) {
        return node && !editor.schema.getShortEndedElements()[node.nodeName];
      }

      function moveSelectionToMarker(marker) {
        var parentEditableFalseElm, parentBlock, nextRng;

        function getContentEditableFalseParent(node) {
          var root = editor.getBody();

          for (; node && node !== root; node = node.parentNode) {
            if (editor.dom.getContentEditable(node) === 'false') {
              return node;
            }
          }

          return null;
        }

        if (!marker) {
          return;
        }

        selection.scrollIntoView(marker);

        // If marker is in cE=false then move selection to that element instead
        parentEditableFalseElm = getContentEditableFalseParent(marker);
        if (parentEditableFalseElm) {
          dom.remove(marker);
          selection.select(parentEditableFalseElm);
          return;
        }

        // Move selection before marker and remove it
        rng = dom.createRng();

        // If previous sibling is a text node set the selection to the end of that node
        node = marker.previousSibling;
        if (node && node.nodeType == 3) {
          rng.setStart(node, node.nodeValue.length);

          // TODO: Why can't we normalize on IE
          if (!Env.ie) {
            node2 = marker.nextSibling;
            if (node2 && node2.nodeType == 3) {
              node.appendData(node2.data);
              node2.parentNode.removeChild(node2);
            }
          }
        } else {
          // If the previous sibling isn't a text node or doesn't exist set the selection before the marker node
          rng.setStartBefore(marker);
          rng.setEndBefore(marker);
        }

        function findNextCaretRng(rng) {
          var caretPos = CaretPosition.fromRangeStart(rng);
          var caretWalker = new CaretWalker(editor.getBody());

          caretPos = caretWalker.next(caretPos);
          if (caretPos) {
            return caretPos.toRange();
          }
        }

        // Remove the marker node and set the new range
        parentBlock = dom.getParent(marker, dom.isBlock);
        dom.remove(marker);

        if (parentBlock && dom.isEmpty(parentBlock)) {
          editor.$(parentBlock).empty();

          rng.setStart(parentBlock, 0);
          rng.setEnd(parentBlock, 0);

          if (!isTableCell(parentBlock) && !isPartOfFragment(parentBlock) && (nextRng = findNextCaretRng(rng))) {
            rng = nextRng;
            dom.remove(parentBlock);
          } else {
            dom.add(parentBlock, dom.create('br', { 'data-mce-bogus': '1' }));
          }
        }

        selection.setRng(rng);
      }

      // Check for whitespace before/after value
      if (/^ | $/.test(value)) {
        value = trimOrPaddLeftRight(value);
      }

      // Setup parser and serializer
      parser = editor.parser;
      merge = details.merge;

      serializer = new Serializer({
        validate: editor.settings.validate
      }, editor.schema);
      bookmarkHtml = '<span id="mce_marker" data-mce-type="bookmark">&#xFEFF;&#x200B;</span>';

      // Run beforeSetContent handlers on the HTML to be inserted
      args = { content: value, format: 'html', selection: true };
      editor.fire('BeforeSetContent', args);
      value = args.content;

      // Add caret at end of contents if it's missing
      if (value.indexOf('{$caret}') == -1) {
        value += '{$caret}';
      }

      // Replace the caret marker with a span bookmark element
      value = value.replace(/\{\$caret\}/, bookmarkHtml);

      // If selection is at <body>|<p></p> then move it into <body><p>|</p>
      rng = selection.getRng();
      var caretElement = rng.startContainer || (rng.parentElement ? rng.parentElement() : null);
      var body = editor.getBody();
      if (caretElement === body && selection.isCollapsed()) {
        if (dom.isBlock(body.firstChild) && canHaveChildren(body.firstChild) && dom.isEmpty(body.firstChild)) {
          rng = dom.createRng();
          rng.setStart(body.firstChild, 0);
          rng.setEnd(body.firstChild, 0);
          selection.setRng(rng);
        }
      }

      // Insert node maker where we will insert the new HTML and get it's parent
      if (!selection.isCollapsed()) {
        // Fix for #2595 seems that delete removes one extra character on
        // WebKit for some odd reason if you double click select a word
        editor.selection.setRng(RangeNormalizer.normalize(editor.selection.getRng()));
        editor.getDoc().execCommand('Delete', false, null);
        trimNbspAfterDeleteAndPaddValue();
      }

      parentNode = selection.getNode();

      // Parse the fragment within the context of the parent node
      var parserArgs = { context: parentNode.nodeName.toLowerCase(), data: details.data };
      fragment = parser.parse(value, parserArgs);

      // Custom handling of lists
      if (details.paste === true && InsertList.isListFragment(fragment) && InsertList.isParentBlockLi(dom, parentNode)) {
        rng = InsertList.insertAtCaret(serializer, dom, editor.selection.getRng(true), fragment);
        editor.selection.setRng(rng);
        editor.fire('SetContent', args);
        return;
      }

      markFragmentElements(fragment);

      // Move the caret to a more suitable location
      node = fragment.lastChild;
      if (node.attr('id') == 'mce_marker') {
        marker = node;

        for (node = node.prev; node; node = node.walk(true)) {
          if (node.type == 3 || !dom.isBlock(node.name)) {
            if (editor.schema.isValidChild(node.parent.name, 'span')) {
              node.parent.insert(marker, node, node.name === 'br');
            }
            break;
          }
        }
      }

      editor._selectionOverrides.showBlockCaretContainer(parentNode);

      // If parser says valid we can insert the contents into that parent
      if (!parserArgs.invalid) {
        value = serializer.serialize(fragment);
        validInsertion(editor, value, parentNode);
      } else {
        // If the fragment was invalid within that context then we need
        // to parse and process the parent it's inserted into

        // Insert bookmark node and get the parent
        selection.setContent(bookmarkHtml);
        parentNode = selection.getNode();
        rootNode = editor.getBody();

        // Opera will return the document node when selection is in root
        if (parentNode.nodeType == 9) {
          parentNode = node = rootNode;
        } else {
          node = parentNode;
        }

        // Find the ancestor just before the root element
        while (node !== rootNode) {
          parentNode = node;
          node = node.parentNode;
        }

        // Get the outer/inner HTML depending on if we are in the root and parser and serialize that
        value = parentNode == rootNode ? rootNode.innerHTML : dom.getOuterHTML(parentNode);
        value = serializer.serialize(
          parser.parse(
            // Need to replace by using a function since $ in the contents would otherwise be a problem
            value.replace(/<span (id="mce_marker"|id=mce_marker).+?<\/span>/i, function () {
              return serializer.serialize(fragment);
            })
          )
        );

        // Set the inner/outer HTML depending on if we are in the root or not
        if (parentNode == rootNode) {
          dom.setHTML(rootNode, value);
        } else {
          dom.setOuterHTML(parentNode, value);
        }
      }

      reduceInlineTextElements();
      moveSelectionToMarker(dom.get('mce_marker'));
      umarkFragmentElements(editor.getBody());
      editor.fire('SetContent', args);
      editor.addVisual();
    };

    var processValue = function (value) {
      var details;

      if (typeof value !== 'string') {
        details = Tools.extend({
          paste: value.paste,
          data: {
            paste: value.paste
          }
        }, value);

        return {
          content: value.content,
          details: details
        };
      }

      return {
        content: value,
        details: {}
      };
    };

    var insertAtCaret = function (editor, value) {
      var result = processValue(value);
      insertHtmlAtCaret(editor, result.content, result.details);
    };

    return {
      insertAtCaret: insertAtCaret
    };
  }
);
/**
 * EditorCommands.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class enables you to add custom editor commands and it contains
 * overrides for native browser commands to address various bugs and issues.
 *
 * @class tinymce.EditorCommands
 */
define(
  'tinymce.core.EditorCommands',
  [
    'tinymce.core.delete.DeleteCommands',
    'tinymce.core.dom.NodeType',
    'tinymce.core.dom.RangeUtils',
    'tinymce.core.dom.TreeWalker',
    'tinymce.core.Env',
    'tinymce.core.InsertContent',
    'tinymce.core.util.Tools'
  ],
  function (DeleteCommands, NodeType, RangeUtils, TreeWalker, Env, InsertContent, Tools) {
    // Added for compression purposes
    var each = Tools.each, extend = Tools.extend;
    var map = Tools.map, inArray = Tools.inArray, explode = Tools.explode;
    var isOldIE = Env.ie && Env.ie < 11;
    var TRUE = true, FALSE = false;

    return function (editor) {
      var dom, selection, formatter,
        commands = { state: {}, exec: {}, value: {} },
        settings = editor.settings,
        bookmark;

      editor.on('PreInit', function () {
        dom = editor.dom;
        selection = editor.selection;
        settings = editor.settings;
        formatter = editor.formatter;
      });

      /**
       * Executes the specified command.
       *
       * @method execCommand
       * @param {String} command Command to execute.
       * @param {Boolean} ui Optional user interface state.
       * @param {Object} value Optional value for command.
       * @param {Object} args Optional extra arguments to the execCommand.
       * @return {Boolean} true/false if the command was found or not.
       */
      function execCommand(command, ui, value, args) {
        var func, customCommand, state = 0;

        if (editor.removed) {
          return;
        }

        if (!/^(mceAddUndoLevel|mceEndUndoLevel|mceBeginUndoLevel|mceRepaint)$/.test(command) && (!args || !args.skip_focus)) {
          editor.focus();
        }

        args = editor.fire('BeforeExecCommand', { command: command, ui: ui, value: value });
        if (args.isDefaultPrevented()) {
          return false;
        }

        customCommand = command.toLowerCase();
        if ((func = commands.exec[customCommand])) {
          func(customCommand, ui, value);
          editor.fire('ExecCommand', { command: command, ui: ui, value: value });
          return true;
        }

        // Plugin commands
        each(editor.plugins, function (p) {
          if (p.execCommand && p.execCommand(command, ui, value)) {
            editor.fire('ExecCommand', { command: command, ui: ui, value: value });
            state = true;
            return false;
          }
        });

        if (state) {
          return state;
        }

        // Theme commands
        if (editor.theme && editor.theme.execCommand && editor.theme.execCommand(command, ui, value)) {
          editor.fire('ExecCommand', { command: command, ui: ui, value: value });
          return true;
        }

        // Browser commands
        try {
          state = editor.getDoc().execCommand(command, ui, value);
        } catch (ex) {
          // Ignore old IE errors
        }

        if (state) {
          editor.fire('ExecCommand', { command: command, ui: ui, value: value });
          return true;
        }

        return false;
      }

      /**
       * Queries the current state for a coa��H��`����   �   L���_���   1ҹL��M����_��� 1�A L��M����`��H���  �x�r  H�� �   L���:_��L��z����   �   �   L���L������� �   A�j`��L��� � F`��L��� 1�A�%`��H���x��   H�������   �   L���^��L�������   �   ��^��L�������   �   �   A�   L���_��L�� �   �   A�   L���_��L�� �   1�A�   L���t_��L�������   �   1   L���S_��H���;   �����H���  �x�����L������1��   �   L������L��M��� ^��L������1��   �   A�   L��M����^��L������1��   �     L��M���J^�  r~L������1��    L���]��L��1��   �     L���|^��L�� ��    A�   L���[^��L��
���1��    A�L���]���    �   L��M���]���   �    A�   L�� ^   �      L��e]��H������H���.���L�������   �   �   H������H���\��L����   �    A�   H����� �   �      H���[��
�   �[�����}W~UH��AWAVATSA��I��I�_�{1 ��   I�H�x��h  % 8  1�=   ��=    �   E��XW��I��M��to��h  L��L������H�C@H�x袝
 H��蚁��A��L���a��L��L���7���H�C@H�x��h  L���A	 �xL���W��1�������������[A\A^A_]�UH��AWAVSPH��L�{L��*  I�GP��	  �   L���|U9~H��.  I�GX��	  �   �H�CH� H��   �H(H��0 1��p�9�tH��H��H��v���HA�NH�H�@I�FI�H��[A^A_]�UH�勇:  �FH��*  H��2  H�NH�1�]�UH��F��H�H�NH��2  H��*  1�]�UH��� �  r
��ʀA�*   
`
@ ��
��
,���4  �;���;]�:   S��A��   �ɉ����A��H��0���D�a���
  �"  ��  �@   ��  ������)�A��L��������G   A�    L�����b��fE��tA��H�������    H��H��u�L�������G   1�A�    L��H��������a���=�@  ��  1�L���O  �  �"  ��  �@   L���� �#  ��  ��   ��    L���� �#  ��  �@   L���ܸ �   �   L����L����ĸ �'  ��  1�L��谸 A���  A���   ��= @  �� �= �  ��   ��tA���  �P���rA���   ��  E����  A���M  A��D��H���D��0����  % 8  =   t��=   �  �"  ��  �    L���
� �#  ��  �   L���� �   �   L����L������ٷ ��   ��   L����  ����   A���  �P�����   �&  ��  L����藷 �"  ��  ��   L��耷 �#  ��  �@   L���i� �   �   L����L������O� �'  ��  1�L���;� ��   ��   L�����'� �   �   ��  ��=�?  D��H���D��0���wA��  ��tA�G ��	t	����  ��   ��   L����L������ɶ �   � 	  ��  A�G ��t	����   A��@   Zb��   �"  ��  ��   �   A�Ͼ&  ��  L��@���L���f� �"  ��  ��   L���O� �#  ��  �@   L���8� �   �   L����L������� �'  ��  1�L���
� ��   ��   L������� �   � 
  �  �"  ��  �    L���е �#  ��  �@   L��蹵 �   �   L����L���衵 A�G ��D��H���D��0���t��ugA��@   ZbuZA���  % �  =   uF�"  ��  �@   L���M� �#  ��  ��   L���6� �   �   L����L����� �'  ��  1�L���
� A���  = �  r3��   ��   L����L������� �   �   L�����ʹ �   A�O ��t	f�	 ��u1�A��@   Zb����	�؉����Ⱥ�   L��D��L���D��聴 ���˺   L��D���k� �5��   �p   L����L������O� �   �   L�����;� D��H���D��0���A� ��������?������о!  L���� A��z  A��� �  � @  L���� A�G ��
   ���~�$  �   �   H��觱 �$  H���î f��t-�?KL �   �ʖ�~�$  H��@���螮 ��r���f��uؾ$  L��脮 ���  �$  L���o� f��t-�?KL �   �v��~�$  H��@����J� ��r���f��uؾ$  H��@����,� �tH�����H���  �HJ�
   �'��~A�M��G   �   A�    H��@���H��L�������j[���G   �   A�    H��D��L��P����H[��H�����H���  �xDu��P���H��@����   ������H������H�������w ��P���H������H�������^ ������fD;�H���u��������+������������+�����H��@����   9о�  Mƿ ���9�A����AN�9�M�9�ANȉ���
��=  u��� ��d   �ԓ�~��<����)  �   L���w� �$  �   �   L���`� �$  L���|� f��t)�?KL �   胓�~�$  L���[� ��r���f��uܾ$  L���A� ���  �$  L���,� f��t)�?KL �   �3��~�$  L���� ��r���f��uܾ$  L���� �tH�����H���  �HJL�������A�*u6A���   t,A���  =�?  wA���  ����sL����<����;���A�G&=�  t��=  �'  H�������H   �   1�A�    L��I����W���%�  �������i��� Hi���QH��5H��P���L������1�H��L���&� �����A��<   ��)���A���  �� �  r,A���   A���  ��   ��1Ɂ�   ��   �  A���  ��   ��   H�����H���  H���K  AǇp     I��x  H��t"A��t   uAƇt  �$  L���g� f�L�5i�4 H���4 1�L��H��贔��1�L��H���3Q���   L����   ��H�����H���  ��   ��   H���   ����������Ɂ�   ��   H�w, �H�����H���  H����   AǄ$p     I��$x  H��t$A��$t   uAƄ$t  �$  L��蓨 f�L�5��4 H���4 1�L��H�������1�L��H���_P���   L���� �  H��1��Q��   uH� S�  �  �  �����������j������j����������������n������������������������������������꪿��Y��������ꪪ��������������f����������������j�f���������������������ꪪ���jj��j�����������������������j����������������������������^_�]�������������������������wW�i����������������jv, �H�����H���$H�5Sv, �1��H�����H���  ��   uH���H��A�_$�����A��  A)�A�A�E1�I�G8���   D��se�x  L��輧 �Á���  ����%�  �� �  =�   fFؾy  L��莧 ���D��)����Ⱦy  ��� �?� A�_$A����A9��{���H��5 H� H;E���  H��8  [A\A]A^A_]�% 8  =   �S  ��=   D��H���D���  �"  ��  �   �é �#  ��  �@   ��   �   �   L����L�����蕩 ��   ��  ���   �  ���m� A���  % 8  =   D��H���D��0����t  ���"  ��  =   ��  �    L���"� �#  ��  �@   �L����"��  ���  ��  �   L����  �   L����L������ƨ ��   ��   L����貨 �   � 
  ������"  ��@   L���  ��   L���u� �   �   L����L������L����&  ��   D�  ��  �@   L���-� �#  ��  ��   L���� �   �   L����L�������� �'  ��   L���� ��   ��   L�������"  ��  �@   L���#   ��   �������   L��蛧  �   ������tS~UH��AWAVAUATSPE��H�M�I��I��H����  胤 A��A��u� �   H���:� �   �   A��t0�c   A�   H��M��A��uO�O���   �   �s   ��   �g   A H��M���aO���   �   �wM���   �<O���   �   �s   A�   H��M���O�   �g     H��M����N�   �w     H���N��A��tD�    �k   A�H��L�}�M���N��� �{ H��M���N��A��u"��  �   1�H��H��[A\A]A^A_]��� H��[A\A]A^A_]�UH��AWAVAUATSH��8A��I��H�|�? �  t#A��L�=I�4 1�L�����8����J���   L���� H��A��H�
A��
 9	�)��	���p�0�@ C�@-��ba�3z#�� �`%� ���'��b(�!�T=2�f�
 c�>!�"9P�  B�CAb!�	�$( �(1�@(	I��+�#*� Q2�E!dh+C�$�6.v�Pd����TNt"@� �rNV��Đ0fT��)) ���@dp\p	�T_0hJ�! A��ՀDa.TbU$TCC�@V�)D�"+�"
��a�H ��H�"�'��!$�E!�*�V`Q�	�(��X�� l�XLP$�|$2��(�L(�#�4��3�5 ��B)�B@! !b(��JS	Њ2pO��	 H H�[�-H�@��q�D �B2��	e[�SP�ӈF)�"�f����E���!��F�u��Rd�P!�
q09@D�6 �x�
G�o��
 � �D�~h�`�� �V�
m-�� ·%��� � _^�<H8��
 1��@�B���U`��A�N�Ig��)b�2��-%$�	A�V�/�b9�����N� ���P�U�d�,YP  ��P �c$4@I�~ 3
��s����q�D3���h�/��(2� ;�
�x@/# H4ϛ$�AX�� 2E
���b� ����b ��DԒ@�@�������.F�Q�D�jv �	Xha�i�%�0=�b�2�A�d�q �+yb�8 Q�<�dB�3�@�@ <��P�V,(�]X. 2P,TrJ'`92H�.�Ԣ���Ô#tiE����8DBt�%�g�'��"%�D
̰�YN�@�V �@D (D 	�$c�3�m��Ơ$�������@��/��P?L( t��Y HA�&N�3�����hh�9B����+d�����̝��2PF(�2Q�6`��)�Q�i�,  t�$NP�p��
AiNɉ�	 K x�]ӗ�r��8Rp0�b̠06�B)��.�B.@-g�z����Dcxd�Mi�"�	�64�
 ��$6-�`=��5 �L9	��4&"�1 $1�a�,�wh�A嘚 "R��!A �� oP��C��@Є����u��C����.�[S��&"�a OI��1�@	�6����f1$�!���@
��"	�F! If
`
�e�Z�  ��K\1��d���|�7*M��M�� �� �_ �J�@�DE�t(B�>�h���P�
�$���� !ih
��9�	D`e& � �:Y@:(	1��
!�P��� ��� #�ԷAg+��Cr�QSCwG00� )	�m��ϏX�k����A�?��c��9RG��>X�0@$a#i	�ҒpU�"P���d-.^�! [hz��d?�
0%:<q7���@2�Q��끢 ����"`�x��)1KV@��  ���I�P-0$ ��\�*^�@ 9@�/�1�b���7
�5)�p�(��r- `uy5N��$ I��6 0<C(
!bI	)�I�p@h��A :*C`��㉁��aȁ�HE�V&і�(�f\G�B�"%5c�Bqh���� P�B TD	��D�"S(0B6��f��1R@J�K�<�0	��D"e䘑�h��@X0V*�"��^� �5B���@�$/�����
�)��r 1@" ]e���Q�#g���u��88EJT¥�-�j�1Ԙ&<q'�r6�>�3ЙE�"c���0�������8��?�a�#� D�%�� ��zA=k0���/��g  q�(
� ��a�<!��HӂJ�
�l�8�(��t� H�
p��8�'��bl�c0����vWLU�TrĈ���L L Mh AS��5e�-:Q$L�)6@"�mFP�� �����D�@4�� �G"3�����`���X�@B �h 
�|�d�TQ!���Ab�܀�@T9D'I�_8��P�pBh. x
0�.f;�
��c F*A\�h
�j -�����(2�:s&#�c��1
 �ah4'(�Fh�Q^� �@KN�i .�\;�
 BU"�
�PZ��� V"2��O�a�� Hb�t��x@ ؤ��4*� ��)���{*����AO��73�
Ι@���D�f́��D�����R�8&�����$c 2a#��؂�Y� aI��FD4�A
                  dom.setStyle(element, indentStyleName, value);
                }
              }
            });
          } else {
            execNativeCommand(command);
          }
        },

        mceRepaint: function () {
        },

        InsertHorizontalRule: function () {
          editor.execCommand('mceInsertContent', false, '<hr />');
        },

        mceToggleVisualAid: function () {
          editor.hasVisual = !editor.hasVisual;
          editor.addVisual();
        },

        mceReplaceContent: function (command, ui, value) {
          editor.execCommand('mceInsertContent', false, value.replace(/\{\$selection\}/g, selection.getContent({ format: 'text' })));
        },

        mceInsertLink: function (command, ui, value) {
          var anchor;

          if (typeof value == 'string') {
            value = { href: value };
          }

          anchor = dom.getParent(selection.getNode(), 'a');

          // Spaces are never valid in URLs and it's a very common mistake for people to make so we fix it here.
          value.href = value.href.replace(' ', '%20');

          // Remove existing links if there could be child links or that the href isn't specified
          if (!anchor || !value.href) {
            formatter.remove('link');
          }

          // Apply new link to selection
          if (value.href) {
            formatter.apply('link', value, anchor);
          }
        },

        selectAll: function () {
          var root = dom.getRoot(), rng;

          if (selection.getRng().setStart) {
            var editingHost = dom.getParent(selection.getStart(), NodeType.isContentEditableTrue);
            if (editingHost) {
              rng = dom.createRng();
              rng.selectNodeContents(editingHost);
              selection.setRng(rng);
            }
          } else {
            // IE will render it's own root level block elements and sometimes
            // even put font elements in them when the user starts typing. So we need to
            // move the selection to a more suitable element from this:
            // <body>|<p></p></body> to this: <body><p>|</p></body>
            rng = selection.getRng();
            if (!rng.item) {
              rng.moveToElementText(root);
              rng.select();
            }
          }
        },

        "delete": function () {
          DeleteCommands.deleteCommand(editor);
        },

        "forwardDelete": function () {
          DeleteCommands.forwardDeleteCommand(editor);
        },

        mceNewDocument: function () {
          editor.setContent('');
        },

        InsertLineBreak: function (command, ui, value) {
          // We load the current event in from EnterKey.js when appropriate to heed
          // certain event-specific variations such as ctrl-enter in a list
          var evt = value;
          var brElm, extraBr, marker;
          var rng = selection.getRng(true);
          new RangeUtils(dom).normalize(rng);

          var offset = rng.startOffset;
          var container = rng.startContainer;

          // Resolve node index
          if (container.nodeType == 1 && container.hasChildNodes()) {
            var isAfterLastNodeInContainer = offset > container.childNodes.length - 1;

            container = container.childNodes[Math.min(offset, container.childNodes.length - 1)] || container;
            if (isAfterLastNodeInContainer && container.nodeType == 3) {
              offset = container.nodeValue.length;
            } else {
              offset = 0;
            }
          }

          var parentBlock = dom.getParent(container, dom.isBlock);
          var parentBlockName = parentBlock ? parentBlock.nodeName.toUpperCase() : ''; // IE < 9 & HTML5
          var containerBlock = parentBlock ? dom.getParent(parentBlock.parentNode, dom.isBlock) : null;
          var containerBlockName = containerBlock ? containerBlock.nodeName.toUpperCase() : ''; // IE < 9 & HTML5

          // Enter inside block contained within a LI then split or insert before/after LI
          var isControlKey = evt && evt.ctrlKey;
          if (containerBlockName == 'LI' && !isControlKey) {
            parentBlock = containerBlock;
            parentBlockName = containerBlockName;
          }

          // Walks the parent block to the right and look for BR elements
          function hasRightSideContent() {
            var walker = new TreeWalker(container, parentBlock), node;
            var nonEmptyElementsMap = editor.schema.getNonEmptyElements();

            while ((node = walker.next())) {
              if (nonEmptyElementsMap[node.nodeName.toLowerCase()] || node.length > 0) {
                return true;
              }
            }
          }

          if (container && container.nodeType == 3 && offset >= container.nodeValue.length) {
            // Insert extra BR element at the end block elements
            if (!isOldIE && !hasRightSideContent()) {
              brElm = dom.create('br');
              rng.insertNode(brElm);
              rng.setStartAfter(brElm);
              rng.setEndAfter(brElm);
              extraBr = true;
            }
          }

          brElm = dom.create('br');
          rng.insertNode(brElm);

          // Rendering modes below IE8 doesn't display BR elements in PRE unless we have a \n before it
          var documentMode = dom.doc.documentMode;
          if (isOldIE && parentBlockName == 'PRE' && (!documentMode || documentMode < 8)) {
            brElm.parentNode.insertBefore(dom.doc.createTextNode('\r'), brElm);
          }

          // Insert temp marker and scroll to that
          marker = dom.create('span', {}, '&nbsp;');
          brElm.parentNode.insertBefore(marker, brElm);
          selection.scrollIntoView(marker);
          dom.remove(marker);

          if (!extraBr) {
            rng.setStartAfter(brElm);
            rng.setEndAfter(brElm);
          } else {
            rng.setStartBefore(brElm);
            rng.setEndBefore(brElm);
          }

          selection.setRng(rng);
          editor.undoManager.add();

          return TRUE;
        }
      });

      // Add queryCommandState overrides
      addCommands({
        // Override justify commands
        'JustifyLeft,JustifyCenter,JustifyRight,JustifyFull': function (command) {
          var name = 'align' + command.substring(7);
          var nodes = selection.isCollapsed() ? [dom.getParent(selection.getNode(), dom.isBlock)] : selection.getSelectedBlocks();
          var matches = map(nodes, function (node) {
            return !!formatter.matchNode(node, name);
          });
          return inArray(matches, TRUE) !== -1;
        },

        'Bold,Italic,Underline,Strikethrough,Superscript,Subscript': function (command) {
          return isFormatMatch(command);
        },

        mceBlockQuote: function () {
          return isFormatMatch('blockquote');
        },

        Outdent: function () {
          var node;

          if (settings.inline_styles) {
            if ((node = dom.getParent(selection.getStart(), dom.isBlock)) && parseInt(node.style.paddingLeft, 10) > 0) {
              return TRUE;
            }

            if ((node = dom.getParent(selection.getEnd(), dom.isBlock)) && parseInt(node.style.paddingLeft, 10) > 0) {
              return TRUE;
            }
          }

          return (
            queryCommandState('InsertUnorderedList') ||
            queryCommandState('InsertOrderedList') ||
            (!settings.inline_styles && !!dom.getParent(selection.getNode(), 'BLOCKQUOTE'))
          );
        },

        'InsertUnorderedList,InsertOrderedList': function (command) {
          var list = dom.getParent(selection.getNode(), 'ul,ol');

          return list &&
            (
              command === 'insertunorderedlist' && list.tagName === 'UL' ||
              command === 'insertorderedlist' && list.tagName === 'OL'
            );
        }
      }, 'state');

      // Add queryCommandValue overrides
      addCommands({
        'FontSize,FontName': function (command) {
          var value = 0, parent;

          if ((parent = dom.getParent(selectio��_XrU����/SE��}��E��C�����bwU�|�=�މ������g������������~�;߯��l����A�`���ך�tBz�"�}�joW�0����&1����_�
�������+m�=ࢇǇ�\��[.Q��ֹ9���U����ӭX��������?���_����t�^g��_�m��x��,�{�~�m���?�_��h�����Y��������ߛ����w���?��7�~�����V�-��3�����������~�w��w8�����#P��|�oxW���̵y"��_?����~���gg׭{�~�����J���������w3�������S�_�7����m��������k{���?=}�����z����z��I�&��ƭ�_��4g�>�ސ�����/�W������+�nwV������7~��3۶�i�>�o��1�Oߵ%�o�Y�_u�պνnC��˯G}#�w��~;�\�7g`/>^���M��uo���j����������e�Vϩؙ��粵�kO��߾o���_�����i�������|��}�G���4�kJ�E��i}��u5�l����'�<�w�S��?u���Nk߽o��W��������Y��a�޽yxs�*��N��o���k������?�ݹ[}��sY�}��Oџ��+��}�����o���u�?�_\��_������N���߷�_ݼ���������񿾋k��/�z�b��w�{q��ч.��3U�/_mku2�͟��ˣ����2TR����ڜը=�����/��ᙗ�I���
�)�w���_��~^�.��M�Q�ǯ}.�]��J��ٽ�>Ϲt��O�?�?o]{������A��}o��h��{k�З��[�������z%��r��+�ĻsO�k�����3�eX?�b���Z[�8����^N�W߫M]�x�C���:�6�����?�����
��C}���fZ�������r�����������9������������>uo��e��S�~������~p�]��I#���6��B�>��^�ewޯ�u�v������&�ޫ��_�����׏�<ͯ���^��S��-J��l���i�N�t���뿗�G����G��{�n���W!�{;�����/�g~�=�b��w�o�������:���}1��>�>�o�ޅ���k����]pܣJ����[~�_�ٟ�]��w߯���
�3w�yV�oV��g-VL��_׮s��m�ֶ��K���������o���O�}�7}֯�?���p����W�����.mw����
f%�V٭:����>�~η���F=�7���.�{z���z����Wu�~��������:���u�;�vO�O�ug6�t?=���v������$ȣO?�p�������f����~��ZM�������%��;�������ԟy����M[��_�a�Oo]�w��1���������&x���g�z$��-��W�d����N�p��z��Nӗ���������N��է�	�y�ޣ������l��/�'Wؼ�m�^�����O�K��>Ȳ�i��=��a]�����Կ~���k��W�c+|����־�t��+��_����s�������Uz,��G/��3���}O�}��۱�/]��msw����������絿Oo=�7���~���}�����7ѷ��~�m��n��������_1'����}�o x߿K�^��$�_�7��(�ڏCM�O�-w���s�r��^d~����0W��{9z��O��U��Ȟ����K�D�[���qǿ͟ѽ;��w?�LG{���Q��~�~���#ǹ3��|��U�ͷY8����?��n��:���7��瘭��&����]����~��.���O�������W�ʿsW�����Ê�o��.����q�[��}m�����}���ʯ���>�?�>͇s�����������n����u��cߝ�i��׫Ͽ~�������Y����X��!��רn�������;�.�=��������?�tjO�{?���}����ߓ�W�Ļ7��jS!sMWi�W���=���Z�Z��\i�6��G�o�d�L�Cs��,���Wq[�_�5���_�U��u�z�Wܷ{�ب�{�k�����|g�7�^����-������S�{;��a���w���
�{Ǽ>Co�����A���wٱkc��M������lC�vO����ﰓk-o�Cy�^��z9v�����l���������_����p��{J'�}0��/��)lם�W����v:|���t����~����k&�[z�����:��o򚧊̎<��7ٚ�Z���/�����-"Zn�7�aZw;��O���W������w{��,�v�n�4��|���������[ +ʿ�~���f��?������_�������/�Ͽd�=۞
              breakPoint = i + 1;
              break;
            }
          }
        }

        if (base.length < items.length) {
          for (i = 0, l = items.length; i < l; i++) {
            if (i >= base.length || base[i] != items[i]) {
              breakPoint = i + 1;
              break;
            }
          }
        }

        if (breakPoint === 1) {
          return path;
        }

        for (i = 0, l = base.length - (breakPoint - 1); i < l; i++) {
          out += "../";
        }

        for (i = breakPoint - 1, l = items.length; i < l; i++) {
          if (i != breakPoint - 1) {
            out += "/" + items[i];
          } else {
            out += items[i];
          }
        }

        return out;
      },

      /**
       * Converts a relative path into a absolute path.
       *
       * @method toAbsPath
       * @param {String} base Base point to convert the path from.
       * @param {String} path Relative path to convert into an absolute path.
       */
      toAbsPath: function (base, path) {
        var i, nb = 0, o = [], tr, outPath;

        // Split paths
        tr = /\/$/.test(path) ? '/' : '';
        base = base.split('/');
        path = path.split('/');

        // Remove empty chunks
        each(base, function (k) {
          if (k) {
            o.push(k);
          }
        });

        base = o;

        // Merge relURLParts chunks
        for (i = path.length - 1, o = []; i >= 0; i--) {
          // Ignore empty or .
          if (path[i].length === 0 || path[i] === ".") {
            continue;
          }

          // Is parent
          if (path[i] === '..') {
            nb++;
            continue;
          }

          // Move up
          if (nb > 0) {
            nb--;
            continue;
          }

          o.push(path[i]);
        }

        i = base.length - nb;

        // If /a/b/c or /
        if (i <= 0) {
          outPath = o.reverse().join('/');
        } else {
          outPath = base.slice(0, i).join('/') + '/' + o.reverse().join('/');
        }

        // Add front / if it's needed
        if (outPath.indexOf('/') !== 0) {
          outPath = '/' + outPath;
        }

        // Add traling / if it's needed
        if (tr && outPath.lastIndexOf('/') !== outPath.length - 1) {
          outPath += tr;
        }

        return outPath;
      },

      /**
       * Returns the full URI of the internal structure.
       *
       * @method getURI
       * @param {Boolean} noProtoHost Optional no host and protocol part. Defaults to false.
       */
      getURI: function (noProtoHost) {
        var s, self = this;

        // Rebuild source
        if (!self.source || noProtoHost) {
          s = '';

          if (!noProtoHost) {
            if (self.protocol) {
              s += self.protocol + '://';
            } else {
              s += '//';
            }

            if (self.userInfo) {
              s += self.userInfo + '@';
            }

            if (self.host) {
              s += self.host;
            }

            if (self.port) {
              s += ':' + self.port;
            }
          }

          if (self.path) {
            s += self.path;
          }

          if (self.query) {
            s += '?' + self.query;
          }

          if (self.anchor) {
            s += '#' + self.anchor;
          }

          self.source = s;
        }

        return self.source;
      }
    };

    URI.parseDataUri = function (uri) {
      var type, matches;

      uri = decodeURIComponent(uri).split(',');

      matches = /data:([^;]+)/.exec(uri[0]);
      if (matches) {
        type = matches[1];
      }

      return {
        type: type,
        data: uri[1]
      };
    };

    URI.getDocumentBaseUrl = function (loc) {
      var baseUrl;

      // Pass applewebdata:// and other non web protocols though
      if (loc.protocol.indexOf('http') !== 0 && loc.protocol !== 'file:') {
        baseUrl = loc.href;
      } else {
        baseUrl = loc.protocol + '//' + loc.host + loc.pathname;
      }

      if (/^[^:]+:\/\/\/?[^\/]+\//.test(baseUrl)) {
        baseUrl = baseUrl.replace(/[\?#].*$/, '').replace(/[\/\\][^\/]+$/, '');

        if (!/[\/\\]$/.test(baseUrl)) {
          baseUrl += '/';
        }
      }

      return baseUrl;
    };

    return URI;
  }
);

/**
 * Class.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This utilitiy class is used for easier inheritance.
 *
 * Features:
 * * Exposed super functions: this._super();
 * * Mixins
 * * Dummy functions
 * * Property functions: var value = object.value(); and object.value(newValue);
 * * Static functions
 * * Defaults settings
 */
define(
  'tinymce.core.util.Class',
  [
    "tinymce.core.util.Tools"
  ],
  function (Tools) {
    var each = Tools.each, extend = Tools.extend;

    var extendClass, initializing;

    function Class() {
    }

    // Provides classical inheritance, based on code made by John Resig
    Class.extend = extendClass = function (prop) {
      var self = this, _super = self.prototype, prototype, name, member;

      // The dummy class constructor
      function Class() {
        var i, mixins, mixin, self = this;

        // All construction is actually done in the init method
        if (!initializing) {
          // Run class constuctor
          if (self.init) {
            self.init.apply(self, arguments);
          }

          // Run mixin constructors
          mixins = self.Mixins;
          if (mixins) {
            i = mixins.length;
            while (i--) {
              mixin = mixins[i];
              if (mixin.init) {
                mixin.init.apply(self, arguments);
              }
            }
          }
        }
      }

      // Dummy function, needs to be extended in order to provide functionality
      function dummy() {
        return this;
      }

      // Creates a overloaded method for the class
      // this enables you to use this._super(); to call the super function
      function createMethod(name, fn) {
        return function () {
          var self = this, tmp = self._super, ret;

          self._super = _super[name];
          ret = fn.apply(self, arguments);
          self._super = tmp;

          return ret;
        };
      }

      // Instantiate a base class (but only create the instance,
      // don't run the init constructor)
      initializing = true;

      /*eslint new-cap:0 */
      prototype = new self();
      initializing = false;

      // Add mixins
      if (prop.Mixins) {
        each(prop.Mixins, function (mixin) {
          for (var name in mixin) {
            if (name !== "init") {
              prop[name] = mixin[name];
            }
          }
        });

        if (_super.Mixins) {
          prop.Mixins = _super.Mixins.concat(prop.Mixins);
        }
      }

      // Generate dummy methods
      if (prop.Methods) {
        each(prop.Methods.split(','), function (name) {
          prop[name] = dummy;
        });
      }

      // Generate property methods
      if (prop.Properties) {
        each(prop.Properties.split(','), function (name) {
          var fieldName = '_' + name;

          prop[name] = function (value) {
            var self = this, undef;

            // Set value
            if (value !== undef) {
              self[fieldName] = value;

              return self;
            }

            // Get value
            return self[fieldName];
          };
        });
      }

      // Static functions
      if (prop.Statics) {
        each(prop.Statics, function (func, name) {
          Class[name] = func;
        });
      }

      // Default settings
      if (prop.Defaults && _super.Defaults) {
        prop.Defaults = extend({}, _super.Defaults, prop.Defaults);
      }

      // Copy the properties over onto the new prototype
      for (name in prop) {
        member = prop[name];

        if (typeof member == "function" && _super[name]) {
          prototype[name] = crem������M��7>���z��՟����}zO���}������殟&�H�~��~j{�5�������Ҙy{{;����x����۾5{����O�vkTP������[�o���ݵEM��ݘ/Z�5��{{�̐b�"
�-t6!Q����@��ڃ�0:�P�2(04QދX��Ќ�A��8D ��x�!�J���J֧�" �!��w*`r.h�BBx���t(vI�@ �PɀEJ��V%�  �;[�mZ��x�5�A�)0	dT�LE���� Nd2^(Oa/�..QWLg0�P"5[,�A �"��N)B
B^�( 
�u��H	�P�	�R4��x#K�|�W�����n����}�|>3*4�_��]�������{�[����m����7݋=��_y������m�.��{{=7ÿ���}/�n�\����̴my���t����{vߺ6.K��3���?���(��k������/^�� �eF�
 �$i"�~ڈ�D0$ P@��=@:0��Z ,�V	U�8p�KJb(��>=q�j��������^�������J��������������,���U�=���}	w��g������~�s��^�_���O�3��Ի?�<�%�rv�OS���%~߳�t{���������ͮ���ɮ��w���{ڛ�|�{�W��|;���M���v�6����=�������2��[����7��(X�������&���V�O���n��?��ߩ�}��~;�SeS��%�f��+�:}�=�#Yz������O�Z��y�Χ�(��H� 9�%XR�&L@f�	�!e���6E�Hx�&P��8(�( �;0X>�=�BrB�x,S�7	G�0�pf��F ��+ߚ�#fvSdpB^��U=��JY�#F D��&�:������_�omw�˻�^����?�#����}�ῼ�.�����.n���v�5�z��ܲr��>�����}x�<?���}�nY)���ǎ~���5���(��������Z��~���e��+�����:/����=�E0��0��C63���B�u��4 EUN�5
p"��H!j	�@�
��6
Vt۞-��P�|qʀ��HV�"`��S
..@k
F7�h)��N��"�V���<��' &8.6�r& *
 -t�B�j!��׿?nU�������ռ[����f�od�{��v��������g�G�����g���e�kwG�?�7]����7�V�;_USEC��n����������k���5���ׅ����~�9�o�?��M���W����;����C���@�sS�GY�YD¡�S6a4���J�Jvd����Q*D0 ��åѡ�
4�@���������@
�J0D����g�X% B#��N �W�P$�P��^8� �\�f=��	 �o�$PeP: �4TH�8�@@ 
D��h�A�=��¢$Qez�
j|I���BF���`�
�2|�HD�6B�B ���#D 4+ Q@Ť�!� C�6'Q"���2���*�u�D�p�X�%��4�K$��"p�gO>+@AM�AE
���f�ݍ�ޝ��z����m���[���_���?�?���������Y�'�\����w�Qc;k?���~�;;�����u�u��>}Wt������׷[ݷ��ۯ����u?��?�WS���������w����ur�y����n���͌�_�>߿�η����Vߵ����6�����-����O~����8��ys����<�c?���o��Gߛ���U%����瞾�}뉽�;���m5�ٷ�O����~�i��G��e
�L��1SD0�w� @!/h���IK���eB	h��1�~DQ�`�!0d0CX�T�iu�n@Q�B �p*�DYl ��s�c��@B� K/�V�ȆQ@� ���
���Sgia�����B�B"F B��^�A*�GNsd��@b;��*�5�1�X`l2A�% 
D�GD[ "kQ��ֈ�DX5GUX�B�^�|��
���x@=	
bԊ({��>C���[���g�˓�۟��<��lܿ;�������m��<�������^��p=U���t�ʝ��������5m�sV�#���������[�[����G����k3������f������˿y���{�����������߿��[�U��������kg���K�hh;��?�i�_�S������%<�^ܯ���(;���X�����58n��G����]K��֭�����������w-�~��k��}����%���z��0���N�l��ndh
Hx�` B\	4�6`(T�0��5b��LDQT��&��
�<�Ҳ
�\�*-���
{t�-����! ���
 @
X�=bD+� �� �Q1�0(,�T(	i"�!:4qE*2Hb�M4J"�3O��u!�Y;�@W�
3(�A8� �(�&B# !`��1C��U
�yvV�)�I��  z�5�K/v��B�	���	L@&�63 )���l���Ja�*Ā0�X%J�+��At�Sv@uH\�7�B
X��=�#6X����@�T�`�0� S�R�"MK
 ��B�*�X�@+�M��B6�֨䠠@E �� (B($@2A� ��h)b�  @��e�XXATńP��	�� �Q�P�B� �/�8b�@0$�`B � pH0r��D� �D�2�V�� ���-�p��)I�-O�K+A5�Ą�!)k ��E�"�+D�
�ኈ��Ht9��b�Cd�A<�p�h
A/��� +AF�b0rd`b���zF"N��
X�I"W��1�kՋ�(D ��&.�b ���,��!�P#jv �X�% DQ(@S  �z��bD54A�ID|U�@&TvHJ0FN��kFJ22)�|#D� ��ȉ� }(�����b*��f@q�����I�M@֤ZBٔ� p *�`2몈C��0 B1�� h12�0�0���hF���$���f0"(���DA�`b�`1�"k$�M!�Dw��+�v�@$X#H��ē�54�K�G<ά���`
����� a4P��\ ` �r �8b&��H����ae
f	Ѩ!�Ǒ����n.P��` �*M� �4�$��o !"PZ�GC
���(��8��L� ��K	P�DF ��*QD�Q ��a �6�

*�P�ޕ`��
"
<Z�"2�,JԬSxF Ci�H�)�f 2 {�pȭ D�����V JH�$��A�p��F5�3@B(Fj�@�O��"�@#p��,h���CD(�� E""�XD?��1��A� ANP0�J���t$b��Rw�5������G2$��$�� �`�4	T^BL�����D���棞�f%@@B"�G%Z� ㍨4�@�$^(�](buA�ڔ,�6Q!�S1	��`a � @ A� $
�@4�,�Q�H`U�&�$ʹ���Ƽ�)D"�`���I#pL�%�b�,�n��./�������V4��]"o��--�sK qB<�	@�W�C�
�@@EK�R� !��$5�.P� F)	F8T	 �3�(��W�&�d�hTB �R��*�U���@��z�'���!�PPB�p��)[J� Q`�)�3g�'K���tT�(d	� 89�`�^ ��B� ��54,@\YW͏�\�U� �
�	q(s!�� �!"(��p٧�6�N¨b ,C�JB C�(���7(L��*1�))�@2!132`�V6�vT�)s�`�@� )
T5�,f8�� Ё �>S$�@�C x�Hq�P���mZ0�.!h`+������(R���96��Tw��1��� Cd�rf���"��2�*pvD0����;��!�$:/+�l�G�((D*��¤Ԇ	�Y��M�pQC�VQD� $���U� �/P*��X�!��@`���v �M�bV�ĸ��$� c(���	P7R��� =@��[(���Q@�s��@�\@.b���VX�-2�C��ȏ��/ �������CH,)}- � dL�`��Hq�(��K����R�z�'�-v���
�%�WB" 
�C� � � @�� (	� l�IH#d)! � b9$@��7C,�  B��"� ���W.\c-�(s%v(�)�K�T�ǆ�a ���G	�H��(�	�<�1�e��FHn��,@���%$*��������̰d@��L @�*1q*��FJQd�$���8c��`_U�3AL0�!2݂:��i�p� F��D%�8YE  �� \��$��c���(�f�A~1 ���(IbD��+��8JL�	J�,�	d3z�־�`�"��IM4	�Q�"V�6�A*P���� �A��H� 	 �E��W\`�c�I���@� �ÆR	`����x I ,�HM����E�|"CA�� �B^x$@�$�(�,�ADr� b�:t| �2�9 �TK@B�b�ޠ���dt})	�HR�g�"f�%�����4Ƕ$QC ��U�P�@ *�&��	T+�� IǕqI�8c�>WJ������@@56P�-�5B@!� ��W@����(	�A�� �*� �m�t��(P$:R) ���X) c� �A8Qd�F0E�H	!��	� �
`)I��fF��ލ y=86�$ �`Na�@P"�0��I�+� K �
��K� 8j��RD0�!�7�vp- �ce��rZ��d*�e����2�\@�C�����F*�G*d	���CyB�X<�PHc�Skf�!5��US"�
IpD���$��� ڈN��;��PFBa
gB�"�
w?] ����/� �8,HE�mx
 �TE�n8�d�6��	$ )�Xֵ�%@Lp�&���Q{IR��
��EĠ5,K* ��ŀ ������h%�Fƍ�4�{
 F	�*,�SҀ��T
D��`�Ⱘ (��|�����%K#�@�%!�@�����D�PP&Q2T�Ѐ�	@&��X,�TD�IA \�F�"������ �(ղ��3Z8�щJ��Bǅ��1�HSL� 6 C"�x\f'Lch���	��u� ��9� �g� �$##� �� �r�@" H�/�a���B���	` �c4� � 
~�EH�р�M� �P�!�d �tH$N@A�Jh�{��`Ċ
[����WE�GzhYrIH9
�Q8
�E � 08
 
�q�
P���&��xa"�z�f�uB�AJ��[��(!M`8C	��~�A�A:
2	�n��AO*��l4�/"�90�!�I��H�4��a<�h�!A�*����# B�uJ@T�
�OLr ��9���ji(Yf���TDT*$"�n��� L� $��8K�x��@�rU
dn��BE� ZR�r8�QA<2��9��#��1�X�
 5/`Zp(�Pc��X;0�@�h��iQ!� l� �\I;��dx`qi@�f�Å�c)X�9xC0�X�("�<(5A B`,0FF"�����襆gM t0#�bRr�L�T�&8��@Bd	���	��p_
��   Bjd�eBN�(,�8 h�� T�d a
a�
"\�W���icE��0(!��b@D(��D�9�@kU��YY��Ġ	!eC�  
@��$%"�"�a ᭡�) �8zV
� ���
�) l���@@�Ij�A�,�p!0eGHD��:  �Q@T`BLD�h0 $@�m�� "$��]Cy�f��h0Ȥ�@G�
8(!(	`� �(��0����� ($"  �U ��(��"E.��I H���`����=�b.��t�$ h��T=
���AXtH!D*`qv�C8`  ʴ��"�[�8
��
�|Dr"����� a
`
\��WV�=��Vu��vҰ�7�)(�^8t^"* �iBN�2��z! �*ũV�1'~�	- �Dl^Y�ݿpY��
��*2 f�D@D��
*�4�@!��Eh�s��`:H�k�0���«`�j�D &�A���LI�0<@'F"z��>Y�	��F1K����!����PfD�ɀ1U�`R^%��� t�)��F@@�`=
� 2��dD�2 ��� $ � � L1H��@�0	��[ ��P$[F
%��� � I�C҉�b@�Cp�$C,a  [��1H @$��Q"Ă��:z���J��G�§�	�i��,JM
�ED��O�3tP$ `Pw�C�
�@R�2Z@!
��sZ�,{)#\X��$\�	���J$%����PH��HA�i 	�S�U� �@Yi<�
Ck #��
p����Y�&$F�Bx�� T�H�5
��W�(>Zb >�X)�Ry�� �,�y8f� �%% Pck	��1~G�u�C��A@Q/Q� �	r���$����t8,{� �H`�j
01OKZp
0��	�*��Y
��� �C�A�C��ՙ	��� C�T� ����`"��	�ɁB�����D!)B�0
4 ��D��!`( !vHH8 fK�&T*�%<�� ����@�L�A���#" ��T�%�(Ɔ�1��DI�L�Sd4��"��sW@h�DX � %E4$���1��,�r2����)A
+ �q
5h�b�C %�cS �°@KAc�
0��Q�4 *�PSj`�W�Vd$V%'6�S׍��B�dl3�A����|K�0�.l�4�ؖ �$�T�A>+�R�@A4  ĉ
Bڂ��ePA+bFPs
�	�$���T�-�ꈁ@x8�ø�)�HPu	�H�)8"�^2 �  �� � �ub��d�� &$ ��aΓ���L*��*��d�$P� `�`4@BP P
r� ƅ@� �! d����)��0��1�U"u�7VJ�ٗip'��H5)�cQgF��H%x��'U"T	��{
�D�lB0J  ��(%�6pD�@AG�KL$f W�B-rG�Yi8  �'d�.�`TG`�
��F��|�F��]?�}��0�S�$�Ey��C����� $iI�*Q�(�b (1 �H4!@$���G S�����q$�fÀ� ʑ��
0R)1�T�	,@@��#�$��
2Bt,�� ��5	�A�:@ �9�.8�
M]�&�/B$�(
       * instance.off('event');
       *
       * // Unbind all events
       * instance.off();
       */
      off: function (name, callback) {
        return getEventDispatcher(this).off(name, callback);
      },

      /**
       * Bind the event callback and once it fires the callback is removed. Consult the
       * <a href="/docs/advanced/events">event reference</a> for more details on each event.
       *
       * @method once
       * @param {String} name Name of the event to bind.
       * @param {callback} callback Callback to bind only once.
       * @return {Object} Current class instance.
       */
      once: function (name, callback) {
        return getEventDispatcher(this).once(name, callback);
      },

      /**
       * Returns true/false if the object has a event of the specified name.
       *
       * @method hasEventListeners
       * @param {String} name Name of the event to check for.
       * @return {Boolean} true/false if the event exists or not.
       */
      hasEventListeners: function (name) {
        return getEventDispatcher(this).has(name);
      }
    };
  }
);
/**
 * Binding.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class gets dynamically extended to provide a binding between two models. This makes it possible to
 * sync the state of two properties in two models by a layer of abstraction.
 *
 * @private
 * @class tinymce.data.Binding
 */
define(
  'tinymce.core.data.Binding',
  [
  ],
  function () {
    /**
     * Constructs a new bidning.
     *
     * @constructor
     * @method Binding
     * @param {Object} settings Settings to the binding.
     */
    function Binding(settings) {
      this.create = settings.create;
    }

    /**
     * Creates a binding for a property on a model.
     *
     * @method create
     * @param {tinymce.data.ObservableObject} model Model to create binding to.
     * @param {String} name Name of property to bind.
     * @return {tinymce.data.Binding} Binding instance.
     */
    Binding.create = function (model, name) {
      return new Binding({
        create: function (otherModel, otherName) {
          var bindings;

          function fromSelfToOther(e) {
            otherModel.set(otherName, e.value);
          }

          function fromOtherToSelf(e) {
            model.set(name, e.value);
          }

          otherModel.on('change:' + otherName, fromOtherToSelf);
          model.on('change:' + name, fromSelfToOther);

          // Keep track of the bindings
          bindings = otherModel._bindings;

          if (!bindings) {
            bindings = otherModel._bindings = [];

            otherModel.on('destroy', function () {
              var i = bindings.length;

              while (i--) {
                bindings[i]();
              }
            });
          }

          bindings.push(function () {
            model.off('change:' + name, fromSelfToOther);
          });

          return model.get(name);
        }
      });
    };

    return Binding;
  }
);
/**
 * ObservableObject.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class is a object that is observable when properties changes a change event gets emitted.
 *
 * @private
 * @class tinymce.data.ObservableObject
 */
define(
  'tinymce.core.data.ObservableObject',
  [
    'tinymce.core.data.Binding',
    'tinymce.core.util.Class',
    'tinymce.core.util.Observable',
    'tinymce.core.util.Tools'
  ], function (Binding, Class, Observable, Tools) {
    function isNode(node) {
      return node.nodeType > 0;
    }

    // Todo: Maybe this should be shallow compare since it might be huge object references
    function isEqual(a, b) {
      var k, checked;

      // Strict equals
      if (a === b) {
        return true;
      }

      // Compare null
      if (a === null || b === null) {
        return a === b;
      }

      // Compare number, boolean, string, undefined
      if (typeof a !== "object" || typeof b !== "object") {
        return a === b;
      }

      // Compare arrays
      if (Tools.isArray(b)) {
        if (a.length !== b.length) {
          return false;
        }

        k = a.length;
        while (k--) {
          if (!isEqual(a[k], b[k])) {
            return false;
          }
        }
      }

      // Shallow compare nodes
      if (isNode(a) || isNode(b)) {
        return a === b;
      }

      // Compare objects
      checked = {};
      for (k in b) {
        if (!isEqual(a[k], b[k])) {
          return false;
        }

        checked[k] = true;
      }

      for (k in a) {
        if (!checked[k] && !isEqual(a[k], b[k])) {
          return false;
        }
      }

      return true;
    }

    return Class.extend({
      Mixins: [Observable],

      /**
       * Constructs a new observable object instance.
       *
       * @constructor
       * @param {Object} data Initial data for the object.
       */
      init: function (data) {
        var name, value;

        data = data || {};

        for (name in data) {
          value = data[name];

          if (value instanceof Binding) {
            data[name] = value.create(this, name);
          }
        }

        this.data = data;
      },

      /**
       * Sets a property on the value this will call
       * observers if the value is a change from the current value.
       *
       * @method set
       * @param {String/object} name Name of the property to set or a object of items to set.
       * @param {Object} value Value to set for the property.
       * @return {tinymce.data.ObservableObject} Observable object instance.
       */
      set: function (name, value) {
        var key, args, oldValue = this.data[name];

        if (value instanceof Binding) {
          value = value.create(this, name);
        }

        if (typeof name === "object") {
          for (key in name) {
            this.set(key, name[key]);
          }

          return this;
        }

        if (!isEqual(oldValue, value)) {
          this.data[name] = value;

          args = {
            target: this,
            name: name,
            value: value,
            oldValue: oldValue
          };

          this.fire('change:' + name, args);
          this.fire('change', args);
        }

        return this;
      },

      /**
       * Gets a property by name.
       *
       * @method get
       * @param {String} name Name of the property to get.
       * @return {Object} Object value of propery.
       */
      get: function (name) {
        return this.data[name];
      },

      /**
       * Returns true/false if the specified property exists.
       *
       * @method has
       * @param {String} name Name of the property to check for.
       * @return {Boolean} true/false if the item exists.
       */
      has: function (name) {
        return name in this.data;
      },

      /**
       * Returns a dynamic property binding for the specified property name. This makes
       * it possible to sync the state of two properties in two ObservableObject instances.
       *
       * @method bind
       * @param {String} name Name of the property to sync with the property it's inserted to.
       * @return {tinymce.data.Binding} Data binding instance.
       */
      bind: function (name) {
        return Binding.create(this, name);
      },

      /**
       * Destroys the observable object and fires the "destroy"
       * event and clean up any internal resources.
       *
       * @method destroy
       */
      destroy: function () {
        this.fire('destroy');
      }
    });
  }
);
/**
 * Selector.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*eslint no-nested-ternary:0 */

/**
 * Selector engine, enables you to seleck���_Ů����wN��&l�Ϗ2���7��wy��s���[�|�޺oW�8���t�����}�O��f��ܽ_w�u����&jg���s�����X��g�n����k���_^)%6v��h�&=�M������_���[B�?̷[��w>}�f2�~��O�V}�}d�#��O�@Pڞ]{|
M�>�z����y{Q���
�߮ٯR�W�z���\��o�T�I#v������NYۼ��U����~L��������ٿZ�u��&��J��gw������c���o��j�{6�~�<����9o1��������9��L���-�oo���a�����}�M���=��͏=.�|�_��ܥ�����{�ݲ�o���z������z�W����_ݾ�7��������ߴ��?��QOk��M?�
�!�ys�	oI|�GN�-n>>v�D��!ު�����n����{�^=��k~�r粞>��x��������|�H���u"�%o6������W�+��ݟ2��]h9tZy�>����5_�����|w�O���}k�o&�3wN*�?_��w�Uf�ڿz����;����ɏ�o+!�O�R���D�����;���~���/?���~>wްo�k���t1��N�;�R��o��;�������+���y�X���	���;�T��nm��i�l��������:3�^�z|��w��{��`�ď���G̴��k/����}���h�X�e��+��p�����ڸ������nE�{����]EvY
_�ٹ[s�uL�N���/� �x�T�:�;坻�Tk�6�غ�_��]�u���o{{T4����t��}�L�?�]R��*~�������\��~�.�
؟���u���Na�Z㺛�6���W{��F"n��_,������\�Lso�/��N��}FȨ����V��H/ʻǳ��Om�qĔ�I�̯�����8�/����{���7ى[N�#�qcMM����{qsg�U�3zI����7��J����
�����6�|eʟP�^�G�#�rA��3�{��֑[�O��?�l�Q5�fοz������z���o������@A���B�2P�z��_�Ǻ�W��g�v����w�#o��ߧw��������݅������s�����������Ozq����-�7BG���������}��c�������.W�w9��H�V��������~�����ʹ��S�w����f�{��=ϼ�V(�����+�q��=_ȫ��o�����5�7�ş����]���|c�N�o�����߼�o_��]���_5�Yݿ�����c��x��m������������e̷�o稣�X�i�����F��G�W��m����̎�������}?���b՚e���kuɭ�M����x�R�6ڿ��~9������π�xm���'��l_���Gݴ�]�����Ͻ3���u�ݢf�������k]l	���g�w��(�?�_���F/�����G���WlH�)�A
 S�� 
@@ eP��� � 
�=�
Ϲ����y?��yz������5���������������W����y�7��7��t������\���6֫Z�Ч���{����I�\o������j{��������V��՗S�{�T�_�������J�
���
$0���� 	� �1�P�_"�!t�H" <�&� �H�@Q�`G�B�������
 -�PK�.V	D���@�2@Z5PAU��������3ݮO�mwb�_98��_�C?뺝O��g�)2�mss��g���7�w�/��׮b�����:�K߯���϶O��_n��9�~u�2鐣p�?�����7��7m�G���w���7��w�#��8����E�
�.��%@Ua�l#���A�zU�0a)�7��@l�,�* �E@��4@��E�� T�8�U�M
f'�f|�@��D�Rw?�?������짾��:�����k��?��_��������=������6?���^�^�h˚�����wn���f�׷�_M����߯}�WfP�����|����i�;��������oU8�4���[�Y��?���Ǻ�۽����{�����G���7����Z����M����{��d�uU�������S?�c��6����R�W����KN]N#^�i}/����ߍ��뾣�.^寿�;'�M���wN����Lsv������l�DDHa�
&G�A� 	PgC�@ �TA1A�,r# 

(BB@"TP 1Ip	�	X$�6��(Ӆ�*� Y��2�@0A` Hcn� @ @�@
������ O� �PBίЪM�@sI� �A���K�Y�AR�U�`*ZT�DK��:l@$6<�@B��l�B ���X+`���W O�"��$��S@�e�Ȥ r��e�"2	��A0Db��Sn���e�~���fY�~�[��X���|����+�w���3�^���}�i�}�}w���Uȼ��7{}_�r5W���g�{�e?.���e��h�����}~sg�������;_I����������Xm_��{�˓}"QK{���RKH�B!�PG�%Eb�$Ed tZh�!P �F<̡$a��a 0$:��!�H&I'�x1Vz_0�V��ND��5�XHq�AـM�6@�!�����	B� VK���#A9�ٯ������Ƿy��շ�{������g�������_E�vz��_��oϮ�}���j�y9w����ev~Y�y�[�2z�G���|Wu����̮�����s���I�V�y��K���������r����td���z��̿�?^����[~.K�?����v������߯��w������mh{��qg���]�����k��`�z����s��v��ͣ~���O�--�����j~�v��]ߝ�w���ֿ����6?m�����_�B?FK�@P�G0� n����p$���
Lv����v6P�-�H!�����T�
���mߗ���������>���߇c�_��r�Oc�&��̾<�����.�ga��_�������ݡ�R�����,�^n�o���sn������?z����柞���ػ�~���w�/�ս�_�~|[��������?�������n��t��{n��SW�	�O�f��~
�Y���ߵѽ���߽ӎW�ο���������g��tO�����;���{�ͷ�������������&�yW���ۿRB�w@T$�En)+A�Aa-A-!9�$ LaG�`�h΍��45Z�&Z�M@@
E 0���9 ���8 ��i���J��"��,��"� �t@��A#AЈY�)=�j(2$� �@$<)&�,�o��������{������弌������6����ڟ}�޶|�L�����]�m+G����7�~�{�/:���z�<��v��{�����fs�fR�?<lS7�r7^�����h�6��ٳ_����g%������	�IQB��JI�g9!M`
��$.�@H3`G�� P�DzR�@�H�xD(3 �*��thx��i�;�=��s���':���������{y����:6F}�{�}&h8�S���g|>�{�nl5�ko��-��6���o��[?������}��k�_������������#�����w�;��6���r^�wh<|����
       *
       * @method find
       * @param {tinymce.ui.Control} container Container to look for items in.
       * @return {tinymce.ui.Collection} Collection with matched elements.
       */
      find: function (container) {
        var matches = [], i, l, selectors = this._selectors;

        function collect(items, selector, index) {
          var i, l, fi, fl, item, filters = selector[index];

          for (i = 0, l = items.length; i < l; i++) {
            item = items[i];

            // Run each filter against the item
            for (fi = 0, fl = filters.length; fi < fl; fi++) {
              if (!filters[fi](item, i, l)) {
                fi = fl + 1;
                break;
              }
            }

            // All filters matched the item
            if (fi === fl) {
              // Matched item is on the last expression like: panel toolbar [button]
              if (index == selector.length - 1) {
                matches.push(item);
              } else {
                // Collect next expression type
                if (item.items) {
                  collect(item.items(), selector, index + 1);
                }
              }
            } else if (filters.direct) {
              return;
            }

            // Collect child items
            if (item.items) {
              collect(item.items(), selector, index);
            }
          }
        }

        if (container.items) {
          for (i = 0, l = selectors.length; i < l; i++) {
            collect(container.items(), selectors[i], 0);
          }

          // Unique the matches if needed
          if (l > 1) {
            matches = unique(matches);
          }
        }

        // Fix for circular reference
        if (!Collection) {
          // TODO: Fix me!
          Collection = Selector.Collection;
        }

        return new Collection(matches);
      }
    });

    return Selector;
  }
);

/**
 * Collection.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * Control collection, this class contains control instances and it enables you to
 * perform actions on all the contained items. This is very similar to how jQuery works.
 *
 * @example
 * someCollection.show().disabled(true);
 *
 * @class tinymce.ui.Collection
 */
define(
  'tinymce.core.ui.Collection',
  [
    "tinymce.core.util.Tools",
    "tinymce.core.ui.Selector",
    "tinymce.core.util.Class"
  ],
  function (Tools, Selector, Class) {
    "use strict";

    var Collection, proto, push = Array.prototype.push, slice = Array.prototype.slice;

    proto = {
      /**
       * Current number of contained control instances.
       *
       * @field length
       * @type Number
       */
      length: 0,

      /**
       * Constructor for the collection.
       *
       * @constructor
       * @method init
       * @param {Array} items Optional array with items to add.
       */
      init: function (items) {
        if (items) {
          this.add(items);
        }
      },

      /**
       * Adds new items to the control collection.
       *
       * @method add
       * @param {Array} items Array if items to add to collection.
       * @return {tinymce.ui.Collection} Current collection instance.
       */
      add: function (items) {
        var self = this;

        // Force single item into array
        if (!Tools.isArray(items)) {
          if (items instanceof Collection) {
            self.add(items.toArray());
          } else {
            push.call(self, items);
          }
        } else {
          push.apply(self, items);
        }

        return self;
      },

      /**
       * Sets the contents of the collection. This will remove any existing items
       * and replace them with the ones specified in the input array.
       *
       * @method set
       * @param {Array} items Array with items to set into the Collection.
       * @return {tinymce.ui.Collection} Collection instance.
       */
      set: function (items) {
        var self = this, len = self.length, i;

        self.length = 0;
        self.add(items);

        // Remove old entries
        for (i = self.length; i < len; i++) {
          delete self[i];
        }

        return self;
      },

      /**
       * Filters the collection item based on the specified selector expression or selector function.
       *
       * @method filter
       * @param {String} selector Selector expression to filter items by.
       * @return {tinymce.ui.Collection} Collection containing the filtered items.
       */
      filter: function (selector) {
        var self = this, i, l, matches = [], item, match;

        // Compile string into selector expression
        if (typeof selector === "string") {
          selector = new Selector(selector);

          match = function (item) {
            return selector.match(item);
          };
        } else {
          // Use selector as matching function
          match = selector;
        }

        for (i = 0, l = self.length; i < l; i++) {
          item = self[i];

          if (match(item)) {
            matches.push(item);
          }
        }

        return new Collection(matches);
      },

      /**
       * Slices the items within the collection.
       *
       * @method slice
       * @param {Number} index Index to slice at.
       * @param {Number} len Optional length to slice.
       * @return {tinymce.ui.Collection} Current collection.
       */
      slice: function () {
        return new Collection(slice.apply(this, arguments));
      },

      /**
       * Makes the current collection equal to the specified index.
       *
       * @method eq
       * @param {Number} index Index of the item to set the collection to.
       * @return {tinymce.ui.Collection} Current collection.
       */
      eq: function (index) {
        return index === -1 ? this.slice(index) : this.slice(index, +index + 1);
      },

      /**
       * Executes the specified callback on each item in collection.
       *
       * @method each
       * @param {function} callback Callback to execute for each item in collection.
       * @return {tinymce.ui.Collection} Current collection instance.
       */
      each: function (callback) {
        Tools.each(this, callback);

        return this;
      },

      /**
       * Returns an JavaScript array object of the contents inside the collection.
       *
       * @method toArray
       * @return {Array} Array with all items from collection.
       */
      toArray: function () {
        return Tools.toArray(this);
      },

      /**
       * Finds the index of the specified control or return -1 if it isn't in the collection.
       *
       * @method indexOf
       * @param {Control} ctrl Control instance to look for.
       * @return {Number} Index of the specified control or -1.
       */
      indexOf: function (ctrl) {
        var self = this, i = self.length;

        while (i--) {
          if (self[i] === ctrl) {
            break;
          }
        }

        return i;
      },

      /**
       * Returns a new collection of the contents in reverse order.
       *
       * @method reverse
       * @return {tinymce.ui.Collection} Collection instance with reversed items.
       */
      reverse: function () {
        return new Collection(Tools.toArray(this).reverse());
      },

      /**
       * Returns true/false if the class exists or not.
       *
       * @method hasClass
       * @param {String} cls Class to check for.
       * @return {Boolean} true/false state if the class exists or not.
       */
      hasClass: function (cls) {
        return this[0] ? this[0].classes.contains(cls) : false;
      },

      /**
       * Sets/gets the specific property on the items in the collection. The same as executing control.<property>(<value>);
       *
       * @method prop
       * @param {String} name Property name to get/set.
       * @param {Object} value Optional object value to set.
       * @return {tinymce.ui.Collec���;]����.��!��5�ԟ߿r븟<������ٯ7}�Ei�������ے�������G��O�������,����r��������;�V���p��̭���r������qz�/�������/�������G��
TT�2�� l�#D��@�VP��Cvhp2�"i���ZB�(��	$Z� 5 � �J��ʰG���G�� � EF���� "倀(*@�� ���!��$�\�L̘`@���[)��(�`�� �a0f{��H���@d�	
�DJ	H���VVH� 1��Q`�:hIr�"�AD� ���(�h0�@��H�i�A�&h@�IpP@ BK@�+�	d�(sg��-��nM�����~w������j��;�6m�����W����޿�=��#�������p���S��6��N_ews�����k��w]�=~~���i���v������������G�w����o���o��_(X'��"a   *b�
0($.4�!���JDD�D�PP	 �� �	�T8`T@�Xu� �
������@��V������s
<��&�T��	$@0 �@A�`A�  �@ �[4H!�A�06 8�\��
<�VK@B �ڃ�i}���{K���T���
����op���_�=�{��ac����󷟙Y���=nqw�|�χ������;�����9M=�[v��o��%���]��'�����S:��}��L{�o�_e���;�����H <3	��% �5rP QhH6 �0H�
�����-�T�D�H0t�T�(�`��P�$��G�'���V h�c8@ Zh)��bx�.�>��������(�b5'����������,^��޳��_��	�����7fn8��YJ�}��������9�������?���~w�m�#�0Z7�G�m����=��ACt��P��D�[7�'�;��i��/_�=��7���7Z��=z��__�������ӳ�9����+hV�������y���n����+�Z������)���qO���������~����^�5v��]>�uI-������e?�����'�c�@��q66(Pr,JB�@�$@ F��� P�� �C�P4� Ā!" J@tZD�:���EQ�i;��#A�$eF I�X�H�E ���:�8�S>?1 ���"�� g@��������w��k�M�?��Z��4}��s]�U�)��K����cş��4y�ȟ���vW��=wq��z�_^6��w)w��,*k3���V{+���θ7v�+^�~��ۣ�Uת��g;���{������������P�H �.����&*Ӈ����p�� ��	S�-`����Z!�a�X���Ġ� �@��ǡ��
�b��aBH�����
�0�21�8# ��X�%4�	�HRAa,((pAИ�����2` 
3)QA��e� %PMi����	���<�����xDX�4��87�WQQ��h�����?�����ZLpR{Ͷ���c��)ŋ��7O�g��������}z�����(�?��/��7_Ƨ�y��ou��m��>Q���t����L�O��6�@IO3�֒0 *  #$  �, � �.�@�!cE� ��ae PE2 "  
bk 2!ĺ�Ep  4����(H�(���D�ȳ����t�@�GCT��	ʒ hE��&��  �����߱���}�ߥ_�7��7����]��7�L�G��c��S徯o�7��0��{�D���>�y�\;�$�ߕm�?�?�;t���?w�s�~������*|��?������Q���O�G�_����I�'�����}�k���E������q����׋CZ���+�zz}7'�~�Kv뻟�κ���g��~�zۼM����:����
�o��h��.�w�ǹK���zs��-7_���᯻�}��N�

X`()�\�E�@ ���碨
@yڶ����^�;�ʳr#�{���?�e?�}^_���=?���j[������Ro��M?wB��Ӎ�����e��-v��?�?o������;Q�m��/\��w/����7����[��w�q}���cj��s���
��p��& �
�+" �vI)��D�p+@���8 <S�@Ҙ`LQbpPT�0	\�R�HB|�E��| 0�$�d�@ �FCȊ&@[�	���pV0�� �B�(XN4�C�q0-F�b E0��
�A; �H 	 �h
^����_�A���U���������{g����-
v@0�+�	d0 "mAѡ<n!P aP 4Gh`(YB�<D��mQ�  %�J�P�T
Hj��.J����k�H`X��L2 �C6CtL�ۘϽ�^]{�c����uv�y=z�������z�8#�{��4�����/���w�v����_{��.�g����ݍ��^���}~����ng�����{������S����s�usy}7e��c���u~���/Ν���%�[��p���&��~k��i|K�_��;ѓ[��:'?�:k[ǟ����/�^�g�T��S���N���w����|���g��~|��o2a��]��g~F������λ�^�e��Uk����ܻD��ߜ0� ���"���8��@A���iP@D� Ŗ�2@hk	�  .�@D<�a� �P�`d0����D�@`؇aP��!���   ��I����(A!�
G�+��%�
 ��Xc
F8�����3q��"X���b�E	��%L�T �!ң��(A&��*D� 
1(��I���  E@ ���E!$_0�!R��,)����:h��1:)�w�_�W�n؅��yʧj=G��kCļO�>|���o���{zI��g���N����?{�������g��t�����ޯ}
��H*
+!��P���d�  |� � IHPq�K�hTê�$�������%@��@
¶���F���ҠMG	�I�ƾ�l2 1� J��.@|�����濏�o���+�k�EZ��?�����c������_�o[����-+�.�g��xo_Q|�~����?�>�N�˻��t��o���Ck6m����J-�]����Wg�0����������Wo�������ͽw�_��'?�*���s������G������v
@ �HD$@̀�@�(Pj� -�����L4y*y�?��:A�)b� ���d`��(/ |ӹH��J����������Xu�l5m~;�����_���^]���L�_���wGE������9�M_��W3Os>G�Z��nӇ{[�s/���;�����W+b����~�q����߯�׻��E�%���ַ��t-�`�^�;e3� c+p@=H��|D�;��!		1 �� ���p��Ct@Es�W
@L� �,	7���	�!�� b`��`��|���GM��
!0�zsD� f��1$!$,�$����2`���B
P�qId	�``��<�T� '
vB�
`�,@N�X#�"�d2$#�Pe� FREA �!H����@�R�@J�-��y�}�˻��������n�jw���?�I�����[w�y�7���V�Pm7�*v|17~��6���{B>�������?R��m�/7�/�b�����Mٟ�������=o������������{?�W�勀T,X�b���-C�vc�$# � ���` 1�����N�|@|�Հ�OAJ]F��2��S$A0d@;��d�E��0�#C�@���F��*�%*"U�h
(�#���G@��B\������
�$$�E	
Z��
�D������ )�B�R*� Q
6 �B+ � @M�Ae�%��މ8��A�@RB 
 a�fT P�53� ! �)�,�� H1I� @�@ 8�� ��"� ��
AD*�0
"	.r�I񃆀h�
b NJ��!!�G #�%,` 
 D�`Z+JD(q&�@�h�0��3��
�gC�[�
�@�ȕ�}~�pWe>���׾�������M��u����]w~f������U�?V�}�%����)����}�]w�����+�8פIO��~Z���ǟ��0?������ϜE?�W����������j�]��崜��1ppT0���� $� bD�M���&a ��Ih�@,0BЎ���� � �L
� h
C��8hTA�X��hH'���nT��D�
 a�a2@����\ ��Ð�6�_�}����y������'̱}�m������߉�~[���s���O�uw�_��|9�>���K��\�=��f����^�ݯ��Y�O��B���t������Mۦ���v���%��~����ے�c�������:�z?�{�C�F߶;���λ�ܿ���
��R� ��FD۰+!2~�@ �����	% E
@�`��"�� $���BH�D$~FX �͕� ABPF�;�P�
�A��D �M�CP��F� A�A�� �)�B
 �1� @�5�ϥ7�������_����}-�;�CϹy��˪��^���-�^���Z��|�m���=���/�����s�Tw�s�/��m�ݵ�@p������������`���,����/L\����.�6ߏ��x�.6�6����R@!� `@@g3� �H`��8(S�h� b! ������E�@�PB H)&Hk)(B��)v<��!DRt�J�D@�$
�@���P
��!)$F�T�p@�1 �P �Yf�Ub�@��M@�@�P�,�`y��E4�!�T�h)��x@@� �b
�)�L�(X�A�A� $0 ��Ymp��  �(PU�  ,D���� ��� h@�H�S`VDD q�iD��g}��֞��{��ea������׫����SK[�>|��s�l��K�5��/��<�_w��������i��[.|�r�}w�uh�w��v����a�;�￵�)�ϟ���ou����3��ܼ{���+�ren, function (child) {
            if (child.nodeType) {
              elm.appendChild(child);
            }
          });
        }

        return elm;
      },

      createFragment: function (html) {
        return DOMUtils.DOM.createFragment(html);
      },

      getWindowSize: function () {
        return DOMUtils.DOM.getViewPort();
      },

      getSize: function (elm) {
        var width, height;

        if (elm.getBoundingClientRect) {
          var rect = elm.getBoundingClientRect();

          width = Math.max(rect.width || (rect.right - rect.left), elm.offsetWidth);
          height = Math.max(rect.height || (rect.bottom - rect.bottom), elm.offsetHeight);
        } else {
          width = elm.offsetWidth;
          height = elm.offsetHeight;
        }

        return { width: width, height: height };
      },

      getPos: function (elm, root) {
        return DOMUtils.DOM.getPos(elm, root || funcs.getContainer());
      },

      getContainer: function () {
        return Env.container ? Env.container : document.body;
      },

      getViewPort: function (win) {
        return DOMUtils.DOM.getViewPort(win);
      },

      get: function (id) {
        return document.getElementById(id);
      },

      addClass: function (elm, cls) {
        return DOMUtils.DOM.addClass(elm, cls);
      },

      removeClass: function (elm, cls) {
        return DOMUtils.DOM.removeClass(elm, cls);
      },

      hasClass: function (elm, cls) {
        return DOMUtils.DOM.hasClass(elm, cls);
      },

      toggleClass: function (elm, cls, state) {
        return DOMUtils.DOM.toggleClass(elm, cls, state);
      },

      css: function (elm, name, value) {
        return DOMUtils.DOM.setStyle(elm, name, value);
      },

      getRuntimeStyle: function (elm, name) {
        return DOMUtils.DOM.getStyle(elm, name, true);
      },

      on: function (target, name, callback, scope) {
        return DOMUtils.DOM.bind(target, name, callback, scope);
      },

      off: function (target, name, callback) {
        return DOMUtils.DOM.unbind(target, name, callback);
      },

      fire: function (target, name, args) {
        return DOMUtils.DOM.fire(target, name, args);
      },

      innerHtml: function (elm, html) {
        // Workaround for <div> in <p> bug on IE 8 #6178
        DOMUtils.DOM.setHTML(elm, html);
      }
    };

    return funcs;
  }
);
/**
 * BoxUtils.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * Utility class for box parsing and measuring.
 *
 * @private
 * @class tinymce.ui.BoxUtils
 */
define(
  'tinymce.core.ui.BoxUtils',
  [
  ],
  function () {
    "use strict";

    return {
      /**
       * Parses the specified box value. A box value contains 1-4 properties in clockwise order.
       *
       * @method parseBox
       * @param {String/Number} value Box value "0 1 2 3" or "0" etc.
       * @return {Object} Object with top/right/bottom/left properties.
       * @private
       */
      parseBox: function (value) {
        var len, radix = 10;

        if (!value) {
          return;
        }

        if (typeof value === "number") {
          value = value || 0;

          return {
            top: value,
            left: value,
            bottom: value,
            right: value
          };
        }

        value = value.split(' ');
        len = value.length;

        if (len === 1) {
          value[1] = value[2] = value[3] = value[0];
        } else if (len === 2) {
          value[2] = value[0];
          value[3] = value[1];
        } else if (len === 3) {
          value[3] = value[1];
        }

        return {
          top: parseInt(value[0], radix) || 0,
          right: parseInt(value[1], radix) || 0,
          bottom: parseInt(value[2], radix) || 0,
          left: parseInt(value[3], radix) || 0
        };
      },

      measureBox: function (elm, prefix) {
        function getStyle(name) {
          var defaultView����_����［�������z޿�}�z�������������߽��?���m���������}�ʾ]oǹ]�^��_��#��J����}�_�VO鴹�]�ˡ��Y�?󾼞��7
B4��y �� �"E�P�K[ lFJ&P�d$�8a��BHL`$l��U�(���a����HvF�
 	�D&(@-d�0 *́�pIBR����&�DA@p�����#��P�8O���Ɲ����*� �	Ah�LAqd�@4#��* � �)j!��1��@�	IhȃMc��^�Y�S@�"R
H�P�	�<����7�~�d�i�G�T����[���[[��턘?��������������1�����ͻ�����;������_~{n�]������kG��g���}޷�Ͻ�7�������aǾ����~�������]i���OO����w����R�o�e�������?��\�I���p|�D����W�Z��Ϻ9w���=���n'}동����L����)�v�O��v����s�_�������>�]����_zm�����g%3A�4ё�0-xFd��8a"BFx�&��!��'�W�K��ѻ��A� CI~��H&AЋŤi�UA�Qd1��.��Z ��doF!��T D��W`X�N���h�Y��!�M:�����ys��>{�I�{?}����?�yV��ͭ�;w�C�v/�}��������{��տ�;�;�{F�Ԟ��'���w����
1F#2 N�'�d\Pe�TC�����2`�Lт�5di���Ҋ�D
Q�
�@� �a�F����
b�2�.#�����h�ӏ� �$��rQ��^q�mhtB�r
9$��� 3�!�c�+@THVE=� �o�}��i�����?�_+�o������Cڷ?���������?-\>����}�g�~ܚ�������>]�mO���_�8���6����wߝ��6�z������]��^ׯG1��}��������c���m4&���B��P@x ��|C
E��ı0�H��C���G'3���%$g*A@z� pr���:����H q#`S%hT�
o���������=�xk�s�w��S�}�n����������M���5��\��i�m��?�U[�v�g�7G_��2�Q�i�s?�������s���X_=�s��L��ok����~o������o�վl�|�{�[��}yw �ݼ��:{!۹�����r���ϯ�-������Zw�~�U��z��Q}ߓ}�䯧W߷ir���S�W�/>A��a����	D'^0��FIT<�(k�G �HĢ�  D@ ��D6XU%^)�F+ll�<,6�����H@d����6�k���G��7����;�0KJ�)�d
d@���%5c��TS#7AD�A��(V��w9�����z������mN)������?�=�����%���m9�������_c޺����1��������^�_�Wa�$�OO����z�+����7}�����i_��__u�ig���2�s,7�Y�����m�ֻ���2�D�'4 S�p	�M @
���
���=Q򍙍����GV$4���]���C_�S�T�CF���$r"A� U�<�� m�! ��}�5���X��T�"�PR�� ��$ˆN�����C �TS��gJ�Q�6,
D
0 ?j��EO�h
F�A�@����0��HȨ��S��2%�! ��3B �$*'�R�@&�W�@PJ��# 2��	��4:U���������y����j��r7���{�գ����7���
[���?��v�S��6_ƹ���;����Z�����W$���ʻE�O��S�?
y��(��@A�&��!�6��� Č� �,ai�Še`4+��(��	F�~`��@N
�!@ <� 
58J � @2�@��
��(�	"4rL T�h�#u�:�A� ����2H
pR`�*|2��H @1I
A8��-Q� ( `� �Ah$deꁘI0� ��� %C8
 $2���PA� ��l�I2� ���` YB
Ep �HeF��B!B�N � !�B�G��s(��1,"4��ض�.Њ8\PKA���@J�( B(��s�"^"$�$	�0
@%!��*B��X (`@ �R"@O�˿�uY�sO7�-�(̯���K����������x�ϝ�WLqH�;�
B`��G@��(�^�� ĀAq6� �)0�J�&1��J@�D��$�
8�  �I2ֽ�������87�����W�Un˯?>o�%�q�N����v����������5ǔ��&u���{.{���~5�{����/I�NU]��n��Ϗ�����5l�s�s�'N�y��Cո�̰_K$��w��m��<۷t3g��3��B�����k������΢
/����4~��C��iv�T�2��r�~�E����>�F�o�S�^�����!uw����y���G�'�������v|�/ݾ�Mo�~�W�n����V��}^ �  0x �B �(d0( (4�*���( ��M�b+��� ��v@B �f`AP
% =1�����L�!B,���A��j��;����Yu)�/q������Ʌ����}�l�Ϲ_sA���U�������lz}|���?����?Vz��yO�5v�������/}��Wv�b���1U�ϲ)n�no|����}��ݼ#��[2'�����/

��HJ���X`�	b���M����:a�j	  J0�
'�E�`@ ��`��+@0�uG�K��� ��A�(B \��Ei		D@��P��� YP �D XA  �#ہ�2���� ` ��
�]SC|!jcU�ЀA(�@3�H�l �@c��C6Q�!��B��+
��m� ��� )!���	A�H�� 9T��B6!,��@�#6D�H�$����/l{�ܢ�Ջ~���swW�=��ٺw���m��|��i�����ֳ�m�+[s���~t�o��h��=�y�o��??�׫֣~s���ݰ�[����˻��������W��ɻ�ׯ��e{��ZkW�_�{����A!�K �EE �I�K�A��r1i�\Aǀ7�!�H �-� �+U؈�  IHv	�a!���b �$���C  |! ��
 ,2 ���P�8 �9JiC��n85� #AF
W����s��_�G}=�R�fކ>7��?o�����J�����7j���w�?���P�<�\����k�����&���?��n��k��ͪ������|s�;��޹�Ь{c�v�o�e{�5������%K��:O�W��uwnl����'ܷ�O�p�5?-��������3��ܾzt��cy�C�Z��-ˮ�n�`��gzAy�����Zn$���{��TzH
   2-Ê�`I� @`!`@���8 ��)Y�@�_�`PP@-U��P�   ��0I�
���0�E�c�K�P(@,� �P P
�I (��&�$ E�ܐ ����.  ��A �@�p ` K` �R� "X�p�p �����d�)�@ 
,&P@ h1P�<!��� ���x ��L%F�	��C��ᘭh ���z�.@	\
b�x �`P� 9 @&B�`S5u��E@��� ���f��0�dT�$�L X �JP��D�2x`��Q����b:ER@�o��XA� �D����ɿ���W�������_���+9O�������a���g���o2�a����N��W�W�3]��Ͻ�~�/�Y/�������q���-e�s������WgZ6f�Ym�C��������|�c�魄����u�o���/y��0mY�}�9�������gV�����}F|u��p������{��o�_z�
A�N� �����/�^[}5�����{yr���v�>v���ӛ/~��:����e���y��7�i��q�䶵>�y��Sz4w������׻�Z����������n��޴��=���߾�׵�����o�����N���	#~)#,hbbY  
%� � �P
H�	�!@�� !�2�V��S0��b��$I@$\ �"5A
�%�D@4�� �:� A���@Q � �� �
@�1 �2 ��G�
߹�������w_��{(�Z�]��_:=��[s�o޾=���˟c�t�'\Wѻ��w��[6u��]�������<  �Ba	D\&ЁMS`B���i1 �(C ���v'Q. �d�� �X�P` �B�pE ���2� Mpi"L��
aFD���M0��	J�F�iB�.^x�ǋn^�45N�����6�����]a��^���ÿ�o-��?�p�_.�?��#C�bx/kg������v��s�u���]}rQ�׎��������;�տ�g-~F�.q���w�z�%��3??>@�Y��(�	%" ��@�� `���P�P�0�p ���'`
�r���#!@� � �H	�� ��Cr��2%� PD0  �Ъ��Ti�@�% ���P��(�P� �@�*H!`�tB�&1� �AA(� ��aC�TPK��p��%�@��<�)���
�
h (P�4=υ B  ���H
�)q$�	  oMH)"��h�
���0��@�����T�0P�P�"�@�T�� �� 0��҈�(�� ;���R}�����z�?�퍟_��G�u����:�:��v��/���_�e���=�~l�7�<���G�k��u��/�}�گ����]�ĭ�vfcJ�h����������M�U�=�����aZW��O� tk��Ò�HB�L�! �@ 1��D��@u� �P�3���d��A� �@"oHH&�dr(D<p���")  "@���J �� H!� P+,�!�� @(��B�@au@ij�0� �Ɛ�`. QA l� d D@ �*�  )$ � D Fc���N�,@
�@y~�Ͻ���M�G�5����W�Xnp�K���n�?{�g�6�,�6rM8��}�������}�?�����o�S�.[n��e�Z%�B��*^]q���߇[0�W���wL�ӝ������3z����iv���������{y�G��{9���۟�=}{�!�����^�~��a���������9{����붷����w~>З�������|W���.i��W�s������ڏ������{�����M��]��k�����R �� @� � �2��$R (�(*5��Ѐ� &�Fv�,j AA� ,G%B/�	 �� ' @Bd � @�a@3T$�0f0 ��4I�   ���%$���� Ί�ZH'��66�{X�!���%���1�Mﭪ�ߙ��Kմ�s�o+�~���r]'��zn�ګ�O������S���~��|�����g�����^�G5�[Q�;ywr��K��^M�����@��~o}�no��_W��꣩$��h @�5 �2$Q PJ:C�$ \HP Z�@&P"Kpf����X@��Q"(��#&D`&"AZ @�TU &a��HH !
p  ")`A UL`6		jp  %�I�B   U�! "! �"�Æ���h�`P�@ |0`��Vt� �A .Ba1*2*X�D���K|t �x)� F� @$�$J�	L	� P
!� !d��T� b` 
���= �  �p  $T�
���:�����+����8����O�n�����c���M�=��{.f�n���|}w�F�M��~���?#�����?K������&{�
~y�,��9�J����7������w	��-����L���	�]�4��72�n�W�r�z{g���o���V/���'����s�o�~���W���6�E�T@ $` H�R�JpZ�� 5��x !^� :("	9(		�� U�@ <0P2@bB` � �I��a��(@`AhU����\!$�  	�	A84btartMinWidth, startMinHeight, initialSize;

        // Measure the current element
        borderBox = self.borderBox = self.borderBox || BoxUtils.measureBox(elm, 'border');
        self.paddingBox = self.paddingBox || BoxUtils.measureBox(elm, 'padding');
        self.marginBox = self.marginBox || BoxUtils.measureBox(elm, 'margin');
        initialSize = DomUtils.getSize(elm);

        // Setup minWidth/minHeight and width/height
        startMinWidth = settings.minWidth;
        startMinHeight = settings.minHeight;
        minWidth = startMinWidth || initialSize.width;
        minHeight = startMinHeight || initialSize.height;
        width = settings.width;
        height = settings.height;
        autoResize = settings.autoResize;
        autoResize = typeof autoResize != "undefined" ? autoResize : !width && !height;

        width = width || minWidth;
        height = height || minHeight;

        var deltaW = borderBox.left + borderBox.right;
        var deltaH = borderBox.top + borderBox.bottom;

        var maxW = settings.maxWidth || 0xFFFF;
        var maxH = settings.maxHeight || 0xFFFF;

        // Setup initial layout rect
        self._layoutRect = layoutRect = {
          x: settings.x || 0,
          y: settings.y || 0,
          w: width,
          h: height,
          deltaW: deltaW,
          deltaH: deltaH,
          contentW: width - deltaW,
          contentH: height - deltaH,
          innerW: width - deltaW,
          innerH: height - deltaH,
          startMinWidth: startMinWidth || 0,
          startMinHeight: startMinHeight || 0,
          minW: Math.min(minWidth, maxW),
          minH: Math.min(minHeight, maxH),
          maxW: maxW,
          maxH: maxH,
          autoResize: autoResize,
          scrollW: 0
        };

        self._lastLayoutRect = {};

        return layoutRect;
      },

      /**
       * Getter/setter for the current layout rect.
       *
       * @method layoutRect
       * @param {Object} [newRect] Optional new layout rect.
       * @return {tinymce.ui.Control/Object} Current control or rect object.
       */
      layoutRect: function (newRect) {
        var self = this, curRect = self._layoutRect, lastLayoutRect, size, deltaWidth, deltaHeight, undef, repaintControls;

        // Initialize default layout rect
        if (!curRect) {
          curRect = self.initLayoutRect();
        }

        // Set new rect values
        if (newRect) {
          // Calc deltas between inner and outer sizes
          deltaWidth = curRect.deltaW;
          deltaHeight = curRect.deltaH;

          // Set x position
          if (newRect.x !== undef) {
            curRect.x = newRect.x;
          }

          // Set y position
          if (newRect.y !== undef) {
            curRect.y = newRect.y;
          }

          // Set minW
          if (newRect.minW !== undef) {
            curRect.minW = newRect.minW;
          }

          // Set minH
          if (newRect.minH !== undef) {
            curRect.minH = newRect.minH;
          }

          // Set new width and calculate inner width
          size = newRect.w;
          if (size !== undef) {
            size = size < curRect.minW ? curRect.minW : size;
            size = size > curRect.maxW ? curRect.maxW : size;
            curRect.w = size;
            curRect.innerW = size - deltaWidth;
          }

          // Set new height and calculate inner height
          size = newRect.h;
          if (size !== undef) {
            size = size < curRect.minH ? curRect.minH : size;
            size = size > curRect.maxH ? curRect.maxH : size;
            curRect.h = size;
            curRect.innerH = size - deltaHeight;
          }

          // Set new inner width and calculate width
          size = newRect.innerW;
          if (size !== undef) {
            size = size < curRect.minW - deltaWidth ? curRect.minW - deltaWidth : size;
            size = size > curRect.maxW - deltaWidth ? curRect.maxW - deltaWidth : size;
            curRect.innerW = size;
            curRect.w = size + deltaWidth;
          }

          // Set new height and calculate inner height
          size = newRect.innerH;
          if (size !== undef) {
            size = size < curRect.minH - deltaHeight ? curRect.minH - deltaHeight : size;
            size = size > curRect.maxH - deltaHeight ? curRect.maxH - deltaHeight : size;
            curRect.innerH = size;
            curRect.h = size + deltaHeight;
          }

          // Set new contentW
          if (newRect.contentW !== undef) {
            curRect.contentW = newRect.contentW;
          }

          // Set new contentH
          if (newRect.contentH !== undef) {
            curRect.contentH = newRect.contentH;
          }

          // Compare last layout rect with the current one to see if we need to repaint or not
          lastLayoutRect = self._lastLayoutRect;
          if (lastLayoutRect.x !== curRect.x || lastLayoutRect.y !== curRect.y ||
            lastLayoutRect.w !== curRect.w || lastLayoutRect.h !== curRect.h) {
            repaintControls = Control.repaintControls;

            if (repaintControls) {
              if (repaintControls.map && !repaintControls.map[self._id]) {
                repaintControls.push(self);
                repaintControls.map[self._id] = true;
              }
            }

            lastLayoutRect.x = curRect.x;
            lastLayoutRect.y = curRect.y;
            lastLayoutRect.w = curRect.w;
            lastLayoutRect.h = curRect.h;
          }

          return self;
        }

        return curRect;
      },

      /**
       * Repaints the control after a layout operation.
       *
       * @method repaint
       */
      repaint: function () {
        var self = this, style, bodyStyle, bodyElm, rect, borderBox;
        var borderW, borderH, lastRepaintRect, round, value;

        // Use Math.round on all values on IE < 9
        round = !document.createRange ? Math.round : function (value) {
          return value;
        };

        style = self.getEl().style;
        rect = self._layoutRect;
        lastRepaintRect = self._lastRepaintRect || {};

        borderBox = self.borderBox;
        borderW = borderBox.left + borderBox.right;
        borderH = borderBox.top + borderBox.bottom;

        if (rect.x !== lastRepaintRect.x) {
          style.left = round(rect.x) + 'px';
          lastRepaintRect.x = rect.x;
        }

        if (rect.y !== lastRepaintRect.y) {
          style.top = round(rect.y) + 'px';
          lastRepaintRect.y = rect.y;
        }

        if (rect.w !== lastRepaintRect.w) {
          value = round(rect.w - borderW);
          style.width = (value >= 0 ? value : 0) + 'px';
          lastRepaintRect.w = rect.w;
        }

        if (rect.h !== lastRepaintRect.h) {
          value = round(rect.h - borderH);
          style.height = (value >= 0 ? value : 0) + 'px';
          lastRepaintRect.h = rect.h;
        }

        // Update body if needed
        if (self._hasBody && rect.innerW !== lastRepaintRect.innerW) {
          value = round(rect.innerW);

          bodyElm = self.getEl('body');
          if (bodyElm) {
            bodyStyle = bodyElm.style;
            bodyStyle.width = (value >= 0 ? value : 0) + 'px';
          }

          lastRepaintRect.innerW = rect.innerW;
        }

        if (self._hasBody && rect.innerH !== lastRepaintRect.innerH) {
          value = round(rect.innerH);

          bodyElm = bodyElm || self.getEl('body');
          if (bodyElm) {
            bodyStyle = bodyStyle || bodyElm.style;
            bodyStyle.height = (value >= 0 ? value : 0) + 'px';
          }

          lastRepaintRect.innerH = rect.innerH;
        }

        self._lastRepaintRect = lastRepaintRect;
        self.fire('repaint', {}, false);
      },

      /**
       * Updates the controls layout rect by re-measuing it.
       */
      updateLayoutRect: function () {
        var self = this;

        self.parent()._lastRect = null;

        DomUtils.css(self.getEl(), { width: '', height: '' });

        self._layoutRect = self._lastRepaintRect = self._lastLayoutRect = null;
        self.initLayoutRect();
      },

      /**
       * BindL�wg���p�b������3�E߻e��<�����w�E�����޾��߯�q��;���<:���t�W���q����oY7���g`{�s�7�����>��w�j|o�kwW��~��{��j1f���w�
��s@�[F�"P415H � �H��OA5�d��D2� �#�\0H��(�(�cT��L���촀ST�N� wP0 ���"�r`a0Bf��!$ ��  Xt`8�@�fP@!iQ�� r2*� ��ĸ����4pB	
�̏SpԆ�8 3 >t ��h��� Ơ����
��P2� +HpB�>�u�#"o������r�o������ݷ\5���WW�?#�x�������������/�3�vѽ�oozʹ��������wP���\%�O���u�f�~������|4�]�NX�1��}Gk��[W�燵L���0bQ2	p�  <!z�B�! v�J�	 $
4���@h	��� 	
#3D#�B��� �*w<����*`� ���B�����u����B���^  @Fԗ�[���������~ �+��_W��ܠK�p
D	�J�  �+qV�5  `�� b kF�<�A
$i��#�L��4�� �� 
C@*@X�pB �D`�KF�	0"P(��M�`!Cm���8�Q,�+�Х��%���,(��
�E�_��=����������`���u����/����g���ñ<���,���R���W�'f{�Om���fT�:��[K&��%��/�+#<��se���owl��=`������~
L	� L��:PRX&�@DH��M��H+ �1(Ap��Z%a�"�c	@3�hL# A�d�� % 8����P$ &  E `���RC؋� �p�k���(  cg�0�2�5qo����x��os�W�3>�u���>o��4�Cv�ڏ��]�i빶\6�·�����#��c�z8d�����;�\���[>����3���~��i�O��u{�"��߰7b)�m�8����t���[���^����ޟ���'�?��1��ω6�����w�'.�u���;���g��w�����������e\g��o�6����}�;�Z�;���wI�s������î��k���V����w��n߾�eN�߿I� 32���@  24* �V^��`�6�
dQ d�(� MqDH�C�4LE~ŵP� �P�R X$�� R$�B�P���� �C�#0��� B  �b�TJR� �{����.���B���.m��������g`��~b)�'a��U���&������;��~<6�l��e~a�5������<+���=��{s������6�s���R�N�Y޺�l� �R>�e��G�=mƕً�	
)��%Yr3�`Q��x��Ip0���P�a�����!� �!�
I��&E��
@ AV� D&���!c )���8T�H�1�1� a
�\�� 
�AD�f � +0,� A UC$�.$�i
���{ #d
ː�� N*@��R�0��q_��� �@!cb䪀0m��Ru:j�@�@�E� �я����Wΰ���������M�k�}���7���]Z��m|��[L�o����a��'u��m^�9����w�,y��������+gu߼o�լ��.�߿h_v�����[�$�&���s�1s<;_Vm}ޯ�� 6��0��SpP*p$  t`P�t 2A����D��D,H �FdbCa�
��� �HB��ׁ��( �0M@ᢟxh�!�A @�z�Z �H:÷�vS�w��[����p��]�ֽ�%pv���#v{�Fn����ix��ݸ�_6��.��6����t{��k���/ΖG������n%=�ϲ��6�ݾ����᫧�1 ������zxz�W�Wu�s�W���fS��7����v��W��L�����O�5g��M�[�+��x}���v��^���|��g9����b��o���`��X��bg��^�j���M�gQk�����������[p��p�}���g+���(�kC�PÈ@��0h� L�q��  :t
AB$�%^�ħ ����P,8��7�I<�>�L
QL�@pE�l��K� ��gL��
�n�S%�.�D@�01B�R �f� ��	�H�"����q�X�G�9\"]HC
E^Ñ��� T� @�rQ�S'�I#����h�d`�4J��-0� ��E
"}�<)<J+!�*^oX1D�x������B��X�@U���&����
� P$p��v���
H�	%N��	e@i�C �#	
�P�B���R�
�=�p[
H@�:]͞.��7ЀQ�$P�*��D�C-dK`D��G(��<4 ��ĭz
�~�$�f a�� :
�8A*�s!��2Q��!@�@�"dF��a���a���Aa,�C
����Á"�?� ��0	&@�H�C�L 8B���������I��� -`�D-�
G�򐕺3&��d��Ȉ����p  q?���)�����$Ha�5B�b<�1!A�$:��4�r��2�!#d�P���"�Q�9kiE \��fy]Q0�ð���H
#� QB&&9�@s nØ���� ��4�@����l�(F�@I)"���(bH��4]B����PL
x��4L3�� �r���M���� &843ʃ(�x @�NI���B \^���v\���h@	��H� Fa���tD  ��� �pP ���bpș�PlLe��ǈ	
*�yXx����
�Y����*�Z���" 8�L� ��,B����� �6Ѓ��HQm�a .����H
�F5�f �)J7��K��B0MB��¨�GQ� K ��+,�F�<��X���L%V�E�$�R�Ks�p4�l���T!�ȅ�9��aSp�B"d*�B4X
(�B]�D2��
Ń�2f��X��*��e� A0�W44�X1IEK\"� � g-�Z�#RL dE���
�b������`APIL��HF� ����4�D�

� !��S�q a @�
!�(!�������(	���  \� ]���\ 	
�pP����֬� &
���d"�#
�E@1pa�)%T$�iS��J4B5�ug�   m��6D"�DFD2� �@�1!Bq�J
�	�P��_��C���њ�Eي:���̀J!�i%ڪ�(}$ �NM�/P`EC�(�
Pe���h�DJ��B� .�@�8e@&!���@�Aw �� C�L�@i�����Ȯ�E N��$�8�H	��$�2э�4Sz  J����&h8(`T`�"$�@ �@�8�R�IB"	�b YDyXFH��	�J���k��d�
r)!1�Z��d~(a@A �7��vz "8" ����P�2GD����!�̌&��H �9�S���+4-2&�BC@Lm�� ��� b�@OR&Cfh�H�H�3���&g@B�
̔c٠%�pb�����|��!p�$M�� T aBH�0d� !�Ou2��y'��@	)��ZFX �E�#�-��(� ��orDTH��.�,����i@��S� ̂�%�z ,%'P�����-J��{�� "��"  @�� r�

�@�ZF��Xd @V�*���=� ��z���ؑ��5�S.mX�00 : ��@ ��1A�Hk$DЀH<Z3�ei0��Ƴ�Q�+� �bh��kB�(ͤQZ�*� 'w�P҂A@@���!��4�_�*�q88�`U"�5H�Q<�2�BF�s�H�
 �CR ��(j\�1�V� ��� &(K
          return '&#' + match.charCodeAt(0) + ';';
        });
      },

      /**
       *
       */
      },