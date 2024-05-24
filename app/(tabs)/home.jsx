import {
	SafeAreaView,
	View,
	FlatList,
	StyleSheet,
	Text,
	StatusBar,
	Image,
} from "react-native";

import { RefreshControl } from "react-native";
import { useState } from "react";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";

const DATA = [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
		title: "First",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
		title: "Secon",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72",
		title: "Third",
	},
];

const Home = () => {
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		//recall posts
		setRefreshing(false);
	};

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={DATA}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<Text className="text-3xl text-white">{item.title}</Text>
				)}
				ListHeaderComponent={() => (
					<View className="my-10 px-4 space-y-2">
						<View className="justify-between items-start flex-row mb-3">
							<View>
								<Text className="font-pmedium text-sm text-gray-100">
									Welcome back
								</Text>
								<Text className="text-2xl font-psemibold text-white">
									VANDAM
								</Text>
							</View>
							<View className="mt-1.5">
								<Image
									source={images.logoSmall}
									className="w-9 h-10"
									resizeMode="contain"
								/>
							</View>
						</View>
						<SearchInput />

						<View className="w-full flex-1 pt-4 pb-4">
							<Text className="text-gray-100 text-lg font-pregular mb-3">
								Trending videos
							</Text>
							<Trending posts={DATA} />
						</View>
					</View>
				)}
				ListEmptyComponent={() => (
					<EmptyState
						title="No Videos Found"
						subtitle="Be the first one to create a video"
					/>
				)}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
					/>
				}
			/>
		</SafeAreaView>
	);
};

export default Home;
