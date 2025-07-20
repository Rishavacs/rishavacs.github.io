import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
  import {
    GoogleAuthProvider,
    FacebookAuthProvider,
    TwitterAuthProvider,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    getAuth
  } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBXU1sJS_u8HJmewmPLj90GLHjWWt1Z9Mw",
    authDomain: "sharda-64eef.firebaseapp.com",
    projectId: "sharda-64eef",
    storageBucket: "sharda-64eef.firebasestorage.app",
    messagingSenderId: "91589080715",
    appId: "1:91589080715:web:fa401a201d6f6b508e868e",
    measurementId: "G-LH0G5JXZYG"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();
  const twitterProvider = new TwitterAuthProvider();

  window.togglePassword = () => {
    const pwd = document.getElementById("password");
    pwd.type = pwd.type === "password" ? "text" : "password";
  };

  const msg = (text, type = 'green') => {
    const el = document.getElementById("message");
    el.innerText = text;
    el.style.color = type === 'green' ? "green" : "red";
    document.getElementById("loader").style.display = "none";
  };

  const showLoader = () => {
    document.getElementById("loader").style.display = "block";
    document.getElementById("message").innerText = "";
  };

  window.signup = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    showLoader();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      msg("✅ Signup successful! Please verify your email.", "green");
    } catch (error) {
      msg("❌ " + error.message, "red");
    }
  };

  window.login = async () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    showLoader();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential.user.emailVerified) {
        msg("✅ Login successful! Redirecting...", "green");
        setTimeout(() => window.location.href = "home.html", 1500);
      } else {
        msg("⚠️ Please verify your email before logging in.", "red");
        document.getElementById("resendBtn").style.display = "block";
      }
    } catch (error) {
      msg("❌ Incorrect email or password.", "red");
    }
  };

  window.googleLogin = async () => {
    showLoader();
    try {
      // Use signInWithRedirect for better compatibility
      await signInWithRedirect(auth, googleProvider);
    } catch (error) {
      console.error("Google Login Error:", error);
      msg("❌ " + error.message, "red");
    }
  };

  // This handles redirect result when user comes back from Google login
  getRedirectResult(auth)
    .then((result) => {
      if (result && result.user) {
        msg("✅ Google Login successful!", "green");
        setTimeout(() => window.location.href = "home.html", 1500);
      }
    })
    .catch((error) => {
      console.error("Redirect Login Error:", error);
      msg("❌ " + error.message, "red");
    });

  window.facebookLogin = async () => {
    showLoader();
    try {
      await signInWithPopup(auth, facebookProvider);
      msg("✅ Facebook Login successful!", "green");
      setTimeout(() => window.location.href = "home.html", 1500);
    } catch (error) {
      msg("❌ " + error.message, "red");
    }
  };

  window.twitterLogin = async () => {
    showLoader();
    try {
      await signInWithPopup(auth, twitterProvider);
      msg("✅ Twitter Login successful!", "green");
      setTimeout(() => window.location.href = "home.html", 1500);
    } catch (error) {
      msg("❌ " + error.message, "red");
    }
  };

  window.sendReset = async () => {
    const email = document.getElementById("email").value;
    showLoader();
    try {
      await sendPasswordResetEmail(auth, email);
      msg("🔑 Password reset link sent to your email.", "green");
    } catch (error) {
      msg("❌ " + error.message, "red");
    }
  };

  window.resendVerification = async () => {
    showLoader();
    try {
      if (auth.currentUser) {
        await sendEmailVerification(auth.currentUser);
        msg("📧 Verification email sent again! Check your inbox.", "green");
      } else {
        msg("❌ Please login first.", "red");
      }
    } catch (error) {
      msg("❌ " + error.message, "red");
    }
  };
 
  const form = document.getElementById("admissionForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (res.ok) {
        alert("🎉 Admission submitted successfully!");
        form.reset();
      } else {
        alert("❌ Submission failed. Please try again.");
      }
    } catch (err) {
      alert("⚠️ Network error. Please check your internet.");
      console.error(err);
    }
  });