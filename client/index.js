/* eslint-disable consistent-return, new-cap, no-alert, no-console */

var order = {
  purchase_units: [
    {
      amount: {
        currency_code: "EUR",
        value: "49.99",
      },
    },
  ],
  application_context: {
    return_url: `${window.location.origin}/success`,
    cancel_url: `${window.location.origin}/cancel`,
  },
};

/* Paypal */
paypal
  .Marks({
    fundingSource: paypal.FUNDING.PAYPAL,
  })
  .render("#paypal-mark");

paypal
  .Buttons({
    fundingSource: paypal.FUNDING.PAYPAL,
    style: {
      label: "pay",
      color: "silver",
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
    },
  })
  .render("#paypal-btn");

/* iDEAL  */
paypal
  .Marks({
    fundingSource: paypal.FUNDING.IDEAL,
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
        letterSpacing: "0.3",
      },
      input: {
        backgroundColor: "white",
        fontSize: "16px",
        color: "#333",
        borderColor: "#dbdbdb",
        borderRadius: "4px",
        borderWidth: "1px",
        padding: "1rem",
      },
      invalid: {
        color: "red",
      },
      active: {
        color: "black",
      },
    },
    fields: {
      name: {
        value: "",
      },
    },
  })
  .render("#ideal-fields");

paypal
  .Buttons({
    fundingSource: paypal.FUNDING.IDEAL,
    upgradeLSAT: true,
    style: {
      label: "pay",
    },
    createOrder(data, actions) {
      return actions.order.create(order);
    },
    onApprove(data, actions) {
      fetch(`/capture/${data.orderID}`, {
        method: "post",
      })
        .then((res) => res.json())
        .then(({ id }) => {
          swal("Order Captured!", `id: ${id}`, "success");
        })
        .catch(console.error);
    },
    onCancel(data, actions) {
      console.log("onCancel called");
    },
    onError(err) {
      console.error(err);
    },
  })
  .render("#ideal-btn");

var idealFields = document.body.querySelector("#ideal-fields");
var idealBtn = document.getElementById("ideal-btn");
var paypalBtn = document.body.querySelector("#paypal-btn");

/* radio buttons */
document.querySelectorAll("input[name=payment-option]").forEach((el) => {
  // handle button toggles
  el.addEventListener("change", (event) => {
    switch (event.target.value) {
      case "paypal":
        idealFields.style.display = "none";
        idealBtn.style.display = "none";
        paypalBtn.style.display = "block";
        break;
      case "ideal":
        idealFields.style.display = "block";
        idealBtn.style.display = "block";
        paypalBtn.style.display = "none";
        break;
      case "sofort":
        idealFields.style.display = "none";
        idealBtn.style.display = "none";
        paypalBtn.style.display = "none";
        break;
      default:
        break;
    }
  });
});

idealFields.style.display = "none";
idealBtn.style.display = "none";
