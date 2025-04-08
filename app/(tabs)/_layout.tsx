import { icons } from '@/constants/icons'
import { images } from '@/constants/images'
import { Tabs } from 'expo-router'
import { Image, ImageBackground,Text, View } from 'react-native'

interface TabIcons{
   focused:any,
   icon:any,
   title:any
}

const TabIcon = ({focused,icon,title}:TabIcons) => {
   if(focused){
   return (
      <>
      <ImageBackground
       source={images.highlight}
       className='flex flex-row justify-center items-center w-full flex-1 min-w-[112px] min-h-[70px] mt-4 overflow-hidden rounded-full'
      >
        <Image
        source={icon}
        tintColor={'#151312'}
        className='size-5'
        />
        <Text className='text-secondary text-base font-semibold ml-2'>{title}</Text>
      </ImageBackground>
     </>
   )
}
return (
   <View className='size-full flex justify-center items-center mt-4 rounded-full'>
      <Image
      source={icon}
      tintColor={'#a8b5db'}
      className='size-5'
      />
   </View>
)
}

const _Layout = () => {
  return (
    <Tabs
     screenOptions={{
      tabBarShowLabel:false,
      tabBarItemsStyle:{
         width:'100%',
         height:'100%',
         justifyContent:'center',
         alignItems:'center'
      },
      tabBarStyle:{
         backgroundColor:'#0f0d23',
         borderRadius:50,
         marginHorizontal:20,
         marginBottom:36,
         height:50,
         position:'absolute',
         overflow:'hidden',
         borderWidth:1,
         borderColor:'#0f0d23'
      }
     }}
    >
    <Tabs.Screen
     name='index'
     options={{
        title:'Home',
        headerShown:false,
        tabBarIcon: ({focused}:TabIcons) => (
         <TabIcon 
           focused={focused} 
           icon={icons.home} 
           title='Home' 
           />
        )
     }}
    />
    <Tabs.Screen
     name='search'
     options={{
        title:'Search',
        headerShown:false,
        tabBarIcon: ({focused}:TabIcons) => (
         <TabIcon 
           focused={focused} 
           icon={icons.search} 
           title='Search' 
           />
        )
     }}
    />
    <Tabs.Screen
     name='saved'
     options={{
        title:'Saved',
        headerShown:false,
        tabBarIcon: ({focused}:TabIcons) => (
         <TabIcon 
           focused={focused} 
           icon={icons.save} 
           title='Saved' 
           />
        )
     }}
    />
    <Tabs.Screen
     name='profile'
     options={{
        title:'Profile',
        headerShown:false,
        tabBarIcon: ({focused}:TabIcons) => (
         <TabIcon 
           focused={focused} 
           icon={icons.person} 
           title='Profile' 
           />
        )
     }}
    />
    </Tabs>
  )
}

export default _Layout

