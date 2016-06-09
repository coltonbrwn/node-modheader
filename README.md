# 🍌 node-modheader
Send additional headers to a local http server with a simple proxy

## 🍌 Install

```
git clone git@github.com:coltonTB/node-modheader.git
npm install node-modheader
```

### Option 1 - Import header rules from [modheader](https://chrome.google.com/webstore/detail/modheader/idgpnmonknjnojddfkpgkljpfnnfcklj?hl=en) chrome extension

1. Click on the modheader browser extension
2. Click on the button with three vertical buttons in the top right
3. Click 'Export Profile'
4. Save this data in node-modheader/profiles/{profilename}.json
5. `node node-modheader -u profilename`

### Option 2 - Custom profiles

1. Write some json
2. Save it in /profiles as {profilename}.json (see node-modheader/profiles/example.json)
3. `node node-modheader -u profilename`

### Option 3 - Custom json file
1. Save a json object somehwere
2. `node node-modheader -f ../path/to/your/file.json`


## 🍌 CLI Options

```
-u   choose a user profile by name
-f   choose a file location for header definitions
-t   choose the port of the process you would like to tunnel to
-p   choose the port that node-modheaders listens on
```
