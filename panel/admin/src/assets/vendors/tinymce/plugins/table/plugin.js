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
["tinymce.plugins.table.Plugin","tinymce.core.dom.TreeWalker","tinymce.core.Env","tinymce.core.PluginManager","tinymce.core.util.Tools","tinymce.core.util.VK","tinymce.plugins.table.model.TableGrid","tinymce.plugins.table.selection.CellSelection","tinymce.plugins.table.ui.Dialogs","tinymce.plugins.table.ui.ResizeBars","tinymce.plugins.table.util.Quirks","global!tinymce.util.Tools.resolve","tinymce.plugins.table.util.Utils","tinymce.plugins.table.model.SplitCols","tinymce.core.util.Delay"]
jsc*/
defineGlobal("global!tinymce.util.Tools.resolve", tinymce.util.Tools.resolve);
/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.dom.TreeWalker',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.dom.TreeWalker');
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.Env',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.Env');
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.PluginManager',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.PluginManager');
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.util.Tools',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.util.Tools');
  }
);

/**
 * ResolveGlobal.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

define(
  'tinymce.core.util.VK',
  [
    'global!tinymce.util.Tools.resolve'
  ],
  function (resolve) {
    return resolve('tinymce.util.VK');
  }
);

/**
 * Utils.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * Various utility functions.
 *
 * @class tinymce.table.util.Utils
 * @private
 */
define(
  'tinymce.plugins.table.util.Utils',
  [
    'tinymce.core.Env'
  ],
  function (Env) {
    var setSpanVal = function (name) {
      return function (td, val) {
        if (td) {
          val = parseInt(val, 10);

          if (val === 1 || val === 0) {
            td.removeAttribute(name, 1);
          } else {
            td.setAttribute(name, val, 1);
          }
        }
      };
    };

    var getSpanVal = function (name) {
      return function (td) {
        return parseInt(td.getAttribute(name) || 1, 10);
      };
    };

    function paddCell(cell) {
      if (!Env.ie || Env.ie > 9) {
        if (!cell.hasChildNodes()) {
          cell.innerHTML = '<br data-mce-bogus="1" />';
        }
      }
    }

    return {
      setColSpan: setSpanVal('colSpan'),
      setRowSpan: setSpanVal('rowspan'),
      getColSpan: getSpanVal('colSpan'),
      getRowSpan: getSpanVal('rowSpan'),
      setSpanVal: function (td, name, value) {
        setSpanVal(name)(td, value);
      },
      getSpanVal: function (td, name) {
        return getSpanVal(name)(td);
      },
      paddCell: paddCell
    };
  }
);

/**
 * SplitCols.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2016 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * Contains logic for handling splitting of merged rows.
 *
 * @class tinymce.table.model.SplitCols
 * @private
 */
define(
  'tinymce.plugins.table.model.SplitCols',
  [
    'tinymce.core.util.Tools',
    'tinymce.plugins.table.util.Utils'
  ],
  function (Tools, Utils) {
    var getCellAt = function (grid, x, y) {
      return grid[y] ? grid[y][x] : null;
    };

    var getCellElmAt = function (grid, x, y) {
      var cell = getCellAt(grid, x, y);
      return cell ? cell.elm : null;
    };

    var countHoles = function (grid, x, y, delta) {
      var y2, cell, count = 0, elm = getCellElmAt(grid, x, y);

      for (y2 = y; delta > 0 ? y2 < grid.length : y2 >= 0; y2 += delta) {
        cell = getCellAt(grid, x, y2);
        if (elm !== cell.elm) {
          break;
        }

        count++;
      }

      return count;
    };

    var findRealElm = function (grid, x, y) {
      var cell, row = grid[y];

      for (var x2 = x; x2 < row.length; x2++) {
        cell = row[x2];
        if (cell.real) {
          return cell.elm;
        }
      }

      return null;
    };

    var getRowSplitInfo = function (grid, y) {
      var cell, result = [], row = grid[y];

      for (var x = 0; x < row.length; x++) {
        cell = row[x];
        result.push({
          elm: cell.elm,
          above: countHoles(grid, x, y, -1) - 1,
          below: countHoles(grid, x, y, 1) - 1
        });

        x += Utils.getColSpan(cell.elm) - 1;
      }

      return result;
    };

    var createCell = function (info, rowSpan) {
      var doc = info.elm.ownerDocument;
      var newCell = doc.createElement('td');

      Utils.setColSpan(newCell, Utils.getColSpan(info.elm));
      Utils.setRowSpan(newCell, rowSpan);
      Utils.paddCell(newCell);

      return newCell;
    };

    var insertOrAppendCell = function (grid, newCell, x, y) {
      var realCellElm = findRealElm(grid, x + 1, y);

      if (!realCellElm) {
        realCellElm = findRealElm(grid, 0, y);
        realCellElm.parentNode.appendChild(newCell);
      } else {
        realCellElm.parentNode.insertBefore(newCell, realCellElm);
      }
    };

    var splitAbove = function (grid, info, x, y) {
      if (info.above !== 0) {
        Utils.setRowSpan(info.elm, info.above);
        var cell = createCell(info, info.below + 1);
        insertOrAppendCell(grid, cell, x, y);
        return cell;
      }

      return null;
    };

    var splitBelow = function (grid, info, x, y) {
      if (info.below !== 0) {
        Utils.setRowSpan(info.elm, info.above + 1);
        var cell = createCell(info, info.below);
        insertOrAppendCell(grid, cell, x, y + 1);
        return cell;
      }

      return null;
    };

    var splitAt = function (grid, x, y, before) {
      var rowInfos = getRowSplitInfo(grid, y);
      var rowElm = getCellElmAt(grid, x, y).parentNode;
      var cells = [];

      Tools.each(rowInfos, function (info, x) {
        var cell = before ? splitAbove(grid, info, x, y) : splitBelow(grid, info, x, y);
        if (cell !== null) {
          cells.push(cells);
        }
      });

      return {
        cells: cells,
        row: rowElm
      };
    };

    return {
      splitAt: splitAt
    };
  }
);

/**
 * TableGrid.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class creates a grid out of a table element. This
 * makes it a whole lot easier to handle complex tables with
 * col/row spans.
 *
 * @class tinymce.table.model.TableGrid
 * @private
 */
