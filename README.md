# Order Management System

## Feature

### Orders Application

- Responsible for orders management
- Each order can be at the single state at the time
- Order states - created, confirmed, delivered, cancelled, declined
- After order was created Orders App triggers Payments App to process a payment (mocked) for the current order.
- Each of the endpoint requires JWT authentication

### Payments Application

- Responsible for payment processing
- Payments App should handle requests by Order App to verify payment transaction and confirmed or declined an order.
- The logic behind the payment processing is mocked and return a random result to the Orders App.

# Getting Started

## Installing dependencies

- PostgreSQL

```sh
# Start your PostgreSQL instance & create a new database
createdb order-management-system
```

- Redis

```sh
# Run your Redis instance
sudo apt install redis-server
sudo systemctl redis-server start
```

```sh
cd order-service
yarn

cd payment-service
yarn
```

## Setup Environment Variables

1. `export SECRET="your-own-secret"`
2. `export PGUSER="your-postgres-username"`
3. `export PGPASSWORD="your-postgres-password"`

# Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change

## Steps

1. Fork this
2. Create your feature branch (`git checkout -b feature/fooBar`)
3. Commit your changes (`git commit -am 'Add some fooBar'`)
4. Push to the branch (`git push origin feature/fooBar`)
5. Create a new Pull Request
