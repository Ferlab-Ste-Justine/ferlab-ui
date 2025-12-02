DIRECTORY="$1"

escape_file () {
    # Read each pattern from the patterns file
    while IFS= read -r pattern; do
        # Escape special characters in the pattern for sed
        escaped_pattern=$(printf '%s\n' "$pattern" | sed -e 's|[\/&]|\\&|g')
        escaped_pattern=$(printf '%s\n' "$escaped_pattern" | sed -e 's|[][]|\\&|g')
        # Use sed to replace the pattern with an empty string
        if [[ "$OSTYPE" == "darwin"* ]]; then
            # macOS
            sed -i "" -e "s/$escaped_pattern//g" "$1"
        else
            # other OS
            sed -i -e "s/$escaped_pattern//g" "$1"
        fi
    done < "$DIRECTORY/.github/workflows/shai-hulud-allowed-patterns.txt"
}

# file to escape before scanning (the patterns listed in shai-hulud-allowed-patterns.txt will be removed)

# file to remove before scanning (a comment must be provided to explain why)
rm -rf "$DIRECTORY/.github/workflows/shai-hulud.yml" # remove current workflow to avoid scanning itself
rm -rf "$DIRECTORY/.github/workflows/shai-hulud-allowed-patterns.txt" # remove allowed patterns file
rm -rf "$DIRECTORY/.github/workflows/create_pr_template.yml" # remove allowed github action
rm -rf "$DIRECTORY/.github/workflows/npm_release_candidate.yml" # remove allowed github action
rm -rf "$DIRECTORY/.github/workflows/uilinter.yml" # remove allowed github action
rm -rf "$DIRECTORY/.github/workflows/quality.yml" # remove allowed github action
rm -rf "$DIRECTORY/.github/workflows/storybook.yml" # remove allowed github action
rm -rf "$DIRECTORY/.github/workflows/npm_release.yml" # remove allowed github action
rm -rf "$DIRECTORY/storybook/storybook-static" # remove storybook static files because they are generated during the storybook build process
# call shai-hulud scan-project.sh
curl -s https://raw.githubusercontent.com/sngular/shai-hulud-integrity-scanner/refs/heads/main/scan-project.sh | bash /dev/stdin "$DIRECTORY/packages/config"
rm -rf "$DIRECTORY/packages/config"
curl -s https://raw.githubusercontent.com/sngular/shai-hulud-integrity-scanner/refs/heads/main/scan-project.sh | bash /dev/stdin "$DIRECTORY/packages/eslint-config"
rm -rf "$DIRECTORY/packages/eslint-config"
curl -s https://raw.githubusercontent.com/sngular/shai-hulud-integrity-scanner/refs/heads/main/scan-project.sh | bash /dev/stdin "$DIRECTORY/packages/ui"
rm -rf "$DIRECTORY/packages/ui"
curl -s https://raw.githubusercontent.com/sngular/shai-hulud-integrity-scanner/refs/heads/main/scan-project.sh | bash /dev/stdin "$DIRECTORY/storybook"
rm -rf "$DIRECTORY/storybook"
curl -s https://raw.githubusercontent.com/sngular/shai-hulud-integrity-scanner/refs/heads/main/scan-project.sh | bash /dev/stdin "$DIRECTORY"