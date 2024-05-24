export const config = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.zevon.aora",
	projectId: "664818ae002214c4414a",
	databaseId: "66481b26001b6ea9963f",
	userCollectionId: "66481b46003a1e44a1d4",
	videoCollectionId: "66481b72000c71d6a88f",
	storageId: "66481d2600292d5a3a82",
};

import {
	Client,
	Account,
	ID,
	Avatars,
	Databases,
	Query,
} from "react-native-appwrite";

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

		if (!newAccount) {
			console.log("account is not created");
			throw Error;
		}
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

export const signIn = async (email, password) => {
	try {
		console.log({ email, password });
		await account.deleteSession("current");
		await account.createEmailPasswordSession(email, password);
		return account.get();
	} catch (error) {
		throw new Error(error);
	}
};

export const getCurrentUser = async () => {
	try {
		const currentAccount = await account.get();

		if (!currentAccount) {
			console.log("cannot get current accout");
			throw Error;
		}

		const currentUser = await databases.listDocuments(
			config.databaseId,
			config.userCollectionId,
			[Query.equal("accountId", currentAccount.$id)]
		);

		if (!currentUser) {
			throw Error;
		}
		return currentUser.documents[0];
	} catch (error) {
		console.log(error);
	}
};
