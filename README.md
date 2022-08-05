# stockwatch

##  how to get the project started 
### yarn stalls
cd into /backend and $yarn (npm install works too, no lock file reqs atm)  
cd into /client and $yarn (npm install works too, no lock file reqs atm)

### create database
CREATE a mysql database

### link database in .env
in the /backend directory  
create a .env file and fill in the needed variables   
an example .env file is already in the /backend directory named .example.env  
DB variables come from your mysql server  
to get a funnhub api you need to go to https://finnhub.io/ and sign up for free i suggest using the sandbox api, if you use the free api everything should work with except for checking for stock splits in /backend/processes/calculateSplits.js  
the jwt secret can be a random string you choose  


### after your database is created and online sync some starter tables/values
cd into /backend and $node syncStockPrice.js  
cd into /backend and $node syncStocks.js  
cd into /backend and $node syncUsers.js  
cd into /backend and $node syncUserStocks.js  


### starting the server and webpage
*option1:*  
cd into /backend and $yarn dev  
in a second terminal  
cd into /client and $yarn start  

*option2*
in the base directory  
$yarn  
then  
$yarn dev  


# Welcome to Market watch.
the goal of this site is to enable people to Practice stock trading with virtual money.


1) set starting capitol(fake money)  
2)'purchase' stocks at the current value  
3) attempt to buy low and sell high  
4) compare yourself against investing firms and public investors  



if you set your public, you will be placed on the leaderboard
if you keep your profile private you will see be able to compare your account to other, and it will keep your account hidden to others


future goals


join with a group ( everyone starts at the same time with the same capitol. the group with have a ranking to see who the top traders are. the group can compare members against each other even if your account is set to private)


List of current things to do:
incurporate search for description of stocks 
ex. so you can find apple stock by searching apple

v/ impletement stock splitting check so you dont lose stock when a stock splits

v/ implement calulation for overall wealth
possibly save past welath chart for graph  up and downs in overall wealth
add ability to compare yourself with others on the website
add high scores to see top performers
add ability to compare yourself with famouse investors/investor groups


possible things added in the future:
switch login token into redux global state
add crypto coins option