define(
  'tinymce.plugins.table.model.TableGrid',
  [
    'tinymce.core.util.Tools',
    'tinymce.core.Env',
    'tinymce.plugins.table.util.Utils',
    'tinymce.plugins.table.model.SplitCols'
  ],
  function (Tools, Env, Utils, SplitCols) {
    var each = Tools.each, getSpanVal = Utils.getSpanVal, setSpanVal = Utils.setSpanVal;

    return function (editor, table, selectedCell) {
      var grid, gridWidth, startPos, endPos, selection = editor.selection, dom = selection.dom;

      function removeCellSelection() {
        editor.$('td[data-mce-selected],th[data-mce-selected]').removeAttr('data-mce-selected');
      }

      function isEditorBody(node) {
        return node === editor.getBody();
      }

      function getChildrenByName(node, names) {
        if (!node) {
          return [];
        }

        names = Tools.map(names.split(','), function (name) {
          return name.toLowerCase();
        });

        return Tools.grep(node.childNodes, function (node) {
          return Tools.inArray(names, node.nodeName.toLowerCase()) !== -1;
        });
      }

      function buildGrid() {
        var startY = 0;

        grid = [];
        gridWidth = 0;

        each(['thead', 'tbody', 'tfoot'], function (part) {
          var partElm = getChildrenByName(table, part)[0];
          var rows = getChildrenByName(partElm, 'tr');

          each(rows, function (tr, y) {
            y += startY;

            each(getChildrenByName(tr, 'td,th'), function (td, x) {
              var x2, y2, rowspan, colspan;

              // Skip over existing cells produced by rowspan
              if (grid[y]) {
                while (grid[y][x]) {
                  x++;
                }
              }

              // Get col/rowspan from cell
              rowspan = getSpanVal(td, 'rowspan');
              colspan = getSpanVal(td, 'colspan');

              // Fill out rowspan/colspan right and down
              for (y2 = y; y2 < y + rowspan; y2++) {
                if (!grid[y2]) {
                  grid[y2] = [];
                }

                for (x2 = x; x2 < x + colspan; x2++) {
                  grid[y2][x2] = {
                    part: part,
                    real: y2 == y && x2 == x,
                    elm: td,
                    rowspan: rowspan,
                    colspan: colspan
                  };
                }
              }

              gridWidth = Math.max(gridWidth, x + 1);
            });
          });

          startY += rows.length;
        });
      }

      function fireNewRow(node) {
        editor.fire('newrow', {
          node: node
        });

        return node;
      }

      function fireNewCell(node) {
        editor.fire('newcell', {
          node: node
        });

        return node;
      }

      function cloneNode(node, children) {
        node = node.cloneNode(children);
        node.removeAttribute('id');

        return node;
      }

      function getCell(x, y) {
        var row;

        row = grid[y];
        if (row) {
          return row[x];
        }
      }

      function getRow(grid, y) {
        return grid[y] ? grid[y] : null;
      }

      function getColumn(grid, x) {
        var out = [];

        for (var y = 0; y < grid.length; y++) {
          out.push(getCell(x, y));
        }

        return out;
      }

      function isCellSelected(cell) {
        return cell && (!!dom.getAttrib(cell.elm, 'data-mce-selected') || cell == selectedCell);
      }

      function getSelectedRows() {
        var rows = [];

        each(table.rows, function (row) {
          each(row.cells, function (cell) {
            if (dom.getAttrib(cell, 'data-mce-selected') || (selectedCell && cell == selectedCell.elm)) {
              rows.push(row);
              return false;
            }
          });
        });

        return rows;
      }

      function countSelectedCols() {
        var cols = 0;

        each(grid, function (row) {
          each(row, function (cell) {
            if (isCellSelected(cell)) {
              cols++;
            }
          });
          if (cols) {
            return false;
          }
        });

        return cols;
      }

      function deleteTable() {
        var rng = dom.createRng();

        if (isEditorBody(table)) {
          return;
        }

        rng.setStartAfter(table);
        rng.setEndAfter(table);

        selection.setRng(rng);

        dom.remove(table);
      }

      function cloneCell(cell) {
        var formatNode, cloneFormats = {};

        if (editor.settings.table_clone_elements !== false) {
          cloneFormats = Tools.makeMap(
            (editor.settings.table_clone_elements || 'strong em b i span font h1 h2 h3 h4 h5 h6 p div').toUpperCase(),
            /[ ,]/
          );
        }

        // Clone formats
        Tools.walk(cell, function (node) {
          var curNode;

          if (node.nodeType == 3) {
            each(dom.getParents(node.parentNode, null, cell).reverse(), function (node) {
              if (!cloneFormats[node.nodeName]) {
                return;
              }

              node = cloneNode(node, false);

              if (!formatNode) {
                formatNode = curNode = node;
              } else if (curNode) {
                curNode.appendChild(node);
              }

              curNode = node;
            });

            // Add something to the inner node
            if (curNode) {
              curNode.innerHTML = Env.ie && Env.ie < 10 ? '&nbsp;' : '<br data-mce-bogus="1" />';
            }

            return false;
          }
        }, 'childNodes');

        cell = cloneNode(cell, false);
        fireNewCell(cell);

        setSpanVal(cell, 'rowSpan', 1);
        setSpanVal(cell, 'colSpan', 1);

        if (formatNode) {
          cell.appendChild(formatNode);
        } else {
          Utils.paddCell(cell);
        }

        return cell;
      }

      function cleanup() {
        var rng = dom.createRng(), row;

        // Empty rows
        each(dom.select('tr', table), function (tr) {
          if (tr.cells.length === 0) {
            dom.remove(tr);
          }
        });

        // Empty table
        if (dom.select('tr', table).length === 0) {
          rng.setStartBefore(table);
          rng.setEndBefore(table);
          selection.setRng(rng);
          dom.remove(table);
          return;
        }

        // Empty header/body/footer
        each(dom.select('thead,tbody,tfoot', table), function (part) {
          if (part.rows.length === 0) {
            dom.remove(part);
          }
        });

        // Restore selection to start position if it still exists
        buildGrid();

        // If we have a valid startPos object
        if (startPos) {
          // Restore the selection to the closest table position
          row = grid[Math.min(grid.length - 1, startPos.y)];
          if (row) {
            selection.select(row[Math.min(row.length - 1, startPos.x)].elm, true);
            selection.collapse(true);
          }
        }
      }

      function fillLeftDown(x, y, rows, cols) {
        var tr, x2, r, c, cell;

        tr = grid[y][x].elm.parentNode;
        for (r = 1; r <= rows; r++) {
          tr = dom.getNext(tr, 'tr');

          if (tr) {
            // Loop left to find real cell
            for (x2 = x; x2 >= 0; x2--) {
              cell = grid[y + r][x2].elm;

              if (cell.parentNode == tr) {
                // Append clones after
                for (c = 1; c <= cols; c++) {
                  dom.insertAfter(cloneCell(cell), cell);
                }

                break;
              }
            }

            if (x2 == -1) {
              // Insert nodes before first cell
              for (c = 1; c <= cols; c++) {
                tr.insertBefore(cloneCell(tr.cells[0]), tr.cells[0]);
              }
            }
          }
        }
      }

      function split() {
        each(grid, function (row, y) {
          each(row, function (cell, x) {
            var colSpan, rowSpan, i;

            if (isCellSelected(cell)) {
              cell = cell.elm;
              colSpan = getSpanVal(cell, 'colspan');
              rowSpan = getSpanVal(cell, 'rowspan');

              if (colSpan > 1 || rowSpan > 1) {
                setSpanVal(cell, 'rowSpan', 1);
                setSpanVal(cell, 'colSpan', 1);

                // Insert cells right
                for (i = 0; i < colSpan - 1; i++) {
                  dom.insertAfter(cloneCell(cell), cell);
                }

                fillLeftDown(x, y, rowSpan - 1, colSpan);
              }
            }
          });
        });
      }

      function findItemsOutsideOfRange(items, start, end) {
        var out = [];

        for (var i = 0; i < items.length; i++) {
          if (i < start || i > end) {
            out.push(items[i]);
          }
        }

        return out;
      }

      function getFakeCells(cells) {
        return Tools.grep(cells, function (cell) {
          return cell.real === false;
        });
      }

      function getUniqueElms(cells) {
        var elms = [];

        for (var i = 0; i < cells.length; i++) {
          var elm = cells[i].elm;
          if (elms[elms.length - 1] !== elm) {
            elms.push(elm);
          }
        }

        return elms;
      }

      function reduceRowSpans(grid, startX, startY, endX, endY) {
        var count = 0;

        if (endY - startY < 1) {
          return 0;
        }

        for (var y = startY + 1; y <= endY; y++) {
          var allCells = findItemsOutsideOfRange(getRow(grid, y), startX, endX);
          var fakeCells = getFakeCells(allCells);

          if (allCells.length === fakeCells.length) {
            Tools.each(getUniqueElms(fakeCells), function (elm) {
              Utils.setRowSpan(elm, Utils.getRowSpan(elm) - 1);
            });

            count++;
          }
        }

        return count;
      }

      function reduceColSpans(grid, startX, startY, endX, endY) {
        var count = 0;

        if (endX - startX < 1) {
          return 0;
        }

        for (var x = startX + 1; x <= endX; x++) {
          var allCells = findItemsOutsideOfRange(getColumn(grid, x), startY, endY);
          var fakeCells = getFakeCells(allCells);

          if (allCells.length === fakeCells.length) {
            Tools.each(getUniqueElms(fakeCells), function (elm) {
              Utils.setColSpan(elm, Utils.getColSpan(elm) - 1);
            });

            count++;
          }
        }

        return count;
      }

      function merge(cell, cols, rows) {
        var pos, startX, startY, endX, endY, x, y, startCell, endCell, children, count, reducedRows, reducedCols;

        // Use specified cell and cols/rows
        if (cell) {
          pos = getPos(cell);
          startX = pos.x;
          startY = pos.y;
          endX = startX + (cols - 1);
          endY = startY + (rows - 1);
        } else {
          startPos = endPos = null;

          // Calculate start/end pos by checking for selected cells in grid works better with context menu
          each(grid, function (row, y) {
            each(row, function (cell, x) {
              if (isCellSelected(cell)) {
                if (!startPos) {
                  startPos = { x: x, y: y };
                }

                endPos = { x: x, y: y };
              }
            });
          });

          // Use selection, but make sure startPos is valid before accessing
          if (startPos) {
            startX = startPos.x;
            startY = startPos.y;
            endX = endPos.x;
            endY = endPos.y;
          }
        }

        // Find start/end cells
        startCell = getCell(startX, startY);
        endCell = getCell(endX, endY);

        // Check if the cells exists and if they are of the same part for example tbody = tbody
        if (startCell && endCell && startCell.part == endCell.part) {
          // Split and rebuild grid
          split();
          buildGrid();

          reducedRows = reduceRowSpans(grid, startX, startY, endX, endY);
          reducedCols = reduceColSpans(grid, startX, startY, endX, endY);

          // Set row/col span to start cell
          startCell = getCell(startX, startY).elm;
          var colSpan = (endX - startX - reducedCols) + 1;
          var rowSpan = (endY - startY - reducedRows) + 1;

          // All cells in table selected then just make it a table with one cell
          if (colSpan === gridWidth && rowSpan === grid.length) {
            colSpan = 1;
            rowSpan = 1;
          }

          // Multiple whole rows selected then just make it one rowSpan
          if (colSpan === gridWidth && rowSpan > 1) {
            rowSpan = 1;
          }

          setSpanVal(startCell, 'colSpan', colSpan);
          setSpanVal(startCell, 'rowSpan', rowSpan);

          // Remove other cells and add it's contents to the start cell
          for (y = startY; y <= endY; y++) {
            for (x = startX; x <= endX; x++) {
              if (!grid[y] || !grid[y][x]) {
                continue;
              }

              cell = grid[y][x].elm;

              /*jshint loopfunc:true */
              /*eslint no-loop-func:0 */
              if (cell != startCell) {
                // Move children to startCell
                children = Tools.grep(cell.childNodes);
                each(children, function (node) {
                  startCell.appendChild(node);
                });

                // Remove bogus nodes if there is children in the target cell
                if (children.length) {
                  children = Tools.grep(startCell.childNodes);
                  count = 0;
                  each(children, function (node) {
                    if (node.nodeName == 'BR' && count++ < children.length - 1) {
                      startCell.removeChild(node);
                    }
                  });
                }

                dom.remove(cell);
              }
            }
          }

          // Remove empty rows etc and restore caret location
          cleanup();
        }
      }

      function insertRow(before) {
        var posY, cell, lastCell, x, rowElm, newRow, newCell, otherCell, rowSpan, spanValue;

        // Find first/last row
        each(grid, function (row, y) {
          each(row, function (cell) {
            if (isCellSelected(cell)) {
              cell = cell.elm;
              rowElm = cell.parentNode;
              newRow = fireNewRow(cloneNode(rowElm, false));
              posY = y;

              if (before) {
                return false;
              }
            }
          });

          if (before) {
            return posY === undefined;
          }
        });

        // If posY is undefined there is nothing for us to do here...just return to avoid crashing below
        if (posY === undefined) {
          return;
        }

        for (x = 0, spanValue = 0; x < grid[0].length; x += spanValue) {
          // Cell not found could be because of an invalid table structure
          if (!grid[posY][x]) {
            continue;
          }

          cell = grid[posY][x].elm;
          spanValue = getSpanVal(cell, 'colspan');

          if (cell != lastCell) {
            if (!before) {
              rowSpan = getSpanVal(cell, 'rowspan');
              if (rowSpan > 1) {
                setSpanVal(cell, 'rowSpan', rowSpan + 1);
                continue;
              }
            } else {
              // Check if cell above can be expanded
              if (posY > 0 && grid[posY - 1][x]) {
                otherCell = grid[posY - 1][x].elm;
                rowSpan = getSpanVal(otherCell, 'rowSpan');
                if (rowSpan > 1) {
                  setSpanVal(otherCell, 'rowSpan', rowSpan + 1);
                  continue;
                }
              }
            }

            // Insert new cell into new row
            newCell = cloneCell(cell);
            setSpanVal(newCell, 'colSpan', cell.colSpan);

            newRow.appendChild(newCell);

            lastCell = cell;
          }
        }

        if (newRow.hasChildNodes()) {
          if (!before) {
            dom.insertAfter(newRow, rowElm);
          } else {
            rowElm.parentNode.insertBefore(newRow, rowElm);
          }
        }
      }

      function insertRows(before, num) {
        num = num || getSelectedRows().length || 1;
        for (var i = 0; i < num; i++) {
          insertRow(before);
        }
      }

      function insertCol(before) {
        var posX, lastCell;

        // Find first/last column
        each(grid, function (row) {
          each(row, function (cell, x) {
            if (isCellSelected(cell)) {
              posX = x;

              if (before) {
                return false;
              }
            }
          });

          if (before) {
            return posX === undefined;
          }
        });

        each(grid, function (row, y) {
          var cell, rowSpan, colSpan;

          if (!row[posX]) {
            return;
          }

          cell = row[posX].elm;
          if (cell != lastCell) {
            colSpan = getSpanVal(cell, 'colspan');
            rowSpan = getSpanVal(cell, 'rowspan');

            if (colSpan == 1) {
              if (!before) {
                dom.insertAfter(cloneCell(cell), cell);
                fillLeftDown(posX, y, rowSpan - 1, colSpan);
              } else {
                cell.parentNode.insertBefore(cloneCell(cell), cell);
                fillLeftDown(posX, y, rowSpan - 1, colSpan);
              }
            } else {
              setSpanVal(cell, 'colSpan', cell.colSpan + 1);
            }

            lastCell = cell;
          }
        });
      }

      function insertCols(before, num) {
        num = num || countSelectedCols() || 1;
        for (var i = 0; i < num; i++) {
          insertCol(before);
        }
      }

      function getSelectedCells(grid) {
        return Tools.grep(getAllCells(grid), isCellSelected);
      }

      function getAllCells(grid) {
        var cells = [];

        each(grid, function (row) {
          each(row, function (cell) {
            cells.push(cell);
          });
        });

        return cells;
      }

      function deleteCols() {
        var cols = [];

        if (isEditorBody(table)) {
          if (grid[0].length == 1) {
            return;
          }

          if (getSelectedCells(grid).length == getAllCells(grid).length) {
            return;
          }
        }

        // Get selected column indexes
        each(grid, function (row) {
          each(row, function (cell, x) {
            if (isCellSelected(cell) && Tools.inArray(cols, x) === -1) {
              each(grid, function (row) {
                var cell = row[x].elm, colSpan;

                colSpan = getSpanVal(cell, 'colSpan');

                if (colSpan > 1) {
                  setSpanVal(cell, 'colSpan', colSpan - 1);
                } else {
                  dom.remove(cell);
                }
              });

              cols.push(x);
            }
          });
        });

        cleanup();
      }

      function deleteRows() {
        var rows;

        function deleteRow(tr) {
          var pos, lastCell;

          // Move down row spanned cells
          each(tr.cells, function (cell) {
            var rowSpan = getSpanVal(cell, 'rowSpan');

            if (rowSpan > 1) {
              setSpanVal(cell, 'rowSpan', rowSpan - 1);
              pos = getPos(cell);
              fillLeftDown(pos.x, pos.y, 1, 1);
            }
          });

          // Delete cells
          pos = getPos(tr.cells[0]);
          each(grid[pos.y], function (cell) {
            var rowSpan;

            cell = cell.elm;

            if (cell != lastCell) {
              rowSpan = getSpanVal(cell, 'rowSpan');

              if (rowSpan <= 1) {
                dom.remove(cell);
              } else {
                setSpanVal(cell, 'rowSpan', rowSpan - 1);
              }

              lastCell = cell;
            }
          });
        }

        // Get selected rows and move selection out of scope
        rows = getSelectedRows();

        if (isEditorBody(table) && rows.length == table.rows.length) {
          return;
        }

        // Delete all selected rows
        each(rows.reverse(), function (tr) {
          deleteRow(tr);
        });

        cleanup();
      }

      function cutRows() {
        var rows = getSelectedRows();

        if (isEditorBody(table) && rows.length == table.rows.length) {
          return;
        }

        dom.remove(rows);
        cleanup();

        return rows;
      }

      function copyRows() {
        var rows = getSelectedRows();

        each(rows, function (row, i) {
          rows[i] = cloneNode(row, true);
        });

        return rows;
      }

      function pasteRows(rows, before) {
        var splitResult, targetRow, newRows;

        // indices of the rows where rowspans expire (a way to handle multiple rowspans in the same row)
        var rowSpansDueAt = [];

        // Nothing to paste
        if (!rows) {
          return;
        }

        splitResult = SplitCols.splitAt(grid, startPos.x, startPos.y, before);
        targetRow = splitResult.row;
        Tools.each(splitResult.cells, fireNewCell);

        newRows = Tools.map(rows, function (row) {
          return row.cloneNode(true);
        });

        each(newRows, function (row, y, rows) {
          var x, cellCount = row.cells.length, cell, colCount = 0, rowSpan, colSpan;

          fireNewRow(row);

          for (x = 0; x < cellCount; x++) {
            cell = row.cells[x];

            colSpan = getSpanVal(cell, 'colspan');
            rowSpan = getSpanVal(cell, 'rowspan');

            colCount += colSpan;

            if (rowSpan > 1) {
              colCount--; // decrement for every activated rowspan (count will be adjusted below)

              if (y + rowSpan > rows.length) {
                // adjust rowspan to the number of available rows
                rowSpan = rows.length - y;
                setSpanVal(cell, 'rowSpan', rowSpan);
                rowSpansDueAt.push(rows.length - 1);
              } else {
                rowSpansDueAt.push(y + rowSpan - 1);
              }
            }

            fireNewCell(cell);
          }

          // take into account currently active rowspans
          each(rowSpansDueAt, function (dueY) {
            if (y <= dueY) {
              colCount++;
            }
          });

          // Needs more cells
          for (x = colCount; x < gridWidth; x++) {
            row.appendChild(cloneCell(row.cells[cellCount - 1]));
          }

          // Needs less cells
          for (x = gridWidth; x < colCount; x++) {
            cell = row.cells[row.cells.length - 1];
            colSpan = getSpanVal(cell, 'colspan');
            if (colSpan > 1) {
              setSpanVal(cell, 'colSpan', colSpan - 1);
            } else {
              dom.remove(cell);
            }
          }

          // Add before/after
          if (before) {
            targetRow.parentNode.insertBefore(row, targetRow);
          } else {
            targetRow = dom.insertAfter(row, targetRow);
          }
        });

        removeCellSelection();
      }

      function getPos(target) {
        var pos;

        each(grid, function (row, y) {
          each(row, function (cell, x) {
            if (cell.elm == target) {
              pos = { x: x, y: y };
              return false;
            }
          });

          return !pos;
        });

        return pos;
      }

      function setStartCell(cell) {
        startPos = getPos(cell);
      }

      function findEndPos() {
        var maxX, maxY;

        maxX = maxY = 0;

        each(grid, function (row, y) {
          each(row, function (cell, x) {
            var colSpan, rowSpan;

            if (isCellSelected(cell)) {
              cell = grid[y][x];

              if (x > maxX) {
                maxX = x;
              }

              if (y > maxY) {
                maxY = y;
              }

              if (cell.real) {
                colSpan = cell.colspan - 1;
                rowSpan = cell.rowspan - 1;

                if (colSpan) {
                  if (x + colSpan > maxX) {
                    maxX = x + colSpan;
                  }
                }

                if (rowSpan) {
                  if (y + rowSpan > maxY) {
                    maxY = y + rowSpan;
                  }
                }
              }
            }
          });
        });

        return { x: maxX, y: maxY };
      }

      function setEndCell(cell) {
        var startX, startY, endX, endY, maxX, maxY, colSpan, rowSpan, x, y;

        endPos = getPos(cell);

        if (startPos && endPos) {
          // Get start/end positions
          startX = Math.min(startPos.x, endPos.x);
          startY = Math.min(startPos.y, endPos.y);
          endX = Math.max(startPos.x, endPos.x);
          endY = Math.max(startPos.y, endPos.y);

          // Expand end position to include spans
          maxX = endX;
          maxY = endY;

          // This logic tried to expand the selection to always be a rectangle
          // Expand startX
          /*for (y = startY; y <= maxY; y++) {
            cell = grid[y][startX];

            if (!cell.real) {
              newX = startX - (cell.colspan - 1);
              if (newX < startX && newX >= 0) {
                startX = newX;
              }
            }
          }

          // Expand startY
          for (x = startX; x <= maxX; x++) {
            cell = grid[startY][x];

            if (!cell.real) {
              newY = startY - (cell.rowspan - 1);
              if (newY < startY && newY >= 0) {
                startY = newY;
              }
            }
          }*/

          // Find max X, Y
          for (y = startY; y <= endY; y++) {
            for (x = startX; x <= endX; x++) {
              cell = grid[y][x];

              if (cell.real) {
                colSpan = cell.colspan - 1;
                rowSpan = cell.rowspan - 1;

                if (colSpan) {
                  if (x + colSpan > maxX) {
                    maxX = x + colSpan;
                  }
                }

                if (rowSpan) {
                  if (y + rowSpan > maxY) {
                    maxY = y + rowSpan;
                  }
                }
              }
            }
          }

          removeCellSelection();

          // Add new selection
          for (y = startY; y <= maxY; y++) {
            for (x = startX; x <= maxX; x++) {
              if (grid[y][x]) {
                dom.setAttrib(grid[y][x].elm, 'data-mce-selected', '1');
              }
            }
          }
        }
      }

      function moveRelIdx(cellElm, delta) {
        var pos, index, cell;

        pos = getPos(cellElm);
        index = pos.y * gridWidth + pos.x;

        do {
          index += delta;
          cell = getCell(index % gridWidth, Math.floor(index / gridWidth));

          if (!cell) {
            break;
          }

          if (cell.elm != cellElm) {
            selection.select(cell.elm, true);

            if (dom.isEmpty(cell.elm)) {
              selection.collapse(true);
            }

            return true;
          }
        } while (cell.elm == cellElm);

        return false;
      }

      function splitCols(before) {
        if (startPos) {
          var splitResult = SplitCols.splitAt(grid, startPos.x, startPos.y, before);
          Tools.each(splitResult.cells, fireNewCell);
        }
      }

      table = table || dom.getParent(selection.getStart(true), 'table');

      buildGrid();

      selectedCell = selectedCell || dom.getParent(selection.getStart(true), 'th,td');

      if (selectedCell) {
        startPos = getPos(selectedCell);
        endPos = findEndPos();
        selectedCell = getCell(startPos.x, startPos.y);
      }

      Tools.extend(this, {
        deleteTable: deleteTable,
        split: split,
        merge: merge,
        insertRow: insertRow,
        insertRows: insertRows,
        insertCol: insertCol,
        insertCols: insertCols,
        splitCols: splitCols,
        deleteCols: deleteCols,
        deleteRows: deleteRows,
        cutRows: cutRows,
        copyRows: copyRows,
        pasteRows: pasteRows,
        getPos: getPos,
        setStartCell: setStartCell,
        setEndCell: setEndCell,
        moveRelIdx: moveRelIdx,
        refresh: buildGrid
      });
    };
  }
);

