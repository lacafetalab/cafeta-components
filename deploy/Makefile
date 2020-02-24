
build:       ## Build a storybook static 
	cd ./packages/core/ && yarn install
	cd ./packages/core/ && yarn build-storybook 
	cd ./deploy/dist/ && rm -rf *
	cp -rf ./packages/core/storybook-static/* ./deploy/dist 
deploy-firebase:       ## Deploy storybook to firebase
	cd ./deploy/ && firebase deploy