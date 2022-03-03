let cpx = require('cpx');

cpx.copy('projects/lib/src/scss/*.scss', '../dist/scss');
cpx.copy('README.md', 'dist');