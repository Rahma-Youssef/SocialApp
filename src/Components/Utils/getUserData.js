import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const fetchUserData = async() => {
    const response = await axios.get("https://linked-posts.routemisr.com/users/profile-data", {
        headers: {
            token: localStorage.getItem("token"),
        },
    });
    return response.data.user;
};


export default function useUserData() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["userData"],
        queryFn: fetchUserData,

    });

    return { data, isLoading, error };
}