export const config = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.zevon.aora",
	projectId: "664818ae002214c4414a",
	databaseId: "66481b26001b6ea9963f",
	userCollectionId: "66481b46003a1e44a1d4",
	videoCollectionId: "66481b72000c71d6a88f",
	storageId: "66481d2600292d5a3a82",
};

import { Client, Account, ID, Avatars, Databases } from "react-native-appwrite";

const client = new Client();

client
	.setEndpoint(config.endpoint)
	.setProject(config.projectId)
	.setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (email, password, username) => {
	try {
		const newAccount = await account.create(
			ID.unique(),
			email,
			password,
			username
		);

		if (!newAccount) throw Error;
		const avatarUrl = avatars.getInitials(username);
		await signIn(email, password);
		const newUser = await databases.createDocument(
			config.databaseId,
			config.userCollectionId,
			ID.unique(),
			{ accountId: newAccount.$id, email, username, avatar: avatarUrl }
		);
		return newUser;
	} catch (error) {
		console.log(error);
		throw new Error(error);
	}
};

export async function signIn(email, password) {
	try {
		const session = await account.createEmailPasswordSession(
			email,
			password
		);
		return session;
	} catch (error) {
		throw new Error(error);
	}
}