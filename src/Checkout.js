import React, { useContext, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { AuthToken } from "./Token";
export default function Checkout() {
  function Message({ content }) {
    return <p className="text-white ">{content}</p>;
  
  }
  const navigate = useNavigate();
  const [active, setActive] = useState(true);
  const { CartValue } = useContext(AuthToken);
  const initialOptions = {
    "client-id":
      "AfKw6hNf1aDBORgmI0VfrBLqUPWdKwB0aT0FUjqMJA7swZDkjc4rYU0SYnRv1D7vG1DUpnx5_bdbau6O",
    "enable-funding": "venmo",
    "disable-funding": "",
    "buyer-country": "US",
    currency: "USD",
    "data-page-type": "product-details",
    components: "buttons",
    "data-sdk-integration-source": "developer-studio",
  };
  const [message, setMessage] = useState("");
  return (
    <>
      <div className="flex flex-row justify-center items-center">
        {active ? (
  <div className="App">
  <PayPalScriptProvider options={initialOptions}>
    <PayPalButtons
      style={{
        shape: "rect",
        layout: "vertical",
        color: "gold",
        label: "paypal",
      }}
      createOrder={async () => {
        try {
          const response = await fetch(
            "http://192.168.29.73:5000/api/orders",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              // use the "body" param to optionally pass additional order information
              // like product ids and quantities
              body: JSON.stringify({
                value: CartValue,
              }),
            }
          );

          const orderData = await response.json();

          if (orderData.id) {
            return orderData.id;
          } else {
            const errorDetail = orderData?.details?.[0];
            const errorMessage = errorDetail
              ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
              : JSON.stringify(orderData);

            throw new Error(errorMessage);
          }
        } catch (error) {
          console.error(error);
          setMessage(`Could not initiate PayPal Checkout...${error}`);
        }
      }}
      onApprove={async (data, actions) => {
        try {
          const response = await fetch(
            `http://192.168.29.73:5000/api/orders/${data.orderID}/capture`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          const orderData = await response.json();
          // Three cases to handle:
          //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
          //   (2) Other non-recoverable errors -> Show a failure message
          //   (3) Successful transaction -> Show confirmation or thank you message

          const errorDetail = orderData?.details?.[0];

          if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
            // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
            // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
            return actions.restart();
          } else if (errorDetail) {
            // (2) Other non-recoverable errors -> Show a failure message
            throw new Error(
              `${errorDetail.description} (${orderData.debug_id})`
            );
          } else {
            // (3) Successful transaction -> Show confirmation or thank you message
            // Or go to another URL:  actions.redirect('thank_you.html');
            const transaction =
              orderData.purchase_units[0].payments.captures[0];
            setMessage(
              `Transaction ${transaction.status}: ${transaction.id}. Thank you for ordering from us, we hope you have a good day!`
            );
            console.log(
              "Capture result",
              orderData,
              JSON.stringify(orderData, null, 2)
            );
            setActive(false);
            setTimeout(() => {
                navigate('/home');
                }, 7000);
          }
        } catch (error) {
          console.error(error);
          setMessage(
            `Sorry, your transaction could not be processed...${error}`
          );
        }
      }}
    />
  </PayPalScriptProvider>
</div>
        ) : " "}
      
       {active? "" : <Message content={message} /> } 
      </div>
    </>
  );
}
