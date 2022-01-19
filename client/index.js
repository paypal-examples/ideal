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
  .PaymentFields({
    fundingSource: paypal.FUNDING.IDEAL,
    style: {
      variables: {
        fontFamily: "'Helvetica Neue', Arial, sans-serif",
        fontSizeBase: "0.9375rem",
        fontSizeSm: "0.93rem",
        fontSizeM: "0.93rem",
        fontSizeLg: "1.0625rem",
        textColor: "#2c2e2f",
        colorTextPlaceholder: "#2c2e2f",
        colorBackground: "#fff",
        colorInfo: "#0dcaf0",
        colorDanger: "#d20000",
        borderRadius: "0.2rem",
        borderColor: "#dfe1e5",
        borderWidth: "1px",
        borderFocusColor: "black",
        spacingUnit: "10px",
      },
      rules: {
        ".Input": {},
        ".Input:hover": {},
        ".Input:focus": {
        },
        ".Input:active": {},
        ".Input--invalid": {},
        ".Label": {},
        ".Error": {
          marginTop: '2px',
        },
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
        .then((data) => {
          console.log(data);
          swal(
            "Order Captured!",
            `Id: ${data.id}, ${Object.keys(data.payment_source)[0]}, ${
              data.purchase_units[0].payments.captures[0].amount.currency_code
            } ${data.purchase_units[0].payments.captures[0].amount.value}`,
            "success"
          );
        })
        .catch(console.error);
    },
    onCancel(data, actions) {
      console.log(data);
      swal("Order Canceled", `ID: ${data.orderID}`, "warning");
    },
    onError(err) {
      console.error(err);
    },
  })
  .render("#ideal-btn");

document.getElementById("ideal-btn").style.display = "none";
document.getElementById("ideal-fields").style.display = "none";

/* radio buttons */
document.querySelectorAll("input[name=payment-option]").forEach((el) => {
  el.addEventListener("change", (event) => {
    switch (event.target.value) {
      case "paypal":
        document.getElementById("ideal-fields").style.display = "none";
        document.getElementById("ideal-btn").style.display = "none";
        document.getElementById("paypal-btn").style.display = "block";
        break;
      case "ideal":
        document.getElementById("ideal-fields").style.display = "block";
        document.getElementById("ideal-btn").style.display = "block";
        document.getElementById("paypal-btn").style.display = "none";
        break;
      default:
        break;
    }
  });
});
