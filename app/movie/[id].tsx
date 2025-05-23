import useFetch from '@/services/useFetch';
import { useLocalSearchParams, useRouter } from 'expo-router'
import { ScrollView, StyleSheet, Text, View,Image, SafeAreaView, ActivityIndicator, TouchableOpacity } from 'react-native'
import { fetchMovieDetail } from '@/services/api';
import { icons } from '@/constants/icons';

interface MovieInfoProps{
  label:string;
  value?:string | number | null;
}
const MovieInfo = ({label,value}:MovieInfoProps) => (
  <View className='flex-col items-start justify-center mt-5'>
    <Text className='text-light-200 text-sm font-normal'>{label}</Text>
    <Text className='text-light-100 font-bold text-sm mt-2'>
      {value || 'N/A'}
    </Text>
  </View>
)

const MovieDetails = () => {
  const router = useRouter();
  const {id} = useLocalSearchParams();

  const {data:movie, loading} = useFetch(() => fetchMovieDetail(id as string));

  if(loading)
    return (
  <SafeAreaView className='bg-primary flex-1'>
    <ActivityIndicator />
  </SafeAreaView>
  )
  return (
    <View className='bg-primary flex-1'>
      <ScrollView contentContainerStyle={{
        paddingBottom:80
      }}>
        <View>
        <Image
            source={{
              uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`,
            }}
            className="w-full h-[550px]"
            resizeMode="stretch"
          />
          <TouchableOpacity className='absolute -bottom-6 right-5 rounded-full size-14 bg-white flex items-center justify-center'>
            <Image
            source={icons.play}
            className='w-6 h-7 ml-1'
            resizeMode="stretch"
            />
          </TouchableOpacity>
        </View>
        <View className='flex-col items-start justify-center mt-5 px-5'>
          <Text className='text-white font-bold text-xl'>{movie?.title}</Text>
          <View className='flex-row items-center mt-2'>
            <Text className='text-light-200 text-sm'>{movie?.release_date?.split("-")[0]} •</Text>
            <Text className='text-light-200 text-sm'> {movie?.runtime} min •</Text>
          </View>
          <View className='flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2'>
            <Image
            source={icons.star}
            className='size-4'
            />
            <Text className='text-white font-bold text-sm'>
              {Math.round(movie?.vote_average ?? 0)}/10
            </Text>
            <Text className='text-light-200 text-sm'>({movie?.vote_count}votes)</Text>
          </View>
          <MovieInfo label='overview' value={movie?.overview}/>
          <MovieInfo 
           label='Geners'
           value={movie?.genres?.map((genre:any) => genre.name).join(', ') || 'N/A'}
          />
          <MovieInfo 
           label='Release Date'
           value={movie?.release_date}
          />
          <View>
            <MovieInfo
            label='Revenue'
            value={`$${Math.round((movie?.revenue ?? 0)/1_000_000)}million`}
            />
            <MovieInfo
            label='Production Companies'
            value={movie?.production_companies?.map((company:any) => company.name).join(', ') || 'N/A'}
            />
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity className='absolute bottom-5 left-0 right-0 bg-accent rounded-lg py-3.5 flex flex-row items-center justify-center z-50' onPress={router.back}>
        <Image
         source={icons.arrow}
         className='size-5 mr-1 mt-0.5 rotate-180'
         tintColor={'fff'}
        />
        <Text className='text-white font-bold text-base'>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails