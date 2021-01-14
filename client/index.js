/* eslint-disable consistent-return, new-cap, no-alert, no-console */

// to handle both localhost and deployment urls, remove any filepaths eg /index.html
const href = window.location.href;
const MECHANT_BASE_URL = href.substring(0, href.lastIndexOf('/'));

const order = {
  purchase_units: [
    {
      amount: {
        currency_code: "EUR",
        value: "49.99"
      }
    }
  ],
  application_context: {
    return_url: `${MECHANT_BASE_URL}/success`,
    cancel_url: `${MECHANT_BASE_URL}/cancel`
  }
};

/* ----
* Paypal
------ */
paypal
  .Marks({
    fundingSource: paypal.FUNDING.PAYPAL
  })
  .render("#paypal-mark");

paypal
  .Buttons({
    fundingSource: paypal.FUNDING.PAYPAL,

    style: {
      label: "pay"
    },

    createOrder(data, actions) {
      return actions.order.create(order);
    },
    onApprove(data, actions) {
      return actions.order.capture().then((details) => {
        alert(`Transaction completed by ${details.payer.name.given_name}!`);
      });
    },
    onCancel(data, actions) {
      console.log("onCancel called");
    },
    onError(err) {
      console.error(err);
    }
  })
  .render("#paypal-btn");

/* -----
* iDEAL
------ */
paypal
  .Marks({
    fundingSource: paypal.FUNDING.IDEAL
  })
  .render("#ideal-mark");

paypal
  .Fields({
    fundingSource: paypal.FUNDING.IDEAL,
    style: {
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
    },
    fields: {
      name: {
        value: ""
      }
    }
  })
  .render("#ideal-container");

paypal
  .Buttons({
    fundingSource: paypal.FUNDING.IDEAL,
    upgradeLSAT: true,
    style: {
      label: "pay"
    },

    createOrder(data, actions) {
      return actions.order.create(order);
    },
    onApprove(data, actions) {
      return actions.order.capture().then((details) => {
        alert(`Transaction completed by ${details.payer.name.given_name}!`);
      });
    },
    onCancel(data, actions) {
      console.log("onCancel called");
    },
    onError(err) {
      console.error(err);
    }
  })
  .render("#ideal-btn");


document.querySelectorAll("input[name=payment-option]").forEach((el) => {
  // handle button toggles
  el.addEventListener("change", (event) => {
    switch (event.target.value) {
      // Hide / display elements
      case "paypal":
        document.body.querySelector("#ideal-container").style.display = "none";
        document.getElementById("ideal-btn").style.display = "none";
        document.body.querySelector("#paypal-btn").style.display = "block";
        break;
      case "ideal":
        document.body.querySelector("#ideal-container").style.display = "block";
        document.getElementById("ideal-btn").style.display = "block";
        document.body.querySelector("#paypal-btn").style.display = "none";
        break;
      case "sofort":
        document.body.querySelector("#ideal-container").style.display = "none";
        document.getElementById("ideal-btn").style.display = "none";
        document.body.querySelector("#paypal-btn").style.display = "none";
        break;
      default:
        break;
    }
  });
});

document.body.querySelector("#ideal-container").style.display = "none";
document.getElementById("ideal-btn").style.display = "none";


