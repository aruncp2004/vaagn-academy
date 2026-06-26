/**
 * VIEM Razorpay Integration
 * File: js/razorpay.js
 *
 * How it works:
 *  - Course page Enroll buttons → admissions.html?course=ev-master-class&mode=online
 *  - admissions.html reads URL params, pre-fills form
 *  - On "Apply Now" → viemPay() is called with form data
 *  - On payment success → viemSendToSheets() saves to Google Sheets (Admissions + Payment)
 */

const VIEM_RAZORPAY_KEY = "rzp_test_T67iJuNIYWC6ev";

// Switch to live key when going live:
// const VIEM_RAZORPAY_KEY = "rzp_live_XXXXXXXXXX";

const VIEM_COURSES = {
  "ev-master-class":     { name: "EV Master Class",       description: "1-Month Intensive EV Training Program" },
  "battery-technology":  { name: "Battery Technology",     description: "Advanced Battery Systems & Management" },
  "ev-powertrain":       { name: "EV Powertrain",          description: "Electric Powertrain Engineering" },
  "ev-entrepreneurship": { name: "EV Entrepreneurship",    description: "Build Your EV Business from Scratch" },
  "general":             { name: "VIEM Course Enrollment", description: "Vaagn Institute of Electric Mobility" }
};

const VIEM_MODES = {
  "online":  { label: "Online",  amount: 9999  },
  "hybrid":  { label: "Hybrid",  amount: 16999 },
  "offline": { label: "Offline", amount: 24999 }
};

// ── Replace with your Google Apps Script Web App URL once deployed ──────────
const VIEM_SHEETS_URL = "YOUR_GOOGLE_APPS_SCRIPT_URL";
// ────────────────────────────────────────────────────────────────────────────

/**
 * Main payment function — called from admissions.html "Apply Now"
 * @param {object} formData - { name, email, phone, qualification, course, mode, batch }
 */
function viemPay(formData) {
  const course   = VIEM_COURSES[formData.course] || VIEM_COURSES["general"];
  const modeInfo = VIEM_MODES[formData.mode];

  if (!modeInfo) {
    viemShowMessage("payment-msg", "error", "Invalid mode selected. Please refresh and try again.");
    return;
  }

  const amountPaise = modeInfo.amount * 100; // Razorpay needs paise

  const options = {
    key:         VIEM_RAZORPAY_KEY,
    amount:      amountPaise,
    currency:    "INR",
    name:        "VIEM — Vaagn Institute of Electric Mobility",
    description: course.name + " | " + modeInfo.label + " Mode",
    image:       window.location.origin + "/images/logo.png",

    prefill: {
      name:    formData.name    || "",
      email:   formData.email   || "",
      contact: formData.phone   || ""
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
      ondismiss: function () {
        viemShowMessage("payment-msg", "warning",
          "Payment cancelled. Click <strong>Apply Now</strong> again whenever you're ready."
        );
      }
    },

    handler: function (response) {
      const paymentId = response.razorpay_payment_id;

      // Save to Google Sheets
      viemSendToSheets(paymentId, formData, modeInfo);

      // Show success
      viemShowMessage("payment-msg", "success",
        "🎉 Enrollment Confirmed!<br>" +
        "Payment ID: <strong>" + paymentId + "</strong><br>" +
        "Course: <strong>" + course.name + " — " + modeInfo.label + "</strong><br><br>" +
        "Our team will contact you on <strong>" + formData.phone + "</strong> within 24 hours."
      );

      // Disable the submit button so they can't double-pay
      const btn = document.getElementById("admission-submit-btn");
      if (btn) {
        btn.disabled = true;
        btn.textContent = "Enrolled ✓";
        btn.style.background = "#22c55e";
      }

      // Scroll to message
      const msg = document.getElementById("payment-msg");
      if (msg) msg.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  try {
    const rzp = new Razorpay(options);

    rzp.on("payment.failed", function (response) {
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
 * Save to Google Sheets — writes to both Admissions and Payment sheets
 */
function viemSendToSheets(paymentId, formData, modeInfo) {
  if (!VIEM_SHEETS_URL || VIEM_SHEETS_URL === "YOUR_GOOGLE_APPS_SCRIPT_URL") {
    console.warn("Google Sheets URL not set. Skipping save.");
    return;
  }

  const course = VIEM_COURSES[formData.course] || VIEM_COURSES["general"];
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  const payload = {
    // Admissions sheet columns
    timestamp:     timestamp,
    name:          formData.name,
    email:         formData.email,
    phone:         formData.phone,
    qualification: formData.qualification,
    course:        course.name,
    mode:          modeInfo.label,
    batch:         formData.batch,
    // Payment sheet columns
    payment_id:    paymentId,
    amount:        modeInfo.amount,
    currency:      "INR",
    status:        "Paid"
  };

  fetch(VIEM_SHEETS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
  .then(res => res.text())
  .then(data => console.log("✅ Saved to Sheets:", data))
  .catch(err => console.error("❌ Sheets save error:", err));
}

/**
 * Show a styled message box
 */
function viemShowMessage(id, type, html) {
  let el = document.getElementById(id);
  if (!el) return;

  const styles = {
    success: { bg: "#f0fdf4", border: "#22c55e", color: "#15803d" },
    error:   { bg: "#fef2f2", border: "#ef4444", color: "#b91c1c" },
    warning: { bg: "#fffbeb", border: "#f59e0b", color: "#92400e" }
  };
  const s = styles[type] || styles["warning"];

  el.style.background    = s.bg;
  el.style.borderColor   = s.border;
  el.style.color         = s.color;
  el.innerHTML           = html;
  el.style.display       = "block";
}