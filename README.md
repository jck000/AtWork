# AtWork
Ionic2 application that replaces an employee time clock, When you enters a company's building the application will automatically send a POST-request to my API server, this server can handle all the incoming data(deviceID, time, date) and put it nicely into a mysql-database. Just the same when you leaves a company's building, the application will send a DELETE-request to my API server. it's not possible to use the GET and PUT requests! And as extra protection I use the TouchID to verify your movement.
I also designed a webpage with his own build-in dashboard, here the employer can check in realtime who's working right now. This is very useful in cases of fire, emergency, ...

# API
<ul><li>HTTP-request handling</li>
<li>Secure connection to MySql-Database</li></ul>

# WebPage

<ul><li>Realtime Dashboard</li>
<li>responsive</li>
<li>Database connection check</li></ul>

# Ionic 2 Application

<ol><li>Download Ionic2</li>
<li>Download Node.JS</li>
<li>Clone my project</li>
<li>Use "npm install" command</li>
<li>Use "ionic build IOS" command</li>
<li>Open Xcode and run it in the emulator or on your device</li></ol>

