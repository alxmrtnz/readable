# Udacilist (aka Udacity's Readable Project)

This is the project for the final assessment project of Udacity's Redux course. It is a comment web app where users can post content to predefined categories, comment on their posts and other user's posts, and vote on posts and comments

## Quick Start Guide
**Run the API Server**

To start working with the API server, install it and start it:
- `cd api-server`
- `npm install`
- `node server`

**Run Front End**

To begin working on the front end of the application (_make sure you're in another terminal tab or window_):
- `cd frontend`
- `npm install`
- `npm start`

## API Server

The backend API server included in this projected was provided from Udacity ([repository here](https://github.com/udacity/reactnd-project-readable-starter))

More information about the API server and how to use it can be found in its [README file](api-server/README.md).

### Editing Predefined Categories, Comments, Posts

To add predefined content (so your app isn't empty when you start it up), you can edit the following files in the `api-server` directory:
- `categories.js`
- `comments.js`
- `posts.js`
    
Each file contains a `defaultData` object where you can add a new piece of data. After editing, make sure you restart the server for it to update.

Dependencies can be found in `package.json`

### Styles/Webpack Setup

This project has been set up to use and compile `scss`. Styles are found in 
```
frontend
–– assets
–– –– styles
```
`styles.scss` is the sole file that is compiled using the scripts (and the `node-sass-chokidar` package) found in `package.json`. To add new styles, make sure to import them into `styles.scss`

`components` and `screens` are where most of the specific styles to the front end app are found with more global styles found in `base` and `layout`    


## Contributions/Attributions
`api.js` comes from/is based off of the file put together by user [jayzhou215](https://github.com/jayzhou215/readable/blob/master/src/utils/Api.js)


