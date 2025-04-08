# Confluent Kafka JS 

## Requrements
- Node.js >= 18
- librdkafka

## Installation
```bash
# Install librdkafka
sudo mkdir -p /etc/apt/keyrings
wget -qO - https://packages.confluent.io/deb/7.8/archive.key | gpg --dearmor | sudo tee /etc/apt/keyrings/confluent.gpg > /dev/null
sudo apt-get update
sudo apt install librdkafka-dev

# Set Variables
export CKJS_LINKING=dynamic
export BUILD_LIBRDKAFKA=0

# Install the packages
npm install
```

## Run Consumer
```bash
npm run consumer
```

## Run Producer
```bash
npm run producer
```

