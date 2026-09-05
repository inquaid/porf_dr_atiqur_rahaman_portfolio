# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# Portfolio

A personal portfolio website built with React.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## EmailJS Setup

The contact form uses EmailJS to send emails. To make it work:

1. Sign up at [EmailJS](https://www.emailjs.com/)
2. Create an Email Service (connect your email provider like Gmail)
3. Create an Email Template with these variables:
   - `{{from_name}}` - The name of the person contacting you
   - `{{from_email}}` - The email address of the person contacting you
   - `{{subject}}` - The subject of the message
   - `{{message}}` - The content of the message
4. Get your Public Key, Service ID, and Template ID from the EmailJS dashboard
5. Update these values in `src/components/sections/ContactSection.tsx`

### Troubleshooting EmailJS

If the contact form is not sending emails:

1. Verify your EmailJS account is active (check for any verification emails)
2. Confirm your service is properly connected and authorized
3. Make sure your template variables match exactly what's in the code
4. Check browser console for errors
5. Try using a different email service (Gmail, Outlook, etc.)
6. Make sure you've included your Public Key, Service ID, and Template ID correctly
