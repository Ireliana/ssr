; //包
(function(root, fn) {
    if (typeof define === 'function' && define.amd) {
        define(fn);
    } else if (typeof exports === 'object') {
        module.exports = fn();
    } else {
        root.projectname = fn();
    }
}(this, function() {
    return '/'
}));