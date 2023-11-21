logs: compose
	@docker logs -f node-express

compose:
	@echo "Remove containers.."
	@docker compose down
	@echo "docker compose is running.."
	@docker compose up -d --build

rm:
	@echo "remove containers"


