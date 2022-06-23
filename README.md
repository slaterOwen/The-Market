# The-Market

[![Build Status](https://www.travis-ci.com/d-mooers/The-Market-Client.svg?branch=development)](https://www.travis-ci.com/d-mooers/The-Market-Client)

## Project Blurb

"The Market" is a place where users can buy and sell their personal items. Users have the ability to register their account with their email address, password, and a profile pic. Once registered, users have the option to post their items online for others to see, that can include a picture, description, and tags relating to the item. Once posted, buyers have the ability to view the item and its geolocation, and decide if they want to purchase and proceed through a checkout system, or also have the option to send the seller a message to start a conversation. Users also have the ability to view their own profile page where they can see their personal info, view what items they have up for sale, and also have the ability to log out as well as delete their account if they want to. 


## UI Prototype
https://www.figma.com/file/aweT6Lubsw0h6slzXWJ8Xw/Wireframe?node-id=0%3A1

https://www.figma.com/file/aweT6Lubsw0h6slzXWJ8Xw/Wireframe?node-id=0%3A1

## Developer Env Set Up

To Install Pyton Packages: 
 - `pip install -r api/requirements.txt`

To Install Node Packages:
- `cd client`
- `npm install`

To Start Flask Backend:
 - `cd api`
 - `export FLASK_APP=App.py`
 - `export FLASK_ENV=development`
 - `flask run`

To Start Frontend:
- `cd client`
- `npm run start`

Style Guides used

Prettier extension inside VS code (for JavaScript)
- To install, open possible extentions in VS code and download Prettier
- Follow steps by pasting given code into your VS code settings

Pycodestyle (for Python)
- To install, run pip install pycodestyle



## Diagrams

Class Diagram: https://github.com/d-mooers/The-Market-Client/wiki/Class-Diagram

UseCase Diagram: https://github.com/d-mooers/The-Market-Client/wiki/Class-Diagram
