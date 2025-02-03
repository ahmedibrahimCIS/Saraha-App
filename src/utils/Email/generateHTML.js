export const signup = (link,name)=> `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        h1 {
            color: #333333;
        }
        p {
            color: #555555;
        }
        a {
            color: #1a73e8;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
        .button {
            display: inline-block;
            background-color: #1a73e8;
            color: #ffffff;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 16px;
            margin-top: 20px;
        }
        .button:hover {
            background-color: #1558b0;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h1>Verify Your Email</h1>
        <p>Hi ${name},</p>
        <p>Thank you for signing up. Please verify your email address by clicking the button below:</p>
        <a href="${link}" class="button">Verify Email</a>
        <p>If the button above doesn't work, you can copy and paste the following link into your browser:</p>
        <p><a href="${link}">${link}</a></p>
        <p>Thank you,<br>The Team</p>
    </div>
</body>
</html>`;