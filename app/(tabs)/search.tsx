import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from 'react-native'
import { images } from '@/constants/images'
import MovieCard from '@/components/MovieCard'
import useFetch from "@/services/useFetch";
import { fetchMovie } from "@/services/api";
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar';
import { useEffect, useState } from 'react';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const {
    data:movies,
    loading:moviesLoading,
    refetch:loadMovies,
    reset,
    error:moviesError
    } = useFetch(() => fetchMovie({
    query:searchQuery,
  }),false);

  useEffect(() => {
    const func =setTimeout(async() => {
    if(searchQuery.trim()){
      await loadMovies();
    }else{
      reset();
    }
  },500);
  return () => clearTimeout(func)
  },[searchQuery]);

  return (
    <View className='flex-1 bg-primary'>
      <Image
      source={images.bg}
      className='flex-1 absolute w-full z-0'
      resizeMode='cover'
      />
      <FlatList
      data={movies}
      renderItem={({item}) => <MovieCard {...item} />}
      keyExtractor={(item) => item.id.toString()}
      className='px-5'
      numColumns={3}
      columnWrapperStyle={{
        justifyContent:'center',
        gap:16,
        marginVertical:16
      }}
      contentContainerStyle={{
        paddingBottom:100
      }}
      ListHeaderComponent={
        <>
         <View className='w-full flex-row justify-center mt-20 items-center'>
          <Image
          source={icons.logo}
          className='w-12 h-10'
          />
         </View>
         <View className='my-5'>
          <SearchBar placeholder='Search for a movie....' value={searchQuery} onChangeText={(text:string) => setSearchQuery(text)}/>
         </View>
         {moviesLoading && (
          <ActivityIndicator size={'large'} color={'#0000ff'} className='my-3'/>
         )}
         {moviesError && (
          <Text className='text-red-500 px-5 my-3'>Error:{moviesError?.message}{}</Text>
         )}
         {!moviesLoading && !moviesError && searchQuery.trim() && movies?.length >0 && (
          <Text className='text-xl text-white font-bold'>Search results for {" "}
          <Text className='text-accent'>{searchQuery}</Text>
          </Text>
         )}
        </>
      }
      ListEmptyComponent={
        !moviesLoading && !moviesError ? (
          <View>
            <Text className='text-center text-gray-500'>{searchQuery.trim() ? 'No Movies found': 'Search for a movie'}</Text>
          </View>
        ): null
      }
      />
    </View>
  )
}

export default Search