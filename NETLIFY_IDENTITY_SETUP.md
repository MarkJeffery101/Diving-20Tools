# Netlify Identity Setup Guide

This document explains how to enable Netlify Identity authentication for DivePlan.

## What We've Done

We've added authentication to your app with the following components:

1. **Login Page** (`client/pages/Login.tsx`) - Users will see this when they visit the app without being logged in
2. **Auth Context** (`client/contexts/AuthContext.tsx`) - Manages user authentication state
3. **Protected Routes** - All pages except `/login` now require authentication
4. **Logout Button** - Users can log out from the navigation menu
5. **Netlify Identity Script** - Added to `index.html` for authentication

## Setup Steps

### Step 1: Enable Netlify Identity on Your Site

1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your DivePlan site
3. Go to **Site Settings** → **Identity**
4. Click **Enable Identity**

### Step 2: Configure Authentication

1. In the Identity settings, click **Invite users**
2. Enter the email addresses of people you want to give access to
3. They'll receive an invite email
4. Click the link in the email to set their password
5. They can now log in to DivePlan

### Step 3: Set Registration Limits

1. In **Settings** → **Identity** → **Registration**
2. Set registration to **Invite only** (to prevent random people from signing up)
3. Or allow **Open** registration if you prefer (anyone can create an account)

### Step 4: Deploy

Push your changes to GitHub:
```bash
# Changes are already committed, just push
```

Your app will redeploy automatically. Once live, visit your site and you'll see the login page.

## Managing Users

### Adding New Users

1. Go to your site's Identity settings on Netlify
2. Click **Invite users**
3. Enter their email and click **Send invite**
4. They'll receive an invitation email

### Removing Access

1. Go to your site's Identity settings
2. Under **Users**, find the person you want to remove
3. Click the **...** menu and select **Disable user**
4. They can no longer log in

### Re-enabling Access

1. Find the disabled user in the list
2. Click the **...** menu and select **Enable user**
3. They can log in again

## User Limits

- **Free tier**: Up to 5 users
- **Paid tier**: Starting at $9/month for 100 users

If you exceed 5 users on the free tier, Netlify will prompt you to upgrade.

## Testing

### Test the Login

1. Visit your DivePlan URL
2. You should see the login page
3. Click "Create one" to create a test account
4. Enter any email and password (min 6 characters)
5. Click "Create Account"
6. You're now logged in!

### Test the Logout

1. Once logged in, click the **Logout** button in the top navigation
2. You'll be redirected to the login page

### Test Access Control

1. Log out
2. Try accessing `/tables` or any other page directly
3. You'll be redirected to the login page

## Troubleshooting

### "Authentication service not available"

- Make sure Netlify Identity is enabled on your site
- Wait a few minutes after enabling—it takes time to propagate
- Reload the page and try again

### Forgot password?

Users can reset their password from the login page. If they don't see a reset option:
1. Tell them to try logging in with the wrong password
2. They should see a "Forgot your password?" link
3. They can reset from there

### Users can't sign up

If you set registration to "Invite only", users MUST receive an invite email. They can't sign up on their own.

## Configuration Options

You can customize the authentication behavior by editing `client/contexts/AuthContext.tsx`:

- Password requirements
- Error messages
- Logout behavior
- User data storage

## Support

For more info on Netlify Identity:
- https://docs.netlify.com/identity/overview/
- https://docs.netlify.com/identity/setup/

## Next Steps

1. Push the code to GitHub (it's already prepared)
2. Enable Netlify Identity in your Netlify dashboard
3. Deploy
4. Invite users
5. Done!

Questions? Let me know!
