const resetPasswordTemplate = (resetUrl: string): string => {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>Password Reset</title>
    <style>
      body {
        font-family: sans-serif;
        line-height: 1.6;
        color: #333;
      }
      a {
        color: #007bff; /* Primary color */
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <p>Hello,</p>
    <p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
    <p>Please click on the following link, or paste this into your browser to complete the process:</p>
    <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; border-radius: 5px;">Reset Password</a>
    <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
  </body>
  </html>
  `
}


export default resetPasswordTemplate;