import { View, Text, TouchableOpacity, Image } from "react-native";
import { TextInput } from "react-native";
import { useState } from "react";
import { icons } from "../constants";

const SearchInput = ({
	title,
	value,

	handleChangeText,
	otherStyles,
	...props
}) => {
	return (
		<View
			className="w-full h-16 px-4 bg-black-100
            rounded-2xl focus:border-secondary items-center flex-row space-x-4"
		>
			<TextInput
				className="text-base mt-0.5 text-white flex-1 font-pregular"
				value={value}
				placeholder="Search for a video"
				placeholderTextColor="#7b7b8b"
				onChangeText={handleChangeText}
			/>

			<TouchableOpacity>
				<Image
					source={icons.search}
					className="w-5 h-5"
					resizeMode="contain"
				/>
			</TouchableOpacity>
		</View>
	);
};

export default SearchInput;
