# Quick Fix for Razorpay 500 Error

## The Problem
You're getting a 500 Internal Server Error because Razorpay environment variables are missing from your `.env` file.

## The Solution

### Step 1: Open your `.env` file
Open the `.env` file in the root directory of your project.

### Step 2: Add Razorpay Keys
Add these two lines to your `.env` file:

```env
RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
```

**Important:**
- Replace `rzp_test_xxxxxxxxxxxxx` with your actual Razorpay Key ID
- Replace `xxxxxxxxxxxxxxxxxxxx` with your actual Razorpay Key Secret
- **No quotes** around the values
- **No spaces** around the `=` sign

### Step 3: Get Your Razorpay Keys

1. Go to: https://dashboard.razorpay.com/app/keys
2. Make sure **Test Mode** is ON (toggle at bottom left of dashboard)
3. If you don't have keys, click **"Generate Key"**
4. Copy the **Key ID** (starts with `rzp_test_`)
5. Copy the **Key Secret** (long string)
6. Paste them into your `.env` file

### Step 4: Restart Your Server

**CRITICAL:** You MUST restart your development server after adding environment variables:

1. Stop the server (Press `Ctrl+C` in the terminal where `npm run dev` is running)
2. Start it again: `npm run dev`

### Step 5: Verify It Works

1. Visit: http://localhost:3000/api/payment/test-config
2. You should see:
   ```json
   {
     "configured": true,
     "hasKeyId": true,
     "hasKeySecret": true
   }
   ```

3. If you see `"configured": false`, check:
   - Did you save the `.env` file?
   - Did you restart the server?
   - Are there any typos in the variable names?
   - Are the keys correct?

### Step 6: Test Payment

1. Go to your payment page
2. Click "Pay"
3. The Razorpay checkout should open (not an error)

## Example `.env` File

Your `.env` file should look something like this:

```env
DATABASE_URL="postgresql://..."
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="..."
GOOGLE_AI_API_KEY="..."
DEEPGRAM_API_KEY="..."
CLOUDINARY_CLOUD_NAME="..."
CLOUDINARY_API_KEY="..."
CLOUDINARY_API_SECRET="..."
RAZORPAY_KEY_ID=rzp_test_1234567890ABCDEF
RAZORPAY_KEY_SECRET=abcdefghijklmnopqrstuvwxyz123456
```

## Still Getting 500 Error?

1. **Check server terminal** - Look for error messages when you click "Pay"
2. **Check the test endpoint** - Visit `/api/payment/test-config` to see if keys are loaded
3. **Verify file name** - Make sure it's `.env` (not `.env.example` or `.env.local`)
4. **Check for typos** - Variable names must be exactly:
   - `RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`
5. **Restart server** - Environment variables only load when the server starts

## Need Help?

Check the server terminal logs - they will show exactly what's wrong:
- "Razorpay credentials missing" = Keys not in .env file
- "Invalid key" = Wrong keys (maybe using live keys in test mode)
- Other errors = Check the specific error message

