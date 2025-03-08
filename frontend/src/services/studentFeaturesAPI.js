import { toast } from "react-hot-toast";
import rzpLogo from "../assets/edtechLogo.png";
import { endpoints } from "../services/api";
import axios from "axios";

const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = endpoints;

// Load the Razorpay SDK from the CDN
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

// Buy the Course
export async function BuyCourse(token, courses, user_details, navigate) {
  const toastId = toast.loading("Loading...");
  try {
    // Loading the script of Razorpay SDK
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      toast.error(
        "Razorpay SDK failed to load. Check your Internet Connection."
      );
      return;
    }

    // Initiating the Order in Backend
    const orderResponse = await axios.post(
      COURSE_PAYMENT_API,
      { courses },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    console.log(
      "PAYMENT RESPONSE FROM BACKEND............",
      orderResponse.data
    );

    // Opening the Razorpay SDK
    const options = {
      key: process.env.RAZORPAY_KEY,
      currency: orderResponse.data.data.currency,
      amount: `${orderResponse.data.data.amount}`,
      order_id: orderResponse.data.data.id,
      name: "SmartLearn",
      description: "Thank you for Purchasing the Course.",
      image: rzpLogo,
      prefill: {
        name: user_details.name,
        email: user_details.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.data.amount,
          token
        );
        verifyPayment({ ...response, courses }, token, navigate);
      },
    };
    const paymentObject = new window.Razorpay(options);

    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      toast.error("Oops! Payment Failed.");
      console.log(response.error);
    });
  } catch (error) {
    console.log("PAYMENT API ERROR............", error);
    toast.error("Instructor cannot buy Course");
  }
  toast.dismiss(toastId);
}

// Verify the Payment
async function verifyPayment(bodyData, token, navigate) {
  const toastId = toast.loading("Verifying Payment...");
  try {
    const response = await axios.post(COURSE_VERIFY_API, bodyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("VERIFY PAYMENT RESPONSE FROM BACKEND............", response);

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Payment Successful. You are Added to the course ");
    navigate("/dashboard/enrolled-courses");
  } catch (error) {
    console.log("PAYMENT VERIFY ERROR............", error);
    toast.error("Could Not Verify Payment.");
  }
  toast.dismiss(toastId);
}

// Send the Payment Success Email
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await axios.post(
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR............", error);
  }
}
