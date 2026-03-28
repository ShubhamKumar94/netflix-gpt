export const checkValidData = (email,password,name) =>{

    if(name !== undefined){

        const isNameValid = /^[A-Za-z]+( +[A-Za-z]+)+$/.test(name);

        if(!isNameValid) return "Name is not valid";
    }

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const isPasswordValid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

    if(!isEmailValid) return "Email ID is not valid";
    if(!isPasswordValid) return "Password is not valid";

    return null;
}