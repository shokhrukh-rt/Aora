//*******************************************************************
// custom hook creating for fetching stuff from the appwrite database
//
//
//
//
//
//
//
//*******************************************************************

import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn) => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	const refetch = () => fetchData();

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const response = await fn();
			setData(response);
		} catch (error) {
			Alert.alert("Error", error.message);
		} finally {
			setIsLoading(false);
		}
	};

	return { data, isLoading, refetch };
};

export default useAppwrite;
