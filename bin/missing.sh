#!/bin/bash

workspaceName=$(basename $PWD)

missing=0

for file in $PWD/src/*.ts; do
  name=$(basename $file .ts)
  if [[ "$name" =~ \.d ]]; then continue; fi

  testfile=$PWD/tests/$name.test.ts;

  if [ ! -f $testfile ]; then
    missing=$(expr $missing + 1)
    echo $name
  fi
done

if [ $missing == 0 ]; then
  echo -e "\e[1;32m🗸\e[0m All good! \e[1;34m$workspaceName\e[0m have no missing tests"
else
  echo -e "\e[1;34m$workspaceName\e[0m has \e[1;31m$missing missing tests\e[0m"
fi
