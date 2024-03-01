include .env

test_build:
	docker build -t otus-qajs .

test_shell:
	docker run -v "$(PWD):/app" -v /app/node_modules -it otus-qajs bash

test_run:
	echo "Test run ..."
	docker run --memory=2G --cpus=4 otus-qajs npm run test
	echo "Test finish"