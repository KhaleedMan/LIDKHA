# Firebase Hosting Setup Guide for LIDKHA

## Overview
This guide walks you through deploying your LIDKHA React app to Firebase Hosting with your custom domain (lidkha.com.ng).

## Prerequisites
- Firebase CLI installed globally (`npm install -g firebase-tools`)
- A Firebase project created at https://console.firebase.google.com
- Your domain (lidkha.com.ng) registered

## Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com
2. Click "Add project"
3. Enter project name: `lidkha-learning-platform`
4. Continue through the setup wizard
5. Enable Google Analytics (optional)
6. Create the project

## Step 2: Initialize Firebase in Your Project

Run in the root directory (C:\Users\HP\LIDKHA):

```bash
firebase login
firebase init
```

When prompted:
- Select: Hosting, Storage
- Choose the `lidkha-learning-platform` project
- Public directory: `client/dist`
- Configure as single-page app: Yes
- GitHub deploys: No (for now)

## Step 3: Build Your React App

```bash
cd client
npm run build
```

This creates the `dist` folder that will be deployed.

## Step 4: Deploy to Firebase Hosting

```bash
firebase deploy
```

After deployment, you'll get a Firebase URL like: `https://lidkha-learning-platform.web.app`

## Step 5: Connect Custom Domain (lidkha.com.ng)

1. In Firebase Console, go to Hosting
2. Click "Connect domain"
3. Enter: `lidkha.com.ng`
4. Follow DNS configuration steps:
   - Add the TXT record for verification
   - Add the A records pointing to Firebase IP
5. Update your domain registrar's DNS settings
6. Wait for verification (can take 24-48 hours)

## Step 6: Firebase Storage Setup

For video uploads (admin only):

1. In Firebase Console, go to Storage
2. Create a bucket (use default location)
3. Update security rules in storage.rules file
4. Deploy rules:
   ```bash
   firebase deploy --only storage
   ```

## Automatic Deployments (After Setup)

Every time you make changes:

```bash
cd client
npm run build
firebase deploy
```

Or create a deployment script in package.json:

```json
{
  "scripts": {
    "deploy": "npm run build && cd .. && firebase deploy && cd client"
  }
}
```

Then just run: `npm run deploy`

## Troubleshooting

**Build errors:** Ensure `npm run build` works locally first
**Domain not connecting:** Check DNS propagation at https://mxtoolbox.com
**Firebase login issues:** Run `firebase logout` then `firebase login` again

## Cost Considerations

Firebase Hosting (free tier includes):
- 10 GB of stored data
- 360 MB/day download bandwidth
- No charge for first 10 GB/month

For video hosting at scale, consider:
- Google Cloud Storage
- AWS S3
- Cloudflare R2

## Next Steps

1. Follow the steps above to set up Firebase
2. Once deployed, test your app at your custom domain
3. Set up admin panel for video uploads (will create next)
