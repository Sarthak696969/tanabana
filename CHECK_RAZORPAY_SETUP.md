# Razorpay Setup Checklist

## Issue: "Unexpected token '<', "<!DOCTYPE "... is not valid JSON"

This error occurs when the API route returns an HTML error page instead of JSON, usually because:
1. **Razorpay environment variables are missing**
2. **Server needs to be restarted after adding env variables**
3. **Incorrect Razorpay API keys**

## Quick Fix Steps

### 1. Check Your `.env` File

Make sure your `.env` file (in the root directory) contains:

```env
RAZORPAY_KEY_ID="your-key-id-here"
RAZORPAY_KEY_SECRET="your-key-secret-here"
```

**Important:**
- Remove quotes if you're adding them manually
- No spaces around the `=` sign
- Get these from: https://dashboard.razorpay.com/app/keys

### 2. Get Your Razorpay Keys

1. Go to https://dashboard.razorpay.com/app/keys
2. Make sure you're in **Test Mode** (toggle at bottom left)
3. Click **Generate Key**
4. Copy the **Key ID** and **Key Secret**
5. Add them to your `.env` file

### 3. Restart Your Development Server

**Critical:** After adding environment variables, you MUST restart the server:

```bash
# Stop the server (Ctrl+C)
# Then restart it
npm run dev
```

### 4. Test the Configuration

Visit this URL in your browser to check if Razorpay is configured:
```
http://localhost:3000/api/payment/test-config
```

You should see:
```json
{
  "configured": true,
  "hasKeyId": true,
  "hasKeySecret": true,
  ...
}
```

### 5. Test the Payment Flow

1. Go to your payment page
2. Click "Pay"
3. Check the browser console for any errors
4. Check the server terminal for error messages

## Common Issues

### Issue: Variables not loading
**Solution:** 
- Make sure the file is named `.env` (not `.env.example`)
- Restart the server
- Check for typos in variable names

### Issue: Wrong keys
**Solution:**
- Make sure you're using **Test Mode** keys for development
- Verify keys in Razorpay dashboard
- Keys should start with `rzp_test_` for test mode

### Issue: Server still showing error
**Solution:**
- Clear Next.js cache: `rm -rf .next` (or delete `.next` folder)
- Restart server
- Check server terminal for detailed error messages

## Still Having Issues?

1. Check server terminal logs when you click "Pay"
2. Look for error messages starting with "Razorpay credentials missing"
3. Verify your `.env` file format is correct
4. Make sure no other `.env.local` or `.env.production` is overriding variables

