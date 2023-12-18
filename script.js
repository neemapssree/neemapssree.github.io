// let fname = document.getElementById('fname').value;
// console.log(fname);
// let qualification = document.querySelector('#qualification').value;
// console.log(qualification);
// let gender = document.querySelector('input[name="gender"]:checked').value;
// console.log(gender);

// let hobbies = [];
// let hobbiesElements = document.getElementsByName('hobbies');
// for (i = 0; i < hobbiesElements.length; i++){
//     if(hobbiesElements[i].checked) {
//         hobbies.push(hobbiesElements[i].value);
//     }
// }
// console.log(hobbies);

/*DOM Example*/
const tableEl = document.querySelector('table');
tableEl.style.border = '2px solid orange';
const readEl = document.querySelector('.readbtn');
readEl.addEventListener('mouseover', function() {
    readEl.classList.add('active');
});

readEl.addEventListener('mouseout', function() {
    readEl.classList.remove('active');
});
    


const fnameEl = document.querySelector('#fname');
const lnameEl = document.querySelector('#lname');
const emailEl = document.querySelector('#email');
const passwordEl = document.querySelector('#pswd');
const confirmPasswordEl = document.querySelector('#confirmpswd');
const form = document.querySelector('#myForm');

const checkfName = () => {
    let valid = false;
    const min = 2,
        max = 40;
    const fname = fnameEl.value.trim();

    if(!isRequired(fname)) {
        showerror(fnameEl, 'First name cannot be blank.');
    }
    else if (!isBetween(fname.length, min, max)){
        showerror(fnameEl, `First name must be between ${min} and ${max} characters.`);
    }
    else {
        showsuccess(fnameEl);
        valid = true;
    }
    return valid;
};

const checkEmail = () => {
    let valid = false;
    const email = emailEl.value.trim();

    if(!isRequired(email)) {
        showerror(emailEl, 'Email must not be blank');
    }
    else if(!isEmailValid(email)){
        showerror(emailEl, 'Enter a valid email address');
    }
    else {
        showsuccess(emailEl);
        valid = true;
    }
    return valid;
};

const checkPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();

    if(!isRequired(password)){
        showerror(passwordEl, 'Password should not be blank');
    }
    else if(!isPasswordSecure(password)){
        showerror(passwordEl, 'Password must has at least 8 characters that include at least 1 lowercase character, 1 uppercase characters, 1 number, and 1 special character in (!@#$%^&*)');
    }
    else{
        showsuccess(passwordEl);
        valid = true;
    }
    return valid;
};

const checkConfirmPassword = () => {
    let valid = false;
    const password = passwordEl.value.trim();
    const confirmpassword = confirmPasswordEl.value.trim();

    if(!isRequired(confirmpassword)){
        showerror(confirmPasswordEl, 'Confirm password cannot be blank');
    }
    else if(password !== confirmpassword ){
        showerror(confirmPasswordEl, 'Password fields must match');
    }
    else{
        showsuccess(confirmPasswordEl);
        valid = true;
    }
    return valid;
};

const isEmailValid = (email) => {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
};

const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);

                                //     ^	The password starts
                                // (?=.*[a-z])	The password must contain at least one lowercase character
                                // (?=.*[A-Z])	The password must contain at least one uppercase character
                                // (?=.*[0-9])	The password must contain at least one number
                                // (?=.*[!@#$%^&*])	The password must contain at least one special character.
                                // (?=.{8,})	The password must be eight characters or longer

};

const isRequired = value => value === '' ? false : true;
const isBetween = (length, min, max) => length < min || length > max ? false : true;

const showerror = (input,message) => {
    const formField = input.parentElement;
    formField.classList.remove('success');
    formField.classList.add('error');

    const error = formField.querySelector('small');
    error.textContent = message;
};

const showsuccess = (input) => {
    const formField = input.parentElement;
    formField.classList.add('success');
    formField.classList.remove('error');

    const error = formField.querySelector('small');
    error.textContent = '';
};

form.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent form submission for testing
    
    let isFirstnamevalid = checkfName(),
        isEmailValidResult = checkEmail(), // Changed the variable name to avoid conflict
        isPasswordValid = checkPassword(), // Fixed function call
        isConfirmPasswordValid = checkConfirmPassword();
    
    let isFormValid = isFirstnamevalid && isEmailValidResult && isPasswordValid && isConfirmPasswordValid;
    // submit to the server if the form is valid
    if (isFormValid) {
        // Implement the form submission logic here
        console.log("Form is valid. Submitting...");
        // Uncomment the line below to submit the form
        // form.submit();
    } else {
        console.log("Form is invalid. Please check the fields.");
    }
});