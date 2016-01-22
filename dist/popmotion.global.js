(function() {
var exports = {};
'use strict';

var _popmotion = ((function() {
var exports = {};
var __small$_11 = (function() {
var exports = {};
'use strict';

exports.__esModule = true;
function push() {
    var _Array$prototype$push;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    (_Array$prototype$push = Array.prototype.push).call.apply(_Array$prototype$push, [this].concat(args));

    if (this.length >= this._maxSize) {
        this.shift();
    }
}

var CAMEL_CASE_PATTERN = /([a-z])([A-Z])/g;
var REPLACE_TEMPLATE = '$1-$2';
var HAS_PERFORMANCE_NOW = typeof performance !== 'undefined' && performance.now;

/*
    Get var type as string
    
    @param: Variable to test
    @return [string]: Returns, for instance 'Object' if [object Object]
*/
var varType = function (variable) {
    return Object.prototype.toString.call(variable).slice(8, -1);
};

/*
    Convert camelCase to dash-case

    @param [string]
    @return [string]
*/
var camelToDash = exports.camelToDash = function (string) {
    return string.replace(CAMEL_CASE_PATTERN, REPLACE_TEMPLATE).toLowerCase();
};

/*
    Create an auto-culling buffer array

    @param [array]
    @param [int]
    @return [array]
*/
var createBuffer = exports.createBuffer = function () {
    var maxSize = arguments.length <= 0 || arguments[0] === undefined ? 3 : arguments[0];
    var array = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

    array.push = push;
    array._maxSize = maxSize || 0;

    return array;
};

var createDelimited = exports.createDelimited = function (values, terms, delimiter, chop) {
    var combined = '';

    terms.forEach(function (term) {
        if (values.hasOwnProperty(key)) {
            combined += values[key] + delimiter;
        }
    });

    if (chop) {
        combined = combined.slice(0, -chop);
    }

    return combined;
};

/*
    Create a function string

    '20px', 'translate' -> 'translate(20px)'

    @param [string]
    @param [string]
    @return [string]
*/
var createFunctionString = exports.createFunctionString = function (value, prefix) {
    return prefix + '(' + value + ')';
};

/*
    Generate current timestamp
    
    @return [timestamp]: Current UNIX timestamp
*/
var currentTime = exports.currentTime = function () {
    return HAS_PERFORMANCE_NOW ? performance.now() : new Date().getTime();
};

/*
    Iterate over an object and fire a callback for every item in it

    @param [object]: Object to iterate over
    @param [function]: Callback to fire
*/
var each = exports.each = function (object, callback) {
    var keys = object ? Object.keys(object) : [];
    var numKeys = keys.length;

    for (var i = 0; i < numKeys; i++) {
        var _key2 = keys[i];
        var prop = object[_key2];

        callback(prop, _key2, object);
    }
};

/*
    Split color string into map of color properties

    "rgba(255, 255, 255, 0)", ["Red", 'Green", "Blue", "Alpha"]

    { Red: 255... }
*/
var getColorValues = exports.getColorValues = function (value, colorTerms) {
    var colorValues = {};
    var colors = splitCommaDelimited(getValueFromFunctionString(value));

    colorTerms.forEach(function (term, i) {
        return colorTerms[term] = colors[i] !== undefined ? colors[i] : 1;
    });

    return colorValues;
};

/*
    Get value from function string

    "translateX(20px)" -> "20px"
*/
var getValueFromFunctionString = exports.getValueFromFunctionString = function (value) {
    return value.substring(value.indexOf('(') + 1, value.lastIndexOf(')'));
};

/*
    Check if two objects have changed from each other
    
    @param [object]: Input A
    @param [object]: Input B
    @return [boolean]: True if different
*/
var hasChanged = exports.hasChanged = function (a, b) {
    var changed = false;

    each(a, function (value, key) {
        if (hasProperty(b, key)) {
            if (value !== b[key]) {
                changed = true;
            }
        } else {
            changed = true;
        }
    });

    return changed;
};

/*
    Check if object has property and it isn't undefined

    @param [object]
    @param [string]
    @return [boolean]
*/
var hasProperty = exports.hasProperty = function (object, propertyName) {
    return object.hasOwnProperty(propertyName) && object[propertyName] !== undefined;
};

/*
    Is utils var an array ? 
    
    @param: Variable to test
    @return [boolean]: Returns true if utils.varType === 'Array'
*/
var isArray = exports.isArray = function (arr) {
    return varType(arr) === 'Array';
};

/*
    Is utils var a function ? 
    
    @param: Variable to test
    @return [boolean]: Returns true if utils.varType === 'Function'
*/
var isFunc = exports.isFunc = function (obj) {
    return varType(obj) === 'Function';
};

/*
    Is utils var a number?
    
    @param: Variable to test
    @return [boolean]: Returns true if typeof === 'number'
*/
var isNum = exports.isNum = function (num) {
    return typeof num === 'number';
};

/*
    Is utils var an object?
    
    @param: Variable to test
    @return [boolean]: Returns true if typeof === 'object'
*/
var isObj = exports.isObj = function (obj) {
    return typeof obj === 'object';
};

/*
    Is utils a relative value assignment?
    
    @param [string]: Variable to test
    @return [boolean]: If utils looks like a relative value assignment
*/
var isRelativeValue = exports.isRelativeValue = function (value) {
    return value && value.indexOf && value.indexOf('=') > 0 ? true : false;
};

/*
    Is utils var a string ? 
    
    @param: Variable to test
    @return [boolean]: Returns true if typeof str === 'string'
*/
var isString = exports.isString = function (str) {
    return typeof str === 'string';
};

/*
    @param [string || NodeList]:
        If string, treated as selector.
        If not, treated as preexisting NodeList

    @return [Array]
*/
var selectDom = exports.selectDom = function (selector) {
    var nodes = typeof selector === 'string' ? document.querySelectorAll(selector) : selector;
    return nodes.length ? [].slice.call(nodes) : [].push(nodes);
};

/*
    Split comma-delimited string

    "foo,bar" -> ["foo", "bar"]

    @param [string]
    @return [array]
*/
var splitCommaDelimited = exports.splitCommaDelimited = function (value) {
    return isString(value) ? value.split(/,\s*/) : [value];
};

/*
    Split space-delimited string

    "foo bar" -> ["foo", "bar"]

    @param [string]
    @return [array]
*/
var splitSpaceDelimited = exports.splitSpaceDelimited = function (value) {
    return isString(value) ? value.split(' ') : [value];
};

/*
    Split a value into a value/unit object
    
        "200px" -> { value: 200, unit: "px" }
        
    @param [string]: Value to split
    @return [object]: Object with value and unit props
*/
var splitValueUnit = exports.splitValueUnit = function (value) {
    var splitVal = value.match(/(-?\d*\.?\d*)(.*)/);

    return {
        value: parseFloat(splitVal[1]),
        unit: splitVal[2]
    };
};

/*
    Convert number to x decimal places

    @param [number]
    @param [number]
    @return [number]
*/
var toDecimal = exports.toDecimal = function (num) {
    var precision = arguments.length <= 1 || arguments[1] === undefined ? 2 : arguments[1];

    precision = Math.pow(10, precision);
    return Math.round(num * precision) / precision;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmMvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsU0FBUyxJQUFULEdBQXVCOzs7c0NBQU47O0tBQU07O0FBQ25CLG1DQUFNLFNBQU4sQ0FBZ0IsSUFBaEIsRUFBcUIsSUFBckIsK0JBQTBCLGFBQVMsS0FBbkMsRUFEbUI7O0FBR25CLFFBQUksS0FBSyxNQUFMLElBQWUsS0FBSyxRQUFMLEVBQWU7QUFDOUIsYUFBSyxLQUFMLEdBRDhCO0tBQWxDO0NBSEo7O0FBUUEsSUFBTSxxQkFBcUIsaUJBQXJCO0FBQ04sSUFBTSxtQkFBbUIsT0FBbkI7QUFDTixJQUFNLHNCQUF1QixPQUFPLFdBQVAsS0FBdUIsV0FBdkIsSUFBc0MsWUFBWSxHQUFaOzs7Ozs7OztBQVFuRSxJQUFNLFVBQVU7V0FBWSxPQUFPLFNBQVAsQ0FBaUIsUUFBakIsQ0FBMEIsSUFBMUIsQ0FBK0IsUUFBL0IsRUFBeUMsS0FBekMsQ0FBK0MsQ0FBL0MsRUFBa0QsQ0FBQyxDQUFEO0NBQTlEOzs7Ozs7OztBQVFULElBQU0sb0NBQWMsVUFBQyxNQUFEO1dBQVksT0FBTyxPQUFQLENBQWUsa0JBQWYsRUFBbUMsZ0JBQW5DLEVBQXFELFdBQXJEO0NBQVo7Ozs7Ozs7OztBQVNwQixJQUFNLHNDQUFlLFlBQTZCO1FBQTVCLGdFQUFVLGlCQUFrQjtRQUFmLDhEQUFRLGtCQUFPOztBQUNyRCxVQUFNLElBQU4sR0FBYSxJQUFiLENBRHFEO0FBRXJELFVBQU0sUUFBTixHQUFpQixXQUFXLENBQVgsQ0FGb0M7O0FBSXJELFdBQU8sS0FBUCxDQUpxRDtDQUE3Qjs7QUFPckIsSUFBTSw0Q0FBa0IsVUFBQyxNQUFELEVBQVMsS0FBVCxFQUFnQixTQUFoQixFQUEyQixJQUEzQixFQUFvQztBQUMvRCxRQUFJLFdBQVcsRUFBWCxDQUQyRDs7QUFHL0QsVUFBTSxPQUFOLENBQWMsVUFBQyxJQUFELEVBQVU7QUFDcEIsWUFBSSxPQUFPLGNBQVAsQ0FBc0IsR0FBdEIsQ0FB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QztBQUU3QyxXQUFPLEtBQUssS0FBTCxDQUFXLE1BQU0sU0FBTixDQUFYLEdBQThCLFNBQTlCLENBRnNDO0NBQXhCIiwiZmlsZSI6InV0aWxzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gcHVzaCguLi5hcmdzKSB7XG4gICAgQXJyYXkucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCAuLi5hcmdzKTtcblxuICAgIGlmICh0aGlzLmxlbmd0aCA+PSB0aGlzLl9tYXhTaXplKSB7XG4gICAgICAgIHRoaXMuc2hpZnQoKTtcbiAgICB9XG59XG5cbmNvbnN0IENBTUVMX0NBU0VfUEFUVEVSTiA9IC8oW2Etel0pKFtBLVpdKS9nO1xuY29uc3QgUkVQTEFDRV9URU1QTEFURSA9ICckMS0kMic7XG5jb25zdCBIQVNfUEVSRk9STUFOQ0VfTk9XID0gKHR5cGVvZiBwZXJmb3JtYW5jZSAhPT0gJ3VuZGVmaW5lZCcgJiYgcGVyZm9ybWFuY2Uubm93KTtcblxuLypcbiAgICBHZXQgdmFyIHR5cGUgYXMgc3RyaW5nXG4gICAgXG4gICAgQHBhcmFtOiBWYXJpYWJsZSB0byB0ZXN0XG4gICAgQHJldHVybiBbc3RyaW5nXTogUmV0dXJucywgZm9yIGluc3RhbmNlICdPYmplY3QnIGlmIFtvYmplY3QgT2JqZWN0XVxuKi9cbmNvbnN0IHZhclR5cGUgPSB2YXJpYWJsZSA9PiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFyaWFibGUpLnNsaWNlKDgsIC0xKTtcblxuLypcbiAgICBDb252ZXJ0IGNhbWVsQ2FzZSB0byBkYXNoLWNhc2VcblxuICAgIEBwYXJhbSBbc3RyaW5nXVxuICAgIEByZXR1cm4gW3N0cmluZ11cbiovXG5leHBvcnQgY29uc3QgY2FtZWxUb0Rhc2ggPSAoc3RyaW5nKSA9PiBzdHJpbmcucmVwbGFjZShDQU1FTF9DQVNFX1BBVFRFUk4sIFJFUExBQ0VfVEVNUExBVEUpLnRvTG93ZXJDYXNlKCk7XG5cbi8qXG4gICAgQ3JlYXRlIGFuIGF1dG8tY3VsbGluZyBidWZmZXIgYXJyYXlcblxuICAgIEBwYXJhbSBbYXJyYXldXG4gICAgQHBhcmFtIFtpbnRdXG4gICAgQHJldHVybiBbYXJyYXldXG4qL1xuZXhwb3J0IGNvbnN0IGNyZWF0ZUJ1ZmZlciA9IChtYXhTaXplID0gMywgYXJyYXkgPSBbXSkgPT4ge1xuICAgIGFycmF5LnB1c2ggPSBwdXNoO1xuICAgIGFycmF5Ll9tYXhTaXplID0gbWF4U2l6ZSB8fCAwO1xuXG4gICAgcmV0dXJuIGFycmF5O1xufVxuXG5leHBvcnQgY29uc3QgY3JlYXRlRGVsaW1pdGVkID0gKHZhbHVlcywgdGVybXMsIGRlbGltaXRlciwgY2hvcCkgPT4ge1xuICAgIGxldCBjb21iaW5lZCA9ICcnO1xuXG4gICAgdGVybXMuZm9yRWFjaCgodGVybSkgPT4ge1xuICAgICAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgIGNvbWJpbmVkICs9IHZhbHVlc1trZXldICsgZGVsaW1pdGVyO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoY2hvcCkge1xuICAgICAgICBjb21iaW5lZCA9IGNvbWJpbmVkLnNsaWNlKDAsIC1jaG9wKTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29tYmluZWQ7XG59O1xuXG4vKlxuICAgIENyZWF0ZSBhIGZ1bmN0aW9uIHN0cmluZ1xuXG4gICAgJzIwcHgnLCAndHJhbnNsYXRlJyAtPiAndHJhbnNsYXRlKDIwcHgpJ1xuXG4gICAgQHBhcmFtIFtzdHJpbmddXG4gICAgQHBhcmFtIFtzdHJpbmddXG4gICAgQHJldHVybiBbc3RyaW5nXVxuKi9cbmV4cG9ydCBjb25zdCBjcmVhdGVGdW5jdGlvblN0cmluZyA9ICh2YWx1ZSwgcHJlZml4KSA9PiBgJHtwcmVmaXh9KCR7dmFsdWV9KWA7XG5cbi8qXG4gICAgR2VuZXJhdGUgY3VycmVudCB0aW1lc3RhbXBcbiAgICBcbiAgICBAcmV0dXJuIFt0aW1lc3RhbXBdOiBDdXJyZW50IFVOSVggdGltZXN0YW1wXG4qL1xuZXhwb3J0IGNvbnN0IGN1cnJlbnRUaW1lID0gKCkgPT4gSEFTX1BFUkZPUk1BTkNFX05PVyA/IHBlcmZvcm1hbmNlLm5vdygpIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbi8qXG4gICAgSXRlcmF0ZSBvdmVyIGFuIG9iamVjdCBhbmQgZmlyZSBhIGNhbGxiYWNrIGZvciBldmVyeSBpdGVtIGluIGl0XG5cbiAgICBAcGFyYW0gW29iamVjdF06IE9iamVjdCB0byBpdGVyYXRlIG92ZXJcbiAgICBAcGFyYW0gW2Z1bmN0aW9uXTogQ2FsbGJhY2sgdG8gZmlyZVxuKi9cbmV4cG9ydCBjb25zdCBlYWNoID0gKG9iamVjdCwgY2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBrZXlzID0gb2JqZWN0ID8gT2JqZWN0LmtleXMob2JqZWN0KSA6IFtdO1xuICAgIGNvbnN0IG51bUtleXMgPSBrZXlzLmxlbmd0aDtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtS2V5czsgaSsrKSB7XG4gICAgICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgICAgIGNvbnN0IHByb3AgPSBvYmplY3Rba2V5XTtcblxuICAgICAgICBjYWxsYmFjayhwcm9wLCBrZXksIG9iamVjdCk7XG4gICAgfVxufVxuXG4vKlxuICAgIFNwbGl0IGNvbG9yIHN0cmluZyBpbnRvIG1hcCBvZiBjb2xvciBwcm9wZXJ0aWVzXG5cbiAgICBcInJnYmEoMjU1LCAyNTUsIDI1NSwgMClcIiwgW1wiUmVkXCIsICdHcmVlblwiLCBcIkJsdWVcIiwgXCJBbHBoYVwiXVxuXG4gICAgeyBSZWQ6IDI1NS4uLiB9XG4qL1xuZXhwb3J0IGNvbnN0IGdldENvbG9yVmFsdWVzID0gKHZhbHVlLCBjb2xvclRlcm1zKSA9PiB7XG4gICAgY29uc3QgY29sb3JWYWx1ZXMgPSB7fTtcbiAgICBjb25zdCBjb2xvcnMgPSBzcGxpdENvbW1hRGVsaW1pdGVkKGdldFZhbHVlRnJvbUZ1bmN0aW9uU3RyaW5nKHZhbHVlKSk7XG5cbiAgICBjb2xvclRlcm1zLmZvckVhY2goKHRlcm0sIGkpID0+IGNvbG9yVGVybXNbdGVybV0gPSAoY29sb3JzW2ldICE9PSB1bmRlZmluZWQpID8gY29sb3JzW2ldIDogMSk7XG5cbiAgICByZXR1cm4gY29sb3JWYWx1ZXM7XG59XG5cbi8qXG4gICAgR2V0IHZhbHVlIGZyb20gZnVuY3Rpb24gc3RyaW5nXG5cbiAgICBcInRyYW5zbGF0ZVgoMjBweClcIiAtPiBcIjIwcHhcIlxuKi9cbmV4cG9ydCBjb25zdCBnZXRWYWx1ZUZyb21GdW5jdGlvblN0cmluZyA9ICh2YWx1ZSkgPT4gdmFsdWUuc3Vic3RyaW5nKHZhbHVlLmluZGV4T2YoJygnKSArIDEsIHZhbHVlLmxhc3RJbmRleE9mKCcpJykpO1xuXG4vKlxuICAgIENoZWNrIGlmIHR3byBvYmplY3RzIGhhdmUgY2hhbmdlZCBmcm9tIGVhY2ggb3RoZXJcbiAgICBcbiAgICBAcGFyYW0gW29iamVjdF06IElucHV0IEFcbiAgICBAcGFyYW0gW29iamVjdF06IElucHV0IEJcbiAgICBAcmV0dXJuIFtib29sZWFuXTogVHJ1ZSBpZiBkaWZmZXJlbnRcbiovXG5leHBvcnQgY29uc3QgaGFzQ2hhbmdlZCA9IChhLCBiKSA9PiB7XG4gICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcblxuICAgIGVhY2goYSwgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgaWYgKGhhc1Byb3BlcnR5KGIsIGtleSkpIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSAhPT0gYltrZXldKSB7XG4gICAgICAgICAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGNoYW5nZWQ7XG59O1xuXG4vKlxuICAgIENoZWNrIGlmIG9iamVjdCBoYXMgcHJvcGVydHkgYW5kIGl0IGlzbid0IHVuZGVmaW5lZFxuXG4gICAgQHBhcmFtIFtvYmplY3RdXG4gICAgQHBhcmFtIFtzdHJpbmddXG4gICAgQHJldHVybiBbYm9vbGVhbl1cbiovXG5leHBvcnQgY29uc3QgaGFzUHJvcGVydHkgPSAob2JqZWN0LCBwcm9wZXJ0eU5hbWUpID0+IG9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eU5hbWUpICYmIG9iamVjdFtwcm9wZXJ0eU5hbWVdICE9PSB1bmRlZmluZWQ7XG5cbi8qXG4gICAgSXMgdXRpbHMgdmFyIGFuIGFycmF5ID8gXG4gICAgXG4gICAgQHBhcmFtOiBWYXJpYWJsZSB0byB0ZXN0XG4gICAgQHJldHVybiBbYm9vbGVhbl06IFJldHVybnMgdHJ1ZSBpZiB1dGlscy52YXJUeXBlID09PSAnQXJyYXknXG4qL1xuZXhwb3J0IGNvbnN0IGlzQXJyYXkgPSAoYXJyKSA9PiB2YXJUeXBlKGFycikgPT09ICdBcnJheSc7XG5cbi8qXG4gICAgSXMgdXRpbHMgdmFyIGEgZnVuY3Rpb24gPyBcbiAgICBcbiAgICBAcGFyYW06IFZhcmlhYmxlIHRvIHRlc3RcbiAgICBAcmV0dXJuIFtib29sZWFuXTogUmV0dXJucyB0cnVlIGlmIHV0aWxzLnZhclR5cGUgPT09ICdGdW5jdGlvbidcbiovXG5leHBvcnQgY29uc3QgaXNGdW5jID0gKG9iaikgPT4gdmFyVHlwZShvYmopID09PSAnRnVuY3Rpb24nO1xuXG4vKlxuICAgIElzIHV0aWxzIHZhciBhIG51bWJlcj9cbiAgICBcbiAgICBAcGFyYW06IFZhcmlhYmxlIHRvIHRlc3RcbiAgICBAcmV0dXJuIFtib29sZWFuXTogUmV0dXJucyB0cnVlIGlmIHR5cGVvZiA9PT0gJ251bWJlcidcbiovXG5leHBvcnQgY29uc3QgaXNOdW0gPSAobnVtKSA9PiB0eXBlb2YgbnVtID09PSAnbnVtYmVyJztcblxuLypcbiAgICBJcyB1dGlscyB2YXIgYW4gb2JqZWN0P1xuICAgIFxuICAgIEBwYXJhbTogVmFyaWFibGUgdG8gdGVzdFxuICAgIEByZXR1cm4gW2Jvb2xlYW5dOiBSZXR1cm5zIHRydWUgaWYgdHlwZW9mID09PSAnb2JqZWN0J1xuKi9cbmV4cG9ydCBjb25zdCBpc09iaiA9IChvYmopID0+IHR5cGVvZiBvYmogPT09ICdvYmplY3QnO1xuXG4vKlxuICAgIElzIHV0aWxzIGEgcmVsYXRpdmUgdmFsdWUgYXNzaWdubWVudD9cbiAgICBcbiAgICBAcGFyYW0gW3N0cmluZ106IFZhcmlhYmxlIHRvIHRlc3RcbiAgICBAcmV0dXJuIFtib29sZWFuXTogSWYgdXRpbHMgbG9va3MgbGlrZSBhIHJlbGF0aXZlIHZhbHVlIGFzc2lnbm1lbnRcbiovXG5leHBvcnQgY29uc3QgaXNSZWxhdGl2ZVZhbHVlID0gKHZhbHVlKSA9PiAodmFsdWUgJiYgdmFsdWUuaW5kZXhPZiAmJiB2YWx1ZS5pbmRleE9mKCc9JykgPiAwKSA/IHRydWUgOiBmYWxzZTtcblxuLypcbiAgICBJcyB1dGlscyB2YXIgYSBzdHJpbmcgPyBcbiAgICBcbiAgICBAcGFyYW06IFZhcmlhYmxlIHRvIHRlc3RcbiAgICBAcmV0dXJuIFtib29sZWFuXTogUmV0dXJucyB0cnVlIGlmIHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnXG4qL1xuZXhwb3J0IGNvbnN0IGlzU3RyaW5nID0gKHN0cikgPT4gdHlwZW9mIHN0ciA9PT0gJ3N0cmluZyc7XG5cbi8qXG4gICAgQHBhcmFtIFtzdHJpbmcgfHwgTm9kZUxpc3RdOlxuICAgICAgICBJZiBzdHJpbmcsIHRyZWF0ZWQgYXMgc2VsZWN0b3IuXG4gICAgICAgIElmIG5vdCwgdHJlYXRlZCBhcyBwcmVleGlzdGluZyBOb2RlTGlzdFxuXG4gICAgQHJldHVybiBbQXJyYXldXG4qL1xuZXhwb3J0IGNvbnN0IHNlbGVjdERvbSA9IChzZWxlY3RvcikgPT4ge1xuICAgIGNvbnN0IG5vZGVzID0gKHR5cGVvZiBzZWxlY3RvciA9PT0gJ3N0cmluZycpID8gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcikgOiBzZWxlY3RvcjtcbiAgICByZXR1cm4gKG5vZGVzLmxlbmd0aCkgPyBbXS5zbGljZS5jYWxsKG5vZGVzKSA6IFtdLnB1c2gobm9kZXMpO1xufTtcblxuLypcbiAgICBTcGxpdCBjb21tYS1kZWxpbWl0ZWQgc3RyaW5nXG5cbiAgICBcImZvbyxiYXJcIiAtPiBbXCJmb29cIiwgXCJiYXJcIl1cblxuICAgIEBwYXJhbSBbc3RyaW5nXVxuICAgIEByZXR1cm4gW2FycmF5XVxuKi9cbmV4cG9ydCBjb25zdCBzcGxpdENvbW1hRGVsaW1pdGVkID0gKHZhbHVlKSA9PiBpc1N0cmluZyh2YWx1ZSkgPyB2YWx1ZS5zcGxpdCgvLFxccyovKSA6IFt2YWx1ZV07XG5cbi8qXG4gICAgU3BsaXQgc3BhY2UtZGVsaW1pdGVkIHN0cmluZ1xuXG4gICAgXCJmb28gYmFyXCIgLT4gW1wiZm9vXCIsIFwiYmFyXCJdXG5cbiAgICBAcGFyYW0gW3N0cmluZ11cbiAgICBAcmV0dXJuIFthcnJheV1cbiovXG5leHBvcnQgY29uc3Qgc3BsaXRTcGFjZURlbGltaXRlZCA9ICh2YWx1ZSkgPT4gaXNTdHJpbmcodmFsdWUpID8gdmFsdWUuc3BsaXQoJyAnKSA6IFt2YWx1ZV07XG5cbi8qXG4gICAgU3BsaXQgYSB2YWx1ZSBpbnRvIGEgdmFsdWUvdW5pdCBvYmplY3RcbiAgICBcbiAgICAgICAgXCIyMDBweFwiIC0+IHsgdmFsdWU6IDIwMCwgdW5pdDogXCJweFwiIH1cbiAgICAgICAgXG4gICAgQHBhcmFtIFtzdHJpbmddOiBWYWx1ZSB0byBzcGxpdFxuICAgIEByZXR1cm4gW29iamVjdF06IE9iamVjdCB3aXRoIHZhbHVlIGFuZCB1bml0IHByb3BzXG4qL1xuZXhwb3J0IGNvbnN0IHNwbGl0VmFsdWVVbml0ID0gKHZhbHVlKSA9PiB7XG4gICAgY29uc3Qgc3BsaXRWYWwgPSB2YWx1ZS5tYXRjaCgvKC0/XFxkKlxcLj9cXGQqKSguKikvKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBwYXJzZUZsb2F0KHNwbGl0VmFsWzFdKSxcbiAgICAgICAgdW5pdDogIHNwbGl0VmFsWzJdXG4gICAgfTtcbn07XG5cbi8qXG4gICAgQ29udmVydCBudW1iZXIgdG8geCBkZWNpbWFsIHBsYWNlc1xuXG4gICAgQHBhcmFtIFtudW1iZXJdXG4gICAgQHBhcmFtIFtudW1iZXJdXG4gICAgQHJldHVybiBbbnVtYmVyXVxuKi9cbmV4cG9ydCBjb25zdCB0b0RlY2ltYWwgPSAobnVtLCBwcmVjaXNpb24gPSAyKSA9PiB7XG4gICAgcHJlY2lzaW9uID0gMTAgKiogcHJlY2lzaW9uO1xuICAgIHJldHVybiBNYXRoLnJvdW5kKG51bSAqIHByZWNpc2lvbikgLyBwcmVjaXNpb247XG59O1xuIl19
return exports;
})();
var __small$_10 = (function() {
var exports = {};
'use strict';

exports.__esModule = true;
exports.stepProgress = exports.speedPerSecond = exports.speedPerFrame = exports.smooth = exports.restrict = exports.relativeValue = exports.random = exports.radiansToDegrees = exports.pointFromAngleAndDistance = exports.offset = exports.getProgressFromValue = exports.getValueFromProgress = exports.hypotenuse = exports.distance = exports.dilate = exports.degreesToRadians = exports.angle = undefined;

var _utils = __small$_11;

var ZERO_POINT = {
    x: 0,
    y: 0,
    z: 0
};

var distance1D = function (a, b) {
    return Math.abs(a - b);
};

/*
    Angle between points
    
    Translates the hypothetical line so that the 'from' coordinates
    are at 0,0, then return the angle using .angleFromCenter()
    
    @param [object]: X and Y coordinates of from point
    @param [object]: X and Y cordinates of to point
    @return [radian]: Angle between the two points in radians
*/
var angle = exports.angle = function (a) {
    var b = arguments.length <= 1 || arguments[1] === undefined ? ZERO_POINT : arguments[1];
    return radiansToDegrees(Math.atan2(a.x - b.x, a.y - b.y));
};

/*
    Convert degrees to radians
    
    @param [number]: Value in degrees
    @return [number]: Value in radians
*/
var degreesToRadians = exports.degreesToRadians = function (degrees) {
    return degrees * Math.PI / 180;
};

/*
    Dilate
    
    Change the progression between a and b according to dilation.
    
    So dilation = 0.5 would change
    
    a --------- b
    
    to
    
    a ---- b
    
    @param [number]: Previous value
    @param [number]: Current value
    @param [number]: Dilate progress by x
    @return [number]: Previous value plus the dilated difference
*/
var dilate = exports.dilate = function (a, b, dilation) {
    return a + (b - a) * dilation;
};

/*
    Distance
    
    Returns the distance between two n dimensional points.
    
    @param [object/number]: x and y or just x of point A
    @param [object/number]: (optional): x and y or just x of point B
    @return [number]: The distance between the two points
*/
var distance = exports.distance = function (a) {
    var b = arguments.length <= 1 || arguments[1] === undefined ? ZERO_POINT : arguments[1];

    // 1D dimensions
    if ((0, _utils.isNum)(a)) {
        return distance1D(a, b);

        // Multi-dimensional
    } else {
            var xDelta = distance1D(a.x, b.x);
            var yDelta = distance1D(a.y, b.y);
            var zDelta = (0, _utils.isNum)(a.z) ? distance1D(a.z, b.z) : 0;

            return Math.sqrt(Math.pow(xDelta, 2) + Math.pow(yDelta, 2) + Math.pow(zDelta, 2));
        }
};

/*
    Hypotenuse
    
    Returns the hypotenuse, side C, given the lengths of sides A and B.
    
    @param [number]: Length of A
    @param [number]: Length of B
    @return [number]: Length of C
*/
var hypotenuse = exports.hypotenuse = function (a, b) {
    return Math.sqrt(a * a + b * b);
};

/*
    Value in range from progress
    
    Given a lower limit and an upper limit, we return the value within
    that range as expressed by progress (a number from 0-1)
    
    @param [number]: The progress between lower and upper limits expressed 0-1
    @param [number]: Lower limit of range
    @param [number]: Upper limit of range
    @return [number]: Value as calculated from progress within range (not limited within range)
*/
var getValueFromProgress = exports.getValueFromProgress = function (progress, from, to) {
    return -progress * from + progress * to + from;
};

/*
    Progress within given range
    
    Given a lower limit and an upper limit, we return the progress
    (expressed as a number 0-1) represented by the given value, and
    limit that progress to within 0-1.
    
    @param [number]: Value to find progress within given range
    @param [number]: Lower limit 
    @param [number]: Upper limit
    @return [number]: Progress of value within range as expressed 0-1
*/
var getProgressFromValue = exports.getProgressFromValue = function (value, from, to) {
    return (value - from) / (to - from);
};

/*
    Offset between two objects of numbers

    If property is found in b not present in a, it will return `0` for that prop.
    
    @param [Point]: First object
    @param [Point]: Second object
    @return [Offset]: Distance metrics between two points
*/
var offset = exports.offset = function (a, b) {
    var offset = {};

    (0, _utils.each)(b, function (value, key) {
        offset[key] = (0, _utils.hasProperty)(a, key) ? value - a[key] : 0;
    });

    return offset;
};

/*
    Point from angle and distance
    
    @param [object]: 2D point of origin
    @param [number]: Angle from origin
    @param [number]: Distance from origin
    @return [object]: Calculated 2D point
*/
var pointFromAngleAndDistance = exports.pointFromAngleAndDistance = function (origin, angle, distance) {
    angle = degreesToRadians(angle);

    return {
        x: distance * Math.cos(angle) + origin.x,
        y: distance * Math.sin(angle) + origin.y
    };
};

/*
    Convert radians to degrees
    
    @param [number]: Value in radians
    @return [number]: Value in degrees
*/
var radiansToDegrees = exports.radiansToDegrees = function (radians) {
    return radians * 180 / Math.PI;
};

/*
    Return random number between range
    
    @param [number] (optional): Output minimum
    @param [number] (optional): Output maximum
    @return [number]: Random number within range, or 0 and 1 if none provided
*/
var random = exports.random = function () {
    var min = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
    var max = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];
    return Math.random() * (max - min) + min;
};

/*
    Calculate relative value
    
    Takes the operator and value from a string, ie "+=5", and applies
    to the current value to resolve a new target.
    
    @param [number]: Current value
    @param [string]: Relative value
    @return [number]: New value
*/
var relativeValue = exports.relativeValue = function (current, relative) {
    var newValue = current;
    var equation = relative.split('=');
    var operator = equation[0];

    var _splitValueUnit = (0, _utils.splitValueUnit)(equation[1]);

    var unit = _splitValueUnit.unit;
    var value = _splitValueUnit.value;

    value = parseFloat(value);

    switch (operator) {
        case '+':
            newValue += value;
            break;
        case '-':
            newValue -= value;
            break;
        case '*':
            newValue *= value;
            break;
        case '/':
            newValue /= value;
            break;
    }

    if (unit) {
        newValue += unit;
    }

    return newValue;
};

/*
    Restrict value to range
    
    Return value within the range of lowerLimit and upperLimit
    
    @param [number]: Value to keep within range
    @param [number]: Lower limit of range
    @param [number]: Upper limit of range
    @return [number]: Value as limited within given range
*/
var restrict = exports.restrict = function (value, min, max) {
    return Math.max(Math.min(value, max), min);
};

/*
    Framerate-independent smoothing

    @param [number]: New value
    @param [number]: Old value
    @param [number]: Frame duration
    @param [number] (optional): Smoothing (0 is none)
*/
var smooth = exports.smooth = function (newValue, oldValue, duration) {
    var smoothing = arguments.length <= 3 || arguments[3] === undefined ? 0 : arguments[3];
    return (0, _utils.toDecimal)(oldValue + duration * (newValue - oldValue) / Math.max(smoothing, duration));
};

/*
    Convert x per second to per frame velocity based on fps
    
    @param [number]: Unit per second
    @param [number]: Frame duration in ms
*/
var speedPerFrame = exports.speedPerFrame = function (xps, frameDuration) {
    return (0, _utils.isNum)(xps) ? xps / (1000 / frameDuration) : 0;
};

/*
    Convert velocity into velicity per second
    
    @param [number]: Unit per frame
    @param [number]: Frame duration in ms
*/
var speedPerSecond = exports.speedPerSecond = function (velocity, frameDuration) {
    return velocity * (1000 / frameDuration);
};

/*
    Create stepped version of 0-1 progress
    
    @param [number]: Current value
    @param [int]: Number of steps
    @return [number]: Stepped value
*/
var stepProgress = exports.stepProgress = function (progress, steps) {
    var segment = 1 / (steps - 1);
    var target = 1 - 1 / steps;
    var progressOfTarget = Math.min(progress / target, 1);

    return Math.floor(progressOfTarget / segment) * segment;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmMvY2FsYy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBUUEsSUFBTSxhQUFhO0FBQ2YsT0FBRyxDQUFIO0FBQ0EsT0FBRyxDQUFIO0FBQ0EsT0FBRyxDQUFIO0NBSEU7O0FBTU4sSUFBTSxhQUFhLFVBQUMsQ0FBRCxFQUFJLENBQUo7V0FBVSxLQUFLLEdBQUwsQ0FBUyxJQUFJLENBQUo7Q0FBbkI7Ozs7Ozs7Ozs7OztBQVlaLElBQU0sd0JBQVEsVUFBQyxDQUFEO1FBQUksMERBQUk7V0FBZSxpQkFBaUIsS0FBSyxLQUFMLENBQVcsRUFBRSxDQUFGLEdBQU0sRUFBRSxDQUFGLEVBQUssRUFBRSxDQUFGLEdBQU0sRUFBRSxDQUFGLENBQTdDO0NBQXZCOzs7Ozs7OztBQVFkLElBQU0sOENBQW1CLFVBQUMsT0FBRDtXQUFhLFVBQVUsS0FBSyxFQUFMLEdBQVUsR0FBcEI7Q0FBYjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQnpCLElBQU0sMEJBQVMsVUFBQyxDQUFELEVBQUksQ0FBSixFQUFPLFFBQVA7V0FBb0IsSUFBSyxDQUFDLElBQUksQ0FBSixDQUFELEdBQVUsUUFBVjtDQUF6Qjs7Ozs7Ozs7Ozs7QUFXZixJQUFNLDhCQUFXLFVBQUMsQ0FBRCxFQUF1QjtRQUFuQiwwREFBSSwwQkFBZTs7O0FBRTNDLFFBQUksV0FoRUosTUFnRUksQ0FBTSxDQUFOLENBQUosRUFBYztBQUNWLGVBQU8sV0FBVyxDQUFYLEVBQWMsQ0FBZCxDQUFQOzs7QUFEVSxLQUFkLE1BSU87QUFDSCxnQkFBTSxTQUFTLFdBQVcsRUFBRSxDQUFGLEVBQUssRUFBRSxDQUFGLENBQXpCLENBREg7QUFFSCxnQkFBTSxTQUFTLFdBQVcsRUFBRSxDQUFGLEVBQUssRUFBRSxDQUFGLENBQXpCLENBRkg7QUFHSCxnQkFBTSxTQUFTLFdBdkVuQixNQXVFb0IsQ0FBTSxFQUFFLENBQUYsQ0FBUCxHQUFlLFdBQVcsRUFBRSxDQUFGLEVBQUssRUFBRSxDQUFGLENB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LENBQVMsS0FBSyxHQUFMLENBQVMsS0FBVCxFQUFnQixHQUFoQixDQUFULEVBQStCLEdBQS9CO0NBQXJCOzs7Ozs7Ozs7O0FBVWpCLElBQU0sMEJBQVMsVUFBQyxRQUFELEVBQVcsUUFBWCxFQUFxQixRQUFyQjtRQUErQixrRUFBWTtXQUFNLFdBbE9uRSxVQWtPbUUsQ0FBVSxXQUFZLFlBQVksV0FBVyxRQUFYLENBQVosR0FBbUMsS0FBSyxHQUFMLENBQVMsU0FBVCxFQUFvQixRQUFwQixDQUFuQztDQUF2RTs7Ozs7Ozs7QUFRZixJQUFNLHdDQUFnQixVQUFDLEdBQUQsRUFBTSxhQUFOO1dBQXdCLFdBNU9qRCxNQTRPa0QsQ0FBTSxHQUFOLENBQUQsR0FBZSxPQUFPLE9BQU8sYUFBUCxDQUFQLEdBQStCLENBQTlDO0NBQXhCOzs7Ozs7OztBQVF0QixJQUFNLDBDQUFpQixVQUFDLFFBQUQsRUFBVyxhQUFYO1dBQTZCLFlBQVksT0FBTyxhQUFQLENBQVo7Q0FBN0I7Ozs7Ozs7OztBQVN2QixJQUFNLHNDQUFlLFVBQUMsUUFBRCxFQUFXLEtBQVgsRUFBcUI7QUFDN0MsUUFBTSxVQUFVLEtBQUssUUFBUSxDQUFSLENBQUwsQ0FENkI7QUFFN0MsUUFBTSxTQUFTLElBQUssSUFBSSxLQUFKLENBRnlCO0FBRzdDLFFBQU0sbUJBQW1CLEtBQUssR0FBTCxDQUFTLFdBQVcsTUFBWCxFQUFtQixDQUE1QixDQUFuQixDQUh1Qzs7QUFLN0MsV0FBTyxLQUFLLEtBQUwsQ0FBVyxtQkFBbUIsT0FBbkIsQ0FBWCxHQUF5QyxPQUF6QyxDQUxzQztDQUFyQiIsImZpbGUiOiJjYWxjLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgICBlYWNoLFxuICAgIGhhc1Byb3BlcnR5LFxuICAgIGlzTnVtLFxuICAgIHNwbGl0VmFsdWVVbml0LFxuICAgIHRvRGVjaW1hbFxufSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgWkVST19QT0lOVCA9IHtcbiAgICB4OiAwLFxuICAgIHk6IDAsXG4gICAgejogMFxufTtcblxuY29uc3QgZGlzdGFuY2UxRCA9IChhLCBiKSA9PiBNYXRoLmFicyhhIC0gYik7XG5cbi8qXG4gICAgQW5nbGUgYmV0d2VlbiBwb2ludHNcbiAgICBcbiAgICBUcmFuc2xhdGVzIHRoZSBoeXBvdGhldGljYWwgbGluZSBzbyB0aGF0IHRoZSAnZnJvbScgY29vcmRpbmF0ZXNcbiAgICBhcmUgYXQgMCwwLCB0aGVuIHJldHVybiB0aGUgYW5nbGUgdXNpbmcgLmFuZ2xlRnJvbUNlbnRlcigpXG4gICAgXG4gICAgQHBhcmFtIFtvYmplY3RdOiBYIGFuZCBZIGNvb3JkaW5hdGVzIG9mIGZyb20gcG9pbnRcbiAgICBAcGFyYW0gW29iamVjdF06IFggYW5kIFkgY29yZGluYXRlcyBvZiB0byBwb2ludFxuICAgIEByZXR1cm4gW3JhZGlhbl06IEFuZ2xlIGJldHdlZW4gdGhlIHR3byBwb2ludHMgaW4gcmFkaWFuc1xuKi9cbmV4cG9ydCBjb25zdCBhbmdsZSA9IChhLCBiID0gWkVST19QT0lOVCkgPT4gcmFkaWFuc1RvRGVncmVlcyhNYXRoLmF0YW4yKGEueCAtIGIueCwgYS55IC0gYi55KSk7XG5cbi8qXG4gICAgQ29udmVydCBkZWdyZWVzIHRvIHJhZGlhbnNcbiAgICBcbiAgICBAcGFyYW0gW251bWJlcl06IFZhbHVlIGluIGRlZ3JlZXNcbiAgICBAcmV0dXJuIFtudW1iZXJdOiBWYWx1ZSBpbiByYWRpYW5zXG4qL1xuZXhwb3J0IGNvbnN0IGRlZ3JlZXNUb1JhZGlhbnMgPSAoZGVncmVlcykgPT4gZGVncmVlcyAqIE1hdGguUEkgLyAxODA7XG5cbi8qXG4gICAgRGlsYXRlXG4gICAgXG4gICAgQ2hhbmdlIHRoZSBwcm9ncmVzc2lvbiBiZXR3ZWVuIGEgYW5kIGIgYWNjb3JkaW5nIHRvIGRpbGF0aW9uLlxuICAgIFxuICAgIFNvIGRpbGF0aW9uID0gMC41IHdvdWxkIGNoYW5nZVxuICAgIFxuICAgIGEgLS0tLS0tLS0tIGJcbiAgICBcbiAgICB0b1xuICAgIFxuICAgIGEgLS0tLSBiXG4gICAgXG4gICAgQHBhcmFtIFtudW1iZXJdOiBQcmV2aW91cyB2YWx1ZVxuICAgIEBwYXJhbSBbbnVtYmVyXTogQ3VycmVudCB2YWx1ZVxuICAgIEBwYXJhbSBbbnVtYmVyXTogRGlsYXRlIHByb2dyZXNzIGJ5IHhcbiAgICBAcmV0dXJuIFtudW1iZXJdOiBQcmV2aW91cyB2YWx1ZSBwbHVzIHRoZSBkaWxhdGVkIGRpZmZlcmVuY2VcbiovXG5leHBvcnQgY29uc3QgZGlsYXRlID0gKGEsIGIsIGRpbGF0aW9uKSA9PiBhICsgKChiIC0gYSkgKiBkaWxhdGlvbik7XG5cbi8qXG4gICAgRGlzdGFuY2VcbiAgICBcbiAgICBSZXR1cm5zIHRoZSBkaXN0YW5jZSBiZXR3ZWVuIHR3byBuIGRpbWVuc2lvbmFsIHBvaW50cy5cbiAgICBcbiAgICBAcGFyYW0gW29iamVjdC9udW1iZXJdOiB4IGFuZCB5IG9yIGp1c3QgeCBvZiBwb2ludCBBXG4gICAgQHBhcmFtIFtvYmplY3QvbnVtYmVyXTogKG9wdGlvbmFsKTogeCBhbmQgeSBvciBqdXN0IHggb2YgcG9pbnQgQlxuICAgIEByZXR1cm4gW251bWJlcl06IFRoZSBkaXN0YW5jZSBiZXR3ZWVuIHRoZSB0d28gcG9pbnRzXG4qL1xuZXhwb3J0IGNvbnN0IGRpc3RhbmNlID0gKGEsIGIgPSBaRVJPX1BPSU5UKSA9PiB7XG4gICAgLy8gMUQgZGltZW5zaW9uc1xuICAgIGlmIChpc051bShhKSkge1xuICAgICAgICByZXR1cm4gZGlzdGFuY2UxRChhLCBiKTtcblxuICAgIC8vIE11bHRpLWRpbWVuc2lvbmFsXG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgeERlbHRhID0gZGlzdGFuY2UxRChhLngsIGIueCk7XG4gICAgICAgIGNvbnN0IHlEZWx0YSA9IGRpc3RhbmNlMUQoYS55LCBiLnkpO1xuICAgICAgICBjb25zdCB6RGVsdGEgPSAoaXNOdW0oYS56KSkgPyBkaXN0YW5jZTFEKGEueiwgYi56KSA6IDA7XG5cbiAgICAgICAgcmV0dXJuIE1hdGguc3FydCgoeERlbHRhICoqIDIpICsgKHlEZWx0YSAqKiAyKSArICh6RGVsdGEgKiogMikpO1xuICAgIH1cbn07XG4gXG4vKlxuICAgIEh5cG90ZW51c2VcbiAgICBcbiAgICBSZXR1cm5zIHRoZSBoeXBvdGVudXNlLCBzaWRlIEMsIGdpdmVuIHRoZSBsZW5ndGhzIG9mIHNpZGVzIEEgYW5kIEIuXG4gICAgXG4gICAgQHBhcmFtIFtudW1iZXJdOiBMZW5ndGggb2YgQVxuICAgIEBwYXJhbSBbbnVtYmVyXTogTGVuZ3RoIG9mIEJcbiAgICBAcmV0dXJuIFtudW1iZXJdOiBMZW5ndGggb2YgQ1xuKi9cbmV4cG9ydCBjb25zdCBoeXBvdGVudXNlID0gKGEsIGIpID0+IE1hdGguc3FydCgoYSAqIGEpICsgKGIgKiBiKSk7XG5cbi8qXG4gICAgVmFsdWUgaW4gcmFuZ2UgZnJvbSBwcm9ncmVzc1xuICAgIFxuICAgIEdpdmVuIGEgbG93ZXIgbGltaXQgYW5kIGFuIHVwcGVyIGxpbWl0LCB3ZSByZXR1cm4gdGhlIHZhbHVlIHdpdGhpblxuICAgIHRoYXQgcmFuZ2UgYXMgZXhwcmVzc2VkIGJ5IHByb2dyZXNzIChhIG51bWJlciBmcm9tIDAtMSlcbiAgICBcbiAgICBAcGFyYW0gW251bWJlcl06IFRoZSBwcm9ncmVzcyBiZXR3ZWVuIGxvd2VyIGFuZCB1cHBlciBsaW1pdHMgZXhwcmVzc2VkIDAtMVxuICAgIEBwYXJhbSBbbnVtYmVyXTogTG93ZXIgbGltaXQgb2YgcmFuZ2VcbiAgICBAcGFyYW0gW251bWJlcl06IFVwcGVyIGxpbWl0IG9mIHJhbmdlXG4gICAgQHJldHVybiBbbnVtYmVyXTogVmFsdWUgYXMgY2FsY3VsYXRlZCBmcm9tIHByb2dyZXNzIHdpdGhpbiByYW5nZSAobm90IGxpbWl0ZWQgd2l0aGluIHJhbmdlKVxuKi9cbmV4cG9ydCBjb25zdCBnZXRWYWx1ZUZyb21Qcm9ncmVzcyA9IChwcm9ncmVzcywgZnJvbSwgdG8pID0+ICgtIHByb2dyZXNzICogZnJvbSkgKyAocHJvZ3Jlc3MgKiB0bykgKyBmcm9tO1xuXG4vKlxuICAgIFByb2dyZXNzIHdpdGhpbiBnaXZlbiByYW5nZVxuICAgIFxuICAgIEdpdmVuIGEgbG93ZXIgbGltaXQgYW5kIGFuIHVwcGVyIGxpbWl0LCB3ZSByZXR1cm4gdGhlIHByb2dyZXNzXG4gICAgKGV4cHJlc3NlZCBhcyBhIG51bWJlciAwLTEpIHJlcHJlc2VudGVkIGJ5IHRoZSBnaXZlbiB2YWx1ZSwgYW5kXG4gICAgbGltaXQgdGhhdCBwcm9ncmVzcyB0byB3aXRoaW4gMC0xLlxuICAgIFxuICAgIEBwYXJhbSBbbnVtYmVyXTogVmFsdWUgdG8gZmluZCBwcm9ncmVzcyB3aXRoaW4gZ2l2ZW4gcmFuZ2VcbiAgICBAcGFyYW0gW251bWJlcl06IExvd2VyIGxpbWl0IFxuICAgIEBwYXJhbSBbbnVtYmVyXTogVXBwZXIgbGltaXRcbiAgICBAcmV0dXJuIFtudW1iZXJdOiBQcm9ncmVzcyBvZiB2YWx1ZSB3aXRoaW4gcmFuZ2UgYXMgZXhwcmVzc2VkIDAtMVxuKi9cbmV4cG9ydCBjb25zdCBnZXRQcm9ncmVzc0Zyb21WYWx1ZSA9ICh2YWx1ZSwgZnJvbSwgdG8pID0+ICh2YWx1ZSAtIGZyb20pIC8gKHRvIC0gZnJvbSk7XG5cbi8qXG4gICAgT2Zmc2V0IGJldHdlZW4gdHdvIG9iamVjdHMgb2YgbnVtYmVyc1xuXG4gICAgSWYgcHJvcGVydHkgaXMgZm91bmQgaW4gYiBub3QgcHJlc2VudCBpbiBhLCBpdCB3aWxsIHJldHVybiBgMGAgZm9yIHRoYXQgcHJvcC5cbiAgICBcbiAgICBAcGFyYW0gW1BvaW50XTogRmlyc3Qgb2JqZWN0XG4gICAgQHBhcmFtIFtQb2ludF06IFNlY29uZCBvYmplY3RcbiAgICBAcmV0dXJuIFtPZmZzZXRdOiBEaXN0YW5jZSBtZXRyaWNzIGJldHdlZW4gdHdvIHBvaW50c1xuKi9cbmV4cG9ydCBjb25zdCBvZmZzZXQgPSAoYSwgYikgPT4ge1xuICAgIGNvbnN0IG9mZnNldCA9IHt9O1xuXG4gICAgZWFjaChiLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICBvZmZzZXRba2V5XSA9IGhhc1Byb3BlcnR5KGEsIGtleSkgPyB2YWx1ZSAtIGFba2V5XSA6IDA7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gb2Zmc2V0O1xufTtcblxuLypcbiAgICBQb2ludCBmcm9tIGFuZ2xlIGFuZCBkaXN0YW5jZVxuICAgIFxuICAgIEBwYXJhbSBbb2JqZWN0XTogMkQgcG9pbnQgb2Ygb3JpZ2luXG4gICAgQHBhcmFtIFtudW1iZXJdOiBBbmdsZSBmcm9tIG9yaWdpblxuICAgIEBwYXJhbSBbbnVtYmVyXTogRGlzdGFuY2UgZnJvbSBvcmlnaW5cbiAgICBAcmV0dXJuIFtvYmplY3RdOiBDYWxjdWxhdGVkIDJEIHBvaW50XG4qL1xuZXhwb3J0IGNvbnN0IHBvaW50RnJvbUFuZ2xlQW5kRGlzdGFuY2UgPSAob3JpZ2luLCBhbmdsZSwgZGlzdGFuY2UpID0+IHtcbiAgICBhbmdsZSA9IGRlZ3JlZXNUb1JhZGlhbnMoYW5nbGUpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogZGlzdGFuY2UgKiBNYXRoLmNvcyhhbmdsZSkgKyBvcmlnaW4ueCxcbiAgICAgICAgeTogZGlzdGFuY2UgKiBNYXRoLnNpbihhbmdsZSkgKyBvcmlnaW4ueVxuICAgIH07XG59O1xuXG4vKlxuICAgIENvbnZlcnQgcmFkaWFucyB0byBkZWdyZWVzXG4gICAgXG4gICAgQHBhcmFtIFtudW1iZXJdOiBWYWx1ZSBpbiByYWRpYW5zXG4gICAgQHJldHVybiBbbnVtYmVyXTogVmFsdWUgaW4gZGVncmVlc1xuKi9cbmV4cG9ydCBjb25zdCByYWRpYW5zVG9EZWdyZWVzID0gKHJhZGlhbnMpID0+IHJhZGlhbnMgKiAxODAgLyBNYXRoLlBJO1xuXG4vKlxuICAgIFJldHVybiByYW5kb20gbnVtYmVyIGJldHdlZW4gcmFuZ2VcbiAgICBcbiAgICBAcGFyYW0gW251bWJlcl0gKG9wdGlvbmFsKTogT3V0cHV0IG1pbmltdW1cbiAgICBAcGFyYW0gW251bWJlcl0gKG9wdGlvbmFsKTogT3V0cHV0IG1heGltdW1cbiAgICBAcmV0dXJuIFtudW1iZXJdOiBSYW5kb20gbnVtYmVyIHdpdGhpbiByYW5nZSwgb3IgMCBhbmQgMSBpZiBub25lIHByb3ZpZGVkXG4qL1xuZXhwb3J0IGNvbnN0IHJhbmRvbSA9IChtaW4gPSAwLCBtYXggPSAxKSA9PiBNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikgKyBtaW47XG5cbi8qXG4gICAgQ2FsY3VsYXRlIHJlbGF0aXZlIHZhbHVlXG4gICAgXG4gICAgVGFrZXMgdGhlIG9wZXJhdG9yIGFuZCB2YWx1ZSBmcm9tIGEgc3RyaW5nLCBpZSBcIis9NVwiLCBhbmQgYXBwbGllc1xuICAgIHRvIHRoZSBjdXJyZW50IHZhbHVlIHRvIHJlc29sdmUgYSBuZXcgdGFyZ2V0LlxuICAgIFxuICAgIEBwYXJhbSBbbnVtYmVyXTogQ3VycmVudCB2YWx1ZVxuICAgIEBwYXJhbSBbc3RyaW5nXTogUmVsYXRpdmUgdmFsdWVcbiAgICBAcmV0dXJuIFtudW1iZXJdOiBOZXcgdmFsdWVcbiovXG5leHBvcnQgY29uc3QgcmVsYXRpdmVWYWx1ZSA9IChjdXJyZW50LCByZWxhdGl2ZSkgPT4ge1xuICAgIGxldCBuZXdWYWx1ZSA9IGN1cnJlbnQ7XG4gICAgY29uc3QgZXF1YXRpb24gPSByZWxhdGl2ZS5zcGxpdCgnPScpO1xuICAgIGNvbnN0IG9wZXJhdG9yID0gZXF1YXRpb25bMF07XG4gICAgbGV0IHsgdW5pdCwgdmFsdWUgfSA9IHNwbGl0VmFsdWVVbml0KGVxdWF0aW9uWzFdKTtcblxuICAgIHZhbHVlID0gcGFyc2VGbG9hdCh2YWx1ZSk7XG5cbiAgICBzd2l0Y2ggKG9wZXJhdG9yKSB7XG4gICAgICAgIGNhc2UgJysnOlxuICAgICAgICAgICAgbmV3VmFsdWUgKz0gdmFsdWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnLSc6XG4gICAgICAgICAgICBuZXdWYWx1ZSAtPSB2YWx1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICcqJzpcbiAgICAgICAgICAgIG5ld1ZhbHVlICo9IHZhbHVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJy8nOlxuICAgICAgICAgICAgbmV3VmFsdWUgLz0gdmFsdWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICB9XG4gICAgXG4gICAgaWYgKHVuaXQpIHtcbiAgICAgICAgbmV3VmFsdWUgKz0gdW5pdDtcbiAgICB9XG5cbiAgICByZXR1cm4gbmV3VmFsdWU7XG59O1xuXG4vKlxuICAgIFJlc3RyaWN0IHZhbHVlIHRvIHJhbmdlXG4gICAgXG4gICAgUmV0dXJuIHZhbHVlIHdpdGhpbiB0aGUgcmFuZ2Ugb2YgbG93ZXJMaW1pdCBhbmQgdXBwZXJMaW1pdFxuICAgIFxuICAgIEBwYXJhbSBbbnVtYmVyXTogVmFsdWUgdG8ga2VlcCB3aXRoaW4gcmFuZ2VcbiAgICBAcGFyYW0gW251bWJlcl06IExvd2VyIGxpbWl0IG9mIHJhbmdlXG4gICAgQHBhcmFtIFtudW1iZXJdOiBVcHBlciBsaW1pdCBvZiByYW5nZVxuICAgIEByZXR1cm4gW251bWJlcl06IFZhbHVlIGFzIGxpbWl0ZWQgd2l0aGluIGdpdmVuIHJhbmdlXG4qL1xuZXhwb3J0IGNvbnN0IHJlc3RyaWN0ID0gKHZhbHVlLCBtaW4sIG1heCkgPT4gTWF0aC5tYXgoTWF0aC5taW4odmFsdWUsIG1heCksIG1pbik7XG5cbi8qXG4gICAgRnJhbWVyYXRlLWluZGVwZW5kZW50IHNtb290aGluZ1xuXG4gICAgQHBhcmFtIFtudW1iZXJdOiBOZXcgdmFsdWVcbiAgICBAcGFyYW0gW251bWJlcl06IE9sZCB2YWx1ZVxuICAgIEBwYXJhbSBbbnVtYmVyXTogRnJhbWUgZHVyYXRpb25cbiAgICBAcGFyYW0gW251bWJlcl0gKG9wdGlvbmFsKTogU21vb3RoaW5nICgwIGlzIG5vbmUpXG4qL1xuZXhwb3J0IGNvbnN0IHNtb290aCA9IChuZXdWYWx1ZSwgb2xkVmFsdWUsIGR1cmF0aW9uLCBzbW9vdGhpbmcgPSAwKSA9PiB0b0RlY2ltYWwob2xkVmFsdWUgKyAoZHVyYXRpb24gKiAobmV3VmFsdWUgLSBvbGRWYWx1ZSkgLyBNYXRoLm1heChzbW9vdGhpbmcsIGR1cmF0aW9uKSkpO1xuXG4vKlxuICAgIENvbnZlcnQgeCBwZXIgc2Vjb25kIHRvIHBlciBmcmFtZSB2ZWxvY2l0eSBiYXNlZCBvbiBmcHNcbiAgICBcbiAgICBAcGFyYW0gW251bWJlcl06IFVuaXQgcGVyIHNlY29uZFxuICAgIEBwYXJhbSBbbnVtYmVyXTogRnJhbWUgZHVyYXRpb24gaW4gbXNcbiovXG5leHBvcnQgY29uc3Qgc3BlZWRQZXJGcmFtZSA9ICh4cHMsIGZyYW1lRHVyYXRpb24pID0+IChpc051bSh4cHMpKSA/IHhwcyAvICgxMDAwIC8gZnJhbWVEdXJhdGlvbikgOiAwO1xuXG4vKlxuICAgIENvbnZlcnQgdmVsb2NpdHkgaW50byB2ZWxpY2l0eSBwZXIgc2Vjb25kXG4gICAgXG4gICAgQHBhcmFtIFtudW1iZXJdOiBVbml0IHBlciBmcmFtZVxuICAgIEBwYXJhbSBbbnVtYmVyXTogRnJhbWUgZHVyYXRpb24gaW4gbXNcbiovXG5leHBvcnQgY29uc3Qgc3BlZWRQZXJTZWNvbmQgPSAodmVsb2NpdHksIGZyYW1lRHVyYXRpb24pID0+IHZlbG9jaXR5ICogKDEwMDAgLyBmcmFtZUR1cmF0aW9uKTtcblxuLypcbiAgICBDcmVhdGUgc3RlcHBlZCB2ZXJzaW9uIG9mIDAtMSBwcm9ncmVzc1xuICAgIFxuICAgIEBwYXJhbSBbbnVtYmVyXTogQ3VycmVudCB2YWx1ZVxuICAgIEBwYXJhbSBbaW50XTogTnVtYmVyIG9mIHN0ZXBzXG4gICAgQHJldHVybiBbbnVtYmVyXTogU3RlcHBlZCB2YWx1ZVxuKi9cbmV4cG9ydCBjb25zdCBzdGVwUHJvZ3Jlc3MgPSAocHJvZ3Jlc3MsIHN0ZXBzKSA9PiB7XG4gICAgY29uc3Qgc2VnbWVudCA9IDEgLyAoc3RlcHMgLSAxKTtcbiAgICBjb25zdCB0YXJnZXQgPSAxIC0gKDEgLyBzdGVwcyk7XG4gICAgY29uc3QgcHJvZ3Jlc3NPZlRhcmdldCA9IE1hdGgubWluKHByb2dyZXNzIC8gdGFyZ2V0LCAxKTtcblxuICAgIHJldHVybiBNYXRoLmZsb29yKHByb2dyZXNzT2ZUYXJnZXQgLyBzZWdtZW50KSAqIHNlZ21lbnQ7XG59OyJdfQ==
return exports;
})();
var __small$_13 = (function() {
var exports = {};
'use strict';

exports.__esModule = true;
exports.setDilation = setDilation;
var hasPerformanceNow = typeof performance !== 'undefined' && performance.now;
var currentTime = function () {
    return hasPerformanceNow ? performance.now() : new Date().getTime();
};

var MAX_ELAPSED = 33;

var base = 0;
var current = 0;
var elapsed = 16.7;
var dilation = 1;
var lostTime = 0;

exports.default = {
    update: function (framestamp) {
        if (base === 0) {
            current = base = framestamp;
        }

        var prev = current;
        var lossAdjusted = framestamp - lostTime;
        var nonDilatedElapsed = Math.min(lossAdjusted - prev, MAX_ELAPSED);
        elapsed = nonDilatedElapsed * dilation;
        current += elapsed;
        lostTime += nonDilatedElapsed - elapsed;
    },

    start: function () {
        return current = currentTime();
    },

    getElapsed: function () {
        return elapsed;
    }
};
function setDilation(newDilation) {
    dilation = newDilation;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzL3RpbWVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztRQThCZ0I7QUE5QmhCLElBQU0sb0JBQXFCLE9BQU8sV0FBUCxLQUF1QixXQUF2QixJQUFzQyxZQUFZLEdBQVo7QUFDakUsSUFBTSxjQUFjO1dBQU0sb0JBQW9CLFlBQVksR0FBWixFQUFwQixHQUF3QyxJQUFJLElBQUosR0FBVyxPQUFYLEVBQXhDO0NBQU47O0FBRXBCLElBQU0sY0FBYyxFQUFkOztBQUVOLElBQUksT0FBTyxDQUFQO0FBQ0osSUFBSSxVQUFVLENBQVY7QUFDSixJQUFJLFVBQVUsSUFBVjtBQUNKLElBQUksV0FBVyxDQUFYO0FBQ0osSUFBSSxXQUFXLENBQVg7O2tCQUVXO0FBQ1gsWUFBUSxVQUFDLFVBQUQsRUFBZ0I7QUFDcEIsWUFBSSxTQUFTLENBQVQsRUFBWTtBQUNaLHNCQUFVLE9BQU8sVUFBUCxDQURFO1NBQWhCOztBQUlBLFlBQU0sT0FBTyxPQUFQLENBTGM7QUFNcEIsWUFBTSxlQUFlLGFBQWEsUUFBYixDQU5EO0FBT3BCLFlBQU0sb0JBQW9CLEtBQUssR0FBTCxDQUFTLGVBQWUsSUFBZixFQUFxQixXQUE5QixDQUFwQixDQVBjO0FBUXBCLGtCQUFVLG9CQUFvQixRQUFwQixDQVJVO0FBU3BCLG1CQUFXLE9BQVgsQ0FUb0I7QUFVcEIsb0JBQVksb0JBQW9CLE9BQXBCLENBVlE7S0FBaEI7O0FBYVIsV0FBTztlQUFNLFVBQVUsYUFBVjtLQUFOOztBQUVQLGdCQUFZO2VBQU07S0FBTjs7QUFHVCxTQUFTLFdBQVQsQ0FBcUIsV0FBckIsRUFBa0M7QUFDckMsZUFBVyxXQUFYLENBRHFDO0NBQWxDIiwiZmlsZSI6InRpbWVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgaGFzUGVyZm9ybWFuY2VOb3cgPSAodHlwZW9mIHBlcmZvcm1hbmNlICE9PSAndW5kZWZpbmVkJyAmJiBwZXJmb3JtYW5jZS5ub3cpO1xuY29uc3QgY3VycmVudFRpbWUgPSAoKSA9PiBoYXNQZXJmb3JtYW5jZU5vdyA/IHBlcmZvcm1hbmNlLm5vdygpIDogbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cbmNvbnN0IE1BWF9FTEFQU0VEID0gMzM7XG5cbmxldCBiYXNlID0gMDtcbmxldCBjdXJyZW50ID0gMDtcbmxldCBlbGFwc2VkID0gMTYuNztcbmxldCBkaWxhdGlvbiA9IDE7XG5sZXQgbG9zdFRpbWUgPSAwO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgdXBkYXRlOiAoZnJhbWVzdGFtcCkgPT4ge1xuICAgICAgICBpZiAoYmFzZSA9PT0gMCkge1xuICAgICAgICAgICAgY3VycmVudCA9IGJhc2UgPSBmcmFtZXN0YW1wO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcHJldiA9IGN1cnJlbnQ7XG4gICAgICAgIGNvbnN0IGxvc3NBZGp1c3RlZCA9IGZyYW1lc3RhbXAgLSBsb3N0VGltZTtcbiAgICAgICAgY29uc3Qgbm9uRGlsYXRlZEVsYXBzZWQgPSBNYXRoLm1pbihsb3NzQWRqdXN0ZWQgLSBwcmV2LCBNQVhfRUxBUFNFRCk7XG4gICAgICAgIGVsYXBzZWQgPSBub25EaWxhdGVkRWxhcHNlZCAqIGRpbGF0aW9uO1xuICAgICAgICBjdXJyZW50ICs9IGVsYXBzZWQ7XG4gICAgICAgIGxvc3RUaW1lICs9IG5vbkRpbGF0ZWRFbGFwc2VkIC0gZWxhcHNlZDtcbiAgICB9LFxuXG4gICAgc3RhcnQ6ICgpID0+IGN1cnJlbnQgPSBjdXJyZW50VGltZSgpLFxuXG4gICAgZ2V0RWxhcHNlZDogKCkgPT4gZWxhcHNlZFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNldERpbGF0aW9uKG5ld0RpbGF0aW9uKSB7XG4gICAgZGlsYXRpb24gPSBuZXdEaWxhdGlvbjtcbn0iXX0=
return exports;
})();
var __small$_16 = (function() {
var exports = {};
'use strict';

exports.__esModule = true;

var _createEasing = ((function() {
var exports = {};
"use strict";

exports.__esModule = true;
exports.default = createEasingFunction;
/*
    Mirror easing
    
    Mirrors the provided easing function, used here for mirroring an
    easeIn into an easeInOut
    
    @param [number]: Progress, from 0 - 1, of current shift
    @param [function]: The easing function to mirror
    @returns [number]: The easing-adjusted delta
*/
var mirrorEasing = function (method) {
    return function (progress, strength) {
        return progress <= 0.5 ? method(2 * progress, strength) / 2 : (2 - method(2 * (1 - progress), strength)) / 2;
    };
};

/*
    Reverse easing
    
    Reverses the output of the provided easing function, used for flipping easeIn
    curve to an easeOut.
    
    @param [number]: Progress, from 0 - 1, of current shift
    @param [function]: The easing function to reverse
    @returns [number]: The easing-adjusted delta
*/
var reverseEasing = function (method) {
    return function (progress, strength) {
        return 1 - method(1 - progress, strength);
    };
};

/*
    Easing class

    If provided easing function, returns easing function with 
    in/out/inOut variations

    If provided four arguments, returns new Bezier class instead.
*/
function createEasingFunction(method) {
    var easingFunction = function (progress, strength) {
        return method(progress, strength);
    };

    easingFunction.in = function (progress, strength) {
        return method(progress, strength);
    };
    easingFunction.out = reverseEasing(method);
    easingFunction.inOut = mirrorEasing(method);

    return easingFunction;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hY3Rpb25zL3R3ZWVuL2NyZWF0ZS1lYXNpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O2tCQWdDd0I7Ozs7Ozs7Ozs7O0FBdEJ4QixJQUFNLGVBQWUsVUFBQyxNQUFEO1dBQVksVUFBQyxRQUFELEVBQVcsUUFBWDtlQUF3QixRQUFDLElBQVksR0FBWixHQUFtQixPQUFPLElBQUksUUFBSixFQUFjLFFBQXJCLElBQWlDLENBQWpDLEdBQXFDLENBQUMsSUFBSSxPQUFPLEtBQUssSUFBSSxRQUFKLENBQUwsRUFBb0IsUUFBM0IsQ0FBSixDQUFELEdBQTZDLENBQTdDO0tBQWpGO0NBQVo7Ozs7Ozs7Ozs7OztBQVlyQixJQUFNLGdCQUFnQixVQUFDLE1BQUQ7V0FBWSxVQUFDLFFBQUQsRUFBVyxRQUFYO2VBQXdCLElBQUksT0FBTyxJQUFJLFFBQUosRUFBYyxRQUFyQixDQUFKO0tBQXhCO0NBQVo7Ozs7Ozs7Ozs7QUFVUCxTQUFTLG9CQUFULENBQThCLE1BQTlCLEVBQXNDO0FBQ2pELFFBQUksaUJBQWlCLFVBQUMsUUFBRCxFQUFXLFFBQVg7ZUFBd0IsT0FBTyxRQUFQLEVBQWlCLFFBQWpCO0tBQXhCLENBRDRCOztBQUdqRCxtQkFBZSxFQUFmLEdBQW9CLFVBQUMsUUFBRCxFQUFXLFFBQVg7ZUFBd0IsT0FBTyxRQUFQLEVBQWlCLFFBQWpCO0tBQXhCLENBSDZCO0FBSWpELG1CQUFlLEdBQWYsR0FBcUIsY0FBYyxNQUFkLENBQXJCLENBSmlEO0FBS2pELG1CQUFlLEtBQWYsR0FBdUIsYUFBYSxNQUFiLENBQXZCLENBTGlEOztBQU9qRCxXQUFPLGNBQVAsQ0FQaUQ7Q0FBdEMiLCJmaWxlIjoiY3JlYXRlLWVhc2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gICAgTWlycm9yIGVhc2luZ1xuICAgIFxuICAgIE1pcnJvcnMgdGhlIHByb3ZpZGVkIGVhc2luZyBmdW5jdGlvbiwgdXNlZCBoZXJlIGZvciBtaXJyb3JpbmcgYW5cbiAgICBlYXNlSW4gaW50byBhbiBlYXNlSW5PdXRcbiAgICBcbiAgICBAcGFyYW0gW251bWJlcl06IFByb2dyZXNzLCBmcm9tIDAgLSAxLCBvZiBjdXJyZW50IHNoaWZ0XG4gICAgQHBhcmFtIFtmdW5jdGlvbl06IFRoZSBlYXNpbmcgZnVuY3Rpb24gdG8gbWlycm9yXG4gICAgQHJldHVybnMgW251bWJlcl06IFRoZSBlYXNpbmctYWRqdXN0ZWQgZGVsdGFcbiovXG5jb25zdCBtaXJyb3JFYXNpbmcgPSAobWV0aG9kKSA9PiAocHJvZ3Jlc3MsIHN0cmVuZ3RoKSA9PiAocHJvZ3Jlc3MgPD0gMC41KSA/IG1ldGhvZCgyICogcHJvZ3Jlc3MsIHN0cmVuZ3RoKSAvIDIgOiAoMiAtIG1ldGhvZCgyICogKDEgLSBwcm9ncmVzcyksIHN0cmVuZ3RoKSkgLyAyO1xuICAgICAgICBcbi8qXG4gICAgUmV2ZXJzZSBlYXNpbmdcbiAgICBcbiAgICBSZXZlcnNlcyB0aGUgb3V0cHV0IG9mIHRoZSBwcm92aWRlZCBlYXNpbmcgZnVuY3Rpb24sIHVzZWQgZm9yIGZsaXBwaW5nIGVhc2VJblxuICAgIGN1cnZlIHRvIGFuIGVhc2VPdXQuXG4gICAgXG4gICAgQHBhcmFtIFtudW1iZXJdOiBQcm9ncmVzcywgZnJvbSAwIC0gMSwgb2YgY3VycmVudCBzaGlmdFxuICAgIEBwYXJhbSBbZnVuY3Rpb25dOiBUaGUgZWFzaW5nIGZ1bmN0aW9uIHRvIHJldmVyc2VcbiAgICBAcmV0dXJucyBbbnVtYmVyXTogVGhlIGVhc2luZy1hZGp1c3RlZCBkZWx0YVxuKi9cbmNvbnN0IHJldmVyc2VFYXNpbmcgPSAobWV0aG9kKSA9PiAocHJvZ3Jlc3MsIHN0cmVuZ3RoKSA9PiAxIC0gbWV0aG9kKDEgLSBwcm9ncmVzcywgc3RyZW5ndGgpO1xuXG4vKlxuICAgIEVhc2luZyBjbGFzc1xuXG4gICAgSWYgcHJvdmlkZWQgZWFzaW5nIGZ1bmN0aW9uLCByZXR1cm5zIGVhc2luZyBmdW5jdGlvbiB3aXRoIFxuICAgIGluL291dC9pbk91dCB2YXJpYXRpb25zXG5cbiAgICBJZiBwcm92aWRlZCBmb3VyIGFyZ3VtZW50cywgcmV0dXJucyBuZXcgQmV6aWVyIGNsYXNzIGluc3RlYWQuXG4qL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlRWFzaW5nRnVuY3Rpb24obWV0aG9kKSB7XG4gICAgbGV0IGVhc2luZ0Z1bmN0aW9uID0gKHByb2dyZXNzLCBzdHJlbmd0aCkgPT4gbWV0aG9kKHByb2dyZXNzLCBzdHJlbmd0aCk7XG5cbiAgICBlYXNpbmdGdW5jdGlvbi5pbiA9IChwcm9ncmVzcywgc3RyZW5ndGgpID0+IG1ldGhvZChwcm9ncmVzcywgc3RyZW5ndGgpO1xuICAgIGVhc2luZ0Z1bmN0aW9uLm91dCA9IHJldmVyc2VFYXNpbmcobWV0aG9kKTtcbiAgICBlYXNpbmdGdW5jdGlvbi5pbk91dCA9IG1pcnJvckVhc2luZyhtZXRob2QpO1xuXG4gICAgcmV0dXJuIGVhc2luZ0Z1bmN0aW9uO1xufVxuIl19
return exports;
})());

var _createEasing2 = _interopRequireDefault(_createEasing);

var _utils = __small$_11;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Values
/*
    Easing functions
    ----------------------------------------
    
    Generates and provides easing functions based on baseFunction definitions
    
    A call to easingFunction.get('functionName') returns a function that can be passed:
        @param [number]: Progress 0-1
        @param [number] (optional): Amp modifier, only accepted in some easing functions
                                    and is used to adjust overall strength
        @return [number]: Eased progress
        
    We can generate new functions by sending an easing function through easingFunction.extend(name, method).
    Which will make nameIn, nameOut and nameInOut functions available to use.
        
    Easing functions from Robert Penner
    http://www.robertpenner.com/easing/
        
    Bezier curve interpretor created from Gaëtan Renaudeau's original BezierEasing  
    https://github.com/gre/bezier-easing/blob/master/index.js  
    https://github.com/gre/bezier-easing/blob/master/LICENSE

    Anticipate easing created by Elliot Gino
    https://twitter.com/ElliotGeno
*/
// Imports
var DEFAULT_BACK_STRENGTH = 1.525;
var DEFAULT_POW_STRENGTH = 2;

// Utility functions
var generatePowerEasing = function (strength) {
    return function (progress, strength) {
        return baseEasing.ease(progress, strength);
    };
};

/*
    Each of these base functions is an easeIn
    
    On init, we use .mirror and .reverse to generate easeInOut and
    easeOut functions respectively.
*/
var baseEasing = {
    ease: function (progress) {
        var strength = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_POW_STRENGTH : arguments[1];
        return Math.pow(progress, strength);
    },
    circ: function (progress) {
        return 1 - Math.sin(Math.acos(progress));
    },
    back: function (progress) {
        var strength = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_BACK_STRENGTH : arguments[1];
        return progress * progress * ((strength + 1) * progress - strength);
    }
};

['cubic', 'quart', 'quint'].forEach(function (easingName, i) {
    return baseEasing[easingName] = generatePowerEasing(i + 3);
});

// Generate in/out/inOut variations
(0, _utils.each)(baseEasing, function (baseEase, key) {
    var easingFunction = (0, _createEasing2.default)(baseEase);
    baseEasing[key + 'In'] = easingFunction.in;
    baseEasing[key + 'Out'] = easingFunction.out;
    baseEasing[key + 'InOut'] = easingFunction.inOut;
});

baseEasing.linear = function (progress) {
    return progress;
};
baseEasing.anticipate = function (progress) {
    var strength = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_BACK_STRENGTH : arguments[1];
    return (progress *= 2) < 1 ? 0.5 * baseEasing.backIn(progress, strength) : 0.5 * (2 - Math.pow(2, -10 * (progress - 1)));
};

exports.default = baseEasing;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hY3Rpb25zL3R3ZWVuL3ByZXNldC1lYXNpbmcuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBOEJBLElBQU0sd0JBQXdCLEtBQXhCO0FBQ04sSUFBTSx1QkFBdUIsQ0FBdkI7OztBQUdOLElBQU0sc0JBQXNCO1dBQVksVUFBQyxRQUFELEVBQVcsUUFBWDtlQUF3QixXQUFXLElBQVgsQ0FBZ0IsUUFBaEIsRUFBMEIsUUFBMUI7S0FBeEI7Q0FBWjs7Ozs7Ozs7QUFRNUIsSUFBSSxhQUFhO0FBQ2IsVUFBTSxVQUFDLFFBQUQ7WUFBVyxpRUFBVzt3QkFBeUIsVUFBWTtLQUEzRDtBQUNOLFVBQU07ZUFBWSxJQUFJLEtBQUssR0FBTCxDQUFTLEtBQUssSUFBTCxDQUFVLFFBQVYsQ0FBVCxDQUFKO0tBQVo7QUFDTixVQUFNLFVBQUMsUUFBRDtZQUFXLGlFQUFXO2VBQTBCLFFBQUMsR0FBVyxRQUFYLElBQXdCLENBQUMsV0FBVyxDQUFYLENBQUQsR0FBaUIsUUFBakIsR0FBNEIsUUFBNUIsQ0FBekI7S0FBaEQ7Q0FITjs7QUFNSixDQUFDLE9BQUQsRUFBVSxPQUFWLEVBQW1CLE9BQW5CLEVBQTRCLE9BQTVCLENBQW9DLFVBQUMsVUFBRCxFQUFhLENBQWI7V0FBbUIsV0FBVyxVQUFYLElBQXlCLG9CQUFvQixJQUFJLENBQUosQ0FBN0M7Q0FBbkIsQ0FBcEM7OztBQUdBLFdBeEJTLEtBd0JULENBQUssVUFBTCxFQUFpQixVQUFDLFFBQUQsRUFBVyxHQUFYLEVBQW1CO0FBQ2hDLFFBQUksaUJBQWlCLDRCQUFhLFFBQWIsQ0FBakIsQ0FENEI7QUFFaEMsZUFBYyxVQUFkLElBQXlCLGVBQWUsRUFBZixDQUZPO0FBR2hDLGVBQWMsV0FBZCxJQUEwQixlQUFlLEdBQWYsQ0FITTtBQUloQyxlQUFjLGFBQWQsSUFBNEIsZUFBZSxLQUFmLENBSkk7Q0FBbkIsQ0FBakI7O0FBT0EsV0FBVyxNQUFYLEdBQW9CO1dBQVk7Q0FBWjtBQUNwQixXQUFXLFVBQVgsR0FBd0IsVUFBQyxRQUFEO1FBQVcsaUVBQVc7V0FDMUMsQ0FBRSxZQUFVLENBQVYsQ0FBRCxHQUFnQixDQUFoQixHQUFxQixNQUFNLFdBQVcsTUFBWCxDQUFrQixRQUFsQixFQUE0QixRQUE1QixDQUFOLEdBQStDLE9BQU8sSUFBSSxLQUFLLEdBQUwsQ0FBUyxDQUFULEVBQVksQ0FBQyxFQUFELElBQU8sV0FBVyxDQUFYLENBQVAsQ0FBaEIsQ0FBUDtDQURqRDs7a0JBR1QiLCJmaWxlIjoicHJlc2V0LWVhc2luZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gICAgRWFzaW5nIGZ1bmN0aW9uc1xuICAgIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgICBcbiAgICBHZW5lcmF0ZXMgYW5kIHByb3ZpZGVzIGVhc2luZyBmdW5jdGlvbnMgYmFzZWQgb24gYmFzZUZ1bmN0aW9uIGRlZmluaXRpb25zXG4gICAgXG4gICAgQSBjYWxsIHRvIGVhc2luZ0Z1bmN0aW9uLmdldCgnZnVuY3Rpb25OYW1lJykgcmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIHBhc3NlZDpcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdOiBQcm9ncmVzcyAwLTFcbiAgICAgICAgQHBhcmFtIFtudW1iZXJdIChvcHRpb25hbCk6IEFtcCBtb2RpZmllciwgb25seSBhY2NlcHRlZCBpbiBzb21lIGVhc2luZyBmdW5jdGlvbnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFuZCBpcyB1c2VkIHRvIGFkanVzdCBvdmVyYWxsIHN0cmVuZ3RoXG4gICAgICAgIEByZXR1cm4gW251bWJlcl06IEVhc2VkIHByb2dyZXNzXG4gICAgICAgIFxuICAgIFdlIGNhbiBnZW5lcmF0ZSBuZXcgZnVuY3Rpb25zIGJ5IHNlbmRpbmcgYW4gZWFzaW5nIGZ1bmN0aW9uIHRocm91Z2ggZWFzaW5nRnVuY3Rpb24uZXh0ZW5kKG5hbWUsIG1ldGhvZCkuXG4gICAgV2hpY2ggd2lsbCBtYWtlIG5hbWVJbiwgbmFtZU91dCBhbmQgbmFtZUluT3V0IGZ1bmN0aW9ucyBhdmFpbGFibGUgdG8gdXNlLlxuICAgICAgICBcbiAgICBFYXNpbmcgZnVuY3Rpb25zIGZyb20gUm9iZXJ0IFBlbm5lclxuICAgIGh0dHA6Ly93d3cucm9iZXJ0cGVubmVyLmNvbS9lYXNpbmcvXG4gICAgICAgIFxuICAgIEJlemllciBjdXJ2ZSBpbnRlcnByZXRvciBjcmVhdGVkIGZyb20gR2HDq3RhbiBSZW5hdWRlYXUncyBvcmlnaW5hbCBCZXppZXJFYXNpbmcgIFxuICAgIGh0dHBzOi8vZ2l0aHViLmNvbS9ncmUvYmV6aWVyLWVhc2luZy9ibG9iL21hc3Rlci9pbmRleC5qcyAgXG4gICAgaHR0cHM6Ly9naXRodWIuY29tL2dyZS9iZXppZXItZWFzaW5nL2Jsb2IvbWFzdGVyL0xJQ0VOU0VcblxuICAgIEFudGljaXBhdGUgZWFzaW5nIGNyZWF0ZWQgYnkgRWxsaW90IEdpbm9cbiAgICBodHRwczovL3R3aXR0ZXIuY29tL0VsbGlvdEdlbm9cbiovXG4vLyBJbXBvcnRzXG5pbXBvcnQgY3JlYXRlRWFzaW5nIGZyb20gJy4vY3JlYXRlLWVhc2luZyc7XG5pbXBvcnQgeyBlYWNoIH0gZnJvbSAnLi4vLi4vaW5jL3V0aWxzJztcblxuLy8gVmFsdWVzXG5jb25zdCBERUZBVUxUX0JBQ0tfU1RSRU5HVEggPSAxLjUyNTtcbmNvbnN0IERFRkFVTFRfUE9XX1NUUkVOR1RIID0gMjtcblxuLy8gVXRpbGl0eSBmdW5jdGlvbnNcbmNvbnN0IGdlbmVyYXRlUG93ZXJFYXNpbmcgPSBzdHJlbmd0aCA9PiAocHJvZ3Jlc3MsIHN0cmVuZ3RoKSA9PiBiYXNlRWFzaW5nLmVhc2UocHJvZ3Jlc3MsIHN0cmVuZ3RoKTtcblxuLypcbiAgICBFYWNoIG9mIHRoZXNlIGJhc2UgZnVuY3Rpb25zIGlzIGFuIGVhc2VJblxuICAgIFxuICAgIE9uIGluaXQsIHdlIHVzZSAubWlycm9yIGFuZCAucmV2ZXJzZSB0byBnZW5lcmF0ZSBlYXNlSW5PdXQgYW5kXG4gICAgZWFzZU91dCBmdW5jdGlvbnMgcmVzcGVjdGl2ZWx5LlxuKi9cbmxldCBiYXNlRWFzaW5nID0ge1xuICAgIGVhc2U6IChwcm9ncmVzcywgc3RyZW5ndGggPSBERUZBVUxUX1BPV19TVFJFTkdUSCkgPT4gcHJvZ3Jlc3MgKiogc3RyZW5ndGgsXG4gICAgY2lyYzogcHJvZ3Jlc3MgPT4gMSAtIE1hdGguc2luKE1hdGguYWNvcyhwcm9ncmVzcykpLFxuICAgIGJhY2s6IChwcm9ncmVzcywgc3RyZW5ndGggPSBERUZBVUxUX0JBQ0tfU1RSRU5HVEgpID0+IChwcm9ncmVzcyAqIHByb2dyZXNzKSAqICgoc3RyZW5ndGggKyAxKSAqIHByb2dyZXNzIC0gc3RyZW5ndGgpXG59O1xuXG5bJ2N1YmljJywgJ3F1YXJ0JywgJ3F1aW50J10uZm9yRWFjaCgoZWFzaW5nTmFtZSwgaSkgPT4gYmFzZUVhc2luZ1tlYXNpbmdOYW1lXSA9IGdlbmVyYXRlUG93ZXJFYXNpbmcoaSArIDMpKTtcblxuLy8gR2VuZXJhdGUgaW4vb3V0L2luT3V0IHZhcmlhdGlvbnNcbmVhY2goYmFzZUVhc2luZywgKGJhc2VFYXNlLCBrZXkpID0+IHtcbiAgICBsZXQgZWFzaW5nRnVuY3Rpb24gPSBjcmVhdGVFYXNpbmcoYmFzZUVhc2UpO1xuICAgIGJhc2VFYXNpbmdbYCR7a2V5fUluYF0gPSBlYXNpbmdGdW5jdGlvbi5pbjtcbiAgICBiYXNlRWFzaW5nW2Ake2tleX1PdXRgXSA9IGVhc2luZ0Z1bmN0aW9uLm91dDtcbiAgICBiYXNlRWFzaW5nW2Ake2tleX1Jbk91dGBdID0gZWFzaW5nRnVuY3Rpb24uaW5PdXQ7XG59KTtcblxuYmFzZUVhc2luZy5saW5lYXIgPSBwcm9ncmVzcyA9PiBwcm9ncmVzcztcbmJhc2VFYXNpbmcuYW50aWNpcGF0ZSA9IChwcm9ncmVzcywgc3RyZW5ndGggPSBERUZBVUxUX0JBQ0tfU1RSRU5HVEgpID0+XG4gICAgKChwcm9ncmVzcyo9MikgPCAxKSA/IDAuNSAqIGJhc2VFYXNpbmcuYmFja0luKHByb2dyZXNzLCBzdHJlbmd0aCkgOiAgMC41ICogKDIgLSBNYXRoLnBvdygyLCAtMTAgKiAocHJvZ3Jlc3MgLSAxKSkpO1xuXG5leHBvcnQgZGVmYXVsdCBiYXNlRWFzaW5nOyJdfQ==
return exports;
})();
var __small$_15 = (function() {
var exports = {};
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _utils = __small$_11;

var _loop = ((function() {
var exports = {};
'use strict';

exports.__esModule = true;
exports.getProcessId = getProcessId;
exports.activate = activate;
exports.deactivate = deactivate;

var _timer = __small$_13;

var _timer2 = _interopRequireDefault(_timer);

var _tick = ((function() {
var exports = {};
'use strict';

exports.__esModule = true;
/*
    Detect and load an appropriate clock setting for the environment
*/

var hasRAF = typeof window !== 'undefined' && window.requestAnimationFrame ? true : false;

var tick = undefined;

if (hasRAF) {
    tick = window.requestAnimationFrame;
} else {
    (function () {
        /*
            requestAnimationFrame polyfill
            
            For IE8/9 Flinstones and non-browser environments
             Taken from Paul Irish. We've stripped out cancelAnimationFrame checks because we don't fox with that
            
            http://paulirish.com/2011/requestanimationframe-for-smart-animating/
            http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
             
            requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
             
            MIT license
        */
        var lastTime = 0;

        tick = function (callback) {
            var currentTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currentTime - lastTime));

            lastTime = currentTime + timeToCall;

            setTimeout(function () {
                return callback(lastTime);
            }, timeToCall);
        };
    })();
}

exports.default = tick;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzL3RpY2suanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUlBLElBQU0sU0FBUyxPQUFRLE1BQVAsS0FBa0IsV0FBbEIsSUFBaUMsT0FBTyxxQkFBUCxHQUFnQyxJQUFsRSxHQUF5RSxLQUF6RTs7QUFFZixJQUFJLGdCQUFKOztBQUVBLElBQUksTUFBSixFQUFZO0FBQ1IsV0FBTyxPQUFPLHFCQUFQLENBREM7Q0FBWixNQUdPOzs7Ozs7Ozs7Ozs7Ozs7QUFlSCxZQUFJLFdBQVcsQ0FBWDs7QUFFSixlQUFPLFVBQUMsUUFBRCxFQUFjO0FBQ2pCLGdCQUFNLGNBQWMsSUFBSSxJQUFKLEdBQVcsT0FBWCxFQUFkLENBRFc7QUFFakIsZ0JBQU0sYUFBYSxLQUFLLEdBQUwsQ0FBUyxDQUFULEVBQVksTUFBTSxjQUFjLFFBQWQsQ0FBTixDQUF6QixDQUZXOztBQUlqQix1QkFBVyxjQUFjLFVBQWQsQ0FKTTs7QUFNakIsdUJBQVc7dUJBQU0sU0FBUyxRQUFUO2FBQU4sRUFBMEIsVUFBckMsRUFOaUI7U0FBZDtTQWpCSjtDQUhQOztrQkE4QmUiLCJmaWxlIjoidGljay5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qXG4gICAgRGV0ZWN0IGFuZCBsb2FkIGFuIGFwcHJvcHJpYXRlIGNsb2NrIHNldHRpbmcgZm9yIHRoZSBlbnZpcm9ubWVudFxuKi9cblxuY29uc3QgaGFzUkFGID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUpID8gdHJ1ZSA6IGZhbHNlO1xuXG5sZXQgdGljaztcblxuaWYgKGhhc1JBRikge1xuICAgIHRpY2sgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xuXG59IGVsc2Uge1xuICAgIC8qXG4gICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSBwb2x5ZmlsbFxuICAgICAgICBcbiAgICAgICAgRm9yIElFOC85IEZsaW5zdG9uZXMgYW5kIG5vbi1icm93c2VyIGVudmlyb25tZW50c1xuXG4gICAgICAgIFRha2VuIGZyb20gUGF1bCBJcmlzaC4gV2UndmUgc3RyaXBwZWQgb3V0IGNhbmNlbEFuaW1hdGlvbkZyYW1lIGNoZWNrcyBiZWNhdXNlIHdlIGRvbid0IGZveCB3aXRoIHRoYXRcbiAgICAgICAgXG4gICAgICAgIGh0dHA6Ly9wYXVsaXJpc2guY29tLzIwMTEvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1hbmltYXRpbmcvXG4gICAgICAgIGh0dHA6Ly9teS5vcGVyYS5jb20vZW1vbGxlci9ibG9nLzIwMTEvMTIvMjAvcmVxdWVzdGFuaW1hdGlvbmZyYW1lLWZvci1zbWFydC1lci1hbmltYXRpbmdcbiAgICAgICAgIFxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGwgYnkgRXJpayBNw7ZsbGVyLiBmaXhlcyBmcm9tIFBhdWwgSXJpc2ggYW5kIFRpbm8gWmlqZGVsXG4gICAgICAgICBcbiAgICAgICAgTUlUIGxpY2Vuc2VcbiAgICAqL1xuICAgIGxldCBsYXN0VGltZSA9IDA7XG5cbiAgICB0aWNrID0gKGNhbGxiYWNrKSA9PiB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgIGNvbnN0IHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAxNiAtIChjdXJyZW50VGltZSAtIGxhc3RUaW1lKSk7XG5cbiAgICAgICAgbGFzdFRpbWUgPSBjdXJyZW50VGltZSArIHRpbWVUb0NhbGw7XG5cbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjYWxsYmFjayhsYXN0VGltZSksIHRpbWVUb0NhbGwpO1xuICAgIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgdGljazsiXX0=
return exports;
})());

var _tick2 = _interopRequireDefault(_tick);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var processOrder = [{ step: 'onFrameStart' }, { step: 'onUpdate' }, { step: 'willRender', decideRender: true }, { step: 'preRender', isRender: true }, { step: 'onRender', isRender: true }, { step: 'postRender', isRender: true }, { step: 'onFrameEnd' }, { step: 'onCleanup' }];
var numProcessSteps = processOrder.length;

// [int]: Process ID, incremented for each new process
var currentProcessId = 0;

// [int]: Number of running processes
var runningCount = 0;

// [int]: Number of running non-background processes
var activeCount = 0;

// [array]: Array of active process IDs
var runningIds = [];

// [object]: Map of active processes
var runningProcesses = {};

// [array]: Array of process IDs queued for deactivation
var deactivateQueue = [];

// [boolean]: Is loop running?
var isRunning = false;

/*
    Update running

    [boolean]: `true` to add
    [boolean]: `true` if lazy
*/
function updateCount(add, isLazy) {
    var modify = add ? 1 : -1;

    runningCount += modify;

    if (!isLazy) {
        activeCount += modify;
    }
}

function purge() {
    var queueLength = deactivateQueue.length;

    while (queueLength--) {
        var idToDelete = deactivateQueue[queueLength];
        var activeIdIndex = runningIds.indexOf(idToDelete);

        // If process is active, deactivate
        if (activeIdIndex > -1) {
            runningIds.splice(activeIdIndex, 1);

            updateCount(false, runningProcesses[idToDelete].isLazy);

            delete runningProcesses[idToDelete];
        }
    }

    deactivateQueue = [];
}

/*
    [timestamp]: Frame timestamp
    [int]: Time since last frame
*/
function fireAll(frameStamp, elapsed) {
    var method = {};
    var methodName = '';
    var isRenderStep = false;
    var process = undefined;
    var result = undefined;

    purge();

    var numRunning = runningCount;

    for (var i = 0; i < numProcessSteps; i++) {
        method = processOrder[i];
        methodName = method.step;
        isRenderStep = method.isRender ? true : false;

        for (var _i = 0; _i < numRunning; _i++) {
            process = runningProcesses[runningIds[_i]];

            if (process && process[methodName] && (!isRenderStep || isRenderStep && process._render === true)) {
                result = process[methodName].call(process, process, frameStamp, elapsed);
            }

            if (method.decideRender) {
                process._render = process[methodName] && result === false ? false : true;
            }
        }
    }

    return activeCount ? true : false;
}

// Function to fire every frame
function frame() {
    (0, _tick2.default)(function (frameStamp) {
        if (isRunning) {
            frame();
        }

        _timer2.default.update(frameStamp);
        isRunning = fireAll(frameStamp, _timer2.default.getElapsed());
    });
}

// Start loop
function start() {
    if (!isRunning) {
        _timer2.default.start();
        isRunning = true;
        frame();
    }
}

// Stop loop
function stop() {
    isRunning = false;
}

// Exports
function getProcessId() {
    return currentProcessId++;
}

/*
    [int]: Process ID to activate
    [Process]: Process to activate
*/
function activate(id, process) {
    var queueIndex = deactivateQueue.indexOf(id);
    var isQueued = queueIndex > -1;
    var isRunning = runningIds.indexOf(id) > -1;

    // Remove from deactivateQueue if queued
    if (isQueued) {
        deactivateQueue.splice(queueIndex, 1);
    }

    // Add to running processes array if not there
    if (!isRunning) {
        runningIds.push(id);
        runningProcesses[id] = process;

        updateCount(true, process.isLazy);
        start();
    }
}

/*
    [int]: Process ID to deactivate
*/
function deactivate(id) {
    if (deactivateQueue.indexOf(id) === -1) {
        deactivateQueue.push(id);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzL2xvb3AuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O1FBdUlnQjtRQVFBO1FBdUJBOzs7Ozs7Ozs7Ozs7QUFuS2hCLElBQU0sZUFBZSxDQUNqQixFQUFFLE1BQU0sY0FBTixFQURlLEVBRWpCLEVBQUUsTUFBTSxVQUFOLEVBRmUsRUFHakIsRUFBRSxNQUFNLFlBQU4sRUFBb0IsY0FBYyxJQUFkLEVBSEwsRUFJakIsRUFBRSxNQUFNLFdBQU4sRUFBbUIsVUFBVSxJQUFWLEVBSkosRUFLakIsRUFBRSxNQUFNLFVBQU4sRUFBa0IsVUFBVSxJQUFWLEVBTEgsRUFNakIsRUFBRSxNQUFNLFlBQU4sRUFBb0IsVUFBVSxJQUFWLEVBTkwsRUFPakIsRUFBRSxNQUFNLFlBQU4sRUFQZSxFQVFqQixFQUFFLE1BQU0sV0FBTixFQVJlLENBQWY7QUFVTixJQUFNLGtCQUFrQixhQUFhLE1BQWI7OztBQUd4QixJQUFJLG1CQUFtQixDQUFuQjs7O0FBR0osSUFBSSxlQUFlLENBQWY7OztBQUdKLElBQUksY0FBYyxDQUFkOzs7QUFHSixJQUFJLGFBQWEsRUFBYjs7O0FBR0osSUFBSSxtQkFBbUIsRUFBbkI7OztBQUdKLElBQUksa0JBQWtCLEVBQWxCOzs7QUFHSixJQUFJLFlBQVksS0FBWjs7Ozs7Ozs7QUFRSixTQUFTLFdBQVQsQ0FBcUIsR0FBckIsRUFBMEIsTUFBMUIsRUFBa0M7QUFDOUIsUUFBTSxTQUFTLE1BQU0sQ0FBTixHQUFVLENBQUMsQ0FBRCxDQURLOztBQUc5QixvQkFBZ0IsTUFBaEIsQ0FIOEI7O0FBSzlCLFFBQUksQ0FBQyxNQUFELEVBQVM7QUFDVCx1QkFBZSxNQUFmLENBRFM7S0FBYjtDQUxKOztBQVVBLFNBQVMsS0FBVCxHQUFpQjtBQUNiLFFBQUksY0FBYyxnQkFBZ0IsTUFBaEIsQ0FETDs7QUFHYixXQUFPLGFBQVAsRUFBc0I7QUFDbEIsWUFBTSxhQUFhLGdCQUFnQixXQUFoQixDQUFiLENBRFk7QUFFbEIsWUFB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S0FBZDs7O0FBTmtDLFFBVzlCLENBQUMsU0FBRCxFQUFZO0FBQ1osbUJBQVcsSUFBWCxDQUFnQixFQUFoQixFQURZO0FBRVoseUJBQWlCLEVBQWpCLElBQXVCLE9BQXZCLENBRlk7O0FBSVosb0JBQVksSUFBWixFQUFrQixRQUFRLE1BQVIsQ0FBbEIsQ0FKWTtBQUtaLGdCQUxZO0tBQWhCO0NBWEc7Ozs7O0FBdUJBLFNBQVMsVUFBVCxDQUFvQixFQUFwQixFQUF3QjtBQUMzQixRQUFJLGdCQUFnQixPQUFoQixDQUF3QixFQUF4QixNQUFnQyxDQUFDLENBQUQsRUFBSTtBQUNwQyx3QkFBZ0IsSUFBaEIsQ0FBcUIsRUFBckIsRUFEb0M7S0FBeEM7Q0FERyIsImZpbGUiOiJsb29wLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHRpbWVyIGZyb20gJy4vdGltZXInO1xuaW1wb3J0IHRpY2sgZnJvbSAnLi90aWNrJztcblxuY29uc3QgcHJvY2Vzc09yZGVyID0gW1xuICAgIHsgc3RlcDogJ29uRnJhbWVTdGFydCcgfSxcbiAgICB7IHN0ZXA6ICdvblVwZGF0ZScgfSxcbiAgICB7IHN0ZXA6ICd3aWxsUmVuZGVyJywgZGVjaWRlUmVuZGVyOiB0cnVlIH0sXG4gICAgeyBzdGVwOiAncHJlUmVuZGVyJywgaXNSZW5kZXI6IHRydWUgfSxcbiAgICB7IHN0ZXA6ICdvblJlbmRlcicsIGlzUmVuZGVyOiB0cnVlIH0sXG4gICAgeyBzdGVwOiAncG9zdFJlbmRlcicsIGlzUmVuZGVyOiB0cnVlIH0sXG4gICAgeyBzdGVwOiAnb25GcmFtZUVuZCcgfSxcbiAgICB7IHN0ZXA6ICdvbkNsZWFudXAnIH1cbl07XG5jb25zdCBudW1Qcm9jZXNzU3RlcHMgPSBwcm9jZXNzT3JkZXIubGVuZ3RoO1xuXG4vLyBbaW50XTogUHJvY2VzcyBJRCwgaW5jcmVtZW50ZWQgZm9yIGVhY2ggbmV3IHByb2Nlc3NcbmxldCBjdXJyZW50UHJvY2Vzc0lkID0gMDtcblxuLy8gW2ludF06IE51bWJlciBvZiBydW5uaW5nIHByb2Nlc3Nlc1xubGV0IHJ1bm5pbmdDb3VudCA9IDA7XG5cbi8vIFtpbnRdOiBOdW1iZXIgb2YgcnVubmluZyBub24tYmFja2dyb3VuZCBwcm9jZXNzZXNcbmxldCBhY3RpdmVDb3VudCA9IDA7XG5cbi8vIFthcnJheV06IEFycmF5IG9mIGFjdGl2ZSBwcm9jZXNzIElEc1xubGV0IHJ1bm5pbmdJZHMgPSBbXTtcblxuLy8gW29iamVjdF06IE1hcCBvZiBhY3RpdmUgcHJvY2Vzc2VzXG5sZXQgcnVubmluZ1Byb2Nlc3NlcyA9IHt9O1xuXG4vLyBbYXJyYXldOiBBcnJheSBvZiBwcm9jZXNzIElEcyBxdWV1ZWQgZm9yIGRlYWN0aXZhdGlvblxubGV0IGRlYWN0aXZhdGVRdWV1ZSA9IFtdO1xuXG4vLyBbYm9vbGVhbl06IElzIGxvb3AgcnVubmluZz9cbmxldCBpc1J1bm5pbmcgPSBmYWxzZTtcblxuLypcbiAgICBVcGRhdGUgcnVubmluZ1xuXG4gICAgW2Jvb2xlYW5dOiBgdHJ1ZWAgdG8gYWRkXG4gICAgW2Jvb2xlYW5dOiBgdHJ1ZWAgaWYgbGF6eVxuKi9cbmZ1bmN0aW9uIHVwZGF0ZUNvdW50KGFkZCwgaXNMYXp5KSB7XG4gICAgY29uc3QgbW9kaWZ5ID0gYWRkID8gMSA6IC0xO1xuXG4gICAgcnVubmluZ0NvdW50ICs9IG1vZGlmeTtcblxuICAgIGlmICghaXNMYXp5KSB7XG4gICAgICAgIGFjdGl2ZUNvdW50ICs9IG1vZGlmeTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHB1cmdlKCkge1xuICAgIGxldCBxdWV1ZUxlbmd0aCA9IGRlYWN0aXZhdGVRdWV1ZS5sZW5ndGg7XG5cbiAgICB3aGlsZSAocXVldWVMZW5ndGgtLSkge1xuICAgICAgICBjb25zdCBpZFRvRGVsZXRlID0gZGVhY3RpdmF0ZVF1ZXVlW3F1ZXVlTGVuZ3RoXTtcbiAgICAgICAgY29uc3QgYWN0aXZlSWRJbmRleCA9IHJ1bm5pbmdJZHMuaW5kZXhPZihpZFRvRGVsZXRlKTtcblxuICAgICAgICAvLyBJZiBwcm9jZXNzIGlzIGFjdGl2ZSwgZGVhY3RpdmF0ZVxuICAgICAgICBpZiAoYWN0aXZlSWRJbmRleCA+IC0xKSB7XG4gICAgICAgICAgICBydW5uaW5nSWRzLnNwbGljZShhY3RpdmVJZEluZGV4LCAxKTtcblxuICAgICAgICAgICAgdXBkYXRlQ291bnQoZmFsc2UsIHJ1bm5pbmdQcm9jZXNzZXNbaWRUb0RlbGV0ZV0uaXNMYXp5KTtcblxuICAgICAgICAgICAgZGVsZXRlIHJ1bm5pbmdQcm9jZXNzZXNbaWRUb0RlbGV0ZV07XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZWFjdGl2YXRlUXVldWUgPSBbXTtcbn1cblxuLypcbiAgICBbdGltZXN0YW1wXTogRnJhbWUgdGltZXN0YW1wXG4gICAgW2ludF06IFRpbWUgc2luY2UgbGFzdCBmcmFtZVxuKi9cbmZ1bmN0aW9uIGZpcmVBbGwoZnJhbWVTdGFtcCwgZWxhcHNlZCkge1xuICAgIGxldCBtZXRob2QgPSB7fTtcbiAgICBsZXQgbWV0aG9kTmFtZSA9ICcnO1xuICAgIGxldCBpc1JlbmRlclN0ZXAgPSBmYWxzZTtcbiAgICBsZXQgcHJvY2VzcztcbiAgICBsZXQgcmVzdWx0O1xuXG4gICAgcHVyZ2UoKTtcblxuICAgIGNvbnN0IG51bVJ1bm5pbmcgPSBydW5uaW5nQ291bnQ7XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG51bVByb2Nlc3NTdGVwczsgaSsrKSB7XG4gICAgICAgIG1ldGhvZCA9IHByb2Nlc3NPcmRlcltpXTtcbiAgICAgICAgbWV0aG9kTmFtZSA9IG1ldGhvZC5zdGVwO1xuICAgICAgICBpc1JlbmRlclN0ZXAgPSBtZXRob2QuaXNSZW5kZXIgPyB0cnVlIDogZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBudW1SdW5uaW5nOyBpKyspIHtcbiAgICAgICAgICAgIHByb2Nlc3MgPSBydW5uaW5nUHJvY2Vzc2VzW3J1bm5pbmdJZHNbaV1dO1xuXG4gICAgICAgICAgICBpZiAocHJvY2VzcyAmJiBwcm9jZXNzW21ldGhvZE5hbWVdICYmICghaXNSZW5kZXJTdGVwIHx8IChpc1JlbmRlclN0ZXAgJiYgcHJvY2Vzcy5fcmVuZGVyID09PSB0cnVlKSkpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBwcm9jZXNzW21ldGhvZE5hbWVdLmNhbGwocHJvY2VzcywgcHJvY2VzcywgZnJhbWVTdGFtcCwgZWxhcHNlZCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChtZXRob2QuZGVjaWRlUmVuZGVyKSB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzcy5fcmVuZGVyID0gKHByb2Nlc3NbbWV0aG9kTmFtZV0gJiYgcmVzdWx0ID09PSBmYWxzZSkgPyBmYWxzZSA6IHRydWU7IFxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGFjdGl2ZUNvdW50ID8gdHJ1ZSA6IGZhbHNlO1xufVxuXG4vLyBGdW5jdGlvbiB0byBmaXJlIGV2ZXJ5IGZyYW1lXG5mdW5jdGlvbiBmcmFtZSgpIHtcbiAgICB0aWNrKChmcmFtZVN0YW1wKSA9PiB7XG4gICAgICAgIGlmIChpc1J1bm5pbmcpIHtcbiAgICAgICAgICAgIGZyYW1lKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aW1lci51cGRhdGUoZnJhbWVTdGFtcCk7XG4gICAgICAgIGlzUnVubmluZyA9IGZpcmVBbGwoZnJhbWVTdGFtcCwgdGltZXIuZ2V0RWxhcHNlZCgpKTtcbiAgICB9KTtcbn1cblxuLy8gU3RhcnQgbG9vcFxuZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgaWYgKCFpc1J1bm5pbmcpIHtcbiAgICAgICAgdGltZXIuc3RhcnQoKTtcbiAgICAgICAgaXNSdW5uaW5nID0gdHJ1ZTtcbiAgICAgICAgZnJhbWUoKTtcbiAgICB9XG59XG5cbi8vIFN0b3AgbG9vcFxuZnVuY3Rpb24gc3RvcCgpIHtcbiAgICBpc1J1bm5pbmcgPSBmYWxzZTtcbn1cblxuLy8gRXhwb3J0c1xuZXhwb3J0IGZ1bmN0aW9uIGdldFByb2Nlc3NJZCgpIHtcbiAgICByZXR1cm4gY3VycmVudFByb2Nlc3NJZCsrO1xufVxuXG4vKlxuICAgIFtpbnRdOiBQcm9jZXNzIElEIHRvIGFjdGl2YXRlXG4gICAgW1Byb2Nlc3NdOiBQcm9jZXNzIHRvIGFjdGl2YXRlXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGFjdGl2YXRlKGlkLCBwcm9jZXNzKSB7XG4gICAgY29uc3QgcXVldWVJbmRleCA9IGRlYWN0aXZhdGVRdWV1ZS5pbmRleE9mKGlkKTtcbiAgICBjb25zdCBpc1F1ZXVlZCA9IChxdWV1ZUluZGV4ID4gLTEpO1xuICAgIGNvbnN0IGlzUnVubmluZyA9IChydW5uaW5nSWRzLmluZGV4T2YoaWQpID4gLTEpO1xuXG4gICAgLy8gUmVtb3ZlIGZyb20gZGVhY3RpdmF0ZVF1ZXVlIGlmIHF1ZXVlZFxuICAgIGlmIChpc1F1ZXVlZCkge1xuICAgICAgICBkZWFjdGl2YXRlUXVldWUuc3BsaWNlKHF1ZXVlSW5kZXgsIDEpO1xuICAgIH1cblxuICAgIC8vIEFkZCB0byBydW5uaW5nIHByb2Nlc3NlcyBhcnJheSBpZiBub3QgdGhlcmVcbiAgICBpZiAoIWlzUnVubmluZykge1xuICAgICAgICBydW5uaW5nSWRzLnB1c2goaWQpO1xuICAgICAgICBydW5uaW5nUHJvY2Vzc2VzW2lkXSA9IHByb2Nlc3M7XG5cbiAgICAgICAgdXBkYXRlQ291bnQodHJ1ZSwgcHJvY2Vzcy5pc0xhenkpO1xuICAgICAgICBzdGFydCgpO1xuICAgIH1cbn1cblxuLypcbiAgICBbaW50XTogUHJvY2VzcyBJRCB0byBkZWFjdGl2YXRlXG4qL1xuZXhwb3J0IGZ1bmN0aW9uIGRlYWN0aXZhdGUoaWQpIHtcbiAgICBpZiAoZGVhY3RpdmF0ZVF1ZXVlLmluZGV4T2YoaWQpID09PSAtMSkge1xuICAgICAgICBkZWFjdGl2YXRlUXVldWUucHVzaChpZCk7XG4gICAgfVxufSJdfQ==
return exports;
})());

var loop = _interopRequireWildcard(_loop);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Process = function () {
    /*
        [object]: Properties
        [boolean] (optional): Is Process lazy?
    */

    function Process(props, isLazy) {
        _classCallCheck(this, Process);

        this.set(this.getDefaultProps());
        this.set(props);

        this.isLazy = isLazy || false;
        this.id = loop.getProcessId();
        this.isActive = false;
    }

    Process.prototype.set = function set(props) {
        var _this = this;

        (0, _utils.each)(props, function (value, key) {
            return _this[key] = value;
        });
        return this;
    };

    Process.prototype.start = function start() {
        this.isActive = true;
        loop.activate(this.id, this);
        return this;
    };

    Process.prototype.stop = function stop() {
        this.isActive = false;
        loop.deactivate(this.id);
        return this;
    };

    Process.prototype.once = function once() {
        var _this2 = this;

        this.onCleanup = function () {
            _this2.stop();
            _this2.onCleanup = undefined;
        };

        this.start();

        return this;
    };

    /*
        # Get default Action properties
         @return [object]
    */

    Process.prototype.getDefaultProps = function getDefaultProps() {
        return {};
    };

    /*
        # Extend this Process with new properties
        ## Returns new instance of this Process's `prototype` with existing and new properties
         @param [object] (optional)
        @return [Process]
    */

    Process.prototype.inherit = function inherit(props) {
        return new this.constructor(_extends({}, this, { props: props }));
    };

    return Process;
}();

exports.default = Process;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9wcm9jZXNzL1Byb2Nlc3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztJQUNZOzs7Ozs7SUFFUzs7Ozs7O0FBS2pCLGFBTGlCLE9BS2pCLENBQVksS0FBWixFQUFtQixNQUFuQixFQUEyQjs4QkFMVixTQUtVOztBQUN2QixhQUFLLEdBQUwsQ0FBUyxLQUFLLGVBQUwsRUFBVCxFQUR1QjtBQUV2QixhQUFLLEdBQUwsQ0FBUyxLQUFULEVBRnVCOztBQUl2QixhQUFLLE1BQUwsR0FBYyxVQUFVLEtBQVYsQ0FKUztBQUt2QixhQUFLLEVBQUwsR0FBVSxLQUFLLFlBQUwsRUFBVixDQUx1QjtBQU12QixhQUFLLFFBQUwsR0FBZ0IsS0FBaEIsQ0FOdUI7S0FBM0I7O0FBTGlCLHNCQWNqQixtQkFBSSxPQUFPOzs7QUFDUCxtQkFsQkMsS0FrQkQsQ0FBSyxLQUFMLEVBQVksVUFBQyxLQUFELEVBQVEsR0FBUjttQkFBZ0IsTUFBSyxHQUFMLElBQVksS0FBWjtTQUFoQixDQUFaLENBRE87QUFFUCxlQUFPLElBQVAsQ0FGTzs7O0FBZE0sc0JBbUJqQix5QkFBUTtBQUNKLGFBQUssUUFBTCxHQUFnQixJQUFoQixDQURJO0FBRUosYUFBSyxRQUFMLENBQWMsS0FBSyxFQUFMLEVBQVMsSUFBdkIsRUFGSTtBQUdKLGVBQU8sSUFBUCxDQUhJOzs7QUFuQlMsc0JBeUJqQix1QkFBTztBQUNILGFBQUssUUFBTCxHQUFnQixLQUFoQixDQURHO0FBRUgsYUFBSyxVQUFMLENBQWdCLEtBQUssRUFBTCxDQUFoQixDQUZHO0FBR0gsZUFBTyxJQUFQLENBSEc7OztBQXpCVSxzQkErQmpCLHVCQUFPOzs7QUFDSCxhQUFLLFNBQUwsR0FBaUIsWUFBTTtBQUNuQixtQkFBSyxJQUFMLEdBRG1CO0FBRW5CLG1CQUFLLFNBQUwsR0FBaUIsU0FBakIsQ0FGbUI7U0FBTixDQURkOztBQU1ILGFBQUssS0FBTCxHQU5HOztBQVFILGVBQU8sSUFBUCxDQVJHOzs7Ozs7OztBQS9CVSxzQkErQ2pCLDZDQUFrQjtBQUNkLGVBQU8sRUFBUCxDQURjOzs7Ozs7Ozs7O0FBL0NELHNCQTBEakIsMkJBQVEsT0FBTztBQUNYLGVBQU8sSUFBSSxLQUFLLFdBQUwsY0FBc0IsUUFBTSxlQUFoQyxDQUFQLENBRFc7OztXQTFERTs7OztBQTZEcEIiLCJmaWxlIjoiUHJvY2Vzcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGVhY2ggfSBmcm9tICcuLi9pbmMvdXRpbHMnO1xuaW1wb3J0ICogYXMgbG9vcCBmcm9tICcuL2xvb3AnO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBQcm9jZXNzIHtcbiAgICAvKlxuICAgICAgICBbb2JqZWN0XTogUHJvcGVydGllc1xuICAgICAgICBbYm9vbGVhbl0gKG9wdGlvbmFsKTogSXMgUHJvY2VzcyBsYXp5P1xuICAgICovXG4gICAgY29uc3RydWN0b3IocHJvcHMsIGlzTGF6eSkge1xuICAgICAgICB0aGlzLnNldCh0aGlzLmdldERlZmF1bHRQcm9wcygpKTtcbiAgICAgICAgdGhpcy5zZXQocHJvcHMpO1xuXG4gICAgICAgIHRoaXMuaXNMYXp5ID0gaXNMYXp5IHx8IGZhbHNlO1xuICAgICAgICB0aGlzLmlkID0gbG9vcC5nZXRQcm9jZXNzSWQoKTtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIHNldChwcm9wcykge1xuICAgICAgICBlYWNoKHByb3BzLCAodmFsdWUsIGtleSkgPT4gdGhpc1trZXldID0gdmFsdWUpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzdGFydCgpIHtcbiAgICAgICAgdGhpcy5pc0FjdGl2ZSA9IHRydWU7XG4gICAgICAgIGxvb3AuYWN0aXZhdGUodGhpcy5pZCwgdGhpcyk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHN0b3AoKSB7XG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBmYWxzZTtcbiAgICAgICAgbG9vcC5kZWFjdGl2YXRlKHRoaXMuaWQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBvbmNlKCkge1xuICAgICAgICB0aGlzLm9uQ2xlYW51cCA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgdGhpcy5vbkNsZWFudXAgPSB1bmRlZmluZWQ7XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5zdGFydCgpO1xuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIC8qXG4gICAgICAgICMgR2V0IGRlZmF1bHQgQWN0aW9uIHByb3BlcnRpZXNcblxuICAgICAgICBAcmV0dXJuIFtvYmplY3RdXG4gICAgKi9cbiAgICBnZXREZWZhdWx0UHJvcHMoKSB7XG4gICAgICAgIHJldHVybiB7fTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAgICAjIEV4dGVuZCB0aGlzIFByb2Nlc3Mgd2l0aCBuZXcgcHJvcGVydGllc1xuICAgICAgICAjIyBSZXR1cm5zIG5ldyBpbnN0YW5jZSBvZiB0aGlzIFByb2Nlc3MncyBgcHJvdG90eXBlYCB3aXRoIGV4aXN0aW5nIGFuZCBuZXcgcHJvcGVydGllc1xuXG4gICAgICAgIEBwYXJhbSBbb2JqZWN0XSAob3B0aW9uYWwpXG4gICAgICAgIEByZXR1cm4gW1Byb2Nlc3NdXG4gICAgKi9cbiAgICBpbmhlcml0KHByb3BzKSB7XG4gICAgICAgIHJldHVybiBuZXcgdGhpcy5jb25zdHJ1Y3Rvcih7IC4uLnRoaXMsIHByb3BzIH0pO1xuICAgIH1cbn07XG4iXX0=
return exports;
})();
var __small$_3 = (function() {
var exports = {};
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _Process2 = __small$_15;

var _Process3 = _interopRequireDefault(_Process2);

var _utils = __small$_11;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DEFAULT_PROP = 'current';

var Action = function (_Process) {
    _inherits(Action, _Process);

    function Action() {
        _classCallCheck(this, Action);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        // Initalise renderer

        var _this = _possibleConstructorReturn(this, _Process.call.apply(_Process, [this].concat(args)));

        if (_this.onRender && _this.onRender.init) {
            _this.onRender.init(_this);
        }
        return _this;
    }

    /*
        # Set Action properties
        ## Set user-defined Action properties
         @param [object]
        @return [Action]
    */

    Action.prototype.set = function set(props) {
        var _this2 = this;

        var values = props.values;

        var propsToSet = _objectWithoutProperties(props, ['values']);

        _Process.prototype.set.call(this, propsToSet);

        this.values = this.values || {};

        // Merge `value` properties with existing
        if (values) {
            (function () {
                var currentValues = _this2.values;
                var defaultValue = _this2.getDefaultValue();
                var defaultValueProp = _this2.getDefaultValueProp();

                // Inherit values from props
                (0, _utils.each)(defaultValue, function (value, key) {
                    if (propsToSet[key] !== undefined) {
                        defaultValue[key] = propsToSet[key];
                    }
                });

                // Overwrite per-value props
                (0, _utils.each)(values, function (value, key) {
                    var existingValue = currentValues[key];
                    var newValue = _extends({}, defaultValue);

                    if ((0, _utils.isObj)(value)) {
                        newValue = _extends({}, newValue, value);
                    } else {
                        newValue[defaultValueProp] = value;
                    }

                    // update values

                    currentValues[key] = existingValue ? _extends({}, existingValue, newValue) : newValue;
                });
            })();
        }

        return this;
    };

    Action.prototype.pause = function pause() {
        _Process.prototype.stop.call(this);
        return this;
    };

    Action.prototype.resume = function resume() {
        _Process.prototype.start.call(this);
        return this;
    };

    /*
        # Get default Action value properties
         @return [object]
    */

    Action.prototype.getDefaultValue = function getDefaultValue() {
        return {
            current: 0,
            velocity: 0
        };
    };

    /*
        # Get default Action value property name
        ## Set this `value` property when set as value instead of object
         @return [string]
    */

    Action.prototype.getDefaultValueProp = function getDefaultValueProp() {
        return DEFAULT_PROP;
    };

    return Action;
}(_Process3.default);

exports.default = Action;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL0FjdGlvbi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR0EsSUFBTSxlQUFlLFNBQWY7O0lBRWU7OztBQUNqQixhQURpQixNQUNqQixHQUFxQjs4QkFESixRQUNJOzswQ0FBTjs7U0FBTTs7OztxREFDakIsNENBQVMsS0FBVCxHQURpQjs7QUFJakIsWUFBSSxNQUFLLFFBQUwsSUFBaUIsTUFBSyxRQUFMLENBQWMsSUFBZCxFQUFvQjtBQUNyQyxrQkFBSyxRQUFMLENBQWMsSUFBZCxRQURxQztTQUF6QztxQkFKaUI7S0FBckI7Ozs7Ozs7OztBQURpQixxQkFpQmpCLG1CQUFJLE9BQU87OztZQUNDLFNBQTBCLE1BQTFCLE9BREQ7O1lBQ1ksc0NBQWUsbUJBRDNCOztBQUdQLDJCQUFNLEdBQU4sWUFBVSxVQUFWLEVBSE87O0FBS1AsYUFBSyxNQUFMLEdBQWMsS0FBSyxNQUFMLElBQWUsRUFBZjs7O0FBTFAsWUFRSCxNQUFKLEVBQVk7O0FBQ1Isb0JBQU0sZ0JBQWdCLE9BQUssTUFBTDtBQUN0QixvQkFBTSxlQUFlLE9BQUssZUFBTCxFQUFmO0FBQ04sb0JBQU0sbUJBQW1CLE9BQUssbUJBQUwsRUFBbkI7OztBQUdOLDJCQW5DSCxLQW1DRyxDQUFLLFlBQUwsRUFBbUIsVUFBQyxLQUFELEVBQVEsR0FBUixFQUFnQjtBQUMvQix3QkFBSSxXQUFXLEdBQVgsTUFBb0IsU0FBcEIsRUFBK0I7QUFDL0IscUNBQWEsR0FBYixJQUFvQixXQUFXLEdBQVgsQ0FBcEIsQ0FEK0I7cUJBQW5DO2lCQURlLENBQW5COzs7QUFPQSwyQkExQ0gsS0EwQ0csQ0FBSyxNQUFMLEVBQWEsVUFBQyxLQUFELEVBQVEsR0FBUixFQUFnQjtBQUN6Qix3QkFBTSxnQkFBZ0IsY0FBYyxHQUFkLENBQWhCLENBRG1CO0FBRXpCLHdCQUFJLHdCQUFnQixhQUFoQixDQUZxQjs7QUFJekIsd0JBQUksV0E5Q0wsTUE4Q0ssQ0FBTSxLQUFOLENBQUosRUFBa0I7QUFDZCxnREFBZ0IsVUFBYSxNQUE3QixDQURjO3FCQUFsQixNQUVPO0FBQ0gsaUNBQVMsZ0JBQVQsSUFBNkIsS0FBN0IsQ0FERztxQkFGUDs7OztBQUp5QixpQ0FZekIsQ0FBYyxHQUFkLElBQXFCLDZCQUFxQixlQUFrQixTQUF2QyxHQUFvRCxRQUFwRCxDQVpJO2lCQUFoQixDQUFiO2lCQWJRO1NBQVo7O0FBNkJBLGVBQU8sSUFBUCxDQXJDTzs7O0FBakJNLHFCQXlEakIseUJBQVE7QUFDSiwyQkFBTSxJQUFOLFlBREk7QUFFSixlQUFPLElBQVAsQ0FGSTs7O0FBekRTLHFCQThEakIsMkJBQVM7QUFDTCwyQkFBTSxLQUFOLFlBREs7QUFFTCxlQUFPLElBQVAsQ0FGSzs7Ozs7Ozs7QUE5RFEscUJBd0VqQiw2Q0FBa0I7QUFDZCxlQUFPO0FBQ0gscUJBQVMsQ0FBVDtBQUNBLHNCQUFVLENBQVY7U0FGSixDQURjOzs7Ozs7Ozs7QUF4RUQscUJBcUZqQixxREFBc0I7QUFDbEIsZUFBTyxZQUFQLENBRGtCOzs7V0FyRkw7Ozs7QUF3RnBCIiwiZmlsZSI6IkFjdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBQcm9jZXNzIGZyb20gJy4uL3Byb2Nlc3MvUHJvY2Vzcyc7XG5pbXBvcnQgeyBlYWNoLCBpc09iaiB9IGZyb20gJy4uL2luYy91dGlscyc7XG5cbmNvbnN0IERFRkFVTFRfUFJPUCA9ICdjdXJyZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWN0aW9uIGV4dGVuZHMgUHJvY2VzcyB7XG4gICAgY29uc3RydWN0b3IoLi4uYXJncykge1xuICAgICAgICBzdXBlciguLi5hcmdzKTtcblxuICAgICAgICAvLyBJbml0YWxpc2UgcmVuZGVyZXIgXG4gICAgICAgIGlmICh0aGlzLm9uUmVuZGVyICYmIHRoaXMub25SZW5kZXIuaW5pdCkge1xuICAgICAgICAgICAgdGhpcy5vblJlbmRlci5pbml0KHRoaXMpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgIyBTZXQgQWN0aW9uIHByb3BlcnRpZXNcbiAgICAgICAgIyMgU2V0IHVzZXItZGVmaW5lZCBBY3Rpb24gcHJvcGVydGllc1xuXG4gICAgICAgIEBwYXJhbSBbb2JqZWN0XVxuICAgICAgICBAcmV0dXJuIFtBY3Rpb25dXG4gICAgKi9cbiAgICBzZXQocHJvcHMpIHtcbiAgICAgICAgY29uc3QgeyB2YWx1ZXMsIC4uLnByb3BzVG9TZXQgfSA9IHByb3BzO1xuXG4gICAgICAgIHN1cGVyLnNldChwcm9wc1RvU2V0KTtcblxuICAgICAgICB0aGlzLnZhbHVlcyA9IHRoaXMudmFsdWVzIHx8IHt9O1xuXG4gICAgICAgIC8vIE1lcmdlIGB2YWx1ZWAgcHJvcGVydGllcyB3aXRoIGV4aXN0aW5nXG4gICAgICAgIGlmICh2YWx1ZXMpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRWYWx1ZXMgPSB0aGlzLnZhbHVlcztcbiAgICAgICAgICAgIGNvbnN0IGRlZmF1bHRWYWx1ZSA9IHRoaXMuZ2V0RGVmYXVsdFZhbHVlKCk7XG4gICAgICAgICAgICBjb25zdCBkZWZhdWx0VmFsdWVQcm9wID0gdGhpcy5nZXREZWZhdWx0VmFsdWVQcm9wKCk7XG5cbiAgICAgICAgICAgIC8vIEluaGVyaXQgdmFsdWVzIGZyb20gcHJvcHNcbiAgICAgICAgICAgIGVhY2goZGVmYXVsdFZhbHVlLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChwcm9wc1RvU2V0W2tleV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWVba2V5XSA9IHByb3BzVG9TZXRba2V5XTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gT3ZlcndyaXRlIHBlci12YWx1ZSBwcm9wc1xuICAgICAgICAgICAgZWFjaCh2YWx1ZXMsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgZXhpc3RpbmdWYWx1ZSA9IGN1cnJlbnRWYWx1ZXNba2V5XTtcbiAgICAgICAgICAgICAgICBsZXQgbmV3VmFsdWUgPSB7IC4uLmRlZmF1bHRWYWx1ZSB9O1xuXG4gICAgICAgICAgICAgICAgaWYgKGlzT2JqKHZhbHVlKSkge1xuICAgICAgICAgICAgICAgICAgICBuZXdWYWx1ZSA9IHsgLi4ubmV3VmFsdWUsIC4uLnZhbHVlIH07XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsdWVbZGVmYXVsdFZhbHVlUHJvcF0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB1cGRhdGUgdmFsdWVzXG5cbiAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWVzW2tleV0gPSBleGlzdGluZ1ZhbHVlID8geyAuLi5leGlzdGluZ1ZhbHVlLCAuLi5uZXdWYWx1ZSB9IDogbmV3VmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHBhdXNlKCkge1xuICAgICAgICBzdXBlci5zdG9wKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHJlc3VtZSgpIHtcbiAgICAgICAgc3VwZXIuc3RhcnQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgIyBHZXQgZGVmYXVsdCBBY3Rpb24gdmFsdWUgcHJvcGVydGllc1xuXG4gICAgICAgIEByZXR1cm4gW29iamVjdF1cbiAgICAqL1xuICAgIGdldERlZmF1bHRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGN1cnJlbnQ6IDAsXG4gICAgICAgICAgICB2ZWxvY2l0eTogMFxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qXG4gICAgICAgICMgR2V0IGRlZmF1bHQgQWN0aW9uIHZhbHVlIHByb3BlcnR5IG5hbWVcbiAgICAgICAgIyMgU2V0IHRoaXMgYHZhbHVlYCBwcm9wZXJ0eSB3aGVuIHNldCBhcyB2YWx1ZSBpbnN0ZWFkIG9mIG9iamVjdFxuXG4gICAgICAgIEByZXR1cm4gW3N0cmluZ11cbiAgICAqL1xuICAgIGdldERlZmF1bHRWYWx1ZVByb3AoKSB7XG4gICAgICAgIHJldHVybiBERUZBVUxUX1BST1A7XG4gICAgfVxufTtcbiJdfQ==
return exports;
})();
var __small$_7 = (function() {
var exports = {};
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _Process2 = __small$_15;

var _Process3 = _interopRequireDefault(_Process2);

var _utils = __small$_11;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Input = function (_Process) {
    _inherits(Input, _Process);

    function Input(initialValues, poll) {
        _classCallCheck(this, Input);

        var _this = _possibleConstructorReturn(this, _Process.call(this));

        _this.state = {};
        _this.offset = {};

        if ((0, _utils.isFunc)(poll)) {
            _this.onFrameStart = function () {
                return _this.latest(_this.poll());
            };
        }
        return _this;
    }

    /*
        Manually add latest values
         @param [object]
    */

    Input.prototype.latest = function latest(props) {
        this.state = _extends({}, this.state, { props: props });
    };

    return Input;
}(_Process3.default);

exports.default = Input;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnB1dC9JbnB1dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUdxQjs7O0FBQ2pCLGFBRGlCLEtBQ2pCLENBQVksYUFBWixFQUEyQixJQUEzQixFQUFpQzs4QkFEaEIsT0FDZ0I7O3FEQUM3QixxQkFENkI7O0FBRTdCLGNBQUssS0FBTCxHQUFhLEVBQWIsQ0FGNkI7QUFHN0IsY0FBSyxNQUFMLEdBQWMsRUFBZCxDQUg2Qjs7QUFLN0IsWUFBSSxXQVJILE9BUUcsQ0FBTyxJQUFQLENBQUosRUFBa0I7QUFDZCxrQkFBSyxZQUFMLEdBQW9CO3VCQUFNLE1BQUssTUFBTCxDQUFZLE1BQUssSUFBTCxFQUFaO2FBQU4sQ0FETjtTQUFsQjtxQkFMNkI7S0FBakM7Ozs7Ozs7QUFEaUIsb0JBZ0JqQix5QkFBTyxPQUFPO0FBQ1YsYUFBSyxLQUFMLGdCQUFrQixLQUFLLEtBQUwsSUFBWSxlQUE5QixDQURVOzs7V0FoQkciLCJmaWxlIjoiSW5wdXQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHJvY2VzcyBmcm9tICcuLi9wcm9jZXNzL1Byb2Nlc3MnO1xuaW1wb3J0IHsgaXNGdW5jIH0gZnJvbSAnLi4vaW5jL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgSW5wdXQgZXh0ZW5kcyBQcm9jZXNzIHtcbiAgICBjb25zdHJ1Y3Rvcihpbml0aWFsVmFsdWVzLCBwb2xsKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSB7fTtcbiAgICAgICAgdGhpcy5vZmZzZXQgPSB7fTtcblxuICAgICAgICBpZiAoaXNGdW5jKHBvbGwpKSB7XG4gICAgICAgICAgICB0aGlzLm9uRnJhbWVTdGFydCA9ICgpID0+IHRoaXMubGF0ZXN0KHRoaXMucG9sbCgpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qXG4gICAgICAgIE1hbnVhbGx5IGFkZCBsYXRlc3QgdmFsdWVzXG5cbiAgICAgICAgQHBhcmFtIFtvYmplY3RdXG4gICAgKi9cbiAgICBsYXRlc3QocHJvcHMpIHtcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgLi4udGhpcy5zdGF0ZSwgcHJvcHMgfTtcbiAgICB9XG59XG4iXX0=
return exports;
})();
var __small$_8 = (function() {
var exports = {};
'use strict';

exports.__esModule = true;

var _Input2 = __small$_7;

var _Input3 = _interopRequireDefault(_Input2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MOUSE_MOVE = 'mousemove';

/*
    Scrape x/y coordinates from provided event

    @param [event]
    @return [object]
*/
var eventToPoint = function (e) {
    return {
        x: e.pageX,
        y: e.pageY
    };
};

var Mouse = function (_Input) {
    _inherits(Mouse, _Input);

    function Mouse(e) {
        _classCallCheck(this, Mouse);

        var _this = _possibleConstructorReturn(this, _Input.call(this));

        _this.state = eventToPoint(e);
        _this.bindEvents();
        return _this;
    }

    Mouse.prototype.latest = function latest(e) {
        _Input.prototype.latest.call(this, eventToPoint(e));
        e.preventDefault();
    };

    Mouse.prototype.start = function start() {
        _Input.prototype.start.call(this);
        document.documentElement.addEventListener(MOUSE_MOVE, this.onMove);
    };

    Mouse.prototype.stop = function stop() {
        _Input.prototype.stop.call(this);
        document.documentElement.removeEventListener(MOUSE_MOVE, this.onMove);
    };

    return Mouse;
}(_Input3.default);

exports.default = Mouse;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnB1dC9Nb3VzZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxhQUFhLFdBQWI7Ozs7Ozs7O0FBUU4sSUFBTSxlQUFlLFVBQUMsQ0FBRDtXQUFRO0FBQ3pCLFdBQUcsRUFBRSxLQUFGO0FBQ0gsV0FBRyxFQUFFLEtBQUY7O0NBRmM7O0lBS0E7OztBQUNqQixhQURpQixLQUNqQixDQUFZLENBQVosRUFBZTs4QkFERSxPQUNGOztxREFDWCxtQkFEVzs7QUFFWCxjQUFLLEtBQUwsR0FBYSxhQUFhLENBQWIsQ0FBYixDQUZXO0FBR1gsY0FBSyxVQUFMLEdBSFc7O0tBQWY7O0FBRGlCLG9CQU9qQix5QkFBTyxHQUFHO0FBQ04seUJBQU0sTUFBTixZQUFhLGFBQWEsQ0FBYixDQUFiLEVBRE07QUFFTixVQUFFLGNBQUYsR0FGTTs7O0FBUE8sb0JBWWpCLHlCQUFRO0FBQ0oseUJBQU0sS0FBTixZQURJO0FBRUosaUJBQVMsZUFBVCxDQUF5QixnQkFBekIsQ0FBMEMsVUFBMUMsRUFBc0QsS0FBSyxNQUFMLENBQXRELENBRkk7OztBQVpTLG9CQWlCakIsdUJBQU87QUFDSCx5QkFBTSxJQUFOLFlBREc7QUFFSCxpQkFBUyxlQUFULENBQXlCLG1CQUF6QixDQUE2QyxVQUE3QyxFQUF5RCxLQUFLLE1BQUwsQ0FBekQsQ0FGRzs7O1dBakJVIiwiZmlsZSI6Ik1vdXNlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IElucHV0IGZyb20gJy4vSW5wdXQnO1xuXG5jb25zdCBNT1VTRV9NT1ZFID0gJ21vdXNlbW92ZSc7XG5cbi8qXG4gICAgU2NyYXBlIHgveSBjb29yZGluYXRlcyBmcm9tIHByb3ZpZGVkIGV2ZW50XG5cbiAgICBAcGFyYW0gW2V2ZW50XVxuICAgIEByZXR1cm4gW29iamVjdF1cbiovXG5jb25zdCBldmVudFRvUG9pbnQgPSAoZSkgPT4gKHtcbiAgICB4OiBlLnBhZ2VYLFxuICAgIHk6IGUucGFnZVlcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNb3VzZSBleHRlbmRzIElucHV0IHtcbiAgICBjb25zdHJ1Y3RvcihlKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuc3RhdGUgPSBldmVudFRvUG9pbnQoZSk7XG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xuICAgIH1cblxuICAgIGxhdGVzdChlKSB7XG4gICAgICAgIHN1cGVyLmxhdGVzdChldmVudFRvUG9pbnQoZSkpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5hZGRFdmVudExpc3RlbmVyKE1PVVNFX01PVkUsIHRoaXMub25Nb3ZlKTtcbiAgICB9XG5cbiAgICBzdG9wKCkge1xuICAgICAgICBzdXBlci5zdG9wKCk7XG4gICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKE1PVVNFX01PVkUsIHRoaXMub25Nb3ZlKTtcbiAgICB9XG59Il19
return exports;
})();
var __small$_9 = (function() {
var exports = {};
'use strict';

exports.__esModule = true;

var _Input2 = __small$_7;

var _Input3 = _interopRequireDefault(_Input2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TOUCH_MOVE = 'touchmove';

/*
    Scrape x/y coordinates from provided event

    @param [event]
    @return [object]
*/
var eventToPoint = function (_ref) {
    var changedTouches = _ref.changedTouches;
    return {
        x: changedTouches[0].clientX,
        y: changedTouches[0].clientY
    };
};

var Touch = function (_Input) {
    _inherits(Touch, _Input);

    function Touch(e) {
        _classCallCheck(this, Touch);

        var _this = _possibleConstructorReturn(this, _Input.call(this));

        _this.state = eventToPoint(e);
        _this.bindEvents();
        return _this;
    }

    Touch.prototype.latest = function latest(e) {
        _Input.prototype.latest.call(this, eventToPoint(e));
        e.preventDefault();
    };

    Touch.prototype.start = function start() {
        _Input.prototype.start.call(this);
        document.documentElement.addEventListener(TOUCH_MOVE, this.latest);
    };

    Touch.prototype.stop = function stop() {
        _Input.prototype.stop.call(this);
        document.documentElement.removeEventListener(TOUCH_MOVE, this.latest);
    };

    return Touch;
}(_Input3.default);

exports.default = Touch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbnB1dC9Ub3VjaC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsSUFBTSxhQUFhLFdBQWI7Ozs7Ozs7O0FBUU4sSUFBTSxlQUFlO1FBQUc7V0FBc0I7QUFDMUMsV0FBRyxlQUFlLENBQWYsRUFBa0IsT0FBbEI7QUFDSCxXQUFHLGVBQWUsQ0FBZixFQUFrQixPQUFsQjs7Q0FGYzs7SUFLQTs7O0FBQ2pCLGFBRGlCLEtBQ2pCLENBQVksQ0FBWixFQUFlOzhCQURFLE9BQ0Y7O3FEQUNYLG1CQURXOztBQUVYLGNBQUssS0FBTCxHQUFhLGFBQWEsQ0FBYixDQUFiLENBRlc7QUFHWCxjQUFLLFVBQUwsR0FIVzs7S0FBZjs7QUFEaUIsb0JBT2pCLHlCQUFPLEdBQUc7QUFDTix5QkFBTSxNQUFOLFlBQWEsYUFBYSxDQUFiLENBQWIsRUFETTtBQUVOLFVBQUUsY0FBRixHQUZNOzs7QUFQTyxvQkFZakIseUJBQVE7QUFDSix5QkFBTSxLQUFOLFlBREk7QUFFSixpQkFBUyxlQUFULENBQXlCLGdCQUF6QixDQUEwQyxVQUExQyxFQUFzRCxLQUFLLE1BQUwsQ0FBdEQsQ0FGSTs7O0FBWlMsb0JBaUJqQix1QkFBTztBQUNILHlCQUFNLElBQU4sWUFERztBQUVILGlCQUFTLGVBQVQsQ0FBeUIsbUJBQXpCLENBQTZDLFVBQTdDLEVBQXlELEtBQUssTUFBTCxDQUF6RCxDQUZHOzs7V0FqQlUiLCJmaWxlIjoiVG91Y2guanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgSW5wdXQgZnJvbSAnLi9JbnB1dCc7XG5cbmNvbnN0IFRPVUNIX01PVkUgPSAndG91Y2htb3ZlJztcblxuLypcbiAgICBTY3JhcGUgeC95IGNvb3JkaW5hdGVzIGZyb20gcHJvdmlkZWQgZXZlbnRcblxuICAgIEBwYXJhbSBbZXZlbnRdXG4gICAgQHJldHVybiBbb2JqZWN0XVxuKi9cbmNvbnN0IGV2ZW50VG9Qb2ludCA9ICh7IGNoYW5nZWRUb3VjaGVzIH0pID0+ICh7XG4gICAgeDogY2hhbmdlZFRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICB5OiBjaGFuZ2VkVG91Y2hlc1swXS5jbGllbnRZXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVG91Y2ggZXh0ZW5kcyBJbnB1dCB7XG4gICAgY29uc3RydWN0b3IoZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnN0YXRlID0gZXZlbnRUb1BvaW50KGUpO1xuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBsYXRlc3QoZSkge1xuICAgICAgICBzdXBlci5sYXRlc3QoZXZlbnRUb1BvaW50KGUpKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICBzdXBlci5zdGFydCgpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihUT1VDSF9NT1ZFLCB0aGlzLmxhdGVzdCk7XG4gICAgfVxuXG4gICAgc3RvcCgpIHtcbiAgICAgICAgc3VwZXIuc3RvcCgpO1xuICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihUT1VDSF9NT1ZFLCB0aGlzLmxhdGVzdCk7XG4gICAgfVxufSJdfQ==
return exports;
})();
'use strict';

exports.__esModule = true;
exports.stagger = exports.setDilation = exports.createMapTransform = exports.utils = exports.calc = exports.Touch = exports.Mouse = exports.Input = exports.Track = exports.Physics = exports.Tween = exports.Action = exports.Actor = undefined;

var _Actor2 = ((function() {
var exports = {};
'use strict';

exports.__esModule = true;

var _Action2 = __small$_3;

var _Action3 = _interopRequireDefault(_Action2);

var _utils = __small$_11;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Actor = function (_Action) {
    _inherits(Actor, _Action);

    function Actor() {
        _classCallCheck(this, Actor);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, _Action.call.apply(_Action, [this].concat(args)));

        _this.once();
        return _this;
    }

    Actor.prototype.do = function _do(action) {
        if (this.reducer) {
            this.start(this.reducer(action, this.values));
        }
    };

    Actor.prototype.start = function start(action) {
        _Action.prototype.start.call(this);
        var actionInstance = action.inherit();

        // Assign action to appropriate values

        return actionInstance;
    };

    Actor.prototype.willRender = function willRender(actor, frameStamp, elapsed) {
        var _this2 = this;

        var hasChanged = false;

        (0, _utils.each)(this.values, function (value, key) {
            var updatedValue = value.current;

            // Update value based on active action
            if (value.action) {
                updatedValue = value.action.values[key].current;
            }

            // Run transform function (if present)
            if (value.transform) {
                updatedValue = value.transform(updatedValue, key, _this2);
            }

            // Smooth value if we have smoothing
            if (value.smooth) {
                updatedValue = calc.smooth(updatedValue, value.current, elapsed, value.smooth);
            }

            if (value.round) {
                updatedValue = Math.round(updatedValue);
            }

            value.velocity = (0, _utils.speedPerSecond)(updatedValue - value.current, elapsed);

            if (updatedValue !== value.current) {
                hasChanged = true;
            }

            value.current = updatedValue;

            // Update state
            if (value.unit) {
                var valueWithUnit = updatedValue + value.unit;
            }

            // Add straight to state if no parent
            if (!value.parent) {
                var mappedKey = _this2.onRender && _this2.onRender.stateMap ? _this2.onRender.stateMap[key] : key;
                _this2.state[key] = updatedValue;

                // Or add to parent
            } else {
                    _this2.values[value.parent].children[key] = updatedValue;
                }
        });

        return hasChanged;
    };

    Actor.prototype.preRender = function preRender() {
        // process parent values
    };

    return Actor;
}(_Action3.default);

exports.default = Actor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rvci9BY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHcUI7OztBQUNqQixhQURpQixLQUNqQixHQUFxQjs4QkFESixPQUNJOzswQ0FBTjs7U0FBTTs7cURBQ2pCLDBDQUFTLEtBQVQsR0FEaUI7O0FBRWpCLGNBQUssSUFBTCxHQUZpQjs7S0FBckI7O0FBRGlCLG9CQU1qQixrQkFBRyxRQUFRO0FBQ1AsWUFBSSxLQUFLLE9BQUwsRUFBYztBQUNkLGlCQUFLLEtBQUwsQ0FBVyxLQUFLLE9BQUwsQ0FBYSxNQUFiLEVBQXFCLEtBQUssTUFBTCxDQUFoQyxFQURjO1NBQWxCOzs7QUFQYSxvQkFZakIsdUJBQU0sUUFBUTtBQUNWLDBCQUFNLEtBQU4sWUFEVTtBQUVWLFlBQU0saUJBQWlCLE9BQU8sT0FBUCxFQUFqQjs7OztBQUZJLGVBTUgsY0FBUCxDQU5VOzs7QUFaRyxvQkFxQmpCLGlDQUFXLE9BQU8sWUFBWSxTQUFTOzs7QUFDbkMsWUFBSSxhQUFhLEtBQWIsQ0FEK0I7O0FBR25DLG1CQTFCQyxLQTBCRCxDQUFLLEtBQUssTUFBTCxFQUFhLFVBQUMsS0FBRCxFQUFRLEdBQVIsRUFBZ0I7QUFDOUIsZ0JBQUksZUFBZSxNQUFNLE9BQU47OztBQURXLGdCQUkxQixNQUFNLE1BQU4sRUFBYztBQUNkLCtCQUFlLE1BQU0sTUFBTixDQUFhLE1BQWIsQ0FBb0IsR0FBcEIsRUFBeUIsT0FBekIsQ0FERDthQUFsQjs7O0FBSjhCLGdCQVMxQixNQUFNLFNBQU4sRUFBaUI7QUFDakIsK0JBQWUsTUFBTSxTQUFOLENBQWdCLFlBQWhCLEVBQThCLEdBQTlCLFNBQWYsQ0FEaUI7YUFBckI7OztBQVQ4QixnQkFjMUIsTUFBTSxNQUFOLEVBQWM7QUFDZCwrQkFBZSxLQUFLLE1BQUwsQ0FBWSxZQUFaLEVBQTBCLE1BQU0sT0FBTixFQUFlLE9BQXpDLEVBQWtELE1BQU0sTUFBTixDQUFqRSxDQURjO2FBQWxCOztBQUlBLGdCQUFJLE1BQU0sS0FBTixFQUFhO0FBQ2IsK0JBQWUsS0FBSyxLQUFMLENBQVcsWUFBWCxDQUFmLENBRGE7YUFBakI7O0FBSUEsa0JBQU0sUUFBTixHQUFpQixXQWhEZCxlQWdEYyxDQUFlLGVBQWUsTUFBTSxPQUFOLEVBQWUsT0FBN0MsQ0FBakIsQ0F0QjhCOztBQXdCOUIsZ0JBQUksaUJBQWlCLE1BQU0sT0FBTixFQUFlO0FBQ2hDLDZCQUFhLElBQWIsQ0FEZ0M7YUFBcEM7O0FBSUEsa0JBQU0sT0FBTixHQUFnQixZQUFoQjs7O0FBNUI4QixnQkErQjFCLE1BQU0sSUFBTixFQUFZO0FBQ1osb0JBQU0sZ0JBQWdCLGVBQWUsTUFBTSxJQUFOLENBRHpCO2FBQWhCOzs7QUEvQjhCLGdCQW9DMUIsQ0FBQyxNQUFNLE1BQU4sRUFBYztBQUNmLG9CQUFNLFlBQVksTUFBQyxDQUFLLFFBQUwsSUFBaUIsT0FBSyxRQUFMLENBQWMsUUFBZCxHQUEwQixPQUFLLFFBQUwsQ0FBYyxRQUFkLENBQXVCLEdBQXZCLENBQTVDLEdBQTBFLEdBQTFFLENBREg7QUFFZix1QkFBSyxLQUFMLENBQVcsR0FBWCxJQUFrQixZQUFsQjs7O0FBRmUsYUFBbkIsTUFLTztBQUNILDJCQUFLLE1BQUwsQ0FBWSxNQUFNLE1BQU4sQ0FBWixDQUEwQixRQUExQixDQUFtQyxHQUFuQyxJQUEwQyxZQUExQyxDQURHO2lCQUxQO1NBcENjLENBQWxCLENBSG1DOztBQWlEbkMsZUFBTyxVQUFQLENBakRtQzs7O0FBckJ0QixvQkF5RWpCLGlDQUFZOzs7O1dBekVLIiwiZmlsZSI6IkFjdG9yLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFjdGlvbiBmcm9tICcuLi9hY3Rpb25zL0FjdGlvbic7XG5pbXBvcnQgeyBlYWNoLCBzcGVlZFBlclNlY29uZCB9IGZyb20gJy4uL2luYy91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEFjdG9yIGV4dGVuZHMgQWN0aW9uIHtcbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLm9uY2UoKTtcbiAgICB9XG5cbiAgICBkbyhhY3Rpb24pIHtcbiAgICAgICAgaWYgKHRoaXMucmVkdWNlcikge1xuICAgICAgICAgICAgdGhpcy5zdGFydCh0aGlzLnJlZHVjZXIoYWN0aW9uLCB0aGlzLnZhbHVlcykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc3RhcnQoYWN0aW9uKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG4gICAgICAgIGNvbnN0IGFjdGlvbkluc3RhbmNlID0gYWN0aW9uLmluaGVyaXQoKTtcblxuICAgICAgICAvLyBBc3NpZ24gYWN0aW9uIHRvIGFwcHJvcHJpYXRlIHZhbHVlc1xuXG4gICAgICAgIHJldHVybiBhY3Rpb25JbnN0YW5jZTtcbiAgICB9XG5cbiAgICB3aWxsUmVuZGVyKGFjdG9yLCBmcmFtZVN0YW1wLCBlbGFwc2VkKSB7XG4gICAgICAgIGxldCBoYXNDaGFuZ2VkID0gZmFsc2U7XG5cbiAgICAgICAgZWFjaCh0aGlzLnZhbHVlcywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGxldCB1cGRhdGVkVmFsdWUgPSB2YWx1ZS5jdXJyZW50O1xuXG4gICAgICAgICAgICAvLyBVcGRhdGUgdmFsdWUgYmFzZWQgb24gYWN0aXZlIGFjdGlvblxuICAgICAgICAgICAgaWYgKHZhbHVlLmFjdGlvbikge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWRWYWx1ZSA9IHZhbHVlLmFjdGlvbi52YWx1ZXNba2V5XS5jdXJyZW50O1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBSdW4gdHJhbnNmb3JtIGZ1bmN0aW9uIChpZiBwcmVzZW50KVxuICAgICAgICAgICAgaWYgKHZhbHVlLnRyYW5zZm9ybSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWRWYWx1ZSA9IHZhbHVlLnRyYW5zZm9ybSh1cGRhdGVkVmFsdWUsIGtleSwgdGhpcyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIFNtb290aCB2YWx1ZSBpZiB3ZSBoYXZlIHNtb290aGluZ1xuICAgICAgICAgICAgaWYgKHZhbHVlLnNtb290aCkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWRWYWx1ZSA9IGNhbGMuc21vb3RoKHVwZGF0ZWRWYWx1ZSwgdmFsdWUuY3VycmVudCwgZWxhcHNlZCwgdmFsdWUuc21vb3RoKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHZhbHVlLnJvdW5kKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZFZhbHVlID0gTWF0aC5yb3VuZCh1cGRhdGVkVmFsdWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YWx1ZS52ZWxvY2l0eSA9IHNwZWVkUGVyU2Vjb25kKHVwZGF0ZWRWYWx1ZSAtIHZhbHVlLmN1cnJlbnQsIGVsYXBzZWQpO1xuXG4gICAgICAgICAgICBpZiAodXBkYXRlZFZhbHVlICE9PSB2YWx1ZS5jdXJyZW50KSB7XG4gICAgICAgICAgICAgICAgaGFzQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhbHVlLmN1cnJlbnQgPSB1cGRhdGVkVmFsdWU7XG5cbiAgICAgICAgICAgIC8vIFVwZGF0ZSBzdGF0ZVxuICAgICAgICAgICAgaWYgKHZhbHVlLnVuaXQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZVdpdGhVbml0ID0gdXBkYXRlZFZhbHVlICsgdmFsdWUudW5pdDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gQWRkIHN0cmFpZ2h0IHRvIHN0YXRlIGlmIG5vIHBhcmVudFxuICAgICAgICAgICAgaWYgKCF2YWx1ZS5wYXJlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBtYXBwZWRLZXkgPSAodGhpcy5vblJlbmRlciAmJiB0aGlzLm9uUmVuZGVyLnN0YXRlTWFwKSA/IHRoaXMub25SZW5kZXIuc3RhdGVNYXBba2V5XSA6IGtleTtcbiAgICAgICAgICAgICAgICB0aGlzLnN0YXRlW2tleV0gPSB1cGRhdGVkVmFsdWU7XG5cbiAgICAgICAgICAgIC8vIE9yIGFkZCB0byBwYXJlbnRcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNbdmFsdWUucGFyZW50XS5jaGlsZHJlbltrZXldID0gdXBkYXRlZFZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gaGFzQ2hhbmdlZDtcbiAgICB9XG5cbiAgICBwcmVSZW5kZXIoKSB7XG4gICAgICAgIC8vIHByb2Nlc3MgcGFyZW50IHZhbHVlc1xuICAgIH1cbn0iXX0=
return exports;
})());

var _Actor3 = _interopRequireDefault(_Actor2);

var _Action2 = __small$_3;

var _Action3 = _interopRequireDefault(_Action2);

var _Tween2 = ((function() {
var exports = {};
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _Action2 = __small$_3;

var _Action3 = _interopRequireDefault(_Action2);

var _presetEasing = __small$_16;

var _presetEasing2 = _interopRequireDefault(_presetEasing);

var _utils = __small$_11;

var _calc = __small$_10;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var COUNT = 'Count';
var NEXT_STEPS = {
    loop: 'restart',
    yoyo: 'reverse',
    flip: 'flipValues'
};

/*
    Ease value within ranged parameters
    
    @param [number]: Progress between 0 and 1
    @param [number]: Value of 0 progress
    @param [number]: Value of 1 progress
    @param [string || function]: Name of preset easing
        to use or generated easing function
    @return [number]: Value of eased progress in range
*/
function ease(progress, from, to, ease) {
    var progressLimited = (0, _calc.restrict)(progress, 0, 1);
    var easingFunction = (0, _utils.isString)(ease) ? _presetEasing2.default[ease] : ease;
    var easedProgress = easingFunction(progressLimited);

    return (0, _calc.getValueFromProgress)(easedProgress, from, to);
};

var Tween = function (_Action) {
    _inherits(Tween, _Action);

    function Tween() {
        _classCallCheck(this, Tween);

        return _possibleConstructorReturn(this, _Action.apply(this, arguments));
    }

    Tween.prototype.start = function start() {
        _Action.prototype.start.call(this);
        this.elapsed = 0;
        this.flipCount = this.yoyoCount = this.loopCount = 0;
    };

    Tween.prototype.onUpdate = function onUpdate(tween, frameStamp, elapsed) {
        var _this2 = this;

        var progressTarget = this.playDirection === 1 ? 1 : 0;

        this.ended = true;
        this.elapsed += elapsed * this.dilate * this.playDirection;

        (0, _utils.each)(this.values, function (value, key) {
            var progress = (0, _calc.restrict)((0, _calc.getProgressFromValue)(_this2.elapsed - value.delay, 0, value.duration), 0, 1);

            // Mark Tween as NOT ended if still in progress
            if (progress !== progressTarget) {
                _this2.ended = false;
            }

            // Step progress if we're stepping
            if (value.steps) {
                progress = (0, _calc.stepProgress)(progress, value.steps);
            }

            // Ease progress
            value.current = ease(progress, value.from, value.to, value.ease);
        });
    };

    Tween.prototype.onFrameEnd = function onFrameEnd() {
        var _this3 = this;

        if (this.ended) {
            var stepTaken = false;

            (0, _utils.each)(NEXT_STEPS, function (method, step) {
                var maxSteps = _this3[step];

                if (maxSteps === true || (0, _utils.isNum)(maxSteps) && maxSteps > _this3[step + COUNT]) {
                    _this3[step + COUNT]++;
                    stepTaken = true;
                    _this3[method]();
                }
            });

            if (!stepTaken) {
                this.stop();
            }
        }
    };

    Tween.prototype.flipValues = function flipValues() {
        this.elapsed = this.duration - this.elapsed;

        (0, _utils.each)(this.values, function (value, key) {
            var _ref = [value.from, value.to];
            value.to = _ref[0];
            value.from = _ref[1];
        });
    };

    Tween.prototype.reverse = function reverse() {
        this.playDirection *= -1;
    };

    Tween.prototype.restart = function restart() {
        this.elapsed = this.playDirection === 1 ? 0 : this.duration;
        this.started = (0, _utils.currentTime)();
    };

    Tween.prototype.seek = function seek(progress) {
        this.once();
        this.elapsed = this.duration * progress;
    };

    Tween.prototype.getDefaultProps = function getDefaultProps() {
        return _extends({}, _Action.prototype.getDefaultProps.call(this), {
            delay: 0,
            dilate: 1,
            duration: 300,
            loop: false,
            yoyo: false,
            flip: false,
            playDirection: 1,
            ended: false,
            elapsed: 0
        });
    };

    Tween.prototype.getDefaultValue = function getDefaultValue() {
        return _extends({}, _Action.prototype.getDefaultValue.call(this), {
            delay: 0,
            duration: 300,
            ease: 'easeOut',
            elapsed: 0,
            stagger: 0,
            steps: 0,
            from: 0,
            to: 0,
            round: false
        });
    };

    Tween.prototype.getDefaultValueProp = function getDefaultValueProp() {
        return 'to';
    };

    return Tween;
}(_Action3.default);

exports.default = Tween;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL1R3ZWVuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsSUFBTSxRQUFRLE9BQVI7QUFDTixJQUFNLGFBQWE7QUFDZixVQUFNLFNBQU47QUFDQSxVQUFNLFNBQU47QUFDQSxVQUFNLFlBQU47Q0FIRTs7Ozs7Ozs7Ozs7O0FBZ0JOLFNBQVMsSUFBVCxDQUFjLFFBQWQsRUFBd0IsSUFBeEIsRUFBOEIsRUFBOUIsRUFBa0MsSUFBbEMsRUFBd0M7QUFDcEMsUUFBTSxrQkFBa0IsVUF4QnhCLFNBd0J3QixDQUFTLFFBQVQsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsQ0FBbEIsQ0FEOEI7QUFFcEMsUUFBTSxpQkFBaUIsV0E1QnZCLFNBNEJ1QixDQUFTLElBQVQsSUFBaUIsdUJBQWEsSUFBYixDQUFqQixHQUFzQyxJQUF0QyxDQUZhO0FBR3BDLFFBQU0sZ0JBQWdCLGVBQWUsZUFBZixDQUFoQixDQUg4Qjs7QUFLcEMsV0FBTyxVQTFCUCxxQkEwQk8sQ0FBcUIsYUFBckIsRUFBb0MsSUFBcEMsRUFBMEMsRUFBMUMsQ0FBUCxDQUxvQztDQUF4Qzs7SUFRcUI7Ozs7Ozs7OztvQkFDakIseUJBQVE7QUFDSiwwQkFBTSxLQUFOLFlBREk7QUFFSixhQUFLLE9BQUwsR0FBZSxDQUFmLENBRkk7QUFHSixhQUFLLFNBQUwsR0FBaUIsS0FBSyxTQUFMLEdBQWlCLEtBQUssU0FBTCxHQUFpQixDQUFqQixDQUg5Qjs7O0FBRFMsb0JBT2pCLDZCQUFTLE9BQU8sWUFBWSxTQUFTOzs7QUFDakMsWUFBTSxpQkFBaUIsSUFBQyxDQUFLLGFBQUwsS0FBdUIsQ0FBdkIsR0FBNEIsQ0FBN0IsR0FBaUMsQ0FBakMsQ0FEVTs7QUFHakMsYUFBSyxLQUFMLEdBQWEsSUFBYixDQUhpQztBQUlqQyxhQUFLLE9BQUwsSUFBZ0IsT0FBQyxHQUFVLEtBQUssTUFBTCxHQUFlLEtBQUssYUFBTCxDQUpUOztBQU1q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Q0Esa0JBQU0sQ0FBTjtBQUNBLGdCQUFJLENBQUo7QUFDQSxtQkFBTyxLQUFQO1VBVkosQ0FEYzs7O0FBeEZELG9CQXVHakIscURBQXNCO0FBQ2xCLGVBQU8sSUFBUCxDQURrQjs7O1dBdkdMIiwiZmlsZSI6IlR3ZWVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFjdGlvbiBmcm9tICcuL0FjdGlvbic7XG5pbXBvcnQgcHJlc2V0RWFzaW5nIGZyb20gJy4vdHdlZW4vcHJlc2V0LWVhc2luZyc7XG5pbXBvcnQge1xuICAgIGN1cnJlbnRUaW1lLFxuICAgIGVhY2gsXG4gICAgaXNOdW0sXG4gICAgaXNTdHJpbmdcbn0gZnJvbSAnLi4vaW5jL3V0aWxzJztcbmltcG9ydCB7XG4gICAgcmVzdHJpY3QsXG4gICAgZ2V0UHJvZ3Jlc3NGcm9tVmFsdWUsXG4gICAgZ2V0VmFsdWVGcm9tUHJvZ3Jlc3MsXG4gICAgc3RlcFByb2dyZXNzXG59IGZyb20gJy4uL2luYy9jYWxjJztcblxuY29uc3QgQ09VTlQgPSAnQ291bnQnO1xuY29uc3QgTkVYVF9TVEVQUyA9IHtcbiAgICBsb29wOiAncmVzdGFydCcsXG4gICAgeW95bzogJ3JldmVyc2UnLFxuICAgIGZsaXA6ICdmbGlwVmFsdWVzJ1xufTtcblxuLypcbiAgICBFYXNlIHZhbHVlIHdpdGhpbiByYW5nZWQgcGFyYW1ldGVyc1xuICAgIFxuICAgIEBwYXJhbSBbbnVtYmVyXTogUHJvZ3Jlc3MgYmV0d2VlbiAwIGFuZCAxXG4gICAgQHBhcmFtIFtudW1iZXJdOiBWYWx1ZSBvZiAwIHByb2dyZXNzXG4gICAgQHBhcmFtIFtudW1iZXJdOiBWYWx1ZSBvZiAxIHByb2dyZXNzXG4gICAgQHBhcmFtIFtzdHJpbmcgfHwgZnVuY3Rpb25dOiBOYW1lIG9mIHByZXNldCBlYXNpbmdcbiAgICAgICAgdG8gdXNlIG9yIGdlbmVyYXRlZCBlYXNpbmcgZnVuY3Rpb25cbiAgICBAcmV0dXJuIFtudW1iZXJdOiBWYWx1ZSBvZiBlYXNlZCBwcm9ncmVzcyBpbiByYW5nZVxuKi8gXG5mdW5jdGlvbiBlYXNlKHByb2dyZXNzLCBmcm9tLCB0bywgZWFzZSkge1xuICAgIGNvbnN0IHByb2dyZXNzTGltaXRlZCA9IHJlc3RyaWN0KHByb2dyZXNzLCAwLCAxKTtcbiAgICBjb25zdCBlYXNpbmdGdW5jdGlvbiA9IGlzU3RyaW5nKGVhc2UpID8gcHJlc2V0RWFzaW5nW2Vhc2VdIDogZWFzZTtcbiAgICBjb25zdCBlYXNlZFByb2dyZXNzID0gZWFzaW5nRnVuY3Rpb24ocHJvZ3Jlc3NMaW1pdGVkKTtcblxuICAgIHJldHVybiBnZXRWYWx1ZUZyb21Qcm9ncmVzcyhlYXNlZFByb2dyZXNzLCBmcm9tLCB0byk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUd2VlbiBleHRlbmRzIEFjdGlvbiB7XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9IDA7XG4gICAgICAgIHRoaXMuZmxpcENvdW50ID0gdGhpcy55b3lvQ291bnQgPSB0aGlzLmxvb3BDb3VudCA9IDA7XG4gICAgfVxuXG4gICAgb25VcGRhdGUodHdlZW4sIGZyYW1lU3RhbXAsIGVsYXBzZWQpIHtcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NUYXJnZXQgPSAodGhpcy5wbGF5RGlyZWN0aW9uID09PSAxKSA/IDEgOiAwO1xuXG4gICAgICAgIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmVsYXBzZWQgKz0gKGVsYXBzZWQgKiB0aGlzLmRpbGF0ZSkgKiB0aGlzLnBsYXlEaXJlY3Rpb247XG5cbiAgICAgICAgZWFjaCh0aGlzLnZhbHVlcywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHJlc3RyaWN0KGdldFByb2dyZXNzRnJvbVZhbHVlKHRoaXMuZWxhcHNlZCAtIHZhbHVlLmRlbGF5LCAwLCB2YWx1ZS5kdXJhdGlvbiksIDAsIDEpO1xuXG4gICAgICAgICAgICAvLyBNYXJrIFR3ZWVuIGFzIE5PVCBlbmRlZCBpZiBzdGlsbCBpbiBwcm9ncmVzc1xuICAgICAgICAgICAgaWYgKHByb2dyZXNzICE9PSBwcm9ncmVzc1RhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU3RlcCBwcm9ncmVzcyBpZiB3ZSdyZSBzdGVwcGluZ1xuICAgICAgICAgICAgaWYgKHZhbHVlLnN0ZXBzKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSBzdGVwUHJvZ3Jlc3MocHJvZ3Jlc3MsIHZhbHVlLnN0ZXBzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRWFzZSBwcm9ncmVzc1xuICAgICAgICAgICAgdmFsdWUuY3VycmVudCA9IGVhc2UocHJvZ3Jlc3MsIHZhbHVlLmZyb20sIHZhbHVlLnRvLCB2YWx1ZS5lYXNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25GcmFtZUVuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5kZWQpIHtcbiAgICAgICAgICAgIGxldCBzdGVwVGFrZW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgZWFjaChORVhUX1NURVBTLCAobWV0aG9kLCBzdGVwKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4U3RlcHMgPSB0aGlzW3N0ZXBdO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1heFN0ZXBzID09PSB0cnVlIHx8IChpc051bShtYXhTdGVwcykgJiYgbWF4U3RlcHMgPiB0aGlzW3N0ZXAgKyBDT1VOVF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbc3RlcCArIENPVU5UXSsrO1xuICAgICAgICAgICAgICAgICAgICBzdGVwVGFrZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzW21ldGhvZF0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFzdGVwVGFrZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZsaXBWYWx1ZXMoKSB7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9IHRoaXMuZHVyYXRpb24gLSB0aGlzLmVsYXBzZWQ7XG5cbiAgICAgICAgZWFjaCh0aGlzLnZhbHVlcywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIFt2YWx1ZS50bywgdmFsdWUuZnJvbV0gPSBbdmFsdWUuZnJvbSwgdmFsdWUudG9dO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXZlcnNlKCkge1xuICAgICAgICB0aGlzLnBsYXlEaXJlY3Rpb24gKj0gLTE7XG4gICAgfVxuXG4gICAgcmVzdGFydCgpIHtcbiAgICAgICAgdGhpcy5lbGFwc2VkID0gKHRoaXMucGxheURpcmVjdGlvbiA9PT0gMSkgPyAwIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdGhpcy5zdGFydGVkID0gY3VycmVudFRpbWUoKTtcbiAgICB9XG5cbiAgICBzZWVrKHByb2dyZXNzKSB7XG4gICAgICAgIHRoaXMub25jZSgpO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSB0aGlzLmR1cmF0aW9uICogcHJvZ3Jlc3M7XG4gICAgfVxuICAgIFxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnN1cGVyLmdldERlZmF1bHRQcm9wcygpLFxuICAgICAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgICAgICBkaWxhdGU6IDEsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICB5b3lvOiBmYWxzZSxcbiAgICAgICAgICAgIGZsaXA6IGZhbHNlLFxuICAgICAgICAgICAgcGxheURpcmVjdGlvbjogMSxcbiAgICAgICAgICAgIGVuZGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGVsYXBzZWQ6IDBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXREZWZhdWx0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdXBlci5nZXREZWZhdWx0VmFsdWUoKSxcbiAgICAgICAgICAgIGRlbGF5OiAwLFxuICAgICAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgICAgIGVhc2U6ICdlYXNlT3V0JyxcbiAgICAgICAgICAgIGVsYXBzZWQ6IDAsXG4gICAgICAgICAgICBzdGFnZ2VyOiAwLFxuICAgICAgICAgICAgc3RlcHM6IDAsXG4gICAgICAgICAgICBmcm9tOiAwLFxuICAgICAgICAgICAgdG86IDAsXG4gICAgICAgICAgICByb3VuZDogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXREZWZhdWx0VmFsdWVQcm9wKCkge1xuICAgICAgICByZXR1cm4gJ3RvJztcbiAgICB9XG59XG4iXX0=
return exports;
})());

var _Tween3 = _interopRequireDefault(_Tween2);

var _Physics2 = ((function() {
var exports = {};
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _Action2 = __small$_3;

var _Action3 = _interopRequireDefault(_Action2);

var _calc = __small$_10;

var _utils = __small$_11;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Physics = function (_Action) {
    _inherits(Physics, _Action);

    function Physics() {
        _classCallCheck(this, Physics);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var _this = _possibleConstructorReturn(this, _Action.call.apply(_Action, [this].concat(args)));

        _this.inactiveFrames = 0;
        return _this;
    }

    Physics.prototype.onUpdate = function onUpdate(physics, frameStamp, elapsed) {
        var _this2 = this;

        this.hasChanged = false;

        (0, _utils.each)(this.values, function (value, key) {
            var previousValue = value.current;

            // Apply acceleration
            value.velocity += (0, _calc.speedPerFrame)(value.force, elapsed);

            // Apply friction
            value.velocity *= Math.pow(1 - value.friction, elapsed / 10);

            // Apply spring
            if (value.spring && (0, _utils.isNum)(value.to)) {
                var distanceToTarget = value.to - value.current;
                value.velocity += distanceToTarget * (0, _calc.speedPerFrame)(value.spring, elapsed);
            }

            // Apply latest velocity
            value.current += (0, _calc.speedPerFrame)(value.velocity, elapsed);

            // Check if value has changed
            if (value.current !== previousValue || Math.abs(value.velocity) >= value.stopSpeed) {
                _this2.hasChanged = true;
            }
        });
    };

    Physics.prototype.onFrameEnd = function onFrameEnd() {
        if (this.autoEnd) {
            this.inactiveFrames = this.hasChanged ? 1 : this.inactiveFrames + 1;

            if (this.inactiveFrames >= this.maxInactiveFrames) {
                this.stop();
            }
        }
    };

    /*
        # Get default Simulate props
         @return [object]
    */

    Physics.prototype.getDefaultProps = function getDefaultProps() {
        return _extends({}, _Action.prototype.getDefaultProps.call(this), {
            autoEnd: true,
            maxInactiveFrames: 3
        });
    };

    /*
        # Get default Simulate value props
         @return [object]
    */

    Physics.prototype.getDefaultValue = function getDefaultValue() {
        return _extends({}, _Action.prototype.getDefaultValue.call(this), {
            force: 0, // [number]: Acceleration to apply to value, in units per second
            bounce: 0, // [number]: Factor to multiply velocity by on bounce
            spring: 0, // [number]: Spring strength during 'string'
            stopSpeed: 0.0001, // [number]: Stop simulation under this speed
            friction: 0 // [number]: Friction to apply per frame, 0-1
        });
    };

    /*
        # Get default Simulate value property name
        ## Set values to this when a `value` is not provided as an object
         @return [string]
    */

    Physics.prototype.getDefaultValueProp = function getDefaultValueProp() {
        return 'velocity';
    };

    return Physics;
}(_Action3.default);

exports.default = Physics;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL1BoeXNpY3MuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUlxQjs7O0FBRWpCLGFBRmlCLE9BRWpCLEdBQXFCOzhCQUZKLFNBRUk7OzBDQUFOOztTQUFNOztxREFDakIsMENBQVMsS0FBVCxHQURpQjs7QUFFakIsY0FBSyxjQUFMLEdBQXNCLENBQXRCLENBRmlCOztLQUFyQjs7QUFGaUIsc0JBT2pCLDZCQUFTLFNBQVMsWUFBWSxTQUFTOzs7QUFDbkMsYUFBSyxVQUFMLEdBQWtCLEtBQWxCLENBRG1DOztBQUduQyxtQkFaQyxLQVlELENBQUssS0FBSyxNQUFMLEVBQWEsVUFBQyxLQUFELEVBQVEsR0FBUixFQUFnQjtBQUM5QixnQkFBTSxnQkFBZ0IsTUFBTSxPQUFOOzs7QUFEUSxpQkFJOUIsQ0FBTSxRQUFOLElBQWtCLFVBakJyQixjQWlCcUIsQ0FBYyxNQUFNLEtBQU4sRUFBYSxPQUEzQixDQUFsQjs7O0FBSjhCLGlCQU85QixDQUFNLFFBQU4sYUFBbUIsSUFBSSxNQUFNLFFBQU4sRUFBb0IsVUFBVSxFQUFWLENBQTNDOzs7QUFQOEIsZ0JBVTFCLE1BQU0sTUFBTixJQUFnQixXQXRCakIsTUFzQmlCLENBQU0sTUFBTSxFQUFOLENBQXRCLEVBQWlDO0FBQ2pDLG9CQUFNLG1CQUFtQixNQUFNLEVBQU4sR0FBVyxNQUFNLE9BQU4sQ0FESDtBQUVqQyxzQkFBTSxRQUFOLElBQWtCLG1CQUFtQixVQXpCNUMsY0F5QjRDLENBQWMsTUFBTSxNQUFOLEVBQWMsT0FBNUIsQ0FBbkIsQ0FGZTthQUFyQzs7O0FBVjhCLGlCQWdCOUIsQ0FBTSxPQUFOLElBQWlCLFVBN0JwQixjQTZCb0IsQ0FBYyxNQUFNLFFBQU4sRUFBZ0IsT0FBOUIsQ0FBakI7OztBQWhCOEIsZ0JBbUIxQixNQUFNLE9BQU4sS0FBa0IsYUFBbEIsSUFBbUMsS0FBSyxHQUFMLENBQVMsTUFBTSxRQUFOLENBQVQsSUFBNEIsTUFBTSxTQUFOLEVBQWlCO0FBQ2hGLHVCQUFLLFVBQUwsR0FBa0IsSUFBbEIsQ0FEZ0Y7YUFBcEY7U0FuQmMsQ0FBbEIsQ0FIbUM7OztBQVB0QixzQkFtQ2pCLG1DQUFhO0FBQ1QsWUFBSSxLQUFLLE9BQUwsRUFBYztBQUNkLGlCQUFLLGNBQUwsR0FBc0IsS0FBSyxVQUFMLEdBQWtCLENBQWxCLEdBQXNCLEtBQUssY0FBTCxHQUFzQixDQUF0QixDQUQ5Qjs7QUFHZCxnQkFBSSxLQUFLLGNBQUwsSUFBdUIsS0FBSyxpQkFBTCxFQUF3QjtBQUMvQyxxQkFBSyxJQUFMLEdBRCtDO2FBQW5EO1NBSEo7Ozs7Ozs7O0FBcENhLHNCQWtEakIsNkNBQWtCO0FBQ2QsNEJBQ08sa0JBQU0sZUFBTjtBQUNILHFCQUFTLElBQVQ7QUFDQSwrQkFBbUIsQ0FBbkI7VUFISixDQURjOzs7Ozs7OztBQWxERCxzQkErRGpCLDZDQUFrQjtBQUNkLDRCQUNPLGtCQUFNLGVBQU47QUFDSCxtQkFBTyxDQUFQO0FBQ0Esb0JBQVEsQ0FBUjtBQUNBLG9CQUFRLENBQVI7QUFDQSx1QkFBVyxNQUFYO0FBQ0Esc0JBQVUsQ0FBVjtVQU5KLENBRGM7Ozs7Ozs7OztBQS9ERCxzQkFnRmpCLHFEQUFzQjtBQUNsQixlQUFPLFVBQVAsQ0FEa0I7OztXQWhGTCIsImZpbGUiOiJQaHlzaWNzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFjdGlvbiBmcm9tICcuL0FjdGlvbic7XG5pbXBvcnQgeyBzcGVlZFBlckZyYW1lLCBzcGVlZFBlclNlY29uZCB9IGZyb20gJy4uL2luYy9jYWxjJztcbmltcG9ydCB7IGVhY2gsIGlzTnVtIH0gZnJvbSAnLi4vaW5jL3V0aWxzJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUGh5c2ljcyBleHRlbmRzIEFjdGlvbiB7XG5cbiAgICBjb25zdHJ1Y3RvciguLi5hcmdzKSB7XG4gICAgICAgIHN1cGVyKC4uLmFyZ3MpO1xuICAgICAgICB0aGlzLmluYWN0aXZlRnJhbWVzID0gMDtcbiAgICB9XG5cbiAgICBvblVwZGF0ZShwaHlzaWNzLCBmcmFtZVN0YW1wLCBlbGFwc2VkKSB7XG4gICAgICAgIHRoaXMuaGFzQ2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgICAgIGVhY2godGhpcy52YWx1ZXMsICh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gdmFsdWUuY3VycmVudDtcblxuICAgICAgICAgICAgLy8gQXBwbHkgYWNjZWxlcmF0aW9uXG4gICAgICAgICAgICB2YWx1ZS52ZWxvY2l0eSArPSBzcGVlZFBlckZyYW1lKHZhbHVlLmZvcmNlLCBlbGFwc2VkKTtcblxuICAgICAgICAgICAgLy8gQXBwbHkgZnJpY3Rpb25cbiAgICAgICAgICAgIHZhbHVlLnZlbG9jaXR5ICo9ICgxIC0gdmFsdWUuZnJpY3Rpb24pICoqIChlbGFwc2VkIC8gMTApO1xuXG4gICAgICAgICAgICAvLyBBcHBseSBzcHJpbmdcbiAgICAgICAgICAgIGlmICh2YWx1ZS5zcHJpbmcgJiYgaXNOdW0odmFsdWUudG8pKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZGlzdGFuY2VUb1RhcmdldCA9IHZhbHVlLnRvIC0gdmFsdWUuY3VycmVudDtcbiAgICAgICAgICAgICAgICB2YWx1ZS52ZWxvY2l0eSArPSBkaXN0YW5jZVRvVGFyZ2V0ICogc3BlZWRQZXJGcmFtZSh2YWx1ZS5zcHJpbmcsIGVsYXBzZWQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBBcHBseSBsYXRlc3QgdmVsb2NpdHlcbiAgICAgICAgICAgIHZhbHVlLmN1cnJlbnQgKz0gc3BlZWRQZXJGcmFtZSh2YWx1ZS52ZWxvY2l0eSwgZWxhcHNlZCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIENoZWNrIGlmIHZhbHVlIGhhcyBjaGFuZ2VkXG4gICAgICAgICAgICBpZiAodmFsdWUuY3VycmVudCAhPT0gcHJldmlvdXNWYWx1ZSB8fCBNYXRoLmFicyh2YWx1ZS52ZWxvY2l0eSkgPj0gdmFsdWUuc3RvcFNwZWVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5oYXNDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25GcmFtZUVuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0b0VuZCkge1xuICAgICAgICAgICAgdGhpcy5pbmFjdGl2ZUZyYW1lcyA9IHRoaXMuaGFzQ2hhbmdlZCA/IDEgOiB0aGlzLmluYWN0aXZlRnJhbWVzICsgMTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaW5hY3RpdmVGcmFtZXMgPj0gdGhpcy5tYXhJbmFjdGl2ZUZyYW1lcykge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgIyBHZXQgZGVmYXVsdCBTaW11bGF0ZSBwcm9wc1xuXG4gICAgICAgIEByZXR1cm4gW29iamVjdF1cbiAgICAqL1xuICAgIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnN1cGVyLmdldERlZmF1bHRQcm9wcygpLFxuICAgICAgICAgICAgYXV0b0VuZDogdHJ1ZSxcbiAgICAgICAgICAgIG1heEluYWN0aXZlRnJhbWVzOiAzXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgLypcbiAgICAgICAgIyBHZXQgZGVmYXVsdCBTaW11bGF0ZSB2YWx1ZSBwcm9wc1xuXG4gICAgICAgIEByZXR1cm4gW29iamVjdF1cbiAgICAqL1xuICAgIGdldERlZmF1bHRWYWx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnN1cGVyLmdldERlZmF1bHRWYWx1ZSgpLFxuICAgICAgICAgICAgZm9yY2U6IDAsIC8vIFtudW1iZXJdOiBBY2NlbGVyYXRpb24gdG8gYXBwbHkgdG8gdmFsdWUsIGluIHVuaXRzIHBlciBzZWNvbmRcbiAgICAgICAgICAgIGJvdW5jZTogMCwgLy8gW251bWJlcl06IEZhY3RvciB0byBtdWx0aXBseSB2ZWxvY2l0eSBieSBvbiBib3VuY2VcbiAgICAgICAgICAgIHNwcmluZzogMCwgLy8gW251bWJlcl06IFNwcmluZyBzdHJlbmd0aCBkdXJpbmcgJ3N0cmluZydcbiAgICAgICAgICAgIHN0b3BTcGVlZDogMC4wMDAxLCAvLyBbbnVtYmVyXTogU3RvcCBzaW11bGF0aW9uIHVuZGVyIHRoaXMgc3BlZWRcbiAgICAgICAgICAgIGZyaWN0aW9uOiAwIC8vIFtudW1iZXJdOiBGcmljdGlvbiB0byBhcHBseSBwZXIgZnJhbWUsIDAtMVxuICAgICAgICB9O1xuICAgIH1cblxuICAgIC8qXG4gICAgICAgICMgR2V0IGRlZmF1bHQgU2ltdWxhdGUgdmFsdWUgcHJvcGVydHkgbmFtZVxuICAgICAgICAjIyBTZXQgdmFsdWVzIHRvIHRoaXMgd2hlbiBhIGB2YWx1ZWAgaXMgbm90IHByb3ZpZGVkIGFzIGFuIG9iamVjdFxuXG4gICAgICAgIEByZXR1cm4gW3N0cmluZ11cbiAgICAqL1xuICAgIGdldERlZmF1bHRWYWx1ZVByb3AoKSB7XG4gICAgICAgIHJldHVybiAndmVsb2NpdHknO1xuICAgIH1cbn1cbiJdfQ==
return exports;
})());

var _Physics3 = _interopRequireDefault(_Physics2);

var _Track2 = ((function() {
var exports = {};
'use strict';

exports.__esModule = true;

var _Action2 = __small$_3;

var _Action3 = _interopRequireDefault(_Action2);

var _Mouse = __small$_8;

var _Mouse2 = _interopRequireDefault(_Mouse);

var _Touch = __small$_9;

var _Touch2 = _interopRequireDefault(_Touch);

var _calc = __small$_10;

var _utils = __small$_11;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createPointer = function (e) {
    return e.touches ? new _Touch2.default(e) : new _Mouse2.default(e);
};
var getActualEvent = function (e) {
    return e.originalEvent || e;
};

var Track = function (_Action) {
    _inherits(Track, _Action);

    function Track(props, input) {
        _classCallCheck(this, Track);

        var _this = _possibleConstructorReturn(this, _Action.call(this, props));

        _this.input = input.state ? input : createPointer(getActualEvent(input));
        return _this;
    }

    Track.prototype.start = function start() {
        _Action.prototype.start.call(this);
        this.inputOrigin = {};
    };

    Track.prototype.onUpdate = function onUpdate(track, frameDuration, elapsed) {
        var _this2 = this;

        this.inputOffset = (0, _calc.offset)(this.inputOrigin, this.input.state);

        (0, _utils.each)(this.values, function (value, key) {
            if (_this2.inputOffset.hasOwnProperty(key)) {
                if (value.direct) {
                    value.current = _this2.input.state[key];
                } else {
                    value.current = value.origin + _this2.inputOffset[key];
                }
            }
        });
    };

    Track.prototype.getDefaultValue = function getDefaultValue() {
        return {
            amp: 1,
            escapeAmp: 0,
            direct: false,
            smooth: 0
        };
    };

    return Track;
}(_Action3.default);

exports.default = Track;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL1RyYWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFNQSxJQUFNLGdCQUFnQixVQUFDLENBQUQ7V0FBTyxFQUFFLE9BQUYsR0FBWSxvQkFBVSxDQUFWLENBQVosR0FBMkIsb0JBQVUsQ0FBVixDQUEzQjtDQUFQO0FBQ3RCLElBQU0saUJBQWlCLFVBQUMsQ0FBRDtXQUFPLEVBQUUsYUFBRixJQUFtQixDQUFuQjtDQUFQOztJQUVGOzs7QUFDakIsYUFEaUIsS0FDakIsQ0FBWSxLQUFaLEVBQW1CLEtBQW5CLEVBQTBCOzhCQURULE9BQ1M7O3FEQUN0QixtQkFBTSxLQUFOLEdBRHNCOztBQUV0QixjQUFLLEtBQUwsR0FBYSxNQUFNLEtBQU4sR0FBYyxLQUFkLEdBQXNCLGNBQWMsZUFBZSxLQUFmLENBQWQsQ0FBdEIsQ0FGUzs7S0FBMUI7O0FBRGlCLG9CQU1qQix5QkFBUTtBQUNKLDBCQUFNLEtBQU4sWUFESTtBQUVKLGFBQUssV0FBTCxHQUFtQixFQUFuQixDQUZJOzs7QUFOUyxvQkFXakIsNkJBQVMsT0FBTyxlQUFlLFNBQVM7OztBQUNwQyxhQUFLLFdBQUwsR0FBbUIsVUFsQmxCLE9Ba0JrQixDQUFPLEtBQUssV0FBTCxFQUFrQixLQUFLLEtBQUwsQ0FBVyxLQUFYLENBQTVDLENBRG9DOztBQUdwQyxtQkFuQkMsS0FtQkQsQ0FBSyxLQUFLLE1BQUwsRUFBYSxVQUFDLEtBQUQsRUFBUSxHQUFSLEVBQWdCO0FBQzlCLGdCQUFJLE9BQUssV0FBTCxDQUFpQixjQUFqQixDQUFnQyxHQUFoQyxDQUFKLEVBQTBDO0FBQ3RDLG9CQUFJLE1BQU0sTUFBTixFQUFjO0FBQ2QsMEJBQU0sT0FBTixHQUFnQixPQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLEdBQWpCLENBQWhCLENBRGM7aUJBQWxCLE1BRU87QUFDSCwwQkFBTSxPQUFOLEdBQWdCLE1BQU0sTUFBTixHQUFlLE9BQUssV0FBTCxDQUFpQixHQUFqQixDQUFmLENBRGI7aUJBRlA7YUFESjtTQURjLENBQWxCLENBSG9DOzs7QUFYdkIsb0JBeUJqQiw2Q0FBa0I7QUFDZCxlQUFPO0FBQ0gsaUJBQUssQ0FBTDtBQUNBLHVCQUFXLENBQVg7QUFDQSxvQkFBUSxLQUFSO0FBQ0Esb0JBQVEsQ0FBUjtTQUpKLENBRGM7OztXQXpCRCIsImZpbGUiOiJUcmFjay5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBY3Rpb24gZnJvbSAnLi9BY3Rpb24nO1xuaW1wb3J0IE1vdXNlIGZyb20gJy4uL2lucHV0L01vdXNlJztcbmltcG9ydCBUb3VjaCBmcm9tICcuLi9pbnB1dC9Ub3VjaCc7XG5pbXBvcnQgeyBvZmZzZXQgfSBmcm9tICcuLi9pbmMvY2FsYyc7XG5pbXBvcnQgeyBlYWNoIH0gZnJvbSAnLi4vaW5jL3V0aWxzJztcblxuY29uc3QgY3JlYXRlUG9pbnRlciA9IChlKSA9PiBlLnRvdWNoZXMgPyBuZXcgVG91Y2goZSkgOiBuZXcgTW91c2UoZSk7XG5jb25zdCBnZXRBY3R1YWxFdmVudCA9IChlKSA9PiBlLm9yaWdpbmFsRXZlbnQgfHwgZTtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVHJhY2sgZXh0ZW5kcyBBY3Rpb24ge1xuICAgIGNvbnN0cnVjdG9yKHByb3BzLCBpbnB1dCkge1xuICAgICAgICBzdXBlcihwcm9wcyk7XG4gICAgICAgIHRoaXMuaW5wdXQgPSBpbnB1dC5zdGF0ZSA/IGlucHV0IDogY3JlYXRlUG9pbnRlcihnZXRBY3R1YWxFdmVudChpbnB1dCkpO1xuICAgIH1cblxuICAgIHN0YXJ0KCkge1xuICAgICAgICBzdXBlci5zdGFydCgpO1xuICAgICAgICB0aGlzLmlucHV0T3JpZ2luID0ge307XG4gICAgfVxuXG4gICAgb25VcGRhdGUodHJhY2ssIGZyYW1lRHVyYXRpb24sIGVsYXBzZWQpIHtcbiAgICAgICAgdGhpcy5pbnB1dE9mZnNldCA9IG9mZnNldCh0aGlzLmlucHV0T3JpZ2luLCB0aGlzLmlucHV0LnN0YXRlKTtcblxuICAgICAgICBlYWNoKHRoaXMudmFsdWVzLCAodmFsdWUsIGtleSkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuaW5wdXRPZmZzZXQuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZS5kaXJlY3QpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFsdWUuY3VycmVudCA9IHRoaXMuaW5wdXQuc3RhdGVba2V5XTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZS5jdXJyZW50ID0gdmFsdWUub3JpZ2luICsgdGhpcy5pbnB1dE9mZnNldFtrZXldO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0RGVmYXVsdFZhbHVlKCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYW1wOiAxLFxuICAgICAgICAgICAgZXNjYXBlQW1wOiAwLFxuICAgICAgICAgICAgZGlyZWN0OiBmYWxzZSxcbiAgICAgICAgICAgIHNtb290aDogMFxuICAgICAgICB9O1xuICAgIH1cbn1cbiJdfQ==
return exports;
})());

var _Track3 = _interopRequireDefault(_Track2);

var _Input2 = __small$_7;

var _Input3 = _interopRequireDefault(_Input2);

var _Mouse2 = __small$_8;

var _Mouse3 = _interopRequireDefault(_Mouse2);

var _Touch2 = __small$_9;

var _Touch3 = _interopRequireDefault(_Touch2);

var _calc2 = __small$_10;

var _calc = _interopRequireWildcard(_calc2);

var _utils2 = __small$_11;

var _utils = _interopRequireWildcard(_utils2);

var _map = ((function() {
var exports = {};
'use strict';

exports.__esModule = true;

var _calc = __small$_10;

exports.default = createMapTransform = function (from, to) {
    var mapLength = from.length;

    return function (value) {
        for (var i = 1; i < mapLength; i++) {
            if (value < from[i] || i === mapLength) {
                return (0, _calc.getValueFromProgress)((0, _calc.restrict)((0, _calc.getProgressFromValue)(value, from[i - 1], from[i]), 0, 1), to[i - 1], to[i]);
            }
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc2Zvcm1lcnMvbWFwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztrQkFFZSxxQkFBcUIsVUFBQyxJQUFELEVBQU8sRUFBUCxFQUFjO0FBQzlDLFFBQU0sWUFBWSxLQUFLLE1BQUwsQ0FENEI7O0FBRzlDLFdBQU8sVUFBQyxLQUFELEVBQVc7QUFDZCxhQUFLLElBQUksSUFBSSxDQUFKLEVBQU8sSUFBSSxTQUFKLEVBQWUsR0FBL0IsRUFBb0M7QUFDaEMsZ0JBQUksUUFBUSxLQUFLLENBQUwsQ0FBUixJQUFtQixNQUFNLFNBQU4sRUFBaUI7QUFDcEMsdUJBQU8sVUFSUSxxQkFRUixDQUFxQixVQVJTLFNBUVQsQ0FBUyxVQVI1QyxxQkFRNEMsQ0FBcUIsS0FBckIsRUFBNEIsS0FBSyxJQUFJLENBQUosQ0FBakMsRUFBeUMsS0FBSyxDQUFMLENBQXpDLENBQVQsRUFBNEQsQ0FBNUQsRUFBK0QsQ0FBL0QsQ0FBckIsRUFBd0YsR0FBRyxJQUFJLENBQUosQ0FBM0YsRUFBbUcsR0FBRyxDQUFILENBQW5HLENBQVAsQ0FEb0M7YUFBeEM7U0FESjtLQURHLENBSHVDO0NBQWQiLCJmaWxlIjoibWFwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0UHJvZ3Jlc3NGcm9tVmFsdWUsIGdldFZhbHVlRnJvbVByb2dyZXNzLCByZXN0cmljdCB9IGZyb20gJy4uL2luYy9jYWxjJztcblxuZXhwb3J0IGRlZmF1bHQgY3JlYXRlTWFwVHJhbnNmb3JtID0gKGZyb20sIHRvKSA9PiB7XG4gICAgY29uc3QgbWFwTGVuZ3RoID0gZnJvbS5sZW5ndGg7XG5cbiAgICByZXR1cm4gKHZhbHVlKSA9PiB7XG4gICAgICAgIGZvciAobGV0IGkgPSAxOyBpIDwgbWFwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh2YWx1ZSA8IGZyb21baV0gfHwgaSA9PT0gbWFwTGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGdldFZhbHVlRnJvbVByb2dyZXNzKHJlc3RyaWN0KGdldFByb2dyZXNzRnJvbVZhbHVlKHZhbHVlLCBmcm9tW2kgLSAxXSwgZnJvbVtpXSksIDAsIDEpLCB0b1tpIC0gMV0sIHRvW2ldKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG59Il19
return exports;
})());

var _map2 = _interopRequireDefault(_map);

var _timer = __small$_13;

var _timer2 = _interopRequireDefault(_timer);

var _stagger2 = ((function() {
var exports = {};
'use strict';

exports.__esModule = true;
exports.default = stagger;

var _tween = ((function() {
var exports = {};
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.__esModule = true;

var _Action2 = __small$_3;

var _Action3 = _interopRequireDefault(_Action2);

var _presetEasing = __small$_16;

var _presetEasing2 = _interopRequireDefault(_presetEasing);

var _utils = __small$_11;

var _calc = __small$_10;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var COUNT = 'Count';
var NEXT_STEPS = {
    loop: 'restart',
    yoyo: 'reverse',
    flip: 'flipValues'
};

/*
    Ease value within ranged parameters
    
    @param [number]: Progress between 0 and 1
    @param [number]: Value of 0 progress
    @param [number]: Value of 1 progress
    @param [string || function]: Name of preset easing
        to use or generated easing function
    @return [number]: Value of eased progress in range
*/
function ease(progress, from, to, ease) {
    var progressLimited = (0, _calc.restrict)(progress, 0, 1);
    var easingFunction = (0, _utils.isString)(ease) ? _presetEasing2.default[ease] : ease;
    var easedProgress = easingFunction(progressLimited);

    return (0, _calc.getValueFromProgress)(easedProgress, from, to);
};

var Tween = function (_Action) {
    _inherits(Tween, _Action);

    function Tween() {
        _classCallCheck(this, Tween);

        return _possibleConstructorReturn(this, _Action.apply(this, arguments));
    }

    Tween.prototype.start = function start() {
        _Action.prototype.start.call(this);
        this.elapsed = 0;
        this.flipCount = this.yoyoCount = this.loopCount = 0;
    };

    Tween.prototype.onUpdate = function onUpdate(tween, frameStamp, elapsed) {
        var _this2 = this;

        var progressTarget = this.playDirection === 1 ? 1 : 0;

        this.ended = true;
        this.elapsed += elapsed * this.dilate * this.playDirection;

        (0, _utils.each)(this.values, function (value, key) {
            var progress = (0, _calc.restrict)((0, _calc.getProgressFromValue)(_this2.elapsed - value.delay, 0, value.duration), 0, 1);

            // Mark Tween as NOT ended if still in progress
            if (progress !== progressTarget) {
                _this2.ended = false;
            }

            // Step progress if we're stepping
            if (value.steps) {
                progress = (0, _calc.stepProgress)(progress, value.steps);
            }

            // Ease progress
            value.current = ease(progress, value.from, value.to, value.ease);
        });
    };

    Tween.prototype.onFrameEnd = function onFrameEnd() {
        var _this3 = this;

        if (this.ended) {
            var stepTaken = false;

            (0, _utils.each)(NEXT_STEPS, function (method, step) {
                var maxSteps = _this3[step];

                if (maxSteps === true || (0, _utils.isNum)(maxSteps) && maxSteps > _this3[step + COUNT]) {
                    _this3[step + COUNT]++;
                    stepTaken = true;
                    _this3[method]();
                }
            });

            if (!stepTaken) {
                this.stop();
            }
        }
    };

    Tween.prototype.flipValues = function flipValues() {
        this.elapsed = this.duration - this.elapsed;

        (0, _utils.each)(this.values, function (value, key) {
            var _ref = [value.from, value.to];
            value.to = _ref[0];
            value.from = _ref[1];
        });
    };

    Tween.prototype.reverse = function reverse() {
        this.playDirection *= -1;
    };

    Tween.prototype.restart = function restart() {
        this.elapsed = this.playDirection === 1 ? 0 : this.duration;
        this.started = (0, _utils.currentTime)();
    };

    Tween.prototype.seek = function seek(progress) {
        this.once();
        this.elapsed = this.duration * progress;
    };

    Tween.prototype.getDefaultProps = function getDefaultProps() {
        return _extends({}, _Action.prototype.getDefaultProps.call(this), {
            delay: 0,
            dilate: 1,
            duration: 300,
            loop: false,
            yoyo: false,
            flip: false,
            playDirection: 1,
            ended: false,
            elapsed: 0
        });
    };

    Tween.prototype.getDefaultValue = function getDefaultValue() {
        return _extends({}, _Action.prototype.getDefaultValue.call(this), {
            delay: 0,
            duration: 300,
            ease: 'easeOut',
            elapsed: 0,
            stagger: 0,
            steps: 0,
            from: 0,
            to: 0,
            round: false
        });
    };

    Tween.prototype.getDefaultValueProp = function getDefaultValueProp() {
        return 'to';
    };

    return Tween;
}(_Action3.default);

exports.default = Tween;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9hY3Rpb25zL1R3ZWVuLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsSUFBTSxRQUFRLE9BQVI7QUFDTixJQUFNLGFBQWE7QUFDZixVQUFNLFNBQU47QUFDQSxVQUFNLFNBQU47QUFDQSxVQUFNLFlBQU47Q0FIRTs7Ozs7Ozs7Ozs7O0FBZ0JOLFNBQVMsSUFBVCxDQUFjLFFBQWQsRUFBd0IsSUFBeEIsRUFBOEIsRUFBOUIsRUFBa0MsSUFBbEMsRUFBd0M7QUFDcEMsUUFBTSxrQkFBa0IsVUF4QnhCLFNBd0J3QixDQUFTLFFBQVQsRUFBbUIsQ0FBbkIsRUFBc0IsQ0FBdEIsQ0FBbEIsQ0FEOEI7QUFFcEMsUUFBTSxpQkFBaUIsV0E1QnZCLFNBNEJ1QixDQUFTLElBQVQsSUFBaUIsdUJBQWEsSUFBYixDQUFqQixHQUFzQyxJQUF0QyxDQUZhO0FBR3BDLFFBQU0sZ0JBQWdCLGVBQWUsZUFBZixDQUFoQixDQUg4Qjs7QUFLcEMsV0FBTyxVQTFCUCxxQkEwQk8sQ0FBcUIsYUFBckIsRUFBb0MsSUFBcEMsRUFBMEMsRUFBMUMsQ0FBUCxDQUxvQztDQUF4Qzs7SUFRcUI7Ozs7Ozs7OztvQkFDakIseUJBQVE7QUFDSiwwQkFBTSxLQUFOLFlBREk7QUFFSixhQUFLLE9BQUwsR0FBZSxDQUFmLENBRkk7QUFHSixhQUFLLFNBQUwsR0FBaUIsS0FBSyxTQUFMLEdBQWlCLEtBQUssU0FBTCxHQUFpQixDQUFqQixDQUg5Qjs7O0FBRFMsb0JBT2pCLDZCQUFTLE9BQU8sWUFBWSxTQUFTOzs7QUFDakMsWUFBTSxpQkFBaUIsSUFBQyxDQUFLLGFBQUwsS0FBdUIsQ0FBdkIsR0FBNEIsQ0FBN0IsR0FBaUMsQ0FBakMsQ0FEVTs7QUFHakMsYUFBSyxLQUFMLEdBQWEsSUFBYixDQUhpQztBQUlqQyxhQUFLLE9BQUwsSUFBZ0IsT0FBQyxHQUFVLEtBQUssTUFBTCxHQUFlLEtBQUssYUFBTCxDQUpUOztBQU1q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Q0Esa0JBQU0sQ0FBTjtBQUNBLGdCQUFJLENBQUo7QUFDQSxtQkFBTyxLQUFQO1VBVkosQ0FEYzs7O0FBeEZELG9CQXVHakIscURBQXNCO0FBQ2xCLGVBQU8sSUFBUCxDQURrQjs7O1dBdkdMIiwiZmlsZSI6IlR3ZWVuLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEFjdGlvbiBmcm9tICcuL0FjdGlvbic7XG5pbXBvcnQgcHJlc2V0RWFzaW5nIGZyb20gJy4vdHdlZW4vcHJlc2V0LWVhc2luZyc7XG5pbXBvcnQge1xuICAgIGN1cnJlbnRUaW1lLFxuICAgIGVhY2gsXG4gICAgaXNOdW0sXG4gICAgaXNTdHJpbmdcbn0gZnJvbSAnLi4vaW5jL3V0aWxzJztcbmltcG9ydCB7XG4gICAgcmVzdHJpY3QsXG4gICAgZ2V0UHJvZ3Jlc3NGcm9tVmFsdWUsXG4gICAgZ2V0VmFsdWVGcm9tUHJvZ3Jlc3MsXG4gICAgc3RlcFByb2dyZXNzXG59IGZyb20gJy4uL2luYy9jYWxjJztcblxuY29uc3QgQ09VTlQgPSAnQ291bnQnO1xuY29uc3QgTkVYVF9TVEVQUyA9IHtcbiAgICBsb29wOiAncmVzdGFydCcsXG4gICAgeW95bzogJ3JldmVyc2UnLFxuICAgIGZsaXA6ICdmbGlwVmFsdWVzJ1xufTtcblxuLypcbiAgICBFYXNlIHZhbHVlIHdpdGhpbiByYW5nZWQgcGFyYW1ldGVyc1xuICAgIFxuICAgIEBwYXJhbSBbbnVtYmVyXTogUHJvZ3Jlc3MgYmV0d2VlbiAwIGFuZCAxXG4gICAgQHBhcmFtIFtudW1iZXJdOiBWYWx1ZSBvZiAwIHByb2dyZXNzXG4gICAgQHBhcmFtIFtudW1iZXJdOiBWYWx1ZSBvZiAxIHByb2dyZXNzXG4gICAgQHBhcmFtIFtzdHJpbmcgfHwgZnVuY3Rpb25dOiBOYW1lIG9mIHByZXNldCBlYXNpbmdcbiAgICAgICAgdG8gdXNlIG9yIGdlbmVyYXRlZCBlYXNpbmcgZnVuY3Rpb25cbiAgICBAcmV0dXJuIFtudW1iZXJdOiBWYWx1ZSBvZiBlYXNlZCBwcm9ncmVzcyBpbiByYW5nZVxuKi8gXG5mdW5jdGlvbiBlYXNlKHByb2dyZXNzLCBmcm9tLCB0bywgZWFzZSkge1xuICAgIGNvbnN0IHByb2dyZXNzTGltaXRlZCA9IHJlc3RyaWN0KHByb2dyZXNzLCAwLCAxKTtcbiAgICBjb25zdCBlYXNpbmdGdW5jdGlvbiA9IGlzU3RyaW5nKGVhc2UpID8gcHJlc2V0RWFzaW5nW2Vhc2VdIDogZWFzZTtcbiAgICBjb25zdCBlYXNlZFByb2dyZXNzID0gZWFzaW5nRnVuY3Rpb24ocHJvZ3Jlc3NMaW1pdGVkKTtcblxuICAgIHJldHVybiBnZXRWYWx1ZUZyb21Qcm9ncmVzcyhlYXNlZFByb2dyZXNzLCBmcm9tLCB0byk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBUd2VlbiBleHRlbmRzIEFjdGlvbiB7XG4gICAgc3RhcnQoKSB7XG4gICAgICAgIHN1cGVyLnN0YXJ0KCk7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9IDA7XG4gICAgICAgIHRoaXMuZmxpcENvdW50ID0gdGhpcy55b3lvQ291bnQgPSB0aGlzLmxvb3BDb3VudCA9IDA7XG4gICAgfVxuXG4gICAgb25VcGRhdGUodHdlZW4sIGZyYW1lU3RhbXAsIGVsYXBzZWQpIHtcbiAgICAgICAgY29uc3QgcHJvZ3Jlc3NUYXJnZXQgPSAodGhpcy5wbGF5RGlyZWN0aW9uID09PSAxKSA/IDEgOiAwO1xuXG4gICAgICAgIHRoaXMuZW5kZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLmVsYXBzZWQgKz0gKGVsYXBzZWQgKiB0aGlzLmRpbGF0ZSkgKiB0aGlzLnBsYXlEaXJlY3Rpb247XG5cbiAgICAgICAgZWFjaCh0aGlzLnZhbHVlcywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIGxldCBwcm9ncmVzcyA9IHJlc3RyaWN0KGdldFByb2dyZXNzRnJvbVZhbHVlKHRoaXMuZWxhcHNlZCAtIHZhbHVlLmRlbGF5LCAwLCB2YWx1ZS5kdXJhdGlvbiksIDAsIDEpO1xuXG4gICAgICAgICAgICAvLyBNYXJrIFR3ZWVuIGFzIE5PVCBlbmRlZCBpZiBzdGlsbCBpbiBwcm9ncmVzc1xuICAgICAgICAgICAgaWYgKHByb2dyZXNzICE9PSBwcm9ncmVzc1RhcmdldCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gU3RlcCBwcm9ncmVzcyBpZiB3ZSdyZSBzdGVwcGluZ1xuICAgICAgICAgICAgaWYgKHZhbHVlLnN0ZXBzKSB7XG4gICAgICAgICAgICAgICAgcHJvZ3Jlc3MgPSBzdGVwUHJvZ3Jlc3MocHJvZ3Jlc3MsIHZhbHVlLnN0ZXBzKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gRWFzZSBwcm9ncmVzc1xuICAgICAgICAgICAgdmFsdWUuY3VycmVudCA9IGVhc2UocHJvZ3Jlc3MsIHZhbHVlLmZyb20sIHZhbHVlLnRvLCB2YWx1ZS5lYXNlKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25GcmFtZUVuZCgpIHtcbiAgICAgICAgaWYgKHRoaXMuZW5kZWQpIHtcbiAgICAgICAgICAgIGxldCBzdGVwVGFrZW4gPSBmYWxzZTtcblxuICAgICAgICAgICAgZWFjaChORVhUX1NURVBTLCAobWV0aG9kLCBzdGVwKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbWF4U3RlcHMgPSB0aGlzW3N0ZXBdO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1heFN0ZXBzID09PSB0cnVlIHx8IChpc051bShtYXhTdGVwcykgJiYgbWF4U3RlcHMgPiB0aGlzW3N0ZXAgKyBDT1VOVF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbc3RlcCArIENPVU5UXSsrO1xuICAgICAgICAgICAgICAgICAgICBzdGVwVGFrZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzW21ldGhvZF0oKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKCFzdGVwVGFrZW4pIHtcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZsaXBWYWx1ZXMoKSB7XG4gICAgICAgIHRoaXMuZWxhcHNlZCA9IHRoaXMuZHVyYXRpb24gLSB0aGlzLmVsYXBzZWQ7XG5cbiAgICAgICAgZWFjaCh0aGlzLnZhbHVlcywgKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgICAgICAgIFt2YWx1ZS50bywgdmFsdWUuZnJvbV0gPSBbdmFsdWUuZnJvbSwgdmFsdWUudG9dO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXZlcnNlKCkge1xuICAgICAgICB0aGlzLnBsYXlEaXJlY3Rpb24gKj0gLTE7XG4gICAgfVxuXG4gICAgcmVzdGFydCgpIHtcbiAgICAgICAgdGhpcy5lbGFwc2VkID0gKHRoaXMucGxheURpcmVjdGlvbiA9PT0gMSkgPyAwIDogdGhpcy5kdXJhdGlvbjtcbiAgICAgICAgdGhpcy5zdGFydGVkID0gY3VycmVudFRpbWUoKTtcbiAgICB9XG5cbiAgICBzZWVrKHByb2dyZXNzKSB7XG4gICAgICAgIHRoaXMub25jZSgpO1xuICAgICAgICB0aGlzLmVsYXBzZWQgPSB0aGlzLmR1cmF0aW9uICogcHJvZ3Jlc3M7XG4gICAgfVxuICAgIFxuICAgIGdldERlZmF1bHRQcm9wcygpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLnN1cGVyLmdldERlZmF1bHRQcm9wcygpLFxuICAgICAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgICAgICBkaWxhdGU6IDEsXG4gICAgICAgICAgICBkdXJhdGlvbjogMzAwLFxuICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICB5b3lvOiBmYWxzZSxcbiAgICAgICAgICAgIGZsaXA6IGZhbHNlLFxuICAgICAgICAgICAgcGxheURpcmVjdGlvbjogMSxcbiAgICAgICAgICAgIGVuZGVkOiBmYWxzZSxcbiAgICAgICAgICAgIGVsYXBzZWQ6IDBcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXREZWZhdWx0VmFsdWUoKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5zdXBlci5nZXREZWZhdWx0VmFsdWUoKSxcbiAgICAgICAgICAgIGRlbGF5OiAwLFxuICAgICAgICAgICAgZHVyYXRpb246IDMwMCxcbiAgICAgICAgICAgIGVhc2U6ICdlYXNlT3V0JyxcbiAgICAgICAgICAgIGVsYXBzZWQ6IDAsXG4gICAgICAgICAgICBzdGFnZ2VyOiAwLFxuICAgICAgICAgICAgc3RlcHM6IDAsXG4gICAgICAgICAgICBmcm9tOiAwLFxuICAgICAgICAgICAgdG86IDAsXG4gICAgICAgICAgICByb3VuZDogZmFsc2VcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBnZXREZWZhdWx0VmFsdWVQcm9wKCkge1xuICAgICAgICByZXR1cm4gJ3RvJztcbiAgICB9XG59XG4iXX0=
return exports;
})());

var _tween2 = _interopRequireDefault(_tween);

var _utils = __small$_11;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DEFAULT_INTERVAL = 100;
var DEFAULT_EASING = Easing.Linear;

function stagger(array, props, callback) {
    var arrayLength = array.length;
    var propsIsInterval = (0, _utils.isNum)(props);
    var interval = propsIsInterval ? props : props.interval || DEFAULT_INTERVAL;
    var prevIndex = -1;

    var staggerTween = new _tween2.default({
        duration: interval * arrayLength,
        values: {
            i: {
                from: 0,
                to: numMembers - 1,
                round: true,
                ease: propsIsInterval ? DEFAULT_EASING : props.ease || DEFAULT_EASING
            }
        },
        onRender: function (_ref) {
            var i = _ref.i;

            var gapIndex = prevIndex + 1;

            for (; gapIndex <= i; gapIndex++) {
                callback(array[gapIndex], gapIndex);
            }

            prevIndex = i;
        },
        onComplete: propsIsInterval ? undefined : props.onComplete
    });

    staggerTween.start();

    return staggerTween;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9pbmMvc3RhZ2dlci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7a0JBTXdCOzs7Ozs7Ozs7O0FBSHhCLElBQU0sbUJBQW1CLEdBQW5CO0FBQ04sSUFBTSxpQkFBaUIsT0FBTyxNQUFQOztBQUVSLFNBQVMsT0FBVCxDQUFpQixLQUFqQixFQUF3QixLQUF4QixFQUErQixRQUEvQixFQUF5QztBQUNwRCxRQUFNLGNBQWMsTUFBTSxNQUFOLENBRGdDO0FBRXBELFFBQU0sa0JBQWtCLFdBUG5CLE1BT21CLENBQU0sS0FBTixDQUFsQixDQUY4QztBQUdwRCxRQUFNLFdBQVcsa0JBQWtCLEtBQWxCLEdBQTBCLE1BQU0sUUFBTixJQUFrQixnQkFBbEIsQ0FIUztBQUlwRCxRQUFJLFlBQVksQ0FBQyxDQUFELENBSm9DOztBQU1wRCxRQUFNLGVBQWUsb0JBQVU7QUFDM0Isa0JBQVUsV0FBVyxXQUFYO0FBQ1YsZ0JBQVE7QUFDSixlQUFHO0FBQ0Msc0JBQU0sQ0FBTjtBQUNBLG9CQUFJLGFBQWEsQ0FBYjtBQUNKLHVCQUFPLElBQVA7QUFDQSxzQkFBTSxrQkFBa0IsY0FBbEIsR0FBbUMsTUFBTSxJQUFOLElBQWMsY0FBZDthQUo3QztTQURKO0FBUUEsa0JBQVUsZ0JBQVc7Z0JBQVIsV0FBUTs7QUFDakIsZ0JBQUksV0FBVyxZQUFZLENBQVosQ0FERTs7QUFHakIsbUJBQU8sWUFBWSxDQUFaLEVBQWUsVUFBdEIsRUFBa0M7QUFDOUIseUJBQVMsTUFBTSxRQUFOLENBQVQsRUFBMEIsUUFBMUIsRUFEOEI7YUFBbEM7O0FBSUEsd0JBQVksQ0FBWixDQVBpQjtTQUFYO0FBU1Ysb0JBQVksa0JBQWtCLFNBQWxCLEdBQThCLE1BQU0sVUFBTjtLQW5CekIsQ0FBZixDQU44Qzs7QUE0QnBELGlCQUFhLEtBQWIsR0E1Qm9EOztBQThCcEQsV0FBTyxZQUFQLENBOUJvRDtDQUF6QyIsImZpbGUiOiJzdGFnZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFR3ZWVuIGZyb20gJy4uL2FjdGlvbnMvdHdlZW4nO1xuaW1wb3J0IHsgaXNOdW0gfSBmcm9tICcuL3V0aWxzJztcblxuY29uc3QgREVGQVVMVF9JTlRFUlZBTCA9IDEwMDtcbmNvbnN0IERFRkFVTFRfRUFTSU5HID0gRWFzaW5nLkxpbmVhcjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gc3RhZ2dlcihhcnJheSwgcHJvcHMsIGNhbGxiYWNrKSB7XG4gICAgY29uc3QgYXJyYXlMZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gICAgY29uc3QgcHJvcHNJc0ludGVydmFsID0gaXNOdW0ocHJvcHMpO1xuICAgIGNvbnN0IGludGVydmFsID0gcHJvcHNJc0ludGVydmFsID8gcHJvcHMgOiBwcm9wcy5pbnRlcnZhbCB8fCBERUZBVUxUX0lOVEVSVkFMO1xuICAgIGxldCBwcmV2SW5kZXggPSAtMTtcblxuICAgIGNvbnN0IHN0YWdnZXJUd2VlbiA9IG5ldyBUd2Vlbih7XG4gICAgICAgIGR1cmF0aW9uOiBpbnRlcnZhbCAqIGFycmF5TGVuZ3RoLFxuICAgICAgICB2YWx1ZXM6IHtcbiAgICAgICAgICAgIGk6IHtcbiAgICAgICAgICAgICAgICBmcm9tOiAwLFxuICAgICAgICAgICAgICAgIHRvOiBudW1NZW1iZXJzIC0gMSxcbiAgICAgICAgICAgICAgICByb3VuZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICBlYXNlOiBwcm9wc0lzSW50ZXJ2YWwgPyBERUZBVUxUX0VBU0lORyA6IHByb3BzLmVhc2UgfHwgREVGQVVMVF9FQVNJTkdcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgb25SZW5kZXI6ICh7IGkgfSkgPT4ge1xuICAgICAgICAgICAgbGV0IGdhcEluZGV4ID0gcHJldkluZGV4ICsgMTtcblxuICAgICAgICAgICAgZm9yICg7IGdhcEluZGV4IDw9IGk7IGdhcEluZGV4KyspIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhhcnJheVtnYXBJbmRleF0sIGdhcEluZGV4KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcHJldkluZGV4ID0gaTtcbiAgICAgICAgfSxcbiAgICAgICAgb25Db21wbGV0ZTogcHJvcHNJc0ludGVydmFsID8gdW5kZWZpbmVkIDogcHJvcHMub25Db21wbGV0ZVxuICAgIH0pO1xuXG4gICAgc3RhZ2dlclR3ZWVuLnN0YXJ0KCk7XG5cbiAgICByZXR1cm4gc3RhZ2dlclR3ZWVuO1xufSJdfQ==
return exports;
})());

var _stagger3 = _interopRequireDefault(_stagger2);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Actor = _Actor3.default;

// Actions
// Actor

exports.Action = _Action3.default;
exports.Tween = _Tween3.default;
exports.Physics = _Physics3.default;
exports.Track = _Track3.default;

// Input

exports.Input = _Input3.default;
exports.Mouse = _Mouse3.default;
exports.Touch = _Touch3.default;

// Renderers

// Utils

exports.calc = _calc;
exports.utils = _utils;
exports.createMapTransform = _map2.default;
exports.setDilation = _timer2.default;
exports.stagger = _stagger3.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9wb3Btb3Rpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQUNPOzs7OztRQUdBO1FBQ0E7UUFDQTtRQUNBOzs7O1FBR0E7UUFDQTtRQUNBOzs7Ozs7UUFLSztRQUNBO1FBQ0w7UUFDQTtRQUNBIiwiZmlsZSI6InBvcG1vdGlvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIEFjdG9yXG5leHBvcnQgQWN0b3IgZnJvbSAnLi9hY3Rvci9BY3Rvcic7XG5cbi8vIEFjdGlvbnNcbmV4cG9ydCBBY3Rpb24gZnJvbSAnLi9hY3Rpb25zL0FjdGlvbic7XG5leHBvcnQgVHdlZW4gZnJvbSAnLi9hY3Rpb25zL1R3ZWVuJztcbmV4cG9ydCBQaHlzaWNzIGZyb20gJy4vYWN0aW9ucy9QaHlzaWNzJztcbmV4cG9ydCBUcmFjayBmcm9tICcuL2FjdGlvbnMvVHJhY2snO1xuXG4vLyBJbnB1dFxuZXhwb3J0IElucHV0IGZyb20gJy4vaW5wdXQvSW5wdXQnO1xuZXhwb3J0IE1vdXNlIGZyb20gJy4vaW5wdXQvTW91c2UnO1xuZXhwb3J0IFRvdWNoIGZyb20gJy4vaW5wdXQvVG91Y2gnO1xuXG4vLyBSZW5kZXJlcnNcblxuLy8gVXRpbHNcbmV4cG9ydCAqIGFzIGNhbGMgZnJvbSAnLi9pbmMvY2FsYyc7XG5leHBvcnQgKiBhcyB1dGlscyBmcm9tICcuL2luYy91dGlscyc7XG5leHBvcnQgY3JlYXRlTWFwVHJhbnNmb3JtIGZyb20gJy4vdHJhbnNmb3JtZXJzL21hcCc7XG5leHBvcnQgc2V0RGlsYXRpb24gZnJvbSAnLi9wcm9jZXNzL3RpbWVyJztcbmV4cG9ydCBzdGFnZ2VyIGZyb20gJy4vaW5jL3N0YWdnZXInOyJdfQ==
return exports;
})());

var popmotion = _interopRequireWildcard(_popmotion);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var UIref = window.motion;

popmotion.noConflict = function () {
    window.motion = UIref;
};

window.motion = window.popmotion = popmotion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9sb2FkL2dsb2JhbC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0lBQVk7Ozs7QUFFWixJQUFNLFFBQVEsT0FBTyxNQUFQOztBQUVkLFVBQVUsVUFBVixHQUF1QixZQUFZO0FBQy9CLFdBQU8sTUFBUCxHQUFnQixLQUFoQixDQUQrQjtDQUFaOztBQUl2QixPQUFPLE1BQVAsR0FBZ0IsT0FBTyxTQUFQLEdBQW1CLFNBQW5CIiwiZmlsZSI6Imdsb2JhbC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIHBvcG1vdGlvbiBmcm9tICcuLi9wb3Btb3Rpb24nO1xuXG5jb25zdCBVSXJlZiA9IHdpbmRvdy5tb3Rpb247XG5cbnBvcG1vdGlvbi5ub0NvbmZsaWN0ID0gZnVuY3Rpb24gKCkge1xuICAgIHdpbmRvdy5tb3Rpb24gPSBVSXJlZjtcbn07XG5cbndpbmRvdy5tb3Rpb24gPSB3aW5kb3cucG9wbW90aW9uID0gcG9wbW90aW9uOyJdfQ==
return exports;
})();