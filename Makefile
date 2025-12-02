.ONESHELL:

check:
	rm -rf ./tmp
	rsync -a --exclude 'node_modules/' ./ ./tmp
	-sh ./tmp/.github/workflows/shai-hulud-check.sh ./tmp
	rm -rf ./tmp