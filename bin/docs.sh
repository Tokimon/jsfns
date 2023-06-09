package=$(basename $PWD)

# Start
echo -e "Building \e[1;34m$package\e[0m documentation"


root=$(echo "$PWD" | sed "s/\(.*\/js-fns\).*/\1/p" -n)
tsconfig="$PWD/tsconfig.js.json"
package_json="`cat $PWD/package.json`"

variables=$(node -p "const { name, version, description } = $package_json; '(\"'+ name +'\" \"'+ version +'\" \"'+ description +'\")'")

eval "arr=$variables"
name=${arr[0]/"@js-fns/"/}
version=${arr[1]}
description=${arr[2]}

major_version=$(echo $version | sed "s/[0-9]\+\$/x/")
docs_path="$root/docs"
docs_data_path="$docs_path/data"
docs_build_path="$docs_path/build"
output="$docs_build_path/$name/$major_version"



# Clear existing assets
rm -rf $docs_data_path && mkdir -p $docs_data_path
rm -rf $output && mkdir -p $output

# Build docs
typedoc --options $root/typedoc.json --json "$docs_data_path/docs.json" --tsconfig "$tsconfig" --entryPoints "$PWD/src"

# Build package info JSON
echo "{\"name\":\"$name\",\"version\":\"$major_version\",\"description\":\"$description\"}" >> "$docs_data_path/package-info.json"

# Build packages JOSN
packages=()
for pkg in $docs_build_path/*/; do
  versions=()
  for version in $pkg/*/; do versions+=("\"$(basename "$version")\""); done
  sorted=($(printf "%s\n" "${versions[@]}" | sort -r))

  packages+=("\"$(basename $pkg)\":[$(IFS=,; (printf '%s' "${sorted[*]}"))]")
done

echo "{$(IFS=,; (printf '%s' "${packages[*]}"))}" >> "$docs_data_path/packages.json"

# Build HTML files
cd $docs_path && npm run build

# Done
echo -e '\e[1;32mdone\e[0m'