# Watchtower

## Introduction

Watchtower is a system that allows users to track changes in a group of webpages defined by themselves in their accounts. It goes through all the webpages and checks if the content is different than a previous version also tracked when the user registered.

## Terminology

- Expectator: Entity that contains information from the user including the urls the user wants to track.
- History: Entity holding information about the trackings performed to a list of urls defined by the Expectator.

## Installation

In order to install this project:

1.  Install the dependencies by running `npm install`
2.  Copy `.env.example` as `.env` and define your own configuration parameters inside of it.

## Configuration

The data being shown below is the content of the `.env.example`, in order to successfully run the application and all its components, the right configuration has to be defined as shown.

```
APP_PORT=5000
DB_URL="mongodb://localhost/watchtower_db"
SENDGRID_API_KEY=""
TWILIO_ACCOUNT_SID=""
TWILIO_AUTH_TOKEN=""
SPREADSHEET_ID=""
```

The used database system is MongoDB.

Credentials for Twilio and Sendgrid can be gotten by creating an account on the respective services and requesting API Credentials.

In the case of Spreadsheet Id, a service account has to be created in [Google Developers Console](https://console.developers.google.com/) with Editor Access to Google Drive API, and the resulting json (credentials file) has to be placed in the `.secret` directory in the root of the codebase, then a Spreadsheet has to be created in Google Drive and the spreadsheet id set in `SPREADSHEET_ID` key inside the `.env` file.

**Note:** For testing purposes, a spreadsheet id and a credentials file is provided in the codebase (not recommended for production environments), the resulting spreadsheet can be found [here](https://docs.google.com/spreadsheets/d/1h8MejMqrL-1-ot9ZUOyIWvkpXFXHqAaJex64aWG6wMA/edit).

## Setup and run

This project contains two main entrypoints. The first one will be a REST API allowing the developer to perform POST operations to create new Expectators, while the second one is a command that analyzes web pages contained by the Expectator profile and records tracking results.

If you wish to run the API, is enough to execute the following command:

```bash
npm run serve
```

In the case of the tracking command, you can run it by executing:

```bash
npm run track
```

In order to create a new Expectator in the system, a **POST** operation can be performed to the `/api/expectators` endpoint (check the example below)

```bash
curl -X POST \
  http://localhost:5000/api/expectators \
  -H 'content-type: application/json' \
  -d '{
	"fullName": "John Doe",
	"email": "john.doe@example.test",
	"phoneNumber": "+49111111111111",
	"urls": [
		{"url": "https://github.com"},
		{"url": "https://www.wikipedia.org/"},
		{"url": "http://www.columbia.edu/~fdc/sample.html"}
	],
	"notificationMethod": "email"
}'
```

**Note:** Please, make sure the email and phone number are valid and existent, and the notification method is either `email` or `sms`, otherwise, the notifications will throw an exception because of not valid method found or in case of invalid data, nothing will be received.
