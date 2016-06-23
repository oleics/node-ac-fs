
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');

module.exports = {
  exists: exists,

  isFile: isFile,
  isFileStrict: isFileStrict,
  readFile: readFile,
  readJsonFile: readJsonFile,
  writeFile: writeFile,
  writeJsonFile: writeJsonFile,
  unlink: unlink,

  isFolder: isFolder,
  isFolderStrict: isFolderStrict,
  readFolder: readFolder,
  mkFolder: mkFolder,
  rmFolder: rmFolder,
  rimrafFolder: rimrafFolder,
  rmEmptyFolder: rmEmptyFolder,
  rmEmptyFolderTail: rmEmptyFolderTail,

  symlink: symlink,
  readlink: readlink,
  isSymlink: isSymlink
};

// Paths

function exists(p) {
  return new Promise(function(resolve, reject) {
    fs.exists(p, function(exists){
      resolve(exists);
    });
  });
}

// Files

function isFile(p) {
  return new Promise(function(resolve, reject) {
    fs.stat(p, function(err, s){
      if(err) return reject(err);
      resolve(s.isFile());
    });
  });
}

function isFileStrict(p) {
  return new Promise(function(resolve, reject) {
    fs.lstat(p, function(err, s){
      if(err) return reject(err);
      resolve(s.isFile());
    });
  });
}

function readFile(p) {
  return new Promise(function(resolve, reject) {
    fs.readFile(p, function(err, d){
      if(err) return reject(err);
      resolve(d);
    });
  });
}

function readJsonFile(p) {
  return readFile(p)
    .then(function(d){
      try {
        d = JSON.parse(d.toString());
      } catch(err) {
        return Promise.reject(err);
      }
      return d;
    })
  ;
}

function writeFile(p, data) {
  return new Promise(function(resolve, reject) {
    fs.writeFile(p, data, function(err){
      if(err) return reject(err);
      resolve();
    });
  });
}

function writeJsonFile(p, data) {
  data = JSON.stringify(data, null, '  ')+'\n';
  return writeFile(p, data);
}

function unlink(p) {
  return new Promise(function(resolve, reject) {
    fs.unlink(p, function(err){
      if(err) return reject(err);
      resolve();
    });
  });
}

// Folders

function isFolder(p) {
  return new Promise(function(resolve, reject) {
    fs.stat(p, function(err, s){
      if(err) return reject(err);
      resolve(s.isDirectory());
    });
  });
}

function isFolderStrict(p) {
  return new Promise(function(resolve, reject) {
    fs.lstat(p, function(err, s){
      if(err) return reject(err);
      resolve(s.isDirectory());
    });
  });
}

function readFolder(p) {
  return new Promise(function(resolve, reject) {
    fs.readdir(p, function(err, files){
      if(err) return reject(err);
      resolve(files);
    });
  });
}

function mkFolder(p, mode) {
  return new Promise(function(resolve, reject) {
    mkdirp(p, {
      mode: mode != null ? mode : undefined
    }, function(err){
      if(err) {
        console.error(err.stack||err);
        return reject(err);
      }
      resolve();
    });
  });
}

function rmFolder(p) {
  return new Promise(function(resolve, reject) {
    fs.rmdir(p, function(err){
      if(err && err.code !== 'ENOENT') return reject(err);
      resolve();
    })
  });
}

function rimrafFolder(p) {
  return new Promise(function(resolve, reject) {
    rimraf(p, function(err){
      if(err && err.code !== 'ENOENT') return reject(err);
      resolve();
    })
  });
}

function rmEmptyFolder(p) {
  return readFolder(p)
    .catch(function(err){
      if(err.code === 'ENOENT') return Promise.resolve([]);
      return Promise.reject(err);
    })
    .then(function(files){
      if(files.length) return false;
      return rmFolder(p).then(function(){
        return true;
      });
    })
  ;
}

function rmEmptyFolderTail(p) {
  return rmEmptyFolder(p).then(function(yes){
    if(!yes) return;
    p = p.split(path.sep);
    p.pop();
    if(p.length <= 1) return;
    p = p.join(path.sep);
    return rmEmptyFolderTail(p);
  });
}

// Symbolic Links

function symlink(linkTo, p, type) {
  if(type == null) type = 'junction';
  return new Promise(function(resolve, reject) {
    fs.symlink(linkTo, p, type, function(err){
      if(err) return reject(err);
      resolve();
    });
  });
}

function readlink(p) {
  return new Promise(function(resolve, reject) {
    fs.readlink(p, function(err, linkTo){
      if(err) return reject(err);
      resolve(linkTo);
    });
  });
}

function isSymlink(p) {
  return new Promise(function(resolve, reject) {
    fs.lstat(p, function(err, s){
      if(err) return reject(err);
      return resolve(s.isSymbolicLink());
    });
  });
}
