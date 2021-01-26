# Paying with iDEAL


This integration uses the JavaScript SDK to accept iDEAL payments


See a [hosted version](https://demo-ideal-js-sdk-intergration.herokuapp.com/) of the sample

**Features:**
- Accept iDEAL and Paypal payments 🏦 💶
- Localization in over 25 different languages 🌍
- Themeable styles
- Handling webhook events

**Demo:** 

<p align="center">
  <img src="./ideal-paypal-payment.gif" alt="Collecting an iDEAL payment">
</p>

## How to run locally

This server example implementation uses Node.js

1. Clone the repo  `git clone git@github.com:paypal-examples/ideal-paypal-payment.git`

2. Copy the .env.example file into a file named .env

```
cp .env.example .env
```

and configuring your `.env` config file with your Paypal Sandbox
`CLIENT_ID` and `CLIENT_SECRET`

these can be obtained here https://developer.paypal.com/docs/api-basics/sandbox/credentials/

3. Run `npm install`


4. Run the local webhook server `npm run webhook-server` this will display a webhookId, 


5. please update your `.env` file with the `WEBHOOK_ID` value


6. Start the server; in another terminal run `npm start`


7. Navigate to http://localhost:8080/


&nbsp;
## Intergration

JavaScript SDK

| **Param**   |       **Value**     |
|----------|:-------------:|
| client-id |    sb  (sandbox) |
| components |  buttons,fields,marks |
| buyer-country |    NL   |
| currency | EUR |


```
<script src="https://www.paypal.com/sdk/js?client-id=<PAYPAL_CLIENT_ID>&components=buttons,fields,marks&buyer-country=NL&currency=EUR"></script>
```


## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://www.paypal.com/il/webapps/mpp/security/general-reportingsecurityissues?locale.x=en_IL) details the procedure for disclosing security issues.
