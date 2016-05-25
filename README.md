# Front End Interview Response

## Libraries:

```
whatwg-fetch (Fetch polyfill)
```
## relevant files:

```
src/routes/Home/HomeView.js
src/routes/Home/HomeView.scss
src/store/reducers/pics.js
```

The scaffolding is [react-redux-starter-kit](https://github.com/davezuko/react-redux-starter-kit).

## Use: 

```
npm install
npm start
```

## Note:

This implementation relies on receiving height of each picture in the API call to function. If the height is not given, height calculations are not possible, therefore the picture will be skipped.
