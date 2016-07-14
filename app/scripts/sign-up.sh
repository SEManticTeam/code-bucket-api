curl --include --request POST http://localhost:3000/sign-up \
  --header "Content-Type: application/json" \
  --data '{
    "credentials": {
      "email": "pia2",
      "password": "password2",
      "password_confirmation": "password2",
      "givenName": "Sarah",
      "surname": "P"
    }
  }'
