//business logic
function Contact(first, last) {
  this.firstName = first;
  this.lastName = last;
  this.addresses = [];
}
function Address(street, city, state) {
  this.street = street;
  this.city = city;
  this.state = state;
}

Contact.prototype.fullName = function() {
  return this.firstName + " " + this.lastName;
}
Address.prototype.fullAddress = function() {
  return this.street + ", " + this.city + ", " + this.state;
}

// user interface logic
function clearFields() {
  $("input#new-first-name").val("");
  $("input#new-last-name").val("");
  $("input.new-street").val("");
  $("input.new-city").val("");
  $("input.new-state").val("");
}

function addAddressForm() {
  $("#new-address").append('<br><div class="new-address">' +
                              '<div class="form-group">' +
                                '<label for="new-street">Street</label>' +
                                '<input type="text" class="form-control new-street">' +
                              '</div>' +
                              '<div class="form-group">' +
                                '<label for="new-city">City</label>' +
                                '<input type="text" class="form-control new-city">' +
                              '</div>' +
                              '<div class="form-group">' +
                                '<label for="new-state">State</label>' +
                                '<input type="text" class="form-control new-state">' +
                              '</div>' +
                            '</div>');
}

function getAddresses(contact) {
  $(".new-address").each(function() {
    var inputtedStreet = $(this).find("input.new-street").val();
    var inputtedCity = $(this).find("input.new-city").val();
    var inputtedState = $(this).find("input.new-state").val();
    var newAddress = new Address(inputtedStreet, inputtedCity, inputtedState);
    contact.addresses.push(newAddress);
  });
  return contact;
}

$(document).ready(function() {
  $("#add-address").click(function() {
    addAddressForm();
  });

  $("form#new-contact").submit(function(event) {
    event.preventDefault();

    var inputtedFirstName = $("input#new-first-name").val();
    var inputtedLastName = $("input#new-last-name").val();

    var newContact = new Contact(inputtedFirstName, inputtedLastName);

    newContact = getAddresses(newContact);

    $("ul#contacts").append("<li><span class='contact'>" + newContact.fullName() + "</span>" +
      " <span class='edit'>Edit</span></li>");

    $(".contact").last().click(function() {
      $("#show-contact").show();
      $("#show-contact h2").text(newContact.firstName);
      $(".first-name").text(newContact.firstName);
      $(".last-name").text(newContact.lastName);
      $("ul#addresses").text("");
      newContact.addresses.forEach(function(address) {
        $("ul#addresses").append("<li>" + address.fullAddress() + "</li>");
      });
    });

    $(".edit").last().click(function() {
      var thisContact = $(this).prev();
      $("input#new-first-name").val(newContact.firstName);
      $("input#new-last-name").val(newContact.lastName);
      var addressCount = 0;
      $(".new-address").each(function() {
        $(this).find(".new-street").val(newContact.addresses[addressCount].street);
        $(this).find("input.new-city").val(newContact.addresses[addressCount].city);
        $(this).find("input.new-state").val(newContact.addresses[addressCount].state);
        addressCount += 1;
      });
      $("#update").show();
      $("#update").click(function() {
        newContact.firstName = $("input#new-first-name").val();
        newContact.lastName = $("input#new-last-name").val();
        thisContact.text(newContact.fullName());

        newContact.addresses = [];
        newContact = getAddresses(newContact);
        clearFields();
        $("#update").hide();
      });
    });
    clearFields();
  });
});
