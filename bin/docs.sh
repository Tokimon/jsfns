package=$(basename $PWD)

# Start
echo -e "Building \e[1;34m$package\e[0m documentation"


root=$(echo "$PWD" | sed "s/\(.*\/js-fns\).*/\1/p" -n)
tsconfig="$PWD/tsconfig.js.json"
package_json="`cat $PWD/package.json`"

variables=$(node -p "const { name, version, description } = $package_json; '(\"'+ name +'\" \"'+ version +'\" \"'+ description +'\")'")

eval "arr=$variables"
name=${arr[0]}
version=${arr[1]}
description=${arr[2]}

major_version=$(echo $version | sed "s/[0-9]\+\$/x/")

package_doc_path="$root/docs/src/lib/$package"
versions_json_path="$package_doc_path/versions.json";
output="$package_doc_path/$major_version"



# Clear existing assets
rm -rf $output && mkdir -p $output
rm -f $versions_json_path

# Build docs
typedoc --options $root/typedoc.json --json "$output/docs.json" --tsconfig "$tsconfig" --entryPoints "$PWD/src"

# Build package info JSON
echo "{\"name\":\"$name\",\"version\":\"$version\",\"description\":\"$description\"}" >> "$output/package-info.json"

# Build versions JOSN
versions=()
for dir in $package_doc_path/*/; do versions+=("\"$(basename "$dir")\""); done
sorted=($(printf "%s\n" "${versions[@]}" | sort -r))

echo "{\"versions\":[$(IFS=,; (printf '%s' "${sorted[*]}"))]}" >> $versions_json_path


# Done
echo -e '\e[1;32mdone\e[0m'