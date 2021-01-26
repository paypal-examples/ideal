# Paying with iDEAL and PayPal


**Please note this is a developer preview and is only available currently on sandbox**

This integration uses the JavaScript SDK to accept iDEAL payments


See a [hosted version](https://demo-ideal-js-sdk-intergration.herokuapp.com/) of the sample

**Features:**
- Accept iDEAL and PayPal payments 🏦 💶
- Localization in over 25 different languages 🌍
- Themeable styles 
- Receiving Webhook events  🪝

**Demo:** 

<p align="center">
  <img src="./ideal-paypal-payment.gif" alt="Collecting an iDEAL payment">
</p>

## How to run locally

This server example implementation uses Node.js, and the client side uses a radio button markup to display payment options.

1. Clone the repo  `git clone git@github.com:paypal-examples/ideal-paypal-payment-js-sdk.git`

2. Run `npm install`


3. Copy the .env.example file into a file named .env

```
cp .env.example .env
```

and configure your `.env` config file with your Paypal Sandbox
`CLIENT_ID` and `CLIENT_SECRET`

these can be obtained [here](https://developer.paypal.com/docs/api-basics/sandbox/credentials/)


(If you would like to run the example without configuring webhooks you can skip 4 & 5)

4.  Run the local webhook server `npm run webhook-server` take note of the webhookId 


5. Update your `.env` file with the `WEBHOOK_ID` value


6. Update `client/index.html` `<script>` src `clientId` param with your `CLIENT_ID`

   `https://www.paypal.com/sdk/js?client-id=<CLIENT_ID>&...`

6. Start the server; in another terminal run `npm start`


7. Navigate to http://localhost:8080/


&nbsp;

## Intergration Guide


**Loading the JavaScript SDK**


The sdk requires the following query params to be configured when loaded to accept ideal payments

| **Param**   |       **Value**     |
|----------|:-------------:|
| client-id |   PayPal ClientId  |
| components |  buttons,fields,marks |
| buyer-country |    NL   |
| currency | EUR |

Example:

```
<script src="https://www.paypal.com/sdk/js?client-id=<PAYPAL_CLIENT_ID>&components=buttons,fields,marks&buyer-country=NL&currency=EUR"></script>
```

### Components

**Mark**

Use the following iDEAL mark when you show iDEAL as a payment option:

 <img src="./mark.png" width="60px" alt="iDeal Mark">
  
```
paypal
  .Marks({
    fundingSource: paypal.FUNDING.IDEAL
  })
  .render("#ideal-mark");
```

**Fields**

Render the fields to capture required customer information.

It gives the option to prefil the customer name field if this is already obtained via `fields.name.value` property.

<img src="./fields.png" width="540px" alt="iDeal Fields">

```
paypal
  .Fields({
    fundingSource: paypal.FUNDING.IDEAL,
	  style: { /* omitted for brevity */ },
    fields: {
      name: {
        value: ""
      }
    }
  })
  .render("#ideal-fields");
```
(Optional)  Fields style object:

If you would like to customize the visual apperance of the fields
```
{
  base: {
    backgroundColor: "white",
    color: "black",
    fontSize: "16px",
    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    lineHeight: "1.4",
    letterSpacing: "0.3"
  },
  input: {
    backgroundColor: "white",
    fontSize: "16px",
    color: "#333",
    borderColor: "#dbdbdb",
    borderRadius: "4px",
    borderWidth: "1px",
    padding: "1rem"
  },
  invalid: {
    color: "red"
  },
  active: {
    color: "black"
  }
}
```

**Button**

The button orchestrates communication with the fields, order creation and handles in context payment experience.

 <img src="./button.png"  width="600px" alt="iDeal Button">

```
paypal
  .Buttons({
    fundingSource: paypal.FUNDING.IDEAL,
    style: {
      label: "pay"
    },
    createOrder(data, actions) {
      /* see order payload info */
      return actions.order.create(order);
    },
    onApprove(data, actions) {
       console.log("order approved")
    },
    onCancel(data, actions) {
      console.log("onCancel called");
    },
    onError(err) {
      console.error(err);
    }
  })
  .render("#ideal-btn");
  ```

##### Order Payload:

Please note iDEAL orders are required to be created in `EUR`
```
{
  purchase_units: [
    {
      amount: {
        currency_code: "EUR",
        value: "49.99"
      }
    }
  ],
  application_context: {
    return_url: `${window.location.origin}/success`,
    cancel_url: `${window.location.origin}/cancel`
  }
}
```

&nbsp;

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://www.paypal.com/il/webapps/mpp/security/general-reportingsecurityissues?locale.x=en_IL) details the procedure for disclosing security issues.
