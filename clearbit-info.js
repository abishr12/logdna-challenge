var clearbit = require("clearbit")("sk_46969d9c152268e395a367ea62ef5881");
var fs = require("fs");
var inquirer = require("inquirer");
var emailSearch = "";

inquirer
  .prompt([
    {
      type: "list",
      message:
        "Do you wish to use the list of emails (emails.txt) or would you like to type in the email? ",
      choices: ["Type It Out", "List"],
      name: "emailChoices"
    }
  ])
  .then(function(inquirerResponse) {
    if (inquirerResponse.emailChoices === "List") {
      fs.readFile("emails.txt", "utf8", function(err, data) {
        if (err) {
          console.log(err);
        }

        var something = String(data.split(" "));
        var array = something.split("\n");
        //console.log(array);
        for (var i = 0; i < array.length; i++) {
          var emailSearch = array[i];
          number = i;
          clearbitSearch(emailSearch);
        }
      });
    } else if (inquirerResponse.emailChoices === "Type It Out") {
      inquirer
        .prompt([
          {
            type: "input",
            message: "Enter the email you would like to see",
            name: "emailInput"
          }
        ])
        .then(function(inquirerResponsive) {
          clearbitSearch(inquirerResponsive.emailInput);
        });
    }
  });

/*
fs.readFile("emails.txt", "utf8", function(err, data) {
  if (err) {
    console.log(err);
  }

  var something = String(data.split(" "));
  var array = something.split("\n");
  //console.log(array);
  for (var i = 0; i < array.length; i++) {
    var emailSearch = array[i];
    number = i;
    clearbitSearch(emailSearch);
  }
});*/

function clearbitSearch(emails) {
  clearbit.Enrichment
    .find({ email: emails, stream: true })
    .then(function(response) {
      var target = response.person;
      var company = response.company;

      //Person's information
      var name = "Name: " + target.name.fullName;
      var email = "\nEmail: " + target.email;
      var employmentCompany =
        "\nWorks At " +
        target.employment.name +
        " as " +
        target.employment.title;
      var linkedInURL =
        "\nLinkedIn: https:www.linkedin.com/" + target.linkedin.handle;
      var twitter = "\nTwitter Handle: @" + target.twitter.handle;
      var location = "\nLocated in " + target.location;
      var biography = "\nBiography: " + target.bio;

      //Company Information
      var companyName = "Company Name: " + company.name;
      var companyFounded = "\nFounded in " + company.foundedYear;
      var companyWeb = "\nCompany Website:  http://www." + company.domain;
      var companyBio = "\nDescription: " + company.site.metaDescription;
      var companyEmails = "\nEmail Contacts: " + company.site.emailAddresses;
      var companyPhone = "\nPhone Number: " + company.phone;
      var companyCrunchbase =
        "\nCrunchbase: https://www.crunchbase.com/" + company.crunchbase.handle;
      var amountRaised = "\nRaised: $" + company.metrics.raised;
      var revenue =
        "\nEstimated Annual Revenue: " + company.metrics.estimatedAnnualRevenue;

      console.log(
        "-----Target " + name + "-----",
        email,
        biography,
        employmentCompany,
        location,
        linkedInURL,
        twitter
      );
      console.log("-----Company Info-----");
      console.log(
        companyName,
        companyWeb,
        companyBio,
        companyEmails,
        companyPhone,
        companyCrunchbase,
        amountRaised,
        revenue
      );
      console.log(" ");
    })
    .catch(function(err) {
      if (err.name === "TypeError") {
        console.log("Error for " + emails);
      }
    });
}
