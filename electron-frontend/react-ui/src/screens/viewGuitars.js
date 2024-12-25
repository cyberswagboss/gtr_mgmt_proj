import {
    useState,
    useEffect,
    useRef
} from "react";
import { API_ROUTES } from "../apiGateway";

const ViewGuitarsScreen = () => {
    const [guitars, setGuitars] = useState([]);
    const isFetched = useRef(false);

    useEffect(() => {
        if (isFetched.current) return;
        isFetched.current = true;

        const fetchData = async () => {
            const apiCall = API_ROUTES.BASE_URL + API_ROUTES.GET_ALL_GUITARS;
            console.log("Fetching from: ", apiCall);

            try {
                const response = await fetch(apiCall, {
                    method: "GET",
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const responseData = await response.json();
                console.log(responseData);

                setGuitars(responseData);
            } catch (e) {
                console.error("Fetching failed: ", e);
            }
        };

        fetchData();
    }, []);

    return (
        <div>view guitars</div>
    );
}

export default ViewGuitarsScreen