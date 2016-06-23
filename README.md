
ac-fs
==========

Common and/or convenient file-system functions returning promises.

Install
-------

```sh
npm install ac-fs --save
```

Usage
-----

```
var fs = require('ac-fs');

fs.readFolder('.')
  .then(function(files){
    // Remove all files
    return Promise.all(files.map(function(file){
      return fs.unlink(file);
    }));
  })
;
```

API
---

### Paths

exists(path) -> boolean

### Files

isFile(path) -> boolean

isFileStrict(path) -> boolean

readFile(path) -> instance of Buffer

readJsonFile(path) -> parsed data

writeFile(path, data)

writeJsonFile(path, data)

unlink(path)

### Folders

isFolder(path) -> boolean

isFolderStrict(path) -> boolean

isEmptyFolder(path) -> boolean

readFolder(path) -> array of files

mkFolder(path)

rmFolder(path)

rimrafFolder(path)

rmEmptyFolder(path) -> boolean

rmEmptyFolderTail(path)

### Symbolic Links

symlink(linkTo, path [, type])

NOTICE `type` defaults to 'junction' for windows-platforms.
See [fs.symlink()](https://nodejs.org/api/fs.html#fs_fs_symlink_target_path_type_callback).

readlink(path) -> linkString

isSymlink(path) -> boolean

MIT License
-----------

Copyright (c) 2016 Oliver Leics <oliver.leics@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
