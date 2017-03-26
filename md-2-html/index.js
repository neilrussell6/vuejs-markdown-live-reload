const md2html = require('./md-2-html.js');

var _src_path   = process.argv[2];
var _src_dir    = process.argv[3];
var _dest_dir   = process.argv[4];

md2html.md2Html(_src_path, _src_dir, _dest_dir);
