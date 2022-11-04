#!/bin/bash

npm run build

DESTINATION=linux-arm64/outdated-metrics TARGET=node18-linuxstatic-arm64 npm run package:bin
DESTINATION=linux-x64/outdated-metrics TARGET=node18-linuxstatic-x64 npm run package:bin
DESTINATION=macOS-arm64/outdated-metrics TARGET=node18-macos-arm64 npm run package:bin
DESTINATION=macOS-x64/outdated-metrics TARGET=node18-macos-amd64 npm run package:bin