/**
 * CellSelection.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class handles table cell selection by faking it using a css class that gets applied
 * to cells when dragging the mouse from one cell to another.
 *
 * @class tinymce.table.selection.CellSelection
 * @private
 */
define(
  'tinymce.plugins.table.selection.CellSelection',
  [
    'tinymce.plugins.table.model.TableGrid',
    'tinymce.core.dom.TreeWalker',
    'tinymce.core.util.Tools'
  ],
  function (TableGrid, TreeWalker, Tools) {
    return function (editor, selectionChange) {
      var dom = editor.dom, tableGrid, startCell, startTable, lastMouseOverTarget, hasCellSelection = true, resizing, dragging;

      function clear(force) {
        // Restore selection possibilities
        editor.getBody().style.webkitUserSelect = '';

        if (force || hasCellSelection) {
          editor.$('td[data-mce-selected],th[data-mce-selected]').removeAttr('data-mce-selected');
          hasCellSelection = false;
        }
      }

      var endSelection = function () {
        startCell = tableGrid = startTable = lastMouseOverTarget = null;
        selectionChange(false);
      };

      function isCellInTable(table, cell) {
        if (!table || !cell) {
          return false;
        }

        return table === dom.getParent(cell, 'table');
      }

      function cellSelectionHandler(e) {
        var sel, target = e.target, currentCell;

        if (resizing || dragging) {
          return;
        }

        // Fake mouse enter by keeping track of last mouse over
        if (target === lastMouseOverTarget) {
          return;
        }

        lastMouseOverTarget = target;

        if (startTable && startCell) {
          currentCell = dom.getParent(target, 'td,th');

          if (!isCellInTable(startTable, currentCell)) {
            currentCell = dom.getParent(startTable, 'td,th');
          }

          // Selection inside first cell is normal until we have expanted
          if (startCell === currentCell && !hasCellSelection) {
            return;
          }

          selectionChange(true);

          if (isCellInTable(startTable, currentCell)) {
            e.preventDefault();

            if (!tableGrid) {
              tableGrid = new TableGrid(editor, startTable, startCell);
              editor.getBody().style.webkitUserSelect = 'none';
            }

            tableGrid.setEndCell(currentCell);
            hasCellSelection = true;

            // Remove current selection
            sel = editor.selection.getSel();

            try {
              if (sel.removeAllRanges) {
                sel.removeAllRanges();
              } else {
                sel.empty();
              }
            } catch (ex) {
              // IE9 might throw errors here
            }
          }
        }
      }

      editor.on('SelectionChange', function (e) {
        if (hasCellSelection) {
          e.stopImmediatePropagation();
        }
      }, true);

      // Add cell selection logic
      editor.on('MouseDown', function (e) {
        if (e.button != 2 && !resizing && !dragging) {
          clear();

          startCell = dom.getParent(e.target, 'td,th');
          startTable = dom.getParent(startCell, 'table');
        }
      });

      editor.on('mouseover', cellSelectionHandler);

      editor.on('remove', function () {
        dom.unbind(editor.getDoc(), 'mouseover', cellSelectionHandler);
        clear();
      });

      editor.on('MouseUp', function () {
        var rng, sel = editor.selection, selectedCells, walker, node, lastNode;

        function setPoint(node, start) {
          var walker = new TreeWalker(node, node);

          do {
            // Text node
            if (node.nodeType == 3 && Tools.trim(node.nodeValue).length !== 0) {
              if (start) {
                rng.setStart(node, 0);
              } else {
                rng.setEnd(node, node.nodeValue.length);
              }

              return;
            }

            // BR element
            if (node.nodeName == 'BR') {
              if (start) {
                rng.setStartBefore(node);
              } else {
                rng.setEndBefore(node);
              }

              return;
            }
          } while ((node = (start ? walker.next() : walker.prev())));
        }

        // Move selection to startCell
        if (startCell) {
          if (tableGrid) {
            editor.getBody().style.webkitUserSelect = '';
          }

          // Try to expand text selection as much as we can only Gecko supports cell selection
          selectedCells = dom.select('td[data-mce-selected],th[data-mce-selected]');
          if (selectedCells.length > 0) {
            rng = dom.createRng();
            node = selectedCells[0];
            rng.setStartBefore(node);
            rng.setEndAfter(node);

            setPoint(node, 1);
            walker = new TreeWalker(node, dom.getParent(selectedCells[0], 'table'));

            do {
              if (node.nodeName == 'TD' || node.nodeName == 'TH') {
                if (!dom.getAttrib(node, 'data-mce-selected')) {
                  break;
                }

                lastNode = node;
              }
            } while ((node = walker.next()));

            setPoint(lastNode);

            sel.setRng(rng);
          }

          editor.nodeChanged();
          endSelection();
        }
      });

      editor.on('KeyUp Drop SetContent', function (e) {
        clear(e.type == 'setcontent');
        endSelection();
        resizing = false;
      });

      editor.on('ObjectResizeStart ObjectResized', function (e) {
        resizing = e.type != 'objectresized';
      });

      editor.on('dragstart', function () {
        dragging = true;
      });

      editor.on('drop dragend', function () {
        dragging = false;
      });

      return {
        clear: clear
      };
    };
  }
);

/**
 * Dialogs.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/*eslint dot-notation:0*/

/**
 * ...
 *
 * @class tinymce.table.ui.Dialogs
 * @private
 */
