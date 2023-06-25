#!/bin/bash

workspaceName=$(basename $PWD)

print_done() {
  echo -e '\e[1;32mdone\e[0m'
}

print_building() {
  printf "  \e[1;33m$1\e[0m ... "
}

build() {
  tsconfig="tsconfig.$1.json"

  print_building ".$1"

  # Compile the typescript files
  npx tsc --build $PWD/$tsconfig
  wait

  # Move build files to the root of the project
  for file in $PWD/build/$1/src/*.js; do
    dest=$PWD/$(basename $file .js).$1
    mv -u $file $dest
  done

  print_done
}

move_dts_files() {
  print_building '.d.ts'

  for file in $PWD/build/$1/src/*.d.ts; do
    dest=$PWD/$(basename $file)
    mv -u "$file" "$dest"
  done

  print_done
}

build_index() {
  print_building 'index.ts'

  # Preparing the accumulated index file
  rm -f $PWD/src/index.ts

  for file in $PWD/src/*.ts; do
    name=$(basename $file .ts)

    if [[ ! "$name" =~ \.d ]] && [[ ! "$name" = "index" ]]; then
      echo "export { $name } from './$name';" >> $PWD/src/index.ts
    fi
  done

  print_done
}

# Entry message
echo -e "Building \e[1;34m$workspaceName\e[0m"

# Build the accumulated index file
build_index

# Build the various file types
build mjs
build cjs
build js
move_dts_files js

# Remove old build folder
rm -rf $PWD/build