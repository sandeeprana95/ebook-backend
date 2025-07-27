const ForgotPasswordTemplate = (link) => {
    return (     
               ` <!DOCTYPE html>
                <html lang="en">
                <head>
                <meta charset="UTF-8">
                <title>Reset Your Password</title>
                <style>
                    body {
                    font-family: Arial, sans-serif;
                    background-color: #f8f9fa;
                    padding: 40px;
                    color: #333;
                    }
                    .email-container {
                    background: #ffffff;
                    max-width: 600px;
                    margin: auto;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
                    }
                    .button {
                    display: inline-block;
                    padding: 12px 24px;
                    margin-top: 20px;
                    background-color: #007bff;
                    color: #ffffff;
                    text-decoration: none;
                    border-radius: 5px;
                    font-weight: bold;
                    }
                    .footer {
                    margin-top: 40px;
                    font-size: 12px;
                    color: #888;
                    text-align: center;
                    }
                </style>
                </head>
                <body>
                <div class="email-container">
                    <h2>Password Reset Request</h2>
                    <p>Hello,</p>
                    <p>You requested a link to reset your password. Click the button below to choose a new one:</p>
                    
                    <a href="${process.env.DOMAIN}?token" class="button" style="color:white" >Reset Password</a>

                    <p>If you didn’t request this, you can safely ignore this email.</p>
                    <p>This link will expire in 24 hours.</p>

                    <div class="footer">
                    &copy; 2025 YourApp Inc.  Ebook
                    </div>
                </div>
                </body>
                </html>

          `
    )
}

export default ForgotPasswordTemplate