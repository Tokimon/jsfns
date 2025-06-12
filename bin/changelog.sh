#!/bin/bash

changelog() {
    PS3=$(printf "\e[33m@jsfns/\e[32m$1\e[0m semver version: ")
    options=("major" "minor" "patch" "none")

    select SELECTED in "${options[@]}"; do
        if [[ "${SELECTED}" == "none" ]]; then
            break
        fi

        pnpm changeset --empty
        FILE=$(ls -t .changeset/*.md | head -n 1)

        sed -i "2i\"@jsfns/$1\": $SELECTED" $FILE
        echo -e "\nUpdates:"

        nano $FILE

        break
    done
}

changelog core
changelog web
