var clearbit = require("clearbit")("sk_46969d9c152268e395a367ea62ef5881");

emailSearch = process.argv[2];

clearbit.Enrichment
  .find({ email: emailSearch, stream: true })
  .then(function(response) {
    var target = response.person;
    var company = response.company;

    //Person's information
    var name = "Name: " + target.name.fullName;
    var email = "\nEmail: " + target.email;
    var employmentCompany =
      "\nWorks At " + target.employment.name + " as " + target.employment.title;
    var linkedInURL =
      "\nLinkedIn: https:www.linkedin.com/" + target.linkedin.handle;
    var twitter = "\nTwitter Handle: @" + target.twitter.handle;
    var location = "\nLocated in " + target.location;
    var biography = "\nBiography: " + target.bio;

    //Company Information
    var companyName = "Company Name: " + company.legalName;
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

    console.log("-----Target-----");
    console.log(
      name,
      email,
      biography,
      employmentCompany,
      location,
      linkedInURL,
      twitter
    );
    console.log(" ");
    console.log("-----Company-----");
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
  })
  .catch(function(err) {
    console.error(err);
  });
