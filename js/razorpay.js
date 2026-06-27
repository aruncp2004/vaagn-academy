/**
 * VIEM Razorpay Integration
 * File: js/razorpay.js
 */

const VIEM_RAZORPAY_KEY = "rzp_live_T6GErCRkljl8Px";

const VIEM_COURSES = {
  "ev-master-class":     { name: "EV Master Class",       description: "1-Month Intensive EV Training Program" },
  "battery-technology":  { name: "Battery Technology",     description: "Advanced Battery Systems & Management" },
  "ev-powertrain":       { name: "EV Powertrain",          description: "Electric Powertrain Engineering" },
  "ev-entrepreneurship": { name: "EV Entrepreneurship",    description: "Build Your EV Business from Scratch" },
  "general":             { name: "VIEM Course Enrollment", description: "Vaagn Institute of Electric Mobility" }
};

const VIEM_MODES = {
  "online":  { label: "Online",  amount: 11799 },
  "hybrid":  { label: "Hybrid",  amount: 20059 },
  "offline": { label: "Offline", amount: 29499 }
};

const VIEM_SHEETS_URL = "https://script.google.com/macros/s/AKfycbykyEt4PWG3wSIEm6VwvDXPBHyD5ouyyRW5dxkAcbJhgKRAvr8cdh66ujySBls6fyqq5A/exec";

/**
 * Main payment function
 * @param {object} formData - { name, email, phone, qualification, course, mode, batch }
 */
function viemPay(formData) {
  const course   = VIEM_COURSES[formData.course] || VIEM_COURSES["general"];
  const modeInfo = VIEM_MODES[formData.mode];

  if (!modeInfo) {
    viemShowMessage("payment-msg", "error", "Invalid mode selected. Please refresh and try again.");
    return;
  }

  const options = {
    key:         VIEM_RAZORPAY_KEY,
    amount:      modeInfo.amount * 100,
    currency:    "INR",
    name:        "VIEM — Vaagn Institute of Electric Mobility",
    description: course.name + " | " + modeInfo.label + " Mode (incl. GST)",
    image:       window.location.origin + "/images/logo.png",

    prefill: {
      name:    formData.name  || "",
      email:   formData.email || "",
      contact: formData.phone || ""
    },

    notes: {
      course:        course.name,
      mode:          modeInfo.label,
      batch:         formData.batch         || "",
      qualification: formData.qualification || "",
      website:       "academy.vaagnauto.com"
    },

    theme: { color: "#1B3A6B" },

    modal: {
      ondismiss: function() {
        document.body.style.overflow = '';
        document.documentElement.style.overflow = '';
        viemShowMessage("payment-msg", "warning",
          "Payment cancelled. Click <strong>Apply Now</strong> again whenever you're ready."
        );
      }
    },

    handler: function(response) {
      const paymentId = response.razorpay_payment_id;

      // Re-enable page scroll
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';

      // Show success message
      viemShowMessage("payment-msg", "success",
        "🎉 Enrollment Confirmed!<br>" +
        "Payment ID: <strong>" + paymentId + "</strong><br>" +
        "Course: <strong>" + course.name + " — " + modeInfo.label + "</strong><br><br>" +
        "Redirecting you to confirmation page..."
      );

      // Disable submit button
      const btn = document.getElementById("admission-submit-btn");
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Enrolled ✓";
        btn.style.background = "#22c55e";
      }

      // Scroll to message
      const msg = document.getElementById("payment-msg");
      if (msg) msg.scrollIntoView({ behavior: "smooth", block: "center" });

      // Call admissions.js handler (Google Sheets + WhatsApp)
      if (typeof window.viemOnPaymentSuccess === "function") {
        window.viemOnPaymentSuccess(paymentId, formData, {
          label:      modeInfo.label,
          amount:     modeInfo.amount,
          courseName: course.name
        });
      }

      // Redirect to thank-you page after 3 seconds
      setTimeout(function() {
        window.location.href = window.location.origin + '/thank-you.html';
      }, 3000);
    }
  };

  try {
    const rzp = new Razorpay(options);

    rzp.on("payment.failed", function(response) {
      viemShowMessage("payment-msg", "error",
        "❌ Payment failed: " + (response.error.description || "Please try again.") +
        "<br>Code: " + (response.error.code || "N/A")
      );
    });

    rzp.open();
  } catch (e) {
    console.error("Razorpay init error:", e);
    viemShowMessage("payment-msg", "error",
      "Could not open payment window. Please refresh and try again."
    );
  }
}

/**
 * Show a styled message box
 */
function viemShowMessage(id, type, html) {
  const el = document.getElementById(id);
  if (!el) return;

  const styles = {
    success: { bg: "#f0fdf4", border: "#22c55e", color: "#15803d" },
    error:   { bg: "#fef2f2", border: "#ef4444", color: "#b91c1c" },
    warning: { bg: "#fffbeb", border: "#f59e0b", color: "#92400e" }
  };
  const s = styles[type] || styles["warning"];

  el.style.background  = s.bg;
  el.style.borderColor = s.border;
  el.style.color       = s.color;
  el.innerHTML         = html;
  el.style.display     = "block";
}