define(
  'tinymce.plugins.table.ui.Dialogs',
  [
    'tinymce.core.util.Tools',
    'tinymce.core.Env'
  ],
  function (Tools, Env) {
    var each = Tools.each;

    return function (editor) {
      var self = this;

      function createColorPickAction() {
        var colorPickerCallback = editor.settings.color_picker_callback;

        if (colorPickerCallback) {
          return function () {
            var self = this;

            colorPickerCallback.call(
              editor,
              function (value) {
                self.value(value).fire('change');
              },
              self.value()
            );
          };
        }
      }

      function createStyleForm(dom) {
        return {
          title: 'Advanced',
          type: 'form',
          defaults: {
            onchange: function () {
              updateStyle(dom, this.parents().reverse()[0], this.name() == "style");
            }
          },
          items: [
            {
              label: 'Style',
              name: 'style',
              type: 'textbox'
            },

            {
              type: 'form',
              padding: 0,
              formItemDefaults: {
                layout: 'grid',
                alignH: ['start', 'right']
              },
              defaults: {
                size: 7
              },
              items: [
                {
                  label: 'Border color',
                  type: 'colorbox',
                  name: 'borderColor',
                  onaction: createColorPickAction()
                },

                {
                  label: 'Background color',
                  type: 'colorbox',
                  name: 'backgroundColor',
                  onaction: createColorPickAction()
                }
              ]
            }
          ]
        };
      }

      function removePxSuffix(size) {
        return size ? size.replace(/px$/, '') : "";
      }

      function addSizeSuffix(size) {
        if (/^[0-9]+$/.test(size)) {
          size += "px";
        }

        return size;
      }

      function unApplyAlign(elm) {
        each('left center right'.split(' '), function (name) {
          editor.formatter.remove('align' + name, {}, elm);
        });
      }

      function unApplyVAlign(elm) {
        each('top middle bottom'.split(' '), function (name) {
          editor.formatter.remove('valign' + name, {}, elm);
        });
      }

      function buildListItems(inputList, itemCallback, startItems) {
        function appendItems(values, output) {
          output = output || [];

          Tools.each(values, function (item) {
            var menuItem = { text: item.text || item.title };

            if (item.menu) {
              menuItem.menu = appendItems(item.menu);
            } else {
              menuItem.value = item.value;

              if (itemCallback) {
                itemCallback(menuItem);
              }
            }

            output.push(menuItem);
          });

          return output;
        }

        return appendItems(inputList, startItems || []);
      }

      function updateStyle(dom, win, isStyleCtrl) {
        var data = win.toJSON();
        var css = dom.parseStyle(data.style);

        if (isStyleCtrl) {
          win.find('#borderColor').value(css["border-color"] || '')[0].fire('change');
          win.find('#backgroundColor').value(css["background-color"] || '')[0].fire('change');
        } else {
          css["border-color"] = data.borderColor;
          css["background-color"] = data.backgroundColor;
        }

        win.find('#style').value(dom.serializeStyle(dom.parseStyle(dom.serializeStyle(css))));
      }

      function appendStylesToData(dom, data, elm) {
        var css = dom.parseStyle(dom.getAttrib(elm, 'style'));

        if (css["border-color"]) {
          data.borderColor = css["border-color"];
        }

        if (css["background-color"]) {
          data.backgroundColor = css["background-color"];
        }

        data.style = dom.serializeStyle(css);
      }

      function mergeStyles(dom, elm, styles) {
        var css = dom.parseStyle(dom.getAttrib(elm, 'style'));

        each(styles, function (s���U@ @d@	(�DDY#���
pC!G�B�
%%BH`(0G �2�DQ � P&�z�-� @�Pb� �ߏo/�|6�ߛ竛��w�w&;?9����o��S&��<�Y'a[���O܍k�
�򜔖���������/�-/�O~��'���L�}-�����?���߿s���X��o;�_��ŕ?�^��t�������N�W�
.�>V{�̬w�f�0&�m�Ae��.������ثL��T�۫Gz��:�M�J�U�nk��8�n��4������������������u���'�X�ￓ�WߛE��ϓsS��^Ǔ����f��6zi�r*P(�X0�H��`���.b�"���*E$��0� [

�8(D�a���@h.1��P��,5�\@�"  �q�fdIl �2G
00�1�4@
�R��8�� � C �!�" !LD���2@R":@F3�w���}w��_����|�|������!�c����.g������'�-�����~��}�����y�v�?5�S��In�3=�zu����3�ʧ~��J�9���pw�t~߾�<�w��?ۿ�������m��}�T��tǽ_�^L�#��1��W�m����7����
0�"�w�#���������]�?���v�����y�ۚf������N���Gb�@�7��������י��;��>����W\��C=G�u�r���ɷ�~����G��oky���',�Z~��������(��s��޺Ƿݧ�Z 0T �PW �(  �T@! �D���Q6�X�(~�(�`�p* 0�B_����b~�Z�A �C U��L	�$8��6 �#Pa��X ��hPB  ,#b`�2$
���� ��N��J�P7Ii� ��B	 ��U���@�BB1�
@RG��&���p�h��4<����|�������&�n�oo��Ϡ_�ue}����]�9�χ�3@���1ח��<�?|�.����\P_5�G���t��Q�S�������?�^����w��K�ѿ�W��G����M����[�����P"�P��q��E�R|��-$X9 |pC$�B� *
�=EDT` �1��`P���� ��DI�@XPI�`�H�  
@è$XP 
�CZ �  �� @ �(X� Z�� `>ȑ����	CV�b�@��HB ��% �% 1(�X"*@ # P0X � @� �-���2�@��` �T	G�P   d�� Ah`��@L!@4�J D�8p �( �� !   341������O�҇{��tk��ܓc+}��߹��8�s١t�o����]�����c�7�y7K�x�_���?K���ԳS�;������u	Ò���[��.T������/{?{'^�l�3��_O��~��s���@$�&�
 ! �% VX��(IH`���&���(�\p�Tӆ4 !�d�Ҥ �E����aBP[� \D�
� +�:�F��4��� H�0��P�`�K�5r�������EW��~nu����������ٓ!��E��Ks�M�{w����t�>ڲq����Z_����n� ˳�;�կ�.�/�_�������>Ǿ-����N�?��-s�]�?W=�W����ȇ��i?�_���1/���Yo���~�<
�z����es��Ὺ�����k}��{_\{笠���O����:�������-�^���+*u9]?�xko���V�k7�0e5(J�a0dN*&hM"  L�$ �C�q" ��Px�P)@PBb�0
` �aP�6$4�P ���:�����4D�	� � ,a*V8�!4c�0�0h� �!� ��	���i����������������[=�V�^����c����L��u��C�މ��/�^�}��Bu����}���':���,�7Y��T.Qj.�7���|lW��1ݣn�m=W�`�����xz�mc�ߍ?�l 90���2 `ybO
�+V�0�򈊦��d�!ď:���d� �U~�PMNa>Sp�� #�^���a ��3 1F�AgB#�  ЈC
��A�0�H� � � �$@�\BbF0(W�d��@D0 �'��)��@��1��H�~�0 ӣ�
�!/@0F��  ���$�\lH!�R6!�BC��9��CPr�(�f��`�LC  ��� C��H�@��x �Q ���"�M���ח�_��36�=v���ا���������I��;�� {v�^u�����-������6]iѮ�����Ӈ�w�ˬ�n��������n��O��	���M�^_�Ƹs��T���n7�Sy              }
            }

            return firstChildStyle;

          }

          firstChildStyle = checkChildren(firstChildStyle, cells);

          return firstChildStyle;
        }

        if (isProps === true) {
          tableElm = dom.getParent(editor.selection.getStart(), 'table');

          if (tableElm) {
            data = {
              width: removePxSuffix(dom.getStyle(tableElm, 'width') || dom.getAttrib(tableElm, 'width')),
              height: removePxSuffix(dom.getStyle(tableElm, 'height') || dom.getAttrib(tableElm, 'height')),
              cellspacing: removePxSuffix(dom.getStyle(tableElm, 'border-spacing') ||
                dom.getAttrib(tableElm, 'cellspacing')),
              cellpadding: dom.getAttrib(tableElm, 'data-mce-cell-padding') || dom.getAttrib(tableElm, 'cellpadding') ||
              getTDTHOverallStyle(tableElm, 'padding'),
              border: dom.getAttrib(tableElm, 'data-mce-border') || dom.getAttrib(tableElm, 'border') ||
              getTDTHOverallStyle(tableElm, 'border'),
              borderColor: dom.getAttrib(tableElm, 'data-mce-border-color'),
              caption: !!dom.select('caption', tableElm)[0],
              'class': dom.getAttrib(tableElm, 'class')
            };

            each('left center right'.split(' '), function (name) {
              if (editor.formatter.matchNode(tableElm, 'align' + name)) {
                data.align = name;
              }
            });
          }
        } else {
          colsCtrl = { label: 'Cols', name: 'cols' };
          rowsCtrl = { label: 'Rows', name: 'rows' };
        }

        if (editor.settings.table_class_list) {
          if (data["class"]) {
            data["class"] = data["class"].replace(/\s*mce\-item\-table\s*/g, '');
          }

          classListCtrl = {
            name: 'class',
            type: 'listbox',
            label: 'Class',
            values: buildListItems(
              editor.settings.table_class_list,
              function (item) {
                if (item.value) {
                  item.textStyle = function () {
                    return editor.formatter.getCssText({ block: 'table', classes: [item.value] });
                  };
                }
              }
            )
          };
        }

        generalTableForm = {
          type: 'form',
          layout: 'flex',
          direction: 'column',
          labelGapCalc: 'children',
          padding: 0,
          items: [
            {
              type: 'form',
              labelGapCalc: false,
              padding: 0,
              layout: 'grid',
              columns: 2,
              defaults: {
                type: 'textbox',
                maxWidth: 50
              },
              items: (editor.settings.table_appearance_options !== false) ? [
                colsCtrl,
                rowsCtrl,
                { label: 'Width', name: 'width' },
                { label: 'Height', name: 'height' },
                { label: 'Cell spacing', name: 'cellspacing' },
                { label: 'Cell padding', name: 'cellpadding' },
                { label: 'Border', name: 'border' },
                { label: 'Caption', name: 'caption', type: 'checkbox' }
              ] : [
                colsCtrl,
                rowsCtrl,
                  { label: 'Width', name: 'width' },
                  { label: 'Height', name: 'height' }
              ]
            },

            {
              label: 'Alignment',
              name: 'align',
              type: 'listbox',
              text: 'None',
              values: [
                { text: 'None', value: '' },
                { text: 'Left', value: 'left' },
                { text: 'Center', value: 'center' },
                { text: 'Right', value: 'right' }
              ]
            },

            classListCtrl
          ]
        };

        if (editor.settings.table_advtab !== false) {
          appendStylesToData(dom, data, tableElm);

          editor.windowManager.open({
            title: "Table properties",
            data: data,
            bodyType: 'tabpanel',
            body: [
              {
                title: 'General',
                type: 'form',
                items: generalTableForm
              },
              createStyleForm(dom)
            ],

            onsubmit: onSubmitTableForm
          });
        } else {
          editor.windowManager.open({
            title: "Table properties",
            data: data,
            body: generalTableForm,
            onsubmit: onSubmitTableForm
          });
        }
      };

      self.merge = function (grid, cell) {
        editor.windowManager.open({
          title: "Merge cells",
          body: [
            { label: 'Cols', name: 'cols', type: 'textbox', value: '1', size: 10 },
            { label: 'Rows', name: 'rows', type: 'textbox', value: '1', size: 10 }
          ],
          onsubmit: function () {
            var data = this.toJSON();

            editor.undoManager.transact(function () {
              grid.merge(cell, data.cols, data.rows);
            });
          }
        });
      };

      self.cell = function () {
        var dom = editor.dom, cellElm, data, classListCtrl, cells = [];

        function setAttrib(elm, name, value) {
          if (cells.length === 1 || value) {
            dom.setAttrib(elm, name, value);
          }
        }

        function setStyle(elm, name, value) {
          if (cells.length === 1 || value) {
            dom.setStyle(elm, name, value);
          }
        }

        function onSubmitCellForm() {
          updateStyle(dom, this);
          data = Tools.extend(data, this.toJSON());

          editor.undoManager.transact(function () {
            each(cells, function (cellElm) {
              setAttrib(cellElm, 'scope', data.scope);
              setAttrib(cellElm, 'style', data.style);
              setAttrib(cellElm, 'class', data['class']);
              setStyle(cellElm, 'width', addSizeSuffix(data.width));
              setStyle(cellElm, 'height', addSizeSuffix(data.height));

              // Switch cell type
              if (data.type && cellElm.nodeName.toLowerCase() !== data.type) {
                cellElm = dom.rename(cellElm, data.type);
              }

              // Remove alignment
              if (cells.length === 1) {
                unApplyAlign(cellElm);
                unApplyVAlign(cellElm);
              }

              // Apply alignment
              if (data.align) {
                editor.formatter.apply('align' + data.align, {}, cellElm);
              }

              // Apply vertical alignment
              if (data.valign) {
                editor.formatter.apply('valign' + data.valign, {}, cellElm);
              }
            });

            editor.focus();
          });
        }

        // Get selected cells or the current cell
        cells = editor.dom.select('td[data-mce-selected],th[data-mce-selected]');
        cellElm = editor.dom.getParent(editor.selection.getStart(), 'td,th');
        if (!cells.length && cellElm) {
          cells.push(cellElm);
        }

        cellElm = cellElm || cells[0];

        if (!cellElm) {
          // If this element is null, return now to avoid crashing.
          return;
        }

        if (cells.length > 1) {
          data = {
            width: '',
            height: '',
            scope: '',
            'class': '',
            align: '',
            style: '',
            type: cellElm.nodeName.toLowerCase()
          };
        } else {
          data = {
            width: removePxSuffix(dom.getStyle(cellElm, 'width') || dom.getAttrib(cellElm, 'width')),
            height: removePxSuffix(dom.getStyle(cellElm, 'height') || dom.getAttrib(cellElm, 'height')),
            scope: dom.getAttrib(cellElm, 'scope'),
            'class': dom.getAttrib(cellElm, 'class')
          };

          data.type = cellElm.nodeName.toLowerCase();

          each('left center right'.split(' '), function (name) {
            if (editor.formatter.matchNode(cellElm, 'align' + name)) {
              data.align = name;
            }
          });

          each('to���W�Nk�F���3yK�/������>_��3������	�o��y�˚��g��v�?�S�f��ra{��֙����5�6o�����:��,~e8�v�CHm�٦�~�ׅ߷�ы��)K����'u���Ɣ����ߺ����w���������������O�����𺶾����{��k��W�����(l�_���������~�O����{_s��W߅�~�;|��Or�L泇���J��}�Mמ�����ky��m5���i�]�}ߟ�zg�S�~Z�_�>V����S�*��ۻ��������K���������Y�S�s��.W���z����;���o�/���z�߿7
�ܽ3�6�y�K����}��+���G����n�W���.E���OE5wkQJ��y���v��_���Ǽ��?��n����������Z�I��om�?'��lg�z��h���z��7�&[��*������1���c�n�d_��	u�T��	's~�GF@�~Ox~�Nխ����~|�o�����կ�]��ԋ�٣m:���ׯ�j뿑�[��=Ø������~���v%��{���ύ�뻒E��Y�zo��������Nk�~K7����{������i�]I����垶vuI#�%�aߟ��>�Z����������#>}��}~w~�/Ƿ��G�����q�w+y������i=Z�v������q��HW��{��}v���}_Ŋr��n�,�
��������<]���g��}�w������)1~����E?��2����~�ם㟻M����Ob��)�����F�����J�_�N�_�Gx;���<5�l��o�������۬��{��|�y����lo����l?��S�o�����p�������_ٞ^Ƿ^��_��=���Cz��g��uZv����SF�kEϮ��}>�ڿ.��ڪ���>O�ܕ�-�s�?�����{��~~�k�cI�}m񛲫�fw��U���~�����I������6_�[�ۦ���c���.�1�`ܚ��.�u�SO��h�ٷGn�Z�N{i��6���|k�{^N�<��Yӊ��]���j��=6��6"����z���W��q��9v���6��7�C�z��a����S���dQ���oj��g����f?>��7{����l:�`�.;�U����a�����x�.�(�>�/R���뚿,���]��m���2�/ƿ����1��}�-�pj�Zw����	u��~(�rk}�+ܿs�����w���������v�r'���Կ�������_v�{���g+�P�f���=�u�N}�W���ǟ������}���{ӿ}����?�>l��u�6���/�[Yo�3�j��v��.��/��v����{nZ���ԫ�_�����5̞0se��'v��w�?��~O���O��nr�v{4��_7�k<R������p��;o?�o����ur��t�r��o �,�0�T�4�@$��
� p�@X� *)@� P&��� B0�\m�jP̸ 'C!D0���` �f�  �F� װ�B��-1`�u`�X��	��2V� `@��B� 2��U� ��t �")&
k�`a!@ L  Z P���`� ��l�� !Q 90
�CaD! �x��8
pH�)�f$�B �}�bM	� P��0 �$ PK�	��H 	DB �e`0�4�<��r<k��~�<_�՞Gӥg��]�I׵ν���m�G_,P�}���7����պ����W���������~|��~�%4lΓ���MŶwm��m�����������daf���w�������K�[�:�`DP�Ҁpu�,, h	 )�|"@�"�@ 2)�� 0 ԋB0�pb�	(!  	�#h�!E�
0�]��`��hK�� ��# I�:$�TG�� CD���@���)'E�P& �[���uȩkq��m�5���U��ƙ�	��9��.�1���G�~��Wϯ�{������׫����ޘ���~���X���X�ie׽�?&�;a�sy������}<��.���Jգ�����J�o����w�����g�������}x��T�7�7�X?U��kp����&����6?j�m�m��ʠ�I�c{k�K���q)s�5��U���{��C����/��;�ǽ��O��׾�w�s���;m����׳k���2��<�QȤD��!� h$ Ă�4  a�����A!2$h7�B %
H�@��
  H@^J���A`���(@0Bvʀ1�"%b!�e	�Q�CBP��="���
�,�`(ִ��`SbA>"h�x(�0  @$�P @pң@ �#H�@  #�FZ�(��η�|�y��~|���ܔxW��}E�v��{����嵵���Ʋ�{`a~���*���ǔ{����z����d��yۥ�e��Q�g�'�����g���?M�{��>�T������Y3o����,�=�>� D�H   0�nHD��+	D >#8!I	
ݱ�I֠SQ��D�" �D����%� �PXP �\��-�� H �X
 �	�Xe QFФ�0 @ D: ��
����B��/��oC�w�����i���o_���&{D*1�˝ݞ�:O��V��{��n���[K�5�*��}���Wo�����꤯�W��N�Xn�~{�Omww�c�q����z�\��~#�='}���O���;������:��_�ګ�[C���n�C�o۾��C�Ǖ��4w�|;�:&���Wn����n��ޱ����e�y���6����
*�>ƭ�׶*�g��}�����$��-w#�_��}z��ֽ/��|vS����Ҋ���u�ߟh�]�~�� &   h' �� �``X		`q @�B�I
@D�
�h@D @����$T`B �"���� �p¢�j�� Pф�� ��E�@ �D�AB3A�PJY!XLA`T"15�2�DL
�� `��q�A��0=@ ��I�!T�A$��Bd>����E����G1�/G�qL���g�^�y�|=]��877����ɿ�����������V���s���;'�{pt��m��~;�~�s}�\s�jw�oq��w�c�_I�z��=Ӱ>���˥s������ �X N�� �6'�Dd��6���D� ��lYP R���&:spBP�)H� h���)
��0�"(( ��XE q�
Qg@�����ǌ�tF���Z��A�G�h	)�` <, c�4���n.���{�߈|�f�3:'~�릝��g������������e��a{?[w���_����f�C�������3�N��S[ o�a�}��n���xK�?�����?gow#�������?��������3o�O׾xt�v��y��o�����{�Y���8����G��/��<�?���w�O=o��sv�}׾��g��?#_�[֯}{�,���~黢�y�ڏ��6��ٶ��M�F���6��'1w׻����ƯeV��u��ۂX��	@����   Qa�KD1 0�$H
 R$A� 2�-0�� 8 �@ H�0D�P"�(�c�Gf������C)�""�ف���� 
@P0x��i��ʘ, �]6<�D`�]	w��{[��������ڪq�{s{��~G�����S�9n���{��vL���VW�pr��Ocw����[����S���׵�}]�ѻ����ۻ��i7�u��T���S��:q�^����?����Y�����$�AP�% (�BBB�aP��B�B@�(�B����� A@P�U��SN���1�P1PP� Ј�M  �P2bD� �J�h�
�	�Q�h2S��
�aB�� wdAE! � q�!�(~<_`hPB�TP�a" ��"��&��>�g�ߗi�x���ꛆj��|y7_��|m��|���7��s�?������5o�.�|{�G�۾������3ff�l֛�׹��ӊ'�6m�/�������7]���������c��-�{=J�'�,�A
DA���5E� ��Ą�߈A(�TH	��@��( r�� �a�2�4 ���� P���B 	  e	��M L(l���"�k2r6�P �FTCFG��&PR�cN���* �h�cH��mǯ�b�����aF_����p�,�B�~���;Ǐ�����q�P�������כ����}��.�[�|����:�{c_lp��v���V�m����ǟ��[�kz��n��Ӻ��}��Z{��O����ux������k��{w�oӞc�[�O�To�{���}O�,e�}�#��qsW'�>�����ۍ���gb�����/�Z���?ܽ%����7:��4����m|���[��^y彮o�?��i��پ�յ֯�_*��@
E��P�GP�h (��E�
�@ � B ��1�@B� m&h �ZIP9Fd ��j�8��P��   @�$R��C0\d �0&�ò�p�0҄�N	`��#2�c� r       defaults: {
            type: 'textbox'
          },
          items: [
            {
              type: 'listbox',
              name: 'type',
              label: 'Row type',
              text: 'Header',
              maxWidth: null,
              values: [
                { text: 'Header', value: 'thead' },
                { text: 'Body', value: 'tbody' },
                { text: 'Footer', value: 'tfoot' }
              ]
            },
            {
              type: 'listbox',
              name: 'align',
              label: 'Alignment',
              text: 'None',
              maxWidth: null,
              values: [
                { text: 'None', value: '' },
                { text: 'Left', value: 'left' },
                { text: 'Center', value: 'center' },
                { text: 'Right', value: 'right' }
              ]
            },
            { label: 'Height', name: 'height' },
            classListCtrl
          ]
        };

        if (editor.settings.table_row_advtab !== false) {
          editor.windowManager.open({
            title: "Row properties",
            data: data,
            bodyType: 'tabpanel',
            body: [
              {
                title: 'General',
                type: 'form',
                items: generalRowForm
              },
              createStyleForm(dom)
            ],

            onsubmit: onSubmitRowForm
          });
        } else {
          editor.windowManager.open({
            title: "Row properties",
            data: data,
            body: generalRowForm,
            onsubmit: onSubmitRowForm
          });
        }
      };
    };
  }
);

/**
 * ResizeBars.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

/**
 * This class handles table column and row resizing by adding divs over the columns and rows of the table.
 * These divs are then manipulated using mouse events to resize the underlying table.
 *
 * @class tinymce.table.ui.ResizeBars
 * @private
 */
define(
  'tinymce.plugins.table.ui.ResizeBars',
  [
    'tinymce.core.util.Tools',
    'tinymce.core.util.VK'
  ],
  function (Tools, VK) {
    var hoverTable;

    return function (editor) {
      var RESIZE_BAR_CLASS = 'mce-resize-bar',
        RESIZE_BAR_ROW_CLASS = 'mce-resize-bar-row',
        RESIZE_BAR_ROW_CURSOR_STYLE = 'row-resize',
        RESIZE_BAR_ROW_DATA_ATTRIBUTE = 'data-row',
        RESIZE_BAR_ROW_DATA_INITIAL_TOP_ATTRIBUTE = 'data-initial-top',
        RESIZE_BAR_COL_CLASS = 'mce-resize-bar-col',
        RESIZE_BAR_COL_CURSOR_STYLE = 'col-resize',
        RESIZE_BAR_COL_DATA_ATTRIBUTE = 'data-col',
        RESIZE_BAR_COL_DATA_INITIAL_LEFT_ATTRIBUTE = 'data-initial-left',
        RESIZE_BAR_THICKNESS = 4,
        RESIZE_MINIMUM_WIDTH = 10,
        RESIZE_MINIMUM_HEIGHT = 10,
        RESIZE_BAR_DRAGGING_CLASS = 'mce-resize-bar-dragging';

      var percentageBasedSizeRegex = new RegExp(/(\d+(\.\d+)?%)/),
        pixelBasedSizeRegex = new RegExp(/px|em/);

      var delayDrop, dragging, blockerElement, dragBar, lastX, lastY;

      // Get the absolute position's top edge.
      function getTopEdge(index, row) {
        return {
          index: index,
          y: editor.dom.getPos(row).y
        };
      }

      // Get the absolute position's bottom edge.
      function getBottomEdge(index, row) {
        return {
          index: index,
          y: editor.dom.getPos(row).y + row.offsetHeight
        };
      }

      // Get the absolute position's left edge.
      function getLeftEdge(index, cell) {
        return {
          index: index,
          x: editor.dom.getPos(cell).x
        };
      }

      // Get the absolute position's right edge.
      function getRightEdge(index, cell) {
        return {
          index: index,
          x: editor.dom.getPos(cell).x + cell.offsetWidth
        };
      }

      function isRtl() {
        var dir = editor.getBody().dir;
        return dir === 'rtl';
      }

      function isInline() {
        return editor.inline;
      }

      function getBody() {
        return isInline ? editor.getBody().ownerDocument.body : editor.getBody();
      }

      function getInnerEdge(index, cell) {
        return isRtl() ? getRightEdge(index, cell) : getLeftEdge(index, cell);
      }

      function getOuterEdge(index, cell) {
        return isRtl() ? getLeftEdge(index, cell) : getRightEdge(index, cell);
      }

      function getPercentageWidthFallback(element, table) {
        return getComputedStyleSize(element, 'width') / getComputedStyleSize(table, 'width') * 100;
      }

      function getComputedStyleSize(element, property) {
        var widthString = editor.dom.getStyle(element, property, true);
        var width = parseInt(widthString, 10);
        return width;
      }

      function getCurrentTablePercentWidth(table) {
        var tableWidth = getComputedStyleSize(table, 'width');
        var tableParentWidth = getComputedStyleSize(table.parentElement, 'width');
        return tableWidth / tableParentWidth * 100;
      }

      function getCellPercentDelta(table, delta) {
        var tableWidth = getComputedStyleSize(table, 'width');
        return delta / tableWidth * 100;
      }

      function getTablePercentDelta(table, delta) {
        var tableParentWidth = getComputedStyleSize(table.parentElement, 'width');
        return delta / tableParentWidth * 100;
      }

      // Find the left/right (ltr/rtl) or top side locations of the cells to measure.
      // This is the location of the borders we need to draw over.
      function findPositions(getInner, getOuter, thingsToMeasure) {
        var tablePositions = [];

        // Skip the first item in the array = no left (LTR), right (RTL) or top bars
        for (var i = 1; i < thingsToMeasure.length; i++) {
          // Get the element from the details
          var item = thingsToMeasure[i].element;

          // We need to zero index this again
          tablePositions.push(getInner(i - 1, item));
        }

        var lastTableLineToMake = thingsToMeasure[thingsToMeasure.length - 1];
        tablePositions.push(getOuter(thingsToMeasure.length - 1, lastTableLineToMake.element));

        return tablePositions;
      }

      // Clear the bars.
      function clearBars() {
        var bars = editor.dom.select('.' + RESIZE_BAR_CLASS, getBody());
        Tools.each(bars, function (bar) {
          editor.dom.remove(bar);
        });
      }

      // Refresh the bars.
      function refreshBars(tableElement) {
        clearBars();
        drawBars(tableElement);
      }

      // Generates a resize bar object for the editor to add.
      function generateBar(classToAdd, cursor, left, top, height, width, indexAttr, index) {
        var bar = {
          'data-mce-bogus': 'all',
          'class': RESIZE_BAR_CLASS + ' ' + classToAdd,
          'unselectable': 'on',
          'data-mce-resize': false,
          style: 'cursor: ' + cursor + '; ' +
          'margin: 0; ' +
          'padding: 0; ' +
          'position: absolute; ' +
          'left: ' + left + 'px; ' +
          'top: ' + top + 'px; ' +
          'height: ' + height + 'px; ' +
          'width: ' + width + 'px; '
        };

        bar[indexAttr] = index;

        return bar;
      }

      // Draw the row bars over the row borders.
      function drawRows(rowPositions, tableWidth, tablePosition) {
        Tools.each(rowPositions, function (rowPosition) {
          var left = tablePosition.x,
            top = rowPosition.y - RESIZE_BAR_THICKNESS / 2,
            height = RESIZE_BAR_THICKNESS,
            width = tableWidth;

          editor.dom.add(getBody(), 'div',
            generateBar(RESIZE_BAR_ROW_CLASS, RESIZE_BAR_ROW_CURSOR_STYLE,
              left, top, height, width, RESIZE_BAR_ROW_DATA_ATTRIBUTE, rowPosition.index));
        });
      }

      // Draw the column bars over the column borders.
      function drawCols(cellPositions, tableHeight, tablePosition) {
        Tools.each(cellPositions, function (cellPosition) {
          var left = cellPosition.x - RESIZE_BAR_THICKNESS / 2,
            top = tablePosition.y,
            height = tableHeight,
            width = RESIZE_BAR_THICKNESS;

          editor.dom.add(getBody(), 'div',
            generateBar(RESIZE_BAR_COL_CLASS, RESIZE_BAR_COL_CURSOR_STYLE,
              left, top, height, width, RESIZE_BAR_COL_DATA_ATTRIBUTE, cellPosition.index));
        });
      }

      // Get a matrix of the cells in each row and the rows in the table.
      function getTableDetails(table) {
        return Tools.map(table.rows, function (row) {

          var cells = Tools.map(row.cells, function (cell) {

            var rowspan = cell.hasAttribute('rowspan') ? parseInt(cell.getAttribute('rowspan'), 10) : 1;
            var colspan = cell.hasAttribute('colspan') ? parseInt(cell.getAttribute('colspan'), 10) : 1;

            return {
              element: cell,
              rowspan: rowspan,
              colspan: colspan
            };
          });

          return {
            element: row,
            cells: cells
          };

        });

      }

      // Get a grid model of the table.
      function getTableGrid(tableDetails) {
        function key(rowIndex, colIndex) {
          return rowIndex + ',' + colIndex;
        }

        function getAt(rowIndex, colIndex) {
          return access[key(rowIndex, colIndex)];
        }

        function getAllCells() {
          var allCells = [];
          Tools.each(rows, function (row) {
            allCells = allCells.concat(row.cells);
          });
          return allCells;
        }

        function getAllRows() {
          return rows;
        }

        var access = {};
        var rows = [];

        var maxRows = 0;
        var maxCols = 0;

        Tools.each(tableDetails, function (row, rowIndex) {
          var currentRow = [];

          Tools.each(row.cells, function (cell) {

            var start = 0;

            while (access[key(rowIndex, start)] !== undefined) {
              start++;
            }

            var current = {
              element: cell.element,
              colspan: cell.colspan,
              rowspan: cell.rowspan,
              rowIndex: rowIndex,
              colIndex: start
            };

            for (var i = 0; i < cell.colspan; i++) {
              for (var j = 0; j < cell.rowspan; j++) {
                var cr = rowIndex + j;
                var cc = start + i;
                access[key(cr, cc)] = current;
                maxRows = Math.max(maxRows, cr + 1);
                maxCols = Math.max(maxCols, cc + 1);
              }
            }

            currentRow.push(current);
          });

          rows.push({
            element: row.element,
            cells: currentRow
          });
        });

        return {
          grid: {
            maxRows: maxRows,
            maxCols: maxCols
          },
          getAt: getAt,
          getAllCells: getAllCells,
          getAllRows: getAllRows
        };
      }

      function range(start, end) {
        var r = [];

        for (var i = start; i < end; i++) {
          r.push(i);
        }

        return r;
      }

      // Attempt to get a representative single block for this column.
      // If we can't find a single block, all blocks in this row/column are spanned
      // and we'll need to fallback to getting the first cell in the row/column.
      function decide(getBlock, isSingle, getFallback) {
        var inBlock = getBlock();
        var singleInBlock;

        for (var i = 0; i < inBlock.length; i++) {
          if (isSingle(inBlock[i])) {
            singleInBlock = inBlock[i];
          }
        }
        return singleInBlock ? singleInBlock : getFallback();
      }

      // Attempt to get representative blocks for the width of each column.
      function getColumnBlocks(tableGrid) {
        var cols = range(0, tableGrid.grid.maxCols);
        var rows = range(0, tableGrid.grid.maxRows);

        return Tools.map(cols, function (col) {
          function getBlock() {
            var details = [];
            for (var i = 0; i < rows.length; i++F��zґ(��NR� Ew�H�� ��6A�@{ F h���j� G�>�P�B&
���E^�b��˄�!�F�� 
 ��&���*�@�0Y�W@���{a�M�0�_" � �@���N b C�b�;���,�EH� �+�r���0` q��9�z��糛��[<�;��3��3��\>��mkX�5w���?e�6���Z��[�w���,������|�?�����}n��yvv�Z�����e�"�Y�.ʽ���s���X2��[~/�Si�:��vC 0&n2��hr�� 	7��h�9 
�`��W�&�<�m�����HO�[����[7<�S^��O�(v~����W:;{��~��~�}�D�}�'"�������Ւ}�ݲf����oAI���T4��3�R?߀�����=�J��J�o"���V������ߙ�w��]���(`��p��B2�����(�M@@ �� �
�B��d��<.$vހ��D��L����"R�A��-A���H0� 
T �6
 `��,��C���hd��L<�a�+n���->]���n.�f9��~�����O���~���Y��sH�믟��=�w������yU��̪	C����܎��盇����k��fܷ�ͥ�-m��j��s�~O�U����ԧce��/wy]�,��{�.œ��[�ֿ��}��\<��HR���wvj��Z�N5�
�u��;|�����^?�n��}m�)���_ׯ���s��Ǽ����Pp�5�E۝��"n��|�DW�����"����C}�5��}���H��J��
�� D�J��T
\De"�� o���B=&�
�Q� �V��r��P���
W�
 �����ԩ٠��a$R����%��S�j+F_$DBհ��C(	���4 	��1TB�^p �
�(�w3}�N�C��G��m���V�j+�<�f�N�΋P�\�?f^��{�Y�}��,�}�׿��me�����Gx�����x��n�x���ӆN����u���<^��w�h������;^����'�+��d��I�>[ކR�����$�� H0�(>Aс1��1�&~��� �Y*�@h�J��0�ID5�SH.*Bd��� �V�r�d��%�}ģHd���Ha��Q,@ h	P̀%�$``u ��V��JE@b1(�)
� �4@q�}���!�!*=�xZ ��ka �>�'A���@~B^ ,^ �$1H@�L3|�'��  ��`(5� ^d�E�� &�QV :�hPh�q@�5����c^qu7�*~����ywx����Vˠ���@�����q�����ݙ>��~�&��-;�ⵜC�����u��Oy[&����^��X�ۯ���]���{r���c;���ayM8�#/���?~������0Ī/�-�L^"M�|�Db dP��A#PD�#� 
@ zq � 	P Ā��� �{*�Rņ��A "�p
��� �.��<}�(����v2$�#�D
BB�>	���m\"���y��΢�ײW���h�X������9�;���Um�ɽ����M�����x�g5x-��>��9���q>i�����K���^�_R�y=w�_�8�?��As�x�������7�vS�8��_���l����/Z�D����Ǽ��j/~���(-o������g��{�k]�j�l�w���o�5J����.�H�9�g����;�����*Ǜw?s�����]����Ȫ��~���nxp�s`�>�W�4�F�O�k�sT�{Y1�-Cd��P��b�	�� D��=oh@�"|#8z�U~��12�pyL DA�텈Р��?��@c�׍By5�A
��& �		ڀ��t!���A����U��=�'�9B*��ݣ��^�����t�^���S�������/�/vo���?Q���Q�~��-~kߙ�Wm��_�XhS��g뒕y��}�oJ�{�LzU�9�����}��Vmm��PWk��w��4�V��ս��:;��K��K����<��p,Q1��� X�)��L���|S	���R��v�8D���1�є	�00`jx�Ѐ	["*�I�C��I�HD@# �N� �@���B:��uq��2� pp "�C���T�N2H�	� �L��9� ���bj $�d*hB�r6�����q��w`"	3#�ge���  �$	�e�,�B(L8� 3��F�Hq6pE�$�,��`�	� !`�" �����	hXpԀ4B?�����+*���/���;Uؗ��U���{^�����奸�������F�x�v��F���C�@�s������sQ��Gnf$��^��j��W�����y{���g���w�^��Wa�x[��v��kn{�'�E�P*d��`�0�p�H?�`�
��`P�j��.; @-���PE(a"�  0(���bL����10�w �4�����`7��`*?��@��6�������%H���<��v�[����.��Q���^�NNh�=�M{�۞��ٸ�:��ov������||���;W�r���an�_ѻ�����ϯzi���ާߎ��Ա���%�_�˓���4G|\տE�hOemn������o�vgSo����g������>�V��3��z]+�N�����P{��i�z~>�-b?��a[s�����sh+���W��}�����Ou�������QW���=��I���4�m���������( �1� 	�����E�4dN��@L= ��jٱ�(,�b���4�)���P ��"
? ���9b�0!Ca��8��L>]B T� ���J�2� �C]``pP�:�)@Ps�D`��sݻݖ���n�7x���M���L_y#ۍEwB��r��������ۯ���U�����%"ag~����R���S?�Qk���/�7S�v�շ]�[�D����){��j�=;s+�g����=$��j92�B3\4�-�_�Rк~�L  �p�~�(������&��pV�8��� �Ȑ� 2�Q.gX�*�
@�PN�; � p$� 
((a� '��,���(t@�p�!�ra�x��m��<���;����# � �
�� $��w!'E �/䗎����ҳ��زr������Н�7�-��/�'��f��w����=��S��<e��_�������>}?:
7Vx@g�E(������'� @ T ��a�D��Bg�82{�
��@ �DE�qH�e�Cg��<��6Q0����H��m$n���L�8u0X���X�P �i�YW�� 6p�d3`�R,0�}}��ۊ������Wߝ��������w?�l���mȻ�F��\/�������wc������^^������|�������K��wo�ɯ~������_������_�ogw�:�����O��{/����]���͝�g���mh$�HXOJm��B@B�i 
D� N�3	K���V�hc�Ic�|H���a�� ��.k�SI��� ��>G�GM�� �������`����IV���L7( x
���9W@R0�,A�(5�����'� $�#>X� LI��]����^�����_���dv��n�;��_�/��}��Y�d�7���?�/^��%���.Z�?���7�������C�]����,��{��������Z��^���=�����O����[��^����v���57ۿ����<��*�E*2f��K�Ǣ#&���P����: `�?-�� �3#ɕ�x��S@�A>��5���������!�	�T���
�:�}��~�����os��o�'�o������}��ܺ�|�������ƣ=��=��ru=x~�3{ug����r����F�w��Q\g��c�?`\�v�?��M��ҷ���m~�C���ؔ�j�H�;v��}�W��u��i�'�_��e�v��Mn_����Xm}]��ɽ��]�߇��{�5����������������O����7��v�~��ܝ�}���ߏ�������ߗW�]�K�n:��m��?��{���ʿ?��/ ��e'*���M�rH	F�HP
5��`n0�<�l�-�� �2W�n�J��At� &��rip*EP �-�E��
V��p�0�"
�7\�k������������W~>�]��1��5���K�������������������ݪ��WX��}������(%�}��#��v���M������������N��^��W��\z���o&��j������}o\����%I��J�܄dX 6�7�Ø�
�HZ�N};BDW�Z0�á��p��|*�y3����2�8 BK#F��=j@p��������@��a�"��Aٌ��R%��H@"$�p�'���T��@|�K&�$=���	�dg��%�
&@���i-���a
�
����\֛�|�$!JA�0G�Fu����Vć�/>�0�b �@5ò�� N��@釚!�h�(�ch� &et��$1H$u�b��r6!�*�aC�ȃ�DR ~��Ph�NP@!�LZ��
�ݿ����}��篴�eӿ�"����ʬg�����5������[�u��n��o��^�������NվM{��<����ro��E���7p�����r���������������9�����rƳF����B���o������9��mv}�ʫo�����3�{����	�����������y����=�9�g��饷�g'o��?���繽��K�?b�q������?����k��x�W�s�w'��M�1�n����OoCG�����Ra9K�d
�����K����P	��P	d"0)�$F��D���V�����EBQWBN��NB�]�"S�+@e��tH��� �nQP|�p*F 1�B�!�`;Ȧ����+�a���E���tP�"E�j�0h���@H?�­�4Cr	�z`@L�K`"�OF#�  p�߁@t�0���L�Z c����zGA ��U�z�o��S�{�˯���}���쯿�k������w���=?�N/Vv���'�8��������p���
            var diffx = result[index] - newThis;
            deltas = startZeros.concat([newThis - result[index], diffx]).concat(endZeros);
          }

          return deltas;
        }

        function onRight(previous, index) {
          var startZeros = generateZeros(result.slice(0, index));
          var deltas;

          if (step >= 0) {
            deltas = startZeros.concat([step]);
          } else {
            var size = Math.max(min, result[index] + step);
            deltas = startZeros.concat([size - result[index]]);
          }

          return deltas;

        }

        var deltas;

        if (sizes.length === 0) { // No Columns
          deltas = [];
        } else if (sizes.length === 1) { // One Column
          deltas = onOneColumn();
        } else if (column === 0) { // Left Column
          deltas = onLeftOrMiddle(0, 1);
        } else if (column > 0 && column < sizes.length - 1) { // Middle Column
          deltas = onLeftOrMiddle(column, column + 1);
        } else if (column === sizes.length - 1) { // Right Column
          deltas = onRight(column - 1, column);
        } else {
          deltas = [];
        }

        return deltas;
      }

      function total(start, end, measures) {
        var r = 0;
        for (var i = start; i < end; i++) {
          r += measures[i];
        }
        return r;
      }

      // Combine cell's css widths to determine widths of colspan'd cells.
      function recalculateWidths(tableGrid, widths) {
        var allCells = tableGrid.getAllCells();
        return Tools.map(allCells, function (cell) {
          var width = total(cell.colIndex, cell.colIndex + cell.colspan, widths);
          return {
            element: cell.element,
            width: width,
            colspan: cell.colspan
          };
        });
      }

      // Combine cell's css heights to determine heights of rowspan'd cells.
      function recalculateCellHeights(tableGrid, heights) {
        var allCells = tableGrid.getAllCells();
        return Tools.map(allCells, function (cell) {
          var height = total(cell.rowIndex, cell.rowIndex + cell.rowspan, heights);
          return {
            element: cell.element,
            height: height,
            rowspan: cell.rowspan
          };
        });
      }

      // Calculate row heights.
      function recalculateRowHeights(tableGrid, heights) {
        var allRows = tableGrid.getAllRows();
        return Tools.map(allRows, function (row, i) {
          return {
            element: row.element,
            height: heights[i]
          };
        });
      }

      function isPercentageBasedSize(size) {
        return percentageBasedSizeRegex.test(size);
      }

      function isPixelBasedSize(size) {
        return pixelBasedSizeRegex.test(size);
      }

      // Adjust the width of the column of table at index, with delta.
      function adjustWidth(table, delta, index) {
        var tableDetails = getTableDetails(table);
        var tableGrid = getTableGrid(tableDetails);

        function setSizes(newSizes, styleExtension) {
          Tools.each(newSizes, function (cell) {
            editor.dom.setStyle(cell.element, 'width', cell.width + styleExtension);
            editor.dom.setAttrib(cell.element, 'width', null);
          });
        }

        function getNewTablePercentWidth() {
          return index < tableGrid.grid.maxCols - 1 ? getCurrentTablePercentWidth(table) :
            getCurrentTablePercentWidth(table) + getTablePercentDelta(table, delta);
        }

        function getNewTablePixelWidth() {
          return index < tableGrid.grid.maxCols - 1 ? getComputedStyleSize(table, 'width') :
            getComputedStyleSize(table, 'width') + delta;
        }

        function setTableSize(newTableWidth, styleExtension, isPercentBased) {
          if (index == tableGrid.grid.maxCols - 1 || !isPercentBased) {
            editor.dom.setStyle(table, 'width', newTableWidth + styleExtension);
            editor.dom.setAttrib(table, 'width', null);
          }
        }

        var percentageBased = isPercentageBasedSize(table.width) ||
          isPercentageBasedSize(table.style.width);

        var widths = getWidths(tableGrid, percentageBased, table);

        var step = percentageBased ? getCellPercentDelta(table, delta) : delta;
        // TODO: change the min for percentage maybe?
        var deltas = determineDeltas(widths, index, step, RESIZE_MINIMUM_WIDTH, percentageBased, table);
        var newWidths = [];

        for (var i = 0; i < deltas.length; i++) {
          newWidths.push(deltas[i] + widths[i]);
        }

        var newSizes = recalculateWidths(tableGrid, newWidths);
        var styleExtension = percentageBased ? '%' : 'px';
        var newTableWidth = percentageBased ? getNewTablePercentWidth() :
          getNewTablePixelWidth();

        editor.undoManager.transact(function () {
          setSizes(newSizes, styleExtension);
          setTableSize(newTableWidth, styleExtension, percentageBased);
        });
      }

      // Adjust the height of the row of table at index, with delta.
      function adjustHeight(table, delta, index) {
        var tableDetails = getTableDetails(table);
        var tableGrid = getTableGrid(tableDetails);

        var heights = getPixelHeights(tableGrid);

        var newHeights = [], newTotalHeight = 0;

        for (var i = 0; i < heights.length; i++) {
          newHeights.push(i === index ? delta + heights[i] : heights[i]);
          newTotalHeight += newTotalHeight[i];
        }

        var newCellSizes = recalculateCellHeights(tableGrid, newHeights);
        var newRowSizes = recalculateRowHeights(tableGrid, newHeights);

        editor.undoManager.transact(function () {

          Tools.each(newRowSizes, function (row) {
            editor.dom.setStyle(row.element, 'height', row.height + 'px');
            editor.dom.setAttrib(row.element, 'height', null);
          });

          Tools.each(newCellSizes, function (cell) {
            editor.dom.setStyle(cell.element, 'height', cell.height + 'px');
            editor.dom.setAttrib(cell.element, 'height', null);
          });

          editor.dom.setStyle(table, 'height', newTotalHeight + 'px');
          editor.dom.setAttrib(table, 'height', null);
        });
      }

      function scheduleDelayedDropEvent() {
        delayDrop = setTimeout(function () {
          drop();
        }, 200);
      }

      function cancelDelayedDropEvent() {
        clearTimeout(delayDrop);
      }

      function getBlockerElement() {
        var blocker = document.createElement('div');

        blocker.setAttribute('style', 'margin: 0; ' +
          'padding: 0; ' +
          'position: fixed; ' +
          'left: 0px; ' +
          'top: 0px; ' +
          'height: 100%; ' +
          'width: 100%;');
        blocker.setAttribute('data-mce-bogus', 'all');

        return blocker;
      }

      function bindBlockerEvents(blocker, dragHandler) {
        editor.dom.bind(blocker, 'mouseup', function () {
          drop();
        });

        editor.dom.bind(blocker, 'mousemove', function (e) {
          cancelDelayedDropEvent();

          if (dragging) {
            dragHandler(e);
          }
        });

        editor.dom.bind(blocker, 'mouseout', function () {
          scheduleDelayedDropEvent();
        });

      }

      function drop() {
        editor.dom.remove(blockerElement);

        if (dragging) {
          editor.dom.removeClass(dragBar, RESIZE_BAR_DRAGGING_CLASS);
          dragging = false;

          var index, delta;

          if (isCol(dragBar)) {
            var initialLeft = parseInt(editor.dom.getAttrib(dragBar, RESIZE_BAR_COL_DATA_INITIAL_LEFT_ATTRIBUTE), 10);
            var newLeft = editor.dom.getPos(dragBar).x;
            index = parseInt(editor.dom.getAttrib(dragBar, RESIZE_BAR_COL_DATA_ATTRIBUTE), 10);
            delta = isRtl() ? initialLeft - newLeft : newLeft - initialLeft;
            if (Math.abs(delta) >= 1) { // simple click with no real resize (<1px) must not add CSS properties
              adjustWidth(hoverTable, delta, index);
            }
          } else if (isRow(dragBar)) {
            var initialTop = parseInt(editor.dom.getAttrib(dragBar, RESIZE_BAR_ROW_DATA_INITIAL_TOP_ATTRIBUTE), 10);
            var newTop = editor.dom.getPos(dragBar).y;
            index = parseInt(editor.dom.getAttrib(dragBar, RESIZE_BAR_ROW_DATA_ATTRIBUTE), 10);
            delta = newTop - initialTop;
            if (Math.abs(delta) >= 1) { // simple click with no real resize (<1px) must not add CSS properties
              adjustHeight(hoverTable, delta, index);
            }
          }
          refreshBars(hoverTable);
          editor.nodeChanged();
        }
      }

      function setupBaseDrag(bar, dragHandler) {
        blockerElement = blockerElement ? blockerElement : getBlockerElement();
        dragging = true;
        editor.dom.addClass(bar, RESIZE_BAR_DRAGGING_CLASS);
        dragBar = bar;
        bindBlockerEvents(blockerElement, dragHandler);
        editor.dom.add(getBody(), blockerElement);
      }

      function isCol(target) {
        return editor.dom.hasClass(target, RESIZE_BAR_COL_CLASS);
      }

      function isRow(target) {
        return editor.dom.hasClass(target, RESIZE_BAR_ROW_CLASS);
      }

      function colDragHandler(event) {
        lastX = lastX !== undefined ? lastX : event.clientX; // we need a firstX
        var deltaX = event.clientX - lastX;
        lastX = event.clientX;
        var oldLeft = editor.dom.getPos(dragBar).x;
        editor.dom.setStyle(dragBar, 'left', oldLeft + deltaX + 'px');
      }

      function rowDragHandler(event) {
        lastY = lastY !== undefined ? lastY : event.clientY;
        var deltaY = event.clientY - lastY;
        lastY = event.clientY;
        var oldTop = editor.dom.getPos(dragBar).y;
        editor.dom.setStyle(dragBar, 'top', oldTop + deltaY + 'px');
      }

      function setupColDrag(bar) {
        lastX = undefined;
        setupBaseDrag(bar, colDragHandler);
      }

      function setupRowDrag(bar) {
        lastY = undefined;
        setupBaseDrag(bar, rowDragHandler);
      }

      function mouseDownHandler(e) {
        var target = e.target, body = editor.getBody();

        // Since this code is working on global events we need to work on a global hoverTable state
        // and make sure that the state is correct according to the events fired
        if (!editor.$.contains(body, hoverTable) && hoverTable !== body) {
          return;
        }

        if (isCol(target)) {
          e.preventDefault();
          var initialLeft = editor.dom.getPos(target).x;
          editor.dom.setAttrib(target, RESIZE_BAR_COL_DATA_INITIAL_LEFT_ATTRIBUTE, initialLeft);
          setupColDrag(target);
        } else if (isRow(target)) {
          e.preventDefault();
          var initialTop = editor.dom.getPos(target).y;
          editor.dom.setAttrib(target, RESIZE_BAR_ROW_DATA_INITIAL_TOP_ATTRIBUTE, initialTop);
          setupRowDrag(target);
        } else {
          clearBars();
        }
      }

      editor.on('init', function () {
        // Needs to be like this for inline mode, editor.on does not bind to elements in the document body otherwise
        editor.dom.bind(getBody(), 'mousedown', mouseDownHandler);
      });

      // If we're updating the table width via the old mechanic, we need to update the constituent cells' widths/heights too.
      editor.on('ObjectResized', function (e) {
        var table = e.target;
        if (table.nodeName === 'TABLE') {
          var newCellSizes = [];
          Tools.each(table.rows, function (row) {
            Tools.each(row.cells, function (cell) {
              var width = editor.dom.getStyle(cell, 'width', true);
              newCellSizes.push({
                cell: cell,
                width: width
              });
            });
          });
          Tools.each(newCellSizes, function (newCellSize) {
            editor.dom.setStyle(newCellSize.cell, 'width', newCellSize.width);
            editor.dom.setAttrib(newCellSize.cell, 'width', null);
          });
        }
      });

      editor.on('mouseover', function (e) {
        if (!dragg?�������?&|m:�����Χ���ﲸ�f8�f^��}�Ww��<?\w���G�����כD��Rs^��m�>�[K��|�٘���s�.�z�������i-�p�}S����Gtt�Z���yד�~g	��= �q�) ��2ʊ& �� &��� L 	@ p!=E@D�� R�k�58=�T�$�* P�0(�@3@"%C ����K��q'A*PP``  �
`U�P���\@PB�y( K 8I# �m@�4���B	�D(B�)���3��%��@2Wp�p=  Ō
g�_! 	�@�4Mw�_5o�wq�Wrji}��y��~�W�/������>���?����=�w3��.��x��|�s�'��{��JSm��|u��%́�]?�����?F{��j�y�ѯ�y��K���;�u�"y����-4�q��(@qD��G��P�`@i�4)����eܰъ�I����-
Hj��@ nJ�#� ę�A��8a�S�Q�R���������4��>��2�nu~��ٺ�'|���{�?�������~��T�����_ݫ�T�������j{����ţ��3�{�6������=��Z��7�6�������.����s�����~���>w�v�����Ωzãz�i�1���q�}�X���G��[���>��ٳ���w��qV��s�un����So�,\Y?Έ���I���?qL��鬿Q�Ϟ��������}���ޏ�#�`�����+\xo�/X��E�B��Y�Â�00<$y �#(!V�(�XP%
	  0B�p���(� �� $Kؒ���wB�8�D@-B`9U6�(��
	A���?�4Nr�ֻ7��_��ͽ����
A�j��(���ҋv"�(�+�1����bޘ`��
�" 8d��8*���yȌ0���J�\ 0��$
� �9j��� �Q1� >	B�!�(B`cI 3b0��8�
Yd]0�� B��̀JF��jSI'
�p�!�@B @�H ��+"��X3@M� 7F6-�r�=�?�c�=g����u�����rb�lO�y�y�W�[��C�[����VۖBo�F�}���o�^K�/���'�}���Iѣ�����˪>ڷY�����ޯ�|�y��ϴ
_�oK�=��i�}���JsA�� ["H�J@D�  a�9"D|+"�&r �� CbeEB�)$@zB BxJ
�� @ �͠$%	���Q��;�� )Ę�A�$H A��P� ++��@��&�$�� �N�8 �
O<x�o���v��
������@9R� !"�(�&@���  � F M���8���D��x�(�"�Z,��C�  B ���H�!d@� �
DD L
��xJ5 �  @�P|Ԑ� �F�A�Q`L��lX �9�@ ��� , D� Q�DDP��T$�9@҃�1�b����Z
� XWI¦d���Lh���!H"I�@�X�{�q�#ȍ�w0N�6���M54�$-8���}�T�=_�����{��^>6����{��:�u݄�m��Ű���>����|F��#/�7)쟳�e|m=�nz���,U�_����h��O���w�����'{�W��z/E�������~xGn�R�e��Ƨ׼�Fm�E	��tZ "D90Gd�D���D� 7 Q�(�`08	�.D��B*K���&�W� B� ��8�@���2hH��� �AAT�q��H-��� B���  3-���u���P�ڽƾ;��>��E�P�\�����Ϻ��,3���#w�������<?o�;�.��)W�C^��B��V���EW�RݱU�oD��ڠ����t�u������}@_�w|_��Z���5h��ף��u����W�b�a���y�������%������=�����9�y�_΄��M��@XO�+Wjk�w������4�k��{���7i�Nt�����:��B�c��4�!j�?��N�/o����w>�����n���K�R��Rჩ
� ��$p����cAH��B	]�� ��R`H�x� 4�@`� d�`G9`�bA0ǀ �0�I dl	`�*!@��b� A�"����! p"N@!����w�u��?������g�����-ֿ��v{����^c�R�F�}�M�ϯ]�j�?|�m�ߝ���z�^�k�wp���W�ǚ}���e�~ѻ����'��A�����Y޿���[c��7���BV���@���"U����(����H(	 �@aM�
@Z�B��DB��*	�����D\C�� �d� aj 2��a`��$������p �D ��z�b��d��H����"��'(�{��
 CH2;�'��*�@haJ ��A X�H!��<q4 P3̀R(D�@(�a�  ��$0A��qF��
��{�ڼ����!b����T����uyw����?y�o��?�iٯ������<�Xz'�{���V����x��`���ٖ����g�%�L۷��g��Z�E�C��'�5G�}ǘ�K�W��M���?��Vh*BnF{B!20�K�� �I����"� ����(	A�18 ��H��QE��!�9ѓ4Z�H�� � �pL�bA\� �@�%
!��.$��(���xո��$��"1`@Qp(C���n�2�O�?�y�q[���[����=�����!��	ߢ����w�iO�k�i�z����4�~u->g�3�,����j{�J�c���o�����C^������6��C�k��>q��z���;w���֎��ָ����{���M]�����KY��������v>�~��R��=w>�7�u��L`��������Okzu��;��o�߻�����F�_�Ϩ�k݌_�W]��]I:\c[`������z���k�s�dW�'�>�� @ �E�� �`�ԫ�9@��K!HZ�D%A  U#�Ħ� #y&�P����+�8B0�u<���0�0 R�π *��!�dDDAx� CA�0���!-&&Hf')1�a �P if (position === -1) {
              var topOrBottom = secondNode.tagName.toLowerCase() === 'thead' ? 0 : tbodies.length - 1;
              return tbodies[topOrBottom];
            }

            return tbodies[position + (upBool ? -1 : 1)];
          }

          function getFirstHeadOrFoot(upBool, parent) {
            var tagName = upBool ? 'thead' : 'tfoot';
            var headOrFoot = editor.dom.select('>' + tagName, parent);
            return headOrFoot.length !== 0 ? headOrFoot[0] : null;
          }

          function moveToRowInTarget(upBool, targetParent, sourceNode) {
            var targetRow = getChildForDirection(targetParent, upBool);

            if (targetRow) {
              moveCursorToRow(editor, sourceNode, targetRow, upBool);
            }

            e.preventDefault();
            return true;
          }

          function escapeTable(upBool, currentRow, siblingDirection, table) {
            var tableSibling = table[siblingDirection];

            if (tableSibling) {
              moveCursorToStartOfElement(tableSibling);
              return true;
            }

            var parentCell = editor.dom.getParent(table, 'td,th');
            if (parentCell) {
              return handle(upBool, parentCell, e);
            }

            var backUpSibling = getChildForDirection(currentRow, !upBool);
            moveCursorToStartOfElement(backUpSibling);
            e.preventDefault();
            return false;
          }

          function getChildForDirection(parent, up) {
            var child = parent && parent[up ? 'lastChild' : 'firstChild'];
            // BR is not a valid table child to return in this case we return the table cell
            return child && child.nodeName === 'BR' ? editor.dom.getParent(child, 'td,th') : child;
          }

          function moveCursorToStartOfElement(n) {
            editor.selection.setCursorLocation(n, 0);
          }

          function isVerticalMovement() {
            return key == VK.UP || key == VK.DOWN;
          }

          function isInTable(editor) {
            var node = editor.selection.getNode();
            var currentRow = editor.dom.getParent(node, 'tr');
            return currentRow !== null;
          }

          function columnIndex(column) {
            var colIndex = 0;
            var c = column;
            while (c.previousSibling) {
              c = c.previousSibling;
              colIndex = colIndex + getSpanVal(c, "colspan");
            }
            return colIndex;
          }

          function findColumn(rowElement, columnIndex) {
            var c = 0, r = 0;

            each(rowElement.children, function (cell, i) {
              c = c + getSpanVal(cell, "colspan");
              r = i;
              if (c > columnIndex) {
                return false;
              }
            });
            return r;
          }

          function moveCursorToRow(ed, node, row, upBool) {
            var srcColumnIndex = columnIndex(editor.dom.getParent(node, 'td,th'));
            var tgtColumnIndex = findColumn(row, srcColumnIndex);
            var tgtNode = row.childNodes[tgtColumnIndex];
            var rowCellTarget = getChildForDirection(tgtNode, upBool);
            moveCursorToStartOfElement(rowCellTarget || tgtNode);
          }

          function shouldFixCaret(preBrowserNode) {
            var newNode = editor.selection.getNode();
            var newParent = editor.dom.getParent(newNode, 'td,th');
            var oldParent = editor.dom.getParent(preBrowserNode, 'td,th');

            return newParent && newParent !== oldParent && checkSameParentTable(newParent, oldParent);
          }

          function checkSameParentTable(nodeOne, NodeTwo) {
            return editor.dom.getParent(nodeOne, 'TABLE') === editor.dom.getParent(NodeTwo, 'TABLE');
          }

          if (isVerticalMovement() && isInTable(editor)) {
            var preBrowserNode = editor.selection.getNode();
            Delay.setEditorTimeout(editor, function () {
              if (shouldFixCaret(preBrowserNode)) {
                handoџ����B���Y����~So��k��zzo���}d�E�^�~�{��k��_O�}��|�o�^���Ͽ���%������=���������7}����[����׺ _�f���sg����w��p|���������e�*���_��޳s�G��\[�rK6�	��Y�_o��_��u~� )���]��������M�������k��=2߱}��w�V	tb¿oHf |����w��۠{-_�n����K򛬷﵏�~~����޴�����(����������V�kO��]���I����������r�~�5��}�Vu^��w��^5�0��յ��OƏ�ϼ_y'���
�.�7������?����n�g����~�sW����ǖ�}����a��?����?����T��t�?��k;�so�����ܾ��x�;W�!��\��'-��R���e���C+��f������Ru�Jƫ���M~_�߹>��巌��Ϙ����S7su?�\���~���۩n��|���M�׊��ޙ&�����oOv�<��ߝ������?Q��{�uU��z�o���{�����^�-����zM���{�O�����ӟ�~����=}�y?>�ӿ��;�{q>�����v���~,{�����|���Ú'����e���z�������#�~��.���>}S�����z.�]޿�^���������g����J�e/w����?���]����V����{����9����
�X|.���������"��˭���mn�_��_[Ͽ9�^��Rl�����>]��}�muw�� ��.k��}�?�/O~W�����bV�6�ӯ/~�����/��)���{�XP�u���Q���WU��l���f��o뚷΁������U�Y[W����t�:ߛ��;��U��]���x����b�O��o���թ)�_.�e��QS���������O}t�G��t��"/����Y�z��n~ֽ�6v��Z�������v�����^��.}�k���ι�����n����ϟ�Y�W��o���>��;��N�G�{��;��b���ޯ�j���m��ן~�����~��;�״���Q)���uY����ޭc��k����Z�_�mw�����}����w�}j��'㾧L}d�>]����j�����������w}y��S���}G��Q��}EӮ�>]�{��{���[vh���C��ʷ������f��xn������ߋ������b����z����xd럇��BiG�~�v_��Ǜ��/�s_����/˦������$��n�����:r�;�;����۳�jw�jyu����Fp�x���򠬹���b����'��n��٩��ˮE��s[�����F��c���w����'��O�v����s�^�Ʌy�=��h�{~�[�����u����[���W�o����������.3o��Lh��^���y���w�����in��ݿ}�}O���8���>W�-�V��c�߈��}_���y#��64o���ݛl�>�{�Q�����G��o���6׮��y��f�IY����mn�q�-y���P�+�����?�������ѱ~���5�3�TO�X>���W�[����i\q����]}p�?��Ow��W�?���}B����_���&/I{�o���������y?�~ڞ��c[��[���6�R�ms'�������!۠�[>_���}տF�q�������o_�s�M����������7���f�����ynT���5�ݗ�~{�wߧ��9�{����__��~���m�_���_�ݥw���������kt�ο~����^���{���W_�bn|������m�_ç9]���?��c�ֽ�l�8�f]J���Q�e����������}�^v�5�٘���L��z�o����޵�mݜH����}���k�2�D��?���~�y��s�dW�f���������g��}X�����_ߏ?�����׿~�_�~��}z���-�z�-���B�����o����{��6����gߩ�n�=ۮ�����^����h���?���l�~�w�}�����{}��^��]��ﻙ��,��;����J��m��7��'��_�?,~���N���߿�Qǻ*�
/3=�w������մU�(x�}����^U��kҪ��u�����{��k���F��hnw�����[�v��n����VP����Z�����v�����=���V���7ϥ��N�����o��/���������y�������A7��}uu~=����S�~7߹_�����`(�n�������<Ϣޣ��M������{�M���>��
�9�����￿��w�_�}=���9���ז�B?e��0���D�!�!"�s�Y��)0�T`3'�`�� D�,�$2 Hc q� lLܗ	"���T 	��Lğ^21H�XE 6��L����� @1���G��n�y-i1 h&��o`D1(��@�A�c�7���LLp�3�ːf8wP.�� �T7|!��H�´$�Z�ơ�M��"�0� )�CX�Eˀ�30 d3`��@�,MQ�`�[K�!	�� �T T�N���$PK6�,�#|Z�P^ʞ=P:����q�`,`QU0v!�#M,Z��Y �a��O{f
��Z��A\j�h f ��%��`
�"�D0LC�AA5Ĳ�IFD!

9
Q�����UP�,Df��$��0o)4E�H�@
M p@�� B ���`p,`�H��	����{`F� �#��� �X�����QF\C�A8	�K�R�@ ���E� @���xH; ��t� ��(�dS1��`�Q�/�I
�F2#�����!p�n86�(]\���еS9P�����(��&uT�K�� $�"HH` q
�%��B0 � �
,U���S��� ,h�dV#�Q>TB��@�1�pJ� ���-P�Ķ(*@�9��+ TH4��@H�@ЍQ��it�D�L�Pg���0� �� �� ��E����T q�B|U/@�6��̦R����h�` A /��S�D�0�Ij4�L!%UB� � �,C �& ,T��Z
�*��)�R�	"(,g;��� �p� �0 ��P��  �03D��'	TȆ�`(�d�0�5"�!������� )P�#sN`"t�"$j�0�۲ �!��J�Qbm���̒(��`���ߩh,7��"�h�,f�����((�2���
���A���A2
�U+�Kx�
� ��'��R"#d`�(%"��Q�3 ���1 !�.c����X ��8I �C$@�qG*�0P�p�$���\�n�~� `,FV��B��@��!T0!�x1�"�!�� ��ʧ�'�	� KD]�w�K��"G��^l��@�E����G� �� ��� �D;@�a ��f ���F�C�8Q�s �0#�#"N�'BV bX���Y0,�2�� 䈱HE�ȅ�%��p1b��qz����e)	Ӥ��R �zL�:$>4&!:^fWFc6�3�z�$����
4@ 0����GࢀB��RS/bz��n s�$��Cj��R i� ��X"`D9`�-"�T���A ��hB0���1"&i`����YP1�$� "ap�$q?��� ��@a�F¨�8AB�� �QJJ$ʈ�ǂ	Xh� 
p��� ��'��TI� Ma2J r�'
O j�Q^A&F;����(AeJ6@ӄ		 ��#Ah��
LW��o�SGS�]��6 �8�eJ�bEI1EpĜ W�Q	N: �@`묄 ��*.`�A	"@0"e:�T�R5�@�b��Ո�B���Z[!� ���� �B�q�T ( $GL%@�
Ʌ@@5 ��ä 5��!
�0�)�C"�'�PL��0�/(�	�[� ��Ќnn�
���AHo"@ �A2z�� �y�@B�#�`"��	E��0@��CҀ4 �|B%�r�!	��x ���L":��� Ш�Y�� o�2Q�	 �R�(�fj�@U@ 	w������ �A#5'C	��C�Z!$�&��`K		�d�	��Dr 0�@�T8��N�,0(���yz*
$�a ���}"{RW�E,�����Xs�z��2l��m���:	�$� ���FȨC�! 	K#gT3�-5D��q�`��LL V DZ)���S �`4"��BNb�"�&�p�@3w�xVUy��-4F
�����10��Xe���T�āl!`W�G�Ĭ<B� �Kч�a/
L����"&_@I�  8�"Z�h� �fnEX��
܄ 1�A'` ̽|F �d0% 0�`(a��D�eqP	r�C�h�@,�	hR1� c�@h;.Q7��2�$1��(� -p��@+a�D'��!�L�l�	�2�!3�D������ ���4��H�"(0�2�$r*6*0}&��<L����Ea`H�; h�%M6dzH7G��>1 X!�C	�4����`���@��@
��(�EVf, �T!(B"�H� 
INH�
P��q B@@ j 
F� ��*H�\B� <�B U`f��T* x
е�4
0 �)����4�UV�E
 "Є%F��� ������ 0�d�:��h2�-�0�0IR��6����`ܩ
�ôG�k&��j��@*a��UpX��&0Ԅ�"^���� �0��R$|�0���ZD1b�"���A� (���@ �	�j#r�
Pb��D�H#�`"P�uQb5��G�5�����,�*J��&	�@�
�D@\(pA��AIR#�'hDT
(- 2L()K���!����T� .Ȫ�@/ �#8�ܣc��f��J�$���R���P@�E	U���G ��@���5��0ćE +j��22A�D�AJЂDp� ��q(���4	�| mĐ(5$�k�L��A@e��;B*� ,D�"U`0�Bw�E�	C��J5%������%�XC<I�����c�вR @Ј��d!��M1T�JI
�J,�R�KP��N4��� A�XF
,5i E B4&���� G�@�N�E G�a<�$5h��DH��B��փ� /��&H���0�A� 
���hg�b2 X�	$�� �HA�-A��Z& � �QU
�C�!��VQ N�9��� ��р4J'��#4�c�@�Uj�RΎ(r2r�0p94`���@�8�"��c?  +�-=�b�#9�dI�	 �a0� �0��V0 � 
a` `��� aZ�Ζ��p��
t ,�x�0IJ

�"� '0�[��j� ���A �ƨ��
�M�!(4�@ �BP\@lq`���I��a��
2�" ��D$��X���f�7q`$� T2�!dN�O2@��p$C�ϑ�ԅAC���8�A�, �� ��
O������`  J^dωtW
\���I�o�WQ�v9��/y�y�c���{���}Bw�����M��[�����3����?��{�>�;%��������w���]��oݧ(�]�n��=y��f����wv���
��p}����;��?��ҝ��g���.~��~��*��^���ϫ��`:�+���5���f��3�����y�������7��������a�������	\���w�����ߣ����	>�q������������/���Ow��ݧ���k����D��Ӿ����u���O�ǝk�-���X����������V�_��q^|����;�����s\ݷ����[yw+{y���y���߬�������sl��W�f�����g�5��o��Mw���x���?�s�V��}m�����W���������Y'��g�#���q�;�����q�]gs6.�z;�X��*��������v�η���]���Z���'�?~�x>�����>��֟��u^�}���������϶T��NI���]����>�������d��v��Fm��u޻[_�o�gv'�g����|zy����/����6�d3�Q��<��ٿ���w`؇,>����:S݇���}S��3��v�+���}�ۿm�n�G|ms���{v���~��>�,N�q��?g����ٸ
������SX�?��Ϳ��Y��g��w�}���G����N�������}����:��>�y�1޿����]��?�7���nW~���s���g��k�ڿ�z��}�_,��nN�١~���2����W=���۳N�*��3�?W��n�W�~�b��o���^���"Uf�>�k��R�E�1���M�_��/���5�i�|�_��w�J�TzN���?���?������7��'w}���~T�=����6m˚�g���"��r󶔺���W�����g��������kG����g����?ϕC��{���:�76�O���u�>��?��tg�۾������+���7��������l�����O��z��gӽW������������������n�\��������fj���漟H���_m���g������g����{�o������\����_��oz���[���F�_}�'�ǯ�o.�=�^�{����.�~;�Wӡ�����ۃ���eY��~��o/_C����v���ۿ�}Sٻ���ak_��uk����ԝ�/�@H?ޯ�3�q��n��s�G����u�^6o�m��s�ח���?/�������ƫ_�������^o�����6���g��������)�oߟ����w��}��`�������O�l�w�k9����)�}���=vc���~;����~������G��D����x��?w�������-��\��o������Z}����}bؚ����⾷����xU���R���:8/������쿞�g�������_~{]��������m��r����K�01�����3r��׷\�{��v��m�~2���߾�������7��������Wy�]���^��O{�:����}���O�~w>������<�WW����Ү�y����:Y��[�v��x��͢[S�o��o�?��kyؾ���wN�v���}�5�o��?�_;gu�ܪ������vʟ�s�XO/�N���v���߿�v�W���ׇ�v��߼��h��+�]�Y�w~
��*8�ܥ�>���u��^���y_��c��/g�}��������2���ӯ������-_~�����|j���8�}o�o˾���߽:4���W������������;�=�f�?��w��#i�s�����U|��R��|��O|�6��p��{�LF�Kx��/ؿ�������1�[��I~���1�����/{�zn�d_���H�a>q��k�z�����4Z�����]C��l���~��*���Y?w����rw臿��Z������~Z��J�����Z���������������3��
          }

          ctrl.disabled(state);

          editor.selection.selectorChanged(selector, function (state) {
            ctrl.disabled(!state);
          });
        }

        if (editor.initialized) {
          bindStateListener();
        } else {
          editor.on('init', bindStateListener);
        }
      }

      function postRender() {
        /*jshint validthis:true*/
        handleDisabledState(this, 'table');
      }

      function postRenderCell() {
        /*jshint validthis:true*/
        handleDisabledState(this, 'td,th');
      }

      function postRenderMergeCell() {
        /*jshint validthis:true*/
        handleDisabledState(this, 'td,th', true);
      }

      function generateTableGrid() {
        var html = '';

        html = '<table role="grid" class="mce-grid mce-grid-border" aria-readonly="true">';

        for (var y = 0; y < 10; y++) {
          html += '<tr>';

          for (var x = 0; x < 10; x++) {
            html += '<td role="gridcell" tabindex="-1"><a id="mcegrid' + (y * 10 + x) + '" href="#" ' +
              'data-mce-x="' + x + '" data-mce-y="' + y + '"></a></td>';
          }

          html += '</tr>';
        }

        html += '</table>';

        html += '<div class="mce-text-center" role="presentation">1 x 1</div>';

        return html;
      }

      function selectGrid(tx, ty, control) {
        var table = control.getEl().getElementsByTagName('table')[0];
        var x, y, focusCell, cell, active;
        var rtl = control.isRtl() || control.parent().rel == 'tl-tr';

        table.nextSibling.innerHTML = (tx + 1) + ' x ' + (ty + 1);

        if (rtl) {
          tx = 9 - tx;
        }

        for (y = 0; y < 10; y++) {
          for (x = 0; x < 10; x++) {
            cell = table.rows[y].childNodes[x].firstChild;
            active = (rtl ? x >= tx : x <= tx) && y <= ty;

            editor.dom.toggleClass(cell, 'mce-active', active);

            if (active) {
              focusCell = cell;
            }
          }
        }

        return focusCell.parentNode;
      }

      if (editor.settings.table_grid === false) {
        editor.addMenuItem('inserttable', {
          text: 'Table',
          icon: 'table',
          context: 'table',
          onclick: dialogs.table
        });
      } else {
        editor.addMenuItem('inserttable', {
          text: 'Table',
          icon: 'table',
          context: 'table',
          ariaHideMenu: true,
          onclick: function (e) {
            if (e.aria) {
              this.parent().hideAll();
              e.stopImmediatePropagation();
              dialogs.table();
            }
          },
          onshow: function () {
            selectGrid(0, 0, this.menu.items()[0]);
          },
          onhide: function () {
            var elements = this.menu.items()[0].getEl().getElementsByTagName('a');
            editor.dom.removeClass(elements, 'mce-active');
            editor.dom.addClass(elements[0], 'mce-active');
          },
          menu: [
            {
              type: 'container',
              html: generateTableGrid(),

              onPostRender: function () {
                this.lastX = this.lastY = 0;
              },

              onmousemove: function (e) {
                var target = e.target, x, y;

                if (target.tagName.toUpperCase() == 'A') {
                  x = parseInt(target.getAttribute('data-mce-x'), 10);
                  y = parseInt(target.getAttribute('data-mce-y'), 10);

                  if (this.isRtl() || this.parent().rel == 'tl-tr') {
                    x = 9 - x;
                  }

                  if (x !== this.lastX || y !== this.lastY) {
                    selectGrid(x, y, e.control);

                    this.lastX = x;
                    this.lastY = y;
                  }
                }
              },

              onclick: function (e) {
                var self = this;

                if (e.target.tagName.toUpperCase() == 'A') {
                  e.preventDefault();
                  e.stopPropagati�{�A�mo�q-���-Zv�tOt�����ԥS[O��Y��Zw�/}�H�������c�s�/��q��7���?�6ːO^��󯟻���~����L��:�}ܣ��8����R'�܋[�^vк/�פՏ8y��v�~�w��i7?J������k����������~kޯ���OoK���?o*{����������������g?�;�Ӛ����[�ߺ�+��y���g��_{������]���o�ϵ��s�/m�F����\�~=�:���k��{>��O}��z���-��)�����z��O���\��1�y��M�^�7-���|����?���f�='��,����-?������������������~}u�o]~����>ޏ��~�j��O�����\�N��%���~��Z@�>��Z�]Y~[�չ�9�p���]�Տp&VM�yQ��-��w�~������k3{������z�m��t^���}�n����Wi�ԃ�߃�R�y�d��x&�(���������ݓf+)��_���O����]�_|�O��쯼;=��w����|���X�<����_o�;פ�j���z޽�����'�������Ex3u����~�����ե����x���o�l}o!���;�U�5������N�����\?=����ҫ�~�+�>��U���dm�M����>�7��z-�xY׿q�Nu�H��D�3}���6��o�y��*j�)���r�_��ME�^��y�����j��u��e-'��7~Ww,�s��@��~�o}�=��-�/�㷷P�D������/Ҿ��
��G!Ӟ��g����߇l~[�w�����_���[��-�M��=�^��������ݻ�z��5��ۯoϺ.�����������(��R�Dg�ˍuI�~+r��u�u�o�}�泔��i5��;�!��s����}��}~�~�o��j����ѻ���'�w��^���O^7ϧ�/�����{����o�ק�޿no�SwZ�g��O���s������>�����'�y�_t��������7;������^�׏=�o_�9�g����f��x�Xu~~�;*��~�d���C��f�(�����ݿ��w��'~p�nϾ7^���m?�_�<��>��;=��]�W�7CPo�����?o��O�r�������*�헿�������=����]�������Y��Z��_���ﾳ]����/������ǥ�o������t��=~���̯�v��^��������nr��m^��5�W�J窿�.�����W��
p��;���G��?r}�~�|��u?��=�Ӿ�jZ�V�u���ϟ������\|���bj��{u�>���������6�)|����ݩ���'϶_�j©_S���V�&��E���v�\:����݃?������g�<�?�������WN��k���N.�9��i�Fuo���g�wf��_����_����H<�7[G����*���޺�|�b���\�\���c{�0��k��_���Ԯ��[��Rq�����_�V�ݿ��ۺֿy��Gϗ�����!��}w�������>����������v�_.o��@*;zSiY�����]��<	�on (grid) {
          var cell;

          cell = editor.dom.getParent(editor.selection.getStart(), 'th,td');

          if (!editor.dom.select('td[data-mce-selected],th[data-mce-selected]').length) {
            dialogs.merge(grid, cell);
          } else {
            grid.merge();
          }
        },

        mceTableInsertRowBefore: function (grid) {
          grid.insertRows(true);
        },

        mceTableInsertRowAfter: function (grid) {
          grid.insertRows();
        },

        mceTableInsertColBefore: function (grid) {
          grid.insertCols(true);
        },

        mceTableInsertColAfter: function (grid) {
          grid.insertCols();
        },

        mceTableDeleteCol: function (grid) {
          grid.deleteCols();
        },

        mceTableDeleteRow: function (grid) {
          grid.deleteRows();
        },

        mceTableCutRow: function (grid) {
          clipboardRows = grid.cutRows();
        },

        mceTableCopyRow: function (grid) {
          clipboardRows = grid.copyRows();
        },

        mceTablePasteRowBefore: function (grid) {
          grid.pasteRows(clipboardRows, true);
        },

        mceTablePasteRowAfter: function (grid) {
          grid.pasteRows(clipboardRows);
        },

        mceSplitColsBefore: function (grid) {
          grid.splitCols(true);
        },

        mceSplitColsAfter: function (grid) {
          grid.splitCols(false);
        },

        mceTableDelete: function (grid) {
          if (resizeBars) {
            resizeBars.clearBars();
          }
          grid.deleteTable();
        }
      }, function (func, name) {
        editor.addCommand(name, function () {
          var grid = new TableGrid(editor);

          if (grid) {
            func(grid);
            editor.execCommand('mceRepaint');
            self.cellSelection.clear();
          }
        });
      });

      // Register dialog commands
      each({
        mceInsertTable: dialogs.table,
        mceTableProps: function () {
          dialogs.table(true);
        },
        mceTableRowProps: dialogs.row,
        mceTableCellProps: dialogs.cell
      }, function (func, name) {
        editor.addCommand(name, function (ui, val) {
          func(val);
        });
      });

      function addButtons() {
        editor.addButton('tableprops', {
          title: 'Table properties',
          onclick: dialogs.tableProps,
          icon: 'table'
        });

        editor.addButton('tabledelete', {
          title: 'Delete table',
          onclick: cmd('mceTableDelete')
        });

        editor.addButton('tablecellprops', {
          title: 'Cell properties',
          onclick: cmd('mceTableCellProps')
        });

        editor.addButton('tablemergecells', {
          title: 'Merge cells',
          onclick: cmd('mceTableMergeCells')
        });

        editor.addButton('tablesplitcells', {
          title: 'Split cell',
          onclick: cmd('mceTableSplitCells')
        });

        editor.addButton('tableinsertrowbefore', {
          title: 'Insert row before',
          onclick: cmd('mceTableInsertRowBefore')
        });

        editor.addButton('tableinsertrowafter', {
          title: 'Insert row after',
          onclick: cmd('mceTableInsertRowAfter')
        });

        editor.addButton('tabledeleterow', {
          title: 'Delete row',
          onclick: cmd('mceTableDeleteRow')
        });

        editor.addButton('tablerowprops', {
          title: 'Row properties',
          onclick: cmd('mceTableRowProps')
        });

        editor.addButton('tablecutrow', {
          title: 'Cut row',
          onclick: cmd('mceTableCutRow')
        });

        editor.addButton('tablecopyrow', {
          title: 'Copy row',
          onclick: cmd('mceTableCopyRow')
        });

        editor.addButton('tablepasterowbefore', {
          title: 'Paste row before',
          onclick: cmd('mceTablePasteRowBefore')
        });

        editor.addButton('tablepasterowafter', {
          title: 'Paste row after',
          onclick: cmd('mceTablePasteRowAfter')
        });

        editor.addButton('tableinsertcolbefore', {
          title: 'Insert column before',
          onclick: cmd('mceTableInsertColBefore')
        });

        editor.addButton('tableinsertcolafter', {
          title: 'Insert column after',
          onclick: cmd('mceTableInsertColAfter')
        });

        editor.addButton('tabledeletecol', {
          title: 'Delete column',
          onclick: cmd('mceTableDeleteCol')
        });

      }

      function isTable(table) {

        var selectorMatched = editor.dom.is(table, 'table') && editor.getBody().contains(table);

        return selectorMatched;
      }

      function addToolbars() {
        var toolbarItems = editor.settings.table_toolbar;

        if (toolbarItems === '' || toolbarItems === false) {
          return;
        }

        if (!toolbarItems) {
          toolbarItems = 'tableprops tabledelete | ' +
            'tableinsertrowbefore tableinsertrowafter tabledeleterow | ' +
            'tableinsertcolbefore tableinsertcolafter tabledeletecol';
        }

        editor.addContextToolbar(
          isTable,
          toolbarItems
        );
      }

      function getClipboardRows() {
        return clipboardRows;
      }

      function setClipboardRows(rows) {
        clipboardRows = rows;
      }

      addButtons();
      addToolbars();

      // Enable tab key cell navigation
      if (editor.settings.table_tab_navigation !== false) {
        editor.on('keydown', function (e) {
          var cellElm, grid, delta;
          var selectionStart = editor.selection.getStart();

          if (e.keyCode === VK.TAB) {
            if (editor.dom.getParent(selectionStart, 'LI,DT,DD')) {
              return;
            }

            cellElm = editor.dom.getParent(selectionStart, 'th,td');

            if (cellElm) {
              e.preventDefault();

              grid = new TableGrid(editor);
              delta = e.shiftKey ? -1 : 1;

              editor.undoManager.transact(function () {
                if (!grid.moveRelIdx(cellElm, delta) && delta > 0) {
                  grid.insertRow();
                  grid.refresh();
                  grid.moveRelIdx(cellElm, delta);
                }
              });
            }
          }
        });
      }

      self.insertTable = insertTable;
      self.setClipboardRows = setClipboardRows;
      self.getClipboardRows = getClipboardRows;
    }

    PluginManager.add('table', Plugin);

    return function () { };
  }
);

dem('tinymce.plugins.table.Plugin')();
})();