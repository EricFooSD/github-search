# Github-search

Features:

Searching Github with user interface

Search categories:

1. Users ( name and location ) - Released
2. Repositories - Development

## Stack

Frontend > React.js, MUI

Backend > Node.js, Express server

Webpack compiler

## How to set up

1. Git clone repo

2. Install node modules. in terminal run command : " npm install "

3. Create a github access token https://github.com/settings/tokens. [Read-access should be sufficient]
   https://www.youtube.com/watch?v=5Pvo-yzCX1w

4. Create a file ".env" in root folder of cloned repo. In .env file insert GITHUB_TOKEN="[Your Personal Token Here]". Replace your personal github access token.

5. Run script to compile. In terminal run command : " nodemon index.mjs "

6. When compiled, hit http://localhost:3004/

Homepage
<img width="980" alt="Screenshot 2022-10-20 at 1 05 00 PM" src="https://user-images.githubusercontent.com/86565793/196861521-992ae3c3-c191-4250-9eed-a1193c7114af.png">

User search
<img width="975" alt="Screenshot 2022-10-20 at 1 05 08 PM" src="https://user-images.githubusercontent.com/86565793/196861525-4184a105-1294-4975-b103-000b137980a9.png">

Search requests
<img width="1023" alt="Screenshot 2022-10-20 at 1 07 01 PM" src="https://user-images.githubusercontent.com/86565793/196861548-8ef56d4b-db44-435f-aae9-ae2afe27618c.png">

Error Message
<img width="1023" alt="Screenshot 2022-10-20 at 1 07 01 PM" src="https://user-images.githubusercontent.com/86565793/196861656-c27fc4d5-7727-42a3-bf56-2971737fa04c.png">
