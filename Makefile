include .env

test_build:
	docker build -t otus-qajs .

test_shell:
	docker run -v "$(PWD):/app" -v /app/node_modules -it otus-qajs bash

test_run:
	echo "Test run ..."
	docker run --memory=2G --cpus=4 otus-qajs npm run test
	echo "Test finish"

send_message:
	curl --request POST \
  --url https://api.telegram.org/bot6978264791:AAFsIC4lKfW0i496Y5Te7gf_oOxQOweuPhU/sendMessage \
  --header 'Content-Type: application/json' \
  --data '{ "chat_id": "-4106492537", "text": "The tests were successful!!!" }'