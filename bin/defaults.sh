#!/bin/bash

# Verifies every src file has a default export (files with no single main export are skipped)

workspaceName=$(basename $PWD)
skip=" index types MicroEvents position "

missing=0

for file in $PWD/src/*.ts; do
  name=$(basename $file .ts)
  if [[ "$name" =~ \.d ]] || [[ "$skip" == *" $name "* ]]; then continue; fi

  if ! grep -q '^export default' $file; then
    missing=$(expr $missing + 1)
    echo $name
  fi
done

if [ $missing == 0 ]; then
  echo -e "\e[1;32m✓\e[0m All good! \e[1;34m$workspaceName\e[0m files all have a default export"
else
  echo -e "\e[1;31m✘\e[0m \e[1;34m$workspaceName\e[0m has \e[1;31m$missing files without a default export\e[0m"
  exit 1
fi
