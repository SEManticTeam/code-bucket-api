curl --include --request POST http://localhost:3000/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "pia1",
      "password": "password",
      "password_confirmation": "password",
      "givenName": "Sarah",
      "surname": "P"
    }
  }'
