#!/bin/bash

workspaceName=$(basename $PWD)

print_done() {
  echo -e '\e[1;32mdone\e[0m'
}

print_building() {
  printf "  \e[1;33m$1\e[0m ... "
}

build() {
  [ $1 == 'js' ] && tsconfig="tsconfig.json" || tsconfig="tsconfig.$1.json"
  [ $1 == 'js' ] && message=".js\e[0m and \e[1;33m.d.ts" || message=".$1"

  print_building "$message"

  # Compile the typescript files
  npx tsc --build $PWD/$tsconfig

  # Move build files to the root of the project
  for file in $PWD/dist/$1/*.js; do
    dest=$PWD/$(basename $file .js).$1
    mv -u $file $dest
  done

  # Move .d.ts to the root of the project
  if [[ $1 == 'js' ]]; then
    for file in $PWD/dist/$1/*.d.ts; do
      dest=$PWD/$(basename $file)
      mv -u "$file" "$dest"
    done
  fi

  print_done
}

build_index() {
  echo -e "Building \e[1;34m$workspaceName\e[0m"

  # Preparing the accumulated index file
  rm -f ./src/index.ts

  print_building 'index.ts'

  for file in $PWD/src/*.ts; do
    name=$(basename $file .ts)

    if [[ ! "$name" =~ \.d ]]; then
      echo "export { default as $name } from './$name';" >> $PWD/src/index.ts
    fi
  done

  print_done
}

# Build the accumulated index file
build_index

# Build the various file types
build mjs
build cjs
build js

# Remove old build folder
rm -rf $PWD/dist