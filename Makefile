install:
	npm install --global babel-cli
	npm install babel-preset-react

build:
	babel --presets react ./public/src --watch --out-dir ./public/build


