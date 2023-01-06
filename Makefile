CURRENT_DIR=$(shell pwd)

TAG=latest
REGISTERY=interrail
PROJECT=interrail_admin
PORT=8000

build-image:
	docker build --rm -t ${REGISTERY}/${PROJECT}:${TAG} .

run-image:
	docker run -p ${PORT}:80 ${REGISTERY}/${PROJECT}:${TAG}