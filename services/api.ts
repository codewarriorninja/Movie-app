export const TMDB_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    API_KEY :process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    Headers:{
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

export const fetchMovie = async({query}:{query:string}) => {
    const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`

    const response = await fetch(endpoint,{
        method:'GET',
        headers:TMDB_CONFIG.Headers
    })

    if(!response.ok){
        //@ts-ignore
        throw new Error('Failed at fetch Movie', response.statusText)
    }

    const data = await response.json()
    return data.results;
}

// const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDI4ZWQyZmVlNmZiM2E3M2M0NTE4ZDJjY2FkNzg0NiIsIm5iZiI6MTc0NDExOTIxOS45MTkwMDAxLCJzdWIiOiI2N2Y1MjViMzdiNDNiZGNlMjBhZDg3ZTkiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.KtaZDp4E-Om4pRY-yFistNBPsRl5PD7LsEI3vTuSKhM'
//   }
// };

// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error(err));