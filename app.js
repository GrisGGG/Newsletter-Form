const express = require("express");
const bodyParser = require("body-parser");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app = express();
app.use(bodyParser.urlencoded({extended:true}));
//The public folder which holds the CSS
app.use(express.static("public"));

//Sending the signup.html file to the browser as soon as a request is made on localhost:port
app.get("/", function (req, res) {
 res.sendFile(__dirname + "/signup.html");
});
//Setting up MailChimp
mailchimp.setConfig({
 apiKey: "",
 server: ""
});
//As soon as the sign in button is pressed execute this
app.post("/", function (req,res) {
const firstName = req.body.fName;
const secondName = req.body.lName;
const email = req.body.email;
const listId = "69e7342b73";
//Creating an object with the users data
const subscribingUser = {
 firstName: firstName,
 lastName: secondName,
 email: email
};
//Uploading the data to the server
 async function run() {
const response = await mailchimp.lists.addListMember(listId, {
 email_address: subscribingUser.email,
 status: "subscribed",
 merge_fields: {
 FNAME: subscribingUser.firstName,
 LNAME: subscribingUser.lastName
}
});
//If all goes well logging the contact's id
 res.sendFile(__dirname + "/success.html")
 console.log(
`Successfully added contact${
 response.id
 }.`
);
}
//if not then the user is send to the failure page
 run().catch(e => res.sendFile(__dirname + "/failure.html"),
 app.post("/failure", (req, res) =>{
    res.redirect("/")})
);
});
app.listen(process.env.PORT || 3000, function () {
    console.log("Server is running at port 3000");
   });