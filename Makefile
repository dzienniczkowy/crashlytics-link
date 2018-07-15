build:src/manifest.json
	rm -f crashlytics-link.zip
	cd src/; zip -r ../crashlytics-link.zip .

PHONY: build
