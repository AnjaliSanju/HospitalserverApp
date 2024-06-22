const express = require("express")
const router = express.Router();
const fs = require('fs');
const path = require("path");

const dataPath = `${__dirname}/hospital.json`;

// utility functions

const saveAccountData = (data) => {
    const stringifyData = JSON.stringify(data,null,2)
    fs.writeFileSync(dataPath, stringifyData)
}
const getAccountData = () => {
    const jsonData = fs.readFileSync(dataPath)
    return JSON.parse(jsonData)   
}
//Add Hospital data 
//link-  http://localhost:(portnumber)/addHospital
//body->json:
//{"Hospitalname": "Meditrina",    "email": "meditrina@gmail.com",  "Location":"Kollam",  "patient count": "2023"}


router.post('/addHospital', (req, res) => {
 
    var existAccounts = getAccountData()
    const newAccountId =  Math. floor(Math. random() * (9999-1000 + 1)) + 1000;
 
    existAccounts[newAccountId] = req.body
    
    console.log(existAccounts);
    saveAccountData(existAccounts);
    res.send({success: true, msg: 'account added successfully'})
})
//Read Hospital data
//link-  http://localhost:(portnumber)/hospitalList

router.get('/hospitalList', (req, res) => {
    const accounts = getAccountData()
    res.send(accounts);
    console.log(accounts);
  })

//Update Hospital data
//link-  http://localhost:(portnumber)/9001 
//http method-put,  9001-demo id
//body->json:
//{"Hospitalname": "Ananthapuri",    "email": "ananthapuri@gmail.com",    "patient count": "1223"}

router.put('/:id', (req, res) => {
    var existAccounts = getAccountData()
    fs.readFile(dataPath, 'utf8', (err, data) => {
      const accountId = req.params['id'];
      existAccounts[accountId] = req.body;
      saveAccountData(existAccounts);
      res.send(`accounts with id ${accountId} has been updated`)
    }, true);
  });
//Delete hospital data
//link-  http://localhost:(portnumber)/9001 
//http method-delete

router.delete('/:id', (req, res) => {
    fs.readFile(dataPath, 'utf8', (err, data) => {
      var existAccounts = getAccountData()
      const userId = req.params['id'];
      delete existAccounts[userId]; 
      saveAccountData(existAccounts);
      res.send(`accounts with id ${userId} has been deleted`)
    }, true);
  })
module.exports = router;