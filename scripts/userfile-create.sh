#!/bin/sh
curl --include --request POST http://localhost:3000/userFiles \
--header "Authorization: Token token=fQz0Qr+8q0zxYp4vAvf2P5s8rSaYM+UtK8/5dImBo2Q=--RRt83XdJnbxLGZFanqkF7C7fH+gMZ76JxZQCGJyV+7w=" \
--header "Content-Type: application/json" \
--data '{
  "userFile": {
    "name": "Test File One",
    "storageLinks": "1234567",
    "tags": "test",
    "owner": "577e7855c27c443f2869250b"
  }
}'
