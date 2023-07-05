export const validate_username = (username : string) : boolean => {
    return username.length >= 5;
}

export const validate_password = (password : string) : boolean => {
    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;
    return password.length >= 8 && uppercaseRegex.test(password) && numberRegex.test(password);
}

export const validate_email = (email : string) : boolean => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
}