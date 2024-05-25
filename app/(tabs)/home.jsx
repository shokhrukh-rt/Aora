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
import { useEffect, useState } from "react";
import { images } from "../../constants";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import EmptyState from "../../components/EmptyState";
import { getAllPosts } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";
import VideoCard from "../../components/VideoCard";

const Home = () => {
	const { data: posts, refetch } = useAppwrite(getAllPosts);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = async () => {
		setRefreshing(true);
		await refetch();
		setRefreshing(false);
	};
	//console.log("this is the user \n", { user }, "\n");
	//console.log({ posts });

	return (
		<SafeAreaView className="bg-primary h-full">
			<FlatList
				data={posts}
				keyExtractor={(item) => item.$id}
				renderItem={({ item }) => <VideoCard video={item} />}
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
							<Trending posts={[]} />
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
