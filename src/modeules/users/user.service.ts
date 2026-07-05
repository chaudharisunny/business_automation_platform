import * as userRepository from "./user.repository"

export const getAllUsers = async () =>{
    const users = await userRepository.getAllUsers();
    
    return users;
};

export const getUserById = async (id: number) => {
    const user = await userRepository.getUserById(id);

    return user;
};

export const updateaUser = async (
    id: number,
    name: string,
    email: string 
) => {
    const user = await userRepository.getUserById(id);

    if(!user){
        throw new Error("user not found");
    }

    const updateaUser = await userRepository.updateUser(
        id,
        name,
        email
    );

    return updateaUser;
};

export const deleteUser = async (id: number) =>{
    
    const user = await userRepository.getUserById(id);

    if(!user){
        throw new Error("user not found");
    }

    await userRepository.deleteUser(id);

    return true; 
};