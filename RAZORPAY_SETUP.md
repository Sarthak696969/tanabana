# Razorpay Integration Setup Guide

## Overview
Razorpay payment gateway has been successfully integrated into your TanaBana application. This guide will help you complete the setup.

## What's Been Integrated

### 1. Backend API Routes
- **`/api/payment/create-order`** - Creates a Razorpay order
- **`/api/payment/verify`** - Verifies payment signature and processes the payment

### 2. Frontend Integration
- Updated payment page (`/payment`) with Razorpay checkout
- Razorpay script loaded in the application layout
- Support for both cart checkout and signup payments

### 3. Payment Flow
1. User clicks "Pay" button
2. Frontend creates a Razorpay order via API
3. Razorpay checkout modal opens
4. User completes payment
5. Payment is verified on the server
6. Order is created (for cart) or user is marked as paid (for signup)

## Setup Instructions

### Step 1: Get Razorpay API Keys

1. Visit [Razorpay Dashboard](https://dashboard.razorpay.com/)
2. Sign up or log in to your account
3. Navigate to **Settings > API Keys**
4. Generate **Key ID** and **Key Secret**
   - Use **Test Keys** for development
   - Use **Live Keys** for production

### Step 2: Add Environment Variables

Add the following to your `.env.local` file:

```env
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
```

### Step 3: Test the Integration

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to the payment page:
   - For cart checkout: Add items to cart and proceed to checkout
   - For signup payment: Complete artisan signup process

3. Use Razorpay test cards:
   - **Card Number**: `4111 1111 1111 1111`
   - **Expiry**: Any future date (e.g., `12/25`)
   - **CVV**: Any 3 digits (e.g., `123`)
   - **Name**: Any name

## Payment Types Supported

### 1. Cart Checkout
- Payment type: `cart`
- Creates an order in the database
- Clears the cart after successful payment
- Redirects to home page

### 2. Signup/Artisan Fee
- Payment type: `signup`
- Marks user as paid in the database
- Updates user session
- Redirects to dashboard

## Security Features

- ✅ Payment signature verification on server
- ✅ Server-side order creation
- ✅ Secure payment processing via Razorpay
- ✅ No sensitive card data stored on your server

## Supported Payment Methods

Razorpay supports:
- Credit/Debit Cards
- UPI
- Net Banking
- Wallets (Paytm, PhonePe, etc.)
- BNPL (Buy Now Pay Later)

## Testing

### Test Mode
- Use Razorpay test keys from dashboard
- Use test card numbers provided by Razorpay
- No real money is charged in test mode

### Production Mode
- Switch to live keys in production
- Update `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` with live keys
- Test thoroughly before going live

## Troubleshooting

### Payment Modal Not Opening
- Check if Razorpay script is loaded (check browser console)
- Verify `RAZORPAY_KEY_ID` is set correctly
- Check network tab for API errors

### Payment Verification Failing
- Verify `RAZORPAY_KEY_SECRET` is set correctly
- Check server logs for error messages
- Ensure signature verification is working

### Order Not Created After Payment
- Check database connection
- Verify user session is valid
- Check server logs for errors

## Additional Resources

- [Razorpay Documentation](https://razorpay.com/docs/)
- [Razorpay Test Cards](https://razorpay.com/docs/payments/test-cards/)
- [Razorpay Dashboard](https://dashboard.razorpay.com/)

## Support

If you encounter any issues:
1. Check Razorpay dashboard for payment logs
2. Check server logs for errors
3. Verify all environment variables are set correctly
4. Test with Razorpay test cards first

