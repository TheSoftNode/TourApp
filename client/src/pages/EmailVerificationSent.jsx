import React from 'react';

const EmailVerificationSent = () => {
  return (
    <main className="main">
      <div className="email-verified">
        <h2 className="heading-secondary ma-bt-lg">Check Your Email</h2>
        <p className="email-verified__text">
          A verification link has been sent to your email. Please check your inbox and follow the instructions to verify your account and start exploring.
        </p>
        <p className="email-verified__subtext">
          Didn’t receive the email? Make sure to check your spam folder or{' '}
          <a href="/resend-verification" className="email-verified__link">
            resend the verification email
          </a>.
        </p>
      </div>
    </main>
  );
};

export default EmailVerificationSent;
