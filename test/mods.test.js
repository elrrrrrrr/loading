'use strict';

require('should');
var join = require('path').join;
var getMods = require('../lib/mods');
var fixtures = join(__dirname, 'fixtures');

describe('mods.test.js', function() {

  it('should get mods', function() {
    var dir = join(fixtures, 'services');
    var mods = getMods(dir);
    mods.should.eql([{
      fullpath: dir + '/dir/abc.js',
      properties: ['dir', 'abc']
    }, {
      fullpath: dir + '/dir/service.js',
      properties: ['dir', 'service']
    }, {
      fullpath: dir + '/foo.js',
      properties: ['foo']
    }, {
      fullpath: dir + '/foo_bar_hello.js',
      properties: ['fooBarHello']
    }, {
      fullpath: dir + '/foo_service.js',
      properties: ['fooService']
    }, {
      fullpath: dir + '/hyphen-dir/a.js',
      properties: ['hyphenDir', 'a']
    }, {
      fullpath: dir + '/underscore_dir/a.js',
      properties: ['underscoreDir', 'a']
    }, {
      fullpath: dir + '/userProfile.js',
      properties: ['userProfile']
    }]);
  });

  it('should throw when directory contains dot', function() {
    (function() {
      getMods(join(fixtures, 'error/dotdir'));
    }).should.throw('dot.dir is not match /^[a-z][a-z0-9_-]*$/gi in dot.dir/a.js');
  });

  it('should throw when directory starts with underscore', function() {
    (function() {
      getMods(join(fixtures, 'error/underscore-dir'));
    }).should.throw('_underscore is not match /^[a-z][a-z0-9_-]*$/gi in _underscore/a.js');
    (function() {
      getMods(join(fixtures, 'error/underscore-file-in-dir'));
    }).should.throw('_a is not match /^[a-z][a-z0-9_-]*$/gi in dir/_a.js');
  });

  it('should throw when file starts with underscore', function() {
    (function() {
      getMods(join(fixtures, 'error/underscore-file'));
    }).should.throw('_private is not match /^[a-z][a-z0-9_-]*$/gi in _private.js');
  });

});
