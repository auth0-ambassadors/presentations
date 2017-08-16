const express = require('express');
const app = express();
const jwt = require('express-jwt');
const jsonwebtoken = require('jsonwebtoken');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');
const cors = require('cors');
require('dotenv').config();

app.use(cors());


const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
});

const checkScopes = jwtAuthz([ 'read:messages' ]);

app.get('/api/token', function(req, res){
  const token = jsonwebtoken.sign({name:'Ado Kukic'}, 'super-secret', {expiresIn: '1h'})
  res.json({ message : token})
})

app.get('/api/public', function(req, res) {
  res.json({ message: "Hello from a public endpoint! You don't need to be authenticated to see this." });
});

app.get('/api/nuclear-launch-code', checkJwt, checkScopes,function(req, res){
  res.json({message: 1234})
})

app.listen(3001);
console.log('Listening on http://localhost:3001');
