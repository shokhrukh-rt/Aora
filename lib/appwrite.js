export const config = {
	endpoint: "https://cloud.appwrite.io/v1",
	platform: "com.zevon.aora",
	projectId: "664818ae002214c4414a",
	databaseId: "66481b26001b6ea9963f",
	userCollectionId: "66481b46003a1e44a1d4",
	videoCollectionId: "66481b72000c71d6a88f",
	storageId: "66481d2600292d5a3a82",
};

const {
	endpoint,
	platform,
	projectId,
	databaseId,
	userCollectionId,
	videoCollectionId,
	storageId,
} = config;

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
			databaseId,
			userCollectionId,
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
		//await account.deleteSession("current");
		const session = await account.createEmailPasswordSession(
			email,
			password
		);
		return session;
	} catch (error) {
		throw new Error(error);
	}
};

export async function getAccount() {
	try {
		const currentAccount = await account.get();
		return currentAccount;
	} catch (error) {
		throw new Error(error);
	}
}
export const getCurrentUser = async () => {
	try {
		const currentAccount = await getAccount();
		//console.log("appwrite line 93", { currentAccount });

		if (!currentAccount) {
			console.log("cannot get current accout");
			throw Error;
		}

		const currentUser = await databases.listDocuments(
			databaseId,
			userCollectionId,
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

export const getAllPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			videoCollectionId
		);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};

export const getLatestPosts = async () => {
	try {
		const posts = await databases.listDocuments(
			databaseId,
			videoCollectionId,
			[Query.orderDesc("$createdAt", Query.limit(7))]
		);
		return posts.documents;
	} catch (error) {
		throw new Error(error);
	}
};
