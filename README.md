# Paying with iDEAL


This integration uses the JavaScript SDK to accept iDEAL payments


See a [hosted version](https://demo-ideal-js-sdk-intergration.herokuapp.com/) of the sample

**Features:**
- Accept iDEAL and Paypal payments 🏦 💶
- Localization in over 25 different languages 🌍
- Themeable styles


**Demo:** 

<p align="center">
  <img src="./ideal-paypal-payment.gif" alt="Collecting an iDEAL payment">
</p>

### How to run locally

Copy the .env.example file into a file named .env

```
cp .env.example .env
```

and configuring your .env config file with your Paypal API keys.

1. Clone the repo  `git clone git@github.com:paypal-examples/ideal-paypal-payment.git`
2. Run `npm install`
3. Run `npm start`
4. Navigate to `http://localhost:8080/`


&nbsp;
### Intergration

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


