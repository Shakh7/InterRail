CURRENT_DIR=$(shell pwd)

TAG=latest
REGISTERY=interrail
PROJECT=interrail_admin
PORT=8000

build-image:
	docker build --rm -t ${REGISTERY}/${PROJECT}:${TAG} .

run-dev:
	docker run -p ${PORT}:80 ${REGISTERY}/${PROJECT}:${TAG}

run-prod:
	set -a &&. ./.env && set +a && docker-compose -f docker-compose.yml up -d