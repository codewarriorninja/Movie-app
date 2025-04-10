// import{Client,Databases,ID,Query} from 'react-native-appwrite';

// const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
// const Collection_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;

// const client = new Client()
// .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_API_ENDPOINT!)
// .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

// const database = new Databases(client);


// export const updateSearchCount = async(query:string, movie:Movie) => {
//     const result = await database.listDocuments(DATABASE_ID, Collection_ID, [
//         Query.equal('searchTerm', query),
//     ]);
//     console.log(result);
// }