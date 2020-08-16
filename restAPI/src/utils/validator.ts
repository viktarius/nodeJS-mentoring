import * as jf from 'joiful';

class UserSchema {
    @jf.string()
        .required()
    login: string | undefined;

    @jf.number()
        .min(4)
        .max(130)
        .required()
    age: number | undefined;

    @jf.string()
        .regex(/[a-z]/)
        .regex(/[0-9]/)
        .required()
    password: string | undefined;
}

export const validateUser = (user: any) => {
    const validatedUser = new UserSchema();
    validatedUser.age = user.age;
    validatedUser.login = user.login;
    validatedUser.password = user.password;
    return jf.validate(validatedUser);
};
