#!/bin/bash

workspaceName=$(basename $PWD)

ok() {
  echo -e "\e[1;32m🗸\e[0m \e[1;33m$1\e[0m removed"
}

echo -e "Cleaning \e[1;34m$workspaceName\e[0m"

# Remove generated .mjs files
rm -f $PWD/*.mjs
ok '.mjs'

# Remove generated .cjs files
rm -f $PWD/*.cjs
ok '.cjs'

# Remove only generated .js and .d.ts files
for file in $PWD/src/*.ts; do
  b=$(basename $file .ts)
  rm -f $PWD/$b.js
  rm -f $PWD/$b.d.ts
done

ok ".js\e[0m and \e[1;33m.d.ts"

# Remove generated index files
rm -f $PWD/src/index.ts
ok "Generated index file"

# Remove any remaining "build" folder
rm -rf $PWD/build
ok 'build directory'

# Remove any remaining empty folders
find $PWD -type d -empty -delete
ok 'Empty directories'