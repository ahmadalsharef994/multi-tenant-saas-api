dev:
	node src/index.js

docker-up:
	docker compose up --build

docker-down:
	docker compose down

# Quick demo: create a tenant then add a customer
demo:
	@echo "Creating tenant 'acme'..."
	curl -s "http://localhost:3000/tenant?tenantId=acme" | jq .
	@echo "\nAdding customer to 'acme'..."
	curl -s "http://localhost:3000/customer?tenantId=acme&customer=alice" | jq .
